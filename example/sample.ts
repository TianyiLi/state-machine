import StateMachine from '../src'

let smc = new StateMachine({
  useHistory: false,
  onTransition: console.dir,
  initState: 'none',
  transitions: [
    { 'method': 'goto', 'from': '*', 'to': function (s) { return s } },
    { 'from': 'none', 'method': 'start', 'to': 'START' },
    { 'from': 'START', 'method': 'read', 'to': 'START' },
    { 'from': 'START', 'method': 'stop', 'to': 'none' }
  ]
})

smc.step('start')
console.log(smc.getStateList())
console.log(smc.getMethods('START'))
smc.step('goto', 'none')
console.log(smc.getState())