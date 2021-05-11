const { SingleSignOnCredentials } = require("@mhlabs/aws-sdk-sso");
const AWS = require("aws-sdk");

function authenticate(cmd) {
  if (process.env.HOME === "/home/cloudshell-user") {
    return;
  }
  AWS.config.region = cmd.region || process.env.AWS_REGION || AWS.config.region;
  process.env.AWS_PROFILE = cmd.profile || process.env.AWS_PROFILE;

  AWS.config.credentialProvider.providers.unshift(
    new SingleSignOnCredentials()
  );
}

module.exports = {
  authenticate,
};
