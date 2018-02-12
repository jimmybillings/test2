"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var user_service_1 = require("./user.service");
var UserActions = require("./user.actions");
var UserEffects = (function () {
    function UserEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.getAllUsersByAccountId = this.actions
            .ofType(UserActions.GetAllUsersByAccountId.Type)
            .switchMap(function (action) {
            return _this.service.getUsersByAccountId(action.accountId, 'offAfterResponse')
                .map(function (users) {
                return (users || [])
                    .map(function (user) { return ({
                    id: user.id,
                    name: user.firstName + " " + user.lastName,
                    emailAddress: user.emailAddress
                }); });
            })
                .map(function (invoiceContactUsers) {
                return _this.store.create(function (factory) { return factory.user.getAllUsersByAccountIdSuccess(invoiceContactUsers); });
            }).catch(function (error) {
                return Observable_1.Observable.of(_this.store.create(function (factory) {
                    return factory.error.handle(error);
                }));
            });
        });
    }
    UserEffects.decorators = [
        { type: core_1.Injectable },
    ];
    UserEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: user_service_1.FutureUserService, },
    ]; };
    UserEffects.propDecorators = {
        'getAllUsersByAccountId': [{ type: effects_1.Effect },],
    };
    return UserEffects;
}());
exports.UserEffects = UserEffects;
//# sourceMappingURL=user.effects.js.map