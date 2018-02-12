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
var DeliveryOptionsActions = require("./delivery-options.actions");
var AssetActions = require("../asset/asset.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
;
exports.initialState = {
    loading: false,
    showLoadingMessage: false,
    hasDeliveryOptions: false,
    activeAssetId: null,
    options: []
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case AssetActions.LoadActiveCollectionAsset.Type:
        case AssetActions.LoadCartAsset.Type:
        case AssetActions.LoadQuoteEditAsset.Type:
        case AssetActions.LoadQuoteShowAsset.Type:
        case AssetActions.LoadSearchAsset.Type: {
            return __assign({}, common_functions_1.Common.clone(exports.initialState), { loading: true });
        }
        case DeliveryOptionsActions.Load.Type: {
            return __assign({}, common_functions_1.Common.clone(exports.initialState), { loading: true, activeAssetId: action.activeAsset.assetId });
        }
        case DeliveryOptionsActions.LoadSuccess.Type: {
            var hasDeliveryOptions = action.options.length > 0;
            return __assign({}, common_functions_1.Common.clone(state), { loading: false, hasDeliveryOptions: hasDeliveryOptions, options: action.options, showLoadingMessage: false });
        }
        case DeliveryOptionsActions.SetLoadingMessageFlag.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { showLoadingMessage: true });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=delivery-options.state.js.map