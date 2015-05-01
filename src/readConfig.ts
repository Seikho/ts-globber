import glob = require("glob");
import parseGlob = require("./parseGlob");
export = readTsconfig;

function readTsconfig(error, file: string) {
	if (error) return;
	this.tsconfig = JSON.parse(file);
	var tsGlob: string[] = this.tsconfig["filesGlob"];
	
	// If there isn't a filesGlob property, don't continue.
	if (!tsGlob) return;
	
	this.globCount = tsGlob.length;
	for (var g in tsGlob)
		glob(tsGlob[g], parseGlob);
}