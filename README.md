# cidrhas


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="cidrhas mark" width="96" height="96">

**Parse IPv4 CIDRs, test membership, inspect ranges, and batch-check addresses with a runtime-neutral API.**

[![JSR](https://jsr.io/badges/@theworker02/cidrhas)](https://jsr.io/@theworker02/cidrhas)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/cidrhas`](https://jsr.io/@theworker02/cidrhas) Ã‚Â· **Site:** [GitHub Pages](https://theworker02.github.io/cidrhas/) Ã‚Â· **Source:** [`theworker02/cidrhas`](https://github.com/theworker02/cidrhas)

## Add from JSR

```bash
deno add jsr:@theworker02/cidrhas
```

```ts
import { cidrHas, explain, listCidr } from "@theworker02/cidrhas";

console.log(cidrHas("10.0.0.5", "10.0.0.0/8"));
console.log(explain("192.168.1.20", "192.168.1.0/24"));
console.log(listCidr("10.0.0.0/30"));
```

## Public API

- `cidrHas(ip, cidr)` Ã¢â‚¬â€ containment test.
- `parseCidr(cidr)` Ã¢â‚¬â€ network, mask, broadcast, and address count.
- `explain(ip, cidr)` Ã¢â‚¬â€ detailed containment result.
- `listCidr(cidr, options)` Ã¢â‚¬â€ enumerate a bounded range.
- `checkMany(ips, cidr)` Ã¢â‚¬â€ batch checks.
- `ipv4ToInt()` / `intToIpv4()` Ã¢â‚¬â€ IPv4 numeric conversions.
- `PACKAGE`, `ParsedCidr`, `ExplainResult`, `CidrList`, `CheckResult` Ã¢â‚¬â€ documented JSR symbols.

## CLI from source

```bash
git clone https://github.com/theworker02/cidrhas.git
cd cidrhas
node src/cli.js 10.0.0.5 10.0.0.0/8
```

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/cidrhas`, published with GitHub Actions trusted publishing.

## License

[MIT](LICENSE) Ã‚Â© 2026 theworker02

## Status

cidrhas is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).
