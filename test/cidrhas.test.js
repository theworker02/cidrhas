const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const { cidrHas, ipv4ToInt, parseCidr, explain, listCidr, checkMany } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

describe("cidrhas", () => {
  it("accepts addresses inside an IPv4 CIDR", () => {
    assert.equal(cidrHas("10.0.0.5", "10.0.0.0/8"), true);
    assert.equal(cidrHas("192.168.1.20", "192.168.1.0/24"), true);
    assert.equal(cidrHas("127.0.0.1", "127.0.0.1/32"), true);
    assert.equal(parseCidr("10.0.0.0/8").bits, 8);
    assert.equal(ipv4ToInt("10.0.0.5") > 0, true);
  });

  it("rejects addresses outside the CIDR and invalid input", () => {
    assert.equal(cidrHas("8.8.8.8", "10.0.0.0/8"), false);
    assert.equal(cidrHas("10.0.0.1", "10.0.0.0/32"), false);
    assert.throws(() => cidrHas("999.0.0.1", "10.0.0.0/8"), /invalid ipv4/);
    assert.throws(() => cidrHas("10.0.0.1", "10.0.0.0/99"), /invalid cidr/);
  });

  it("explains and lists a small range", () => {
    const info = explain("10.0.0.2", "10.0.0.0/30");
    assert.equal(info.inside, true);
    assert.equal(info.network, "10.0.0.0");
    assert.equal(info.broadcast, "10.0.0.3");
    const listed = listCidr("10.0.0.0/30");
    assert.deepEqual(listed.addresses, ["10.0.0.0", "10.0.0.1", "10.0.0.2", "10.0.0.3"]);
    const many = checkMany(["10.0.0.1", "8.8.8.8"], "10.0.0.0/8");
    assert.equal(many[0].inside, true);
    assert.equal(many[1].inside, false);
  });

  it("CLI --explain --json and --many", () => {
    const inside = spawnSync(process.execPath, [cli, "contains", "--explain", "--json", "10.0.0.5", "10.0.0.0/8"], {
      encoding: "utf8",
    });
    assert.equal(inside.status, 0);
    assert.equal(JSON.parse(inside.stdout).inside, true);
    const outside = spawnSync(process.execPath, [cli, "8.8.8.8", "10.0.0.0/8"], { encoding: "utf8" });
    assert.equal(outside.status, 1);
    assert.match(outside.stdout, /outside/);
    const many = spawnSync(process.execPath, [cli, "--many", "10.0.0.0/8"], {
      encoding: "utf8",
      input: "10.0.0.1\n8.8.8.8\n",
    });
    assert.equal(many.status, 1);
    assert.match(many.stdout, /inside/);
    assert.match(many.stdout, /outside/);
  });
});
