"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var app_store_1 = require("../../../app.store");
var CartGuard = (function () {
    function CartGuard(userCan, store) {
        this.userCan = userCan;
        this.store = store;
    }
    CartGuard.prototype.canActivate = function (route, state) {
        if (this.userCan.addToCart()) {
            return true;
        }
        else {
            this.store.dispatch(function (factory) { return factory.error.handle403Forbidden(); });
            return false;
        }
    };
    CartGuard.decorators = [
        { type: core_1.Injectable },
    ];
    CartGuard.ctorParameters = function () { return [
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: app_store_1.AppStore, },
    ]; };
    return CartGuard;
}());
exports.CartGuard = CartGuard;
//# sourceMappingURL=cart.guard.js.map