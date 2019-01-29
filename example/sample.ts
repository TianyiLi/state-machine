import {StateMachineControl} from '../src/'

let smc = new StateMachineControl({
  onTransition: console.dir,
  initState: 'none',
  transitions: [
    {
      action: 'goto',
      from: '*',
      to: function(s) {
        return s
      }
    },
    {
      from: 'none',
      action: 'start',
      to: 'START',
      guardian(argv:any = {}) {
        if (argv.test) return true
        else return false
      }
    },
    { from: 'START', action: 'read', to: 'START' },
    { from: 'START', action: 'stop', to: 'END' },
    { from: 'END', action: 'reset', to: 'none' }
  ]
})
smc.on('START', console.log)
smc.on('END', async arg => {
  let { sec } = arg
  await new Promise((resolve, reject) => {
    setTimeout(resolve, sec * 1000)
  })
})
smc.step('start')
console.log(smc.getState())
smc.step('start', {test: true})
console.log(smc.getState())
console.log(smc.getStateList())
console.log(smc.getMethods('START'))
smc.step('goto', 'none')
console.log(smc.getState())
smc.getStateList()
smc.step('start', { test: 'test' }, 1, 2, 3)
smc.step('stop', { sec: 10 })
