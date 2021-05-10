const asciichart = require("asciichart");

module.exports = {
  BucketSizeBytes: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "BucketSizeBytes",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/S3",
            MetricName: "BucketSizeBytes",
            Dimensions: [{ Name: "BucketName", Value: args }, { Name: "StorageType", Value: "StandardStorage" }],
          },
        },
      },
    ];
  },
  NumberOfObjects: (args) => {
    const ts = Math.random().toString().replace(".", "");
    return [
      {
        Id: "id" + ts,
        Label: "NumberOfObjects",
        Color: asciichart.blue,
        ResourceName: args,
        MetricStat: {
          Stat: "Sum",
          Period: 60,
          Metric: {
            Namespace: "AWS/S3",
            MetricName: "NumberOfObjects",
            Dimensions: [{ Name: "BucketName", Value: args }, { Name: "StorageType", Value: "StandardStorage" }],
          },
        },
      },
    ];
  },
};
