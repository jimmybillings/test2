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
    SortDefinitionsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService, store_1.Store, user_preference_service_1.UserPreferenceService])
    ], SortDefinitionsService);
    return SortDefinitionsService;
}());
exports.SortDefinitionsService = SortDefinitionsService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvc29ydC1kZWZpbml0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscUNBQW9DO0FBQ3BDLHNDQUEyQztBQUUzQyxxRUFBa0U7QUFDbEUsNkNBQTJDO0FBQzNDLDZEQUFrRDtBQUdsRCxJQUFNLGFBQWEsR0FBUTtJQUN6QixLQUFLLEVBQUUsRUFBRTtJQUNULFdBQVcsRUFBRSxFQUFFO0NBQ2hCLENBQUM7QUFFRix5QkFBZ0MsS0FBcUIsRUFBRSxNQUFvQjtJQUEzQyxzQkFBQSxFQUFBLHFCQUFxQjtJQUNuRCxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLDBCQUEwQjtZQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRDtZQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUM7QUFQRCwwQ0FPQztBQUFBLENBQUM7QUFHRjtJQUdFLGdDQUFvQixHQUFlLEVBQVUsS0FBaUIsRUFBVSxjQUFxQztRQUF6RixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQUMzRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLHVDQUFNLEdBQWIsVUFBYyxNQUFXO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTSxtREFBa0IsR0FBekI7UUFBQSxpQkFNQztRQUxDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQWE7WUFDL0UsSUFBSSxVQUFVLEdBQVEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbkYsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLCtDQUFjLEdBQXRCLFVBQXVCLEtBQWlCO1FBQ3RDLEdBQUcsQ0FBQyxDQUFjLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLO1lBQWxCLElBQUksS0FBSyxjQUFBO1lBQ1osR0FBRyxDQUFDLENBQUMsSUFBSSxVQUFVLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUFBLENBQUM7WUFDSixDQUFDO1lBQUEsQ0FBQztTQUNIO1FBQUEsQ0FBQztJQUNKLENBQUM7SUEzQlUsc0JBQXNCO1FBRGxDLGlCQUFVLEVBQUU7eUNBSWMsd0JBQVUsRUFBaUIsYUFBSyxFQUErQiwrQ0FBcUI7T0FIbEcsc0JBQXNCLENBNEJsQztJQUFELDZCQUFDO0NBNUJELEFBNEJDLElBQUE7QUE1Qlksd0RBQXNCIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvc29ydC1kZWZpbml0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFVzZXJQcmVmZXJlbmNlU2VydmljZSB9IGZyb20gJy4vdXNlci1wcmVmZXJlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IExlZ2FjeUFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbmNvbnN0IGluaXRTb3J0U3RhdGU6IGFueSA9IHtcbiAgc29ydHM6IFtdLFxuICBjdXJyZW50U29ydDoge31cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0RGVmaW5pdGlvbnMoc3RhdGUgPSBpbml0U29ydFN0YXRlLCBhY3Rpb246IExlZ2FjeUFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnU09SVFMuVVBEQVRFX0RFRklOSVRJT05TJzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLnBheWxvYWQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb3J0RGVmaW5pdGlvbnNTZXJ2aWNlIHtcbiAgcHVibGljIGRhdGE6IE9ic2VydmFibGU8YW55PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSBzdG9yZTogU3RvcmU8YW55PiwgcHJpdmF0ZSB1c2VyUHJlZmVyZW5jZTogVXNlclByZWZlcmVuY2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5zdG9yZS5zZWxlY3QoJ3NvcnREZWZpbml0aW9ucycpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnU09SVFMuVVBEQVRFX0RFRklOSVRJT05TJywgcGF5bG9hZDogcGFyYW1zIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFNvcnREZWZpbml0aW9ucygpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoQXBpLklkZW50aXRpZXMsICdzb3J0RGVmaW5pdGlvbi9saXN0JykuZmxhdE1hcCgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgbGV0IHN0aWNreVNvcnQ6IGFueSA9IHRoaXMuZmluZFN0aWNreVNvcnQocmVzcG9uc2UubGlzdCkgfHwgcmVzcG9uc2UubGlzdFswXS5maXJzdDtcbiAgICAgIHRoaXMudXBkYXRlKHsgc29ydHM6IHJlc3BvbnNlLmxpc3QsIGN1cnJlbnRTb3J0OiBzdGlja3lTb3J0IH0pO1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFN0aWNreVNvcnQoc29ydHM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgIGZvciAobGV0IGdyb3VwIG9mIHNvcnRzKSB7XG4gICAgICBmb3IgKGxldCBkZWZpbml0aW9uIGluIGdyb3VwKSB7XG4gICAgICAgIGlmIChncm91cFtkZWZpbml0aW9uXS5pZCA9PT0gcGFyc2VJbnQodGhpcy51c2VyUHJlZmVyZW5jZS5zdGF0ZS5zb3J0SWQpKSB7XG4gICAgICAgICAgcmV0dXJuIGdyb3VwW2RlZmluaXRpb25dO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iXX0=
