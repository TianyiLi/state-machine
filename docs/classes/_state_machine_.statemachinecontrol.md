[state-machine](../README.md) > ["state-machine"](../modules/_state_machine_.md) > [StateMachineControl](../classes/_state_machine_.statemachinecontrol.md)

# Class: StateMachineControl

## Hierarchy

**StateMachineControl**

## Index

### Constructors

* [constructor](_state_machine_.statemachinecontrol.md#constructor)

### Properties

* [currentState](_state_machine_.statemachinecontrol.md#currentstate)
* [isPending](_state_machine_.statemachinecontrol.md#ispending)
* [onStateMap](_state_machine_.statemachinecontrol.md#onstatemap)
* [onceStateMap](_state_machine_.statemachinecontrol.md#oncestatemap)
* [options](_state_machine_.statemachinecontrol.md#options)
* [transitionCore](_state_machine_.statemachinecontrol.md#transitioncore)

### Methods

* [can](_state_machine_.statemachinecontrol.md#can)
* [execTransition](_state_machine_.statemachinecontrol.md#exectransition)
* [getMethods](_state_machine_.statemachinecontrol.md#getmethods)
* [getState](_state_machine_.statemachinecontrol.md#getstate)
* [getStateList](_state_machine_.statemachinecontrol.md#getstatelist)
* [off](_state_machine_.statemachinecontrol.md#off)
* [on](_state_machine_.statemachinecontrol.md#on)
* [once](_state_machine_.statemachinecontrol.md#once)
* [removeAllListener](_state_machine_.statemachinecontrol.md#removealllistener)
* [runHookFunction](_state_machine_.statemachinecontrol.md#runhookfunction)
* [step](_state_machine_.statemachinecontrol.md#step)

### Object literals

* [_onTransition](_state_machine_.statemachinecontrol.md#_ontransition)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StateMachineControl**(options: *[Options](../interfaces/_state_machine_.options.md)*): [StateMachineControl](_state_machine_.statemachinecontrol.md)

*Defined in [state-machine.ts:63](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L63)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [Options](../interfaces/_state_machine_.options.md) |

**Returns:** [StateMachineControl](_state_machine_.statemachinecontrol.md)

___

## Properties

<a id="currentstate"></a>

###  currentState

**● currentState**: *`string`*

*Defined in [state-machine.ts:33](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L33)*

Current State

*__type__*: {string}

*__memberof__*: StateMachineControl

___
<a id="ispending"></a>

###  isPending

**● isPending**: *`boolean`* = false

*Defined in [state-machine.ts:53](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L53)*

Transition is pending

*__memberof__*: StateMachineControl

___
<a id="onstatemap"></a>

###  onStateMap

**● onStateMap**: *`Map`<`string`, `Function`[]>* =  new Map()

*Defined in [state-machine.ts:40](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L40)*

Total Events hook function

*__type__*: {Map<string, Function\[\]>}

*__memberof__*: StateMachineControl

___
<a id="oncestatemap"></a>

###  onceStateMap

**● onceStateMap**: *`Map`<`string`, `Function`[]>* =  new Map()

*Defined in [state-machine.ts:47](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L47)*

Total Events hook function `once`

*__type__*: {Map<string, Function\[\]>}

*__memberof__*: StateMachineControl

___
<a id="options"></a>

###  options

**● options**: *[Options](../interfaces/_state_machine_.options.md)*

*Defined in [state-machine.ts:65](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L65)*

___
<a id="transitioncore"></a>

###  transitionCore

**● transitionCore**: *[TransitionCore](_transition_core_.transitioncore.md)*

*Defined in [state-machine.ts:26](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L26)*

*__remark__*: Transition Core

___

## Methods

<a id="can"></a>

###  can

▸ **can**(action: *`string`*): `boolean`

*Defined in [state-machine.ts:258](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L258)*

Check can do the action

*__memberof__*: StateMachineControl

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| action | `string` |  \- |

**Returns:** `boolean`

___
<a id="exectransition"></a>

### `<Private>` execTransition

▸ **execTransition**(result: *[afterTransitionEvent](../modules/_state_machine_.md#aftertransitionevent)*): `false` \| `true` \| `void` \| `Promise`<`void`>

*Defined in [state-machine.ts:218](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L218)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| result | [afterTransitionEvent](../modules/_state_machine_.md#aftertransitionevent) |

**Returns:** `false` \| `true` \| `void` \| `Promise`<`void`>

___
<a id="getmethods"></a>

###  getMethods

▸ **getMethods**(state?: *`string`*): `string`[]

*Defined in [state-machine.ts:145](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L145)*

Get current or specific state functions

*__memberof__*: StateMachineControl

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` state | `string` |  \- |

**Returns:** `string`[]

___
<a id="getstate"></a>

###  getState

▸ **getState**(): `string`

*Defined in [state-machine.ts:165](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L165)*

Get current state

*__memberof__*: StateMachineControl

**Returns:** `string`

___
<a id="getstatelist"></a>

###  getStateList

▸ **getStateList**(): `string`[]

*Defined in [state-machine.ts:155](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L155)*

Get all states

*__memberof__*: StateMachineControl

**Returns:** `string`[]

___
<a id="off"></a>

###  off

▸ **off**(state: *`string`*, fn: *`Function`*): `void`

*Defined in [state-machine.ts:113](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L113)*

Clear the hook function

*__memberof__*: StateMachineControl

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `string` |  \- |
| fn | `Function` |  \- |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(state: *`string`*, fn: *`function`*): `boolean`

*Defined in [state-machine.ts:80](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L80)*

Setting on state hook function

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `string` |  \- |
| fn | `function` |   |

**Returns:** `boolean`

___
<a id="once"></a>

###  once

▸ **once**(state: *`string`*, fn: *`function`*): `boolean`

*Defined in [state-machine.ts:97](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L97)*

Setting on state hook function `once`

*__memberof__*: StateMachineControl

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `string` |  \- |
| fn | `function` |  \- |

**Returns:** `boolean`

___
<a id="removealllistener"></a>

###  removeAllListener

▸ **removeAllListener**(state?: *`string`*): `void`

*Defined in [state-machine.ts:130](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L130)*

Clear the state all hook function

*__memberof__*: StateMachineControl

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` state | `string` |

**Returns:** `void`

___
<a id="runhookfunction"></a>

### `<Private>` runHookFunction

▸ **runHookFunction**(state: *`string`*, args: *`any`*): `void`

*Defined in [state-machine.ts:237](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L237)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | `string` |
| args | `any` |

**Returns:** `void`

___
<a id="step"></a>

###  step

▸ **step**(action: *`string`*, ...args: *`any`[]*): `false` \| [EventData](../interfaces/_state_machine_.eventdata.md) \| `Promise`<`false` \| [EventData](../interfaces/_state_machine_.eventdata.md)>

*Defined in [state-machine.ts:177](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L177)*

Trigger transition

*__memberof__*: StateMachineControl

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| action | `string` |  \- |
| `Rest` args | `any`[] |  \- |

**Returns:** `false` \| [EventData](../interfaces/_state_machine_.eventdata.md) \| `Promise`<`false` \| [EventData](../interfaces/_state_machine_.eventdata.md)>

___

## Object literals

<a id="_ontransition"></a>

### `<Private>` _onTransition

**_onTransition**: *`object`*

*Defined in [state-machine.ts:61](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L61)*

TransitionFunction would be run after transition success, can accept async function

*__type__*: {TransitionFunction}

*__memberof__*: StateMachineControl

<a id="_ontransition._"></a>

####  *

▸ *****(): `void`

*Defined in [state-machine.ts:62](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/state-machine.ts#L62)*

**Returns:** `void`

___

___

