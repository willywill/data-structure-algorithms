import HashTable from './HashTable'

describe('Hash Table', () => {

    it ('Can be imported and used', () => {
        const hashTable = new HashTable();
        expect(hashTable).toBeDefined();
    });

    it ('Put Method', () => {
        const hashTable = new HashTable();
        hashTable.put("Mary", 1);
        hashTable.put("Bob", 3);
        hashTable.put("Joey", 4);
    });

    it ('Contains Method', () => {
        const hashTable = new HashTable();
        hashTable.put("Mini", 4);
        const result = hashTable.contains("Mini");
        expect(result).toBe(true);
    });

    it ('Get Method', () => {
        const hashTable = new HashTable();
        hashTable.put("Bobby", 4898943);
        const result = hashTable.get("Bobby");
        expect(result).toBe(4898943);
    });

    it ('Get Method With Chaining', () => {
        const hashTable = new HashTable();
        hashTable.put("Test", 1);
        hashTable.put("Almost", 34);
        hashTable.put("Teest", 5);
        hashTable.put("Overlap", 10);
        hashTable.put("AnotherTest", 2);
        const result = hashTable.get("Test");
        expect(result).toBe(1);
    });

    it ('Resizes Hash Table', () => {
        const hashTable = new HashTable();
        const initialSize = hashTable.tableSize;
        hashTable.put("T", 1);
        hashTable.put("e", 2);
        hashTable.put("s", 3);
        hashTable.put("t", 4);
        hashTable.put("s", 5);
        const finalSize = hashTable.tableSize;
        expect(finalSize).toBeGreaterThan(initialSize);
    });

});