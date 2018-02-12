"use strict";
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
    DeliveryOptionsEffects.decorators = [
        { type: core_1.Injectable },
    ];
    DeliveryOptionsEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: delivery_options_service_1.DeliveryOptionsService, },
        { type: window_ref_service_1.WindowRef, },
    ]; };
    DeliveryOptionsEffects.propDecorators = {
        'loadDeliveryOptions': [{ type: effects_1.Effect },],
        'deliver': [{ type: effects_1.Effect },],
        'showSnackbarOnDeliverySuccess': [{ type: effects_1.Effect },],
        'recordActivityOnDeliverySuccess': [{ type: effects_1.Effect },],
        'deliveryFailure': [{ type: effects_1.Effect },],
        'download': [{ type: effects_1.Effect },],
        'downloadViaAspera': [{ type: effects_1.Effect },],
        'setLoadingMessageOnLoad': [{ type: effects_1.Effect },],
    };
    return DeliveryOptionsEffects;
}());
exports.DeliveryOptionsEffects = DeliveryOptionsEffects;
//# sourceMappingURL=delivery-options.effects.js.map