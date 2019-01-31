import { afterTransitionEvent } from './state-machine';
export declare class TransitionCore {
    transitionGroups: TransitionGroup[];
    initState: string;
    private transitionMap;
    private stateList;
    private transitionMethods;
    private _state;
    constructor(transitionGroups: TransitionGroup[], initState: string);
    stepTo(action: string, ...arg: any): afterTransitionEvent | Promise<afterTransitionEvent>;
    getMethods(state?: string): string[];
    getStates(): string[];
    readonly state: string;
    stateOnTransition(e: TransitionGroup, ...arg: any[]): afterTransitionEvent;
}
export declare interface TransitionGroup {
    guardian?: (...arg: any) => (boolean | Promise<boolean>);
    from: string;
    to: string | ((...arg: any) => string);
    action: string;
}
