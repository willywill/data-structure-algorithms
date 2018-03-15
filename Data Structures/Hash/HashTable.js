import LinkedList from '../Linked List/LinkedList';

class Bucket {
    constructor (key, value) {
        this.key = key;
        this.value = value;
    }
}

export default class HashTable {
    constructor () {
        this.storage = [];
        this.tableSize = 4;
        this.size = 0;
        this.resize = function () {
            // Double the size for now, in the future use primes to further prevent collision.
            this.tableSize *= 2; 
            const oldStorage = this.storage;
            // Dump everything in it, we will fill this in after rehashing the table.
            this.storage = [];
            this.size = 0;
            // Loop through all the linked lists, if we have just one bucket, place the key-value in storage,
            // Otherwise, traverse the linked list rehashing the buckets into our bigger table.
            oldStorage.map(buckets => {
               if (!buckets) { return; }
               if (buckets.head.next && buckets.length > 1) {
                 let count = 0;
                 while(count < buckets.length) {
                   const key = buckets.head.data.key;
                   const value = buckets.head.data.value;
                   this.put(key, value);
                   buckets.head = buckets.head.next;
                   count++;
                 }
               } else {
                 const key = buckets.head.data.key;
                 const value = buckets.head.data.value;
                 this.put(key, value); 
               }
            });
       }

        // Typical hash, add all the char codes and divide by the table size and return it's remainder as the index.
        this.hash = function (key) {
            key = String(key);
            const index = key.split('')
                         .map(char => char.charCodeAt())
                         .reduce((x, y) => x + y, 0) % this.tableSize; 
            return index;
        }
    }

    /**
     * Places a key-value pair into storage, coupled with a Linked List to handle collision.
     * 
     * @param {any} key 
     * @param {any} value 
     * @memberof HashTable
     */
    put (key, value) {
       const index = this.hash(key);
       const bucket = new Bucket(key, value);
       // If the index is empty, it's clear to place the bucket in this index without chaining.
       if (!this.storage[index]) {
            this.storage[index] = new LinkedList();
            this.storage[index].appendNode(bucket);
            this.size++;
       } else {
            // There is another bucket at this index, we will chain onto this.
            this.storage[index].appendNode(bucket);
            this.size++;
       }

       // If the table size is almost full, resize it.
       if (this.size > Math.floor(this.tableSize * 0.70)) {
            // Increases the size to the next prime.
            this.resize();
       }
    }

    /**
     * Retrieves the key-value pair object, if available.
     * 
     * @param {any} key 
     * @returns {object}
     * @memberof HashTable
     */
    get (key) {
        const index = this.hash(key);
        // If this index contains only the linked list with the head, return the bucket on the head.
        if (this.storage[index] && this.storage[index].head.next === null
             && this.storage[index].head.data.key === key) {
            return this.storage[index].head.data.value;
        // If this linked list has multiple nodes, traverse them and get the bucket.
        } else if (this.storage[index] && this.storage[index].length > 1) {
            const nodeIdx = this.storage[index].contains(key);
            if(nodeIdx === -1) return null; 

            return this.storage[index].getNode(nodeIdx).value;
        } else {
            return null;
        }
    }

    /**
     * Checks the hash table to see if it possesses the key-value pair.
     * 
     * @param {any} key 
     * @returns {boolean}
     * @memberof HashTable
     */
    contains (key) {
        let isFound = false;
        // Some method allows for early out. Loop through the storage,
        // then traverse each linked list until we find the key.
        this.storage.some(bucket => {
            if (bucket.contains(key) !== -1) {
                isFound = true;
                return true;
            }
        });

        return isFound;
    }

    /**
     * Gets all the keys in the hash table.
     * 
     * @returns {any[]}
     * @memberof HashTable
     */
    keys () {
        const keys = [];
        this.storage.map(buckets => {
            if (!buckets) { return; }
               if (buckets.head.next && buckets.length > 1) {
                 let count = 0;
                 while(count < buckets.length) {
                   const key = buckets.head.data.key;
                   keys.push(key);
                   buckets.head = buckets.head.next;
                   count++;
                 }
               } else {
                 const key = buckets.head.data.key;
                 keys.push(key);
               }
        });

        return keys;
    }

    /**
     * Gets all the values in the hash table.
     * 
     * @returns {any[]}
     * @memberof HashTable
     */
    values () {
        const values = [];
        this.storage.map(buckets => {
            if (!buckets) { return; }
               if (buckets.head.next && buckets.length > 1) {
                 let count = 0;
                 while(count < buckets.length) {
                   const value = buckets.head.data.value;
                   values.push(value);
                   buckets.head = buckets.head.next;
                   count++;
                 }
               } else {
                 const value = buckets.head.data.value;
                 values.push(value);
               }
        });

        return values;
    }

    remove (key) {

    }

    /**
     * Returns the size of the hash table.
     * 
     * @returns {number}
     * @memberof HashTable
     */
    size () {
        return this.size;
    }

    /**
     * Checks if the hash table is empty or not.
     * 
     * @returns {boolean}
     * @memberof HashTable
     */
    isEmpty () {
        this.size === 0 ? true : false;
    }

}