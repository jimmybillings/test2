"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UiConfigState = require("./ui-config.state");
var UiConfigActions = require("./ui-config.actions");
var state_spec_helper_1 = require("../spec-helpers/state.spec-helper");
function main() {
    var stateSpecHelper = new state_spec_helper_1.StateSpecHelper();
    describe('Ui Config Reducer', function () {
        stateSpecHelper.setReducerTestModules({
            actions: UiConfigActions,
            state: UiConfigState,
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'LoadSuccess',
            customTests: [{
                    it: 'returns the state with loaded true and the new config',
                    actionParameters: { config: { components: { some: 'config' } } },
                    expectedNextState: { loaded: true, components: { some: 'config' } }
                }]
        });
        stateSpecHelper.generateTestsFor({
            actionClassName: 'InitializeSuccess',
            mutationTestData: {
                actionParameters: { config: { components: { some: 'config' } } }
            },
            customTests: [{
                    it: 'returns the state with loaded false and the new config',
                    actionParameters: { config: { components: { some: 'config' } } },
                    expectedNextState: { loaded: false, components: { some: 'config' } }
                }]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLnN0YXRlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBbUQ7QUFDbkQscURBQXVEO0FBQ3ZELHVFQUFvRTtBQUVwRTtJQUNFLElBQU0sZUFBZSxHQUFvQixJQUFJLG1DQUFlLEVBQUUsQ0FBQztJQUUvRCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsZUFBZSxDQUFDLHFCQUFxQixDQUFDO1lBQ3BDLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQixlQUFlLEVBQUUsYUFBYTtZQUM5QixXQUFXLEVBQUUsQ0FBQztvQkFDWixFQUFFLEVBQUUsdURBQXVEO29CQUMzRCxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO29CQUNoRSxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFO2lCQUNwRSxDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLGVBQWUsRUFBRSxtQkFBbUI7WUFDcEMsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7YUFDakU7WUFDRCxXQUFXLEVBQUUsQ0FBQztvQkFDWixFQUFFLEVBQUUsd0RBQXdEO29CQUM1RCxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO29CQUNoRSxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFO2lCQUNyRSxDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBOUJELG9CQThCQyIsImZpbGUiOiJhcHAvc3RvcmUvdWktY29uZmlnL3VpLWNvbmZpZy5zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVWlDb25maWdTdGF0ZSBmcm9tICcuL3VpLWNvbmZpZy5zdGF0ZSc7XG5pbXBvcnQgKiBhcyBVaUNvbmZpZ0FjdGlvbnMgZnJvbSAnLi91aS1jb25maWcuYWN0aW9ucyc7XG5pbXBvcnQgeyBTdGF0ZVNwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvc3RhdGUuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3Qgc3RhdGVTcGVjSGVscGVyOiBTdGF0ZVNwZWNIZWxwZXIgPSBuZXcgU3RhdGVTcGVjSGVscGVyKCk7XG5cbiAgZGVzY3JpYmUoJ1VpIENvbmZpZyBSZWR1Y2VyJywgKCkgPT4ge1xuICAgIHN0YXRlU3BlY0hlbHBlci5zZXRSZWR1Y2VyVGVzdE1vZHVsZXMoe1xuICAgICAgYWN0aW9uczogVWlDb25maWdBY3Rpb25zLFxuICAgICAgc3RhdGU6IFVpQ29uZmlnU3RhdGUsXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdMb2FkU3VjY2VzcycsXG4gICAgICBjdXN0b21UZXN0czogW3tcbiAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIGxvYWRlZCB0cnVlIGFuZCB0aGUgbmV3IGNvbmZpZycsXG4gICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY29uZmlnOiB7IGNvbXBvbmVudHM6IHsgc29tZTogJ2NvbmZpZycgfSB9IH0sXG4gICAgICAgIGV4cGVjdGVkTmV4dFN0YXRlOiB7IGxvYWRlZDogdHJ1ZSwgY29tcG9uZW50czogeyBzb21lOiAnY29uZmlnJyB9IH1cbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBzdGF0ZVNwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBhY3Rpb25DbGFzc05hbWU6ICdJbml0aWFsaXplU3VjY2VzcycsXG4gICAgICBtdXRhdGlvblRlc3REYXRhOiB7XG4gICAgICAgIGFjdGlvblBhcmFtZXRlcnM6IHsgY29uZmlnOiB7IGNvbXBvbmVudHM6IHsgc29tZTogJ2NvbmZpZycgfSB9IH1cbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW3tcbiAgICAgICAgaXQ6ICdyZXR1cm5zIHRoZSBzdGF0ZSB3aXRoIGxvYWRlZCBmYWxzZSBhbmQgdGhlIG5ldyBjb25maWcnLFxuICAgICAgICBhY3Rpb25QYXJhbWV0ZXJzOiB7IGNvbmZpZzogeyBjb21wb25lbnRzOiB7IHNvbWU6ICdjb25maWcnIH0gfSB9LFxuICAgICAgICBleHBlY3RlZE5leHRTdGF0ZTogeyBsb2FkZWQ6IGZhbHNlLCBjb21wb25lbnRzOiB7IHNvbWU6ICdjb25maWcnIH0gfVxuICAgICAgfV1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
