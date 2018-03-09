import Queue from './Queue'

describe('Queue', () => {

    it ('Can be imported and used', () => {
        const queue = new Queue();
        expect(typeof queue).toBeDefined();
    });

    it ('Enqueue Method', () => {
        const queue = new Queue();
        queue.enqueue("Hello, World");
        const result = queue.size();
        expect(result).toBe(1);
    });

    it ('Dequeue Method', () => {
        const queue = new Queue();
        queue.enqueue(3);
        queue.enqueue(2);
        queue.enqueue(1);
        const result = queue.dequeue();
        expect(result).toBe(3);
    });

    it ('Front Method', () => {
        const queue = new Queue();
        queue.enqueue(3);
        queue.enqueue(2);
        queue.enqueue(1);
        const result = queue.front();
        expect(result).toBe(3);
    });

    it ('Size Method', () => {
        const queue = new Queue();
        queue.enqueue(3);
        queue.enqueue(2);
        queue.enqueue(1);
        const result = queue.size();
        expect(result).toBe(3);
    });

    it ('isEmpty Method', () => {
        const queue = new Queue();
        const result = queue.isEmpty();
        expect(result).toBe(true);
    });
});
