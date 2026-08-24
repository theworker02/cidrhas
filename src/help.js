const HELP = `cidrhas 1.00 (1.0.0)

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
  printf '10.0.0.1\\n8.8.8.8\\n' | cidrhas --many 10.0.0.0/8
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
