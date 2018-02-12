"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CommerceListComponent = (function () {
    function CommerceListComponent() {
        this.setAsFocusedQuote = new core_1.EventEmitter();
        this.editQuote = new core_1.EventEmitter();
        this.rejectQuote = new core_1.EventEmitter();
    }
    CommerceListComponent.prototype.shouldShowSetFocusedButton = function (item) {
        return this.type === 'QUOTE' && item.quoteStatus === 'PENDING' && this.userCanAdministerQuotes;
    };
    CommerceListComponent.prototype.shouldShowEditQuoteButton = function (item) {
        return this.type === 'QUOTE' && item.quoteStatus === 'PENDING' && this.userCanAdministerQuotes;
    };
    CommerceListComponent.prototype.shouldShowViewQuoteButton = function (item) {
        return this.type === 'QUOTE' && item.quoteStatus !== 'PENDING';
    };
    CommerceListComponent.prototype.shouldShowRejectQuoteButton = function (item) {
        return this.type === 'QUOTE' && item.quoteStatus === 'ACTIVE' && !this.userCanAdministerQuotes;
    };
    CommerceListComponent.prototype.shouldShowRefundIndicatorFor = function (item) {
        return this.type === 'ORDER' && !!item.creditMemoForOrderId;
    };
    CommerceListComponent.prototype.shouldShowPaymentBalanceFor = function (item) {
        return this.type === 'ORDER' && !!item.paymentBalance && !!item.paymentDueDate && item.paymentBalance > 0;
    };
    Object.defineProperty(CommerceListComponent.prototype, "shouldShowViewOrderButton", {
        get: function () {
            return this.type === 'ORDER';
        },
        enumerable: true,
        configurable: true
    });
    CommerceListComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'commerce-list',
                    templateUrl: 'commerce-list.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CommerceListComponent.ctorParameters = function () { return []; };
    CommerceListComponent.propDecorators = {
        'items': [{ type: core_1.Input },],
        'type': [{ type: core_1.Input },],
        'userCanAdministerQuotes': [{ type: core_1.Input },],
        'setAsFocusedQuote': [{ type: core_1.Output },],
        'editQuote': [{ type: core_1.Output },],
        'rejectQuote': [{ type: core_1.Output },],
    };
    return CommerceListComponent;
}());
exports.CommerceListComponent = CommerceListComponent;
//# sourceMappingURL=commerce-list.component.js.map