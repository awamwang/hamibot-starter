export {}
declare global {
  const loggerUtils: typeof import('../src/lib/logger')
  const Record: typeof loggerUtils.Record
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
