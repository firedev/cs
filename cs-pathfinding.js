const NO_ONE = 0
const BY_A = 1
const BY_B = 2

function logMaze(maze) {
  console.log('================')
  let header = 'XX | '
  let subheader = '-----'
  for (let i = 0; i < maze[0].length; i++) {
    const num = i >= 10 ? i : `0${i}`
    header += `${num} `
    subheader += '---'
  }
  console.log(header)
  console.log(subheader)
  maze.forEach((row, i) => {
    const num = i >= 10 ? i : `0${i}`
    let buffer = `${num} | `

    row.forEach((item) => {
      if (item.closed) {
        buffer += 'XX '
      } else if (item.openedBy === NO_ONE) {
        buffer += '•• '
      } else {
        buffer
          += `${item && item.length >= 10
            ? item.length
            : `0${item.length || '?'}`} `
      }
    })

    console.log(buffer)
  })
}

const maze = [
  [2, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 2],
]

const breadthTraverse = (queue, array = []) => {
  if (!queue.length) return array
  const node = queue.shift()
  array.push([node.x, node.y])
  if (node.top) queue.push(node.top)
  if (node.right) queue.push(node.right)
  if (node.bottom) queue.push(node.bottom)
  if (node.left) queue.push(node.left)
  return breadthTraverse(queue, array)
}

const solve = (maze, [ax, ay]) => {
  const map = new Array(maze.length).fill(
    new Array(maze[0].length).fill({
      openedBy: NO_ONE,
    }),
  )

  makeCell = ({ depth, x, y }) => {
    const w = map[0].length - 1
    const h = map.length - 1
    console.log({
      x,
      y,
      depth,
    })
    if (x < 0) return null
    if (x > w) return null
    if (y < 0) return null
    if (y > h) return null
    if (map[x][y].openedBy != NO_ONE) return null
    map[x][y].openedBy = BY_A
    const cell = {
      depth,
      x,
      y,
    }
    return cell
  }

  traverse = (queue, array = []) => {
    if (!queue.length) return array
    const cell = queue.shift()
    array.push([cell.x, cell.y, cell.depth])
    if (
      (top = makeCell({
        depth: cell.depth + 1,
        x: cell.x,
        y: cell.y - 1,
      }))
    ) queue.push(top)
    if (
      (right = makeCell({
        depth: cell.depth + 1,
        x: cell.x + 1,
        y: cell.y,
      }))
    ) queue.push(right)
    if (
      (bottom = makeCell({
        depth: cell.depth + 1,
        cell,
        x: cell.x,
        y: cell.y + 1,
      }))
    ) queue.push(bottom)
    if (
      (left = makeCell({
        depth: cell.depth + 1,
        cell,
        x: cell.x + 1,
        y: cell.y,
      }))
    ) queue.push(left)
    return traverse(queue, array)
  }

  console.log(
    traverse([
      {
        x: ax,
        y: ay,
        depth: 1,
      },
    ]),
  )
}
// solve(maze, [0, 0])

const solve2 = (maze, [ax, ay]) => {
  const map = new Array(maze.length).fill(
    new Array(maze[0].length).fill({
      openedBy: NO_ONE,
    }),
  )

  class Cell {
    constructor({
      x, y, parent, length,
    }) {
      this.x = x
      this.y = y
      this.parent = parent || null
      this.length = length || 1
      map[x][y] = {
        openedBy: BY_A,
        length: this.length,
      }

      this.top = this.makeCell({
        x: this.x,
        y: this.y - 1,
      })
      this.left = this.makeCell({
        x: this.x - 1,
        y: this.y,
      })
      this.right = this.makeCell({
        x: this.x + 1,
        y: this.y,
      })
      this.bottom = this.makeCell({
        x: this.x,
        y: this.y + 1,
      })
      console.log(this)
    }

    makeCell({ x, y }) {
      console.log({
        x,
        y,
        free: map[x] && map[x][y] && map[x][y].openedBy != NO_ONE,
      })
      const w = map[0].length - 1
      const h = map.length - 1
      if (x < 0) return null
      if (x > w) return null
      if (y < 0) return null
      if (y > h) return null

      if (map[x][y].openedBy != NO_ONE) return null
      console.log(x, y, 'good')
      const cell = new Cell({
        x,
        y,
        length: this.length + 1,
        parent: this,
      })
      return cell
    }

    maze() {
      console.log(map)
      logMaze(map)
    }

    graph() {
      console.log(breadthTraverse([this]))
    }
  }

  const a = new Cell({
    x: ax,
    y: ay,
  })

  //  a.graph()
  //  a.maze()
  //  // const b = new Cell(bx, by)
  //
}
solve2(maze, [0, 0], [3, 3])
