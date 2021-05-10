const inquirer = require("inquirer");
const sentencer = require("sentencer");
const cacheUtil = require("./cache-util");

inquirer.registerPrompt(
  "autocomplete",
  require("inquirer-autocomplete-prompt")
);

async function choices(message, items, type, defaults, pageSize = 5) {
  return (
    await inquirer.prompt({
      type: type,
      name: "item",
      choices: items,
      message: message,
      default: defaults,
      pageSize: pageSize,
      source: function (answersYet, input) {
        if (!input) {
          return items;
        }
        const split = input.split(" ");
        return items.filter((p) => {
          const str = typeof p === "string" ? p : p.name;
          return (
            !str ||
            split.filter((f) => str.toLowerCase().includes(f.toLowerCase()))
              .length === split.length
          );
        });
      },
    })
  ).item;
}
async function text(message, defaultValue) {
  return (
    await inquirer.prompt({
      type: "input",
      name: "text",
      default: defaultValue,
      message: message,
    })
  ).text;
}
async function autocomplete(message, items) {
  return await choices(message, items, "autocomplete", null, 7);
}

async function list(message, items) {
  return await choices(message, items, "list", null, 15);
}

async function checkbox(message, items, defaults) {
  let list = [];
  do {
    list = await choices(message, items, "checkbox", defaults);
  } while (list.length === 0);
  return list;
}

async function prompt(message) {
  return (
    await inquirer.prompt({
      type: "confirm",
      name: "choice",
      default: "Yes",
      message: message,
    })
  ).choice;
}

const obfuscatedNames = {};
function obfuscateName(name, type) {
  if (process.env.AwsciiDemoMode) {
    const randomName = sentencer
      .make(`{{ adjective }}-{{ noun }}-${type}`)
      .toLowerCase();
    obfuscatedNames[name] = randomName;

    return randomName;
  }

  return name;
}

function reverseObfuscatedName(name) {
  if (Object.keys(obfuscatedNames).includes(name)) {
    return obfuscatedNames[name];
  }
  return name;
}

function dumpObfuscatedNames() {
  if (process.env.AwsciiDemoMode) {
    cacheUtil.save("obfuscated", obfuscatedNames);
  }
}

module.exports = {
  autocomplete,
  list,
  checkbox,
  text,
  prompt,
  obfuscateName,
  reverseObfuscatedName,
  dumpObfuscatedNames,
};
