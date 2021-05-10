const asciichart = require("asciichart");

module.exports = {
  Invocations: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "invocations" + ts,
        Label: "Invocations",
        Color: asciichart.blue,
        ResourceName: args,
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
  "Duration (average)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "avg" + ts,
        Label: "Average",
        Color: asciichart.yellow,
        ResourceName: args,
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
    ];
  },
  Errors: (args) => {
    {
      const ts = Math.random().toString().replace(".", "");
      return [
        {
          Id: "errors" + ts,
          Label: "Errors",
          Color: asciichart.red,
          ResourceName: args,
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
  "Concurrent executions": (args) => {
    {
      const ts = Math.random().toString().replace(".", "");
      return [
        {
          Id: "concurrentexecutions" + ts,
          Label: "Concurrent executions",
          Color: asciichart.blue,
          ResourceName: args,
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
      const ts = Math.random().toString().replace(".", "");
      return [
        {
          Id: "throttles" + ts,
          Label: "Throttles",
          Color: asciichart.blue,
          ResourceName: args,
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
  IteratorAge: (args) => {
    {
      const ts = Math.random().toString().replace(".", "");

      return [
        {
          Id: "iteratorAge" + ts,
          Label: "IteratorAge",
          Color: asciichart.blue,
          ResourceName: args,
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
      const ts = Math.random().toString().replace(".", "");

      return [
        {
          Id: "concurrentExecutions" + ts,
          Label: "ConcurrentExecutions",
          Color: asciichart.blue,
          ResourceName: args,
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
