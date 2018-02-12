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
var SearchState = require("./search.state");
var SearchActions = require("./search.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Search Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: SearchActions,
            state: SearchState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadResults',
            mutationTestData: {
                previousState: SearchState.initialState
            },
            customTests: [
                {
                    it: 'returns a new state with loading: true',
                    previousState: SearchState.initialState,
                    expectedNextState: __assign({}, SearchState.initialState, { loading: true })
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadResultsSuccess',
            mutationTestData: {
                previousState: SearchState.initialState,
                actionParameters: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } } }
            },
            customTests: [
                {
                    it: 'returns a new state with loading: false, and the search results',
                    previousState: __assign({}, SearchState.initialState, { loading: true }),
                    actionParameters: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } } },
                    expectedNextState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: false }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Reset',
            mutationTestData: {
                previousState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: false }
            },
            customTests: [
                {
                    it: 'returns the initialState',
                    previousState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: false },
                    expectedNextState: SearchState.initialState
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadResultsFailure',
            mutationTestData: {
                previousState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: true }
            },
            customTests: [
                {
                    it: 'returns the previous state with loading set to false',
                    previousState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: true },
                    expectedNextState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: false }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLnN0YXRlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDRDQUE4QztBQUM5QyxnREFBa0Q7QUFDbEQsdUVBQW9FO0FBRXBFO0lBQ0UsSUFBTSxlQUFlLEdBQW9CLElBQUksbUNBQWUsRUFBRSxDQUFDO0lBRS9ELFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsT0FBTyxFQUFFLGFBQWE7WUFDdEIsS0FBSyxFQUFFLFdBQVc7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxhQUFhO1lBQzlCLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsV0FBVyxDQUFDLFlBQVk7YUFDeEM7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHdDQUF3QztvQkFDNUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxZQUFZO29CQUN2QyxpQkFBaUIsZUFBTyxXQUFXLENBQUMsWUFBWSxJQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUU7aUJBQ2xFO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLG9CQUFvQjtZQUNyQyxnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLFdBQVcsQ0FBQyxZQUFZO2dCQUN2QyxnQkFBZ0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUU7YUFDcEc7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLGlFQUFpRTtvQkFDckUsYUFBYSxlQUFPLFdBQVcsQ0FBQyxZQUFZLElBQUUsT0FBTyxFQUFFLElBQUksR0FBRTtvQkFDN0QsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFO29CQUNuRyxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtpQkFDckg7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsT0FBTztZQUN4QixnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO2FBQ2pIO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSwwQkFBMEI7b0JBQzlCLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtvQkFDaEgsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLFlBQVk7aUJBQzVDO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsZUFBZSxFQUFFLG9CQUFvQjtZQUNyQyxnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO2FBQ2hIO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSxzREFBc0Q7b0JBQzFELGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtvQkFDL0csaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7aUJBQ3JIO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuRUQsb0JBbUVDIiwiZmlsZSI6ImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTZWFyY2hTdGF0ZSBmcm9tICcuL3NlYXJjaC5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBTZWFyY2hBY3Rpb25zIGZyb20gJy4vc2VhcmNoLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGVTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL3N0YXRlLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdTZWFyY2ggUmVkdWNlcicsICgpID0+IHtcbiAgICBzdGF0ZVNwZWNIZWxwZXIuc2V0UmVkdWNlclRlc3RNb2R1bGVzKHtcbiAgICAgIGFjdGlvbnM6IFNlYXJjaEFjdGlvbnMsXG4gICAgICBzdGF0ZTogU2VhcmNoU3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdMb2FkUmVzdWx0cycsXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IFNlYXJjaFN0YXRlLmluaXRpYWxTdGF0ZVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgYSBuZXcgc3RhdGUgd2l0aCBsb2FkaW5nOiB0cnVlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiBTZWFyY2hTdGF0ZS5pbml0aWFsU3RhdGUsXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgLi4uU2VhcmNoU3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnTG9hZFJlc3VsdHNTdWNjZXNzJyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogU2VhcmNoU3RhdGUuaW5pdGlhbFN0YXRlLFxuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IHJlc3VsdHM6IHsgaXRlbXM6IFt7IHNvbWU6ICdyZXN1bHRzJyB9XSwgcGFnaW5hdGlvbjogeyBzb21lOiAncGFnaW5hdGlvbicgfSB9IH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIGEgbmV3IHN0YXRlIHdpdGggbG9hZGluZzogZmFsc2UsIGFuZCB0aGUgc2VhcmNoIHJlc3VsdHMnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgLi4uU2VhcmNoU3RhdGUuaW5pdGlhbFN0YXRlLCBsb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgICAgYWN0aW9uUGFyYW1ldGVyczogeyByZXN1bHRzOiB7IGl0ZW1zOiBbeyBzb21lOiAncmVzdWx0cycgfV0sIHBhZ2luYXRpb246IHsgc29tZTogJ3BhZ2luYXRpb24nIH0gfSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IHJlc3VsdHM6IHsgaXRlbXM6IFt7IHNvbWU6ICdyZXN1bHRzJyB9XSwgcGFnaW5hdGlvbjogeyBzb21lOiAncGFnaW5hdGlvbicgfSB9LCBsb2FkaW5nOiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ1Jlc2V0JyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyByZXN1bHRzOiB7IGl0ZW1zOiBbeyBzb21lOiAncmVzdWx0cycgfV0sIHBhZ2luYXRpb246IHsgc29tZTogJ3BhZ2luYXRpb24nIH0gfSwgbG9hZGluZzogZmFsc2UgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIGluaXRpYWxTdGF0ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyByZXN1bHRzOiB7IGl0ZW1zOiBbeyBzb21lOiAncmVzdWx0cycgfV0sIHBhZ2luYXRpb246IHsgc29tZTogJ3BhZ2luYXRpb24nIH0gfSwgbG9hZGluZzogZmFsc2UgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogU2VhcmNoU3RhdGUuaW5pdGlhbFN0YXRlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0xvYWRSZXN1bHRzRmFpbHVyZScsXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IHsgcmVzdWx0czogeyBpdGVtczogW3sgc29tZTogJ3Jlc3VsdHMnIH1dLCBwYWdpbmF0aW9uOiB7IHNvbWU6ICdwYWdpbmF0aW9uJyB9IH0sIGxvYWRpbmc6IHRydWUgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHByZXZpb3VzIHN0YXRlIHdpdGggbG9hZGluZyBzZXQgdG8gZmFsc2UnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgcmVzdWx0czogeyBpdGVtczogW3sgc29tZTogJ3Jlc3VsdHMnIH1dLCBwYWdpbmF0aW9uOiB7IHNvbWU6ICdwYWdpbmF0aW9uJyB9IH0sIGxvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyByZXN1bHRzOiB7IGl0ZW1zOiBbeyBzb21lOiAncmVzdWx0cycgfV0sIHBhZ2luYXRpb246IHsgc29tZTogJ3BhZ2luYXRpb24nIH0gfSwgbG9hZGluZzogZmFsc2UgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH0pO1xufVxuIl19
