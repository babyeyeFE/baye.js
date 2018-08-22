/**
 * 数学类
 */
export class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  set(x, y) {
    this.x = x
    this.y = y
  }

  add(v) {
    this.x += v.x
    this.y += v.y
  }

  sub(v) {
    this.x -= v.x
    this.y -= v.y
  }

  mult(m) {
    this.x *= m
    this.y *= m
  }

  div(m) {
    this.x /= m
    this.y /= m
  }

  dot(v) {
    return this.x * v.x + this.y * v.y
  }

  normalize() {
    let m = this.mag()
    if (m === 0) {m = 1}
    this.x /= m
    this.y /= m
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  limit(n) {
    let m = this.mag()
    if (m > n) {
      this.normalize()
      this.mult(n)
    }
  }

  heading() {
    return Math.atan2(this.y, this.x) * 180 / Math.PI
  }

  neg() {
    this.x = -this.x
    this.y = -this.y
  }

  get() {
    return new Vec2(this.x, this.y)
  }

  static distance(v1, v2) {
    return Vec2.sub(v2, v1).mag()
  }

  static add(v1, v2) {
    return new Vec2(v1.x + v2.x, v1.y + v2.y)
  }

  static sub(v1, v2) {
    return new Vec2(v1.x - v2.x, v1.y - v2.y)
  }

  static mult(v, m) {
    return new Vec2(v.x * m, v.y * m)
  }

  static div(v, m) {
    return new Vec2(v.x / m, v.y / m)
  }
}
