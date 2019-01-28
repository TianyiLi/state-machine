import TransitionCore from './transition-core'
import History from './history'

class StateMachine {
  public transitions: TransitionCore
  public currentState: string
  public hookMap: Map<string, Function[]> = new Map()
  public history: History
  public isPending = false

  constructor(public options: Options) {
    this.transitions = new TransitionCore(
      options.transitions,
      options.initState
    )
    this.step = this.step.bind(this)
    this.on = this.on.bind(this)
    if (this.options.useHistory) {
      this.history = new History(this.options.historyMaxLength || 300)
    }
  }

  on(event: string, fn: (arg?: any) => void) {
    if (this.hookMap.has(event)) {
      this.hookMap.get(event).push(fn)
    } else {
      this.hookMap.set(event, [fn])
    }
  }

  clearHook(event: string) {
    this.hookMap.delete(event)
  }

  getMethods(state: string) {
    return this.transitions.getMethods(state)
  }

  getStateList() {
    return this.transitions.getState()
  }

  getState() {
    return this.transitions.state
  }

  step(method: string, ...args) {
    let result = this.transitions.stepTo(method, ...args)
    if (this.isPending === true) return false
    this.isPending = true
    if (result instanceof Promise) {
      return result.then(async _result => {
        if (!_result) {
          this.isPending = false
          return _result
        } else {
          if (typeof this.options.onTransition === 'function') {
            this.options.onTransition(_result)
          }
          let fn = this.hookMap.get(_result.on)
          if (fn) {
            await Promise.resolve(fn.map(f => () => f(...args)))
          }
          this.isPending = false
        }
      })
    } else {
      if (!result) {
        this.isPending = false
        return result
      } else {
        if (typeof this.options.onTransition === 'function') {
          this.options.onTransition(result)
        }
        let fn = this.hookMap.get(result.on)
        if (fn) {
          let isPromise = fn.some(f => f instanceof Promise)
          if (isPromise) {
            return Promise.resolve(fn.map(f => () => f(...args)))
          } else {
            fn.forEach(f => f(...args))
          }
        }
        this.isPending = false
      }
    }
  }

  getHistory() {
    return this.history
  }
  can(method: string) {
    return !!~this.transitions.getMethods().indexOf(method)
  }
}

export default StateMachine
