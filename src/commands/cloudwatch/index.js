const { SingleSignOnCredentials } = require("@mhlabs/aws-sdk-sso");
const program = require("commander");
const AWS = require("aws-sdk");
const inputUtil = require("../../input-util");
const cacheUtil = require("../../cache-util");

const metricsUtil = require("../../metrics-util");
require("@mhlabs/aws-sdk-sso");
const { Spinner } = require("cli-spinner");
const spinner = new Spinner();
spinner.setSpinnerString("⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈");

program
  .command("cloudwatch")
  .alias("cw")
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
    authenticate(cmd);
    const cloudWatch = new AWS.CloudWatch();
    let nextMarker = null;
    let resourceList = [];

    if (!cmd.name) {
      resourceList = cacheUtil.get(`metrics_${cmd.profile}_${cmd.region}`);
      if (!resourceList) {
        resourceList = [];
        console.log(
          "Loading metrics. This might take a while the first time when populating the local cache"
        );

        spinner.start();
        do {
          const metrics = await cloudWatch
            .listMetrics({ NextToken: nextMarker, RecentlyActive: "PT3H" })
            .promise();

          resourceList.push(...metrics.Metrics);
          nextMarker = metrics.NextToken;
        } while (nextMarker);
        spinner.stop();
        cacheUtil.save(`metrics_${cmd.profile}_${cmd.region}`, resourceList);
      }
      const namespacesArray = new Set(resourceList.map((p) => p.Namespace));
      const namespace = await inputUtil.autocomplete(
        "Select namespace",
        [...namespacesArray].sort()
      );
      console.log(resourceList.filter((p) => p.Namespace === namespace));
      const metrics = resourceList
        .filter((p) => p.Namespace === namespace)
        .map((p) => p.MetricName);
      const metric = await inputUtil.autocomplete(
        "Select metric",
        [...new Set(metrics)].sort()
      );
    }
  });

function authenticate(cmd) {
  AWS.config.region = cmd.region || process.env.AWS_REGION || AWS.config.region;
  process.env.AWS_PROFILE = cmd.profile || process.env.AWS_PROFILE;
  AWS.config.credentialProvider.providers.unshift(
    new SingleSignOnCredentials()
  );
}
