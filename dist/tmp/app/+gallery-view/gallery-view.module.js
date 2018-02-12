"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var gallery_view_component_1 = require("./gallery-view.component");
var one_level_view_component_1 = require("./components/one-level-view.component");
var shared_module_1 = require("../shared/shared.module");
var gallery_view_resolver_1 = require("./services/gallery-view.resolver");
var GalleryViewModule = (function () {
    function GalleryViewModule() {
    }
    GalleryViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [shared_module_1.SharedModule],
                    declarations: [
                        gallery_view_component_1.GalleryViewComponent,
                        one_level_view_component_1.OneLevelViewComponent
                    ],
                    exports: [gallery_view_component_1.GalleryViewComponent],
                    providers: [gallery_view_resolver_1.GalleryViewResolver]
                },] },
    ];
    GalleryViewModule.ctorParameters = function () { return []; };
    return GalleryViewModule;
}());
exports.GalleryViewModule = GalleryViewModule;
//# sourceMappingURL=gallery-view.module.js.map