/** IPv4 CIDR parsing, containment checks, range inspection, and batch validation. @module */
export interface ParsedCidr { net: number; mask: number; bits: number; network: string; broadcast: string; count: number; }
export interface ExplainResult { ip: string; cidr: string; inside: boolean; network: string; broadcast: string; bits: number; mask: string; address: string; }
export interface CidrList extends ParsedCidr { truncated: boolean; addresses: string[]; }
export interface CheckResult { ip: string; inside: boolean; error?: string; }
/** Package identity and release metadata. */
export const PACKAGE: Readonly<{ name: "@theworker02/cidrhas"; version: "1.1.0"; runtime: "universal"; registry: "jsr" }>;
/** Convert an IPv4 address to an unsigned 32-bit integer. */
export function ipv4ToInt(ip: string): number;
/** Convert an unsigned 32-bit integer to dotted IPv4 notation. */
export function intToIpv4(n: number): string;
/** Parse IPv4 CIDR metadata. */
export function parseCidr(cidr: string): ParsedCidr;
/** Return whether an IPv4 address belongs to a CIDR. */
export function cidrHas(ip: string, cidr: string): boolean;
/** Explain a containment decision with network and mask details. */
export function explain(ip: string, cidr: string): ExplainResult;
/** Enumerate addresses in a CIDR up to a configurable limit. */
export function listCidr(cidr: string, options?: { limit?: number }): CidrList;
/** Check multiple IPv4 addresses against one CIDR. */
export function checkMany(ips: string[], cidr: string): CheckResult[];
