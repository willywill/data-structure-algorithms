/**
 * FIFO queue backed by an array (`enqueue` at back, `dequeue` from front).
 *
 * @typeParam T - Element type stored in the queue.
 */
export default class Queue<T = unknown> {
  collection: T[];

  constructor() {
    this.collection = [];
  }

  /**
   * Pushes data onto the queue.
   *
   * @param data - Value added to the back of the queue.
   * @memberof Queue
   */
  enqueue(data: T): void {
    this.collection.push(data);
  }

  /**
   * Removes data out of the queue and returns it.
   *
   * @returns The front element, or `null` if the queue is empty.
   * @memberof Queue
   */
  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.collection.shift() ?? null;
  }

  /**
   * Gets the data in the front of the queue.
   *
   * @returns The front element without removing it, or `null` if empty.
   * @memberof Queue
   */
  front(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.collection[0] ?? null;
  }

  /**
   * Gets the size of the queue.
   *
   * @returns Number of elements.
   * @memberof Queue
   */
  size(): number {
    return this.collection.length;
  }

  /**
   * Checks if the queue is empty.
   *
   * @returns `true` when there are no elements.
   * @memberof Queue
   */
  isEmpty(): boolean {
    return this.collection.length === 0;
  }
}
