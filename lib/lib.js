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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar transition_core_1 = __webpack_require__(/*! ./transition-core */ \"./src/transition-core.ts\");\r\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\r\nvar StateMachine = /** @class */ (function () {\r\n    function StateMachine(options) {\r\n        this.options = options;\r\n        /**\r\n         * Total Events hook function\r\n         *\r\n         * @type {Map<string, Function[]>}\r\n         * @memberof StateMachineControl\r\n         */\r\n        this.onStateMap = new Map();\r\n        /**\r\n         * Total Events hook function `once`\r\n         *\r\n         * @type {Map<string, Function[]>}\r\n         * @memberof StateMachineControl\r\n         */\r\n        this.onceStateMap = new Map();\r\n        /**\r\n         * Transition is pending\r\n         *\r\n         * @memberof StateMachineControl\r\n         */\r\n        this.isPending = false;\r\n        /**\r\n         * TransitionFunction would be run after transition success, can accept async function\r\n         *\r\n         * @private\r\n         * @type {TransitionFunction}\r\n         * @memberof StateMachineControl\r\n         */\r\n        this._onTransition = {\r\n            '*': function () { }\r\n        };\r\n        this.transitionCore = new transition_core_1.TransitionCore(options.transitions, options.initState);\r\n        this._onTransition = this.options.onTransition || this._onTransition;\r\n        this.step = this.step.bind(this);\r\n        this.on = this.on.bind(this);\r\n        this.execTransition = this.execTransition.bind(this);\r\n        this.runHookFunction = this.runHookFunction.bind(this);\r\n    }\r\n    /**\r\n     * Setting on state hook function\r\n     *\r\n     * @param {string} state\r\n     * @param {(arg?: any) => void} fn\r\n     * @returns\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.on = function (state, fn) {\r\n        if (!~this.transitionCore.getStates().indexOf(state))\r\n            return false;\r\n        if (this.onStateMap.has(state)) {\r\n            this.onStateMap.get(state).push(fn);\r\n        }\r\n        else {\r\n            this.onStateMap.set(state, [fn]);\r\n        }\r\n        return true;\r\n    };\r\n    /**\r\n     * Setting on state hook function `once`\r\n     *\r\n     * @param {string} state\r\n     * @param {(arg?: any) => void} fn\r\n     * @returns\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.once = function (state, fn) {\r\n        if (!~this.transitionCore.getStates().indexOf(state))\r\n            return false;\r\n        if (this.onceStateMap.has(state)) {\r\n            this.onceStateMap.get(state).push(fn);\r\n        }\r\n        else {\r\n            this.onceStateMap.set(state, [fn]);\r\n        }\r\n        return true;\r\n    };\r\n    /**\r\n     * Clear the hook function\r\n     *\r\n     * @param {string} state\r\n     * @param {Function} fn\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.off = function (state, fn) {\r\n        var fns = this.onStateMap.get(state);\r\n        var onceFn = this.onceStateMap.get(state);\r\n        if (fns && !!~fns.indexOf(fn)) {\r\n            fns.splice(fns.indexOf(fn), 1);\r\n        }\r\n        if (onceFn && !!~onceFn.indexOf(fn)) {\r\n            onceFn.splice(onceFn.indexOf(fn), 1);\r\n        }\r\n    };\r\n    /**\r\n     * Clear the state all hook function\r\n     *\r\n     * @param {string} [state]\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.removeAllListener = function (state) {\r\n        if (state) {\r\n            this.onStateMap.delete(state);\r\n            this.onceStateMap.delete(state);\r\n        }\r\n        else {\r\n            this.onStateMap.clear();\r\n            this.onceStateMap.clear();\r\n        }\r\n    };\r\n    /**\r\n     * Get current or specific state functions\r\n     *\r\n     * @param state\r\n     * @returns\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.getMethods = function (state) {\r\n        return this.transitionCore.getMethods(state);\r\n    };\r\n    /**\r\n     * Get all states\r\n     *\r\n     * @returns\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.getStateList = function () {\r\n        return this.transitionCore.getStates();\r\n    };\r\n    /**\r\n     * Get current state\r\n     *\r\n     * @returns\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.getState = function () {\r\n        return this.transitionCore.state;\r\n    };\r\n    /**\r\n     * Trigger transition\r\n     *\r\n     * @param {string} action\r\n     * @param {*} args\r\n     * @returns\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.step = function (action) {\r\n        var _this = this;\r\n        var args = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            args[_i - 1] = arguments[_i];\r\n        }\r\n        var _a;\r\n        if (this.isPending === true) {\r\n            console.warn('Transition still working');\r\n            return false;\r\n        }\r\n        var result;\r\n        try {\r\n            this.isPending = true;\r\n            result = (_a = this.transitionCore).stepTo.apply(_a, [action].concat(args));\r\n            if (!result)\r\n                return false;\r\n        }\r\n        catch (error) {\r\n            this.isPending = false;\r\n            throw error;\r\n        }\r\n        if (result instanceof Promise) {\r\n            // if guardian is Promise\r\n            return result\r\n                .then(this.execTransition)\r\n                .then(function () { return (_this.runHookFunction(), _this.transitionCore.currentTransitionEvent); })\r\n                .catch(function (err) {\r\n                throw err;\r\n            })\r\n                .finally(function () {\r\n                _this.isPending = false;\r\n            });\r\n        }\r\n        else {\r\n            // if guardian not Promise\r\n            var afterTransition = void 0;\r\n            try {\r\n                afterTransition = this.execTransition();\r\n            }\r\n            catch (error) {\r\n                this.isPending = false;\r\n                throw error;\r\n            }\r\n            if (afterTransition instanceof Promise) {\r\n                return afterTransition\r\n                    .then(function () { return (_this.runHookFunction(), _this.transitionCore.currentTransitionEvent); })\r\n                    .catch(function (err) {\r\n                    throw err;\r\n                })\r\n                    .finally(function () {\r\n                    _this.isPending = false;\r\n                });\r\n            }\r\n            else {\r\n                this.runHookFunction();\r\n                this.isPending = false;\r\n                return this.transitionCore.currentTransitionEvent;\r\n            }\r\n        }\r\n    };\r\n    StateMachine.prototype.execTransition = function () {\r\n        var transitionData = this.transitionCore.currentTransitionEvent;\r\n        if (typeof this._onTransition === 'function') {\r\n            this._onTransition(transitionData);\r\n            return true;\r\n        }\r\n        else {\r\n            var all_1 = this._onTransition['*'] && this._onTransition['*'](transitionData);\r\n            var current_1 = this._onTransition[transitionData.on] && this._onTransition[transitionData.on](transitionData);\r\n            if (util_1.fnsHasPromise(all_1, current_1)) {\r\n                return Promise.resolve()\r\n                    .then(function () { return all_1; })\r\n                    .then(function () { return current_1; })\r\n                    .then(function () { return true; });\r\n            }\r\n            else {\r\n                return true;\r\n            }\r\n        }\r\n    };\r\n    StateMachine.prototype.runHookFunction = function () {\r\n        var transitionData = this.transitionCore.currentTransitionEvent;\r\n        var on = transitionData.on, arg = transitionData.arg;\r\n        var fn = this.onStateMap.get(on);\r\n        var onceFn = this.onceStateMap.get(on);\r\n        if (fn) {\r\n            fn.forEach(function (f) { return f.apply(void 0, arg); });\r\n        }\r\n        if (onceFn) {\r\n            while (onceFn.length) {\r\n                onceFn.shift().apply(void 0, arg);\r\n            }\r\n        }\r\n    };\r\n    /**\r\n     * Check can do the action\r\n     *\r\n     * @param {string} action\r\n     * @returns\r\n     * @memberof StateMachineControl\r\n     */\r\n    StateMachine.prototype.can = function (action) {\r\n        return !!~this.transitionCore.getMethods().indexOf(action);\r\n    };\r\n    /**\r\n     * Check can transition to the state\r\n     *\r\n     * @param state Next state you want to transition to\r\n     */\r\n    StateMachine.prototype.canTransitionTo = function (state) {\r\n        return this.transitionCore.canTransitionTo(state);\r\n    };\r\n    return StateMachine;\r\n}());\r\nexports.StateMachine = StateMachine;\r\nexports.default = StateMachine;\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/transition-core.ts":
/*!********************************!*\
  !*** ./src/transition-core.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar TransitionCore = /** @class */ (function () {\r\n    function TransitionCore(transitionGroups, initState) {\r\n        var _this = this;\r\n        this.transitionGroups = transitionGroups;\r\n        this.initState = initState;\r\n        this.transitionMap = new Map();\r\n        this.stateList = new Set();\r\n        this.transitionMethods = new Map();\r\n        this._state = null;\r\n        this._transitionEvent = null;\r\n        this._state = initState;\r\n        this.transitionGroups.forEach(function (e) {\r\n            var key = e.from + \"/\" + e.action;\r\n            if (_this.transitionMap.has(key))\r\n                throw new Error(\"From \" + e.from + \" to \" + (typeof e.to === 'function' ? e.to() : e.to) + \" with \" + e.action + \" has repeated declarative\");\r\n            _this.transitionMap.set(e.from + \"/\" + e.action, Object.freeze(e));\r\n            !_this.stateList.has(e.from) &&\r\n                e.from !== '*' &&\r\n                _this.stateList.add(e.from);\r\n            _this.transitionMethods.has(e.from)\r\n                ? _this.transitionMethods.get(e.from).push(e.action)\r\n                : _this.transitionMethods.set(e.from, [e.action]);\r\n            typeof e.to === 'string' &&\r\n                !_this.stateList.has(e.to) &&\r\n                _this.stateList.add(e.to);\r\n        });\r\n        this.stepTo = this.stepTo.bind(this);\r\n        this.getMethods = this.getMethods.bind(this);\r\n        this.getStates = this.getStates.bind(this);\r\n        this.stateOnTransition = this.stateOnTransition.bind(this);\r\n    }\r\n    TransitionCore.prototype.stepTo = function (action) {\r\n        var _this = this;\r\n        var arg = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            arg[_i - 1] = arguments[_i];\r\n        }\r\n        var prevState = this._state;\r\n        var key = this._state + \"/\" + action;\r\n        if (this.transitionMap.has(\"*/\" + action)) {\r\n            key = \"*/\" + action;\r\n        }\r\n        else if (!this.transitionMap.has(key)) {\r\n            console.warn(\"Cannot transition with \" + action);\r\n            return false;\r\n        }\r\n        var group = Object.assign({}, this.transitionMap.get(key));\r\n        var guardian = group.guardian ? group.guardian.apply(group, arg) : true;\r\n        if (guardian instanceof Promise) {\r\n            return Promise.resolve()\r\n                .then(function () { return guardian; })\r\n                .then(function (res) {\r\n                group.from = prevState;\r\n                return res;\r\n            })\r\n                .then(function (res) {\r\n                if (res) {\r\n                    return _this.stateOnTransition.apply(_this, [group].concat(arg));\r\n                }\r\n                else\r\n                    return false;\r\n            });\r\n        }\r\n        else if (guardian) {\r\n            group.from = prevState;\r\n            return this.stateOnTransition.apply(this, [group].concat(arg));\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    };\r\n    TransitionCore.prototype.getMethods = function (state) {\r\n        if (state === void 0) { state = this._state; }\r\n        return this.transitionMethods.get(state);\r\n    };\r\n    TransitionCore.prototype.getStates = function () {\r\n        var list = [];\r\n        this.stateList.forEach(function (e) { return list.push(e); });\r\n        return list;\r\n    };\r\n    Object.defineProperty(TransitionCore.prototype, \"state\", {\r\n        get: function () {\r\n            return this._state;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(TransitionCore.prototype, \"currentTransitionEvent\", {\r\n        get: function () {\r\n            return this._transitionEvent;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    TransitionCore.prototype.canTransitionTo = function (state) {\r\n        var _this = this;\r\n        return this.getMethods().some(function (_m) {\r\n            return _this.transitionMap.get(_this._state + \"/\" + _m).to === state;\r\n        });\r\n    };\r\n    TransitionCore.prototype.stateOnTransition = function (e) {\r\n        var arg = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            arg[_i - 1] = arguments[_i];\r\n        }\r\n        var to = typeof e.to === 'function' ? e.to.apply(e, arg) : e.to;\r\n        if (this.stateList.has(to)) {\r\n            this._state = to;\r\n            this._transitionEvent = {\r\n                before: e.from,\r\n                on: this._state,\r\n                action: e.action,\r\n                arg: arg\r\n            };\r\n            return true;\r\n        }\r\n        else {\r\n            this._transitionEvent = null;\r\n            return false;\r\n        }\r\n    };\r\n    return TransitionCore;\r\n}());\r\nexports.TransitionCore = TransitionCore;\r\n\n\n//# sourceURL=webpack:///./src/transition-core.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nfunction fnsHasPromise() {\r\n    var _type = [];\r\n    for (var _i = 0; _i < arguments.length; _i++) {\r\n        _type[_i] = arguments[_i];\r\n    }\r\n    return _type.some(function (t) { return t instanceof Promise; });\r\n}\r\nexports.fnsHasPromise = fnsHasPromise;\r\n\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });
});