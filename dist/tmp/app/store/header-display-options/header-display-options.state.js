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
var HeaderDisplayOptionsActions = require("./header-display-options.actions");
exports.initialState = {
    canBeFixed: false,
    isFixed: false,
    filtersAreAvailable: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case HeaderDisplayOptionsActions.EnableFix.Type: {
            return __assign({}, state, { canBeFixed: true });
        }
        case HeaderDisplayOptionsActions.DisableFix.Type: {
            return __assign({}, state, { canBeFixed: false });
        }
        case HeaderDisplayOptionsActions.EnableFilters.Type: {
            return __assign({}, state, { filtersAreAvailable: true });
        }
        case HeaderDisplayOptionsActions.DisableFilters.Type: {
            return __assign({}, state, { filtersAreAvailable: false });
        }
        case HeaderDisplayOptionsActions.Fix.Type: {
            return __assign({}, state, { isFixed: true });
        }
        case HeaderDisplayOptionsActions.Unfix.Type: {
            return __assign({}, state, { isFixed: false });
        }
        case HeaderDisplayOptionsActions.Reset.Type: {
            return __assign({}, exports.initialState);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=header-display-options.state.js.map