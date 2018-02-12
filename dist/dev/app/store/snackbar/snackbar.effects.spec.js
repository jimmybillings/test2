"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var snackbar_effects_1 = require("./snackbar.effects");
var SnackbarActions = require("./snackbar.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Snackbar Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new snackbar_effects_1.SnackbarEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'display',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SnackbarActions.Display.Type,
                messageKey: 'someMessageKey',
                messageParameters: { some: 'parameters' }
            },
            serviceMethod: {
                name: 'display',
                callsApiService: false,
                expectedArguments: ['someMessageKey', { some: 'parameters' }],
                returnsObservableOf: 'translatedString'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'displaySuccess',
                    expectedArguments: ['translatedString']
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBcUQ7QUFDckQsb0RBQXNEO0FBQ3RELDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtRQUMzQixJQUFNLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFckU7WUFDRSxNQUFNLENBQUMsSUFBSSxrQ0FBZSxDQUN4QixpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxDQUNyRyxDQUFDO1FBQ0osQ0FBQztRQUVELGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ2xDLFVBQVUsRUFBRSxnQkFBZ0I7Z0JBQzVCLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTthQUMxQztZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsU0FBUztnQkFDZixlQUFlLEVBQUUsS0FBSztnQkFDdEIsaUJBQWlCLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztnQkFDN0QsbUJBQW1CLEVBQUUsa0JBQWtCO2FBQ3hDO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsVUFBVTtvQkFDdkIsVUFBVSxFQUFFLGdCQUFnQjtvQkFDNUIsaUJBQWlCLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDeEM7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpDRCxvQkFpQ0MiLCJmaWxlIjoiYXBwL3N0b3JlL3NuYWNrYmFyL3NuYWNrYmFyLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNuYWNrYmFyRWZmZWN0cyB9IGZyb20gJy4vc25hY2tiYXIuZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBTbmFja2JhckFjdGlvbnMgZnJvbSAnLi9zbmFja2Jhci5hY3Rpb25zJztcbmltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1NuYWNrYmFyIEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogYW55IHtcbiAgICAgIHJldHVybiBuZXcgU25hY2tiYXJFZmZlY3RzKFxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5tb2NrTmdyeEVmZmVjdHNBY3Rpb25zLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU3RvcmUsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTZXJ2aWNlXG4gICAgICApO1xuICAgIH1cblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2Rpc3BsYXknLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogU25hY2tiYXJBY3Rpb25zLkRpc3BsYXkuVHlwZSxcbiAgICAgICAgbWVzc2FnZUtleTogJ3NvbWVNZXNzYWdlS2V5JyxcbiAgICAgICAgbWVzc2FnZVBhcmFtZXRlcnM6IHsgc29tZTogJ3BhcmFtZXRlcnMnIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgY2FsbHNBcGlTZXJ2aWNlOiBmYWxzZSxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnc29tZU1lc3NhZ2VLZXknLCB7IHNvbWU6ICdwYXJhbWV0ZXJzJyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogJ3RyYW5zbGF0ZWRTdHJpbmcnXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheVN1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbJ3RyYW5zbGF0ZWRTdHJpbmcnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
