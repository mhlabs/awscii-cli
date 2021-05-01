const asciichart = require("asciichart");

exports.mappings = {
  "Read capacity": (args) => {
    return [
      {
        Id: "readcapacity",
        Label: "Consumed",
        Color: asciichart.blue,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "ConsumedReadCapacityUnits",
            Dimensions: [{ Name: "TableName", Value: args }],
          },
        },
      },
      {
        Id: "readcapacityprovisioned",
        Label: "Provisioned",
        Color: asciichart.red,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "ProvisionedReadCapacityUnits",
            Dimensions: [{ Name: "TableName", Value: args }],
          },
        },
      },
    ];
  },
  "Write capacity": (args) => {
    return [
      {
        Id: "writecapacity",
        Label: "Consumed",
        Color: asciichart.blue,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "ConsumedWriteCapacityUnits",
            Dimensions: [{ Name: "TableName", Value: args }],
          },
        },
      },
      {
        Id: "readcapacityprovisioned",
        Label: "Provisioned",
        Color: asciichart.red,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "ProvisionedWriteCapacityUnits",
            Dimensions: [{ Name: "TableName", Value: args }],
          },
        },
      },
    ];
  },
  "Throttled read events": (args) => {
    return [
      {
        Id: "writecapacity",
        Label: "Consumed",
        Color: asciichart.blue,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "ConsumedWriteCapacityUnits",
            Dimensions: [{ Name: "TableName", Value: args }],
          },
        },
      },
      {
        Id: "readcapacityprovisioned",
        Label: "Provisioned",
        Color: asciichart.red,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "ProvisionedWriteCapacityUnits",
            Dimensions: [{ Name: "TableName", Value: args }],
          },
        },
      },
    ];
  },
};
