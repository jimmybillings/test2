"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
    CurrentUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store])
    ], CurrentUserService);
    return CurrentUserService;
}());
exports.CurrentUserService = CurrentUserService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFDQUFvQztBQUNwQyxzQ0FBMkM7QUFLM0MscUJBQTRCLEtBQVUsRUFBRSxNQUFvQjtJQUFoQyxzQkFBQSxFQUFBLFVBQVU7SUFFcEMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxVQUFVO1lBQ2IsTUFBTSxjQUNELE1BQU0sQ0FBQyxPQUFPLEVBQ2pCO1FBQ0osS0FBSyxxQkFBcUI7WUFDeEIsTUFBTSxjQUNELEtBQUssSUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDakM7UUFDSjtZQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUM7QUFkRCxrQ0FjQztBQUFBLENBQUM7QUFPRjtJQUlFLDRCQUFvQixLQUFrQjtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELHNCQUFXLHFDQUFLO2FBQWhCO1lBQ0UsSUFBSSxDQUFPLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFPLElBQUssT0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFMLENBQUssQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDOzs7T0FBQTtJQUVNLGdDQUFHLEdBQVYsVUFBVyxJQUFpQixFQUFFLEtBQWM7UUFBakMscUJBQUEsRUFBQSxXQUFpQjtRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJ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LENBQUMsRUFBbEYsQ0FBa0YsQ0FBQyxDQUFDO1FBQ3pHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVPLGtDQUFLLEdBQWI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzlFLENBQUM7SUFFTyx1Q0FBVSxHQUFsQjtRQUNFLE1BQU0sQ0FBQztZQUNMLFdBQVcsRUFBRSxJQUFJLElBQUksRUFBRTtZQUN2QixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDckIsRUFBRSxFQUFFLENBQUM7WUFDTCxZQUFZLEVBQUUsRUFBRTtZQUNoQixRQUFRLEVBQUUsRUFBRTtZQUNaLFNBQVMsRUFBRSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNmLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNqQixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLHFCQUFxQixFQUFFLElBQUk7WUFDM0IsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO0lBQ0osQ0FBQztJQTNGVSxrQkFBa0I7UUFEOUIsaUJBQVUsRUFBRTt5Q0FLZ0IsYUFBSztPQUpyQixrQkFBa0IsQ0E0RjlCO0lBQUQseUJBQUM7Q0E1RkQsQUE0RkMsSUFBQTtBQTVGWSxnREFBa0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hY2NvdW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBMZWdhY3lBY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3VycmVudFVzZXIoc3RhdGUgPSB7fSwgYWN0aW9uOiBMZWdhY3lBY3Rpb24pIHtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnU0VUX1VTRVInOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgICAgIH07XG4gICAgY2FzZSAnU0VUX0FDQ09VTlRfT05fVVNFUic6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSwgYWNjb3VudDogYWN0aW9uLnBheWxvYWRcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBNb2RlbCB0aGF0IGRlc2NyaWJlcyBjdXJyZW50IHVzZXIsIGFuZCBwcm92aWRlc1xuICogbWV0aG9kcyBmb3IgcmV0cmlldmluZyB1c2VyIGF0dHJpYnV0ZXMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDdXJyZW50VXNlclNlcnZpY2Uge1xuICBwdWJsaWMgcGVybWlzc2lvbnM6IGFueTtcbiAgcHVibGljIGRhdGE6IE9ic2VydmFibGU8VXNlcj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8VXNlcj4pIHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLnN0b3JlLnNlbGVjdCgnY3VycmVudFVzZXInKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3RhdGUoKTogVXNlciB7XG4gICAgbGV0IHM6IFVzZXI7XG4gICAgdGhpcy5kYXRhLnRha2UoMSkuc3Vic2NyaWJlKCh1OiBVc2VyKSA9PiBzID0gdSk7XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICBwdWJsaWMgc2V0KHVzZXI6IFVzZXIgPSBudWxsLCB0b2tlbj86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh1c2VyKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgaWYgKHRva2VuKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB0b2tlbik7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdTRVRfVVNFUicsIHBheWxvYWQ6IHRoaXMuX3VzZXIoKSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2NvdW50Jyk7XG4gICAgdGhpcy5zZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBY2NvdW50VG9Vc2VyKGFjY291bnQ6IEFjY291bnQpIHtcbiAgICBjb25zdCBjYWNoZWRVc2VyOiBVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XG4gICAgY2FjaGVkVXNlci5hY2NvdW50ID0gYWNjb3VudDtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLCBKU09OLnN0cmluZ2lmeShjYWNoZWRVc2VyKSk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdTRVRfQUNDT1VOVF9PTl9VU0VSJywgcGF5bG9hZDogYWNjb3VudCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBsb2dnZWRJblN0YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKHVzZXIgPT4gdXNlci5pZCA+IDApO1xuICB9XG5cbiAgcHVibGljIGxvZ2dlZEluKCk6IGJvb2xlYW4ge1xuICAgIGxldCBsb2dnZWRJbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHRoaXMuZGF0YVxuICAgICAgLnRha2UoMSlcbiAgICAgIC5zdWJzY3JpYmUodXNlciA9PiBsb2dnZWRJbiA9IHVzZXIuaWQgPiAwKTtcbiAgICByZXR1cm4gbG9nZ2VkSW47XG4gIH1cblxuICBwdWJsaWMgZnVsbE5hbWUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcCh1c2VyID0+IGAke3VzZXIuZmlyc3ROYW1lfSAke3VzZXIubGFzdE5hbWV9YCk7XG4gIH1cblxuICBwdWJsaWMgaGFzUGVybWlzc2lvbihwZXJtaXNzaW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgaGFzUGVybWlzc2lvbjogYm9vbGVhbjtcbiAgICB0aGlzLmRhdGEubWFwKCh1c2VyOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB1c2VyLmFsbFVzZXJQZXJtaXNzaW9ucyB8fCBbXTtcbiAgICB9KS50YWtlKDEpLnN1YnNjcmliZSgocGVybWlzc2lvbnM6IGFueSkgPT4ge1xuICAgICAgaGFzUGVybWlzc2lvbiA9IHBlcm1pc3Npb25zLmluZGV4T2YocGVybWlzc2lvbikgPiAtMTtcbiAgICB9KTtcbiAgICByZXR1cm4gaGFzUGVybWlzc2lvbjtcbiAgfVxuXG4gIHB1YmxpYyBoYXNQdXJjaGFzZU9uQ3JlZGl0KCk6IGJvb2xlYW4ge1xuICAgIGxldCBhbnN3ZXI6IGJvb2xlYW47XG4gICAgdGhpcy5kYXRhXG4gICAgICAudGFrZSgxKVxuICAgICAgLnN1YnNjcmliZSh1c2VyID0+IGFuc3dlciA9ICh1c2VyLmhhc093blByb3BlcnR5KCdwdXJjaGFzZU9uQ3JlZGl0JykgPyB1c2VyLnB1cmNoYXNlT25DcmVkaXQgOiBmYWxzZSkpO1xuICAgIHJldHVybiBhbnN3ZXI7XG4gIH1cblxuICBwcml2YXRlIF91c2VyKCk6IFVzZXIge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKSB8fCB0aGlzLm1heWZseVVzZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgbWF5Zmx5VXNlcigpOiBVc2VyIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFzdFVwZGF0ZWQ6IG5ldyBEYXRlKCksXG4gICAgICBjcmVhdGVkT246IG5ldyBEYXRlKCksXG4gICAgICBpZDogMCxcbiAgICAgIGVtYWlsQWRkcmVzczogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgICBmaXJzdE5hbWU6ICcnLFxuICAgICAgbGFzdE5hbWU6ICcnLFxuICAgICAgc2l0ZU5hbWU6ICcnLFxuICAgICAgYWNjb3VudElkczogWzBdLFxuICAgICAgcGVybWlzc2lvbnM6IFsnJ10sXG4gICAgICBwdXJjaGFzZU9uQ3JlZGl0OiBmYWxzZSxcbiAgICAgIGZvY3VzZWRDb2xsZWN0aW9uOiBudWxsLFxuICAgICAgb3duZWRDb2xsZWN0aW9uczogbnVsbCxcbiAgICAgIGVkaXRhYmxlQ29sbGVjdGlvbnM6IG51bGwsXG4gICAgICBhY2Nlc3NpYmxlQ29sbGVjdGlvbnM6IG51bGwsXG4gICAgICBhY2NvdW50OiBudWxsXG4gICAgfTtcbiAgfVxufVxuIl19
