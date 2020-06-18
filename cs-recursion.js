const { log } = console

basicRecursion = (max, current) => {
  if (current > max) {
    return
  }
  log(current)
  basicRecursion(max, current + 1)
}

basicRecursion(5, 1)

log()
fib = (n) => {
  if (n <= 2) return 1
  return fib(n - 1) + fib(n - 2)
}

for (i = 1; i < 20; i++) {
  log(fib(i))
}

log()
steps = []
fib = (n) => {
  steps.push(n)
  if (n <= 2) return 1
  return fib(n - 1) + fib(n - 2)
}

log(fib(20))
log(steps.length)

log()
steps = []

results = [1, 1, 1]
fib = (n) => {
  steps.push(n)
  results[n] = results[n] || fib(n - 1) + fib(n - 2)
  return results[n]
}

log(fib(20))
log(steps.length)

log()
steps = []
fac = (n) => {
  steps.push(n)
  return n < 2 ? 1 : n * fac(n - 1)
}
log(fac(4))
log(steps.length)
