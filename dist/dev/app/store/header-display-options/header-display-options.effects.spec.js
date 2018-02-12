"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var header_display_options_effects_1 = require("./header-display-options.effects");
var HeaderDisplayOptionsActions = require("./header-display-options.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Header Display Options Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new header_display_options_effects_1.HeaderDisplayOptionsEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore);
        }
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'determineHeaderPosition',
            comment: 'when the header should NOT be fixed',
            inputAction: {
                type: HeaderDisplayOptionsActions.SetHeaderPosition.Type,
                pageVerticalOffset: 110
            },
            state: {
                storeSectionName: 'headerDisplayOptions',
                value: { isFixed: true }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'headerDisplayOptions',
                    methodName: 'unfix',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'determineHeaderPosition',
            comment: 'when the header SHOULD be fixed',
            inputAction: {
                type: HeaderDisplayOptionsActions.SetHeaderPosition.Type,
                pageVerticalOffset: 112
            },
            state: {
                storeSectionName: 'headerDisplayOptions',
                value: { isFixed: false }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'headerDisplayOptions',
                    methodName: 'fix',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'determineIfHeaderCanBeFixed',
            comment: 'when the header CAN be fixed',
            inputAction: {
                type: HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed.Type,
                url: '/cart'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'headerDisplayOptions',
                    methodName: 'enableFix',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'determineIfHeaderCanBeFixed',
            comment: 'when the header CANNOT be fixed',
            inputAction: {
                type: HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed.Type,
                url: '/user/login'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'headerDisplayOptions',
                    methodName: 'disableFix',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'determineIfHeaderCanBeFixed',
            comment: 'when the header CANNOT be fixed - root url',
            inputAction: {
                type: HeaderDisplayOptionsActions.CheckIfHeaderCanBeFixed.Type,
                url: '/'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'headerDisplayOptions',
                    methodName: 'disableFix',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'determineIfFiltersAreAvailable',
            comment: 'when the filters SHOULD be available',
            inputAction: {
                type: HeaderDisplayOptionsActions.CheckIfFiltersAreAvailable.Type,
                url: '/search'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'headerDisplayOptions',
                    methodName: 'enableFilters',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'determineIfFiltersAreAvailable',
            comment: 'when the SHOULD NOT be available',
            inputAction: {
                type: HeaderDisplayOptionsActions.CheckIfFiltersAreAvailable.Type,
                url: '/collections'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'headerDisplayOptions',
                    methodName: 'disableFilters',
                    expectedArguments: []
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9oZWFkZXItZGlzcGxheS1vcHRpb25zL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUZBQStFO0FBQy9FLDhFQUFnRjtBQUNoRiwyRUFBOEY7QUFFOUY7SUFDRSxRQUFRLENBQUMsZ0NBQWdDLEVBQUU7UUFDekMsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUksNERBQTJCLENBQ3BDLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsQ0FDdEUsQ0FBQztRQUNKLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFVBQVUsRUFBRSx5QkFBeUI7WUFDckMsT0FBTyxFQUFFLHFDQUFxQztZQUM5QyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLDJCQUEyQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3hELGtCQUFrQixFQUFFLEdBQUc7YUFDeEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsZ0JBQWdCLEVBQUUsc0JBQXNCO2dCQUN4QyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO2FBQ3pCO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxVQUFVLEVBQUUsT0FBTztvQkFDbkIsaUJBQWlCLEVBQUUsRUFBRTtpQkFDdEI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsVUFBVSxFQUFFLHlCQUF5QjtZQUNyQyxPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsSUFBSTtnQkFDeEQsa0JBQWtCLEVBQUUsR0FBRzthQUN4QjtZQUNELEtBQUssRUFBRTtnQkFDTCxnQkFBZ0IsRUFBRSxzQkFBc0I7Z0JBQ3hDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7YUFDMUI7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxzQkFBc0I7b0JBQ25DLFVBQVUsRUFBRSxLQUFLO29CQUNqQixpQkFBaUIsRUFBRSxFQUFFO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxVQUFVLEVBQUUsNkJBQTZCO1lBQ3pDLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSwyQkFBMkIsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJO2dCQUM5RCxHQUFHLEVBQUUsT0FBTzthQUNiO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxVQUFVLEVBQUUsV0FBVztvQkFDdkIsaUJBQWlCLEVBQUUsRUFBRTtpQkFDdEI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsVUFBVSxFQUFFLDZCQUE2QjtZQUN6QyxPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsMkJBQTJCLENBQUMsdUJBQXVCLENBQUMsSUFBSTtnQkFDOUQsR0FBRyxFQUFFLGFBQWE7YUFDbkI7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxzQkFBc0I7b0JBQ25DLFVBQVUsRUFBRSxZQUFZO29CQUN4QixpQkFBaUIsRUFBRSxFQUFFO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxVQUFVLEVBQUUsNkJBQTZCO1lBQ3pDLE9BQU8sRUFBRSw0Q0FBNEM7WUFDckQsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSwyQkFBMkIsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJO2dCQUM5RCxHQUFHLEVBQUUsR0FBRzthQUNUO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxVQUFVLEVBQUUsWUFBWTtvQkFDeEIsaUJBQWlCLEVBQUUsRUFBRTtpQkFDdEI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsVUFBVSxFQUFFLGdDQUFnQztZQUM1QyxPQUFPLEVBQUUsc0NBQXNDO1lBQy9DLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsMkJBQTJCLENBQUMsMEJBQTBCLENBQUMsSUFBSTtnQkFDakUsR0FBRyxFQUFFLFNBQVM7YUFDZjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLHNCQUFzQjtvQkFDbkMsVUFBVSxFQUFFLGVBQWU7b0JBQzNCLGlCQUFpQixFQUFFLEVBQUU7aUJBQ3RCO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFVBQVUsRUFBRSxnQ0FBZ0M7WUFDNUMsT0FBTyxFQUFFLGtDQUFrQztZQUMzQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLDJCQUEyQixDQUFDLDBCQUEwQixDQUFDLElBQUk7Z0JBQ2pFLEdBQUcsRUFBRSxjQUFjO2FBQ3BCO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxVQUFVLEVBQUUsZ0JBQWdCO29CQUM1QixpQkFBaUIsRUFBRSxFQUFFO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBeklELG9CQXlJQyIsImZpbGUiOiJhcHAvc3RvcmUvaGVhZGVyLWRpc3BsYXktb3B0aW9ucy9oZWFkZXItZGlzcGxheS1vcHRpb25zLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhlYWRlckRpc3BsYXlPcHRpb25zRWZmZWN0cyB9IGZyb20gJy4vaGVhZGVyLWRpc3BsYXktb3B0aW9ucy5lZmZlY3RzJztcbmltcG9ydCAqIGFzIEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucyBmcm9tICcuL2hlYWRlci1kaXNwbGF5LW9wdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciwgRWZmZWN0VGVzdFBhcmFtZXRlcnMgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnSGVhZGVyIERpc3BsYXkgT3B0aW9ucyBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IEhlYWRlckRpc3BsYXlPcHRpb25zRWZmZWN0cyB7XG4gICAgICByZXR1cm4gbmV3IEhlYWRlckRpc3BsYXlPcHRpb25zRWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlXG4gICAgICApO1xuICAgIH1cblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgZWZmZWN0TmFtZTogJ2RldGVybWluZUhlYWRlclBvc2l0aW9uJyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBoZWFkZXIgc2hvdWxkIE5PVCBiZSBmaXhlZCcsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMuU2V0SGVhZGVyUG9zaXRpb24uVHlwZSxcbiAgICAgICAgcGFnZVZlcnRpY2FsT2Zmc2V0OiAxMTBcbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnaGVhZGVyRGlzcGxheU9wdGlvbnMnLFxuICAgICAgICB2YWx1ZTogeyBpc0ZpeGVkOiB0cnVlIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnaGVhZGVyRGlzcGxheU9wdGlvbnMnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICd1bmZpeCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgZWZmZWN0TmFtZTogJ2RldGVybWluZUhlYWRlclBvc2l0aW9uJyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBoZWFkZXIgU0hPVUxEIGJlIGZpeGVkJyxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5TZXRIZWFkZXJQb3NpdGlvbi5UeXBlLFxuICAgICAgICBwYWdlVmVydGljYWxPZmZzZXQ6IDExMlxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdoZWFkZXJEaXNwbGF5T3B0aW9ucycsXG4gICAgICAgIHZhbHVlOiB7IGlzRml4ZWQ6IGZhbHNlIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnaGVhZGVyRGlzcGxheU9wdGlvbnMnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdmaXgnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGVmZmVjdE5hbWU6ICdkZXRlcm1pbmVJZkhlYWRlckNhbkJlRml4ZWQnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGhlYWRlciBDQU4gYmUgZml4ZWQnLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogSGVhZGVyRGlzcGxheU9wdGlvbnNBY3Rpb25zLkNoZWNrSWZIZWFkZXJDYW5CZUZpeGVkLlR5cGUsXG4gICAgICAgIHVybDogJy9jYXJ0J1xuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdoZWFkZXJEaXNwbGF5T3B0aW9ucycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2VuYWJsZUZpeCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgZWZmZWN0TmFtZTogJ2RldGVybWluZUlmSGVhZGVyQ2FuQmVGaXhlZCcsXG4gICAgICBjb21tZW50OiAnd2hlbiB0aGUgaGVhZGVyIENBTk5PVCBiZSBmaXhlZCcsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMuQ2hlY2tJZkhlYWRlckNhbkJlRml4ZWQuVHlwZSxcbiAgICAgICAgdXJsOiAnL3VzZXIvbG9naW4nXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2hlYWRlckRpc3BsYXlPcHRpb25zJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzYWJsZUZpeCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgZWZmZWN0TmFtZTogJ2RldGVybWluZUlmSGVhZGVyQ2FuQmVGaXhlZCcsXG4gICAgICBjb21tZW50OiAnd2hlbiB0aGUgaGVhZGVyIENBTk5PVCBiZSBmaXhlZCAtIHJvb3QgdXJsJyxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEhlYWRlckRpc3BsYXlPcHRpb25zQWN0aW9ucy5DaGVja0lmSGVhZGVyQ2FuQmVGaXhlZC5UeXBlLFxuICAgICAgICB1cmw6ICcvJ1xuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdoZWFkZXJEaXNwbGF5T3B0aW9ucycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Rpc2FibGVGaXgnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGVmZmVjdE5hbWU6ICdkZXRlcm1pbmVJZkZpbHRlcnNBcmVBdmFpbGFibGUnLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlIGZpbHRlcnMgU0hPVUxEIGJlIGF2YWlsYWJsZScsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMuQ2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGUuVHlwZSxcbiAgICAgICAgdXJsOiAnL3NlYXJjaCdcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnaGVhZGVyRGlzcGxheU9wdGlvbnMnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdlbmFibGVGaWx0ZXJzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBlZmZlY3ROYW1lOiAnZGV0ZXJtaW5lSWZGaWx0ZXJzQXJlQXZhaWxhYmxlJyxcbiAgICAgIGNvbW1lbnQ6ICd3aGVuIHRoZSBTSE9VTEQgTk9UIGJlIGF2YWlsYWJsZScsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBIZWFkZXJEaXNwbGF5T3B0aW9uc0FjdGlvbnMuQ2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGUuVHlwZSxcbiAgICAgICAgdXJsOiAnL2NvbGxlY3Rpb25zJ1xuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdoZWFkZXJEaXNwbGF5T3B0aW9ucycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Rpc2FibGVGaWx0ZXJzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
