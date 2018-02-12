"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzComingSoonComponent = (function () {
    function WzComingSoonComponent() {
    }
    WzComingSoonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-coming-soon',
                    template: "<mat-card  class=\"wz-dialog\">\n    <mat-card-title>Coming Soon!</mat-card-title>\n    <mat-card-subtitle>Apologies!! This feature has not been implemented yet. Please keep checking for it.</mat-card-subtitle>\n    <mat-card-actions align=\"end\" class=\"confirmation-buttons\">\n      <button mat-button mat-dialog-close color=\"primary\">Close</button>\n    </mat-card-actions>\n  </mat-card>",
                    styles: [
                        'mat-card.wz-dialog{ box-shadow: none; padding: 0 2px 6px 0;}'
                    ],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzComingSoonComponent.ctorParameters = function () { return []; };
    return WzComingSoonComponent;
}());
exports.WzComingSoonComponent = WzComingSoonComponent;
//# sourceMappingURL=wz-coming-soon.component.js.map