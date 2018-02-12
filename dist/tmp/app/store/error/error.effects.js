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
    ErrorEffects.decorators = [
        { type: core_1.Injectable },
    ];
    ErrorEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: current_user_service_1.CurrentUserService, },
        { type: common_1.Location, },
    ]; };
    ErrorEffects.propDecorators = {
        'handle': [{ type: effects_1.Effect },],
        'handle401Unauthorized': [{ type: effects_1.Effect },],
        'handle403Forbidden': [{ type: effects_1.Effect },],
        'handleCustom': [{ type: effects_1.Effect },],
    };
    return ErrorEffects;
}());
exports.ErrorEffects = ErrorEffects;
//# sourceMappingURL=error.effects.js.map