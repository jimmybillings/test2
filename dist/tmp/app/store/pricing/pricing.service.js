"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var PricingService = (function () {
    function PricingService(apiService) {
        this.apiService = apiService;
    }
    PricingService.prototype.getPrice = function (attributes, assetId, markers) {
        var parameters = Object.assign({ region: 'AAA' }, { attributes: this.formatAttributes(attributes) }, markers ? this.formatDurationParametersFor(markers) : null);
        return this.apiService.get(api_interface_1.Api.Orders, "priceBook/price/" + assetId, { parameters: parameters }).map(function (data) { return data.price; });
    };
    PricingService.prototype.getPriceAttributes = function (priceModel) {
        priceModel = priceModel.split(' ').join('');
        return this.apiService.get(api_interface_1.Api.Orders, 'priceBook/priceAttributes', { parameters: { region: 'AAA', priceModel: priceModel } }).map(function (data) {
            data.list[0].primary = true;
            return data.list;
        });
    };
    PricingService.prototype.formatAttributes = function (attrs) {
        var formatted = [];
        for (var attr in attrs) {
            formatted.push(attr + ":" + attrs[attr]);
        }
        return formatted.join(',');
    };
    PricingService.prototype.formatDurationParametersFor = function (markers) {
        return {
            startSecond: markers.in.asMilliseconds(), endSecond: markers.out.asMilliseconds()
        };
    };
    PricingService.decorators = [
        { type: core_1.Injectable },
    ];
    PricingService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return PricingService;
}());
exports.PricingService = PricingService;
//# sourceMappingURL=pricing.service.js.map