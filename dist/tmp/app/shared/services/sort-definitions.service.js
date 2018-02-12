"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngrx/store");
var core_1 = require("@angular/core");
var user_preference_service_1 = require("./user-preference.service");
var api_service_1 = require("./api.service");
var api_interface_1 = require("../interfaces/api.interface");
var initSortState = {
    sorts: [],
    currentSort: {}
};
function sortDefinitions(state, action) {
    if (state === void 0) { state = initSortState; }
    switch (action.type) {
        case 'SORTS.UPDATE_DEFINITIONS':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.sortDefinitions = sortDefinitions;
;
var SortDefinitionsService = (function () {
    function SortDefinitionsService(api, store, userPreference) {
        this.api = api;
        this.store = store;
        this.userPreference = userPreference;
        this.data = this.store.select('sortDefinitions');
    }
    SortDefinitionsService.prototype.update = function (params) {
        this.store.dispatch({ type: 'SORTS.UPDATE_DEFINITIONS', payload: params });
    };
    SortDefinitionsService.prototype.getSortDefinitions = function () {
        var _this = this;
        return this.api.get(api_interface_1.Api.Identities, 'sortDefinition/list').flatMap(function (response) {
            var stickySort = _this.findStickySort(response.list) || response.list[0].first;
            _this.update({ sorts: response.list, currentSort: stickySort });
            return _this.data;
        });
    };
    SortDefinitionsService.prototype.findStickySort = function (sorts) {
        for (var _i = 0, sorts_1 = sorts; _i < sorts_1.length; _i++) {
            var group = sorts_1[_i];
            for (var definition in group) {
                if (group[definition].id === parseInt(this.userPreference.state.sortId)) {
                    return group[definition];
                }
                ;
            }
            ;
        }
        ;
    };
    SortDefinitionsService.decorators = [
        { type: core_1.Injectable },
    ];
    SortDefinitionsService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
        { type: store_1.Store, },
        { type: user_preference_service_1.UserPreferenceService, },
    ]; };
    return SortDefinitionsService;
}());
exports.SortDefinitionsService = SortDefinitionsService;
//# sourceMappingURL=sort-definitions.service.js.map