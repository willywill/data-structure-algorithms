class Node {
    constructor (data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

export default class DoublyLinkedList {

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
        let previousNode = null;

        // If the head is null set the head to this newly created data.
        if (!this.head) {
            this.head = node;
            this.length++;
            return node;
        } else {
            // Otherwise, keep going until we get to the end of the linked list.
            while (currentNode.next) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            //Once we reach the end, add this node to our last node.
            currentNode.next = node;
            node.prev = currentNode;
            this.length++;
            return node;
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
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
            this.length++;
            return node;
        }
    }

    removeNode (index) {

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
    contains (value) {
        if (this.isEmpty()) {
            return -1;
        } else {
            let currentNode = this.head;
            let count = 0;
            let isFound = false;

            // Check if the head contains the value we want first.
            if (this.head.data === value) {
                return count;
            } else {
                // Otherwise, iterate through each node and check if our value exists.
                while (currentNode.next || count <= this.length) {
                    if (currentNode.data === value) {
                        isFound = true;
                        break;
                    } else {
                        currentNode = currentNode.next;
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