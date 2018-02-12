"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var InvoiceActions = require("./invoice.actions");
var app_store_1 = require("../../app.store");
var invoice_service_1 = require("./invoice.service");
var InvoiceEffects = (function () {
    function InvoiceEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(InvoiceActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.load(action.orderId, action.shareKey)
                .map(function (invoice) { return _this.store.create(function (factory) { return factory.invoice.loadSuccess(invoice); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.invoice.loadFailure(error); })); });
        });
    }
    InvoiceEffects.decorators = [
        { type: core_1.Injectable },
    ];
    InvoiceEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: invoice_service_1.InvoiceService, },
    ]; };
    InvoiceEffects.propDecorators = {
        'load': [{ type: effects_1.Effect },],
    };
    return InvoiceEffects;
}());
exports.InvoiceEffects = InvoiceEffects;
//# sourceMappingURL=invoice.effects.js.map