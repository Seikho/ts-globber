var fs = require("fs");
var setLocation = require("./src/setLocation");
var readConfig = require("./src/readConfig");
function updateTsconfig(tsconfigFile) {
    this.tsconfigLocation = "";
    this.files = [];
    this.returnCount = 0;
    this.globCount = 0;
    this.tsconfig = "";
    if (!setLocation(tsconfigFile || null)) {
        console.log("Failed to update tsconfig.json: Could not set location");
        return;
    }
    fs.readFile(this.tsconfigLocation, "utf-8", readConfig);
}
module.exports = updateTsconfig;
