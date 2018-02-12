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
var CheckoutActions = require("./checkout.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
exports.initialState = {
    purchaseOrderId: '',
    paymentOptions: null,
    selectedPaymentType: null,
    addresses: [],
    selectedAddress: {
        type: null,
        name: '',
        defaultAddress: null,
        addressEntityId: null,
        address: {
            address: '',
            state: '',
            city: '',
            country: '',
            zipcode: '',
            phone: ''
        }
    },
    authorization: {
        card: {
            brand: '',
            last4: '',
            exp_month: '',
            exp_year: ''
        }
    }
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case CheckoutActions.SetPurchaseOrderId.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { purchaseOrderId: action.purchaseOrderId });
        }
        case CheckoutActions.SetAvailablePaymentOptions.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { paymentOptions: action.paymentOptions });
        }
        case CheckoutActions.SetSelectedPaymentType.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { selectedPaymentType: action.selectedPaymentType });
        }
        case CheckoutActions.SetAvailableAddresses.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { addresses: action.addresses });
        }
        case CheckoutActions.SetSelectedAddress.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { selectedAddress: action.selectedAddress });
        }
        case CheckoutActions.SetCreditCardAuthorization.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { authorization: action.authorization });
        }
        case CheckoutActions.Reset.Type: {
            return __assign({}, exports.initialState);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=checkout.state.js.map