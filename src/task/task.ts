// 代表一次任务执行，是包含打开app的整个流程

import { AwamApp } from '../lib/app'
import { BaseException } from '../lib/exception'

export interface AwamTaskConfig {
  name?: string
  // autoRun?: boolean // new AwamTask时直接运行task
  pureTask?: boolean // 是否只执行task的核心部分（基于效率考虑，如果app不切换，则不需要启动等操作）
}

export class AwamTask {
  id: number = 0
  _app: AwamApp | null = null

  constructor(private _config: AwamTaskConfig) {
    if (_config.name) {
      this._app = new AwamApp(_config.name)
    }

    // if (_config.autoRun) this.run()
  }

  async before() {
    // 默认为启动APP
    this._app && this._app.start()
  }

  async handler() {
    throw new BaseException('not implemented')
  }

  async after() {
    // 默认为关闭APP
    this._app && this._app.stop()
  }

  async run() {
    if (!this._config.pureTask) await this.before()

    // handler可以脱离app存在
    await this.handler()

    if (!this._config.pureTask) await this.after()

    return this
  }
}
