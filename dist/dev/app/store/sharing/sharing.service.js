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
    SharingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService, current_user_service_1.CurrentUserService])
    ], SharingService);
    return SharingService;
}());
exports.SharingService = SharingService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQTJDO0FBRzNDLGtEQUFzRDtBQUN0RCx1RUFBNEQ7QUFDNUQsMkVBQW9IO0FBRXBILG1GQUFnRjtBQUdoRjtJQUNFLHdCQUFvQixVQUE0QixFQUFVLGtCQUFzQztRQUE1RSxlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBSSxDQUFDO0lBRTlGLDZDQUFvQixHQUEzQixVQUE0QixPQUFlLEVBQUUsT0FBdUI7UUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2xGLEdBQUcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxtQkFBYyxRQUFRLENBQUMsTUFBUSxFQUF0RCxDQUFzRCxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLDRDQUFtQixHQUExQixVQUNFLE9BQWUsRUFBRSxPQUF1QixFQUFFLFVBQWdDLEVBQUUsVUFBZ0I7UUFFNUYsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDekcsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSxpREFBd0IsR0FBL0IsVUFBZ0MsWUFBb0IsRUFBRSxVQUFxQztRQUN6RixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUU7WUFDOUQsSUFBSSxFQUFFO2dCQUNKLFNBQVMs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IjoiYXBwL3N0b3JlL3NoYXJpbmcvc2hhcmluZy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmlzaXRBbGwgfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgRnV0dXJlQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YmNsaXBNYXJrZXJzLCBEdXJhdGlvbiwgZHVyYXRpb25Gcm9tLCBib3RoTWFya2Vyc0FyZVNldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5pbXBvcnQgeyBBc3NldFNoYXJlUGFyYW1ldGVycywgQ29sbGVjdGlvblNoYXJlUGFyYW1ldGVycywgUG9qbyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJpbmdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlTZXJ2aWNlOiBGdXR1cmVBcGlTZXJ2aWNlLCBwcml2YXRlIGN1cnJlbnRVc2VyU2VydmljZTogQ3VycmVudFVzZXJTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlQXNzZXRTaGFyZUxpbmsoYXNzZXRJZDogbnVtYmVyLCBtYXJrZXJzOiBTdWJjbGlwTWFya2Vycyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFNoYXJpbmdFbmRwb2ludFdpdGgodGhpcy5mb3JtYXRBc3NldENyZWF0ZUJvZHlXaXRoKGFzc2V0SWQsIG1hcmtlcnMpKVxuICAgICAgLm1hcChyZXNwb25zZSA9PiBgJHt3aW5kb3cubG9jYXRpb24uaHJlZn07c2hhcmVfa2V5PSR7cmVzcG9uc2UuYXBpS2V5fWApO1xuICB9XG5cbiAgcHVibGljIGVtYWlsQXNzZXRTaGFyZUxpbmsoXG4gICAgYXNzZXRJZDogbnVtYmVyLCBtYXJrZXJzOiBTdWJjbGlwTWFya2VycywgcGFyYW1ldGVyczogQXNzZXRTaGFyZVBhcmFtZXRlcnMsIHByb3BlcnRpZXM6IFBvam9cbiAgKTogT2JzZXJ2YWJsZTxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFNoYXJpbmdFbmRwb2ludFdpdGgodGhpcy5mb3JtYXRBc3NldEVtYWlsQm9keVdpdGgoYXNzZXRJZCwgbWFya2VycywgcGFyYW1ldGVycywgcHJvcGVydGllcykpXG4gICAgICAubWFwKHJlc3BvbnNlID0+IG51bGwpO1xuICB9XG5cbiAgcHVibGljIGVtYWlsQ29sbGVjdGlvblNoYXJlTGluayhjb2xsZWN0aW9uSWQ6IG51bWJlciwgcGFyYW1ldGVyczogQ29sbGVjdGlvblNoYXJlUGFyYW1ldGVycyk6IE9ic2VydmFibGU8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UucG9zdChBcGkuSWRlbnRpdGllcywgJ2NvbGxlY3Rpb24vc2hhcmUnLCB7XG4gICAgICBib2R5OiB7XG4gICAgICAgIHVzZXJFbWFpbDogW1xuICAgICAgICAgIHBhcmFtZXRlcnMucmVjaXBpZW50RW1haWxzXG4gICAgICAgIF0sXG4gICAgICAgIGNvbGxlY3Rpb25zOiBbXG4gICAgICAgICAgY29sbGVjdGlvbklkXG4gICAgICAgIF0sXG4gICAgICAgIGFjY2Vzc0xldmVsOiBwYXJhbWV0ZXJzLmFjY2Vzc0xldmVsLFxuICAgICAgICBjb21tZW50OiBwYXJhbWV0ZXJzLmNvbW1lbnRcbiAgICAgIH0sXG4gICAgICBsb2FkaW5nSW5kaWNhdG9yOiAnb25CZWZvcmVSZXF1ZXN0J1xuICAgIH0pLm1hcChyZXNwb25zZSA9PiBudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsbFNoYXJpbmdFbmRwb2ludFdpdGgoYm9keTogQWNjZXNzSW5mb1JlcXVlc3RCb2R5KTogT2JzZXJ2YWJsZTxBY2Nlc3NJbmZvUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLnBvc3QoQXBpLklkZW50aXRpZXMsICdhY2Nlc3NJbmZvJywgeyBib2R5OiBib2R5IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRBc3NldENyZWF0ZUJvZHlXaXRoKGFzc2V0SWQ6IG51bWJlciwgbWFya2VyczogU3ViY2xpcE1hcmtlcnMsIHByb3BlcnRpZXM/OiBQb2pvKTogQWNjZXNzSW5mb1JlcXVlc3RCb2R5IHtcbiAgICBjb25zdCBkdXJhdGlvblByb3BlcnRpZXM6IER1cmF0aW9uID0gdGhpcy5mb3JtYXRUaW1lUHJvcGVydGllc0Zyb20obWFya2Vycyk7XG4gICAgY29uc3QgZnVsbFByb3BlcnRpZXM6IFBvam8gPSBwcm9wZXJ0aWVzID8geyAuLi5kdXJhdGlvblByb3BlcnRpZXMsIC4uLnByb3BlcnRpZXMgfSA6IGR1cmF0aW9uUHJvcGVydGllcztcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2Fzc2V0JyxcbiAgICAgIGFjY2Vzc0luZm86IFN0cmluZyhhc3NldElkKSxcbiAgICAgIGFjY2Vzc1N0YXJ0RGF0ZTogdGhpcy5mb3JtYXRTdGFydERhdGUoKSxcbiAgICAgIGFjY2Vzc0VuZERhdGU6IHRoaXMuZm9ybWF0RW5kRGF0ZSgpLFxuICAgICAgcHJvcGVydGllczogZnVsbFByb3BlcnRpZXNcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRBc3NldEVtYWlsQm9keVdpdGgoXG4gICAgYXNzZXRJZDogbnVtYmVyLCBtYXJrZXJzOiBTdWJjbGlwTWFya2VycywgcGFyYW1ldGVyczogQXNzZXRTaGFyZVBhcmFtZXRlcnMsIHByb3BlcnRpZXM6IFBvam9cbiAgKTogQWNjZXNzSW5mb1JlcXVlc3RCb2R5IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5mb3JtYXRBc3NldENyZWF0ZUJvZHlXaXRoKGFzc2V0SWQsIG1hcmtlcnMsIHByb3BlcnRpZXMpLFxuICAgICAgcmVjaXBpZW50RW1haWxzOiB0aGlzLmZvcm1hdEVtYWlsUmVjZWlwaWVudHNGcm9tKHBhcmFtZXRlcnMucmVjaXBpZW50RW1haWxzLCBwYXJhbWV0ZXJzLmNvcHlNZSksXG4gICAgICBjb21tZW50OiBwYXJhbWV0ZXJzLmNvbW1lbnQsXG4gICAgICBwcm9qZWN0OiBwYXJhbWV0ZXJzLnByb2plY3RcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRTdGFydERhdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc29Gb3JtYXRMb2NhbERhdGUobmV3IERhdGUoKSk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdEVuZERhdGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxMCk7XG5cbiAgICByZXR1cm4gdGhpcy5pc29Gb3JtYXRMb2NhbERhdGUoZGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIGlzb0Zvcm1hdExvY2FsRGF0ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICBjb25zdCBvdXRwdXREYXRlOiBzdHJpbmcgPSBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7dGhpcy5wYWQoZGF0ZS5nZXRNb250aCgpICsgMSl9LSR7dGhpcy5wYWQoZGF0ZS5nZXREYXRlKCkpfWA7XG4gICAgY29uc3Qgb3V0cHV0VGltZTogc3RyaW5nID0gYCR7dGhpcy5wYWQoZGF0ZS5nZXRIb3VycygpKX06JHt0aGlzLnBhZChkYXRlLmdldE1pbnV0ZXMoKSl9OiR7dGhpcy5wYWQoZGF0ZS5nZXRTZWNvbmRzKCkpfWA7XG4gICAgY29uc3QgdGltZVpvbmVPZmZzZXQ6IG51bWJlciA9IC1kYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgY29uc3Qgb3V0cHV0VGltZVpvbmVTaWduOiBzdHJpbmcgPSB0aW1lWm9uZU9mZnNldCA+PSAwID8gJysnIDogJy0nO1xuICAgIGNvbnN0IG91dHB1dFRpbWVab25lT2Zmc2V0OiBzdHJpbmcgPSBgJHt0aGlzLnBhZCh0aW1lWm9uZU9mZnNldCAvIDYwKX06JHt0aGlzLnBhZCh0aW1lWm9uZU9mZnNldCAlIDYwKX1gO1xuXG4gICAgcmV0dXJuIGAke291dHB1dERhdGV9VCR7b3V0cHV0VGltZX0ke291dHB1dFRpbWVab25lU2lnbn0ke291dHB1dFRpbWVab25lT2Zmc2V0fWA7XG4gIH1cblxuICBwcml2YXRlIHBhZChudW1iZXI6IG51bWJlcik6IHN0cmluZyB7XG4gICAgdmFyIGludGVnZXI6IG51bWJlciA9IE1hdGguYWJzKE1hdGguZmxvb3IobnVtYmVyKSk7XG4gICAgcmV0dXJuIGludGVnZXIgPCAxMCA/IGAwJHtpbnRlZ2VyfWAgOiBTdHJpbmcoaW50ZWdlcik7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdFRpbWVQcm9wZXJ0aWVzRnJvbShtYXJrZXJzOiBTdWJjbGlwTWFya2Vycyk6IER1cmF0aW9uIHtcbiAgICByZXR1cm4gYm90aE1hcmtlcnNBcmVTZXQobWFya2VycykgPyBkdXJhdGlvbkZyb20obWFya2VycykgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRFbWFpbFJlY2VpcGllbnRzRnJvbShyZWNpcGllbnRzU3RyaW5nOiBzdHJpbmcsIGNvcHlNZTogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gcmVjaXBpZW50c1N0cmluZy5zcGxpdCgvXFxzKixcXHMqfFxccyo7XFxzKi8pLmNvbmNhdChjb3B5TWUgPyBbdGhpcy5jdXJyZW50VXNlclNlcnZpY2Uuc3RhdGUuZW1haWxBZGRyZXNzXSA6IFtdKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgQWNjZXNzSW5mb1JlcXVlc3RCb2R5IHtcbiAgdHlwZTogJ2Fzc2V0JztcbiAgYWNjZXNzSW5mbzogc3RyaW5nO1xuICBhY2Nlc3NTdGFydERhdGU6IHN0cmluZztcbiAgYWNjZXNzRW5kRGF0ZTogc3RyaW5nO1xuICBwcm9wZXJ0aWVzPzogUG9qbztcbiAgcmVjaXBpZW50RW1haWxzPzogc3RyaW5nW107XG4gIGNvbW1lbnQ/OiBzdHJpbmc7XG4gIHByb2plY3Q/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBBY2Nlc3NJbmZvUmVzcG9uc2Uge1xuICBhcGlLZXk6IHN0cmluZztcbn1cbiJdfQ==
