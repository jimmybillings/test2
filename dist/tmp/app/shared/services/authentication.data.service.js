"use strict";
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
    Authentication.decorators = [
        { type: core_1.Injectable },
    ];
    Authentication.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
    ]; };
    return Authentication;
}());
exports.Authentication = Authentication;
//# sourceMappingURL=authentication.data.service.js.map