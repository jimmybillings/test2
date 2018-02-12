"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var store_1 = require("@ngrx/store");
var http_1 = require("@angular/http");
var api_config_1 = require("./api.config");
var api_interface_1 = require("../interfaces/api.interface");
var ErrorActions = require("../../store/error/error.actions");
var LoadingIndicatorActions = require("../../store/loading-indicator/loading-indicator.actions");
var ApiService = (function () {
    function ApiService(http, apiConfig, ngrxStore) {
        this.http = http;
        this.apiConfig = apiConfig;
        this.ngrxStore = ngrxStore;
    }
    ApiService.prototype.get = function (api, endpoint, options) {
        if (options === void 0) { options = {}; }
        return this.call(http_1.RequestMethod.Get, api, endpoint, options);
    };
    ApiService.prototype.post = function (api, endpoint, options) {
        if (options === void 0) { options = {}; }
        return this.call(http_1.RequestMethod.Post, api, endpoint, options);
    };
    ApiService.prototype.put = function (api, endpoint, options) {
        if (options === void 0) { options = {}; }
        return this.call(http_1.RequestMethod.Put, api, endpoint, options);
    };
    ApiService.prototype.delete = function (api, endpoint, options) {
        if (options === void 0) { options = {}; }
        return this.call(http_1.RequestMethod.Delete, api, endpoint, options);
    };
    ApiService.prototype.call = function (method, api, endpoint, options) {
        var _this = this;
        options = this.combineDefaultOptionsWith(options);
        this.showLoadingIndicatorDependingOn(options);
        return this.http.request(this.requestFor(method, api, endpoint, options))
            .map(function (response) { try {
            return response.json();
        }
        catch (exception) {
            return response;
        } })
            .do(function () {
            _this.hideLoadingIndicatorDependingOn(options);
        }, function (error) {
            _this.hideLoadingIndicatorDependingOn(options);
            try {
                return error.json();
            }
            catch (exception) {
                _this.ngrxStore.dispatch(new ErrorActions.Handle(error));
            }
            return error;
        });
    };
    ApiService.prototype.combineDefaultOptionsWith = function (options) {
        return __assign({ parameters: {}, body: {}, loadingIndicator: false, overridingToken: '' }, options);
    };
    ApiService.prototype.showLoadingIndicatorDependingOn = function (options) {
        if (options.loadingIndicator === 'onBeforeRequest' || options.loadingIndicator === true) {
            this.ngrxStore.dispatch(new LoadingIndicatorActions.Show());
        }
    };
    ApiService.prototype.hideLoadingIndicatorDependingOn = function (options) {
        if (options.loadingIndicator === 'offAfterResponse' || options.loadingIndicator === true) {
            this.ngrxStore.dispatch(new LoadingIndicatorActions.Hide());
        }
    };
    ApiService.prototype.requestFor = function (method, api, endpoint, options) {
        return new http_1.Request(new http_1.RequestOptions({
            method: method,
            url: this.urlFor(api, endpoint),
            body: this.bodyJsonFrom(options.body),
            headers: this.apiConfig.headers(options.overridingToken, options.headerType),
            search: this.searchParametersFrom(options.parameters)
        }));
    };
    ApiService.prototype.urlFor = function (api, endpoint) {
        return "" + this.apiConfig.baseUrl + this.pathSegmentFor(api) + "-api/" + this.versionFor(api) + "/" + endpoint;
    };
    ApiService.prototype.pathSegmentFor = function (api) {
        return (api_interface_1.Api[api] || '?').toLowerCase();
    };
    ApiService.prototype.versionFor = function (api) {
        switch (api) {
            case api_interface_1.Api.Identities: return 'v1';
            case api_interface_1.Api.Assets: return 'v1';
            case api_interface_1.Api.Orders: return 'v1';
            default: return 'v?';
        }
        ;
    };
    ApiService.prototype.bodyJsonFrom = function (bodyObject) {
        return Array.isArray(bodyObject) ?
            JSON.stringify(bodyObject) :
            JSON.stringify(__assign({}, bodyObject, { siteName: this.apiConfig.portal }));
    };
    ApiService.prototype.searchParametersFrom = function (parameters) {
        var search = new http_1.URLSearchParams('', new CustomQueryEncoder());
        if (parameters['siteName'])
            console.error('Cannot set siteName externally.');
        Object.keys(parameters)
            .filter(function (parameter) { return (parameter !== 'siteName'); })
            .forEach(function (parameter) { return search.set(parameter, parameters[parameter]); });
        search.set('siteName', this.apiConfig.portal);
        return search;
    };
    ApiService.decorators = [
        { type: core_1.Injectable },
    ];
    ApiService.ctorParameters = function () { return [
        { type: http_1.Http, },
        { type: api_config_1.ApiConfig, },
        { type: store_1.Store, },
    ]; };
    return ApiService;
}());
exports.ApiService = ApiService;
var CustomQueryEncoder = (function (_super) {
    __extends(CustomQueryEncoder, _super);
    function CustomQueryEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomQueryEncoder.prototype.encodeKey = function (k) {
        k = _super.prototype.encodeKey.call(this, k);
        return k.replace(/\+/gi, '%2B');
    };
    CustomQueryEncoder.prototype.encodeValue = function (v) {
        v = _super.prototype.encodeValue.call(this, v);
        return v.replace(/\+/gi, '%2B');
    };
    return CustomQueryEncoder;
}(http_1.QueryEncoder));
exports.CustomQueryEncoder = CustomQueryEncoder;
//# sourceMappingURL=api.service.js.map