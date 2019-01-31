import { StateMachineControl } from '../src/main'

let smc = new StateMachineControl({
  onTransition: {
    '*': console.dir,
    'END': async ({ arg }) => {
      if (arg && arg[0] && arg[0].sec) {
        await new Promise((resolve, rej) => {
          setTimeout(() => {
            resolve()
          }, arg[0].sec * 1000)
        })
      }
    }
  },
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
      guardian(argv: any = {}) {
        if (argv.test) return true
        else return false
      }
    },
    { from: 'START', action: 'read', to: 'START' },
    { from: 'START', action: 'stop', to: 'END' },
    { from: 'END', action: 'reset', to: 'none' }
  ]
})
async function test() {
  smc.on('START', console.log)
  smc.once('END', console.log)
  smc.step('start')
  console.log(smc.getState())
  smc.step('start', { test: true })
  console.log(smc.getState())
  console.log(smc.getStateList())
  console.log(smc.getMethods('START'))
  smc.step('goto', 'none')
  console.log(smc.getState())
  smc.getStateList()
  smc.step('start', { test: 'test' }, 1, 2, 3)
  await smc.step('stop', { sec: 10 })
  smc.step('goto', 'none')
}
test()
