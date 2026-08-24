#!/usr/bin/env node
const { cidrHas, explain, listCidr, checkMany } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-V" || arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--json") flags.json = true;
    else if (arg === "--explain") flags.explain = true;
    else if (arg === "--many") flags.many = true;
    else if (arg === "--limit") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --limit requires a number");
      flags.limit = next;
      i += 1;
    } else if (arg.startsWith("--limit=")) flags.limit = arg.slice("--limit=".length);
    else if (arg.startsWith("-")) throw new Error(`unknown option: ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function printContains(info, flags) {
  if (flags.json) process.stdout.write(`${JSON.stringify(info, null, 2)}\n`);
  else if (flags.explain) {
    process.stdout.write(
      `${info.inside ? "inside" : "outside"}  ${info.ip} in ${info.cidr}\n` +
      `  network    ${info.network}\n` +
      `  mask       ${info.mask}\n` +
      `  broadcast  ${info.broadcast}\n`,
    );
  } else {
    process.stdout.write(`${info.inside ? "inside" : "outside"}\n`);
  }
}

async function main() {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    return;
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    return;
  }

  const rest = [...positional];
  let command = null;
  if (rest[0] === "contains" || rest[0] === "list") command = rest.shift();

  if (flags.many || command === "many") {
    const cidr = rest[0];
    if (!cidr) fail("usage: cidrhas --many <cidr>");
    const rows = checkMany((await readStdin()).split(/\r?\n/), cidr);
    if (flags.json) process.stdout.write(`${JSON.stringify(rows, null, 2)}\n`);
    else {
      for (const row of rows) {
        const tag = row.error ? `error ${row.error}` : row.inside ? "inside" : "outside";
        process.stdout.write(`${row.ip}  ${tag}\n`);
      }
    }
    process.exit(rows.every((row) => row.inside && !row.error) ? 0 : 1);
    return;
  }

  if (command === "list") {
    const cidr = rest[0];
    if (!cidr) fail("usage: cidrhas list <cidr>");
    const listed = listCidr(cidr, { limit: flags.limit ? Number(flags.limit) : 256 });
    if (flags.json) process.stdout.write(`${JSON.stringify(listed, null, 2)}\n`);
    else {
      process.stdout.write(`network    ${listed.network}\n`);
      process.stdout.write(`broadcast  ${listed.broadcast}\n`);
      process.stdout.write(`count      ${listed.count}${listed.truncated ? ` (showing ${listed.addresses.length})` : ""}\n`);
      for (const ip of listed.addresses) process.stdout.write(`${ip}\n`);
    }
    return;
  }

  if (rest.length !== 2) fail("usage: cidrhas <ipv4> <cidr>");
  const info = flags.explain || flags.json ? explain(rest[0], rest[1]) : { ip: rest[0], cidr: rest[1], inside: cidrHas(rest[0], rest[1]) };
  printContains(info, flags);
  process.exit(info.inside ? 0 : 1);
}

main().catch((err) => fail(err.message));
