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
var user_service_1 = require("./user.service");
var UserActions = require("./user.actions");
var UserEffects = (function () {
    function UserEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.getAllUsersByAccountId = this.actions
            .ofType(UserActions.GetAllUsersByAccountId.Type)
            .switchMap(function (action) {
            return _this.service.getUsersByAccountId(action.accountId, 'offAfterResponse')
                .map(function (users) {
                return (users || [])
                    .map(function (user) { return ({
                    id: user.id,
                    name: user.firstName + " " + user.lastName,
                    emailAddress: user.emailAddress
                }); });
            })
                .map(function (invoiceContactUsers) {
                return _this.store.create(function (factory) { return factory.user.getAllUsersByAccountIdSuccess(invoiceContactUsers); });
            }).catch(function (error) {
                return Observable_1.Observable.of(_this.store.create(function (factory) {
                    return factory.error.handle(error);
                }));
            });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], UserEffects.prototype, "getAllUsersByAccountId", void 0);
    UserEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, user_service_1.FutureUserService])
    ], UserEffects);
    return UserEffects;
}());
exports.UserEffects = UserEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91c2VyL3VzZXIuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUEyQztBQUMzQyw4Q0FBNkM7QUFFN0MseUNBQWdEO0FBRWhELDZDQUEyQztBQUMzQywrQ0FBbUQ7QUFDbkQsNENBQThDO0FBSTlDO0lBd0JFLHFCQUFvQixPQUFnQixFQUFVLEtBQWUsRUFBVSxPQUEwQjtRQUFqRyxpQkFBc0c7UUFBbEYsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQXJCMUYsMkJBQXNCLEdBQXVCLElBQUksQ0FBQyxPQUFPO2FBQzdELE1BQU0sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDO2FBQy9DLFNBQVMsQ0FBQyxVQUFDLE1BQTBDO1lBQ3BELE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDO2lCQUNuRSxHQUFHLENBQUMsVUFBQyxLQUFhO2dCQUNqQixNQUFNLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO3FCQUNqQixHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDO29CQUNaLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDWCxJQUFJLEVBQUssSUFBSSxDQUFDLFNBQVMsU0FBSSxJQUFJLENBQUMsUUFBVTtvQkFDMUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2lCQUNoQyxDQUFDLEVBSlcsQ0FJWCxDQUFDLENBQUM7WUFDUixDQUFDLENBQUM7aUJBQ0QsR0FBRyxDQUFDLFVBQUMsbUJBQWdEO2dCQUNwRCxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUEvRCxDQUErRCxDQUFDO1lBQTdGLENBQTZGLENBQzlGLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDWCxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTztvQkFDckMsT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQTNCLENBQTJCLENBQzVCLENBQUM7WUFGRixDQUVFLENBQ0g7UUFmSCxDQWVHLENBQ0osQ0FBQztJQUVpRyxDQUFDO0lBckJ0RztRQURDLGdCQUFNLEVBQUU7a0NBQ3NCLHVCQUFVOytEQW1CckM7SUF0Qk8sV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQXlCa0IsaUJBQU8sRUFBaUIsb0JBQVEsRUFBbUIsZ0NBQWlCO09BeEJ0RixXQUFXLENBeUJ2QjtJQUFELGtCQUFDO0NBekJELEFBeUJDLElBQUE7QUF6Qlksa0NBQVciLCJmaWxlIjoiYXBwL3N0b3JlL3VzZXIvdXNlci5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5cbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEZ1dHVyZVVzZXJTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgVXNlckFjdGlvbnMgZnJvbSAnLi91c2VyLmFjdGlvbnMnO1xuaW1wb3J0IHsgU2VuZERldGFpbHNCaWxsaW5nQWNjb3VudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyRWZmZWN0cyB7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBnZXRBbGxVc2Vyc0J5QWNjb3VudElkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnNcbiAgICAub2ZUeXBlKFVzZXJBY3Rpb25zLkdldEFsbFVzZXJzQnlBY2NvdW50SWQuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IFVzZXJBY3Rpb25zLkdldEFsbFVzZXJzQnlBY2NvdW50SWQpID0+XG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0VXNlcnNCeUFjY291bnRJZChhY3Rpb24uYWNjb3VudElkLCAnb2ZmQWZ0ZXJSZXNwb25zZScpXG4gICAgICAgIC5tYXAoKHVzZXJzOiBVc2VyW10pID0+IHtcbiAgICAgICAgICByZXR1cm4gKHVzZXJzIHx8IFtdKVxuICAgICAgICAgICAgLm1hcCh1c2VyID0+ICh7XG4gICAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgICAgICBuYW1lOiBgJHt1c2VyLmZpcnN0TmFtZX0gJHt1c2VyLmxhc3ROYW1lfWAsXG4gICAgICAgICAgICAgIGVtYWlsQWRkcmVzczogdXNlci5lbWFpbEFkZHJlc3NcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcCgoaW52b2ljZUNvbnRhY3RVc2VyczogU2VuZERldGFpbHNCaWxsaW5nQWNjb3VudFtdKSA9PlxuICAgICAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS51c2VyLmdldEFsbFVzZXJzQnlBY2NvdW50SWRTdWNjZXNzKGludm9pY2VDb250YWN0VXNlcnMpKVxuICAgICAgICApLmNhdGNoKGVycm9yID0+XG4gICAgICAgICAgT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+XG4gICAgICAgICAgICBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcilcbiAgICAgICAgICApKVxuICAgICAgICApXG4gICAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLCBwcml2YXRlIHNlcnZpY2U6IEZ1dHVyZVVzZXJTZXJ2aWNlKSB7IH1cbn1cbiJdfQ==
