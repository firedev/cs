const users = {
  1: {
    connections: [2, 3],
    title: 'teacher',
    name: 'nick',
  },
  2: {
    connections: [2, 3],
    title: 'carpenter',
    name: 'jack',
  },
  3: {
    connections: [2, 3],
    title: 'carpenter',
    name: 'john',
  },
}

const getUser = (id) => users[id]

const findMostCommonTitle = (myId, getUser, degreesOfSeparation) => {
  const visited = new Set()
  const titles = {}
  let level = 0
  let queue = [myId]
  while (level <= degreesOfSeparation) {
    queue = queue
      .filter((x) => !visited.has(x))
      .map(getUser)
      .map((user) => {
        visited.add(user.id)
        titles[user.title] = titles[user.title] ? titles[user.title] + 1 : 1
        return user.connections
      })
      .reduce((a, connections) => a.concat(connections))
    level++
  }
  return Object.entries(titles).sort((a, b) => (a[1] < b[1] ? 1 : -1))[0][0]
}

console.log(findMostCommonTitle(1, getUser, 1))
