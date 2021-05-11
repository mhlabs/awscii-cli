const { SingleSignOnCredentials } = require("@mhlabs/aws-sdk-sso");
const program = require("commander");
const authHelper = require("../../auth-helper");
const AWS = require("aws-sdk");
const inputUtil = require("../../input-util");
const metricsUtil = require("../../metrics-util");
const graphTypeMapping = require("./graph-type-mapping");
require("@mhlabs/aws-sdk-sso");
const { Spinner } = require("cli-spinner");
const spinner = new Spinner();
spinner.setSpinnerString("⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈");

program
  .command("dynamodb")
  .alias("ddb")
  .option("--name [tableName]", "Name of the table. Defaults to UI prompt")
  .option("--graph-types [graphName]", "Type(s) of the graph. Comma separated")
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
  .description("Browses and visualises DynamoDB metrics as ASCII diagrams")
  .action(async (cmd) => {
    authHelper.authenticate(cmd);
    const dynamodb = new AWS.DynamoDB();

    let nextMarker = null;
    let tableList = [];
    if (!cmd.tableName) {
      spinner.start();
      const tables = await dynamodb.listTables().promise();
      tableList.push(...tables.TableNames);
      spinner.stop();

      tableList = tableList.sort((a, b) =>
        a.toLowerCase() > b.toLowerCase() ? 1 : -1
      );
    }
    const resourceName =
      cmd.name ||
      (await inputUtil.autocomplete("Select table", tableList));

    await metricsUtil.render(
      cmd,
      resourceName,
      graphTypeMapping,
      `https://${AWS.config.region}.console.aws.amazon.com/dynamodb/home?region=${AWS.config.region}#tables:selected=${resourceName};tab=metrics`,
      `awscii dynamodb --name ${resourceName} --graph-types #graphtypes# --profile ${cmd.profile}`
    );
  });

