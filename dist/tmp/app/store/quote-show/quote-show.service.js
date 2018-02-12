"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var FutureQuoteShowService = (function () {
    function FutureQuoteShowService(apiService) {
        this.apiService = apiService;
    }
    FutureQuoteShowService.prototype.load = function (quoteId) {
        return this.apiService.get(api_interface_1.Api.Orders, "quote/" + quoteId, { loadingIndicator: true });
    };
    FutureQuoteShowService.decorators = [
        { type: core_1.Injectable },
    ];
    FutureQuoteShowService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return FutureQuoteShowService;
}());
exports.FutureQuoteShowService = FutureQuoteShowService;
//# sourceMappingURL=quote-show.service.js.map