const program = require("commander");
const authHelper = require("../../auth-helper");
const AWS = require("aws-sdk");
const inputUtil = require("../../input-util");
const cacheUtil = require("../../cache-util");
const cloudFormationUtil = require("../../cloudformation-util");
const graphTypeMapping = require("./graph-type-mapping");
const metricsUtil = require("../../metrics-util");
require("@mhlabs/aws-sdk-sso");
const { Spinner } = require("cli-spinner");
const dateUtil = require("../../date-util");
const spinner = new Spinner();
spinner.setSpinnerString("⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈");

program
  .command("stack")
  .alias("s")
  .option(
    "--stack-name [stackName]",
    "Name of the CloudFormation stack to monitor. Optional - defaults to UI selector."
  )
  .option(
    "--names [resourceNames]",
    "Name(s) of the resources to monitor. Optional - defaults to UI selector."
  )
  .option(
    "--graph-types [graph name]",
    "Type(s) of the graph. Comma separated (optional)"
  )
  .option("-t --timespan [timespan]", "The timespan in minutes", 60)
  .option(
    "-r --region [region]",
    "AWS region. Defaults to environment variable AWS_REGION"
  )
  .option(
    "-p --profile [profile]",
    "AWS profile. Defaults to environment variable AWS_PROFILE",
    "default"
  )
  .option(
    "--nocache",
    "Results get cached for 24 hours if there are more than 300 functions in the account. Use this to force cache reload",
    false
  )
  .description("Browses and visualises stack metrics for a CloudFormation stack's resources as ASCII diagrams")
  .action(async (cmd) => {
    authHelper.authenticate(cmd);
    const cloudFormation = new AWS.CloudFormation();

    let nextMarker = null;
    let stackList = [];
    let stackName;

    if (!cmd.names) {
      const cachedStacks = cacheUtil.get(`stacks_${cmd.profile}_${cmd.region}`);
      if (!cachedStacks || cmd.nocache) {
        spinner.start();

        do {
          const stacks = await cloudFormation
            .listStacks({ NextToken: nextMarker })
            .promise();

          stackList.push(
            ...stacks.StackSummaries.map((p) => {
              return {
                name: inputUtil.obfuscateName(p.StackName, "service"),
                value: p.StackName,
              };
            })
          );
          nextMarker = stacks.NextToken;
          await wait(50);
        } while (nextMarker);
        spinner.stop();
        cacheUtil.save(`stacks_${cmd.profile}_${cmd.region}`, stackList);
      } else {
        stackList = cachedStacks;
      }

      stackList = stackList.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
    }
    let resourceNames;
    let resourceType = cmd.resourceType;
    if (!cmd.names) {
      stackName =
        cmd.stackName ||
        (await inputUtil.autocomplete("Select stack", stackList));
      resourceType = await cloudFormationUtil.getResourceType(
        stackName,
        "AWS::Lambda::Function",
        "AWS::DynamoDB::Table",
        "AWS::Events::Rule",
        "AWS::SNS::Topic",
        "AWS::SQS::Queue"
      );
      resourceNames = await cloudFormationUtil.selectResources(
        stackName,
        resourceType
      );
    } else {
      resourceNames = cmd.names.split(",");
    }
    const mappings = { mappings: graphTypeMapping.mappings[resourceType] };

    await metricsUtil.render(
      cmd,
      resourceNames,
      mappings,
      [
        `https://${AWS.config.region}.console.aws.amazon.com/lambda/home?region=${AWS.config.region}#/applications/${inputUtil.reverseObfuscatedName(stackName)}?tab=monitoring`,
      ],
      `awscii stack --resource-type ${resourceType} --names ${resourceNames.map(p=>inputUtil.reverseObfuscatedName(p)).join(
        ","
      )} --graph-types "#graphtypes#" --profile ${cmd.profile}`
    );
  });

function wait(ms) {
  // to avoid rate throttling
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms)
    }, ms )
  })
}  
