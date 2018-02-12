"use strict";
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
    HomeModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    HomeModule.ctorParameters = function () { return []; };
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map