[state-machine-control](../README.md) > ["transition-core"](../modules/_transition_core_.md) > [TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)

# Interface: TransitionGroup

## Hierarchy

**TransitionGroup**

## Index

### Properties

* [action](_transition_core_.transitiongroup.md#action)
* [from](_transition_core_.transitiongroup.md#from)
* [guardian](_transition_core_.transitiongroup.md#guardian)
* [to](_transition_core_.transitiongroup.md#to)

---

## Properties

<a id="action"></a>

###  action

**● action**: *`string`*

*Defined in [transition-core.ts:119](https://github.com/TianyiLi/state-machine/blob/712c073/src/transition-core.ts#L119)*

___
<a id="from"></a>

###  from

**● from**: *`string` \| [AnyWhere](../modules/_transition_core_.md#anywhere)*

*Defined in [transition-core.ts:117](https://github.com/TianyiLi/state-machine/blob/712c073/src/transition-core.ts#L117)*

___
<a id="guardian"></a>

### `<Optional>` guardian

**● guardian**: *`function`*

*Defined in [transition-core.ts:116](https://github.com/TianyiLi/state-machine/blob/712c073/src/transition-core.ts#L116)*

#### Type declaration
▸(...arg: *`any`*): `boolean` \| `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` arg | `any` |

**Returns:** `boolean` \| `Promise`<`boolean`>

___
<a id="to"></a>

###  to

**● to**: *`string` \| `function`*

*Defined in [transition-core.ts:118](https://github.com/TianyiLi/state-machine/blob/712c073/src/transition-core.ts#L118)*

___

