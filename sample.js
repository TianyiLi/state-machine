const { StateMachine } = require('..')
let smc = new StateMachine({
  initState: 'none',
  transitions: [
    {
      action: 'start',
      from: 'none',
      to: 'a'
    },
    {
      action: 'next',
      from: 'a',
      to: 'b'
    },
    {
      action: 'end',
      from: 'b',
      to: 'c'
    },
    /**
     * This can trigger in anywhere
     * '*' is the keyword
     */
    {
      action: 'reset',
      from: '*',
      to: () => 'none'
    }
  ]
})

let next = smc.step('start')
console.log(next)