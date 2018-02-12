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
var PrivacyPolicyService = (function () {
    function PrivacyPolicyService(apiService) {
        this.apiService = apiService;
    }
    PrivacyPolicyService.prototype.load = function (documentId) {
        return this.apiService.get(api_interface_1.Api.Identities, "document/downloadDocumentFile/" + documentId, { loadingIndicator: true, headerType: 'download' }).map(function (response) { return response.text(); });
    };
    PrivacyPolicyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], PrivacyPolicyService);
    return PrivacyPolicyService;
}());
exports.PrivacyPolicyService = PrivacyPolicyService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQTJDO0FBRzNDLGtEQUFzRDtBQUN0RCx1RUFBNEQ7QUFHNUQ7SUFDRSw4QkFBb0IsVUFBNEI7UUFBNUIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7SUFBSSxDQUFDO0lBRTlDLG1DQUFJLEdBQVgsVUFBWSxVQUFrQjtRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ3hCLG1CQUFHLENBQUMsVUFBVSxFQUNkLG1DQUFpQyxVQUFZLEVBQzdDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FDbkQsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFrQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFUVSxvQkFBb0I7UUFEaEMsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLG9CQUFvQixDQVVoQztJQUFELDJCQUFDO0NBVkQsQUFVQyxJQUFBO0FBVlksb0RBQW9CIiwiZmlsZSI6ImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJpdmFjeVBvbGljeVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEZ1dHVyZUFwaVNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBsb2FkKGRvY3VtZW50SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoXG4gICAgICBBcGkuSWRlbnRpdGllcyxcbiAgICAgIGBkb2N1bWVudC9kb3dubG9hZERvY3VtZW50RmlsZS8ke2RvY3VtZW50SWR9YCxcbiAgICAgIHsgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSwgaGVhZGVyVHlwZTogJ2Rvd25sb2FkJyB9XG4gICAgKS5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKTtcbiAgfVxufVxuIl19
