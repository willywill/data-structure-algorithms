/* eslint-disable */
// Implementation of http://www.growingwiththeweb.com/data-structures/binary-heap/overview/
// Will need to review some concepts more.

// Private methods
const maxHeapCompare = (a, b) => (a.key > b.key ? -1 : a.key < b.key ? 1 : 0);
const minHeapCompare = (a, b) => (a.key > b.key ? 1 : a.key < b.key ? -1 : 0);

const getLeftNode = (i) => 2 * i + 1;
const getRightNode = (i) => 2 * i + 2;
const getParent = (i) => (i !== 0 ? Math.floor((i - 1) / 2) : null);

const swap = (list, a, b) => {
  const temp = list[a];
  list[a] = list[b];
  list[b] = temp;
};


class Node {
  key: any;
  value: any;
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

export default class BinaryHeap {
  list: any;
  useMaxHeap?: any;
  compareTo: (a: any, b: any) => 1 | -1 | 0;
  /**
     * Creates an instance of BinaryHeap. Uses min-heap by default.
     * @param {boolean} useMaxHeap True or False
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
     * @param {any} heap
     * @param {any} i
     * @memberof BinaryHeap
     */
  heapify(heap, i) {
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
     * @param {any} keys
     * @param {any} values
     * @memberof BinaryHeap
     */
  buildHeap(keys, values) {
    const heapArray = [];

    for (const i in keys) {
      const node = new Node(keys[i], values[i]);
      heapArray.push(node);
    }

    this._buildHeap(this, heapArray);
  }

  /**
     * Internal function for processing heaps.
     *
     * @param {any} heap
     * @param {any} newHeap
     * @memberof BinaryHeap
     */
  _buildHeap(heap, newHeap) {
    heap.list = newHeap;
    const halfHeapSize = Math.floor(heap.list.length / 2);
    for (let i = halfHeapSize; i >= 0; i--) {
      this.heapify(heap, i);
    }
  }

  /**
     * Inserts a new node into the heap.
     *
     * @param {any} key
     * @param {any} value
     * @memberof BinaryHeap
     */
  insert(key, value) {
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
     *
     *
     * @memberof BinaryHeap
     */
  decreaseKey() {
    throw new Error('NotImplementedException');
  }

  /**
     *
     *
     * @memberof BinaryHeap
     */
  increaseKey() {
    throw new Error('NotImplementedException');
  }

  /**
     * Internal function for extracting min/max root node.
     *
     * @returns
     * @memberof BinaryHeap
     */
  _extractExtrema() {
    if (!this.list.length) {
      return null;
    }
    if (this.list.length === 1) {
      return this.list.shift();
    }

    // See this video for explaination as to why we set the last element to the top and bubble down
    // https://www.youtube.com/watch?v=t0Cq6tVNRBA
    const extrema = this.list[0];
    this.list[0] = this.list.pop();
    this.heapify(this, 0);
    return extrema;
  }

  /**
     * Removes and returns the minimum.
     *
     * @returns
     * @memberof BinaryHeap
     */
  extractMin() {
    if (this.useMaxHeap) {
      return null;
    }
    return this._extractExtrema();
  }

  /**
     * Removes and returns the maximum.
     *
     * @returns
     * @memberof BinaryHeap
     */
  extractMax() {
    if (this.useMaxHeap) {
      return this._extractExtrema();
    }
    return null;
  }

  /**
     * Gets the root or min node.
     *
     * @returns
     * @memberof BinaryHeap
     */
  getMin() {
    if (this.useMaxHeap) {
      return null;
    }
    return this.isEmpty() ? null : this.list[0];
  }

  /**
     * Gets the root or max node.
     *
     * @returns
     * @memberof BinaryHeap
     */
  getMax() {
    if (this.useMaxHeap) {
      return this.isEmpty() ? null : this.list[0];
    }
    return null;
  }

  /**
     * Joins the current heap with another and heapifies the result.
     *
     * @param {any} heap
     * @memberof BinaryHeap
     */
  unionWith(heap) {
    const newHeap = this.list.concat(heap.list);
    this._buildHeap(this, newHeap);
  }

  /**
     * Clears out the heap.
     *
     * @memberof BinaryHeap
     */
  clear() {
    this.list = [];
  }

  /**
     * Checks if the heap is empty or not.
     *
     * @returns
     * @memberof BinaryHeap
     */
  isEmpty() {
    return !this.list.length;
  }

  /**
     * Gets the size of the heap.
     *
     * @returns
     * @memberof BinaryHeap
     */
  size() {
    return this.list.length;
  }
}
