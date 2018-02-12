"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var WzItemSearchFormComponent = (function () {
    function WzItemSearchFormComponent(fb) {
        this.fb = fb;
        this.query = new core_1.EventEmitter();
        this.closeSearch = new core_1.EventEmitter();
        this.setForm();
    }
    WzItemSearchFormComponent.prototype.setForm = function () {
        this.itemSearch = this.fb.group({ q: ['', forms_1.Validators.required] });
    };
    WzItemSearchFormComponent.prototype.onSubmit = function () {
        this.query.emit(this.itemSearch.value);
    };
    WzItemSearchFormComponent.prototype.resetSearch = function () {
        this.itemSearch.controls['q'].reset('');
        this.onSubmit();
    };
    WzItemSearchFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-item-search-form',
                    templateUrl: 'wz.item-search-form.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzItemSearchFormComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
    ]; };
    WzItemSearchFormComponent.propDecorators = {
        'currentSearchQuery': [{ type: core_1.Input },],
        'placeholderTxt': [{ type: core_1.Input },],
        'query': [{ type: core_1.Output },],
        'closeSearch': [{ type: core_1.Output },],
    };
    return WzItemSearchFormComponent;
}());
exports.WzItemSearchFormComponent = WzItemSearchFormComponent;
//# sourceMappingURL=wz.item-search-form.component.js.map