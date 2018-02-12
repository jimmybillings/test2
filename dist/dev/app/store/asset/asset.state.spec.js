"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetActions = require("./asset.actions");
var AssetState = require("./asset.state");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Asset Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: AssetActions,
            state: AssetState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: [
                'LoadQuoteShowAsset', 'LoadQuoteShowAsset', 'LoadOrderAsset',
                'LoadCartAsset', 'LoadQuoteEditAsset', 'LoadActiveCollectionAsset'
            ],
            mutationTestData: {
                actionParameters: { uuid: 'abc-123', assetType: 'order' }
            },
            customTests: [
                {
                    it: 'sets loading to true, sets the loadingUuid, and sets the activeAssetType',
                    previousState: AssetState.initialState,
                    actionParameters: { uuid: 'abc-123', assetType: 'order' },
                    expectedNextState: {
                        activeAssetType: 'order',
                        loading: true,
                        loadingUuid: 'abc-123',
                        activeAsset: { assetId: 0, name: '' }
                    }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSearchAsset',
            mutationTestData: {
                actionParameters: { assetType: 'search' }
            },
            customTests: [
                {
                    it: 'sets loading to true, and sets the activeAssetType',
                    previousState: AssetState.initialState,
                    actionParameters: { assetType: 'search' },
                    expectedNextState: {
                        activeAssetType: 'search',
                        loading: true,
                        loadingUuid: null,
                        activeAsset: { assetId: 0, name: '' }
                    }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSuccess',
            mutationTestData: {
                actionParameters: { activeAsset: { some: 'asset' } }
            },
            customTests: [
                {
                    it: 'sets loading to false, activeAsset to the asset, and sets the loadingUuid to null',
                    previousState: {
                        loading: true,
                        activeAssetType: 'search',
                        loadingUuid: 'abc-123',
                        activeAsset: { assetId: 0, name: '' }
                    },
                    actionParameters: { activeAsset: { some: 'asset' } },
                    expectedNextState: {
                        activeAssetType: 'search',
                        loading: false,
                        loadingUuid: null,
                        activeAsset: { some: 'asset' }
                    }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadFailure',
            mutationTestData: {
                previousState: {
                    loading: true,
                    activeAssetType: 'search',
                    loadingUuid: 'abc-123',
                    activeAsset: { assetId: 0, name: '' }
                },
                actionParameters: { error: { some: 'error' } }
            },
            customTests: [
                {
                    it: 'resets to the initial state',
                    previousState: {
                        loading: true,
                        activeAssetType: 'search',
                        loadingUuid: 'abc-123',
                        activeAsset: { assetId: 0, name: '' }
                    },
                    actionParameters: { error: { some: 'error' } },
                    expectedNextState: {
                        loading: false,
                        activeAssetType: 'search',
                        loadingUuid: 'abc-123',
                        activeAsset: { assetId: 0, name: '' }
                    }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hc3NldC9hc3NldC5zdGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQWdEO0FBRWhELDBDQUE0QztBQUM1Qyx1RUFBb0U7QUFFcEU7SUFDRSxJQUFNLGVBQWUsR0FBb0IsSUFBSSxtQ0FBZSxFQUFFLENBQUM7SUFFL0QsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsT0FBTyxFQUFFLFlBQVk7WUFDckIsS0FBSyxFQUFFLFVBQVU7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRTtnQkFDZixvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0I7Z0JBQzVELGVBQWUsRUFBRSxvQkFBb0IsRUFBRSwyQkFBMkI7YUFDbkU7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUU7YUFDMUQ7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLDBFQUEwRTtvQkFDOUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxZQUFZO29CQUN0QyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRTtvQkFDekQsaUJBQWlCLEVBQUU7d0JBQ2pCLGVBQWUsRUFBRSxPQUFPO3dCQUN4QixPQUFPLEVBQUUsSUFBSTt3QkFDYixXQUFXLEVBQUUsU0FBUzt3QkFDdEIsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO3FCQUN0QztpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGdCQUFnQixFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTthQUMxQztZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsb0RBQW9EO29CQUN4RCxhQUFhLEVBQUUsVUFBVSxDQUFDLFlBQVk7b0JBQ3RDLGdCQUFnQixFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtvQkFDekMsaUJBQWlCLEVBQUU7d0JBQ2pCLGVBQWUsRUFBRSxRQUFRO3dCQUN6QixPQUFPLEVBQUUsSUFBSTt3QkFDYixXQUFXLEVBQUUsSUFBSTt3QkFDakIsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO3FCQUN0QztpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxhQUFhO1lBQzlCLGdCQUFnQixFQUFFO2dCQUNoQixnQkFBZ0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTthQUNyRDtZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsbUZBQW1GO29CQUN2RixhQUFhLEVBQUU7d0JBQ2IsT0FBTyxFQUFFLElBQUk7d0JBQ2IsZUFBZSxFQUFFLFFBQVE7d0JBQ3pCLFdBQVcsRUFBRSxTQUFTO3dCQUN0QixXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7cUJBQ3RDO29CQUNELGdCQUFnQixFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUNwRCxpQkFBaUIsRUFBRTt3QkFDakIsZUFBZSxFQUFFLFFBQVE7d0JBQ3pCLE9BQU8sRUFBRSxLQUFLO3dCQUNkLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO3FCQUMvQjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxhQUFhO1lBQzlCLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUU7b0JBQ2IsT0FBTyxFQUFFLElBQUk7b0JBQ2IsZUFBZSxFQUFFLFFBQVE7b0JBQ3pCLFdBQVcsRUFBRSxTQUFTO29CQUN0QixXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7aUJBQ3RDO2dCQUNELGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFO2FBQy9DO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSw2QkFBNkI7b0JBQ2pDLGFBQWEsRUFBRTt3QkFDYixPQUFPLEVBQUUsSUFBSTt3QkFDYixlQUFlLEVBQUUsUUFBUTt3QkFDekIsV0FBVyxFQUFFLFNBQVM7d0JBQ3RCLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtxQkFDdEM7b0JBQ0QsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQzlDLGlCQUFpQixFQUFFO3dCQUNqQixPQUFPLEVBQUUsS0FBSzt3QkFDZCxlQUFlLEVBQUUsUUFBUTt3QkFDekIsV0FBVyxFQUFFLFNBQVM7d0JBQ3RCLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtxQkFDdEM7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTVHRCxvQkE0R0MiLCJmaWxlIjoiYXBwL3N0b3JlL2Fzc2V0L2Fzc2V0LnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBc3NldEFjdGlvbnMgZnJvbSAnLi9hc3NldC5hY3Rpb25zJztcblxuaW1wb3J0ICogYXMgQXNzZXRTdGF0ZSBmcm9tICcuL2Fzc2V0LnN0YXRlJztcbmltcG9ydCB7IFN0YXRlU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9zdGF0ZS5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBzdGF0ZVNwZWNIZWxwZXI6IFN0YXRlU3BlY0hlbHBlciA9IG5ldyBTdGF0ZVNwZWNIZWxwZXIoKTtcblxuICBkZXNjcmliZSgnQXNzZXQgUmVkdWNlcicsICgpID0+IHtcbiAgICBzdGF0ZVNwZWNIZWxwZXIuc2V0UmVkdWNlclRlc3RNb2R1bGVzKHtcbiAgICAgIGFjdGlvbnM6IEFzc2V0QWN0aW9ucyxcbiAgICAgIHN0YXRlOiBBc3NldFN0YXRlLFxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbXG4gICAgICAgICdMb2FkUXVvdGVTaG93QXNzZXQnLCAnTG9hZFF1b3RlU2hvd0Fzc2V0JywgJ0xvYWRPcmRlckFzc2V0JyxcbiAgICAgICAgJ0xvYWRDYXJ0QXNzZXQnLCAnTG9hZFF1b3RlRWRpdEFzc2V0JywgJ0xvYWRBY3RpdmVDb2xsZWN0aW9uQXNzZXQnXG4gICAgICBdLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHV1aWQ6ICdhYmMtMTIzJywgYXNzZXRUeXBlOiAnb3JkZXInIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdzZXRzIGxvYWRpbmcgdG8gdHJ1ZSwgc2V0cyB0aGUgbG9hZGluZ1V1aWQsIGFuZCBzZXRzIHRoZSBhY3RpdmVBc3NldFR5cGUnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IEFzc2V0U3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgdXVpZDogJ2FiYy0xMjMnLCBhc3NldFR5cGU6ICdvcmRlcicgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgYWN0aXZlQXNzZXRUeXBlOiAnb3JkZXInLFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGxvYWRpbmdVdWlkOiAnYWJjLTEyMycsXG4gICAgICAgICAgICBhY3RpdmVBc3NldDogeyBhc3NldElkOiAwLCBuYW1lOiAnJyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdMb2FkU2VhcmNoQXNzZXQnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGFzc2V0VHlwZTogJ3NlYXJjaCcgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3NldHMgbG9hZGluZyB0byB0cnVlLCBhbmQgc2V0cyB0aGUgYWN0aXZlQXNzZXRUeXBlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiBBc3NldFN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGFzc2V0VHlwZTogJ3NlYXJjaCcgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgYWN0aXZlQXNzZXRUeXBlOiAnc2VhcmNoJyxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBsb2FkaW5nVXVpZDogbnVsbCxcbiAgICAgICAgICAgIGFjdGl2ZUFzc2V0OiB7IGFzc2V0SWQ6IDAsIG5hbWU6ICcnIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWRTdWNjZXNzJyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBhY3RpdmVBc3NldDogeyBzb21lOiAnYXNzZXQnIH0gfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3NldHMgbG9hZGluZyB0byBmYWxzZSwgYWN0aXZlQXNzZXQgdG8gdGhlIGFzc2V0LCBhbmQgc2V0cyB0aGUgbG9hZGluZ1V1aWQgdG8gbnVsbCcsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGFjdGl2ZUFzc2V0VHlwZTogJ3NlYXJjaCcsXG4gICAgICAgICAgICBsb2FkaW5nVXVpZDogJ2FiYy0xMjMnLFxuICAgICAgICAgICAgYWN0aXZlQXNzZXQ6IHsgYXNzZXRJZDogMCwgbmFtZTogJycgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBhY3RpdmVBc3NldDogeyBzb21lOiAnYXNzZXQnIH0gfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgYWN0aXZlQXNzZXRUeXBlOiAnc2VhcmNoJyxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgbG9hZGluZ1V1aWQ6IG51bGwsXG4gICAgICAgICAgICBhY3RpdmVBc3NldDogeyBzb21lOiAnYXNzZXQnIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWRGYWlsdXJlJyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgYWN0aXZlQXNzZXRUeXBlOiAnc2VhcmNoJyxcbiAgICAgICAgICBsb2FkaW5nVXVpZDogJ2FiYy0xMjMnLFxuICAgICAgICAgIGFjdGl2ZUFzc2V0OiB7IGFzc2V0SWQ6IDAsIG5hbWU6ICcnIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBlcnJvcjogeyBzb21lOiAnZXJyb3InIH0gfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3Jlc2V0cyB0byB0aGUgaW5pdGlhbCBzdGF0ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGFjdGl2ZUFzc2V0VHlwZTogJ3NlYXJjaCcsXG4gICAgICAgICAgICBsb2FkaW5nVXVpZDogJ2FiYy0xMjMnLFxuICAgICAgICAgICAgYWN0aXZlQXNzZXQ6IHsgYXNzZXRJZDogMCwgbmFtZTogJycgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBlcnJvcjogeyBzb21lOiAnZXJyb3InIH0gfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBhY3RpdmVBc3NldFR5cGU6ICdzZWFyY2gnLFxuICAgICAgICAgICAgbG9hZGluZ1V1aWQ6ICdhYmMtMTIzJyxcbiAgICAgICAgICAgIGFjdGl2ZUFzc2V0OiB7IGFzc2V0SWQ6IDAsIG5hbWU6ICcnIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
