/* @ts-self-types="./mod.d.ts" */

export const PACKAGE = Object.freeze({ name: "@theworker02/cidrhas", version: "1.1.0", runtime: "universal", registry: "jsr" });

export function ipv4ToInt(ip) {
  const parts = String(ip).split(".");
  if (parts.length !== 4) throw new Error("invalid ipv4");
  let n = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) throw new Error("invalid ipv4");
    const octet = Number(part);
    if (!Number.isInteger(octet) || octet < 0 || octet > 255) throw new Error("invalid ipv4");
    n = (n << 8) + octet;
  }
  return n >>> 0;
}

export function intToIpv4(n) {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

export function parseCidr(cidr) {
  const [ip, bitsRaw] = String(cidr).split("/");
  if (ip == null || bitsRaw == null) throw new Error("invalid cidr");
  const bits = Number(bitsRaw);
  if (!Number.isInteger(bits) || bits < 0 || bits > 32) throw new Error("invalid cidr");
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  const net = ipv4ToInt(ip) & mask;
  const broadcast = (net | (~mask >>> 0)) >>> 0;
  return { net, mask, bits, network: intToIpv4(net), broadcast: intToIpv4(broadcast), count: 2 ** (32 - bits) };
}

export function cidrHas(ip, cidr) {
  const { net, mask } = parseCidr(cidr);
  return (ipv4ToInt(ip) & mask) === net;
}

export function explain(ip, cidr) {
  const parsed = parseCidr(cidr);
  const addr = ipv4ToInt(ip);
  return { ip, cidr, inside: (addr & parsed.mask) === parsed.net, network: parsed.network, broadcast: parsed.broadcast, bits: parsed.bits, mask: intToIpv4(parsed.mask), address: intToIpv4(addr) };
}

export function listCidr(cidr, { limit = 256 } = {}) {
  const parsed = parseCidr(cidr);
  const max = Math.min(parsed.count, limit);
  const addresses = [];
  for (let i = 0; i < max; i += 1) addresses.push(intToIpv4((parsed.net + i) >>> 0));
  return { ...parsed, truncated: parsed.count > max, addresses };
}

export function checkMany(ips, cidr) {
  return ips.map((ip) => {
    const trimmed = ip.trim();
    if (!trimmed) return null;
    try { return { ip: trimmed, inside: cidrHas(trimmed, cidr) }; }
    catch (err) { return { ip: trimmed, inside: false, error: err.message }; }
  }).filter(Boolean);
}
