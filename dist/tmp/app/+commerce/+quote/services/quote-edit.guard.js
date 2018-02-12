"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var app_store_1 = require("../../../app.store");
var QuoteEditGuard = (function () {
    function QuoteEditGuard(userCan, store) {
        this.userCan = userCan;
        this.store = store;
    }
    QuoteEditGuard.prototype.canActivate = function (route, state) {
        if (this.userCan.administerQuotes()) {
            return true;
        }
        else {
            this.store.dispatch(function (factory) { return factory.error.handle403Forbidden(); });
            return false;
        }
    };
    QuoteEditGuard.decorators = [
        { type: core_1.Injectable },
    ];
    QuoteEditGuard.ctorParameters = function () { return [
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteEditGuard;
}());
exports.QuoteEditGuard = QuoteEditGuard;
//# sourceMappingURL=quote-edit.guard.js.map