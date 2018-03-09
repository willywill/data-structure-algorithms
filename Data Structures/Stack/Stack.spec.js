import Stack from './Stack'

describe('Stack', () => {

    it ('Can be imported and used', () => {
        const stack = new Stack();
        expect(typeof stack).toBeDefined();
    });

    it ('Push Method', () => {
        const stack = new Stack();
        stack.push("Hello, World");
        const result = stack.size();
        expect(result).toBe(1);
    });

    it ('Pop Method', () => {
        const stack = new Stack();
        stack.push(3);
        stack.push(2);
        stack.push(1);
        const result = stack.pop();
        expect(result).toBe(1);
    });

    it ('Peek Method', () => {
        const stack = new Stack();
        stack.push(3);
        stack.push(2);
        stack.push(1);
        const result = stack.peek();
        expect(result).toBe(1);
    });

    it ('Size Method', () => {
        const stack = new Stack();
        stack.push(3);
        stack.push(2);
        stack.push(1);
        const result = stack.size();
        expect(result).toBe(3);
    });

    it ('isEmpty Method', () => {
        const stack = new Stack();
        const result = stack.isEmpty();
        expect(result).toBe(true);
    });
});
