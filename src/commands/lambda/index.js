const { SingleSignOnCredentials } = require("@mhlabs/aws-sdk-sso");
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
const { arguments, command } = require("commander");
const inquirer = require("inquirer");
const dynamodb = require("../stack/resourceTypes/dynamodb");
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
    "Results get cached indefinitely if there are more than 300 functions in the account. Use this to force cache reload",
    false
  )
  .option("--save [view name]", "Saves the view for future retrieval")
  .description("Browses and visualises Lambda metrics as ASCII diagrams")
  .action(async (cmd) => {
    await handle(cmd);    
  });

async function handle(cmd) {
  authHelper.authenticate(cmd);
  const lambda = new AWS.Lambda();

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

      functionList = functionList.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1
      );
      cacheUtil.save(`functions_${cmd.profile}_${cmd.region}`, functionList);
    } else {
      console.log(
        "Fetched cached functions. Run command with '--nocache' to force reload"
      );
      functionList = cachedFunctions;
    }
  }
  let resourceNames;
  let names;
  if (!cmd.load) {
    resourceNames = resourceNames ||
      (cmd.name ? cmd.name.split(",") : undefined) || [
        await inputUtil.autocomplete("Select function", functionList),
      ];
    names = resourceNames.join(",");
  }

  const renderResult = await metricsUtil.renderOptions(
    {
      cmd: cmd,
      resourceNames: names,
      graphTypeMapping,
      url: (resourceNames || []).map(
        (p) => `https://${AWS.config.region}.console.aws.amazon.com/lambda/home?region=${AWS.config.region}#/functions/${p}?tab=monitoring`
      ),
      quickRunCommand: `awscii lambda --name ${(resourceNames || []).join(
        ","
      )} --graph-types #graphtypes# --profile ${cmd.profile}`
    });

    if (cmd.save) {
      cmd.graphTypes = renderResult.graphTypes;
      await cacheUtil.saveCommand(cmd, "lambda", resourceNames);
    }
}

module.exports = {
  handle
}