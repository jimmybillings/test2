"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var PageDataService = (function () {
    function PageDataService(translateService, titleService) {
        this.translateService = translateService;
        this.titleService = titleService;
    }
    PageDataService.prototype.updateTitle = function (trKey, trParams) {
        var _this = this;
        this.translateService.get(['COMPANY_NAME', trKey], trParams)
            .subscribe(function (values) {
            values[trKey] = values[trKey].replace('{{q}}', 'all');
            _this.titleService.setTitle(values['COMPANY_NAME'] + values[trKey]);
        });
    };
    PageDataService.decorators = [
        { type: core_1.Injectable },
    ];
    PageDataService.ctorParameters = function () { return [
        { type: core_2.TranslateService, },
        { type: platform_browser_1.Title, },
    ]; };
    return PageDataService;
}());
exports.PageDataService = PageDataService;
//# sourceMappingURL=page-data.service.js.map