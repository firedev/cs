// Reactivity as in Vue.js V3

const targetMap = new WeakMap()
let activeEffect = null

const effect = (eff) => {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}

const track = (target, key, effect) => {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
  }
}

const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => effect())
  }
}

const reactive = (target) => {
  const handler = {
    get(target, key, receiver) {
      track(target, key, effect)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue != value) {
        trigger(target, key)
      }
      return result
    },
  }
  return new Proxy(target, handler)
}

// Naive implementation
// const ref = (value) => reactive({ value })

const ref = (raw) => {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newVal) {
      raw = newVal
      trigger(r, 'value')
    },
  }
  return r
}

// Client Code

const product = reactive({
  price: 5,
  quantity: 2,
})

let total = 0
let salePrice = ref(0)

effect(() => {
  salePrice.value = product.price * 0.9
})
effect(() => {
  total = salePrice.value * product.quantity
})

// Reactivity

console.log(
  `Total should be 9: ${total}. Sale price should be 4.5: ${salePrice.value}`
)

product.quantity = 3
product.price = 10

console.log(
  `Total should be 27: ${total}. Sale price should be 9: ${salePrice.value}`
)

