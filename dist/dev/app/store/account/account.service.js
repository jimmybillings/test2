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
var AccountService = (function () {
    function AccountService(apiService) {
        this.apiService = apiService;
    }
    AccountService.prototype.getAccount = function (accountId, loadingIndicator) {
        return this.apiService.get(api_interface_1.Api.Identities, "account/" + accountId, { loadingIndicator: loadingIndicator });
    };
    AccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUEyQztBQUUzQyxrREFBc0Q7QUFDdEQsdUVBQW9GO0FBSXBGO0lBQ0Usd0JBQW9CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUksQ0FBQztJQUU5QyxtQ0FBVSxHQUFqQixVQUFrQixTQUFpQixFQUFFLGdCQUF3QztRQUMzRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsYUFBVyxTQUFXLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUxVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLGNBQWMsQ0FNMUI7SUFBRCxxQkFBQztDQU5ELEFBTUMsSUFBQTtBQU5ZLHdDQUFjIiwiZmlsZSI6ImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSwgTG9hZGluZ0luZGljYXRvck9wdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VuZERldGFpbHNCaWxsaW5nQWNjb3VudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY2NvdW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGdldEFjY291bnQoYWNjb3VudElkOiBudW1iZXIsIGxvYWRpbmdJbmRpY2F0b3I6IExvYWRpbmdJbmRpY2F0b3JPcHRpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZ2V0KEFwaS5JZGVudGl0aWVzLCBgYWNjb3VudC8ke2FjY291bnRJZH1gLCB7IGxvYWRpbmdJbmRpY2F0b3I6IGxvYWRpbmdJbmRpY2F0b3IgfSk7XG4gIH1cbn1cbiJdfQ==
