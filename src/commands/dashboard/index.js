const { SingleSignOnCredentials } = require("@mhlabs/aws-sdk-sso");
const program = require("commander");
const AWS = require("aws-sdk");
const inputUtil = require("../../input-util");
var asciichart = require("asciichart");
require("@mhlabs/aws-sdk-sso");
process.env.AWS_SDK_LOAD_CONFIG = 1;
AWS.config.credentialProvider.providers.unshift(new SingleSignOnCredentials());

program
  .command("dashboard")
  .alias("d")
  .option(
    "--region [region]",
    "AWS region. Defaults to environment variable AWS_REGION"
  )
  .option(
    "--profile [profile]",
    "AWS profile. Defaults to environment variable AWS_PROFILE"
  )
  .description(
    "Browses and ascii-visualises CloudWatch dashboards in an account"
  )
  .action(async (cmd) => {
    authenticate(cmd);
    const cloudwatch = new AWS.CloudWatch();
    const dashboards = await cloudwatch.listDashboards().promise();
    const dashboardName = await inputUtil.list(
      "Select dashboard",
      dashboards.DashboardEntries.map((p) => p.DashboardName)
    );
    const dashboardResponse = await cloudwatch
      .getDashboard({ DashboardName: dashboardName })
      .promise();

    const dashboard = JSON.parse(dashboardResponse.DashboardBody);
    const widgets = dashboard.widgets.filter((p) => p.type !== "text");
    for (const widget of widgets) {
      for (const metricList of widget.properties.metrics) {
        for (const metric of metricList.filter((p) => p.expression)) {
          const metricDataResponse = await cloudwatch
            .getMetricData({
              MetricDataQueries: [
                {
                  Id: metric.id,
                  Expression: metric.expression,
                },
              ],
              StartTime: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
              EndTime: new Date(new Date().getTime()),
            })
            .promise();

          for (const result of metricDataResponse.MetricDataResults) {
            console.log(widget.properties.title);
            console.log(
              asciichart.plot(result.Values.reverse(), {
                height: 10,
                colors: [asciichart.red],
              })
            );
          }
        }
      }
    }
  });


function authenticate(cmd) {
  AWS.config.region = cmd.region || process.env.AWS_REGION;
  process.env.AWS_PROFILE = cmd.profile || process.env.AWS_PROFILE;
}
