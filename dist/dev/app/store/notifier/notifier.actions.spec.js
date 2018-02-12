"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notifier_actions_1 = require("./notifier.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Notifier Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        var onCloseFunction = jasmine.createSpy('onCloseFunction');
        var emptyFunction = function () { };
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: notifier_actions_1.ActionFactory,
                name: 'notify',
                parameters: [{ title: 'title', message: 'message', prompt: 'prompt' }, onCloseFunction]
            },
            expectedAction: {
                type: '[Notifier] Notify',
                options: { title: 'title', message: 'message', prompt: 'prompt' },
                onClose: onCloseFunction
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'has a default prompt',
            factoryMethod: {
                class: notifier_actions_1.ActionFactory,
                name: 'notify',
                parameters: [{ title: 'title', message: 'message' }, onCloseFunction]
            },
            expectedAction: {
                type: '[Notifier] Notify',
                options: { title: 'title', message: 'message', prompt: 'NOTIFICATION.CLOSE' },
                onClose: onCloseFunction
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'has no default title or message',
            factoryMethod: {
                class: notifier_actions_1.ActionFactory,
                name: 'notify',
                parameters: [{}, onCloseFunction]
            },
            expectedAction: {
                type: '[Notifier] Notify',
                options: { prompt: 'NOTIFICATION.CLOSE' },
                onClose: onCloseFunction
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'has a default onClose function',
            factoryMethod: {
                class: notifier_actions_1.ActionFactory,
                name: 'notify',
                parameters: [{ title: 'title', message: 'message', prompt: 'prompt' }]
            },
            expectedAction: {
                type: '[Notifier] Notify',
                options: { title: 'title', message: 'message', prompt: 'prompt' },
                onClose: notifier_actions_1.defaultOnCloseFunction
            }
        });
        it('has a callable default onClose function (worthless test other than coverage)', function () {
            notifier_actions_1.defaultOnCloseFunction();
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9ub3RpZmllci9ub3RpZmllci5hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBa0c7QUFDbEcsMkVBQXdFO0FBRXhFO0lBQ0UsUUFBUSxDQUFDLHlCQUF5QixFQUFFO1FBQ2xDLElBQUksaUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUNuRSxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0QsSUFBTSxhQUFhLEdBQUcsY0FBUSxDQUFDLENBQUM7UUFFaEMsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsZ0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxRQUFRO2dCQUNkLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxlQUFlLENBQUM7YUFDeEY7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7Z0JBQ2pFLE9BQU8sRUFBRSxlQUFlO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxnQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsVUFBVSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxlQUFlLENBQUM7YUFDdEU7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRTtnQkFDN0UsT0FBTyxFQUFFLGVBQWU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsT0FBTyxFQUFFLGlDQUFpQztZQUMxQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGdDQUFhO2dCQUNwQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsZUFBZSxDQUFDO2FBQ2xDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxtQkFBbUI7Z0JBQ3pCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRTtnQkFDekMsT0FBTyxFQUFFLGVBQWU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGdDQUFhO2dCQUNwQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDdkU7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7Z0JBQ2pFLE9BQU8sRUFBRSx5Q0FBc0I7YUFDaEM7U0FDRixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsOEVBQThFLEVBQUU7WUFDakYseUNBQXNCLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpFRCxvQkFpRUMiLCJmaWxlIjoiYXBwL3N0b3JlL25vdGlmaWVyL25vdGlmaWVyLmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSwgZGVmYXVsdE9uQ2xvc2VGdW5jdGlvbiB9IGZyb20gJy4vbm90aWZpZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdOb3RpZmllciBBY3Rpb24gRmFjdG9yeScsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG4gICAgY29uc3Qgb25DbG9zZUZ1bmN0aW9uID0gamFzbWluZS5jcmVhdGVTcHkoJ29uQ2xvc2VGdW5jdGlvbicpO1xuICAgIGNvbnN0IGVtcHR5RnVuY3Rpb24gPSAoKSA9PiB7IH07XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ25vdGlmeScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHRpdGxlOiAndGl0bGUnLCBtZXNzYWdlOiAnbWVzc2FnZScsIHByb21wdDogJ3Byb21wdCcgfSwgb25DbG9zZUZ1bmN0aW9uXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbTm90aWZpZXJdIE5vdGlmeScsXG4gICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6ICd0aXRsZScsIG1lc3NhZ2U6ICdtZXNzYWdlJywgcHJvbXB0OiAncHJvbXB0JyB9LFxuICAgICAgICBvbkNsb3NlOiBvbkNsb3NlRnVuY3Rpb25cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBjb21tZW50OiAnaGFzIGEgZGVmYXVsdCBwcm9tcHQnLFxuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ25vdGlmeScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHRpdGxlOiAndGl0bGUnLCBtZXNzYWdlOiAnbWVzc2FnZScgfSwgb25DbG9zZUZ1bmN0aW9uXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbTm90aWZpZXJdIE5vdGlmeScsXG4gICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6ICd0aXRsZScsIG1lc3NhZ2U6ICdtZXNzYWdlJywgcHJvbXB0OiAnTk9USUZJQ0FUSU9OLkNMT1NFJyB9LFxuICAgICAgICBvbkNsb3NlOiBvbkNsb3NlRnVuY3Rpb25cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBjb21tZW50OiAnaGFzIG5vIGRlZmF1bHQgdGl0bGUgb3IgbWVzc2FnZScsXG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbm90aWZ5JyxcbiAgICAgICAgcGFyYW1ldGVyczogW3t9LCBvbkNsb3NlRnVuY3Rpb25dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tOb3RpZmllcl0gTm90aWZ5JyxcbiAgICAgICAgb3B0aW9uczogeyBwcm9tcHQ6ICdOT1RJRklDQVRJT04uQ0xPU0UnIH0sXG4gICAgICAgIG9uQ2xvc2U6IG9uQ2xvc2VGdW5jdGlvblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGNvbW1lbnQ6ICdoYXMgYSBkZWZhdWx0IG9uQ2xvc2UgZnVuY3Rpb24nLFxuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ25vdGlmeScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHRpdGxlOiAndGl0bGUnLCBtZXNzYWdlOiAnbWVzc2FnZScsIHByb21wdDogJ3Byb21wdCcgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW05vdGlmaWVyXSBOb3RpZnknLFxuICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiAndGl0bGUnLCBtZXNzYWdlOiAnbWVzc2FnZScsIHByb21wdDogJ3Byb21wdCcgfSxcbiAgICAgICAgb25DbG9zZTogZGVmYXVsdE9uQ2xvc2VGdW5jdGlvblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ2hhcyBhIGNhbGxhYmxlIGRlZmF1bHQgb25DbG9zZSBmdW5jdGlvbiAod29ydGhsZXNzIHRlc3Qgb3RoZXIgdGhhbiBjb3ZlcmFnZSknLCAoKSA9PiB7XG4gICAgICBkZWZhdWx0T25DbG9zZUZ1bmN0aW9uKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
