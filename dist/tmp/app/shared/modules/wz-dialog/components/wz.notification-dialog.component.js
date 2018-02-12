"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzNotificationDialogComponent = (function () {
    function WzNotificationDialogComponent() {
    }
    WzNotificationDialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-notification-dialog',
                    template: "\n    <h1 mat-dialog-title>{{ strings.title | translate }}</h1>\n    <mat-dialog-content layout=\"row\">\n      <div flex>{{ strings.message | translate }}</div>\n    </mat-dialog-content>\n    <mat-dialog-actions layout=\"row\" layout-align=\"end end\">\n      <button mat-button mat-dialog-close color=\"primary\" title=\"{{ strings.prompt | translate }}\">\n        {{ strings.prompt | translate }}\n      </button>\n    </mat-dialog-actions>\n  "
                },] },
    ];
    WzNotificationDialogComponent.ctorParameters = function () { return []; };
    WzNotificationDialogComponent.propDecorators = {
        'strings': [{ type: core_1.Input },],
    };
    return WzNotificationDialogComponent;
}());
exports.WzNotificationDialogComponent = WzNotificationDialogComponent;
//# sourceMappingURL=wz.notification-dialog.component.js.map