const AWS = require("aws-sdk");
const inputUtil = require("./input-util");
const demoUtil = require("./demo-util");

async function selectResources(stackName, ...types) {
  const cfn = new AWS.CloudFormation();

  let nextToken;
  const resourceList = [];
  do {
    const resources = await cfn
      .listStackResources({ StackName: stackName, NextToken: nextToken })
      .promise();
    resourceList.push(
      ...resources.StackResourceSummaries.filter((p) =>
        types.includes(p.ResourceType)
      ).map((p) => p.PhysicalResourceId.split("/").pop().split(":").pop())
    );
    nextToken = resources.NextToken;
  } while (nextToken);
  return await inputUtil.checkbox(
    "Select resource",
    resourceList.sort().map((p) => {
      return { name: demoUtil.obfuscateName(p, types[0].split("::")[2]), value: p };
    })
  );
}

async function getResourceType(stackName, ...types) {
  const cfn = new AWS.CloudFormation();
  let nextToken;
  const resourceList = [];
  do {
    const resources = await cfn
      .listStackResources({ StackName: stackName, NextToken: nextToken })
      .promise();
    resourceList.push(
      ...resources.StackResourceSummaries.filter((p) =>
        types.includes(p.ResourceType)
      ).map((p) => p.ResourceType)
    );
    nextToken = resources.NextToken;
  } while (nextToken);
  return await inputUtil.list(
    "Select resource type",
    [...new Set(resourceList.sort())].sort()
  );
}

module.exports = {
  selectResources,
  getResourceType,
};
