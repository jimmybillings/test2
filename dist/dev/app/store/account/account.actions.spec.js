"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_actions_1 = require("./account.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Account Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: account_actions_1.ActionFactory,
                name: 'getAccountForQuoteAdmin',
                parameters: [1]
            },
            expectedAction: {
                type: '[Account] Get Account For Quote Admin',
                accountId: 1,
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: account_actions_1.InternalActionFactory,
                name: 'getAccountForQuoteAdminSuccess',
                parameters: [{ account: 'Some account' }]
            },
            expectedAction: {
                type: '[Account] Get Account For Quote Admin Success',
                account: { account: 'Some account' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: account_actions_1.InternalActionFactory,
                name: 'getAccountForQuoteAdminOnUserAdd',
                parameters: [{ accountId: 1 }]
            },
            expectedAction: {
                type: '[Account] Get Account For Quote Admin On User Add',
                accountId: { accountId: 1 },
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: account_actions_1.InternalActionFactory,
                name: 'getAccountForQuoteAdminOnUserAddSuccess',
                parameters: [{ account: 'Some account' }]
            },
            expectedAction: {
                type: '[Account] Get Account For Quote Admin On User Add Success',
                account: { account: 'Some account' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlFO0FBQ3pFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsK0JBQWE7Z0JBQ3BCLElBQUksRUFBRSx5QkFBeUI7Z0JBQy9CLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNoQjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsdUNBQXVDO2dCQUM3QyxTQUFTLEVBQUUsQ0FBQzthQUNiO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsdUNBQXFCO2dCQUM1QixJQUFJLEVBQUUsZ0NBQWdDO2dCQUN0QyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQzthQUMxQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsK0NBQStDO2dCQUNyRCxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFO2FBQ3JDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsdUNBQXFCO2dCQUM1QixJQUFJLEVBQUUsa0NBQWtDO2dCQUN4QyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUMvQjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsbURBQW1EO2dCQUN6RCxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsdUNBQXFCO2dCQUM1QixJQUFJLEVBQUUseUNBQXlDO2dCQUMvQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQzthQUMxQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMkRBQTJEO2dCQUNqRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFO2FBQ3JDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBcERELG9CQW9EQyIsImZpbGUiOiJhcHAvc3RvcmUvYWNjb3VudC9hY2NvdW50LmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vYWNjb3VudC5hY3Rpb25zJztcbmltcG9ydCB7IEFjdGlvbnNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2FjdGlvbnMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0FjY291bnQgQWN0aW9ucycsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dldEFjY291bnRGb3JRdW90ZUFkbWluJyxcbiAgICAgICAgcGFyYW1ldGVyczogWzFdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY2NvdW50XSBHZXQgQWNjb3VudCBGb3IgUXVvdGUgQWRtaW4nLFxuICAgICAgICBhY2NvdW50SWQ6IDEsXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZ2V0QWNjb3VudEZvclF1b3RlQWRtaW5TdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgYWNjb3VudDogJ1NvbWUgYWNjb3VudCcgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjY291bnRdIEdldCBBY2NvdW50IEZvciBRdW90ZSBBZG1pbiBTdWNjZXNzJyxcbiAgICAgICAgYWNjb3VudDogeyBhY2NvdW50OiAnU29tZSBhY2NvdW50JyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZ2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBhY2NvdW50SWQ6IDEgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjY291bnRdIEdldCBBY2NvdW50IEZvciBRdW90ZSBBZG1pbiBPbiBVc2VyIEFkZCcsXG4gICAgICAgIGFjY291bnRJZDogeyBhY2NvdW50SWQ6IDEgfSxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdnZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBhY2NvdW50OiAnU29tZSBhY2NvdW50JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWNjb3VudF0gR2V0IEFjY291bnQgRm9yIFF1b3RlIEFkbWluIE9uIFVzZXIgQWRkIFN1Y2Nlc3MnLFxuICAgICAgICBhY2NvdW50OiB7IGFjY291bnQ6ICdTb21lIGFjY291bnQnIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
