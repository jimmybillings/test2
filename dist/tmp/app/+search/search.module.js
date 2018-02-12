"use strict";
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
    SearchModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [shared_module_1.SharedModule, asset_module_1.AssetModule, router_1.RouterModule.forChild(search_routes_1.SEARCH_ROUTES)],
                    declarations: [search_component_1.SearchComponent, filter_component_1.FilterComponent, no_results_component_1.NoResultsComponent, search_header_component_1.SearchHeaderComponent, search_asset_component_1.SearchAssetComponent],
                    exports: [search_component_1.SearchComponent],
                    providers: [search_resolver_1.SearchResolver, search_asset_resolver_1.SearchAssetResolver, search_asset_guard_1.SearchAssetGuard]
                },] },
    ];
    SearchModule.ctorParameters = function () { return []; };
    return SearchModule;
}());
exports.SearchModule = SearchModule;
//# sourceMappingURL=search.module.js.map