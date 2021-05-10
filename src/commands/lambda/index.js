const { SingleSignOnCredentials } = require("@mhlabs/aws-sdk-sso");
const program = require("commander");
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
  .command("lambda")
  .alias("l")
  .option(
    "--name [functionName]",
    "Name(s) of the function(s). Defaults to UI prompt"
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
  .description("Browses and visualises Lambda metrics as ASCII diagrams")
  .action(async (cmd) => {
    authenticate(cmd);
    const lambda = new AWS.Lambda();
    const cloudwatch = new AWS.CloudWatch();

    let nextMarker = null;
    let functionList = [];

    if (!cmd.name) {
      const functionCount = await lambda.getAccountSettings().promise();
      const cachedFunctions = cacheUtil.get(
        `functions_${cmd.profile}_${cmd.region}`
      );
      if (functionCount < 500 || !cachedFunctions || cmd.nocache) {
        spinner.start();
        do {
          const functions = await lambda
            .listFunctions({ Marker: nextMarker, MaxItems: 50 })
            .promise();
          functionList.push(...functions.Functions.map((p) => p.FunctionName));
          nextMarker = functions.NextMarker;
          spinner.setSpinnerTitle(
            `Loaded ${functionList.length} of ${functionCount.AccountUsage.FunctionCount} functions`
          );
        } while (nextMarker);
        spinner.stop();

        functionList = functionList.sort((a, b) =>
          a.toLowerCase() > b.toLowerCase() ? 1 : -1
        );
        cacheUtil.save(`functions_${cmd.profile}_${cmd.region}`, functionList);
      } else {
        console.log(
          "Fetched cached functions. Run command with '--cache false' to force reload"
        );
        functionList = cachedFunctions;
      }
    }
    let resourceNames;
    resourceNames = resourceNames ||
      (cmd.name ? cmd.name.split(",") : undefined) || [
        await inputUtil.autocomplete("Select function", functionList),
      ];
    await metricsUtil.render(
      cmd,
      resourceNames,
      graphTypeMapping,
      resourceNames.map(
        (p) =>
          `https://${AWS.config.region}.console.aws.amazon.com/lambda/home?region=${AWS.config.region}#/functions/${p}?tab=monitoring`
      ),
      `awscii lambda --name ${resourceNames.join(",")} --graph-types #graphtypes# --profile ${cmd.profile}`
    );
  });
function authenticate(cmd) {
  AWS.config.region = cmd.region || process.env.AWS_REGION || AWS.config.region;
  process.env.AWS_PROFILE = cmd.profile || process.env.AWS_PROFILE;
  AWS.config.credentialProvider.providers.unshift(
    new SingleSignOnCredentials()
  );
}
