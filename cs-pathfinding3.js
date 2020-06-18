logmap = (map) => {
  console.log(
    map.map((row) => row
      .map((cell) => {
        const c = `${cell}`
        return cell.owned ? ` ${cell.owned}` : c == 0 ? '  ' : c
      })
      .join(' ')),
  )
}

const emptyMap = [
  ['  ', '[]', '  ', '  ', '  '],
  ['  ', '[]', '  ', ' ', '  '],
  ['  ', '  ', '  ', '[]', '  '],
  ['[]', '[]', '[]', ' ', '  '],
  ['  ', '  ', '  ', '  ', '  '],
]
const map = [
  ['  ', '[]', '  ', '  ', '  '],
  ['  ', '[]', '  ', ' ', '  '],
  ['  ', '  ', '  ', '[]', '  '],
  ['[]', '[]', '[]', ' ', '  '],
  ['  ', '  ', '  ', '  ', '  '],
]

const solve = (map, nodes) => {
  queue = [
    {
      x: nodes[0].x, y: nodes[0].y, depth: 1, owned: 1,
    },
    {
      x: nodes[1].x, y: nodes[1].y, depth: 1, owned: 2,
    },
  ]

  makeNeighbors = (node) => {
    const {
      x, y, depth, owned,
    } = node
    if ((top = makeNode({
      x, y: y - 1, depth: depth + 1, owned,
    }))) queue.push(top)
    if ((right = makeNode({
      x: x + 1, y, depth: depth + 1, owned,
    }))) queue.push(right)
    if ((bottom = makeNode({
      x, y: y + 1, depth: depth + 1, owned,
    }))) queue.push(bottom)
    if ((left = makeNode({
      x: x - 1, y, depth: depth + 1, owned,
    }))) queue.push(left)
  }

  const makeNode = ({
    x, y, depth, parent, owned,
  }) => {
    if (
      x < 0
      || y < 0
      || y > map[0].length
      || x >= map.length
      || map[x][y] != '  '
    ) return null
    if (map[x][y].owned) throw depth + map[x][y].depth
    const cell = {
      x, y, depth, owned,
    }
    return cell
  }

  const traverse = (queue) => {
    console.log(queue)
    logmap(map)

    if (!queue.length) return map
    const node = queue.shift()
    const {
      x, y, depth, parent,
    } = node
    map[x][y] = node
    makeNeighbors(node)
    return traverse(queue)
  }
  traverse(queue)
}

solve(map, [
  { x: 0, y: 0 },
  { x: 4, y: 4 },
])
