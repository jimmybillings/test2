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
var current_user_service_1 = require("./current-user.service");
var UserService = (function () {
    function UserService(api, currentUser) {
        this.api = api;
        this.currentUser = currentUser;
    }
    UserService.prototype.get = function () {
        return this.api.get(api_interface_1.Api.Identities, 'user/currentUser');
    };
    UserService.prototype.getById = function (id) {
        return this.api.get(api_interface_1.Api.Identities, 'user/' + id);
    };
    UserService.prototype.create = function (user) {
        return this.api.post(api_interface_1.Api.Identities, 'user/register', { body: user, loadingIndicator: true });
    };
    UserService.prototype.forgotPassword = function (user) {
        return this.api.post(api_interface_1.Api.Identities, 'user/requestPasswordReset', { body: user, loadingIndicator: true });
    };
    UserService.prototype.downloadActiveTosDocument = function () {
        var _this = this;
        return this.api.get(api_interface_1.Api.Identities, 'document/activeVersion/TOS').flatMap(function (response) {
            _this.documentId = response.id;
            return _this.api.get(api_interface_1.Api.Identities, "document/downloadDocumentFile/" + response.id, { headerType: 'download' });
        }).map(function (response) {
            return response.text();
        });
    };
    UserService.prototype.agreeUserToTerms = function () {
        this.api.post(api_interface_1.Api.Identities, "document/version/agree", { parameters: { documentId: this.documentId.toString() } }).take(1).subscribe();
    };
    UserService.prototype.changePassword = function (form) {
        return this.api.post(api_interface_1.Api.Identities, 'user/changePassword', {
            body: { oldPassword: form.oldPassword, newPassword: form.newPassword },
            loadingIndicator: true
        });
    };
    UserService.prototype.resetPassword = function (form, overridingToken) {
        return this.api.post(api_interface_1.Api.Identities, 'user/passwordReset', { body: { newPassword: form.newPassword }, overridingToken: overridingToken, loadingIndicator: true });
    };
    UserService.prototype.getAddresses = function () {
        return this.api.get(api_interface_1.Api.Identities, 'user/currentUsersAssociatedAddresses')
            .map(function (addresses) {
            return addresses.list;
        });
    };
    UserService.prototype.addBillingAddress = function (address) {
        var newUser = Object.assign({}, JSON.parse(localStorage.getItem('currentUser')), { billingInfo: { address: address } });
        return this.editSelfSafe(newUser);
    };
    UserService.prototype.addAccountBillingAddress = function (address) {
        var _this = this;
        return this.api.get(api_interface_1.Api.Identities, "account/" + address.addressEntityId, { loadingIndicator: 'onBeforeRequest' }).flatMap(function (account) {
            var newAccount = Object.assign({}, account, { billingInfo: { address: address.address } });
            return _this.api.put(api_interface_1.Api.Identities, "account/" + address.addressEntityId, { body: newAccount, loadingIndicator: 'offAfterResponse' });
        });
    };
    UserService.prototype.getAccount = function (accountId) {
        return this.api.get(api_interface_1.Api.Identities, "account/" + accountId);
    };
    UserService.prototype.changeBasicInfo = function (form) {
        var newUser = Object.assign({}, JSON.parse(localStorage.getItem('currentUser')), form);
        return this.editSelfSafe(newUser);
    };
    UserService.prototype.editSelfSafe = function (body) {
        var _this = this;
        return this.api.put(api_interface_1.Api.Identities, 'user/self', { body: body }).do(function (user) {
            _this.currentUser.set(user);
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService, current_user_service_1.CurrentUserService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDLGlFQUErRDtBQUMvRCx1RUFBeUU7QUFHekUsK0RBQTREO0FBSzVEO0lBRUUscUJBQW9CLEdBQWUsRUFBVSxXQUErQjtRQUF4RCxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO0lBQUksQ0FBQztJQUUxRSx5QkFBRyxHQUFWO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsVUFBVSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLDZCQUFPLEdBQWQsVUFBZSxFQUFVO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFBYyxJQUFZO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBRyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQ2xELEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FDdkMsQ0FBQztJQUNKLENBQUM7SUFFTSxvQ0FBYyxHQUFyQixVQUFzQixJQUFTO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBRyxDQUFDLFVBQVUsRUFBRSwyQkFBMkIsRUFDOUQsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUVNLCtDQUF5QixHQUFoQztRQUFBLGlCQVdDO1FBVkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FB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QUFyR1ksa0NBQVciLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy91c2VyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpLCBBcGlSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFVzZXIsIEFkZHJlc3MsIFZpZXdBZGRyZXNzLCBEb2N1bWVudCwgVXNlckJhc2ljSW5mbyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4vY3VycmVudC11c2VyLnNlcnZpY2UnO1xuLyoqXG4gKiBTZXJ2aWNlIHRoYXQgcHJvdmlkZXMgYXBpIGFjY2VzcyByZWdpc3RlcmluZyBuZXcgdXNlcnMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XG4gIHB1YmxpYyBkb2N1bWVudElkOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLCBwcml2YXRlIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBnZXQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KEFwaS5JZGVudGl0aWVzLCAndXNlci9jdXJyZW50VXNlcicpO1xuICB9XG5cbiAgcHVibGljIGdldEJ5SWQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoQXBpLklkZW50aXRpZXMsICd1c2VyLycgKyBpZCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlKHVzZXI6IE9iamVjdCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3QoQXBpLklkZW50aXRpZXMsICd1c2VyL3JlZ2lzdGVyJyxcbiAgICAgIHsgYm9keTogdXNlciwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3Jnb3RQYXNzd29yZCh1c2VyOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KEFwaS5JZGVudGl0aWVzLCAndXNlci9yZXF1ZXN0UGFzc3dvcmRSZXNldCcsXG4gICAgICB7IGJvZHk6IHVzZXIsIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZG93bmxvYWRBY3RpdmVUb3NEb2N1bWVudCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoQXBpLklkZW50aXRpZXMsICdkb2N1bWVudC9hY3RpdmVWZXJzaW9uL1RPUycpLmZsYXRNYXAoKHJlc3BvbnNlOiBEb2N1bWVudCkgPT4ge1xuICAgICAgdGhpcy5kb2N1bWVudElkID0gcmVzcG9uc2UuaWQ7XG4gICAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KFxuICAgICAgICBBcGkuSWRlbnRpdGllcyxcbiAgICAgICAgYGRvY3VtZW50L2Rvd25sb2FkRG9jdW1lbnRGaWxlLyR7cmVzcG9uc2UuaWR9YCxcbiAgICAgICAgeyBoZWFkZXJUeXBlOiAnZG93bmxvYWQnIH1cbiAgICAgICk7XG4gICAgfSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWdyZWVVc2VyVG9UZXJtcygpOiB2b2lkIHtcbiAgICB0aGlzLmFwaS5wb3N0KFxuICAgICAgQXBpLklkZW50aXRpZXMsXG4gICAgICBgZG9jdW1lbnQvdmVyc2lvbi9hZ3JlZWAsXG4gICAgICB7IHBhcmFtZXRlcnM6IHsgZG9jdW1lbnRJZDogdGhpcy5kb2N1bWVudElkLnRvU3RyaW5nKCkgfSB9XG4gICAgKS50YWtlKDEpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLy8gVXNlZCBieSBhIGxvZ2dlZC1pbiB1c2VyIHRvIGNoYW5nZSB0aGVpciBwYXNzd29yZFxuICBwdWJsaWMgY2hhbmdlUGFzc3dvcmQoZm9ybTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChBcGkuSWRlbnRpdGllcywgJ3VzZXIvY2hhbmdlUGFzc3dvcmQnLCB7XG4gICAgICBib2R5OiB7IG9sZFBhc3N3b3JkOiBmb3JtLm9sZFBhc3N3b3JkLCBuZXdQYXNzd29yZDogZm9ybS5uZXdQYXNzd29yZCB9LFxuICAgICAgbG9hZGluZ0luZGljYXRvcjogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXNlZCBieSBhIGxvZ2dlZC1vdXQgdXNlciB0byByZXNldCB0aGVpciBwYXNzd29yZCAtIHJlcXVpcmVzIG92ZXJyaWRpbmdUb2tlblxuICBwdWJsaWMgcmVzZXRQYXNzd29yZChmb3JtOiBhbnksIG92ZXJyaWRpbmdUb2tlbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChBcGkuSWRlbnRpdGllcywgJ3VzZXIvcGFzc3dvcmRSZXNldCcsXG4gICAgICB7IGJvZHk6IHsgbmV3UGFzc3dvcmQ6IGZvcm0ubmV3UGFzc3dvcmQgfSwgb3ZlcnJpZGluZ1Rva2VuOiBvdmVycmlkaW5nVG9rZW4sIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWRkcmVzc2VzKCk6IE9ic2VydmFibGU8QXJyYXk8Vmlld0FkZHJlc3M+PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChBcGkuSWRlbnRpdGllcywgJ3VzZXIvY3VycmVudFVzZXJzQXNzb2NpYXRlZEFkZHJlc3NlcycpXG4gICAgICAubWFwKChhZGRyZXNzZXM6IHsgbGlzdDogVmlld0FkZHJlc3NbXSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBhZGRyZXNzZXMubGlzdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZEJpbGxpbmdBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3MpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBuZXdVc2VyOiBVc2VyID0gT2JqZWN0LmFzc2lnbih7fSwgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSksIHsgYmlsbGluZ0luZm86IHsgYWRkcmVzczogYWRkcmVzcyB9IH0pO1xuICAgIHJldHVybiB0aGlzLmVkaXRTZWxmU2FmZShuZXdVc2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBY2NvdW50QmlsbGluZ0FkZHJlc3MoYWRkcmVzczogVmlld0FkZHJlc3MpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoXG4gICAgICBBcGkuSWRlbnRpdGllcyxcbiAgICAgIGBhY2NvdW50LyR7YWRkcmVzcy5hZGRyZXNzRW50aXR5SWR9YCxcbiAgICAgIHsgbG9hZGluZ0luZGljYXRvcjogJ29uQmVmb3JlUmVxdWVzdCcgfVxuICAgICkuZmxhdE1hcCgoYWNjb3VudDogYW55KSA9PiB7XG4gICAgICBsZXQgbmV3QWNjb3VudDogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgYWNjb3VudCwgeyBiaWxsaW5nSW5mbzogeyBhZGRyZXNzOiBhZGRyZXNzLmFkZHJlc3MgfSB9KTtcbiAgICAgIHJldHVybiB0aGlzLmFwaS5wdXQoXG4gICAgICAgIEFwaS5JZGVudGl0aWVzLFxuICAgICAgICBgYWNjb3VudC8ke2FkZHJlc3MuYWRkcmVzc0VudGl0eUlkfWAsXG4gICAgICAgIHsgYm9keTogbmV3QWNjb3VudCwgbG9hZGluZ0luZGljYXRvcjogJ29mZkFmdGVyUmVzcG9uc2UnIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWNjb3VudChhY2NvdW50SWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChBcGkuSWRlbnRpdGllcywgYGFjY291bnQvJHthY2NvdW50SWR9YCk7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlQmFzaWNJbmZvKGZvcm06IFVzZXJCYXNpY0luZm8pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBuZXdVc2VyOiBVc2VyID0gT2JqZWN0LmFzc2lnbih7fSwgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSksIGZvcm0pO1xuICAgIHJldHVybiB0aGlzLmVkaXRTZWxmU2FmZShuZXdVc2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0U2VsZlNhZmUoYm9keTogVXNlcikge1xuICAgIHJldHVybiB0aGlzLmFwaS5wdXQoQXBpLklkZW50aXRpZXMsICd1c2VyL3NlbGYnLCB7IGJvZHk6IGJvZHkgfSkuZG8oKHVzZXI6IFVzZXIpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFVzZXIuc2V0KHVzZXIpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
