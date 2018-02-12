"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_store_1 = require("../../../app.store");
var common_functions_1 = require("../../utilities/common.functions");
var WzPricingComponent = (function () {
    function WzPricingComponent(fb, store) {
        var _this = this;
        this.fb = fb;
        this.store = store;
        this.pricingEvent = new core_1.EventEmitter();
        this.price = this.store.select(function (state) { return state.pricing.priceForDialog; });
        this.storeSubscription = this.store.select(function (state) { return state.pricing.attributes; }).subscribe(function (attrs) { return _this.attributes = attrs; });
    }
    Object.defineProperty(WzPricingComponent.prototype, "userCanCustomizeRights", {
        set: function (canCustomize) {
            this._userCanCustomizeRights = canCustomize;
            if (canCustomize) {
                this.buildCustomForm();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzPricingComponent.prototype, "pricingPreferences", {
        set: function (preferences) {
            var _this = this;
            this._pricingPreferences = preferences;
            if (!this.form) {
                this.buildForm();
            }
            if (!common_functions_1.Common.isEmpty(preferences) && !this.priceBookChanged) {
                setTimeout(function () { _this.pricingEvent.emit({ type: 'CALCULATE_PRICE', payload: preferences }); }, 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    WzPricingComponent.prototype.ngOnDestroy = function () {
        this.formSubscription.unsubscribe();
        this.storeSubscription.unsubscribe();
    };
    WzPricingComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.form.valid)
            return;
        if (this.price) {
            this.price.take(1).subscribe(function (price) {
                _this.pricingEvent.emit({
                    type: 'APPLY_PRICE',
                    payload: {
                        price: price,
                        attributes: _this.formValue,
                        updatePrefs: true,
                        preferences: _this.form.value
                    }
                });
            });
        }
        else {
            this.pricingEvent.emit({
                type: 'APPLY_PRICE',
                payload: {
                    attributes: this.formValue,
                    updatePrefs: true,
                    preferences: this.form.value
                }
            });
        }
    };
    WzPricingComponent.prototype.onSubmitCustom = function () {
        this.pricingEvent.emit({
            type: 'APPLY_PRICE',
            payload: {
                attributes: this.customFormValue,
                updatePrefs: false
            }
        });
    };
    WzPricingComponent.prototype.parentIsEmpty = function (currentAttribute) {
        if (currentAttribute.primary) {
            return false;
        }
        else {
            var parent_1 = this.findParentOf(currentAttribute);
            return this.form.controls[parent_1.name].value === '';
        }
    };
    WzPricingComponent.prototype.validOptionsFor = function (currentAttribute) {
        var _this = this;
        if (this.parentIsEmpty(currentAttribute))
            return;
        if (currentAttribute.primary) {
            return currentAttribute.attributeList;
        }
        else {
            var parent_2 = this.findParentOf(currentAttribute);
            var parentFormValue = this.form.controls[parent_2.name].value;
            var rawOptions = parent_2.validChildChoicesMap[parentFormValue];
            if (!rawOptions) {
                this.clearForm(Object.keys(this.form.controls));
                return;
            }
            var options = rawOptions.map(function (optionValue) {
                return _this.findOption(optionValue, currentAttribute);
            });
            return options;
        }
    };
    WzPricingComponent.prototype.handleSelect = function (event, attribute) {
        if (event.isUserInput) {
            var controlNames = Object.keys(this.form.controls);
            var currentControlIndex = controlNames.indexOf(attribute.name);
            var controlNamesToClear = controlNames.slice(currentControlIndex + 1);
            var controlNamesToDisable = controlNames.slice(currentControlIndex + 2);
            if (controlNamesToClear.length > 0)
                this.clearForm(controlNamesToClear);
            if (controlNamesToDisable.length > 0)
                this.disableForm(controlNamesToDisable);
        }
    };
    WzPricingComponent.prototype.buildCustomForm = function () {
        var primaryAttributeName = this.attributes.find(function (attribute) { return attribute.primary; }).name;
        this.customForm = this.fb.group((_a = {},
            _a[primaryAttributeName] = [
                this._pricingPreferences[primaryAttributeName] || null,
                forms_1.Validators.required
            ],
            _a.attributes = [
                this.csvFor(this.attributes),
                forms_1.Validators.compose([
                    forms_1.Validators.pattern(/^(([\w ]+,[\w ]+\n)*[\w ]+,[\w ]+\n{0,1}){0,1}$/),
                    forms_1.Validators.required
                ])
            ],
            _a));
        var _a;
    };
    WzPricingComponent.prototype.csvFor = function (attributes) {
        var _this = this;
        return attributes.filter(function (attribute) { return !attribute.primary; }).reduce(function (csv, attribute) {
            return csv.concat(attribute.name + "," + (_this._pricingPreferences[attribute.name] || '') + "\n");
        }, '').trim();
    };
    Object.defineProperty(WzPricingComponent.prototype, "customFormValue", {
        get: function () {
            var selectedOption = this.findOption(this.customForm.value[this.attributes[0].name], this.attributes[0]);
            var formatted = [{
                    priceAttributeDisplayName: this.attributes[0].displayName,
                    priceAttributeName: this.attributes[0].name,
                    selectedAttributeName: selectedOption.name,
                    selectedAttributeValue: selectedOption.value
                }];
            this.customForm.value.attributes.split('\n').forEach(function (pair) {
                var _a = pair.split(',').map(function (s) { return s.trim(); }), priceAttributeName = _a[0], selectedAttributeValue = _a[1];
                formatted.push({
                    priceAttributeDisplayName: priceAttributeName,
                    priceAttributeName: priceAttributeName,
                    selectedAttributeName: selectedAttributeValue,
                    selectedAttributeValue: selectedAttributeValue
                });
            });
            return formatted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzPricingComponent.prototype, "formValue", {
        get: function () {
            var formatted = [];
            for (var attributeName in this.form.value) {
                var selectedAttribute = this.findAttribute(attributeName);
                var selectedOption = this.findOption(this.form.value[attributeName], selectedAttribute);
                var priceAttributeDisplayName = selectedAttribute.displayName;
                var priceAttributeName = selectedAttribute.name;
                var selectedAttributeName = selectedOption.name;
                var selectedAttributeValue = selectedOption.value;
                formatted.push({
                    priceAttributeDisplayName: priceAttributeDisplayName,
                    priceAttributeName: priceAttributeName,
                    selectedAttributeName: selectedAttributeName,
                    selectedAttributeValue: selectedAttributeValue
                });
            }
            return formatted;
        },
        enumerable: true,
        configurable: true
    });
    WzPricingComponent.prototype.findAttribute = function (attributeName) {
        return this.attributes.find(function (attribute) { return attribute.name === attributeName; });
    };
    WzPricingComponent.prototype.findParentOf = function (currentAttribute) {
        return this.attributes.find(function (attribute) { return attribute.childId === currentAttribute.id; });
    };
    WzPricingComponent.prototype.findOption = function (optionValue, attribute) {
        return attribute.attributeList.find(function (option) { return option.value === optionValue; });
    };
    WzPricingComponent.prototype.buildForm = function () {
        var _this = this;
        var form = {};
        this.attributes.forEach(function (attribute, index) {
            var value = _this._pricingPreferences[attribute.name] || '';
            form[attribute.name] = new forms_1.FormControl({
                value: value || '',
                disabled: value ? false : index !== 0
            }, forms_1.Validators.required);
        });
        this.form = this.fb.group(form);
        this.formSubscription = this.form.valueChanges.subscribe(function (value) {
            if (_this.form.valid) {
                _this.pricingEvent.emit({ type: 'CALCULATE_PRICE', payload: value });
            }
        });
    };
    WzPricingComponent.prototype.clearForm = function (controlNames) {
        for (var _i = 0, controlNames_1 = controlNames; _i < controlNames_1.length; _i++) {
            var controlName = controlNames_1[_i];
            var control = this.form.controls[controlName];
            control.setValue('');
            control.enable();
        }
    };
    WzPricingComponent.prototype.disableForm = function (controlNames) {
        for (var _i = 0, controlNames_2 = controlNames; _i < controlNames_2.length; _i++) {
            var control = controlNames_2[_i];
            this.form.controls[control].disable();
        }
    };
    Object.defineProperty(WzPricingComponent.prototype, "priceBookChanged", {
        get: function () {
            var attributeNames = this.attributes.map(function (attr) { return attr.name; }).sort();
            var prefNames = Object.keys(this._pricingPreferences).sort();
            return !prefNames.every(function (pref, index) { return pref === attributeNames[index]; });
        },
        enumerable: true,
        configurable: true
    });
    WzPricingComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-pricing',
                    templateUrl: 'wz.pricing.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzPricingComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
        { type: app_store_1.AppStore, },
    ]; };
    WzPricingComponent.propDecorators = {
        'pricingEvent': [{ type: core_1.Output },],
        'userCanCustomizeRights': [{ type: core_1.Input },],
        'pricingPreferences': [{ type: core_1.Input },],
    };
    return WzPricingComponent;
}());
exports.WzPricingComponent = WzPricingComponent;
//# sourceMappingURL=wz.pricing.component.js.map