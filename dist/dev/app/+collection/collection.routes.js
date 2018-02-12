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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb2xsZWN0aW9uLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdGQUE2RTtBQUM3RSx3RUFBc0U7QUFDdEUsK0VBQTRFO0FBQzVFLGdFQUE4RDtBQUM5RCwrREFBNkQ7QUFDN0Qsc0ZBQW1GO0FBQ25GLGtGQUErRTtBQUMvRSx3RUFBc0U7QUFFekQsUUFBQSxpQkFBaUIsR0FBVztJQUN2QztRQUNFLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLDBDQUFtQjtRQUNuRCxRQUFRLEVBQUU7WUFDUjtnQkFDRSxJQUFJLEVBQUUsRUFBRTtnQkFDUixTQUFTLEVBQUUsNENBQW9CO2dCQUMvQixXQUFXLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO2dCQUM5QixPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsMENBQW1CLEVBQUU7Z0JBQzdDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRTthQUMxQztZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLFNBQVMsRUFBRSxtREFBdUI7Z0JBQ2xDLFdBQVcsRUFBRSxDQUFDLGtDQUFlLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxpREFBc0IsRUFBRTtnQkFDL0MsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFO2FBQ3pDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsU0FBUyxFQUFFLHFEQUF3QjtnQkFDbkMsV0FBVyxFQUFFLENBQUMsa0NBQWUsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLG1EQUF1QixFQUFFO2dCQUMzQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsNkJBQTZCLEVBQUU7YUFDL0M7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbGxlY3Rpb24vY29sbGVjdGlvbi5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29sbGVjdGlvblNob3dSZXNvbHZlciB9IGZyb20gJy4vc2VydmljZXMvY29sbGVjdGlvbi1zaG93LnJlc29sdmVyJztcbmltcG9ydCB7IENvbGxlY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi8raW5kZXgvY29sbGVjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25TaG93Q29tcG9uZW50IH0gZnJvbSAnLi8rc2hvdy9jb2xsZWN0aW9uLXNob3cuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGxlY3Rpb25HdWFyZCB9IGZyb20gJy4vc2VydmljZXMvY29sbGVjdGlvbi1ndWFyZCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xsZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQXNzZXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGVjdGlvbi1hc3NldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkFzc2V0UmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL2NvbGxlY3Rpb24tYXNzZXQucmVzb2x2ZXInO1xuaW1wb3J0IHsgQ29sbGVjdGlvbnNSZXNvbHZlciB9IGZyb20gJy4vc2VydmljZXMvY29sbGVjdGlvbnMucmVzb2x2ZXInO1xuXG5leHBvcnQgY29uc3QgQ09MTEVDVElPTl9ST1VURVM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICdjb2xsZWN0aW9ucycsIGNvbXBvbmVudDogQ29sbGVjdGlvbkNvbXBvbmVudCxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgY29tcG9uZW50OiBDb2xsZWN0aW9uc0NvbXBvbmVudCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDb2xsZWN0aW9uR3VhcmRdLFxuICAgICAgICByZXNvbHZlOiB7IGNvbGxlY3Rpb25zOiBDb2xsZWN0aW9uc1Jlc29sdmVyIH0sXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLkNPTExFQ1RJT05TJyB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiAnOmlkJyxcbiAgICAgICAgY29tcG9uZW50OiBDb2xsZWN0aW9uU2hvd0NvbXBvbmVudCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDb2xsZWN0aW9uR3VhcmRdLFxuICAgICAgICByZXNvbHZlOiB7IGNvbGxlY3Rpb246IENvbGxlY3Rpb25TaG93UmVzb2x2ZXIgfSxcbiAgICAgICAgZGF0YTogeyB0aXRsZTogJ1BBR0VfVElUTEUuQ09MTEVDVElPTicgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJzppZC9hc3NldC86dXVpZCcsXG4gICAgICAgIGNvbXBvbmVudDogQ29sbGVjdGlvbkFzc2V0Q29tcG9uZW50LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0NvbGxlY3Rpb25HdWFyZF0sXG4gICAgICAgIHJlc29sdmU6IHsgYXNzZXQ6IENvbGxlY3Rpb25Bc3NldFJlc29sdmVyIH0sXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLkNPTExFQ1RJT05fQVNTRVQnIH1cbiAgICAgIH0sXG4gICAgXVxuICB9XG5dO1xuXG5cbiJdfQ==
