const fs = require("fs");
const os = require("os");
const path = require("path");
const inputUtil = require("./input-util");

const settingsPath = path.join(os.homedir(), ".awscii-cli");

function save(filename, obj) {
  const settingsFilePath = path.join(settingsPath, filename);
  if (fs.existsSync(settingsFilePath)) {
    const file = fs.readFileSync(settingsFilePath);
    cacheObj = JSON.parse(file.toString());
  } else {
    try {
      fs.mkdirSync(settingsPath);
    } catch (err) {}
  }
  fs.writeFileSync(settingsFilePath, JSON.stringify(obj));
}

function get(filename) {
  const settingsFilePath = path.join(settingsPath, filename);
  if (!fs.existsSync(settingsFilePath)) {
    return null;
  }
  const file = fs.readFileSync(settingsFilePath);
  return JSON.parse(file.toString());
}

async function saveCommand(cmd, commandName, resourceNames) {
  const commands = get("views.json") || {};
  let replace = true;
  const saveAs = cmd.save;
  delete cmd.save;
  delete cmd.nocache;
  if (commands[saveAs]) {
    replace = await inputUtil.prompt("View already exists. Replace?");
  }
  if (resourceNames) {
    cmd.name = resourceNames[0];
    cmd.names = resourceNames;
  }
  if (replace) {
    commands[saveAs] = { commandName, cmd };
    save("views.json", commands);
    console.log("Saved command as " + saveAs);
  }
}

module.exports = {
  saveCommand,
  save,
  get,
};
