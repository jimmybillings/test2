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
var FooterComponent = (function () {
    function FooterComponent() {
    }
    Object.defineProperty(FooterComponent.prototype, "privacyPolicyExists", {
        get: function () {
            return this.config &&
                this.config.hasOwnProperty('privacyPolicyId') &&
                this.config.privacyPolicyId.hasOwnProperty('value') &&
                this.config.privacyPolicyId.value !== '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterComponent.prototype, "showContacts", {
        get: function () {
            return this.config &&
                this.config.hasOwnProperty('contacts') &&
                this.config.contacts.hasOwnProperty('items') &&
                this.config.contacts.items.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterComponent.prototype, "contacts", {
        get: function () {
            return this.config.contacts.items;
        },
        enumerable: true,
        configurable: true
    });
    FooterComponent.prototype.show = function (value) {
        return value !== undefined;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FooterComponent.prototype, "config", void 0);
    FooterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-footer',
            templateUrl: 'footer.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUEwRTtBQVkxRTtJQUFBO0lBd0JBLENBQUM7SUFyQkMsc0JBQVcsZ0RBQW1CO2FBQTlCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztnQkFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHlDQUFZO2FBQXZCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcscUNBQVE7YUFBbkI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRU0sOEJBQUksR0FBWCxVQUFZLEtBQWE7UUFDdkIsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQXRCUTtRQUFSLFlBQUssRUFBRTs7bURBQWE7SUFEVixlQUFlO1FBUDNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUVXLGVBQWUsQ0F3QjNCO0lBQUQsc0JBQUM7Q0F4QkQsQUF3QkMsSUFBQTtBQXhCWSwwQ0FBZSIsImZpbGUiOiJhcHAvYXBwbGljYXRpb24vZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogc2l0ZSBmb290ZXIgY29tcG9uZW50IC0gcmVuZGVycyB0aGUgZm9vdGVyIGluZm9ybWF0aW9uXG4gKi9cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1mb290ZXInLFxuICB0ZW1wbGF0ZVVybDogJ2Zvb3Rlci5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBGb290ZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBjb25maWc6IGFueTtcblxuICBwdWJsaWMgZ2V0IHByaXZhY3lQb2xpY3lFeGlzdHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnICYmXG4gICAgICB0aGlzLmNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgncHJpdmFjeVBvbGljeUlkJykgJiZcbiAgICAgIHRoaXMuY29uZmlnLnByaXZhY3lQb2xpY3lJZC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSAmJlxuICAgICAgdGhpcy5jb25maWcucHJpdmFjeVBvbGljeUlkLnZhbHVlICE9PSAnJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd0NvbnRhY3RzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZyAmJlxuICAgICAgdGhpcy5jb25maWcuaGFzT3duUHJvcGVydHkoJ2NvbnRhY3RzJykgJiZcbiAgICAgIHRoaXMuY29uZmlnLmNvbnRhY3RzLmhhc093blByb3BlcnR5KCdpdGVtcycpICYmXG4gICAgICB0aGlzLmNvbmZpZy5jb250YWN0cy5pdGVtcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHVibGljIGdldCBjb250YWN0cygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb250YWN0cy5pdGVtcztcbiAgfVxuXG4gIHB1YmxpYyBzaG93KHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgfVxufVxuIl19
