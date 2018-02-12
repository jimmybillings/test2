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
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var app_store_1 = require("../../app.store");
var MockAppStore = (function (_super) {
    __extends(MockAppStore, _super);
    function MockAppStore() {
        var _this = _super.call(this, null, null) || this;
        _this._actionFactory = {
            account: {},
            activeCollection: {},
            activity: {},
            asset: {},
            cart: {},
            checkout: {},
            collections: {},
            comment: {},
            currentUser: {},
            deliveryOptions: {},
            dialog: {},
            error: {},
            feeConfig: {},
            headerDisplayOptions: {},
            invoice: {},
            loadingIndicator: {},
            multiLingual: {},
            notifier: {},
            order: {},
            page: {},
            pricing: {},
            privacyPolicy: {},
            quoteEdit: {},
            quoteShow: {},
            router: {},
            search: {},
            sharing: {},
            snackbar: {},
            speedPreview: {},
            uiConfig: {},
            user: {}
        };
        _this._internalActionFactory = {
            account: {},
            activeCollection: {},
            activity: {},
            asset: {},
            cart: {},
            checkout: {},
            collections: {},
            comment: {},
            currentUser: {},
            deliveryOptions: {},
            dialog: {},
            error: {},
            feeConfig: {},
            headerDisplayOptions: {},
            invoice: {},
            loadingIndicator: {},
            multiLingual: {},
            notifier: {},
            order: {},
            page: {},
            pricing: {},
            privacyPolicy: {},
            quoteEdit: {},
            quoteShow: {},
            router: {},
            search: {},
            sharing: {},
            snackbar: {},
            speedPreview: {},
            uiConfig: {},
            user: {}
        };
        _this._state = {
            activeCollection: {},
            asset: {},
            cart: {},
            checkout: {},
            comment: {},
            currentUser: {},
            deliveryOptions: {},
            feeConfig: {},
            headerDisplayOptions: {},
            invoice: {},
            loadingIndicator: {},
            multiLingual: {},
            order: {},
            pricing: {},
            privacyPolicy: {},
            quoteEdit: {},
            quoteShow: {},
            search: {},
            sharing: {},
            snackbar: {},
            speedPreview: {},
            uiConfig: {}
        };
        _this._legacyService = {
            asset: {}
        };
        _this._ngrxDispatch = jasmine.createSpy('ngrx dispatch');
        spyOn(_this, 'dispatch').and.callFake(function (actionFactoryMapper) {
            _this._ngrxDispatch(actionFactoryMapper(_this._actionFactory));
        });
        spyOn(_this, 'create').and.callFake(function (internalActionFactoryMapper) {
            return internalActionFactoryMapper(_this._internalActionFactory);
        });
        spyOn(_this, 'select').and.callFake(function (stateMapper) {
            try {
                return Observable_1.Observable.of(stateMapper(_this._state));
            }
            catch (exception) {
                return Observable_1.Observable.empty();
            }
            ;
        });
        spyOn(_this, 'snapshot').and.callFake(function (stateMapper) {
            return stateMapper(_this._state);
        });
        spyOn(_this, 'selectCloned').and.callFake(function (stateMapper) {
            try {
                return Observable_1.Observable.of(stateMapper(_this._state));
            }
            catch (exception) {
                return Observable_1.Observable.empty();
            }
            ;
        });
        spyOn(_this, 'snapshotCloned').and.callFake(function (stateMapper) {
            return stateMapper(_this._state);
        });
        spyOn(_this, 'completeSnapshot').and.returnValue(_this._state);
        spyOn(_this, 'match').and.callFake(function (value, stateMapper) {
            return value === stateMapper(_this._state);
        });
        spyOn(_this, 'blockUntil').and.callFake(function (stateMapper) {
            return stateMapper(_this._state) === true ? Observable_1.Observable.of(true) : Observable_1.Observable.empty();
        });
        spyOn(_this, 'blockUntilMatch').and.callFake(function (value, stateMapper) {
            return stateMapper(_this._state) === value ? Observable_1.Observable.of(null) : Observable_1.Observable.empty();
        });
        spyOn(_this, 'callLegacyServiceMethod').and.callFake(function (serviceMapper) {
            return serviceMapper(_this._legacyService);
        });
        return _this;
    }
    MockAppStore.prototype.createStateSection = function (stateSectionName, value) {
        this._state[stateSectionName] = value;
    };
    MockAppStore.prototype.createStateElement = function (stateSectionName, elementName, value) {
        this._state[stateSectionName][elementName] = value;
    };
    MockAppStore.prototype.createActionFactoryMethod = function (sectionName, methodName) {
        if (!this._actionFactory.hasOwnProperty(sectionName)) {
            throw new Error("Section '" + sectionName + "' does not exist in the ActionFactory");
        }
        return this._actionFactory[sectionName][methodName] =
            jasmine.createSpy("'" + sectionName + "." + methodName + " action creator'")
                .and.returnValue(this.mockActionFrom(sectionName, methodName));
    };
    MockAppStore.prototype.createInternalActionFactoryMethod = function (sectionName, methodName) {
        if (!this._internalActionFactory.hasOwnProperty(sectionName)) {
            throw new Error("Section '" + sectionName + "' does not exist in the InternalActionFactory");
        }
        return this._internalActionFactory[sectionName][methodName] =
            jasmine.createSpy("'" + sectionName + "." + methodName + " internal action creator'")
                .and.returnValue(this.mockActionFrom(sectionName, methodName));
    };
    MockAppStore.prototype.expectDispatchFor = function (actionFactoryMethod) {
        var expectedParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            expectedParameters[_i - 1] = arguments[_i];
        }
        (_a = expect(actionFactoryMethod)).toHaveBeenCalledWith.apply(_a, expectedParameters);
        expect(this._ngrxDispatch).toHaveBeenCalledWith(this.getActionCreatedBy(actionFactoryMethod));
        var _a;
    };
    MockAppStore.prototype.expectNoDispatchFor = function (actionFactoryMethod) {
        expect(this._ngrxDispatch).not.toHaveBeenCalledWith(this.getActionCreatedBy(actionFactoryMethod));
    };
    MockAppStore.prototype.getActionCreatedBy = function (actionFactoryMethod) {
        return { actionFrom: actionFactoryMethod.and.identity().replace('\'', '').split(' ')[0] };
    };
    MockAppStore.prototype.createLegacyServiceMethod = function (sectionName, methodName, returnValue) {
        if (!this._legacyService.hasOwnProperty(sectionName)) {
            throw new Error("Section '" + sectionName + "' does not exist in the LegacyService");
        }
        return this._legacyService[sectionName][methodName] =
            jasmine.createSpy("'" + sectionName + "." + methodName + " legacy service method'")
                .and.returnValue(returnValue);
    };
    MockAppStore.prototype.expectCallFor = function (legacyServiceMethod) {
        var expectedParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            expectedParameters[_i - 1] = arguments[_i];
        }
        (_a = expect(legacyServiceMethod)).toHaveBeenCalledWith.apply(_a, expectedParameters);
        var _a;
    };
    MockAppStore.prototype.mockActionFrom = function (actionFactorySectionName, actionFactoryMethodName) {
        return { actionFrom: actionFactorySectionName + "." + actionFactoryMethodName };
    };
    return MockAppStore;
}(app_store_1.AppStore));
exports.MockAppStore = MockAppStore;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQTZDO0FBRTdDLDZDQUd5QjtBQVF6QjtJQUFrQyxnQ0FBUTtJQU94QztRQUFBLFlBQ0Usa0JBQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxTQWdKbEI7UUE5SUMsS0FBSSxDQUFDLGNBQWMsR0FBRztZQUNwQixPQUFPLEVBQUUsRUFBUztZQUNsQixnQkFBZ0IsRUFBRSxFQUFTO1lBQzNCLFFBQVEsRUFBRSxFQUFTO1lBQ25CLEtBQUssRUFBRSxFQUFTO1lBQ2hCLElBQUksRUFBRSxFQUFTO1lBQ2YsUUFBUSxFQUFFLEVBQVM7WUFDbkIsV0FBVyxFQUFFLEVBQVM7WUFDdEIsT0FBTyxFQUFFLEVBQVM7WUFDbEIsV0FBVyxFQUFFLEVBQVM7WUFDdEIsZUFBZSxFQUFFLEVBQVM7WUFDMUIsTUFBTSxFQUFFLEVBQVM7WUFDakIsS0FBSyxFQUFFLEVBQVM7WUFDaEIsU0FBUyxFQUFFLEVBQVM7WUFDcEIsb0JBQW9CLEVBQUUsRUFBUztZQUMvQixPQUFPLEVBQUUsRUFBUztZQUNsQixnQkFBZ0IsRUFBRSxFQUFTO1lBQzNCLFlBQVksRUFBRSxFQUFTO1lBQ3ZCLFFBQVEsRUFBRSxFQUFTO1lBQ25CLEtBQUssRUFBRSxFQUFTO1lBQ2hCLElBQUksRUFBRSxFQUFTO1lBQ2YsT0FBTyxFQUFFLEVBQVM7WUFDbEIsYUFBYSxFQUFFLEVBQVM7WUFDeEIsU0FBUyxFQUFFLEVBQVM7WUFDcEIsU0FBUyxFQUFFLEVBQVM7WUFDcEIsTUFBTSxFQUFFLEVBQVM7WUFDakIsTUFBTSxFQUFFLEVBQVM7WUFDakIsT0FBTyxFQUFFLEVBQVM7WUFDbEIsUUFBUSxFQUFFLEVBQVM7WUFDbkIsWUFBWSxFQUFFLEVBQVM7WUFDdkIsUUFBUSxFQUFFLEVBQVM7WUFDbkIsSUFBSSxFQUFFLEVBQVM7U0FDaEIsQ0FBQztRQUVGLEtBQUksQ0FB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QTVCLElBQTRCO1lBQTVCLDJDQUE0Qjs7UUFDakYsQ0FBQSxLQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLENBQUMsb0JBQW9CLFdBQUksa0JBQWtCLEVBQUU7O0lBQzFFLENBQUM7SUFFTyxxQ0FBYyxHQUF0QixVQUF1Qix3QkFBZ0MsRUFBRSx1QkFBK0I7UUFDdEYsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFLLHdCQUF3QixTQUFJLHVCQUF5QixFQUFFLENBQUM7SUFDbEYsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FsTkEsQUFrTkMsQ0FsTmlDLG9CQUFRLEdBa056QztBQWxOWSxvQ0FBWSIsImZpbGUiOiJhcHAvc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7XG4gIEFwcFN0b3JlLCBBY3Rpb25GYWN0b3J5LCBBY3Rpb25GYWN0b3J5TWFwcGVyLCBJbnRlcm5hbEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeU1hcHBlciwgQXBwU3RhdGUsIFN0YXRlTWFwcGVyLFxuICBMZWdhY3lTZXJ2aWNlLCBTZXJ2aWNlTWFwcGVyXG59IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbmludGVyZmFjZSBJbmRleGFibGUgeyBbc2VjdGlvbk5hbWU6IHN0cmluZ106IGFueTsgfVxuaW50ZXJmYWNlIE1vY2tBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSwgSW5kZXhhYmxlIHsgfVxuaW50ZXJmYWNlIE1vY2tJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnksIEluZGV4YWJsZSB7IH1cbmludGVyZmFjZSBNb2NrQXBwU3RhdGUgZXh0ZW5kcyBBcHBTdGF0ZSwgSW5kZXhhYmxlIHsgfVxuXG5leHBvcnQgY2xhc3MgTW9ja0FwcFN0b3JlIGV4dGVuZHMgQXBwU3RvcmUge1xuICBwcml2YXRlIF9uZ3J4RGlzcGF0Y2g6IGphc21pbmUuU3B5O1xuICBwcml2YXRlIF9hY3Rpb25GYWN0b3J5OiBNb2NrQWN0aW9uRmFjdG9yeTtcbiAgcHJpdmF0ZSBfaW50ZXJuYWxBY3Rpb25GYWN0b3J5OiBNb2NrSW50ZXJuYWxBY3Rpb25GYWN0b3J5O1xuICBwcml2YXRlIF9zdGF0ZTogTW9ja0FwcFN0YXRlO1xuICBwcml2YXRlIF9sZWdhY3lTZXJ2aWNlOiBMZWdhY3lTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKG51bGwsIG51bGwpO1xuXG4gICAgdGhpcy5fYWN0aW9uRmFjdG9yeSA9IHtcbiAgICAgIGFjY291bnQ6IHt9IGFzIGFueSxcbiAgICAgIGFjdGl2ZUNvbGxlY3Rpb246IHt9IGFzIGFueSxcbiAgICAgIGFjdGl2aXR5OiB7fSBhcyBhbnksXG4gICAgICBhc3NldDoge30gYXMgYW55LFxuICAgICAgY2FydDoge30gYXMgYW55LFxuICAgICAgY2hlY2tvdXQ6IHt9IGFzIGFueSxcbiAgICAgIGNvbGxlY3Rpb25zOiB7fSBhcyBhbnksXG4gICAgICBjb21tZW50OiB7fSBhcyBhbnksXG4gICAgICBjdXJyZW50VXNlcjoge30gYXMgYW55LFxuICAgICAgZGVsaXZlcnlPcHRpb25zOiB7fSBhcyBhbnksXG4gICAgICBkaWFsb2c6IHt9IGFzIGFueSxcbiAgICAgIGVycm9yOiB7fSBhcyBhbnksXG4gICAgICBmZWVDb25maWc6IHt9IGFzIGFueSxcbiAgICAgIGhlYWRlckRpc3BsYXlPcHRpb25zOiB7fSBhcyBhbnksXG4gICAgICBpbnZvaWNlOiB7fSBhcyBhbnksXG4gICAgICBsb2FkaW5nSW5kaWNhdG9yOiB7fSBhcyBhbnksXG4gICAgICBtdWx0aUxpbmd1YWw6IHt9IGFzIGFueSxcbiAgICAgIG5vdGlmaWVyOiB7fSBhcyBhbnksXG4gICAgICBvcmRlcjoge30gYXMgYW55LFxuICAgICAgcGFnZToge30gYXMgYW55LFxuICAgICAgcHJpY2luZzoge30gYXMgYW55LFxuICAgICAgcHJpdmFjeVBvbGljeToge30gYXMgYW55LFxuICAgICAgcXVvdGVFZGl0OiB7fSBhcyBhbnksXG4gICAgICBxdW90ZVNob3c6IHt9IGFzIGFueSxcbiAgICAgIHJvdXRlcjoge30gYXMgYW55LFxuICAgICAgc2VhcmNoOiB7fSBhcyBhbnksXG4gICAgICBzaGFyaW5nOiB7fSBhcyBhbnksXG4gICAgICBzbmFja2Jhcjoge30gYXMgYW55LFxuICAgICAgc3BlZWRQcmV2aWV3OiB7fSBhcyBhbnksXG4gICAgICB1aUNvbmZpZzoge30gYXMgYW55LFxuICAgICAgdXNlcjoge30gYXMgYW55XG4gICAgfTtcblxuICAgIHRoaXMuX2ludGVybmFsQWN0aW9uRmFjdG9yeSA9IHtcbiAgICAgIGFjY291bnQ6IHt9IGFzIGFueSxcbiAgICAgIGFjdGl2ZUNvbGxlY3Rpb246IHt9IGFzIGFueSxcbiAgICAgIGFjdGl2aXR5OiB7fSBhcyBhbnksXG4gICAgICBhc3NldDoge30gYXMgYW55LFxuICAgICAgY2FydDoge30gYXMgYW55LFxuICAgICAgY2hlY2tvdXQ6IHt9IGFzIGFueSxcbiAgICAgIGNvbGxlY3Rpb25zOiB7fSBhcyBhbnksXG4gICAgICBjb21tZW50OiB7fSBhcyBhbnksXG4gICAgICBjdXJyZW50VXNlcjoge30gYXMgYW55LFxuICAgICAgZGVsaXZlcnlPcHRpb25zOiB7fSBhcyBhbnksXG4gICAgICBkaWFsb2c6IHt9IGFzIGFueSxcbiAgICAgIGVycm9yOiB7fSBhcyBhbnksXG4gICAgICBmZWVDb25maWc6IHt9IGFzIGFueSxcbiAgICAgIGhlYWRlckRpc3BsYXlPcHRpb25zOiB7fSBhcyBhbnksXG4gICAgICBpbnZvaWNlOiB7fSBhcyBhbnksXG4gICAgICBsb2FkaW5nSW5kaWNhdG9yOiB7fSBhcyBhbnksXG4gICAgICBtdWx0aUxpbmd1YWw6IHt9IGFzIGFueSxcbiAgICAgIG5vdGlmaWVyOiB7fSBhcyBhbnksXG4gICAgICBvcmRlcjoge30gYXMgYW55LFxuICAgICAgcGFnZToge30gYXMgYW55LFxuICAgICAgcHJpY2luZzoge30gYXMgYW55LFxuICAgICAgcHJpdmFjeVBvbGljeToge30gYXMgYW55LFxuICAgICAgcXVvdGVFZGl0OiB7fSBhcyBhbnksXG4gICAgICBxdW90ZVNob3c6IHt9IGFzIGFueSxcbiAgICAgIHJvdXRlcjoge30gYXMgYW55LFxuICAgICAgc2VhcmNoOiB7fSBhcyBhbnksXG4gICAgICBzaGFyaW5nOiB7fSBhcyBhbnksXG4gICAgICBzbmFja2Jhcjoge30gYXMgYW55LFxuICAgICAgc3BlZWRQcmV2aWV3OiB7fSBhcyBhbnksXG4gICAgICB1aUNvbmZpZzoge30gYXMgYW55LFxuICAgICAgdXNlcjoge30gYXMgYW55XG4gICAgfTtcblxuICAgIHRoaXMuX3N0YXRlID0ge1xuICAgICAgYWN0aXZlQ29sbGVjdGlvbjoge30gYXMgYW55LFxuICAgICAgYXNzZXQ6IHt9IGFzIGFueSxcbiAgICAgIGNhcnQ6IHt9IGFzIGFueSxcbiAgICAgIGNoZWNrb3V0OiB7fSBhcyBhbnksXG4gICAgICBjb21tZW50OiB7fSBhcyBhbnksXG4gICAgICBjdXJyZW50VXNlcjoge30gYXMgYW55LFxuICAgICAgZGVsaXZlcnlPcHRpb25zOiB7fSBhcyBhbnksXG4gICAgICBmZWVDb25maWc6IHt9IGFzIGFueSxcbiAgICAgIGhlYWRlckRpc3BsYXlPcHRpb25zOiB7fSBhcyBhbnksXG4gICAgICBpbnZvaWNlOiB7fSBhcyBhbnksXG4gICAgICBsb2FkaW5nSW5kaWNhdG9yOiB7fSBhcyBhbnksXG4gICAgICBtdWx0aUxpbmd1YWw6IHt9IGFzIGFueSxcbiAgICAgIG9yZGVyOiB7fSBhcyBhbnksXG4gICAgICBwcmljaW5nOiB7fSBhcyBhbnksXG4gICAgICBwcml2YWN5UG9saWN5OiB7fSBhcyBhbnksXG4gICAgICBxdW90ZUVkaXQ6IHt9IGFzIGFueSxcbiAgICAgIHF1b3RlU2hvdzoge30gYXMgYW55LFxuICAgICAgc2VhcmNoOiB7fSBhcyBhbnksXG4gICAgICBzaGFyaW5nOiB7fSBhcyBhbnksXG4gICAgICBzbmFja2Jhcjoge30gYXMgYW55LFxuICAgICAgc3BlZWRQcmV2aWV3OiB7fSBhcyBhbnksXG4gICAgICB1aUNvbmZpZzoge30gYXMgYW55XG4gICAgfTtcblxuICAgIHRoaXMuX2xlZ2FjeVNlcnZpY2UgPSB7XG4gICAgICBhc3NldDoge30gYXMgYW55XG4gICAgfTtcblxuICAgIHRoaXMuX25ncnhEaXNwYXRjaCA9IGphc21pbmUuY3JlYXRlU3B5KCduZ3J4IGRpc3BhdGNoJyk7XG5cbiAgICBzcHlPbih0aGlzLCAnZGlzcGF0Y2gnKS5hbmQuY2FsbEZha2UoKGFjdGlvbkZhY3RvcnlNYXBwZXI6IEFjdGlvbkZhY3RvcnlNYXBwZXIpID0+IHtcbiAgICAgIHRoaXMuX25ncnhEaXNwYXRjaChhY3Rpb25GYWN0b3J5TWFwcGVyKHRoaXMuX2FjdGlvbkZhY3RvcnkpKTtcbiAgICB9KTtcblxuICAgIHNweU9uKHRoaXMsICdjcmVhdGUnKS5hbmQuY2FsbEZha2UoKGludGVybmFsQWN0aW9uRmFjdG9yeU1hcHBlcjogSW50ZXJuYWxBY3Rpb25GYWN0b3J5TWFwcGVyKSA9PlxuICAgICAgaW50ZXJuYWxBY3Rpb25GYWN0b3J5TWFwcGVyKHRoaXMuX2ludGVybmFsQWN0aW9uRmFjdG9yeSlcbiAgICApO1xuXG4gICAgc3B5T24odGhpcywgJ3NlbGVjdCcpLmFuZC5jYWxsRmFrZSgoc3RhdGVNYXBwZXI6IFN0YXRlTWFwcGVyPGFueT4pID0+IHtcbiAgICAgIHRyeSB7IHJldHVybiBPYnNlcnZhYmxlLm9mKHN0YXRlTWFwcGVyKHRoaXMuX3N0YXRlKSk7IH0gY2F0Y2ggKGV4Y2VwdGlvbikgeyByZXR1cm4gT2JzZXJ2YWJsZS5lbXB0eSgpOyB9O1xuICAgIH0pO1xuXG4gICAgc3B5T24odGhpcywgJ3NuYXBzaG90JykuYW5kLmNhbGxGYWtlKChzdGF0ZU1hcHBlcjogU3RhdGVNYXBwZXI8YW55PikgPT5cbiAgICAgIHN0YXRlTWFwcGVyKHRoaXMuX3N0YXRlKVxuICAgICk7XG5cbiAgICBzcHlPbih0aGlzLCAnc2VsZWN0Q2xvbmVkJykuYW5kLmNhbGxGYWtlKChzdGF0ZU1hcHBlcjogU3RhdGVNYXBwZXI8YW55PikgPT4ge1xuICAgICAgdHJ5IHsgcmV0dXJuIE9ic2VydmFibGUub2Yoc3RhdGVNYXBwZXIodGhpcy5fc3RhdGUpKTsgfSBjYXRjaCAoZXhjZXB0aW9uKSB7IHJldHVybiBPYnNlcnZhYmxlLmVtcHR5KCk7IH07XG4gICAgfSk7XG5cbiAgICBzcHlPbih0aGlzLCAnc25hcHNob3RDbG9uZWQnKS5hbmQuY2FsbEZha2UoKHN0YXRlTWFwcGVyOiBTdGF0ZU1hcHBlcjxhbnk+KSA9PlxuICAgICAgc3RhdGVNYXBwZXIodGhpcy5fc3RhdGUpXG4gICAgKTtcblxuICAgIHNweU9uKHRoaXMsICdjb21wbGV0ZVNuYXBzaG90JykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgdGhpcy5fc3RhdGVcbiAgICApO1xuXG4gICAgc3B5T24odGhpcywgJ21hdGNoJykuYW5kLmNhbGxGYWtlKCh2YWx1ZTogYW55LCBzdGF0ZU1hcHBlcjogU3RhdGVNYXBwZXI8YW55PikgPT5cbiAgICAgIHZhbHVlID09PSBzdGF0ZU1hcHBlcih0aGlzLl9zdGF0ZSlcbiAgICApO1xuXG4gICAgc3B5T24odGhpcywgJ2Jsb2NrVW50aWwnKS5hbmQuY2FsbEZha2UoKHN0YXRlTWFwcGVyOiBTdGF0ZU1hcHBlcjxib29sZWFuPikgPT5cbiAgICAgIHN0YXRlTWFwcGVyKHRoaXMuX3N0YXRlKSA9PT0gdHJ1ZSA/IE9ic2VydmFibGUub2YodHJ1ZSkgOiBPYnNlcnZhYmxlLmVtcHR5KClcbiAgICApO1xuXG4gICAgc3B5T24odGhpcywgJ2Jsb2NrVW50aWxNYXRjaCcpLmFuZC5jYWxsRmFrZSgodmFsdWU6IGFueSwgc3RhdGVNYXBwZXI6IFN0YXRlTWFwcGVyPGFueT4pID0+XG4gICAgICBzdGF0ZU1hcHBlcih0aGlzLl9zdGF0ZSkgPT09IHZhbHVlID8gT2JzZXJ2YWJsZS5vZihudWxsKSA6IE9ic2VydmFibGUuZW1wdHkoKVxuICAgICk7XG5cbiAgICBzcHlPbih0aGlzLCAnY2FsbExlZ2FjeVNlcnZpY2VNZXRob2QnKS5hbmQuY2FsbEZha2UoKHNlcnZpY2VNYXBwZXI6IFNlcnZpY2VNYXBwZXI8YW55PikgPT5cbiAgICAgIHNlcnZpY2VNYXBwZXIodGhpcy5fbGVnYWN5U2VydmljZSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZVN0YXRlU2VjdGlvbihzdGF0ZVNlY3Rpb25OYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0ZVtzdGF0ZVNlY3Rpb25OYW1lXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZVN0YXRlRWxlbWVudChzdGF0ZVNlY3Rpb25OYW1lOiBzdHJpbmcsIGVsZW1lbnROYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0ZVtzdGF0ZVNlY3Rpb25OYW1lXVtlbGVtZW50TmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKHNlY3Rpb25OYW1lOiBzdHJpbmcsIG1ldGhvZE5hbWU6IHN0cmluZyk6IGphc21pbmUuU3B5IHtcbiAgICBpZiAoIXRoaXMuX2FjdGlvbkZhY3RvcnkuaGFzT3duUHJvcGVydHkoc2VjdGlvbk5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlY3Rpb24gJyR7c2VjdGlvbk5hbWV9JyBkb2VzIG5vdCBleGlzdCBpbiB0aGUgQWN0aW9uRmFjdG9yeWApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYWN0aW9uRmFjdG9yeVtzZWN0aW9uTmFtZV1bbWV0aG9kTmFtZV0gPVxuICAgICAgamFzbWluZS5jcmVhdGVTcHkoYCcke3NlY3Rpb25OYW1lfS4ke21ldGhvZE5hbWV9IGFjdGlvbiBjcmVhdG9yJ2ApXG4gICAgICAgIC5hbmQucmV0dXJuVmFsdWUodGhpcy5tb2NrQWN0aW9uRnJvbShzZWN0aW9uTmFtZSwgbWV0aG9kTmFtZSkpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUludGVybmFsQWN0aW9uRmFjdG9yeU1ldGhvZChzZWN0aW9uTmFtZTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcpOiBqYXNtaW5lLlNweSB7XG4gICAgaWYgKCF0aGlzLl9pbnRlcm5hbEFjdGlvbkZhY3RvcnkuaGFzT3duUHJvcGVydHkoc2VjdGlvbk5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlY3Rpb24gJyR7c2VjdGlvbk5hbWV9JyBkb2VzIG5vdCBleGlzdCBpbiB0aGUgSW50ZXJuYWxBY3Rpb25GYWN0b3J5YCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbEFjdGlvbkZhY3Rvcnlbc2VjdGlvbk5hbWVdW21ldGhvZE5hbWVdID1cbiAgICAgIGphc21pbmUuY3JlYXRlU3B5KGAnJHtzZWN0aW9uTmFtZX0uJHttZXRob2ROYW1lfSBpbnRlcm5hbCBhY3Rpb24gY3JlYXRvcidgKVxuICAgICAgICAuYW5kLnJldHVyblZhbHVlKHRoaXMubW9ja0FjdGlvbkZyb20oc2VjdGlvbk5hbWUsIG1ldGhvZE5hbWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBleHBlY3REaXNwYXRjaEZvcihhY3Rpb25GYWN0b3J5TWV0aG9kOiBqYXNtaW5lLlNweSwgLi4uZXhwZWN0ZWRQYXJhbWV0ZXJzOiBhbnlbXSk6IHZvaWQge1xuICAgIGV4cGVjdChhY3Rpb25GYWN0b3J5TWV0aG9kKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCguLi5leHBlY3RlZFBhcmFtZXRlcnMpO1xuICAgIGV4cGVjdCh0aGlzLl9uZ3J4RGlzcGF0Y2gpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRoaXMuZ2V0QWN0aW9uQ3JlYXRlZEJ5KGFjdGlvbkZhY3RvcnlNZXRob2QpKTtcbiAgfVxuXG4gIHB1YmxpYyBleHBlY3ROb0Rpc3BhdGNoRm9yKGFjdGlvbkZhY3RvcnlNZXRob2Q6IGphc21pbmUuU3B5KTogdm9pZCB7XG4gICAgZXhwZWN0KHRoaXMuX25ncnhEaXNwYXRjaCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRoaXMuZ2V0QWN0aW9uQ3JlYXRlZEJ5KGFjdGlvbkZhY3RvcnlNZXRob2QpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3Rpb25DcmVhdGVkQnkoYWN0aW9uRmFjdG9yeU1ldGhvZDogamFzbWluZS5TcHkpOiBhbnkge1xuICAgIHJldHVybiB7IGFjdGlvbkZyb206IGFjdGlvbkZhY3RvcnlNZXRob2QuYW5kLmlkZW50aXR5KCkucmVwbGFjZSgnXFwnJywgJycpLnNwbGl0KCcgJylbMF0gfTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVMZWdhY3lTZXJ2aWNlTWV0aG9kKHNlY3Rpb25OYW1lOiBzdHJpbmcsIG1ldGhvZE5hbWU6IHN0cmluZywgcmV0dXJuVmFsdWU6IGFueSk6IGphc21pbmUuU3B5IHtcbiAgICBpZiAoIXRoaXMuX2xlZ2FjeVNlcnZpY2UuaGFzT3duUHJvcGVydHkoc2VjdGlvbk5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlY3Rpb24gJyR7c2VjdGlvbk5hbWV9JyBkb2VzIG5vdCBleGlzdCBpbiB0aGUgTGVnYWN5U2VydmljZWApO1xuICAgIH1cblxuICAgIHJldHVybiAodGhpcy5fbGVnYWN5U2VydmljZSBhcyBhbnkpW3NlY3Rpb25OYW1lXVttZXRob2ROYW1lXSA9XG4gICAgICBqYXNtaW5lLmNyZWF0ZVNweShgJyR7c2VjdGlvbk5hbWV9LiR7bWV0aG9kTmFtZX0gbGVnYWN5IHNlcnZpY2UgbWV0aG9kJ2ApXG4gICAgICAgIC5hbmQucmV0dXJuVmFsdWUocmV0dXJuVmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGV4cGVjdENhbGxGb3IobGVnYWN5U2VydmljZU1ldGhvZDogamFzbWluZS5TcHksIC4uLmV4cGVjdGVkUGFyYW1ldGVyczogYW55W10pOiB2b2lkIHtcbiAgICBleHBlY3QobGVnYWN5U2VydmljZU1ldGhvZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoLi4uZXhwZWN0ZWRQYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgbW9ja0FjdGlvbkZyb20oYWN0aW9uRmFjdG9yeVNlY3Rpb25OYW1lOiBzdHJpbmcsIGFjdGlvbkZhY3RvcnlNZXRob2ROYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB7IGFjdGlvbkZyb206IGAke2FjdGlvbkZhY3RvcnlTZWN0aW9uTmFtZX0uJHthY3Rpb25GYWN0b3J5TWV0aG9kTmFtZX1gIH07XG4gIH1cbn1cbiJdfQ==
