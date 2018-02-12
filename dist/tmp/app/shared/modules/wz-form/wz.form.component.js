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
var WzFormComponent = (function (_super) {
    __extends(WzFormComponent, _super);
    function WzFormComponent(fb, formModel, element) {
        return _super.call(this, fb, formModel, element) || this;
    }
    WzFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-form',
                    templateUrl: 'wz.form.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzFormComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
        { type: wz_form_model_1.FormModel, },
        { type: core_1.ElementRef, },
    ]; };
    return WzFormComponent;
}(wz_form_base_1.WzFormBase));
exports.WzFormComponent = WzFormComponent;
//# sourceMappingURL=wz.form.component.js.map