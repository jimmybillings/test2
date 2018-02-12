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
var OrderActions = require("./order.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
;
exports.initialState = {
    activeOrder: {
        id: 0,
        paymentTerms: '',
        paymentType: null,
        poNumber: '',
        discount: 0,
        bulkOrderId: '',
        createdUserId: 0,
        ownerUserId: 0,
        orderStatus: null,
        orderType: null,
        quoteId: 0,
        taxAmount: 0,
        licenseAgreementId: '',
        refundAmount: 0,
        salesVertical: '',
        oldCommerceId: 0,
        salesForceId: '',
        createdByIntegration: false,
        salesForceSyncedError: false,
        paymentBalance: 0,
        creditMemoForOrderId: 0,
        projects: []
    },
    loading: false,
    checkingOut: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case OrderActions.Load.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case OrderActions.LoadSuccess.Type: {
            return { activeOrder: action.activeOrder, loading: false, checkingOut: state.checkingOut };
        }
        case OrderActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        case OrderActions.SetCheckoutState.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { checkingOut: action.checkingOut });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=order.state.js.map