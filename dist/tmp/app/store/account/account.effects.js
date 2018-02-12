"use strict";
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
    AccountEffects.decorators = [
        { type: core_1.Injectable },
    ];
    AccountEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: account_service_1.AccountService, },
    ]; };
    AccountEffects.propDecorators = {
        'getAccountForQuoteAdmin': [{ type: effects_1.Effect },],
        'getAccountForQuoteAdminSuccess': [{ type: effects_1.Effect },],
    };
    return AccountEffects;
}());
exports.AccountEffects = AccountEffects;
//# sourceMappingURL=account.effects.js.map