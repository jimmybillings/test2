"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var quotes_service_1 = require("../../../shared/services/quotes.service");
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var QuotesResolver = (function () {
    function QuotesResolver(quotesService, userCan) {
        this.quotesService = quotesService;
        this.userCan = userCan;
    }
    QuotesResolver.prototype.resolve = function (route) {
        this.quotesService.getQuotes(this.userCan.administerQuotes(), common_functions_1.Common.clone(route.params)).subscribe();
        return this.quotesService.data.map((function (data) { return data.items !== null; })).filter(function (data) { return data; }).take(1);
    };
    QuotesResolver.decorators = [
        { type: core_1.Injectable },
    ];
    QuotesResolver.ctorParameters = function () { return [
        { type: quotes_service_1.QuotesService, },
        { type: commerce_capabilities_1.CommerceCapabilities, },
    ]; };
    return QuotesResolver;
}());
exports.QuotesResolver = QuotesResolver;
//# sourceMappingURL=quotes.resolver.js.map