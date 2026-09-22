# cidrhas


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="cidrhas mark" width="96" height="96">

**Parse IPv4 CIDRs, test membership, inspect ranges, and batch-check addresses with a runtime-neutral API.**

[![JSR](https://jsr.io/badges/@theworker02/cidrhas)](https://jsr.io/@theworker02/cidrhas)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)

**Package:** [`@theworker02/cidrhas`](https://jsr.io/@theworker02/cidrhas)  ·  **Site:** [GitHub Pages](https://theworker02.github.io/cidrhas/)  ·  **Source:** [`theworker02/cidrhas`](https://github.com/theworker02/cidrhas)

## Purpose

Parse IPv4 CIDR notation, test whether addresses fall inside a network, explain network/mask/broadcast metadata, and batch-check many IPs from stdin. Designed for scripts, CI guards, and teaching networking without pulling in a heavy IP library.

## Highlights

- IPv4-only parsing with containment, explain, and bounded list operations.
- Batch mode reads one address per line from stdin (`--many`).
- Structured JSON output for automation (`--json`).
- Pure functions with documented TypeScript types on JSR.


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

- `cidrHas(ip, cidr)` — containment test.
- `parseCidr(cidr)` — network, mask, broadcast, and address count.
- `explain(ip, cidr)` — detailed containment result.
- `listCidr(cidr, options)` — enumerate a bounded range.
- `checkMany(ips, cidr)` — batch checks.
- `ipv4ToInt()` / `intToIpv4()` — IPv4 numeric conversions.
- `PACKAGE`, `ParsedCidr`, `ExplainResult`, `CidrList`, `CheckResult` — documented JSR symbols.

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/cidrhas`, published with GitHub Actions trusted publishing.



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/cidrhas.git
cd cidrhas
node src/cli.js 10.0.0.5 10.0.0.0/8
node src/cli.js contains --explain 192.168.1.20 192.168.1.0/24
node src/cli.js list --json 10.0.0.0/30
printf '10.0.0.1\n8.8.8.8\n' | node src/cli.js --many 10.0.0.0/8
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- IPv6 and dual-stack scenarios are not supported.
- `listCidr` caps printed addresses (CLI default limit 256) to avoid huge outputs.
- Does not perform routing-table lookups or DNS; inputs must be literal IPv4 strings.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/cidrhas)
- [Project site](https://theworker02.github.io/cidrhas/)
- [Source repository](https://github.com/theworker02/cidrhas)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

cidrhas is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).

