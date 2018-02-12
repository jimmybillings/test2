"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_effects_1 = require("./search.effects");
var SearchActions = require("./search.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Search Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new search_effects_1.SearchEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadResults',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SearchActions.LoadResults.Type,
                params: { some: 'params' }
            },
            serviceMethod: {
                name: 'loadResults',
                expectedArguments: [{ some: 'params' }],
                returnsObservableOf: { some: 'results' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'search',
                    methodName: 'loadResultsSuccess',
                    expectedArguments: [{ some: 'results' }]
                },
                failure: {
                    sectionName: 'search',
                    methodName: 'loadResultsFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadResultsFailure',
            comment: 'With a status of 400',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SearchActions.LoadResultsFailure.Type,
                error: { status: 400 },
            },
            outputActionFactories: {
                success: {
                    sectionName: 'error',
                    methodName: 'handle',
                    expectedArguments: [{ status: 400 }]
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFpRDtBQUNqRCxnREFBa0Q7QUFDbEQsMkVBQThGO0FBRTlGO0lBQ0UsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLElBQU0saUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVyRTtZQUNFLE1BQU0sQ0FBQyxJQUFJLDhCQUFhLENBQ3RCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLGFBQWE7WUFDekIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDcEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTthQUMzQjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztnQkFDdkMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2FBQ3pDO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsUUFBUTtvQkFDckIsVUFBVSxFQUFFLG9CQUFvQjtvQkFDaEMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztpQkFDekM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxRQUFRO29CQUNyQixVQUFVLEVBQUUsb0JBQW9CO2lCQUNqQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLG9CQUFvQjtZQUNoQyxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSTtnQkFDM0MsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTthQUN2QjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLE9BQU87b0JBQ3BCLFVBQVUsRUFBRSxRQUFRO29CQUNwQixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO2lCQUNyQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBcERELG9CQW9EQyIsImZpbGUiOiJhcHAvc3RvcmUvc2VhcmNoL3NlYXJjaC5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWFyY2hFZmZlY3RzIH0gZnJvbSAnLi9zZWFyY2guZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBTZWFyY2hBY3Rpb25zIGZyb20gJy4vc2VhcmNoLmFjdGlvbnMnO1xuaW1wb3J0IHsgRWZmZWN0c1NwZWNIZWxwZXIsIEVmZmVjdFRlc3RQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1NlYXJjaCBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IFNlYXJjaEVmZmVjdHMge1xuICAgICAgcmV0dXJuIG5ldyBTZWFyY2hFZmZlY3RzKFxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5tb2NrTmdyeEVmZmVjdHNBY3Rpb25zLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU3RvcmUsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTZXJ2aWNlXG4gICAgICApO1xuICAgIH1cblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2xvYWRSZXN1bHRzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFNlYXJjaEFjdGlvbnMuTG9hZFJlc3VsdHMuVHlwZSxcbiAgICAgICAgcGFyYW1zOiB7IHNvbWU6ICdwYXJhbXMnIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdsb2FkUmVzdWx0cycsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncGFyYW1zJyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAncmVzdWx0cycgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdzZWFyY2gnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkUmVzdWx0c1N1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAncmVzdWx0cycgfV1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZToge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc2VhcmNoJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZFJlc3VsdHNGYWlsdXJlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkUmVzdWx0c0ZhaWx1cmUnLFxuICAgICAgY29tbWVudDogJ1dpdGggYSBzdGF0dXMgb2YgNDAwJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFNlYXJjaEFjdGlvbnMuTG9hZFJlc3VsdHNGYWlsdXJlLlR5cGUsXG4gICAgICAgIGVycm9yOiB7IHN0YXR1czogNDAwIH0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Vycm9yJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnaGFuZGxlJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc3RhdHVzOiA0MDAgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
