"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EqualValidatorDirective = (function () {
    function EqualValidatorDirective(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    Object.defineProperty(EqualValidatorDirective.prototype, "isReverse", {
        get: function () {
            if (!this.reverse)
                return false;
            return this.reverse === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    EqualValidatorDirective.prototype.validate = function (c) {
        var v = c.value;
        var e = c.root.get(this.validateEqual);
        if (e && v !== e.value && !this.isReverse) {
            return {
                validateEqual: true
            };
        }
        if (e && v === e.value && this.isReverse) {
            if (e.errors !== null) {
                delete e.errors['validateEqual'];
                if (!Object.keys(e.errors).length)
                    e.setErrors(null);
            }
        }
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: true });
        }
        return null;
    };
    EqualValidatorDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[validateEqual]',
                    providers: [
                        { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return EqualValidatorDirective; }), multi: true }
                    ]
                },] },
    ];
    EqualValidatorDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['validateEqual',] },] },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['reverse',] },] },
    ]; };
    return EqualValidatorDirective;
}());
exports.EqualValidatorDirective = EqualValidatorDirective;
//# sourceMappingURL=wz-equal-validator.directive.js.map