"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fee_config_effects_1 = require("./fee-config.effects");
var FeeConfigActions = require("./fee-config.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Fee Config Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new fee_config_effects_1.FeeConfigEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadFeeConfig',
            comment: 'if fee config not yet initialized',
            effectsInstantiator: instantiator,
            inputAction: {
                type: FeeConfigActions.LoadFeeConfig.Type,
            },
            state: {
                storeSectionName: 'feeConfig',
                value: {
                    initialized: false,
                    feeConfig: { items: [] },
                }
            },
            serviceMethod: {
                name: 'loadFeeConfig',
                returnsObservableOf: { items: [{ item: 1 }, { item: 2 }] }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'feeConfig',
                    methodName: 'loadFeeConfigSuccess',
                    expectedArguments: [{ items: [{ item: 1 }, { item: 2 }] }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadFeeConfig',
            comment: 'With the feeConfig already initialized',
            effectsInstantiator: instantiator,
            inputAction: {
                type: FeeConfigActions.LoadFeeConfig.Type,
            },
            state: {
                storeSectionName: 'feeConfig',
                value: {
                    initialized: true,
                    feeConfig: { items: [] },
                }
            },
            serviceMethod: {
                name: 'loadFeeConfig',
                expectToHaveBeenCalled: false
            },
            expectToEmitAction: false,
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXdEO0FBQ3hELHVEQUF5RDtBQUN6RCwyRUFBOEY7QUFFOUY7SUFDRSxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUkscUNBQWdCLENBQ3pCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLGVBQWU7WUFDM0IsT0FBTyxFQUFFLG1DQUFtQztZQUM1QyxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUk7YUFDMUM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsZ0JBQWdCLEVBQUUsV0FBVztnQkFDN0IsS0FBSyxFQUFFO29CQUNMLFdBQVcsRUFBRSxLQUFLO29CQUNsQixTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO2lCQUN6QjthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxlQUFlO2dCQUNyQixtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7YUFDM0Q7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxXQUFXO29CQUN4QixVQUFVLEVBQUUsc0JBQXNCO29CQUNsQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUMzRDthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLGVBQWU7WUFDM0IsT0FBTyxFQUFFLHdDQUF3QztZQUNqRCxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUk7YUFDMUM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsZ0JBQWdCLEVBQUUsV0FBVztnQkFDN0IsS0FBSyxFQUFFO29CQUNMLFdBQVcsRUFBRSxJQUFJO29CQUNqQixTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO2lCQUN6QjthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxlQUFlO2dCQUNyQixzQkFBc0IsRUFBRSxLQUFLO2FBQzlCO1lBQ0Qsa0JBQWtCLEVBQUUsS0FBSztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUExREQsb0JBMERDIiwiZmlsZSI6ImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmVlQ29uZmlnRWZmZWN0cyB9IGZyb20gJy4vZmVlLWNvbmZpZy5lZmZlY3RzJztcbmltcG9ydCAqIGFzIEZlZUNvbmZpZ0FjdGlvbnMgZnJvbSAnLi9mZWUtY29uZmlnLmFjdGlvbnMnO1xuaW1wb3J0IHsgRWZmZWN0c1NwZWNIZWxwZXIsIEVmZmVjdFRlc3RQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0ZlZSBDb25maWcgRWZmZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBlZmZlY3RzU3BlY0hlbHBlcjogRWZmZWN0c1NwZWNIZWxwZXIgPSBuZXcgRWZmZWN0c1NwZWNIZWxwZXIoKTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcigpOiBGZWVDb25maWdFZmZlY3RzIHtcbiAgICAgIHJldHVybiBuZXcgRmVlQ29uZmlnRWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkRmVlQ29uZmlnJyxcbiAgICAgIGNvbW1lbnQ6ICdpZiBmZWUgY29uZmlnIG5vdCB5ZXQgaW5pdGlhbGl6ZWQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogRmVlQ29uZmlnQWN0aW9ucy5Mb2FkRmVlQ29uZmlnLlR5cGUsXG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2ZlZUNvbmZpZycsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgICAgICAgIGZlZUNvbmZpZzogeyBpdGVtczogW10gfSxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWRGZWVDb25maWcnLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IGl0ZW1zOiBbeyBpdGVtOiAxIH0sIHsgaXRlbTogMiB9XSB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2ZlZUNvbmZpZycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRGZWVDb25maWdTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgaXRlbXM6IFt7IGl0ZW06IDEgfSwgeyBpdGVtOiAyIH1dIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2xvYWRGZWVDb25maWcnLFxuICAgICAgY29tbWVudDogJ1dpdGggdGhlIGZlZUNvbmZpZyBhbHJlYWR5IGluaXRpYWxpemVkJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEZlZUNvbmZpZ0FjdGlvbnMuTG9hZEZlZUNvbmZpZy5UeXBlLFxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdmZWVDb25maWcnLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIGluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgICAgIGZlZUNvbmZpZzogeyBpdGVtczogW10gfSxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWRGZWVDb25maWcnLFxuICAgICAgICBleHBlY3RUb0hhdmVCZWVuQ2FsbGVkOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGV4cGVjdFRvRW1pdEFjdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH0pO1xufVxuIl19
