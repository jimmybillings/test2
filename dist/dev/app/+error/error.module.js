"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var error_routes_1 = require("./error.routes");
var error_component_1 = require("./error.component");
var bad_request_component_1 = require("./+bad-request/bad-request.component");
var server_error_component_1 = require("./+server-error/server-error.component");
var not_found_component_1 = require("./+not-found/not-found.component");
var ErrorModule = (function () {
    function ErrorModule() {
    }
    ErrorModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild(error_routes_1.ERROR_ROUTES)],
            declarations: [error_component_1.ErrorComponent, not_found_component_1.NotFoundComponent, bad_request_component_1.BadRequestComponent, server_error_component_1.ServerErrorComponent],
            exports: [error_component_1.ErrorComponent]
        })
    ], ErrorModule);
    return ErrorModule;
}());
exports.ErrorModule = ErrorModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZXJyb3IvZXJyb3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMENBQStDO0FBQy9DLHNDQUF5QztBQUV6Qyx5REFBdUQ7QUFDdkQsK0NBQThDO0FBQzlDLHFEQUFtRDtBQUNuRCw4RUFBMkU7QUFDM0UsaUZBQThFO0FBQzlFLHdFQUFxRTtBQU9yRTtJQUFBO0lBQTJCLENBQUM7SUFBZixXQUFXO1FBTHZCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLDRCQUFZLEVBQUUscUJBQVksQ0FBQyxRQUFRLENBQUMsMkJBQVksQ0FBQyxDQUFDO1lBQzVELFlBQVksRUFBRSxDQUFDLGdDQUFjLEVBQUUsdUNBQWlCLEVBQUUsMkNBQW1CLEVBQUUsNkNBQW9CLENBQUM7WUFDNUYsT0FBTyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztTQUMxQixDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBNUIsQUFBNEIsSUFBQTtBQUFmLGtDQUFXIiwiZmlsZSI6ImFwcC8rZXJyb3IvZXJyb3IubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEVSUk9SX1JPVVRFUyB9IGZyb20gJy4vZXJyb3Iucm91dGVzJztcbmltcG9ydCB7IEVycm9yQ29tcG9uZW50IH0gZnJvbSAnLi9lcnJvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFkUmVxdWVzdENvbXBvbmVudCB9IGZyb20gJy4vK2JhZC1yZXF1ZXN0L2JhZC1yZXF1ZXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJ2ZXJFcnJvckNvbXBvbmVudCB9IGZyb20gJy4vK3NlcnZlci1lcnJvci9zZXJ2ZXItZXJyb3IuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdEZvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi8rbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoRVJST1JfUk9VVEVTKV0sXG4gIGRlY2xhcmF0aW9uczogW0Vycm9yQ29tcG9uZW50LCBOb3RGb3VuZENvbXBvbmVudCwgQmFkUmVxdWVzdENvbXBvbmVudCwgU2VydmVyRXJyb3JDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRXJyb3JDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yTW9kdWxlIHsgfVxuIl19
