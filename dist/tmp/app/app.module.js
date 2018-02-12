"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var home_module_1 = require("./+home/home.module");
var user_management_module_1 = require("./+user-management/user-management.module");
var search_module_1 = require("./+search/search.module");
var asset_module_1 = require("./+asset/asset.module");
var collection_module_1 = require("./+collection/collection.module");
var application_module_1 = require("./application/application.module");
var shared_module_1 = require("./shared/shared.module");
var app_component_1 = require("./app.component");
var commerce_module_1 = require("./+commerce/commerce.module");
var gallery_view_module_1 = require("./+gallery-view/gallery-view.module");
var privacy_policy_module_1 = require("./+privacy-policy/privacy-policy.module");
var error_module_1 = require("./+error/error.module");
var current_user_service_1 = require("./shared/services/current-user.service");
var api_config_1 = require("./shared/services/api.config");
var app_store_1 = require("./app.store");
var animations_1 = require("@angular/platform-browser/animations");
var app_routes_1 = require("./app.routes");
var AppModule = (function () {
    function AppModule(store, apiConfig, currentUser) {
        this.store = store;
        this.apiConfig = apiConfig;
        this.currentUser = currentUser;
        var attrs = document.querySelector('wazee-digital-platform').attributes;
        Object.keys(attrs).forEach(function (key) {
            switch (attrs[key].name) {
                case 'portal':
                    apiConfig.portal = localStorage.getItem('currentSite') || attrs[key].value;
                    break;
                case 'baseurl':
                    apiConfig.baseUrl = attrs[key].value;
                    break;
            }
        });
        currentUser.set();
        store.dispatch(function (factory) { return factory.uiConfig.initialize(apiConfig.portal); });
    }
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        platform_browser_1.BrowserModule,
                        animations_1.BrowserAnimationsModule,
                        router_1.RouterModule.forRoot(app_routes_1.APP_ROUTES, { initialNavigation: false }),
                        shared_module_1.SharedModule.forRoot(),
                        home_module_1.HomeModule,
                        search_module_1.SearchModule,
                        asset_module_1.AssetModule,
                        collection_module_1.CollectionModule,
                        user_management_module_1.UserManagementModule,
                        commerce_module_1.CommerceModule,
                        application_module_1.ApplicationModule,
                        gallery_view_module_1.GalleryViewModule,
                        privacy_policy_module_1.PrivacyPolicyModule,
                        error_module_1.ErrorModule
                    ],
                    providers: [{
                            provide: common_1.APP_BASE_HREF,
                            useValue: '<%= APP_BASE %>',
                        }],
                    declarations: [app_component_1.AppComponent],
                    bootstrap: [app_component_1.AppComponent],
                },] },
    ];
    AppModule.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: api_config_1.ApiConfig, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map