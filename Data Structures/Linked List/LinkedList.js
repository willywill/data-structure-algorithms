class Node {
    constructor (data) {
        this.data = data;
        this.next = null;
    }
}

export default class LinkedList {
    constructor () {
        this.head = null;
        this.length = 0;
    }

    /**
     * Adds a node to the end of the linked list.
     * 
     * @param {any} data 
     * @returns 
     * @memberof LinkedList
     */
    appendNode (data) {
        // Create a new node and fill it with our data.
        const node = new Node(data);
        let currentNode = this.head;

        // If the head is null set the head to this newly created data.
        if (!this.head) {
            this.head = node;
            this.length++;
            return node;
        } else {
            // Otherwise, keep going until we get to the end of the linked list.
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            //Once we reach the end, add this node to our last node.
            currentNode.next = node;
            this.length++;
            return currentNode;
        }
    }

    /**
     * Adds a node to the beginning of the linked list.
     * 
     * @param {any} data 
     * @returns 
     * @memberof LinkedList
     */
    prependNode (data) {
        // Create a new node and fill it with data.
        const node = new Node(data);
        
        // If the head is null, set the head to this new node.
        if (!this.head) {
            this.head = node;
            this.length++;
            return node;
        } else {
            // Otherwise, set the pointers for this new node and make it the new head.
            node.next = this.head;
            this.head = node;
            this.length++;
            return node;
        }
    }

    /**
     * Removes the node at the provided index.
     * 
     * @param {any} index 
     * @memberof LinkedList
     */
    removeNode (index) {
        // Check for edge cases.
        if (index < 0 || index > this.length || this.isEmpty()) {
            const error = new Error("OutOfRangeException");
            throw new Error(error.stack);
        }

        let count = 0;
        let currentNode = this.head;
        let deletedNode = null;

        // Keep track of the tail so we can adjust it's pointer if the removal is done in the center of two nodes.
        let previousNode = null;

        // If we remove the head, set the new head to the next node in the chain.
        if (index === 0) {
            this.head = currentNode.next;
            deletedNode = currentNode;
            this.length--;
            return deletedNode;
        } else {
            // Iterate through each node, keeping track of the previous node.
            while (currentNode.next && count < index) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                count++;
            }

            // The previous node is now linked with the node after the next, as we removed the center.
            previousNode.next = currentNode.next;
            // Return the node we will remove, acts like a pop method.
            deletedNode = currentNode;
            currentNode = null;
            this.length--;
            return deletedNode;
        }

    }

    /**
     * Retrieves the data on the node at the provided index.
     * 
     * @param {any} index 
     * @returns 
     * @memberof LinkedList
     */
    getNode (index) {
        // Check for edge cases.
        if (index < 0 || index > this.length || this.isEmpty()) {
            const error = new Error("OutOfRangeException");
            throw new Error(error.stack);
        }

        let currentNode = this.head;
        let count = 0;

        // Iterate through each node starting with the head until we get to our node.
        while (currentNode.next && count < index) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode.data;
    }

    /**
     * Retrieves the key in the key-value pair and returns the index of the node.
     * 
     * @param {any} value 
     * @returns 
     * @memberof LinkedList
     */
    contains (key) {
        if (this.isEmpty()) {
            return -1;
        } else {
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
            } else {
                // Otherwise, iterate through each node and check if our key exists.
                while (currentNode.next || count <= this.length) {
                    if (currentNode.data === key || currentNode.data.key === key) {
                        isFound = true;
                        break;
                    } else {
                        currentNode = currentNode.next;
                        if (currentNode === null) { break; }
                        count++;
                    }
                }
            }

            return isFound ? count : -1;
        }
    }

    /**
     * Returns the size of the linked list.
     * 
     * @returns 
     * @memberof LinkedList
     */
    size () {
        // Get the length of the linked list and return it.
        return this.length;
    }

    /**
     * Checks if the linked list is empty or not.
     * 
     * @returns 
     * @memberof LinkedList
     */
    isEmpty () {
        // If the length of the linked list is zero, it's empty. Otherwise, it's not.
        if (this.size() === 0) {
            return true;
        } else {
            return false;
        }
    }
}
