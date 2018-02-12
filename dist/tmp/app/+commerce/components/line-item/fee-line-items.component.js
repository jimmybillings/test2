"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FeeLineItemsComponent = (function () {
    function FeeLineItemsComponent() {
        this.readOnly = false;
        this.feeLineItemsNotify = new core_1.EventEmitter();
    }
    FeeLineItemsComponent.prototype.onRemove = function (feeLineItem) {
        this.feeLineItemsNotify.emit({ type: 'REMOVE_QUOTE_FEE', payload: feeLineItem });
    };
    FeeLineItemsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'fee-line-items-component',
                    templateUrl: './fee-line-items.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    FeeLineItemsComponent.ctorParameters = function () { return []; };
    FeeLineItemsComponent.propDecorators = {
        'feeLineItems': [{ type: core_1.Input },],
        'readOnly': [{ type: core_1.Input },],
        'feeLineItemsNotify': [{ type: core_1.Output },],
    };
    return FeeLineItemsComponent;
}());
exports.FeeLineItemsComponent = FeeLineItemsComponent;
//# sourceMappingURL=fee-line-items.component.js.map