"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProjectAssetInfoComponent = (function () {
    function ProjectAssetInfoComponent() {
    }
    ProjectAssetInfoComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'project-asset-info-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"project-asset-count\">\n      <span *ngIf=\"count == 0\">No Assets</span>\n      <span *ngIf=\"count == 1\">1 Asset</span>\n      <span *ngIf=\"count > 1\">{{ count }} Assets</span>\n    </div>\n  "
                },] },
    ];
    ProjectAssetInfoComponent.ctorParameters = function () { return []; };
    ProjectAssetInfoComponent.propDecorators = {
        'count': [{ type: core_1.Input },],
    };
    return ProjectAssetInfoComponent;
}());
exports.ProjectAssetInfoComponent = ProjectAssetInfoComponent;
//# sourceMappingURL=project-asset-info.component.js.map