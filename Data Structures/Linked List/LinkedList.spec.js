import LinkedList from './LinkedList'

describe('Linked List', () => {

    it ('Can be imported and used', () => {
        const linkedList = new LinkedList();
        expect(typeof linkedList).toBeDefined();
    });

    it ('Append Method', () => {
        const linkedList = new LinkedList();
        linkedList.appendNode("Hi");
        const result = linkedList.size();
        expect(result).toBe(1);
    });

    it ('Prepend Method', () => {
        const linkedList = new LinkedList();
        linkedList.appendNode(4);
        linkedList.prependNode(2);
        const result = linkedList.head.data;
        expect(result).toBe(2);
    });

    it ('Remove Method', () => {
        const linkedList = new LinkedList();
        linkedList.appendNode(4);
        linkedList.removeNode(0);
        const result = linkedList.isEmpty();
        expect(result).toBe(true);
    });

    it ('GetNode Method', () => {
        const linkedList = new LinkedList();
        linkedList.appendNode("Hi");
        const result = linkedList.getNode(0);
        expect(result).toBe("Hi");
    });

    it ('Contains Method', () => {
        const linkedList = new LinkedList();
        linkedList.appendNode("Hi");
        const result = linkedList.contains("Hi");
        expect(result).toBe(0);
    });

    it ('Size Method', () => {
        const linkedList = new LinkedList();
        linkedList.appendNode("Hi");
        const result = linkedList.size();
        expect(result).toBe(1);
    });

    it ('isEmpty Method', () => {
        const linkedList = new LinkedList();
        linkedList.appendNode(0);
        const result = linkedList.isEmpty();
        expect(result).toBe(false);
    });

});
