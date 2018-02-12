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
            return __assign({}, clonedState, { collection: __assign({}, clonedState.collection, { assets: {
                        items: action.currentPageItems.items,
                        pagination: action.currentPageItems.pagination
                    }, assetsCount: clonedState.collection.assetsCount + action.currentPageItems.totalAssetsAdded }), loading: false });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUVBQXVFO0FBTXZFLDRFQUFpRTtBQUtoRSxDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQVU7SUFDakMsT0FBTyxFQUFFLEtBQUs7SUFDZCxVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsSUFBSTtRQUNmLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLEVBQUUsRUFBRSxJQUFJO1FBQ1IsUUFBUSxFQUFFLEVBQUU7UUFDWixJQUFJLEVBQUUsRUFBRTtRQUNSLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxRQUFRLEVBQUUsRUFBRTtRQUNaLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxtQkFBbUIsRUFBRSxFQUErQztRQUNwRSxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsRUFBRTtZQUNULFVBQVUsRUFBRTtnQkFDVixVQUFVLEVBQUUsQ0FBQztnQkFDYixXQUFXLEVBQUUsQ0FBQztnQkFDZCxRQUFRLEVBQUUsR0FBRztnQkFDYixXQUFXLEVBQUUsS0FBSztnQkFDbEIsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLGFBQWEsRUFBRSxDQUFDO2FBQ2pCO1NBQ0Y7UUFDRCxJQUFJLEVBQUUsRUFBRTtRQUNSLFdBQVcsRUFBRSxDQUFDO0tBQ2Y7Q0FDRixDQUFDO0FBRUYsaUJBQXdCLEtBQTJCLEVBQUUsTUFBbUM7SUFBaEUsc0JBQUEsRUFBQSxRQUFlLG9CQUFZO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQyxLQUFLLEdBQUcsb0JBQVksQ0FBQztJQUV6QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkMs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QyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFL0MsTUFBTSxjQUNELFdBQVcsSUFDZCxVQUFVLGVBQ0wsV0FBVyxDQUFDLFVBQVUsSUFDekIsTUFBTSxFQUFFO3dCQUNOLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSzt3QkFDcEMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVO3FCQUMvQyxFQUNELFdBQVcsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEtBRTVGLE9BQU8sRUFBRSxLQUFLLElBQ2Q7UUFDSixDQUFDO1FBRUQsS0FBSyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEMsTUFBTSxDQUFDLHlCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFZLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBRUQsU0FBUyxDQUFDO1lBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQXpHRCwwQkF5R0MiLCJmaWxlIjoiYXBwL3N0b3JlL2FjdGl2ZS1jb2xsZWN0aW9uL2FjdGl2ZS1jb2xsZWN0aW9uLnN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMgZnJvbSAnLi9hY3RpdmUtY29sbGVjdGlvbi5hY3Rpb25zJztcbmltcG9ydCB7XG4gIENvbGxlY3Rpb24sIENvbGxlY3Rpb25JdGVtcywgQ29sbGVjdGlvbkl0ZW1zUmVzcG9uc2UsIENvbGxlY3Rpb25JdGVtTWFya2Vyc1VwZGF0ZXJcbn0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNzZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlcmlhbGl6ZWRTdWJjbGlwTWFya2Vycywgc2VyaWFsaXplIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICByZWFkb25seSBsb2FkaW5nOiBib29sZWFuO1xuICByZWFkb25seSBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gIGxvYWRpbmc6IGZhbHNlLFxuICBjb2xsZWN0aW9uOiB7XG4gICAgY3JlYXRlZE9uOiBudWxsLFxuICAgIGxhc3RVcGRhdGVkOiBudWxsLFxuICAgIGlkOiBudWxsLFxuICAgIHNpdGVOYW1lOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBvd25lcjogMCxcbiAgICBlbWFpbDogJycsXG4gICAgdXNlclJvbGU6ICcnLFxuICAgIGVkaXRvcnM6IFtdLFxuICAgIHZpZXdlcnM6IFtdLFxuICAgIGNvbGxlY3Rpb25UaHVtYm5haWw6IHt9IGFzIHsgbmFtZTogc3RyaW5nLCB1cmxzOiB7IGh0dHBzOiBzdHJpbmcgfSB9LFxuICAgIGFzc2V0czoge1xuICAgICAgaXRlbXM6IFtdLFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICB0b3RhbENvdW50OiAwLFxuICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgcGFnZVNpemU6IDEwMCxcbiAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICBudW1iZXJPZlBhZ2VzOiAwXG4gICAgICB9LFxuICAgIH0sXG4gICAgdGFnczogW10sXG4gICAgYXNzZXRzQ291bnQ6IDBcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkFueSk6IFN0YXRlIHtcbiAgaWYgKHN0YXRlID09PSBudWxsKSBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkLlR5cGU6XG4gICAgY2FzZSBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5TZXQuVHlwZTpcbiAgICBjYXNlIEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkxvYWRQYWdlLlR5cGU6XG4gICAgY2FzZSBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5BZGRBc3NldC5UeXBlOlxuICAgIGNhc2UgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuUmVtb3ZlQXNzZXQuVHlwZTpcbiAgICBjYXNlIEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkFkZFBhZ2VPZlNlYXJjaEFzc2V0cy5UeXBlOlxuICAgIGNhc2UgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuVXBkYXRlQXNzZXRNYXJrZXJzLlR5cGU6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksXG4gICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlOlxuICAgIGNhc2UgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuU2V0U3VjY2Vzcy5UeXBlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5Db21tb24uY2xvbmUoaW5pdGlhbFN0YXRlKSxcbiAgICAgICAgY29sbGVjdGlvbjogYWN0aW9uLmFjdGl2ZUNvbGxlY3Rpb24sXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuTG9hZFBhZ2VTdWNjZXNzLlR5cGU6XG4gICAgY2FzZSBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5VcGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzLlR5cGU6IHtcbiAgICAgIGNvbnN0IHN0YXRlQ2xvbmU6IFN0YXRlID0gQ29tbW9uLmNsb25lKHN0YXRlKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGVDbG9uZSxcbiAgICAgICAgY29sbGVjdGlvbjoge1xuICAgICAgICAgIC4uLnN0YXRlQ2xvbmUuY29sbGVjdGlvbixcbiAgICAgICAgICBhc3NldHM6IGFjdGlvbi5jdXJyZW50UGFnZUl0ZW1zXG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkQXNzZXRTdWNjZXNzLlR5cGU6IHtcbiAgICAgIGNvbnN0IHN0YXRlQ2xvbmU6IFN0YXRlID0gQ29tbW9uLmNsb25lKHN0YXRlKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGVDbG9uZSxcbiAgICAgICAgY29sbGVjdGlvbjoge1xuICAgICAgICAgIC4uLnN0YXRlQ2xvbmUuY29sbGVjdGlvbixcbiAgICAgICAgICBhc3NldHM6IGFjdGlvbi5jdXJyZW50UGFnZUl0ZW1zLFxuICAgICAgICAgIGFzc2V0c0NvdW50OiBzdGF0ZUNsb25lLmNvbGxlY3Rpb24uYXNzZXRzQ291bnQgKyAxXG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuUmVtb3ZlQXNzZXRTdWNjZXNzLlR5cGU6IHtcbiAgICAgIGNvbnN0IHN0YXRlQ2xvbmU6IFN0YXRlID0gQ29tbW9uLmNsb25lKHN0YXRlKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGVDbG9uZSxcbiAgICAgICAgY29sbGVjdGlvbjoge1xuICAgICAgICAgIC4uLnN0YXRlQ2xvbmUuY29sbGVjdGlvbixcbiAgICAgICAgICBhc3NldHM6IGFjdGlvbi5jdXJyZW50UGFnZUl0ZW1zLFxuICAgICAgICAgIGFzc2V0c0NvdW50OiBzdGF0ZUNsb25lLmNvbGxlY3Rpb24uYXNzZXRzQ291bnQgLSAxXG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuTG9hZEZhaWx1cmUuVHlwZTpcbiAgICBjYXNlIEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlNldEZhaWx1cmUuVHlwZTpcbiAgICBjYXNlIEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkxvYWRQYWdlRmFpbHVyZS5UeXBlOlxuICAgIGNhc2UgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkQXNzZXRGYWlsdXJlLlR5cGU6XG4gICAgY2FzZSBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5SZW1vdmVBc3NldEZhaWx1cmUuVHlwZTpcbiAgICBjYXNlIEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlVwZGF0ZUFzc2V0TWFya2Vyc0ZhaWx1cmUuVHlwZToge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uQ29tbW9uLmNsb25lKHN0YXRlKSxcbiAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5BZGRQYWdlT2ZTZWFyY2hBc3NldHNTdWNjZXNzLlR5cGU6IHtcbiAgICAgIGNvbnN0IGNsb25lZFN0YXRlOiBTdGF0ZSA9IENvbW1vbi5jbG9uZShzdGF0ZSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNsb25lZFN0YXRlLFxuICAgICAgICBjb2xsZWN0aW9uOiB7XG4gICAgICAgICAgLi4uY2xvbmVkU3RhdGUuY29sbGVjdGlvbixcbiAgICAgICAgICBhc3NldHM6IHtcbiAgICAgICAgICAgIGl0ZW1zOiBhY3Rpb24uY3VycmVudFBhZ2VJdGVtcy5pdGVtcyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IGFjdGlvbi5jdXJyZW50UGFnZUl0ZW1zLnBhZ2luYXRpb25cbiAgICAgICAgICB9LFxuICAgICAgICAgIGFzc2V0c0NvdW50OiBjbG9uZWRTdGF0ZS5jb2xsZWN0aW9uLmFzc2V0c0NvdW50ICsgYWN0aW9uLmN1cnJlbnRQYWdlSXRlbXMudG90YWxBc3NldHNBZGRlZFxuICAgICAgICB9LFxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjYXNlIEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlJlc2V0LlR5cGU6IHtcbiAgICAgIHJldHVybiBDb21tb24uY2xvbmUoaW5pdGlhbFN0YXRlKTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG4iXX0=
