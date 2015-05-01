import applyChanges = require("./applyChanges");
export = parseGlob;

function parseGlob(err, matches: string[]) {
	// Add the 'matches' to our file list
	this.files = this.files.concat(matches);
	
	// Once we have all of our results, apply the changes.
	if (++this.returnCount === this.globCount) applyChanges();
}