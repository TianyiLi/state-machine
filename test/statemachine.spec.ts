import StateMachine, { TransitionFunction } from '../src/main'
import 'mocha'
import * as assert from 'assert'

function sleep(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, sec)
  })
}

function createStateMachine(cb: TransitionFunction = { '*': console.dir }) {
  return new StateMachine({
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
          return arg
        }
      },
      {
        from: '*',
        to: state => {
          throw new Error('to error')
        },
        action: 'error'
      },
      {
        from: '*',
        to: state => state,
        action: 'guardianError',
        guardian: () => {
          throw new Error('guardian error')
        }
      },
      {
        from: '*',
        to: state => state,
        action: 'asyncGuardianError',
        guardian: async (arg) => {
          throw new Error('guardian error')
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

describe('StateMachineControl test', () => {
  it('synchronous transition is good', async () => {
    let smc = createStateMachine(null)
    await smc.step('start')
    await smc.step('next')
    assert.equal(smc.getState(), 'b')
    assert.equal(smc.can('next'), true)
    assert.equal(smc.isPending, false)
    assert.equal(await smc.step('start'), false)
    assert.deepEqual(smc.getMethods(), ['next', 'reject', 'sleep'])
  })
  it('onTransition should be work', done => {
    let smc = createStateMachine({ a: () => done() })
    smc.step('start')
  })
  it('goto anywhere should be work', done => {
    let smc = createStateMachine({
      c: () => {
        done()
      }
    })
    smc.step('goto', 'c')
    assert.equal(smc.getState(), 'c')
  })
  it('async guardian should work well', async function () {
    this.timeout(10 * 1000)
    let smc = createStateMachine(() => {})
    await smc.step('goto', 'b')
    let timestamp = Date.now()
    await smc.step('sleep', true)
    assert.equal(Date.now() - timestamp >= 500, true)
    assert.equal(smc.getState(), 'c')
    timestamp = Date.now()
    await smc.step('goto', 'b')
    assert.equal(smc.getState(), 'b')
    await smc.step('sleep') // Guardian returns undefined (falsy), so no state change from 'b'
    assert.equal(Date.now() - timestamp >= 500, true) // Should have waited for guardian
    assert.equal(smc.getState(), 'b') // State should remain 'b'
  })
  it('on state should be work', done => {
    let smc = createStateMachine(() => {})
    let time = 0
    smc.on('a', arg => ((time += 1), time === 2 && done()))
    smc.on('a', arg => ((time += 1), time === 2 && done()))
    smc.step('start')
  })
  it('once only can be trigger one times', async () => {
    let smc = createStateMachine(() => {})
    let time = 0
    smc.once('a', arg => { time += 1 })
    smc.once('a', arg => { time += 1 })
    await smc.step('start') // State 'a', both once handlers run, time = 2
    await smc.step('next')  // State 'b'
    await smc.step('reject') // State 'a' again, once handlers should not run again
    assert.equal(time, 2) // Check that time is 2
  })
  it('off and removeListener should be work', async () => {
    let smc = createStateMachine(() => {})
    // Dummy function for listeners, its execution would mean 'off' didn't work
    let listenerShouldNotBeCalled = function(arg) {
      throw new Error("Listener was called but should have been removed.");
    }
    assert.equal(smc.on('a', listenerShouldNotBeCalled), true)
    assert.equal(smc.once('a', listenerShouldNotBeCalled), true)
    smc.off('a', listenerShouldNotBeCalled) // Remove both 'on' and 'once' for 'a'
    
    await smc.step('start') // none -> a
    assert.equal(smc.getState(), 'a')
    
    await smc.step('goto', 'none') // a -> none
    
    smc.once('b', listenerShouldNotBeCalled)
    smc.off('b', listenerShouldNotBeCalled) // Register then remove 'once' for 'b'
    
    smc.on('a', listenerShouldNotBeCalled)
    smc.removeListener('a', listenerShouldNotBeCalled) // Register then remove 'on' for 'a' (alias for off)
    
    await smc.step('start') // none -> a (listenerShouldNotBeCalled should not run)
    await smc.step('next')  // a -> b (listenerShouldNotBeCalled for 'b' should not run)
    assert.equal(smc.getState(), 'b')
  })
  it('get state list should be work', () => {
    let smc = createStateMachine(() => {})
    assert.deepEqual(smc.getStateList(), ['none', 'a', 'b', 'c'])
  })
  it('removeAllListener should work', async () => {
    let smc = createStateMachine()
    let listenerCalled = false;
    let on = () => {
      listenerCalled = true;
    }
    smc.on('a', on)
    smc.on('b', on)
    smc.removeAllListener('a')
    await smc.step('start') // none -> a
    assert.equal(listenerCalled, false, "Listener for 'a' should have been removed")
    
    smc.removeAllListener() // Remove all listeners including for 'b'
    await smc.step('next') // a -> b
    assert.equal(listenerCalled, false, "Listener for 'b' should have been removed by removeAllListeners()")
  })
  it('step params should same', async () => {
    let smc = createStateMachine()
    assert.deepEqual(await smc.step('start', { test: 123 }), {
      before: 'none',
      on: 'a',
      action: 'start',
      arg: [{ test: 123 }]
    })
  })
  it('on no state event should return false', () => {
    let smc = createStateMachine()
    assert.deepEqual(smc.on('nostuff', () => {}), false)
    assert.deepEqual(smc.once('nostuff', () => {}), false)
  })
  it('step to non set action should be none', async () => {
    let smc = createStateMachine()
    assert.equal(await smc.step('no'), false)
  })
  it('isPending test', async () => {
    let smc = createStateMachine({
      a: async ({ arg }) => {
        // console.log(arg) // Removed console.log
        await sleep(arg[0].sec)
      }
    })
    // Use a flag to see if the main part of step completed
    let stepCompleted = false;
    const stepPromise = smc.step('start', { sec: 1 });
    // isPending should be true immediately after calling step, before it resolves
    assert.equal(smc.isPending, true, "isPending should be true immediately after step call")
    assert.equal(await smc.step('next'), false, "Should not allow another step while pending")

    await stepPromise; // Wait for the step to actually complete
    stepCompleted = true;
    
    assert.equal(smc.isPending, false, "isPending should be false after step completion")
    assert.equal(stepCompleted, true, "The step itself should complete")
  })
  it('sync error test, pending should be clear', async () => {
    let smc = createStateMachine({
      a: arg => { // Synchronous callback that throws
        throw new Error('test')
      }
    })
    await assert.rejects(
      smc.step('start'), // This will return a Promise that rejects
      Error, // Optional: check for specific error type
      'test'   // Optional: check for specific error message
    )
    assert.equal(smc.isPending, false)
  })
  it('async error test, pending should be clear', async () => {
    let smc = createStateMachine({
      a: async arg => {
        throw new Error('test')
      }
    })
    await assert.rejects(smc.step.bind(smc, 'start'))
    assert.equal(smc.isPending, false)
  })
  it ('guardian error, pending should be clear', async () => {
    let smc = createStateMachine()
    await assert.rejects(
      smc.step('guardianError'),
      Error,
      'guardian error'
    )
    assert.equal(smc.isPending, false)
  })
  it ('async guardian error, pending should be clear', async () => {
    let smc = createStateMachine()
    await assert.rejects(smc.step.bind(smc, 'asyncGuardianError'))
    assert.equal(smc.isPending, false)
  })
  it ('async guardian return false', async () => {
    let smc = createStateMachine()
    smc.step('goto', 'b')
    await smc.step('sleep', false)
    assert.equal(smc.getState(), 'b')
  })

  it ('canTransitionTo should be work', () => {
    let smc = createStateMachine()
    assert.equal(smc.canTransitionTo('b'), false)
    assert.equal(smc.canTransitionTo('a'), true)
  })

  it ('when transition false, the pending should be false', async () => {
    let smc = createStateMachine()
    assert.equal(await smc.step('b'), false) // Action 'b' is not valid from initial state 'none'
    assert.equal(smc.isPending, false)
  })

  it('Wait Transition finish', async () => {
    let transitionFinished = false;
    let smc = createStateMachine(async () => {
      await sleep(2)
      transitionFinished = true;
    })
    let onACalled = false;
    smc.on('a', () => {
      onACalled = true;
    })
    const stepPromise = smc.step('start');
    // isPending should be true immediately
    assert.equal(smc.isPending, true, "isPending should be true right after calling step");
    await stepPromise; // Wait for the step to complete
    assert.equal(smc.isPending, false, "isPending should be false after step is fully done");
    assert.equal(transitionFinished, true, "The async onTransition should have completed");
    assert.equal(onACalled, true, "The on('a') listener should have been called");
  })
})
