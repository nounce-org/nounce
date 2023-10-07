// Generic utils for Nounce
import { keccak256, toHex } from "viem";

/**
 * Shortens a hash string for display purposes.
 * @param hash The hash string to shorten.
 * @returns The shortened hash string.
 */
export function shortenHash(hash: string | null): string {
  if (!hash || hash.length <= 8) return hash || "";
  return `${hash.substr(0, 4)}..${hash.substr(-4)}`;
}

/**
 * Generates a keccak256 hash for given content data.
 * @param content Data for which the hash needs to be generated.
 * @returns The keccak256 hash string.
 */
export function generateHash(content: any): string {
  return keccak256(toHex(content));
}
