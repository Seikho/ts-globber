import fs = require("fs");
import update = require("./index");
import path = require("path");
export = recurse;

function recurse(location: string) {
    fs.readdir(location, handler);

    function handler(err, files: string[]) {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(file => {

            fs.stat(file, (err, stat) => {
                if (err) return;
                if (!stat.isDirectory()) return;
                
                fs.readdir(
                    path.join(location, file),
                    (err, files) => tryGlob(err, files, file));

            });

        });
    }

    function tryGlob(err, files: string[], tsPath: string) {
        var hasTsconfig = files.some(f => f.toLowerCase() === "tsconfig.json");
        if (!hasTsconfig) return;

        update(path.join(location, tsPath, "tsconfig.json"));
    }

}



