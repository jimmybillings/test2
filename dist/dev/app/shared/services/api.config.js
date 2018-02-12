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
var http_1 = require("@angular/http");
var current_user_service_1 = require("./current-user.service");
var ApiConfig = (function () {
    function ApiConfig(currentUser) {
        this.currentUser = currentUser;
        this._portal = null;
        this._baseUrl = null;
    }
    Object.defineProperty(ApiConfig.prototype, "baseUrl", {
        get: function () {
            return this._baseUrl;
        },
        set: function (url) {
            this._baseUrl = url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiConfig.prototype, "portal", {
        get: function () {
            return this._portal;
        },
        set: function (portal) {
            this._portal = portal;
        },
        enumerable: true,
        configurable: true
    });
    ApiConfig.prototype.headers = function (overridingToken, headerType) {
        if (overridingToken === void 0) { overridingToken = ''; }
        if (headerType === void 0) { headerType = 'json'; }
        var token = '';
        if (overridingToken !== '') {
            token = overridingToken;
        }
        else if (this.currentUser.loggedIn()) {
            token = localStorage.getItem('token');
        }
        var headers = {
            'Content-Type': 'application/json',
        };
        if (token !== '') {
            headers['Authorization'] = "Bearer " + token;
        }
        switch (headerType) {
            case 'json':
                headers['Accept'] = 'application/json';
                break;
            case 'download':
                headers['Accept'] = 'application/octet-stream';
                break;
            case 'form-urlencoded':
                headers['Accept'] = 'application/json';
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
                break;
            default:
                headers['Accept'] = 'application/json';
                break;
        }
        return new http_1.Headers(headers);
    };
    ApiConfig = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService])
    ], ApiConfig);
    return ApiConfig;
}());
exports.ApiConfig = ApiConfig;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0M7QUFDeEMsK0RBQTREO0FBRzVEO0lBSUUsbUJBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUgzQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxJQUFJLENBQUM7SUFFdUIsQ0FBQztJQUV4RCxzQkFBVyw4QkFBTzthQUFsQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFtQixHQUFXO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsNkJBQU07YUFJakI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDO2FBTkQsVUFBa0IsTUFBYztZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQU1NLDJCQUFPLEdBQWQsVUFBZSxlQUE0QixFQUFFLFVBQTJCO1FBQXpELGdDQUFBLEVBQUEsb0JBQTRCO1FBQUUsMkJBQUEsRUFBQSxtQkFBMkI7UUFDdEUsSUFBSSxLQUFLLEdBQVcsRUFBRSxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsSUFBTSxPQUFPLEdBQTRCO1lBQ3ZDLGNBQWMsRUFBRSxrQkFBa0I7U0FDbkMsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxZQUFVLEtBQU8sQ0FBQztRQUMvQyxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLE1BQU07Z0JBQ1QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO2dCQUN2QyxLQUFLLENBQUM7WUFDUixLQUFLLFVBQVU7Z0JBQ2IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLDBCQUEwQixDQUFDO2dCQUMvQyxLQUFLLENBQUM7WUFDUixLQUFLLGlCQUFpQjtnQkFDcEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO2dCQUN2QyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsbUNBQW1DLENBQUM7Z0JBQzlELEtBQUssQ0FBQztZQUNSO2dCQUNFLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxrQkFBa0IsQ0FBQztnQkFDdkMsS0FBSyxDQUFDO1FBQ1YsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBeERVLFNBQVM7UUFEckIsaUJBQVUsRUFBRTt5Q0FLc0IseUNBQWtCO09BSnhDLFNBQVMsQ0F5RHJCO0lBQUQsZ0JBQUM7Q0F6REQsQUF5REMsSUFBQTtBQXpEWSw4QkFBUyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2FwaS5jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBDdXJyZW50VXNlclNlcnZpY2UgfSBmcm9tICcuL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwaUNvbmZpZyB7XG4gIHByaXZhdGUgX3BvcnRhbDogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSBfYmFzZVVybDogc3RyaW5nID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBnZXQgYmFzZVVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9iYXNlVXJsO1xuICB9XG5cbiAgcHVibGljIHNldCBiYXNlVXJsKHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IHVybDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcG9ydGFsKHBvcnRhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fcG9ydGFsID0gcG9ydGFsO1xuICB9XG5cbiAgcHVibGljIGdldCBwb3J0YWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsO1xuICB9XG5cbiAgcHVibGljIGhlYWRlcnMob3ZlcnJpZGluZ1Rva2VuOiBzdHJpbmcgPSAnJywgaGVhZGVyVHlwZTogc3RyaW5nID0gJ2pzb24nKTogSGVhZGVycyB7XG4gICAgbGV0IHRva2VuOiBzdHJpbmcgPSAnJztcblxuICAgIGlmIChvdmVycmlkaW5nVG9rZW4gIT09ICcnKSB7XG4gICAgICB0b2tlbiA9IG92ZXJyaWRpbmdUb2tlbjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFVzZXIubG9nZ2VkSW4oKSkge1xuICAgICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBoZWFkZXJzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfTtcblxuICAgIGlmICh0b2tlbiAhPT0gJycpIHtcbiAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICAgIH1cblxuICAgIHN3aXRjaCAoaGVhZGVyVHlwZSkge1xuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIGhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rvd25sb2FkJzpcbiAgICAgICAgaGVhZGVyc1snQWNjZXB0J10gPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdmb3JtLXVybGVuY29kZWQnOlxuICAgICAgICBoZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBoZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBIZWFkZXJzKGhlYWRlcnMpO1xuICB9XG59XG4iXX0=
