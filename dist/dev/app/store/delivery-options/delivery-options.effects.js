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
var Observable_1 = require("rxjs/Observable");
var window_ref_service_1 = require("../../shared/services/window-ref.service");
var app_store_1 = require("../../app.store");
var delivery_options_service_1 = require("./delivery-options.service");
var DeliveryOptionsActions = require("./delivery-options.actions");
var DeliveryOptionsEffects = (function () {
    function DeliveryOptionsEffects(actions, store, service, window) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.window = window;
        this.loadDeliveryOptions = this.actions.ofType(DeliveryOptionsActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.getDeliveryOptions(action.activeAsset.assetId, action.shareKey)
                .map(function (options) { return _this.store.create(function (factory) { return factory.deliveryOptions.loadSuccess(options); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.deliveryOptions.loadFailure(error); })); });
        });
        this.deliver = this.actions.ofType(DeliveryOptionsActions.Deliver.Type)
            .switchMap(function (action) {
            return _this.service.deliverAsset(action.assetId, action.option.deliveryOptionId, action.markers)
                .map(function (order) { return _this.store.create(function (factory) { return factory.deliveryOptions.deliverySuccess(order.id, action.option); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.deliveryOptions.deliveryFailure(error); })); });
        });
        this.showSnackbarOnDeliverySuccess = this.actions.ofType(DeliveryOptionsActions.DeliverySuccess.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.snackbar.display('ASSET.DELIVERY_OPTIONS.DELIVERY_SUCCESS', { orderId: action.orderId }); });
        });
        this.recordActivityOnDeliverySuccess = this.actions.ofType(DeliveryOptionsActions.DeliverySuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state.deliveryOptions.activeAssetId; }))
            .map(function (_a) {
            var action = _a[0], assetId = _a[1];
            return _this.store.create(function (factory) { return factory.activity.record(_this.activityOptions(action.option, assetId)); });
        });
        this.deliveryFailure = this.actions.ofType(DeliveryOptionsActions.DeliveryFailure.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.snackbar.display('ASSET.DELIVERY_OPTIONS.DELIVERY_ERROR'); });
        });
        this.download = this.actions.ofType(DeliveryOptionsActions.Download.Type)
            .withLatestFrom(this.store.select(function (state) { return state.deliveryOptions.activeAssetId; }))
            .do(function (_a) {
            var action = _a[0], assetId = _a[1];
            return _this.window.nativeWindow.location.href = action.option.renditionUrl.url;
        })
            .map(function (_a) {
            var action = _a[0], assetId = _a[1];
            return _this.store.create(function (factory) { return factory.activity.record(_this.activityOptions(action.option, assetId)); });
        });
        this.downloadViaAspera = this.actions.ofType(DeliveryOptionsActions.DownloadViaAspera.Type)
            .withLatestFrom(this.store.select(function (state) { return state.deliveryOptions.activeAssetId; }))
            .do(function (_a) {
            var action = _a[0], assetId = _a[1];
            return _this.service.initializeAsperaConnection(action.option.renditionUrl.asperaSpec);
        })
            .map(function (_a) {
            var action = _a[0], assetId = _a[1];
            return _this.store.create(function (factory) { return factory.activity.record(_this.activityOptions(action.option, assetId)); });
        });
        this.setLoadingMessageOnLoad = this.actions.ofType(DeliveryOptionsActions.Load.Type)
            .delay(2000)
            .map(function () { return _this.store.create(function (factory) { return factory.deliveryOptions.setLoadingMessageFlag(); }); });
    }
    DeliveryOptionsEffects.prototype.activityOptions = function (deliveryOption, assetId) {
        return {
            activityName: deliveryOption.deliveryOptionLabel,
            activities: {
                assetId: assetId,
                transferType: deliveryOption.deliveryOptionTransferType,
                sourceUseType: deliveryOption.deliveryOptionUseType
            }
        };
    };
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DeliveryOptionsEffects.prototype, "loadDeliveryOptions", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DeliveryOptionsEffects.prototype, "deliver", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DeliveryOptionsEffects.prototype, "showSnackbarOnDeliverySuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DeliveryOptionsEffects.prototype, "recordActivityOnDeliverySuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DeliveryOptionsEffects.prototype, "deliveryFailure", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DeliveryOptionsEffects.prototype, "download", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DeliveryOptionsEffects.prototype, "downloadViaAspera", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DeliveryOptionsEffects.prototype, "setLoadingMessageOnLoad", void 0);
    DeliveryOptionsEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            delivery_options_service_1.DeliveryOptionsService,
            window_ref_service_1.WindowRef])
    ], DeliveryOptionsEffects);
    return DeliveryOptionsEffects;
}());
exports.DeliveryOptionsEffects = DeliveryOptionsEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyx5Q0FBZ0Q7QUFDaEQsOENBQTZDO0FBRzdDLCtFQUFxRTtBQUNyRSw2Q0FBMkM7QUFJM0MsdUVBQW9FO0FBQ3BFLG1FQUFxRTtBQUdyRTtJQWdFRSxnQ0FDVSxPQUFnQixFQUNoQixLQUFlLEVBQ2YsT0FBK0IsRUFDL0IsTUFBaUI7UUFKM0IsaUJBS0s7UUFKSyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBbEVwQix3QkFBbUIsR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuRyxTQUFTLENBQUMsVUFBQyxNQUFtQztZQUM3QyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztpQkFDekUsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxFQUExRSxDQUEwRSxDQUFDO2lCQUMxRixLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUExQyxDQUEw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RUFFa0Q7SUE5RGpGLHNCQUFzQjtRQURsQyxpQkFBVSxFQUFFO3lDQWtFUSxpQkFBTztZQUNULG9CQUFRO1lBQ04saURBQXNCO1lBQ3ZCLDhCQUFTO09BcEVoQixzQkFBc0IsQ0FpRmxDO0lBQUQsNkJBQUM7Q0FqRkQsQUFpRkMsSUFBQTtBQWpGWSx3REFBc0IiLCJmaWxlIjoiYXBwL3N0b3JlL2RlbGl2ZXJ5LW9wdGlvbnMvZGVsaXZlcnktb3B0aW9ucy5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBEZWxpdmVyeU9wdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Fzc2V0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBY3Rpdml0eU9wdGlvbnMsIEFzc2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEZWxpdmVyeU9wdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9kZWxpdmVyeS1vcHRpb25zLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgRGVsaXZlcnlPcHRpb25zQWN0aW9ucyBmcm9tICcuL2RlbGl2ZXJ5LW9wdGlvbnMuYWN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWxpdmVyeU9wdGlvbnNFZmZlY3RzIHtcbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBsb2FkRGVsaXZlcnlPcHRpb25zOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuTG9hZC5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoKGFjdGlvbjogRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5Mb2FkKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLmdldERlbGl2ZXJ5T3B0aW9ucyhhY3Rpb24uYWN0aXZlQXNzZXQuYXNzZXRJZCwgYWN0aW9uLnNoYXJlS2V5KVxuICAgICAgICAubWFwKG9wdGlvbnMgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmRlbGl2ZXJ5T3B0aW9ucy5sb2FkU3VjY2VzcyhvcHRpb25zKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5kZWxpdmVyeU9wdGlvbnMubG9hZEZhaWx1cmUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGRlbGl2ZXI6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5EZWxpdmVyLlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBEZWxpdmVyeU9wdGlvbnNBY3Rpb25zLkRlbGl2ZXIpID0+XG4gICAgICB0aGlzLnNlcnZpY2UuZGVsaXZlckFzc2V0KGFjdGlvbi5hc3NldElkLCBhY3Rpb24ub3B0aW9uLmRlbGl2ZXJ5T3B0aW9uSWQsIGFjdGlvbi5tYXJrZXJzKVxuICAgICAgICAubWFwKChvcmRlcjogT3JkZXIpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5kZWxpdmVyeU9wdGlvbnMuZGVsaXZlcnlTdWNjZXNzKG9yZGVyLmlkLCBhY3Rpb24ub3B0aW9uKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5kZWxpdmVyeU9wdGlvbnMuZGVsaXZlcnlGYWlsdXJlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBzaG93U25hY2tiYXJPbkRlbGl2ZXJ5U3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShEZWxpdmVyeU9wdGlvbnNBY3Rpb25zLkRlbGl2ZXJ5U3VjY2Vzcy5UeXBlKVxuICAgIC5tYXAoKGFjdGlvbjogRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5EZWxpdmVyeVN1Y2Nlc3MpID0+XG4gICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheShcbiAgICAgICAgJ0FTU0VULkRFTElWRVJZX09QVElPTlMuREVMSVZFUllfU1VDQ0VTUycsXG4gICAgICAgIHsgb3JkZXJJZDogYWN0aW9uLm9yZGVySWQgfVxuICAgICAgKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgcmVjb3JkQWN0aXZpdHlPbkRlbGl2ZXJ5U3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShEZWxpdmVyeU9wdGlvbnNBY3Rpb25zLkRlbGl2ZXJ5U3VjY2Vzcy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5kZWxpdmVyeU9wdGlvbnMuYWN0aXZlQXNzZXRJZCkpXG4gICAgLm1hcCgoW2FjdGlvbiwgYXNzZXRJZF06IFtEZWxpdmVyeU9wdGlvbnNBY3Rpb25zLkRlbGl2ZXJ5U3VjY2VzcywgbnVtYmVyXSkgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5hY3Rpdml0eS5yZWNvcmQodGhpcy5hY3Rpdml0eU9wdGlvbnMoYWN0aW9uLm9wdGlvbiwgYXNzZXRJZCkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBkZWxpdmVyeUZhaWx1cmU6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5EZWxpdmVyeUZhaWx1cmUuVHlwZSlcbiAgICAubWFwKChhY3Rpb246IERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuRGVsaXZlcnlGYWlsdXJlKSA9PlxuICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoJ0FTU0VULkRFTElWRVJZX09QVElPTlMuREVMSVZFUllfRVJST1InKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgZG93bmxvYWQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5Eb3dubG9hZC5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5kZWxpdmVyeU9wdGlvbnMuYWN0aXZlQXNzZXRJZCkpXG4gICAgLmRvKChbYWN0aW9uLCBhc3NldElkXTogW0RlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuRG93bmxvYWQsIG51bWJlcl0pID0+XG4gICAgICB0aGlzLndpbmRvdy5uYXRpdmVXaW5kb3cubG9jYXRpb24uaHJlZiA9IGFjdGlvbi5vcHRpb24ucmVuZGl0aW9uVXJsLnVybFxuICAgIClcbiAgICAubWFwKChbYWN0aW9uLCBhc3NldElkXTogW0RlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuRG93bmxvYWQsIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZpdHkucmVjb3JkKHRoaXMuYWN0aXZpdHlPcHRpb25zKGFjdGlvbi5vcHRpb24sIGFzc2V0SWQpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgZG93bmxvYWRWaWFBc3BlcmE6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5Eb3dubG9hZFZpYUFzcGVyYS5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5kZWxpdmVyeU9wdGlvbnMuYWN0aXZlQXNzZXRJZCkpXG4gICAgLmRvKChbYWN0aW9uLCBhc3NldElkXTogW0RlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuRG93bmxvYWQsIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UuaW5pdGlhbGl6ZUFzcGVyYUNvbm5lY3Rpb24oYWN0aW9uLm9wdGlvbi5yZW5kaXRpb25VcmwuYXNwZXJhU3BlYylcbiAgICApXG4gICAgLm1hcCgoW2FjdGlvbiwgYXNzZXRJZF06IFtEZWxpdmVyeU9wdGlvbnNBY3Rpb25zLkRvd25sb2FkLCBudW1iZXJdKSA9PlxuICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmFjdGl2aXR5LnJlY29yZCh0aGlzLmFjdGl2aXR5T3B0aW9ucyhhY3Rpb24ub3B0aW9uLCBhc3NldElkKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIHNldExvYWRpbmdNZXNzYWdlT25Mb2FkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuTG9hZC5UeXBlKVxuICAgIC5kZWxheSgyMDAwKVxuICAgIC5tYXAoKCkgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmRlbGl2ZXJ5T3B0aW9ucy5zZXRMb2FkaW5nTWVzc2FnZUZsYWcoKSkpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogQWN0aW9ucyxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlbGl2ZXJ5T3B0aW9uc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB3aW5kb3c6IFdpbmRvd1JlZlxuICApIHsgfVxuXG4gIHByaXZhdGUgYWN0aXZpdHlPcHRpb25zKGRlbGl2ZXJ5T3B0aW9uOiBEZWxpdmVyeU9wdGlvbiwgYXNzZXRJZDogbnVtYmVyKTogQWN0aXZpdHlPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aXZpdHlOYW1lOiBkZWxpdmVyeU9wdGlvbi5kZWxpdmVyeU9wdGlvbkxhYmVsLFxuICAgICAgYWN0aXZpdGllczoge1xuICAgICAgICBhc3NldElkLFxuICAgICAgICB0cmFuc2ZlclR5cGU6IGRlbGl2ZXJ5T3B0aW9uLmRlbGl2ZXJ5T3B0aW9uVHJhbnNmZXJUeXBlLFxuICAgICAgICBzb3VyY2VVc2VUeXBlOiBkZWxpdmVyeU9wdGlvbi5kZWxpdmVyeU9wdGlvblVzZVR5cGVcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iXX0=
