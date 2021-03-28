export default class HashSet {
  storage: {};

  constructor() {
    this.storage = {};
  }

  /**
     * Adds a key to the set.
     *
     * @param {any} key
     * @memberof HashSet
     */
  add(key) {
    if (!key) {
      throw new Error('IllegalArgumentException');
    }

    this.storage[key] = true;
    return this;
  }

  /**
     * Checks to see if the key exists in the set.
     *
     * @param {any} key
     * @returns
     * @memberof HashSet
     */
  has(key) {
    if (!key) {
      throw new Error('IllegalArgumentException');
    } else if (this.storage[key]) {
      return true;
    } else {
      return false;
    }
  }

  /**
     * Removes a key from the set if it exists.
     *
     * @param {any} key
     * @memberof HashSet
     */
  remove(key) {
    if (!key) {
      throw new Error('IllegalArgumentException');
    } else if (this.has(key)) {
      delete this.storage[key];
      return this;
    }
    return null;
  }

  /**
     * Utility method to convert the set to an array.
     *
     * @returns
     * @memberof HashSet
     */
  toArray() {
    return Object.keys(this.storage);
  }

  /**
     * Combines multiple sets into one.
     *
     * @param {object[]} set
     * @memberof HashSet
     */
  unionWith(...set) {
    if (typeof set === 'object') {
      set.map(setObj => Object.assign(this.storage, setObj.storage));
      return this;
    }
    throw new Error('IllegalArgumentException');
  }

  /**
     * Gets the size of the set.
     *
     * @returns
     * @memberof HashSet
     */
  size() {
    return Object.keys(this.storage).length;
  }

  /**
     * Removes all keys from the set.
     *
     * @memberof HashSet
     */
  clear() {
    this.storage = {};
    return this;
  }
}
