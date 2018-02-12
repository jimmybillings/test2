"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var HeaderDisplayOptionsActions = require("./header-display-options.actions");
var HeaderDisplayOptionsEffects = (function () {
    function HeaderDisplayOptionsEffects(actions, store) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.determineHeaderPosition = this.actions
            .ofType(HeaderDisplayOptionsActions.SetHeaderPosition.Type)
            .withLatestFrom(this.store.select(function (state) { return state.headerDisplayOptions.isFixed; }))
            .switchMap(function (_a) {
            var action = _a[0], isFixed = _a[1];
            return _this.shouldHeaderBeFixed(action.pageVerticalOffset)
                .filter(function (shouldBeFixed) { return shouldBeFixed !== isFixed; })
                .map(function (shouldBeFixed) {
                return shouldBeFixed ?
                    _this.store.create(function (factory) { return factory.headerDisplayOptions.fix(); }) :
                    _this.store.create(function (factory) { return factory.headerDisplayOptions.unfix(); });
            });
        });
        this.determineIfHeaderCanBeFixed = this.actions
            .ofType(HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed.Type)
            .switchMap(function (action) { return _this.canHeaderBeFixed(action.url)
            .map(function (canBeFixed) {
            return canBeFixed ?
                _this.store.create(function (factory) { return factory.headerDisplayOptions.enableFix(); }) :
                _this.store.create(function (factory) { return factory.headerDisplayOptions.disableFix(); });
        }); });
        this.determineIfFiltersAreAvailable = this.actions
            .ofType(HeaderDisplayOptionsActions.CheckIfFiltersAreAvailable.Type)
            .switchMap(function (action) { return _this.areFiltersAvailable(action.url)
            .map(function (filtersAreAvailable) {
            return filtersAreAvailable ?
                _this.store.create(function (factory) { return factory.headerDisplayOptions.enableFilters(); }) :
                _this.store.create(function (factory) { return factory.headerDisplayOptions.disableFilters(); });
        }); });
        this.urlsWhereHeaderCannotBeFixed = [
            '/user/forgot-password',
            '/user/register',
            '/user/login',
            '/user/reset-password',
            '/error/404',
            '/error/400',
            '/error/500'
        ];
    }
    HeaderDisplayOptionsEffects.prototype.shouldHeaderBeFixed = function (pageVerticalOffset) {
        return (pageVerticalOffset > 111) ? Observable_1.Observable.of(true) : Observable_1.Observable.of(false);
    };
    HeaderDisplayOptionsEffects.prototype.canHeaderBeFixed = function (url) {
        if (url === '/')
            return Observable_1.Observable.of(false);
        var canBeFixed = this.urlsWhereHeaderCannotBeFixed.filter(function (u) { return url.indexOf(u) > -1; }).length === 0;
        return Observable_1.Observable.of(canBeFixed);
    };
    HeaderDisplayOptionsEffects.prototype.areFiltersAvailable = function (url) {
        var filtersAreAvailable = (url.indexOf('search') > -1 &&
            url.indexOf('search/asset/') === -1) &&
            url.indexOf('gq=') < 0;
        return Observable_1.Observable.of(filtersAreAvailable);
    };
    HeaderDisplayOptionsEffects.decorators = [
        { type: core_1.Injectable },
    ];
    HeaderDisplayOptionsEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
    ]; };
    HeaderDisplayOptionsEffects.propDecorators = {
        'determineHeaderPosition': [{ type: effects_1.Effect },],
        'determineIfHeaderCanBeFixed': [{ type: effects_1.Effect },],
        'determineIfFiltersAreAvailable': [{ type: effects_1.Effect },],
    };
    return HeaderDisplayOptionsEffects;
}());
exports.HeaderDisplayOptionsEffects = HeaderDisplayOptionsEffects;
//# sourceMappingURL=header-display-options.effects.js.map