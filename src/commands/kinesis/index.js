const { SingleSignOnCredentials } = require("@mhlabs/aws-sdk-sso");
const program = require("commander");
const authHelper = require("../../auth-helper");
const AWS = require("aws-sdk");
const inputUtil = require("../../input-util");
const cacheUtil = require("../../cache-util");
const cloudFormationUtil = require("../../cloudformation-util");
const graphTypeMapping = require("./graph-type-mapping");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
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
  .command("kinesis")
  .alias("k")
  .option(
    "--name [streamName]",
    "Name(s) of the streams(s). Defaults to UI prompt"
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
  .option("--save [view name]", "Saves the view for future retrieval")
  .description("Browses and visualises Lambda metrics as ASCII diagrams")
  .action(async (cmd) => {
    await handle(cmd);
  });

async function handle(cmd) {
  authHelper.authenticate(cmd);
  const kinesis = new AWS.Kinesis();
  kinesis.describeStream({})
  let nextMarker = null;
  let streamList = [];
  if (!cmd.name) {
    const cachedStreams = cacheUtil.get(
      `kinesis_${cmd.profile}_${cmd.region}`
    );

    spinner.start();
    do {
      const streams = await kinesis
        .listStreams({ ExclusiveStartStreamName: nextMarker })
        .promise();
      streamList.push(...streams.StreamNames.map((p) => p));
      nextMarker = streams.ExclusiveStartTagKey;
      spinner.setSpinnerTitle(
        `Loaded ${streamList.length} streams`
      );
    } while (nextMarker);
    spinner.stop();

    streamList = streamList.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1
    );
    cacheUtil.save(`kinesis_${cmd.profile}_${cmd.region}`, streamList);
    console.log(
      "Fetched cached streams. Run command with '--nocache' to force reload"
    );
  }
  let resourceNames;
  let names;
  if (!cmd.load) {
    resourceNames = resourceNames ||
      (cmd.name ? cmd.name.split(",") : undefined) || [
        await inputUtil.autocomplete("Select stream", streamList),
      ];
    names = resourceNames.join(",");
  }
  const renderResult = await metricsUtil.renderOptions(
    {
      cmd: cmd,
      resourceNames: names,
      graphTypeMapping,
      url: (resourceNames || []).map(
        (p) => `https://${AWS.config.region}.console.aws.amazon.com/kinesis/home?region=${AWS.config.region}#/streams/details/${p}/monitoring`
      ),
      quickRunCommand: `awscii kinesis --name ${(resourceNames || []).join(
        ","
      )} --graph-types "#graphtypes#" --profile ${cmd.profile}`
    });

  if (cmd.save) {
    cmd.graphTypes = renderResult.graphTypes;
    await cacheUtil.saveCommand(cmd, "lambda", resourceNames);
  }
}

module.exports = {
  handle
}