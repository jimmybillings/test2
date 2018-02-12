"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_config_effects_1 = require("./ui-config.effects");
var UiConfigActions = require("./ui-config.actions");
var UiConfigState = require("./ui-config.state");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Ui Config Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new ui_config_effects_1.UiConfigEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'initialize',
            inputAction: {
                type: UiConfigActions.Initialize.Type
            },
            outputActionFactories: {
                success: {
                    sectionName: 'uiConfig',
                    methodName: 'initializeSuccess',
                    expectedArguments: [UiConfigState.initialState]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'load',
            inputAction: {
                type: UiConfigActions.Load.Type
            },
            serviceMethod: {
                name: 'load',
                returnsObservableOf: { some: 'config' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'uiConfig',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ some: 'config' }]
                },
                failure: {
                    sectionName: 'uiConfig',
                    methodName: 'loadFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectsInstantiator: instantiator,
            effectName: 'setInLocalStorage',
            inputAction: {
                type: UiConfigActions.LoadSuccess.Type,
                config: { some: 'config' }
            },
            customTests: [{
                    it: 'sets the config in localStorage',
                    beforeInstantiation: function () { return spyOn(localStorage, 'setItem'); },
                    expectation: function () {
                        expect(localStorage.setItem).toHaveBeenCalledWith('uiConfig', JSON.stringify({ some: 'config' }));
                    }
                }]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUFzRDtBQUN0RCxxREFBdUQ7QUFDdkQsaURBQW1EO0FBQ25ELDJFQUE4RjtBQUU5RjtJQUNFLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtRQUM1QixJQUFNLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFckU7WUFDRSxNQUFNLENBQUMsSUFBSSxtQ0FBZSxDQUN4QixpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxDQUNyRyxDQUFDO1FBQ0osQ0FBQztRQUVELGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsVUFBVSxFQUFFLFlBQVk7WUFDeEIsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7YUFDdEM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxVQUFVO29CQUN2QixVQUFVLEVBQUUsbUJBQW1CO29CQUMvQixpQkFBaUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7aUJBQ2hEO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ2hDO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTthQUN4QztZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFVBQVU7b0JBQ3ZCLFVBQVUsRUFBRSxhQUFhO29CQUN6QixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO2lCQUN4QztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFVBQVU7b0JBQ3ZCLFVBQVUsRUFBRSxhQUFhO2lCQUMxQjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxVQUFVLEVBQUUsbUJBQW1CO1lBQy9CLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUN0QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2FBQzNCO1lBQ0QsV0FBVyxFQUFFLENBQUM7b0JBQ1osRUFBRSxFQUFFLGlDQUFpQztvQkFDckMsbUJBQW1CLEVBQUUsY0FBTSxPQUFBLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQTlCLENBQThCO29CQUN6RCxXQUFXLEVBQUU7d0JBQ1gsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BHLENBQUM7aUJBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhFRCxvQkFnRUMiLCJmaWxlIjoiYXBwL3N0b3JlL3VpLWNvbmZpZy91aS1jb25maWcuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVWlDb25maWdFZmZlY3RzIH0gZnJvbSAnLi91aS1jb25maWcuZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBVaUNvbmZpZ0FjdGlvbnMgZnJvbSAnLi91aS1jb25maWcuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBVaUNvbmZpZ1N0YXRlIGZyb20gJy4vdWktY29uZmlnLnN0YXRlJztcbmltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyLCBFZmZlY3RUZXN0UGFyYW1ldGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdVaSBDb25maWcgRWZmZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBlZmZlY3RzU3BlY0hlbHBlcjogRWZmZWN0c1NwZWNIZWxwZXIgPSBuZXcgRWZmZWN0c1NwZWNIZWxwZXIoKTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcigpOiBVaUNvbmZpZ0VmZmVjdHMge1xuICAgICAgcmV0dXJuIG5ldyBVaUNvbmZpZ0VmZmVjdHMoXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTdG9yZSwgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBlZmZlY3ROYW1lOiAnaW5pdGlhbGl6ZScsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBVaUNvbmZpZ0FjdGlvbnMuSW5pdGlhbGl6ZS5UeXBlXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3VpQ29uZmlnJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnaW5pdGlhbGl6ZVN1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbVWlDb25maWdTdGF0ZS5pbml0aWFsU3RhdGVdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgZWZmZWN0TmFtZTogJ2xvYWQnLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogVWlDb25maWdBY3Rpb25zLkxvYWQuVHlwZVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdjb25maWcnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAndWlDb25maWcnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdjb25maWcnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3VpQ29uZmlnJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgZWZmZWN0TmFtZTogJ3NldEluTG9jYWxTdG9yYWdlJyxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFVpQ29uZmlnQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlLFxuICAgICAgICBjb25maWc6IHsgc29tZTogJ2NvbmZpZycgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbe1xuICAgICAgICBpdDogJ3NldHMgdGhlIGNvbmZpZyBpbiBsb2NhbFN0b3JhZ2UnLFxuICAgICAgICBiZWZvcmVJbnN0YW50aWF0aW9uOiAoKSA9PiBzcHlPbihsb2NhbFN0b3JhZ2UsICdzZXRJdGVtJyksXG4gICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGxvY2FsU3RvcmFnZS5zZXRJdGVtKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndWlDb25maWcnLCBKU09OLnN0cmluZ2lmeSh7IHNvbWU6ICdjb25maWcnIH0pKTtcbiAgICAgICAgfVxuICAgICAgfV1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
