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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var wz_form_model_1 = require("../../../../shared/modules/wz-form/wz.form.model");
var wz_form_base_1 = require("../../../../shared/modules/wz-form/wz.form-base");
var WzFormPicklistComponent = (function (_super) {
    __extends(WzFormPicklistComponent, _super);
    function WzFormPicklistComponent(fb, formModel, element) {
        var _this = _super.call(this, fb, formModel, element) || this;
        _this.propertiesToIgnore = ['contacts', 'name', 'id'];
        _this.selectContact = new core_1.EventEmitter();
        _this.checkboxChange = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(WzFormPicklistComponent.prototype, "displayProperties", {
        set: function (properties) {
            var _this = this;
            var tempLabels = Object.keys(properties || [])
                .filter(function (property) { return !_this.propertiesToIgnore.includes(property); })
                .map(function (property) {
                var label = property.replace(/([A-Z])/g, function (str) { return "_" + str.toLowerCase(); });
                label = "QUOTE.EDIT." + label.toUpperCase() + "_KEY";
                return { label: label, value: properties[property] };
            });
            this.labels = new BehaviorSubject_1.BehaviorSubject(tempLabels);
        },
        enumerable: true,
        configurable: true
    });
    WzFormPicklistComponent.prototype.onSelectChange = function (suggestion) {
        this.selectContact.emit(suggestion);
    };
    WzFormPicklistComponent.prototype.onCheckboxChange = function (event) {
        this.checkboxChange.emit(event);
    };
    WzFormPicklistComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-form-picklist-component',
                    templateUrl: 'wz-form-picklist.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzFormPicklistComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
        { type: wz_form_model_1.FormModel, },
        { type: core_1.ElementRef, },
    ]; };
    WzFormPicklistComponent.propDecorators = {
        'title': [{ type: core_1.Input },],
        'displayProperties': [{ type: core_1.Input },],
        'selectContact': [{ type: core_1.Output },],
        'checkboxChange': [{ type: core_1.Output },],
    };
    return WzFormPicklistComponent;
}(wz_form_base_1.WzFormBase));
exports.WzFormPicklistComponent = WzFormPicklistComponent;
//# sourceMappingURL=wz-form-picklist.component.js.map