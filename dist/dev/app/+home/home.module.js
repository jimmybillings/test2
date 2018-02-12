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
var home_component_1 = require("./home.component");
var home_hero_component_1 = require("./components/home-hero.component");
var home_highlights_component_1 = require("./components/home-highlights.component");
var home_vendor_marquee_component_1 = require("./components/home-vendor-marquee.component");
var home_call_to_action_component_1 = require("./components/home-call-to-action.component");
var home_resolver_1 = require("./services/home.resolver");
var home_video_service_1 = require("./services/home.video.service");
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [
                home_component_1.HomeComponent,
                home_hero_component_1.HomeHeroComponent,
                home_highlights_component_1.HomeHighlightsComponent,
                home_vendor_marquee_component_1.HomeVendorMarqueeComponent,
                home_call_to_action_component_1.HomeCallToActionComponent
            ],
            providers: [home_resolver_1.HomeResolver, home_video_service_1.HomeVideoService],
            exports: [home_component_1.HomeComponent],
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9ob21lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx5REFBdUQ7QUFDdkQsbURBQWlEO0FBQ2pELHdFQUFxRTtBQUNyRSxvRkFBaUY7QUFDakYsNEZBQXdGO0FBQ3hGLDRGQUF1RjtBQUN2RiwwREFBd0Q7QUFDeEQsb0VBQWlFO0FBY2pFO0lBQUE7SUFBMEIsQ0FBQztJQUFkLFVBQVU7UUFadEIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN2QixZQUFZLEVBQUU7Z0JBQ1osOEJBQWE7Z0JBQ2IsdUNBQWlCO2dCQUNqQixtREFBdUI7Z0JBQ3ZCLDBEQUEwQjtnQkFDMUIseURBQXlCO2FBQUM7WUFDNUIsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSxxQ0FBZ0IsQ0FBQztZQUMzQyxPQUFPLEVBQUUsQ0FBQyw4QkFBYSxDQUFDO1NBQ3pCLENBQUM7T0FFVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUEzQixBQUEyQixJQUFBO0FBQWQsZ0NBQVUiLCJmaWxlIjoiYXBwLytob21lL2hvbWUubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tICcuL2hvbWUuY29tcG9uZW50JztcbmltcG9ydCB7IEhvbWVIZXJvQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hvbWUtaGVyby5jb21wb25lbnQnO1xuaW1wb3J0IHsgSG9tZUhpZ2hsaWdodHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaG9tZS1oaWdobGlnaHRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIb21lVmVuZG9yTWFycXVlZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ob21lLXZlbmRvci1tYXJxdWVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIb21lQ2FsbFRvQWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hvbWUtY2FsbC10by1hY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEhvbWVSZXNvbHZlciB9IGZyb20gJy4vc2VydmljZXMvaG9tZS5yZXNvbHZlcic7XG5pbXBvcnQgeyBIb21lVmlkZW9TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ob21lLnZpZGVvLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgSG9tZUNvbXBvbmVudCxcbiAgICBIb21lSGVyb0NvbXBvbmVudCxcbiAgICBIb21lSGlnaGxpZ2h0c0NvbXBvbmVudCxcbiAgICBIb21lVmVuZG9yTWFycXVlZUNvbXBvbmVudCxcbiAgICBIb21lQ2FsbFRvQWN0aW9uQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbSG9tZVJlc29sdmVyLCBIb21lVmlkZW9TZXJ2aWNlXSxcbiAgZXhwb3J0czogW0hvbWVDb21wb25lbnRdLFxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVNb2R1bGUgeyB9XG4iXX0=
