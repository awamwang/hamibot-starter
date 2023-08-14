/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-25 00:20:15
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:23:59
 * @FilePath: \\src\\types\\app.d.ts
 * @Description: app 模块
 */
declare module 'awam' {
  global {
    type SleepTime = number | [number, number] // [min, max]

    interface UiOperationConfig {
      findTimeout?: number
      before?: Function
      after?: Function
      waitBefore?: SleepTime
      waitAfter?: SleepTime
      waitInterval?: SleepTime
    }
  }
}
