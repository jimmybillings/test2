"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_management_component_1 = require("./+user-management/user-management.component");
var home_component_1 = require("./+home/home.component");
var collections_component_1 = require("./+collection/+index/collections.component");
var gallery_view_component_1 = require("./+gallery-view/gallery-view.component");
var gallery_view_resolver_1 = require("./+gallery-view/services/gallery-view.resolver");
var home_resolver_1 = require("./+home/services/home.resolver");
var error_component_1 = require("./+error/error.component");
exports.APP_ROUTES = [
    {
        path: '',
        component: home_component_1.HomeComponent,
        resolve: { gallery: home_resolver_1.HomeResolver },
        data: { title: 'PAGE_TITLE.HOME' }
    },
    {
        path: 'user',
        component: user_management_component_1.UserManagementComponent
    },
    {
        path: 'collections',
        component: collections_component_1.CollectionsComponent
    },
    {
        path: 'gallery-view',
        component: gallery_view_component_1.GalleryViewComponent,
        resolve: { gallery: gallery_view_resolver_1.GalleryViewResolver },
        data: { title: 'PAGE_TITLE.GALLERY_VIEW' }
    },
    {
        path: 'error',
        component: error_component_1.ErrorComponent
    },
    {
        path: '**',
        redirectTo: '/error/404'
    }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEZBQXVGO0FBQ3ZGLHlEQUF1RDtBQUN2RCxvRkFBa0Y7QUFDbEYsaUZBQThFO0FBQzlFLHdGQUFxRjtBQUNyRixnRUFBOEQ7QUFHOUQsNERBQTBEO0FBRzdDLFFBQUEsVUFBVSxHQUFXO0lBQ2hDO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsOEJBQWE7UUFDeEIsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLDRCQUFZLEVBQUU7UUFDbEMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFO0tBQ25DO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxtREFBdUI7S0FDbkM7SUFDRDtRQUNFLElBQUksRUFBRSxhQUFhO1FBQ25CLFNBQVMsRUFBRSw0Q0FBb0I7S0FDaEM7SUFDRDtRQUNFLElBQUksRUFBRSxjQUFjO1FBQ3BCLFNBQVMsRUFBRSw2Q0FBb0I7UUFDL0IsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLDJDQUFtQixFQUFFO1FBQ3pDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtLQUMzQztJQUNEO1FBQ0UsSUFBSSxFQUFFLE9BQU87UUFDYixTQUFTLEVBQUUsZ0NBQWM7S0FDMUI7SUFDRDtRQUNFLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLFlBQVk7S0FDekI7Q0FDRixDQUFDIiwiZmlsZSI6ImFwcC9hcHAucm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlck1hbmFnZW1lbnRDb21wb25lbnQgfSBmcm9tICcuLyt1c2VyLW1hbmFnZW1lbnQvdXNlci1tYW5hZ2VtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSAnLi8raG9tZS9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vK2NvbGxlY3Rpb24vK2luZGV4L2NvbGxlY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vK2dhbGxlcnktdmlldy9nYWxsZXJ5LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlWaWV3UmVzb2x2ZXIgfSBmcm9tICcuLytnYWxsZXJ5LXZpZXcvc2VydmljZXMvZ2FsbGVyeS12aWV3LnJlc29sdmVyJztcbmltcG9ydCB7IEhvbWVSZXNvbHZlciB9IGZyb20gJy4vK2hvbWUvc2VydmljZXMvaG9tZS5yZXNvbHZlcic7XG5cbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBFcnJvckNvbXBvbmVudCB9IGZyb20gJy4vK2Vycm9yL2Vycm9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3RGb3VuZENvbXBvbmVudCB9IGZyb20gJy4vK2Vycm9yLytub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCBBUFBfUk9VVEVTOiBSb3V0ZXMgPSBbXG4gIHtcbiAgICBwYXRoOiAnJyxcbiAgICBjb21wb25lbnQ6IEhvbWVDb21wb25lbnQsXG4gICAgcmVzb2x2ZTogeyBnYWxsZXJ5OiBIb21lUmVzb2x2ZXIgfSxcbiAgICBkYXRhOiB7IHRpdGxlOiAnUEFHRV9USVRMRS5IT01FJyB9XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAndXNlcicsXG4gICAgY29tcG9uZW50OiBVc2VyTWFuYWdlbWVudENvbXBvbmVudFxuICB9LFxuICB7XG4gICAgcGF0aDogJ2NvbGxlY3Rpb25zJyxcbiAgICBjb21wb25lbnQ6IENvbGxlY3Rpb25zQ29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnZ2FsbGVyeS12aWV3JyxcbiAgICBjb21wb25lbnQ6IEdhbGxlcnlWaWV3Q29tcG9uZW50LFxuICAgIHJlc29sdmU6IHsgZ2FsbGVyeTogR2FsbGVyeVZpZXdSZXNvbHZlciB9LFxuICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLkdBTExFUllfVklFVycgfVxuICB9LFxuICB7XG4gICAgcGF0aDogJ2Vycm9yJyxcbiAgICBjb21wb25lbnQ6IEVycm9yQ29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnKionLFxuICAgIHJlZGlyZWN0VG86ICcvZXJyb3IvNDA0J1xuICB9XG5dO1xuIl19
