"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzGalleryBreadcrumbComponent = (function () {
    function WzGalleryBreadcrumbComponent() {
        this.clickBreadcrumb = new core_1.EventEmitter();
    }
    WzGalleryBreadcrumbComponent.prototype.breadcrumbLabelFor = function (segment) {
        return (segment && segment.names) ? segment.names.join(' : ') : '';
    };
    WzGalleryBreadcrumbComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'wz-gallery-breadcrumb',
                    templateUrl: 'wz.gallery-breadcrumb.html',
                    moduleId: module.id,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzGalleryBreadcrumbComponent.ctorParameters = function () { return []; };
    WzGalleryBreadcrumbComponent.propDecorators = {
        'path': [{ type: core_1.Input },],
        'clickBreadcrumb': [{ type: core_1.Output },],
    };
    return WzGalleryBreadcrumbComponent;
}());
exports.WzGalleryBreadcrumbComponent = WzGalleryBreadcrumbComponent;
//# sourceMappingURL=wz.gallery-breadcrumb.component.js.map