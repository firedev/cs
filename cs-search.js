const linearSearch = (id, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) return array[i]
  }
}

const binarySearch = (id, array) => {
  let start = 0

  let end = array.length - 1
  let found
  while (start < end) {
    const mid = Math.floor((start + end) / 2)
    const el = array[mid]
    if (el.id < id) {
      start = mid + 1
    } else if (el.id > id) {
      end = mid - 1
    } else return el
  }
}

let lookingFor = { id: 5, name: 'Brian' }
console.log(
  linearSearch(5, [
    { id: 1, name: 'Sam' },
    { id: 11, name: 'Sarah' },
    { id: 21, name: 'John' },
    { id: 10, name: 'Burke' },
    { id: 13, name: 'Simona' },
    { id: 31, name: 'Asim' },
    { id: 6, name: 'Niki' },
    { id: 19, name: 'Aysegul' },
    { id: 25, name: 'Kyle' },
    { id: 18, name: 'Jem' },
    { id: 2, name: 'Marc' },
    { id: 51, name: 'Chris' },
    lookingFor,
    { id: 14, name: 'Ben' },
  ]),
)

lookingFor = { id: 23, name: 'Brian' }
console.log(
  binarySearch(23, [
    { id: 1, name: 'Sam' },
    { id: 3, name: 'Sarah' },
    { id: 5, name: 'John' },
    { id: 6, name: 'Burke' },
    { id: 10, name: 'Simona' },
    { id: 12, name: 'Asim' },
    { id: 13, name: 'Niki' },
    { id: 15, name: 'Aysegul' },
    { id: 17, name: 'Kyle' },
    { id: 18, name: 'Jem' },
    { id: 19, name: 'Marc' },
    { id: 21, name: 'Chris' },
    lookingFor,
    { id: 24, name: 'Ben' },
  ]),
)
