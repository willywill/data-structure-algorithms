/* global describe it, expect */
import HashSet from './HashSet';

describe('Hash Set', () => {
  it('Can be imported and used', () => {
    const hashSet = new HashSet();
    expect(hashSet).toBeDefined();
  });

  it('Add Method', () => {
    const hashSet = new HashSet();
    hashSet.add('Bob');
    hashSet.add('Joe');
    const result = hashSet.size();
    expect(result).toBe(2);
  });

  it('Has Method', () => {
    const hashSet = new HashSet();
    hashSet.add('Bob');
    hashSet.add('Joe');
    const result = hashSet.has('Bob');
    expect(result).toBe(true);
  });

  it('Remove Method', () => {
    const hashSet = new HashSet();
    hashSet.add('Bob');
    hashSet.remove('Bob');
    const result = hashSet.has('Bob');
    expect(result).toBe(false);
  });

  it('ToArray Method', () => {
    const hashSet = new HashSet();
    hashSet.add('Bob');
    hashSet.add('Joe');
    const result = hashSet.toArray();
    expect(result).toEqual(['Bob', 'Joe']);
  });

  it('Size Method', () => {
    const hashSet = new HashSet();
    hashSet.add('Bob');
    hashSet.add('Joe');
    const result = hashSet.size();
    expect(result).toBe(2);
  });

  it('Clear Method', () => {
    const hashSet = new HashSet();
    hashSet.add('Bob');
    hashSet.add('Joe');
    hashSet.add('Mary');
    hashSet.clear();
    const result = hashSet.size();
    expect(result).toBe(0);
  });

  it('UnionWith Method', () => {
    const hashSet = new HashSet();
    hashSet.add('Bob');
    const hS = new HashSet();
    hS.add('Joey');
    const hashS = new HashSet();
    hashS.add('Mom');
    const result = hashSet.unionWith(hS, hashS).toArray();
    expect(result).toEqual(['Bob', 'Joey', 'Mom']);
  });
});
