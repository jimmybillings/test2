"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzPricingComponent.prototype, "pricingEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], WzPricingComponent.prototype, "userCanCustomizeRights", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WzPricingComponent.prototype, "pricingPreferences", null);
    WzPricingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-pricing',
            templateUrl: 'wz.pricing.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, app_store_1.AppStore])
    ], WzPricingComponent);
    return WzPricingComponent;
}());
exports.WzPricingComponent = WzPricingComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1wcmljaW5nL3d6LnByaWNpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJHO0FBQzNHLHdDQUFrRztBQUtsRyxnREFBOEM7QUFFOUMscUVBQTBEO0FBUTFEO0lBNEJFLDRCQUFvQixFQUFlLEVBQVUsS0FBZTtRQUE1RCxpQkFHQztRQUhtQixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQXRCbEQsaUJBQVksR0FBMEIsSUFBSSxtQkFBWSxFQUFXLENBQUM7UUF1QjFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUF4QixDQUF3QixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLEVBQXZCLENBQXVCLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBdkJELHNCQUFJLHNEQUFzQjthQUExQixVQUEyQixZQUFxQjtZQUM5QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixDQUFDO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrREFBa0I7YUFBdEIsVUFBdUIsV0FBaUI7WUFEeEMsaUJBU0M7WUFQQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsV0FBVyxD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TSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQVksRUFBRSxLQUFhLElBQUssT0FBQSxJQUFJLEtBQUssY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDM0YsQ0FBQzs7O09BQUE7SUE1T1M7UUFBVCxhQUFNLEVBQUU7a0NBQWUsbUJBQVk7NERBQXdDO0lBRTVFO1FBREMsWUFBSyxFQUFFOzs7b0VBTVA7SUFFRDtRQURDLFlBQUssRUFBRTs7O2dFQVNQO0lBdkJVLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0E2QndCLG1CQUFXLEVBQWlCLG9CQUFRO09BNUJqRCxrQkFBa0IsQ0FtUDlCO0lBQUQseUJBQUM7Q0FuUEQsQUFtUEMsSUFBQTtBQW5QWSxnREFBa0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXByaWNpbmcvd3oucHJpY2luZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUHJpY2VBdHRyaWJ1dGUsIFByaWNlT3B0aW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFBvam8sIFd6RXZlbnQsIFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1wcmljaW5nJyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5wcmljaW5nLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBXelByaWNpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuICBwdWJsaWMgY3VzdG9tRm9ybTogRm9ybUdyb3VwO1xuICBwdWJsaWMgYXR0cmlidXRlczogQXJyYXk8UHJpY2VBdHRyaWJ1dGU+O1xuICBwdWJsaWMgcHJpY2U6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcHVibGljIF91c2VyQ2FuQ3VzdG9taXplUmlnaHRzOiBib29sZWFuO1xuICBAT3V0cHV0KCkgcHJpY2luZ0V2ZW50OiBFdmVudEVtaXR0ZXI8V3pFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFd6RXZlbnQ+KCk7XG4gIEBJbnB1dCgpXG4gIHNldCB1c2VyQ2FuQ3VzdG9taXplUmlnaHRzKGNhbkN1c3RvbWl6ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3VzZXJDYW5DdXN0b21pemVSaWdodHMgPSBjYW5DdXN0b21pemU7XG4gICAgaWYgKGNhbkN1c3RvbWl6ZSkge1xuICAgICAgdGhpcy5idWlsZEN1c3RvbUZvcm0oKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHByaWNpbmdQcmVmZXJlbmNlcyhwcmVmZXJlbmNlczogUG9qbykge1xuICAgIHRoaXMuX3ByaWNpbmdQcmVmZXJlbmNlcyA9IHByZWZlcmVuY2VzO1xuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLmJ1aWxkRm9ybSgpO1xuICAgIH1cbiAgICBpZiAoIUNvbW1vbi5pc0VtcHR5KHByZWZlcmVuY2VzKSAmJiAhdGhpcy5wcmljZUJvb2tDaGFuZ2VkKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5wcmljaW5nRXZlbnQuZW1pdCh7IHR5cGU6ICdDQUxDVUxBVEVfUFJJQ0UnLCBwYXlsb2FkOiBwcmVmZXJlbmNlcyB9KTsgfSwgMCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgZm9ybVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN0b3JlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX3ByaWNpbmdQcmVmZXJlbmNlczogUG9qbztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHtcbiAgICB0aGlzLnByaWNlID0gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucHJpY2luZy5wcmljZUZvckRpYWxvZyk7XG4gICAgdGhpcy5zdG9yZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnByaWNpbmcuYXR0cmlidXRlcykuc3Vic2NyaWJlKGF0dHJzID0+IHRoaXMuYXR0cmlidXRlcyA9IGF0dHJzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZm9ybVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3RvcmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvblN1Ym1pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZm9ybS52YWxpZCkgcmV0dXJuO1xuICAgIC8vIFdoZW4gdGhlIGZvcm0gaXMgb3BlbmVkIGF0IHRoZSBwcm9qZWN0IGxldmVsIGluIGEgY2FydC9xdW90ZSwgdGhlcmUgaXMgbm8gcHJpY2VcbiAgICBpZiAodGhpcy5wcmljZSkge1xuICAgICAgdGhpcy5wcmljZS50YWtlKDEpLnN1YnNjcmliZSgocHJpY2U6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLnByaWNpbmdFdmVudC5lbWl0KHtcbiAgICAgICAgICB0eXBlOiAnQVBQTFlfUFJJQ0UnLFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuZm9ybVZhbHVlLFxuICAgICAgICAgICAgdXBkYXRlUHJlZnM6IHRydWUsXG4gICAgICAgICAgICBwcmVmZXJlbmNlczogdGhpcy5mb3JtLnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByaWNpbmdFdmVudC5lbWl0KHtcbiAgICAgICAgdHlwZTogJ0FQUExZX1BSSUNFJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuZm9ybVZhbHVlLFxuICAgICAgICAgIHVwZGF0ZVByZWZzOiB0cnVlLFxuICAgICAgICAgIHByZWZlcmVuY2VzOiB0aGlzLmZvcm0udmFsdWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uU3VibWl0Q3VzdG9tKCk6IHZvaWQge1xuICAgIHRoaXMucHJpY2luZ0V2ZW50LmVtaXQoe1xuICAgICAgdHlwZTogJ0FQUExZX1BSSUNFJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgYXR0cmlidXRlczogdGhpcy5jdXN0b21Gb3JtVmFsdWUsXG4gICAgICAgIHVwZGF0ZVByZWZzOiBmYWxzZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcmVudElzRW1wdHkoY3VycmVudEF0dHJpYnV0ZTogUHJpY2VBdHRyaWJ1dGUpOiBib29sZWFuIHtcbiAgICAvLyBJZiB0aGUgY3VycmVudEF0dHJpYnV0ZSBpcyB0aGUgdG9wLW1vc3QgcGFyZW50LCBpdCBzaG91bGQgbmV2ZXIgYmUgZGlzYWJsZWRcbiAgICBpZiAoY3VycmVudEF0dHJpYnV0ZS5wcmltYXJ5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZpbmQgdGhlIHBhcmVudCBhdHRyaWJ1dGUgb2YgdGhlIGN1cnJlbnRBdHRyaWJ1dGUgYW5kIGNoZWNrIHRoYXQgaXRzIHZhbHVlIGlzIG5vdCBlbXB0eVxuICAgICAgY29uc3QgcGFyZW50OiBQcmljZUF0dHJpYnV0ZSA9IHRoaXMuZmluZFBhcmVudE9mKGN1cnJlbnRBdHRyaWJ1dGUpO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sc1twYXJlbnQubmFtZV0udmFsdWUgPT09ICcnO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB2YWxpZE9wdGlvbnNGb3IoY3VycmVudEF0dHJpYnV0ZTogUHJpY2VBdHRyaWJ1dGUpOiBBcnJheTxQcmljZU9wdGlvbj4gfCB2b2lkIHtcbiAgICAvLyBJZiB0aGUgcGFyZW50IGF0dHJpYnV0ZSBoYXMgbm90IGJlZW4gc2VsZWN0ZWQsIHJldHVybjtcbiAgICBpZiAodGhpcy5wYXJlbnRJc0VtcHR5KGN1cnJlbnRBdHRyaWJ1dGUpKSByZXR1cm47XG4gICAgLy8gSWYgdGhlIGN1cnJlbnRBdHRyaWJ1dGUgaXMgdGhlIHByaW1hcnkgYXR0cmlidXRlLCB0aGUgdmFsaWQgY2hvaWNlcyBhcmUgaXRzIGF0dHJpYnV0ZUxpc3RcbiAgICBpZiAoY3VycmVudEF0dHJpYnV0ZS5wcmltYXJ5KSB7XG4gICAgICByZXR1cm4gY3VycmVudEF0dHJpYnV0ZS5hdHRyaWJ1dGVMaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGaW5kIHRoZSBwYXJlbnQgYXR0cmlidXRlIG9mIHRoZSBjdXJyZW50QXR0cmlidXRlXG4gICAgICBjb25zdCBwYXJlbnQ6IFByaWNlQXR0cmlidXRlID0gdGhpcy5maW5kUGFyZW50T2YoY3VycmVudEF0dHJpYnV0ZSk7XG4gICAgICAvLyBVc2UgdGhlIHBhcmVudCBhdHRyaWJ1dGUncyBuYW1lIHRvIGZpbmQgaXRzIGN1cnJlbnQgZm9ybSB2YWx1ZVxuICAgICAgY29uc3QgcGFyZW50Rm9ybVZhbHVlOiBzdHJpbmcgPSB0aGlzLmZvcm0uY29udHJvbHNbcGFyZW50Lm5hbWVdLnZhbHVlO1xuICAgICAgLy8gRmluZCB0aGUgdmFsaWQgY2hvaWNlcyBhcnJheSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBwcmV2aW91cyBvcHRpb24gdGhlIHVzZXIgc2VsZWN0ZWRcbiAgICAgIGNvbnN0IHJhd09wdGlvbnM6IEFycmF5PHN0cmluZz4gPSBwYXJlbnQudmFsaWRDaGlsZENob2ljZXNNYXBbcGFyZW50Rm9ybVZhbHVlXTtcbiAgICAgIC8vIFRoZXJlIHNob3VsZCBhbHdheXMgYmUgb3B0aW9ucywgaG93ZXZlciBpZiB0aGVyZSBhcmVuJ3Qgd2UgbmVlZCB0byBhbGVydCB0aGUgdXNlciB0aGUgY2FsY3VsYXRpb24gd2VudCB3cm9uZ1xuICAgICAgaWYgKCFyYXdPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY2xlYXJGb3JtKE9iamVjdC5rZXlzKHRoaXMuZm9ybS5jb250cm9scykpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBUaGUgcmF3IG9wdGlvbnMgaXMganVzdCBhbiBhcnJheSBvZiBzdHJpbmdzIHRoYXQgcmVwcmVzZW50IGF0dHJpYnV0ZSB2YWx1ZXNcbiAgICAgIC8vIHdlIG5lZWQgdG8gbWFwIHRoZW0gYmFjayB0byB0aGUgYXR0cmlidXRlTGlzdCBvZiB0aGUgb3B0aW9uIHRvIGdldCB0aGUgbmFtZSwgdmFsdWUsIG11bHRpcGxpZXIsIGV0YztcbiAgICAgIGNvbnN0IG9wdGlvbnM6IEFycmF5PFByaWNlT3B0aW9uPiA9IHJhd09wdGlvbnMubWFwKChvcHRpb25WYWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRPcHRpb24ob3B0aW9uVmFsdWUsIGN1cnJlbnRBdHRyaWJ1dGUpO1xuICAgICAgfSk7XG4gICAgICAvLyBGaW5hbGx5LCByZXR1cm4gdGhlIHZhbGlkIG9wdGlvbnNcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVTZWxlY3QoZXZlbnQ6IGFueSwgYXR0cmlidXRlOiBQcmljZUF0dHJpYnV0ZSk6IHZvaWQge1xuICAgIGlmIChldmVudC5pc1VzZXJJbnB1dCkge1xuICAgICAgY29uc3QgY29udHJvbE5hbWVzOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb250cm9sSW5kZXg6IG51bWJlciA9IGNvbnRyb2xOYW1lcy5pbmRleE9mKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgIGNvbnN0IGNvbnRyb2xOYW1lc1RvQ2xlYXI6IEFycmF5PHN0cmluZz4gPSBjb250cm9sTmFtZXMuc2xpY2UoY3VycmVudENvbnRyb2xJbmRleCArIDEpO1xuICAgICAgY29uc3QgY29udHJvbE5hbWVzVG9EaXNhYmxlOiBBcnJheTxzdHJpbmc+ID0gY29udHJvbE5hbWVzLnNsaWNlKGN1cnJlbnRDb250cm9sSW5kZXggKyAyKTtcbiAgICAgIGlmIChjb250cm9sTmFtZXNUb0NsZWFyLmxlbmd0aCA+IDApIHRoaXMuY2xlYXJGb3JtKGNvbnRyb2xOYW1lc1RvQ2xlYXIpO1xuICAgICAgaWYgKGNvbnRyb2xOYW1lc1RvRGlzYWJsZS5sZW5ndGggPiAwKSB0aGlzLmRpc2FibGVGb3JtKGNvbnRyb2xOYW1lc1RvRGlzYWJsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEN1c3RvbUZvcm0oKTogdm9pZCB7XG4gICAgY29uc3QgcHJpbWFyeUF0dHJpYnV0ZU5hbWU6IHN0cmluZyA9IHRoaXMuYXR0cmlidXRlcy5maW5kKGF0dHJpYnV0ZSA9PiBhdHRyaWJ1dGUucHJpbWFyeSkubmFtZTtcbiAgICB0aGlzLmN1c3RvbUZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIFtwcmltYXJ5QXR0cmlidXRlTmFtZV06IFtcbiAgICAgICAgdGhpcy5fcHJpY2luZ1ByZWZlcmVuY2VzW3ByaW1hcnlBdHRyaWJ1dGVOYW1lXSB8fCBudWxsLFxuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkXG4gICAgICBdLFxuICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICB0aGlzLmNzdkZvcih0aGlzLmF0dHJpYnV0ZXMpLFxuICAgICAgICBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybigvXigoW1xcdyBdKyxbXFx3IF0rXFxuKSpbXFx3IF0rLFtcXHcgXStcXG57MCwxfSl7MCwxfSQvKSxcbiAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkXG4gICAgICAgIF0pXG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNzdkZvcihhdHRyaWJ1dGVzOiBQcmljZUF0dHJpYnV0ZVtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYXR0cmlidXRlcy5maWx0ZXIoYXR0cmlidXRlID0+ICFhdHRyaWJ1dGUucHJpbWFyeSkucmVkdWNlKChjc3Y6IHN0cmluZywgYXR0cmlidXRlOiBQcmljZUF0dHJpYnV0ZSkgPT4ge1xuICAgICAgcmV0dXJuIGNzdi5jb25jYXQoYCR7YXR0cmlidXRlLm5hbWV9LCR7dGhpcy5fcHJpY2luZ1ByZWZlcmVuY2VzW2F0dHJpYnV0ZS5uYW1lXSB8fCAnJ31cXG5gKTtcbiAgICB9LCAnJykudHJpbSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY3VzdG9tRm9ybVZhbHVlKCk6IFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGVbXSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb246IFByaWNlT3B0aW9uID0gdGhpcy5maW5kT3B0aW9uKHRoaXMuY3VzdG9tRm9ybS52YWx1ZVt0aGlzLmF0dHJpYnV0ZXNbMF0ubmFtZV0sIHRoaXMuYXR0cmlidXRlc1swXSk7XG4gICAgbGV0IGZvcm1hdHRlZDogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdID0gW3tcbiAgICAgIHByaWNlQXR0cmlidXRlRGlzcGxheU5hbWU6IHRoaXMuYXR0cmlidXRlc1swXS5kaXNwbGF5TmFtZSxcbiAgICAgIHByaWNlQXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGVzWzBdLm5hbWUsXG4gICAgICBzZWxlY3RlZEF0dHJpYnV0ZU5hbWU6IHNlbGVjdGVkT3B0aW9uLm5hbWUsXG4gICAgICBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiBzZWxlY3RlZE9wdGlvbi52YWx1ZVxuICAgIH1dO1xuICAgIHRoaXMuY3VzdG9tRm9ybS52YWx1ZS5hdHRyaWJ1dGVzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKChwYWlyOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IFtwcmljZUF0dHJpYnV0ZU5hbWUsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWVdID0gcGFpci5zcGxpdCgnLCcpLm1hcChzID0+IHMudHJpbSgpKTtcbiAgICAgIGZvcm1hdHRlZC5wdXNoKHtcbiAgICAgICAgcHJpY2VBdHRyaWJ1dGVEaXNwbGF5TmFtZTogcHJpY2VBdHRyaWJ1dGVOYW1lLFxuICAgICAgICBwcmljZUF0dHJpYnV0ZU5hbWUsXG4gICAgICAgIHNlbGVjdGVkQXR0cmlidXRlTmFtZTogc2VsZWN0ZWRBdHRyaWJ1dGVWYWx1ZSxcbiAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVWYWx1ZVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1hdHRlZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZvcm1WYWx1ZSgpOiBTZWxlY3RlZFByaWNlQXR0cmlidXRlW10ge1xuICAgIGxldCBmb3JtYXR0ZWQ6IFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGF0dHJpYnV0ZU5hbWUgaW4gdGhpcy5mb3JtLnZhbHVlKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZEF0dHJpYnV0ZTogUHJpY2VBdHRyaWJ1dGUgPSB0aGlzLmZpbmRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbjogUHJpY2VPcHRpb24gPSB0aGlzLmZpbmRPcHRpb24odGhpcy5mb3JtLnZhbHVlW2F0dHJpYnV0ZU5hbWVdLCBzZWxlY3RlZEF0dHJpYnV0ZSk7XG5cbiAgICAgIGNvbnN0IHByaWNlQXR0cmlidXRlRGlzcGxheU5hbWU6IHN0cmluZyA9IHNlbGVjdGVkQXR0cmlidXRlLmRpc3BsYXlOYW1lO1xuICAgICAgY29uc3QgcHJpY2VBdHRyaWJ1dGVOYW1lOiBzdHJpbmcgPSBzZWxlY3RlZEF0dHJpYnV0ZS5uYW1lO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRBdHRyaWJ1dGVOYW1lOiBzdHJpbmcgPSBzZWxlY3RlZE9wdGlvbi5uYW1lO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRBdHRyaWJ1dGVWYWx1ZTogc3RyaW5nID0gc2VsZWN0ZWRPcHRpb24udmFsdWU7XG5cbiAgICAgIGZvcm1hdHRlZC5wdXNoKHtcbiAgICAgICAgcHJpY2VBdHRyaWJ1dGVEaXNwbGF5TmFtZSxcbiAgICAgICAgcHJpY2VBdHRyaWJ1dGVOYW1lLFxuICAgICAgICBzZWxlY3RlZEF0dHJpYnV0ZU5hbWUsXG4gICAgICAgIHNlbGVjdGVkQXR0cmlidXRlVmFsdWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0dGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IFByaWNlQXR0cmlidXRlIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLmZpbmQoYXR0cmlidXRlID0+IGF0dHJpYnV0ZS5uYW1lID09PSBhdHRyaWJ1dGVOYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFBhcmVudE9mKGN1cnJlbnRBdHRyaWJ1dGU6IFByaWNlQXR0cmlidXRlKTogUHJpY2VBdHRyaWJ1dGUge1xuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMuZmluZCgoYXR0cmlidXRlOiBQcmljZUF0dHJpYnV0ZSkgPT4gYXR0cmlidXRlLmNoaWxkSWQgPT09IGN1cnJlbnRBdHRyaWJ1dGUuaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kT3B0aW9uKG9wdGlvblZhbHVlOiBzdHJpbmcsIGF0dHJpYnV0ZTogUHJpY2VBdHRyaWJ1dGUpOiBQcmljZU9wdGlvbiB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZS5hdHRyaWJ1dGVMaXN0LmZpbmQoKG9wdGlvbjogUHJpY2VPcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gb3B0aW9uVmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEZvcm0oKTogdm9pZCB7XG4gICAgbGV0IGZvcm06IFBvam8gPSB7fTtcblxuICAgIHRoaXMuYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGU6IFByaWNlQXR0cmlidXRlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5fcHJpY2luZ1ByZWZlcmVuY2VzW2F0dHJpYnV0ZS5uYW1lXSB8fCAnJztcbiAgICAgIGZvcm1bYXR0cmlidXRlLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKHtcbiAgICAgICAgdmFsdWU6IHZhbHVlIHx8ICcnLFxuICAgICAgICBkaXNhYmxlZDogdmFsdWUgPyBmYWxzZSA6IGluZGV4ICE9PSAwXG4gICAgICB9LCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoZm9ybSk7XG5cbiAgICB0aGlzLmZvcm1TdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgICB0aGlzLnByaWNpbmdFdmVudC5lbWl0KHsgdHlwZTogJ0NBTENVTEFURV9QUklDRScsIHBheWxvYWQ6IHZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckZvcm0oY29udHJvbE5hbWVzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgZm9yIChsZXQgY29udHJvbE5hbWUgb2YgY29udHJvbE5hbWVzKSB7XG4gICAgICBjb25zdCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgPSB0aGlzLmZvcm0uY29udHJvbHNbY29udHJvbE5hbWVdO1xuICAgICAgY29udHJvbC5zZXRWYWx1ZSgnJyk7XG4gICAgICBjb250cm9sLmVuYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGlzYWJsZUZvcm0oY29udHJvbE5hbWVzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgZm9yIChsZXQgY29udHJvbCBvZiBjb250cm9sTmFtZXMpIHtcbiAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tjb250cm9sXS5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gdGhpcyBkb2VzIGEgY29tcGFyaXNvbiBvZiB0aGUgdXNlcidzIHByZWZlcmVuY2VzIGFuZCB0aGUgY3VycmVudCBwcmljZSBhdHRyaWJ1dGVzIHRvIG1ha2Ugc3VyZVxuICAvLyB0aGF0IHRoZSBwcmljZSBib29rIGhhc24ndCBjaGFuZ2VkIGRyYXN0aWNhbGx5IC0gaS5lLiBzaG91bGQgd2UgcHJlcG9wdWxhdGUgdGhlIGZvcm0uIEl0IGlnbm9yZXMgb3JkZXJcbiAgLy8gTk9URTogWydhJywgJ2InLCAnYyddID09PSBbJ2InLCAnYycsICdhJ10gLy8gPT4gdHJ1ZVxuICBwdWJsaWMgZ2V0IHByaWNlQm9va0NoYW5nZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLmF0dHJpYnV0ZXMubWFwKChhdHRyOiBQcmljZUF0dHJpYnV0ZSkgPT4gYXR0ci5uYW1lKS5zb3J0KCk7XG4gICAgY29uc3QgcHJlZk5hbWVzOiBBcnJheTxzdHJpbmc+ID0gT2JqZWN0LmtleXModGhpcy5fcHJpY2luZ1ByZWZlcmVuY2VzKS5zb3J0KCk7XG4gICAgcmV0dXJuICFwcmVmTmFtZXMuZXZlcnkoKHByZWY6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4gcHJlZiA9PT0gYXR0cmlidXRlTmFtZXNbaW5kZXhdKTtcbiAgfVxufVxuIl19
