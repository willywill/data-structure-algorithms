/** One node in a character trie: children keyed by single-character suffixes. */
class TrieNode {
  /** Child nodes for the next character in a string. */
  children: Map<string, TrieNode>;

  /** Whether a string ending exactly at this node was inserted. */
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

/**
 * Prefix tree (trie) for string keys: supports insert and exact / prefix queries in O(length of key) time
 * with alphabet-sized branching at each level.
 */
export default class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Inserts a word into the trie (letters are iterated in order).
   *
   * @param word - Non-empty string of characters to store.
   */
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch) as TrieNode;
    }
    node.isEndOfWord = true;
  }

  /**
   * Returns whether the exact word was previously inserted.
   *
   * @param word - Query string.
   */
  search(word: string): boolean {
    const node = this.walk(word);
    return !!node?.isEndOfWord;
  }

  /**
   * Returns whether any inserted word has `prefix` as a prefix (including a full word equal to `prefix`).
   *
   * @param prefix - Prefix to test.
   */
  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null;
  }

  /** Walks the trie following `s`; returns `null` if any character is missing. */
  private walk(s: string): TrieNode | null {
    let node: TrieNode = this.root;
    for (const ch of s) {
      const next = node.children.get(ch);
      if (!next) {
        return null;
      }
      node = next;
    }
    return node;
  }
}
