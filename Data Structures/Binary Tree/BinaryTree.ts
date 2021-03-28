/* eslint-disable */
/*
   Binary Tree
      ----
       j    <-- root
     /   \
    f      k  <-- children
  /   \     \
 a     h     z    <-- leaves (no children)

 As opposed to linear data structures, binary trees are hierarchical.

 Best Case Scenario, otherwise O(n) if unbalanced or other factors.
 Read - O(log(n))
 Search - O(log(n))
 Deletion - O(log(n))
 Insertion - O(log(n))

 A quick list of properties. (REFINE LATER) - Source - https://www.geeksforgeeks.org/binary-tree-set-2-properties/
 1. Number of nodes in a full binary tree is at least n = 2h + 1 and at most 2^(h + 1) - 1, where H is the height that = levels - 1.
 2. Number of leaf nodes l in a perfect binary tree l = (n + 1) / 2
 3. A perfect binary tree with l leaves has n = 2l - 1 nodes.
 4. A binary tree with L leaves has at least |Log2(L)| + 1 levels.
 5. In a binary tree, number of leaf nodes is always one more than nodes with two children.

 Types:

 Full Binary Tree - 0 or 2 children per node
      ----
       j
     /   \
    f      k
  /   \
 a     h

 Complete Binary Tree - All but last level filled, if last level not leafs as far left as possible
      ----
       j
     /   \
    f      k
  /
 a

 Perfect Binary Tree - All nodes have 2 children and all leaves are the same level
      ----
       j
     /   \
    f      k
  /  \    /  \
 a    c  d     v

 A binary tree is balanced if the tree is empty or the height difference
between the left and right subtrees do not differ more than 1 level.

 Sample implementation and methods types below.

*/

/* @ts-ignore: 2449 - Used before declaration error */
class Node extends BinaryTree {
  data: any;
  left: any;
  right: any;
  constructor(data) {
    super();
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class BinaryTree {
  binaryTree: any[];
  levels: number;
  constructor() {
    this.binaryTree = [];
    this.levels = 0;
  }

  insert(data) {

  }

  remove() {

  }

  contains(data) {

  }

  getMin() {

  }

  getMax() {

  }

  toArray() {

  }

  convertToLinkedList() {

  }
}
