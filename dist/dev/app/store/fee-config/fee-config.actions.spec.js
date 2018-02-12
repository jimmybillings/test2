"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fee_config_actions_1 = require("./fee-config.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Fee Config Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: fee_config_actions_1.ActionFactory,
                name: 'loadFeeConfig',
                parameters: []
            },
            expectedAction: {
                type: '[Fee Config] Load Fee Config'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: fee_config_actions_1.InternalActionFactory,
                name: 'loadFeeConfigSuccess',
                parameters: [{ feeConfig: 'fee config' }]
            },
            expectedAction: {
                type: '[Fee Config] Load Fee Config Success',
                feeConfig: { 'feeConfig': 'fee config' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQTRFO0FBQzVFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtRQUM3QixJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsa0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxlQUFlO2dCQUNyQixVQUFVLEVBQUUsRUFBRTthQUNmO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw4QkFBOEI7YUFDckM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwwQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxDQUFDO2FBQzFDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxzQ0FBc0M7Z0JBQzVDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUU7YUFDekM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEzQkQsb0JBMkJDIiwiZmlsZSI6ImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuYWN0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9mZWUtY29uZmlnLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnRmVlIENvbmZpZyBBY3Rpb25zJywgKCkgPT4ge1xuICAgIGxldCBhY3Rpb25zU3BlY0hlbHBlcjogQWN0aW9uc1NwZWNIZWxwZXIgPSBuZXcgQWN0aW9uc1NwZWNIZWxwZXIoKTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZEZlZUNvbmZpZycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tGZWUgQ29uZmlnXSBMb2FkIEZlZSBDb25maWcnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZEZlZUNvbmZpZ1N1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBmZWVDb25maWc6ICdmZWUgY29uZmlnJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbRmVlIENvbmZpZ10gTG9hZCBGZWUgQ29uZmlnIFN1Y2Nlc3MnLFxuICAgICAgICBmZWVDb25maWc6IHsgJ2ZlZUNvbmZpZyc6ICdmZWUgY29uZmlnJyB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
