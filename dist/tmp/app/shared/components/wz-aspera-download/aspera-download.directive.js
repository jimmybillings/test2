"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var aspera_service_1 = require("../../../shared/services/aspera.service");
var app_store_1 = require("../../../app.store");
var WzAsperaDownloadDirective = (function () {
    function WzAsperaDownloadDirective(asperaService, store) {
        this.asperaService = asperaService;
        this.store = store;
        this.asperaPreloaded = 'true';
        this.renditionType = null;
        this.assetId = null;
    }
    WzAsperaDownloadDirective.prototype.onClick = function ($event) {
        var _this = this;
        if (JSON.parse(this.asperaPreloaded)) {
            this.asperaService.initConnect(this.asperaSpec);
        }
        else {
            this.asperaService.getAsperaSpec(this.assetId, this.renditionType)
                .filter(function (res) { return res.asperaSpec; })
                .subscribe(function (res) {
                _this.asperaService.initConnect(res.asperaSpec);
            }, function () {
                _this.store.dispatch(function (factory) { return factory.error.handleCustomError('COMPS.NO_COMP'); });
            });
        }
    };
    WzAsperaDownloadDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[wzAsperaDownload]'
                },] },
    ];
    WzAsperaDownloadDirective.ctorParameters = function () { return [
        { type: aspera_service_1.AsperaService, },
        { type: app_store_1.AppStore, },
    ]; };
    WzAsperaDownloadDirective.propDecorators = {
        'asperaSpec': [{ type: core_1.Input },],
        'asperaPreloaded': [{ type: core_1.Input },],
        'renditionType': [{ type: core_1.Input },],
        'assetId': [{ type: core_1.Input },],
        'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    };
    return WzAsperaDownloadDirective;
}());
exports.WzAsperaDownloadDirective = WzAsperaDownloadDirective;
//# sourceMappingURL=aspera-download.directive.js.map