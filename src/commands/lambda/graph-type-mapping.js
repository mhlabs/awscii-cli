const asciichart = require("asciichart");

exports.mappings = {
  Invocations: (args) => {
    return [
      {
        Id: "invocations",
        Label: "Invocations",
        Color: asciichart.blue,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Lambda",
            MetricName: "Invocations",
            Dimensions: [{ Name: "FunctionName", Value: args }],
          },
        },
      },
    ];
  },
  Duration: (args) => {
    return [
      {
        Id: "min",
        Label: "Minimum",
        Color: asciichart.blue,
        MetricStat: {
          Stat: "Minimum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Lambda",
            MetricName: "Duration",
            Dimensions: [{ Name: "FunctionName", Value: args }],
          },
        },
      },
      {
        Id: "avg",
        Label: "Average",
        Color: asciichart.yellow,
        MetricStat: {
          Stat: "Average",
          Period: 60,
          Metric: {
            Namespace: "AWS/Lambda",
            MetricName: "Duration",
            Dimensions: [{ Name: "FunctionName", Value: args }],
          },
        },
      },
      {
        Id: "max",
        Label: "Maximum",
        Color: asciichart.green,
        MetricStat: {
          Stat: "Maximum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Lambda",
            MetricName: "Duration",
            Dimensions: [{ Name: "FunctionName", Value: args }],
          },
        },
      },
    ];
  },
  "Errors": (args) => {
    {
      return [
        {
          Id: "errors",
          Label: "Errors",
          Color: asciichart.red,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "Errors",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
      ];
    }
  },
  "Error count and success rate": (args) => {
    {
      return [
        {
          Id: "errors",
          Label: "Errors",
          Color: asciichart.red,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "Errors",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
        {
          Hidden: true,
          Id: "invocations",
          Label: "Invocations",
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "Invocations",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
        {
          Color: asciichart.green,
          Id: "availability",
          Label: "Success rate (%)",
          Expression: "100 - 100 * errors / MAX([errors, invocations])",
        },
      ];
    }
  },
  "Concurrent executions": (args) => {
    {
      return [
        {
          Id: "concurrentexecutions",
          Label: "Concurrent executions",
          Color: asciichart.blue,
          MetricStat: {
            Stat: "Maximum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "ConcurrentExecutions",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
      ];
    }
  },
  Throttles: (args) => {
    {
      return [
        {
          Id: "throttles",
          Label: "Throttles",
          Color: asciichart.blue,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "Throttles",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
      ];
    }
  },
  "Async delivery failures": (args) => {
    {
      return [
        {
          Id: "destinationDeliveryFailures",
          Label: "DestinationDeliveryFailures",
          Color: asciichart.red,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "DestinationDeliveryFailures",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
        {
          Id: "deadLetterErrors",
          Label: "DeadLetterErrors",
          Color: asciichart.yellow,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "DeadLetterErrors",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
      ];
    }
  },
  IteratorAge: (args) => {
    {
      return [
        {
          Id: "iteratorAge",
          Label: "IteratorAge",
          Color: asciichart.blue,
          MetricStat: {
            Stat: "Maximum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "IteratorAge",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
      ];
    }
  },
  "Concurrent executions": (args) => {
    {
      return [
        {
          Id: "concurrentExecutions",
          Label: "ConcurrentExecutions",
          Color: asciichart.blue,
          MetricStat: {
            Stat: "Maximum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Lambda",
              MetricName: "ConcurrentExecutions",
              Dimensions: [{ Name: "FunctionName", Value: args }],
            },
          },
        },
      ];
    }
  },
};
