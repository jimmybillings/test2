"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HeaderDisplayOptionsState = require("./header-display-options.state");
var HeaderDisplayOptionsActions = require("./header-display-options.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Header Display Options Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: HeaderDisplayOptionsActions,
            state: HeaderDisplayOptionsState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'EnableFix',
            customTests: [
                {
                    it: 'returns the state with canBeFixed: true',
                    previousState: { canBeFixed: false },
                    expectedNextState: { canBeFixed: true }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'DisableFix',
            mutationTestData: {
                previousState: { canBeFixed: true }
            },
            customTests: [
                {
                    it: 'returns the state with canBeFixed: false',
                    previousState: { canBeFixed: true },
                    expectedNextState: { canBeFixed: false }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'EnableFilters',
            customTests: [
                {
                    it: 'returns the state with filtersAreAvailable: true',
                    previousState: { filtersAreAvailable: false },
                    expectedNextState: { filtersAreAvailable: true }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'DisableFilters',
            mutationTestData: {
                previousState: { filtersAreAvailable: true }
            },
            customTests: [
                {
                    it: 'returns the state with filtersAreAvailable: false',
                    previousState: { filtersAreAvailable: true },
                    expectedNextState: { filtersAreAvailable: false }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Fix',
            customTests: [
                {
                    it: 'returns the state with isFixed: true',
                    previousState: { isFixed: false },
                    expectedNextState: { isFixed: true }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Unfix',
            mutationTestData: {
                previousState: { isFixed: true }
            },
            customTests: [
                {
                    it: 'returns the state with isFixed: false',
                    previousState: { isFixed: true },
                    expectedNextState: { isFixed: false }
                }
            ]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'Reset',
            mutationTestData: {
                previousState: { canBeFixed: true }
            },
            customTests: [
                {
                    it: 'returns the default state',
                    previousState: { canBeFixed: true },
                    expectedNextState: HeaderDisplayOptionsState.initialState
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9oZWFkZXItZGlzcGxheS1vcHRpb25zL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMuc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBFQUE0RTtBQUM1RSw4RUFBZ0Y7QUFDaEYsdUVBQW9FO0FBRXBFO0lBQ0UsSUFBTSxlQUFlLEdBQW9CLElBQUksbUNBQWUsRUFBRSxDQUFDO0lBRS9ELFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUN6QyxlQUFlLENBQUMscUJBQXFCLENBQUM7WUFDcEMsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxLQUFLLEVBQUUseUJBQXlCO1NBQ2pDLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsV0FBVztZQUM1QixXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHlDQUF5QztvQkFDN0MsYUFBYSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtvQkFDcEMsaUJBQWlCLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO2lCQUN4QzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxZQUFZO1lBQzdCLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO2FBQ3BDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSwwQ0FBMEM7b0JBQzlDLGFBQWEsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7b0JBQ25DLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtpQkFDekM7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsZUFBZTtZQUNoQyxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLGtEQUFrRDtvQkFDdEQsYUFBYSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFO29CQUM3QyxpQkFBaUIsRUFBRSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRTtpQkFDakQ7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsZ0JBQWdCO1lBQ2pDLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUU7YUFDN0M7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLG1EQUFtRDtvQkFDdkQsYUFBYSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFO29CQUM1QyxpQkFBaUIsRUFBRSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRTtpQkFDbEQ7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsS0FBSztZQUN0QixXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHNDQUFzQztvQkFDMUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtvQkFDakMsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO2lCQUNyQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxPQUFPO1lBQ3hCLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO2FBQ2pDO1lBQ0QsV0FBVyxFQUFFO2dCQUNYO29CQUNFLEVBQUUsRUFBRSx1Q0FBdUM7b0JBQzNDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7b0JBQ2hDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtpQkFDdEM7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsT0FBTztZQUN4QixnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTthQUNwQztZQUNELFdBQVcsRUFBRTtnQkFDWDtvQkFDRSxFQUFFLEVBQUUsMkJBQTJCO29CQUMvQixhQUFhLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO29CQUNuQyxpQkFBaUIsRUFBRSx5QkFBeUIsQ0FBQyxZQUFZO2lCQUMxRDthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbEdELG9CQWtHQyIsImZpbGUiOiJhcHAvc3RvcmUvaGVhZGVyLWRpc3BsYXktb3B0aW9ucy9oZWFkZXItZGlzcGxheS1vcHRpb25zLnN0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBIZWFkZXJEaXNwbGF5T3B0aW9uc1N0YXRlIGZyb20gJy4vaGVhZGVyLWRpc3BsYXktb3B0aW9ucy5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMgZnJvbSAnLi9oZWFkZXItZGlzcGxheS1vcHRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3RhdGVTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL3N0YXRlLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHN0YXRlU3BlY0hlbHBlcjogU3RhdGVTcGVjSGVscGVyID0gbmV3IFN0YXRlU3BlY0hlbHBlcigpO1xuXG4gIGRlc2NyaWJlKCdIZWFkZXIgRGlzcGxheSBPcHRpb25zIFJlZHVjZXInLCAoKSA9PiB7XG4gICAgc3RhdGVTcGVjSGVscGVyLnNldFJlZHVjZXJUZXN0TW9kdWxlcyh7XG4gICAgICBhY3Rpb25zOiBIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMsXG4gICAgICBzdGF0ZTogSGVhZGVyRGlzcGxheU9wdGlvbnNTdGF0ZSxcbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ0VuYWJsZUZpeCcsXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIGNhbkJlRml4ZWQ6IHRydWUnLFxuICAgICAgICAgIHByZXZpb3VzU3RhdGU6IHsgY2FuQmVGaXhlZDogZmFsc2UgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBjYW5CZUZpeGVkOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgc3RhdGVTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgYWN0aW9uQ2xhc3NOYW1lOiAnRGlzYWJsZUZpeCcsXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IHsgY2FuQmVGaXhlZDogdHJ1ZSB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyB0aGUgc3RhdGUgd2l0aCBjYW5CZUZpeGVkOiBmYWxzZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBjYW5CZUZpeGVkOiB0cnVlIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgY2FuQmVGaXhlZDogZmFsc2UgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdFbmFibGVGaWx0ZXJzJyxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ3JldHVybnMgdGhlIHN0YXRlIHdpdGggZmlsdGVyc0FyZUF2YWlsYWJsZTogdHJ1ZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBmaWx0ZXJzQXJlQXZhaWxhYmxlOiBmYWxzZSB9LFxuICAgICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IGZpbHRlcnNBcmVBdmFpbGFibGU6IHRydWUgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdEaXNhYmxlRmlsdGVycycsXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGU6IHsgZmlsdGVyc0FyZUF2YWlsYWJsZTogdHJ1ZSB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyB0aGUgc3RhdGUgd2l0aCBmaWx0ZXJzQXJlQXZhaWxhYmxlOiBmYWxzZScsXG4gICAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBmaWx0ZXJzQXJlQXZhaWxhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgZmlsdGVyc0FyZUF2YWlsYWJsZTogZmFsc2UgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdGaXgnLFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAncmV0dXJucyB0aGUgc3RhdGUgd2l0aCBpc0ZpeGVkOiB0cnVlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IGlzRml4ZWQ6IGZhbHNlIH0sXG4gICAgICAgICAgZXhwZWN0ZWROZXh0U3RhdGU6IHsgaXNGaXhlZDogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ1VuZml4JyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBpc0ZpeGVkOiB0cnVlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIGlzRml4ZWQ6IGZhbHNlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IGlzRml4ZWQ6IHRydWUgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBpc0ZpeGVkOiBmYWxzZSB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHN0YXRlU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGFjdGlvbkNsYXNzTmFtZTogJ1Jlc2V0JyxcbiAgICAgIG11dGF0aW9uVGVzdERhdGE6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZTogeyBjYW5CZUZpeGVkOiB0cnVlIH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBkZWZhdWx0IHN0YXRlJyxcbiAgICAgICAgICBwcmV2aW91c1N0YXRlOiB7IGNhbkJlRml4ZWQ6IHRydWUgfSxcbiAgICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogSGVhZGVyRGlzcGxheU9wdGlvbnNTdGF0ZS5pbml0aWFsU3RhdGVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
