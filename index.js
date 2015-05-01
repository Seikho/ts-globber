var fs = require("fs");
var path = require("path");
var readConfig = require("./src/readConfig");
var args = process.argv.slice(2);
// If no argument is provided, assume we're updated the tsconfig.json in the CWD.
if (args.length === 0)
    args[0] = "tsconfig.json";
var location;
var files = [];
var returnCount = 0;
var globCount = 0;
var tsconfig;
if (args.length > 0)
    updateTsconfig();
function updateTsconfig(tsconfigFile) {
    location = path.resolve(tsconfigFile || args.join(" "));
    if (location.indexOf("tsconfig.json") === -1)
        return;
    fs.readFile(location, "utf-8", readConfig);
}
module.exports = updateTsconfig;
