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
var ActiveCollectionState = require("./active-collection.state");
var ActiveCollectionActions = require("./active-collection.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Active Collection Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: ActiveCollectionActions,
            state: ActiveCollectionState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['Load', 'Set', 'LoadPage', 'AddAsset', 'RemoveAsset', 'UpdateAssetMarkers'],
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
                    it: 'without previous state, returns initial state but with loading: true',
                    expectedNextState: __assign({}, ActiveCollectionState.initialState, { loading: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['LoadSuccess', 'SetSuccess'],
            customTests: [
                {
                    it: 'with previous state, returns initial state but with new collection and loading: false',
                    previousState: { some: 'stuff', collection: 'previous', loading: true },
                    actionParameters: { activeCollection: 'new' },
                    expectedNextState: __assign({}, ActiveCollectionState.initialState, { collection: 'new', loading: false })
                },
                {
                    it: 'without previous state, returns initial state but with new collection and loading: false',
                    actionParameters: { activeCollection: 'new' },
                    expectedNextState: __assign({}, ActiveCollectionState.initialState, { collection: 'new', loading: false })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['LoadPageSuccess', 'UpdateAssetMarkersSuccess'],
            customTests: [
                {
                    it: 'with previous state, returns previous state but with new page items and loading: false',
                    previousState: { some: 'stuff', collection: { some: 'collectionStuff', assets: 'previous' }, loading: true },
                    actionParameters: { currentPageItems: 'new' },
                    expectedNextState: { some: 'stuff', collection: { some: 'collectionStuff', assets: 'new' }, loading: false }
                },
                {
                    it: 'without previous state, returns initial state but with new page items and loading: false',
                    actionParameters: { currentPageItems: 'new' },
                    expectedNextState: __assign({}, ActiveCollectionState.initialState, { collection: __assign({}, ActiveCollectionState.initialState.collection, { assets: 'new' }), loading: false })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'AddAssetSuccess',
            customTests: [
                {
                    it: 'with previous state, returns previous state but with asset updates and loading: false',
                    previousState: {
                        some: 'stuff',
                        collection: { some: 'collectionStuff', assets: 'previous', assetsCount: 99 },
                        loading: true
                    },
                    actionParameters: { currentPageItems: 'new' },
                    expectedNextState: {
                        some: 'stuff',
                        collection: { some: 'collectionStuff', assets: 'new', assetsCount: 100 },
                        loading: false
                    }
                },
                {
                    it: 'without previous state, returns initial state but with asset updates and loading: false',
                    actionParameters: { currentPageItems: 'new' },
                    expectedNextState: __assign({}, ActiveCollectionState.initialState, { collection: __assign({}, ActiveCollectionState.initialState.collection, { assets: 'new', assetsCount: 1 }), loading: false })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'RemoveAssetSuccess',
            customTests: [
                {
                    it: 'with previous state, returns previous state but with asset updates and loading: false',
                    previousState: {
                        some: 'stuff',
                        collection: { some: 'collectionStuff', assets: 'previous', assetsCount: 99 },
                        loading: true
                    },
                    actionParameters: { currentPageItems: 'new' },
                    expectedNextState: {
                        some: 'stuff',
                        collection: { some: 'collectionStuff', assets: 'new', assetsCount: 98 },
                        loading: false
                    }
                },
                {
                    it: 'without previous state, returns initial state but with asset updates and loading: false',
                    actionParameters: { currentPageItems: 'new' },
                    expectedNextState: __assign({}, ActiveCollectionState.initialState, { collection: __assign({}, ActiveCollectionState.initialState.collection, { assets: 'new', assetsCount: -1 }), loading: false })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Reset',
            mutationTestData: {
                previousState: { loading: false }
            },
            customTests: [
                {
                    it: 'with previous state, returns initial state',
                    previousState: { some: 'stuff', loading: true },
                    expectedNextState: ActiveCollectionState.initialState
                },
                {
                    it: 'without previous state, returns initial state',
                    expectedNextState: ActiveCollectionState.initialState
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: ['LoadFailure', 'SetFailure', 'LoadPageFailure', 'RemoveAssetFailure',
                'AddAssetFailure', 'RemoveAssetFailure', 'UpdateAssetMarkersFailure'],
            mutationTestData: {
                previousState: { loading: true }
            },
            customTests: [
                {
                    it: 'with previous state, returns previous state but with loading: false',
                    previousState: { some: 'stuff', loading: true },
                    expectedNextState: { some: 'stuff', loading: false }
                },
                {
                    it: 'without previous state, returns initial state but with loading: false',
                    expectedNextState: __assign({}, ActiveCollectionState.initialState, { loading: false })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'AddPageOfSearchAssetsSuccess',
            mutationTestData: {
                actionParameters: { currentPageItems: { items: [0, 1, 2, 3, 4] } }
            },
            customTests: [
                {
                    it: 'returns previous state but with new assets and loading: false',
                    previousState: {
                        collection: { assets: 'previous', assetsCount: 0 },
                        loading: true
                    },
                    actionParameters: { currentPageItems: { totalAssetsAdded: 5, items: [0, 1, 2, 3, 4], pagination: {} } },
                    expectedNextState: {
                        collection: { assets: { items: [0, 1, 2, 3, 4], pagination: {} }, assetsCount: 5 },
                        loading: false
                    }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5zdGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxpRUFBbUU7QUFDbkUscUVBQXVFO0FBRXZFLHVFQUFvRTtBQUVwRTtJQUNFLElBQU0sZUFBZSxHQUFvQixJQUFJLG1DQUFlLEVBQUUsQ0FBQztJQUUvRCxRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsZUFBZSxDQUFDLHFCQUFxQixDQUFDO1lBQ3BDLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsS0FBSyxFQUFFLHFCQUFxQjtTQUM3QixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQztZQUM3RixnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTthQUNsQztZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsb0VBQW9FO29CQUN4RSxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7b0JBQ2hELGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO2lCQUNwRDtnQkFDRDtvQkFDRSxFQUFFLEVBQUUsc0VBQXNFO29CQUMxRSxpQkFBaUIsZUFBTyxxQkFBcUIsQ0FBQyxZQUFZLElBQUUsT0FBTyxFQUFFLElBQUksR0FBRTtpQkFDNUU7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO1lBQzlDLFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUs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d0JBQ2xELE9BQU8sRUFBRSxJQUFJO3FCQUNkO29CQUNELGdCQUFnQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRTtvQkFDdkcsaUJBQWlCLEVBQUU7d0JBQ2pCLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRTt3QkFDbEYsT0FBTyxFQUFFLEtBQUs7cUJBQ2Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXRMRCxvQkFzTEMiLCJmaWxlIjoiYXBwL3N0b3JlL2FjdGl2ZS1jb2xsZWN0aW9uL2FjdGl2ZS1jb2xsZWN0aW9uLnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICogYXMgQWN0aXZlQ29sbGVjdGlvblN0YXRlIGZyb20gJy4vYWN0aXZlLWNvbGxlY3Rpb24uc3RhdGUnO1xuaW1wb3J0ICogYXMgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMgZnJvbSAnLi9hY3RpdmUtY29sbGVjdGlvbi5hY3Rpb25zJztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdGF0ZVNwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3Qgc3RhdGVTcGVjSGVscGVyOiBTdGF0ZVNwZWNIZWxwZXIgPSBuZXcgU3RhdGVTcGVjSGVscGVyKCk7XG5cbiAgZGVzY3JpYmUoJ0FjdGl2ZSBDb2xsZWN0aW9uIFJlZHVjZXInLCAoKSA9PiB7XG4gICAgc3RhdGVTcGVjSGVscGVyLnNldFJlZHVjZXJUZXN0TW9kdWxlcyh7XG4gICAgICBhY3Rpb25zOiBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucyxcbiAgICAgIHN0YXRlOiBBY3RpdmVDb2xsZWN0aW9uU3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6IFsnTG9hZCcsICdTZXQnLCAnTG9hZFBhZ2UnLCAnQWRkQXNzZXQnLCAnUmVtb3ZlQXNzZXQnLCAnVXBkYXRlQXNzZXRNYXJrZXJzJ10sXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IHsgbG9hZGluZzogZmFsc2UgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGggcHJldmlvdXMgc3RhdGUsIHJldHVybnMgcHJldmlvdXMgc3RhdGUgYnV0IHdpdGggbG9hZGluZzogdHJ1ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBzb21lOiAnc3R1ZmYnLCBsb2FkaW5nOiBmYWxzZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IHNvbWU6ICdzdHVmZicsIGxvYWRpbmc6IHRydWUgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRob3V0IHByZXZpb3VzIHN0YXRlLCByZXR1cm5zIGluaXRpYWwgc3RhdGUgYnV0IHdpdGggbG9hZGluZzogdHJ1ZScsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uQWN0aXZlQ29sbGVjdGlvblN0YXRlLmluaXRpYWxTdGF0ZSwgbG9hZGluZzogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydMb2FkU3VjY2VzcycsICdTZXRTdWNjZXNzJ10sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRoIHByZXZpb3VzIHN0YXRlLCByZXR1cm5zIGluaXRpYWwgc3RhdGUgYnV0IHdpdGggbmV3IGNvbGxlY3Rpb24gYW5kIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IHNvbWU6ICdzdHVmZicsIGNvbGxlY3Rpb246ICdwcmV2aW91cycsIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGFjdGl2ZUNvbGxlY3Rpb246ICduZXcnIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uQWN0aXZlQ29sbGVjdGlvblN0YXRlLmluaXRpYWxTdGF0ZSwgY29sbGVjdGlvbjogJ25ldycsIGxvYWRpbmc6IGZhbHNlIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aG91dCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBpbml0aWFsIHN0YXRlIGJ1dCB3aXRoIG5ldyBjb2xsZWN0aW9uIGFuZCBsb2FkaW5nOiBmYWxzZScsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBhY3RpdmVDb2xsZWN0aW9uOiAnbmV3JyB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IC4uLkFjdGl2ZUNvbGxlY3Rpb25TdGF0ZS5pbml0aWFsU3RhdGUsIGNvbGxlY3Rpb246ICduZXcnLCBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogWydMb2FkUGFnZVN1Y2Nlc3MnLCAnVXBkYXRlQXNzZXRNYXJrZXJzU3VjY2VzcyddLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBwcmV2aW91cyBzdGF0ZSBidXQgd2l0aCBuZXcgcGFnZSBpdGVtcyBhbmQgbG9hZGluZzogZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgc29tZTogJ3N0dWZmJywgY29sbGVjdGlvbjogeyBzb21lOiAnY29sbGVjdGlvblN0dWZmJywgYXNzZXRzOiAncHJldmlvdXMnIH0sIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGN1cnJlbnRQYWdlSXRlbXM6ICduZXcnIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgc29tZTogJ3N0dWZmJywgY29sbGVjdGlvbjogeyBzb21lOiAnY29sbGVjdGlvblN0dWZmJywgYXNzZXRzOiAnbmV3JyB9LCBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGhvdXQgcHJldmlvdXMgc3RhdGUsIHJldHVybnMgaW5pdGlhbCBzdGF0ZSBidXQgd2l0aCBuZXcgcGFnZSBpdGVtcyBhbmQgbG9hZGluZzogZmFsc2UnLFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY3VycmVudFBhZ2VJdGVtczogJ25ldycgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZToge1xuICAgICAgICAgICAgLi4uQWN0aXZlQ29sbGVjdGlvblN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb246IHsgLi4uQWN0aXZlQ29sbGVjdGlvblN0YXRlLmluaXRpYWxTdGF0ZS5jb2xsZWN0aW9uLCBhc3NldHM6ICduZXcnIH0sXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnQWRkQXNzZXRTdWNjZXNzJyxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGggcHJldmlvdXMgc3RhdGUsIHJldHVybnMgcHJldmlvdXMgc3RhdGUgYnV0IHdpdGggYXNzZXQgdXBkYXRlcyBhbmQgbG9hZGluZzogZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHtcbiAgICAgICAgICAgIHNvbWU6ICdzdHVmZicsXG4gICAgICAgICAgICBjb2xsZWN0aW9uOiB7IHNvbWU6ICdjb2xsZWN0aW9uU3R1ZmYnLCBhc3NldHM6ICdwcmV2aW91cycsIGFzc2V0c0NvdW50OiA5OSB9LFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBjdXJyZW50UGFnZUl0ZW1zOiAnbmV3JyB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICBzb21lOiAnc3R1ZmYnLFxuICAgICAgICAgICAgY29sbGVjdGlvbjogeyBzb21lOiAnY29sbGVjdGlvblN0dWZmJywgYXNzZXRzOiAnbmV3JywgYXNzZXRzQ291bnQ6IDEwMCB9LFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGhvdXQgcHJldmlvdXMgc3RhdGUsIHJldHVybnMgaW5pdGlhbCBzdGF0ZSBidXQgd2l0aCBhc3NldCB1cGRhdGVzIGFuZCBsb2FkaW5nOiBmYWxzZScsXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBjdXJyZW50UGFnZUl0ZW1zOiAnbmV3JyB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICAuLi5BY3RpdmVDb2xsZWN0aW9uU3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgICAgY29sbGVjdGlvbjogeyAuLi5BY3RpdmVDb2xsZWN0aW9uU3RhdGUuaW5pdGlhbFN0YXRlLmNvbGxlY3Rpb24sIGFzc2V0czogJ25ldycsIGFzc2V0c0NvdW50OiAxIH0sXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnUmVtb3ZlQXNzZXRTdWNjZXNzJyxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGggcHJldmlvdXMgc3RhdGUsIHJldHVybnMgcHJldmlvdXMgc3RhdGUgYnV0IHdpdGggYXNzZXQgdXBkYXRlcyBhbmQgbG9hZGluZzogZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHtcbiAgICAgICAgICAgIHNvbWU6ICdzdHVmZicsXG4gICAgICAgICAgICBjb2xsZWN0aW9uOiB7IHNvbWU6ICdjb2xsZWN0aW9uU3R1ZmYnLCBhc3NldHM6ICdwcmV2aW91cycsIGFzc2V0c0NvdW50OiA5OSB9LFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyBjdXJyZW50UGFnZUl0ZW1zOiAnbmV3JyB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7XG4gICAgICAgICAgICBzb21lOiAnc3R1ZmYnLFxuICAgICAgICAgICAgY29sbGVjdGlvbjogeyBzb21lOiAnY29sbGVjdGlvblN0dWZmJywgYXNzZXRzOiAnbmV3JywgYXNzZXRzQ291bnQ6IDk4IH0sXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnd2l0aG91dCBwcmV2aW91cyBzdGF0ZSwgcmV0dXJucyBpbml0aWFsIHN0YXRlIGJ1dCB3aXRoIGFzc2V0IHVwZGF0ZXMgYW5kIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGN1cnJlbnRQYWdlSXRlbXM6ICduZXcnIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHtcbiAgICAgICAgICAgIC4uLkFjdGl2ZUNvbGxlY3Rpb25TdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgICBjb2xsZWN0aW9uOiB7IC4uLkFjdGl2ZUNvbGxlY3Rpb25TdGF0ZS5pbml0aWFsU3RhdGUuY29sbGVjdGlvbiwgYXNzZXRzOiAnbmV3JywgYXNzZXRzQ291bnQ6IC0xIH0sXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnUmVzZXQnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBwcmV2aW91c1N0YXRlOiB7IGxvYWRpbmc6IGZhbHNlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRoIHByZXZpb3VzIHN0YXRlLCByZXR1cm5zIGluaXRpYWwgc3RhdGUnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgc29tZTogJ3N0dWZmJywgbG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiBBY3RpdmVDb2xsZWN0aW9uU3RhdGUuaW5pdGlhbFN0YXRlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGhvdXQgcHJldmlvdXMgc3RhdGUsIHJldHVybnMgaW5pdGlhbCBzdGF0ZScsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IEFjdGl2ZUNvbGxlY3Rpb25TdGF0ZS5pbml0aWFsU3RhdGVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiBbJ0xvYWRGYWlsdXJlJywgJ1NldEZhaWx1cmUnLCAnTG9hZFBhZ2VGYWlsdXJlJywgJ1JlbW92ZUFzc2V0RmFpbHVyZScsXG4gICAgICAgICdBZGRBc3NldEZhaWx1cmUnLCAnUmVtb3ZlQXNzZXRGYWlsdXJlJywgJ1VwZGF0ZUFzc2V0TWFya2Vyc0ZhaWx1cmUnXSxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBsb2FkaW5nOiB0cnVlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICd3aXRoIHByZXZpb3VzIHN0YXRlLCByZXR1cm5zIHByZXZpb3VzIHN0YXRlIGJ1dCB3aXRoIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IHNvbWU6ICdzdHVmZicsIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBzb21lOiAnc3R1ZmYnLCBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3dpdGhvdXQgcHJldmlvdXMgc3RhdGUsIHJldHVybnMgaW5pdGlhbCBzdGF0ZSBidXQgd2l0aCBsb2FkaW5nOiBmYWxzZScsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uQWN0aXZlQ29sbGVjdGlvblN0YXRlLmluaXRpYWxTdGF0ZSwgbG9hZGluZzogZmFsc2UgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0FkZFBhZ2VPZlNlYXJjaEFzc2V0c1N1Y2Nlc3MnLFxuICAgICAgbXV0YXRpb25UZXN0RGF0YToge1xuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGN1cnJlbnRQYWdlSXRlbXM6IHsgaXRlbXM6IFswLCAxLCAyLCAzLCA0XSB9IH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHByZXZpb3VzIHN0YXRlIGJ1dCB3aXRoIG5ldyBhc3NldHMgYW5kIGxvYWRpbmc6IGZhbHNlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uOiB7IGFzc2V0czogJ3ByZXZpb3VzJywgYXNzZXRzQ291bnQ6IDAgfSxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY3VycmVudFBhZ2VJdGVtczogeyB0b3RhbEFzc2V0c0FkZGVkOiA1LCBpdGVtczogWzAsIDEsIDIsIDMsIDRdLCBwYWdpbmF0aW9uOiB7fSB9IH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb246IHsgYXNzZXRzOiB7IGl0ZW1zOiBbMCwgMSwgMiwgMywgNF0sIHBhZ2luYXRpb246IHt9IH0sIGFzc2V0c0NvdW50OiA1IH0sXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
