"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzFormDialogComponent = (function () {
    function WzFormDialogComponent() {
        this.cancel = new core_1.EventEmitter();
        this.submit = new core_1.EventEmitter();
    }
    WzFormDialogComponent.prototype.onFormCancel = function () {
        this.cancel.emit();
    };
    WzFormDialogComponent.prototype.onFormSubmit = function (results) {
        this.submit.emit(results);
    };
    WzFormDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-form-dialog',
                    template: "\n    <div class=\"wz-dialog\">\n      <button mat-icon-button mat-dialog-close title=\"Close\" type=\"button\" class=\"close\">\n        <mat-icon>close</mat-icon>\n      </button>\n      <h1 *ngIf=\"title\" mat-dialog-title>{{ title | translate }}</h1>\n      <mat-dialog-content layout=\"row\">\n        <wz-form\n          [items]=\"formItems\"\n          [includeCancel]=\"displayCancelButton\"\n          [cancelLabel]=\"cancelLabel\"\n          [submitLabel]=\"submitLabel\"\n          [autocomplete]=\"autocomplete\"\n          (formCancel)=\"onFormCancel()\"\n          (formSubmit)=\"onFormSubmit($event)\">\n        </wz-form>\n      </mat-dialog-content>\n    </div>\n  "
                },] },
    ];
    WzFormDialogComponent.ctorParameters = function () { return []; };
    WzFormDialogComponent.propDecorators = {
        'formItems': [{ type: core_1.Input },],
        'title': [{ type: core_1.Input },],
        'displayCancelButton': [{ type: core_1.Input },],
        'cancelLabel': [{ type: core_1.Input },],
        'submitLabel': [{ type: core_1.Input },],
        'autocomplete': [{ type: core_1.Input },],
        'cancel': [{ type: core_1.Output },],
        'submit': [{ type: core_1.Output },],
    };
    return WzFormDialogComponent;
}());
exports.WzFormDialogComponent = WzFormDialogComponent;
//# sourceMappingURL=wz.form-dialog.component.js.map