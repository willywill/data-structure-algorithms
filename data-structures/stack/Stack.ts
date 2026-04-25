/**
 * LIFO stack backed by an array (`push` / `pop` at the same end).
 *
 * @typeParam T - Element type stored on the stack.
 */
export default class Stack<T = unknown> {
  collection: T[];

  constructor() {
    this.collection = [];
  }

  /**
   * Pushes data onto the stack.
   *
   * @param data - Value placed on top of the stack.
   * @memberof Stack
   */
  push(data: T): void {
    this.collection.push(data);
  }

  /**
   * Pops data off the stack and returns it.
   *
   * @returns The top element, or `null` if the stack is empty.
   * @memberof Stack
   */
  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.collection.pop() ?? null;
  }

  /**
   * Get data on top of the stack.
   *
   * @returns The top element without removing it, or `null` if empty.
   * @memberof Stack
   */
  peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.collection[this.collection.length - 1] ?? null;
  }

  /**
   * Gets the size of the stack.
   *
   * @returns Number of elements.
   * @memberof Stack
   */
  size(): number {
    return this.collection.length;
  }

  /**
   * Checks if the stack is empty.
   *
   * @returns `true` when there are no elements.
   * @memberof Stack
   */
  isEmpty(): boolean {
    return this.collection.length === 0;
  }
}
