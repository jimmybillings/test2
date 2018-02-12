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
var common_functions_1 = require("../../shared/utilities/common.functions");
var FutureCartService = (function () {
    function FutureCartService(apiService) {
        this.apiService = apiService;
    }
    FutureCartService.prototype.load = function () {
        return this.apiService.get(api_interface_1.Api.Orders, 'cart', { loadingIndicator: true });
    };
    FutureCartService.prototype.editLineItem = function (lineItem, markers, attributes) {
        var duration = this.durationFrom(lineItem, markers);
        var newAttributes = attributes ? attributes : lineItem.attributes || [];
        var newAsset = __assign({}, lineItem.asset, duration);
        var newLineItem = __assign({}, lineItem, { attributes: newAttributes, asset: newAsset });
        return this.makeEditLineItemRequest(newLineItem);
    };
    FutureCartService.prototype.removeAsset = function (asset) {
        return this.apiService.delete(api_interface_1.Api.Orders, "cart/asset/" + asset.uuid, { loadingIndicator: true });
    };
    FutureCartService.prototype.addNote = function (note, lineItem) {
        if (lineItem.hasOwnProperty('notes') && Array.isArray(lineItem.notes)) {
            lineItem.notes[0] = { notes: [note] };
        }
        else {
            lineItem.notes = [{ notes: [note] }];
        }
        return this.makeEditLineItemRequest(lineItem);
    };
    FutureCartService.prototype.removeNoteFrom = function (lineItem) {
        var clonedLineItem = common_functions_1.Common.clone(lineItem);
        delete clonedLineItem.notes;
        return this.makeEditLineItemRequest(clonedLineItem);
    };
    FutureCartService.prototype.durationFrom = function (lineItem, markers) {
        return subclip_markers_1.bothMarkersAreSet(markers) ?
            subclip_markers_1.durationFrom(markers) : { timeStart: lineItem.asset.timeStart, timeEnd: lineItem.asset.timeEnd };
    };
    FutureCartService.prototype.makeEditLineItemRequest = function (lineItem) {
        return this.apiService.put(api_interface_1.Api.Orders, "cart/update/lineItem/" + lineItem.id, { body: lineItem, parameters: { region: 'AAA' }, loadingIndicator: true });
    };
    FutureCartService.decorators = [
        { type: core_1.Injectable },
    ];
    FutureCartService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return FutureCartService;
}());
exports.FutureCartService = FutureCartService;
//# sourceMappingURL=cart.service.js.map