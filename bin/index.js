#!/usr/bin/env node
var update = require("../src/index");
var recurse = require("../src/recurse");

if (process.argv.length > 2) {
	var args = process.argv.slice(2);

    if (args[0] === "-r") recurse(process.argv[3] || process.cwd());
	else update(args.join(" "));
}
else update();
