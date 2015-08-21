var glob = require("glob");
var parseGlob = require("./parseGlob");
function readTsconfig(error, file) {
    if (error)
        return;
    this.tsconfig = JSON.parse(file);
    var tsGlob = this.tsconfig["filesGlob"];
    // If there isn't a filesGlob property, don't continue.
    if (!tsGlob)
        return;
    this.globCount = tsGlob.length;
    for (var g in tsGlob)
        glob(tsGlob[g], parseGlob);
}
function tryParse(file) {
    try {
        return JSON.parse(file.trim());
    }
    catch (ex) {
        console.log("Failed to parse tsconfig.json as JSON");
        console.log(ex.message.toString());
        throw new Error("Failed to parse tsconfig.json as JSON");
    }
}
module.exports = readTsconfig;
