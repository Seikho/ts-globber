var fs = require("fs");
var update = require("./index");
var path = require("path");
function recurse(location) {
    fs.readdir(location, handler);
    function handler(err, files) {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(function (file) {
            fs.stat(file, function (err, stat) {
                if (err)
                    return;
                if (!stat.isDirectory())
                    return;
                fs.readdir(path.join(location, file), function (err, files) { return tryGlob(err, files, file); });
            });
        });
    }
    function tryGlob(err, files, tsPath) {
        var hasTsconfig = files.some(function (f) { return f.toLowerCase() === "tsconfig.json"; });
        if (!hasTsconfig)
            return;
        update(path.join(location, tsPath, "tsconfig.json"));
    }
}
module.exports = recurse;
