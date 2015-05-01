import glob = require("glob");
import fs = require("fs");
import path = require("path");
import readConfig = require("./src/readConfig");
export = updateTsconfig;

var args = process.argv.slice(2);

// If no argument is provided, assume we're updated the tsconfig.json in the CWD.
if (args.length === 0) args[0] = "tsconfig.json";

var location: string;
var files: string[] = [];
var returnCount = 0;
var globCount = 0;
var tsconfig: any;
if (args.length > 0) updateTsconfig();

function updateTsconfig(tsconfigFile?: string) {
	location = path.resolve(tsconfigFile || args.join(" "));
	if (location.indexOf("tsconfig.json") === -1) return;
	fs.readFile(location, "utf-8", readConfig);
}