"use strict";
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
    UserService.decorators = [
        { type: core_1.Injectable },
    ];
    UserService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map