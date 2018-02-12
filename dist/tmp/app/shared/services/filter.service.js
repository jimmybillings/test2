"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var current_user_service_1 = require("../../shared/services/current-user.service");
var api_service_1 = require("../../shared/services/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var common_functions_1 = require("../utilities/common.functions");
var initFilters = {};
function filters(state, action) {
    if (state === void 0) { state = initFilters; }
    switch (action.type) {
        case 'FILTERS.SET_FILTERS':
            return Object.assign({}, common_functions_1.Common.clone(action.payload));
        default:
            return state;
    }
}
exports.filters = filters;
;
var FilterService = (function () {
    function FilterService(api, store, currentUser) {
        this.api = api;
        this.store = store;
        this.currentUser = currentUser;
        this.found = false;
        this.data = this.store.select('filters');
    }
    FilterService.prototype.load = function (params, counted) {
        var _this = this;
        var options = common_functions_1.Common.clone(Object.assign({}, params, { counted: counted }));
        if (!options.q)
            options.q = 'itemType:clip';
        return this.api.get(api_interface_1.Api.Assets, this.currentUser.loggedIn() ? 'filter/filterTree' : 'filter/anonymous/filterTree', { parameters: options, loadingIndicator: false }).do(function (response) {
            var activeFilterGroups = JSON.parse(localStorage.getItem('activeFilterGroups')) || [];
            _this.set(_this.sanitize(response, null, activeFilterGroups));
        });
    };
    FilterService.prototype.clear = function () {
        this.set(this.clearValues());
    };
    FilterService.prototype.toggle = function (filterId) {
        this.set(this.toggleValue(filterId));
    };
    FilterService.prototype.addCustom = function (filter, value) {
        this.set(this.addCustomValue(filter, value));
    };
    FilterService.prototype.toggleExclusive = function (subFilter) {
        this.set(this.toggleExclusiveValue(subFilter));
    };
    FilterService.prototype.toggleFilterGroup = function (filter) {
        this.set(this.toggleValue(filter.filterId));
        var activeFilterGroups = [];
        this.activeFilterGroup(activeFilterGroups);
        localStorage.setItem('activeFilterGroups', JSON.stringify(activeFilterGroups));
    };
    FilterService.prototype.getActive = function () {
        var active = { filters: [], ids: [], values: [] };
        this.activeFilters(active.filters);
        active.ids = active.filters.map(function (filter) { return filter.filterId; });
        active.values = active.filters.filter(function (filter) { return filter.filterValue; })
            .map(function (filter) { return filter.filterId + ":" + filter.filterValue; });
        return active;
    };
    FilterService.prototype.set = function (filters) {
        this.store.dispatch({ type: 'FILTERS.SET_FILTERS', payload: filters });
    };
    FilterService.prototype.sanitize = function (child, parent, activeFilterGroups) {
        if (activeFilterGroups.indexOf(child.filterId) > -1)
            child.active = true;
        if (parent)
            child.parentId = parent.filterId;
        if (child.subFilters) {
            for (var _i = 0, _a = child.subFilters; _i < _a.length; _i++) {
                var baby = _a[_i];
                this.sanitize(baby, child, activeFilterGroups);
            }
        }
        return child;
    };
    FilterService.prototype.activeFilters = function (activeFilters, filter) {
        if (filter === void 0) { filter = this.filters; }
        if (filter.subFilters) {
            for (var _i = 0, _a = filter.subFilters; _i < _a.length; _i++) {
                var l = _a[_i];
                this.activeFilters(activeFilters, l);
            }
            return filter;
        }
        else {
            if (filter.active)
                activeFilters.push(filter);
            return filter;
        }
    };
    FilterService.prototype.activeFilterGroup = function (activeParentFilters, filter) {
        if (filter === void 0) { filter = this.filters; }
        if (filter.subFilters) {
            if (filter.active)
                activeParentFilters.push(filter.filterId);
            for (var _i = 0, _a = filter.subFilters; _i < _a.length; _i++) {
                var l = _a[_i];
                this.activeFilterGroup(activeParentFilters, l);
            }
            return filter;
        }
    };
    FilterService.prototype.clearValues = function (filter) {
        if (filter === void 0) { filter = this.filters; }
        if (filter.subFilters) {
            for (var _i = 0, _a = filter.subFilters; _i < _a.length; _i++) {
                var l = _a[_i];
                this.clearValues(l);
            }
            return filter;
        }
        else {
            if (filter.active)
                filter.active = false;
            filter.filterValue = null;
            return filter;
        }
    };
    FilterService.prototype.toggleExclusiveValue = function (subFilter, filter) {
        if (filter === void 0) { filter = this.filters; }
        if (filter.subFilters) {
            if (filter.filterId === subFilter.parentId) {
                for (var _i = 0, _a = filter.subFilters; _i < _a.length; _i++) {
                    var f = _a[_i];
                    f.active = (f.filterId === subFilter.filterId) ? !f.active : false;
                }
                this.found = true;
            }
            for (var _b = 0, _c = filter.subFilters; _b < _c.length; _b++) {
                var l = _c[_b];
                if (this.found) {
                    this.found = false;
                    break;
                }
                this.toggleExclusiveValue(subFilter, l);
            }
            return filter;
        }
        return filter;
    };
    FilterService.prototype.addCustomValue = function (currentFilter, value, filter) {
        if (filter === void 0) { filter = this.filters; }
        if (filter.subFilters) {
            for (var _i = 0, _a = filter.subFilters; _i < _a.length; _i++) {
                var f = _a[_i];
                if (this.found) {
                    this.found = false;
                    break;
                }
                this.addCustomValue(currentFilter, value, f);
            }
            return filter;
        }
        else {
            if (filter.filterId === currentFilter.filterId) {
                filter.active = true;
                filter.filterValue = value;
                this.found = true;
            }
            return filter;
        }
    };
    FilterService.prototype.toggleValue = function (currentFilter, filter) {
        if (filter === void 0) { filter = this.filters; }
        if (filter.filterId === currentFilter) {
            if (filter.active)
                filter.filterValue = null;
            filter.active = !filter.active;
            this.found = true;
        }
        if (filter.subFilters) {
            for (var _i = 0, _a = filter.subFilters; _i < _a.length; _i++) {
                var l = _a[_i];
                if (this.found) {
                    this.found = false;
                    break;
                }
                this.toggleValue(currentFilter, l);
            }
            return filter;
        }
    };
    Object.defineProperty(FilterService.prototype, "filters", {
        get: function () {
            var filters = {};
            this.data.take(1).subscribe(function (f) { return filters = f; });
            return filters;
        },
        enumerable: true,
        configurable: true
    });
    FilterService.decorators = [
        { type: core_1.Injectable },
    ];
    FilterService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
        { type: store_1.Store, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return FilterService;
}());
exports.FilterService = FilterService;
//# sourceMappingURL=filter.service.js.map