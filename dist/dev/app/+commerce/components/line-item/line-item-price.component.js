"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    Object.defineProperty(LineItemPriceComponent.prototype, "shouldShowBasePrice", {
        get: function () {
            return this.userCanAdministerQuotes && !!this.overrideGrossAssetPrice && this.itemPrice !== this.price;
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
    Object.defineProperty(LineItemPriceComponent.prototype, "showAdminOveridePrice", {
        get: function () {
            return this.userCanAdministerQuotes && !this.readonly && !!this.overrideGrossAssetPrice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemPriceComponent.prototype, "showAdminPrice", {
        get: function () {
            return this.userCanAdministerQuotes && !this.needsAttributes && !this.readonly && !this.overrideGrossAssetPrice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemPriceComponent.prototype, "showPreDiscountPrice", {
        get: function () {
            return this.userCanAdministerQuotes && !this.overrideGrossAssetPrice && (this.itemPrice !== this.price);
        },
        enumerable: true,
        configurable: true
    });
    LineItemPriceComponent.prototype.onClickPrice = function () {
        this.addCustomPrice.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LineItemPriceComponent.prototype, "price", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LineItemPriceComponent.prototype, "itemPrice", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LineItemPriceComponent.prototype, "grossAssetPrice", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LineItemPriceComponent.prototype, "multiplier", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LineItemPriceComponent.prototype, "overrideGrossAssetPrice", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemPriceComponent.prototype, "userCanAdministerQuotes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LineItemPriceComponent.prototype, "rightsManaged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemPriceComponent.prototype, "hasAttributes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemPriceComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemPriceComponent.prototype, "addCustomPrice", void 0);
    LineItemPriceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'line-item-price-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div\n      layout=\"column\"\n      class=\"line-item-price\"\n      layout-align=\"center end\">\n      <div *ngIf=\"shouldShowBasePrice\" \n        class=\"multiplier-base\"\n        layout=\"row\"\n        layout-align=\"end center\">\n        <div class=\"label\" flex=\"100\">{{ 'QUOTE.BASE_PRICE_LABEL' | translate }}</div>\n        <div class=\"multiplier-base-price\" flex=\"no-grow\">{{ itemPrice | currency:'USD':true:'1.2-2' }}</div>\n      </div>  \n      <ng-container *ngIf=\"shouldShowMultiplier\">\n        <div\n          class=\"multiplier-base\"\n          layout=\"row\"\n          layout-align=\"end center\">\n          <div class=\"label\" flex=\"100\">{{ 'QUOTE.MULTIPLIER_BASE_PRICE_LABEL' | translate }}</div>\n          <div class=\"multiplier-base-price\" flex=\"no-grow\">{{ itemPrice | currency:'USD':true:'1.2-2' }}</div>\n        </div>\n        <div \n          class=\"multiplier\"\n          layout=\"row\"\n          layout-align=\"end center\">\n          <div class=\"label\" flex=\"100\">{{ 'QUOTE.MULTIPLIER_LABEL' | translate }}</div>\n          <div class=\"multiplier-value\" flex=\"no-grow\">\n            {{ 'QUOTE.MULTIPLIER_VALUE' | translate:{multiplier: formattedMultiplier} }}\n          </div>\n        </div>\n      </ng-container>\n      <div *ngIf=\"showPreDiscountPrice\" \n        class=\"pre-discount\"\n        layout=\"row\"\n        layout-align=\"end center\">\n        <div class=\"label\" flex=\"100\">{{ 'QUOTE.PRE_DISCOUNT_PRICE_LABEL' | translate }}</div>\n        <div class=\"pre-discount-price\" flex=\"no-grow\">{{ grossAssetPrice | currency:'USD':true:'1.2-2' }}</div>\n      </div>\n      <div\n        *ngIf=\"showAdminPrice\"\n        (click)=\"onClickPrice()\"\n        class=\"admin-price\"\n        [ngClass]=\"{'select-usage': needsAttributes }\">\n          {{ price | currency:'USD':true:'1.2-2' }}\n      </div>\n      <div\n        *ngIf=\"showAdminOveridePrice\"\n        (click)=\"onClickPrice()\"\n        class=\"admin-price\"\n        [ngClass]=\"{'select-usage': needsAttributes }\">\n          <mat-icon>lock</mat-icon>{{ overrideGrossAssetPrice | currency:'USD':true:'1.2-2' }}\n      </div>\n      <div\n        *ngIf=\"!showAdminPrice && !showAdminOveridePrice\"\n        class=\"non-admin-price\"\n        [ngClass]=\"{'select-usage': needsAttributes }\">\n        {{ price | currency:'USD':true:'1.2-2' }}\n      </div>\n    </div>\n  "
        })
    ], LineItemPriceComponent);
    return LineItemPriceComponent;
}());
exports.LineItemPriceComponent = LineItemPriceComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtLXByaWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFnRztBQWtFaEc7SUFoRUE7UUEwRVksbUJBQWMsR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFzQ3BFLENBQUM7SUFwQ0Msc0JBQVcsbURBQWU7YUFBMUI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDeEUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx3REFBb0I7YUFBL0I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQzdELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsdURBQW1CO2FBQTlCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6RyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHVEQUFtQjthQUE5QjtZQUNFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBQSx1Q0FBdUQsRUFBdEQsZUFBTyxFQUFFLGVBQU8sQ0FBdUM7Z0JBQzlELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx5REFBcUI7YUFBaEM7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQzFGLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsa0RBQWM7YUFBekI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFDbEgsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx3REFBb0I7YUFBL0I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUcsQ0FBQzs7O09BQUE7SUFFTSw2Q0FBWSxHQUFuQjtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQTlDUTtRQUFSLFlBQUssRUFBRTs7eURBQWU7SUFDZDtRQUFSLFlBQUssRUFBRTs7NkRBQW1CO0lBQ2xCO1FBQVIsWUFBSyxFQUFFOzttRUFBeUI7SUFDeEI7UUFBUixZQUFLLEVBQUU7OzhEQUFvQjtJQUNuQjtRQUFSLFlBQUssRUFBRTs7MkVBQWlDO0lBQ2hDO1FBQVIsWUFBSyxFQUFFOzsyRUFBa0M7SUFDakM7UUFBUixZQUFLLEVBQUU7O2lFQUF1QjtJQUN0QjtRQUFSLFlBQUssRUFBRTs7aUVBQXdCO0lBQ3ZCO1FBQVIsWUFBSyxFQUFFOzs0REFBbUI7SUFDakI7UUFBVCxhQUFNLEVBQUU7a0NBQWlCLG1CQUFZO2tFQUE0QjtJQVZ2RCxzQkFBc0I7UUFoRWxDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsczRFQTBEVDtTQUNGLENBQUM7T0FDVyxzQkFBc0IsQ0FnRGxDO0lBQUQsNkJBQUM7Q0FoREQsQUFnREMsSUFBQTtBQWhEWSx3REFBc0IiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2xpbmUtaXRlbS9saW5lLWl0ZW0tcHJpY2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2xpbmUtaXRlbS1wcmljZS1jb21wb25lbnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBsYXlvdXQ9XCJjb2x1bW5cIlxuICAgICAgY2xhc3M9XCJsaW5lLWl0ZW0tcHJpY2VcIlxuICAgICAgbGF5b3V0LWFsaWduPVwiY2VudGVyIGVuZFwiPlxuICAgICAgPGRpdiAqbmdJZj1cInNob3VsZFNob3dCYXNlUHJpY2VcIiBcbiAgICAgICAgY2xhc3M9XCJtdWx0aXBsaWVyLWJhc2VcIlxuICAgICAgICBsYXlvdXQ9XCJyb3dcIlxuICAgICAgICBsYXlvdXQtYWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiIGZsZXg9XCIxMDBcIj57eyAnUVVPVEUuQkFTRV9QUklDRV9MQUJFTCcgfCB0cmFuc2xhdGUgfX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm11bHRpcGxpZXItYmFzZS1wcmljZVwiIGZsZXg9XCJuby1ncm93XCI+e3sgaXRlbVByaWNlIHwgY3VycmVuY3k6J1VTRCc6dHJ1ZTonMS4yLTInIH19PC9kaXY+XG4gICAgICA8L2Rpdj4gIFxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3VsZFNob3dNdWx0aXBsaWVyXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cIm11bHRpcGxpZXItYmFzZVwiXG4gICAgICAgICAgbGF5b3V0PVwicm93XCJcbiAgICAgICAgICBsYXlvdXQtYWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCIgZmxleD1cIjEwMFwiPnt7ICdRVU9URS5NVUxUSVBMSUVSX0JBU0VfUFJJQ0VfTEFCRUwnIHwgdHJhbnNsYXRlIH19PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm11bHRpcGxpZXItYmFzZS1wcmljZVwiIGZsZXg9XCJuby1ncm93XCI+e3sgaXRlbVByaWNlIHwgY3VycmVuY3k6J1VTRCc6dHJ1ZTonMS4yLTInIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IFxuICAgICAgICAgIGNsYXNzPVwibXVsdGlwbGllclwiXG4gICAgICAgICAgbGF5b3V0PVwicm93XCJcbiAgICAgICAgICBsYXlvdXQtYWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCIgZmxleD1cIjEwMFwiPnt7ICdRVU9URS5NVUxUSVBMSUVSX0xBQkVMJyB8IHRyYW5zbGF0ZSB9fTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdWx0aXBsaWVyLXZhbHVlXCIgZmxleD1cIm5vLWdyb3dcIj5cbiAgICAgICAgICAgIHt7ICdRVU9URS5NVUxUSVBMSUVSX1ZBTFVFJyB8IHRyYW5zbGF0ZTp7bXVsdGlwbGllcjogZm9ybWF0dGVkTXVsdGlwbGllcn0gfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93UHJlRGlzY291bnRQcmljZVwiIFxuICAgICAgICBjbGFzcz1cInByZS1kaXNjb3VudFwiXG4gICAgICAgIGxheW91dD1cInJvd1wiXG4gICAgICAgIGxheW91dC1hbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCIgZmxleD1cIjEwMFwiPnt7ICdRVU9URS5QUkVfRElTQ09VTlRfUFJJQ0VfTEFCRUwnIHwgdHJhbnNsYXRlIH19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmUtZGlzY291bnQtcHJpY2VcIiBmbGV4PVwibm8tZ3Jvd1wiPnt7IGdyb3NzQXNzZXRQcmljZSB8IGN1cnJlbmN5OidVU0QnOnRydWU6JzEuMi0yJyB9fTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0lmPVwic2hvd0FkbWluUHJpY2VcIlxuICAgICAgICAoY2xpY2spPVwib25DbGlja1ByaWNlKClcIlxuICAgICAgICBjbGFzcz1cImFkbWluLXByaWNlXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3QtdXNhZ2UnOiBuZWVkc0F0dHJpYnV0ZXMgfVwiPlxuICAgICAgICAgIHt7IHByaWNlIHwgY3VycmVuY3k6J1VTRCc6dHJ1ZTonMS4yLTInIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCJzaG93QWRtaW5PdmVyaWRlUHJpY2VcIlxuICAgICAgICAoY2xpY2spPVwib25DbGlja1ByaWNlKClcIlxuICAgICAgICBjbGFzcz1cImFkbWluLXByaWNlXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3QtdXNhZ2UnOiBuZWVkc0F0dHJpYnV0ZXMgfVwiPlxuICAgICAgICAgIDxtYXQtaWNvbj5sb2NrPC9tYXQtaWNvbj57eyBvdmVycmlkZUdyb3NzQXNzZXRQcmljZSB8IGN1cnJlbmN5OidVU0QnOnRydWU6JzEuMi0yJyB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0lmPVwiIXNob3dBZG1pblByaWNlICYmICFzaG93QWRtaW5PdmVyaWRlUHJpY2VcIlxuICAgICAgICBjbGFzcz1cIm5vbi1hZG1pbi1wcmljZVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0LXVzYWdlJzogbmVlZHNBdHRyaWJ1dGVzIH1cIj5cbiAgICAgICAge3sgcHJpY2UgfCBjdXJyZW5jeTonVVNEJzp0cnVlOicxLjItMicgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIExpbmVJdGVtUHJpY2VDb21wb25lbnQge1xuICBASW5wdXQoKSBwcmljZTogbnVtYmVyO1xuICBASW5wdXQoKSBpdGVtUHJpY2U6IG51bWJlcjtcbiAgQElucHV0KCkgZ3Jvc3NBc3NldFByaWNlOiBudW1iZXI7XG4gIEBJbnB1dCgpIG11bHRpcGxpZXI6IG51bWJlcjtcbiAgQElucHV0KCkgb3ZlcnJpZGVHcm9zc0Fzc2V0UHJpY2U6IG51bWJlcjtcbiAgQElucHV0KCkgdXNlckNhbkFkbWluaXN0ZXJRdW90ZXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJpZ2h0c01hbmFnZWQ6IHN0cmluZztcbiAgQElucHV0KCkgaGFzQXR0cmlidXRlczogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBhZGRDdXN0b21QcmljZTogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBnZXQgbmVlZHNBdHRyaWJ1dGVzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0c01hbmFnZWQgPT09ICdSaWdodHMgTWFuYWdlZCcgJiYgIXRoaXMuaGFzQXR0cmlidXRlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvdWxkU2hvd011bHRpcGxpZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgJiYgdGhpcy5tdWx0aXBsaWVyID4gMTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvdWxkU2hvd0Jhc2VQcmljZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyAmJiAhIXRoaXMub3ZlcnJpZGVHcm9zc0Fzc2V0UHJpY2UgJiYgdGhpcy5pdGVtUHJpY2UgIT09IHRoaXMucHJpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZvcm1hdHRlZE11bHRpcGxpZXIoKTogc3RyaW5nIHtcbiAgICBpZiAoU3RyaW5nKHRoaXMubXVsdGlwbGllcikuaW5jbHVkZXMoJy4nKSkge1xuICAgICAgY29uc3QgW2ludGVnZXIsIGRlY2ltYWxdID0gU3RyaW5nKHRoaXMubXVsdGlwbGllcikuc3BsaXQoJy4nKTtcbiAgICAgIHJldHVybiBpbnRlZ2VyLmNvbmNhdCgnLicpLmNvbmNhdChkZWNpbWFsLnNsaWNlKDAsIDIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFN0cmluZyh0aGlzLm11bHRpcGxpZXIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd0FkbWluT3ZlcmlkZVByaWNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzICYmICF0aGlzLnJlYWRvbmx5ICYmICEhdGhpcy5vdmVycmlkZUdyb3NzQXNzZXRQcmljZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd0FkbWluUHJpY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbkFkbWluaXN0ZXJRdW90ZXMgJiYgIXRoaXMubmVlZHNBdHRyaWJ1dGVzICYmICF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLm92ZXJyaWRlR3Jvc3NBc3NldFByaWNlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93UHJlRGlzY291bnRQcmljZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyAmJiAhdGhpcy5vdmVycmlkZUdyb3NzQXNzZXRQcmljZSAmJiAodGhpcy5pdGVtUHJpY2UgIT09IHRoaXMucHJpY2UpO1xuICB9XG5cbiAgcHVibGljIG9uQ2xpY2tQcmljZSgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZEN1c3RvbVByaWNlLmVtaXQoKTtcbiAgfVxufVxuIl19
