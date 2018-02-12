"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LineItemPriceComponent = (function () {
    function LineItemPriceComponent() {
        this.addCustomPrice = new core_1.EventEmitter();
    }
    Object.defineProperty(LineItemPriceComponent.prototype, "needsAttributes", {
        get: function () {
            return this.rightsManaged === 'Rights Managed' && !this.hasAttributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemPriceComponent.prototype, "shouldShowMultiplier", {
        get: function () {
            return this.userCanAdministerQuotes && this.multiplier > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemPriceComponent.prototype, "formattedMultiplier", {
        get: function () {
            if (String(this.multiplier).includes('.')) {
                var _a = String(this.multiplier).split('.'), integer = _a[0], decimal = _a[1];
                return integer.concat('.').concat(decimal.slice(0, 2));
            }
            else {
                return String(this.multiplier);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemPriceComponent.prototype, "showAdminPrice", {
        get: function () {
            return this.userCanAdministerQuotes && !this.needsAttributes && !this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemPriceComponent.prototype, "showPreDiscountPrice", {
        get: function () {
            return this.userCanAdministerQuotes && (this.grossAssetPrice !== this.price);
        },
        enumerable: true,
        configurable: true
    });
    LineItemPriceComponent.prototype.onClickPrice = function () {
        this.addCustomPrice.emit();
    };
    LineItemPriceComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'line-item-price-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div\n      layout=\"column\"\n      class=\"line-item-price\"\n      layout-align=\"center end\">\n        <div *ngIf=\"shouldShowMultiplier\" \n          class=\"multiplier-base\"\n          layout=\"row\"\n          layout-align=\"end center\">\n          <div class=\"label\" flex=\"100\">{{ 'QUOTE.MULTIPLIER_BASE_PRICE_LABEL' | translate }}</div>\n          <div class=\"multiplier-base-price\" flex=\"no-grow\">{{ itemPrice | currency:'USD':true:'1.2-2' }}</div>\n        </div>\n        <div *ngIf=\"shouldShowMultiplier\" \n          class=\"multiplier\"\n          layout=\"row\"\n          layout-align=\"end center\">\n          <div class=\"label\" flex=\"100\">{{ 'QUOTE.MULTIPLIER_LABEL' | translate }}</div>\n          <div class=\"multiplier-value\" flex=\"no-grow\">\n            {{ 'QUOTE.MULTIPLIER_VALUE' | translate:{multiplier: formattedMultiplier} }}\n          </div>\n        </div>\n        <div *ngIf=\"showPreDiscountPrice\" \n          class=\"pre-discount\"\n          layout=\"row\"\n          layout-align=\"end center\">\n          <div class=\"label\" flex=\"100\">{{ 'QUOTE.PRE_DISCOUNT_PRICE_LABEL' | translate }}</div>\n          <div class=\"pre-discount-price\" flex=\"no-grow\">{{ grossAssetPrice | currency:'USD':true:'1.2-2' }}</div>\n        </div>\n        <div\n          *ngIf=\"showAdminPrice\"\n          (click)=\"onClickPrice()\"\n          class=\"admin-price\"\n          [ngClass]=\"{'select-usage': needsAttributes }\">\n            {{ price | currency:'USD':true:'1.2-2' }}\n        </div>\n        <div\n          *ngIf=\"!showAdminPrice\"\n          class=\"non-admin-price\"\n          [ngClass]=\"{'select-usage': needsAttributes }\">\n          {{ price | currency:'USD':true:'1.2-2' }}\n        </div>\n    </div>\n  "
                },] },
    ];
    LineItemPriceComponent.ctorParameters = function () { return []; };
    LineItemPriceComponent.propDecorators = {
        'price': [{ type: core_1.Input },],
        'itemPrice': [{ type: core_1.Input },],
        'grossAssetPrice': [{ type: core_1.Input },],
        'multiplier': [{ type: core_1.Input },],
        'userCanAdministerQuotes': [{ type: core_1.Input },],
        'rightsManaged': [{ type: core_1.Input },],
        'hasAttributes': [{ type: core_1.Input },],
        'readonly': [{ type: core_1.Input },],
        'addCustomPrice': [{ type: core_1.Output },],
    };
    return LineItemPriceComponent;
}());
exports.LineItemPriceComponent = LineItemPriceComponent;
//# sourceMappingURL=line-item-price.component.js.map