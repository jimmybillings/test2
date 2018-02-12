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
var PricingActions = require("./pricing.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    priceForDetails: null,
    priceForDialog: null,
    attributes: null,
    appliedAttributes: null,
    selectedAttributes: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case PricingActions.ResetPricing.Type: {
            return common_functions_1.Common.clone(exports.initialState);
        }
        case PricingActions.CalculatePrice.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { selectedAttributes: action.selectedAttributes });
        }
        case PricingActions.SetAppliedAttributes.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { appliedAttributes: action.appliedAttributes });
        }
        case PricingActions.GetAttributesSuccess.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { attributes: action.attributes });
        }
        case PricingActions.SetPriceForDetails.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { priceForDetails: action.price });
        }
        case PricingActions.SetPriceForDialog.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { priceForDialog: action.price });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=pricing.state.js.map