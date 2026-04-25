/* global describe it, expect */
import CircularDoublyLinkedList from './CircularDoublyLinkedList';

describe('Circular Doubly Linked List', () => {
  it('Can be imported and used', () => {
    const circularList = new CircularDoublyLinkedList();
    expect(circularList).toBeDefined();
  });

  it('Prepend Method', () => {
    const circularList = new CircularDoublyLinkedList();
    circularList.prependNode('Third');
    circularList.prependNode('Second');
    circularList.prependNode('First');
    const result = circularList.head.data;
    expect(result).toBe('First');
  });

  it('Append Method', () => {
    const circularList = new CircularDoublyLinkedList();
    circularList.appendNode(3);
    const result = circularList.contains(3);
    expect(result).toBe(0);
  });

  it('Remove Method', () => {
    const circularList = new CircularDoublyLinkedList();
    circularList.appendNode(4);
    circularList.appendNode(2);
    circularList.prependNode(5);
    circularList.removeNode(1);
    const result = circularList.head.next.data;
    expect(result).toBe(2);
  });

  it('GetNode Method', () => {
    const circularList = new CircularDoublyLinkedList();
    circularList.appendNode('Hi');
    const result = circularList.getNode(0);
    expect(result).toBe('Hi');
  });

  it('Contains Method', () => {
    const circularList = new CircularDoublyLinkedList();
    circularList.appendNode('Hi');
    const result = circularList.contains('Hi');
    expect(result).toBe(0);
  });

  it('Size Method', () => {
    const circularList = new CircularDoublyLinkedList();
    circularList.appendNode('Hi');
    const result = circularList.size();
    expect(result).toBe(1);
  });

  it('isEmpty Method', () => {
    const circularList = new CircularDoublyLinkedList();
    circularList.appendNode(0);
    const result = circularList.isEmpty();
    expect(result).toBe(false);
  });

  it('Is Circular', () => {
    const circularList = new CircularDoublyLinkedList();
    circularList.appendNode(0);
    circularList.appendNode(2);
    circularList.appendNode(1);
    const result = circularList.tail.next.data;
    expect(result).toBe(0);
  });
});
