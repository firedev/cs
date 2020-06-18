arr = [2, 3, 4, 5, 1, 10, 9, 8, 7]
steps = []
steps = []

const bubbleSort = (arr) => {
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      steps.push(arr)
      if (arr[j] > arr[i]) {
        x = arr[j]
        arr[j] = arr[i]
        arr[i] = x
      }
    }
  }
}

bubbleSort(arr)
console.log(arr)
console.log(steps.length)

arr = [2, 3, 4, 5, 1, 10, 9, 8, 7]
steps = []
const quickSort = (arr) => {
  do {
    swapped = false
    for (i = 0; i < arr.length; i++) {
      steps.push(arr)
      if (arr[i] > arr[i + 1]) {
        x = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = x
        swapped = true
      }
    }
  } while (swapped)
}

quickSort(arr)
console.log(arr)
console.log(steps.length)
