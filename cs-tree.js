class Tree {
  constructor({ value, left, right } = {}) {
    this.value = value || null
    this.left = null
    this.right = null
  }

  add(value) {
    if (this.value === null) {
      this.value = value
      return
    }
    if (value < this.value) {
      this.getLeft().add(value)
    }
    if (value > this.value) {
      this.getRight().add(value)
    }
  }

  getLeft() {
    if (!this.left) this.left = new Tree()
    return this.left
  }

  getRight() {
    if (!this.right) this.right = new Tree()
    return this.right
  }

  toString() {
    return [
      this.left && this.left.toString(),
      this.value,
      this.right && this.right.toString(),
    ]
      .filter((x) => x)
      .join(', ')
  }
}

x = new Tree()
x.add(5)
x.add(6)
x.add(7)
x.add(1)
x.add(10)

console.log(x.toString())
