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
var InvoiceActions = require("./invoice.actions");
var InvoiceState = require("./invoice.state");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Invoice Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: InvoiceActions,
            state: InvoiceState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Load',
            customTests: [
                {
                    it: 'returns the state with loading: true',
                    actionParameters: { id: 47 },
                    previousState: InvoiceState.initialState,
                    expectedNextState: __assign({}, InvoiceState.initialState, { loading: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSuccess',
            customTests: [
                {
                    it: 'returns the state with the invoice and loading: false',
                    actionParameters: { invoice: { some: 'invoice' } },
                    previousState: __assign({}, InvoiceState.initialState, { loading: true }),
                    expectedNextState: { invoice: { some: 'invoice' }, loading: false }
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
                    previousState: __assign({}, InvoiceState.initialState, { loading: true }),
                    expectedNextState: __assign({}, InvoiceState.initialState, { loading: false })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2Uuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsa0RBQW9EO0FBQ3BELDhDQUFnRDtBQUNoRCx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsY0FBYztZQUN2QixLQUFLLEVBQUUsWUFBWTtTQUNwQixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLE1BQU07WUFDdkIsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxzQ0FBc0M7b0JBQzFDLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtvQkFDNUIsYUFBYSxFQUFFLFlBQVksQ0FBQyxZQUFZO29CQUN4QyxpQkFBaUIsZUFBTyxZQUFZLENBQUMsWUFBWSxJQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUU7aUJBQ25FO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLGFBQWE7WUFDOUIsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx1REFBdUQ7b0JBQzNELGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFO29CQUNsRCxhQUFhLGVBQU8sWUFBWSxDQUFDLFlBQVksSUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFFO29CQUM5RCxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO2lCQUNwRTthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxhQUFhO1lBQzlCLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO2FBQ2pDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx1Q0FBdUM7b0JBQzNDLGFBQWEsZUFBTyxZQUFZLENBQUMsWUFBWSxJQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUU7b0JBQzlELGlCQUFpQixlQUFPLFlBQVksQ0FBQyxZQUFZLElBQUUsT0FBTyxFQUFFLEtBQUssR0FBRTtpQkFDcEU7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9DRCxvQkErQ0MiLCJmaWxlIjoiYXBwL3N0b3JlL2ludm9pY2UvaW52b2ljZS5zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSW52b2ljZUFjdGlvbnMgZnJvbSAnLi9pbnZvaWNlLmFjdGlvbnMnO1xuaW1wb3J0ICogYXMgSW52b2ljZVN0YXRlIGZyb20gJy4vaW52b2ljZS5zdGF0ZSc7XG5pbXBvcnQgeyBTdGF0ZVNwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3Qgc3RhdGVTcGVjSGVscGVyOiBTdGF0ZVNwZWNIZWxwZXIgPSBuZXcgU3RhdGVTcGVjSGVscGVyKCk7XG5cbiAgZGVzY3JpYmUoJ0ludm9pY2UgUmVkdWNlcicsICgpID0+IHtcbiAgICBzdGF0ZVNwZWNIZWxwZXIuc2V0UmVkdWNlclRlc3RNb2R1bGVzKHtcbiAgICAgIGFjdGlvbnM6IEludm9pY2VBY3Rpb25zLFxuICAgICAgc3RhdGU6IEludm9pY2VTdGF0ZSxcbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWQnLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyB0aGUgc3RhdGUgd2l0aCBsb2FkaW5nOiB0cnVlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGlkOiA0NyB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IEludm9pY2VTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uSW52b2ljZVN0YXRlLmluaXRpYWxTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWRTdWNjZXNzJyxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHN0YXRlIHdpdGggdGhlIGludm9pY2UgYW5kIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGludm9pY2U6IHsgc29tZTogJ2ludm9pY2UnIH0gfSxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IC4uLkludm9pY2VTdGF0ZS5pbml0aWFsU3RhdGUsIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBpbnZvaWNlOiB7IHNvbWU6ICdpbnZvaWNlJyB9LCBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWRGYWlsdXJlJyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBsb2FkaW5nOiB0cnVlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IC4uLkludm9pY2VTdGF0ZS5pbml0aWFsU3RhdGUsIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5JbnZvaWNlU3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
