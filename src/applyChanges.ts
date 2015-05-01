import fs = require("fs");
export = applyChanges;

function applyChanges() {
	this.tsconfig["files"] = this.files;
	
	// Compose the new tsconfig.json file
	var newConfig = JSON.stringify(this.tsconfig, null, 4);
	
	// Replace the existing tsconfig.json file
	fs.writeFile(this.location, newConfig, (err) => {
		if (err) console.log("Failed to update tsconfig.json");
		else console.log("Successfully updated tsconfig.json");
	});
}