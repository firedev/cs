const map = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]
console.log(map[0].length)
console.log(map.length)
class Cell {
  constructor({ x, y, depth }) {
    console.log(x, y)
    if (
      x < 0
      || y < 0
      || x > map[0].length - 1
      || y > map.length - 1
      || map[x][y] !== 0
    ) {
      return null
    }
    this.x = x
    this.y = y
    this.depth = depth || 1
    map[x][y] = this.depth < 10 ? `0${depth}` : depth
    this.top = this.makeCell({ x: this.x, y: this.y - 1 })
    this.right = this.makeCell({ x: this.x + 1, y: this.y })
    this.bottom = this.makeCell({ x: this.x, y: this.y + 1 })
    this.left = this.makeCell({ x: this.x - 1, y: this.y })
  }

  makeCell({ x, y }) {
    const cell = new Cell({ x, y, depth: this.depth + 1 })
    if (cell.depth) return cell
    return null
  }
}

a = new Cell({ x: 0, y: 0 })
// b = new Cell({x:3, y:3})
logMap = map.map((row) => console.log(row.join(' ')))
