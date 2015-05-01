var path = require("path");
function setLocation(tsconfigLocation) {
    // For use as an external module
    this.tsconfigLocation = path.resolve(tsconfigLocation || "tsconfig.json");
    return this.tsconfigLocation.indexOf("tsconfig.json") >= 0;
}
module.exports = setLocation;
