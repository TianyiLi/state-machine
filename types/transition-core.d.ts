import { EventData } from './main';
export declare class TransitionCore {
    transitionGroups: TransitionGroup[];
    initState: string;
    private transitionMap;
    private stateList;
    private transitionMethods;
    private _state;
    private _transitionEvent;
    constructor(transitionGroups: TransitionGroup[], initState: string);
    stepTo(action: string, ...arg: any): boolean | Promise<boolean>;
    getMethods(state?: string): string[];
    getStates(): string[];
    readonly state: string;
    readonly currentTransitionEvent: EventData;
    canTransitionTo(state: string): boolean;
    stateOnTransition(e: TransitionGroup, ...arg: any[]): boolean;
}
export declare type AnyWhere = '*';
export declare interface TransitionGroup {
    guardian?: (...arg: any) => boolean | Promise<boolean>;
    from: string | AnyWhere;
    to: string | ((...arg: any) => string);
    action: string;
}
