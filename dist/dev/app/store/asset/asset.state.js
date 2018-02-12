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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hc3NldC9hc3NldC5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQWdEO0FBSWhELDRFQUFpRTtBQU9oRSxDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQVU7SUFDakMsZUFBZSxFQUFFLElBQUk7SUFDckIsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO0lBQ3JDLE9BQU8sRUFBRSxLQUFLO0lBQ2QsV0FBVyxFQUFFLElBQUk7Q0FDbEIsQ0FBQztBQUVGLGlCQUF3QixLQUEyQixFQUFFLE1BQXdCO0lBQXJELHNCQUFBLEVBQUEsUUFBZSxvQkFBWTtJQUNqRCxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFDMUMsS0FBSyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQzFDLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7UUFDdEMsS0FBSyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNyQyxLQUFLLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFDMUMsS0FBSyxZQUFZLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakQsTUFBTSxjQUFNLHlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxTQUFTLElBQUc7UUFDaEgsQ0FBQztRQUVELEtBQUssWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QyxNQUFNLGNBQU0seUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLFNBQVMsSUFBRztRQUN0RixDQUFDO1FBRUQsS0FBSyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25DLE1BQU0sY0FBTSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQUc7UUFDeEcsQ0FBQztRQUVELEtBQUssWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxNQUFNLGNBQU0seUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUUsT0FBTyxFQUFFLEtBQUssSUFBRztRQUNwRCxDQUFDO1FBRUQsU0FBUyxDQUFDO1lBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQTNCRCwwQkEyQkMiLCJmaWxlIjoiYXBwL3N0b3JlL2Fzc2V0L2Fzc2V0LnN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQXNzZXRBY3Rpb25zIGZyb20gJy4vYXNzZXQuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBDb21tb25JIGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0ICogYXMgQ29tbWVyY2UgZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFzc2V0VHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICByZWFkb25seSBhY3RpdmVBc3NldFR5cGU6IEFzc2V0VHlwZTtcbiAgcmVhZG9ubHkgYWN0aXZlQXNzZXQ6IENvbW1vbkkuQXNzZXQgfCBDb21tZXJjZS5Bc3NldDtcbiAgcmVhZG9ubHkgbG9hZGluZzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgbG9hZGluZ1V1aWQ6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICBhY3RpdmVBc3NldFR5cGU6IG51bGwsXG4gIGFjdGl2ZUFzc2V0OiB7IGFzc2V0SWQ6IDAsIG5hbWU6ICcnIH0sXG4gIGxvYWRpbmc6IGZhbHNlLFxuICBsb2FkaW5nVXVpZDogbnVsbFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFzc2V0QWN0aW9ucy5BbnkpOiBTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFzc2V0QWN0aW9ucy5Mb2FkUXVvdGVTaG93QXNzZXQuVHlwZTpcbiAgICBjYXNlIEFzc2V0QWN0aW9ucy5Mb2FkUXVvdGVTaG93QXNzZXQuVHlwZTpcbiAgICBjYXNlIEFzc2V0QWN0aW9ucy5Mb2FkT3JkZXJBc3NldC5UeXBlOlxuICAgIGNhc2UgQXNzZXRBY3Rpb25zLkxvYWRDYXJ0QXNzZXQuVHlwZTpcbiAgICBjYXNlIEFzc2V0QWN0aW9ucy5Mb2FkUXVvdGVFZGl0QXNzZXQuVHlwZTpcbiAgICBjYXNlIEFzc2V0QWN0aW9ucy5Mb2FkQWN0aXZlQ29sbGVjdGlvbkFzc2V0LlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGxvYWRpbmc6IHRydWUsIGxvYWRpbmdVdWlkOiBhY3Rpb24udXVpZCwgYWN0aXZlQXNzZXRUeXBlOiBhY3Rpb24uYXNzZXRUeXBlIH07XG4gICAgfVxuXG4gICAgY2FzZSBBc3NldEFjdGlvbnMuTG9hZFNlYXJjaEFzc2V0LlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGxvYWRpbmc6IHRydWUsIGFjdGl2ZUFzc2V0VHlwZTogYWN0aW9uLmFzc2V0VHlwZSB9O1xuICAgIH1cblxuICAgIGNhc2UgQXNzZXRBY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGFjdGl2ZUFzc2V0OiBhY3Rpb24uYWN0aXZlQXNzZXQsIGxvYWRpbmc6IGZhbHNlLCBsb2FkaW5nVXVpZDogbnVsbCB9O1xuICAgIH1cblxuICAgIGNhc2UgQXNzZXRBY3Rpb25zLkxvYWRGYWlsdXJlLlR5cGU6IHtcbiAgICAgIHJldHVybiB7IC4uLkNvbW1vbi5jbG9uZShzdGF0ZSksIGxvYWRpbmc6IGZhbHNlIH07XG4gICAgfVxuXG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufVxuIl19
