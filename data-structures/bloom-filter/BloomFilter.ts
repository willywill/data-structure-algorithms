const identity = <T>(x: T): T => x;

/**
 * FNV-1a style mixing over a string; `hashMix` can further diffuse bits for independent hash slots.
 *
 * @param str - Input string to hash.
 * @param hash - Optional FNV offset basis (default FNV-1a 32-bit).
 * @param hashMix - Optional final mixing step (default identity).
 */
const computeFNVHash = (str: string, hash = 2166136261, hashMix: (n: number) => number = identity): number => {
  for (let idx = 0; idx < str.length; idx++) {
    hash ^= str.charCodeAt(idx);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  return hashMix(hash >>> 0);
};

const computeFNVHashMix = (hash: number): number => {
  let h = hash;
  h += h << 13;
  h ^= h >> 7;
  h += h << 3;
  h ^= h >> 17;
  h += h << 5;

  return h;
};

/**
 * Approximate bit array length for desired false-positive rate and capacity (standard bloom analysis).
 *
 * @param desiredErrorRate - Target false positive probability in `(0, 1)`.
 * @param capacity - Expected maximum number of insertions.
 */
const calculateSize = (desiredErrorRate: number, capacity: number): number => {
  const p = Math.min(Math.max(desiredErrorRate, Number.EPSILON), 0.5);
  const m = Math.ceil(-(capacity * Math.log(p)) / Math.log(2) ** 2);
  return Math.max(m, 8);
};

/** Allocate a fixed-length bit vector (as booleans for clarity in this educational implementation). */
const generateBuckets = (size: number): boolean[] => new Array<boolean>(size).fill(false);

/**
 * Based on the desired error rate - the bloom filter will scale in size.
 * Insert strings with {@link BloomFilter.add}, then {@link BloomFilter.test} for membership (probabilistic: false positives possible, no false negatives before saturation).
 */
class BloomFilter {
  desiredErrorRate: number;

  buckets: boolean[];

  _size: number;

  /**
   * @param desiredErrorRate - Intended upper bound on false positive rate (e.g. `0.01` for ~1%).
   * @param capacity - How many distinct items you plan to insert (drives bit array size).
   */
  constructor(desiredErrorRate: number, capacity = 30000) {
    this.desiredErrorRate = desiredErrorRate;
    this._size = calculateSize(this.desiredErrorRate, capacity);
    this.buckets = generateBuckets(this._size);
  }

  /**
   * Add a key to the table
   *
   * @param key - String to insert; multiple hash functions set several bits in {@link BloomFilter.buckets}.
   * @memberof BloomFilter
   */
  add(key: string): void {
    const indices = this.hashIndices(key);
    for (const i of indices) {
      this.buckets[i] = true;
    }
  }

  /**
   * Check if the value _might_ exist -
   * as this is a probabilistic data structure, there is no guarantee the value exists
   * we can only see that we have a collision.
   *
   * @param key - Candidate string; `true` means "maybe in the set", `false` means "definitely not".
   * @memberof BloomFilter
   */
  test(key: string): boolean {
    const indices = this.hashIndices(key);
    return indices.every((i) => this.buckets[i]);
  }

  /**
   * Get the size of the filter in bytes
   *
   * @returns Approximate storage: one boolean per bucket (actual memory depends on runtime representation).
   * @memberof BloomFilter
   */
  size(): number {
    return this.buckets.length;
  }

  /** Derive several independent-ish bucket indices from `key` using FNV variants. */
  private hashIndices(key: string): number[] {
    const h0 = computeFNVHash(key) % this._size;
    const h1 = computeFNVHash(key, 5381, computeFNVHashMix) % this._size;
    const h2 = computeFNVHash(key, 7462, identity) % this._size;
    return [h0, h1, h2];
  }
}

export default BloomFilter;
