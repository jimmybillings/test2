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
var SearchActions = require("./search.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    loading: false,
    results: {
        items: [],
        pagination: {
            totalCount: 0,
            pageSize: 100,
            currentPage: 1,
            numberOfPages: 0,
            hasNextPage: false,
            hasPreviousPage: false
        }
    }
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case SearchActions.LoadResults.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { loading: true });
        }
        case SearchActions.LoadResultsSuccess.Type: {
            return {
                loading: false,
                results: {
                    items: action.results.items,
                    pagination: action.results.pagination
                },
            };
        }
        case SearchActions.Reset.Type: {
            return common_functions_1.Common.clone(exports.initialState);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=search.state.js.map