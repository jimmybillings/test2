"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_interface_1 = require("../interfaces/api.interface");
var api_service_1 = require("../services/api.service");
var app_store_1 = require("../../app.store");
var AsperaService = (function () {
    function AsperaService(api, store) {
        this.api = api;
        this.store = store;
    }
    AsperaService.prototype.initConnect = function (stringifiedAsperaSpec) {
        var _this = this;
        var id = Math.floor((Math.random() * 10000) + 1);
        var CONNECT_INSTALLER = '//d3gcli72yxqn2z.cloudfront.net/connect/v4';
        var asperaWeb = new AW4.Connect({
            sdkLocation: CONNECT_INSTALLER,
            minVersion: '3.6.0',
            id: 'aspera_web_transfers-' + id
        });
        var asperaInstaller = new AW4.ConnectInstaller({
            sdkLocation: CONNECT_INSTALLER
        });
        var asperaSpec = this.parse(stringifiedAsperaSpec);
        asperaWeb.addEventListener(AW4.Connect.EVENT.STATUS, function (eventType, data) {
            switch (data) {
                case AW4.Connect.STATUS.INITIALIZING:
                    asperaInstaller.showLaunching();
                    return;
                case AW4.Connect.STATUS.FAILED:
                    asperaInstaller.showDownload();
                    return;
                case AW4.Connect.STATUS.OUTDATED:
                    asperaInstaller.showUpdate();
                    return;
                case AW4.Connect.STATUS.RUNNING:
                    asperaInstaller.connected();
                    _this.handleDownload(asperaSpec, asperaWeb, id);
                    return;
                default:
                    return;
            }
        });
        asperaWeb.initSession('nodeConnect-' + id);
    };
    AsperaService.prototype.getAsperaSpec = function (assetId, renditionType) {
        return this.api.get(api_interface_1.Api.Assets, "renditionType/asperaSpec/" + assetId, { parameters: { type: renditionType } });
    };
    AsperaService.prototype.handleDownload = function (spec, asperaWeb, random) {
        spec.target_rate_kbps = 100000;
        spec.authentication = 'token';
        asperaWeb.startTransfer(spec, { 'allow_dialogs': 'yes' });
    };
    AsperaService.prototype.parse = function (stringifiedAsperaSpec) {
        var parsedSpec = JSON.parse(stringifiedAsperaSpec);
        if (parsedSpec.hasOwnProperty('transfer_specs')) {
            return parsedSpec.transfer_specs[0].transfer_spec;
        }
        return parsedSpec;
    };
    AsperaService.decorators = [
        { type: core_1.Injectable },
    ];
    AsperaService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
        { type: app_store_1.AppStore, },
    ]; };
    return AsperaService;
}());
exports.AsperaService = AsperaService;
//# sourceMappingURL=aspera.service.js.map