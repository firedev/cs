randomizeDirection = () => ['n', 'e', 's', 'w'].sort(() => Math.random() - 0.5)

const generateMaze = (maze, [xStart, yStart]) => {
  const modifiers = {
    n: [0, 1],
    s: [0, -1],
    e: [1, 0],
    w: [-1, 0],
  }

  const opposite = {
    n: 's',
    s: 'n',
    e: 'w',
    w: 'e',
  }

  const nextNode = (x, y, maze) => {
    const node = maze[y][x]
    node.visited = true
    randomizeDirection().map((direction) => {
      const [xMod, yMod] = modifiers[direction]
      const [nx, ny] = [x + xMod, y + yMod]
      if (maze[ny] && maze[ny][nx] && !maze[ny][nx].visited) {
        node[direction] = false
        maze[y + yMod][x + xMod][opposite[direction]] = false
        nextNode(x + xMod, y + yMod, maze)
      }
    })
    return maze
  }
  return nextNode(xStart, yStart, maze)
}

const mazegen = (w, h) => new Array(h)
  .fill()
  .map((_, y) => new Array(w)
    .fill()
    .map((_, x) => ({
      n: true, e: true, s: true, w: true, visited: false,
    })))

const write = (x) => process.stdout.write(x)
logmaze = (grid) => {
  width = grid[0].length
  height = grid.length
  console.log(`.${'_'.repeat(width * 2 - 1)}.`)
  grid.map((_, yy) => {
    const y = height - yy - 1
    write('|')
    grid[0].map((_, x) => {
      write(grid[y][x].s ? '_' : ' ')
      if (grid[y][x].e) {
        write('|')
      } else {
        write(grid[y][x].s ? '_' : ' ')
      }
    })
    console.log()
  })
}

grid = generateMaze(mazegen(30, 40), [0, 0])

logmaze(grid)
