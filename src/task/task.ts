/**
 * 代表一项原子任务
 *
 * Task是独立于APP，可以专用也可以公用，Task的app属性是注入的
 */

import { AwamApp } from '../lib/app'
import { Record } from '../lib/logger'
import { BaseException } from '../lib/exception'
import { AwamWorker } from './worker'

export interface AwamTaskConfig {
  app?: AwamApp
  name?: string
  worker?: AwamWorker
  // autoRun?: boolean // new AwamTask时直接运行task
  pure?: boolean // 是否只执行task的核心部分（基于效率考虑，如果app不切换，则不需要启动等操作）
}

let id = 0

export abstract class AwamTask {
  _id: number = 0
  _app: AwamApp | null = null
  _worker: AwamWorker | null = null

  constructor(private _config: AwamTaskConfig) {
    const { app, name, worker = null } = _config
    this._id = id++
    this._worker = worker

    if (app) {
      this._app = app
    } else if (name) {
      this._app = new AwamApp(name)
    } else if (worker) {
      this._app = worker._app
    }

    // if (_config.autoRun) this.run()
  }

  async before() {
    Record.verbose(`[task]${this._id} before: 暂无处理`)
  }

  async handler() {
    throw new BaseException('not implemented')
  }

  async after() {
    Record.verbose(`[task]${this._id} after: 暂无处理`)
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

  bindWorker(worker: AwamWorker) {
    this._worker = worker
    if (!this._app) {
      this._app = worker._app
    }
  }
}
