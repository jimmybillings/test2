"use strict";
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
var api_service_1 = require("../../shared/services/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var Authentication = (function () {
    function Authentication(api) {
        this.api = api;
    }
    Authentication.prototype.create = function (user) {
        return this.api.post(api_interface_1.Api.Identities, 'login', { body: user, loadingIndicator: true });
    };
    Authentication.prototype.destroy = function () {
        return this.api.put(api_interface_1.Api.Identities, 'session/invalidate');
    };
    Authentication.prototype.validate = function (token) {
        return this.api.get(api_interface_1.Api.Identities, 'session/validate/' + token);
    };
    Authentication = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], Authentication);
    return Authentication;
}());
exports.Authentication = Authentication;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXV0aGVudGljYXRpb24uZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRzNDLGlFQUErRDtBQUMvRCx1RUFBNEQ7QUFPNUQ7SUFDRSx3QkFBb0IsR0FBZTtRQUFmLFFBQUcsR0FBSCxHQUFHLENBQVk7SUFBSSxDQUFDO0lBRWpDLCtCQUFNLEdBQWIsVUFBYyxJQUFpQjtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFTSxnQ0FBTyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLGlDQUFRLEdBQWYsVUFBZ0IsS0FBYTtRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQWJVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FFYyx3QkFBVTtPQUR4QixjQUFjLENBYzFCO0lBQUQscUJBQUM7Q0FkRCxBQWNDLElBQUE7QUFkWSx3Q0FBYyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmRhdGEuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHMsIFNlc3Npb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3Nlc3Npb24uaW50ZXJmYWNlJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRoYXQgcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBhcGkgZm9yIGxvZ2dpbmcgdXNlciBpbiBhbmQgb3V0LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb24ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZSh1c2VyOiBDcmVkZW50aWFscyk6IE9ic2VydmFibGU8U2Vzc2lvbj4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KEFwaS5JZGVudGl0aWVzLCAnbG9naW4nLCB7IGJvZHk6IHVzZXIsIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpOiBPYnNlcnZhYmxlPG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucHV0KEFwaS5JZGVudGl0aWVzLCAnc2Vzc2lvbi9pbnZhbGlkYXRlJyk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUodG9rZW46IHN0cmluZyk6IE9ic2VydmFibGU8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoQXBpLklkZW50aXRpZXMsICdzZXNzaW9uL3ZhbGlkYXRlLycgKyB0b2tlbik7XG4gIH1cbn1cbiJdfQ==
