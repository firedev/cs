class LinkedList {
  constructor({ value, head, tail }) {
    this.value = value
    this.head = head
    this.tail = tail
  }

  add(value) {
    if (this.tail) { return this.tail.add(value) }
    this.tail = new LinkedList({ value, head: this })
  }

  toString() {
    if (this.tail) {
      return [this.value, this.tail.toString()].join(', ')
    }
    return this.value
  }
}

x = new LinkedList({ value: 1 })
x.add(5)
x.add(6)
x.add(7)

console.log(x.toString())
