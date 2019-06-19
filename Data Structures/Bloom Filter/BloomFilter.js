const identity = x => x;

const computeFNVHash = (str, hash = 2166136261, hashMix = identity) => {
  str.forEach((char, idx) => {
    hash ^= string.charCodeAt(idx);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  });

  return hashMix(hash >>> 0);
};

const computeFNVHashMix = hash => {
  hash += hash << 13;
  hash ^= hash >> 7;
  hash += hash << 3;
  hash ^= hash >> 17;
  hash += hash << 5;

  return hash;
};

/**
 * Based on the desired error rate - the bloom filter will scale in size
 */
class BloomFilter {
  constructor (desiredErrorRate, capacity = 30000) {
    this.desiredErrorRate = desiredErrorRate;
    this.size = calculateSize(this.desiredErrorRate, capacity);
    this.buckets = generateBuckets(this.size);
  }

  /**
   * Add a key to the table
   * @memberof BloomFilter
   */
  add () {

  }

  /**
   * Check if the value _might_ exist -
   * as this is a probabilistic data structure, there is no guarantee the value exists
   * we can only see that we have a collision.
   * @memberof BloomFilter
   */
  test () {

  }

  /**
   * Get the size of the filter in bytes
   * @memberof BloomFilter
   */
  size () {

  }
}

export default BloomFilter;
