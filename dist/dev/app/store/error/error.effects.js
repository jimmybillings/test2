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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var app_store_1 = require("../../app.store");
var ErrorActions = require("./error.actions");
var current_user_service_1 = require("../../shared/services/current-user.service");
var ErrorEffects = (function () {
    function ErrorEffects(actions, store, currentUserService, location) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.currentUserService = currentUserService;
        this.location = location;
        this.handle = this.actions
            .filter(function (action) { return _this.canHandleErrorIn(action); })
            .mergeMap(function (action) { return Observable_1.Observable.from(_this.nextActionsFor(action)); });
        this.handle401Unauthorized = this.actions.ofType(ErrorActions.Handle401Unauthorized.Type)
            .filter(function () { return !_this.awaitingPreviousNotificationDismissal; })
            .mergeMap(function (action) { return Observable_1.Observable.from(_this.unauthorized()); });
        this.handle403Forbidden = this.actions.ofType(ErrorActions.Handle403Forbidden.Type)
            .filter(function () { return !_this.awaitingPreviousNotificationDismissal; })
            .mergeMap(function (action) { return Observable_1.Observable.from(_this.forbidden()); });
        this.handleCustom = this.actions.ofType(ErrorActions.HandleCustomError.Type)
            .filter(function () { return !_this.awaitingPreviousNotificationDismissal; })
            .mergeMap(function (action) { return Observable_1.Observable.from(_this.customError(action.title)); });
        this.awaitingPreviousNotificationDismissal = false;
        this.nextActionCreators = {
            400: this.badRequest,
            401: this.unauthorized,
            403: this.forbidden,
            404: this.notFound,
            412: this.preConditionFailed,
            419: this.sessionExpired,
            451: this.registrationDisallowed,
            500: this.serverError
        };
    }
    ErrorEffects.prototype.canHandleErrorIn = function (action) {
        if (this.awaitingPreviousNotificationDismissal || !action)
            return false;
        var error = action.error;
        if (!error)
            return false;
        var status = error.status;
        if (!status)
            return false;
        return isNaN(status) || this.canHandle(status);
    };
    ErrorEffects.prototype.canHandle = function (status) {
        return Object.keys(this.nextActionCreators).some(function (supportedStatus) { return status === parseInt(supportedStatus); });
    };
    ErrorEffects.prototype.nextActionsFor = function (action) {
        var error = action.error;
        var status = parseInt(error.status);
        return isNaN(status) ? this.customError(error.status) : this.nextActionCreators[status].call(this);
    };
    ErrorEffects.prototype.badRequest = function () {
        return [
            this.createBadRequestAction()
        ];
    };
    ErrorEffects.prototype.serverError = function () {
        return [
            this.createServerErrorAction()
        ];
    };
    ErrorEffects.prototype.unauthorized = function () {
        this.currentUserService.destroy();
        var actionsArray = [this.createGoToLoginAction()];
        return this.location.path().split(';')[0] === '/user/login'
            ? actionsArray.concat(this.createNotifierActionWith('NOTIFICATION.ERROR', 'NOTIFICATION.INVALID_CREDENTIALS'))
            : actionsArray;
    };
    ErrorEffects.prototype.forbidden = function () {
        return [
            this.createNotifierActionWith('NOTIFICATION.ERROR', 'NOTIFICATION.NEED_PERMISSION')
        ];
    };
    ErrorEffects.prototype.notFound = function () {
        return [
            this.store.create(function (factory) { return factory.router.goToPageNotFound(); })
        ];
    };
    ErrorEffects.prototype.sessionExpired = function () {
        this.currentUserService.destroy();
        return [
            this.createGoToLoginAction(),
            this.createNotifierActionWith('NOTIFICATION.ERROR', 'NOTIFICATION.EXPIRED_SESSION')
        ];
    };
    ErrorEffects.prototype.preConditionFailed = function () {
        return [
            this.createNotifierActionWith('NOTIFICATION.ERROR', 'NOTIFICATION.PRECONDITION_FAIL')
        ];
    };
    ErrorEffects.prototype.registrationDisallowed = function () {
        return [
            this.createNotifierActionWith('REGISTER.DISALLOWED.TITLE', 'REGISTER.DISALLOWED.MESSAGE', 'REGISTER.DISALLOWED.PROMPT')
        ];
    };
    ErrorEffects.prototype.customError = function (error) {
        return [
            this.createNotifierActionWith(String(error))
        ];
    };
    ErrorEffects.prototype.createGoToLoginAction = function () {
        return this.store.create(function (factory) { return factory.router.goToLoginWithRedirect(); });
    };
    ErrorEffects.prototype.createNotifierActionWith = function (title, message, prompt) {
        var _this = this;
        this.awaitingPreviousNotificationDismissal = true;
        var options = { title: title };
        if (message)
            options = __assign({}, options, { message: message });
        if (prompt)
            options = __assign({}, options, { prompt: prompt });
        return this.store.create(function (factory) { return factory.notifier.notify(options, function () { return _this.awaitingPreviousNotificationDismissal = false; }); });
    };
    ErrorEffects.prototype.createBadRequestAction = function () {
        return this.store.create(function (factory) { return factory.router.goToBadRequest(); });
    };
    ErrorEffects.prototype.createServerErrorAction = function () {
        return this.store.create(function (factory) { return factory.router.goToServerError(); });
    };
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ErrorEffects.prototype, "handle", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ErrorEffects.prototype, "handle401Unauthorized", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ErrorEffects.prototype, "handle403Forbidden", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ErrorEffects.prototype, "handleCustom", void 0);
    ErrorEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            current_user_service_1.CurrentUserService,
            common_1.Location])
    ], ErrorEffects);
    return ErrorEffects;
}());
exports.ErrorEffects = ErrorEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9lcnJvci9lcnJvci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsMENBQTJDO0FBQzNDLHlDQUFnRDtBQUVoRCw4Q0FBNkM7QUFFN0MsNkNBQTJDO0FBQzNDLDhDQUFnRDtBQUdoRCxtRkFBZ0Y7QUFHaEY7SUFrQ0Usc0JBQ1UsT0FBZ0IsRUFDaEIsS0FBZSxFQUNmLGtCQUFzQyxFQUN0QyxRQUFrQjtRQUo1QixpQkFLSztRQUpLLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXBDckIsV0FBTSxHQUF1QixJQUFJLENBQUMsT0FBTzthQUM3QyxNQUFNLENBQUMsVUFBQyxNQUFjLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQTdCLENBQTZCLENBQUM7YUFDekQsUUFBUSxDQUFDLFVBQUMsTUFBYyxJQUFLLE9BQUEsdUJBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7UUFHdkUsMEJBQXFCLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7YUFDNUcsTUFBTSxDQUFDLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxxQ0FBcUMsRUFBM0MsQ0FBMkMsQ0FBQzthQUN6RCxRQUFRLENBQUMsVUFBQyxNQUEwQyxJQUFLLE9BQUEsdUJBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQztRQUczRix1QkFBa0IsR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENB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SUFFTyw2Q0FBc0IsR0FBOUI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVPLDhDQUF1QixHQUEvQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQWhDLENBQWdDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBaEpEO1FBREMsZ0JBQU0sRUFBRTtrQ0FDTSx1QkFBVTtnREFFcUQ7SUFHOUU7UUFEQyxnQkFBTSxFQUFFO2tDQUNxQix1QkFBVTsrREFFMEQ7SUFHbEc7UUFEQyxnQkFBTSxFQUFFO2tDQUNrQix1QkFBVTs0REFFdUQ7SUFHNUY7UUFEQyxnQkFBTSxFQUFFO2tDQUNZLHVCQUFVO3NEQUUwRTtJQW5COUYsWUFBWTtRQUR4QixpQkFBVSxFQUFFO3lDQW9DUSxpQkFBTztZQUNULG9CQUFRO1lBQ0sseUNBQWtCO1lBQzVCLGlCQUFRO09BdENqQixZQUFZLENBbUp4QjtJQUFELG1CQUFDO0NBbkpELEFBbUpDLElBQUE7QUFuSlksb0NBQVkiLCJmaWxlIjoiYXBwL3N0b3JlL2Vycm9yL2Vycm9yLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgKiBhcyBFcnJvckFjdGlvbnMgZnJvbSAnLi9lcnJvci5hY3Rpb25zJztcbmltcG9ydCB7IEFwaUVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkRpYWxvZ09wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvaW50ZXJmYWNlcy93ei5kaWFsb2cuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckVmZmVjdHMge1xuICBARWZmZWN0KClcbiAgcHVibGljIGhhbmRsZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLmZpbHRlcigoYWN0aW9uOiBBY3Rpb24pID0+IHRoaXMuY2FuSGFuZGxlRXJyb3JJbihhY3Rpb24pKVxuICAgIC5tZXJnZU1hcCgoYWN0aW9uOiBBY3Rpb24pID0+IE9ic2VydmFibGUuZnJvbSh0aGlzLm5leHRBY3Rpb25zRm9yKGFjdGlvbikpKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGhhbmRsZTQwMVVuYXV0aG9yaXplZDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShFcnJvckFjdGlvbnMuSGFuZGxlNDAxVW5hdXRob3JpemVkLlR5cGUpXG4gICAgLmZpbHRlcigoKSA9PiAhdGhpcy5hd2FpdGluZ1ByZXZpb3VzTm90aWZpY2F0aW9uRGlzbWlzc2FsKVxuICAgIC5tZXJnZU1hcCgoYWN0aW9uOiBFcnJvckFjdGlvbnMuSGFuZGxlNDAxVW5hdXRob3JpemVkKSA9PiBPYnNlcnZhYmxlLmZyb20odGhpcy51bmF1dGhvcml6ZWQoKSkpO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgaGFuZGxlNDAzRm9yYmlkZGVuOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEVycm9yQWN0aW9ucy5IYW5kbGU0MDNGb3JiaWRkZW4uVHlwZSlcbiAgICAuZmlsdGVyKCgpID0+ICF0aGlzLmF3YWl0aW5nUHJldmlvdXNOb3RpZmljYXRpb25EaXNtaXNzYWwpXG4gICAgLm1lcmdlTWFwKChhY3Rpb246IEVycm9yQWN0aW9ucy5IYW5kbGU0MDNGb3JiaWRkZW4pID0+IE9ic2VydmFibGUuZnJvbSh0aGlzLmZvcmJpZGRlbigpKSk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBoYW5kbGVDdXN0b206IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoRXJyb3JBY3Rpb25zLkhhbmRsZUN1c3RvbUVycm9yLlR5cGUpXG4gICAgLmZpbHRlcigoKSA9PiAhdGhpcy5hd2FpdGluZ1ByZXZpb3VzTm90aWZpY2F0aW9uRGlzbWlzc2FsKVxuICAgIC5tZXJnZU1hcCgoYWN0aW9uOiBFcnJvckFjdGlvbnMuSGFuZGxlQ3VzdG9tRXJyb3IpID0+IE9ic2VydmFibGUuZnJvbSh0aGlzLmN1c3RvbUVycm9yKGFjdGlvbi50aXRsZSkpKTtcblxuICBwcml2YXRlIGF3YWl0aW5nUHJldmlvdXNOb3RpZmljYXRpb25EaXNtaXNzYWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG5leHRBY3Rpb25DcmVhdG9yczogYW55ID0ge1xuICAgIDQwMDogdGhpcy5iYWRSZXF1ZXN0LFxuICAgIDQwMTogdGhpcy51bmF1dGhvcml6ZWQsXG4gICAgNDAzOiB0aGlzLmZvcmJpZGRlbixcbiAgICA0MDQ6IHRoaXMubm90Rm91bmQsXG4gICAgNDEyOiB0aGlzLnByZUNvbmRpdGlvbkZhaWxlZCxcbiAgICA0MTk6IHRoaXMuc2Vzc2lvbkV4cGlyZWQsXG4gICAgNDUxOiB0aGlzLnJlZ2lzdHJhdGlvbkRpc2FsbG93ZWQsXG4gICAgNTAwOiB0aGlzLnNlcnZlckVycm9yXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgY3VycmVudFVzZXJTZXJ2aWNlOiBDdXJyZW50VXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb25cbiAgKSB7IH1cblxuICBwcml2YXRlIGNhbkhhbmRsZUVycm9ySW4oYWN0aW9uOiBBY3Rpb24pOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5hd2FpdGluZ1ByZXZpb3VzTm90aWZpY2F0aW9uRGlzbWlzc2FsIHx8ICFhY3Rpb24pIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGVycm9yOiBhbnkgPSAoYWN0aW9uIGFzIGFueSkuZXJyb3I7XG4gICAgaWYgKCFlcnJvcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3Qgc3RhdHVzOiBudW1iZXIgPSBlcnJvci5zdGF0dXM7XG4gICAgaWYgKCFzdGF0dXMpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBpc05hTihzdGF0dXMpIHx8IHRoaXMuY2FuSGFuZGxlKHN0YXR1cyk7XG4gIH1cblxuICBwcml2YXRlIGNhbkhhbmRsZShzdGF0dXM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm5leHRBY3Rpb25DcmVhdG9ycykuc29tZShzdXBwb3J0ZWRTdGF0dXMgPT4gc3RhdHVzID09PSBwYXJzZUludChzdXBwb3J0ZWRTdGF0dXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgbmV4dEFjdGlvbnNGb3IoYWN0aW9uOiBBY3Rpb24pOiBBY3Rpb25bXSB7XG4gICAgY29uc3QgZXJyb3I6IGFueSA9IChhY3Rpb24gYXMgYW55KS5lcnJvcjtcbiAgICBjb25zdCBzdGF0dXM6IG51bWJlciA9IHBhcnNlSW50KGVycm9yLnN0YXR1cyk7XG5cbiAgICByZXR1cm4gaXNOYU4oc3RhdHVzKSA/IHRoaXMuY3VzdG9tRXJyb3IoZXJyb3Iuc3RhdHVzKSA6IHRoaXMubmV4dEFjdGlvbkNyZWF0b3JzW3N0YXR1c10uY2FsbCh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgYmFkUmVxdWVzdCgpOiBBY3Rpb25bXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuY3JlYXRlQmFkUmVxdWVzdEFjdGlvbigpXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgc2VydmVyRXJyb3IoKTogQWN0aW9uW10ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNyZWF0ZVNlcnZlckVycm9yQWN0aW9uKClcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSB1bmF1dGhvcml6ZWQoKTogQWN0aW9uW10ge1xuICAgIHRoaXMuY3VycmVudFVzZXJTZXJ2aWNlLmRlc3Ryb3koKTsgIC8vIFRPRE86IFdoZW4gQXBwU3RvcmUgaGFzIGN1cnJlbnRVc2VyLCB0aGlzIHdpbGwgYmUgYW4gYWN0aW9uIGluIHRoZSByZXR1cm5lZCBhcnJheS5cblxuICAgIGNvbnN0IGFjdGlvbnNBcnJheSA9IFt0aGlzLmNyZWF0ZUdvVG9Mb2dpbkFjdGlvbigpXTtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJzsnKVswXSA9PT0gJy91c2VyL2xvZ2luJ1xuICAgICAgPyBhY3Rpb25zQXJyYXkuY29uY2F0KHRoaXMuY3JlYXRlTm90aWZpZXJBY3Rpb25XaXRoKCdOT1RJRklDQVRJT04uRVJST1InLCAnTk9USUZJQ0FUSU9OLklOVkFMSURfQ1JFREVOVElBTFMnKSlcbiAgICAgIDogYWN0aW9uc0FycmF5O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JiaWRkZW4oKTogQWN0aW9uW10ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNyZWF0ZU5vdGlmaWVyQWN0aW9uV2l0aCgnTk9USUZJQ0FUSU9OLkVSUk9SJywgJ05PVElGSUNBVElPTi5ORUVEX1BFUk1JU1NJT04nKVxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIG5vdEZvdW5kKCk6IEFjdGlvbltdIHtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvUGFnZU5vdEZvdW5kKCkpXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgc2Vzc2lvbkV4cGlyZWQoKTogQWN0aW9uW10ge1xuICAgIHRoaXMuY3VycmVudFVzZXJTZXJ2aWNlLmRlc3Ryb3koKTsgIC8vIFRPRE86IFdoZW4gQXBwU3RvcmUgaGFzIGN1cnJlbnRVc2VyLCB0aGlzIHdpbGwgYmUgYW4gYWN0aW9uIGluIHRoZSByZXR1cm5lZCBhcnJheS5cblxuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNyZWF0ZUdvVG9Mb2dpbkFjdGlvbigpLFxuICAgICAgdGhpcy5jcmVhdGVOb3RpZmllckFjdGlvbldpdGgoJ05PVElGSUNBVElPTi5FUlJPUicsICdOT1RJRklDQVRJT04uRVhQSVJFRF9TRVNTSU9OJylcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVDb25kaXRpb25GYWlsZWQoKTogQWN0aW9uW10ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLmNyZWF0ZU5vdGlmaWVyQWN0aW9uV2l0aCgnTk9USUZJQ0FUSU9OLkVSUk9SJywgJ05PVElGSUNBVElPTi5QUkVDT05ESVRJT05fRkFJTCcpXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0cmF0aW9uRGlzYWxsb3dlZCgpOiBBY3Rpb25bXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuY3JlYXRlTm90aWZpZXJBY3Rpb25XaXRoKCdSRUdJU1RFUi5ESVNBTExPV0VELlRJVExFJywgJ1JFR0lTVEVSLkRJU0FMTE9XRUQuTUVTU0FHRScsICdSRUdJU1RFUi5ESVNBTExPV0VELlBST01QVCcpXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgY3VzdG9tRXJyb3IoZXJyb3I6IG51bWJlciB8IHN0cmluZyk6IEFjdGlvbltdIHtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5jcmVhdGVOb3RpZmllckFjdGlvbldpdGgoU3RyaW5nKGVycm9yKSlcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVHb1RvTG9naW5BY3Rpb24oKTogQWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvTG9naW5XaXRoUmVkaXJlY3QoKSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU5vdGlmaWVyQWN0aW9uV2l0aCh0aXRsZTogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nLCBwcm9tcHQ/OiBzdHJpbmcpOiBBY3Rpb24ge1xuICAgIHRoaXMuYXdhaXRpbmdQcmV2aW91c05vdGlmaWNhdGlvbkRpc21pc3NhbCA9IHRydWU7ICAvLyBOT1RFOiBTaWRlIGVmZmVjdCBwdXJwb3NlbHkgYWRkZWQgaW4gZmF2b3Igb2YgRFJZbmVzcy5cblxuICAgIGxldCBvcHRpb25zOiBOb3RpZmljYXRpb25EaWFsb2dPcHRpb25zID0geyB0aXRsZSB9O1xuICAgIGlmIChtZXNzYWdlKSBvcHRpb25zID0geyAuLi5vcHRpb25zLCBtZXNzYWdlIH07XG4gICAgaWYgKHByb21wdCkgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgcHJvbXB0IH07XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUoXG4gICAgICBmYWN0b3J5ID0+IGZhY3Rvcnkubm90aWZpZXIubm90aWZ5KG9wdGlvbnMsICgpID0+IHRoaXMuYXdhaXRpbmdQcmV2aW91c05vdGlmaWNhdGlvbkRpc21pc3NhbCA9IGZhbHNlKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJhZFJlcXVlc3RBY3Rpb24oKTogQWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvQmFkUmVxdWVzdCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2VydmVyRXJyb3JBY3Rpb24oKTogQWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvU2VydmVyRXJyb3IoKSk7XG4gIH1cbn1cbiJdfQ==
