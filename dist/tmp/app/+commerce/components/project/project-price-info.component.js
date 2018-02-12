"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProjectPriceInfoComponent = (function () {
    function ProjectPriceInfoComponent() {
    }
    ProjectPriceInfoComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'project-price-info-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"project-subtotal mat-caption\">\n      <strong>{{ 'CART.PROJECTS.PROJECT_SUBTOTAL' | translate }}</strong> \n      <span>{{ subtotal | currency:'USD':true:'1.2-2' }}</span>\n    </div>\n  "
                },] },
    ];
    ProjectPriceInfoComponent.ctorParameters = function () { return []; };
    ProjectPriceInfoComponent.propDecorators = {
        'subtotal': [{ type: core_1.Input },],
    };
    return ProjectPriceInfoComponent;
}());
exports.ProjectPriceInfoComponent = ProjectPriceInfoComponent;
//# sourceMappingURL=project-price-info.component.js.map