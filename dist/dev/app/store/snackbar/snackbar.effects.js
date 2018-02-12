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
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var SnackbarActions = require("./snackbar.actions");
var snackbar_service_1 = require("./snackbar.service");
var app_store_1 = require("../../app.store");
var SnackbarEffects = (function () {
    function SnackbarEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.display = this.actions.ofType(SnackbarActions.Display.Type)
            .switchMap(function (action) {
            return _this.service.display(action.messageKey, action.messageParameters)
                .map(function (translatedString) { return _this.store.create(function (factory) { return factory.snackbar.displaySuccess(translatedString); }); });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SnackbarEffects.prototype, "display", void 0);
    SnackbarEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, snackbar_service_1.SnackbarService])
    ], SnackbarEffects);
    return SnackbarEffects;
}());
exports.SnackbarEffects = SnackbarEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHlDQUFnRDtBQUNoRCw4Q0FBNkM7QUFHN0Msb0RBQXNEO0FBQ3RELHVEQUFxRDtBQUNyRCw2Q0FBMkM7QUFHM0M7SUFRRSx5QkFBb0IsT0FBZ0IsRUFBVSxLQUFlLEVBQVUsT0FBd0I7UUFBL0YsaUJBQW9HO1FBQWhGLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFOeEYsWUFBTyxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNuRixTQUFTLENBQUMsVUFBQyxNQUErQjtZQUN6QyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDO2lCQUM5RCxHQUFHLENBQUMsVUFBQyxnQkFBd0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsRUFBakQsQ0FBaUQsQ0FBQyxFQUEvRSxDQUErRSxDQUFDO1FBRHJILENBQ3FILENBQ3RILENBQUM7SUFFK0YsQ0FBQztJQU5wRztRQURDLGdCQUFNLEVBQUU7a0NBQ08sdUJBQVU7b0RBSXRCO0lBTk8sZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQVNrQixpQkFBTyxFQUFpQixvQkFBUSxFQUFtQixrQ0FBZTtPQVJwRixlQUFlLENBUzNCO0lBQUQsc0JBQUM7Q0FURCxBQVNDLElBQUE7QUFUWSwwQ0FBZSIsImZpbGUiOiJhcHAvc3RvcmUvc25hY2tiYXIvc25hY2tiYXIuZWZmZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCAqIGFzIFNuYWNrYmFyQWN0aW9ucyBmcm9tICcuL3NuYWNrYmFyLmFjdGlvbnMnO1xuaW1wb3J0IHsgU25hY2tiYXJTZXJ2aWNlIH0gZnJvbSAnLi9zbmFja2Jhci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNuYWNrYmFyRWZmZWN0cyB7XG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgZGlzcGxheTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShTbmFja2JhckFjdGlvbnMuRGlzcGxheS5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoKGFjdGlvbjogU25hY2tiYXJBY3Rpb25zLkRpc3BsYXkpID0+XG4gICAgICB0aGlzLnNlcnZpY2UuZGlzcGxheShhY3Rpb24ubWVzc2FnZUtleSwgYWN0aW9uLm1lc3NhZ2VQYXJhbWV0ZXJzKVxuICAgICAgICAubWFwKCh0cmFuc2xhdGVkU3RyaW5nOiBzdHJpbmcpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5U3VjY2Vzcyh0cmFuc2xhdGVkU3RyaW5nKSkpXG4gICAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLCBwcml2YXRlIHNlcnZpY2U6IFNuYWNrYmFyU2VydmljZSkgeyB9XG59XG4iXX0=
