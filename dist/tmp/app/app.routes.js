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
//# sourceMappingURL=app.routes.js.map