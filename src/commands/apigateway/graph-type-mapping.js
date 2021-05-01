const asciichart = require("asciichart");

exports.mappings = {
  "API calls": (args) => {
    return [
      {
        Id: "apicalls",
        Label: "API calls",
        Color: asciichart.yellow,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/ApiGateway",
            MetricName: "Count",
            Dimensions: [{ Name: "ApiName", Value: args.name }, { Name: "Stage", Value: args.stage }],
          },
        },
      },
    ];
  },
  "Latency": (args) => {
    return [
      {
        Id: "latency",
        Label: "Latency",
        Color: asciichart.yellow,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/ApiGateway",
            MetricName: "Latency",
            Dimensions: [{ Name: "ApiName", Value: args.name }, { Name: "Stage", Value: args.stage }],
          },
        },
      },
    ];
  },
  "Integration latency": (args) => {
    return [
      {
        Id: "integrationlatency",
        Label: "Integration latency",
        Color: asciichart.yellow,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/ApiGateway",
            MetricName: "IntegrationLatency",
            Dimensions: [{ Name: "ApiName", Value: args.name }, { Name: "Stage", Value: args.stage }],
          },
        },
      },
    ];
  },
  "4XX error": (args) => {
    return [
      {
        Id: "fourxxerrors",
        Label: "4XX errors",
        Color: asciichart.yellow,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/ApiGateway",
            MetricName: "4XXError",
            Dimensions: [{ Name: "ApiName", Value: args.name }, { Name: "Stage", Value: args.stage }],
          },
        },
      },
    ];
  },
  "5XX error": (args) => {
    return [
      {
        Id: "fivexxerrors",
        Label: "5XX errors",
        Color: asciichart.yellow,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/ApiGateway",
            MetricName: "5XXError",
            Dimensions: [{ Name: "ApiName", Value: args.name }, { Name: "Stage", Value: args.stage }],
          },
        },
      },
    ];
  }
};
