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
var FeeConfigState = require("./fee-config.state");
var FeeConfigActions = require("./fee-config.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Fee Config Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: FeeConfigActions,
            state: FeeConfigState,
        });
        stateSpecHelper.setReducerTestModules({
            actions: FeeConfigActions,
            state: FeeConfigState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['LoadFeeConfig'],
            customTests: [
                {
                    it: 'Sets initialized to false',
                    previousState: FeeConfigState.initialState,
                    expectedNextState: __assign({}, FeeConfigState.initialState, { initialized: false })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['LoadFeeConfigSuccess'],
            customTests: [
                {
                    it: 'Sets feeConfig from server if object has items and initialized to true',
                    actionParameters: { feeConfig: { items: ['one', 'two', 'three'] } },
                    previousState: __assign({}, FeeConfigState.initialState, { initialized: false }),
                    expectedNextState: __assign({}, FeeConfigState.initialState, { feeConfig: { items: ['one', 'two', 'three'] }, initialized: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['LoadFeeConfigSuccess'],
            customTests: [
                {
                    it: 'Sets empty items array if response from server is bad',
                    actionParameters: {},
                    previousState: __assign({}, FeeConfigState.initialState, { initialized: false }),
                    expectedNextState: __assign({}, FeeConfigState.initialState, { feeConfig: { items: [] }, initialized: true })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JELHVEQUF5RDtBQUN6RCx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzdCLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLEtBQUssRUFBRSxjQUFjO1NBQ3RCLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLEtBQUssRUFBRSxjQUFjO1NBQ3RCLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDbEMsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSwyQkFBMkI7b0JBQy9CLGFBQWEsRUFBRSxjQUFjLENBQUMsWUFBWTtvQkFDMUMsaUJBQWlCLGVBQU8sY0FBYyxDQUFDLFlBQVksSUFBRSxXQUFXLEVBQUUsS0FBSyxHQUFFO2lCQUMxRTthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ3pDLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsd0VBQXdFO29CQUM1RSxnQkFBZ0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRTtvQkFDbkUsYUFBYSxlQUFPLGNBQWMsQ0FBQyxZQUFZLElBQUUsV0FBVyxFQUFFLEtBQUssR0FBRTtvQkFDckUsaUJBQWlCLGVBQU8sY0FBYyxDQUFDLFlBQVksSUFBRSxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksR0FBRTtpQkFDeEg7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUN6QyxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHVEQUF1RDtvQkFDM0QsZ0JBQWdCLEVBQUUsRUFBRTtvQkFDcEIsYUFBYSxlQUFPLGNBQWMsQ0FBQyxZQUFZLElBQUUsV0FBVyxFQUFFLEtBQUssR0FBRTtvQkFDckUsaUJBQWlCLGVBQU8sY0FBYyxDQUFDLFlBQVksSUFBRSxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksR0FBRTtpQkFDbkc7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpERCxvQkFpREMiLCJmaWxlIjoiYXBwL3N0b3JlL2ZlZS1jb25maWcvZmVlLWNvbmZpZy5zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRmVlQ29uZmlnU3RhdGUgZnJvbSAnLi9mZWUtY29uZmlnLnN0YXRlJztcbmltcG9ydCAqIGFzIEZlZUNvbmZpZ0FjdGlvbnMgZnJvbSAnLi9mZWUtY29uZmlnLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGVTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL3N0YXRlLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdGZWUgQ29uZmlnIFJlZHVjZXInLCAoKSA9PiB7XG4gICAgc3RhdGVTcGVjSGVscGVyLnNldFJlZHVjZXJUZXN0TW9kdWxlcyh7XG4gICAgICBhY3Rpb25zOiBGZWVDb25maWdBY3Rpb25zLFxuICAgICAgc3RhdGU6IEZlZUNvbmZpZ1N0YXRlLFxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLnNldFJlZHVjZXJUZXN0TW9kdWxlcyh7XG4gICAgICBhY3Rpb25zOiBGZWVDb25maWdBY3Rpb25zLFxuICAgICAgc3RhdGU6IEZlZUNvbmZpZ1N0YXRlLFxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbJ0xvYWRGZWVDb25maWcnXSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ1NldHMgaW5pdGlhbGl6ZWQgdG8gZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IEZlZUNvbmZpZ1N0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyAuLi5GZWVDb25maWdTdGF0ZS5pbml0aWFsU3RhdGUsIGluaXRpYWxpemVkOiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydMb2FkRmVlQ29uZmlnU3VjY2VzcyddLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnU2V0cyBmZWVDb25maWcgZnJvbSBzZXJ2ZXIgaWYgb2JqZWN0IGhhcyBpdGVtcyBhbmQgaW5pdGlhbGl6ZWQgdG8gdHJ1ZScsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBmZWVDb25maWc6IHsgaXRlbXM6IFsnb25lJywgJ3R3bycsICd0aHJlZSddIH0gfSxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IC4uLkZlZUNvbmZpZ1N0YXRlLmluaXRpYWxTdGF0ZSwgaW5pdGlhbGl6ZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uRmVlQ29uZmlnU3RhdGUuaW5pdGlhbFN0YXRlLCBmZWVDb25maWc6IHsgaXRlbXM6IFsnb25lJywgJ3R3bycsICd0aHJlZSddIH0sIGluaXRpYWxpemVkOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbJ0xvYWRGZWVDb25maWdTdWNjZXNzJ10sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdTZXRzIGVtcHR5IGl0ZW1zIGFycmF5IGlmIHJlc3BvbnNlIGZyb20gc2VydmVyIGlzIGJhZCcsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczoge30sXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyAuLi5GZWVDb25maWdTdGF0ZS5pbml0aWFsU3RhdGUsIGluaXRpYWxpemVkOiBmYWxzZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLkZlZUNvbmZpZ1N0YXRlLmluaXRpYWxTdGF0ZSwgZmVlQ29uZmlnOiB7IGl0ZW1zOiBbXSB9LCBpbml0aWFsaXplZDogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
