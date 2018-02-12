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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var http_1 = require("@angular/http");
var api_config_1 = require("../../shared/services/api.config");
var api_service_1 = require("../../shared/services/api.service");
var FutureApiService = (function (_super) {
    __extends(FutureApiService, _super);
    function FutureApiService(http, apiConfig, ngrxStore) {
        var _this = _super.call(this, http, apiConfig, ngrxStore) || this;
        _this.http = http;
        _this.apiConfig = apiConfig;
        _this.ngrxStore = ngrxStore;
        return _this;
    }
    FutureApiService.prototype.call = function (method, api, endpoint, options) {
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
            .do(function () { return _this.hideLoadingIndicatorDependingOn(options); }, function (error) { return _this.hideLoadingIndicatorDependingOn(options); });
    };
    FutureApiService.decorators = [
        { type: core_1.Injectable },
    ];
    FutureApiService.ctorParameters = function () { return [
        { type: http_1.Http, },
        { type: api_config_1.ApiConfig, },
        { type: store_1.Store, },
    ]; };
    return FutureApiService;
}(api_service_1.ApiService));
exports.FutureApiService = FutureApiService;
//# sourceMappingURL=api.service.js.map