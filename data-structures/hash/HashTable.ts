import LinkedList from '../linked-list/LinkedList.js';

/** Key–value pair stored in a hash bucket (possibly chained in a {@link LinkedList}). */
class Bucket<K, V> {
  key: K;

  value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

/**
 * Separate-chaining hash table: array of slots, each slot a linked list of {@link Bucket}s on collision.
 * Resizes (doubles slot count) when load factor exceeds ~0.7.
 */
export default class HashTable<K = unknown, V = unknown> {
  storage: Array<LinkedList<Bucket<K, V>> | undefined>;

  tableSize: number;

  size: number;

  resize: () => void;

  hash: (key: K) => number;

  constructor() {
    this.storage = [];
    this.tableSize = 4;
    this.size = 0;
    this.resize = () => {
      // Double the size for now, in the future use primes to further prevent collision.
      this.tableSize *= 2;
      const oldStorage = this.storage;
      // Dump everything in it, we will fill this in after rehashing the table.
      this.storage = [];
      this.size = 0;
      /**
       * Loop through all the linked lists, if we have just one bucket,
       * place the key-value in storage. Otherwise, traverse the linked list
       * rehashing the buckets into our bigger table.
       */
      oldStorage.forEach((buckets) => {
        if (!buckets) {
          return;
        }
        if (buckets.head?.next && buckets.length > 1) {
          let count = 0;
          while (count < buckets.length && buckets.head) {
            const { key } = buckets.head.data;
            const { value } = buckets.head.data;
            this.put(key, value);
            buckets.head = buckets.head.next;
            count++;
          }
        } else if (buckets.head) {
          const { key } = buckets.head.data;
          const { value } = buckets.head.data;
          this.put(key, value);
        }
      });
    };

    // Typical hash, add all the char codes and divide
    // by the table size and return it's remainder as the index.
    this.hash = (key: K) => {
      const strKey = String(key);
      const index =
        strKey
          .split('')
          .map((char) => char.charCodeAt(0))
          .reduce((x, y) => x + y, 0) % this.tableSize;
      return index;
    };
  }

  /**
   * Places a key-value pair into storage, coupled with a Linked List to handle collision.
   *
   * @param key - Lookup key; must be truthy (same rule as {@link HashTable.get}).
   * @param value - Value to associate with `key` (overwrites are not deduplicated per key in this implementation).
   * @memberof HashTable
   */
  put(key: K, value: V): void {
    // Check edge cases.
    if (!key) {
      throw new Error('IllegalArgumentException');
    }

    const index = this.hash(key);
    const bucket = new Bucket(key, value);
    // If the index is empty, it's clear to place the bucket in this index without chaining.
    if (!this.storage[index]) {
      this.storage[index] = new LinkedList<Bucket<K, V>>();
      this.storage[index].appendNode(bucket);
      this.size++;
    } else {
      // There is another bucket at this index, we will chain onto this.
      this.storage[index].appendNode(bucket);
      this.size++;
    }

    // If the table size is almost full, resize it.
    if (this.size > Math.floor(this.tableSize * 0.7)) {
      // Increases the size to the next prime.
      this.resize();
    }
  }

  /**
   * Retrieves the key-value pair object, if available.
   *
   * @param key - Lookup key; must be truthy.
   * @returns The stored value, or `null` if missing.
   * @memberof HashTable
   */
  get(key: K): V | null {
    // Check edge cases.
    if ((this.size === 0 || this.storage.length === 0) && key) {
      return null;
    }

    if (!key) {
      throw new Error('IllegalArgumentException');
    }

    const index = this.hash(key);
    const list = this.storage[index];
    // If this index contains only the linked list with the head, return the value on the head.
    if (list && list.head?.next === null && list.head.data.key === key) {
      return list.head.data.value;
      // If this linked list has multiple nodes, traverse them and get the bucket with our value.
    }
    if (list && list.length > 1) {
      const nodeIdx = list.contains(key);
      if (nodeIdx === -1) return null;
      return list.getNode(nodeIdx).value;
    }
    return null;
  }

  /**
   * Checks the hash table to see if it possesses the key-value pair.
   *
   * @param key - Lookup key; must be truthy.
   * @returns `true` if any bucket matches `key`, `false` if not found; `null` when the table is empty (legacy behavior).
   * @memberof HashTable
   */
  contains(key: K): boolean | null {
    // Check edge cases.
    if ((this.size === 0 || this.storage.length === 0) && key) {
      return null;
    }

    if (!key) {
      throw new Error('IllegalArgumentException');
    }

    let isFound = false;
    // Some method allows for early out. Loop through the storage,
    // then traverse each linked list until we find the key.
    this.storage.some((bucket) => {
      if (bucket && bucket.contains(key) !== -1) {
        isFound = true;
        return true;
      }
      return false;
    });

    return isFound;
  }

  /**
   * Gets all the keys in the hash table.
   *
   * @returns All keys from every bucket (order not specified).
   * @memberof HashTable
   */
  keys(): K[] {
    const keys: K[] = [];
    // Similar to increasing the table size, we retrieve the keys in the buckets,
    // by iterating through every bucket and extracting the data.
    this.storage.forEach((buckets) => {
      if (!buckets) {
        return;
      }
      if (buckets.head?.next && buckets.length > 1) {
        let count = 0;
        while (count < buckets.length && buckets.head) {
          const { key } = buckets.head.data;
          keys.push(key);
          buckets.head = buckets.head.next;
          count++;
        }
      } else if (buckets.head) {
        const { key } = buckets.head.data;
        keys.push(key);
      }
    });

    return keys;
  }

  /**
   * Gets all the values in the hash table.
   *
   * @returns All values from every bucket (order not specified).
   * @memberof HashTable
   */
  values(): V[] {
    const values: V[] = [];
    // Similar to increasing the table size, we retreive the values in the buckets,
    // by iterating through every bucket and extracting the data.
    this.storage.forEach((buckets) => {
      if (!buckets) {
        return;
      }
      if (buckets.head?.next && buckets.length > 1) {
        let count = 0;
        while (count < buckets.length && buckets.head) {
          const { value } = buckets.head.data;
          values.push(value);
          buckets.head = buckets.head.next;
          count++;
        }
      } else if (buckets.head) {
        const { value } = buckets.head.data;
        values.push(value);
      }
    });

    return values;
  }

  /**
   * Removes a key-value pair from the hash table.
   *
   * @param key - Key to remove; must be truthy.
   * @returns The removed {@link Bucket}, or `null` if the key was not found.
   * @memberof HashTable
   */
  remove(key: K): Bucket<K, V> | null {
    // Check edge cases.
    if ((this.size === 0 || this.storage.length === 0) && key) {
      return null;
    }

    if (!key) {
      throw new Error('IllegalArgumentException');
    }

    const index = this.hash(key);
    const list = this.storage[index];
    let removedBucket: Bucket<K, V> | null = null;

    // If this index contains only the linked list with the head, remove the value on the head.
    if (list && list.head?.next === null && list.head.data.key === key) {
      removedBucket = list.head.data;
      list.removeNode(0);
      // If this linked list has multiple nodes, traverse them and remove the bucket with our value.
    } else if (list && list.length > 1) {
      const nodeIdx = list.contains(key);
      if (nodeIdx === -1) return null;
      removedBucket = list.removeNode(nodeIdx).data;
    } else {
      return null;
    }

    this.size--;
    return removedBucket;
  }

  /**
   * Returns the size of the hash table.
   *
   * @returns Number of stored entries (including duplicates per implementation).
   * @memberof HashTable
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Removes all entries in the hash table.
   *
   * @returns `this` for chaining.
   * @memberof HashTable
   */
  clear(): this {
    this.storage = [];
    this.size = 0;
    // Consider exposing default table size after prime refactor is implemented.
    this.tableSize = 4;
    return this;
  }

  /**
   * Checks if the hash table is empty or not.
   *
   * @returns `true` if there are no entries.
   * @memberof HashTable
   */
  isEmpty(): boolean {
    return this.size === 0;
  }
}
