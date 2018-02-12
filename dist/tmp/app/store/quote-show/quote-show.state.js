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
var QuoteShowActions = require("./quote-show.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    data: {
        id: 0,
        total: 0,
        createdUserId: 0,
        ownerUserId: 0,
        quoteStatus: 'PENDING'
    },
    loading: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case QuoteShowActions.Load.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case QuoteShowActions.LoadSuccess.Type: {
            return {
                loading: false,
                data: __assign({}, action.quote)
            };
        }
        case QuoteShowActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=quote-show.state.js.map