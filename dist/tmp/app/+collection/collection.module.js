"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var collections_component_1 = require("./+index/collections.component");
var collection_show_component_1 = require("./+show/collection-show.component");
var shared_module_1 = require("../shared/shared.module");
var router_1 = require("@angular/router");
var collection_routes_1 = require("./collection.routes");
var collection_show_resolver_1 = require("../+collection/services/collection-show.resolver");
var collection_asset_resolver_1 = require("../+collection/services/collection-asset.resolver");
var collections_resolver_1 = require("../+collection/services/collections.resolver");
var collection_guard_1 = require("./services/collection-guard");
var wz_collection_item_list_component_1 = require("./components/wz.collection-item-list.component");
var collection_component_1 = require("./collection.component");
var collection_asset_component_1 = require("./components/collection-asset.component");
var collection_share_component_1 = require("./components/collection-share.component");
var collection_share_members_component_1 = require("./components/collection-share-members.component");
var asset_module_1 = require("../+asset/asset.module");
var CollectionModule = (function () {
    function CollectionModule() {
    }
    CollectionModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [shared_module_1.SharedModule, asset_module_1.AssetModule, router_1.RouterModule.forChild(collection_routes_1.COLLECTION_ROUTES)],
                    declarations: [
                        collection_component_1.CollectionComponent,
                        collections_component_1.CollectionsComponent,
                        collection_show_component_1.CollectionShowComponent,
                        wz_collection_item_list_component_1.WzCollectionItemListComponent,
                        collection_asset_component_1.CollectionAssetComponent,
                        collection_share_component_1.CollectionShareComponent,
                        collection_share_members_component_1.CollectionShareMembersComponent
                    ],
                    exports: [collection_component_1.CollectionComponent, collections_component_1.CollectionsComponent, collection_show_component_1.CollectionShowComponent],
                    providers: [collection_show_resolver_1.CollectionShowResolver, collection_guard_1.CollectionGuard, collection_asset_resolver_1.CollectionAssetResolver, collections_resolver_1.CollectionsResolver],
                    entryComponents: [collection_share_members_component_1.CollectionShareMembersComponent, collection_share_component_1.CollectionShareComponent]
                },] },
    ];
    CollectionModule.ctorParameters = function () { return []; };
    return CollectionModule;
}());
exports.CollectionModule = CollectionModule;
//# sourceMappingURL=collection.module.js.map