const asciichart = require("asciichart");

exports.mappings = {
  "GetRecords — sum (MB/s)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "e1" + ts,
        Label: "Maximum GetRecords Limit",
        Color: asciichart.blue,
        ResourceName: args,
        Expression: "1 * 2 * IF(m0" + ts + ", 1, 1)", Label: "Maximum GetRecords Limit", Id: "e1", Color: asciichart.yellow
      },
      {
        Id: "e2" + ts,
        Label: "GetRecords - sum (MB/s)",
        Color: asciichart.green,
        ResourceName: args,
        Expression: `m0${ts}/1024/1024/PERIOD(m0${ts})`,
      },
      {
        Hidden: true,
        Id: "m0" + ts, Label: "GetRecords.Bytes", Color: asciichart.green,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Kinesis",
            MetricName: "GetRecords.Bytes",
            Dimensions: [
              {
                Name: "StreamName",
                Value: args,
              },
            ],
          },
        }
      }
    ];
  },
  "GetRecords iterator age — maximum (Milliseconds)": (args) => {
    const ts = Math.random().toString().replace(".", "");;
    // [ "AWS/Kinesis", "GetRecords.IteratorAgeMilliseconds", "StreamName", "address-stream-stream", { "id": "m1", "visible": true } ]
    return [
      {
        Id: "max" + ts,
        Label: "Maximum",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Maximum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Kinesis",
            MetricName: "GetRecords.IteratorAgeMilliseconds",
            Dimensions: [{ Name: "StreamName", Value: args }],
          },
        },
      },
    ];
  },
  "GetRecords latency — average (Milliseconds)": (args) => {
    {
      const ts = Math.random().toString().replace(".", "");;
      return [
        {
          Id: "latency" + ts,
          Label: "GetRecords.Latency",
          Color: asciichart.blue,
          ResourceName: args,
          MetricStat: {
            Stat: "Average",
            Period: 60,
            Metric: {
              Namespace: "AWS/Kinesis",
              MetricName: "GetRecords.Latency",
              Dimensions: [{ Name: "StreamName", Value: args }],
            },
          },
        },
      ];
    }
  },
  "GetRecords — sum (Count)": (args) => {
    {
      const ts = Math.random().toString().replace(".", "");;
      return [
        {
          Id: "sum" + ts,
          Label: "GetRecords.Records",
          Color: asciichart.blue,
          ResourceName: args,
          MetricStat: {
            Stat: "Sum",
            Period: 60,
            Metric: {
              Namespace: "AWS/Kinesis",
              MetricName: "GetRecords.Records",
              Dimensions: [{ Name: "StreamName", Value: args }],
            },
          },
        },
      ];
    }
  },
  "GetRecords success — average (Percent)": (args) => {
    {
      const ts = Math.random().toString().replace(".", "");;
      return [
        {
          Id: "avg" + ts,
          Label: "GetRecords.Success",
          Color: asciichart.blue,
          ResourceName: args,
          MetricStat: {
            Stat: "Average",
            Period: 60,
            Metric: {
              Namespace: "AWS/Kinesis",
              MetricName: "GetRecords.Success",
              Dimensions: [{ Name: "StreamName", Value: args }],
            },
          },
        },
      ];
    }
  }, "Incoming data — sum (MB/s)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "e1" + ts,
        Label: "Maximum GetRecords Limit",
        Color: asciichart.blue,
        ResourceName: args,
        Expression: `1 * 1 * IF(m5${ts}, 1, 1)`, Label: "Incoming Data Limit", Id: "e6", Color: asciichart.yellow
      },
      {
        Id: "e2" + ts,
        Label: "Incoming data - sum (MB/s)",
        Color: asciichart.green,
        ResourceName: args,
        Expression: `m5${ts}/1024/1024/PERIOD(m5${ts})`,
      },
      {
        Hidden: true,
        Id: "m5" + ts, Label: "IncomingBytes", Color: asciichart.green,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Kinesis",
            MetricName: "IncomingBytes",
            Dimensions: [
              {
                Name: "StreamName",
                Value: args,
              },
            ],
          },
        }
      }
    ];
  },
  "PutRecord — sum (MB/s)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "e1" + ts,
        Label: "Maximum GetRecords Limit",
        Color: asciichart.blue,
        ResourceName: args,
        Expression: `m7${ts}/1024/1024/PERIOD(m7${ts})`, Label: "Incoming Data Limit", Id: "e6", Color: asciichart.yellow
      },
      {
        Hidden: true,
        Id: "m7" + ts, Label: "PutRecord - sum (MB/s)", Color: asciichart.green,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Kinesis",
            MetricName: "PutRecord.Bytes",
            Dimensions: [
              {
                Name: "StreamName",
                Value: args,
              },
            ],
          },
        }
      }
    ];
  },
  "Incoming data — sum (Count)": (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "e1" + ts,
        Label: "Maximum GetRecords Limit",
        Color: asciichart.blue,
        ResourceName: args,
        Expression: `1000 * PERIOD(m6${ts}) * IF(m6${ts}, 1, 1)`, Label: "Incoming records Limit", Id: "e6", Color: asciichart.yellow
      },
      {
        Hidden: true,
        Id: "m6" + ts, Label: "IncomingRecords", Color: asciichart.green,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/Kinesis",
            MetricName: "IncomingRecords",
            Dimensions: [
              {
                Name: "StreamName",
                Value: args,
              },
            ],
          },
        }
      }
    ];
  }
};
