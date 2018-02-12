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
var InvoiceActions = require("./invoice.actions");
var app_store_1 = require("../../app.store");
var invoice_service_1 = require("./invoice.service");
var InvoiceEffects = (function () {
    function InvoiceEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(InvoiceActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.load(action.orderId, action.shareKey)
                .map(function (invoice) { return _this.store.create(function (factory) { return factory.invoice.loadSuccess(invoice); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.invoice.loadFailure(error); })); });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], InvoiceEffects.prototype, "load", void 0);
    InvoiceEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, invoice_service_1.InvoiceService])
    ], InvoiceEffects);
    return InvoiceEffects;
}());
exports.InvoiceEffects = InvoiceEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2UuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyx5Q0FBZ0Q7QUFDaEQsOENBQTZDO0FBSTdDLGtEQUFvRDtBQUNwRCw2Q0FBMkM7QUFDM0MscURBQW1EO0FBSW5EO0lBU0Usd0JBQW9CLE9BQWdCLEVBQVUsS0FBZSxFQUFVLE9BQXVCO1FBQTlGLGlCQUFtRztRQUEvRSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBUHZGLFNBQUksR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUUsU0FBUyxDQUFDLFVBQUMsTUFBMkI7WUFDckMsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7aUJBQy9DLEdBQUcsQ0FBQyxVQUFDLE9BQWdCLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLEVBQWxFLENBQWtFLENBQUM7aUJBQzdGLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQyxFQUEvRSxDQUErRSxDQUFDO1FBRmxHLENBRWtHLENBQ25HLENBQUM7SUFFOEYsQ0FBQztJQVBuRztRQURDLGdCQUFNLEVBQUU7a0NBQ0ksdUJBQVU7Z0RBS25CO0lBUE8sY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQVVrQixpQkFBTyxFQUFpQixvQkFBUSxFQUFtQixnQ0FBYztPQVRuRixjQUFjLENBVTFCO0lBQUQscUJBQUM7Q0FWRCxBQVVDLElBQUE7QUFWWSx3Q0FBYyIsImZpbGUiOiJhcHAvc3RvcmUvaW52b2ljZS9pbnZvaWNlLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0ICogYXMgSW52b2ljZUFjdGlvbnMgZnJvbSAnLi9pbnZvaWNlLmFjdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgSW52b2ljZVNlcnZpY2UgfSBmcm9tICcuL2ludm9pY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBJbnZvaWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEludm9pY2VFZmZlY3RzIHtcbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBsb2FkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEludm9pY2VBY3Rpb25zLkxvYWQuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IEludm9pY2VBY3Rpb25zLkxvYWQpID0+XG4gICAgICB0aGlzLnNlcnZpY2UubG9hZChhY3Rpb24ub3JkZXJJZCwgYWN0aW9uLnNoYXJlS2V5KVxuICAgICAgICAubWFwKChpbnZvaWNlOiBJbnZvaWNlKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuaW52b2ljZS5sb2FkU3VjY2VzcyhpbnZvaWNlKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5pbnZvaWNlLmxvYWRGYWlsdXJlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLCBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSwgcHJpdmF0ZSBzZXJ2aWNlOiBJbnZvaWNlU2VydmljZSkgeyB9XG59XG4iXX0=
