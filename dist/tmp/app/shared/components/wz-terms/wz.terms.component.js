"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzTermsComponent = (function () {
    function WzTermsComponent() {
    }
    WzTermsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-terms',
                    templateUrl: 'wz.terms.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzTermsComponent.ctorParameters = function () { return []; };
    WzTermsComponent.propDecorators = {
        'terms': [{ type: core_1.Input },],
        'btnLabel': [{ type: core_1.Input },],
        'header': [{ type: core_1.Input },],
    };
    return WzTermsComponent;
}());
exports.WzTermsComponent = WzTermsComponent;
//# sourceMappingURL=wz.terms.component.js.map