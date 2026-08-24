const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { cidrHas, ipv4ToInt, parseCidr } = require("../src/index.js");

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
});
