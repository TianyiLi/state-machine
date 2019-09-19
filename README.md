# State-Machine-Control

A very simple state machine

* Install

```bash
npm i -s state-machine-control
```

* Build

```bash
# esm build
npm run build-esm

# min build
npm run build-prod

# dev build
npm run build-dev
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
const StateMachine = require('state-machine-control')
let smc = new StateMachine({
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
    { from: 'START', action: 'read', to: 'START', guardian: async () => {
        return true
    } },
    { from: 'START', action: 'stop', to: 'END' },
    { from: 'END', action: 'reset', to: 'none' }
  ]
})
```

- from `*` is meaning that it can be trigger on any state

You can use `async` or just synchronous run the code and don't need to worry about pending/transition issue.

```js
// goto START with params
let next = smc.step('start', {test: true}, 1, 2, 'string')
console.log(next)
// { before: 'none', on: 'START', action: 'start', arg: [{test: true}, 1, 2, 'string']}

// if the guardian you use is async function, then it should use await / Promise
await smc.step('read') // smc.isPending === true

let end = await smc.step('stop', {sec: 10}) // this transition will stop 10 seconds
```

## Just using on HTML

```html
<script src="lib.min.js"></script>
<script>
const smc = new StateMachine(/* bla bla bla*/)
</script>
```

about API usage watch [Document](docs/README.md)

about HTML sample [Sample](https://tianyili.github.io/state-machine)

also in [example](example)