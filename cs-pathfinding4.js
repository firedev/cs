const NO_ONE = 0
const BY_A = 1
const BY_B = 2

const logmap = (map) => {
  map.map((row) => {
    console.log(row.map((point) => point.openedBy).join(' '))
  })
}

const findShortestPathLength = (maze, [xA, yA], [xB, yB]) => {
  const visited = maze.map((row, y) => row.map((point, x) => ({
    x,
    y,
    closed: point === 1,
    length: 0,
    openedBy: NO_ONE,
  })))
  visited[yA][xA].openedBy = BY_A
  visited[yB][xB].openedBy = BY_B

  let aQueue = [visited[yA][xA]]
  let bQueue = [visited[yB][xB]]
  let iteration = 0

  while (aQueue.length && bQueue.length) {
    iteration++
    const aNeighbors = aQueue.reduce(
      (acc, neighbor) => acc.concat(getNeighbors(visited, neighbor.x, neighbor.y)),
      [],
    )
    aQueue = []
    for (neighbor of aNeighbors) {
      if (neighbor.openedBy === BY_B) {
        return neighbor.length + iteration
      } if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration
        neighbor.openedBy = BY_A
        aQueue.push(neighbor)
      }
    }
    const bNeighbors = bQueue.reduce(
      (acc, neighbor) => acc.concat(getNeighbors(visited, neighbor.x, neighbor.y)),
      [],
    )
    bQueue = []
    for (neighbor of bNeighbors) {
      if (neighbor.openedBy === BY_A) {
        return neighbor.length + iteration
      } if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration
        neighbor.openedBy = BY_B
        bQueue.push(neighbor)
      }
    }
    logmap(visited)
  }
  return -1
}

const getNeighbors = (visited, x, y) => {
  const neighbors = []
  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    // up
    neighbors.push(visited[y - 1][x])
  }
  if (y + 1 < visited[0].length && !visited[y + 1][x].closed) {
    // down
    neighbors.push(visited[y + 1][x])
  }
  if (x + 1 < visited.length && !visited[y][x + 1].closed) {
    // right
    neighbors.push(visited[y][x + 1])
  }
  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    // left
    neighbors.push(visited[y][x - 1])
  }
  return neighbors
}
const map = [
  [2, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 2],
]

console.log(findShortestPathLength(map, [0, 0], [3, 3]))
