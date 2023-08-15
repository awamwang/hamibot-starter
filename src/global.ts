/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2023-08-07 08:06:32
 * @FilePath: \\src\\global.ts
 * @Description: 全局常量和配置项验证
 */

import { ConfigInvalidException } from './lib/exception/exception'
import { LogLevel, LOG_STACK, Record, sendLog, setToken } from './lib/exception/logger'

export const PROJECT_NAME = 'Untitled Script'

/**
 * @description: 脚本版本号。建议根据 [语义化版本号] 迭代
 */
export const VERSION = '0.1.0'

export const LISTENER_INTERVAL = 100

export const SHORT_WAIT_MS = 300

export const LONG_WAIT_MS = 1000

export const EVENT = events.emitter()

Record.info(`Launching...\n\n\tCurrent script version: ${VERSION}\n`)

// ---------------------- configuration -------------------------

const { _TOKEN, _SHOW_CONSOLE } = hamibot.env

// -------------------- register listener -----------------------

// register exit listener
events.on('exit', () => {
  threads.shutDownAll()
  Record.info('Exit...')

  // send to pushplus
  let collection = LOG_STACK.filter((frame) => {
    return frame.getLevel() >= LogLevel.Log
  })

  if (_TOKEN && _TOKEN !== '') {
    Record.info('Sending logs to pushplus...')

    for (let i = 0; i < 3; i++) {
      if (sendLog(collection, `[LOG] ${PROJECT_NAME}`)) {
        Record.info('Sending logs succeeds')
        return
      }
      Record.warn(`Sending failed, retry ${i + 1}`)
    }

    Record.error('Failure to send logs !')
  }

  // send to hamibot
  for (let item of collection.toStringArray()) {
    hamibot.postMessage(item)
  }

  sleep(LONG_WAIT_MS * 5)
  console.hide()
})

// ------------------------ validation --------------------------

Record.info('Verifying configurations')

// pushplus token
if (_TOKEN && _TOKEN !== '' && setToken(_TOKEN) == false) {
  throw new ConfigInvalidException('pushplus token', 'needs to be a 32-bit hexadecimal number')
}

// show console
if (typeof _SHOW_CONSOLE !== 'boolean') {
  throw new ConfigInvalidException('show console')
}
export const SHOW_CONSOLE = _SHOW_CONSOLE

Record.info('Start running script')

const TextView = 'android.widget.TextView' // 文本控件
const ImageView = 'android.widget.ImageView' // 图片控件
const Button = 'android.widget.Button' // 按钮控件
const EditText = 'android.widget.EditText' // 输入框控件
const AbsListView = 'android.widget.AbsListView' // 列表控件
const LinearLayout = 'android.widget.LinearLayout' // 线性布局
const FrameLayout = 'android.widget.FrameLayout' // 帧布局
const RelativeLayout = 'android.widget.RelativeLayout' // 相对布局
const RecyclerView = 'android.support.v7.widget.RecyclerView' // 通常也是列表控件
