const cacheUtil = require("./cache-util");
const sentencer = require("sentencer");

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


  module.exports = {
      reverseObfuscatedName,
      dumpObfuscatedNames, 
      obfuscateName
  }