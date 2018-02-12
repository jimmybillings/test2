"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var UiConfigActions = require("./ui-config.actions");
;
exports.initialState = { loaded: false, components: null };
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case UiConfigActions.LoadSuccess.Type: {
            return __assign({}, state, action.config, { loaded: true });
        }
        case UiConfigActions.InitializeSuccess.Type: {
            return __assign({}, state, action.config);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=ui-config.state.js.map