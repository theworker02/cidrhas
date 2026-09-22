# Buyer evaluation â€” cidrhas

## Goal

In 15â€“45 minutes, verify the Product builds or runs as documented and that proprietary notices are present.

## Steps

1. Confirm root `LICENSE` is proprietary and `ACQUISITION.md` exists.
2. Skim `README.md` install/run claims.
3. Execute:

```
```bash
deno add jsr:@theworker02/cidrhas
```
```ts
import { cidrHas, explain, listCidr } from "@theworker02/cidrhas";

console.log(cidrHas("10.0.0.5", "10.0.0.0/8"));
console.log(explain("192.168.1.20", "192.168.1.0/24"));
console.log(listCidr("10.0.0.0/30"));
```
```bash
git clone https://github.com/theworker02/cidrhas.git
cd cidrhas
node src/cli.js 10.0.0.5 10.0.0.0/8
```
```bash
node --test
```
```

4. Run tests if present (`npm test`, `pytest`, `cargo test`, `go test ./...`, etc.).
5. Record README vs observed behavior gaps in workpapers.

## Pass criteria

- [ ] Clone succeeds
- [ ] Documented happy path works **or** failure is explained
- [ ] Minimal path needs no surprise secrets
- [ ] License notices intact

*Updated: 2026-09-22*
