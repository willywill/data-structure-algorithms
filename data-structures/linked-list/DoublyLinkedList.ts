/** Doubly-linked list node: holds `data` and both `next` and `prev` pointers. */
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
 * Doubly linked list: like a singly linked list, but each node also points to its predecessor,
 * so removal and backward traversal are easier (at the cost of extra pointers).
 */
export default class DoublyLinkedList<T = unknown> {
  head: Node<T> | null;

  length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  /**
   * Adds a node to the end of the linked list.
   *
   * @param data - Payload for the new tail node.
   * @returns The new node that was appended.
   * @memberof DoublyLinkedList
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
      node.prev = currentNode;
    }
    this.length++;
    return node;
  }

  /**
   * Adds a node to the beginning of the linked list.
   *
   * @param data - Payload for the new head.
   * @returns The new head node.
   * @memberof DoublyLinkedList
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
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.length++;
    return node;
  }

  /**
   * Removes the node at the provided index.
   *
   * @param index - 0-based index of the node to remove.
   * @returns The removed node.
   * @memberof DoublyLinkedList
   */
  removeNode(index: number): Node<T> | null {
    // Check for edge cases.
    if (index < 0 || index > this.length || this.isEmpty()) {
      throw new Error('OutOfRangeException');
    }

    let count = 0;
    let currentNode = this.head;
    let deletedNode: Node<T> | null = null;
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
    if (currentNode?.next) {
      currentNode.next.prev = currentNode.prev;
    }
    if (previousNode) {
      previousNode.next = currentNode?.next ?? null;
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
   * @memberof DoublyLinkedList
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
   * @param value - Value to search for (by reference or primitive equality).
   * @returns Index of the first match, or `-1`.
   * @memberof DoublyLinkedList
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
   * @memberof DoublyLinkedList
   */
  size(): number {
    // Get the length of the linked list and return it.
    return this.length;
  }

  /**
   * Checks if the linked list is empty or not.
   *
   * @returns `true` if there are no nodes.
   * @memberof DoublyLinkedList
   */
  isEmpty(): boolean {
    // If the length of the linked list is zero, it's empty. Otherwise, it's not.
    if (this.size() === 0) {
      return true;
    }
    return false;
  }
}
