/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:58:03
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-23 17:45:32
 * @FilePath: \\src\\index.ts
 * @Description: 脚本入口
 */
import {} from './global'
import { init } from './lib/init'

import 茄子免费小说 from './羊毛/茄子免费小说'
import 大众点评签到 from './羊毛/大众点评签到'

init()
;(async function () {
  await new 大众点评签到().run()

  text('我等的人，他在遥远的未来').waitFor()
})()
