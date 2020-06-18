randomizeDirection = () => ['n', 'e', 's', 'w'].sort(() => Math.random() - 0.5)

const generateMaze = (maze, [xStart, yStart]) => {
  dx = {
    e: 1, w: -1, n: 0, s: 0,
  }
  dy = {
    e: 0, w: 0, n: 1, s: -1,
  }
  opposite = {
    e: 'w', w: 'e', n: 's', s: 'n',
  }

  carve_passages_from = (cx, cy, grid) => {
    directions = randomizeDirection()
    directions.map((direction) => {
      ny = cy + dy[direction]
      nx = cx + dx[direction]
      if (
        ny >= 0
        && ny < grid.length
        && nx >= 0
        && nx < grid[0].length
        && grid[ny][nx].visited == false
      ) {
        console.log({ cy, cx })
        console.log({ ny, nx })

        grid[cy][cx].visited = true
        grid[cy][cx][direction] = false
        grid[ny][nx].visited = true
        grid[ny][nx][opposite[direction]] = false
        carve_passages_from(nx, ny, grid)
      }
    })
    return grid
  }
  return carve_passages_from(xStart, yStart, maze)
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
  console.log(` ${'_'.repeat(width * 2 - 1)}`)
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

grid = generateMaze(mazegen(15, 5), [0, 0])

console.log(grid)
logmaze(grid)
