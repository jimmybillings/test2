"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var app_nav_component_1 = require("./app-nav/app-nav.component");
var app_loading_indicator_component_1 = require("./app-loading-indicator/app-loading-indicator.component");
var collection_tray_component_1 = require("./collection-tray/collection-tray.component");
var footer_component_1 = require("./footer/footer.component");
var collections_list_dd_component_1 = require("./collection-tray/components/collections-list-dd.component");
var ApplicationModule = (function () {
    function ApplicationModule() {
    }
    ApplicationModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [
                app_nav_component_1.AppNavComponent,
                collection_tray_component_1.CollectionTrayComponent,
                footer_component_1.FooterComponent,
                collections_list_dd_component_1.CollectionListDdComponent,
                app_loading_indicator_component_1.AppLoadingIndicatorComponent
            ],
            exports: [app_nav_component_1.AppNavComponent, collection_tray_component_1.CollectionTrayComponent, footer_component_1.FooterComponent, app_loading_indicator_component_1.AppLoadingIndicatorComponent],
            entryComponents: [collections_list_dd_component_1.CollectionListDdComponent]
        })
    ], ApplicationModule);
    return ApplicationModule;
}());
exports.ApplicationModule = ApplicationModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMseURBQXVEO0FBQ3ZELGlFQUE4RDtBQUM5RCwyR0FBdUc7QUFDdkcseUZBQXNGO0FBQ3RGLDhEQUE0RDtBQUM1RCw0R0FBdUc7QUFldkc7SUFBQTtJQUFpQyxDQUFDO0lBQXJCLGlCQUFpQjtRQWI3QixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRTtnQkFDWixtQ0FBZTtnQkFDZixtREFBdUI7Z0JBQ3ZCLGtDQUFlO2dCQUNmLHlEQUF5QjtnQkFDekIsOERBQTRCO2FBQzdCO1lBQ0QsT0FBTyxFQUFFLENBQUMsbUNBQWUsRUFBRSxtREFBdUIsRUFBRSxrQ0FBZSxFQUFFLDhEQUE0QixDQUFDO1lBQ2xHLGVBQWUsRUFBRSxDQUFDLHlEQUF5QixDQUFDO1NBQzdDLENBQUM7T0FFVyxpQkFBaUIsQ0FBSTtJQUFELHdCQUFDO0NBQWxDLEFBQWtDLElBQUE7QUFBckIsOENBQWlCIiwiZmlsZSI6ImFwcC9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQXBwTmF2Q29tcG9uZW50IH0gZnJvbSAnLi9hcHAtbmF2L2FwcC1uYXYuY29tcG9uZW50JztcbmltcG9ydCB7IEFwcExvYWRpbmdJbmRpY2F0b3JDb21wb25lbnQgfSBmcm9tICcuL2FwcC1sb2FkaW5nLWluZGljYXRvci9hcHAtbG9hZGluZy1pbmRpY2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25UcmF5Q29tcG9uZW50IH0gZnJvbSAnLi9jb2xsZWN0aW9uLXRyYXkvY29sbGVjdGlvbi10cmF5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25MaXN0RGRDb21wb25lbnQgfSBmcm9tICcuL2NvbGxlY3Rpb24tdHJheS9jb21wb25lbnRzL2NvbGxlY3Rpb25zLWxpc3QtZGQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcE5hdkNvbXBvbmVudCxcbiAgICBDb2xsZWN0aW9uVHJheUNvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gICAgQ29sbGVjdGlvbkxpc3REZENvbXBvbmVudCxcbiAgICBBcHBMb2FkaW5nSW5kaWNhdG9yQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtBcHBOYXZDb21wb25lbnQsIENvbGxlY3Rpb25UcmF5Q29tcG9uZW50LCBGb290ZXJDb21wb25lbnQsIEFwcExvYWRpbmdJbmRpY2F0b3JDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDb2xsZWN0aW9uTGlzdERkQ29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uTW9kdWxlIHsgfVxuIl19
