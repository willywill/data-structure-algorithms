export default class Queue {
    constructor () {
        this.collection = []
    }

    /**
     * Pushes data onto the queue.
     * 
     * @param {any} data 
     * @memberof Queue
     */
    enqueue (data) {
        this.collection.push(data);
    }

    /**
     * Removes data out of the queue and returns it.
     * 
     * @returns 
     * @memberof Queue
     */
    dequeue () {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.collection.shift();
        }
    }

    /**
     * Gets the data in the front of the queue.
     * 
     * @returns 
     * @memberof Queue
     */
    front () {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.collection[0];
        }
    }

    /**
     * Gets the size of the queue.
     * 
     * @returns 
     * @memberof Queue
     */
    size () {
        return this.collection.length;
    }

    /**
     * Checks if the queue is empty.
     * 
     * @returns 
     * @memberof Queue
     */
    isEmpty () {
        return this.collection.length === 0 ? true : false;
    }
}
