import path = require("path");
export = setLocation;

function setLocation(tsconfigLocation?: string) {
	// For use as an external module
	this.tsconfigLocation = path.resolve(tsconfigLocation || "tsconfig.json");
	return this.tsconfigLocation.indexOf("tsconfig.json") >= 0;
}