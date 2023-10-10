// Generic utils for Nounce
import moment from "moment";
import { keccak256, toHex } from "viem";

/**
 * Shortens a hash string for display purposes.
 * @param hash The hash string to shorten.
 * @returns The shortened hash string.
 */
export function shortenHash(hash: string | undefined): string {
  if (!hash || hash.length <= 8) return hash || "";
  return `${hash.substr(0, 4)}..${hash.substr(-4)}`;
}

/**
 * Generates a keccak256 hash for given content data.
 * @param content Data for which the hash needs to be generated.
 * @returns The keccak256 hash string.
 */
export function generateHash(content: any): string {
  if (content) {
    return keccak256(toHex(content));
  } else {
    return "";
  }
}

/**
 * Formats a givent date to D/M/Y
 * @param content The date to be formatted
 * @returns The formatted date string.
 */
export function formatDate(date: Date): string {
  return moment(date).fromNow();
}
