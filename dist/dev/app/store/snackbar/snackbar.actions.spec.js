"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var snackbar_actions_1 = require("./snackbar.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Snackbar Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: snackbar_actions_1.ActionFactory,
                name: 'display',
                parameters: ['some key', { some: 'parameters' }]
            },
            expectedAction: {
                type: '[Snackbar] Display',
                messageKey: 'some key',
                messageParameters: { some: 'parameters' }
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'with no parameters',
            factoryMethod: {
                class: snackbar_actions_1.ActionFactory,
                name: 'display',
                parameters: ['some key']
            },
            expectedAction: {
                type: '[Snackbar] Display',
                messageKey: 'some key',
                messageParameters: {}
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: snackbar_actions_1.InternalActionFactory,
                name: 'displaySuccess',
                parameters: ['some translated string']
            },
            expectedAction: {
                type: '[Snackbar] Display Success',
                translatedMessage: 'some translated string'
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEU7QUFDMUUsMkVBQXdFO0FBRXhFO0lBQ0UsUUFBUSxDQUFDLHlCQUF5QixFQUFFO1FBQ2xDLElBQUksaUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVuRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxnQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDO2FBQ2pEO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7YUFDMUM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGdDQUFhO2dCQUNwQixJQUFJLEVBQUUsU0FBUztnQkFDZixVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDekI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG9CQUFvQjtnQkFDMUIsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLGlCQUFpQixFQUFFLEVBQUU7YUFDdEI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSx3Q0FBcUI7Z0JBQzVCLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFVBQVUsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2FBQ3ZDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw0QkFBNEI7Z0JBQ2xDLGlCQUFpQixFQUFFLHdCQUF3QjthQUM1QztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNDRCxvQkEyQ0MiLCJmaWxlIjoiYXBwL3N0b3JlL3NuYWNrYmFyL3NuYWNrYmFyLmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vc25hY2tiYXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdTbmFja2JhciBBY3Rpb24gRmFjdG9yeScsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Rpc3BsYXknLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbJ3NvbWUga2V5JywgeyBzb21lOiAncGFyYW1ldGVycycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1NuYWNrYmFyXSBEaXNwbGF5JyxcbiAgICAgICAgbWVzc2FnZUtleTogJ3NvbWUga2V5JyxcbiAgICAgICAgbWVzc2FnZVBhcmFtZXRlcnM6IHsgc29tZTogJ3BhcmFtZXRlcnMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBjb21tZW50OiAnd2l0aCBubyBwYXJhbWV0ZXJzJyxcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgcGFyYW1ldGVyczogWydzb21lIGtleSddXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tTbmFja2Jhcl0gRGlzcGxheScsXG4gICAgICAgIG1lc3NhZ2VLZXk6ICdzb21lIGtleScsXG4gICAgICAgIG1lc3NhZ2VQYXJhbWV0ZXJzOiB7fVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Rpc3BsYXlTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogWydzb21lIHRyYW5zbGF0ZWQgc3RyaW5nJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1NuYWNrYmFyXSBEaXNwbGF5IFN1Y2Nlc3MnLFxuICAgICAgICB0cmFuc2xhdGVkTWVzc2FnZTogJ3NvbWUgdHJhbnNsYXRlZCBzdHJpbmcnXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
