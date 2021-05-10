const asciichart = require("asciichart");

module.exports = {
  NumberOfMessagesSent: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "NumberOfMessagesSent",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "NumberOfMessagesSent",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
  NumberOfMessagesReceived: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "NumberOfMessagesReceived",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "NumberOfMessagesReceived",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
  NumberOfMessagesDeleted: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "NumberOfMessagesDeleted",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "NumberOfMessagesDeleted",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
  ApproximateNumberOfMessagesDelayed: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "ApproximateNumberOfMessagesDelayed",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "ApproximateNumberOfMessagesDelayed",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
  ApproximateNumberOfMessagesNotVisible: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "ApproximateNumberOfMessagesNotVisible",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "ApproximateNumberOfMessagesNotVisible",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
  ApproximateNumberOfMessagesVisible: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "ApproximateNumberOfMessagesVisible",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "ApproximateNumberOfMessagesVisible",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
  ApproximateAgeOfOldestMessage: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "ApproximateAgeOfOldestMessage",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "ApproximateAgeOfOldestMessage",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
  NumberOfEmptyReceives: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "NumberOfEmptyReceives",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "NumberOfEmptyReceives",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
  SentMessageSize: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "SentMessageSize",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/SQS",
            MetricName: "SentMessageSize",
            Dimensions: [{ Name: "QueueName", Value: args }],
          },
        },
      },
    ];
  },
};
