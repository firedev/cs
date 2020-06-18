const tree = {
  value: 8,
  left: {
    value: 4,
    left: {
      value: 3,
      left: {
        value: 2,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      value: 5,
      left: null,
      right: {
        value: 7,
        left: {
          value: 6,
          left: null,
          right: null,
        },
      },
    },
  },
  right: {
    value: 12,
    left: {
      value: 10,
      left: {
        value: 9,
        left: null,
        right: null,
      },
      right: {
        value: 11,
        left: null,
        right: null,
      },
    },
  },
}

const preorderTraverse = (node, array = []) => {
  if (!node) return array
  array.push(node.value)
  preorderTraverse(node.left, array)
  preorderTraverse(node.right, array)
  return array
}

const inorderTraverse = (node, array = []) => {
  if (!node) return array
  inorderTraverse(node.left, array)
  array.push(node.value)
  inorderTraverse(node.right, array)
  return array
}

const postorderTraverse = (node, array = []) => {
  if (!node) return array
  postorderTraverse(node.left, array)
  postorderTraverse(node.right, array)
  array.push(node.value)
  return array
}

console.log(preorderTraverse(tree))
console.log(inorderTraverse(tree))
console.log(postorderTraverse(tree))
