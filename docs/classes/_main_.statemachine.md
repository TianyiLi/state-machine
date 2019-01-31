[state-machine-control](../README.md) > ["main"](../modules/_main_.md) > [StateMachine](../classes/_main_.statemachine.md)

# Class: StateMachine

## Hierarchy

**StateMachine**

## Index

### Constructors

* [constructor](_main_.statemachine.md#constructor)

### Properties

* [currentState](_main_.statemachine.md#currentstate)
* [isPending](_main_.statemachine.md#ispending)
* [onStateMap](_main_.statemachine.md#onstatemap)
* [onceStateMap](_main_.statemachine.md#oncestatemap)
* [options](_main_.statemachine.md#options)
* [transitionCore](_main_.statemachine.md#transitioncore)

### Methods

* [can](_main_.statemachine.md#can)
* [execTransition](_main_.statemachine.md#exectransition)
* [getMethods](_main_.statemachine.md#getmethods)
* [getState](_main_.statemachine.md#getstate)
* [getStateList](_main_.statemachine.md#getstatelist)
* [off](_main_.statemachine.md#off)
* [on](_main_.statemachine.md#on)
* [once](_main_.statemachine.md#once)
* [removeAllListener](_main_.statemachine.md#removealllistener)
* [runHookFunction](_main_.statemachine.md#runhookfunction)
* [step](_main_.statemachine.md#step)
* [stepOnRejectHandler](_main_.statemachine.md#steponrejecthandler)

### Object literals

* [_onTransition](_main_.statemachine.md#_ontransition)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StateMachine**(options: *[Options](../interfaces/_main_.options.md)*): [StateMachine](_main_.statemachine.md)

*Defined in [main.ts:64](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [Options](../interfaces/_main_.options.md) |

**Returns:** [StateMachine](_main_.statemachine.md)

___

## Properties

<a id="currentstate"></a>

###  currentState

**● currentState**: *`string`*

*Defined in [main.ts:34](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L34)*

Current State

*__type__*: {string}

*__memberof__*: StateMachineControl

___
<a id="ispending"></a>

###  isPending

**● isPending**: *`boolean`* = false

*Defined in [main.ts:54](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L54)*

Transition is pending

*__memberof__*: StateMachineControl

___
<a id="onstatemap"></a>

###  onStateMap

**● onStateMap**: *`Map`<`string`, `Function`[]>* =  new Map()

*Defined in [main.ts:41](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L41)*

Total Events hook function

*__type__*: {Map<string, Function\[\]>}

*__memberof__*: StateMachineControl

___
<a id="oncestatemap"></a>

###  onceStateMap

**● onceStateMap**: *`Map`<`string`, `Function`[]>* =  new Map()

*Defined in [main.ts:48](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L48)*

Total Events hook function `once`

*__type__*: {Map<string, Function\[\]>}

*__memberof__*: StateMachineControl

___
<a id="options"></a>

###  options

**● options**: *[Options](../interfaces/_main_.options.md)*

*Defined in [main.ts:66](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L66)*

___
<a id="transitioncore"></a>

###  transitionCore

**● transitionCore**: *[TransitionCore](_transition_core_.transitioncore.md)*

*Defined in [main.ts:27](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L27)*

*__remark__*: Transition Core

___

## Methods

<a id="can"></a>

###  can

▸ **can**(action: *`string`*): `boolean`

*Defined in [main.ts:297](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L297)*

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

▸ **execTransition**(result: *[afterTransitionEvent](../modules/_main_.md#aftertransitionevent)*): `false` \| [EventData](../interfaces/_main_.eventdata.md) \| `Promise`<`false` \| [EventData](../interfaces/_main_.eventdata.md)>

*Defined in [main.ts:256](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L256)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| result | [afterTransitionEvent](../modules/_main_.md#aftertransitionevent) |

**Returns:** `false` \| [EventData](../interfaces/_main_.eventdata.md) \| `Promise`<`false` \| [EventData](../interfaces/_main_.eventdata.md)>

___
<a id="getmethods"></a>

###  getMethods

▸ **getMethods**(state?: *`string`*): `string`[]

*Defined in [main.ts:154](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L154)*

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

*Defined in [main.ts:174](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L174)*

Get current state

*__memberof__*: StateMachineControl

**Returns:** `string`

___
<a id="getstatelist"></a>

###  getStateList

▸ **getStateList**(): `string`[]

*Defined in [main.ts:164](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L164)*

Get all states

*__memberof__*: StateMachineControl

**Returns:** `string`[]

___
<a id="off"></a>

###  off

▸ **off**(state: *`string`*, fn: *`Function`*): `void`

*Defined in [main.ts:120](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L120)*

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

*Defined in [main.ts:85](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L85)*

Setting on state hook function

*__memberof__*: StateMachineControl

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| state | `string` |  \- |
| fn | `function` |  \- |

**Returns:** `boolean`

___
<a id="once"></a>

###  once

▸ **once**(state: *`string`*, fn: *`function`*): `boolean`

*Defined in [main.ts:103](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L103)*

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

*Defined in [main.ts:137](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L137)*

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

*Defined in [main.ts:277](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L277)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | `string` |
| args | `any` |

**Returns:** `void`

___
<a id="step"></a>

###  step

▸ **step**(action: *`string`*, ...args: *`any`[]*): [afterTransitionEvent](../modules/_main_.md#aftertransitionevent) \| `Promise`<[afterTransitionEvent](../modules/_main_.md#aftertransitionevent)>

*Defined in [main.ts:186](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L186)*

Trigger transition

*__memberof__*: StateMachineControl

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| action | `string` |  \- |
| `Rest` args | `any`[] |  \- |

**Returns:** [afterTransitionEvent](../modules/_main_.md#aftertransitionevent) \| `Promise`<[afterTransitionEvent](../modules/_main_.md#aftertransitionevent)>

___
<a id="steponrejecthandler"></a>

### `<Private>` stepOnRejectHandler

▸ **stepOnRejectHandler**(err: *`any`*): `false`

*Defined in [main.ts:251](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L251)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| err | `any` |

**Returns:** `false`

___

## Object literals

<a id="_ontransition"></a>

### `<Private>` _onTransition

**_onTransition**: *`object`*

*Defined in [main.ts:62](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L62)*

TransitionFunction would be run after transition success, can accept async function

*__type__*: {TransitionFunction}

*__memberof__*: StateMachineControl

<a id="_ontransition._"></a>

####  *

▸ *****(): `void`

*Defined in [main.ts:63](https://github.com/TianyiLi/state-machine/blob/a39ee4e/src/main.ts#L63)*

**Returns:** `void`

___

___

