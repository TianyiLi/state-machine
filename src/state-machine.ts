import { TransitionCore, TransitionGroup } from './transition-core'

export type TransitionFunction =
  | ((EventData: EventData) => void | Promise<void>)
  | { [x: string]: (EventData: EventData) => void | Promise<void> }

export declare interface Options {
  transitions: TransitionGroup[]
  onTransition?: TransitionFunction
  initState: string
}

export declare interface EventData {
  before: string
  on: string
  action: string
  arg: any
}

export type afterTransitionEvent =
  | false
  | EventData

export default class StateMachineControl {
  public transitions: TransitionCore
  public currentState: string
  public onStateMap: Map<string, Function[]> = new Map()
  public onceStateMap: Map<string, Function[]> = new Map()
  public isPending = false
  private _onTransition: TransitionFunction = {
    '*': () => {}
  }

  constructor(public options: Options) {
    this.transitions = new TransitionCore(
      options.transitions,
      options.initState
    )
    this._onTransition = this.options.onTransition || this._onTransition
    this.step = this.step.bind(this)
    this.on = this.on.bind(this)
  }

  /**
   * Setting on state hook function
   * @param state 
   * @param fn 
   */
  on(state: string, fn: (arg?: any) => void) {
    if (!~this.transitions.getStates().indexOf(state)) return false
    if (this.onStateMap.has(state)) {
      this.onStateMap.get(state).push(fn)
    } else {
      this.onStateMap.set(state, [fn])
    }
  }

  once(state: string, fn: (arg?: any) => void) {
    if (!~this.transitions.getStates().indexOf(state)) return false
    if (this.onceStateMap.has(state)) {
      this.onceStateMap.get(state).push(fn)
    } else {
      this.onceStateMap.set(state, [fn])
    }
  }

  off(state: string, fn: Function) {
    let fns = this.onStateMap.get(state)
    let onceFn = this.onceStateMap.get(state)
    if (~fns.indexOf(fn)) {
      fns.splice(fns.indexOf(fn), 1)
    }
    if (~onceFn.indexOf(fn)) {
      fns.splice(onceFn.indexOf(fn), 1)
    }
  }

  removeAllListener(state?: string) {
    if (state) {
      this.onStateMap.delete(state)
    } else {
      this.onStateMap.clear()
    }
  }

  getMethods(state) {
    return this.transitions.getMethods(state)
  }

  getStateList() {
    return this.transitions.getStates()
  }

  getState() {
    return this.transitions.state
  }

  step(method: string, ...args) {
    let result = this.transitions.stepTo(method, ...args)
    if (this.isPending === true) return false
    this.isPending = true
    if (result instanceof Promise) {
      return result
        .then(async _result => {
          if (!_result) {
            this.isPending = false
          } else {
            await this.execTransition(_result)
            this.runHookFunction(_result.on, args)
          }
          return _result
        })
        .catch(err => {
          this.isPending = false
          throw new Error(err)
        })
    } else {
      if (!result) {
        this.isPending = false
        return result
      } else {
        let afterTransition = this.execTransition(result)
        if (afterTransition instanceof Promise) {
          return afterTransition
            .then(this.runHookFunction.bind(this, result.on, args))
            .then(res => Promise.resolve(result))
            .catch(err => {
              this.isPending = false
              throw new Error(err)
            })
        } else {
          this.runHookFunction(result.on, args)
          return result
        }
      }
    }
  }

  execTransition(
    result: afterTransitionEvent
  ) {
    if (!result) return false
    if (typeof this._onTransition === 'function') {
      return this._onTransition(result)
    } else {
      let all = this._onTransition['*'] && this._onTransition['*'](result)
      let current = this._onTransition[result.on] && this._onTransition[result.on](result)
      if (all instanceof Promise || current instanceof Promise) {
        return (async () => {
          await all
          await current
        })()
      } else {
        return true
      }
    }
  }

  runHookFunction(state: string, args) {
    let fn = this.onStateMap.get(state)
    let onceFn = this.onceStateMap.get(state)
    if (fn) {
      fn.forEach(f => f(...args))
    }
    if (onceFn) {
      do {
        onceFn.shift()(...args)
      } while (onceFn.length)
    }
    this.isPending = false
  }

  can(method: string) {
    return !!~this.transitions.getMethods().indexOf(method)
  }
}
