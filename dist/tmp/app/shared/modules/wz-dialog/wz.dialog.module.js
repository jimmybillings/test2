"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var wz_design_module_1 = require("../wz-design/wz.design.module");
var core_2 = require("@ngx-translate/core");
var wz_form_module_1 = require("../wz-form/wz-form.module");
var wz_dialog_service_1 = require("./services/wz.dialog.service");
var index_1 = require("./components/index");
var WzDialogModule = (function () {
    function WzDialogModule() {
    }
    WzDialogModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        wz_design_module_1.MaterialModule,
                        core_2.TranslateModule,
                        wz_form_module_1.WzFormModule
                    ],
                    declarations: [
                        index_1.WzNotificationDialogComponent,
                        index_1.WzFormDialogComponent,
                        index_1.WzConfirmationDialogComponent
                    ],
                    entryComponents: [
                        index_1.WzNotificationDialogComponent,
                        index_1.WzFormDialogComponent,
                        index_1.WzConfirmationDialogComponent
                    ],
                    providers: [wz_dialog_service_1.WzDialogService]
                },] },
    ];
    WzDialogModule.ctorParameters = function () { return []; };
    return WzDialogModule;
}());
exports.WzDialogModule = WzDialogModule;
//# sourceMappingURL=wz.dialog.module.js.map