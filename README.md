# cidrhas

<img src="docs/logo.svg" alt="cidrhas mark" width="96" height="96">

**Exit 0 if an IPv4 address is inside a CIDR, otherwise exit 1.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/cidrhas?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/cidrhas/) · **Source:** [`theworker02/cidrhas`](https://github.com/theworker02/cidrhas) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/cidrhas/releases/tag/v1.0.0)

## Why it exists

Allowlists are often written as CIDR. cidrhas is a no-dependency IPv4 membership test for shell scripts.

## Who it is for

Operators writing firewall helpers, webhook allowlists, or local policy checks. IPv6 is out of scope.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

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
npx --yes git+https://github.com/theworker02/cidrhas.git --help
node src/cli.js --help
```

## Quick start

```bash
cidrhas 10.0.0.5 10.0.0.0/8 ; echo $?
cidrhas 8.8.8.8 10.0.0.0/8 ; echo $?
```

Prints 0 then 1.

## CLI reference

Synopsis:

```text
cidrhas [options] <ipv4> <cidr>
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `<ipv4>` | Dotted-quad IPv4 address, for example 10.0.0.5 |
| `<cidr>` | IPv4 CIDR, for example 10.0.0.0/8 |

Print the same text locally:

```bash
cidrhas --help
cidrhas --version
```

Expected version output:

```text
1.0.0
```

## Configuration

IPv4 only. Prefix length 0–32. Octets must be 0–255. Network bits are masked; host bits in the CIDR address are ignored.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Address is in the CIDR. |
| `1` | Address is not in the CIDR, or inputs are invalid / missing. |

## Examples

### Success path

```bash
cidrhas 10.0.0.5 10.0.0.0/8
echo exit:$?
```

Exit code is 0. Optional stdout: `inside`.

### Failure path

```bash
cidrhas 8.8.8.8 10.0.0.0/8 ; echo exit:$?
```

Exit code is 1 (`outside`).

Bad input:

```bash
cidrhas not-an-ip 10.0.0.0/8
```

stderr: invalid ipv4. Exit 1.

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
