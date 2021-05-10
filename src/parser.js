const fs = require("fs");
const yamlCfn = require("yaml-cfn");
let format = {
  yaml: "yaml",
};
function parse(identifier, str) {
  try {
    const parsed = JSON.parse(str);
    format[identifier] = "json";
    return parsed;
  } catch {
    const parsed = yamlCfn.yamlParse(str);
    format[identifier] = "yaml";
    return parsed;
  }
}
function stringify(identifier, obj) {
  if (format[identifier] === "json") return JSON.stringify(obj, null, 2);
  if (format[identifier] === "yaml")
    return yamlCfn.yamlDump(obj).replace(/!<(.+?)>/g, "$1");
}

function loadTemplate(cmd) {
  try {
    const templateStr = fs.readFileSync(cmd.template);
    return parse("template", templateStr);
  } catch (err) {
    console.log(`Not able to parse ${templateStr} as JSON or YAML.`);
  }
}

module.exports = {
  parse,
  stringify,
  loadTemplate
};
