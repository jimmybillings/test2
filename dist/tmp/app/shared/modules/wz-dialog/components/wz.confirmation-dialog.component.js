"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzConfirmationDialogComponent = (function () {
    function WzConfirmationDialogComponent() {
        this.accept = new core_1.EventEmitter();
        this.decline = new core_1.EventEmitter();
    }
    WzConfirmationDialogComponent.prototype.onClickAccept = function () {
        this.accept.emit();
    };
    WzConfirmationDialogComponent.prototype.onClickDecline = function () {
        this.decline.emit();
    };
    Object.defineProperty(WzConfirmationDialogComponent.prototype, "title", {
        get: function () {
            return this.toTrString(this.strings.title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzConfirmationDialogComponent.prototype, "message", {
        get: function () {
            return this.toTrString(this.strings.message);
        },
        enumerable: true,
        configurable: true
    });
    WzConfirmationDialogComponent.prototype.toTrString = function (s) {
        if (typeof s === 'string')
            return { key: s, values: {} };
        return s;
    };
    WzConfirmationDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-confirmation-dialog',
                    template: "\n    <h1 mat-dialog-title>{{ title.key | translate:title.values }}</h1>\n    <mat-dialog-content layout=\"row\">\n      <div flex>{{ message.key | translate:message.values }}</div>\n    </mat-dialog-content>\n    <mat-dialog-actions layout=\"row\" layout-align=\"end end\">\n      <button (click)=\"onClickDecline()\" mat-button mat-dialog-close color=\"primary\">\n        {{ strings.decline | translate }}\n      </button>\n      <button (click)=\"onClickAccept()\" mat-button mat-dialog-close color=\"primary\">\n        {{ strings.accept | translate }}\n      </button>\n    </mat-dialog-actions>\n  "
                },] },
    ];
    WzConfirmationDialogComponent.ctorParameters = function () { return []; };
    WzConfirmationDialogComponent.propDecorators = {
        'strings': [{ type: core_1.Input },],
        'accept': [{ type: core_1.Output },],
        'decline': [{ type: core_1.Output },],
    };
    return WzConfirmationDialogComponent;
}());
exports.WzConfirmationDialogComponent = WzConfirmationDialogComponent;
//# sourceMappingURL=wz.confirmation-dialog.component.js.map