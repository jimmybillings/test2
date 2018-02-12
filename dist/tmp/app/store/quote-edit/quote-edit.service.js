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
var common_functions_1 = require("../../shared/utilities/common.functions");
var core_1 = require("@angular/core");
var SubclipMarkersInterface = require("../../shared/interfaces/subclip-markers");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var subclip_markers_1 = require("../../shared/interfaces/subclip-markers");
var FutureQuoteEditService = (function () {
    function FutureQuoteEditService(apiService) {
        this.apiService = apiService;
    }
    FutureQuoteEditService.prototype.load = function () {
        return this.apiService.get(api_interface_1.Api.Orders, 'quote/focused', { loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.delete = function (quoteId) {
        var _this = this;
        return this.apiService.delete(api_interface_1.Api.Orders, "quote/" + quoteId, { loadingIndicator: 'onBeforeRequest' })
            .switchMap(function () { return _this.load(); });
    };
    FutureQuoteEditService.prototype.addProject = function (quoteId) {
        return this.apiService.post(api_interface_1.Api.Orders, "quote/" + quoteId + "/project", { loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.removeProject = function (quoteId, projectId) {
        return this.apiService.delete(api_interface_1.Api.Orders, "quote/" + quoteId + "/project/" + projectId, { loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.updateProject = function (quoteId, project) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/project", { body: project, loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.moveLineItem = function (quoteId, project, lineItem) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/move/lineItem", { parameters: { lineItemId: lineItem.id, projectId: project.id }, loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.cloneLineItem = function (quoteId, lineItem) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/clone/lineItem", { parameters: { lineItemId: lineItem.id }, loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.editLineItemFromDetails = function (quoteId, lineItem, markers, attributes) {
        var duration = this.durationFrom(lineItem, markers);
        var newAttributes = attributes ? attributes : lineItem.attributes || [];
        var newAsset = __assign({}, lineItem.asset, duration);
        var newLineItem = __assign({}, lineItem, { attributes: newAttributes, asset: newAsset });
        return this.makeEditLineItemRequest(quoteId, newLineItem);
    };
    FutureQuoteEditService.prototype.removeAsset = function (quoteId, asset) {
        return this.apiService.delete(api_interface_1.Api.Orders, "quote/" + quoteId + "/asset/" + asset.uuid, { loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.addCustomPriceToLineItem = function (quoteId, lineItem, customPrice) {
        var multiplier = Math.round((customPrice / lineItem.itemPrice) * Math.pow(10, 6)) / Math.pow(10, 6);
        var newLineItem = __assign({}, lineItem, { multiplier: multiplier });
        return this.makeEditLineItemRequest(quoteId, newLineItem);
    };
    FutureQuoteEditService.prototype.createQuote = function () {
        return this.apiService.post(api_interface_1.Api.Orders, 'quote', { loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.sendQuote = function (quoteId, ownerEmail, body) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/send/" + quoteId, { body: body, parameters: { ownerEmail: ownerEmail }, loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.cloneQuote = function (quote) {
        common_functions_1.Common.deletePropertiesFromObject(quote, [
            'id', 'createdUserId', 'ownerUserId', 'createdOn', 'lastUpdated', 'expirationDate', 'quoteStatus',
            'paymentTerms', 'poNumber', 'bulkOrderId', 'poReference', 'campaignReference', 'orderId', 'billingAccountId',
            'invoiceContact', 'salesManager', 'ownerData', 'billingAccountData', 'userId', 'externalLicenseIds', 'internalLicenseIds',
            'externalAgreementIds', 'internalAgreementIds'
        ]);
        return this.apiService.post(api_interface_1.Api.Orders, 'quote', {
            loadingIndicator: true,
            body: quote
        });
    };
    FutureQuoteEditService.prototype.updateQuoteField = function (quoteField, quote) {
        var property = Object.keys(quoteField)[0];
        if (quoteField[property] === '') {
            delete quote[property];
        }
        else {
            quote = __assign({}, quote, quoteField);
        }
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quote.id, { body: quote, loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.editLineItemMarkers = function (quoteId, lineItem, newMarkers) {
        var duration = SubclipMarkersInterface.durationFrom(newMarkers);
        Object.assign(lineItem.asset, duration);
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/update/lineItem/" + lineItem.id, { body: lineItem, parameters: { region: 'AAA' }, loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.updateProjectPriceAttributes = function (quoteId, priceAttributes, project) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/project/priceAttributes/" + project.id, { body: priceAttributes, loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.editLineItem = function (quoteId, lineItem, fieldToEdit) {
        if (!!fieldToEdit.pricingAttributes) {
            fieldToEdit = { attributes: fieldToEdit.pricingAttributes };
        }
        return this.makeEditLineItemRequest(quoteId, Object.assign(lineItem, fieldToEdit));
    };
    FutureQuoteEditService.prototype.addFeeTo = function (quoteId, project, fee) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/fee/lineItem", { body: fee, parameters: { projectName: project.name }, loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.removeFee = function (quoteId, fee) {
        return this.apiService.delete(api_interface_1.Api.Orders, "quote/" + quoteId + "/fee/" + fee.id, { loadingIndicator: true });
    };
    FutureQuoteEditService.prototype.bulkImport = function (quoteId, rawAssets, projectId) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/asset/direct/lineItem", {
            body: rawAssets,
            parameters: { projectId: projectId },
            loadingIndicator: true
        });
    };
    FutureQuoteEditService.prototype.addAssetToProjectInQuote = function (quoteId, existingProjectNames, addAssetParameters) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/asset/lineItem", {
            body: this.formatAssetBody(addAssetParameters),
            parameters: { projectName: existingProjectNames[existingProjectNames.length - 1], region: 'AAA' },
            loadingIndicator: true
        });
    };
    FutureQuoteEditService.prototype.addNote = function (quoteId, note, lineItem) {
        if (lineItem.hasOwnProperty('notes') && Array.isArray(lineItem.notes)) {
            lineItem.notes[0] = { notes: [note] };
        }
        else {
            lineItem.notes = [{ notes: [note] }];
        }
        return this.makeEditLineItemRequest(quoteId, lineItem);
    };
    FutureQuoteEditService.prototype.removeNote = function (quoteId, lineItem) {
        var clonedLineItem = common_functions_1.Common.clone(lineItem);
        delete clonedLineItem.notes;
        return this.makeEditLineItemRequest(quoteId, clonedLineItem);
    };
    FutureQuoteEditService.prototype.formatAssetBody = function (parameters) {
        var formatted = {};
        Object.assign(formatted, { lineItem: this.formatLineItem(parameters.lineItem, parameters.markers) });
        if (parameters.attributes) {
            Object.assign(formatted, { attributes: parameters.attributes });
        }
        return formatted;
    };
    FutureQuoteEditService.prototype.formatLineItem = function (lineItem, markers) {
        return Object.assign({}, lineItem, { asset: this.formatAsset(lineItem.asset, markers) });
    };
    FutureQuoteEditService.prototype.formatAsset = function (asset, markers) {
        var timeStart;
        var timeEnd;
        if (markers) {
            var duration = SubclipMarkersInterface.durationFrom(markers);
            timeStart = duration.timeStart;
            timeEnd = duration.timeEnd;
        }
        else {
            timeStart = asset.timeStart;
            timeEnd = asset.timeEnd;
        }
        return { assetId: asset.assetId, timeStart: timeStart >= 0 ? timeStart : -1, timeEnd: timeEnd >= 0 ? timeEnd : -2 };
    };
    FutureQuoteEditService.prototype.durationFrom = function (lineItem, markers) {
        return subclip_markers_1.bothMarkersAreSet(markers) ?
            subclip_markers_1.durationFrom(markers) : { timeStart: lineItem.asset.timeStart, timeEnd: lineItem.asset.timeEnd };
    };
    FutureQuoteEditService.prototype.makeEditLineItemRequest = function (quoteId, lineItem) {
        return this.apiService.put(api_interface_1.Api.Orders, "quote/" + quoteId + "/update/lineItem/" + lineItem.id, { body: lineItem, parameters: { region: 'AAA' }, loadingIndicator: true });
    };
    FutureQuoteEditService.decorators = [
        { type: core_1.Injectable },
    ];
    FutureQuoteEditService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return FutureQuoteEditService;
}());
exports.FutureQuoteEditService = FutureQuoteEditService;
//# sourceMappingURL=quote-edit.service.js.map