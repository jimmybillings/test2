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
    FilterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService, store_1.Store, current_user_service_1.CurrentUserService])
    ], FilterService);
    return FilterService;
}());
exports.FilterService = FilterService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvZmlsdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBMkM7QUFDM0MscUNBQW9DO0FBQ3BDLG1GQUFnRjtBQUNoRixpRUFBK0Q7QUFDL0QsdUVBQTREO0FBRzVELGtFQUF1RDtBQUV2RCxJQUFNLFdBQVcsR0FBUSxFQUFFLENBQUM7QUFDNUIsaUJBQXdCLEtBQStCLEVBQUUsTUFBb0I7SUFBckQsc0JBQUEsRUFBQSxtQkFBK0I7SUFDckQsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxxQkFBcUI7WUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLHlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3pEO1lBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0FBQ0gsQ0FBQztBQVBELDBCQU9DO0FBQUEsQ0FBQztBQUdGO0lBR0UsdUJBQW9CLEdBQWUsRUFBVSxLQUFpQixFQUFVLFdBQStCO1FBQW5GLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBRGhHLFVBQUssR0FBWSxLQUFLLENBQUM7UUFFNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sNEJBQUksR0FBWCxVQUFZLE1BQVcsRUFBRSxPQUFnQjtRQUF6QyxpQkFXQztRQVZDLElBQUksT0FBTyxHQUFHLHlCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25F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cC9zaGFyZWQvc2VydmljZXMvZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBY3RpdmVGaWx0ZXJzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXJzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBMZWdhY3lBY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuXG5jb25zdCBpbml0RmlsdGVyczogYW55ID0ge307XG5leHBvcnQgZnVuY3Rpb24gZmlsdGVycyhzdGF0ZTogQXJyYXk8YW55PiA9IGluaXRGaWx0ZXJzLCBhY3Rpb246IExlZ2FjeUFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnRklMVEVSUy5TRVRfRklMVEVSUyc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uLmNsb25lKGFjdGlvbi5wYXlsb2FkKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpbHRlclNlcnZpY2Uge1xuICBwdWJsaWMgZGF0YTogT2JzZXJ2YWJsZTxhbnk+O1xuICBwdWJsaWMgZm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsIHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4sIHByaXZhdGUgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyU2VydmljZSkge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuc3RvcmUuc2VsZWN0KCdmaWx0ZXJzJyk7XG4gIH1cblxuICBwdWJsaWMgbG9hZChwYXJhbXM6IGFueSwgY291bnRlZDogYm9vbGVhbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IG9wdGlvbnMgPSBDb21tb24uY2xvbmUoT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7IGNvdW50ZWQgfSkpO1xuICAgIGlmICghb3B0aW9ucy5xKSBvcHRpb25zLnEgPSAnaXRlbVR5cGU6Y2xpcCc7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcbiAgICAgIEFwaS5Bc3NldHMsXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyLmxvZ2dlZEluKCkgPyAnZmlsdGVyL2ZpbHRlclRyZWUnIDogJ2ZpbHRlci9hbm9ueW1vdXMvZmlsdGVyVHJlZScsXG4gICAgICB7IHBhcmFtZXRlcnM6IG9wdGlvbnMsIGxvYWRpbmdJbmRpY2F0b3I6IGZhbHNlIH1cbiAgICApLmRvKHJlc3BvbnNlID0+IHtcbiAgICAgIGxldCBhY3RpdmVGaWx0ZXJHcm91cHM6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWN0aXZlRmlsdGVyR3JvdXBzJykpIHx8IFtdO1xuICAgICAgdGhpcy5zZXQodGhpcy5zYW5pdGl6ZShyZXNwb25zZSwgbnVsbCwgYWN0aXZlRmlsdGVyR3JvdXBzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5jbGVhclZhbHVlcygpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoZmlsdGVySWQ6IG51bWJlcikge1xuICAgIHRoaXMuc2V0KHRoaXMudG9nZ2xlVmFsdWUoZmlsdGVySWQpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDdXN0b20oZmlsdGVyOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnNldCh0aGlzLmFkZEN1c3RvbVZhbHVlKGZpbHRlciwgdmFsdWUpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVFeGNsdXNpdmUoc3ViRmlsdGVyOiBhbnkpIHtcbiAgICB0aGlzLnNldCh0aGlzLnRvZ2dsZUV4Y2x1c2l2ZVZhbHVlKHN1YkZpbHRlcikpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUZpbHRlckdyb3VwKGZpbHRlcjogYW55KSB7XG4gICAgdGhpcy5zZXQodGhpcy50b2dnbGVWYWx1ZShmaWx0ZXIuZmlsdGVySWQpKTtcbiAgICBsZXQgYWN0aXZlRmlsdGVyR3JvdXBzOiBhbnkgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZUZpbHRlckdyb3VwKGFjdGl2ZUZpbHRlckdyb3Vwcyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjdGl2ZUZpbHRlckdyb3VwcycsIEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZpbHRlckdyb3VwcykpO1xuICB9XG5cbiAgcHVibGljIGdldEFjdGl2ZSgpIHtcbiAgICBsZXQgYWN0aXZlOiBBY3RpdmVGaWx0ZXJzID0geyBmaWx0ZXJzOiBbXSwgaWRzOiBbXSwgdmFsdWVzOiBbXSB9O1xuICAgIHRoaXMuYWN0aXZlRmlsdGVycyhhY3RpdmUuZmlsdGVycyk7XG4gICAgYWN0aXZlLmlkcyA9IGFjdGl2ZS5maWx0ZXJzLm1hcCgoZmlsdGVyOiBhbnkpID0+IGZpbHRlci5maWx0ZXJJZCk7XG4gICAgYWN0aXZlLnZhbHVlcyA9IGFjdGl2ZS5maWx0ZXJzLmZpbHRlcigoZmlsdGVyOiBhbnkpID0+IGZpbHRlci5maWx0ZXJWYWx1ZSlcbiAgICAgIC5tYXAoKGZpbHRlcjogYW55KSA9PiBgJHtmaWx0ZXIuZmlsdGVySWR9OiR7ZmlsdGVyLmZpbHRlclZhbHVlfWApO1xuICAgIHJldHVybiBhY3RpdmU7XG4gIH1cblxuICAvL1xuICAvLyAtLS0tLS0tLS0tLSBFTkQgT0YgUFVCTElDIElOVEVSRkFDRSAtLS0tLS0tLS0tLSAvL1xuICAvL1xuICBwcml2YXRlIHNldChmaWx0ZXJzOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ0ZJTFRFUlMuU0VUX0ZJTFRFUlMnLCBwYXlsb2FkOiBmaWx0ZXJzIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzYW5pdGl6ZShjaGlsZDogYW55LCBwYXJlbnQ6IGFueSwgYWN0aXZlRmlsdGVyR3JvdXBzOiBzdHJpbmdbXSkge1xuICAgIGlmIChhY3RpdmVGaWx0ZXJHcm91cHMuaW5kZXhPZihjaGlsZC5maWx0ZXJJZCkgPiAtMSkgY2hpbGQuYWN0aXZlID0gdHJ1ZTtcbiAgICBpZiAocGFyZW50KSBjaGlsZC5wYXJlbnRJZCA9IHBhcmVudC5maWx0ZXJJZDtcbiAgICBpZiAoY2hpbGQuc3ViRmlsdGVycykge1xuICAgICAgZm9yIChsZXQgYmFieSBvZiBjaGlsZC5zdWJGaWx0ZXJzKSB0aGlzLnNhbml0aXplKGJhYnksIGNoaWxkLCBhY3RpdmVGaWx0ZXJHcm91cHMpO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICBwcml2YXRlIGFjdGl2ZUZpbHRlcnMoYWN0aXZlRmlsdGVyczogYW55LCBmaWx0ZXIgPSB0aGlzLmZpbHRlcnMpIHtcbiAgICBpZiAoZmlsdGVyLnN1YkZpbHRlcnMpIHtcbiAgICAgIGZvciAodmFyIGwgb2YgZmlsdGVyLnN1YkZpbHRlcnMpIHRoaXMuYWN0aXZlRmlsdGVycyhhY3RpdmVGaWx0ZXJzLCBsKTtcbiAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmaWx0ZXIuYWN0aXZlKSBhY3RpdmVGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhY3RpdmVGaWx0ZXJHcm91cChhY3RpdmVQYXJlbnRGaWx0ZXJzOiBhbnksIGZpbHRlciA9IHRoaXMuZmlsdGVycykge1xuICAgIGlmIChmaWx0ZXIuc3ViRmlsdGVycykge1xuICAgICAgaWYgKGZpbHRlci5hY3RpdmUpIGFjdGl2ZVBhcmVudEZpbHRlcnMucHVzaChmaWx0ZXIuZmlsdGVySWQpO1xuICAgICAgZm9yICh2YXIgbCBvZiBmaWx0ZXIuc3ViRmlsdGVycykge1xuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlckdyb3VwKGFjdGl2ZVBhcmVudEZpbHRlcnMsIGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyVmFsdWVzKGZpbHRlciA9IHRoaXMuZmlsdGVycykge1xuICAgIGlmIChmaWx0ZXIuc3ViRmlsdGVycykge1xuICAgICAgZm9yICh2YXIgbCBvZiBmaWx0ZXIuc3ViRmlsdGVycykgdGhpcy5jbGVhclZhbHVlcyhsKTtcbiAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmaWx0ZXIuYWN0aXZlKSBmaWx0ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICBmaWx0ZXIuZmlsdGVyVmFsdWUgPSBudWxsO1xuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUV4Y2x1c2l2ZVZhbHVlKHN1YkZpbHRlcjogYW55LCBmaWx0ZXIgPSB0aGlzLmZpbHRlcnMpOiB2b2lkIHtcbiAgICBpZiAoZmlsdGVyLnN1YkZpbHRlcnMpIHtcbiAgICAgIGlmIChmaWx0ZXIuZmlsdGVySWQgPT09IHN1YkZpbHRlci5wYXJlbnRJZCkge1xuICAgICAgICBmb3IgKGxldCBmIG9mIGZpbHRlci5zdWJGaWx0ZXJzKSBmLmFjdGl2ZSA9IChmLmZpbHRlcklkID09PSBzdWJGaWx0ZXIuZmlsdGVySWQpID8gIWYuYWN0aXZlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuZm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgbCBvZiBmaWx0ZXIuc3ViRmlsdGVycykge1xuICAgICAgICBpZiAodGhpcy5mb3VuZCkge1xuICAgICAgICAgIHRoaXMuZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZUV4Y2x1c2l2ZVZhbHVlKHN1YkZpbHRlciwgbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsdGVyO1xuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDdXN0b21WYWx1ZShjdXJyZW50RmlsdGVyOiBhbnksIHZhbHVlOiBhbnksIGZpbHRlciA9IHRoaXMuZmlsdGVycyk6IHZvaWQge1xuICAgIGlmIChmaWx0ZXIuc3ViRmlsdGVycykge1xuICAgICAgZm9yIChsZXQgZiBvZiBmaWx0ZXIuc3ViRmlsdGVycykge1xuICAgICAgICBpZiAodGhpcy5mb3VuZCkge1xuICAgICAgICAgIHRoaXMuZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZEN1c3RvbVZhbHVlKGN1cnJlbnRGaWx0ZXIsIHZhbHVlLCBmKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmaWx0ZXIuZmlsdGVySWQgPT09IGN1cnJlbnRGaWx0ZXIuZmlsdGVySWQpIHtcbiAgICAgICAgZmlsdGVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGZpbHRlci5maWx0ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVWYWx1ZShjdXJyZW50RmlsdGVyOiBhbnksIGZpbHRlciA9IHRoaXMuZmlsdGVycykge1xuICAgIGlmIChmaWx0ZXIuZmlsdGVySWQgPT09IGN1cnJlbnRGaWx0ZXIpIHtcbiAgICAgIGlmIChmaWx0ZXIuYWN0aXZlKSBmaWx0ZXIuZmlsdGVyVmFsdWUgPSBudWxsO1xuICAgICAgZmlsdGVyLmFjdGl2ZSA9ICFmaWx0ZXIuYWN0aXZlO1xuICAgICAgdGhpcy5mb3VuZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChmaWx0ZXIuc3ViRmlsdGVycykge1xuICAgICAgZm9yICh2YXIgbCBvZiBmaWx0ZXIuc3ViRmlsdGVycykge1xuICAgICAgICBpZiAodGhpcy5mb3VuZCkge1xuICAgICAgICAgIHRoaXMuZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZVZhbHVlKGN1cnJlbnRGaWx0ZXIsIGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBmaWx0ZXJzKCkge1xuICAgIGxldCBmaWx0ZXJzOiBhbnkgPSB7fTtcbiAgICB0aGlzLmRhdGEudGFrZSgxKS5zdWJzY3JpYmUoZiA9PiBmaWx0ZXJzID0gZik7XG4gICAgcmV0dXJuIGZpbHRlcnM7XG4gIH1cbn1cbiJdfQ==
