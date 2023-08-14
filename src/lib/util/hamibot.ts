export function sleepBy(n?: number | sleepTime, max?: number) {
  if (!n) return

  if (Array.isArray(n)) {
    return sleepBy(...n)
  }

  if (arguments.length === 1) {
    if (typeof n === 'number') {
      sleep(n)
    }
  } else if (arguments.length === 2) {
    max && sleep(random(n, max))
  }
}
