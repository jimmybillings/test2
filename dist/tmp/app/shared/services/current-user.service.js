"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngrx/store");
var core_1 = require("@angular/core");
function currentUser(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case 'SET_USER':
            return __assign({}, action.payload);
        case 'SET_ACCOUNT_ON_USER':
            return __assign({}, state, { account: action.payload });
        default:
            return state;
    }
}
exports.currentUser = currentUser;
;
var CurrentUserService = (function () {
    function CurrentUserService(store) {
        this.store = store;
        this.data = this.store.select('currentUser');
    }
    Object.defineProperty(CurrentUserService.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (u) { return s = u; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    CurrentUserService.prototype.set = function (user, token) {
        if (user === void 0) { user = null; }
        if (user)
            localStorage.setItem('currentUser', JSON.stringify(user));
        if (token)
            localStorage.setItem('token', token);
        this.store.dispatch({ type: 'SET_USER', payload: this._user() });
    };
    CurrentUserService.prototype.destroy = function () {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('account');
        this.set();
    };
    CurrentUserService.prototype.addAccountToUser = function (account) {
        var cachedUser = JSON.parse(localStorage.getItem('currentUser'));
        cachedUser.account = account;
        localStorage.setItem('currentUser', JSON.stringify(cachedUser));
        this.store.dispatch({ type: 'SET_ACCOUNT_ON_USER', payload: account });
    };
    CurrentUserService.prototype.loggedInState = function () {
        return this.data.map(function (user) { return user.id > 0; });
    };
    CurrentUserService.prototype.loggedIn = function () {
        var loggedIn = false;
        this.data
            .take(1)
            .subscribe(function (user) { return loggedIn = user.id > 0; });
        return loggedIn;
    };
    CurrentUserService.prototype.fullName = function () {
        return this.data.map(function (user) { return user.firstName + " " + user.lastName; });
    };
    CurrentUserService.prototype.hasPermission = function (permission) {
        var hasPermission;
        this.data.map(function (user) {
            return user.allUserPermissions || [];
        }).take(1).subscribe(function (permissions) {
            hasPermission = permissions.indexOf(permission) > -1;
        });
        return hasPermission;
    };
    CurrentUserService.prototype.hasPurchaseOnCredit = function () {
        var answer;
        this.data
            .take(1)
            .subscribe(function (user) { return answer = (user.hasOwnProperty('purchaseOnCredit') ? user.purchaseOnCredit : false); });
        return answer;
    };
    CurrentUserService.prototype._user = function () {
        return JSON.parse(localStorage.getItem('currentUser')) || this.mayflyUser();
    };
    CurrentUserService.prototype.mayflyUser = function () {
        return {
            lastUpdated: new Date(),
            createdOn: new Date(),
            id: 0,
            emailAddress: '',
            password: '',
            firstName: '',
            lastName: '',
            siteName: '',
            accountIds: [0],
            permissions: [''],
            purchaseOnCredit: false,
            focusedCollection: null,
            ownedCollections: null,
            editableCollections: null,
            accessibleCollections: null,
            account: null
        };
    };
    CurrentUserService.decorators = [
        { type: core_1.Injectable },
    ];
    CurrentUserService.ctorParameters = function () { return [
        { type: store_1.Store, },
    ]; };
    return CurrentUserService;
}());
exports.CurrentUserService = CurrentUserService;
//# sourceMappingURL=current-user.service.js.map