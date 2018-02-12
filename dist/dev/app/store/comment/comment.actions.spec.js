"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_actions_1 = require("./comment.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Comment Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.ActionFactory,
                name: 'load',
                parameters: [{ objectType: 'collection', objectId: 1 }]
            },
            expectedAction: {
                type: '[Comment] Load',
                parentObject: { objectType: 'collection', objectId: 1 }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.ActionFactory,
                name: 'formSubmit',
                parameters: [{ objectType: 'collection', objectId: 1 }, { some: 'comment' }]
            },
            expectedAction: {
                type: '[Comment] Form Submit',
                parentObject: { objectType: 'collection', objectId: 1 },
                comment: { some: 'comment' },
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.ActionFactory,
                name: 'remove',
                parameters: [{ objectType: 'collection', objectId: 1 }, 2]
            },
            expectedAction: {
                type: '[Comment] Remove',
                parentObject: { objectType: 'collection', objectId: 1 },
                commentId: 2,
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.ActionFactory,
                name: 'changeFormModeToAdd',
                parameters: []
            },
            expectedAction: {
                type: '[Comment] Change Form Mode To ADD'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.ActionFactory,
                name: 'changeFormModeToEdit',
                parameters: [{ some: 'comment' }]
            },
            expectedAction: {
                type: '[Comment] Change Form Mode To EDIT',
                commentBeingEdited: { some: 'comment' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.ActionFactory,
                name: 'getCounts',
                parameters: [{ some: 'parentObject' }]
            },
            expectedAction: {
                type: '[Comment] Get Counts',
                parentObject: { some: 'parentObject' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ some: 'comments' }]
            },
            expectedAction: {
                type: '[Comment] Load Success',
                comments: { some: 'comments' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.InternalActionFactory,
                name: 'formSubmitSuccess',
                parameters: [{ some: 'comments' }]
            },
            expectedAction: {
                type: '[Comment] Form Submit Success',
                comments: { some: 'comments' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.InternalActionFactory,
                name: 'removeSuccess',
                parameters: [{ some: 'comments' }]
            },
            expectedAction: {
                type: '[Comment] Remove Success',
                comments: { some: 'comments' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: comment_actions_1.InternalActionFactory,
                name: 'getCountsSuccess',
                parameters: [{ some: 'counts' }]
            },
            expectedAction: {
                type: '[Comment] Get Counts Success',
                counts: { some: 'counts' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb21tZW50L2NvbW1lbnQuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlFO0FBQ3pFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtRQUNqQyxJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsK0JBQWE7Z0JBQ3BCLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDeEQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFO2FBQ3hEO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsK0JBQWE7Z0JBQ3BCLElBQUksRUFBRSxZQUFZO2dCQUNsQixVQUFVLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2FBQzdFO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRTtnQkFDdkQsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTthQUM3QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFF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QUFRLEVBQUUsQ0FBQzthQUNqQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsOEJBQThCO2dCQUNwQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2FBQzNCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBN0hELG9CQTZIQyIsImZpbGUiOiJhcHAvc3RvcmUvY29tbWVudC9jb21tZW50LmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vY29tbWVudC5hY3Rpb25zJztcbmltcG9ydCB7IEFjdGlvbnNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2FjdGlvbnMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NvbW1lbnQgQWN0aW9uIEZhY3RvcnknLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ29tbWVudF0gTG9hZCcsXG4gICAgICAgIHBhcmVudE9iamVjdDogeyBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsIG9iamVjdElkOiAxIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZm9ybVN1Ym1pdCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEgfSwgeyBzb21lOiAnY29tbWVudCcgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NvbW1lbnRdIEZvcm0gU3VibWl0JyxcbiAgICAgICAgcGFyZW50T2JqZWN0OiB7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEgfSxcbiAgICAgICAgY29tbWVudDogeyBzb21lOiAnY29tbWVudCcgfSxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAncmVtb3ZlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMSB9LCAyXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ29tbWVudF0gUmVtb3ZlJyxcbiAgICAgICAgcGFyZW50T2JqZWN0OiB7IG9iamVjdFR5cGU6ICdjb2xsZWN0aW9uJywgb2JqZWN0SWQ6IDEgfSxcbiAgICAgICAgY29tbWVudElkOiAyLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdjaGFuZ2VGb3JtTW9kZVRvQWRkJyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NvbW1lbnRdIENoYW5nZSBGb3JtIE1vZGUgVG8gQUREJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdjaGFuZ2VGb3JtTW9kZVRvRWRpdCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdjb21tZW50JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ29tbWVudF0gQ2hhbmdlIEZvcm0gTW9kZSBUbyBFRElUJyxcbiAgICAgICAgY29tbWVudEJlaW5nRWRpdGVkOiB7IHNvbWU6ICdjb21tZW50JyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dldENvdW50cycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdwYXJlbnRPYmplY3QnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tDb21tZW50XSBHZXQgQ291bnRzJyxcbiAgICAgICAgcGFyZW50T2JqZWN0OiB7IHNvbWU6ICdwYXJlbnRPYmplY3QnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdjb21tZW50cycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NvbW1lbnRdIExvYWQgU3VjY2VzcycsXG4gICAgICAgIGNvbW1lbnRzOiB7IHNvbWU6ICdjb21tZW50cycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Zvcm1TdWJtaXRTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2NvbW1lbnRzJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ29tbWVudF0gRm9ybSBTdWJtaXQgU3VjY2VzcycsXG4gICAgICAgIGNvbW1lbnRzOiB7IHNvbWU6ICdjb21tZW50cycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3JlbW92ZVN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnY29tbWVudHMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tDb21tZW50XSBSZW1vdmUgU3VjY2VzcycsXG4gICAgICAgIGNvbW1lbnRzOiB7IHNvbWU6ICdjb21tZW50cycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dldENvdW50c1N1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnY291bnRzJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ29tbWVudF0gR2V0IENvdW50cyBTdWNjZXNzJyxcbiAgICAgICAgY291bnRzOiB7IHNvbWU6ICdjb3VudHMnIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
