#!/usr/bin/env node
const { cidrHas } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

const positional = args.filter((a) => !a.startsWith("-"));
if (positional.length !== 2) {
  process.stderr.write("usage: cidrhas <ipv4> <cidr>\n");
  process.exit(1);
}

try {
  const inside = cidrHas(positional[0], positional[1]);
  process.stdout.write(`${inside ? "inside" : "outside"}\n`);
  process.exit(inside ? 0 : 1);
} catch (err) {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
}
