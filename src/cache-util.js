const fs = require("fs");
const os = require("os");
const path = require("path");

const settingsPath = path.join(os.homedir(), ".cw-cli");

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

module.exports = {
  save,
  get,
};
