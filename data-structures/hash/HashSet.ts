/**
 * A set backed by a plain object: keys are stored as object properties (stringified),
 * so only values usable as non-falsy property keys are supported (see {@link HashSet.add}).
 */
export default class HashSet {
  storage: Record<string, true>;

  constructor() {
    this.storage = {};
  }

  /**
   * Adds a key to the set.
   *
   * @param key - Value to store. Falsy values (`0`, `''`, `false`, `null`, `undefined`, `NaN`) throw,
   *   because this implementation uses object keys and treats missing keys as errors.
   * @returns `this` for chaining (e.g. `set.add('a').add('b')`).
   * @memberof HashSet
   */
  add(key: string | number): this {
    if (!key) {
      throw new Error('IllegalArgumentException');
    }

    this.storage[String(key)] = true;
    return this;
  }

  /**
   * Checks to see if the key exists in the set.
   *
   * @param key - Same constraints as {@link HashSet.add}; falsy keys throw.
   * @returns `true` if present, otherwise `false`.
   * @memberof HashSet
   */
  has(key: string | number): boolean {
    if (!key) {
      throw new Error('IllegalArgumentException');
    } else if (this.storage[String(key)]) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Removes a key from the set if it exists.
   *
   * @param key - Same constraints as {@link HashSet.add}.
   * @returns `this` if the key was removed, or `null` if it was not in the set.
   * @memberof HashSet
   */
  remove(key: string | number): this | null {
    if (!key) {
      throw new Error('IllegalArgumentException');
    } else if (this.has(key)) {
      delete this.storage[String(key)];
      return this;
    }
    return null;
  }

  /**
   * Utility method to convert the set to an array.
   *
   * @returns The set’s keys as strings (object property names).
   * @memberof HashSet
   */
  toArray(): string[] {
    return Object.keys(this.storage);
  }

  /**
   * Combines multiple sets into one.
   *
   * @param set - One or more {@link HashSet} instances; their storage is merged into this set.
   * @returns `this` for chaining.
   * @memberof HashSet
   */
  unionWith(...set: HashSet[]): this {
    if (typeof set === 'object') {
      set.map((setObj) => Object.assign(this.storage, setObj.storage));
      return this;
    }
    throw new Error('IllegalArgumentException');
  }

  /**
   * Gets the size of the set.
   *
   * @returns Number of keys stored.
   * @memberof HashSet
   */
  size(): number {
    return Object.keys(this.storage).length;
  }

  /**
   * Removes all keys from the set.
   *
   * @returns `this` for chaining.
   * @memberof HashSet
   */
  clear(): this {
    this.storage = {};
    return this;
  }
}
