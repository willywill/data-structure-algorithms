/** Node in a circular doubly linked list: `next`/`prev` close the ring when the list has multiple nodes. */
class Node<T = unknown> {
  data: T;

  next: Node<T> | null;

  prev: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

/**
 * Circular doubly linked list: tail connects back to head (and head back to tail),
 * useful for round-robin iteration and O(1) access to both ends once `head`/`tail` are known.
 */
export default class CircularDoublyLinkedList<T = unknown> {
  head: Node<T> | null;

  tail: Node<T> | null;

  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Adds a node to the end of the linked list.
   *
   * @param data - Payload for the new node (inserted before `head` in the ring, updating `tail`).
   * @returns The new tail node.
   * @memberof CircularDoublyLinkedList
   */
  appendNode(data: T): Node<T> {
    // Create a new node and fill it with our data.
    const node = new Node(data);

    // If the head is null set the head to this newly created data.
    if (!this.head) {
      this.head = node;
      this.tail = node;
      node.prev = node;
      node.next = node;
      this.length++;
      return node;
    }
    // Otherwise, attach the node to the tail and set the pointers.
    node.prev = this.tail;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
    return node;
  }

  /**
   * Adds a node to the beginning of the linked list.
   *
   * @param data - Payload for the new head; ring pointers are rewired accordingly.
   * @returns The new head node.
   * @memberof CircularDoublyLinkedList
   */
  prependNode(data: T): Node<T> {
    // Create a new node and fill it with data.
    const node = new Node(data);

    // If the head is null, set the head to this new node.
    if (!this.head) {
      this.head = node;
      this.tail = node;
      node.prev = node;
      node.next = node;
      this.length++;
      return node;
    }
    // Otherwise, set the pointers for this new node and make it the new head.
    this.head.prev = node;
    node.next = this.head;
    node.prev = this.tail;
    if (this.tail) {
      this.tail.next = node;
    }
    this.head = node;
    this.length++;
    return node;
  }

  /**
   * Removes the node at the provided index.
   *
   * @param index - 0-based index from `head` along `next` (not counting the cyclic wrap as a step).
   * @returns The removed node (tail branch may return `null` from a legacy code path).
   * @memberof CircularDoublyLinkedList
   */
  removeNode(index: number): Node<T> | null {
    // Check for edge cases.
    if (index < 0 || index > this.length || this.isEmpty()) {
      throw new Error('OutOfRangeException');
    }

    let count = 0;
    let currentNode = this.head;
    let deletedNode: Node<T> | null = null;

    // We only have the head / tail node so we just nullify everything.
    if (this.length === 1) {
      deletedNode = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return deletedNode;
    }
    // If we remove the head, set the new head to the next node in the chain.
    if (index === 0 && this.length > 1 && this.head && this.tail) {
      deletedNode = this.head;
      this.head = this.head.next;
      if (this.head?.next) {
        this.head.next.prev = this.tail;
      }
      this.tail.next = this.head?.next ?? null;
      this.length--;
      return deletedNode;
    }
    if (index === this.length - 1 && this.length > 1 && this.tail && this.head) {
      // If we remove the tail, set the new tail to the previous node and it's next to the head.
      this.tail = this.tail.prev;
      this.head.prev = this.tail.prev;
      if (this.tail.prev) {
        this.tail.prev.next = this.head;
      }
      this.length--;
      return deletedNode;
    }
    // Iterate through each node, keeping track of the previous node.
    while (currentNode?.next && count < index) {
      currentNode = currentNode.next;
      count++;
    }

    // The previous node is now linked with the node after the next, as we removed the center.
    if (currentNode?.next && currentNode.prev) {
      currentNode.next.prev = currentNode.prev;
      currentNode.prev.next = currentNode.next;
    }
    // Return the node we will remove, acts like a pop method.
    deletedNode = currentNode;
    currentNode = null;
    this.length--;
    return deletedNode;
  }

  /**
   * Retrieves the data on the node at the provided index.
   *
   * @param index - 0-based index.
   * @returns Payload at that index.
   * @memberof CircularDoublyLinkedList
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
   * Retrieves the key in the key-value pair and returns the index of the node.
   *
   * @param value - Value to search for.
   * @returns Index of the first match, or `-1`.
   * @memberof CircularDoublyLinkedList
   */
  contains(value: T): number {
    if (this.isEmpty()) {
      return -1;
    }
    let currentNode = this.head;
    let count = 0;
    let isFound = false;

    // Check if the head contains the value we want first.
    if (this.head?.data === value) {
      return count;
    }
    // Otherwise, iterate through each node and check if our value exists.
    while (currentNode?.next || count <= this.length) {
      if (currentNode?.data === value) {
        isFound = true;
        break;
      } else {
        currentNode = currentNode.next;
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
   * @memberof CircularDoublyLinkedList
   */
  size(): number {
    // Get the length of the linked list and return it.
    return this.length;
  }

  /**
   * Checks if the linked list is empty or not.
   *
   * @returns `true` if there are no nodes.
   * @memberof CircularDoublyLinkedList
   */
  isEmpty(): boolean {
    // If the length of the linked list is zero, it's empty. Otherwise, it's not.
    if (this.size() === 0) {
      return true;
    }
    return false;
  }
}
