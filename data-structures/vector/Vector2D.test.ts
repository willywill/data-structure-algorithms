/* global describe it, expect */
import Vector2D from './Vector2D';

describe('Vector2D', () => {
  it('dot product', () => {
    const a = new Vector2D(1, 0);
    const b = new Vector2D(0, 1);
    expect(a.dot(b)).toBe(0);
    expect(new Vector2D(2, 3).dot(new Vector2D(4, 5))).toBe(23);
  });

  it('normal returns unit vector', () => {
    const v = new Vector2D(3, 4);
    const n = v.normal();
    expect(n.magnitude()).toBeCloseTo(1);
    expect(n.x).toBeCloseTo(0.6);
    expect(n.y).toBeCloseTo(0.8);
  });

  it('normal of zero vector is zero', () => {
    const n = new Vector2D(0, 0).normal();
    expect(n.x).toBe(0);
    expect(n.y).toBe(0);
  });

  it('cross z-component', () => {
    const a = new Vector2D(1, 0);
    const b = new Vector2D(0, 1);
    expect(a.cross(b)).toBe(1);
    expect(b.cross(a)).toBe(-1);
  });

  it('perpendicular is 90° CCW', () => {
    const p = new Vector2D(1, 0).perpendicular();
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBe(1);
  });

  it('add and subtract', () => {
    const a = new Vector2D(1, 2);
    const b = new Vector2D(3, 4);
    const s = a.add(b);
    const d = b.subtract(a);
    expect(s.x).toBe(4);
    expect(s.y).toBe(6);
    expect(d.x).toBe(2);
    expect(d.y).toBe(2);
  });

  it('scale and negate', () => {
    const v = new Vector2D(2, -3);
    const scaled = v.scale(2);
    expect(scaled.x).toBe(4);
    expect(scaled.y).toBe(-6);
    const neg = v.negate();
    expect(neg.x).toBe(-2);
    expect(neg.y).toBe(3);
  });

  it('static distance between points', () => {
    const a = new Vector2D(0, 0);
    const b = new Vector2D(3, 4);
    expect(Vector2D.distance(a, b)).toBe(5);
    expect(Vector2D.distanceSquared(a, b)).toBe(25);
  });

  it('instance distance matches static', () => {
    const a = new Vector2D(1, 1);
    const b = new Vector2D(4, 5);
    expect(a.distance(b)).toBe(Vector2D.distance(a, b));
  });

  it('magnitudeSquared', () => {
    expect(new Vector2D(3, 4).magnitudeSquared()).toBe(25);
  });
});
