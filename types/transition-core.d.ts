export declare class TransitionCore {
    transitionGroups: TransitionGroup[];
    initState: string;
    private transitionMap;
    private stateList;
    private transitionMethods;
    private _state;
    constructor(transitionGroups: TransitionGroup[], initState: string);
    stepTo(method: string, ...arg: any): false | {
        before: string;
        on: string;
        arg: any[];
    } | Promise<false | {
        before: string;
        on: string;
        arg: any[];
    }>;
    getMethods(state?: string): string[];
    getStates(): any[];
    readonly state: string;
    stateOnTransition(e: TransitionGroup, ...arg: any[]): false | {
        before: string;
        on: string;
        arg: any[];
    };
}
export declare interface TransitionGroup {
    guardian?: (...arg: any) => boolean | ((...arg: any) => Promise<boolean>);
    from: string;
    to: string | ((...arg: any) => string);
    action: string;
}
