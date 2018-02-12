"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    CollectionModule = __decorate([
        core_1.NgModule({
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
        })
    ], CollectionModule);
    return CollectionModule;
}());
exports.CollectionModule = CollectionModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb2xsZWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx3RUFBc0U7QUFDdEUsK0VBQTRFO0FBQzVFLHlEQUF1RDtBQUN2RCwwQ0FBK0M7QUFDL0MseURBQXdEO0FBQ3hELDZGQUEwRjtBQUMxRiwrRkFBNEY7QUFDNUYscUZBQW1GO0FBQ25GLGdFQUE4RDtBQUM5RCxvR0FBK0Y7QUFDL0YsK0RBQTZEO0FBQzdELHNGQUFtRjtBQUNuRixzRkFBbUY7QUFDbkYsc0dBQWtHO0FBQ2xHLHVEQUFxRDtBQWtCckQ7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQWhCNUIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsNEJBQVksRUFBRSwwQkFBVyxFQUFFLHFCQUFZLENBQUMsUUFBUSxDQUFDLHFDQUFpQixDQUFDLENBQUM7WUFDOUUsWUFBWSxFQUFFO2dCQUNaLDBDQUFtQjtnQkFDbkIsNENBQW9CO2dCQUNwQixtREFBdUI7Z0JBQ3ZCLGlFQUE2QjtnQkFDN0IscURBQXdCO2dCQUN4QixxREFBd0I7Z0JBQ3hCLG9FQUErQjthQUNoQztZQUNELE9BQU8sRUFBRSxDQUFDLDBDQUFtQixFQUFFLDRDQUFvQixFQUFFLG1EQUF1QixDQUFDO1lBQzdFLFNBQVMsRUFBRSxDQUFDLGlEQUFzQixFQUFFLGtDQUFlLEVBQUUsbURBQXVCLEVBQUUsMENBQW1CLENBQUM7WUFDbEcsZUFBZSxFQUFFLENBQUMsb0VBQStCLEVBQUUscURBQXdCLENBQUM7U0FDN0UsQ0FBQztPQUVXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBakMsQUFBaUMsSUFBQTtBQUFwQiw0Q0FBZ0IiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL2NvbGxlY3Rpb24ubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbGxlY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi8raW5kZXgvY29sbGVjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25TaG93Q29tcG9uZW50IH0gZnJvbSAnLi8rc2hvdy9jb2xsZWN0aW9uLXNob3cuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDT0xMRUNUSU9OX1JPVVRFUyB9IGZyb20gJy4vY29sbGVjdGlvbi5yb3V0ZXMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblNob3dSZXNvbHZlciB9IGZyb20gJy4uLytjb2xsZWN0aW9uL3NlcnZpY2VzL2NvbGxlY3Rpb24tc2hvdy5yZXNvbHZlcic7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQXNzZXRSZXNvbHZlciB9IGZyb20gJy4uLytjb2xsZWN0aW9uL3NlcnZpY2VzL2NvbGxlY3Rpb24tYXNzZXQucmVzb2x2ZXInO1xuaW1wb3J0IHsgQ29sbGVjdGlvbnNSZXNvbHZlciB9IGZyb20gJy4uLytjb2xsZWN0aW9uL3NlcnZpY2VzL2NvbGxlY3Rpb25zLnJlc29sdmVyJztcbmltcG9ydCB7IENvbGxlY3Rpb25HdWFyZCB9IGZyb20gJy4vc2VydmljZXMvY29sbGVjdGlvbi1ndWFyZCc7XG5pbXBvcnQgeyBXekNvbGxlY3Rpb25JdGVtTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93ei5jb2xsZWN0aW9uLWl0ZW0tbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29sbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkFzc2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxlY3Rpb24tYXNzZXQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25TaGFyZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsZWN0aW9uLXNoYXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uU2hhcmVNZW1iZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxlY3Rpb24tc2hhcmUtbWVtYmVycy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNzZXRNb2R1bGUgfSBmcm9tICcuLi8rYXNzZXQvYXNzZXQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZSwgQXNzZXRNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChDT0xMRUNUSU9OX1JPVVRFUyldLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDb2xsZWN0aW9uQ29tcG9uZW50LFxuICAgIENvbGxlY3Rpb25zQ29tcG9uZW50LFxuICAgIENvbGxlY3Rpb25TaG93Q29tcG9uZW50LFxuICAgIFd6Q29sbGVjdGlvbkl0ZW1MaXN0Q29tcG9uZW50LFxuICAgIENvbGxlY3Rpb25Bc3NldENvbXBvbmVudCxcbiAgICBDb2xsZWN0aW9uU2hhcmVDb21wb25lbnQsXG4gICAgQ29sbGVjdGlvblNoYXJlTWVtYmVyc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbQ29sbGVjdGlvbkNvbXBvbmVudCwgQ29sbGVjdGlvbnNDb21wb25lbnQsIENvbGxlY3Rpb25TaG93Q29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbQ29sbGVjdGlvblNob3dSZXNvbHZlciwgQ29sbGVjdGlvbkd1YXJkLCBDb2xsZWN0aW9uQXNzZXRSZXNvbHZlciwgQ29sbGVjdGlvbnNSZXNvbHZlcl0sXG4gIGVudHJ5Q29tcG9uZW50czogW0NvbGxlY3Rpb25TaGFyZU1lbWJlcnNDb21wb25lbnQsIENvbGxlY3Rpb25TaGFyZUNvbXBvbmVudF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uTW9kdWxlIHsgfVxuIl19
