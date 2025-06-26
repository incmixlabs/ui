/**
 * Browser-compatible helper functions that replace Node.js-specific functionality
 * in @incmix/utils/helper
 */
import { nanoid } from 'nanoid';

/**
 * Generates a unique ID using nanoid, which is browser-safe and more reliable
 * Replacement for the Node.js Buffer-based generateUniqueId
 * 
 * @param prefix Optional prefix for the ID
 * @returns A unique string ID with optional prefix
 */
export function generateBrowserUniqueId(prefix?: string): string {
  const id = nanoid();
  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Gets current timestamp in milliseconds
 * 
 * @returns Current timestamp in milliseconds
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}
