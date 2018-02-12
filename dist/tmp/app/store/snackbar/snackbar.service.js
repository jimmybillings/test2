"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var material_1 = require("@angular/material");
var SnackbarService = (function () {
    function SnackbarService(translateService, snackBar) {
        this.translateService = translateService;
        this.snackBar = snackBar;
    }
    SnackbarService.prototype.display = function (messageKey, messageParameters) {
        var _this = this;
        return this.translateService.get(messageKey, messageParameters)
            .take(1)
            .do(function (translatedString) { return _this.snackBar.open(translatedString, '', {
            duration: 1500,
            verticalPosition: 'top',
            horizontalPosition: 'left',
            extraClasses: ['wz-snackbar']
        }); });
    };
    SnackbarService.decorators = [
        { type: core_1.Injectable },
    ];
    SnackbarService.ctorParameters = function () { return [
        { type: core_2.TranslateService, },
        { type: material_1.MatSnackBar, },
    ]; };
    return SnackbarService;
}());
exports.SnackbarService = SnackbarService;
//# sourceMappingURL=snackbar.service.js.map