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
var ActiveCollectionActions = require("./active-collection.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
;
exports.initialState = {
    loading: false,
    collection: {
        createdOn: null,
        lastUpdated: null,
        id: null,
        siteName: '',
        name: '',
        owner: 0,
        email: '',
        userRole: '',
        editors: [],
        viewers: [],
        collectionThumbnail: {},
        assets: {
            items: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 100,
                hasNextPage: false,
                hasPreviousPage: false,
                numberOfPages: 0
            },
        },
        tags: [],
        assetsCount: 0
    }
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (state === null)
        state = exports.initialState;
    switch (action.type) {
        case ActiveCollectionActions.Load.Type:
        case ActiveCollectionActions.Set.Type:
        case ActiveCollectionActions.LoadPage.Type:
        case ActiveCollectionActions.AddAsset.Type:
        case ActiveCollectionActions.RemoveAsset.Type:
        case ActiveCollectionActions.AddPageOfSearchAssets.Type:
        case ActiveCollectionActions.UpdateAssetMarkers.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: true });
        }
        case ActiveCollectionActions.LoadSuccess.Type:
        case ActiveCollectionActions.SetSuccess.Type: {
            return __assign({}, common_functions_1.Common.clone(exports.initialState), { collection: action.activeCollection, loading: false });
        }
        case ActiveCollectionActions.LoadPageSuccess.Type:
        case ActiveCollectionActions.UpdateAssetMarkersSuccess.Type: {
            var stateClone = common_functions_1.Common.clone(state);
            return __assign({}, stateClone, { collection: __assign({}, stateClone.collection, { assets: action.currentPageItems }), loading: false });
        }
        case ActiveCollectionActions.AddAssetSuccess.Type: {
            var stateClone = common_functions_1.Common.clone(state);
            return __assign({}, stateClone, { collection: __assign({}, stateClone.collection, { assets: action.currentPageItems, assetsCount: stateClone.collection.assetsCount + 1 }), loading: false });
        }
        case ActiveCollectionActions.RemoveAssetSuccess.Type: {
            var stateClone = common_functions_1.Common.clone(state);
            return __assign({}, stateClone, { collection: __assign({}, stateClone.collection, { assets: action.currentPageItems, assetsCount: stateClone.collection.assetsCount - 1 }), loading: false });
        }
        case ActiveCollectionActions.LoadFailure.Type:
        case ActiveCollectionActions.SetFailure.Type:
        case ActiveCollectionActions.LoadPageFailure.Type:
        case ActiveCollectionActions.AddAssetFailure.Type:
        case ActiveCollectionActions.RemoveAssetFailure.Type:
        case ActiveCollectionActions.UpdateAssetMarkersFailure.Type: {
            return __assign({}, common_functions_1.Common.clone(state), { loading: false });
        }
        case ActiveCollectionActions.AddPageOfSearchAssetsSuccess.Type: {
            var clonedState = common_functions_1.Common.clone(state);
            return __assign({}, clonedState, { collection: __assign({}, clonedState.collection, { assets: action.currentPageItems, assetsCount: clonedState.collection.assetsCount + action.currentPageItems.items.length }), loading: false });
        }
        case ActiveCollectionActions.Reset.Type: {
            return common_functions_1.Common.clone(exports.initialState);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=active-collection.state.js.map