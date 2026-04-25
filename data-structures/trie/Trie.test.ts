/* global describe it, expect */
import Trie from './Trie';

describe('Trie', () => {
  it('Can be imported and used', () => {
    const trie = new Trie();
    expect(trie).toBeDefined();
  });

  it('search returns false for an empty trie', () => {
    const trie = new Trie();
    expect(trie.search('anything')).toBe(false);
  });

  it('insert makes search true for that word', () => {
    const trie = new Trie();
    trie.insert('apple');
    expect(trie.search('apple')).toBe(true);
  });

  it('search is false for a string that was never inserted', () => {
    const trie = new Trie();
    trie.insert('apple');
    expect(trie.search('banana')).toBe(false);
  });

  it('search is false when the path exists only as a prefix of a longer word', () => {
    const trie = new Trie();
    trie.insert('hello');
    expect(trie.search('hell')).toBe(false);
    expect(trie.search('hello')).toBe(true);
  });

  it('startsWith is true for a full inserted word', () => {
    const trie = new Trie();
    trie.insert('test');
    expect(trie.startsWith('test')).toBe(true);
  });

  it('startsWith is true for proper prefixes of an inserted word', () => {
    const trie = new Trie();
    trie.insert('testing');
    expect(trie.startsWith('test')).toBe(true);
    expect(trie.startsWith('t')).toBe(true);
  });

  it('startsWith is false when no inserted word shares that prefix', () => {
    const trie = new Trie();
    trie.insert('foo');
    expect(trie.startsWith('bar')).toBe(false);
  });

  it('startsWith with empty string is true', () => {
    const trie = new Trie();
    expect(trie.startsWith('')).toBe(true);
    trie.insert('a');
    expect(trie.startsWith('')).toBe(true);
  });

  it('supports multiple words with a shared prefix', () => {
    const trie = new Trie();
    trie.insert('car');
    trie.insert('card');
    trie.insert('care');
    expect(trie.search('car')).toBe(true);
    expect(trie.search('card')).toBe(true);
    expect(trie.search('care')).toBe(true);
    expect(trie.startsWith('ca')).toBe(true);
  });

  it('inserting the same word twice still reports it as present', () => {
    const trie = new Trie();
    trie.insert('dup');
    trie.insert('dup');
    expect(trie.search('dup')).toBe(true);
  });
});
