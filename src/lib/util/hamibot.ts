import { BotRandomMethod, botRandom } from './bot'

export function sleepRandom(n: number, botRandomMethod?: false | BotRandomMethod): void {
  if (botRandomMethod === false) {
    sleep(n)
  } else if (typeof botRandomMethod === 'number' && botRandomMethod > 1) {
    // 大于1时，当做倍数处理
    sleep(random(n, n * botRandomMethod))
  } else {
    sleep(botRandom(n, botRandomMethod))
  }
}

export function sleepBetween(min: number, max: number): void {
  sleep(random(min, max))
}

// 默认是调用sleepRandom自动产生10%的上下浮动
export function sleepByTime(n?: number | SleepTime, botRandomMethod?: false | BotRandomMethod): void {
  if (!n) return

  if (Array.isArray(n)) {
    // SleepTime情况
    sleepBetween(n[0], n[1])
    return
  }

  sleepRandom(n, botRandomMethod)
}
