"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    AppModule = __decorate([
        core_1.NgModule({
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
                    useValue: '/',
                }],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent],
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore, api_config_1.ApiConfig, current_user_service_1.CurrentUserService])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBEO0FBQzFELDhEQUEwRDtBQUMxRCwwQ0FBK0M7QUFDL0MsMENBQWdEO0FBRWhELG1EQUFpRDtBQUNqRCxvRkFBaUY7QUFDakYseURBQXVEO0FBQ3ZELHNEQUFvRDtBQUNwRCxxRUFBbUU7QUFDbkUsdUVBQXFFO0FBQ3JFLHdEQUFzRDtBQUN0RCxpREFBK0M7QUFDL0MsK0RBQTZEO0FBQzdELDJFQUF3RTtBQUN4RSxpRkFBOEU7QUFDOUUsc0RBQW9EO0FBRXBELCtFQUE0RTtBQUM1RSwyREFBeUQ7QUFDekQseUNBQXVDO0FBQ3ZDLG1FQUErRTtBQUMvRSwyQ0FBMEM7QUEyQjFDO0lBQ0UsbUJBQW9CLEtBQWUsRUFBVSxTQUFvQixFQUFVLFdBQStCO1FBQXRGLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQ3hHLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFRO1lBQ2xDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFLLFFBQVE7b0JBQ1gsU0FBUyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQzNFLEtBQUssQ0FBQztnQkFDUixLQUFLLFNBQVM7b0JBQ1osU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNyQyxLQUFLLENBQUM7WUFDVixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFmVSxTQUFTO1FBeEJyQixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsZ0NBQWE7Z0JBQ2Isb0NBQXVCO2dCQUN2QixxQkFBWSxDQUFDLE9BQU8sQ0FBQyx1QkFBVSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQzlELDRCQUFZLENBQUMsT0FBTyxFQUFFO2dCQUN0Qix3QkFBVTtnQkFDViw0QkFBWTtnQkFDWiwwQkFBVztnQkFDWCxvQ0FBZ0I7Z0JBQ2hCLDZDQUFvQjtnQkFDcEIsZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQix1Q0FBaUI7Z0JBQ2pCLDJDQUFtQjtnQkFDbkIsMEJBQVc7YUFDWjtZQUNELFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxzQkFBYTtvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUIsQ0FBQztZQUNGLFlBQVksRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDNUIsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztTQUMxQixDQUFDO3lDQUUyQixvQkFBUSxFQUFxQixzQkFBUyxFQUF1Qix5Q0FBa0I7T0FEL0YsU0FBUyxDQWdCckI7SUFBRCxnQkFBQztDQWhCRCxBQWdCQyxJQUFBO0FBaEJZLDhCQUFTIiwiZmlsZSI6ImFwcC9hcHAubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIEFQUF9JTklUSUFMSVpFUiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFQUF9CQVNFX0hSRUYgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBIb21lTW9kdWxlIH0gZnJvbSAnLi8raG9tZS9ob21lLm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyTWFuYWdlbWVudE1vZHVsZSB9IGZyb20gJy4vK3VzZXItbWFuYWdlbWVudC91c2VyLW1hbmFnZW1lbnQubW9kdWxlJztcbmltcG9ydCB7IFNlYXJjaE1vZHVsZSB9IGZyb20gJy4vK3NlYXJjaC9zZWFyY2gubW9kdWxlJztcbmltcG9ydCB7IEFzc2V0TW9kdWxlIH0gZnJvbSAnLi8rYXNzZXQvYXNzZXQubW9kdWxlJztcbmltcG9ydCB7IENvbGxlY3Rpb25Nb2R1bGUgfSBmcm9tICcuLytjb2xsZWN0aW9uL2NvbGxlY3Rpb24ubW9kdWxlJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uTW9kdWxlIH0gZnJvbSAnLi9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbWVyY2VNb2R1bGUgfSBmcm9tICcuLytjb21tZXJjZS9jb21tZXJjZS5tb2R1bGUnO1xuaW1wb3J0IHsgR2FsbGVyeVZpZXdNb2R1bGUgfSBmcm9tICcuLytnYWxsZXJ5LXZpZXcvZ2FsbGVyeS12aWV3Lm1vZHVsZSc7XG5pbXBvcnQgeyBQcml2YWN5UG9saWN5TW9kdWxlIH0gZnJvbSAnLi8rcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kubW9kdWxlJztcbmltcG9ydCB7IEVycm9yTW9kdWxlIH0gZnJvbSAnLi8rZXJyb3IvZXJyb3IubW9kdWxlJztcblxuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpQ29uZmlnIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvYXBpLmNvbmZpZyc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFQUF9ST1VURVMgfSBmcm9tICcuL2FwcC5yb3V0ZXMnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5kYXRhLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUuZm9yUm9vdChBUFBfUk9VVEVTLCB7IGluaXRpYWxOYXZpZ2F0aW9uOiBmYWxzZSB9KSxcbiAgICBTaGFyZWRNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEhvbWVNb2R1bGUsXG4gICAgU2VhcmNoTW9kdWxlLFxuICAgIEFzc2V0TW9kdWxlLFxuICAgIENvbGxlY3Rpb25Nb2R1bGUsXG4gICAgVXNlck1hbmFnZW1lbnRNb2R1bGUsXG4gICAgQ29tbWVyY2VNb2R1bGUsXG4gICAgQXBwbGljYXRpb25Nb2R1bGUsXG4gICAgR2FsbGVyeVZpZXdNb2R1bGUsXG4gICAgUHJpdmFjeVBvbGljeU1vZHVsZSxcbiAgICBFcnJvck1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogQVBQX0JBU0VfSFJFRixcbiAgICB1c2VWYWx1ZTogJzwlPSBBUFBfQkFTRSAlPicsXG4gIH1dLFxuICBkZWNsYXJhdGlvbnM6IFtBcHBDb21wb25lbnRdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSwgcHJpdmF0ZSBhcGlDb25maWc6IEFwaUNvbmZpZywgcHJpdmF0ZSBjdXJyZW50VXNlcjogQ3VycmVudFVzZXJTZXJ2aWNlKSB7XG4gICAgbGV0IGF0dHJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignd2F6ZWUtZGlnaXRhbC1wbGF0Zm9ybScpLmF0dHJpYnV0ZXM7XG4gICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICBzd2l0Y2ggKGF0dHJzW2tleV0ubmFtZSkge1xuICAgICAgICBjYXNlICdwb3J0YWwnOlxuICAgICAgICAgIGFwaUNvbmZpZy5wb3J0YWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFNpdGUnKSB8fCBhdHRyc1trZXldLnZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdiYXNldXJsJzpcbiAgICAgICAgICBhcGlDb25maWcuYmFzZVVybCA9IGF0dHJzW2tleV0udmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY3VycmVudFVzZXIuc2V0KCk7XG4gICAgc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnVpQ29uZmlnLmluaXRpYWxpemUoYXBpQ29uZmlnLnBvcnRhbCkpO1xuICB9XG59XG4iXX0=
