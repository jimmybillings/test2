"use strict";
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
    UserPreferenceService.decorators = [
        { type: core_1.Injectable },
    ];
    UserPreferenceService.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: store_1.Store, },
        { type: api_service_1.ApiService, },
    ]; };
    return UserPreferenceService;
}());
exports.UserPreferenceService = UserPreferenceService;
//# sourceMappingURL=user-preference.service.js.map