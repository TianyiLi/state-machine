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

*Defined in [transition-core.ts:97](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/transition-core.ts#L97)*

___
<a id="from"></a>

###  from

**● from**: *`string`*

*Defined in [transition-core.ts:95](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/transition-core.ts#L95)*

___
<a id="guardian"></a>

### `<Optional>` guardian

**● guardian**: *`function`*

*Defined in [transition-core.ts:94](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/transition-core.ts#L94)*

#### Type declaration
▸(...arg: *`any`*): `boolean` \| `function`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` arg | `any` |

**Returns:** `boolean` \| `function`

___
<a id="to"></a>

###  to

**● to**: *`string` \| `function`*

*Defined in [transition-core.ts:96](https://github.com/TianyiLi/state-machine/blob/6c5a24d/src/transition-core.ts#L96)*

___

