// Implementation of http://www.growingwiththeweb.com/data-structures/binary-heap/overview/
// Will need to review some concepts more.

/** Min/max heap ordering: negative if `a` should come before `b` in the internal array order. */
type CompareResult = -1 | 0 | 1;

// Private methods
const maxHeapCompare = <K>(a: Node<K>, b: Node<K>): CompareResult => (a.key > b.key ? -1 : a.key < b.key ? 1 : 0);
const minHeapCompare = <K>(a: Node<K>, b: Node<K>): CompareResult => (a.key > b.key ? 1 : a.key < b.key ? -1 : 0);

const getLeftNode = (i: number): number => 2 * i + 1;
const getRightNode = (i: number): number => 2 * i + 2;
const getParent = (i: number): number | null => (i !== 0 ? Math.floor((i - 1) / 2) : null);

const swap = <T>(list: T[], a: number, b: number): void => {
  const temp = list[a];
  list[a] = list[b];
  list[b] = temp;
};

/** One heap entry: `key` drives ordering; `value` is arbitrary satellite data. */
class Node<K = unknown, V = unknown> {
  key: K;

  value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

/**
 * Binary heap (array-backed). Default is a **min-heap** by `key`; pass `useMaxHeap: true` for a max-heap.
 * Typical usage: `insert`, then repeatedly `extractMin` / `extractMax` depending on configuration.
 */
export default class BinaryHeap<K = unknown, V = unknown> {
  list: Array<Node<K, V>>;

  useMaxHeap: boolean;

  compareTo: (a: Node<K, V>, b: Node<K, V>) => CompareResult;

  /**
   * Creates an instance of BinaryHeap. Uses min-heap by default.
   * @param useMaxHeap - When `true`, the heap orders by maximum `key` instead of minimum.
   * @memberof BinaryHeap
   */
  constructor(useMaxHeap = false) {
    this.list = [];
    this.useMaxHeap = useMaxHeap;
    this.compareTo = useMaxHeap ? maxHeapCompare : minHeapCompare;
  }

  /**
   * Heapifies a node. Maintains the heap structure.
   *
   * @param heap - Heap instance (passed explicitly because this method is used as a callback-style helper).
   * @param i - Index of the subtree root to fix.
   * @memberof BinaryHeap
   */
  heapify(heap: BinaryHeap<K, V>, i: number): void {
    // Retrieve both the left and right nodes in the array.
    const leftNodeIdx = getLeftNode(i);
    const rightNodeIdx = getRightNode(i);

    let currentIdx = i;

    // If the left node is less than the current index, set the current to this left node and prepare to swap them.
    if (leftNodeIdx < heap.size() && heap.compareTo(heap.list[leftNodeIdx], heap.list[i]) < 0) {
      currentIdx = leftNodeIdx;
    }

    // If the right node is less than the current index, set the current index to the right node and prepare to swap them.
    if (rightNodeIdx < heap.size() && heap.compareTo(heap.list[rightNodeIdx], heap.list[currentIdx]) < 0) {
      currentIdx = rightNodeIdx;
    }

    // If the indices aren't the same, swap, rinse, repeat.
    if (currentIdx !== i) {
      swap(heap.list, i, currentIdx);
      this.heapify(heap, currentIdx);
    }
  }

  /**
   * Takes in keys and values and converts it to a heap structure.
   *
   * @param keys - Parallel array of ordering keys (same length as `values`).
   * @param values - Satellite values aligned with `keys`.
   * @memberof BinaryHeap
   */
  buildHeap(keys: K[], values: V[]): void {
    const heapArray: Array<Node<K, V>> = [];

    for (let i = 0; i < keys.length; i++) {
      const node = new Node(keys[i], values[i]);
      heapArray.push(node);
    }

    this._buildHeap(this, heapArray);
  }

  /**
   * Internal function for processing heaps.
   *
   * @param heap - Target heap.
   * @param newHeap - Full array of nodes to heapify in place.
   * @memberof BinaryHeap
   */
  _buildHeap(heap: BinaryHeap<K, V>, newHeap: Array<Node<K, V>>): void {
    heap.list = newHeap;
    const halfHeapSize = Math.floor(heap.list.length / 2);
    for (let i = halfHeapSize; i >= 0; i--) {
      this.heapify(heap, i);
    }
  }

  /**
   * Inserts a new node into the heap.
   *
   * @param key - Ordering key.
   * @param value - Payload stored with the key.
   * @returns The inserted node (same reference held in {@link BinaryHeap.list}).
   * @memberof BinaryHeap
   */
  insert(key: K, value: V): Node<K, V> {
    // Get the next index in the array so we can add our node there then heapify.
    let currentNode = this.list.length;
    const node = new Node(key, value);
    this.list.push(node);

    // Get the parent of this new node.
    let parent = getParent(currentNode);

    // Keep switching the inserted node with the parent as long as we have a happy path available.
    while (parent !== null && this.compareTo(this.list[currentNode], this.list[parent]) < 0) {
      swap(this.list, currentNode, parent);
      currentNode = parent;
      parent = getParent(currentNode);
    }

    return node;
  }

  /**
   * Decrease the key of an element (min-heap decrease-key); not implemented in this version.
   *
   * @memberof BinaryHeap
   */
  decreaseKey(): never {
    throw new Error('NotImplementedException');
  }

  /**
   * Increase the key of an element (min-heap increase-key); not implemented in this version.
   *
   * @memberof BinaryHeap
   */
  increaseKey(): never {
    throw new Error('NotImplementedException');
  }

  /**
   * Internal function for extracting min/max root node.
   *
   * @returns The root {@link Node}, or `null` if the heap was empty.
   * @memberof BinaryHeap
   */
  _extractExtrema(): Node<K, V> | null {
    if (!this.list.length) {
      return null;
    }
    if (this.list.length === 1) {
      return this.list.shift() ?? null;
    }

    // See this video for explaination as to why we set the last element to the top and bubble down
    // https://www.youtube.com/watch?v=t0Cq6tVNRBA
    const extrema = this.list[0];
    this.list[0] = this.list.pop() as Node<K, V>;
    this.heapify(this, 0);
    return extrema;
  }

  /**
   * Removes and returns the minimum.
   *
   * @returns Root on a **min-heap**, or `null` if empty or if this instance is a max-heap.
   * @memberof BinaryHeap
   */
  extractMin(): Node<K, V> | null {
    if (this.useMaxHeap) {
      return null;
    }
    return this._extractExtrema();
  }

  /**
   * Removes and returns the maximum.
   *
   * @returns Root on a **max-heap**, or `null` if empty or if this instance is a min-heap.
   * @memberof BinaryHeap
   */
  extractMax(): Node<K, V> | null {
    if (this.useMaxHeap) {
      return this._extractExtrema();
    }
    return null;
  }

  /**
   * Gets the root or min node.
   *
   * @returns Root node without removing it, or `null` if empty / wrong heap mode.
   * @memberof BinaryHeap
   */
  getMin(): Node<K, V> | null {
    if (this.useMaxHeap) {
      return null;
    }
    return this.isEmpty() ? null : this.list[0];
  }

  /**
   * Gets the root or max node.
   *
   * @returns Root node without removing it, or `null` if empty / wrong heap mode.
   * @memberof BinaryHeap
   */
  getMax(): Node<K, V> | null {
    if (this.useMaxHeap) {
      return this.isEmpty() ? null : this.list[0];
    }
    return null;
  }

  /**
   * Joins the current heap with another and heapifies the result.
   *
   * @param heap - Another heap whose `list` is concatenated to this one.
   * @memberof BinaryHeap
   */
  unionWith(heap: BinaryHeap<K, V>): void {
    const newHeap = this.list.concat(heap.list);
    this._buildHeap(this, newHeap);
  }

  /**
   * Clears out the heap.
   *
   * @memberof BinaryHeap
   */
  clear(): void {
    this.list = [];
  }

  /**
   * Checks if the heap is empty or not.
   *
   * @returns `true` when there are no elements.
   * @memberof BinaryHeap
   */
  isEmpty(): boolean {
    return !this.list.length;
  }

  /**
   * Gets the size of the heap.
   *
   * @returns Number of stored nodes.
   * @memberof BinaryHeap
   */
  size(): number {
    return this.list.length;
  }
}
