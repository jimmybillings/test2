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
Object.defineProperty(exports, "__esModule", { value: true });
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.setPurchaseOrderId = function (purchaseOrderId) {
        return new SetPurchaseOrderId(purchaseOrderId);
    };
    ActionFactory.prototype.setAvailablePaymentOptions = function (paymentOptions) {
        return new SetAvailablePaymentOptions(paymentOptions);
    };
    ActionFactory.prototype.setSelectedPaymentType = function (paymentType) {
        return new SetSelectedPaymentType(paymentType);
    };
    ActionFactory.prototype.setAvailableAddresses = function (addresses) {
        return new SetAvailableAddresses(addresses);
    };
    ActionFactory.prototype.setSelectedAddress = function (address) {
        return new SetSelectedAddress(address);
    };
    ActionFactory.prototype.setCreditCardAuthorization = function (authorization) {
        return new SetCreditCardAuthorization(authorization);
    };
    ActionFactory.prototype.reset = function () {
        return new Reset();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var SetPurchaseOrderId = (function () {
    function SetPurchaseOrderId(purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
        this.type = SetPurchaseOrderId.Type;
    }
    SetPurchaseOrderId.Type = '[Checkout] Set Purchase Order Id';
    return SetPurchaseOrderId;
}());
exports.SetPurchaseOrderId = SetPurchaseOrderId;
var SetAvailablePaymentOptions = (function () {
    function SetAvailablePaymentOptions(paymentOptions) {
        this.paymentOptions = paymentOptions;
        this.type = SetAvailablePaymentOptions.Type;
    }
    SetAvailablePaymentOptions.Type = '[Checkout] Set Available Payment Options';
    return SetAvailablePaymentOptions;
}());
exports.SetAvailablePaymentOptions = SetAvailablePaymentOptions;
var SetSelectedPaymentType = (function () {
    function SetSelectedPaymentType(selectedPaymentType) {
        this.selectedPaymentType = selectedPaymentType;
        this.type = SetSelectedPaymentType.Type;
    }
    SetSelectedPaymentType.Type = '[Checkout] Set Selected Payment Type';
    return SetSelectedPaymentType;
}());
exports.SetSelectedPaymentType = SetSelectedPaymentType;
var SetAvailableAddresses = (function () {
    function SetAvailableAddresses(addresses) {
        this.addresses = addresses;
        this.type = SetAvailableAddresses.Type;
    }
    SetAvailableAddresses.Type = '[Checkout] Set Available Addresses';
    return SetAvailableAddresses;
}());
exports.SetAvailableAddresses = SetAvailableAddresses;
var SetSelectedAddress = (function () {
    function SetSelectedAddress(selectedAddress) {
        this.selectedAddress = selectedAddress;
        this.type = SetSelectedAddress.Type;
    }
    SetSelectedAddress.Type = '[Checkout] Set Selected Address';
    return SetSelectedAddress;
}());
exports.SetSelectedAddress = SetSelectedAddress;
var SetCreditCardAuthorization = (function () {
    function SetCreditCardAuthorization(authorization) {
        this.authorization = authorization;
        this.type = SetCreditCardAuthorization.Type;
    }
    SetCreditCardAuthorization.Type = '[Checkout] Set Credit Card Authorization';
    return SetCreditCardAuthorization;
}());
exports.SetCreditCardAuthorization = SetCreditCardAuthorization;
var Reset = (function () {
    function Reset() {
        this.type = Reset.Type;
    }
    Reset.Type = '[Checkout] Reset';
    return Reset;
}());
exports.Reset = Reset;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jaGVja291dC9jaGVja291dC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUlBO0lBQUE7SUE0QkEsQ0FBQztJQTNCUSwwQ0FBa0IsR0FBekIsVUFBMEIsZUFBdUI7UUFDL0MsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLGtEQUEwQixHQUFqQyxVQUFrQyxjQUE4QjtRQUM5RCxNQUFNLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sOENBQXNCLEdBQTdCLFVBQThCLFdBQTBCO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSw2Q0FBcUIsR0FBNUIsVUFBNkIsU0FBd0I7UUFDbkQsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLDBDQUFrQixHQUF6QixVQUEwQixPQUFvQjtRQUM1QyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sa0RBQTBCLEdBQWpDLFVBQWtDLGFBQXNDO1FBQ3RFLE1BQU0sQ0FBQyxJQUFJLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSw2QkFBSyxHQUFaO1FBQ0UsTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0E1QkEsQUE0QkMsSUFBQTtBQTVCWSxzQ0FBYTtBQThCMUI7SUFBMkMseUNBQWE7SUFBeEQ7O0lBQTJELENBQUM7SUFBRCw0QkFBQztBQUFELENBQTNELEFBQTRELENBQWpCLGFBQWEsR0FBSTtBQUEvQyxzREFBcUI7QUFFbEM7SUFHRSw0QkFBNEIsZUFBdUI7UUFBdkIsb0JBQWUsR0FBZixlQUFlLENBQVE7UUFEbkMsU0FBSSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztJQUNRLENBQUM7SUFGakMsdUJBQUksR0FBRyxrQ0FBa0MsQ0FBQztJQUduRSx5QkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGdEQUFrQjtBQU0vQjtJQUdFLG9DQUE0QixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFEMUMsU0FBSSxHQUFHLDBCQUEwQixDQUFDLElBQUksQ0FBQztJQUNPLENBQUM7SUFGeEMsK0JBQUksR0FBRywwQ0FBMEMsQ0FBQztJQUczRSxpQ0FBQztDQUpELEFBSUMsSUFBQTtBQUpZLGdFQUEwQjtBQU12QztJQUdFLGdDQUE0QixtQkFBa0M7UUFBbEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFlO1FBRDlDLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7SUFDZSxDQUFDO0lBRjVDLDJCQUFJLEdBQUcsc0NBQXNDLENBQUM7SUFHdkUsNkJBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSx3REFBc0I7QUFNbkM7SUFHRSwrQkFBNEIsU0FBd0I7UUFBeEIsY0FBUyxHQUFULFNBQVMsQ0FBZTtRQURwQyxTQUFJLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDO0lBQ00sQ0FBQztJQUZsQywwQkFBSSxHQUFHLG9DQUFvQyxDQUFDO0lBR3JFLDRCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksc0RBQXFCO0FBTWxDO0lBR0UsNEJBQTRCLGVBQTRCO1FBQTVCLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBRHhDLFNBQUksR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7SUFDYSxDQUFDO0lBRnRDLHVCQUFJLEdBQUcsaUNBQWlDLENBQUM7SUFHbEUseUJBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxnREFBa0I7QUFNL0I7SUFHRSxvQ0FBNEIsYUFBc0M7UUFBdEMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBRGxELFNBQUksR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUM7SUFDZSxDQUFDO0lBRmhELCtCQUFJLEdBQUcsMENBQTBDLENBQUM7SUFHM0UsaUNBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxnRUFBMEI7QUFNdkM7SUFBQTtRQUVrQixTQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRndCLFVBQUksR0FBRyxrQkFBa0IsQ0FBQztJQUVuRCxZQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksc0JBQUsiLCJmaWxlIjoiYXBwL3N0b3JlL2NoZWNrb3V0L2NoZWNrb3V0LmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBQYXltZW50T3B0aW9uLCBQYXltZW50T3B0aW9ucywgQ3JlZGl0Q2FyZEF1dGhvcml6YXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVmlld0FkZHJlc3MgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIHNldFB1cmNoYXNlT3JkZXJJZChwdXJjaGFzZU9yZGVySWQ6IHN0cmluZyk6IFNldFB1cmNoYXNlT3JkZXJJZCB7XG4gICAgcmV0dXJuIG5ldyBTZXRQdXJjaGFzZU9yZGVySWQocHVyY2hhc2VPcmRlcklkKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucyhwYXltZW50T3B0aW9uczogUGF5bWVudE9wdGlvbnMpOiBTZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucyB7XG4gICAgcmV0dXJuIG5ldyBTZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucyhwYXltZW50T3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc2V0U2VsZWN0ZWRQYXltZW50VHlwZShwYXltZW50VHlwZTogUGF5bWVudE9wdGlvbik6IFNldFNlbGVjdGVkUGF5bWVudFR5cGUge1xuICAgIHJldHVybiBuZXcgU2V0U2VsZWN0ZWRQYXltZW50VHlwZShwYXltZW50VHlwZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0QXZhaWxhYmxlQWRkcmVzc2VzKGFkZHJlc3NlczogVmlld0FkZHJlc3NbXSk6IFNldEF2YWlsYWJsZUFkZHJlc3NlcyB7XG4gICAgcmV0dXJuIG5ldyBTZXRBdmFpbGFibGVBZGRyZXNzZXMoYWRkcmVzc2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTZWxlY3RlZEFkZHJlc3MoYWRkcmVzczogVmlld0FkZHJlc3MpOiBTZXRTZWxlY3RlZEFkZHJlc3Mge1xuICAgIHJldHVybiBuZXcgU2V0U2VsZWN0ZWRBZGRyZXNzKGFkZHJlc3MpO1xuICB9XG5cbiAgcHVibGljIHNldENyZWRpdENhcmRBdXRob3JpemF0aW9uKGF1dGhvcml6YXRpb246IENyZWRpdENhcmRBdXRob3JpemF0aW9uKTogU2V0Q3JlZGl0Q2FyZEF1dGhvcml6YXRpb24ge1xuICAgIHJldHVybiBuZXcgU2V0Q3JlZGl0Q2FyZEF1dGhvcml6YXRpb24oYXV0aG9yaXphdGlvbik7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogUmVzZXQge1xuICAgIHJldHVybiBuZXcgUmVzZXQoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7IH1cblxuZXhwb3J0IGNsYXNzIFNldFB1cmNoYXNlT3JkZXJJZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2hlY2tvdXRdIFNldCBQdXJjaGFzZSBPcmRlciBJZCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2V0UHVyY2hhc2VPcmRlcklkLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBwdXJjaGFzZU9yZGVySWQ6IHN0cmluZykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2hlY2tvdXRdIFNldCBBdmFpbGFibGUgUGF5bWVudCBPcHRpb25zJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcGF5bWVudE9wdGlvbnM6IFBheW1lbnRPcHRpb25zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNldFNlbGVjdGVkUGF5bWVudFR5cGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NoZWNrb3V0XSBTZXQgU2VsZWN0ZWQgUGF5bWVudCBUeXBlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTZXRTZWxlY3RlZFBheW1lbnRUeXBlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzZWxlY3RlZFBheW1lbnRUeXBlOiBQYXltZW50T3B0aW9uKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNldEF2YWlsYWJsZUFkZHJlc3NlcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2hlY2tvdXRdIFNldCBBdmFpbGFibGUgQWRkcmVzc2VzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTZXRBdmFpbGFibGVBZGRyZXNzZXMuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFkZHJlc3NlczogVmlld0FkZHJlc3NbXSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXRTZWxlY3RlZEFkZHJlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NoZWNrb3V0XSBTZXQgU2VsZWN0ZWQgQWRkcmVzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2V0U2VsZWN0ZWRBZGRyZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzZWxlY3RlZEFkZHJlc3M6IFZpZXdBZGRyZXNzKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNldENyZWRpdENhcmRBdXRob3JpemF0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDaGVja291dF0gU2V0IENyZWRpdCBDYXJkIEF1dGhvcml6YXRpb24nO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFNldENyZWRpdENhcmRBdXRob3JpemF0aW9uLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhdXRob3JpemF0aW9uOiBDcmVkaXRDYXJkQXV0aG9yaXphdGlvbikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXNldCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ2hlY2tvdXRdIFJlc2V0JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBSZXNldC5UeXBlO1xufVxuXG5leHBvcnQgdHlwZSBBbnkgPSBTZXRQdXJjaGFzZU9yZGVySWQgfCBTZXRTZWxlY3RlZFBheW1lbnRUeXBlIHwgU2V0U2VsZWN0ZWRBZGRyZXNzIHwgU2V0QXZhaWxhYmxlQWRkcmVzc2VzIHxcbiAgU2V0Q3JlZGl0Q2FyZEF1dGhvcml6YXRpb24gfCBTZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucyB8IFJlc2V0O1xuIl19
