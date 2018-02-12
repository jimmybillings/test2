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
var cart_service_1 = require("../../../../shared/services/cart.service");
var user_service_1 = require("../../../../shared/services/user.service");
var current_user_service_1 = require("../../../../shared/services/current-user.service");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var app_store_1 = require("../../../../app.store");
var CartBillingTabComponent = (function (_super) {
    __extends(CartBillingTabComponent, _super);
    function CartBillingTabComponent(userCan, cartService, user, currentUser, dialog, store) {
        var _this = _super.call(this, userCan, cartService, user, currentUser, dialog, store) || this;
        _this.userCan = userCan;
        _this.cartService = cartService;
        _this.user = user;
        _this.currentUser = currentUser;
        _this.dialog = dialog;
        _this.store = store;
        return _this;
    }
    CartBillingTabComponent.prototype.ngOnInit = function () {
        this.quoteBillingAccountInfo = null;
        this.quoteInvoiceContactInfo = null;
        this.fetchAddresses().subscribe();
        this.orderInProgress = this.store.select(function (state) { return state.checkout; });
    };
    CartBillingTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cart-billing-tab-component',
            templateUrl: '../../../components/tabs/commerce-billing-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [commerce_capabilities_1.CommerceCapabilities,
            cart_service_1.CartService,
            user_service_1.UserService,
            current_user_service_1.CurrentUserService,
            wz_dialog_service_1.WzDialogService,
            app_store_1.AppStore])
    ], CartBillingTabComponent);
    return CartBillingTabComponent;
}(commerce_billing_tab_1.CommerceBillingTab));
exports.CartBillingTabComponent = CartBillingTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy90YWJzL2NhcnQtYmlsbGluZy10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRjtBQUNuRixzRkFBbUY7QUFDbkYseUVBQXVFO0FBQ3ZFLHlFQUF1RTtBQUN2RSx5RkFBc0Y7QUFDdEYsaUZBQStFO0FBQy9FLHFHQUFrRztBQUNsRyxtREFBaUQ7QUFTakQ7SUFBNkMsMkNBQWtCO0lBQzdELGlDQUNTLE9BQTZCLEVBQzFCLFdBQXdCLEVBQ3hCLElBQWlCLEVBQ2pCLFdBQStCLEVBQy9CLE1BQXVCLEVBQ3ZCLEtBQWU7UUFOM0IsWUFRRSxrQkFBTSxPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUM5RDtRQVJRLGFBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzFCLGlCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUksR0FBSixJQUFJLENBQWE7UUFDakIsaUJBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLFlBQU0sR0FBTixNQUFNLENBQWlCO1FBQ3ZCLFdBQUssR0FBTCxLQUFLLENBQVU7O0lBRzNCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBZCxDQUFjLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBakJVLHVCQUF1QjtRQVBuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsV0FBVyxFQUFFLG9EQUFvRDtZQUNqRSxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQUlrQiw0Q0FBb0I7WUFDYiwwQkFBVztZQUNsQiwwQkFBVztZQUNKLHlDQUFrQjtZQUN2QixtQ0FBZTtZQUNoQixvQkFBUTtPQVBoQix1QkFBdUIsQ0FrQm5DO0lBQUQsOEJBQUM7Q0FsQkQsQUFrQkMsQ0FsQjRDLHlDQUFrQixHQWtCOUQ7QUFsQlksMERBQXVCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy90YWJzL2NhcnQtYmlsbGluZy10YWIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1lcmNlQmlsbGluZ1RhYiB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy9jb21tZXJjZS1iaWxsaW5nLXRhYic7XG5pbXBvcnQgeyBDYXJ0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jYXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tZXJjZUNhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2NvbW1lcmNlLmNhcGFiaWxpdGllcyc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjYXJ0LWJpbGxpbmctdGFiLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLWJpbGxpbmctdGFiLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIENhcnRCaWxsaW5nVGFiQ29tcG9uZW50IGV4dGVuZHMgQ29tbWVyY2VCaWxsaW5nVGFiIGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHVzZXJDYW46IENvbW1lcmNlQ2FwYWJpbGl0aWVzLFxuICAgIHByb3RlY3RlZCBjYXJ0U2VydmljZTogQ2FydFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXI6IFVzZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjdXJyZW50VXNlcjogQ3VycmVudFVzZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBkaWFsb2c6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IEFwcFN0b3JlXG4gICkge1xuICAgIHN1cGVyKHVzZXJDYW4sIGNhcnRTZXJ2aWNlLCB1c2VyLCBjdXJyZW50VXNlciwgZGlhbG9nLCBzdG9yZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnF1b3RlQmlsbGluZ0FjY291bnRJbmZvID0gbnVsbDtcbiAgICB0aGlzLnF1b3RlSW52b2ljZUNvbnRhY3RJbmZvID0gbnVsbDtcbiAgICB0aGlzLmZldGNoQWRkcmVzc2VzKCkuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5vcmRlckluUHJvZ3Jlc3MgPSB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dCk7XG4gIH1cbn1cbiJdfQ==
