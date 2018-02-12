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
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var FutureQuoteShowService = (function () {
    function FutureQuoteShowService(apiService) {
        this.apiService = apiService;
    }
    FutureQuoteShowService.prototype.load = function (quoteId) {
        return this.apiService.get(api_interface_1.Api.Orders, "quote/" + quoteId, { loadingIndicator: true });
    };
    FutureQuoteShowService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], FutureQuoteShowService);
    return FutureQuoteShowService;
}());
exports.FutureQuoteShowService = FutureQuoteShowService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUkzQyxrREFBc0Q7QUFDdEQsdUVBQTREO0FBRzVEO0lBQ0UsZ0NBQW9CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUksQ0FBQztJQUU5QyxxQ0FBSSxHQUFYLFVBQVksT0FBZTtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBUyxPQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFMVSxzQkFBc0I7UUFEbEMsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLHNCQUFzQixDQU1sQztJQUFELDZCQUFDO0NBTkQsQUFNQyxJQUFBO0FBTlksd0RBQXNCIiwiZmlsZSI6ImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBRdW90ZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnV0dXJlUXVvdGVTaG93U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGxvYWQocXVvdGVJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZ2V0KEFwaS5PcmRlcnMsIGBxdW90ZS8ke3F1b3RlSWR9YCwgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pO1xuICB9XG59XG4iXX0=
