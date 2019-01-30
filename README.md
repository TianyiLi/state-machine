# State-Machine-Control

* Build

```bash
tsc
```

* run Test

```bash
npm test

#or

yarn test
```

* use

### Life cycle

```flow
st=>start: Start
e=>end: End
step=>operation: stepTo(state)
g=>condition: guardian(...arg) (async)
if no Don't do the transition
ot=>operation: onTransition(async)
oh=>operation: onState function (on/once)

st->step->g
g(yes)->ot->oh->e
g(no)->step(right)
```

### Example

```js
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
```

about API usage watch [Document](docs/README.md)