var glob = require("glob");
var fs = require("fs");
var path = require("path");
var isRecursive = process.argv[2] === "-r";
function updateTsconfig(tsconfigFile) {
    var location = setLocation(tsconfigFile || null);
    if (!location) {
        console.log("Failed to update tsconfig.json: Could not set location");
        return;
    }
    readConfig(location);
}
function readConfig(location) {
    fs.readFile(location, "utf-8", function (error, file) {
        if (error)
            return;
        var tsconfig;
        try {
            tsconfig = JSON.parse(file);
        }
        catch (ex) {
            console.log("Failed to parse tsconfig.config as JSON");
            console.log(ex.message.toString());
            return;
        }
        var tsGlob = tsconfig["filesGlob"];
        // If there isn't a filesGlob property, don't continue.
        if (!tsGlob)
            return;
        var globCount = tsGlob.length;
        var tsObj = {
            config: tsconfig,
            location: location,
            count: globCount,
            files: [],
            returnCount: 0
        };
        var split = location.split(path.sep);
        var globModule = isRecursive
            ? split[split.length - 2] + "/"
            : "";
        tsObj.module = globModule;
        for (var g in tsGlob) {
            var globLocation = path.join(globModule, tsGlob[g]);
            glob(globLocation, function (err, matches) { return parseGlob(err, matches, tsObj); });
        }
    });
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
function parseGlob(err, matches, tsObj) {
    if (isRecursive) {
        matches = matches.map(function (m) { return m.replace(tsObj.module, ""); });
    }
    // Add the 'matches' to our file list
    tsObj.files = tsObj.files.concat(matches);
    // Once we have all of our results, apply the changes.
    if (++tsObj.returnCount === tsObj.count)
        applyChanges(tsObj);
}
function applyChanges(tsObj) {
    tsObj.config["files"] = tsObj.files;
    // Compose the new tsconfig.json file
    var newConfig = JSON.stringify(tsObj.config, null, 4);
    // Replace the existing tsconfig.json file
    fs.writeFile(tsObj.location, newConfig, function (err) {
        if (err)
            console.log("Failed to update " + tsObj.location);
        else
            console.log("Successfully updated " + tsObj.location);
    });
}
function setLocation(tsconfigLocation) {
    var location = path.resolve(tsconfigLocation || "tsconfig.json");
    return location.indexOf("tsconfig.json") >= 0
        ? location
        : null;
}
module.exports = updateTsconfig;
