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
var store_1 = require("@ngrx/store");
var http_1 = require("@angular/http");
var api_config_1 = require("./api.config");
var api_interface_1 = require("../interfaces/api.interface");
var ErrorActions = require("../../store/error/error.actions");
var LoadingIndicatorActions = require("../../store/loading-indicator/loading-indicator.actions");
var ApiService = (function () {
    function ApiService(http, apiConfig, ngrxStore) {
        this.http = http;
        this.apiConfig = apiConfig;
        this.ngrxStore = ngrxStore;
    }
    ApiService.prototype.get = function (api, endpoint, options) {
        if (options === void 0) { options = {}; }
        return this.call(http_1.RequestMethod.Get, api, endpoint, options);
    };
    ApiService.prototype.post = function (api, endpoint, options) {
        if (options === void 0) { options = {}; }
        return this.call(http_1.RequestMethod.Post, api, endpoint, options);
    };
    ApiService.prototype.put = function (api, endpoint, options) {
        if (options === void 0) { options = {}; }
        return this.call(http_1.RequestMethod.Put, api, endpoint, options);
    };
    ApiService.prototype.delete = function (api, endpoint, options) {
        if (options === void 0) { options = {}; }
        return this.call(http_1.RequestMethod.Delete, api, endpoint, options);
    };
    ApiService.prototype.call = function (method, api, endpoint, options) {
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
            .do(function () {
            _this.hideLoadingIndicatorDependingOn(options);
        }, function (error) {
            _this.hideLoadingIndicatorDependingOn(options);
            try {
                return error.json();
            }
            catch (exception) {
                _this.ngrxStore.dispatch(new ErrorActions.Handle(error));
            }
            return error;
        });
    };
    ApiService.prototype.combineDefaultOptionsWith = function (options) {
        return __assign({ parameters: {}, body: {}, loadingIndicator: false, overridingToken: '' }, options);
    };
    ApiService.prototype.showLoadingIndicatorDependingOn = function (options) {
        if (options.loadingIndicator === 'onBeforeRequest' || options.loadingIndicator === true) {
            this.ngrxStore.dispatch(new LoadingIndicatorActions.Show());
        }
    };
    ApiService.prototype.hideLoadingIndicatorDependingOn = function (options) {
        if (options.loadingIndicator === 'offAfterResponse' || options.loadingIndicator === true) {
            this.ngrxStore.dispatch(new LoadingIndicatorActions.Hide());
        }
    };
    ApiService.prototype.requestFor = function (method, api, endpoint, options) {
        return new http_1.Request(new http_1.RequestOptions({
            method: method,
            url: this.urlFor(api, endpoint),
            body: this.bodyJsonFrom(options.body),
            headers: this.apiConfig.headers(options.overridingToken, options.headerType),
            search: this.searchParametersFrom(options.parameters)
        }));
    };
    ApiService.prototype.urlFor = function (api, endpoint) {
        return "" + this.apiConfig.baseUrl + this.pathSegmentFor(api) + "-api/" + this.versionFor(api) + "/" + endpoint;
    };
    ApiService.prototype.pathSegmentFor = function (api) {
        return (api_interface_1.Api[api] || '?').toLowerCase();
    };
    ApiService.prototype.versionFor = function (api) {
        switch (api) {
            case api_interface_1.Api.Identities: return 'v1';
            case api_interface_1.Api.Assets: return 'v1';
            case api_interface_1.Api.Orders: return 'v1';
            default: return 'v?';
        }
        ;
    };
    ApiService.prototype.bodyJsonFrom = function (bodyObject) {
        return Array.isArray(bodyObject) ?
            JSON.stringify(bodyObject) :
            JSON.stringify(__assign({}, bodyObject, { siteName: this.apiConfig.portal }));
    };
    ApiService.prototype.searchParametersFrom = function (parameters) {
        var search = new http_1.URLSearchParams('', new CustomQueryEncoder());
        if (parameters['siteName'])
            console.error('Cannot set siteName externally.');
        Object.keys(parameters)
            .filter(function (parameter) { return (parameter !== 'siteName'); })
            .forEach(function (parameter) { return search.set(parameter, parameters[parameter]); });
        search.set('siteName', this.apiConfig.portal);
        return search;
    };
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, api_config_1.ApiConfig, store_1.Store])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
var CustomQueryEncoder = (function (_super) {
    __extends(CustomQueryEncoder, _super);
    function CustomQueryEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomQueryEncoder.prototype.encodeKey = function (k) {
        k = _super.prototype.encodeKey.call(this, k);
        return k.replace(/\+/gi, '%2B');
    };
    CustomQueryEncoder.prototype.encodeValue = function (v) {
        v = _super.prototype.encodeValue.call(this, v);
        return v.replace(/\+/gi, '%2B');
    };
    return CustomQueryEncoder;
}(http_1.QueryEncoder));
exports.CustomQueryEncoder = CustomQueryEncoder;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MscUNBQW9DO0FBQ3BDLHNDQUE0RztBQUc1RywyQ0FBeUM7QUFDekMsNkRBQXdHO0FBSXhHLDhEQUFnRTtBQUNoRSxpR0FBbUc7QUFHbkc7SUFFRSxvQkFBc0IsSUFBVSxFQUFZLFNBQW9CLEVBQVksU0FBMEI7UUFBaEYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFZLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBWSxjQUFTLEdBQVQsU0FBUyxDQUFpQjtJQUFJLENBQUM7SUFFcEcsd0JBQUcsR0FBVixVQUFXLEdBQVEsRUFBRSxRQUFnQixFQUFFLE9BQXdCO1FBQXhCLHdCQUFBLEVBQUEsWUFBd0I7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU0seUJBQUksR0FBWCxVQUFZLEdBQVEsRUFBRSxRQUFnQixFQUFFLE9BQXdCO1FBQXhCLHdCQUFBLEVBQUEsWUFBd0I7UUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sd0JBQUcsR0FBVixVQUFXLEdBQVEsRUFBRSxRQUFnQixFQUFFLE9BQXdCO1FBQXhCLHdCQUFBLEVBQUEsWUFBd0I7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU0sMkJBQU0sR0FBYixVQUFjLEdBQVEsRUFBRSxRQUFnQixFQUFF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Q0FBQztJQUNsQyxDQUFDO0lBQ0Qsd0NBQVcsR0FBWCxVQUFZLENBQVM7UUFDbkIsQ0FBQyxHQUFHLGlCQUFNLFdBQVcsWUFBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FUQSxBQVNDLENBVHVDLG1CQUFZLEdBU25EO0FBVFksZ0RBQWtCIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEh0dHAsIFJlcXVlc3QsIFJlcXVlc3RNZXRob2QsIFJlcXVlc3RPcHRpb25zLCBVUkxTZWFyY2hQYXJhbXMsIFF1ZXJ5RW5jb2RlciB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEFwaUNvbmZpZyB9IGZyb20gJy4vYXBpLmNvbmZpZyc7XG5pbXBvcnQgeyBBcGksIEFwaU9wdGlvbnMsIEFwaVBhcmFtZXRlcnMsIEFwaUJvZHksIEFwaUVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG4vLyBXb3JrIHdpdGggdGhlc2UgZGlyZWN0bHkgc28gdGhhdCB3ZSBkb24ndCBuZWVkIEFwcFN0b3JlLiAgUHJldmVudHMgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGluIExlZ2FjeVNlcnZpY2VzLlxuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0ICogYXMgRXJyb3JBY3Rpb25zIGZyb20gJy4uLy4uL3N0b3JlL2Vycm9yL2Vycm9yLmFjdGlvbnMnO1xuaW1wb3J0ICogYXMgTG9hZGluZ0luZGljYXRvckFjdGlvbnMgZnJvbSAnLi4vLi4vc3RvcmUvbG9hZGluZy1pbmRpY2F0b3IvbG9hZGluZy1pbmRpY2F0b3IuYWN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlIHtcbiAgLy8gTk9URSB0aGF0IGFsbCBcInByaXZhdGVcIiBwcm9wZXJ0aWVzIGFyZSB0ZW1wb3JhcmlseSBcInByb3RlY3RlZFwiIHRvIGFsbG93IEZ1dHVyZUFwaVNlcnZpY2UgdG8gb3ZlcnJpZGUvYWNjZXNzIHRoZW0gYXMgbmVlZGVkLlxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cCwgcHJvdGVjdGVkIGFwaUNvbmZpZzogQXBpQ29uZmlnLCBwcm90ZWN0ZWQgbmdyeFN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4pIHsgfVxuXG4gIHB1YmxpYyBnZXQoYXBpOiBBcGksIGVuZHBvaW50OiBzdHJpbmcsIG9wdGlvbnM6IEFwaU9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbChSZXF1ZXN0TWV0aG9kLkdldCwgYXBpLCBlbmRwb2ludCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgcG9zdChhcGk6IEFwaSwgZW5kcG9pbnQ6IHN0cmluZywgb3B0aW9uczogQXBpT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jYWxsKFJlcXVlc3RNZXRob2QuUG9zdCwgYXBpLCBlbmRwb2ludCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgcHV0KGFwaTogQXBpLCBlbmRwb2ludDogc3RyaW5nLCBvcHRpb25zOiBBcGlPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNhbGwoUmVxdWVzdE1ldGhvZC5QdXQsIGFwaSwgZW5kcG9pbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZShhcGk6IEFwaSwgZW5kcG9pbnQ6IHN0cmluZywgb3B0aW9uczogQXBpT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jYWxsKFJlcXVlc3RNZXRob2QuRGVsZXRlLCBhcGksIGVuZHBvaW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIC8vLy8gRU5EIE9GIFBVQkxJQyBJTlRFUkZBQ0VcbiAgLy8gTk9URSB0aGF0IGFsbCBcInByaXZhdGVcIiBtZXRob2RzIGFyZSB0ZW1wb3JhcmlseSBcInByb3RlY3RlZFwiIHRvIGFsbG93IEZ1dHVyZUFwaVNlcnZpY2UgdG8gb3ZlcnJpZGUvYWNjZXNzIGFzIG5lY2Vzc2FyeS5cbiAgcHJvdGVjdGVkIGNhbGwobWV0aG9kOiBSZXF1ZXN0TWV0aG9kLCBhcGk6IEFwaSwgZW5kcG9pbnQ6IHN0cmluZywgb3B0aW9uczogQXBpT3B0aW9ucyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucyA9IHRoaXMuY29tYmluZURlZmF1bHRPcHRpb25zV2l0aChvcHRpb25zKTtcblxuICAgIHRoaXMuc2hvd0xvYWRpbmdJbmRpY2F0b3JEZXBlbmRpbmdPbihvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCh0aGlzLnJlcXVlc3RGb3IobWV0aG9kLCBhcGksIGVuZHBvaW50LCBvcHRpb25zKSlcbiAgICAgIC5tYXAocmVzcG9uc2UgPT4geyB0cnkgeyByZXR1cm4gcmVzcG9uc2UuanNvbigpOyB9IGNhdGNoIChleGNlcHRpb24pIHsgcmV0dXJuIHJlc3BvbnNlOyB9IH0pXG4gICAgICAuZG8oKCkgPT4ge1xuICAgICAgICB0aGlzLmhpZGVMb2FkaW5nSW5kaWNhdG9yRGVwZW5kaW5nT24ob3B0aW9ucyk7XG4gICAgICB9LCAoZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5oaWRlTG9hZGluZ0luZGljYXRvckRlcGVuZGluZ09uKG9wdGlvbnMpO1xuXG4gICAgICAgIHRyeSB7IHJldHVybiBlcnJvci5qc29uKCk7IH0gY2F0Y2ggKGV4Y2VwdGlvbikgeyB0aGlzLm5ncnhTdG9yZS5kaXNwYXRjaChuZXcgRXJyb3JBY3Rpb25zLkhhbmRsZShlcnJvcikpOyB9XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbWJpbmVEZWZhdWx0T3B0aW9uc1dpdGgob3B0aW9uczogQXBpT3B0aW9ucyk6IEFwaU9wdGlvbnMge1xuICAgIHJldHVybiB7IHBhcmFtZXRlcnM6IHt9LCBib2R5OiB7fSwgbG9hZGluZ0luZGljYXRvcjogZmFsc2UsIG92ZXJyaWRpbmdUb2tlbjogJycsIC4uLm9wdGlvbnMgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzaG93TG9hZGluZ0luZGljYXRvckRlcGVuZGluZ09uKG9wdGlvbnM6IEFwaU9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAob3B0aW9ucy5sb2FkaW5nSW5kaWNhdG9yID09PSAnb25CZWZvcmVSZXF1ZXN0JyB8fCBvcHRpb25zLmxvYWRpbmdJbmRpY2F0b3IgPT09IHRydWUpIHtcbiAgICAgIHRoaXMubmdyeFN0b3JlLmRpc3BhdGNoKG5ldyBMb2FkaW5nSW5kaWNhdG9yQWN0aW9ucy5TaG93KCkpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBoaWRlTG9hZGluZ0luZGljYXRvckRlcGVuZGluZ09uKG9wdGlvbnM6IEFwaU9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAob3B0aW9ucy5sb2FkaW5nSW5kaWNhdG9yID09PSAnb2ZmQWZ0ZXJSZXNwb25zZScgfHwgb3B0aW9ucy5sb2FkaW5nSW5kaWNhdG9yID09PSB0cnVlKSB7XG4gICAgICB0aGlzLm5ncnhTdG9yZS5kaXNwYXRjaChuZXcgTG9hZGluZ0luZGljYXRvckFjdGlvbnMuSGlkZSgpKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWVzdEZvcihtZXRob2Q6IFJlcXVlc3RNZXRob2QsIGFwaTogQXBpLCBlbmRwb2ludDogc3RyaW5nLCBvcHRpb25zOiBBcGlPcHRpb25zKTogUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KFxuICAgICAgbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHVybDogdGhpcy51cmxGb3IoYXBpLCBlbmRwb2ludCksXG4gICAgICAgIGJvZHk6IHRoaXMuYm9keUpzb25Gcm9tKG9wdGlvbnMuYm9keSksXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuYXBpQ29uZmlnLmhlYWRlcnMob3B0aW9ucy5vdmVycmlkaW5nVG9rZW4sIG9wdGlvbnMuaGVhZGVyVHlwZSksXG4gICAgICAgIHNlYXJjaDogdGhpcy5zZWFyY2hQYXJhbWV0ZXJzRnJvbShvcHRpb25zLnBhcmFtZXRlcnMpXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXJsRm9yKGFwaTogQXBpLCBlbmRwb2ludDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYXBpQ29uZmlnLmJhc2VVcmx9JHt0aGlzLnBhdGhTZWdtZW50Rm9yKGFwaSl9LWFwaS8ke3RoaXMudmVyc2lvbkZvcihhcGkpfS8ke2VuZHBvaW50fWA7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGF0aFNlZ21lbnRGb3IoYXBpOiBBcGkpOiBzdHJpbmcge1xuICAgIHJldHVybiAoQXBpW2FwaV0gfHwgJz8nKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHZlcnNpb25Gb3IoYXBpOiBBcGkpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICBjYXNlIEFwaS5JZGVudGl0aWVzOiByZXR1cm4gJ3YxJztcbiAgICAgIGNhc2UgQXBpLkFzc2V0czogcmV0dXJuICd2MSc7XG4gICAgICBjYXNlIEFwaS5PcmRlcnM6IHJldHVybiAndjEnO1xuICAgICAgZGVmYXVsdDogcmV0dXJuICd2Pyc7XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBib2R5SnNvbkZyb20oYm9keU9iamVjdDogQXBpQm9keSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYm9keU9iamVjdCkgP1xuICAgICAgSlNPTi5zdHJpbmdpZnkoYm9keU9iamVjdCkgOlxuICAgICAgSlNPTi5zdHJpbmdpZnkoeyAuLi5ib2R5T2JqZWN0LCBzaXRlTmFtZTogdGhpcy5hcGlDb25maWcucG9ydGFsIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNlYXJjaFBhcmFtZXRlcnNGcm9tKHBhcmFtZXRlcnM6IEFwaVBhcmFtZXRlcnMpOiBVUkxTZWFyY2hQYXJhbXMge1xuICAgIGNvbnN0IHNlYXJjaDogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygnJywgbmV3IEN1c3RvbVF1ZXJ5RW5jb2RlcigpKTtcblxuICAgIGlmIChwYXJhbWV0ZXJzWydzaXRlTmFtZSddKSBjb25zb2xlLmVycm9yKCdDYW5ub3Qgc2V0IHNpdGVOYW1lIGV4dGVybmFsbHkuJyk7XG5cbiAgICBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKVxuICAgICAgLmZpbHRlcihwYXJhbWV0ZXIgPT4gKHBhcmFtZXRlciAhPT0gJ3NpdGVOYW1lJykpXG4gICAgICAuZm9yRWFjaChwYXJhbWV0ZXIgPT4gc2VhcmNoLnNldChwYXJhbWV0ZXIsIHBhcmFtZXRlcnNbcGFyYW1ldGVyXSkpO1xuXG4gICAgc2VhcmNoLnNldCgnc2l0ZU5hbWUnLCB0aGlzLmFwaUNvbmZpZy5wb3J0YWwpO1xuXG4gICAgcmV0dXJuIHNlYXJjaDtcbiAgfVxufVxuXG4vKlxuICogQ3VzdG9tUXVlcnlFbmNvZGVyXG4gKiBGaXggcGx1cyBzaWduICgrKSBub3QgZW5jb2RpbmcsIHNvIHNlbnQgYXMgYmxhbmsgc3BhY2VcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTEwNTgjaXNzdWVjb21tZW50LTI0NzM2NzMxOFxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tUXVlcnlFbmNvZGVyIGV4dGVuZHMgUXVlcnlFbmNvZGVyIHtcbiAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgayA9IHN1cGVyLmVuY29kZUtleShrKTtcbiAgICByZXR1cm4gay5yZXBsYWNlKC9cXCsvZ2ksICclMkInKTtcbiAgfVxuICBlbmNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHYgPSBzdXBlci5lbmNvZGVWYWx1ZSh2KTtcbiAgICByZXR1cm4gdi5yZXBsYWNlKC9cXCsvZ2ksICclMkInKTtcbiAgfVxufVxuIl19
