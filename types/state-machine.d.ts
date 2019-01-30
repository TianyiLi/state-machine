import { TransitionCore, TransitionGroup } from './transition-core';
export declare type TransitionFunction = ((EventData: EventData) => void | Promise<void>) | {
    [x: string]: (EventData: EventData) => void | Promise<void>;
};
export declare interface Options {
    transitions: TransitionGroup[];
    onTransition?: TransitionFunction;
    initState: string;
}
export declare interface EventData {
    before: string;
    on: string;
    action: string;
    arg: any;
}
export declare type afterTransitionEvent = false | EventData;
export default class StateMachineControl {
    options: Options;
    /**
     * @remark Transition Core
     */
    transitionCore: TransitionCore;
    /**
     * Current State
     *
     * @type {string}
     * @memberof StateMachineControl
     */
    currentState: string;
    /**
     * Total Events hook function
     *
     * @type {Map<string, Function[]>}
     * @memberof StateMachineControl
     */
    onStateMap: Map<string, Function[]>;
    /**
     * Total Events hook function `once`
     *
     * @type {Map<string, Function[]>}
     * @memberof StateMachineControl
     */
    onceStateMap: Map<string, Function[]>;
    /**
     * Transition is pending
     *
     * @memberof StateMachineControl
     */
    isPending: boolean;
    /**
     * TransitionFunction would be run after transition success, can accept async function
     *
     * @private
     * @type {TransitionFunction}
     * @memberof StateMachineControl
     */
    private _onTransition;
    constructor(options: Options);
    /**
     * Setting on state hook function
     * @param state
     * @param fn
     */
    on(state: string, fn: (arg?: any) => void): boolean;
    /**
     * Setting on state hook function `once`
     *
     * @param {string} state
     * @param {(arg?: any) => void} fn
     * @returns
     * @memberof StateMachineControl
     */
    once(state: string, fn: (arg?: any) => void): boolean;
    /**
     * Clear the hook function
     *
     * @param {string} state
     * @param {Function} fn
     * @memberof StateMachineControl
     */
    off(state: string, fn: Function): void;
    /**
     * Clear the state all hook function
     *
     * @param {string} [state]
     * @memberof StateMachineControl
     */
    removeAllListener(state?: string): void;
    /**
     * Get current or specific state functions
     *
     * @param state
     * @returns
     * @memberof StateMachineControl
     */
    getMethods(state?: string): string[];
    /**
     * Get all states
     *
     * @returns
     * @memberof StateMachineControl
     */
    getStateList(): string[];
    /**
     * Get current state
     *
     * @returns
     * @memberof StateMachineControl
     */
    getState(): string;
    /**
     * Trigger transition
     *
     * @param {string} action
     * @param {*} args
     * @returns
     * @memberof StateMachineControl
     */
    step(action: string, ...args: any[]): false | EventData | Promise<afterTransitionEvent>;
    private execTransition;
    private runHookFunction;
    /**
     * Check can do the action
     *
     * @param {string} action
     * @returns
     * @memberof StateMachineControl
     */
    can(action: string): boolean;
}
