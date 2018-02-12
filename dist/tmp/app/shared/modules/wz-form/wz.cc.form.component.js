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
var forms_1 = require("@angular/forms");
var wz_form_model_1 = require("./wz.form.model");
var wz_form_base_1 = require("./wz.form-base");
var WzCcFormComponent = (function (_super) {
    __extends(WzCcFormComponent, _super);
    function WzCcFormComponent(fb, formModel, element) {
        var _this = _super.call(this, fb, formModel, element) || this;
        _this.allowEdit = false;
        _this.onEdit = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(WzCcFormComponent.prototype, "successfullyVerified", {
        set: function (formSent) {
            if (formSent) {
                this.allowEdit = true;
                if (this.form)
                    this.disableForm();
            }
            else {
                this.allowEdit = false;
                if (this.form)
                    this.activateForm();
            }
        },
        enumerable: true,
        configurable: true
    });
    WzCcFormComponent.prototype.editCard = function () {
        this.onEdit.emit();
    };
    WzCcFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-cc-form',
                    templateUrl: 'wz.cc.form.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzCcFormComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
        { type: wz_form_model_1.FormModel, },
        { type: core_1.ElementRef, },
    ]; };
    WzCcFormComponent.propDecorators = {
        'successfullyVerified': [{ type: core_1.Input },],
        'onEdit': [{ type: core_1.Output },],
    };
    return WzCcFormComponent;
}(wz_form_base_1.WzFormBase));
exports.WzCcFormComponent = WzCcFormComponent;
//# sourceMappingURL=wz.cc.form.component.js.map