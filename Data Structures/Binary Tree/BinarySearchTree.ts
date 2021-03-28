const binaryTree = [];

export default class BinaryTree {
  data: any;
  left: any;
  right: any;
  /**
     * Creates an instance of BinaryTree. TODO: Use key-value pairs.
     * @param {any} data
     * @memberof BinaryTree
     */
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  /**
     * Inserts a node into the binary tree.
     *
     * @param {any} data
     * @memberof BinaryTree
     */
  insert(data) {
    // If our key is less than the root, go down the left path until we can create our subtree.
    if (data <= this.data) {
      if (!this.left) {
        this.left = new BinaryTree(data);
        binaryTree.push(data);
      } else {
        this.left.insert(data);
      }
      // Do the same for the right if our key is greater than our root node.
    } else if (!this.right) {
      this.right = new BinaryTree(data);
      binaryTree.push(data);
    } else {
      this.right.insert(data);
    }
  }

  /**
     * Removes a node from the binary tree.
     *
     * @memberof BinaryTree
     */
  remove() {

  }

  /**
     * Checks if the binary tree contains the value.
     *
     * @param {any} data
     * @returns
     * @memberof BinaryTree
     */
  contains(data) {
    if (data === this.data) {
      return true;
    } if (data < this.data) {
      if (!this.left) {
        return false;
      }
      return this.left.contains(data);
    } if (!this.right) {
      return false;
    }
    return this.right.contains(data);
  }

  /**
     * Gets the node with the smallest value.
     *
     * @returns
     * @memberof BinaryTree
     */
  getMin() {
    // If there is no left subtree, our min value is the root node.
    if (!this.left) {
      return this.data;
    }

    let currentNode = this.left;

    // Keep moving as far left as possible to find our min value.
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  /**
     * Gets the node with the biggest value.
     *
     * @returns
     * @memberof BinaryTree
     */
  getMax() {
    // If there is no right subtree, our max value is the root node.
    if (!this.right) {
      return this.data;
    }

    let currentNode = this.right;

    // Keep moving as far right as possible to find our max value.
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }

  /**
     * Converts the binary tree to an array.
     *
     * @memberof BinaryTree
     */
  toArray() {
    binaryTree.unshift(this.data);
    return binaryTree;
  }

  toLinkedList() {

  }
}
