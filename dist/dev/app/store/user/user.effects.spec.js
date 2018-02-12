"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_effects_1 = require("./user.effects");
var UserActions = require("./user.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('User Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new user_effects_1.UserEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'getAllUsersByAccountId',
            effectsInstantiator: instantiator,
            inputAction: {
                type: UserActions.GetAllUsersByAccountId.Type,
                accountId: 1,
            },
            serviceMethod: {
                name: 'getUsersByAccountId',
                expectedArguments: [1, 'offAfterResponse'],
                returnsObservableOf: [{
                        id: 1,
                        firstName: 'firstName',
                        lastName: 'lastName',
                        emailAddress: 'emailAddress'
                    }, {
                        id: 2,
                        firstName: 'firstName',
                        lastName: 'lastName',
                        emailAddress: 'emailAddress'
                    }]
            },
            outputActionFactories: {
                success: {
                    sectionName: 'user',
                    methodName: 'getAllUsersByAccountIdSuccess',
                    expectedArguments: [[{
                                id: 1,
                                name: 'firstName lastName',
                                emailAddress: 'emailAddress'
                            }, {
                                id: 2,
                                name: 'firstName lastName',
                                emailAddress: 'emailAddress'
                            }]]
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91c2VyL3VzZXIuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTZDO0FBQzdDLDRDQUE4QztBQUM5QywyRUFBOEY7QUFFOUY7SUFDRSxRQUFRLENBQUMsY0FBYyxFQUFFO1FBQ3ZCLElBQU0saUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVyRTtZQUNFLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQ3BCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLHdCQUF3QjtZQUNwQyxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsV0FBVyxDQUFDLHNCQUFzQixDQUFDLElBQUk7Z0JBQzdDLFNBQVMsRUFBRSxDQUFDO2FBQ2I7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUM7Z0JBQzFDLG1CQUFtQixFQUFFLENBQUM7d0JBQ3BCLEVBQUUsRUFBRSxDQUFDO3dCQUNMLFNBQVMsRUFBRSxXQUFXO3dCQUN0QixRQUFRLEVBQUUsVUFBVTt3QkFDcEIsWUFBWSxFQUFFLGNBQWM7cUJBQzdCLEVBQUU7d0JBQ0QsRUFBRSxFQUFFLENBQUM7d0JBQ0wsU0FBUyxFQUFFLFdBQVc7d0JBQ3RCLFFBQVEsRUFBRSxVQUFVO3dCQUNwQixZQUFZLEVBQUUsY0FBYztxQkFDN0IsQ0FBQzthQUNIO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsVUFBVSxFQUFFLCtCQUErQjtvQkFDM0MsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dDQUNuQixFQUFFLEVBQUUsQ0FBQztnQ0FDTCxJQUFJLEVBQUUsb0JBQW9CO2dDQUMxQixZQUFZLEVBQUUsY0FBYzs2QkFDN0IsRUFBRTtnQ0FDRCxFQUFFLEVBQUUsQ0FBQztnQ0FDTCxJQUFJLEVBQUUsb0JBQW9CO2dDQUMxQixZQUFZLEVBQUUsY0FBYzs2QkFDN0IsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqREQsb0JBaURDIiwiZmlsZSI6ImFwcC9zdG9yZS91c2VyL3VzZXIuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlckVmZmVjdHMgfSBmcm9tICcuL3VzZXIuZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBVc2VyQWN0aW9ucyBmcm9tICcuL3VzZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciwgRWZmZWN0VGVzdFBhcmFtZXRlcnMgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnVXNlciBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IFVzZXJFZmZlY3RzIHtcbiAgICAgIHJldHVybiBuZXcgVXNlckVmZmVjdHMoXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTdG9yZSwgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZ2V0QWxsVXNlcnNCeUFjY291bnRJZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBVc2VyQWN0aW9ucy5HZXRBbGxVc2Vyc0J5QWNjb3VudElkLlR5cGUsXG4gICAgICAgIGFjY291bnRJZDogMSxcbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdnZXRVc2Vyc0J5QWNjb3VudElkJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxLCAnb2ZmQWZ0ZXJSZXNwb25zZSddLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiBbe1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIGZpcnN0TmFtZTogJ2ZpcnN0TmFtZScsXG4gICAgICAgICAgbGFzdE5hbWU6ICdsYXN0TmFtZScsXG4gICAgICAgICAgZW1haWxBZGRyZXNzOiAnZW1haWxBZGRyZXNzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgZmlyc3ROYW1lOiAnZmlyc3ROYW1lJyxcbiAgICAgICAgICBsYXN0TmFtZTogJ2xhc3ROYW1lJyxcbiAgICAgICAgICBlbWFpbEFkZHJlc3M6ICdlbWFpbEFkZHJlc3MnXG4gICAgICAgIH1dXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3VzZXInLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdnZXRBbGxVc2Vyc0J5QWNjb3VudElkU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtbe1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBuYW1lOiAnZmlyc3ROYW1lIGxhc3ROYW1lJyxcbiAgICAgICAgICAgIGVtYWlsQWRkcmVzczogJ2VtYWlsQWRkcmVzcydcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIG5hbWU6ICdmaXJzdE5hbWUgbGFzdE5hbWUnLFxuICAgICAgICAgICAgZW1haWxBZGRyZXNzOiAnZW1haWxBZGRyZXNzJ1xuICAgICAgICAgIH1dXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
