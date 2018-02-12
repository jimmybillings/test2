"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var commerce_payment_tab_1 = require("../../../components/tabs/commerce-payment-tab");
var quote_service_1 = require("../../../../shared/services/quote.service");
var app_store_1 = require("../../../../app.store");
var QuotePaymentTabComponent = (function (_super) {
    __extends(QuotePaymentTabComponent, _super);
    function QuotePaymentTabComponent(_zone, quoteService, store, ref) {
        var _this = _super.call(this, _zone, quoteService, store, ref) || this;
        _this._zone = _zone;
        _this.quoteService = quoteService;
        _this.store = store;
        _this.ref = ref;
        return _this;
    }
    Object.defineProperty(QuotePaymentTabComponent.prototype, "showTrialMessage", {
        get: function () {
            return this.quoteService.paymentOptionsEqual(['Trial']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotePaymentTabComponent.prototype, "showDeliveryOnlyMessage", {
        get: function () {
            return this.quoteService.paymentOptionsEqual(['DeliveryOnly']);
        },
        enumerable: true,
        configurable: true
    });
    QuotePaymentTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-payment-tab',
            templateUrl: 'quote-payment-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            quote_service_1.QuoteService,
            app_store_1.AppStore,
            core_1.ChangeDetectorRef])
    ], QuotePaymentTabComponent);
    return QuotePaymentTabComponent;
}(commerce_payment_tab_1.CommercePaymentTab));
exports.QuotePaymentTabComponent = QuotePaymentTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvdGFicy9xdW90ZS1wYXltZW50LXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNHO0FBR3RHLHNGQUFtRjtBQUNuRiwyRUFBeUU7QUFFekUsbURBQWlEO0FBU2pEO0lBQThDLDRDQUFrQjtJQUM5RCxrQ0FDWSxLQUFhLEVBQ2IsWUFBMEIsRUFDMUIsS0FBZSxFQUNmLEdBQXNCO1FBSmxDLFlBTUUsa0JBQU0sS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLFNBQ3ZDO1FBTlcsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQUssR0FBTCxLQUFLLENBQVU7UUFDZixTQUFHLEdBQUgsR0FBRyxDQUFtQjs7SUFHbEMsQ0FBQztJQUVELHNCQUFXLHNEQUFnQjthQUEzQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDZEQUF1QjthQUFsQztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQWhCVSx3QkFBd0I7UUFQcEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FJbUIsYUFBTTtZQUNDLDRCQUFZO1lBQ25CLG9CQUFRO1lBQ1Ysd0JBQWlCO09BTHZCLHdCQUF3QixDQWlCcEM7SUFBRCwrQkFBQztDQWpCRCxBQWlCQyxDQWpCNkMseUNBQWtCLEdBaUIvRDtBQWpCWSw0REFBd0IiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvY29tcG9uZW50cy90YWJzL3F1b3RlLXBheW1lbnQtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBOZ1pvbmUsIENoYW5nZURldGVjdG9yUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IENvbW1lcmNlUGF5bWVudFRhYiB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy9jb21tZXJjZS1wYXltZW50LXRhYic7XG5pbXBvcnQgeyBRdW90ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvcXVvdGUuc2VydmljZSc7XG5pbXBvcnQgeyBRdW90ZVN0YXRlLCBQYXltZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3F1b3RlLXBheW1lbnQtdGFiJyxcbiAgdGVtcGxhdGVVcmw6ICdxdW90ZS1wYXltZW50LXRhYi5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBRdW90ZVBheW1lbnRUYWJDb21wb25lbnQgZXh0ZW5kcyBDb21tZXJjZVBheW1lbnRUYWIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX3pvbmU6IE5nWm9uZSxcbiAgICBwcm90ZWN0ZWQgcXVvdGVTZXJ2aWNlOiBRdW90ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcm90ZWN0ZWQgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBzdXBlcihfem9uZSwgcXVvdGVTZXJ2aWNlLCBzdG9yZSwgcmVmKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd1RyaWFsTWVzc2FnZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5xdW90ZVNlcnZpY2UucGF5bWVudE9wdGlvbnNFcXVhbChbJ1RyaWFsJ10pO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93RGVsaXZlcnlPbmx5TWVzc2FnZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5xdW90ZVNlcnZpY2UucGF5bWVudE9wdGlvbnNFcXVhbChbJ0RlbGl2ZXJ5T25seSddKTtcbiAgfVxufVxuIl19
