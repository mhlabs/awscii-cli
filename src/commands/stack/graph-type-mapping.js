const asciichart = require("asciichart");

const mappings = {};

mappings["AWS::SNS::Topic"] = require("./resourceTypes/sns");
mappings["AWS::DynamoDB::Table"] = require("./resourceTypes/dynamodb");
mappings["AWS::Lambda::Function"] = require("./resourceTypes/lambda");
mappings["AWS::SQS::Queue"] = require("./resourceTypes/sqs");
mappings["AWS::Events::Rule"] = require("./resourceTypes/events");
module.exports = {
  mappings,
};
