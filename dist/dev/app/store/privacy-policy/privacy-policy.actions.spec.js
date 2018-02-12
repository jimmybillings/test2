"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var privacy_policy_actions_1 = require("./privacy-policy.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Privacy Policy Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: privacy_policy_actions_1.ActionFactory,
                name: 'load',
                parameters: ['12']
            },
            expectedAction: {
                type: '[Privacy Policy] Load',
                documentId: '12'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: privacy_policy_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: ['some-doc']
            },
            expectedAction: {
                type: '[Privacy Policy] Load Success',
                document: 'some-doc'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: privacy_policy_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: ['some-error']
            },
            expectedAction: {
                type: '[Privacy Policy] Load Failure',
                error: 'some-error'
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBZ0Y7QUFDaEYsMkVBQXdFO0FBRXhFO0lBQ0UsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBQ2pDLElBQUksaUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVuRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxzQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO2FBQ25CO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsOENBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO2FBQ3pCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwrQkFBK0I7Z0JBQ3JDLFFBQVEsRUFBRSxVQUFVO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsOENBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQzNCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwrQkFBK0I7Z0JBQ3JDLEtBQUssRUFBRSxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBeENELG9CQXdDQyIsImZpbGUiOiJhcHAvc3RvcmUvcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuYWN0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9wcml2YWN5LXBvbGljeS5hY3Rpb25zJztcbmltcG9ydCB7IEFjdGlvbnNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2FjdGlvbnMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1ByaXZhY3kgUG9saWN5IEFjdGlvbnMnLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkJyxcbiAgICAgICAgcGFyYW1ldGVyczogWycxMiddXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tQcml2YWN5IFBvbGljeV0gTG9hZCcsXG4gICAgICAgIGRvY3VtZW50SWQ6ICcxMidcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnc29tZS1kb2MnXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUHJpdmFjeSBQb2xpY3ldIExvYWQgU3VjY2VzcycsXG4gICAgICAgIGRvY3VtZW50OiAnc29tZS1kb2MnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZEZhaWx1cmUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbJ3NvbWUtZXJyb3InXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUHJpdmFjeSBQb2xpY3ldIExvYWQgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiAnc29tZS1lcnJvcidcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
