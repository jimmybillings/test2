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
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var ui_config_service_1 = require("./ui-config.service");
var UiConfigActions = require("./ui-config.actions");
var UiConfigState = require("./ui-config.state");
var UiConfigEffects = (function () {
    function UiConfigEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.initialize = this.actions.ofType(UiConfigActions.Initialize.Type)
            .map(function (action) {
            var localConfig = localStorage.getItem('uiConfig') || JSON.stringify(UiConfigState.initialState);
            return _this.store.create(function (factory) { return factory.uiConfig.initializeSuccess(JSON.parse(localConfig)); });
        });
        this.load = this.actions.ofType(UiConfigActions.Load.Type)
            .switchMap(function () { return _this.service.load()
            .map(function (config) { return _this.store.create(function (factory) { return factory.uiConfig.loadSuccess(config); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.uiConfig.loadFailure(error); })); }); });
        this.setInLocalStorage = this.actions.ofType(UiConfigActions.LoadSuccess.Type)
            .do(function (action) { return localStorage.setItem('uiConfig', JSON.stringify(action.config)); });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], UiConfigEffects.prototype, "initialize", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], UiConfigEffects.prototype, "load", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], UiConfigEffects.prototype, "setInLocalStorage", void 0);
    UiConfigEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, ui_config_service_1.UiConfigService])
    ], UiConfigEffects);
    return UiConfigEffects;
}());
exports.UiConfigEffects = UiConfigEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNkM7QUFDN0Msc0NBQTJDO0FBQzNDLHlDQUFnRDtBQUdoRCw2Q0FBMkM7QUFDM0MseURBQXNEO0FBQ3RELHFEQUF1RDtBQUN2RCxpREFBbUQ7QUFHbkQ7SUFtQkUseUJBQW9CLE9BQWdCLEVBQVUsS0FBZSxFQUFVLE9BQXdCO1FBQS9GLGlCQUFvRztRQUFoRixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBakJ4RixlQUFVLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3pGLEdBQUcsQ0FBQyxVQUFBLE1BQU07WUFDVCxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pHLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUEzRCxDQUEyRCxDQUFDLENBQUM7UUFDbkcsQ0FBQyxDQUFDLENBQUM7UUFHRSxTQUFJLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdFLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7YUFDakMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxFQUFsRSxDQUFrRSxDQUFDO2FBQ2pGLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQyxFQUFoRixDQUFnRixDQUFDLEVBRmxGLENBRWtGLENBQ2xHLENBQUM7UUFHRyxzQkFBaUIsR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7YUFDakcsRUFBRSxDQUFDLFVBQUMsTUFBbUMsSUFBSyxPQUFBLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQS9ELENBQStELENBQUMsQ0FBQztJQUViLENBQUM7SUFqQnBHO1FBREMsZ0JBQU0sRUFBRTtrQ0FDVSx1QkFBVTt1REFJeEI7SUFHTDtRQURDLGdCQUFNLEVBQUU7a0NBQ0ksdUJBQVU7aURBSW5CO0lBR0o7UUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2tDQUNGLHVCQUFVOzhEQUM0RTtJQWpCckcsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQW9Ca0IsaUJBQU8sRUFBaUIsb0JBQVEsRUFBbUIsbUNBQWU7T0FuQnBGLGVBQWUsQ0FvQjNCO0lBQUQsc0JBQUM7Q0FwQkQsQUFvQkMsSUFBQTtBQXBCWSwwQ0FBZSIsImZpbGUiOiJhcHAvc3RvcmUvdWktY29uZmlnL3VpLWNvbmZpZy5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgVWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi91aS1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBVaUNvbmZpZ0FjdGlvbnMgZnJvbSAnLi91aS1jb25maWcuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBVaUNvbmZpZ1N0YXRlIGZyb20gJy4vdWktY29uZmlnLnN0YXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVpQ29uZmlnRWZmZWN0cyB7XG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgaW5pdGlhbGl6ZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShVaUNvbmZpZ0FjdGlvbnMuSW5pdGlhbGl6ZS5UeXBlKVxuICAgIC5tYXAoYWN0aW9uID0+IHtcbiAgICAgIGxldCBsb2NhbENvbmZpZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1aUNvbmZpZycpIHx8IEpTT04uc3RyaW5naWZ5KFVpQ29uZmlnU3RhdGUuaW5pdGlhbFN0YXRlKTtcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkudWlDb25maWcuaW5pdGlhbGl6ZVN1Y2Nlc3MoSlNPTi5wYXJzZShsb2NhbENvbmZpZykpKTtcbiAgICB9KTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoVWlDb25maWdBY3Rpb25zLkxvYWQuVHlwZSlcbiAgICAuc3dpdGNoTWFwKCgpID0+IHRoaXMuc2VydmljZS5sb2FkKClcbiAgICAgIC5tYXAoY29uZmlnID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS51aUNvbmZpZy5sb2FkU3VjY2Vzcyhjb25maWcpKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS51aUNvbmZpZy5sb2FkRmFpbHVyZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIHNldEluTG9jYWxTdG9yYWdlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFVpQ29uZmlnQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlKVxuICAgIC5kbygoYWN0aW9uOiBVaUNvbmZpZ0FjdGlvbnMuTG9hZFN1Y2Nlc3MpID0+IGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1aUNvbmZpZycsIEpTT04uc3RyaW5naWZ5KGFjdGlvbi5jb25maWcpKSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLCBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSwgcHJpdmF0ZSBzZXJ2aWNlOiBVaUNvbmZpZ1NlcnZpY2UpIHsgfVxufVxuIl19
