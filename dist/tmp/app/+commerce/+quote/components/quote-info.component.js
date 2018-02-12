"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var QuoteInfoComponent = (function () {
    function QuoteInfoComponent() {
    }
    Object.defineProperty(QuoteInfoComponent.prototype, "isExpired", {
        get: function () {
            return new Date() > new Date(this.salesManager.expirationDate);
        },
        enumerable: true,
        configurable: true
    });
    QuoteInfoComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-info-component',
                    templateUrl: 'quote-info.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteInfoComponent.ctorParameters = function () { return []; };
    QuoteInfoComponent.propDecorators = {
        'billingAccount': [{ type: core_1.Input },],
        'invoiceContact': [{ type: core_1.Input },],
        'salesManager': [{ type: core_1.Input },],
        'user': [{ type: core_1.Input },],
    };
    return QuoteInfoComponent;
}());
exports.QuoteInfoComponent = QuoteInfoComponent;
//# sourceMappingURL=quote-info.component.js.map