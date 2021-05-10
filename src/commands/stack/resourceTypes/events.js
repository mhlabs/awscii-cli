const asciichart = require("asciichart");

module.exports = {
  Invocations: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "Invocations",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Events",
            MetricName: "Invocations",
            Dimensions: [{ Name: "RuleName", Value: args }],
          },
        },
      },
    ];
  },
  FailedInvocations: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "FailedInvocations",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Events",
            MetricName: "FailedInvocations",
            Dimensions: [{ Name: "RuleName", Value: args }],
          },
        },
      },
    ];
  },
  TriggeredRules: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "TriggeredRules",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Events",
            MetricName: "TriggeredRules",
            Dimensions: [{ Name: "RuleName", Value: args }],
          },
        },
      },
    ];
  },
};
