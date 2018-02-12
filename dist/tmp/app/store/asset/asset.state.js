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
var AssetActions = require("./asset.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
;
exports.initialState = {
    activeAssetType: null,
    activeAsset: { assetId: 0, name: '' },
    loading: false,
    loadingUuid: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case AssetActions.LoadQuoteShowAsset.Type:
        case AssetActions.LoadQuoteShowAsset.Type:
        case AssetActions.LoadOrderAsset.Type:
        case AssetActions.LoadCartAsset.Type:
        case AssetActions.LoadQuoteEditAsset.Type:
        case AssetActions.LoadActiveCollectionAsset.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true, loadingUuid: action.uuid, activeAssetType: action.assetType });
        }
        case AssetActions.LoadSearchAsset.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true, activeAssetType: action.assetType });
        }
        case AssetActions.LoadSuccess.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { activeAsset: action.activeAsset, loading: false, loadingUuid: null });
        }
        case AssetActions.LoadFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=asset.state.js.map