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
var WzFormAutoCompleteViewComponent = (function (_super) {
    __extends(WzFormAutoCompleteViewComponent, _super);
    function WzFormAutoCompleteViewComponent(fb, formModel, element) {
        var _this = _super.call(this, fb, formModel, element) || this;
        _this.propertiesToIgnore = [
            'name', 'id', 'email', 'invoiceContactId', 'salesOwner', 'paymentTermsDays', 'readonlyPaymentTermsDays'
        ];
        return _this;
    }
    Object.defineProperty(WzFormAutoCompleteViewComponent.prototype, "displayProperties", {
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
    WzFormAutoCompleteViewComponent.prototype.onSelectSuggestion = function (suggestion) {
        this.formSubmit.emit(suggestion);
    };
    WzFormAutoCompleteViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-form-autocomplete-view',
                    templateUrl: 'wz-form-autocomplete-view.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzFormAutoCompleteViewComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
        { type: wz_form_model_1.FormModel, },
        { type: core_1.ElementRef, },
    ]; };
    WzFormAutoCompleteViewComponent.propDecorators = {
        'title': [{ type: core_1.Input },],
        'matchOnProperty': [{ type: core_1.Input },],
        'displayProperties': [{ type: core_1.Input },],
    };
    return WzFormAutoCompleteViewComponent;
}(wz_form_base_1.WzFormBase));
exports.WzFormAutoCompleteViewComponent = WzFormAutoCompleteViewComponent;
//# sourceMappingURL=wz-form-autocomplete-view.component.js.map