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
var UiConfigService = (function () {
    function UiConfigService(apiService) {
        this.apiService = apiService;
    }
    UiConfigService.prototype.load = function () {
        return this.apiService.get(api_interface_1.Api.Identities, 'configuration/site').map(function (config) {
            return __assign({}, config, { loaded: true });
        });
    };
    UiConfigService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], UiConfigService);
    return UiConfigService;
}());
exports.UiConfigService = UiConfigService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHNDQUEyQztBQUUzQyxrREFBc0Q7QUFDdEQsdUVBQTREO0FBSTVEO0lBQ0UseUJBQW9CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUksQ0FBQztJQUU5Qyw4QkFBSSxHQUFYO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBZ0I7WUFDcEYsTUFBTSxjQUFNLE1BQU0sSUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFHO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVBVLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLGVBQWUsQ0FRM0I7SUFBRCxzQkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLDBDQUFlIiwiZmlsZSI6ImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRnV0dXJlQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFN0YXRlIGFzIFVpQ29uZmlnIH0gZnJvbSAnLi91aS1jb25maWcuc3RhdGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVWlDb25maWdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlTZXJ2aWNlOiBGdXR1cmVBcGlTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgbG9hZCgpOiBPYnNlcnZhYmxlPFVpQ29uZmlnPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoQXBpLklkZW50aXRpZXMsICdjb25maWd1cmF0aW9uL3NpdGUnKS5tYXAoKGNvbmZpZzogVWlDb25maWcpID0+IHtcbiAgICAgIHJldHVybiB7IC4uLmNvbmZpZywgbG9hZGVkOiB0cnVlIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
