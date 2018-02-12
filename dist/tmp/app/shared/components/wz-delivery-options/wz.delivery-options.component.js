"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var WzDeliveryOptionsComponent = (function () {
    function WzDeliveryOptionsComponent(store) {
        this.store = store;
        this.markers = null;
    }
    WzDeliveryOptionsComponent.prototype.ngOnInit = function () {
        this.deliveryOptions = this.store.select(function (state) { return state.deliveryOptions.options; });
        this.showMissingOptionsMessage = this.store.select(function (state) {
            return !state.deliveryOptions.loading && !state.deliveryOptions.hasDeliveryOptions;
        });
        this.showLoadingSpinner = this.store.select(function (state) { return state.deliveryOptions.loading; });
        this.showLoadingMessage = this.store.select(function (state) { return state.deliveryOptions.showLoadingMessage; });
    };
    WzDeliveryOptionsComponent.prototype.iconStringFor = function (option) {
        return "ASSET.DELIVERY_OPTIONS.ICON." + option.deliveryOptionTransferType;
    };
    WzDeliveryOptionsComponent.prototype.trStringFor = function (group) {
        return "ASSET.DELIVERY_OPTIONS.LABEL." + group[0].deliveryOptionLabel;
    };
    WzDeliveryOptionsComponent.prototype.onDownloadBtnClick = function (option) {
        this.store.dispatch(this.factoryMapperFor(option));
    };
    WzDeliveryOptionsComponent.prototype.factoryMapperFor = function (option) {
        var _this = this;
        switch (option.deliveryOptionTransferType) {
            case 'location':
                return function (factory) { return factory.deliveryOptions.deliver(_this.assetId, option, _this.markers); };
            case 'download':
                return function (factory) { return factory.deliveryOptions.download(option); };
            case 'aspera':
                return function (factory) { return factory.deliveryOptions.downloadViaAspera(option); };
            default:
                return function (factory) { return factory.snackbar.display('DELIVERY_OPTIONS.DELIVERY_ERROR'); };
        }
    };
    WzDeliveryOptionsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-delivery-options',
                    templateUrl: './wz.delivery-options.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzDeliveryOptionsComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    WzDeliveryOptionsComponent.propDecorators = {
        'assetId': [{ type: core_1.Input },],
        'markers': [{ type: core_1.Input },],
    };
    return WzDeliveryOptionsComponent;
}());
exports.WzDeliveryOptionsComponent = WzDeliveryOptionsComponent;
//# sourceMappingURL=wz.delivery-options.component.js.map