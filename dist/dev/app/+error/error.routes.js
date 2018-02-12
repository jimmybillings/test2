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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZXJyb3IvZXJyb3Iucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOEVBQTJFO0FBQzNFLGlGQUE4RTtBQUM5RSxxREFBbUQ7QUFFbkQsd0VBQXFFO0FBRXhELFFBQUEsWUFBWSxHQUFXO0lBQ2xDO1FBQ0UsSUFBSSxFQUFFLE9BQU87UUFDYixTQUFTLEVBQUUsZ0NBQWM7UUFDekIsUUFBUSxFQUFFO1lBQ1I7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsU0FBUyxFQUFFLHVDQUFpQjtnQkFDNUIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFO2FBQ3hDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsU0FBUyxFQUFFLDJDQUFtQjtnQkFDOUIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFO2FBQzFDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsU0FBUyxFQUFFLDZDQUFvQjtnQkFDL0IsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFO2FBQzNDO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJmaWxlIjoiYXBwLytlcnJvci9lcnJvci5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYWRSZXF1ZXN0Q29tcG9uZW50IH0gZnJvbSAnLi8rYmFkLXJlcXVlc3QvYmFkLXJlcXVlc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFNlcnZlckVycm9yQ29tcG9uZW50IH0gZnJvbSAnLi8rc2VydmVyLWVycm9yL3NlcnZlci1lcnJvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgfSBmcm9tICcuL2Vycm9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTm90Rm91bmRDb21wb25lbnQgfSBmcm9tICcuLytub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCBFUlJPUl9ST1VURVM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICdlcnJvcicsXG4gICAgY29tcG9uZW50OiBFcnJvckNvbXBvbmVudCxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBwYXRoOiAnNDA0JyxcbiAgICAgICAgY29tcG9uZW50OiBOb3RGb3VuZENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyB0aXRsZTogJ1BBR0VfVElUTEUuTk9UX0ZPVU5EJyB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiAnNDAwJyxcbiAgICAgICAgY29tcG9uZW50OiBCYWRSZXF1ZXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiAnUEFHRV9USVRMRS5CQURfUkVRVUVTVCcgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJzUwMCcsXG4gICAgICAgIGNvbXBvbmVudDogU2VydmVyRXJyb3JDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLlNFUlZFUl9FUlJPUicgfVxuICAgICAgfVxuICAgIF1cbiAgfVxuXTtcbiJdfQ==
