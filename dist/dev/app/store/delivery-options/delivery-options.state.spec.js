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
var DeliveryOptionsState = require("./delivery-options.state");
var DeliveryOptionsActions = require("./delivery-options.actions");
var AssetActions = require("../asset/asset.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Delivery Options Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: DeliveryOptionsActions,
            state: DeliveryOptionsState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: [
                'LoadSearchAsset', 'LoadQuoteShowAsset', 'LoadQuoteEditAsset', 'LoadCartAsset', 'LoadActiveCollectionAsset'
            ],
            overrideActionClass: AssetActions,
            mutationTestData: {
                previousState: DeliveryOptionsState.initialState
            },
            customTests: [
                {
                    it: 'returns the default state but with loading: true',
                    previousState: DeliveryOptionsState.initialState,
                    expectedNextState: __assign({}, DeliveryOptionsState.initialState, { loading: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Load',
            mutationTestData: {
                previousState: DeliveryOptionsState.initialState,
                actionParameters: { activeAsset: { assetId: 123 } }
            },
            customTests: [
                {
                    it: 'returns the default state but with loading: true and the activeAssetId',
                    previousState: DeliveryOptionsState.initialState,
                    actionParameters: { activeAsset: { assetId: 123 } },
                    expectedNextState: __assign({}, DeliveryOptionsState.initialState, { loading: true, activeAssetId: 123 })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSuccess',
            mutationTestData: {
                previousState: { hasDeliveryOptions: false, options: [], loading: true },
                actionParameters: { options: [{ some: 'options' }] }
            },
            customTests: [
                {
                    it: 'returns the right state when there are delivery options',
                    previousState: { hasDeliveryOptions: false, options: [], loading: true },
                    actionParameters: { options: [{ some: 'options' }] },
                    expectedNextState: {
                        hasDeliveryOptions: true, options: [{ some: 'options' }], loading: false, showLoadingMessage: false
                    }
                },
                {
                    it: 'returns the right state when there are NO delivery options',
                    previousState: { hasDeliveryOptions: false, options: [], loading: true },
                    actionParameters: { options: [] },
                    expectedNextState: { hasDeliveryOptions: false, options: [], loading: false, showLoadingMessage: false }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'SetLoadingMessageFlag',
            customTests: [
                {
                    it: 'sets the showLoadingMessage in the state to true',
                    previousState: DeliveryOptionsState.initialState,
                    expectedNextState: __assign({}, DeliveryOptionsState.initialState, { showLoadingMessage: true })
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0RBQWlFO0FBQ2pFLG1FQUFxRTtBQUNyRSxxREFBdUQ7QUFDdkQsdUVBQW9FO0FBRXBFO0lBQ0UsSUFBTSxlQUFlLEdBQW9CLElBQUksbUNBQWUsRUFBRSxDQUFDO0lBRS9ELFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixLQUFLLEVBQUUsb0JBQW9CO1NBQzVCLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUU7Z0JBQ2YsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjthQUM1RztZQUNELG1CQUFtQixFQUFFLFlBQVk7WUFDakMsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxZQUFZO2FBQ2pEO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxrREFBa0Q7b0JBQ3RELGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxZQUFZO29CQUNoRCxpQkFBaUIsZUFBTyxvQkFBb0IsQ0FBQyxZQUFZLElBQUUsT0FBTyxFQUFFLElBQUksR0FBRTtpQkFDM0U7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsTUFBTTtZQUN2QixnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLG9CQUFvQixDQUFDLFlBQVk7Z0JBQ2hELGdCQUFnQixFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFO2FBQ3BEO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx3RUFBd0U7b0JBQzVFLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxZQUFZO29CQUNoRCxnQkFBZ0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDbkQsaUJBQWlCLGVBQU8sb0JBQW9CLENBQUMsWUFBWSxJQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsR0FBRTtpQkFDL0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsYUFBYTtZQUM5QixnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtnQkFDeEUsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFO2FBQ3JEO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx5REFBeUQ7b0JBQzdELGFBQWEsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7b0JBQ3hFLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRTtvQkFDcEQsaUJBQWlCLEVBQUU7d0JBQ2pCLGtCQUFrQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsS0FBSztxQkFDcEc7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsRUFBRSxFQUFFLDREQUE0RDtvQkFDaEUsYUFBYSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtvQkFDeEUsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO29CQUNqQyxpQkFBaUIsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFO2lCQUN6RzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSx1QkFBdUI7WUFDeEMsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxrREFBa0Q7b0JBQ3RELGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxZQUFZO29CQUNoRCxpQkFBaUIsZUFBTyxvQkFBb0IsQ0FBQyxZQUFZLElBQUUsa0JBQWtCLEVBQUUsSUFBSSxHQUFFO2lCQUN0RjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBN0VELG9CQTZFQyIsImZpbGUiOiJhcHAvc3RvcmUvZGVsaXZlcnktb3B0aW9ucy9kZWxpdmVyeS1vcHRpb25zLnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBEZWxpdmVyeU9wdGlvbnNTdGF0ZSBmcm9tICcuL2RlbGl2ZXJ5LW9wdGlvbnMuc3RhdGUnO1xuaW1wb3J0ICogYXMgRGVsaXZlcnlPcHRpb25zQWN0aW9ucyBmcm9tICcuL2RlbGl2ZXJ5LW9wdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBBc3NldEFjdGlvbnMgZnJvbSAnLi4vYXNzZXQvYXNzZXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBTdGF0ZVNwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3Qgc3RhdGVTcGVjSGVscGVyOiBTdGF0ZVNwZWNIZWxwZXIgPSBuZXcgU3RhdGVTcGVjSGVscGVyKCk7XG5cbiAgZGVzY3JpYmUoJ0RlbGl2ZXJ5IE9wdGlvbnMgUmVkdWNlcicsICgpID0+IHtcbiAgICBzdGF0ZVNwZWNIZWxwZXIuc2V0UmVkdWNlclRlc3RNb2R1bGVzKHtcbiAgICAgIGFjdGlvbnM6IERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMsXG4gICAgICBzdGF0ZTogRGVsaXZlcnlPcHRpb25zU3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFtcbiAgICAgICAgJ0xvYWRTZWFyY2hBc3NldCcsICdMb2FkUXVvdGVTaG93QXNzZXQnLCAnTG9hZFF1b3RlRWRpdEFzc2V0JywgJ0xvYWRDYXJ0QXNzZXQnLCAnTG9hZEFjdGl2ZUNvbGxlY3Rpb25Bc3NldCdcbiAgICAgIF0sXG4gICAgICBvdmVycmlkZUFjdGlvbkNsYXNzOiBBc3NldEFjdGlvbnMsXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IERlbGl2ZXJ5T3B0aW9uc1N0YXRlLmluaXRpYWxTdGF0ZVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIGRlZmF1bHQgc3RhdGUgYnV0IHdpdGggbG9hZGluZzogdHJ1ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogRGVsaXZlcnlPcHRpb25zU3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLkRlbGl2ZXJ5T3B0aW9uc1N0YXRlLmluaXRpYWxTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWQnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBwcmV2aW91c1N0YXRlOiBEZWxpdmVyeU9wdGlvbnNTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgYWN0aXZlQXNzZXQ6IHsgYXNzZXRJZDogMTIzIH0gfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIGRlZmF1bHQgc3RhdGUgYnV0IHdpdGggbG9hZGluZzogdHJ1ZSBhbmQgdGhlIGFjdGl2ZUFzc2V0SWQnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IERlbGl2ZXJ5T3B0aW9uc1N0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGFjdGl2ZUFzc2V0OiB7IGFzc2V0SWQ6IDEyMyB9IH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uRGVsaXZlcnlPcHRpb25zU3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiB0cnVlLCBhY3RpdmVBc3NldElkOiAxMjMgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdMb2FkU3VjY2VzcycsXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IHsgaGFzRGVsaXZlcnlPcHRpb25zOiBmYWxzZSwgb3B0aW9uczogW10sIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBvcHRpb25zOiBbeyBzb21lOiAnb3B0aW9ucycgfV0gfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHJpZ2h0IHN0YXRlIHdoZW4gdGhlcmUgYXJlIGRlbGl2ZXJ5IG9wdGlvbnMnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgaGFzRGVsaXZlcnlPcHRpb25zOiBmYWxzZSwgb3B0aW9uczogW10sIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IG9wdGlvbnM6IFt7IHNvbWU6ICdvcHRpb25zJyB9XSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICBoYXNEZWxpdmVyeU9wdGlvbnM6IHRydWUsIG9wdGlvbnM6IFt7IHNvbWU6ICdvcHRpb25zJyB9XSwgbG9hZGluZzogZmFsc2UsIHNob3dMb2FkaW5nTWVzc2FnZTogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHJpZ2h0IHN0YXRlIHdoZW4gdGhlcmUgYXJlIE5PIGRlbGl2ZXJ5IG9wdGlvbnMnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgaGFzRGVsaXZlcnlPcHRpb25zOiBmYWxzZSwgb3B0aW9uczogW10sIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IG9wdGlvbnM6IFtdIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgaGFzRGVsaXZlcnlPcHRpb25zOiBmYWxzZSwgb3B0aW9uczogW10sIGxvYWRpbmc6IGZhbHNlLCBzaG93TG9hZGluZ01lc3NhZ2U6IGZhbHNlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnU2V0TG9hZGluZ01lc3NhZ2VGbGFnJyxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3NldHMgdGhlIHNob3dMb2FkaW5nTWVzc2FnZSBpbiB0aGUgc3RhdGUgdG8gdHJ1ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogRGVsaXZlcnlPcHRpb25zU3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLkRlbGl2ZXJ5T3B0aW9uc1N0YXRlLmluaXRpYWxTdGF0ZSwgc2hvd0xvYWRpbmdNZXNzYWdlOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
