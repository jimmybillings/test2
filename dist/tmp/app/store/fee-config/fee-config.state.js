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
var common_functions_1 = require("../../shared/utilities/common.functions");
var FeeConfigActions = require("./fee-config.actions");
exports.initialState = {
    initialized: null,
    feeConfig: { items: [] },
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case FeeConfigActions.LoadFeeConfig.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { initialized: false });
        }
        case FeeConfigActions.LoadFeeConfigSuccess.Type: {
            return {
                initialized: true,
                feeConfig: action.feeConfig ? action.feeConfig : { items: [] }
            };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=fee-config.state.js.map