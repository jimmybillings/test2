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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlYXJjaC5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxtRUFBZ0U7QUFDaEUsMEVBQXVFO0FBQ3ZFLG9FQUFpRTtBQUNqRSx1REFBcUQ7QUFDckQsOERBQTREO0FBRS9DLFFBQUEsYUFBYSxHQUFXO0lBQ25DO1FBQ0UsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUU7WUFDUjtnQkFDRSxJQUFJLEVBQUUsRUFBRTtnQkFDUixTQUFTLEVBQUUsa0NBQWU7Z0JBQzFCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxnQ0FBYyxFQUFFO2dCQUNuQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7YUFDckM7WUFDRDtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsU0FBUyxFQUFFLDZDQUFvQjtnQkFDL0IsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLDJDQUFtQixFQUFFO2dCQUN2QyxXQUFXLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQztnQkFDL0IsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFO2FBQzNDO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJmaWxlIjoiYXBwLytzZWFyY2gvc2VhcmNoLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFNlYXJjaEFzc2V0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gtYXNzZXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaEFzc2V0UmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL3NlYXJjaC1hc3NldC5yZXNvbHZlcic7XG5pbXBvcnQgeyBTZWFyY2hBc3NldEd1YXJkIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWFyY2gtYXNzZXQuZ3VhcmQnO1xuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaFJlc29sdmVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWFyY2gucmVzb2x2ZXInO1xuXG5leHBvcnQgY29uc3QgU0VBUkNIX1JPVVRFUzogUm91dGVzID0gW1xuICB7XG4gICAgcGF0aDogJ3NlYXJjaCcsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIGNvbXBvbmVudDogU2VhcmNoQ29tcG9uZW50LFxuICAgICAgICByZXNvbHZlOiB7IHNlYXJjaDogU2VhcmNoUmVzb2x2ZXIgfSxcbiAgICAgICAgZGF0YTogeyB0aXRsZTogJ1BBR0VfVElUTEUuU0VBUkNIJyB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiAnYXNzZXQvOmlkJyxcbiAgICAgICAgY29tcG9uZW50OiBTZWFyY2hBc3NldENvbXBvbmVudCxcbiAgICAgICAgcmVzb2x2ZTogeyBhc3NldDogU2VhcmNoQXNzZXRSZXNvbHZlciB9LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW1NlYXJjaEFzc2V0R3VhcmRdLFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiAnUEFHRV9USVRMRS5TRUFSQ0hfQVNTRVQnIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbl07XG4iXX0=
