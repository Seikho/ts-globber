#!/usr/bin/env node
var update = require("../index");
var recurse = require("../recurse");

if (process.argv.length > 2) {
	var args = process.argv.slice(2);

    if (args[0] === "-r") recurse(process.argv[3] || process.env.PWD);
	else update(args.join(" "));
}
else update();
