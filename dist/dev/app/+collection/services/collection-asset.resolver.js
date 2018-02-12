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
var CollectionAssetResolver = (function () {
    function CollectionAssetResolver(store) {
        this.store = store;
    }
    CollectionAssetResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.asset.loadActiveCollectionAsset(route.params.uuid); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    CollectionAssetResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], CollectionAssetResolver);
    return CollectionAssetResolver;
}());
exports.CollectionAssetResolver = CollectionAssetResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLWFzc2V0LnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBSTNDLDZDQUEyQztBQUczQztJQUNFLGlDQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFJLENBQUM7SUFFakMseUNBQU8sR0FBZCxVQUFlLEtBQTZCO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUExRCxDQUEwRCxDQUFDLENBQUM7UUFFM0YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFQVSx1QkFBdUI7UUFEbkMsaUJBQVUsRUFBRTt5Q0FFZ0Isb0JBQVE7T0FEeEIsdUJBQXVCLENBUW5DO0lBQUQsOEJBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSwwREFBdUIiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL3NlcnZpY2VzL2NvbGxlY3Rpb24tYXNzZXQucmVzb2x2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFJlc29sdmUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uQXNzZXRSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8Ym9vbGVhbj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgcHVibGljIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5hc3NldC5sb2FkQWN0aXZlQ29sbGVjdGlvbkFzc2V0KHJvdXRlLnBhcmFtcy51dWlkKSk7XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yZS5ibG9ja1VudGlsKHN0YXRlID0+ICFzdGF0ZS5hc3NldC5sb2FkaW5nKTtcbiAgfVxufVxuIl19
