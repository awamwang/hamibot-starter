/**
 * 代表一项原子任务
 *
 * Task是独立于APP，可以专用也可以公用，Task的app属性是注入的
 */

import { AwamApp } from '../lib/app'
import { AwamWorker, AwamWorkerConfig } from './worker'

export interface AwamTaskConfig extends AwamWorkerConfig {
  worker?: AwamWorker
  // autoRun?: boolean // new AwamTask时直接运行task
  pure?: boolean // 是否只执行task的核心部分（基于效率考虑，如果app不切换，则不需要启动等操作）
  findTimeout?: number // 查打控件超时时间
}

let id = 1

export abstract class AwamTask {
  _id: number = 0
  _app: AwamApp | null = null
  _worker: AwamWorker | null = null
  findTimeout: number
  logDesc: string

  constructor(protected _config: AwamTaskConfig = {}) {
    const { app, name, worker = null, findTimeout = 2000, desc = name } = _config
    this._id = id++
    this._worker = worker
    this.findTimeout = findTimeout

    if (app) {
      this._app = app
    } else if (name) {
      this._app = new AwamApp(name)
    } else if (worker) {
      this._app = worker._app
    }

    this.logDesc = `[task]${this._id} ${desc || this._app?.appName || ''}`
    // if (_config.autoRun) this.run()
  }

  async before() {
    Record.verbose(`${this.logDesc} before: 暂无处理`)
  }

  async handler(args?: any) {
    Record.verbose(`${this.logDesc} handler: 暂无处理`, args)
    throw new exceptionUtils.BaseException('not implemented')
  }

  async after() {
    Record.verbose(`${this.logDesc} after: 暂无处理`)
  }

  async run(args?: any) {
    if (!this._config.pure) await this.before()

    // handler可以脱离app存在
    try {
      await this.handler(args)
    } catch (e) {
      if (e instanceof exceptionUtils.BaseException) {
        Record.error(e.toString())
      }
    } finally {
      if (!this._config.pure) await this.after()
    }

    return this
  }

  bindWorker(worker: AwamWorker) {
    this._worker = worker
    if (!this._app) {
      this._app = worker._app
    }
  }
}
