import DoublyLinkedList from './DoublyLinkedList';

describe('Doubly Linked List', () => {

    it ('Can be imported and used', () => {
        const linkedList = new DoublyLinkedList();
        expect(linkedList).toBeDefined();
    });

    it ('Prepend Method', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.prependNode("Third");
        linkedList.prependNode("Second");
        linkedList.prependNode("First");
        const result = linkedList.head.data;
        expect(result).toBe("First");
    });

    it ('Append Method', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.appendNode(3);
        const result = linkedList.contains(3);
        expect(result).toBe(0);
    });

    it ('Remove Method', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.appendNode(4);
        linkedList.appendNode(2);
        linkedList.prependNode(5);
        linkedList.removeNode(1);
        const result = linkedList.head.next.data;
        expect(result).toBe(2);
    });

    it ('GetNode Method', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.appendNode("Hi");
        const result = linkedList.getNode(0);
        expect(result).toBe("Hi");
    });

    it ('Contains Method', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.appendNode("Hi");
        const result = linkedList.contains("Hi");
        expect(result).toBe(0);
    });

    it ('Size Method', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.appendNode("Hi");
        const result = linkedList.size();
        expect(result).toBe(1);
    });

    it ('isEmpty Method', () => {
        const linkedList = new DoublyLinkedList();
        linkedList.appendNode(0);
        const result = linkedList.isEmpty();
        expect(result).toBe(false);
    });

});
