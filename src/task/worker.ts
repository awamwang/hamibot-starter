/**
 * 1次任务执行流程，是包含打开app的整个流程
 */

import { AwamApp } from '../lib/app'
import { Record } from '../lib/logger'
import { BaseException } from '../lib/exception'

export interface AwamWorkerConfig {
  name?: string // 这个name是packageName和appName你的统称，并非worker的名字，不能随意填写
  app?: AwamApp // 允许直接把app对象传进来
  // autoRun?: boolean // new AwamTask时直接运行task
  pure?: boolean // 是否只执行task的核心部分（基于效率考虑，如果app不切换，则不需要启动等操作）
  findTimeout?: number // 查打控件超时时间
  desc?: string // 对worker的语言描述，主要用于调试
}

let id = 1

export abstract class AwamWorker {
  _id: number = 0
  _app: AwamApp | null = null
  findTimeout: number

  constructor(protected _config: AwamWorkerConfig = {}) {
    const { app, name, findTimeout = 2000, desc = name } = _config
    this._id = id++ // 不存在0号
    this.findTimeout = findTimeout

    if (app) {
      this._app = app
    } else if (name) {
      this._app = new AwamApp(name)
    } else {
      Record.error(`[Worker] ${this._id} worker for ${desc} 没有对应的APP，初始化失败`)
    }

    // if (_config.autoRun) this.run()
  }

  async before() {
    // 默认为启动APP
    this._app && this._app.start()
  }

  async handler() {
    throw new BaseException('not implemented， 建议添加一个或多个task')
  }

  async after() {
    // 默认为关闭APP
    this._app && this._app.stop()
  }

  async run() {
    if (!this._config.pure) await this.before()

    // handler可以脱离app存在
    try {
      await this.handler()
    } catch (e) {
      if (e instanceof BaseException) {
        Record.error(e.toString())
      }

      await this.after()
    }

    if (!this._config.pure) await this.after()

    return this
  }
}
