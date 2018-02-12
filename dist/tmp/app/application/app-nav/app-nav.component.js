"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var app_store_1 = require("../../app.store");
var AppNavComponent = (function () {
    function AppNavComponent(store, router) {
        this.store = store;
        this.router = router;
        this.onLogOut = new core_1.EventEmitter();
        this.onChangeLang = new core_1.EventEmitter();
        this.onOpenSidenav = new core_1.EventEmitter();
        this.headerCanBeFixed = this._headerCanBeFixed();
        this.headerIsFixed = this._headerIsFixed();
    }
    AppNavComponent.prototype.logOut = function (event) {
        this.onLogOut.emit(event);
        this.trigger.closeMenu();
        this.router.navigate(['/']);
    };
    AppNavComponent.prototype.toggleSearch = function () {
        this.userPreference.toggleSearch();
    };
    AppNavComponent.prototype.toggleCollectionTray = function () {
        this.userPreference.toggleCollectionTray();
    };
    AppNavComponent.prototype.formatBadgeNumber = function (size) {
        return (size > 99) ? '99+' : size.toString();
    };
    AppNavComponent.prototype.navigateTo = function (path) {
        this.router.navigate([path]);
    };
    AppNavComponent.prototype._headerIsFixed = function () {
        return this.store.select(function (state) { return state.headerDisplayOptions.isFixed; });
    };
    AppNavComponent.prototype._headerCanBeFixed = function () {
        return this.store.select(function (state) { return state.headerDisplayOptions.canBeFixed; });
    };
    AppNavComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'app-nav',
                    templateUrl: 'app-nav.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    AppNavComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: router_1.Router, },
    ]; };
    AppNavComponent.propDecorators = {
        'currentUser': [{ type: core_1.Input },],
        'config': [{ type: core_1.Input },],
        'supportedLanguages': [{ type: core_1.Input },],
        'userPreference': [{ type: core_1.Input },],
        'cartSize': [{ type: core_1.Input },],
        'userCan': [{ type: core_1.Input },],
        'onLogOut': [{ type: core_1.Output },],
        'onChangeLang': [{ type: core_1.Output },],
        'onOpenSidenav': [{ type: core_1.Output },],
        'trigger': [{ type: core_1.ViewChild, args: [material_1.MatMenuTrigger,] },],
    };
    return AppNavComponent;
}());
exports.AppNavComponent = AppNavComponent;
//# sourceMappingURL=app-nav.component.js.map