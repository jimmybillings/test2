"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var QuotePurchaseTypeComponent = (function () {
    function QuotePurchaseTypeComponent() {
        this.selectQuoteType = new core_1.EventEmitter();
        this.selectedType = null;
    }
    Object.defineProperty(QuotePurchaseTypeComponent.prototype, "quoteTypes", {
        set: function (types) {
            this.types = types;
            if (!this.selectedType)
                this.selectedType = this.types[0].value;
        },
        enumerable: true,
        configurable: true
    });
    QuotePurchaseTypeComponent.prototype.onSelectChange = function (event) {
        this.selectQuoteType.emit({ purchaseType: event.value });
    };
    QuotePurchaseTypeComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-purchase-type-component',
                    template: "\n    <mat-form-field class=\"quote-purchase-types\">  \n      <mat-select \n      (change)=\"onSelectChange($event)\" \n      [(ngModel)]=\"selectedType\" \n      placeholder=\"{{ 'QUOTE.PURCHASE_TYPE_SELECT' | translate }}\">\n      <mat-option\n      *ngFor=\"let type of types\"\n      [value]=\"type.value\">{{ type.viewValue }}\n      </mat-option>\n      </mat-select>\n    </mat-form-field>  \n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    styles: [
                        "mat-form-field { width: 200px; padding: 20px 5px 0 5px;}",
                        ":host { margin-bottom: -48px; min-width: 284px; }"
                    ]
                },] },
    ];
    QuotePurchaseTypeComponent.ctorParameters = function () { return []; };
    QuotePurchaseTypeComponent.propDecorators = {
        'selectQuoteType': [{ type: core_1.Output },],
        'selectedType': [{ type: core_1.Input },],
        'quoteTypes': [{ type: core_1.Input },],
    };
    return QuotePurchaseTypeComponent;
}());
exports.QuotePurchaseTypeComponent = QuotePurchaseTypeComponent;
//# sourceMappingURL=quote-purchase-type.component.js.map