"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_config_actions_1 = require("./ui-config.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Ui Config Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: ui_config_actions_1.ActionFactory,
                name: 'initialize',
                parameters: ['commerce']
            },
            expectedAction: {
                type: '[Ui Config] Initialize',
                siteName: 'commerce'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: ui_config_actions_1.ActionFactory,
                name: 'load',
                parameters: []
            },
            expectedAction: {
                type: '[Ui Config] Load'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: ui_config_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ some: 'config' }]
            },
            expectedAction: {
                type: '[Ui Config] Load Success',
                config: { some: 'config' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: ui_config_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Ui Config] Load Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: ui_config_actions_1.InternalActionFactory,
                name: 'initializeSuccess',
                parameters: [{ some: 'config' }]
            },
            expectedAction: {
                type: '[Ui Config] Initialize Success',
                config: { some: 'config' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: ui_config_actions_1.InternalActionFactory,
                name: 'initializeFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Ui Config] Initialize Failure',
                error: { some: 'error' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLmFjdGlvbnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUEyRTtBQUMzRSwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsSUFBSSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRW5FLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGlDQUFhO2dCQUNwQixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO2FBQ3pCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSx3QkFBd0I7Z0JBQzlCLFFBQVEsRUFBRSxVQUFVO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsaUNBQWE7Z0JBQ3BCLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGtCQUFrQjthQUN6QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLHlDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQ2pDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwwQkFBMEI7Z0JBQ2hDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7YUFDM0I7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSx5Q0FBcUI7Z0JBQzVCLElBQUksRUFBRSxhQUFhO2dCQUNuQixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNoQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMEJBQTBCO2dCQUNoQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUseUNBQXFCO2dCQUM1QixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzthQUNqQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsZ0NBQWdDO2dCQUN0QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2FBQzNCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUseUNBQXFCO2dCQUM1QixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNoQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsZ0NBQWdDO2dCQUN0QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBM0VELG9CQTJFQyIsImZpbGUiOiJhcHAvc3RvcmUvdWktY29uZmlnL3VpLWNvbmZpZy5hY3Rpb25zLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25GYWN0b3J5LCBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgfSBmcm9tICcuL3VpLWNvbmZpZy5hY3Rpb25zJztcbmltcG9ydCB7IEFjdGlvbnNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2FjdGlvbnMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1VpIENvbmZpZyBBY3Rpb25zJywgKCkgPT4ge1xuICAgIGxldCBhY3Rpb25zU3BlY0hlbHBlcjogQWN0aW9uc1NwZWNIZWxwZXIgPSBuZXcgQWN0aW9uc1NwZWNIZWxwZXIoKTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnaW5pdGlhbGl6ZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnY29tbWVyY2UnXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbVWkgQ29uZmlnXSBJbml0aWFsaXplJyxcbiAgICAgICAgc2l0ZU5hbWU6ICdjb21tZXJjZSdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tVaSBDb25maWddIExvYWQnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnY29uZmlnJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbVWkgQ29uZmlnXSBMb2FkIFN1Y2Nlc3MnLFxuICAgICAgICBjb25maWc6IHsgc29tZTogJ2NvbmZpZycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbVWkgQ29uZmlnXSBMb2FkIEZhaWx1cmUnLFxuICAgICAgICBlcnJvcjogeyBzb21lOiAnZXJyb3InIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdpbml0aWFsaXplU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdjb25maWcnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tVaSBDb25maWddIEluaXRpYWxpemUgU3VjY2VzcycsXG4gICAgICAgIGNvbmZpZzogeyBzb21lOiAnY29uZmlnJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnaW5pdGlhbGl6ZUZhaWx1cmUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnZXJyb3InIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tVaSBDb25maWddIEluaXRpYWxpemUgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
