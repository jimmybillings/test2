"use strict";
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
    ErrorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild(error_routes_1.ERROR_ROUTES)],
                    declarations: [error_component_1.ErrorComponent, not_found_component_1.NotFoundComponent, bad_request_component_1.BadRequestComponent, server_error_component_1.ServerErrorComponent],
                    exports: [error_component_1.ErrorComponent]
                },] },
    ];
    ErrorModule.ctorParameters = function () { return []; };
    return ErrorModule;
}());
exports.ErrorModule = ErrorModule;
//# sourceMappingURL=error.module.js.map