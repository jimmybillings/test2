"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeCallToActionComponent = (function () {
    function HomeCallToActionComponent() {
    }
    HomeCallToActionComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'home-call-to-action',
                    template: "\n    <section class=\"mrkt-call-to-action\">\n      <div layout=\"row\" layout-align=\"center start\" layout-padding=\"\">\n        <div flex-gt-lg=\"60\" flex-gt-md=\"70\" flex=\"95\" layout-align=\"center start\">\n          <h2 class=\"mat-display-1\">{{ 'HOME.DESCRIPTION' | translate}}</h2>\n          <button *ngIf=\"!currentUser.loggedIn()\" mat-button [routerLink]=\"['/user/register']\" class=\"mat-block conversion\">\n            {{'HOME.START_PROJECT' | translate }}\n          </button>\n          <button *ngIf=\"currentUser.loggedIn()\" mat-button [routerLink]=\"['/user']\" class=\"mat-block conversion\">\n            {{'HOME.START_PROJECT' | translate }}\n          </button>\n        </div>\n      </div>\n    </section>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    HomeCallToActionComponent.ctorParameters = function () { return []; };
    HomeCallToActionComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'currentUser': [{ type: core_1.Input },],
    };
    return HomeCallToActionComponent;
}());
exports.HomeCallToActionComponent = HomeCallToActionComponent;
//# sourceMappingURL=home-call-to-action.component.js.map