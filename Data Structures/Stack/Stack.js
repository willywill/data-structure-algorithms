export default class Stack {
    constructor () {
        this.collection = []
    }

    /**
     * Pushes data onto the stack.
     * 
     * @param {any} data 
     * @memberof Stack
     */
    push (data) {
        this.collection.push(data);
    }

    /**
     * Pops data off the stack and returns it.
     * 
     * @returns 
     * @memberof Stack
     */
    pop () {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.collection.pop();
        }
    }

    /**
     * Get data on top of the stack.
     * 
     * @returns 
     * @memberof Stack
     */
    peek () {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.collection[this.length - 1];
        }
    }

    /**
     * Gets the size of the stack.
     * 
     * @returns 
     * @memberof Stack
     */
    size () {
        return this.collection.length;
    }

    /**
     * Checks if the stack is empty.
     * 
     * @returns 
     * @memberof Stack
     */
    isEmpty () {
        return this.collection.length === 0 ? true : false;
    }
}