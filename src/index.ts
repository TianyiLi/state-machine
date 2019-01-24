import TransitionCore from './transition-core'
import History from './history'

class StateMachine {
  public transitions:TransitionCore
  public currentState: string
  public hookMap:Map<string, Function[]> = new Map()
  public history:History

  constructor (public options: Options) {
    this.transitions = new TransitionCore(options.transitions, options.initState)
    this.step = this.step.bind(this)
    this.on = this.on.bind(this)
    if (this.options.useHistory) {
      this.history = new History(this.options.historyMaxLength || 300)
    }
  }

  on (event:string, fn: (arg?:any) => void ) {
    if (this.hookMap.has(event)) {
      this.hookMap.get(event).push(fn)
    } else {
      this.hookMap.set(event, [fn])
    }
  }

  clearHook (event:string) {
    this.hookMap.delete(event)
  }

  getMethods (state: string) {
    return this.transitions.getMethods(state)
  }

  getStateList () {
    return this.transitions.getState()
  }

  getState () {
    return this.transitions.state
  }

  step (method: string, ...args) {
    let result = this.transitions.stepTo(method, ...args)
    if (result instanceof Promise) {
      return result.then(result => {
        if (!result) {
          return result
        } else {
          if (typeof this.options.onTransition === 'function') {
            this.options.onTransition(result)
          }
          let fn = this.hookMap.get(result.on)
          if (fn) {
            fn.forEach(f => f(...args))
          }
        }
      })
    } else {
      if (!result) {
        return result
      } else {
        if (typeof this.options.onTransition === 'function') {
          this.options.onTransition(result)
        }
        let fn = this.hookMap.get(result.on)
        if (fn) {
          fn.forEach(f => f(...args))
        }
      }
    }
  }

  getHistory () {
    return this.history
  }
}

export default StateMachine