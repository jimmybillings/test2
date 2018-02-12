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
var CheckoutState = require("./checkout.state");
var CheckoutActions = require("./checkout.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Checkout Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: CheckoutActions,
            state: CheckoutState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['SetPurchaseOrderId'],
            customTests: [
                {
                    it: 'returns the state with purchase order id',
                    actionParameters: { purchaseOrderId: '123-purchase-order-id' },
                    previousState: CheckoutState.initialState,
                    expectedNextState: __assign({}, CheckoutState.initialState, { purchaseOrderId: '123-purchase-order-id' })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['SetAvailablePaymentOptions'],
            customTests: [
                {
                    it: 'returns the state with paymentOptions',
                    actionParameters: { paymentOptions: { some: 'options' } },
                    previousState: CheckoutState.initialState,
                    expectedNextState: __assign({}, CheckoutState.initialState, { paymentOptions: { some: 'options' } })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['SetSelectedPaymentType'],
            customTests: [
                {
                    it: 'returns the state with selectedPaymentType',
                    actionParameters: { selectedPaymentType: 'SomePaymentType' },
                    previousState: CheckoutState.initialState,
                    expectedNextState: __assign({}, CheckoutState.initialState, { selectedPaymentType: 'SomePaymentType' })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['SetAvailableAddresses'],
            customTests: [
                {
                    it: 'returns the state with addresses',
                    actionParameters: { addresses: { some: 'addresses' } },
                    previousState: CheckoutState.initialState,
                    expectedNextState: __assign({}, CheckoutState.initialState, { addresses: { some: 'addresses' } })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['SetSelectedAddress'],
            customTests: [
                {
                    it: 'returns the state with selectedAddress',
                    actionParameters: { selectedAddress: { some: 'address' } },
                    previousState: CheckoutState.initialState,
                    expectedNextState: __assign({}, CheckoutState.initialState, { selectedAddress: { some: 'address' } })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['SetCreditCardAuthorization'],
            customTests: [
                {
                    it: 'returns the state with authorization',
                    actionParameters: { authorization: { some: 'auth' } },
                    previousState: CheckoutState.initialState,
                    expectedNextState: __assign({}, CheckoutState.initialState, { authorization: { some: 'auth' } })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jaGVja291dC9jaGVja291dC5zdGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxnREFBa0Q7QUFDbEQsb0RBQXNEO0FBQ3RELHVFQUFvRTtBQUVwRTtJQUNFLElBQU0sZUFBZSxHQUFvQixJQUFJLG1DQUFlLEVBQUUsQ0FBQztJQUUvRCxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IsZUFBZSxDQUFDLHFCQUFxQixDQUFDO1lBQ3BDLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUN2QyxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLDBDQUEwQztvQkFDOUMsZ0JBQWdCLEVBQUUsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUU7b0JBQzlELGFBQWEsRUFBRSxhQUFhLENBQUMsWUFBWTtvQkFDekMsaUJBQWlCLGVBQU8sYUFBYSxDQUFDLFlBQVksSUFBRSxlQUFlLEVBQUUsdUJBQXVCLEdBQUU7aUJBQy9GO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLENBQUMsNEJBQTRCLENBQUM7WUFDL0MsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx1Q0FBdUM7b0JBQzNDLGdCQUFnQixFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFO29CQUN6RCxhQUFhLEVBQUUsYUFBYSxDQUFDLFlBQVk7b0JBQ3pDLGlCQUFpQixlQUFPLGFBQWEsQ0FBQyxZQUFZLElBQUUsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFFO2lCQUMxRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQzNDLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsNENBQTRDO29CQUNoRCxnQkFBZ0IsRUFBRSxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFO29CQUM1RCxhQUFhLEVBQUUsYUFBYSxDQUFDLFlBQVk7b0JBQ3pDLGlCQUFpQixlQUFPLGFBQWEsQ0FBQyxZQUFZLElBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEdBQUU7aUJBQzdGO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDMUMsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxrQ0FBa0M7b0JBQ3RDLGdCQUFnQixFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFO29CQUN0RCxhQUFhLEVBQUUsYUFBYSxDQUFDLFlBQVk7b0JBQ3pDLGlCQUFpQixlQUFPLGFBQWEsQ0FBQyxZQUFZLElBQUUsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFFO2lCQUN2RjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBQ3ZDLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsd0NBQXdDO29CQUM1QyxnQkFBZ0IsRUFBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRTtvQkFDMUQsYUFBYSxFQUFFLGFBQWEsQ0FBQyxZQUFZO29CQUN6QyxpQkFBaUIsZUFBTyxhQUFhLENBQUMsWUFBWSxJQUFFLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRTtpQkFDM0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztZQUMvQyxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHNDQUFzQztvQkFDMUMsZ0JBQWdCLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ3JELGFBQWEsRUFBRSxhQUFhLENBQUMsWUFBWTtvQkFDekMsaUJBQWlCLGVBQU8sYUFBYSxDQUFDLFlBQVksSUFBRSxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUU7aUJBQ3RGO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqRkQsb0JBaUZDIiwiZmlsZSI6ImFwcC9zdG9yZS9jaGVja291dC9jaGVja291dC5zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWNjZXNzU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IEFjdGlvbnNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2FjdGlvbnMuc3BlYy1oZWxwZXInO1xuaW1wb3J0ICogYXMgQ2hlY2tvdXRTdGF0ZSBmcm9tICcuL2NoZWNrb3V0LnN0YXRlJztcbmltcG9ydCAqIGFzIENoZWNrb3V0QWN0aW9ucyBmcm9tICcuL2NoZWNrb3V0LmFjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGVTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL3N0YXRlLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdDaGVja291dCBSZWR1Y2VyJywgKCkgPT4ge1xuICAgIHN0YXRlU3BlY0hlbHBlci5zZXRSZWR1Y2VyVGVzdE1vZHVsZXMoe1xuICAgICAgYWN0aW9uczogQ2hlY2tvdXRBY3Rpb25zLFxuICAgICAgc3RhdGU6IENoZWNrb3V0U3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnU2V0UHVyY2hhc2VPcmRlcklkJ10sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIHB1cmNoYXNlIG9yZGVyIGlkJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHB1cmNoYXNlT3JkZXJJZDogJzEyMy1wdXJjaGFzZS1vcmRlci1pZCcgfSxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiBDaGVja291dFN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5DaGVja291dFN0YXRlLmluaXRpYWxTdGF0ZSwgcHVyY2hhc2VPcmRlcklkOiAnMTIzLXB1cmNoYXNlLW9yZGVyLWlkJyB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydTZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucyddLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyB0aGUgc3RhdGUgd2l0aCBwYXltZW50T3B0aW9ucycsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBwYXltZW50T3B0aW9uczogeyBzb21lOiAnb3B0aW9ucycgfSB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IENoZWNrb3V0U3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLkNoZWNrb3V0U3RhdGUuaW5pdGlhbFN0YXRlLCBwYXltZW50T3B0aW9uczogeyBzb21lOiAnb3B0aW9ucycgfSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydTZXRTZWxlY3RlZFBheW1lbnRUeXBlJ10sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIHNlbGVjdGVkUGF5bWVudFR5cGUnLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgc2VsZWN0ZWRQYXltZW50VHlwZTogJ1NvbWVQYXltZW50VHlwZScgfSxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiBDaGVja291dFN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5DaGVja291dFN0YXRlLmluaXRpYWxTdGF0ZSwgc2VsZWN0ZWRQYXltZW50VHlwZTogJ1NvbWVQYXltZW50VHlwZScgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnU2V0QXZhaWxhYmxlQWRkcmVzc2VzJ10sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIGFkZHJlc3NlcycsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBhZGRyZXNzZXM6IHsgc29tZTogJ2FkZHJlc3NlcycgfSB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IENoZWNrb3V0U3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLkNoZWNrb3V0U3RhdGUuaW5pdGlhbFN0YXRlLCBhZGRyZXNzZXM6IHsgc29tZTogJ2FkZHJlc3NlcycgfSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydTZXRTZWxlY3RlZEFkZHJlc3MnXSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHN0YXRlIHdpdGggc2VsZWN0ZWRBZGRyZXNzJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHNlbGVjdGVkQWRkcmVzczogeyBzb21lOiAnYWRkcmVzcycgfSB9LFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IENoZWNrb3V0U3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLkNoZWNrb3V0U3RhdGUuaW5pdGlhbFN0YXRlLCBzZWxlY3RlZEFkZHJlc3M6IHsgc29tZTogJ2FkZHJlc3MnIH0gfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnU2V0Q3JlZGl0Q2FyZEF1dGhvcml6YXRpb24nXSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHN0YXRlIHdpdGggYXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBhdXRob3JpemF0aW9uOiB7IHNvbWU6ICdhdXRoJyB9IH0sXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogQ2hlY2tvdXRTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uQ2hlY2tvdXRTdGF0ZS5pbml0aWFsU3RhdGUsIGF1dGhvcml6YXRpb246IHsgc29tZTogJ2F1dGgnIH0gfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH0pO1xufVxuIl19
