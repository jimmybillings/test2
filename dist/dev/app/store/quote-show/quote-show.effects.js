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
var effects_1 = require("@ngrx/effects");
var core_1 = require("@angular/core");
var QuoteShowActions = require("./quote-show.actions");
var quote_show_service_1 = require("./quote-show.service");
var app_store_1 = require("../../app.store");
var QuoteShowEffects = (function () {
    function QuoteShowEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(QuoteShowActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.load(action.quoteId)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteShow.loadSuccess(quote); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.quoteShow.loadFailure(error); })); });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], QuoteShowEffects.prototype, "load", void 0);
    QuoteShowEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, quote_show_service_1.FutureQuoteShowService])
    ], QuoteShowEffects);
    return QuoteShowEffects;
}());
exports.QuoteShowEffects = QuoteShowEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUU3Qyx5Q0FBZ0Q7QUFDaEQsc0NBQTJDO0FBRTNDLHVEQUF5RDtBQUN6RCwyREFBOEQ7QUFDOUQsNkNBQTJDO0FBRzNDO0lBU0UsMEJBQW9CLE9BQWdCLEVBQVUsS0FBZSxFQUFVLE9BQStCO1FBQXRHLGlCQUEyRztRQUF2RixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBUC9GLFNBQUksR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM5RSxTQUFTLENBQUMsVUFBQyxNQUE2QjtZQUN2QyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7aUJBQzlCLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQXBDLENBQW9DLENBQUMsRUFBbEUsQ0FBa0UsQ0FBQztpQkFDaEYsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDLEVBQWpGLENBQWlGLENBQUM7UUFGcEcsQ0FFb0csQ0FDckcsQ0FBQztJQUVzRyxDQUFDO0lBUDNHO1FBREMsZ0JBQU0sRUFBRTtrQ0FDSSx1QkFBVTtrREFLbkI7SUFQTyxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FVa0IsaUJBQU8sRUFBaUIsb0JBQVEsRUFBbUIsMkNBQXNCO09BVDNGLGdCQUFnQixDQVU1QjtJQUFELHVCQUFDO0NBVkQsQUFVQyxJQUFBO0FBVlksNENBQWdCIiwiZmlsZSI6ImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuZWZmZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIFF1b3RlU2hvd0FjdGlvbnMgZnJvbSAnLi9xdW90ZS1zaG93LmFjdGlvbnMnO1xuaW1wb3J0IHsgRnV0dXJlUXVvdGVTaG93U2VydmljZSB9IGZyb20gJy4vcXVvdGUtc2hvdy5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1b3RlU2hvd0VmZmVjdHMge1xuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUXVvdGVTaG93QWN0aW9ucy5Mb2FkLlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBRdW90ZVNob3dBY3Rpb25zLkxvYWQpID0+XG4gICAgICB0aGlzLnNlcnZpY2UubG9hZChhY3Rpb24ucXVvdGVJZClcbiAgICAgICAgLm1hcChxdW90ZSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVTaG93LmxvYWRTdWNjZXNzKHF1b3RlKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZVNob3cubG9hZEZhaWx1cmUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLCBwcml2YXRlIHNlcnZpY2U6IEZ1dHVyZVF1b3RlU2hvd1NlcnZpY2UpIHsgfVxufVxuIl19
