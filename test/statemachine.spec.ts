import StateMachineControl, { TransitionFunction } from '../src/state-machine'
import 'mocha'
import * as assert from 'assert'

function sleep(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, sec)
  })
}

function createStateMachine(cb: TransitionFunction = { '*': console.dir }) {
  return new StateMachineControl({
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
  it('synchronous transition is good', () => {
    let smc = createStateMachine(null)
    smc.step('start')
    smc.step('next')
    assert.equal(smc.getState(), 'b')
    assert.equal(smc.can('next'), true)
    assert.equal(smc.isPending, false)
    assert.equal(smc.step('start'), false)
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
    smc.step('goto', 'b')
    let timestamp = Date.now()
    await smc.step('sleep', true)
    assert.equal(Date.now() - timestamp >= 500, true)
    assert.equal(smc.getState(), 'c')
    timestamp = Date.now()
    smc.step('goto', 'b')
    assert.equal(smc.getState(), 'b')
    await smc.step('sleep')
    assert.equal(Date.now() - timestamp >= 500, true)
    assert.equal(smc.getState(), 'b')
  })
  it('on state should be work', done => {
    let smc = createStateMachine(() => {})
    let time = 0
    smc.on('a', arg => ((time += 1), time === 2 && done()))
    smc.on('a', arg => ((time += 1), time === 2 && done()))
    smc.step('start')
  })
  it('once only can be trigger one times', done => {
    let smc = createStateMachine(() => {})
    let time = 0
    smc.once('a', arg => ((time += 1), time === 2 && done()))
    smc.once('a', arg => ((time += 1), time === 2 && done()))
    smc.step('start')
    smc.step('next')
    smc.step('reject')
    assert.equal(time, 1)
    done()
  })
  it('off should be work', done => {
    let smc = createStateMachine(() => {})
    let on = function(arg) {
      done('get trigger')
    }
    assert.equal(smc.on('a', on), true)
    assert.equal(smc.once('a', on), true)
    smc.off('a', on)
    smc.step('start')
    assert.equal(smc.getState(), 'a')
    smc.step('goto', 'none')
    smc.once('b', on)
    smc.off('b', on)
    smc.on('a', on)
    smc.off('a', on)
    smc.step('start')
    smc.step('next')
    assert.equal(smc.getState(), 'b')
    done()
  })
  it('get state list should be work', () => {
    let smc = createStateMachine(() => {})
    assert.deepEqual(smc.getStateList(), ['none', 'a', 'b', 'c'])
  })
  it('removeAllListener should work', done => {
    let smc = createStateMachine()
    let on = () => {
      done('get trigger')
    }
    smc.on('a', on)
    smc.on('b', on)
    smc.removeAllListener('a')
    smc.step('start')
    smc.removeAllListener()
    smc.step('next')
    done()
  })
  it('step params should same', () => {
    let smc = createStateMachine()
    assert.deepEqual(smc.step('start', { test: 123 }), {
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
  it('step to non set action should be none', () => {
    let smc = createStateMachine()
    assert.equal(smc.step('no'), false)
  })
  it('isPending test', done => {
    let smc = createStateMachine({
      a: async ({ arg }) => {
        console.log(arg)
        await sleep(arg[0].sec)
      }
    })
    let _fn = smc.step('start', { sec: 1 })
    if (_fn instanceof Promise) {
      _fn.then(res => done())
    }
    assert.equal(smc.isPending, true)
    assert.equal(smc.step('next'), false)
  })
  it('sync error test, pending should be clear', () => {
    let smc = createStateMachine({
      a: arg => {
        throw new Error('test')
      }
    })
    assert.throws(() => {
      smc.step('start')
    })
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
  it ('guardian error, pending should be clear', () => {
    let smc = createStateMachine()
    assert.throws(() => smc.step('guardianError'))
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
})
