export interface RandomGenerator {
  (n: number, ...args: any[]): number
}

export type BotRandomMethod = number | RandomGenerator

// 对传入的每个数字进行10%上下的random
export function percentageRandom(n: number, range = 0.1) {
  return random(n - n * range, n + n * range)
}

// export function botRandom(n: number, method?: number | RandomGenerator): number
// export function botRandom(arr: number[], method?: number | RandomGenerator): number[]
export function botRandom(arr: number, method: BotRandomMethod = percentageRandom) {
  if (typeof method === 'number') {
    const range = method
    method = (n) => percentageRandom(n, range)
  }
  //  else if (Array.isArray(method) && method.length === 2) {
  //   const [min, max] = method
  //   method = () => random(min, max)
  // }

  return method(arr)

  // 以后再看，支持直接输入Array可能是过度设计
  // if (Array.isArray(arr)) {
  //   return arr.map(method)
  // } else {
  // }
}
