"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var InvoiceService = (function () {
    function InvoiceService(apiService) {
        this.apiService = apiService;
    }
    InvoiceService.prototype.load = function (orderId, shareKey) {
        var apiOptions = { loadingIndicator: true };
        if (shareKey)
            apiOptions = __assign({}, apiOptions, { overridingToken: shareKey });
        return this.apiService.get(api_interface_1.Api.Orders, "order/invoiceData/" + orderId, apiOptions);
    };
    InvoiceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], InvoiceService);
    return InvoiceService;
}());
exports.InvoiceService = InvoiceService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRzNDLGtEQUFzRDtBQUN0RCx1RUFBd0U7QUFJeEU7SUFDRSx3QkFBb0IsVUFBNEI7UUFBNUIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7SUFBSSxDQUFDO0lBRTlDLDZCQUFJLEdBQVgsVUFBWSxPQUFlLEVBQUUsUUFBaUI7UUFDNUMsSUFBSSxVQUFVLEdBQWUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN4RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFBQyxVQUFVLGdCQUFRLFVBQVUsSUFBRSxlQUFlLEVBQUUsUUFBUSxHQUFFLENBQUM7UUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsTUFBTSxFQUFFLHVCQUFxQixPQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQVBVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLGNBQWMsQ0FRMUI7SUFBRCxxQkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLHdDQUFjIiwiZmlsZSI6ImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2Uuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSwgQXBpT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSW52b2ljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnZvaWNlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGxvYWQob3JkZXJJZDogbnVtYmVyLCBzaGFyZUtleT86IHN0cmluZyk6IE9ic2VydmFibGU8SW52b2ljZT4ge1xuICAgIGxldCBhcGlPcHRpb25zOiBBcGlPcHRpb25zID0geyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH07XG4gICAgaWYgKHNoYXJlS2V5KSBhcGlPcHRpb25zID0geyAuLi5hcGlPcHRpb25zLCBvdmVycmlkaW5nVG9rZW46IHNoYXJlS2V5IH07XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoQXBpLk9yZGVycywgYG9yZGVyL2ludm9pY2VEYXRhLyR7b3JkZXJJZH1gLCBhcGlPcHRpb25zKTtcbiAgfVxufVxuIl19
