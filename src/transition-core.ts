class TransitionCore {
  private transitionMap: Map<string, TransitionGroup> = new Map()
  private stateList: Set<string> = new Set()
  private transitionMethods: Map<string, string[]> = new Map()
  constructor(
    public transitionGroups: TransitionGroup[],
    public state: string
  ) {
    this.transitionGroups.forEach(e => {
      let key = `${e.from}/${e.method}`
      if (this.transitionMap.has(key))
        throw new Error(
          `From ${e.from} to ${
            typeof e.to === 'function' ? e.to() : e.to
          } with ${e.method} has repeated declarative`
        )
      this.transitionMap.set(`${e.from}/${e.method}`, Object.freeze(e))
      this.stateList.has(e.from) && this.stateList.add(e.from)
      this.transitionMethods.has(e.from)
        ? this.transitionMethods.get(e.from).push(e.method)
        : this.transitionMethods.set(e.from, [e.method])
      typeof e.to === 'string' &&
        !this.stateList.has(e.to) &&
        this.stateList.add(e.to)
    })
  }

  stepTo = (method: string, ...arg: any) => {
    let prevState = this.state
    let key = `${this.state}/${method}`
    if (this.transitionMap.has(`*/${method}`)) {
      key = `*/${method}`
    } else if (!this.transitionMap.has(key)) {
      console.error(`Cannot transition with ${method}`)
      return false
    }
    const group = Object.assign({}, this.transitionMap.get(key))
    let guardian = group.guardian ? group.guardian(...arg) : true
    if (guardian instanceof Promise) {
      return guardian.then(res => {
        group.from = prevState
        if (res === true) return this.stateOnTransition(group, ...arg)
        else return false
      })
    } else if (guardian) {
      group.from = prevState
      return this.stateOnTransition(group, ...arg)
    } else {
      return false
    }
  }

  getMethods(state: string = this.state) {
    return this.transitionMethods.get(state)
  }

  getState() {
    let list = []
    this.stateList.forEach(e => list.push(e))
    return list
  }

  stateOnTransition(e: TransitionGroup, ...arg) {
    let to = typeof e.to === 'function' ? e.to(...arg) : e.to
    if (this.stateList.has(to)) {
      this.state = to
      return {
        before: e.from,
        on: this.state,
        arg
      }
    } else {
      return false
    }
  }
}

export default TransitionCore
