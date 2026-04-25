/**
 * Growable one-dimensional vector (dynamic array) backed by an array.
 *
 * @typeParam T - Element type stored in the vector.
 */
export default class Vector<T = unknown> {
  collection: T[];

  /**
   * @param initial - Optional initial elements (copied into a new array).
   */
  constructor(initial?: T[]) {
    this.collection = initial === undefined ? [] : [...initial];
  }

  /**
   * Appends a value at the end of the vector.
   *
   * @param data - Value to append.
   * @memberof Vector
   */
  push(data: T): void {
    this.collection.push(data);
  }

  /**
   * Removes and returns the last element.
   *
   * @returns The last element, or `null` if the vector is empty.
   * @memberof Vector
   */
  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.collection.pop() ?? null;
  }

  /**
   * Reads the element at an index without removing it.
   *
   * @param index - Zero-based index.
   * @returns The element at `index`, or `null` if out of range.
   * @memberof Vector
   */
  get(index: number): T | null {
    if (index < 0 || index >= this.collection.length) {
      return null;
    }
    return this.collection[index] ?? null;
  }

  /**
   * Writes the element at an index. Grows the backing store with `undefined`
   * slots if `index` is past the current end (same spirit as sparse array growth).
   *
   * @param index - Zero-based index.
   * @param value - Value to store.
   * @memberof Vector
   */
  set(index: number, value: T): void {
    if (index < 0) {
      return;
    }
    this.collection[index] = value;
  }

  /**
   * Number of elements (length of the dense prefix of the backing array).
   *
   * @returns Element count.
   * @memberof Vector
   */
  size(): number {
    return this.collection.length;
  }

  /**
   * @returns `true` when there are no elements.
   * @memberof Vector
   */
  isEmpty(): boolean {
    return this.collection.length === 0;
  }

  /**
   * Removes all elements.
   *
   * @memberof Vector
   */
  clear(): void {
    this.collection.length = 0;
  }
}
