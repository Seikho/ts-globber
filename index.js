var fs = require("fs");
var path = require("path");
var setLocation = require("./src/setLocation");
var readConfig = require("./src/readConfig");
var executedFile = path.resolve(process.argv[1]);
if (executedFile === __filename)
    updateTsconfig();
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
    console.log(this.tsconfigLocation);
    fs.readFile(this.tsconfigLocation, "utf-8", readConfig);
}
module.exports = updateTsconfig;
