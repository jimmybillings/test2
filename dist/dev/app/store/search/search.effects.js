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
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var search_service_1 = require("./search.service");
var SearchActions = require("./search.actions");
var SearchEffects = (function () {
    function SearchEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.loadResults = this.actions.ofType(SearchActions.LoadResults.Type)
            .switchMap(function (action) {
            return _this.service.loadResults(action.params)
                .map(function (results) { return _this.store.create(function (factory) { return factory.search.loadResultsSuccess(results); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.search.loadResultsFailure(error); })); });
        });
        this.loadResultsFailure = this.actions.ofType(SearchActions.LoadResultsFailure.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.error.handle(action.error); });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SearchEffects.prototype, "loadResults", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SearchEffects.prototype, "loadResultsFailure", void 0);
    SearchEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, search_service_1.SearchService])
    ], SearchEffects);
    return SearchEffects;
}());
exports.SearchEffects = SearchEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBRTdDLHlDQUFnRDtBQUVoRCw2Q0FBMkM7QUFDM0MsbURBQWlEO0FBQ2pELGdEQUFrRDtBQUdsRDtJQWVFLHVCQUFvQixPQUFnQixFQUFVLEtBQWUsRUFBVSxPQUFzQjtRQUE3RixpQkFBa0c7UUFBOUUsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBYnRGLGdCQUFXLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ3pGLFNBQVMsQ0FBQyxVQUFDLE1BQWlDO1lBQzNDLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDcEMsR0FBRyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUExQyxDQUEwQyxDQUFDLEVBQXhFLENBQXdFLENBQUM7aUJBQzFGLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDLEVBQXJGLENBQXFGLENBQUM7UUFGeEcsQ0FFd0csQ0FDekcsQ0FBQztRQUdHLHVCQUFrQixHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2FBQ3ZHLEdBQUcsQ0FBQyxVQUFDLE1BQXdDO1lBQzVDLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQWxDLENBQWtDLENBQUM7UUFBaEUsQ0FBZ0UsQ0FDakUsQ0FBQztJQUU2RixDQUFDO0lBYmxHO1FBREMsZ0JBQU0sRUFBRTtrQ0FDVyx1QkFBVTtzREFLMUI7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2tCLHVCQUFVOzZEQUdqQztJQWJPLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FnQmtCLGlCQUFPLEVBQWlCLG9CQUFRLEVBQW1CLDhCQUFhO09BZmxGLGFBQWEsQ0FnQnpCO0lBQUQsb0JBQUM7Q0FoQkQsQUFnQkMsSUFBQTtBQWhCWSxzQ0FBYSIsImZpbGUiOiJhcHAvc3RvcmUvc2VhcmNoL3NlYXJjaC5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgU2VhcmNoQWN0aW9ucyBmcm9tICcuL3NlYXJjaC5hY3Rpb25zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaEVmZmVjdHMge1xuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWRSZXN1bHRzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFNlYXJjaEFjdGlvbnMuTG9hZFJlc3VsdHMuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IFNlYXJjaEFjdGlvbnMuTG9hZFJlc3VsdHMpID0+XG4gICAgICB0aGlzLnNlcnZpY2UubG9hZFJlc3VsdHMoYWN0aW9uLnBhcmFtcylcbiAgICAgICAgLm1hcCgocmVzdWx0cykgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNlYXJjaC5sb2FkUmVzdWx0c1N1Y2Nlc3MocmVzdWx0cykpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc2VhcmNoLmxvYWRSZXN1bHRzRmFpbHVyZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgbG9hZFJlc3VsdHNGYWlsdXJlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFNlYXJjaEFjdGlvbnMuTG9hZFJlc3VsdHNGYWlsdXJlLlR5cGUpXG4gICAgLm1hcCgoYWN0aW9uOiBTZWFyY2hBY3Rpb25zLkxvYWRSZXN1bHRzRmFpbHVyZSkgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoYWN0aW9uLmVycm9yKSlcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9uczogQWN0aW9ucywgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsIHByaXZhdGUgc2VydmljZTogU2VhcmNoU2VydmljZSkgeyB9XG59XG4iXX0=
