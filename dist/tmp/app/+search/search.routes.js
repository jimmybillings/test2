"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_asset_component_1 = require("./search-asset.component");
var search_asset_resolver_1 = require("./services/search-asset.resolver");
var search_asset_guard_1 = require("./services/search-asset.guard");
var search_component_1 = require("./search.component");
var search_resolver_1 = require("./services/search.resolver");
exports.SEARCH_ROUTES = [
    {
        path: 'search',
        children: [
            {
                path: '',
                component: search_component_1.SearchComponent,
                resolve: { search: search_resolver_1.SearchResolver },
                data: { title: 'PAGE_TITLE.SEARCH' }
            },
            {
                path: 'asset/:id',
                component: search_asset_component_1.SearchAssetComponent,
                resolve: { asset: search_asset_resolver_1.SearchAssetResolver },
                canActivate: [search_asset_guard_1.SearchAssetGuard],
                data: { title: 'PAGE_TITLE.SEARCH_ASSET' }
            }
        ]
    }
];
//# sourceMappingURL=search.routes.js.map