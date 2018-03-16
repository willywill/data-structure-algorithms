export default class HashSet {
    constructor () {
        this.storage = {};
    }

    add (key) {
        if (!key) {
            throw new Error("IllegalArgumentException"); 
        } 

        this.storage[key] = true;
    }

    has (key) {
        if (!key) {
            throw new Error("IllegalArgumentException"); 
        } else if (this.storage.hasOwnProperty(key)) {
            return true;
        } else {
            return false;
        }
    }

    remove (key) {
        if (!key) {
            throw new Error("IllegalArgumentException"); 
        } else if (this.has(key)) {
            delete this.storage[key];
        }
    }

    toArray () {
        return Object.keys(this.storage);
    }

    size () {
        return Object.keys(this.storage).length;
    }

    clear () {
        this.storage = {};
    }
}
