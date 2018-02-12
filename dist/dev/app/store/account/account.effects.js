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
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var account_service_1 = require("./account.service");
var AccountActions = require("./account.actions");
var AccountEffects = (function () {
    function AccountEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.getAccountForQuoteAdmin = this.actions
            .ofType(AccountActions.GetAccountForQuoteAdmin.Type, AccountActions.GetAccountForQuoteAdminOnUserAdd.Type)
            .switchMap(function (action) {
            return _this.service.getAccount(action.accountId, 'onBeforeRequest')
                .map(function (account) { return ({
                id: account.id,
                name: account.name,
                salesOwner: account.salesOwner || null,
                paymentTermsDays: account.paymentTermsDays || null,
                purchaseOnCredit: account.purchaseOnCredit || null,
                creditExemption: account.creditExemption || null,
                licensingVertical: account.licensingVertical || null,
                invoiceContactId: account.invoiceContactId
            }); })
                .map(function (billingAccount) {
                return _this.store.create(function (factory) {
                    return (action.type === AccountActions.GetAccountForQuoteAdminOnUserAdd.Type) ?
                        factory.account.getAccountForQuoteAdminOnUserAddSuccess(billingAccount) :
                        factory.account.getAccountForQuoteAdminSuccess(billingAccount);
                });
            }).catch(function (error) {
                return Observable_1.Observable.of(_this.store.create(function (factory) {
                    return factory.error.handle(error);
                }));
            });
        });
        this.getAccountForQuoteAdminSuccess = this.actions
            .ofType(AccountActions.GetAccountForQuoteAdminSuccess.Type, AccountActions.GetAccountForQuoteAdminOnUserAddSuccess.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.user.getAllUsersByAccountId(action.account.id); });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AccountEffects.prototype, "getAccountForQuoteAdmin", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AccountEffects.prototype, "getAccountForQuoteAdminSuccess", void 0);
    AccountEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, account_service_1.AccountService])
    ], AccountEffects);
    return AccountEffects;
}());
exports.AccountEffects = AccountEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUEyQztBQUMzQyw4Q0FBNkM7QUFFN0MseUNBQWdEO0FBRWhELDZDQUEyQztBQUMzQyxxREFBbUQ7QUFDbkQsa0RBQW9EO0FBR3BEO0lBdUNFLHdCQUFvQixPQUFnQixFQUFVLEtBQWUsRUFBVSxPQUF1QjtRQUE5RixpQkFBbUc7UUFBL0UsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQXBDdkYsNEJBQXVCLEdBQXVCLElBQUksQ0FBQyxPQUFPO2FBQzlELE1BQU0sQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUM7YUFDekcsU0FBUyxDQUFDLFVBQUMsTUFBZ0c7WUFDMUcsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDO2lCQUN6RCxHQUFHLENBQUMsVUFBQyxPQUFnQixJQUFLLE9BQUEsQ0FDekI7Z0JBQ0UsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNkLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDbEIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSTtnQkFDdEMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixJQUFJLElBQUk7Z0JBQ2xELGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJO2dCQUNsRCxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWUsSUFBSSxJQUFJO2dCQUNoRCxpQkFBaUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLElBQUksSUFBSTtnQkFDcEQsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQjthQUMzQyxDQUNGLEVBWDBCLENBVzFCLENBQUM7aUJBQ0QsR0FBRyxDQUFDLFVBQUMsY0FBeUM7Z0JBQzdDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU87b0JBQzlCLE9BQUEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0RSxPQUFPLENBQUMsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pFLE9BQU8sQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsY0FBYyxDQUFDO2dCQUZoRSxDQUVnRSxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDWixPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTztvQkFDckMsT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQTNCLENBQTJCLENBQzVCLENBQUM7WUFGRixDQUVFLENBQ0g7UUF0QkgsQ0FzQkcsQ0FFSixDQUFDO1FBR0csbUNBQThCLEdBQXVCLElBQUksQ0FBQyxPQUFPO2FBQ3JFLE1BQU0sQ0FBQyxjQUFjLENBQUMsOEJBQThCLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFJLENBQUM7YUFDdkgsR0FBRyxDQUFDLFVBQUMsTUFBOEc7WUFDbEgsT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBdEQsQ0FBc0QsQ0FBQztRQUFwRixDQUFvRixDQUNyRixDQUFDO0lBRThGLENBQUM7SUFwQ25HO1FBREMsZ0JBQU0sRUFBRTtrQ0FDdUIsdUJBQVU7bUVBMkJ0QztJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDOEIsdUJBQVU7MEVBSTdDO0lBckNPLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0F3Q2tCLGlCQUFPLEVBQWlCLG9CQUFRLEVBQW1CLGdDQUFjO09BdkNuRixjQUFjLENBd0MxQjtJQUFELHFCQUFDO0NBeENELEFBd0NDLElBQUE7QUF4Q1ksd0NBQWMiLCJmaWxlIjoiYXBwL3N0b3JlL2FjY291bnQvYWNjb3VudC5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VuZERldGFpbHNCaWxsaW5nQWNjb3VudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FjY291bnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgQWNjb3VudEFjdGlvbnMgZnJvbSAnLi9hY2NvdW50LmFjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWNjb3VudEVmZmVjdHMge1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgZ2V0QWNjb3VudEZvclF1b3RlQWRtaW46IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9uc1xuICAgIC5vZlR5cGUoQWNjb3VudEFjdGlvbnMuR2V0QWNjb3VudEZvclF1b3RlQWRtaW4uVHlwZSwgQWNjb3VudEFjdGlvbnMuR2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGQuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IEFjY291bnRBY3Rpb25zLkdldEFjY291bnRGb3JRdW90ZUFkbWluIHwgQWNjb3VudEFjdGlvbnMuR2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGQpID0+XG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0QWNjb3VudChhY3Rpb24uYWNjb3VudElkLCAnb25CZWZvcmVSZXF1ZXN0JylcbiAgICAgICAgLm1hcCgoYWNjb3VudDogQWNjb3VudCkgPT4gKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBhY2NvdW50LmlkLFxuICAgICAgICAgICAgbmFtZTogYWNjb3VudC5uYW1lLFxuICAgICAgICAgICAgc2FsZXNPd25lcjogYWNjb3VudC5zYWxlc093bmVyIHx8IG51bGwsXG4gICAgICAgICAgICBwYXltZW50VGVybXNEYXlzOiBhY2NvdW50LnBheW1lbnRUZXJtc0RheXMgfHwgbnVsbCxcbiAgICAgICAgICAgIHB1cmNoYXNlT25DcmVkaXQ6IGFjY291bnQucHVyY2hhc2VPbkNyZWRpdCB8fCBudWxsLFxuICAgICAgICAgICAgY3JlZGl0RXhlbXB0aW9uOiBhY2NvdW50LmNyZWRpdEV4ZW1wdGlvbiB8fCBudWxsLFxuICAgICAgICAgICAgbGljZW5zaW5nVmVydGljYWw6IGFjY291bnQubGljZW5zaW5nVmVydGljYWwgfHwgbnVsbCxcbiAgICAgICAgICAgIGludm9pY2VDb250YWN0SWQ6IGFjY291bnQuaW52b2ljZUNvbnRhY3RJZFxuICAgICAgICAgIH1cbiAgICAgICAgKSlcbiAgICAgICAgLm1hcCgoYmlsbGluZ0FjY291bnQ6IFNlbmREZXRhaWxzQmlsbGluZ0FjY291bnQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PlxuICAgICAgICAgICAgKGFjdGlvbi50eXBlID09PSBBY2NvdW50QWN0aW9ucy5HZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZC5UeXBlKSA/XG4gICAgICAgICAgICAgIGZhY3RvcnkuYWNjb3VudC5nZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZFN1Y2Nlc3MoYmlsbGluZ0FjY291bnQpIDpcbiAgICAgICAgICAgICAgZmFjdG9yeS5hY2NvdW50LmdldEFjY291bnRGb3JRdW90ZUFkbWluU3VjY2VzcyhiaWxsaW5nQWNjb3VudCkpO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PlxuICAgICAgICAgIE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PlxuICAgICAgICAgICAgZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpXG4gICAgICAgICAgKSlcbiAgICAgICAgKVxuXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGdldEFjY291bnRGb3JRdW90ZUFkbWluU3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShBY2NvdW50QWN0aW9ucy5HZXRBY2NvdW50Rm9yUXVvdGVBZG1pblN1Y2Nlc3MuVHlwZSwgQWNjb3VudEFjdGlvbnMuR2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGRTdWNjZXNzLlR5cGUpXG4gICAgLm1hcCgoYWN0aW9uOiBBY2NvdW50QWN0aW9ucy5HZXRBY2NvdW50Rm9yUXVvdGVBZG1pblN1Y2Nlc3MgfCBBY2NvdW50QWN0aW9ucy5HZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZFN1Y2Nlc3MpID0+XG4gICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkudXNlci5nZXRBbGxVc2Vyc0J5QWNjb3VudElkKGFjdGlvbi5hY2NvdW50LmlkKSlcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9uczogQWN0aW9ucywgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsIHByaXZhdGUgc2VydmljZTogQWNjb3VudFNlcnZpY2UpIHsgfVxufVxuIl19
