class BloomFilter {
  filter = new Array(100).fill()

  add(string) {
    this.hashes(string).map((hash) => (this.filter[hash] = 1))
  }

  hashes(string) {
    return [
      (string) => (string == 'test1' ? 1 : 0),
      (string) => (string == 'test2' ? 2 : 0),
      (string) => (string == 'test3' ? 3 : 0),
    ].map((hash) => hash(string))
  }

  contains(string) {
    const hashes = this.hashes(string)
    return (
      hashes.filter((hash) => this.filter[hash] === 1).length === hashes.length
    )
  }
}

const b = new BloomFilter()
console.log(b.contains('test'))
console.log('\ntest1')
b.add('test1')

console.log(b.contains('test1'))
console.log(b.contains('test2'))
console.log(b.contains('test3'))
console.log('\ntest2')
b.add('test2')

console.log(b.contains('test1'))
console.log(b.contains('test2'))
console.log(b.contains('test3'))
console.log('\ntest3')
b.add('test3')

console.log(b.contains('test1'))
console.log(b.contains('test2'))
console.log(b.contains('test3'))
