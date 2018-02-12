"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var subclip_markers_1 = require("../../shared/interfaces/subclip-markers");
var aspera_service_1 = require("../../shared/services/aspera.service");
var DeliveryOptionsService = (function () {
    function DeliveryOptionsService(apiService, asperaService) {
        this.apiService = apiService;
        this.asperaService = asperaService;
    }
    DeliveryOptionsService.prototype.getDeliveryOptions = function (assetId, shareKey) {
        var options = {};
        if (shareKey)
            options.overridingToken = shareKey;
        return this.apiService.get(api_interface_1.Api.Assets, "renditionType/deliveryOptions/" + assetId, options).map(this.formatDeliveryOptions);
    };
    DeliveryOptionsService.prototype.deliverAsset = function (assetId, optionId, markers) {
        var parameters = {
            region: 'AAA',
            optionId: String(optionId)
        };
        if (markers) {
            var duration = subclip_markers_1.durationFrom(markers);
            parameters = __assign({}, parameters, { startTime: String(duration.timeStart), endTime: String(duration.timeEnd) });
        }
        return this.apiService.post(api_interface_1.Api.Orders, "order/deliverAsset/" + assetId, {
            loadingIndicator: true,
            parameters: parameters
        });
    };
    DeliveryOptionsService.prototype.initializeAsperaConnection = function (asperaSpec) {
        this.asperaService.initConnect(asperaSpec);
    };
    DeliveryOptionsService.prototype.formatDeliveryOptions = function (options) {
        if (!options.list)
            return [];
        var formattedOptions = [];
        options.list.reduce(function (usedGroupIds, option) {
            var group;
            if (!option.deliveryOptionGroupId) {
                formattedOptions.push([option]);
            }
            else {
                var groupId_1 = option.deliveryOptionGroupId;
                if (!usedGroupIds.includes(groupId_1)) {
                    group = options.list
                        .filter(function (o) { return o.deliveryOptionGroupId === groupId_1; })
                        .sort(function (a, b) { return parseInt(a.deliveryOptionGroupOrder) - parseInt(b.deliveryOptionGroupOrder); });
                    formattedOptions.push(group);
                    usedGroupIds.push(groupId_1);
                }
            }
            return usedGroupIds;
        }, []);
        return formattedOptions;
    };
    DeliveryOptionsService.decorators = [
        { type: core_1.Injectable },
    ];
    DeliveryOptionsService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
        { type: aspera_service_1.AsperaService, },
    ]; };
    return DeliveryOptionsService;
}());
exports.DeliveryOptionsService = DeliveryOptionsService;
//# sourceMappingURL=delivery-options.service.js.map