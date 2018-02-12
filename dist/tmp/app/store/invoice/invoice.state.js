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
var InvoiceActions = require("./invoice.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
;
exports.initialState = {
    loading: false,
    invoice: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case InvoiceActions.Load.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case InvoiceActions.LoadSuccess.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { invoice: action.invoice, loading: false });
        }
        case InvoiceActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=invoice.state.js.map