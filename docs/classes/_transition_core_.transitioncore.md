[state-machine-control](../README.md) > ["transition-core"](../modules/_transition_core_.md) > [TransitionCore](../classes/_transition_core_.transitioncore.md)

# Class: TransitionCore

## Hierarchy

**TransitionCore**

## Index

### Constructors

* [constructor](_transition_core_.transitioncore.md#constructor)

### Properties

* [_state](_transition_core_.transitioncore.md#_state)
* [_transitionEvent](_transition_core_.transitioncore.md#_transitionevent)
* [initState](_transition_core_.transitioncore.md#initstate)
* [stateList](_transition_core_.transitioncore.md#statelist)
* [transitionGroups](_transition_core_.transitioncore.md#transitiongroups)
* [transitionMap](_transition_core_.transitioncore.md#transitionmap)
* [transitionMethods](_transition_core_.transitioncore.md#transitionmethods)

### Accessors

* [currentTransitionEvent](_transition_core_.transitioncore.md#currenttransitionevent)
* [state](_transition_core_.transitioncore.md#state)

### Methods

* [canTransitionTo](_transition_core_.transitioncore.md#cantransitionto)
* [getMethods](_transition_core_.transitioncore.md#getmethods)
* [getStates](_transition_core_.transitioncore.md#getstates)
* [stateOnTransition](_transition_core_.transitioncore.md#stateontransition)
* [stepTo](_transition_core_.transitioncore.md#stepto)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TransitionCore**(transitionGroups: *[TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)[]*, initState: *`string`*): [TransitionCore](_transition_core_.transitioncore.md)

*Defined in [transition-core.ts:7](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L7)*

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

*Defined in [transition-core.ts:6](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L6)*

___
<a id="_transitionevent"></a>

### `<Private>` _transitionEvent

**● _transitionEvent**: *[EventData](../interfaces/_main_.eventdata.md)* =  null

*Defined in [transition-core.ts:7](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L7)*

___
<a id="initstate"></a>

###  initState

**● initState**: *`string`*

*Defined in [transition-core.ts:10](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L10)*

___
<a id="statelist"></a>

### `<Private>` stateList

**● stateList**: *`Set`<`string`>* =  new Set()

*Defined in [transition-core.ts:4](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L4)*

___
<a id="transitiongroups"></a>

###  transitionGroups

**● transitionGroups**: *[TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)[]*

*Defined in [transition-core.ts:9](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L9)*

___
<a id="transitionmap"></a>

### `<Private>` transitionMap

**● transitionMap**: *`Map`<`string`, [TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)>* =  new Map()

*Defined in [transition-core.ts:3](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L3)*

___
<a id="transitionmethods"></a>

### `<Private>` transitionMethods

**● transitionMethods**: *`Map`<`string`, `string`[]>* =  new Map()

*Defined in [transition-core.ts:5](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L5)*

___

## Accessors

<a id="currenttransitionevent"></a>

###  currentTransitionEvent

getcurrentTransitionEvent(): [EventData](../interfaces/_main_.eventdata.md)

*Defined in [transition-core.ts:87](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L87)*

**Returns:** [EventData](../interfaces/_main_.eventdata.md)

___
<a id="state"></a>

###  state

getstate(): `string`

*Defined in [transition-core.ts:83](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L83)*

**Returns:** `string`

___

## Methods

<a id="cantransitionto"></a>

###  canTransitionTo

▸ **canTransitionTo**(state: *`string`*): `boolean`

*Defined in [transition-core.ts:91](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L91)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | `string` |

**Returns:** `boolean`

___
<a id="getmethods"></a>

###  getMethods

▸ **getMethods**(state?: *`string`*): `string`[]

*Defined in [transition-core.ts:73](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L73)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` state | `string` |  this._state |

**Returns:** `string`[]

___
<a id="getstates"></a>

###  getStates

▸ **getStates**(): `string`[]

*Defined in [transition-core.ts:77](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L77)*

**Returns:** `string`[]

___
<a id="stateontransition"></a>

###  stateOnTransition

▸ **stateOnTransition**(e: *[TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)*, ...arg: *`any`[]*): `boolean`

*Defined in [transition-core.ts:97](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L97)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | [TransitionGroup](../interfaces/_transition_core_.transitiongroup.md) |
| `Rest` arg | `any`[] |

**Returns:** `boolean`

___
<a id="stepto"></a>

###  stepTo

▸ **stepTo**(action: *`string`*, ...arg: *`any`*): `false` \| `true` \| `Promise`<`boolean`>

*Defined in [transition-core.ts:39](https://github.com/TianyiLi/state-machine/blob/f345f97/src/transition-core.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | `string` |
| `Rest` arg | `any` |

**Returns:** `false` \| `true` \| `Promise`<`boolean`>

___

