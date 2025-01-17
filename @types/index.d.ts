/**
 * Branded Types
 * @see https://michalzalecki.com/nominal-typing-in-typescript/#approach-4-intersection-types-and-brands
 */
type Brand<K, T> = K & { __brand: T };
