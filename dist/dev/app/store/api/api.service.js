"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var store_1 = require("@ngrx/store");
var http_1 = require("@angular/http");
var api_config_1 = require("../../shared/services/api.config");
var api_service_1 = require("../../shared/services/api.service");
var FutureApiService = (function (_super) {
    __extends(FutureApiService, _super);
    function FutureApiService(http, apiConfig, ngrxStore) {
        var _this = _super.call(this, http, apiConfig, ngrxStore) || this;
        _this.http = http;
        _this.apiConfig = apiConfig;
        _this.ngrxStore = ngrxStore;
        return _this;
    }
    FutureApiService.prototype.call = function (method, api, endpoint, options) {
        var _this = this;
        options = this.combineDefaultOptionsWith(options);
        this.showLoadingIndicatorDependingOn(options);
        return this.http.request(this.requestFor(method, api, endpoint, options))
            .map(function (response) { try {
            return response.json();
        }
        catch (exception) {
            return response;
        } })
            .do(function () { return _this.hideLoadingIndicatorDependingOn(options); }, function (error) { return _this.hideLoadingIndicatorDependingOn(options); });
    };
    FutureApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, api_config_1.ApiConfig, store_1.Store])
    ], FutureApiService);
    return FutureApiService;
}(api_service_1.ApiService));
exports.FutureApiService = FutureApiService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hcGkvYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHFDQUFvQztBQUNwQyxzQ0FBa0g7QUFHbEgsK0RBQTZEO0FBRTdELGlFQUErRDtBQUkvRDtJQUFzQyxvQ0FBVTtJQUM5QywwQkFBc0IsSUFBVSxFQUFZLFNBQW9CLEVBQVksU0FBMEI7UUFBdEcsWUFDRSxrQkFBTSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUNsQztRQUZxQixVQUFJLEdBQUosSUFBSSxDQUFNO1FBQVksZUFBUyxHQUFULFNBQVMsQ0FBVztRQUFZLGVBQVMsR0FBVCxTQUFTLENBQWlCOztJQUV0RyxDQUFDO0lBRVMsK0JBQUksR0FBZCxVQUFlLE1BQXFCLEVBQUUsR0FBUSxFQUFFLFFBQWdCLEVBQUUsT0FBbUI7UUFBckYsaUJBVUM7UUFUQyxPQUFPLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN0RSxHQUFHLENBQUMsVUFBQSxRQUFRLElBQU0sSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0YsRUFBRSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsK0JBQStCLENBQUMsT0FBTyxDQUFDLEVBQTdDLENBQTZDLEVBQ3ZELFVBQUMsS0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsRUFBN0MsQ0FBNkMsQ0FDekUsQ0FBQztJQUNOLENBQUM7SUFmVSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FFaUIsV0FBSSxFQUF1QixzQkFBUyxFQUF1QixhQUFLO09BRGpGLGdCQUFnQixDQWdCNUI7SUFBRCx1QkFBQztDQWhCRCxBQWdCQyxDQWhCcUMsd0JBQVUsR0FnQi9DO0FBaEJZLDRDQUFnQiIsImZpbGUiOiJhcHAvc3RvcmUvYXBpL2FwaS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBIdHRwLCBSZXF1ZXN0LCBSZXF1ZXN0TWV0aG9kLCBSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnNBcmdzLCBVUkxTZWFyY2hQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBBcGlDb25maWcgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpLmNvbmZpZyc7XG5pbXBvcnQgeyBBcGksIEFwaU9wdGlvbnMsIEFwaVBhcmFtZXRlcnMsIEFwaUJvZHksIEFwaUVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnV0dXJlQXBpU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cCwgcHJvdGVjdGVkIGFwaUNvbmZpZzogQXBpQ29uZmlnLCBwcm90ZWN0ZWQgbmdyeFN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4pIHtcbiAgICBzdXBlcihodHRwLCBhcGlDb25maWcsIG5ncnhTdG9yZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FsbChtZXRob2Q6IFJlcXVlc3RNZXRob2QsIGFwaTogQXBpLCBlbmRwb2ludDogc3RyaW5nLCBvcHRpb25zOiBBcGlPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zID0gdGhpcy5jb21iaW5lRGVmYXVsdE9wdGlvbnNXaXRoKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5zaG93TG9hZGluZ0luZGljYXRvckRlcGVuZGluZ09uKG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KHRoaXMucmVxdWVzdEZvcihtZXRob2QsIGFwaSwgZW5kcG9pbnQsIG9wdGlvbnMpKVxuICAgICAgLm1hcChyZXNwb25zZSA9PiB7IHRyeSB7IHJldHVybiByZXNwb25zZS5qc29uKCk7IH0gY2F0Y2ggKGV4Y2VwdGlvbikgeyByZXR1cm4gcmVzcG9uc2U7IH0gfSlcbiAgICAgIC5kbygoKSA9PiB0aGlzLmhpZGVMb2FkaW5nSW5kaWNhdG9yRGVwZW5kaW5nT24ob3B0aW9ucyksXG4gICAgICAoZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGlkZUxvYWRpbmdJbmRpY2F0b3JEZXBlbmRpbmdPbihvcHRpb25zKVxuICAgICAgKTtcbiAgfVxufVxuIl19
