import BinaryHeap from './BinaryHeap';

describe('Binary Heap', () => {

    it ('Can be imported and used', () => {
        const heap = new BinaryHeap();
        expect(heap).toBeDefined();
    });

    it ('Max Heap', () => {
        const heap = new BinaryHeap(true);
        const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const dataset = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(dataset, keys);
        const result = heap.list[0].key;
        expect(result).toBe(100);
    });

    it ('Min Heap', () => {
        const heap = new BinaryHeap();
        const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const dataset = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(dataset, keys);
        const result = heap.list[0].key;
        expect(result).toBe(1);
    });

    it ('Build Heap Method', () => {
        const heap = new BinaryHeap(true);
        const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const dataset = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(dataset, keys);
        const result = heap.list[0].key;
        expect(result).toBe(100);
    });

    it ('Insert Method', () => {
        const heap = new BinaryHeap(true);
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const keys = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(keys, values);
        heap.insert(103, 111);
        const result = heap.getMax();
        expect(result.key).toBe(103);
    });

    it ('Extract Min Method', () => {
        const heap = new BinaryHeap();
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const keys = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(keys, values);
        const result = heap.extractMin();
        expect(result.key).toBe(1);
    });

    it ('Extract Max Method', () => {
        const heap = new BinaryHeap(true);
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const keys = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(keys, values);
        const result = heap.extractMax();
        expect(result.key).toBe(100);
    });

    it ('Get Max Method', () => {
        const heap = new BinaryHeap(true);
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const keys = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(keys, values);
        const result = heap.getMax();
        expect(result.key).toBe(100);
    });

    it ('Get Min Method', () => {
        const heap = new BinaryHeap();
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const keys = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(keys, values);
        const result = heap.getMin();
        expect(result.key).toBe(1);
    });

    it ('Union With Method', () => {
        const heap = new BinaryHeap(true);
        const heap2 = new BinaryHeap();
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const keys = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        const keys2 = [23, 43, 2];
        const values2 = [1, 2, 3];
        heap.buildHeap(keys, values);
        heap2.buildHeap(keys2, values2);
        heap.unionWith(heap2);
        const result = heap.size();
        expect(result).toBe(12);
    });

    it ('isEmpty Method', () => {
        const heap = new BinaryHeap();
        const result = heap.isEmpty();
        expect(result).toBe(true);
    });

    it ('Clear Method', () => {
        const heap = new BinaryHeap(true);
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const keys = [100, 1, 2, 17, 3, 19, 36, 7, 25];
        heap.buildHeap(keys, values);
        heap.clear();
        const result = heap.size();
        expect(result).toBe(0);
    });

    it ('Size Method', () => {
        const heap = new BinaryHeap();
        const result = heap.size();
        expect(result).toBe(0);
    });

});
