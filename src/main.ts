import { TransitionCore, TransitionGroup } from './transition-core'

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

export class StateMachine {
  /**
   * @remark Transition Core
   */
  private transitionCore: TransitionCore
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
    '*': () => { }
  }

  /**
   * When transition finish, run hook on functions
   * Same as return object
   *
   * @private
   * @type {Set<Function>}
   * @memberof StateMachine
   */
  private _onTransitionEndFns: Set<Function> = new Set()

  constructor (public options: Options) {
    this.transitionCore = new TransitionCore(
      options.transitions,
      options.initState
    )
    this._onTransition = this.options.onTransition || this._onTransition
    this.step = this.step.bind(this)
    this.on = this.on.bind(this)
    this.execTransition = this.execTransition.bind(this)
    this.runHookFunction = this.runHookFunction.bind(this)
  }

  /**
   * Setting on state hook function
   *
   * @param {string} state
   * @param {(arg?: any) => void} fn
   * @returns
   * @memberof StateMachineControl
   */
  on (state: string, fn: (arg?: any) => void) {
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
  once (state: string, fn: (arg?: any) => void) {
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
  off (state: string, fn: Function) {
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
   * Clear the hook function
   * 
   * @param state
   * @param fn
   * @memberof StateMachineControl
   */
  removeListener (state: string, fn: Function) {
    this.off(state, fn)
  }

  /**
   * Clear the state all hook function
   *
   * @param {string} [state]
   * @memberof StateMachineControl
   */
  removeAllListener (state?: string) {
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
  getMethods (state?: string) {
    return this.transitionCore.getMethods(state)
  }

  /**
   * Get all states
   *
   * @returns
   * @memberof StateMachineControl
   */
  getStateList () {
    return this.transitionCore.getStates()
  }

  /**
   * Get current state
   *
   * @returns
   * @memberof StateMachineControl
   */
  getState () {
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
  async step (
    action: string,
    ...args
  ): Promise<afterTransitionEvent> {
    if (this.isPending === true) {
      console.warn('Transition still working')
      return false
    }
    this.isPending = true
    try {
      const result = await this.transitionCore.stepTo(action, ...args)
      if (!result) {
        this.isPending = false
        return false
      }
      await this.execTransition()
      this.runHookFunction()
      return this.transitionCore.currentTransitionEvent
    } catch (error) {
      throw error
    } finally {
      this.isPending = false
    }
  }

  private async execTransition (): Promise<boolean> {
    let transitionData = this.transitionCore.currentTransitionEvent
    if (typeof this._onTransition === 'function') {
      await this._onTransition(transitionData)
      return true
    } else {
      await (this._onTransition['*'] && this._onTransition['*'](transitionData))
      await (this._onTransition[transitionData.on] && this._onTransition[transitionData.on](transitionData))
      return true
    }
  }

  private runHookFunction () {
    let transitionData = this.transitionCore.currentTransitionEvent
    let { on, arg } = transitionData
    let fn = this.onStateMap.get(on)
    let onceFn = this.onceStateMap.get(on)
    if (fn) {
      fn.forEach(f => f(...arg))
    }
    if (onceFn) {
      while (onceFn.length) {
        onceFn.shift()(...arg)
      }
    }
    if (this._onTransitionEndFns.size) {
      this._onTransitionEndFns.forEach(f => f(transitionData))
    }
  }

  /**
   * Check can do the action
   *
   * @param {string} action
   * @returns
   * @memberof StateMachineControl
   */
  can (action: string) {
    return !!~this.transitionCore.getMethods().indexOf(action)
  }

  /**
   * Check can transition to the state
   *
   * @param state Next state you want to transition to
   */
  canTransitionTo (state: string) {
    return this.transitionCore.canTransitionTo(state)
  }

  onTransitionEnd (fns: Function) {
    this._onTransitionEndFns.add(fns)
  }

  offTransitionEnd (fns: Function) {
    this._onTransitionEndFns.delete(fns)
  }
}

export default StateMachine
