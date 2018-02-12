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
var OrderActions = require("./order.actions");
var OrderState = require("./order.state");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Order Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: OrderActions,
            state: OrderState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Load',
            mutationTestData: {
                previousState: { loading: false }
            },
            customTests: [
                {
                    it: 'with previous state, returns previous state but with loading: true',
                    previousState: { some: 'stuff', loading: false },
                    expectedNextState: { some: 'stuff', loading: true }
                },
                {
                    it: 'without previous state, returns initialState but with loading: true',
                    expectedNextState: __assign({}, OrderState.initialState, { loading: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSuccess',
            customTests: [
                {
                    it: 'with previous state, returns new state with updated order and loading: false',
                    previousState: { activeOrder: 'previous', loading: true, checkingOut: false },
                    actionParameters: { activeOrder: 'new' },
                    expectedNextState: { activeOrder: 'new', loading: false, checkingOut: false }
                },
                {
                    it: 'without previous state, returns new state with updated order and loading: false',
                    actionParameters: { activeOrder: 'new' },
                    expectedNextState: { activeOrder: 'new', loading: false, checkingOut: false }
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
                    it: 'with previous state, returns previous state but with loading: false',
                    previousState: { some: 'stuff', loading: true },
                    actionParameters: { error: { some: 'error' } },
                    expectedNextState: { some: 'stuff', loading: false }
                },
                {
                    it: 'without previous state, returns initial state',
                    actionParameters: { error: { some: 'error' } },
                    expectedNextState: OrderState.initialState
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'SetCheckoutState',
            mutationTestData: {
                previousState: { checkingOut: true }
            },
            customTests: [
                {
                    it: 'with previous state, returns previous state but with action.checkingOut',
                    previousState: { some: 'stuff', checkingOut: false },
                    actionParameters: { checkingOut: true },
                    expectedNextState: { some: 'stuff', checkingOut: true }
                },
                {
                    it: 'without previous state, returns initial state but with action.checkingOut',
                    actionParameters: { checkingOut: true },
                    expectedNextState: __assign({}, OrderState.initialState, { checkingOut: true })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9vcmRlci9vcmRlci5zdGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw4Q0FBZ0Q7QUFDaEQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUVwRTtJQUNFLElBQU0sZUFBZSxHQUFvQixJQUFJLG1DQUFlLEVBQUUsQ0FBQztJQUUvRCxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3hCLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsWUFBWTtZQUNyQixLQUFLLEVBQUUsVUFBVTtTQUNsQixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLE1BQU07WUFDdkIsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7YUFDbEM7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLG9FQUFvRTtvQkFDeEUsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO29CQUNoRCxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtpQkFDcEQ7Z0JBQ0Q7b0JBQ0UsRUFBRSxFQUFFLHFFQUFxRTtvQkFDekUsaUJBQWlCLGVBQU8sVUFBVSxDQUFDLFlBQVksSUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFFO2lCQUNqRTthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxhQUFhO1lBQzlCLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsOEVBQThFO29CQUNsRixhQUFhLEVBQUUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtvQkFDN0UsZ0JBQWdCLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO29CQUN4QyxpQkFBaUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO2lCQUM5RTtnQkFDRDtvQkFDRSxFQUFFLEVBQUUsaUZBQWlGO29CQUNyRixnQkFBZ0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7b0JBQ3hDLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7aUJBQzlFO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLGFBQWE7WUFDOUIsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7YUFDakM7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHFFQUFxRTtvQkFDekUsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO29CQUMvQyxnQkFBZ0IsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDOUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7aUJBQ3JEO2dCQUNEO29CQUNFLEVBQUUsRUFBRSwrQ0FBK0M7b0JBQ25ELGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUM5QyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsWUFBWTtpQkFDM0M7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsa0JBQWtCO1lBQ25DLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2FBQ3JDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx5RUFBeUU7b0JBQzdFLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtvQkFDcEQsZ0JBQWdCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO29CQUN2QyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtpQkFDeEQ7Z0JBQ0Q7b0JBQ0UsRUFBRSxFQUFFLDJFQUEyRTtvQkFDL0UsZ0JBQWdCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO29CQUN2QyxpQkFBaUIsZUFBTyxVQUFVLENBQUMsWUFBWSxJQUFFLFdBQVcsRUFBRSxJQUFJLEdBQUU7aUJBQ3JFO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwRkQsb0JBb0ZDIiwiZmlsZSI6ImFwcC9zdG9yZS9vcmRlci9vcmRlci5zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT3JkZXJBY3Rpb25zIGZyb20gJy4vb3JkZXIuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBPcmRlclN0YXRlIGZyb20gJy4vb3JkZXIuc3RhdGUnO1xuaW1wb3J0IHsgU3RhdGVTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL3N0YXRlLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdPcmRlciBSZWR1Y2VyJywgKCkgPT4ge1xuICAgIHN0YXRlU3BlY0hlbHBlci5zZXRSZWR1Y2VyVGVzdE1vZHVsZXMoe1xuICAgICAgYWN0aW9uczogT3JkZXJBY3Rpb25zLFxuICAgICAgc3RhdGU6IE9yZGVyU3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdMb2FkJyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBwcmV2aW91cyBzdGF0ZSBidXQgd2l0aCBsb2FkaW5nOiB0cnVlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IHNvbWU6ICdzdHVmZicsIGxvYWRpbmc6IGZhbHNlIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgc29tZTogJ3N0dWZmJywgbG9hZGluZzogdHJ1ZSB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGhvdXQgcHJldmlvdXMgc3RhdGUsIHJldHVybnMgaW5pdGlhbFN0YXRlIGJ1dCB3aXRoIGxvYWRpbmc6IHRydWUnLFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLk9yZGVyU3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnTG9hZFN1Y2Nlc3MnLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBuZXcgc3RhdGUgd2l0aCB1cGRhdGVkIG9yZGVyIGFuZCBsb2FkaW5nOiBmYWxzZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBhY3RpdmVPcmRlcjogJ3ByZXZpb3VzJywgbG9hZGluZzogdHJ1ZSwgY2hlY2tpbmdPdXQ6IGZhbHNlIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBhY3RpdmVPcmRlcjogJ25ldycgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBhY3RpdmVPcmRlcjogJ25ldycsIGxvYWRpbmc6IGZhbHNlLCBjaGVja2luZ091dDogZmFsc2UgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRob3V0IHByZXZpb3VzIHN0YXRlLCByZXR1cm5zIG5ldyBzdGF0ZSB3aXRoIHVwZGF0ZWQgb3JkZXIgYW5kIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGFjdGl2ZU9yZGVyOiAnbmV3JyB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IGFjdGl2ZU9yZGVyOiAnbmV3JywgbG9hZGluZzogZmFsc2UsIGNoZWNraW5nT3V0OiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWRGYWlsdXJlJyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBsb2FkaW5nOiB0cnVlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRoIHByZXZpb3VzIHN0YXRlLCByZXR1cm5zIHByZXZpb3VzIHN0YXRlIGJ1dCB3aXRoIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IHNvbWU6ICdzdHVmZicsIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IHNvbWU6ICdzdHVmZicsIGxvYWRpbmc6IGZhbHNlIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aG91dCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBpbml0aWFsIHN0YXRlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiBPcmRlclN0YXRlLmluaXRpYWxTdGF0ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdTZXRDaGVja291dFN0YXRlJyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBjaGVja2luZ091dDogdHJ1ZSB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBwcmV2aW91cyBzdGF0ZSBidXQgd2l0aCBhY3Rpb24uY2hlY2tpbmdPdXQnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgc29tZTogJ3N0dWZmJywgY2hlY2tpbmdPdXQ6IGZhbHNlIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBjaGVja2luZ091dDogdHJ1ZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IHNvbWU6ICdzdHVmZicsIGNoZWNraW5nT3V0OiB0cnVlIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aG91dCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBpbml0aWFsIHN0YXRlIGJ1dCB3aXRoIGFjdGlvbi5jaGVja2luZ091dCcsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBjaGVja2luZ091dDogdHJ1ZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLk9yZGVyU3RhdGUuaW5pdGlhbFN0YXRlLCBjaGVja2luZ091dDogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
