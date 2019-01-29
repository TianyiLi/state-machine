import { TransitionCore, TransitionGroup } from './transition-core';
declare interface Options {
    transitions: TransitionGroup[];
    onTransition?: (EventData: EventData) => (void | Promise<void>);
    initState: string;
}
declare interface EventData {
    before: string;
    on: string;
    arg: any;
}
export default class StateMachineControl {
    options: Options;
    transitions: TransitionCore;
    currentState: string;
    onStateMap: Map<string, Function[]>;
    onceStateMap: Map<string, Function[]>;
    isPending: boolean;
    constructor(options: Options);
    on(state: string, fn: (arg?: any) => void): void;
    once(state: string, fn: (arg?: any) => void): void;
    off(state: string, fn: Function): void;
    removeAllListener(state?: string): void;
    getMethods(state: any): string[];
    getStateList(): any[];
    getState(): string;
    step(method: string, ...args: any[]): false | {
        before: string;
        on: string;
        arg: any[];
    } | Promise<boolean | {
        before: string;
        on: string;
        arg: any[];
    }>;
    runHookFunction(state: string, args: any): void;
    can(method: string): boolean;
}
export {};
