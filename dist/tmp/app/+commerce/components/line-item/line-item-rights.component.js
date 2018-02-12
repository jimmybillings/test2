"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LineItemRightsComponent = (function () {
    function LineItemRightsComponent() {
        this.readOnly = false;
        this.displayRmAttributes = true;
        this.showPricingDialog = new core_1.EventEmitter();
    }
    LineItemRightsComponent.prototype.attributeName = function (attribute) {
        return attribute.priceAttributeDisplayName || attribute.priceAttributeName;
    };
    LineItemRightsComponent.prototype.attributeValue = function (attribute) {
        return attribute.selectedAttributeName || attribute.selectedAttributeValue;
    };
    Object.defineProperty(LineItemRightsComponent.prototype, "rightsManagedDisplayUsage", {
        get: function () {
            return this.rightsManaged === 'Rights Managed' && this.displayRmAttributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemRightsComponent.prototype, "rightsManagedWithoutUsage", {
        get: function () {
            return this.rightsManaged === 'Rights Managed' && !this.displayRmAttributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemRightsComponent.prototype, "rightsRoyaltyFree", {
        get: function () {
            return this.rightsManaged === 'Royalty Free';
        },
        enumerable: true,
        configurable: true
    });
    LineItemRightsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'line-item-rights-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n  <ng-container *ngIf=\"rightsManagedWithoutUsage\">\n    <section class=\"read-only\">\n      <header class=\"rights-managed\">{{rightsManaged}}</header>\n    </section>\n  </ng-container>\n\n  <ng-container *ngIf=\"rightsManagedDisplayUsage\">\n    <section\n      data-pendo=\"cart-lineitem_pricing-btn\"\n      [ngClass]=\"{'read-only': readOnly, 'needs-rights': !hasAttributes}\"\n      (click)=\"showPricingDialog.emit()\">\n      <ng-container>\n        <header>{{'QUOTE.RIGHTS_PACKAGE_TITLE' | translate}}</header>\n        <span *ngIf=\"!hasAttributes\" class=\"cart-asset-metadata mat-caption\">\n          <strong>{{'QUOTE.RIGHTS_PACKAGE_NOT_SELECTED_MSG' | translate}}</strong>\n        </span>\n      </ng-container>\n      <ng-container *ngIf=\"displayRmAttributes\">\n        <span *ngFor=\"let right of rights\" class=\"cart-asset-metadata mat-caption\">\n        <strong>{{attributeName(right)}}: </strong> {{attributeValue(right)}}\n        </span>\n      </ng-container>\n    </section>\n  </ng-container>\n\n  <ng-container *ngIf=\"rightsRoyaltyFree\">\n    <section class=\"read-only\">\n      <header class=\"royalty-free\">{{rightsManaged}}</header>\n    </section>\n  </ng-container>\n\n  "
                },] },
    ];
    LineItemRightsComponent.ctorParameters = function () { return []; };
    LineItemRightsComponent.propDecorators = {
        'rights': [{ type: core_1.Input },],
        'rightsManaged': [{ type: core_1.Input },],
        'hasAttributes': [{ type: core_1.Input },],
        'readOnly': [{ type: core_1.Input },],
        'displayRmAttributes': [{ type: core_1.Input },],
        'showPricingDialog': [{ type: core_1.Output },],
    };
    return LineItemRightsComponent;
}());
exports.LineItemRightsComponent = LineItemRightsComponent;
//# sourceMappingURL=line-item-rights.component.js.map