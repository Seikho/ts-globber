import glob = require("glob");
import fs = require("fs");
import path = require("path");
import setLocation = require("./src/setLocation");
import readConfig = require("./src/readConfig");
export = updateTsconfig;

var executedFile = path.resolve(process.argv[1]);
if (executedFile === __filename) updateTsconfig(); 

function updateTsconfig(tsconfigFile?: string) {
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