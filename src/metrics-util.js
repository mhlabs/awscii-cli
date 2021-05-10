const AWS = require("aws-sdk");
const inputUtil = require("./input-util");
const dateUtil = require("./date-util");
const asciichart = require("asciichart");

const colorList = [
  asciichart.red,
  asciichart.green,
  asciichart.yellow,
  asciichart.blue,
  asciichart.magenta,
  asciichart.cyan,
  asciichart.lightgray,
  asciichart.darkgray,
  asciichart.lightred,
  asciichart.lightgreen,
  asciichart.lightyellow,
  asciichart.lightblue,
  asciichart.lightmagenta,
  asciichart.lightcyan,
  asciichart.black,
];

async function render(
  cmd,
  resourceNames,
  graphTypeMapping,
  url,
  quickRunCommand
) {
  const cloudwatch = new AWS.CloudWatch();

  const graphTypes =
    (cmd.graphTypes && cmd.graphTypes.replace(/-/g, " ").split(",")) ||
    (await inputUtil.checkbox(
      "Select graph type",
      Object.keys(graphTypeMapping.mappings)
    ));

  await getMetricDataAndRender(
    graphTypes,
    cmd,
    graphTypeMapping,
    resourceNames,
    cloudwatch
  );

  if (!cmd.name && !cmd.names) {
    console.log(
      "\nRun the following command to get instant access to this graph:"
    );
    console.log(
      quickRunCommand.replace(
        "#graphtypes#",
        graphTypes.join(",").replace(/\s/g, "-")
      )
    );
    console.log(
      `View in browser:\n${Array.isArray(url) ? url.join("\n") : url}`
    );
  }
}

async function getMetricDataAndRender(
  graphTypes,
  cmd,
  graphTypeMapping,
  resourceNames,
  cloudwatch
) {
  if (cmd.watch) {
    //clear console for each refresh
    process.stdout.write("\033c");
  }

  if (!Array.isArray(resourceNames)) {
    resourceNames = [resourceNames];
  }
  for (const graphType of graphTypes) {
    console.log(`\n${graphType} last ${cmd.timespan} minutes:`);
    let graphMetrics = resourceNames
      .map((p) => graphTypeMapping.mappings[graphType](p))
      .flat();
    const hidden = graphMetrics.filter((p) => p.Hidden).map((p) => p.Id);
    let colorIndex = 0;
    const colors = graphMetrics
      .filter((p) => !p.Hidden)
      .map((p) => {
        return {
          color:
            (resourceNames.length > 1 ? colorList[colorIndex++] : p.Color) ||
            asciichart.default,
          id: p.Id,
          label: resourceNames.length > 1 ? p.ResourceName : p.Label,
        };
      });
    for (const query of graphMetrics) {
      delete query.Hidden;
      delete query.Color;
      delete query.ResourceName;
    }
    const metricDataResponse = await cloudwatch
      .getMetricData({
        MetricDataQueries: graphMetrics,
        StartTime: new Date(new Date().getTime() - cmd.timespan * 60 * 1000),
        EndTime: new Date(new Date().getTime()),
        ScanBy: "TimestampAscending",
      })
      .promise();
    const visibleMetrics = metricDataResponse.MetricDataResults.filter(
      (p) => !hidden.includes(p.Id)
    );
    fillEmptyValues(visibleMetrics, cmd.timespan);
    console.log(
      asciichart.plot(
        visibleMetrics.map((p) => p.Values),
        {
          height: 20,
          colors: colors.map((p) => p.color),
        }
      )
    );

    let xAxis = "            └";
    for (let i = cmd.timespan; i >= 0; i -= 10) {
      xAxis += "┬" + (i > 0 ? "─────────" : "");
    }
    console.log(xAxis);
    let xNumbers = "    Minute: ";
    for (let i = cmd.timespan; i >= 0; i -= 10) {
      let minute = (-i).toString();
      minute = minute === "0" ? "now" : minute;
      xNumbers +=
        minute +
        (i > 0 ? " ".repeat(10 - minute.length + (i === 0 ? 1 : 0)) : "");
    }
    console.log(xNumbers);
    console.log(
      "    Legend: " +
        colors.map((p) => p.color + inputUtil.reverseObfuscatedName(p.label)).join(asciichart.default + " | ") +
        asciichart.default
    );

    inputUtil.dumpObfuscatedNames();
  }
}

function fillEmptyValues(metrics, timespan) {
  const now = new Date();
  const minutes = dateUtil.getMinuteRange(
    now.setMinutes(now.getMinutes() - timespan),
    new Date()
  );
  for (const metric of metrics) {
    const timestamps = metric.Timestamps.map((p) => p.toISOString());
    for (index in minutes) {
      if (!timestamps.includes(minutes[index])) {
        metric.Values.splice(index, 0, 0);
      }
    }
  }
}

module.exports = {
  render,
};
