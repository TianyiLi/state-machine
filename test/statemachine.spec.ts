import StateMachineControl from '../src/state-machine'
import 'mocha'
import * as assert from 'assert'

function createStateMachine(cb = console.dir) {
  return new StateMachineControl({
    initState: 'none',
    onTransition: cb,
    transitions: [
      
    ]
  })
}
