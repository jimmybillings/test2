"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var PurchaseOrderInputComponent = (function () {
    function PurchaseOrderInputComponent(store) {
        this.store = store;
    }
    PurchaseOrderInputComponent.prototype.ngOnInit = function () {
        this.PurchaseOrderFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config.addPurchaseOrderId.items; });
    };
    PurchaseOrderInputComponent.prototype.onBlur = function (form) {
        this.store.dispatch(function (factory) { return factory.checkout.setPurchaseOrderId(form.purchaseOrderId); });
    };
    PurchaseOrderInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'purchase-order-input-component',
                    template: "\n    <wz-form\n      [includeSubmit]=\"false\"\n      [includeCancel]=\"false\"\n      [items]=\"PurchaseOrderFormConfig\"\n      (blur)=\"onBlur($event)\">\n    </wz-form>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    PurchaseOrderInputComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return PurchaseOrderInputComponent;
}());
exports.PurchaseOrderInputComponent = PurchaseOrderInputComponent;
//# sourceMappingURL=purchase-order-input.component.js.map