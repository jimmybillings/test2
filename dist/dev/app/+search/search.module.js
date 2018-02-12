"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var search_component_1 = require("./search.component");
var shared_module_1 = require("../shared/shared.module");
var filter_component_1 = require("./filter.component");
var no_results_component_1 = require("./no-results.component");
var search_header_component_1 = require("./search-header.component");
var search_asset_component_1 = require("./search-asset.component");
var search_resolver_1 = require("./services/search.resolver");
var search_asset_resolver_1 = require("./services/search-asset.resolver");
var search_asset_guard_1 = require("./services/search-asset.guard");
var search_routes_1 = require("./search.routes");
var asset_module_1 = require("../+asset/asset.module");
var SearchModule = (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, asset_module_1.AssetModule, router_1.RouterModule.forChild(search_routes_1.SEARCH_ROUTES)],
            declarations: [search_component_1.SearchComponent, filter_component_1.FilterComponent, no_results_component_1.NoResultsComponent, search_header_component_1.SearchHeaderComponent, search_asset_component_1.SearchAssetComponent],
            exports: [search_component_1.SearchComponent],
            providers: [search_resolver_1.SearchResolver, search_asset_resolver_1.SearchAssetResolver, search_asset_guard_1.SearchAssetGuard]
        })
    ], SearchModule);
    return SearchModule;
}());
exports.SearchModule = SearchModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlYXJjaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMsMENBQStDO0FBRS9DLHVEQUFxRDtBQUNyRCx5REFBdUQ7QUFDdkQsdURBQXFEO0FBQ3JELCtEQUE0RDtBQUM1RCxxRUFBa0U7QUFDbEUsbUVBQWdFO0FBQ2hFLDhEQUE0RDtBQUM1RCwwRUFBdUU7QUFDdkUsb0VBQWlFO0FBQ2pFLGlEQUFnRDtBQUNoRCx1REFBcUQ7QUFTckQ7SUFBQTtJQUE0QixDQUFDO0lBQWhCLFlBQVk7UUFQeEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsNEJBQVksRUFBRSwwQkFBVyxFQUFFLHFCQUFZLENBQUMsUUFBUSxDQUFDLDZCQUFhLENBQUMsQ0FBQztZQUMxRSxZQUFZLEVBQUUsQ0FBQyxrQ0FBZSxFQUFFLGtDQUFlLEVBQUUseUNBQWtCLEVBQUUsK0NBQXFCLEVBQUUsNkNBQW9CLENBQUM7WUFDakgsT0FBTyxFQUFFLENBQUMsa0NBQWUsQ0FBQztZQUMxQixTQUFTLEVBQUUsQ0FBQyxnQ0FBYyxFQUFFLDJDQUFtQixFQUFFLHFDQUFnQixDQUFDO1NBQ3JFLENBQUM7T0FFVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUE3QixBQUE2QixJQUFBO0FBQWhCLG9DQUFZIiwiZmlsZSI6ImFwcC8rc2VhcmNoL3NlYXJjaC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb1Jlc3VsdHNDb21wb25lbnQgfSBmcm9tICcuL25vLXJlc3VsdHMuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoQXNzZXRDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1hc3NldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoUmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL3NlYXJjaC5yZXNvbHZlcic7XG5pbXBvcnQgeyBTZWFyY2hBc3NldFJlc29sdmVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWFyY2gtYXNzZXQucmVzb2x2ZXInO1xuaW1wb3J0IHsgU2VhcmNoQXNzZXRHdWFyZCB9IGZyb20gJy4vc2VydmljZXMvc2VhcmNoLWFzc2V0Lmd1YXJkJztcbmltcG9ydCB7IFNFQVJDSF9ST1VURVMgfSBmcm9tICcuL3NlYXJjaC5yb3V0ZXMnO1xuaW1wb3J0IHsgQXNzZXRNb2R1bGUgfSBmcm9tICcuLi8rYXNzZXQvYXNzZXQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlLCBBc3NldE1vZHVsZSwgUm91dGVyTW9kdWxlLmZvckNoaWxkKFNFQVJDSF9ST1VURVMpXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTZWFyY2hDb21wb25lbnQsIEZpbHRlckNvbXBvbmVudCwgTm9SZXN1bHRzQ29tcG9uZW50LCBTZWFyY2hIZWFkZXJDb21wb25lbnQsIFNlYXJjaEFzc2V0Q29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbU2VhcmNoQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFtTZWFyY2hSZXNvbHZlciwgU2VhcmNoQXNzZXRSZXNvbHZlciwgU2VhcmNoQXNzZXRHdWFyZF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hNb2R1bGUgeyB9XG4iXX0=
