"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
    FutureQuoteEditService.prototype.addCustomPriceToLineItem = function (quoteId, lineItem, customPrice, override) {
        var multiplier = Math.round((customPrice / lineItem.itemPrice) * Math.pow(10, 6)) / Math.pow(10, 6);
        var newLineItem = __assign({}, lineItem, { multiplier: (override) ? null : multiplier, overrideGrossAssetPrice: (override) ? customPrice : null });
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
    FutureQuoteEditService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], FutureQuoteEditService);
    return FutureQuoteEditService;
}());
exports.FutureQuoteEditService = FutureQuoteEditService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1lZGl0L3F1b3RlLWVkaXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQWlFO0FBQ2pFLHNDQUEyQztBQUUzQyxpRkFBbUY7QUFTbkYsa0RBQXNEO0FBQ3RELHVFQUEyRTtBQUMzRSwyRUFBb0g7QUFLcEg7SUFDRSxnQ0FBb0IsVUFBNEI7UUFBNUIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7SUFBSSxDQUFDO0lBRzlDLHFDQUFJLEdBQVg7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQUcsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRU0sdUNBQU0sR0FBYixVQUFjLE9BQWU7UUFBN0IsaUJBR0M7UUFGQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsbUJBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBUyxPQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2FBQ25HLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSwyQ0FBVSxHQUFqQixVQUFrQixPQUFlO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSxXQUFTLE9BQU8sYUFBVSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU0sOENBQWEsR0FBcEIsVUFBcUIsT0FBZSxFQUFFLFNBQWlCO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSxXQUFTLE9BQU8s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bUJBQUcsQ0FBQyxNQUFNLEVBQ1YsV0FBUyxPQUFPLHlCQUFvQixRQUFRLENBQUMsRUFBSSxFQUNqRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUMxRSxDQUFDO0lBQ0osQ0FBQztJQTFQVSxzQkFBc0I7UUFEbEMsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLHNCQUFzQixDQTJQbEM7SUFBRCw2QkFBQztDQTNQRCxBQTJQQyxJQUFBO0FBM1BZLHdEQUFzQiIsImZpbGUiOiJhcHAvc3RvcmUvcXVvdGUtZWRpdC9xdW90ZS1lZGl0LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgKiBhcyBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuXG5pbXBvcnQge1xuICBBZGRBc3NldFBhcmFtZXRlcnMsXG4gIEVkaXRhYmxlUXVvdGVGaWVsZHMsXG4gIEZlZUxpbmVJdGVtLFxuICBQcm9qZWN0LFxuICBRdW90ZSxcbn0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZ1dHVyZUFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpLCBBcGlQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdWJjbGlwTWFya2VycywgRHVyYXRpb24sIGR1cmF0aW9uRnJvbSwgYm90aE1hcmtlcnNBcmVTZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuaW1wb3J0IHsgQXNzZXRMaW5lSXRlbSwgQXNzZXQsIFF1b3RlT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQb2pvLCBTZWxlY3RlZFByaWNlQXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGdXR1cmVRdW90ZUVkaXRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlTZXJ2aWNlOiBGdXR1cmVBcGlTZXJ2aWNlKSB7IH1cblxuXG4gIHB1YmxpYyBsb2FkKCk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmdldChBcGkuT3JkZXJzLCAncXVvdGUvZm9jdXNlZCcsIHsgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUocXVvdGVJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZGVsZXRlKEFwaS5PcmRlcnMsIGBxdW90ZS8ke3F1b3RlSWR9YCwgeyBsb2FkaW5nSW5kaWNhdG9yOiAnb25CZWZvcmVSZXF1ZXN0JyB9KVxuICAgICAgLnN3aXRjaE1hcCgoKSA9PiB0aGlzLmxvYWQoKSk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvamVjdChxdW90ZUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPFF1b3RlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5wb3N0KEFwaS5PcmRlcnMsIGBxdW90ZS8ke3F1b3RlSWR9L3Byb2plY3RgLCB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlUHJvamVjdChxdW90ZUlkOiBudW1iZXIsIHByb2plY3RJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZGVsZXRlKEFwaS5PcmRlcnMsIGBxdW90ZS8ke3F1b3RlSWR9L3Byb2plY3QvJHtwcm9qZWN0SWR9YCwgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVByb2plY3QocXVvdGVJZDogbnVtYmVyLCBwcm9qZWN0OiBQcm9qZWN0KTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UucHV0KEFwaS5PcmRlcnMsIGBxdW90ZS8ke3F1b3RlSWR9L3Byb2plY3RgLCB7IGJvZHk6IHByb2plY3QsIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgbW92ZUxpbmVJdGVtKHF1b3RlSWQ6IG51bWJlciwgcHJvamVjdDogUHJvamVjdCwgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBPYnNlcnZhYmxlPFF1b3RlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5wdXQoXG4gICAgICBBcGkuT3JkZXJzLFxuICAgICAgYHF1b3RlLyR7cXVvdGVJZH0vbW92ZS9saW5lSXRlbWAsXG4gICAgICB7IHBhcmFtZXRlcnM6IHsgbGluZUl0ZW1JZDogbGluZUl0ZW0uaWQsIHByb2plY3RJZDogcHJvamVjdC5pZCB9LCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNsb25lTGluZUl0ZW0ocXVvdGVJZDogbnVtYmVyLCBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnB1dChBcGkuT3JkZXJzLCBgcXVvdGUvJHtxdW90ZUlkfS9jbG9uZS9saW5lSXRlbWAsXG4gICAgICB7IHBhcmFtZXRlcnM6IHsgbGluZUl0ZW1JZDogbGluZUl0ZW0uaWQgfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0TGluZUl0ZW1Gcm9tRGV0YWlscyhcbiAgICBxdW90ZUlkOiBudW1iZXIsXG4gICAgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0sXG4gICAgbWFya2VyczogU3ViY2xpcE1hcmtlcnMsXG4gICAgYXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdXG4gICk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICBjb25zdCBkdXJhdGlvbjogRHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uRnJvbShsaW5lSXRlbSwgbWFya2Vycyk7XG4gICAgY29uc3QgbmV3QXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdID0gYXR0cmlidXRlcyA/IGF0dHJpYnV0ZXMgOiBsaW5lSXRlbS5hdHRyaWJ1dGVzIHx8IFtdO1xuICAgIGNvbnN0IG5ld0Fzc2V0OiBBc3NldCA9IHsgLi4ubGluZUl0ZW0uYXNzZXQsIC4uLmR1cmF0aW9uIH07XG5cbiAgICBjb25zdCBuZXdMaW5lSXRlbSA9IHtcbiAgICAgIC4uLmxpbmVJdGVtLFxuICAgICAgYXR0cmlidXRlczogbmV3QXR0cmlidXRlcyxcbiAgICAgIGFzc2V0OiBuZXdBc3NldFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5tYWtlRWRpdExpbmVJdGVtUmVxdWVzdChxdW90ZUlkLCBuZXdMaW5lSXRlbSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQXNzZXQocXVvdGVJZDogbnVtYmVyLCBhc3NldDogQXNzZXQpOiBPYnNlcnZhYmxlPFF1b3RlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5kZWxldGUoQXBpLk9yZGVycywgYHF1b3RlLyR7cXVvdGVJZH0vYXNzZXQvJHthc3NldC51dWlkfWAsIHsgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDdXN0b21QcmljZVRvTGluZUl0ZW0ocXVvdGVJZDogbnVtYmVyLCBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSwgY3VzdG9tUHJpY2U6IG51bWJlciwgb3ZlcnJpZGU6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFF1b3RlPiB7XG4gICAgY29uc3QgbXVsdGlwbGllcjogbnVtYmVyID0gTWF0aC5yb3VuZCgoY3VzdG9tUHJpY2UgLyBsaW5lSXRlbS5pdGVtUHJpY2UpICogTWF0aC5wb3coMTAsIDYpKSAvIE1hdGgucG93KDEwLCA2KTtcblxuICAgIGNvbnN0IG5ld0xpbmVJdGVtOiBBc3NldExpbmVJdGVtID0ge1xuICAgICAgLi4ubGluZUl0ZW0sXG4gICAgICBtdWx0aXBsaWVyOiAob3ZlcnJpZGUpID8gbnVsbCA6IG11bHRpcGxpZXIsXG4gICAgICBvdmVycmlkZUdyb3NzQXNzZXRQcmljZTogKG92ZXJyaWRlKSA/IGN1c3RvbVByaWNlIDogbnVsbFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5tYWtlRWRpdExpbmVJdGVtUmVxdWVzdChxdW90ZUlkLCBuZXdMaW5lSXRlbSk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlUXVvdGUoKTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UucG9zdChBcGkuT3JkZXJzLCAncXVvdGUnLCB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgc2VuZFF1b3RlKHF1b3RlSWQ6IG51bWJlciwgb3duZXJFbWFpbDogc3RyaW5nLCBib2R5OiBQb2pvKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnB1dChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICBgcXVvdGUvc2VuZC8ke3F1b3RlSWR9YCxcbiAgICAgIHsgYm9keTogYm9keSwgcGFyYW1ldGVyczogeyBvd25lckVtYWlsOiBvd25lckVtYWlsIH0sIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2xvbmVRdW90ZShxdW90ZTogUXVvdGUpOiBPYnNlcnZhYmxlPFF1b3RlPiB7XG4gICAgQ29tbW9uLmRlbGV0ZVByb3BlcnRpZXNGcm9tT2JqZWN0KFxuICAgICAgcXVvdGUsXG4gICAgICBbXG4gICAgICAgICdpZCcsICdjcmVhdGVkVXNlcklkJywgJ293bmVyVXNlcklkJywgJ2NyZWF0ZWRPbicsICdsYXN0VXBkYXRlZCcsICdleHBpcmF0aW9uRGF0ZScsICdxdW90ZVN0YXR1cycsXG4gICAgICAgICdwYXltZW50VGVybXMnLCAncG9OdW1iZXInLCAnYnVsa09yZGVySWQnLCAncG9SZWZlcmVuY2UnLCAnY2FtcGFpZ25SZWZlcmVuY2UnLCAnb3JkZXJJZCcsICdiaWxsaW5nQWNjb3VudElkJyxcbiAgICAgICAgJ2ludm9pY2VDb250YWN0JywgJ3NhbGVzTWFuYWdlcicsICdvd25lckRhdGEnLCAnYmlsbGluZ0FjY291bnREYXRhJywgJ3VzZXJJZCcsICdleHRlcm5hbExpY2Vuc2VJZHMnLCAnaW50ZXJuYWxMaWNlbnNlSWRzJyxcbiAgICAgICAgJ2V4dGVybmFsQWdyZWVtZW50SWRzJywgJ2ludGVybmFsQWdyZWVtZW50SWRzJ1xuICAgICAgXVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5wb3N0KEFwaS5PcmRlcnMsICdxdW90ZScsXG4gICAgICB7XG4gICAgICAgIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUsXG4gICAgICAgIGJvZHk6IHF1b3RlXG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVRdW90ZUZpZWxkKHF1b3RlRmllbGQ6IFBvam8sIHF1b3RlOiBRdW90ZSk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICBsZXQgcHJvcGVydHk6IEVkaXRhYmxlUXVvdGVGaWVsZHMgPSBPYmplY3Qua2V5cyhxdW90ZUZpZWxkKVswXSBhcyBFZGl0YWJsZVF1b3RlRmllbGRzO1xuICAgIGlmIChxdW90ZUZpZWxkW3Byb3BlcnR5XSA9PT0gJycpIHtcbiAgICAgIGRlbGV0ZSBxdW90ZVtwcm9wZXJ0eV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1b3RlID0geyAuLi5xdW90ZSwgLi4ucXVvdGVGaWVsZCB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UucHV0KFxuICAgICAgQXBpLk9yZGVycyxcbiAgICAgIGBxdW90ZS8ke3F1b3RlLmlkfWAsXG4gICAgICB7IGJvZHk6IHF1b3RlLCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0sXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0TGluZUl0ZW1NYXJrZXJzKFxuICAgIHF1b3RlSWQ6IG51bWJlcixcbiAgICBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSxcbiAgICBuZXdNYXJrZXJzOiBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5TdWJjbGlwTWFya2Vycyk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICBjb25zdCBkdXJhdGlvbjogU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuRHVyYXRpb24gPSBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5kdXJhdGlvbkZyb20obmV3TWFya2Vycyk7XG5cbiAgICBPYmplY3QuYXNzaWduKGxpbmVJdGVtLmFzc2V0LCBkdXJhdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnB1dChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICBgcXVvdGUvJHtxdW90ZUlkfS91cGRhdGUvbGluZUl0ZW0vJHtsaW5lSXRlbS5pZH1gLFxuICAgICAgeyBib2R5OiBsaW5lSXRlbSwgcGFyYW1ldGVyczogeyByZWdpb246ICdBQUEnIH0sIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlUHJvamVjdFByaWNlQXR0cmlidXRlcyhcbiAgICBxdW90ZUlkOiBudW1iZXIsIHByaWNlQXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdLCBwcm9qZWN0OiBQcm9qZWN0XG4gICk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnB1dChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICBgcXVvdGUvJHtxdW90ZUlkfS9wcm9qZWN0L3ByaWNlQXR0cmlidXRlcy8ke3Byb2plY3QuaWR9YCxcbiAgICAgIHsgYm9keTogcHJpY2VBdHRyaWJ1dGVzLCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGVkaXRMaW5lSXRlbShxdW90ZUlkOiBudW1iZXIsIGxpbmVJdGVtOiBBc3NldExpbmVJdGVtLCBmaWVsZFRvRWRpdDogYW55KTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIGlmICghIWZpZWxkVG9FZGl0LnByaWNpbmdBdHRyaWJ1dGVzKSB7XG4gICAgICBmaWVsZFRvRWRpdCA9IHsgYXR0cmlidXRlczogZmllbGRUb0VkaXQucHJpY2luZ0F0dHJpYnV0ZXMgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYWtlRWRpdExpbmVJdGVtUmVxdWVzdChxdW90ZUlkLCBPYmplY3QuYXNzaWduKGxpbmVJdGVtLCBmaWVsZFRvRWRpdCkpO1xuICB9XG5cbiAgcHVibGljIGFkZEZlZVRvKHF1b3RlSWQ6IG51bWJlciwgcHJvamVjdDogUHJvamVjdCwgZmVlOiBGZWVMaW5lSXRlbSk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnB1dChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICBgcXVvdGUvJHtxdW90ZUlkfS9mZWUvbGluZUl0ZW1gLFxuICAgICAgeyBib2R5OiBmZWUsIHBhcmFtZXRlcnM6IHsgcHJvamVjdE5hbWU6IHByb2plY3QubmFtZSB9LCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUZlZShxdW90ZUlkOiBudW1iZXIsIGZlZTogRmVlTGluZUl0ZW0pOiBPYnNlcnZhYmxlPFF1b3RlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5kZWxldGUoXG4gICAgICBBcGkuT3JkZXJzLFxuICAgICAgYHF1b3RlLyR7cXVvdGVJZH0vZmVlLyR7ZmVlLmlkfWAsXG4gICAgICB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYnVsa0ltcG9ydChxdW90ZUlkOiBudW1iZXIsIHJhd0Fzc2V0czogeyBsaW5lSXRlbUF0dHJpYnV0ZXM6IHN0cmluZyB9LCBwcm9qZWN0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnB1dChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICBgcXVvdGUvJHtxdW90ZUlkfS9hc3NldC9kaXJlY3QvbGluZUl0ZW1gLFxuICAgICAge1xuICAgICAgICBib2R5OiByYXdBc3NldHMsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgcHJvamVjdElkIH0sXG4gICAgICAgIGxvYWRpbmdJbmRpY2F0b3I6IHRydWVcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZShcbiAgICBxdW90ZUlkOiBudW1iZXIsXG4gICAgZXhpc3RpbmdQcm9qZWN0TmFtZXM6IEFycmF5PHN0cmluZz4sXG4gICAgYWRkQXNzZXRQYXJhbWV0ZXJzOiBBZGRBc3NldFBhcmFtZXRlcnMpOiBPYnNlcnZhYmxlPFF1b3RlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5wdXQoXG4gICAgICBBcGkuT3JkZXJzLFxuICAgICAgYHF1b3RlLyR7cXVvdGVJZH0vYXNzZXQvbGluZUl0ZW1gLFxuICAgICAge1xuICAgICAgICBib2R5OiB0aGlzLmZvcm1hdEFzc2V0Qm9keShhZGRBc3NldFBhcmFtZXRlcnMpLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IHByb2plY3ROYW1lOiBleGlzdGluZ1Byb2plY3ROYW1lc1tleGlzdGluZ1Byb2plY3ROYW1lcy5sZW5ndGggLSAxXSwgcmVnaW9uOiAnQUFBJyB9LFxuICAgICAgICBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGROb3RlKHF1b3RlSWQ6IG51bWJlciwgbm90ZTogc3RyaW5nLCBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICBpZiAobGluZUl0ZW0uaGFzT3duUHJvcGVydHkoJ25vdGVzJykgJiYgQXJyYXkuaXNBcnJheShsaW5lSXRlbS5ub3RlcykpIHtcbiAgICAgIGxpbmVJdGVtLm5vdGVzWzBdID0geyBub3RlczogW25vdGVdIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmVJdGVtLm5vdGVzID0gW3sgbm90ZXM6IFtub3RlXSB9XTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYWtlRWRpdExpbmVJdGVtUmVxdWVzdChxdW90ZUlkLCBsaW5lSXRlbSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlTm90ZShxdW90ZUlkOiBudW1iZXIsIGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIGxldCBjbG9uZWRMaW5lSXRlbTogQXNzZXRMaW5lSXRlbSA9IENvbW1vbi5jbG9uZShsaW5lSXRlbSk7XG4gICAgZGVsZXRlIGNsb25lZExpbmVJdGVtLm5vdGVzO1xuXG4gICAgcmV0dXJuIHRoaXMubWFrZUVkaXRMaW5lSXRlbVJlcXVlc3QocXVvdGVJZCwgY2xvbmVkTGluZUl0ZW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRBc3NldEJvZHkocGFyYW1ldGVyczogQWRkQXNzZXRQYXJhbWV0ZXJzKTogYW55IHtcbiAgICBsZXQgZm9ybWF0dGVkID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihmb3JtYXR0ZWQsIHsgbGluZUl0ZW06IHRoaXMuZm9ybWF0TGluZUl0ZW0ocGFyYW1ldGVycy5saW5lSXRlbSwgcGFyYW1ldGVycy5tYXJrZXJzKSB9KTtcbiAgICBpZiAocGFyYW1ldGVycy5hdHRyaWJ1dGVzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGZvcm1hdHRlZCwgeyBhdHRyaWJ1dGVzOiBwYXJhbWV0ZXJzLmF0dHJpYnV0ZXMgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWQ7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdExpbmVJdGVtKGxpbmVJdGVtOiBhbnksIG1hcmtlcnM6IFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlLlN1YmNsaXBNYXJrZXJzKTogYW55IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbGluZUl0ZW0sIHsgYXNzZXQ6IHRoaXMuZm9ybWF0QXNzZXQobGluZUl0ZW0uYXNzZXQsIG1hcmtlcnMpIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRBc3NldChhc3NldDogYW55LCBtYXJrZXJzOiBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5TdWJjbGlwTWFya2Vycyk6IGFueSB7XG4gICAgbGV0IHRpbWVTdGFydDogbnVtYmVyO1xuICAgIGxldCB0aW1lRW5kOiBudW1iZXI7XG5cbiAgICBpZiAobWFya2Vycykge1xuICAgICAgY29uc3QgZHVyYXRpb246IFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlLkR1cmF0aW9uID0gU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuZHVyYXRpb25Gcm9tKG1hcmtlcnMpO1xuICAgICAgdGltZVN0YXJ0ID0gZHVyYXRpb24udGltZVN0YXJ0O1xuICAgICAgdGltZUVuZCA9IGR1cmF0aW9uLnRpbWVFbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVTdGFydCA9IGFzc2V0LnRpbWVTdGFydDtcbiAgICAgIHRpbWVFbmQgPSBhc3NldC50aW1lRW5kO1xuICAgIH1cblxuICAgIHJldHVybiB7IGFzc2V0SWQ6IGFzc2V0LmFzc2V0SWQsIHRpbWVTdGFydDogdGltZVN0YXJ0ID49IDAgPyB0aW1lU3RhcnQgOiAtMSwgdGltZUVuZDogdGltZUVuZCA+PSAwID8gdGltZUVuZCA6IC0yIH07XG4gIH1cblxuICBwcml2YXRlIGR1cmF0aW9uRnJvbShsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSwgbWFya2VyczogU3ViY2xpcE1hcmtlcnMpOiBEdXJhdGlvbiB7XG4gICAgcmV0dXJuIGJvdGhNYXJrZXJzQXJlU2V0KG1hcmtlcnMpID9cbiAgICAgIGR1cmF0aW9uRnJvbShtYXJrZXJzKSA6IHsgdGltZVN0YXJ0OiBsaW5lSXRlbS5hc3NldC50aW1lU3RhcnQsIHRpbWVFbmQ6IGxpbmVJdGVtLmFzc2V0LnRpbWVFbmQgfTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUVkaXRMaW5lSXRlbVJlcXVlc3QocXVvdGVJZDogbnVtYmVyLCBsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnB1dChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICBgcXVvdGUvJHtxdW90ZUlkfS91cGRhdGUvbGluZUl0ZW0vJHtsaW5lSXRlbS5pZH1gLFxuICAgICAgeyBib2R5OiBsaW5lSXRlbSwgcGFyYW1ldGVyczogeyByZWdpb246ICdBQUEnIH0sIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==
