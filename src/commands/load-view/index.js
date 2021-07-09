const program = require("commander");
const cacheUtil = require("../../cache-util");
const inputUtil = require("../../input-util");
require("@mhlabs/aws-sdk-sso");

const { Spinner } = require("cli-spinner");
const spinner = new Spinner();
spinner.setSpinnerString("⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈");

program
  .command("load-view")
  .alias("load")
  .option(
    "--name [view name]",
    "Name(s) of the saved view. Comma separated if multiple views. Defaults to UI prompt"
  )
  .option(
    "-t --timespan [timespan]",
    "The timespan in minutes. Overrides saved value"
  )
  .option("-r --region [region]", "AWS region. Overrides saved value")
  .option(
    "-p --profile [profile]",
    "AWS profile. Overrides saved value",
    "default"
  )
  .description("Loads a saved view")
  .action(async (cmd) => {
    const views = await cacheUtil.get("views.json");
    if (!views) {
      console.log("Could not load saved views");
      return;
    }
    let selectedViews;
    if (!cmd.name) {
      selectedViews = await inputUtil.checkbox(
        "Select views",
        Object.keys(views).map((p) => {
          return { name: `${p} (${views[p].commandName})`, value: p };
        })
      );
    } else {
      selectedViews = cmd.name.split(",").map((p) => p.trim());
    }

    for (const viewName of selectedViews) {
      const savedCmd = views[viewName];
      if (cmd.timespan) {
        savedCmd.cmd.timespan = cmd.timespan;
      }
      if (savedCmd) {        
        await require(`../${savedCmd.commandName}`).handle(savedCmd.cmd);
      } else {
        console.log(`No such saved view.`);
      }
    }
  });
