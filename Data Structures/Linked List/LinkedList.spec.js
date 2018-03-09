import LinkedList from './LinkedList'

describe('Linked List', () => {

    it ('Can be imported and used', () => {
        const linkedList = new LinkedList();
        expect(typeof linkedList).toBeDefined();
    });

});