"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var api_service_1 = require("../services/api.service");
var mock_api_matchers_1 = require("./mock-api.matchers");
exports.mockApiMatchers = mock_api_matchers_1.mockApiMatchers;
;
var MockApiService = (function () {
    function MockApiService() {
        this.callCounter = { get: 0, put: 0, post: 0, delete: 0 };
        this._getResponse = [{ responseFor: 'get' }];
        this._postResponse = [{ responseFor: 'post' }];
        this._putResponse = [{ responseFor: 'put' }];
        this._deleteResponse = [{ responseFor: 'delete' }];
        this.initialize();
    }
    Object.defineProperty(MockApiService.prototype, "injector", {
        get: function () {
            return this.apiService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockApiService.prototype, "getResponse", {
        get: function () {
            return (this._getResponse.length === 1) ? this._getResponse[0] : this._getResponse;
        },
        set: function (response) {
            this._getResponse = (Array.isArray(response)) ? response : [response];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockApiService.prototype, "putResponse", {
        get: function () {
            return (this._putResponse.length === 1) ? this._putResponse[0] : this._putResponse;
        },
        set: function (response) {
            this._putResponse = (Array.isArray(response)) ? response : [response];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockApiService.prototype, "postResponse", {
        get: function () {
            return (this._postResponse.length === 1) ? this._postResponse[0] : this._postResponse;
        },
        set: function (response) {
            this._postResponse = (Array.isArray(response)) ? response : [response];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockApiService.prototype, "deleteResponse", {
        get: function () {
            return (this._deleteResponse.length === 1) ? this._deleteResponse[0] : this._deleteResponse;
        },
        set: function (response) {
            this._deleteResponse = (Array.isArray(response)) ? response : [response];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockApiService.prototype, "get", {
        get: function () { return this.spies.get; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockApiService.prototype, "post", {
        get: function () { return this.spies.post; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockApiService.prototype, "put", {
        get: function () { return this.spies.put; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockApiService.prototype, "delete", {
        get: function () { return this.spies.delete; },
        enumerable: true,
        configurable: true
    });
    MockApiService.prototype.initialize = function () {
        var _this = this;
        this.apiService = new api_service_1.ApiService(null, null, null);
        this.spies = {
            get: spyOn(this.apiService, 'get').and.callFake(function () {
                if (_this.getError) {
                    return Observable_1.Observable.throw(_this.getError);
                }
                else {
                    var counter = _this.callCounter.get;
                    if (_this.callCounter.get !== _this._getResponse.length - 1)
                        _this.callCounter.get++;
                    return Observable_1.Observable.of(_this._getResponse[counter]);
                }
            }),
            post: spyOn(this.apiService, 'post').and.callFake(function () {
                if (_this.postError) {
                    return Observable_1.Observable.throw(_this.postError);
                }
                else {
                    var counter = _this.callCounter.post;
                    if (_this.callCounter.post !== _this._postResponse.length - 1)
                        _this.callCounter.post++;
                    return Observable_1.Observable.of(_this._postResponse[counter]);
                }
            }),
            put: spyOn(this.apiService, 'put').and.callFake(function () {
                if (_this.putError) {
                    return Observable_1.Observable.throw(_this.putError);
                }
                else {
                    var counter = _this.callCounter.put;
                    if (_this.callCounter.put !== _this._putResponse.length - 1)
                        _this.callCounter.put++;
                    return Observable_1.Observable.of(_this._putResponse[counter]);
                }
            }),
            delete: spyOn(this.apiService, 'delete').and.callFake(function () {
                if (_this.deleteError) {
                    return Observable_1.Observable.throw(_this.deleteError);
                }
                else {
                    var counter = _this.callCounter.delete;
                    if (_this.callCounter.delete !== _this._deleteResponse.length - 1)
                        _this.callCounter.delete++;
                    return Observable_1.Observable.of(_this._deleteResponse[counter]);
                }
            })
        };
    };
    return MockApiService;
}());
exports.MockApiService = MockApiService;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9ja3MvbW9jay1hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUU3Qyx1REFBcUQ7QUFJckQseURBQXNEO0FBQTdDLDhDQUFBLGVBQWUsQ0FBQTtBQUV5RCxDQUFDO0FBRWxGO0lBNkJFO1FBakJRLGdCQUFXLEdBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBWWxFLGlCQUFZLEdBQXVCLENBQUMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM1RCxrQkFBYSxHQUF1QixDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDOUQsaUJBQVksR0FBdUIsQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzVELG9CQUFlLEdBQXVCLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUd4RSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUdELHNCQUFXLG9DQUFRO2FBQW5CO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx1Q0FBVzthQUF0QjtZQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3JGLENBQUM7YUFFRCxVQUF1QixRQUEwQztZQUMvRCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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Q0FBQztJQUNKLENBQUM7SUFDSCxxQkFBQztBQUFELENBMUhBLEFBMEhDLElBQUE7QUExSFksd0NBQWM7QUE0SGtGLENBQUMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2Nrcy9tb2NrLWFwaS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGlSZXNwb25zZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbi8vIEFkZCB0aGVzZSB0byBhIGJlZm9yZUVhY2goKSBtZXRob2Qgd2l0aCBhZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpLlxuZXhwb3J0IHsgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi9tb2NrLWFwaS5tYXRjaGVycyc7XG5cbmludGVyZmFjZSBDYWxsQ291bnRlciB7IGdldDogbnVtYmVyOyBwdXQ6IG51bWJlcjsgcG9zdDogbnVtYmVyOyBkZWxldGU6IG51bWJlcjsgfTtcblxuZXhwb3J0IGNsYXNzIE1vY2tBcGlTZXJ2aWNlIHtcbiAgLy8gRXJyb3JzOlxuICAvLyBUaGVzZSBhcmUgbm9ybWFsbHkgZG9ybWFudCwgYnV0IGlmIHlvdSBzZXQgdGhlbSB0byBzb21ldGhpbmcsIHRoZW4gdGhlXG4gIC8vIHNweSdzIHJldHVybmVkIE9ic2VydmFibGUgd2lsbCB0aHJvdyB5b3VyIHNwZWNpZmllZCBlcnJvciB2YWx1ZSAoaW5zdGVhZCBvZlxuICAvLyBlbWl0dGluZyB0aGUgbm9ybWFsIHJlc3BvbnNlKSB3aGVuIHRoZSBzcHkgaXMgY2FsbGVkLlxuICBwdWJsaWMgZ2V0RXJyb3I6IGFueTtcbiAgcHVibGljIHBvc3RFcnJvcjogYW55O1xuICBwdWJsaWMgcHV0RXJyb3I6IGFueTtcbiAgcHVibGljIGRlbGV0ZUVycm9yOiBhbnk7XG5cbiAgcHJpdmF0ZSBzcGllczogTW9ja0FwaVNlcnZpY2VTcGllcztcbiAgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlTZXJ2aWNlO1xuICBwcml2YXRlIGNhbGxDb3VudGVyOiBDYWxsQ291bnRlciA9IHsgZ2V0OiAwLCBwdXQ6IDAsIHBvc3Q6IDAsIGRlbGV0ZTogMCB9O1xuXG4gIC8vIFJlc3BvbnNlczpcbiAgLy8gU2V0IHRoZXNlIGlmIHlvdSBjYXJlIGFib3V0IHRoZSBjb250ZW50cyBvZiBhIHNwZWNpZmljIHJlc3BvbnNlXG4gIC8vIChzbyB5b3UgY2FuIHZlcmlmeSB0aGF0IHNvbWUgb3RoZXIgY29kZSB1c2VzIHNvbWUgcGFydCBvZiB0aGF0IHJlc3BvbnNlKS5cbiAgLy9cbiAgLy8gT3RoZXJ3aXNlLCB5b3UgY2FuIGp1c3QgdXNlIHRoZW0gYXMtaXMgdG8gdmVyaWZ5IHRoYXQgdGhlIGFwcHJvcHJpYXRlXG4gIC8vIHJlc3BvbnNlIHdhcyBwYXNzZWQgYWxvbmcgdG8gc29tZSBvdGhlciBjb2RlLlxuICAvL1xuICAvLyBOb3RlIGFsc28gdGhhdCB0aGUgaW5pdGlhbCB2YWx1ZXMgZm9yIHRoZXNlIHJlc3BvbnNlcyBhcmUgd29ydGhsZXNzLFxuICAvLyBidXQgdGhlcmUgaXMgKnNvbWV0aGluZyogaW4gdGhlcmUgc28gdGhhdCB0aGUgbGlrZWxpaG9vZCBvZiBhY2NpZGVudGFsbHlcbiAgLy8gbWF0Y2hpbmcgdGhlc2UgcmVzcG9uc2VzIGluIHJlYWwgc3BlY3MgaXMgYWxtb3N0IHplcm8uXG4gIHByaXZhdGUgX2dldFJlc3BvbnNlOiBBcnJheTxBcGlSZXNwb25zZT4gPSBbeyByZXNwb25zZUZvcjogJ2dldCcgfV07XG4gIHByaXZhdGUgX3Bvc3RSZXNwb25zZTogQXJyYXk8QXBpUmVzcG9uc2U+ID0gW3sgcmVzcG9uc2VGb3I6ICdwb3N0JyB9XTtcbiAgcHJpdmF0ZSBfcHV0UmVzcG9uc2U6IEFycmF5PEFwaVJlc3BvbnNlPiA9IFt7IHJlc3BvbnNlRm9yOiAncHV0JyB9XTtcbiAgcHJpdmF0ZSBfZGVsZXRlUmVzcG9uc2U6IEFycmF5PEFwaVJlc3BvbnNlPiA9IFt7IHJlc3BvbnNlRm9yOiAnZGVsZXRlJyB9XTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8vIEluamVjdCB0aGlzIGludG8gdGhlIHNlcnZpY2UgeW91IGFyZSB0ZXN0aW5nLlxuICBwdWJsaWMgZ2V0IGluamVjdG9yKCk6IEFwaVNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGdldFJlc3BvbnNlKCk6IEFwaVJlc3BvbnNlIHwgQXJyYXk8QXBpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gKHRoaXMuX2dldFJlc3BvbnNlLmxlbmd0aCA9PT0gMSkgPyB0aGlzLl9nZXRSZXNwb25zZVswXSA6IHRoaXMuX2dldFJlc3BvbnNlO1xuICB9XG5cbiAgcHVibGljIHNldCBnZXRSZXNwb25zZShyZXNwb25zZTogQXBpUmVzcG9uc2UgfCBBcnJheTxBcGlSZXNwb25zZT4pIHtcbiAgICB0aGlzLl9nZXRSZXNwb25zZSA9IChBcnJheS5pc0FycmF5KHJlc3BvbnNlKSkgPyByZXNwb25zZSA6IFtyZXNwb25zZV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IHB1dFJlc3BvbnNlKCk6IEFwaVJlc3BvbnNlIHwgQXJyYXk8QXBpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gKHRoaXMuX3B1dFJlc3BvbnNlLmxlbmd0aCA9PT0gMSkgPyB0aGlzLl9wdXRSZXNwb25zZVswXSA6IHRoaXMuX3B1dFJlc3BvbnNlO1xuICB9XG5cbiAgcHVibGljIHNldCBwdXRSZXNwb25zZShyZXNwb25zZTogQXBpUmVzcG9uc2UgfCBBcnJheTxBcGlSZXNwb25zZT4pIHtcbiAgICB0aGlzLl9wdXRSZXNwb25zZSA9IChBcnJheS5pc0FycmF5KHJlc3BvbnNlKSkgPyByZXNwb25zZSA6IFtyZXNwb25zZV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBvc3RSZXNwb25zZSgpOiBBcGlSZXNwb25zZSB8IEFycmF5PEFwaVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuICh0aGlzLl9wb3N0UmVzcG9uc2UubGVuZ3RoID09PSAxKSA/IHRoaXMuX3Bvc3RSZXNwb25zZVswXSA6IHRoaXMuX3Bvc3RSZXNwb25zZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcG9zdFJlc3BvbnNlKHJlc3BvbnNlOiBBcGlSZXNwb25zZSB8IEFycmF5PEFwaVJlc3BvbnNlPikge1xuICAgIHRoaXMuX3Bvc3RSZXNwb25zZSA9IChBcnJheS5pc0FycmF5KHJlc3BvbnNlKSkgPyByZXNwb25zZSA6IFtyZXNwb25zZV07XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRlbGV0ZVJlc3BvbnNlKCk6IEFwaVJlc3BvbnNlIHwgQXJyYXk8QXBpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gKHRoaXMuX2RlbGV0ZVJlc3BvbnNlLmxlbmd0aCA9PT0gMSkgPyB0aGlzLl9kZWxldGVSZXNwb25zZVswXSA6IHRoaXMuX2RlbGV0ZVJlc3BvbnNlO1xuICB9XG5cbiAgcHVibGljIHNldCBkZWxldGVSZXNwb25zZShyZXNwb25zZTogQXBpUmVzcG9uc2UgfCBBcnJheTxBcGlSZXNwb25zZT4pIHtcbiAgICB0aGlzLl9kZWxldGVSZXNwb25zZSA9IChBcnJheS5pc0FycmF5KHJlc3BvbnNlKSkgPyByZXNwb25zZSA6IFtyZXNwb25zZV07XG4gIH1cblxuICAvLyBTcGllczpcbiAgLy8gVXNlIHRoZXNlIGluIHlvdXIgamFzbWluZSBleHBlY3RhdGlvbnMuXG4gIHB1YmxpYyBnZXQgZ2V0KCk6IGphc21pbmUuU3B5IHsgcmV0dXJuIHRoaXMuc3BpZXMuZ2V0OyB9XG4gIHB1YmxpYyBnZXQgcG9zdCgpOiBqYXNtaW5lLlNweSB7IHJldHVybiB0aGlzLnNwaWVzLnBvc3Q7IH1cbiAgcHVibGljIGdldCBwdXQoKTogamFzbWluZS5TcHkgeyByZXR1cm4gdGhpcy5zcGllcy5wdXQ7IH1cbiAgcHVibGljIGdldCBkZWxldGUoKTogamFzbWluZS5TcHkgeyByZXR1cm4gdGhpcy5zcGllcy5kZWxldGU7IH1cblxuICBwcml2YXRlIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hcGlTZXJ2aWNlID0gbmV3IEFwaVNlcnZpY2UobnVsbCwgbnVsbCwgbnVsbCk7XG5cbiAgICB0aGlzLnNwaWVzID0ge1xuICAgICAgZ2V0OiBzcHlPbih0aGlzLmFwaVNlcnZpY2UsICdnZXQnKS5hbmQuY2FsbEZha2UoKCk6IGFueSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmdldEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3codGhpcy5nZXRFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY291bnRlciA9IHRoaXMuY2FsbENvdW50ZXIuZ2V0O1xuICAgICAgICAgIGlmICh0aGlzLmNhbGxDb3VudGVyLmdldCAhPT0gdGhpcy5fZ2V0UmVzcG9uc2UubGVuZ3RoIC0gMSkgdGhpcy5jYWxsQ291bnRlci5nZXQrKztcbiAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLl9nZXRSZXNwb25zZVtjb3VudGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuXG4gICAgICBwb3N0OiBzcHlPbih0aGlzLmFwaVNlcnZpY2UsICdwb3N0JykuYW5kLmNhbGxGYWtlKCgpOiBhbnkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wb3N0RXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyh0aGlzLnBvc3RFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY291bnRlciA9IHRoaXMuY2FsbENvdW50ZXIucG9zdDtcbiAgICAgICAgICBpZiAodGhpcy5jYWxsQ291bnRlci5wb3N0ICE9PSB0aGlzLl9wb3N0UmVzcG9uc2UubGVuZ3RoIC0gMSkgdGhpcy5jYWxsQ291bnRlci5wb3N0Kys7XG4gICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy5fcG9zdFJlc3BvbnNlW2NvdW50ZXJdKTtcbiAgICAgICAgfVxuICAgICAgfSksXG5cbiAgICAgIHB1dDogc3B5T24odGhpcy5hcGlTZXJ2aWNlLCAncHV0JykuYW5kLmNhbGxGYWtlKCgpOiBhbnkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wdXRFcnJvcikge1xuICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KHRoaXMucHV0RXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGNvdW50ZXIgPSB0aGlzLmNhbGxDb3VudGVyLnB1dDtcbiAgICAgICAgICBpZiAodGhpcy5jYWxsQ291bnRlci5wdXQgIT09IHRoaXMuX3B1dFJlc3BvbnNlLmxlbmd0aCAtIDEpIHRoaXMuY2FsbENvdW50ZXIucHV0Kys7XG4gICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy5fcHV0UmVzcG9uc2VbY291bnRlcl0pO1xuICAgICAgICB9XG4gICAgICB9KSxcblxuICAgICAgZGVsZXRlOiBzcHlPbih0aGlzLmFwaVNlcnZpY2UsICdkZWxldGUnKS5hbmQuY2FsbEZha2UoKCk6IGFueSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmRlbGV0ZUVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3codGhpcy5kZWxldGVFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY291bnRlciA9IHRoaXMuY2FsbENvdW50ZXIuZGVsZXRlO1xuICAgICAgICAgIGlmICh0aGlzLmNhbGxDb3VudGVyLmRlbGV0ZSAhPT0gdGhpcy5fZGVsZXRlUmVzcG9uc2UubGVuZ3RoIC0gMSkgdGhpcy5jYWxsQ291bnRlci5kZWxldGUrKztcbiAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLl9kZWxldGVSZXNwb25zZVtjb3VudGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgTW9ja0FwaVNlcnZpY2VTcGllcyB7IGdldDogamFzbWluZS5TcHk7IHBvc3Q6IGphc21pbmUuU3B5OyBwdXQ6IGphc21pbmUuU3B5OyBkZWxldGU6IGphc21pbmUuU3B5OyB9O1xuIl19
