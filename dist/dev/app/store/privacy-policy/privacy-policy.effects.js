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
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var privacy_policy_service_1 = require("./privacy-policy.service");
var PrivacyPolicyActions = require("./privacy-policy.actions");
var PrivacyPolicyEffects = (function () {
    function PrivacyPolicyEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(PrivacyPolicyActions.Load.Type)
            .switchMap(function (action) { return _this.service.load(action.documentId)
            .map(function (document) { return _this.store.create(function (factory) { return factory.privacyPolicy.loadSuccess(document); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.privacyPolicy.loadFailure(error); })); }); });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], PrivacyPolicyEffects.prototype, "load", void 0);
    PrivacyPolicyEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, privacy_policy_service_1.PrivacyPolicyService])
    ], PrivacyPolicyEffects);
    return PrivacyPolicyEffects;
}());
exports.PrivacyPolicyEffects = PrivacyPolicyEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUE2QztBQUU3Qyx5Q0FBZ0Q7QUFFaEQsNkNBQTJDO0FBQzNDLG1FQUFnRTtBQUNoRSwrREFBaUU7QUFHakU7SUFRRSw4QkFBb0IsT0FBZ0IsRUFBVSxLQUFlLEVBQVUsT0FBNkI7UUFBcEcsaUJBQXlHO1FBQXJGLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFON0YsU0FBSSxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2xGLFNBQVMsQ0FBQyxVQUFDLE1BQWlDLElBQUssT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2FBQ25GLEdBQUcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQTNDLENBQTJDLENBQUMsRUFBekUsQ0FBeUUsQ0FBQzthQUMxRixLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUMsRUFBckYsQ0FBcUYsQ0FBQyxFQUZ0RCxDQUVzRCxDQUN2RyxDQUFDO0lBRW9HLENBQUM7SUFOekc7UUFEQyxnQkFBTSxFQUFFO2tDQUNJLHVCQUFVO3NEQUluQjtJQU5PLG9CQUFvQjtRQURoQyxpQkFBVSxFQUFFO3lDQVNrQixpQkFBTyxFQUFpQixvQkFBUSxFQUFtQiw2Q0FBb0I7T0FSekYsb0JBQW9CLENBU2hDO0lBQUQsMkJBQUM7Q0FURCxBQVNDLElBQUE7QUFUWSxvREFBb0IiLCJmaWxlIjoiYXBwL3N0b3JlL3ByaXZhY3ktcG9saWN5L3ByaXZhY3ktcG9saWN5LmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBQcml2YWN5UG9saWN5U2VydmljZSB9IGZyb20gJy4vcHJpdmFjeS1wb2xpY3kuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBQcml2YWN5UG9saWN5QWN0aW9ucyBmcm9tICcuL3ByaXZhY3ktcG9saWN5LmFjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJpdmFjeVBvbGljeUVmZmVjdHMge1xuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUHJpdmFjeVBvbGljeUFjdGlvbnMuTG9hZC5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoKGFjdGlvbjogUHJpdmFjeVBvbGljeUFjdGlvbnMuTG9hZCkgPT4gdGhpcy5zZXJ2aWNlLmxvYWQoYWN0aW9uLmRvY3VtZW50SWQpXG4gICAgICAubWFwKGRvY3VtZW50ID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5wcml2YWN5UG9saWN5LmxvYWRTdWNjZXNzKGRvY3VtZW50KSkpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucHJpdmFjeVBvbGljeS5sb2FkRmFpbHVyZShlcnJvcikpKSlcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9uczogQWN0aW9ucywgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsIHByaXZhdGUgc2VydmljZTogUHJpdmFjeVBvbGljeVNlcnZpY2UpIHsgfVxufVxuIl19
