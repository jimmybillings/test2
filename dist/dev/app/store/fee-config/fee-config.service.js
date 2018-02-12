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
var FeeConfigService = (function () {
    function FeeConfigService(apiService) {
        this.apiService = apiService;
    }
    FeeConfigService.prototype.loadFeeConfig = function () {
        return this.apiService.get(api_interface_1.Api.Identities, 'feeConfig/search', { loadingIndicator: true });
    };
    FeeConfigService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], FeeConfigService);
    return FeeConfigService;
}());
exports.FeeConfigService = FeeConfigService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHNDQUEyQztBQUUzQyxrREFBc0Q7QUFDdEQsdUVBQTREO0FBRzVEO0lBQ0UsMEJBQW9CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUksQ0FBQztJQUU5Qyx3Q0FBYSxHQUFwQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUxVLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUVxQiw4QkFBZ0I7T0FEckMsZ0JBQWdCLENBTTVCO0lBQUQsdUJBQUM7Q0FORCxBQU1DLElBQUE7QUFOWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL3N0b3JlL2ZlZS1jb25maWcvZmVlLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmVlQ29uZmlnIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmVlQ29uZmlnU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGxvYWRGZWVDb25maWcoKTogT2JzZXJ2YWJsZTxGZWVDb25maWc+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmdldChBcGkuSWRlbnRpdGllcywgJ2ZlZUNvbmZpZy9zZWFyY2gnLCB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSk7XG4gIH1cbn1cbiJdfQ==
