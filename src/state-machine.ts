import TransitionCore from './transition-core'

class StateMachine {
  public transitions: TransitionCore
  public currentState: string
  public onStateMap: Map<string, Function[]> = new Map()
  public onceStateMap: Map<string, Function[]> = new Map()
  public isPending = false

  constructor(public options: Options) {
    this.transitions = new TransitionCore(
      options.transitions,
      options.initState
    )
    this.step = this.step.bind(this)
    this.on = this.on.bind(this)
  }

  on(state: string, fn: (arg?: any) => void) {
    if (this.onStateMap.has(state)) {
      this.onStateMap.get(state).push(fn)
    } else {
      this.onStateMap.set(state, [fn])
    }
  }

  once(state: string, fn: (arg?: any) => void) {
    if (this.onceStateMap.has(state)) {
      this.onceStateMap.get(state).push(fn)
    } else {
      this.onceStateMap.set(state, [fn])
    }
  }

  off(state: string, fn: Function) {
    let fns = this.onStateMap.get(state)
    if (~fns.indexOf(fn)) {
      fns.splice(fns.indexOf(fn), 1)
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
            if (typeof this.options.onTransition === 'function') {
              await this.options.onTransition(_result)
            }
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
        if (typeof this.options.onTransition === 'function') {
          let afterTransition = this.options.onTransition(result)
          if (afterTransition instanceof Promise) {
            return afterTransition
              .then(this.runHookFunction.bind(this, result.on, args))
              .then(res => Promise.resolve(result))
              .catch(err => {
                this.isPending = false
                throw new Error(err)
              })
          }
        } else {
          this.runHookFunction(result.on, args)
          return result
        }
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
        onceFn.pop()(...args)
      } while (onceFn.length)
    }
    this.isPending = false
  }

  can(method: string) {
    return !!~this.transitions.getMethods().indexOf(method)
  }
}

export default StateMachine
