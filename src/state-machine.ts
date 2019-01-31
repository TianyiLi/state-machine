import { TransitionCore, TransitionGroup } from './transition-core'
import { fnsHasPromise } from './util'

export type TransitionFunction =
  | ((EventData: afterTransitionEvent) => void | Promise<void>)
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

export type afterTransitionEvent = false | EventData

export default class StateMachineControl {
  /**
   * @remark Transition Core
   */
  public transitionCore: TransitionCore
  /**
   * Current State
   *
   * @type {string}
   * @memberof StateMachineControl
   */
  public currentState: string
  /**
   * Total Events hook function
   *
   * @type {Map<string, Function[]>}
   * @memberof StateMachineControl
   */
  public onStateMap: Map<string, Function[]> = new Map()
  /**
   * Total Events hook function `once`
   *
   * @type {Map<string, Function[]>}
   * @memberof StateMachineControl
   */
  public onceStateMap: Map<string, Function[]> = new Map()
  /**
   * Transition is pending
   *
   * @memberof StateMachineControl
   */
  public isPending = false
  /**
   * TransitionFunction would be run after transition success, can accept async function
   *
   * @private
   * @type {TransitionFunction}
   * @memberof StateMachineControl
   */
  private _onTransition: TransitionFunction = {
    '*': () => {}
  }

  constructor(public options: Options) {
    this.transitionCore = new TransitionCore(
      options.transitions,
      options.initState
    )
    this._onTransition = this.options.onTransition || this._onTransition
    this.step = this.step.bind(this)
    this.on = this.on.bind(this)
  }

  /**
   * Setting on state hook function
   *
   * @param {string} state
   * @param {(arg?: any) => void} fn
   * @returns
   * @memberof StateMachineControl
   */
  on(state: string, fn: (arg?: any) => void) {
    if (!~this.transitionCore.getStates().indexOf(state)) return false
    if (this.onStateMap.has(state)) {
      this.onStateMap.get(state).push(fn)
    } else {
      this.onStateMap.set(state, [fn])
    }
    return true
  }

  /**
   * Setting on state hook function `once`
   *
   * @param {string} state
   * @param {(arg?: any) => void} fn
   * @returns
   * @memberof StateMachineControl
   */
  once(state: string, fn: (arg?: any) => void) {
    if (!~this.transitionCore.getStates().indexOf(state)) return false
    if (this.onceStateMap.has(state)) {
      this.onceStateMap.get(state).push(fn)
    } else {
      this.onceStateMap.set(state, [fn])
    }
    return true
  }

  /**
   * Clear the hook function
   *
   * @param {string} state
   * @param {Function} fn
   * @memberof StateMachineControl
   */
  off(state: string, fn: Function) {
    let fns = this.onStateMap.get(state)
    let onceFn = this.onceStateMap.get(state)
    if (fns && !!~fns.indexOf(fn)) {
      fns.splice(fns.indexOf(fn), 1)
    }
    if (onceFn && !!~onceFn.indexOf(fn)) {
      onceFn.splice(onceFn.indexOf(fn), 1)
    }
  }

  /**
   * Clear the state all hook function
   *
   * @param {string} [state]
   * @memberof StateMachineControl
   */
  removeAllListener(state?: string) {
    if (state) {
      this.onStateMap.delete(state)
      this.onceStateMap.delete(state)
    } else {
      this.onStateMap.clear()
      this.onceStateMap.clear()
    }
  }

  /**
   * Get current or specific state functions
   *
   * @param state
   * @returns
   * @memberof StateMachineControl
   */
  getMethods(state?: string) {
    return this.transitionCore.getMethods(state)
  }

  /**
   * Get all states
   *
   * @returns
   * @memberof StateMachineControl
   */
  getStateList() {
    return this.transitionCore.getStates()
  }

  /**
   * Get current state
   *
   * @returns
   * @memberof StateMachineControl
   */
  getState() {
    return this.transitionCore.state
  }

  /**
   * Trigger transition
   *
   * @param {string} action
   * @param {*} args
   * @returns
   * @memberof StateMachineControl
   */
  step(
    action: string,
    ...args
  ): afterTransitionEvent | Promise<afterTransitionEvent> {
    if (this.isPending === true) {
      console.warn('Transition still working')
      return false
    }
    let result:afterTransitionEvent | Promise<afterTransitionEvent>
    try {
      this.isPending = true
      result = this.transitionCore.stepTo(action, ...args)
    } catch (error) {
      this.isPending = false
      throw error
    }
    if (result instanceof Promise) {
      // if guardian is Promise
      return (async () => {
        let _result:afterTransitionEvent
        try {
          _result = await result
          if (_result !== false) {
            await this.execTransition(_result)
            this.runHookFunction(_result.on, args)
            this.isPending = false
          }
        } catch (error) {
          this.isPending = false
          throw error
        }
        return _result
      })()
    } else {
      // if guardian not Promise
      if (!result) {
        this.isPending = false
        return result
      } else {
        let afterTransition:true | void | Promise<void>
        try {
          afterTransition = this.execTransition(result)
        } catch (error) {
          this.isPending = false
          throw error
        }
        if (afterTransition instanceof Promise) {
          return (async () => {
            await afterTransition
            await this.runHookFunction(result.on, args)
            this.isPending = false
            return result
          })().catch(err => {
            this.isPending = false
            throw (err)
          })
        } else {
          this.runHookFunction(result.on, args)
          this.isPending = false
          return result
        }
      }
    }
  }

  private execTransition(result: EventData) {
    let _return:true | void | Promise<void>
    if (typeof this._onTransition === 'function') {
      _return = this._onTransition(result)
    } else {
      let all = this._onTransition['*'] && this._onTransition['*'](result)
      let current =
        this._onTransition[result.on] && this._onTransition[result.on](result)
      if (fnsHasPromise(all, current)) {
        _return = (async () => {
          await all
          await current
        })()
      } else {
        _return = true
      }
    }
    return _return
  }

  private runHookFunction(state: string, args) {
    let fn = this.onStateMap.get(state)
    let onceFn = this.onceStateMap.get(state)
    if (fn) {
      fn.forEach(f => f(...args))
    }
    if (onceFn) {
      while (onceFn.length) {
        onceFn.shift()(...args)
      }
    }
  }

  /**
   * Check can do the action
   *
   * @param {string} action
   * @returns
   * @memberof StateMachineControl
   */
  can(action: string) {
    return !!~this.transitionCore.getMethods().indexOf(action)
  }
}
