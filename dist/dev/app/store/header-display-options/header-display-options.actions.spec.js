"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var header_display_options_actions_1 = require("./header-display-options.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Header Display Options Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.ActionFactory,
                name: 'setHeaderPosition',
                parameters: [100]
            },
            expectedAction: {
                type: '[Header Display Options] Set Header Position',
                pageVerticalOffset: 100
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.ActionFactory,
                name: 'checkIfHeaderCanBeFixed',
                parameters: ['/user/login']
            },
            expectedAction: {
                type: '[Header Display Options] Check If Header Can Be Fixed',
                url: '/user/login'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.ActionFactory,
                name: 'checkIfFiltersAreAvailable',
                parameters: ['/user/login']
            },
            expectedAction: {
                type: '[Header Display Options] Check If Filters Are Available',
                url: '/user/login'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.ActionFactory,
                name: 'reset',
                parameters: []
            },
            expectedAction: {
                type: '[Header Display Options] Reset'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.InternalActionFactory,
                name: 'disableFix',
                parameters: []
            },
            expectedAction: {
                type: '[Header Display Options] Disable Fix'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.InternalActionFactory,
                name: 'enableFix',
                parameters: []
            },
            expectedAction: {
                type: '[Header Display Options] Enable Fix'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.InternalActionFactory,
                name: 'fix',
                parameters: []
            },
            expectedAction: {
                type: '[Header Display Options] Fix'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.InternalActionFactory,
                name: 'unfix',
                parameters: []
            },
            expectedAction: {
                type: '[Header Display Options] Unfix'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.InternalActionFactory,
                name: 'enableFilters',
                parameters: []
            },
            expectedAction: {
                type: '[Header Display Options] Enable Filters'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: header_display_options_actions_1.InternalActionFactory,
                name: 'disableFilters',
                parameters: []
            },
            expectedAction: {
                type: '[Header Display Options] Disable Filters'
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9oZWFkZXItZGlzcGxheS1vcHRpb25zL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUZBQXdGO0FBQ3hGLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUN6QyxJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsOENBQWE7Z0JBQ3BCLElBQUksRUFBRSxtQkFBbUI7Z0JBQ3pCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUNsQjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsOENBQThDO2dCQUNwRCxrQkFBa0IsRUFBRSxHQUFHO2FBQ3hCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsOENBQWE7Z0JBQ3BCLElBQUksRUFBRSx5QkFBeUI7Z0JBQy9CLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQzthQUM1QjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsdURBQXVEO2dCQUM3RCxHQUFHLEVBQUUsYUFBYTthQUNuQjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDhDQUFhO2dCQUNwQixJQUFJLEVBQUUsNEJBQTRCO2dCQUNsQyxVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDNUI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHlEQUF5RDtnQkFDL0QsR0FBRyxFQUFFLGFBQWE7YUFDbkI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSw4Q0FBYTtnQkFDcEIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsVUFBVSxFQUFFLEVBQUU7YUFDZjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsZ0NBQWdDO2FBQ3ZDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsc0RBQXFCO2dCQUM1QixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsVUFBVSxFQUFFLEVBQUU7YUFDZjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsc0NBQXNDO2FBQzdDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsc0RBQXFCO2dCQUM1QixJQUFJLEVBQUUsV0FBVztnQkFDakIsVUFBVSxFQUFFLEVBQUU7YUFDZjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUscUNBQXFDO2FBQzVDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsc0RBQXFCO2dCQUM1QixJQUFJLEVBQUUsS0FBSztnQkFDWCxVQUFVLEVBQUUsRUFBRTthQUNmO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw4QkFBOEI7YUFDckM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxzREFBcUI7Z0JBQzVCLElBQUksRUFBRSxPQUFPO2dCQUNiLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGdDQUFnQzthQUN2QztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLHNEQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHlDQUF5QzthQUNoRDtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLHNEQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsVUFBVSxFQUFFLEVBQUU7YUFDZjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMENBQTBDO2FBQ2pEO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBckhELG9CQXFIQyIsImZpbGUiOiJhcHAvc3RvcmUvaGVhZGVyLWRpc3BsYXktb3B0aW9ucy9oZWFkZXItZGlzcGxheS1vcHRpb25zLmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vaGVhZGVyLWRpc3BsYXktb3B0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IEFjdGlvbnNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2FjdGlvbnMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0hlYWRlciBEaXNwbGF5IE9wdGlvbnMgQWN0aW9ucycsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3NldEhlYWRlclBvc2l0aW9uJyxcbiAgICAgICAgcGFyYW1ldGVyczogWzEwMF1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIFNldCBIZWFkZXIgUG9zaXRpb24nLFxuICAgICAgICBwYWdlVmVydGljYWxPZmZzZXQ6IDEwMFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdjaGVja0lmSGVhZGVyQ2FuQmVGaXhlZCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnL3VzZXIvbG9naW4nXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbSGVhZGVyIERpc3BsYXkgT3B0aW9uc10gQ2hlY2sgSWYgSGVhZGVyIENhbiBCZSBGaXhlZCcsXG4gICAgICAgIHVybDogJy91c2VyL2xvZ2luJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdjaGVja0lmRmlsdGVyc0FyZUF2YWlsYWJsZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnL3VzZXIvbG9naW4nXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbSGVhZGVyIERpc3BsYXkgT3B0aW9uc10gQ2hlY2sgSWYgRmlsdGVycyBBcmUgQXZhaWxhYmxlJyxcbiAgICAgICAgdXJsOiAnL3VzZXIvbG9naW4nXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3Jlc2V0JyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIFJlc2V0J1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Rpc2FibGVGaXgnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbSGVhZGVyIERpc3BsYXkgT3B0aW9uc10gRGlzYWJsZSBGaXgnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZW5hYmxlRml4JyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIEVuYWJsZSBGaXgnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZml4JyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIEZpeCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICd1bmZpeCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tIZWFkZXIgRGlzcGxheSBPcHRpb25zXSBVbmZpeCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdlbmFibGVGaWx0ZXJzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIEVuYWJsZSBGaWx0ZXJzJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Rpc2FibGVGaWx0ZXJzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0hlYWRlciBEaXNwbGF5IE9wdGlvbnNdIERpc2FibGUgRmlsdGVycydcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
