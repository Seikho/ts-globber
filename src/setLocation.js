var path = require("path");
function setLocation(location) {
    var args = process.argv.slice(2);
    // Default to CWD tsconfig.json if nothing is provided
    if (args.length === 0 && !location)
        args[0] = "tsconfig.json";
    // For use as an external module
    if (location)
        this.location = path.resolve(location);
    else {
        var locationArgs = args.join(" ");
        this.location = path.resolve(locationArgs);
    }
    return this.location.indexOf("tsconfig.json") >= 0;
}
module.exports = setLocation;
