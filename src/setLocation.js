var path = require("path");
function setLocation(tsconfigLocation) {
    var args = process.argv.slice(2);
    // Default to CWD tsconfig.json if nothing is provided
    if (args.length === 0 && !tsconfigLocation)
        args[0] = "tsconfig.json";
    // For use as an external module
    if (tsconfigLocation)
        this.tsconfigLocation = path.resolve(tsconfigLocation);
    else {
        var locationArgs = args.join(" ");
        this.tsconfigLocation = path.resolve(locationArgs);
    }
    return this.tsconfigLocation.indexOf("tsconfig.json") >= 0;
}
module.exports = setLocation;
