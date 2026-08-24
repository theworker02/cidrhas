# cidrhas

<img src="docs/logo.svg" alt="cidrhas mark" width="96" height="96">

**Exit 0 if an IPv4 address is inside a CIDR, otherwise exit 1.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/cidrhas?display_name=release)
[![npm](https://img.shields.io/npm/v/%40magnexis/cidrhas.svg)](https://www.npmjs.com/package/%40magnexis/cidrhas)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/cidrhas/) · **Source:** [`theworker02/cidrhas`](https://github.com/theworker02/cidrhas) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/cidrhas/releases/tag/v1.0.0) · **npm:** [`@magnexis/cidrhas`](https://www.npmjs.com/package/%40magnexis/cidrhas)

## Why it exists

Allowlists are often written as CIDR. cidrhas is a no-dependency IPv4 membership test for shell scripts.

## Who it is for

Operators writing firewall helpers, webhook allowlists, or local policy checks. IPv6 is out of scope.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm i -g @magnexis/cidrhas
cidrhas --help
```

Package page: https://www.npmjs.com/package/%40magnexis/cidrhas

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/cidrhas.git
cidrhas --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/cidrhas.git
cd cidrhas
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/cidrhas --help
node src/cli.js --help
```

## Quick start

```bash
cidrhas 10.0.0.5 10.0.0.0/8 ; echo $?
cidrhas 8.8.8.8 10.0.0.0/8 ; echo $?
```

Prints 0 then 1.

## CLI reference

```text
cidrhas 1.00 (1.0.0)

Usage:
  cidrhas contains <ipv4> <cidr> [options]
  cidrhas list <cidr> [options]
  cidrhas --many <cidr> < ips.txt
  cidrhas <ipv4> <cidr>

IPv4 only. Exit 0 if the address is inside the CIDR, else 1.

Subcommands:
  contains           Test one address (default when two positionals are given)
  list               Print network, broadcast, count, and addresses (capped)

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             Structured JSON
  --explain          Show network, mask, broadcast, and inside/outside
  --many             Read IPv4 addresses from stdin (one per line) and test
                     each against the given CIDR
  --limit <n>        Max addresses printed by list (default 256)

Exit codes:
  0  address is inside (contains), or list/--many completed
     --many exits 1 if any address is outside or invalid
  1  outside, invalid IPv4/CIDR, or usage error

Examples:
  cidrhas 10.0.0.5 10.0.0.0/8
  cidrhas contains --explain 192.168.1.20 192.168.1.0/24
  cidrhas list --json 10.0.0.0/30
  printf '10.0.0.1\n8.8.8.8\n' | cidrhas --many 10.0.0.0/8
```

Print the same text locally:

```bash
cidrhas --help
cidrhas -h
cidrhas --version
cidrhas -V
```

Expected version output:

```text
1.0.0
```

## Configuration

IPv4 only. `--many` reads addresses from stdin. `list` prints the range (capped).

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Address is inside, or list completed. --many exits 0 only if every address is inside. |
| `1` | Outside, invalid IPv4/CIDR, or usage error. |

## Examples

### Success path

An address inside the CIDR prints inside and exits 0.

```bash
cidrhas 10.0.0.5 10.0.0.0/8
```

```text
inside
```

### Failure path

An address outside the CIDR prints outside and exits 1.

```bash
cidrhas 8.8.8.8 10.0.0.0/8
```

```text
outside
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/cidrhas/](https://theworker02.github.io/cidrhas/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
