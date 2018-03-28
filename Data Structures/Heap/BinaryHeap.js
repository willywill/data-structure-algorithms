// Private methods
const maxHeapCompare = (a, b) => a.key > b.key ? -1 : a.key < b.key ? 1 : 0;
const minHeapCompare = (a, b) => a.key > b.key ? 1 : a.key < b.key ? -1 : 0;

const getLeftNode = (i) => 2 * i + 1;
const getRightNode = (i) => 2 * i + 2;
const getParent = (i) => i === 0 ? Math.floor((i - 1) / 2) : null;

const swap = (list, a, b) => {
    const temp = list[a];
    list[a] = list[b];
    list[b] = temp;
}


class Node {
    constructor (key, value) {
        this.key = key;
        this.value = value;
    }
}

export default class BinaryHeap {

    /**
     * Creates an instance of BinaryHeap. Uses min-heap by default.
     * @param {boolean} useMaxHeap 
     * @memberof BinaryHeap
     */
    constructor (useMaxHeap) {
        this.list = [];
        this.compareTo = useMaxHeap ? maxHeapCompare : minHeapCompare;
    }

    /**
     * Heapifies a node. Maintains the heap structure.
     * 
     * @param {any} heap 
     * @param {any} i 
     * @memberof BinaryHeap
     */
    heapify (heap, i) {
        // Retrieve both the left and right nodes in the array.
        const leftNodeIdx = getLeftNode(i);
        const rightNodeIdx = getRightNode(i);

        let currentIdx = i;

        // If the left node is less than the current index, set the temp current to this left node and prepare to swap them.
        if (leftNodeIdx < heap.list.length && heap.compareTo(heap.list[leftNodeIdx], heap.list[i]) < 0) {
            currentIdx = leftNodeIdx;
        }

        // If the right node is less than the current index, set the current index to the right node and prepare to swap them.
        if (rightNodeIdx < heap.list.length && heap.compareTo(heap.list[rightNodeIdx], heap.list[currentIdx]) < 0) {
            currentIdx = rightNodeIdx;
        } 

        // If the indices aren't the same, swap, rinse, repeat.
        if (currentIdx !== i) {
            swap(heap.list, i, currentIdx);
            this.heapify(heap, currentIdx);
        }
    }

    buildHeap () {

    }

    insert () {

    }

    remove () {

    }
    
    extractMin () {

    }

    extractMax () {

    }

    unionWith () {

    }

    clear () {
        this.list = [];
    }

    isEmpty () {
        return !this.list.length;
    }

    size () {
        return this.list.length;
    }

}
