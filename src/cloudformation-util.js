const AWS = require("aws-sdk");
const inputUtil = require("./input-util");
const dateUtil = require("./date-util");
const parser = require("./parser");
const asciichart = require("asciichart");

async function selectResources(cmd, ...types) {
  const cfn = new AWS.CloudFormation();

  const resources = await cfn
    .listStackResources({ StackName: cmd.stackName })
    .promise();
  return await inputUtil.checkbox(
    "Select resource",
    resources.StackResourceSummaries.filter((p) =>
      types.includes(p.ResourceType)
    ).map((p) => p.PhysicalResourceId)
  );
}

module.exports = {
  selectResources,
};
