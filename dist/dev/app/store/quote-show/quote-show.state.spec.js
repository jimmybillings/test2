"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var QuoteShowState = require("./quote-show.state");
var QuoteShowActions = require("./quote-show.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Quote Show Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            state: QuoteShowState,
            actions: QuoteShowActions
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Load',
            customTests: [
                {
                    it: 'returns the state with loading: true',
                    actionParameters: { id: 47 },
                    previousState: QuoteShowState.initialState,
                    expectedNextState: __assign({}, QuoteShowState.initialState, { loading: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSuccess',
            customTests: [
                {
                    it: 'returns the state with the new quote and loading: false',
                    actionParameters: { quote: { some: 'quote' } },
                    previousState: __assign({}, QuoteShowState.initialState, { loading: true }),
                    expectedNextState: { data: { some: 'quote' }, loading: false }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadFailure',
            mutationTestData: {
                previousState: { loading: true }
            },
            customTests: [
                {
                    it: 'returns the state with loading: false',
                    previousState: __assign({}, QuoteShowState.initialState, { loading: true }),
                    expectedNextState: __assign({}, QuoteShowState.initialState, { loading: false })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JELHVEQUF5RDtBQUN6RCx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzdCLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxLQUFLLEVBQUUsY0FBYztZQUNyQixPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsTUFBTTtZQUN2QixXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHNDQUFzQztvQkFDMUMsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO29CQUM1QixhQUFhLEVBQUUsY0FBYyxDQUFDLFlBQVk7b0JBQzFDLGlCQUFpQixlQUFPLGNBQWMsQ0FBQyxZQUFZLElBQUUsT0FBTyxFQUFFLElBQUksR0FBRTtpQkFDckU7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsYUFBYTtZQUM5QixXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHlEQUF5RDtvQkFDN0QsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQzlDLGFBQWEsZUFBTyxjQUFjLENBQUMsWUFBWSxJQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUU7b0JBQ2hFLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7aUJBQy9EO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLGFBQWE7WUFDOUIsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7YUFDakM7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHVDQUF1QztvQkFDM0MsYUFBYSxlQUFPLGNBQWMsQ0FBQyxZQUFZLElBQUUsT0FBTyxFQUFFLElBQUksR0FBRTtvQkFDaEUsaUJBQWlCLGVBQU8sY0FBYyxDQUFDLFlBQVksSUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFFO2lCQUN0RTthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBL0NELG9CQStDQyIsImZpbGUiOiJhcHAvc3RvcmUvcXVvdGUtc2hvdy9xdW90ZS1zaG93LnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBRdW90ZVNob3dTdGF0ZSBmcm9tICcuL3F1b3RlLXNob3cuc3RhdGUnO1xuaW1wb3J0ICogYXMgUXVvdGVTaG93QWN0aW9ucyBmcm9tICcuL3F1b3RlLXNob3cuYWN0aW9ucyc7XG5pbXBvcnQgeyBTdGF0ZVNwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3Qgc3RhdGVTcGVjSGVscGVyOiBTdGF0ZVNwZWNIZWxwZXIgPSBuZXcgU3RhdGVTcGVjSGVscGVyKCk7XG5cbiAgZGVzY3JpYmUoJ1F1b3RlIFNob3cgUmVkdWNlcicsICgpID0+IHtcbiAgICBzdGF0ZVNwZWNIZWxwZXIuc2V0UmVkdWNlclRlc3RNb2R1bGVzKHtcbiAgICAgIHN0YXRlOiBRdW90ZVNob3dTdGF0ZSxcbiAgICAgIGFjdGlvbnM6IFF1b3RlU2hvd0FjdGlvbnNcbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWQnLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyB0aGUgc3RhdGUgd2l0aCBsb2FkaW5nOiB0cnVlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGlkOiA0NyB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IFF1b3RlU2hvd1N0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5RdW90ZVNob3dTdGF0ZS5pbml0aWFsU3RhdGUsIGxvYWRpbmc6IHRydWUgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdMb2FkU3VjY2VzcycsXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIHRoZSBuZXcgcXVvdGUgYW5kIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHF1b3RlOiB7IHNvbWU6ICdxdW90ZScgfSB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgLi4uUXVvdGVTaG93U3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgZGF0YTogeyBzb21lOiAncXVvdGUnIH0sIGxvYWRpbmc6IGZhbHNlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnTG9hZEZhaWx1cmUnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBwcmV2aW91c1N0YXRlOiB7IGxvYWRpbmc6IHRydWUgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHN0YXRlIHdpdGggbG9hZGluZzogZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgLi4uUXVvdGVTaG93U3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uUXVvdGVTaG93U3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
