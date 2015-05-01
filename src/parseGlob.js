var applyChanges = require("./applyChanges");
function parseGlob(err, matches) {
    // Add the 'matches' to our file list
    this.files = this.files.concat(matches);
    // Once we have all of our results, apply the changes.
    if (++this.returnCount === this.globCount)
        applyChanges();
}
module.exports = parseGlob;
