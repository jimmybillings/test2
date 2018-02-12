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
var commerce_billing_tab_1 = require("../../../components/tabs/commerce-billing-tab");
var quote_service_1 = require("../../../../shared/services/quote.service");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var user_service_1 = require("../../../../shared/services/user.service");
var current_user_service_1 = require("../../../../shared/services/current-user.service");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var app_store_1 = require("../../../../app.store");
var QuoteBillingTabComponent = (function (_super) {
    __extends(QuoteBillingTabComponent, _super);
    function QuoteBillingTabComponent(userCan, quoteService, user, currentUser, dialog, store) {
        var _this = _super.call(this, userCan, quoteService, user, currentUser, dialog, store) || this;
        _this.userCan = userCan;
        _this.quoteService = quoteService;
        _this.user = user;
        _this.currentUser = currentUser;
        _this.dialog = dialog;
        _this.store = store;
        return _this;
    }
    QuoteBillingTabComponent.prototype.ngOnInit = function () {
        var quote = this.store.snapshot(function (state) { return state.quoteShow.data; });
        this.quoteBillingAccountInfo = this.store.select(function (state) { return state.quoteShow.data.billingAccountData; });
        this.quoteInvoiceContactInfo = this.store.select(function (state) { return state.quoteShow.data.invoiceContact; });
        this.orderInProgress = this.store.select(function (state) { return state.checkout; });
        if (!quote.billingAccountId || !quote.invoiceContact) {
            this.fetchAddresses().subscribe();
        }
    };
    QuoteBillingTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-billing-tab',
            templateUrl: '../../../components/tabs/commerce-billing-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [commerce_capabilities_1.CommerceCapabilities,
            quote_service_1.QuoteService,
            user_service_1.UserService,
            current_user_service_1.CurrentUserService,
            wz_dialog_service_1.WzDialogService,
            app_store_1.AppStore])
    ], QuoteBillingTabComponent);
    return QuoteBillingTabComponent;
}(commerce_billing_tab_1.CommerceBillingTab));
exports.QuoteBillingTabComponent = QuoteBillingTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvdGFicy9xdW90ZS1iaWxsaW5nLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJFO0FBQzNFLHNGQUFtRjtBQUNuRiwyRUFBeUU7QUFDekUsaUZBQStFO0FBQy9FLHlFQUF1RTtBQUN2RSx5RkFBc0Y7QUFDdEYscUdBQWtHO0FBQ2xHLG1EQUFpRDtBQVlqRDtJQUE4Qyw0Q0FBa0I7SUFDOUQsa0NBQ1MsT0FBNkIsRUFDMUIsWUFBMEIsRUFDMUIsSUFBaUIsRUFDakIsV0FBK0IsRUFDL0IsTUFBdUIsRUFDdkIsS0FBZTtRQU4zQixZQVFFLGtCQUFNLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQy9EO1FBUlEsYUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDMUIsa0JBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsVUFBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixpQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsWUFBTSxHQUFOLE1BQU0sQ0FBaUI7UUFDdkIsV0FBSyxHQUFMLEtBQUssQ0FBVTs7SUFHM0IsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFDRSxJQUFNLEtBQUssR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQXZDLENBQXVDLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQW5DLENBQW1DLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBZCxDQUFjLENBQUMsQ0FBQztRQUNsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQXJCVSx3QkFBd0I7UUFQcEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSxvREFBb0Q7WUFDakUsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FJa0IsNENBQW9CO1lBQ1osNEJBQVk7WUFDcEIsMEJBQVc7WUFDSix5Q0FBa0I7WUFDdkIsbUNBQWU7WUFDaEIsb0JBQVE7T0FQaEIsd0JBQXdCLENBc0JwQztJQUFELCtCQUFDO0NBdEJELEFBc0JDLENBdEI2Qyx5Q0FBa0IsR0FzQi9EO0FBdEJZLDREQUF3QiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9jb21wb25lbnRzL3RhYnMvcXVvdGUtYmlsbGluZy10YWIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tZXJjZUJpbGxpbmdUYWIgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnMvY29tbWVyY2UtYmlsbGluZy10YWInO1xuaW1wb3J0IHsgUXVvdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3F1b3RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbWVyY2VDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jb21tZXJjZS5jYXBhYmlsaXRpZXMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgVmlld0FkZHJlc3MgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgUXVvdGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdxdW90ZS1iaWxsaW5nLXRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLWJpbGxpbmctdGFiLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFF1b3RlQmlsbGluZ1RhYkNvbXBvbmVudCBleHRlbmRzIENvbW1lcmNlQmlsbGluZ1RhYiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB1c2VyQ2FuOiBDb21tZXJjZUNhcGFiaWxpdGllcyxcbiAgICBwcm90ZWN0ZWQgcXVvdGVTZXJ2aWNlOiBRdW90ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXI6IFVzZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjdXJyZW50VXNlcjogQ3VycmVudFVzZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBkaWFsb2c6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IEFwcFN0b3JlXG4gICkge1xuICAgIHN1cGVyKHVzZXJDYW4sIHF1b3RlU2VydmljZSwgdXNlciwgY3VycmVudFVzZXIsIGRpYWxvZywgc3RvcmUpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgcXVvdGU6IFF1b3RlID0gdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZVNob3cuZGF0YSk7XG5cbiAgICB0aGlzLnF1b3RlQmlsbGluZ0FjY291bnRJbmZvID0gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVTaG93LmRhdGEuYmlsbGluZ0FjY291bnREYXRhKTtcbiAgICB0aGlzLnF1b3RlSW52b2ljZUNvbnRhY3RJbmZvID0gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVTaG93LmRhdGEuaW52b2ljZUNvbnRhY3QpO1xuICAgIHRoaXMub3JkZXJJblByb2dyZXNzID0gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY2hlY2tvdXQpO1xuICAgIGlmICghcXVvdGUuYmlsbGluZ0FjY291bnRJZCB8fCAhcXVvdGUuaW52b2ljZUNvbnRhY3QpIHtcbiAgICAgIHRoaXMuZmV0Y2hBZGRyZXNzZXMoKS5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
