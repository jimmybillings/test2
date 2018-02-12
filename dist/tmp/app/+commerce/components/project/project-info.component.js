"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProjectInfoComponent = (function () {
    function ProjectInfoComponent() {
        this.readOnly = false;
    }
    ProjectInfoComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'project-info-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <section>\n      <h5 mat-display-1>\n        <span class=\"project-label mat-caption\">{{ 'CART.PROJECTS.PROJECT_NAME' | translate }}</span>\n        <span class=\"project-name\">{{ name }}</span>\n      </h5>\n\n      <span class=\"project-client mat-caption\">\n        <strong>{{ 'CART.PROJECTS.CLIENT_NAME' | translate }}</strong> \n        {{ clientName }}\n      </span><br/>\n\n      <span class=\"project-client mat-caption\">\n        <strong>{{ 'CART.PROJECTS.LICENSE_START_DATE' | translate }}</strong> \n        {{ (licenseStartDate | date:'yyyy-MM-dd') || ('CART.PROJECTS.DEFAULT_LICENSE_START_DATE' | translate ) }}\n      </span>\n    <section>\n  "
                },] },
    ];
    ProjectInfoComponent.ctorParameters = function () { return []; };
    ProjectInfoComponent.propDecorators = {
        'name': [{ type: core_1.Input },],
        'clientName': [{ type: core_1.Input },],
        'licenseStartDate': [{ type: core_1.Input },],
        'readOnly': [{ type: core_1.Input },],
    };
    return ProjectInfoComponent;
}());
exports.ProjectInfoComponent = ProjectInfoComponent;
//# sourceMappingURL=project-info.component.js.map