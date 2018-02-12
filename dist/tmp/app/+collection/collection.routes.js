"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collection_show_resolver_1 = require("./services/collection-show.resolver");
var collections_component_1 = require("./+index/collections.component");
var collection_show_component_1 = require("./+show/collection-show.component");
var collection_guard_1 = require("./services/collection-guard");
var collection_component_1 = require("./collection.component");
var collection_asset_component_1 = require("./components/collection-asset.component");
var collection_asset_resolver_1 = require("./services/collection-asset.resolver");
var collections_resolver_1 = require("./services/collections.resolver");
exports.COLLECTION_ROUTES = [
    {
        path: 'collections', component: collection_component_1.CollectionComponent,
        children: [
            {
                path: '',
                component: collections_component_1.CollectionsComponent,
                canActivate: [collection_guard_1.CollectionGuard],
                resolve: { collections: collections_resolver_1.CollectionsResolver },
                data: { title: 'PAGE_TITLE.COLLECTIONS' }
            },
            {
                path: ':id',
                component: collection_show_component_1.CollectionShowComponent,
                canActivate: [collection_guard_1.CollectionGuard],
                resolve: { collection: collection_show_resolver_1.CollectionShowResolver },
                data: { title: 'PAGE_TITLE.COLLECTION' }
            },
            {
                path: ':id/asset/:uuid',
                component: collection_asset_component_1.CollectionAssetComponent,
                canActivate: [collection_guard_1.CollectionGuard],
                resolve: { asset: collection_asset_resolver_1.CollectionAssetResolver },
                data: { title: 'PAGE_TITLE.COLLECTION_ASSET' }
            },
        ]
    }
];
//# sourceMappingURL=collection.routes.js.map