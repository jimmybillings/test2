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
var QuoteEditAssetResolver = (function () {
    function QuoteEditAssetResolver(store) {
        this.store = store;
    }
    QuoteEditAssetResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.asset.loadQuoteEditAsset(route.params.uuid); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    QuoteEditAssetResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], QuoteEditAssetResolver);
    return QuoteEditAssetResolver;
}());
exports.QuoteEditAssetResolver = QuoteEditAssetResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3RlLWVkaXQtYXNzZXQucmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFJM0MsZ0RBQThDO0FBRzlDO0lBQ0UsZ0NBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUVqQyx3Q0FBTyxHQUFkLFVBQWUsS0FBNkI7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQW5ELENBQW1ELENBQUMsQ0FBQztRQUVwRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFwQixDQUFvQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQVBVLHNCQUFzQjtRQURsQyxpQkFBVSxFQUFFO3lDQUVnQixvQkFBUTtPQUR4QixzQkFBc0IsQ0FRbEM7SUFBRCw2QkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLHdEQUFzQiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9zZXJ2aWNlcy9xdW90ZS1lZGl0LWFzc2V0LnJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBSZXNvbHZlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVvdGVFZGl0QXNzZXRSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8Ym9vbGVhbj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgcHVibGljIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5hc3NldC5sb2FkUXVvdGVFZGl0QXNzZXQocm91dGUucGFyYW1zLnV1aWQpKTtcblxuICAgIHJldHVybiB0aGlzLnN0b3JlLmJsb2NrVW50aWwoc3RhdGUgPT4gIXN0YXRlLmFzc2V0LmxvYWRpbmcpO1xuICB9XG59XG4iXX0=
