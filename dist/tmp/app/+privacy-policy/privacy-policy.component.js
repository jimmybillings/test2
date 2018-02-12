"use strict";
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
    PrivacyPolicyComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'privacy-policy-component',
                    template: "\n    <div class=\"privacy-policy\" layout=\"row\" layout-align=\"center center\">\n      <mat-card flex=\"90\">\n        <mat-card-content [innerHTML]=\"document | async\"></mat-card-content>\n      </mat-card>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    styles: [
                        "\n    .privacy-policy mat-card { margin: 20px 0; }\n    "
                    ]
                },] },
    ];
    PrivacyPolicyComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return PrivacyPolicyComponent;
}());
exports.PrivacyPolicyComponent = PrivacyPolicyComponent;
//# sourceMappingURL=privacy-policy.component.js.map