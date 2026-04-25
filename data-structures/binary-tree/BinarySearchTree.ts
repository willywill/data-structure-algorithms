/** Module-level visit list used by {@link BinaryTree.toArray} (legacy flat capture). */
const binaryTree: number[] = [];

/**
 * Binary **search** tree: for each node, left subtree values are `<=` node value, right subtree values are `>`.
 * The exported class name is `BinaryTree` for historical reasons in this repository; treat it as a BST root node.
 */
export default class BinaryTree {
  data: number;

  left: BinaryTree | null;

  right: BinaryTree | null;

  /**
   * Creates an instance of BinaryTree. TODO: Use key-value pairs.
   * @param data - Numeric root value; comparisons use `<=` / `>` in {@link BinaryTree.insert}.
   * @memberof BinaryTree
   */
  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  /**
   * Inserts a node into the binary tree.
   *
   * @param data - Value to insert; duplicates go to the left subtree (`<=` rule).
   * @memberof BinaryTree
   */
  insert(data: number): void {
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
  remove(): void {}

  /**
   * Checks if the binary tree contains the value.
   *
   * @param data - Value to look up.
   * @returns `true` if `data` exists in the BST.
   * @memberof BinaryTree
   */
  contains(data: number): boolean {
    if (data === this.data) {
      return true;
    }
    if (data < this.data) {
      if (!this.left) {
        return false;
      }
      return this.left.contains(data);
    }
    if (!this.right) {
      return false;
    }
    return this.right.contains(data);
  }

  /**
   * Gets the node with the smallest value.
   *
   * @returns Minimum key in the subtree rooted here.
   * @memberof BinaryTree
   */
  getMin(): number {
    // If there is no left subtree, our min value is the root node.
    if (!this.left) {
      return this.data;
    }

    let currentNode: BinaryTree = this.left;

    // Keep moving as far left as possible to find our min value.
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  /**
   * Gets the node with the biggest value.
   *
   * @returns Maximum key in the subtree rooted here.
   * @memberof BinaryTree
   */
  getMax(): number {
    // If there is no right subtree, our max value is the root node.
    if (!this.right) {
      return this.data;
    }

    let currentNode: BinaryTree = this.right;

    // Keep moving as far right as possible to find our max value.
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }

  /**
   * Converts the binary tree to an array.
   *
   * @returns The shared module array `binaryTree` with this node’s value `unshift`’d (legacy behavior).
   * @memberof BinaryTree
   */
  toArray(): number[] {
    binaryTree.unshift(this.data);
    return binaryTree;
  }

  /** Convert to a linked list (not implemented). */
  toLinkedList(): void {}
}
