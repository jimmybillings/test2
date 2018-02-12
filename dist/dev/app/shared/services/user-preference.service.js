"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var api_service_1 = require("./api.service");
var api_interface_1 = require("../interfaces/api.interface");
var current_user_service_1 = require("./current-user.service");
var defaultPreferences = {
    displayFilterCounts: false,
    collectionTrayIsOpen: false,
    searchIsOpen: true,
    sortId: 0,
    displayFilterTree: false,
    assetView: 'grid',
    pricingPreferences: {}
};
function userPreferences(state, action) {
    if (state === void 0) { state = defaultPreferences; }
    switch (action.type) {
        case 'USER_PREFS.UPDATE_PREFERENCES':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.userPreferences = userPreferences;
;
var UserPreferenceService = (function () {
    function UserPreferenceService(currentUser, store, api) {
        this.currentUser = currentUser;
        this.store = store;
        this.api = api;
        this.data = this.store.select('userPreferences');
    }
    Object.defineProperty(UserPreferenceService.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (state) { return s = state; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    UserPreferenceService.prototype.getPrefs = function () {
        var _this = this;
        this.get().take(1).subscribe(function (response) {
            if (!response['prefs'])
                _this.updateStore();
            _this.set(response['prefs']);
        });
    };
    UserPreferenceService.prototype.toggleSearch = function () {
        this.update({ searchIsOpen: !this.state.searchIsOpen });
    };
    UserPreferenceService.prototype.closeSearch = function () {
        this.update({ searchIsOpen: false });
    };
    UserPreferenceService.prototype.toggleCollectionTray = function () {
        this.update({ collectionTrayIsOpen: !this.state.collectionTrayIsOpen });
    };
    UserPreferenceService.prototype.openCollectionTray = function () {
        this.update({ collectionTrayIsOpen: true });
    };
    UserPreferenceService.prototype.updateSortPreference = function (sortId) {
        this.update({ sortId: sortId });
    };
    UserPreferenceService.prototype.updateAssetViewPreference = function (view) {
        this.update({ assetView: view });
    };
    UserPreferenceService.prototype.toggleFilterCount = function () {
        this.update({ displayFilterCounts: !this.state.displayFilterCounts });
    };
    UserPreferenceService.prototype.toggleFilterTree = function () {
        this.update({ displayFilterTree: !this.state.displayFilterTree });
    };
    UserPreferenceService.prototype.updatePricingPreferences = function (attributes) {
        this.update({ pricingPreferences: attributes });
    };
    UserPreferenceService.prototype.set = function (preferences) {
        this.updateStore(this.formatResponse(preferences));
    };
    UserPreferenceService.prototype.reset = function () {
        this.updateStore();
    };
    UserPreferenceService.prototype.formatResponse = function (preferences) {
        for (var prefKey in preferences) {
            var newValue = this.stringToBool(preferences[prefKey]);
            preferences[prefKey] = JSON.parse(newValue);
        }
        return preferences;
    };
    UserPreferenceService.prototype.get = function () {
        return this.api.get(api_interface_1.Api.Identities, 'userPreferences');
    };
    UserPreferenceService.prototype.update = function (params) {
        this.updateStore(params);
        if (!this.currentUser.loggedIn())
            return;
        this.put(params).take(1).subscribe(function (_) { });
    };
    UserPreferenceService.prototype.put = function (params) {
        var body = this.formatBody(params);
        return this.api.put(api_interface_1.Api.Identities, 'userPreferences/item', { body: body });
    };
    UserPreferenceService.prototype.updateStore = function (data) {
        if (data === void 0) { data = defaultPreferences; }
        this.store.dispatch({ type: 'USER_PREFS.UPDATE_PREFERENCES', payload: data });
    };
    UserPreferenceService.prototype.formatBody = function (preferences) {
        for (var preference in preferences) {
            return {
                key: preference,
                value: JSON.stringify(preferences[preference])
            };
        }
        ;
    };
    UserPreferenceService.prototype.stringToBool = function (value) {
        switch (value) {
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                return value;
        }
        ;
    };
    UserPreferenceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService,
            store_1.Store,
            api_service_1.ApiService])
    ], UserPreferenceService);
    return UserPreferenceService;
}());
exports.UserPreferenceService = UserPreferenceService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvdXNlci1wcmVmZXJlbmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MscUNBQW9DO0FBRXBDLDZDQUEyQztBQUMzQyw2REFBa0Q7QUFDbEQsK0RBQTREO0FBSTVELElBQU0sa0JBQWtCLEdBQVE7SUFDOUIsbUJBQW1CLEVBQUUsS0FBSztJQUMxQixvQkFBb0IsRUFBRSxLQUFLO0lBQzNCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLE1BQU0sRUFBRSxDQUFDO0lBQ1QsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixTQUFTLEVBQUUsTUFBTTtJQUNqQixrQkFBa0IsRUFBRSxFQUFFO0NBQ3ZCLENBQUM7QUFFRix5QkFBZ0MsS0FBMEIsRUFBRSxNQUFvQjtJQUFoRCxzQkFBQSxFQUFBLDBCQUEwQjtJQUN4RCxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLCtCQUErQjtZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRDtZQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUM7QUFQRCwwQ0FPQztBQUFBLENBQUM7QUFHRjtJQUdFLCtCQUNTLFdBQStCLEVBQy9CLEtBQWlCLEVBQ2pCLEdBQWU7UUFGZixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsc0JBQVcsd0NBQUs7YUFBaEI7WUFDRSxJQUFJLENBQU0sQ0FBQztZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsR0FBRyxLQUFLLEVBQVQsQ0FBUyxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7OztPQUFBO0lBRU0sd0NBQVEsR0FBZjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxRQUFRO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDRDQUFZLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sMkNBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLG9EQUFvQixHQUEzQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTSxrREFBa0IsR0FBekI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU0sb0RBQW9CLEdBQTNCLFVBQTRCLE1BQWM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSx5REFBeUIsR0FBaEMsVUFBaUMsSUFBWTtRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLGlEQUFpQixHQUF4QjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxnREFBZ0IsR0FBdkI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU0sd0RBQXdCLEdBQS9CLFVBQWdDLFVBQWU7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLG1DQUFHLEdBQVYsVUFBVyxXQUFnQjtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0scUNBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU8sOENBQWMsR0FBdEIsVUFBdUIsV0FBZ0I7UUFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVELFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxtQ0FBRyxHQUFYO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLHNDQUFNLEdBQWQsVUFBZSxNQUFXO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBTSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU8sbUNBQUcsR0FBWCxVQUFZLE1BQVc7UUFDckIsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU8sMkNBQVcsR0FBbkIsVUFBb0IsSUFBOEI7UUFBOUIscUJBQUEsRUFBQSx5QkFBOEI7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsK0JBQStCLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVPLDBDQUFVLEdBQWxCLFVBQW1CLFdBQWdCO1FBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQUksVUFBVSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDO2dCQUNMLEdBQUcsRUFBRSxVQUFVO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMvQyxDQUFDO1FBQ0osQ0FBQztRQUFBLENBQUM7SUFDSixDQUFDO0lBRU8sNENBQVksR0FBcEIsVUFBcUIsS0FBYTtRQUNoQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxNQUFNO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxLQUFLLE9BQU87Z0JBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNmO2dCQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUFBLENBQUM7SUFDSixDQUFDO0lBaEhVLHFCQUFxQjtRQURqQyxpQkFBVSxFQUFFO3lDQUtXLHlDQUFrQjtZQUN4QixhQUFLO1lBQ1Asd0JBQVU7T0FOYixxQkFBcUIsQ0FpSGpDO0lBQUQsNEJBQUM7Q0FqSEQsQUFpSEMsSUFBQTtBQWpIWSxzREFBcUIiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXByZWZlcmVuY2Uuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBMZWdhY3lBY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVXNlclByZWZlcmVuY2VzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvdXNlci1wcmVmZXJlbmNlcy5pbnRlcmZhY2UnO1xuXG5jb25zdCBkZWZhdWx0UHJlZmVyZW5jZXM6IGFueSA9IHtcbiAgZGlzcGxheUZpbHRlckNvdW50czogZmFsc2UsXG4gIGNvbGxlY3Rpb25UcmF5SXNPcGVuOiBmYWxzZSxcbiAgc2VhcmNoSXNPcGVuOiB0cnVlLFxuICBzb3J0SWQ6IDAsXG4gIGRpc3BsYXlGaWx0ZXJUcmVlOiBmYWxzZSxcbiAgYXNzZXRWaWV3OiAnZ3JpZCcsXG4gIHByaWNpbmdQcmVmZXJlbmNlczoge31cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VyUHJlZmVyZW5jZXMoc3RhdGUgPSBkZWZhdWx0UHJlZmVyZW5jZXMsIGFjdGlvbjogTGVnYWN5QWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdVU0VSX1BSRUZTLlVQREFURV9QUkVGRVJFTkNFUyc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5wYXlsb2FkKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclByZWZlcmVuY2VTZXJ2aWNlIHtcbiAgcHVibGljIGRhdGE6IE9ic2VydmFibGU8VXNlclByZWZlcmVuY2VzPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyU2VydmljZSxcbiAgICBwdWJsaWMgc3RvcmU6IFN0b3JlPGFueT4sXG4gICAgcHVibGljIGFwaTogQXBpU2VydmljZSkge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuc3RvcmUuc2VsZWN0KCd1c2VyUHJlZmVyZW5jZXMnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3RhdGUoKTogVXNlclByZWZlcmVuY2VzIHtcbiAgICBsZXQgczogYW55O1xuICAgIHRoaXMuZGF0YS50YWtlKDEpLnN1YnNjcmliZShzdGF0ZSA9PiBzID0gc3RhdGUpO1xuICAgIHJldHVybiBzO1xuICB9XG5cbiAgcHVibGljIGdldFByZWZzKCk6IHZvaWQge1xuICAgIHRoaXMuZ2V0KCkudGFrZSgxKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKCFyZXNwb25zZVsncHJlZnMnXSkgdGhpcy51cGRhdGVTdG9yZSgpO1xuICAgICAgdGhpcy5zZXQocmVzcG9uc2VbJ3ByZWZzJ10pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlYXJjaCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSh7IHNlYXJjaElzT3BlbjogIXRoaXMuc3RhdGUuc2VhcmNoSXNPcGVuIH0pO1xuICB9XG5cbiAgcHVibGljIGNsb3NlU2VhcmNoKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKHsgc2VhcmNoSXNPcGVuOiBmYWxzZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVDb2xsZWN0aW9uVHJheSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSh7IGNvbGxlY3Rpb25UcmF5SXNPcGVuOiAhdGhpcy5zdGF0ZS5jb2xsZWN0aW9uVHJheUlzT3BlbiB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuQ29sbGVjdGlvblRyYXkoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoeyBjb2xsZWN0aW9uVHJheUlzT3BlbjogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTb3J0UHJlZmVyZW5jZShzb3J0SWQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKHsgc29ydElkOiBzb3J0SWQgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNzZXRWaWV3UHJlZmVyZW5jZSh2aWV3OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSh7IGFzc2V0VmlldzogdmlldyB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVGaWx0ZXJDb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSh7IGRpc3BsYXlGaWx0ZXJDb3VudHM6ICF0aGlzLnN0YXRlLmRpc3BsYXlGaWx0ZXJDb3VudHMgfSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRmlsdGVyVHJlZSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSh7IGRpc3BsYXlGaWx0ZXJUcmVlOiAhdGhpcy5zdGF0ZS5kaXNwbGF5RmlsdGVyVHJlZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVQcmljaW5nUHJlZmVyZW5jZXMoYXR0cmlidXRlczogYW55KSB7XG4gICAgdGhpcy51cGRhdGUoeyBwcmljaW5nUHJlZmVyZW5jZXM6IGF0dHJpYnV0ZXMgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0KHByZWZlcmVuY2VzOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVN0b3JlKHRoaXMuZm9ybWF0UmVzcG9uc2UocHJlZmVyZW5jZXMpKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVN0b3JlKCk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdFJlc3BvbnNlKHByZWZlcmVuY2VzOiBhbnkpOiBhbnkge1xuICAgIGZvciAobGV0IHByZWZLZXkgaW4gcHJlZmVyZW5jZXMpIHtcbiAgICAgIGxldCBuZXdWYWx1ZTogYW55ID0gdGhpcy5zdHJpbmdUb0Jvb2wocHJlZmVyZW5jZXNbcHJlZktleV0pO1xuICAgICAgcHJlZmVyZW5jZXNbcHJlZktleV0gPSBKU09OLnBhcnNlKG5ld1ZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHByZWZlcmVuY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KEFwaS5JZGVudGl0aWVzLCAndXNlclByZWZlcmVuY2VzJyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZShwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU3RvcmUocGFyYW1zKTtcbiAgICBpZiAoIXRoaXMuY3VycmVudFVzZXIubG9nZ2VkSW4oKSkgcmV0dXJuO1xuICAgIHRoaXMucHV0KHBhcmFtcykudGFrZSgxKS5zdWJzY3JpYmUoXyA9PiB7IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXQocGFyYW1zOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBib2R5OiBhbnkgPSB0aGlzLmZvcm1hdEJvZHkocGFyYW1zKTtcbiAgICByZXR1cm4gdGhpcy5hcGkucHV0KEFwaS5JZGVudGl0aWVzLCAndXNlclByZWZlcmVuY2VzL2l0ZW0nLCB7IGJvZHk6IGJvZHkgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVN0b3JlKGRhdGE6IGFueSA9IGRlZmF1bHRQcmVmZXJlbmNlcyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnVVNFUl9QUkVGUy5VUERBVEVfUFJFRkVSRU5DRVMnLCBwYXlsb2FkOiBkYXRhIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRCb2R5KHByZWZlcmVuY2VzOiBhbnkpOiBhbnkge1xuICAgIGZvciAobGV0IHByZWZlcmVuY2UgaW4gcHJlZmVyZW5jZXMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogcHJlZmVyZW5jZSxcbiAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHByZWZlcmVuY2VzW3ByZWZlcmVuY2VdKVxuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpbmdUb0Jvb2wodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gfCBzdHJpbmcge1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgJ3RydWUnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==
