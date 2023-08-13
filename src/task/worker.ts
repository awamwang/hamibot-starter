/**
 * 1次任务执行流程，是包含打开app的整个流程
 */

import { AwamApp } from '../lib/app'
import { Record } from '../lib/logger'
import { BaseException } from '../lib/exception'

export interface AwamWorkerConfig {
  app?: AwamApp // 允许直接把app对象传进来
  name?: string
  // autoRun?: boolean // new AwamTask时直接运行task
  pure?: boolean // 是否只执行task的核心部分（基于效率考虑，如果app不切换，则不需要启动等操作）
}

let id = 0

export abstract class AwamWorker {
  _id: number = 0
  _app: AwamApp | null = null

  constructor(private _config: AwamWorkerConfig) {
    const { app, name } = _config
    this._id = id++ // 不存在0号

    if (app) {
      this._app = app
    } else if (name) {
      this._app = new AwamApp(name)
    } else {
      Record.error(`[Worker] ${this._id} worker 没有对于的APP，初始化失败`)
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
