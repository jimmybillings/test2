"use strict";
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
    ApplicationModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    ApplicationModule.ctorParameters = function () { return []; };
    return ApplicationModule;
}());
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=application.module.js.map