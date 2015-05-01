var glob = require("glob");
var fs = require("fs");
var args = process.argv.slice(2);
var location = args[0];
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
    if (!tsGlob)
        return;
    globCount = tsGlob.length;
    for (var g in tsGlob)
        glob(tsGlob[g], parseGlob);
}
function parseGlob(err, matches) {
    files = files.concat(matches);
    if (++returnCount === globCount)
        applyChanges();
}
function applyChanges() {
    tsconfig["files"] = files;
    var newConfig = JSON.stringify(tsconfig, null, 4);
    fs.writeFile(location, newConfig, function (err) {
        if (err)
            console.log("Failed to update tsconfig.json");
        else
            console.log("Successfully updated tsconfig.json");
    });
}
