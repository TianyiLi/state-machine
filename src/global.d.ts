declare interface Options {
  transitions: TransitionGroup[]
  onTransition?: (EventData: EventData) => (void | Promise<void>)
  initState: string
  /** default is 300 */
  historyMaxLength?: number
  useHistory: boolean
}

declare interface TransitionGroup {
  guardian?: (...arg: any) => boolean | ((...arg: any) => Promise<boolean>)
  from: string
  to: string | ((...arg: any) => string)
  method: string
}

declare interface History {
  maxLength: number
  stack: []
}

declare interface EventData {
  before: string
  on: string
  arg: any
}
