const allowed = [3, 5, 8]
const aim = 19

const doSteps = (aim) => {
  const good = []
  const store = (path) => {
    const normalizedPath = path.split('+').sort().join('+')
    if (good.indexOf(normalizedPath) == -1) {
      good.push(normalizedPath)
    }
  }
  const step = (distance, path = '') => {
    if (distance === 0) {
      store(path)
      return
    }
    if (distance > 0) {
      return allowed.map((steps) => step(distance - steps, path + (path.length > 0 ? '+' : '') + steps))
    }
  }
  step(aim)
  return good
}

console.log(aim)
console.log(doSteps(aim))
