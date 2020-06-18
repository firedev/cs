const tree = {
  value: 'A',
  left: {
    value: 'B',
    left: {
      value: 'D',
      left: {
        value: 'G',
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      value: 'E',
      left: null,
      right: {
        value: 'H',
        left: {
          value: 'K',
          left: null,
          right: null,
        },
      },
    },
  },
  right: {
    value: 'C',
    left: {
      value: 'F',
      left: {
        value: 'I',
        left: null,
        right: null,
      },
      right: {
        value: 'J',
        left: null,
        right: null,
      },
    },
    right: null,
  },
}

const breadthTraverse = (queue, array = []) => {
  if (!queue || !queue.length) return array
  while (queue.length) {
    const node = queue.shift()
    array.push(node.value)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
  return array
}

const breadthTraverse2 = (queue, array = []) => {
  if (!queue.length) return array
  const node = queue.shift()
  array.push(node.value)
  if (node.left) queue.push(node.left)
  if (node.right) queue.push(node.right)
  return breadthTraverse2(queue, array)
}

console.log(breadthTraverse([tree]))
console.log(breadthTraverse2([tree]))
