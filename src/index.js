function ipv4ToInt(ip) {
  const parts = String(ip).split(".");
  if (parts.length !== 4) throw new Error("invalid ipv4");
  let n = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) throw new Error("invalid ipv4");
    const octet = Number(part);
    if (!Number.isInteger(octet) || octet < 0 || octet > 255) {
      throw new Error("invalid ipv4");
    }
    n = (n << 8) + octet;
  }
  return n >>> 0;
}

function parseCidr(cidr) {
  const [ip, bitsRaw] = String(cidr).split("/");
  if (ip == null || bitsRaw == null) throw new Error("invalid cidr");
  const bits = Number(bitsRaw);
  if (!Number.isInteger(bits) || bits < 0 || bits > 32) throw new Error("invalid cidr");
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  const net = ipv4ToInt(ip) & mask;
  return { net, mask, bits };
}

function cidrHas(ip, cidr) {
  const { net, mask } = parseCidr(cidr);
  return (ipv4ToInt(ip) & mask) === net;
}

module.exports = { ipv4ToInt, parseCidr, cidrHas };
