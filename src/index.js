var glob = require("glob");
var fs = require("fs");
var path = require("path");
var args = process.argv.slice(2);
// If no argument is provided, assume we're updated the tsconfig.json in the CWD.
if (args.length === 0)
    args[0] = "tsconfig.json";
var location = path.resolve(args.join(" "));
var files = [];
var returnCount = 0;
var globCount = 0;
var tsconfig;
updateTsconfig();
function updateTsconfig() {
    if (location.indexOf("tsconfig.json") === -1)
        return;
    fs.readFile(location, "utf-8", readTsconfig);
}
function readTsconfig(error, file) {
    if (error)
        return;
    tsconfig = JSON.parse(file);
    var tsGlob = tsconfig["filesGlob"];
    // If there isn't a filesGlob property, don't continue.
    if (!tsGlob)
        return;
    globCount = tsGlob.length;
    for (var g in tsGlob)
        glob(tsGlob[g], parseGlob);
}
function parseGlob(err, matches) {
    // Add the 'matches' to our file list
    files = files.concat(matches);
    // Once we have all of our results, apply the changes.
    if (++returnCount === globCount)
        applyChanges();
}
function applyChanges() {
    tsconfig["files"] = files;
    // Compose the new tsconfig.json file
    var newConfig = JSON.stringify(tsconfig, null, 4);
    // Replace the existing tsconfig.json file
    fs.writeFile(location, newConfig, function (err) {
        if (err)
            console.log("Failed to update tsconfig.json");
        else
            console.log("Successfully updated tsconfig.json");
    });
}
