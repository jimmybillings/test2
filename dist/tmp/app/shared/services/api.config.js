"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var current_user_service_1 = require("./current-user.service");
var ApiConfig = (function () {
    function ApiConfig(currentUser) {
        this.currentUser = currentUser;
        this._portal = null;
        this._baseUrl = null;
    }
    Object.defineProperty(ApiConfig.prototype, "baseUrl", {
        get: function () {
            return this._baseUrl;
        },
        set: function (url) {
            this._baseUrl = url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiConfig.prototype, "portal", {
        get: function () {
            return this._portal;
        },
        set: function (portal) {
            this._portal = portal;
        },
        enumerable: true,
        configurable: true
    });
    ApiConfig.prototype.headers = function (overridingToken, headerType) {
        if (overridingToken === void 0) { overridingToken = ''; }
        if (headerType === void 0) { headerType = 'json'; }
        var token = '';
        if (overridingToken !== '') {
            token = overridingToken;
        }
        else if (this.currentUser.loggedIn()) {
            token = localStorage.getItem('token');
        }
        var headers = {
            'Content-Type': 'application/json',
        };
        if (token !== '') {
            headers['Authorization'] = "Bearer " + token;
        }
        switch (headerType) {
            case 'json':
                headers['Accept'] = 'application/json';
                break;
            case 'download':
                headers['Accept'] = 'application/octet-stream';
                break;
            case 'form-urlencoded':
                headers['Accept'] = 'application/json';
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
                break;
            default:
                headers['Accept'] = 'application/json';
                break;
        }
        return new http_1.Headers(headers);
    };
    ApiConfig.decorators = [
        { type: core_1.Injectable },
    ];
    ApiConfig.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return ApiConfig;
}());
exports.ApiConfig = ApiConfig;
//# sourceMappingURL=api.config.js.map