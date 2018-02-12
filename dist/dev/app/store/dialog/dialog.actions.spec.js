"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_actions_1 = require("./dialog.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    var onAcceptFn = function () { };
    var onDeclineFn = function () { };
    describe('Dialog Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            comment: 'Without an onDecline callback',
            factoryMethod: {
                class: dialog_actions_1.ActionFactory,
                name: 'showConfirmation',
                parameters: [{ some: 'title' }, onAcceptFn]
            },
            expectedAction: {
                type: '[Dialog] Show Confirmation',
                confirmationDialogOptions: { some: 'title' },
                onAccept: onAcceptFn,
                onDecline: jasmine.any(Function)
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'With an onDecline callback',
            factoryMethod: {
                class: dialog_actions_1.ActionFactory,
                name: 'showConfirmation',
                parameters: [{ some: 'title' }, onAcceptFn, onDeclineFn]
            },
            expectedAction: {
                type: '[Dialog] Show Confirmation',
                confirmationDialogOptions: { some: 'title' },
                onAccept: onAcceptFn,
                onDecline: onDeclineFn
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: dialog_actions_1.InternalActionFactory,
                name: 'showConfirmationSuccess',
                parameters: []
            },
            expectedAction: {
                type: '[Dialog] Show Confirmation Success'
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kaWFsb2cvZGlhbG9nLmFjdGlvbnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF3RTtBQUN4RSwyRUFBd0U7QUFFeEU7SUFDRSxJQUFNLFVBQVUsR0FBYSxjQUFRLENBQUMsQ0FBQztJQUN2QyxJQUFNLFdBQVcsR0FBYSxjQUFRLENBQUMsQ0FBQztJQUV4QyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7UUFDaEMsSUFBSSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRW5FLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxPQUFPLEVBQUUsK0JBQStCO1lBQ3hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsOEJBQWE7Z0JBQ3BCLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLFVBQVUsQ0FBQzthQUM1QztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsNEJBQTRCO2dCQUNsQyx5QkFBeUIsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQzVDLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7YUFDakM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDhCQUFhO2dCQUNwQixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDO2FBQ3pEO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw0QkFBNEI7Z0JBQ2xDLHlCQUF5QixFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtnQkFDNUMsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFNBQVMsRUFBRSxXQUFXO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsc0NBQXFCO2dCQUM1QixJQUFJLEVBQUUseUJBQXlCO2dCQUMvQixVQUFVLEVBQUUsRUFBRTthQUNmO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxvQ0FBb0M7YUFDM0M7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFoREQsb0JBZ0RDIiwiZmlsZSI6ImFwcC9zdG9yZS9kaWFsb2cvZGlhbG9nLmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vZGlhbG9nLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBvbkFjY2VwdEZuOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcbiAgY29uc3Qgb25EZWNsaW5lRm46IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuXG4gIGRlc2NyaWJlKCdEaWFsb2cgQWN0aW9uIEZhY3RvcnknLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGNvbW1lbnQ6ICdXaXRob3V0IGFuIG9uRGVjbGluZSBjYWxsYmFjaycsXG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2hvd0NvbmZpcm1hdGlvbicsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICd0aXRsZScgfSwgb25BY2NlcHRGbl1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0RpYWxvZ10gU2hvdyBDb25maXJtYXRpb24nLFxuICAgICAgICBjb25maXJtYXRpb25EaWFsb2dPcHRpb25zOiB7IHNvbWU6ICd0aXRsZScgfSxcbiAgICAgICAgb25BY2NlcHQ6IG9uQWNjZXB0Rm4sXG4gICAgICAgIG9uRGVjbGluZTogamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgY29tbWVudDogJ1dpdGggYW4gb25EZWNsaW5lIGNhbGxiYWNrJyxcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdzaG93Q29uZmlybWF0aW9uJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ3RpdGxlJyB9LCBvbkFjY2VwdEZuLCBvbkRlY2xpbmVGbl1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0RpYWxvZ10gU2hvdyBDb25maXJtYXRpb24nLFxuICAgICAgICBjb25maXJtYXRpb25EaWFsb2dPcHRpb25zOiB7IHNvbWU6ICd0aXRsZScgfSxcbiAgICAgICAgb25BY2NlcHQ6IG9uQWNjZXB0Rm4sXG4gICAgICAgIG9uRGVjbGluZTogb25EZWNsaW5lRm5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdzaG93Q29uZmlybWF0aW9uU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tEaWFsb2ddIFNob3cgQ29uZmlybWF0aW9uIFN1Y2Nlc3MnXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
