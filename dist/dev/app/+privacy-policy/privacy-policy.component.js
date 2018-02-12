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
var app_store_1 = require("../app.store");
var PrivacyPolicyComponent = (function () {
    function PrivacyPolicyComponent(store) {
        this.store = store;
    }
    Object.defineProperty(PrivacyPolicyComponent.prototype, "document", {
        get: function () {
            return this.store.select(function (state) { return state.privacyPolicy.document; });
        },
        enumerable: true,
        configurable: true
    });
    PrivacyPolicyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'privacy-policy-component',
            template: "\n    <div class=\"privacy-policy\" layout=\"row\" layout-align=\"center center\">\n      <mat-card flex=\"90\">\n        <mat-card-content [innerHTML]=\"document | async\"></mat-card-content>\n      </mat-card>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: [
                "\n    .privacy-policy mat-card { margin: 20px 0; }\n    "
            ]
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], PrivacyPolicyComponent);
    return PrivacyPolicyComponent;
}());
exports.PrivacyPolicyComponent = PrivacyPolicyComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQW1FO0FBRW5FLDBDQUF3QztBQW1CeEM7SUFDRSxnQ0FBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBSSxDQUFDO0lBRXhDLHNCQUFXLDRDQUFRO2FBQW5CO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQTVCLENBQTRCLENBQUMsQ0FBQztRQUNsRSxDQUFDOzs7T0FBQTtJQUxVLHNCQUFzQjtRQWpCbEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFFBQVEsRUFBRSxxT0FNVDtZQUNELGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLE1BQU0sRUFBRTtnQkFDTiwwREFFQzthQUNGO1NBQ0YsQ0FBQzt5Q0FFMkIsb0JBQVE7T0FEeEIsc0JBQXNCLENBTWxDO0lBQUQsNkJBQUM7Q0FORCxBQU1DLElBQUE7QUFOWSx3REFBc0IiLCJmaWxlIjoiYXBwLytwcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdwcml2YWN5LXBvbGljeS1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwcml2YWN5LXBvbGljeVwiIGxheW91dD1cInJvd1wiIGxheW91dC1hbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgIDxtYXQtY2FyZCBmbGV4PVwiOTBcIj5cbiAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnQgW2lubmVySFRNTF09XCJkb2N1bWVudCB8IGFzeW5jXCI+PC9tYXQtY2FyZC1jb250ZW50PlxuICAgICAgPC9tYXQtY2FyZD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAucHJpdmFjeS1wb2xpY3kgbWF0LWNhcmQgeyBtYXJnaW46IDIwcHggMDsgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQcml2YWN5UG9saWN5Q29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyBnZXQgZG9jdW1lbnQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucHJpdmFjeVBvbGljeS5kb2N1bWVudCk7XG4gIH1cbn1cbiJdfQ==
