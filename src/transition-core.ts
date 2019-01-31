import { afterTransitionEvent } from './main'
export class TransitionCore {
  private transitionMap: Map<string, TransitionGroup> = new Map()
  private stateList: Set<string> = new Set()
  private transitionMethods: Map<string, string[]> = new Map()
  private _state: string = null
  constructor(
    public transitionGroups: TransitionGroup[],
    public initState: string
  ) {
    this._state = initState
    this.transitionGroups.forEach(e => {
      let key = `${e.from}/${e.action}`
      if (this.transitionMap.has(key))
        throw new Error(
          `From ${e.from} to ${
            typeof e.to === 'function' ? e.to() : e.to
          } with ${e.action} has repeated declarative`
        )
      this.transitionMap.set(`${e.from}/${e.action}`, Object.freeze(e))
      !this.stateList.has(e.from) &&
        e.from !== '*' &&
        this.stateList.add(e.from)
      this.transitionMethods.has(e.from)
        ? this.transitionMethods.get(e.from).push(e.action)
        : this.transitionMethods.set(e.from, [e.action])
      typeof e.to === 'string' &&
        !this.stateList.has(e.to) &&
        this.stateList.add(e.to)
    })

    this.stepTo = this.stepTo.bind(this)
    this.getMethods = this.getMethods.bind(this)
    this.getStates = this.getStates.bind(this)
    this.stateOnTransition = this.stateOnTransition.bind(this)
  }

  stepTo(action: string, ...arg: any): afterTransitionEvent | Promise<afterTransitionEvent> {
    let prevState = this._state
    let key = `${this._state}/${action}`
    if (this.transitionMap.has(`*/${action}`)) {
      key = `*/${action}`
    } else if (!this.transitionMap.has(key)) {
      console.warn(`Cannot transition with ${action}`)
      return false
    }
    const group = Object.assign({}, this.transitionMap.get(key))
    let guardian = group.guardian ? group.guardian(...arg) : true
    if (guardian instanceof Promise) {
      return Promise.resolve().then(() => guardian)
        .then(res => {
          group.from = prevState
          return res
        })
        .then(res => {
          if (res) {
            return this.stateOnTransition(group, ...arg)
          } else return false
        })
    } else if (guardian) {
      group.from = prevState
      return this.stateOnTransition(group, ...arg)
    } else {
      return false
    }
  }

  getMethods(state: string = this._state) {
    return this.transitionMethods.get(state)
  }

  getStates() {
    let list:string[] = []
    this.stateList.forEach(e => list.push(e))
    return list
  }

  get state() {
    return this._state
  }

  stateOnTransition(e: TransitionGroup, ...arg):afterTransitionEvent {
    let to = typeof e.to === 'function' ? e.to(...arg) : e.to
    if (this.stateList.has(to)) {
      this._state = to
      return {
        before: e.from,
        on: this._state,
        action: e.action,
        arg
      }
    } else {
      return false
    }
  }
}
export declare interface TransitionGroup {
  guardian?: (...arg: any) => (boolean|Promise<boolean>) 
  from: string
  to: string | ((...arg: any) => string)
  action: string
}
