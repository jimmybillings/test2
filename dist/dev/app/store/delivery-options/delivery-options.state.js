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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1FQUFxRTtBQUNyRSxxREFBdUQ7QUFFdkQsNEVBQWlFO0FBUWhFLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBVTtJQUNqQyxPQUFPLEVBQUUsS0FBSztJQUNkLGtCQUFrQixFQUFFLEtBQUs7SUFDekIsa0JBQWtCLEVBQUUsS0FBSztJQUN6QixhQUFhLEVBQUUsSUFBSTtJQUNuQixPQUFPLEVBQUUsRUFBRTtDQUNaLENBQUM7QUFNRixpQkFBd0IsS0FBMkIsRUFBRSxNQUFzQjtJQUFuRCxzQkFBQSxFQUFBLFFBQWUsb0JBQVk7SUFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztRQUFDLEtBQUssR0FBRyxvQkFBWSxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssWUFBWSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQztRQUNqRCxLQUFLLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3JDLEtBQUssWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUMxQyxLQUFLLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFDMUMsS0FBSyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sY0FBTSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBWSxDQUFDLElBQUUsT0FBTyxFQUFFLElBQUksSUFBRztRQUMxRCxDQUFDO1FBRUQsS0FBSyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEMsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFZLENBQUMsSUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBRztRQUNyRyxDQUFDO1FBRUQsS0FBSyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0MsSUFBTSxrQkFBa0IsR0FBWSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDOUQsTUFBTSxjQUNELHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUN0QixPQUFPLEVBQUUsS0FBSyxFQUNkLGtCQUFrQixvQkFBQSxFQUNsQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFDdkIsa0JBQWtCLEVBQUUsS0FBSyxJQUN6QjtRQUNKLENBQUM7UUFFRCxLQUFLLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZELE1BQU0sY0FBTSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBRSxrQkFBa0IsRUFBRSxJQUFJLElBQUc7UUFDOUQsQ0FBQztRQUVELFNBQVMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFuQ0QsMEJBbUNDIiwiZmlsZSI6ImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuc3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBEZWxpdmVyeU9wdGlvbnNBY3Rpb25zIGZyb20gJy4vZGVsaXZlcnktb3B0aW9ucy5hY3Rpb25zJztcbmltcG9ydCAqIGFzIEFzc2V0QWN0aW9ucyBmcm9tICcuLi9hc3NldC9hc3NldC5hY3Rpb25zJztcbmltcG9ydCB7IERlbGl2ZXJ5T3B0aW9ucyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Fzc2V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgaGFzRGVsaXZlcnlPcHRpb25zOiBib29sZWFuO1xuICBhY3RpdmVBc3NldElkOiBudW1iZXI7XG4gIG9wdGlvbnM6IERlbGl2ZXJ5T3B0aW9ucztcbiAgc2hvd0xvYWRpbmdNZXNzYWdlOiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gIGxvYWRpbmc6IGZhbHNlLFxuICBzaG93TG9hZGluZ01lc3NhZ2U6IGZhbHNlLFxuICBoYXNEZWxpdmVyeU9wdGlvbnM6IGZhbHNlLFxuICBhY3RpdmVBc3NldElkOiBudWxsLFxuICBvcHRpb25zOiBbXVxufTtcblxuZXhwb3J0IHR5cGUgQWxsb3dlZEFjdGlvbnMgPSBBc3NldEFjdGlvbnMuTG9hZEFjdGl2ZUNvbGxlY3Rpb25Bc3NldCB8IEFzc2V0QWN0aW9ucy5Mb2FkQ2FydEFzc2V0IHxcbiAgQXNzZXRBY3Rpb25zLkxvYWRRdW90ZUVkaXRBc3NldCB8IEFzc2V0QWN0aW9ucy5Mb2FkUXVvdGVTaG93QXNzZXQgfCBBc3NldEFjdGlvbnMuTG9hZFNlYXJjaEFzc2V0IHxcbiAgRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5Bbnk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBbGxvd2VkQWN0aW9ucyk6IFN0YXRlIHtcbiAgaWYgKHN0YXRlID09PSBudWxsKSBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBc3NldEFjdGlvbnMuTG9hZEFjdGl2ZUNvbGxlY3Rpb25Bc3NldC5UeXBlOlxuICAgIGNhc2UgQXNzZXRBY3Rpb25zLkxvYWRDYXJ0QXNzZXQuVHlwZTpcbiAgICBjYXNlIEFzc2V0QWN0aW9ucy5Mb2FkUXVvdGVFZGl0QXNzZXQuVHlwZTpcbiAgICBjYXNlIEFzc2V0QWN0aW9ucy5Mb2FkUXVvdGVTaG93QXNzZXQuVHlwZTpcbiAgICBjYXNlIEFzc2V0QWN0aW9ucy5Mb2FkU2VhcmNoQXNzZXQuVHlwZToge1xuICAgICAgcmV0dXJuIHsgLi4uQ29tbW9uLmNsb25lKGluaXRpYWxTdGF0ZSksIGxvYWRpbmc6IHRydWUgfTtcbiAgICB9XG5cbiAgICBjYXNlIERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuTG9hZC5UeXBlOiB7XG4gICAgICByZXR1cm4geyAuLi5Db21tb24uY2xvbmUoaW5pdGlhbFN0YXRlKSwgbG9hZGluZzogdHJ1ZSwgYWN0aXZlQXNzZXRJZDogYWN0aW9uLmFjdGl2ZUFzc2V0LmFzc2V0SWQgfTtcbiAgICB9XG5cbiAgICBjYXNlIERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZToge1xuICAgICAgY29uc3QgaGFzRGVsaXZlcnlPcHRpb25zOiBib29sZWFuID0gYWN0aW9uLm9wdGlvbnMubGVuZ3RoID4gMDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICBoYXNEZWxpdmVyeU9wdGlvbnMsXG4gICAgICAgIG9wdGlvbnM6IGFjdGlvbi5vcHRpb25zLFxuICAgICAgICBzaG93TG9hZGluZ01lc3NhZ2U6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5TZXRMb2FkaW5nTWVzc2FnZUZsYWcuVHlwZToge1xuICAgICAgcmV0dXJuIHsgLi4uQ29tbW9uLmNsb25lKHN0YXRlKSwgc2hvd0xvYWRpbmdNZXNzYWdlOiB0cnVlIH07XG4gICAgfVxuXG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufVxuIl19
