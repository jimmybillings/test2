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
var effects_1 = require("@ngrx/effects");
var MultiLingualActions = require("./multi-lingual.actions");
var Observable_1 = require("rxjs/Observable");
var app_store_1 = require("../../app.store");
var core_2 = require("@ngx-translate/core");
var api_config_1 = require("../../shared/services/api.config");
var MultiLingualEffects = (function () {
    function MultiLingualEffects(actions, store, translate, apiConfig) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.translate = translate;
        this.apiConfig = apiConfig;
        this.setLanguage = this.actions.ofType(MultiLingualActions.SetLanguage.Type)
            .do(function (action) {
            _this.translate.use(_this.apiConfig.baseUrl.split(':/')[1] + "identities-api/v1/translation/" + _this.apiConfig.portal + "/" + action.lang);
        });
    }
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], MultiLingualEffects.prototype, "setLanguage", void 0);
    MultiLingualEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            core_2.TranslateService,
            api_config_1.ApiConfig])
    ], MultiLingualEffects);
    return MultiLingualEffects;
}());
exports.MultiLingualEffects = MultiLingualEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9tdWx0aS1saW5ndWFsL211bHRpLWxpbmd1YWwuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUUzQyx5Q0FBZ0Q7QUFDaEQsNkRBQStEO0FBRS9ELDhDQUE2QztBQUM3Qyw2Q0FBa0Y7QUFDbEYsNENBQXVEO0FBQ3ZELCtEQUE2RDtBQUc3RDtJQVFFLDZCQUNVLE9BQWdCLEVBQ2hCLEtBQWUsRUFDZixTQUEyQixFQUMzQixTQUFvQjtRQUo5QixpQkFJbUM7UUFIekIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVZ2QixnQkFBVyxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQy9GLEVBQUUsQ0FBQyxVQUFDLE1BQXVDO1lBQzFDLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsc0NBQWlDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxJQUFNLENBQUMsQ0FBQztRQUN0SSxDQUFDLENBQUMsQ0FBQztJQU82QixDQUFDO0lBVm5DO1FBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztrQ0FDUix1QkFBVTs0REFHekI7SUFMTSxtQkFBbUI7UUFEL0IsaUJBQVUsRUFBRTt5Q0FVUSxpQkFBTztZQUNULG9CQUFRO1lBQ0osdUJBQWdCO1lBQ2hCLHNCQUFTO09BWm5CLG1CQUFtQixDQWEvQjtJQUFELDBCQUFDO0NBYkQsQUFhQyxJQUFBO0FBYlksa0RBQW1CIiwiZmlsZSI6ImFwcC9zdG9yZS9tdWx0aS1saW5ndWFsL211bHRpLWxpbmd1YWwuZWZmZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgTXVsdGlMaW5ndWFsQWN0aW9ucyBmcm9tICcuL211bHRpLWxpbmd1YWwuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFwcFN0b3JlLCBBcHBTdGF0ZSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5TWFwcGVyIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IEFwaUNvbmZpZyB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkuY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE11bHRpTGluZ3VhbEVmZmVjdHMge1xuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXG4gIHB1YmxpYyBzZXRMYW5ndWFnZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShNdWx0aUxpbmd1YWxBY3Rpb25zLlNldExhbmd1YWdlLlR5cGUpXG4gICAgLmRvKChhY3Rpb246IE11bHRpTGluZ3VhbEFjdGlvbnMuU2V0TGFuZ3VhZ2UpID0+IHtcbiAgICAgIHRoaXMudHJhbnNsYXRlLnVzZShgJHt0aGlzLmFwaUNvbmZpZy5iYXNlVXJsLnNwbGl0KCc6LycpWzFdfWlkZW50aXRpZXMtYXBpL3YxL3RyYW5zbGF0aW9uLyR7dGhpcy5hcGlDb25maWcucG9ydGFsfS8ke2FjdGlvbi5sYW5nfWApO1xuICAgIH0pO1xuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXBpQ29uZmlnOiBBcGlDb25maWcpIHsgfVxufVxuIl19
