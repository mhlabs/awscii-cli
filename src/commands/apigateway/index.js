const { SingleSignOnCredentials } = require("@mhlabs/aws-sdk-sso");
const program = require("commander");
const AWS = require("aws-sdk");
const inputUtil = require("../../input-util");
const cacheUtil = require("../../cache-util");
const graphTypeMapping = require("./graph-type-mapping");
const metricsUtil = require("../../metrics-util");
require("@mhlabs/aws-sdk-sso");
const { Spinner } = require("cli-spinner");
const dateUtil = require("../../date-util");
const spinner = new Spinner();
spinner.setSpinnerString("⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈");

program
  .command("apigateway")
  .alias("api")
  .option("--id [apiName]", "Id of the API. Defaults to UI prompt")
  .option("--stage [staeName]", "Name of the API stage. Defaults to UI prompt")
  .option("--graph-types [graphName]", "Type(s) of the graph. Comma separated")
  .option("-t --timespan [timespan]", "The timespan in minutes.", 60)
  .option(
    "-r --region [region]",
    "AWS region. Defaults to environment variable AWS_REGION"
  )
  .option(
    "-p --profile [profile]",
    "AWS profile. Defaults to environment variable AWS_PROFILE",
    "default"
  )
  .description("Browses and visualises API Gateway V1 metrics as ASCII diagrams")
  .action(async (cmd) => {
    authenticate(cmd);
    const apiGateway = new AWS.APIGateway();

    let nextMarker = null;
    let resourceList = [];
    if (!cmd.id) {
      spinner.start();
      do {
        const apis = await apiGateway
          .getRestApis({ position: nextMarker })
          .promise();

        resourceList.push(
          ...apis.items.map((p) => {
            return { name: p.name, value: p };
          })
        );
        nextMarker = apis.position;
      } while (nextMarker);
      spinner.stop();

      resourceList = resourceList.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
    }

    if (cmd.id) {
      const api = await apiGateway.getRestApi({restApiId: cmd.id}).promise();
      cmd.name = api.name;
    }

    const resource =
      cmd.name ? {name:cmd.name, id: cmd.id} : undefined ||
      (await inputUtil.autocomplete("Select Rest API", resourceList));
    const stages = await apiGateway
      .getStages({ restApiId: resource.id })
      .promise();
    const stage =
      cmd.stage ||
      (await inputUtil.autocomplete(
        "Select stage",
        stages.item.map((p) => p.stageName)
      ));
    await metricsUtil.render(
      cmd,
      { name: resource.name, stage: stage },
      graphTypeMapping,
      `https://${AWS.config.region}.console.aws.amazon.com/apigateway/home?region=${AWS.config.region}#/apis/${resource.id}/dashboard`,
      `awscii apigateway --id ${resource.id} --stage ${stage} --graph-types #graphtypes# --profile ${cmd.profile}`
    );
  });
function authenticate(cmd) {
  AWS.config.region = cmd.region || process.env.AWS_REGION || AWS.config.region;
  process.env.AWS_PROFILE = cmd.profile || process.env.AWS_PROFILE;
  AWS.config.credentialProvider.providers.unshift(
    new SingleSignOnCredentials()
  );
}
