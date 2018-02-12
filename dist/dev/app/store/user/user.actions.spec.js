"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_actions_1 = require("./user.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('User Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: user_actions_1.ActionFactory,
                name: 'getAllUsersByAccountId',
                parameters: [1]
            },
            expectedAction: {
                type: '[User] Get All Users By Account Id',
                accountId: 1
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: user_actions_1.InternalActionFactory,
                name: 'getAllUsersByAccountIdSuccess',
                parameters: [{ users: 'lots of users' }]
            },
            expectedAction: {
                type: '[User] Get All Users By Account Id Success',
                users: { users: 'lots of users' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91c2VyL3VzZXIuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXNFO0FBQ3RFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDdkIsSUFBSSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRW5FLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDRCQUFhO2dCQUNwQixJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG9DQUFvQztnQkFDMUMsU0FBUyxFQUFFLENBQUM7YUFDYjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLG9DQUFxQjtnQkFDNUIsSUFBSSxFQUFFLCtCQUErQjtnQkFDckMsVUFBVSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUM7YUFDekM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDRDQUE0QztnQkFDbEQsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRTthQUNsQztTQUNGLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBR0wsQ0FBQztBQS9CRCxvQkErQkMiLCJmaWxlIjoiYXBwL3N0b3JlL3VzZXIvdXNlci5hY3Rpb25zLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25GYWN0b3J5LCBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgfSBmcm9tICcuL3VzZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdVc2VyIEFjdGlvbnMnLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdnZXRBbGxVc2Vyc0J5QWNjb3VudElkJyxcbiAgICAgICAgcGFyYW1ldGVyczogWzFdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tVc2VyXSBHZXQgQWxsIFVzZXJzIEJ5IEFjY291bnQgSWQnLFxuICAgICAgICBhY2NvdW50SWQ6IDFcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdnZXRBbGxVc2Vyc0J5QWNjb3VudElkU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHVzZXJzOiAnbG90cyBvZiB1c2VycycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1VzZXJdIEdldCBBbGwgVXNlcnMgQnkgQWNjb3VudCBJZCBTdWNjZXNzJyxcbiAgICAgICAgdXNlcnM6IHsgdXNlcnM6ICdsb3RzIG9mIHVzZXJzJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSk7XG5cblxufVxuIl19
