import StateMachineController, { TransitionFunction } from '../src/state-machine'
import 'mocha'
import * as assert from 'assert'

function sleep(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, sec)
  })
}

function createStateMachine(cb: TransitionFunction = { '*': console.dir }) {
  return new StateMachineController({
    initState: 'none',
    onTransition: cb,
    transitions: [
      { from: 'none', to: 'a', action: 'start' },
      { from: 'a', to: 'b', action: 'next' },
      { from: 'b', to: 'c', action: 'next' },
      {
        from: 'b',
        to: 'a',
        action: 'reject',
        guardian(arg) {
          return arg && arg.test
        }
      },
      {
        from: 'b',
        to: 'c',
        action: 'sleep',
        async guardian(arg) {
          await sleep(500)
          return !!arg
        }
      },
      {
        from: '*',
        to: state => state,
        action: 'goto'
      }
    ]
  })
}

describe('StateMachineControl test', () => {})
