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
var current_user_service_1 = require("../../shared/services/current-user.service");
var SharingService = (function () {
    function SharingService(apiService, currentUserService) {
        this.apiService = apiService;
        this.currentUserService = currentUserService;
    }
    SharingService.prototype.createAssetShareLink = function (assetId, markers) {
        return this.callSharingEndpointWith(this.formatAssetCreateBodyWith(assetId, markers))
            .map(function (response) { return window.location.href + ";share_key=" + response.apiKey; });
    };
    SharingService.prototype.emailAssetShareLink = function (assetId, markers, parameters, properties) {
        return this.callSharingEndpointWith(this.formatAssetEmailBodyWith(assetId, markers, parameters, properties))
            .map(function (response) { return null; });
    };
    SharingService.prototype.emailCollectionShareLink = function (collectionId, parameters) {
        return this.apiService.post(api_interface_1.Api.Identities, 'collection/share', {
            body: {
                userEmail: [
                    parameters.recipientEmails
                ],
                collections: [
                    collectionId
                ],
                accessLevel: parameters.accessLevel,
                comment: parameters.comment
            },
            loadingIndicator: 'onBeforeRequest'
        }).map(function (response) { return null; });
    };
    SharingService.prototype.callSharingEndpointWith = function (body) {
        return this.apiService.post(api_interface_1.Api.Identities, 'accessInfo', { body: body });
    };
    SharingService.prototype.formatAssetCreateBodyWith = function (assetId, markers, properties) {
        var durationProperties = this.formatTimePropertiesFrom(markers);
        var fullProperties = properties ? __assign({}, durationProperties, properties) : durationProperties;
        return {
            type: 'asset',
            accessInfo: String(assetId),
            accessStartDate: this.formatStartDate(),
            accessEndDate: this.formatEndDate(),
            properties: fullProperties
        };
    };
    SharingService.prototype.formatAssetEmailBodyWith = function (assetId, markers, parameters, properties) {
        return __assign({}, this.formatAssetCreateBodyWith(assetId, markers, properties), { recipientEmails: this.formatEmailReceipientsFrom(parameters.recipientEmails, parameters.copyMe), comment: parameters.comment, project: parameters.project });
    };
    SharingService.prototype.formatStartDate = function () {
        return this.isoFormatLocalDate(new Date());
    };
    SharingService.prototype.formatEndDate = function () {
        var date = new Date();
        date.setDate(date.getDate() + 10);
        return this.isoFormatLocalDate(date);
    };
    SharingService.prototype.isoFormatLocalDate = function (date) {
        var outputDate = date.getFullYear() + "-" + this.pad(date.getMonth() + 1) + "-" + this.pad(date.getDate());
        var outputTime = this.pad(date.getHours()) + ":" + this.pad(date.getMinutes()) + ":" + this.pad(date.getSeconds());
        var timeZoneOffset = -date.getTimezoneOffset();
        var outputTimeZoneSign = timeZoneOffset >= 0 ? '+' : '-';
        var outputTimeZoneOffset = this.pad(timeZoneOffset / 60) + ":" + this.pad(timeZoneOffset % 60);
        return outputDate + "T" + outputTime + outputTimeZoneSign + outputTimeZoneOffset;
    };
    SharingService.prototype.pad = function (number) {
        var integer = Math.abs(Math.floor(number));
        return integer < 10 ? "0" + integer : String(integer);
    };
    SharingService.prototype.formatTimePropertiesFrom = function (markers) {
        return subclip_markers_1.bothMarkersAreSet(markers) ? subclip_markers_1.durationFrom(markers) : null;
    };
    SharingService.prototype.formatEmailReceipientsFrom = function (recipientsString, copyMe) {
        return recipientsString.split(/\s*,\s*|\s*;\s*/).concat(copyMe ? [this.currentUserService.state.emailAddress] : []);
    };
    SharingService.decorators = [
        { type: core_1.Injectable },
    ];
    SharingService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return SharingService;
}());
exports.SharingService = SharingService;
//# sourceMappingURL=sharing.service.js.map