const HELP = "cidrhas 1.00 (1.0.0)\n\nUsage:\n  cidrhas <ipv4> <cidr>\n  cidrhas --help\n  cidrhas --version\n\nIPv4 only. Exit 0 if the address is inside the CIDR, else 1.\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nExamples:\n  cidrhas 10.0.0.5 10.0.0.0/8\n  cidrhas 192.168.1.20 192.168.1.0/24\n  cidrhas 8.8.8.8 10.0.0.0/8\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
