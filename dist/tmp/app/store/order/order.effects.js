"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var OrderActions = require("./order.actions");
var app_store_1 = require("../../app.store");
var order_service_1 = require("./order.service");
var OrderEffects = (function () {
    function OrderEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(OrderActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.load(action.orderId)
                .map(function (order) { return _this.store.create(function (factory) { return factory.order.loadSuccess(order); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.order.loadFailure(error); })); });
        });
        this.loadSuccess = this.actions.ofType(OrderActions.LoadSuccess.Type)
            .filter(function (action) { return _this.store.match(true, function (state) { return state.order.checkingOut; }); })
            .mergeMap(function (action) { return Observable_1.Observable.from([
            _this.store.create(function (factory) { return factory.order.setCheckoutState(false); }),
            _this.store.create(function (factory) { return factory.cart.load(); })
        ]); });
    }
    OrderEffects.decorators = [
        { type: core_1.Injectable },
    ];
    OrderEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: order_service_1.OrderService, },
    ]; };
    OrderEffects.propDecorators = {
        'load': [{ type: effects_1.Effect },],
        'loadSuccess': [{ type: effects_1.Effect },],
    };
    return OrderEffects;
}());
exports.OrderEffects = OrderEffects;
//# sourceMappingURL=order.effects.js.map