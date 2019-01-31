[state-machine](../README.md) > ["transition-core"](../modules/_transition_core_.md) > [TransitionGroup](../interfaces/_transition_core_.transitiongroup.md)

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

*Defined in [transition-core.ts:101](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L101)*

___
<a id="from"></a>

###  from

**● from**: *`string`*

*Defined in [transition-core.ts:99](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L99)*

___
<a id="guardian"></a>

### `<Optional>` guardian

**● guardian**: *`function`*

*Defined in [transition-core.ts:98](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L98)*

#### Type declaration
▸(...arg: *`any`*): `false` \| `true` \| `Promise`<`boolean`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` arg | `any` |

**Returns:** `false` \| `true` \| `Promise`<`boolean`>

___
<a id="to"></a>

###  to

**● to**: *`string` \| `function`*

*Defined in [transition-core.ts:100](https://github.com/TianyiLi/state-machine/blob/489acc1/src/transition-core.ts#L100)*

___

