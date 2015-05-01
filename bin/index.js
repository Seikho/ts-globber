#!/usr/bin/env node
var update = require("../index");
if (process.argv.length > 2) {
	var args = process.argv.slice(2);
	update(args.join(" "));
}
else update();
