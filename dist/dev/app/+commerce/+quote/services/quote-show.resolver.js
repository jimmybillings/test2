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
var app_store_1 = require("../../../app.store");
var QuoteShowResolver = (function () {
    function QuoteShowResolver(store) {
        this.store = store;
    }
    QuoteShowResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.quoteShow.load(parseInt(route.params.id)); });
        return this.store.blockUntil(function (state) { return !state.quoteShow.loading; });
    };
    QuoteShowResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], QuoteShowResolver);
    return QuoteShowResolver;
}());
exports.QuoteShowResolver = QuoteShowResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3RlLXNob3cucmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFJM0MsZ0RBQThDO0FBRzlDO0lBQ0UsMkJBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUV4QyxtQ0FBTyxHQUFQLFVBQVEsS0FBNkI7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7UUFFbEYsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFQVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FFZ0Isb0JBQVE7T0FEeEIsaUJBQWlCLENBUTdCO0lBQUQsd0JBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSw4Q0FBaUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvc2VydmljZXMvcXVvdGUtc2hvdy5yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc29sdmUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFF1b3RlU2hvd1Jlc29sdmVyIGltcGxlbWVudHMgUmVzb2x2ZTxib29sZWFuPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVTaG93LmxvYWQocGFyc2VJbnQocm91dGUucGFyYW1zLmlkKSkpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuYmxvY2tVbnRpbChzdGF0ZSA9PiAhc3RhdGUucXVvdGVTaG93LmxvYWRpbmcpO1xuICB9XG59XG4iXX0=
