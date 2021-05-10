const asciichart = require("asciichart");

module.exports = {
    "NumberOfMessagesPublished": (args) => {
      const ts = Math.random().toString().replace(".", "");
      return [
        {
          Id: "published" + ts,
          Label: "NumberOfMessagesPublished",
          Color: asciichart.blue,
          ResourceName: args,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/SNS",
              MetricName: "NumberOfMessagesPublished",
              Dimensions: [
                { Name: "TopicName", Value: args }
              ],
            },
          },
        },
      ];
    },
    "PublishSize": (args) => {
      const ts = Math.random().toString().replace(".", "");
      return [
        {
          Id: "publishsize" + ts,
          Label: "PublishSize",
          Color: asciichart.blue,
          ResourceName: args,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/SNS",
              MetricName: "PublishSize",
              Dimensions: [
                { Name: "TopicName", Value: args }
              ],
            },
          },
        },
      ];
    },
    "SMSSuccessrate": (args) => {
      const ts = Math.random().toString().replace(".", "");
      return [
        {
          Id: "smsrate" + ts,
          Label: "SMSSuccessRate",
          Color: asciichart.blue,
          ResourceName: args,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/SNS",
              MetricName: "SMSSuccessRate",
              Dimensions: [
                { Name: "TopicName", Value: args }
              ],
            },
          },
        },
      ];
    },
    "Delivered": (args) => {
      const ts = Math.random().toString().replace(".", "");
      return [
        {
          Id: "delivered" + ts,
          Label: "Delivered",
          Color: asciichart.blue,
          ResourceName: args,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/SNS",
              MetricName: "NumberOfNotificationsDelivered",
              Dimensions: [
                { Name: "TopicName", Value: args }
              ],
            },
          },
        },
      ];
    },
    "Failed": (args) => {
      const ts = Math.random().toString().replace(".", "");
      return [
        {
          Id: "failed" + ts,
          Label: "Failed",
          Color: asciichart.blue,
          ResourceName: args,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/SNS",
              MetricName: "NumberOfNotificationsFailed",
              Dimensions: [
                { Name: "TopicName", Value: args }
              ],
            },
          },
        },
      ];
    },
  };