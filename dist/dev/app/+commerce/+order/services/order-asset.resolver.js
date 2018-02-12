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
var OrderAssetResolver = (function () {
    function OrderAssetResolver(store) {
        this.store = store;
    }
    OrderAssetResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.asset.loadOrderAsset(Number(route.params.id), route.params.uuid); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    OrderAssetResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], OrderAssetResolver);
    return OrderAssetResolver;
}());
exports.OrderAssetResolver = OrderAssetResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVyLWFzc2V0LnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBSTNDLGdEQUE4QztBQUc5QztJQUNFLDRCQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFJLENBQUM7SUFFakMsb0NBQU8sR0FBZCxVQUFlLEtBQTZCO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBeEUsQ0FBd0UsQ0FBQyxDQUFDO1FBRXpHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBUFUsa0JBQWtCO1FBRDlCLGlCQUFVLEVBQUU7eUNBRWdCLG9CQUFRO09BRHhCLGtCQUFrQixDQVE5QjtJQUFELHlCQUFDO0NBUkQsQUFRQyxJQUFBO0FBUlksZ0RBQWtCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVyLWFzc2V0LnJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBSZXNvbHZlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3JkZXJBc3NldFJlc29sdmVyIGltcGxlbWVudHMgUmVzb2x2ZTxib29sZWFuPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgcmVzb2x2ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmFzc2V0LmxvYWRPcmRlckFzc2V0KE51bWJlcihyb3V0ZS5wYXJhbXMuaWQpLCByb3V0ZS5wYXJhbXMudXVpZCkpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuYmxvY2tVbnRpbChzdGF0ZSA9PiAhc3RhdGUuYXNzZXQubG9hZGluZyk7XG4gIH1cbn1cbiJdfQ==
