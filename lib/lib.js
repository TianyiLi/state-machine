(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar transition_core_1 = __webpack_require__(/*! ./transition-core */ \"./src/transition-core.ts\");\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\nvar StateMachine = /** @class */ (function () {\n    function StateMachine(options) {\n        this.options = options;\n        /**\n         * Total Events hook function\n         *\n         * @type {Map<string, Function[]>}\n         * @memberof StateMachineControl\n         */\n        this.onStateMap = new Map();\n        /**\n         * Total Events hook function `once`\n         *\n         * @type {Map<string, Function[]>}\n         * @memberof StateMachineControl\n         */\n        this.onceStateMap = new Map();\n        /**\n         * Transition is pending\n         *\n         * @memberof StateMachineControl\n         */\n        this.isPending = false;\n        /**\n         * TransitionFunction would be run after transition success, can accept async function\n         *\n         * @private\n         * @type {TransitionFunction}\n         * @memberof StateMachineControl\n         */\n        this._onTransition = {\n            '*': function () { }\n        };\n        /**\n         * When transition finish, run hook on functions\n         * Same as return object\n         *\n         * @private\n         * @type {Set<Function>}\n         * @memberof StateMachine\n         */\n        this._onTransitionEndFns = new Set();\n        this.transitionCore = new transition_core_1.TransitionCore(options.transitions, options.initState);\n        this._onTransition = this.options.onTransition || this._onTransition;\n        this.step = this.step.bind(this);\n        this.on = this.on.bind(this);\n        this.execTransition = this.execTransition.bind(this);\n        this.runHookFunction = this.runHookFunction.bind(this);\n    }\n    /**\n     * Setting on state hook function\n     *\n     * @param {string} state\n     * @param {(arg?: any) => void} fn\n     * @returns\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.on = function (state, fn) {\n        if (!~this.transitionCore.getStates().indexOf(state))\n            return false;\n        if (this.onStateMap.has(state)) {\n            this.onStateMap.get(state).push(fn);\n        }\n        else {\n            this.onStateMap.set(state, [fn]);\n        }\n        return true;\n    };\n    /**\n     * Setting on state hook function `once`\n     *\n     * @param {string} state\n     * @param {(arg?: any) => void} fn\n     * @returns\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.once = function (state, fn) {\n        if (!~this.transitionCore.getStates().indexOf(state))\n            return false;\n        if (this.onceStateMap.has(state)) {\n            this.onceStateMap.get(state).push(fn);\n        }\n        else {\n            this.onceStateMap.set(state, [fn]);\n        }\n        return true;\n    };\n    /**\n     * Clear the hook function\n     *\n     * @param {string} state\n     * @param {Function} fn\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.off = function (state, fn) {\n        var fns = this.onStateMap.get(state);\n        var onceFn = this.onceStateMap.get(state);\n        if (fns && !!~fns.indexOf(fn)) {\n            fns.splice(fns.indexOf(fn), 1);\n        }\n        if (onceFn && !!~onceFn.indexOf(fn)) {\n            onceFn.splice(onceFn.indexOf(fn), 1);\n        }\n    };\n    /**\n     * Clear the hook function\n     *\n     * @param state\n     * @param fn\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.removeListener = function (state, fn) {\n        this.off(state, fn);\n    };\n    /**\n     * Clear the state all hook function\n     *\n     * @param {string} [state]\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.removeAllListener = function (state) {\n        if (state) {\n            this.onStateMap.delete(state);\n            this.onceStateMap.delete(state);\n        }\n        else {\n            this.onStateMap.clear();\n            this.onceStateMap.clear();\n        }\n    };\n    /**\n     * Get current or specific state functions\n     *\n     * @param state\n     * @returns\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.getMethods = function (state) {\n        return this.transitionCore.getMethods(state);\n    };\n    /**\n     * Get all states\n     *\n     * @returns\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.getStateList = function () {\n        return this.transitionCore.getStates();\n    };\n    /**\n     * Get current state\n     *\n     * @returns\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.getState = function () {\n        return this.transitionCore.state;\n    };\n    /**\n     * Trigger transition\n     *\n     * @param {string} action\n     * @param {*} args\n     * @returns\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.step = function (action) {\n        var _a;\n        var _this = this;\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        if (this.isPending === true) {\n            console.warn('Transition still working');\n            return false;\n        }\n        var result;\n        try {\n            this.isPending = true;\n            result = (_a = this.transitionCore).stepTo.apply(_a, [action].concat(args));\n            if (!result) {\n                this.isPending = false;\n                return false;\n            }\n        }\n        catch (error) {\n            this.isPending = false;\n            throw error;\n        }\n        if (result instanceof Promise) {\n            // if guardian is Promise\n            return result\n                .then(this.execTransition)\n                .then(function () { return (_this.runHookFunction(), _this.transitionCore.currentTransitionEvent); })\n                .catch(function (err) {\n                throw err;\n            })\n                .finally(function () {\n                _this.isPending = false;\n            });\n        }\n        else {\n            // if guardian not Promise\n            var afterTransition = void 0;\n            try {\n                afterTransition = this.execTransition();\n            }\n            catch (error) {\n                this.isPending = false;\n                throw error;\n            }\n            if (afterTransition instanceof Promise) {\n                return afterTransition\n                    .then(function () { return (_this.runHookFunction(), _this.transitionCore.currentTransitionEvent); })\n                    .catch(function (err) {\n                    throw err;\n                })\n                    .finally(function () {\n                    _this.isPending = false;\n                });\n            }\n            else {\n                this.runHookFunction();\n                this.isPending = false;\n                return this.transitionCore.currentTransitionEvent;\n            }\n        }\n    };\n    StateMachine.prototype.execTransition = function () {\n        var transitionData = this.transitionCore.currentTransitionEvent;\n        if (typeof this._onTransition === 'function') {\n            var result_1 = this._onTransition(transitionData);\n            if (util_1.fnsHasPromise(result_1)) {\n                return Promise.resolve()\n                    .then(function () { return result_1; })\n                    .then(function () { return true; });\n            }\n            else {\n                return true;\n            }\n        }\n        else {\n            var all_1 = this._onTransition['*'] && this._onTransition['*'](transitionData);\n            var current_1 = this._onTransition[transitionData.on] && this._onTransition[transitionData.on](transitionData);\n            if (util_1.fnsHasPromise(all_1, current_1)) {\n                return Promise.resolve()\n                    .then(function () { return all_1; })\n                    .then(function () { return current_1; })\n                    .then(function () { return true; });\n            }\n            else {\n                return true;\n            }\n        }\n    };\n    StateMachine.prototype.runHookFunction = function () {\n        var transitionData = this.transitionCore.currentTransitionEvent;\n        var on = transitionData.on, arg = transitionData.arg;\n        var fn = this.onStateMap.get(on);\n        var onceFn = this.onceStateMap.get(on);\n        if (fn) {\n            fn.forEach(function (f) { return f.apply(void 0, arg); });\n        }\n        if (onceFn) {\n            while (onceFn.length) {\n                onceFn.shift().apply(void 0, arg);\n            }\n        }\n        if (this._onTransitionEndFns.size) {\n            this._onTransitionEndFns.forEach(function (f) { return f(transitionData); });\n        }\n    };\n    /**\n     * Check can do the action\n     *\n     * @param {string} action\n     * @returns\n     * @memberof StateMachineControl\n     */\n    StateMachine.prototype.can = function (action) {\n        return !!~this.transitionCore.getMethods().indexOf(action);\n    };\n    /**\n     * Check can transition to the state\n     *\n     * @param state Next state you want to transition to\n     */\n    StateMachine.prototype.canTransitionTo = function (state) {\n        return this.transitionCore.canTransitionTo(state);\n    };\n    StateMachine.prototype.onTransitionEnd = function (fns) {\n        this._onTransitionEndFns.add(fns);\n    };\n    StateMachine.prototype.offTransitionEnd = function (fns) {\n        this._onTransitionEndFns.delete(fns);\n    };\n    return StateMachine;\n}());\nexports.StateMachine = StateMachine;\nexports.default = StateMachine;\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/transition-core.ts":
/*!********************************!*\
  !*** ./src/transition-core.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TransitionCore = /** @class */ (function () {\n    function TransitionCore(transitionGroups, initState) {\n        var _this = this;\n        this.transitionGroups = transitionGroups;\n        this.initState = initState;\n        this.transitionMap = new Map();\n        this.stateList = new Set();\n        this.transitionMethods = new Map();\n        this._state = null;\n        this._transitionEvent = null;\n        this._state = initState;\n        this.transitionGroups.forEach(function (e) {\n            var key = e.from + \"/\" + e.action;\n            if (_this.transitionMap.has(key))\n                throw new Error(\"From \" + e.from + \" to \" + (typeof e.to === 'function' ? e.to() : e.to) + \" with \" + e.action + \" has repeated declarative\");\n            _this.transitionMap.set(e.from + \"/\" + e.action, Object.freeze(e));\n            !_this.stateList.has(e.from) &&\n                e.from !== '*' &&\n                _this.stateList.add(e.from);\n            _this.transitionMethods.has(e.from)\n                ? _this.transitionMethods.get(e.from).push(e.action)\n                : _this.transitionMethods.set(e.from, [e.action]);\n            typeof e.to === 'string' &&\n                !_this.stateList.has(e.to) &&\n                _this.stateList.add(e.to);\n        });\n        this.stepTo = this.stepTo.bind(this);\n        this.getMethods = this.getMethods.bind(this);\n        this.getStates = this.getStates.bind(this);\n        this.stateOnTransition = this.stateOnTransition.bind(this);\n    }\n    TransitionCore.prototype.stepTo = function (action) {\n        var _this = this;\n        var arg = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            arg[_i - 1] = arguments[_i];\n        }\n        var prevState = this._state;\n        var key = this._state + \"/\" + action;\n        if (this.transitionMap.has(\"*/\" + action)) {\n            key = \"*/\" + action;\n        }\n        else if (!this.transitionMap.has(key)) {\n            console.warn(\"Cannot transition with \" + action);\n            return false;\n        }\n        var group = Object.assign({}, this.transitionMap.get(key));\n        var guardian = group.guardian ? group.guardian.apply(group, arg) : true;\n        if (guardian instanceof Promise) {\n            return Promise.resolve()\n                .then(function () { return guardian; })\n                .then(function (res) {\n                group.from = prevState;\n                return res;\n            })\n                .then(function (res) {\n                if (res) {\n                    return _this.stateOnTransition.apply(_this, [group].concat(arg));\n                }\n                else\n                    return false;\n            });\n        }\n        else if (guardian) {\n            group.from = prevState;\n            return this.stateOnTransition.apply(this, [group].concat(arg));\n        }\n        else {\n            return false;\n        }\n    };\n    TransitionCore.prototype.getMethods = function (state) {\n        if (state === void 0) { state = this._state; }\n        return this.transitionMethods.get(state);\n    };\n    TransitionCore.prototype.getStates = function () {\n        var list = [];\n        this.stateList.forEach(function (e) { return list.push(e); });\n        return list;\n    };\n    Object.defineProperty(TransitionCore.prototype, \"state\", {\n        get: function () {\n            return this._state;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TransitionCore.prototype, \"currentTransitionEvent\", {\n        get: function () {\n            return this._transitionEvent;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    TransitionCore.prototype.canTransitionTo = function (state) {\n        var _this = this;\n        return this.getMethods().some(function (_m) {\n            return _this.transitionMap.get(_this._state + \"/\" + _m).to === state;\n        });\n    };\n    TransitionCore.prototype.stateOnTransition = function (e) {\n        var arg = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            arg[_i - 1] = arguments[_i];\n        }\n        var to = typeof e.to === 'function' ? e.to.apply(e, arg) : e.to;\n        if (this.stateList.has(to)) {\n            this._state = to;\n            this._transitionEvent = {\n                before: e.from,\n                on: this._state,\n                action: e.action,\n                arg: arg\n            };\n            return true;\n        }\n        else {\n            this._transitionEvent = null;\n            return false;\n        }\n    };\n    return TransitionCore;\n}());\nexports.TransitionCore = TransitionCore;\n\n\n//# sourceURL=webpack:///./src/transition-core.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction fnsHasPromise() {\n    var _type = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        _type[_i] = arguments[_i];\n    }\n    return _type.some(function (t) { return t instanceof Promise; });\n}\nexports.fnsHasPromise = fnsHasPromise;\n\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });
});