"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var AppLoadingIndicatorComponent = (function () {
    function AppLoadingIndicatorComponent(store) {
        this.store = store;
    }
    Object.defineProperty(AppLoadingIndicatorComponent.prototype, "showLoadingIndicator", {
        get: function () {
            return this.store.select(function (state) { return state.loadingIndicator.show; });
        },
        enumerable: true,
        configurable: true
    });
    AppLoadingIndicatorComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'app-loading-indicator',
                    template: "<mat-progress-bar mode=\"indeterminate\" color=\"accent\" *ngIf=\"showLoadingIndicator | async\"></mat-progress-bar>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    AppLoadingIndicatorComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return AppLoadingIndicatorComponent;
}());
exports.AppLoadingIndicatorComponent = AppLoadingIndicatorComponent;
//# sourceMappingURL=app-loading-indicator.component.js.map