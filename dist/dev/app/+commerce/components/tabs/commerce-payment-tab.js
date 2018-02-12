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
var tab_1 = require("./tab");
var Subject_1 = require("rxjs/Subject");
var CommercePaymentTab = (function (_super) {
    __extends(CommercePaymentTab, _super);
    function CommercePaymentTab(_zone, commerceService, store, ref) {
        var _this = _super.call(this) || this;
        _this._zone = _zone;
        _this.commerceService = commerceService;
        _this.store = store;
        _this.ref = ref;
        _this.tabNotify = _this.notify;
        _this.serverErrors = null;
        _this.successfullyVerified = new Subject_1.Subject();
        _this.selectedPaymentOption = null;
        _this.successfullyVerified.next(false);
        return _this;
    }
    CommercePaymentTab.prototype.ngOnInit = function () {
        this.fields = this.store.selectCloned(function (state) { return state.uiConfig.components.cart.config.payment.items; }).take(1);
        this.loadStripe();
    };
    Object.defineProperty(CommercePaymentTab.prototype, "data", {
        get: function () {
            return this.commerceService.data.map(function (state) { return state.data; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommercePaymentTab.prototype, "paymentOptions", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.paymentOptions; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommercePaymentTab.prototype, "showHoldMessage", {
        get: function () {
            return this.commerceService.paymentOptionsEqual(['Hold']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommercePaymentTab.prototype, "showCreditCardForm", {
        get: function () {
            return this.commerceService.paymentOptionsEqual(['CreditCard']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommercePaymentTab.prototype, "showCreditCardAndPurchaseOnCredit", {
        get: function () {
            return this.commerceService.paymentOptionsEqual(['CreditCard', 'PurchaseOnCredit']);
        },
        enumerable: true,
        configurable: true
    });
    CommercePaymentTab.prototype.selectPurchaseOnCredit = function () {
        this.store.dispatch(function (factory) { return factory.checkout.setSelectedPaymentType('PurchaseOnCredit'); });
        this.tabNotify.emit({ type: 'GO_TO_NEXT_TAB' });
    };
    CommercePaymentTab.prototype.preAuthorize = function (form) {
        var _this = this;
        window.Stripe.card.createToken(form, function (status, response) {
            _this._zone.run(function () {
                if (status === 200) {
                    _this.store.dispatch(function (factory) { return factory.checkout.setCreditCardAuthorization(response); });
                    _this.store.dispatch(function (factory) { return factory.checkout.setSelectedPaymentType('CreditCard'); });
                    _this.tabNotify.emit({ type: 'GO_TO_NEXT_TAB' });
                    _this.successfullyVerified.next(true);
                    _this.ref.markForCheck();
                }
                else {
                    _this.serverErrors = { fieldErrors: [] };
                    _this.serverErrors.fieldErrors
                        .push({
                        code: response.error.code,
                        field: response.error.param
                    });
                    _this.successfullyVerified.next(false);
                    _this.ref.markForCheck();
                }
            });
        });
    };
    CommercePaymentTab.prototype.editCreditCard = function () {
        this.successfullyVerified.next(false);
        this.disableTab(3);
    };
    CommercePaymentTab.prototype.loadStripe = function () {
        var _this = this;
        var stripeScript = 'https://js.stripe.com/v2/';
        var scripts = document.getElementsByTagName('script');
        var i = scripts.length, stripeLoaded = false;
        while (i--) {
            if (scripts[i].src === stripeScript) {
                stripeLoaded = true;
            }
        }
        if (!stripeLoaded) {
            var script = document.createElement('script');
            Object.assign(script, { src: stripeScript, type: 'text/javascript' });
            document.body.appendChild(script);
            script.onload = function () {
                window.Stripe.setPublishableKey(_this.commerceService.state.data.stripePublicKey);
            };
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommercePaymentTab.prototype, "tabNotify", void 0);
    return CommercePaymentTab;
}(tab_1.Tab));
exports.CommercePaymentTab = CommercePaymentTab;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLXBheW1lbnQtdGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF3RjtBQUN4Riw2QkFBNEI7QUFJNUIsd0NBQXVDO0FBUXZDO0lBQXdDLHNDQUFHO0lBT3pDLDRCQUNZLEtBQWEsRUFDYixlQUEyQyxFQUMzQyxLQUFlLEVBQ2YsR0FBc0I7UUFKbEMsWUFNRSxpQkFBTyxTQUVSO1FBUFcsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLHFCQUFlLEdBQWYsZUFBZSxDQUE0QjtRQUMzQyxXQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2YsU0FBRyxHQUFILEdBQUcsQ0FBbUI7UUFWeEIsZUFBUyxHQUF5QixLQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pELGtCQUFZLEdBQVEsSUFBSSxDQUFDO1FBQ3pCLDBCQUFvQixHQUFpQixJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUNuRCwyQkFBcUIsR0FBa0IsSUFBSSxDQUFDO1FBVWpELEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBQ3hDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHNCQUFXLG9DQUFJO2FBQWY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBNkIsSUFBSyxPQUFBLEtBQUssQ0FBQyxJQUFJLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDdEYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4Q0FBYzthQUF6QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUE3QixDQUE2QixDQUFDLENBQUM7UUFDbkUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQ0FBZTthQUExQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGtEQUFrQjthQUE3QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlFQUFpQzthQUE1QztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUN0RixDQUFDOzs7T0FBQTtJQUVNLG1EQUFzQixHQUE3QjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUEzRCxDQUEyRCxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSx5Q0FBWSxHQUFuQixVQUFvQixJQUFTO1FBQTdCLGlCQXVCQztRQXRCTyxNQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQ25DLElBQUksRUFDSixVQUFDLE1BQWMsRUFBRSxRQUFpQztZQUNoRCxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxFQUFyRCxDQUFxRCxDQUFDLENBQUM7b0JBQ3RGLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsRUFBckQsQ0FBcUQsQ0FBQyxDQUFDO29CQUN0RixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7b0JBQ2hELEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzFCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDeEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXO3lCQUMxQixJQUFJLENBQUM7d0JBQ0osSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSTt3QkFDekIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSztxQkFDNUIsQ0FBQyxDQUFDO29CQUNMLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RDLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzFCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDJDQUFjLEdBQXJCO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFTyx1Q0FBVSxHQUFsQjtRQUFBLGlCQWlCQztRQWhCQyxJQUFNLFlBQVksR0FBRywyQkFBMkIsQ0FBQztRQUNqRCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNYLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxNQUFNLEdBQUc7Z0JBQ1IsTUFBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDMUYsQ0FBQyxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUE3RlM7UUFBVCxhQUFNLEVBQUU7a0NBQVksbUJBQVk7eURBQXVCO0lBOEYxRCx5QkFBQztDQS9GRCxBQStGQyxDQS9GdUMsU0FBRyxHQStGMUM7QUEvRlksZ0RBQWtCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLXBheW1lbnQtdGFiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE5nWm9uZSwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiIH0gZnJvbSAnLi90YWInO1xuaW1wb3J0IHsgQ2FydFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvY2FydC5zZXJ2aWNlJztcbmltcG9ydCB7IFF1b3RlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9xdW90ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1xuICBRdW90ZVN0YXRlLCBDYXJ0U3RhdGUsIFBheW1lbnRPcHRpb24sIFBheW1lbnRPcHRpb25zLCBDcmVkaXRDYXJkQXV0aG9yaXphdGlvblxufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5cbmV4cG9ydCBjbGFzcyBDb21tZXJjZVBheW1lbnRUYWIgZXh0ZW5kcyBUYWIgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgdGFiTm90aWZ5OiBFdmVudEVtaXR0ZXI8T2JqZWN0PiA9IHRoaXMubm90aWZ5O1xuICBwdWJsaWMgc2VydmVyRXJyb3JzOiBhbnkgPSBudWxsO1xuICBwdWJsaWMgc3VjY2Vzc2Z1bGx5VmVyaWZpZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBzZWxlY3RlZFBheW1lbnRPcHRpb246IFBheW1lbnRPcHRpb24gPSBudWxsO1xuICBwdWJsaWMgZmllbGRzOiBPYnNlcnZhYmxlPEZvcm1GaWVsZHM+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfem9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCBjb21tZXJjZVNlcnZpY2U6IENhcnRTZXJ2aWNlIHwgUXVvdGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHJvdGVjdGVkIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN1Y2Nlc3NmdWxseVZlcmlmaWVkLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5maWVsZHMgPSB0aGlzLnN0b3JlLnNlbGVjdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLmNhcnQuY29uZmlnLnBheW1lbnQuaXRlbXMpLnRha2UoMSk7XG4gICAgdGhpcy5sb2FkU3RyaXBlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tZXJjZVNlcnZpY2UuZGF0YS5tYXAoKHN0YXRlOiBRdW90ZVN0YXRlIHwgQ2FydFN0YXRlKSA9PiBzdGF0ZS5kYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF5bWVudE9wdGlvbnMoKTogT2JzZXJ2YWJsZTxQYXltZW50T3B0aW9ucz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dC5wYXltZW50T3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dIb2xkTWVzc2FnZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tZXJjZVNlcnZpY2UucGF5bWVudE9wdGlvbnNFcXVhbChbJ0hvbGQnXSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dDcmVkaXRDYXJkRm9ybSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tZXJjZVNlcnZpY2UucGF5bWVudE9wdGlvbnNFcXVhbChbJ0NyZWRpdENhcmQnXSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dDcmVkaXRDYXJkQW5kUHVyY2hhc2VPbkNyZWRpdCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tZXJjZVNlcnZpY2UucGF5bWVudE9wdGlvbnNFcXVhbChbJ0NyZWRpdENhcmQnLCAnUHVyY2hhc2VPbkNyZWRpdCddKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RQdXJjaGFzZU9uQ3JlZGl0KCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmNoZWNrb3V0LnNldFNlbGVjdGVkUGF5bWVudFR5cGUoJ1B1cmNoYXNlT25DcmVkaXQnKSk7XG4gICAgdGhpcy50YWJOb3RpZnkuZW1pdCh7IHR5cGU6ICdHT19UT19ORVhUX1RBQicgfSk7XG4gIH1cblxuICBwdWJsaWMgcHJlQXV0aG9yaXplKGZvcm06IGFueSkge1xuICAgICg8YW55PndpbmRvdykuU3RyaXBlLmNhcmQuY3JlYXRlVG9rZW4oXG4gICAgICBmb3JtLFxuICAgICAgKHN0YXR1czogbnVtYmVyLCByZXNwb25zZTogQ3JlZGl0Q2FyZEF1dGhvcml6YXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGlmIChzdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuY2hlY2tvdXQuc2V0Q3JlZGl0Q2FyZEF1dGhvcml6YXRpb24ocmVzcG9uc2UpKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmNoZWNrb3V0LnNldFNlbGVjdGVkUGF5bWVudFR5cGUoJ0NyZWRpdENhcmQnKSk7XG4gICAgICAgICAgICB0aGlzLnRhYk5vdGlmeS5lbWl0KHsgdHlwZTogJ0dPX1RPX05FWFRfVEFCJyB9KTtcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc2Z1bGx5VmVyaWZpZWQubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlckVycm9ycyA9IHsgZmllbGRFcnJvcnM6IFtdIH07XG4gICAgICAgICAgICB0aGlzLnNlcnZlckVycm9ycy5maWVsZEVycm9yc1xuICAgICAgICAgICAgICAucHVzaCh7XG4gICAgICAgICAgICAgICAgY29kZTogcmVzcG9uc2UuZXJyb3IuY29kZSxcbiAgICAgICAgICAgICAgICBmaWVsZDogcmVzcG9uc2UuZXJyb3IucGFyYW1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NmdWxseVZlcmlmaWVkLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGVkaXRDcmVkaXRDYXJkKCkge1xuICAgIHRoaXMuc3VjY2Vzc2Z1bGx5VmVyaWZpZWQubmV4dChmYWxzZSk7XG4gICAgdGhpcy5kaXNhYmxlVGFiKDMpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkU3RyaXBlKCkge1xuICAgIGNvbnN0IHN0cmlwZVNjcmlwdCA9ICdodHRwczovL2pzLnN0cmlwZS5jb20vdjIvJztcbiAgICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICB2YXIgaSA9IHNjcmlwdHMubGVuZ3RoLCBzdHJpcGVMb2FkZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoc2NyaXB0c1tpXS5zcmMgPT09IHN0cmlwZVNjcmlwdCkge1xuICAgICAgICBzdHJpcGVMb2FkZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXN0cmlwZUxvYWRlZCkge1xuICAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgT2JqZWN0LmFzc2lnbihzY3JpcHQsIHsgc3JjOiBzdHJpcGVTY3JpcHQsIHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnIH0pO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgKDxhbnk+d2luZG93KS5TdHJpcGUuc2V0UHVibGlzaGFibGVLZXkodGhpcy5jb21tZXJjZVNlcnZpY2Uuc3RhdGUuZGF0YS5zdHJpcGVQdWJsaWNLZXkpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
