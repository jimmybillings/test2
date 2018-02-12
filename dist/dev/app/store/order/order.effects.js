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
var OrderActions = require("./order.actions");
var app_store_1 = require("../../app.store");
var order_service_1 = require("./order.service");
var OrderEffects = (function () {
    function OrderEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(OrderActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.load(action.orderId)
                .map(function (order) { return _this.store.create(function (factory) { return factory.order.loadSuccess(order); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.order.loadFailure(error); })); });
        });
        this.loadSuccess = this.actions.ofType(OrderActions.LoadSuccess.Type)
            .filter(function (action) { return _this.store.match(true, function (state) { return state.order.checkingOut; }); })
            .mergeMap(function (action) { return Observable_1.Observable.from([
            _this.store.create(function (factory) { return factory.order.setCheckoutState(false); }),
            _this.store.create(function (factory) { return factory.cart.load(); })
        ]); });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], OrderEffects.prototype, "load", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], OrderEffects.prototype, "loadSuccess", void 0);
    OrderEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, order_service_1.OrderService])
    ], OrderEffects);
    return OrderEffects;
}());
exports.OrderEffects = OrderEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9vcmRlci9vcmRlci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHlDQUFnRDtBQUNoRCw4Q0FBNkM7QUFJN0MsOENBQWdEO0FBQ2hELDZDQUEyQztBQUMzQyxpREFBK0M7QUFJL0M7SUFpQkUsc0JBQW9CLE9BQWdCLEVBQVUsS0FBZSxFQUFVLE9BQXFCO1FBQTVGLGlCQUFpRztRQUE3RSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFmckYsU0FBSSxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUMxRSxTQUFTLENBQUMsVUFBQyxNQUF5QjtZQUNuQyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7aUJBQzlCLEdBQUcsQ0FBQyxVQUFDLEtBQVksSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQWhDLENBQWdDLENBQUMsRUFBOUQsQ0FBOEQsQ0FBQztpQkFDckYsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDLEVBQTdFLENBQTZFLENBQUM7UUFGaEcsQ0FFZ0csQ0FDakcsQ0FBQztRQUdHLGdCQUFXLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ3hGLE1BQU0sQ0FBQyxVQUFDLE1BQWdDLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBdkIsQ0FBdUIsQ0FBQyxFQUF4RCxDQUF3RCxDQUFDO2FBQ3RHLFFBQVEsQ0FBQyxVQUFDLE1BQWMsSUFBSyxPQUFBLHVCQUFVLENBQUMsSUFBSSxDQUFDO1lBQzVDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztZQUNuRSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQW5CLENBQW1CLENBQUM7U0FDbEQsQ0FBQyxFQUg0QixDQUc1QixDQUFDLENBQUM7SUFFMEYsQ0FBQztJQWZqRztRQURDLGdCQUFNLEVBQUU7a0NBQ0ksdUJBQVU7OENBS25CO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNXLHVCQUFVO3FEQUt4QjtJQWZLLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FrQmtCLGlCQUFPLEVBQWlCLG9CQUFRLEVBQW1CLDRCQUFZO09BakJqRixZQUFZLENBa0J4QjtJQUFELG1CQUFDO0NBbEJELEFBa0JDLElBQUE7QUFsQlksb0NBQVkiLCJmaWxlIjoiYXBwL3N0b3JlL29yZGVyL29yZGVyLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0ICogYXMgT3JkZXJBY3Rpb25zIGZyb20gJy4vb3JkZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBPcmRlclNlcnZpY2UgfSBmcm9tICcuL29yZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3JkZXJFZmZlY3RzIHtcbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBsb2FkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKE9yZGVyQWN0aW9ucy5Mb2FkLlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBPcmRlckFjdGlvbnMuTG9hZCkgPT5cbiAgICAgIHRoaXMuc2VydmljZS5sb2FkKGFjdGlvbi5vcmRlcklkKVxuICAgICAgICAubWFwKChvcmRlcjogT3JkZXIpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5vcmRlci5sb2FkU3VjY2VzcyhvcmRlcikpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkub3JkZXIubG9hZEZhaWx1cmUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWRTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKE9yZGVyQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlKVxuICAgIC5maWx0ZXIoKGFjdGlvbjogT3JkZXJBY3Rpb25zLkxvYWRTdWNjZXNzKSA9PiB0aGlzLnN0b3JlLm1hdGNoKHRydWUsIHN0YXRlID0+IHN0YXRlLm9yZGVyLmNoZWNraW5nT3V0KSlcbiAgICAubWVyZ2VNYXAoKGFjdGlvbjogQWN0aW9uKSA9PiBPYnNlcnZhYmxlLmZyb20oW1xuICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5Lm9yZGVyLnNldENoZWNrb3V0U3RhdGUoZmFsc2UpKSxcbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5jYXJ0LmxvYWQoKSlcbiAgICBdKSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLCBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSwgcHJpdmF0ZSBzZXJ2aWNlOiBPcmRlclNlcnZpY2UpIHsgfVxufVxuIl19
