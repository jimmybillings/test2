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
var fee_config_service_1 = require("./fee-config.service");
var FeeConfigActions = require("./fee-config.actions");
var FeeConfigEffects = (function () {
    function FeeConfigEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.loadFeeConfig = this.actions
            .ofType(FeeConfigActions.LoadFeeConfig.Type)
            .filter(function (action) {
            return !_this.store.snapshot(function (state) { return state.feeConfig.initialized; });
        })
            .switchMap(function () { return _this.service.loadFeeConfig()
            .map(function (feeConfig) { return _this.store.create(function (factory) { return factory.feeConfig.loadFeeConfigSuccess(feeConfig); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); }); });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], FeeConfigEffects.prototype, "loadFeeConfig", void 0);
    FeeConfigEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, fee_config_service_1.FeeConfigService])
    ], FeeConfigEffects);
    return FeeConfigEffects;
}());
exports.FeeConfigEffects = FeeConfigEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDhDQUE2QztBQUM3QyxzQ0FBMkM7QUFDM0MseUNBQWdEO0FBRWhELDZDQUEyQztBQUMzQywyREFBd0Q7QUFDeEQsdURBQXlEO0FBR3pEO0lBZ0JFLDBCQUFvQixPQUFnQixFQUFVLEtBQWUsRUFBVSxPQUF5QjtRQUFoRyxpQkFBcUc7UUFBakYsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQWJ6RixrQkFBYSxHQUF1QixJQUFJLENBQUMsT0FBTzthQUNwRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzthQUUzQyxNQUFNLENBQUMsVUFBQyxNQUFzQztZQUM3QyxPQUFBLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBM0IsQ0FBMkIsQ0FBQztRQUExRCxDQUEwRCxDQUMzRDthQUVBLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7YUFDMUMsR0FBRyxDQUFDLFVBQUMsU0FBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLEVBQS9FLENBQStFLENBQUM7YUFDbkcsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLEVBQXhFLENBQXdFLENBQUMsRUFGMUUsQ0FFMEUsQ0FDMUYsQ0FBQztJQUdnRyxDQUFDO0lBYnJHO1FBREMsZ0JBQU0sRUFBRTtrQ0FDYSx1QkFBVTsyREFVNUI7SUFiTyxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FpQmtCLGlCQUFPLEVBQWlCLG9CQUFRLEVBQW1CLHFDQUFnQjtPQWhCckYsZ0JBQWdCLENBaUI1QjtJQUFELHVCQUFDO0NBakJELEFBaUJDLElBQUE7QUFqQlksNENBQWdCIiwiZmlsZSI6ImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuZWZmZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5cbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEZlZUNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2ZlZS1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBGZWVDb25maWdBY3Rpb25zIGZyb20gJy4vZmVlLWNvbmZpZy5hY3Rpb25zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZlZUNvbmZpZ0VmZmVjdHMge1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgbG9hZEZlZUNvbmZpZzogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShGZWVDb25maWdBY3Rpb25zLkxvYWRGZWVDb25maWcuVHlwZSlcblxuICAgIC5maWx0ZXIoKGFjdGlvbjogRmVlQ29uZmlnQWN0aW9ucy5Mb2FkRmVlQ29uZmlnKSA9PlxuICAgICAgIXRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUuZmVlQ29uZmlnLmluaXRpYWxpemVkKVxuICAgIClcblxuICAgIC5zd2l0Y2hNYXAoKCkgPT4gdGhpcy5zZXJ2aWNlLmxvYWRGZWVDb25maWcoKVxuICAgICAgLm1hcCgoZmVlQ29uZmlnKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZmVlQ29uZmlnLmxvYWRGZWVDb25maWdTdWNjZXNzKGZlZUNvbmZpZykpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLCBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSwgcHJpdmF0ZSBzZXJ2aWNlOiBGZWVDb25maWdTZXJ2aWNlKSB7IH1cbn1cbiJdfQ==
