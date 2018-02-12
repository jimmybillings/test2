"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wz_form_component_1 = require("../../modules/wz-form/wz.form.component");
var WzShareComponent = (function () {
    function WzShareComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.allowShareLink = true;
        this.shareLinkRequest = new core_1.EventEmitter();
        this.closeRequest = new core_1.EventEmitter();
        this.formSubmit = new core_1.EventEmitter();
        this.shareLinkIsOpen = false;
    }
    WzShareComponent.prototype.ngOnDestroy = function () {
        this.close();
    };
    WzShareComponent.prototype.openShareLink = function () {
        this.shareLinkRequest.emit();
        this.shareLinkIsOpen = true;
    };
    WzShareComponent.prototype.onShareLinkCloseRequest = function () {
        this.shareLinkIsOpen = false;
    };
    WzShareComponent.prototype.onFormSubmit = function (shareParameters) {
        this.formSubmit.emit(shareParameters);
        this.close();
    };
    WzShareComponent.prototype.onFormCancel = function () {
        this.close();
    };
    WzShareComponent.prototype.close = function () {
        this.wzForm.resetForm();
        this.closeRequest.emit();
    };
    WzShareComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-share',
                    templateUrl: 'wz.share.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzShareComponent.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
    ]; };
    WzShareComponent.propDecorators = {
        'titleKey': [{ type: core_1.Input },],
        'formFields': [{ type: core_1.Input },],
        'allowShareLink': [{ type: core_1.Input },],
        'shareLink': [{ type: core_1.Input },],
        'shareLinkRequest': [{ type: core_1.Output },],
        'closeRequest': [{ type: core_1.Output },],
        'formSubmit': [{ type: core_1.Output },],
        'wzForm': [{ type: core_1.ViewChild, args: [wz_form_component_1.WzFormComponent,] },],
    };
    return WzShareComponent;
}());
exports.WzShareComponent = WzShareComponent;
//# sourceMappingURL=wz.share.component.js.map