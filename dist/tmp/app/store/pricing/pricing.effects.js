"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var pricing_service_1 = require("./pricing.service");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var PricingActions = require("./pricing.actions");
var PricingEffects = (function () {
    function PricingEffects(actions, store, service, dialogService) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.dialogService = dialogService;
        this.initializePricing = this.actions.ofType(PricingActions.InitializePricing.Type)
            .withLatestFrom(this.store.select(function (state) { return state.pricing; }))
            .map(function (_a) {
            var action = _a[0], state = _a[1];
            return _this.store.create(_this.nextActionFor(action, state.attributes));
        });
        this.getAttributes = this.actions.ofType(PricingActions.GetAttributes.Type)
            .switchMap(function (action) { return _this.service.getPriceAttributes(action.rightsReproduction)
            .map(function (attributes) { return _this.store.create(function (factory) { return factory.pricing.getAttributesSuccess(attributes, action.rightsReproduction, action.dialogOptions); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.pricing.getAttributesFailure(error); })); }); });
        this.getAttributesSuccess = this.actions.ofType(PricingActions.GetAttributesSuccess.Type)
            .map(function (action) { return _this.store.create(function (factory) {
            return factory.pricing.openDialog(action.dialogOptions);
        }); });
        this.calculatePrice = this.actions.ofType(PricingActions.CalculatePrice.Type)
            .switchMap(function (action) {
            return _this.service.getPrice(action.selectedAttributes, action.assetId, action.subclipMarkers)
                .map(function (price) { return _this.store.create(function (factory) { return factory.pricing.calculatePriceSuccess(price); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.pricing.calculatePriceFailure(error); })); });
        });
        this.calculatePriceSuccess = this.actions.ofType(PricingActions.CalculatePriceSuccess.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.pricing.setPriceForDialog(action.price); });
        });
        this.openDialog = this.actions.ofType(PricingActions.OpenDialog.Type)
            .do(function (action) { return _this.dialogService.openComponentInDialog(action.dialogOptions); });
    }
    PricingEffects.prototype.nextActionFor = function (action, attributes) {
        if (attributes === null) {
            return function (factory) { return factory.pricing.getAttributes(action.rightsReproduction, action.dialogOptions); };
        }
        return function (factory) { return factory.pricing.openDialog(action.dialogOptions); };
    };
    PricingEffects.decorators = [
        { type: core_1.Injectable },
    ];
    PricingEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: pricing_service_1.PricingService, },
        { type: wz_dialog_service_1.WzDialogService, },
    ]; };
    PricingEffects.propDecorators = {
        'initializePricing': [{ type: effects_1.Effect },],
        'getAttributes': [{ type: effects_1.Effect },],
        'getAttributesSuccess': [{ type: effects_1.Effect },],
        'calculatePrice': [{ type: effects_1.Effect },],
        'calculatePriceSuccess': [{ type: effects_1.Effect },],
        'openDialog': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
    };
    return PricingEffects;
}());
exports.PricingEffects = PricingEffects;
//# sourceMappingURL=pricing.effects.js.map