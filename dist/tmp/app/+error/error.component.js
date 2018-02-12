"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ErrorComponent = (function () {
    function ErrorComponent() {
    }
    ErrorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'error-component',
                    template: "\n    <section class=\"error\">\n      <div class=\"hero\">\n        <router-outlet></router-outlet>\n      </div>\n    </section>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    ErrorComponent.ctorParameters = function () { return []; };
    return ErrorComponent;
}());
exports.ErrorComponent = ErrorComponent;
//# sourceMappingURL=error.component.js.map