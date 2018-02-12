"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpeedPreviewActions = require("./speed-preview.actions");
var SpeedPreviewState = require("./speed-preview.state");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Speed Preview Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: SpeedPreviewActions,
            state: SpeedPreviewState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSuccess',
            mutationTestData: {
                actionParameters: {
                    speedViewData: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                    assetId: 444444
                }
            },
            customTests: [
                {
                    it: 'returns new state with updated speedview data objects and loadingAssetId: undefined',
                    previousState: {
                        222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                        333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                    },
                    actionParameters: {
                        speedViewData: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                        assetId: 444444
                    },
                    expectedNextState: {
                        222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                        333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                        444444: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                    }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadFailure',
            mutationTestData: {
                actionParameters: {
                    speedViewData: {},
                    assetId: 444444
                }
            },
            customTests: [
                {
                    it: 'returns new state with the noData property set to true',
                    previousState: {
                        222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                        333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                    },
                    actionParameters: {
                        speedViewData: {},
                        assetId: 444444
                    },
                    expectedNextState: {
                        222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                        333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                        444444: { noData: true },
                    }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVlZC1wcmV2aWV3L3NwZWVkLXByZXZpZXcuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUErRDtBQUMvRCx5REFBMkQ7QUFDM0QsdUVBQW9FO0FBRXBFO0lBQ0UsSUFBTSxlQUFlLEdBQW9CLElBQUksbUNBQWUsRUFBRSxDQUFDO0lBRS9ELFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUNoQyxlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixLQUFLLEVBQUUsaUJBQWlCO1NBQ3pCLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsYUFBYTtZQUM5QixnQkFBZ0IsRUFBRTtnQkFDaEIsZ0JBQWdCLEVBQUU7b0JBQ2hCLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7b0JBQ3hGLE9BQU8sRUFBRSxNQUFNO2lCQUNoQjthQUNGO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxxRkFBcUY7b0JBRXpGLGFBQWEsRUFBRTt3QkFDYixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO3dCQUNqRixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO3FCQUNsRjtvQkFFRCxnQkFBZ0IsRUFBRTt3QkFDaEIsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRTt3QkFDeEYsT0FBTyxFQUFFLE1BQU07cUJBQ2hCO29CQUVELGlCQUFpQixFQUFFO3dCQUNqQixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO3dCQUNqRixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO3dCQUNqRixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO3FCQUNsRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxhQUFhO1lBQzlCLGdCQUFnQixFQUFFO2dCQUNoQixnQkFBZ0IsRUFBRTtvQkFDaEIsYUFBYSxFQUFFLEVBQUU7b0JBQ2pCLE9BQU8sRUFBRSxNQUFNO2lCQUNoQjthQUNGO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx3REFBd0Q7b0JBRTVELGFBQWEsRUFBRTt3QkFDYixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO3dCQUNqRixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO3FCQUNsRjtvQkFFRCxnQkFBZ0IsRUFBRTt3QkFDaEIsYUFBYSxFQUFFLEVBQUU7d0JBQ2pCLE9BQU8sRUFBRSxNQUFNO3FCQUNoQjtvQkFFRCxpQkFBaUIsRUFBRTt3QkFDakIsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRTt3QkFDakYsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRTt3QkFDakYsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtxQkFDekI7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXZFRCxvQkF1RUMiLCJmaWxlIjoiYXBwL3N0b3JlL3NwZWVkLXByZXZpZXcvc3BlZWQtcHJldmlldy5zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU3BlZWRQcmV2aWV3QWN0aW9ucyBmcm9tICcuL3NwZWVkLXByZXZpZXcuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBTcGVlZFByZXZpZXdTdGF0ZSBmcm9tICcuL3NwZWVkLXByZXZpZXcuc3RhdGUnO1xuaW1wb3J0IHsgU3RhdGVTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL3N0YXRlLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdTcGVlZCBQcmV2aWV3IFJlZHVjZXInLCAoKSA9PiB7XG4gICAgc3RhdGVTcGVjSGVscGVyLnNldFJlZHVjZXJUZXN0TW9kdWxlcyh7XG4gICAgICBhY3Rpb25zOiBTcGVlZFByZXZpZXdBY3Rpb25zLFxuICAgICAgc3RhdGU6IFNwZWVkUHJldmlld1N0YXRlLFxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnTG9hZFN1Y2Nlc3MnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgc3BlZWRWaWV3RGF0YTogeyAncHJpY2UnOiAxNTkuMCwgJ2ltYWdlUXVpY2tWaWV3JzogZmFsc2UsICdwb3N0ZXJVcmwnOiAnc29tZXBvc3RlcnVybCcgfSxcbiAgICAgICAgICBhc3NldElkOiA0NDQ0NDRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgbmV3IHN0YXRlIHdpdGggdXBkYXRlZCBzcGVlZHZpZXcgZGF0YSBvYmplY3RzIGFuZCBsb2FkaW5nQXNzZXRJZDogdW5kZWZpbmVkJyxcblxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHtcbiAgICAgICAgICAgIDIyMjIyMjogeyAncHJpY2UnOiAxNTkuMCwgJ2ltYWdlUXVpY2tWaWV3JzogZmFsc2UsICdwb3N0ZXJVcmwnOiAnc29tZXBvc3RlcnVybCcgfSxcbiAgICAgICAgICAgIDMzMzMzMzogeyAncHJpY2UnOiAxNTkuMCwgJ2ltYWdlUXVpY2tWaWV3JzogZmFsc2UsICdwb3N0ZXJVcmwnOiAnc29tZXBvc3RlcnVybCcgfSxcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczoge1xuICAgICAgICAgICAgc3BlZWRWaWV3RGF0YTogeyAncHJpY2UnOiAxNTkuMCwgJ2ltYWdlUXVpY2tWaWV3JzogZmFsc2UsICdwb3N0ZXJVcmwnOiAnc29tZXBvc3RlcnVybCcgfSxcbiAgICAgICAgICAgIGFzc2V0SWQ6IDQ0NDQ0NFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgMjIyMjIyOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICAgICAgMzMzMzMzOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICAgICAgNDQ0NDQ0OiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnTG9hZEZhaWx1cmUnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgc3BlZWRWaWV3RGF0YToge30sXG4gICAgICAgICAgYXNzZXRJZDogNDQ0NDQ0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIG5ldyBzdGF0ZSB3aXRoIHRoZSBub0RhdGEgcHJvcGVydHkgc2V0IHRvIHRydWUnLFxuXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZToge1xuICAgICAgICAgICAgMjIyMjIyOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICAgICAgMzMzMzMzOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICBzcGVlZFZpZXdEYXRhOiB7fSxcbiAgICAgICAgICAgIGFzc2V0SWQ6IDQ0NDQ0NFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgMjIyMjIyOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICAgICAgMzMzMzMzOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICAgICAgNDQ0NDQ0OiB7IG5vRGF0YTogdHJ1ZSB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
