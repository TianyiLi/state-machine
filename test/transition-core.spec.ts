import 'mocha'
import * as assert from 'assert'

import { TransitionCore } from '../src/transition-core'

function sleep(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, sec)
  })
}

function createTc() {
  return new TransitionCore(
    [
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
    ],
    'none'
  )
}

describe('Transition core test', () => {
  describe('Sync test', () => {
    it('initState should be none', () => {
      let tc = createTc()
      assert.equal(tc.initState, 'none')
    })
    it('getStates should be correct', () => {
      let tc = createTc()
      assert.deepEqual(tc.getStates(), ['none', 'a', 'b', 'c'])
    })
    it('getMethods should be correct', () => {
      let tc = createTc()
      assert.deepEqual(tc.getMethods(), ['start'])
    })
    it('should not be transition', () => {
      let tc = createTc()
      assert.equal(tc.stepTo('next'), false)
    })
    it('repeated method and from should throw error', () => {
      assert.throws(
        () =>
          new TransitionCore(
            [
              { from: 'none', to: 'a', action: 'start' },
              { from: 'none', to: 'qq', action: 'start' }
            ],
            'none'
          )
      )
      assert.throws(
        () =>
          new TransitionCore(
            [
              { from: 'none', to: 'a', action: 'start' },
              { from: 'none', to: () => 'qq', action: 'start' }
            ],
            'none'
          )
      )
    })
    it('method start should be work', () => {
      let tc = createTc()
      assert.deepEqual(tc.stepTo('start'), {
        before: 'none',
        on: 'a',
        arg: []
      })
      assert.equal(tc.state, 'a')
    })
    it('custom to should still in state list', () => {
      let tc = createTc()
      assert.equal(tc.stepTo('goto', 'Cannot achive'), false)
    })
    it('param pass should be work', () => {
      let tc = createTc()
      assert.deepEqual(tc.stepTo('start', 1, 2, 3), {
        before: 'none',
        on: 'a',
        arg: [1, 2, 3]
      })
    })
    it('method guardian should be work', () => {
      let tc = createTc()
      tc.stepTo('start')
      tc.stepTo('next')
      assert.equal(tc.stepTo('reject', { test: false }), false)
    })
    it('goto can go anywhere!', () => {
      let tc = createTc()
      tc.stepTo('start')
      tc.stepTo('next')
      assert.equal(tc.state, 'b')
      tc.stepTo('goto', 'none')
      assert.equal(tc.state, 'none')
    })
  })
  describe('async test', () => {
    it('async guardian', async function() {
      this.timeout(1500)
      let tc = createTc()
      tc.stepTo('start')
      tc.stepTo('next')
      await tc.stepTo('sleep')
      assert.equal(tc.state, 'b')
      await tc.stepTo('sleep', true)
      assert.equal(tc.state, 'c')
    })
  })
})
