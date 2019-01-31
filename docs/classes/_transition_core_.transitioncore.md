[state-machine](../README.md) > ["transition-core"](../modules/_transition_core_.md) > [TransitionCore](../classes/_transition_core_.transitioncore.md)

# Class: TransitionCore

## Hierarchy

**TransitionCore**

## Index

### Constructors

* [constructor](_transition_core_.transitioncore.md#constructor)

### Properties

* [_state](_transition_core_.transitioncore.md#_state)
* [initState](_transition_core_.transitioncore.md#initstate)
* [stateList](_transition_core_.transitioncore.md#statelist)
* [transitionGroups](_transition_core_.transitioncore.md#transitiongroups)
* [transitionMap](_transition_core_.transitioncore.md#transitionmap)
* [transitionMethods](_transition_core_.transitioncore.md#transitionmethods)

### Accessors

* [state](_transition_core_.transitioncore.md#state)

### Methods

* [getMethods](_transition_core_.transitioncore.md#getmethods)
* [getStates](_transition_core_.transitioncore.md#getstates)
* [stateOnTransition](_transition_core_.transitioncore.md#stateontransition)
* [stepTo](_transition_core_.transitioncore.md#stepto)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TransitionCore**(transitionGroups: *[TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)[]*, initState: *`string`*): [TransitionCore](_transition_core_.transitioncore.md)

*Defined in [transition-core.ts:6](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L6)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| transitionGroups | [TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)[] |
| initState | `string` |

**Returns:** [TransitionCore](_transition_core_.transitioncore.md)

___

## Properties

<a id="_state"></a>

### `<Private>` _state

**● _state**: *`string`* =  null

*Defined in [transition-core.ts:6](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L6)*

___
<a id="initstate"></a>

###  initState

**● initState**: *`string`*

*Defined in [transition-core.ts:9](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L9)*

___
<a id="statelist"></a>

### `<Private>` stateList

**● stateList**: *`Set`<`string`>* =  new Set()

*Defined in [transition-core.ts:4](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L4)*

___
<a id="transitiongroups"></a>

###  transitionGroups

**● transitionGroups**: *[TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)[]*

*Defined in [transition-core.ts:8](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L8)*

___
<a id="transitionmap"></a>

### `<Private>` transitionMap

**● transitionMap**: *`Map`<`string`, [TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)>* =  new Map()

*Defined in [transition-core.ts:3](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L3)*

___
<a id="transitionmethods"></a>

### `<Private>` transitionMethods

**● transitionMethods**: *`Map`<`string`, `string`[]>* =  new Map()

*Defined in [transition-core.ts:5](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L5)*

___

## Accessors

<a id="state"></a>

###  state

getstate(): `string`

*Defined in [transition-core.ts:78](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L78)*

**Returns:** `string`

___

## Methods

<a id="getmethods"></a>

###  getMethods

▸ **getMethods**(state?: *`string`*): `string`[]

*Defined in [transition-core.ts:68](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L68)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` state | `string` |  this._state |

**Returns:** `string`[]

___
<a id="getstates"></a>

###  getStates

▸ **getStates**(): `string`[]

*Defined in [transition-core.ts:72](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L72)*

**Returns:** `string`[]

___
<a id="stateontransition"></a>

###  stateOnTransition

▸ **stateOnTransition**(e: *[TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)*, ...arg: *`any`[]*): [afterTransitionEvent](../modules/_main_.md#aftertransitionevent)

*Defined in [transition-core.ts:82](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L82)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | [TransitionGroup](../interfaces/_transition_core_.transitiongroup.md) |
| `Rest` arg | `any`[] |

**Returns:** [afterTransitionEvent](../modules/_main_.md#aftertransitionevent)

___
<a id="stepto"></a>

###  stepTo

▸ **stepTo**(action: *`string`*, ...arg: *`any`*): [afterTransitionEvent](../modules/_main_.md#aftertransitionevent) \| `Promise`<[afterTransitionEvent](../modules/_main_.md#aftertransitionevent)>

*Defined in [transition-core.ts:38](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L38)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | `string` |
| `Rest` arg | `any` |

**Returns:** [afterTransitionEvent](../modules/_main_.md#aftertransitionevent) \| `Promise`<[afterTransitionEvent](../modules/_main_.md#aftertransitionevent)>

___

