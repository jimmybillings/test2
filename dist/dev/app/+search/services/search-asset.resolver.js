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
var app_store_1 = require("../../app.store");
var SearchAssetResolver = (function () {
    function SearchAssetResolver(store) {
        this.store = store;
    }
    SearchAssetResolver.prototype.resolve = function (route) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.asset.loadSearchAsset(_this.convertToLoadParameters(route.params)); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    SearchAssetResolver.prototype.convertToLoadParameters = function (routeParameters) {
        return {
            id: routeParameters['id'],
            share_key: routeParameters['share_key'],
            timeEnd: routeParameters['timeEnd'],
            timeStart: routeParameters['timeStart']
        };
    };
    SearchAssetResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], SearchAssetResolver);
    return SearchAssetResolver;
}());
exports.SearchAssetResolver = SearchAssetResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlcnZpY2VzL3NlYXJjaC1hc3NldC5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUkzQyw2Q0FBMkM7QUFJM0M7SUFDRSw2QkFBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBSSxDQUFDO0lBRWpDLHFDQUFPLEdBQWQsVUFBZSxLQUE2QjtRQUE1QyxpQkFJQztRQUhDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUF6RSxDQUF5RSxDQUFDLENBQUM7UUFFMUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyxxREFBdUIsR0FBL0IsVUFBZ0MsZUFBcUI7UUFDbkQsTUFBTSxDQUFDO1lBQ0wsRUFBRSxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDekIsU0FBUyxFQUFFLGVBQWUsQ0FBQyxXQUFXLENBQUM7WUFDdkMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUM7WUFDbkMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxXQUFXLENBQUM7U0FDeEMsQ0FBQztJQUNKLENBQUM7SUFoQlUsbUJBQW1CO1FBRC9CLGlCQUFVLEVBQUU7eUNBRWdCLG9CQUFRO09BRHhCLG1CQUFtQixDQWlCL0I7SUFBRCwwQkFBQztDQWpCRCxBQWlCQyxJQUFBO0FBakJZLGtEQUFtQiIsImZpbGUiOiJhcHAvK3NlYXJjaC9zZXJ2aWNlcy9zZWFyY2gtYXNzZXQucmVzb2x2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFJlc29sdmUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBQb2pvLCBTZWFyY2hBc3NldExvYWRQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWFyY2hBc3NldFJlc29sdmVyIGltcGxlbWVudHMgUmVzb2x2ZTxib29sZWFuPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgcmVzb2x2ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmFzc2V0LmxvYWRTZWFyY2hBc3NldCh0aGlzLmNvbnZlcnRUb0xvYWRQYXJhbWV0ZXJzKHJvdXRlLnBhcmFtcykpKTtcblxuICAgIHJldHVybiB0aGlzLnN0b3JlLmJsb2NrVW50aWwoc3RhdGUgPT4gIXN0YXRlLmFzc2V0LmxvYWRpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0VG9Mb2FkUGFyYW1ldGVycyhyb3V0ZVBhcmFtZXRlcnM6IFBvam8pOiBTZWFyY2hBc3NldExvYWRQYXJhbWV0ZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHJvdXRlUGFyYW1ldGVyc1snaWQnXSxcbiAgICAgIHNoYXJlX2tleTogcm91dGVQYXJhbWV0ZXJzWydzaGFyZV9rZXknXSxcbiAgICAgIHRpbWVFbmQ6IHJvdXRlUGFyYW1ldGVyc1sndGltZUVuZCddLFxuICAgICAgdGltZVN0YXJ0OiByb3V0ZVBhcmFtZXRlcnNbJ3RpbWVTdGFydCddXG4gICAgfTtcbiAgfVxufVxuIl19
