/** Internal singly-linked list node holding arbitrary payload `data`. */
class Node<T = unknown> {
  data: T;

  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Singly linked list: O(1) prepend, O(n) indexed access and search.
 * Used here for hash table chaining and as a standalone sequence.
 */
export default class LinkedList<T = unknown> {
  head: Node<T> | null;

  length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  /**
   * Adds a node to the end of the linked list.
   *
   * @param data - Payload to store in the new tail node.
   * @returns The previous tail node (the one whose `next` now points at the new node), or the only node when the list was empty.
   * @memberof LinkedList
   */
  appendNode(data: T): Node<T> {
    // Create a new node and fill it with our data.
    const node = new Node(data);
    let currentNode = this.head;

    // If the head is null set the head to this newly created data.
    if (!this.head) {
      this.head = node;
      this.length++;
      return node;
    }
    // Otherwise, keep going until we get to the end of the linked list.
    while (currentNode?.next) {
      currentNode = currentNode.next;
    }
    // Once we reach the end, add this node to our last node.
    if (currentNode) {
      currentNode.next = node;
    }
    this.length++;
    return currentNode as Node<T>;
  }

  /**
   * Adds a node to the beginning of the linked list.
   *
   * @param data - Payload for the new head; previous head (if any) becomes second.
   * @returns The new head node.
   * @memberof LinkedList
   */
  prependNode(data: T): Node<T> {
    // Create a new node and fill it with data.
    const node = new Node(data);

    // If the head is null, set the head to this new node.
    if (!this.head) {
      this.head = node;
      this.length++;
      return node;
    }
    // Otherwise, set the pointers for this new node and make it the new head.
    node.next = this.head;
    this.head = node;
    this.length++;
    return node;
  }

  /**
   * Removes the node at the provided index.
   *
   * @param index - 0-based index; must be in range for the current list.
   * @returns The removed node (caller may read `data`).
   * @throws When index is out of range or the list is empty.
   * @memberof LinkedList
   */
  removeNode(index: number): Node<T> {
    // Check for edge cases.
    if (index < 0 || index > this.length || this.isEmpty()) {
      throw new Error('OutOfRangeException');
    }

    let count = 0;
    let currentNode = this.head;
    let deletedNode: Node<T> | null = null;

    // Keep track of the tail so we can adjust it's pointer if the removal is done in the center of two nodes.
    let previousNode: Node<T> | null = null;

    // If we remove the head, set the new head to the next node in the chain.
    if (index === 0 && currentNode) {
      this.head = currentNode.next;
      deletedNode = currentNode;
      this.length--;
      return deletedNode;
    }
    // Iterate through each node, keeping track of the previous node.
    while (currentNode?.next && count < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      count++;
    }

    // The previous node is now linked with the node after the next, as we removed the center.
    if (previousNode) {
      previousNode.next = currentNode?.next ?? null;
    }
    // Return the node we will remove, acts like a pop method.
    deletedNode = currentNode;
    currentNode = null;
    this.length--;
    if (!deletedNode) {
      throw new Error('OutOfRangeException');
    }
    return deletedNode;
  }

  /**
   * Retrieves the data on the node at the provided index.
   *
   * @param index - 0-based index; must be in range for the current list.
   * @returns The payload at that index.
   * @throws When index is out of range or the list is empty.
   * @memberof LinkedList
   */
  getNode(index: number): T {
    // Check for edge cases.
    if (index < 0 || index > this.length || this.isEmpty()) {
      throw new Error('OutOfRangeException');
    }

    let currentNode = this.head;
    let count = 0;

    // Iterate through each node starting with the head until we get to our node.
    while (currentNode?.next && count < index) {
      currentNode = currentNode.next;
      count++;
    }

    if (!currentNode) {
      throw new Error('OutOfRangeException');
    }
    return currentNode.data;
  }

  /**
   * Finds the first node whose payload equals `key`, or (for hash buckets) whose `.key` field matches.
   *
   * @param key - Raw value or bucket lookup key.
   * @returns The 0-based index of the match, or `-1` if not found.
   * @memberof LinkedList
   */
  contains(key: unknown): number {
    if (this.isEmpty()) {
      return -1;
    }
    let currentNode = this.head;
    let count = 0;
    let isFound = false;

    // Check if the head is null, otherwise don't continue, exit with -1.
    if (this.head === null) {
      return -1;
    }

    // Check if the head contains the key we want first.
    if (this.head.data === key) {
      return count;
    }
    // Otherwise, iterate through each node and check if our key exists.
    while (currentNode?.next || count <= this.length) {
      const data = currentNode?.data as { key?: unknown };
      if (currentNode?.data === key || data?.key === key) {
        isFound = true;
        break;
      } else {
        currentNode = currentNode?.next ?? null;
        if (currentNode === null) {
          break;
        }
        count++;
      }
    }

    return isFound ? count : -1;
  }

  /**
   * Returns the size of the linked list.
   *
   * @returns Number of nodes.
   * @memberof LinkedList
   */
  size(): number {
    // Get the length of the linked list and return it.
    return this.length;
  }

  /**
   * Checks if the linked list is empty or not.
   *
   * @returns `true` if there are no nodes.
   * @memberof LinkedList
   */
  isEmpty(): boolean {
    // If the length of the linked list is zero, it's empty. Otherwise, it's not.
    if (this.size() === 0) {
      return true;
    }
    return false;
  }
}
