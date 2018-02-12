"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    WzDialogModule = __decorate([
        core_1.NgModule({
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
        })
    ], WzDialogModule);
    return WzDialogModule;
}());
exports.WzDialogModule = WzDialogModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvd3ouZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6QywwQ0FBK0M7QUFDL0Msa0VBQStEO0FBQy9ELDRDQUFzRDtBQUV0RCw0REFBeUQ7QUFHekQsa0VBQStEO0FBSS9ELDRDQUk0QjtBQXFCNUI7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFuQjFCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxxQkFBWTtnQkFDWixpQ0FBYztnQkFDZCxzQkFBZTtnQkFDZiw2QkFBWTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLHFDQUE2QjtnQkFDN0IsNkJBQXFCO2dCQUNyQixxQ0FBNkI7YUFDOUI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YscUNBQTZCO2dCQUM3Qiw2QkFBcUI7Z0JBQ3JCLHFDQUE2QjthQUM5QjtZQUNELFNBQVMsRUFBRSxDQUFDLG1DQUFlLENBQUM7U0FDN0IsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQS9CLEFBQStCLElBQUE7QUFBbEIsd0NBQWMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy93ei5kaWFsb2cubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4uL3d6LWRlc2lnbi93ei5kZXNpZ24ubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBXekZvcm1Nb2R1bGUgfSBmcm9tICcuLi93ei1mb3JtL3d6LWZvcm0ubW9kdWxlJztcblxuLy8gV3JhcHBlciBzZXJ2aWNlXG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcblxuXG4vLyBEaWFsb2cgdHlwZXNcbmltcG9ydCB7XG4gIFd6Rm9ybURpYWxvZ0NvbXBvbmVudCxcbiAgV3pOb3RpZmljYXRpb25EaWFsb2dDb21wb25lbnQsXG4gIFd6Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50LFxufSBmcm9tICcuL2NvbXBvbmVudHMvaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBXekZvcm1Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgV3pOb3RpZmljYXRpb25EaWFsb2dDb21wb25lbnQsXG4gICAgV3pGb3JtRGlhbG9nQ29tcG9uZW50LFxuICAgIFd6Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFd6Tm90aWZpY2F0aW9uRGlhbG9nQ29tcG9uZW50LFxuICAgIFd6Rm9ybURpYWxvZ0NvbXBvbmVudCxcbiAgICBXekNvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtXekRpYWxvZ1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFd6RGlhbG9nTW9kdWxlIHsgfVxuIl19
