var fs = require("fs");
function applyChanges() {
    this.tsconfig["files"] = this.files;
    // Compose the new tsconfig.json file
    var newConfig = JSON.stringify(this.tsconfig, null, 4);
    // Replace the existing tsconfig.json file
    fs.writeFile(this.tsconfigLocation, newConfig, function (err) {
        if (err)
            console.log("Failed to update tsconfig.json");
        else
            console.log("Successfully updated tsconfig.json");
    });
}
module.exports = applyChanges;
