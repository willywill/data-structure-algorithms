/**
 * Two-dimensional vector for plane geometry (`x`, `y` components).
 */
export default class Vector2D {
  x: number;

  y: number;

  /**
   * @param x - Horizontal component.
   * @param y - Vertical component.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Euclidean length.
   *
   * @returns Magnitude of this vector.
   * @memberof Vector2D
   */
  magnitude(): number {
    return Math.hypot(this.x, this.y);
  }

  /**
   * Squared length (avoids `sqrt` when comparing distances).
   *
   * @returns `x² + y²`.
   * @memberof Vector2D
   */
  magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Dot product with another vector.
   *
   * @param other - Second vector.
   * @returns Scalar `this · other`.
   * @memberof Vector2D
   */
  dot(other: Vector2D): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Z-component of the 3D cross product `(this × other)` (scalar in 2D).
   *
   * @param other - Second vector.
   * @returns Signed parallelogram area factor `this.x * other.y - this.y * other.x`.
   * @memberof Vector2D
   */
  cross(other: Vector2D): number {
    return this.x * other.y - this.y * other.x;
  }

  /**
   * Unit vector in the same direction; zero vector stays zero.
   *
   * @returns New vector with length `1` when possible.
   * @memberof Vector2D
   */
  normal(): Vector2D {
    const len = this.magnitude();
    if (len === 0) {
      return new Vector2D(0, 0);
    }
    return new Vector2D(this.x / len, this.y / len);
  }

  /**
   * Vector rotated 90° counter-clockwise (perpendicular, same magnitude).
   *
   * @returns New vector `(-y, x)`.
   * @memberof Vector2D
   */
  perpendicular(): Vector2D {
    return new Vector2D(-this.y, this.x);
  }

  /**
   * Component-wise sum.
   *
   * @param other - Vector to add.
   * @returns New vector `this + other`.
   * @memberof Vector2D
   */
  add(other: Vector2D): Vector2D {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  /**
   * Component-wise difference.
   *
   * @param other - Vector to subtract.
   * @returns New vector `this - other`.
   * @memberof Vector2D
   */
  subtract(other: Vector2D): Vector2D {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  /**
   * Scalar multiplication.
   *
   * @param scalar - Scale factor.
   * @returns New vector `scalar * this`.
   * @memberof Vector2D
   */
  scale(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  /**
   * Negation.
   *
   * @returns New vector `-this`.
   * @memberof Vector2D
   */
  negate(): Vector2D {
    return new Vector2D(-this.x, -this.y);
  }

  /**
   * Euclidean distance between two position vectors (points).
   *
   * @param a - First point.
   * @param b - Second point.
   * @returns Distance `‖b - a‖`.
   * @memberof Vector2D
   */
  static distance(a: Vector2D, b: Vector2D): number {
    return b.subtract(a).magnitude();
  }

  /**
   * Squared distance between two points.
   *
   * @param a - First point.
   * @param b - Second point.
   * @returns `‖b - a‖²`.
   * @memberof Vector2D
   */
  static distanceSquared(a: Vector2D, b: Vector2D): number {
    return b.subtract(a).magnitudeSquared();
  }

  /**
   * Distance from this point to another.
   *
   * @param other - Other point.
   * @returns Same as `Vector2D.distance(this, other)`.
   * @memberof Vector2D
   */
  distance(other: Vector2D): number {
    return Vector2D.distance(this, other);
  }
}
