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
var FutureUserService = (function () {
    function FutureUserService(apiService) {
        this.apiService = apiService;
    }
    FutureUserService.prototype.getUsersByAccountId = function (accountId, loadingIndicator) {
        return this.apiService.get(api_interface_1.Api.Identities, 'user/searchFields', {
            loadingIndicator: loadingIndicator,
            parameters: { 'fields': 'accountId', 'values': "" + accountId, 'n': '500' }
        })
            .map(function (users) { return users.items; });
    };
    FutureUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], FutureUserService);
    return FutureUserService;
}());
exports.FutureUserService = FutureUserService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91c2VyL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUUzQyxrREFBc0Q7QUFDdEQsdUVBQW9GO0FBSXBGO0lBQ0UsMkJBQW9CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUksQ0FBQztJQUU5QywrQ0FBbUIsR0FBMUIsVUFBMkIsU0FBaUIsRUFBRSxnQkFBd0M7UUFDcEYsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUM1RDtZQUNFLGdCQUFnQixFQUFFLGdCQUFnQjtZQUNsQyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxLQUFHLFNBQVcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO1NBQzVFLENBQUM7YUFDRCxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsS0FBSyxFQUFYLENBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFWVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLGlCQUFpQixDQVk3QjtJQUFELHdCQUFDO0NBWkQsQUFZQyxJQUFBO0FBWlksOENBQWlCIiwiZmlsZSI6ImFwcC9zdG9yZS91c2VyL3VzZXIuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRnV0dXJlQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGksIExvYWRpbmdJbmRpY2F0b3JPcHRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGdXR1cmVVc2VyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGdldFVzZXJzQnlBY2NvdW50SWQoYWNjb3VudElkOiBudW1iZXIsIGxvYWRpbmdJbmRpY2F0b3I6IExvYWRpbmdJbmRpY2F0b3JPcHRpb24pOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZ2V0KEFwaS5JZGVudGl0aWVzLCAndXNlci9zZWFyY2hGaWVsZHMnLFxuICAgICAge1xuICAgICAgICBsb2FkaW5nSW5kaWNhdG9yOiBsb2FkaW5nSW5kaWNhdG9yLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7ICdmaWVsZHMnOiAnYWNjb3VudElkJywgJ3ZhbHVlcyc6IGAke2FjY291bnRJZH1gLCAnbic6ICc1MDAnIH1cbiAgICAgIH0pXG4gICAgICAubWFwKHVzZXJzID0+IHVzZXJzLml0ZW1zKTtcbiAgfVxuXG59XG4iXX0=
