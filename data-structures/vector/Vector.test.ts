/* global describe it, expect */
import Vector from './Vector';

describe('Vector', () => {
  it('Can be imported and used', () => {
    const vector = new Vector();
    expect(vector).toBeDefined();
  });

  it('Push increases size', () => {
    const vector = new Vector<string>();
    vector.push('a');
    vector.push('b');
    expect(vector.size()).toBe(2);
    expect(vector.get(0)).toBe('a');
    expect(vector.get(1)).toBe('b');
  });

  it('Pop removes the last element', () => {
    const vector = new Vector<number>();
    vector.push(1);
    vector.push(2);
    expect(vector.pop()).toBe(2);
    expect(vector.size()).toBe(1);
    expect(vector.pop()).toBe(1);
    expect(vector.pop()).toBeNull();
  });

  it('Get returns null for out-of-range index', () => {
    const vector = new Vector<number>();
    vector.push(1);
    expect(vector.get(-1)).toBeNull();
    expect(vector.get(1)).toBeNull();
  });

  it('Set writes at index', () => {
    const vector = new Vector<number>();
    vector.push(0);
    vector.set(0, 42);
    expect(vector.get(0)).toBe(42);
  });

  it('isEmpty is true for a new vector', () => {
    expect(new Vector().isEmpty()).toBe(true);
  });

  it('Clear removes all elements', () => {
    const vector = new Vector<number>();
    vector.push(1);
    vector.clear();
    expect(vector.isEmpty()).toBe(true);
    expect(vector.size()).toBe(0);
  });

  it('Constructs from an initial array', () => {
    const vector = new Vector([1, 2, 3]);
    expect(vector.size()).toBe(3);
    expect(vector.get(2)).toBe(3);
  });
});
