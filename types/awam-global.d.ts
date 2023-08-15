export {}
declare global {
  const exceptionUtils: typeof import('../src/lib/exception/exception')
  const loggerUtils: typeof import('../src/lib/exception/logger')
  const Record: typeof loggerUtils.Record
  const AwamApp: typeof import('../src/lib/app').AwamApp
  const AwamTask: typeof import('../src/task/task').AwamTask
  const AwamWorker: typeof import('../src/task/worker').AwamWorker
  const AwamUtils: typeof import('../src/lib/util/index')
}

declare global {
  // @ts-ignore
  export type { AwamWorkerConfig } from '../src/task/worker'
  // @ts-ignore
  export type { AwamTaskConfig } from '../src/task/task'
}
