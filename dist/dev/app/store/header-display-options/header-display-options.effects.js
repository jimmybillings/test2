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
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], HeaderDisplayOptionsEffects.prototype, "determineHeaderPosition", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], HeaderDisplayOptionsEffects.prototype, "determineIfHeaderCanBeFixed", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], HeaderDisplayOptionsEffects.prototype, "determineIfFiltersAreAvailable", void 0);
    HeaderDisplayOptionsEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore])
    ], HeaderDisplayOptionsEffects);
    return HeaderDisplayOptionsEffects;
}());
exports.HeaderDisplayOptionsEffects = HeaderDisplayOptionsEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9oZWFkZXItZGlzcGxheS1vcHRpb25zL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUM3QyxzQ0FBMkM7QUFDM0MseUNBQWdEO0FBR2hELDZDQUEyQztBQUMzQyw4RUFBZ0Y7QUFHaEY7SUErQ0UscUNBQW9CLE9BQWdCLEVBQVUsS0FBZTtRQUE3RCxpQkFBa0U7UUFBOUMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUE3Q3RELDRCQUF1QixHQUF1QixJQUFJLENBQUMsT0FBTzthQUM5RCxNQUFNLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2FBQzFELGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQWxDLENBQWtDLENBQUMsQ0FBQzthQUM5RSxTQUFTLENBQUMsVUFBQyxFQUEyRTtnQkFBMUUsY0FBTSxFQUFFLGVBQU87WUFDMUIsT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDO2lCQUNoRCxNQUFNLENBQUMsVUFBQSxhQUFhLElBQUksT0FBQSxhQUFhLEtBQUssT0FBTyxFQUF6QixDQUF5QixDQUFDO2lCQUNsRCxHQUFHLENBQUMsVUFBQyxhQUFzQjtnQkFDMUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwQixLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FB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QUMsQ0FBQztZQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUEvREQ7UUFEQyxnQkFBTSxFQUFFO2tDQUN1Qix1QkFBVTtnRkFXdEM7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQzJCLHVCQUFVO29GQVExQztJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDOEIsdUJBQVU7dUZBUTdDO0lBbkNPLDJCQUEyQjtRQUR2QyxpQkFBVSxFQUFFO3lDQWdEa0IsaUJBQU8sRUFBaUIsb0JBQVE7T0EvQ2xELDJCQUEyQixDQWtFdkM7SUFBRCxrQ0FBQztDQWxFRCxBQWtFQyxJQUFBO0FBbEVZLGtFQUEyQiIsImZpbGUiOiJhcHAvc3RvcmUvaGVhZGVyLWRpc3BsYXktb3B0aW9ucy9oZWFkZXItZGlzcGxheS1vcHRpb25zLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgKiBhcyBIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMgZnJvbSAnLi9oZWFkZXItZGlzcGxheS1vcHRpb25zLmFjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhZGVyRGlzcGxheU9wdGlvbnNFZmZlY3RzIHtcbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBkZXRlcm1pbmVIZWFkZXJQb3NpdGlvbjogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMuU2V0SGVhZGVyUG9zaXRpb24uVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaGVhZGVyRGlzcGxheU9wdGlvbnMuaXNGaXhlZCkpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgaXNGaXhlZF06IFtIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMuU2V0SGVhZGVyUG9zaXRpb24sIGJvb2xlYW5dKSA9PlxuICAgICAgdGhpcy5zaG91bGRIZWFkZXJCZUZpeGVkKGFjdGlvbi5wYWdlVmVydGljYWxPZmZzZXQpXG4gICAgICAgIC5maWx0ZXIoc2hvdWxkQmVGaXhlZCA9PiBzaG91bGRCZUZpeGVkICE9PSBpc0ZpeGVkKVxuICAgICAgICAubWFwKChzaG91bGRCZUZpeGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHNob3VsZEJlRml4ZWQgP1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmhlYWRlckRpc3BsYXlPcHRpb25zLmZpeCgpKSA6XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuaGVhZGVyRGlzcGxheU9wdGlvbnMudW5maXgoKSk7XG4gICAgICAgIH0pXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGRldGVybWluZUlmSGVhZGVyQ2FuQmVGaXhlZDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMuQ2hlY2tJZkhlYWRlckNhbkJlRml4ZWQuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5DaGVja0lmSGVhZGVyQ2FuQmVGaXhlZCkgPT4gdGhpcy5jYW5IZWFkZXJCZUZpeGVkKGFjdGlvbi51cmwpXG4gICAgICAubWFwKChjYW5CZUZpeGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHJldHVybiBjYW5CZUZpeGVkID9cbiAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuaGVhZGVyRGlzcGxheU9wdGlvbnMuZW5hYmxlRml4KCkpIDpcbiAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuaGVhZGVyRGlzcGxheU9wdGlvbnMuZGlzYWJsZUZpeCgpKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGRldGVybWluZUlmRmlsdGVyc0FyZUF2YWlsYWJsZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zXG4gICAgLm9mVHlwZShIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMuQ2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGUuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5DaGVja0lmRmlsdGVyc0FyZUF2YWlsYWJsZSkgPT4gdGhpcy5hcmVGaWx0ZXJzQXZhaWxhYmxlKGFjdGlvbi51cmwpXG4gICAgICAubWFwKChmaWx0ZXJzQXJlQXZhaWxhYmxlKSA9PiB7XG4gICAgICAgIHJldHVybiBmaWx0ZXJzQXJlQXZhaWxhYmxlID9cbiAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuaGVhZGVyRGlzcGxheU9wdGlvbnMuZW5hYmxlRmlsdGVycygpKSA6XG4gICAgICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmhlYWRlckRpc3BsYXlPcHRpb25zLmRpc2FibGVGaWx0ZXJzKCkpO1xuICAgICAgfSlcbiAgICApO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgdXJsc1doZXJlSGVhZGVyQ2Fubm90QmVGaXhlZDogc3RyaW5nW10gPSBbXG4gICAgJy91c2VyL2ZvcmdvdC1wYXNzd29yZCcsXG4gICAgJy91c2VyL3JlZ2lzdGVyJyxcbiAgICAnL3VzZXIvbG9naW4nLFxuICAgICcvdXNlci9yZXNldC1wYXNzd29yZCcsXG4gICAgJy9lcnJvci80MDQnLFxuICAgICcvZXJyb3IvNDAwJyxcbiAgICAnL2Vycm9yLzUwMCdcbiAgXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwcml2YXRlIHNob3VsZEhlYWRlckJlRml4ZWQocGFnZVZlcnRpY2FsT2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKHBhZ2VWZXJ0aWNhbE9mZnNldCA+IDExMSkgPyBPYnNlcnZhYmxlLm9mKHRydWUpIDogT2JzZXJ2YWJsZS5vZihmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGNhbkhlYWRlckJlRml4ZWQodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAodXJsID09PSAnLycpIHJldHVybiBPYnNlcnZhYmxlLm9mKGZhbHNlKTtcbiAgICBsZXQgY2FuQmVGaXhlZDogYm9vbGVhbiA9IHRoaXMudXJsc1doZXJlSGVhZGVyQ2Fubm90QmVGaXhlZC5maWx0ZXIodSA9PiB1cmwuaW5kZXhPZih1KSA+IC0xKS5sZW5ndGggPT09IDA7XG4gICAgcmV0dXJuIE9ic2VydmFibGUub2YoY2FuQmVGaXhlZCk7XG4gIH1cblxuICBwcml2YXRlIGFyZUZpbHRlcnNBdmFpbGFibGUodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBsZXQgZmlsdGVyc0FyZUF2YWlsYWJsZSA9XG4gICAgICAodXJsLmluZGV4T2YoJ3NlYXJjaCcpID4gLTEgJiZcbiAgICAgICAgdXJsLmluZGV4T2YoJ3NlYXJjaC9hc3NldC8nKSA9PT0gLTEpICYmXG4gICAgICB1cmwuaW5kZXhPZignZ3E9JykgPCAwO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKGZpbHRlcnNBcmVBdmFpbGFibGUpO1xuICB9XG59XG4iXX0=
