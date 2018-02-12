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
var PricingState = require("./pricing.state");
var PricingActions = require("./pricing.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Pricing Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: PricingActions,
            state: PricingState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'ResetPricing',
            mutationTestData: {
                previousState: {
                    priceForDetails: null,
                    priceForDialog: null,
                    attributes: null,
                    appliedAttributes: null,
                    selectedAttributes: { some: 'attributes' }
                }
            },
            customTests: [
                {
                    it: 'returns the inital state',
                    previousState: {
                        priceForDetails: null,
                        priceForDialog: null,
                        attributes: null,
                        appliedAttributes: null,
                        selectedAttributes: { some: 'attributes' }
                    },
                    expectedNextState: PricingState.initialState
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'CalculatePrice',
            customTests: [
                {
                    it: 'returns the state, but with the price attributes the user has selected',
                    actionParameters: { selectedAttributes: { some: 'attributes' } },
                    previousState: PricingState.initialState,
                    expectedNextState: __assign({}, PricingState.initialState, { selectedAttributes: { some: 'attributes' } })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'SetAppliedAttributes',
            customTests: [
                {
                    it: 'returns the state, but with the price attributes the user has applied',
                    actionParameters: { appliedAttributes: { some: 'attributes' } },
                    previousState: PricingState.initialState,
                    expectedNextState: __assign({}, PricingState.initialState, { appliedAttributes: { some: 'attributes' } })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'GetAttributesSuccess',
            customTests: [
                {
                    it: 'returns the state, but with the price attributes from the API',
                    actionParameters: { attributes: { some: 'attributes' } },
                    previousState: PricingState.initialState,
                    expectedNextState: __assign({}, PricingState.initialState, { attributes: { some: 'attributes' } })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'SetPriceForDetails',
            customTests: [
                {
                    it: 'returns the state, but with the priceForDetails value from the action',
                    actionParameters: { price: 100 },
                    previousState: PricingState.initialState,
                    expectedNextState: __assign({}, PricingState.initialState, { priceForDetails: 100 })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'SetPriceForDialog',
            customTests: [
                {
                    it: 'returns the state, but with the priceForDialog value from the action',
                    actionParameters: { price: 100 },
                    previousState: PricingState.initialState,
                    expectedNextState: __assign({}, PricingState.initialState, { priceForDialog: 100 })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQWdEO0FBQ2hELGtEQUFvRDtBQUNwRCx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsY0FBYztZQUN2QixLQUFLLEVBQUUsWUFBWTtTQUNwQixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLGNBQWM7WUFDL0IsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRTtvQkFDYixlQUFlLEVBQUUsSUFBSTtvQkFDckIsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixpQkFBaUIsRUFBRSxJQUFJO29CQUN2QixrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7aUJBQzNDO2FBQ0Y7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLDBCQUEwQjtvQkFDOUIsYUFBYSxFQUFFO3dCQUNiLGVBQWUsRUFBRSxJQUFJO3dCQUNyQixjQUFjLEVBQUUsSUFBSTt3QkFDcEIsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLGlCQUFpQixFQUFFLElBQUk7d0JBQ3ZCLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtxQkFDM0M7b0JBQ0QsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLFlBQVk7aUJBQzdDO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLGdCQUFnQjtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHdFQUF3RTtvQkFDNUUsZ0JBQWdCLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRTtvQkFDaEUsYUFBYSxFQUFFLFlBQVksQ0FBQyxZQUFZO29CQUN4QyxpQkFBaUIsZUFBTyxZQUFZLENBQUMsWUFBWSxJQUFFLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFFO2lCQUNoRzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxzQkFBc0I7WUFDdkMsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx1RUFBdUU7b0JBQzNFLGdCQUFnQixFQUFFLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUU7b0JBQy9ELGFBQWEsRUFBRSxZQUFZLENBQUMsWUFBWTtvQkFDeEMsaUJBQWlCLGVBQU8sWUFBWSxDQUFDLFlBQVksSUFBRSxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRTtpQkFDL0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsc0JBQXNCO1lBQ3ZDLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsK0RBQStEO29CQUNuRSxnQkFBZ0IsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRTtvQkFDeEQsYUFBYSxFQUFFLFlBQVksQ0FBQyxZQUFZO29CQUN4QyxpQkFBaUIsZUFBTyxZQUFZLENBQUMsWUFBWSxJQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRTtpQkFDeEY7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsb0JBQW9CO1lBQ3JDLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsdUVBQXVFO29CQUMzRSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ2hDLGFBQWEsRUFBRSxZQUFZLENBQUMsWUFBWTtvQkFDeEMsaUJBQWlCLGVBQU8sWUFBWSxDQUFDLFlBQVksSUFBRSxlQUFlLEVBQUUsR0FBRyxHQUFFO2lCQUMxRTthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxtQkFBbUI7WUFDcEMsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxzRUFBc0U7b0JBQzFFLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDaEMsYUFBYSxFQUFFLFlBQVksQ0FBQyxZQUFZO29CQUN4QyxpQkFBaUIsZUFBTyxZQUFZLENBQUMsWUFBWSxJQUFFLGNBQWMsRUFBRSxHQUFHLEdBQUU7aUJBQ3pFO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEvRkQsb0JBK0ZDIiwiZmlsZSI6ImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuc3RhdGUuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFByaWNpbmdTdGF0ZSBmcm9tICcuL3ByaWNpbmcuc3RhdGUnO1xuaW1wb3J0ICogYXMgUHJpY2luZ0FjdGlvbnMgZnJvbSAnLi9wcmljaW5nLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGVTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL3N0YXRlLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdQcmljaW5nIFJlZHVjZXInLCAoKSA9PiB7XG4gICAgc3RhdGVTcGVjSGVscGVyLnNldFJlZHVjZXJUZXN0TW9kdWxlcyh7XG4gICAgICBhY3Rpb25zOiBQcmljaW5nQWN0aW9ucyxcbiAgICAgIHN0YXRlOiBQcmljaW5nU3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdSZXNldFByaWNpbmcnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBwcmV2aW91c1N0YXRlOiB7XG4gICAgICAgICAgcHJpY2VGb3JEZXRhaWxzOiBudWxsLFxuICAgICAgICAgIHByaWNlRm9yRGlhbG9nOiBudWxsLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IG51bGwsXG4gICAgICAgICAgYXBwbGllZEF0dHJpYnV0ZXM6IG51bGwsXG4gICAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVzOiB7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBpbml0YWwgc3RhdGUnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHtcbiAgICAgICAgICAgIHByaWNlRm9yRGV0YWlsczogbnVsbCxcbiAgICAgICAgICAgIHByaWNlRm9yRGlhbG9nOiBudWxsLFxuICAgICAgICAgICAgYXR0cmlidXRlczogbnVsbCxcbiAgICAgICAgICAgIGFwcGxpZWRBdHRyaWJ1dGVzOiBudWxsLFxuICAgICAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVzOiB7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogUHJpY2luZ1N0YXRlLmluaXRpYWxTdGF0ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdDYWxjdWxhdGVQcmljZScsXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSwgYnV0IHdpdGggdGhlIHByaWNlIGF0dHJpYnV0ZXMgdGhlIHVzZXIgaGFzIHNlbGVjdGVkJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHNlbGVjdGVkQXR0cmlidXRlczogeyBzb21lOiAnYXR0cmlidXRlcycgfSB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IFByaWNpbmdTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uUHJpY2luZ1N0YXRlLmluaXRpYWxTdGF0ZSwgc2VsZWN0ZWRBdHRyaWJ1dGVzOiB7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9IH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnU2V0QXBwbGllZEF0dHJpYnV0ZXMnLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyB0aGUgc3RhdGUsIGJ1dCB3aXRoIHRoZSBwcmljZSBhdHRyaWJ1dGVzIHRoZSB1c2VyIGhhcyBhcHBsaWVkJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGFwcGxpZWRBdHRyaWJ1dGVzOiB7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9IH0sXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogUHJpY2luZ1N0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5QcmljaW5nU3RhdGUuaW5pdGlhbFN0YXRlLCBhcHBsaWVkQXR0cmlidXRlczogeyBzb21lOiAnYXR0cmlidXRlcycgfSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0dldEF0dHJpYnV0ZXNTdWNjZXNzJyxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHN0YXRlLCBidXQgd2l0aCB0aGUgcHJpY2UgYXR0cmlidXRlcyBmcm9tIHRoZSBBUEknLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgYXR0cmlidXRlczogeyBzb21lOiAnYXR0cmlidXRlcycgfSB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IFByaWNpbmdTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uUHJpY2luZ1N0YXRlLmluaXRpYWxTdGF0ZSwgYXR0cmlidXRlczogeyBzb21lOiAnYXR0cmlidXRlcycgfSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ1NldFByaWNlRm9yRGV0YWlscycsXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSwgYnV0IHdpdGggdGhlIHByaWNlRm9yRGV0YWlscyB2YWx1ZSBmcm9tIHRoZSBhY3Rpb24nLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgcHJpY2U6IDEwMCB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IFByaWNpbmdTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uUHJpY2luZ1N0YXRlLmluaXRpYWxTdGF0ZSwgcHJpY2VGb3JEZXRhaWxzOiAxMDAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdTZXRQcmljZUZvckRpYWxvZycsXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSwgYnV0IHdpdGggdGhlIHByaWNlRm9yRGlhbG9nIHZhbHVlIGZyb20gdGhlIGFjdGlvbicsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBwcmljZTogMTAwIH0sXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogUHJpY2luZ1N0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5QcmljaW5nU3RhdGUuaW5pdGlhbFN0YXRlLCBwcmljZUZvckRpYWxvZzogMTAwIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
