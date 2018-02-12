"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bad_request_component_1 = require("./+bad-request/bad-request.component");
var server_error_component_1 = require("./+server-error/server-error.component");
var error_component_1 = require("./error.component");
var not_found_component_1 = require("./+not-found/not-found.component");
exports.ERROR_ROUTES = [
    {
        path: 'error',
        component: error_component_1.ErrorComponent,
        children: [
            {
                path: '404',
                component: not_found_component_1.NotFoundComponent,
                data: { title: 'PAGE_TITLE.NOT_FOUND' }
            },
            {
                path: '400',
                component: bad_request_component_1.BadRequestComponent,
                data: { title: 'PAGE_TITLE.BAD_REQUEST' }
            },
            {
                path: '500',
                component: server_error_component_1.ServerErrorComponent,
                data: { title: 'PAGE_TITLE.SERVER_ERROR' }
            }
        ]
    }
];
//# sourceMappingURL=error.routes.js.map