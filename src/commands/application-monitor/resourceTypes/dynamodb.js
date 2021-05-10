const asciichart = require("asciichart");

module.exports = {
  "Latency (Scan)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "latency" + ts,
        Label: "Latency (Scan)",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "SuccessfulRequestLatency",
            Dimensions: [
              { Name: "TableName", Value: args },
              { Name: "Operation", Value: "Scan" },
            ],
          },
        },
      },
    ];
  },
  "Latency (Query)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "latency" + ts,
        Label: "Latency (Query)",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "SuccessfulRequestLatency",
            Dimensions: [
              { Name: "TableName", Value: args },
              { Name: "Operation", Value: "Query" },
            ],
          },
        },
      },
    ];
  },
  "Latency (PutItem)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "latency" + ts,
        Label: "Latency (PutItem)",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "SuccessfulRequestLatency",
            Dimensions: [
              { Name: "TableName", Value: args },
              { Name: "Operation", Value: "PutItem" },
            ],
          },
        },
      },
    ];
  },
  "Latency (GetItem)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "latency" + ts,
        Label: "Latency (GetItem)",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/DynamoDB",
            MetricName: "SuccessfulRequestLatency",
            Dimensions: [
              { Name: "TableName", Value: args },
              { Name: "Operation", Value: "GetItem" },
            ],
          },
        },
      },
    ];
  },
};