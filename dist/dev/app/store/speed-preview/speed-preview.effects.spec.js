"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var speed_preview_effects_1 = require("./speed-preview.effects");
var SpeedPreviewActions = require("./speed-preview.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Speed Preview Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new speed_preview_effects_1.SpeedPreviewEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'load',
            comment: 'with the asset not yet available in the store',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SpeedPreviewActions.Load.Type,
                asset: { assetId: 111111 }
            },
            state: {
                storeSectionName: 'speedPreview',
                value: {
                    222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                    333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                }
            },
            serviceMethod: {
                name: 'load',
                expectedArguments: [{ assetId: 111111 }],
                returnsObservableOf: {
                    111111: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'speedPreview',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ 111111: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' } }, 111111]
                },
                failure: {
                    sectionName: 'speedPreview',
                    methodName: 'loadFailure',
                    expectedArgument: 111111
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'load',
            comment: 'with the asset already in the store',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SpeedPreviewActions.Load.Type,
                asset: { assetId: 222222 }
            },
            state: {
                storeSectionName: 'speedPreview',
                value: {
                    222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                    333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
                }
            },
            serviceMethod: {
                name: 'load',
                expectToHaveBeenCalled: false
            },
            expectToEmitAction: false,
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVlZC1wcmV2aWV3L3NwZWVkLXByZXZpZXcuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQThEO0FBQzlELDZEQUErRDtBQUMvRCwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsdUJBQXVCLEVBQUU7UUFDaEMsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUksMkNBQW1CLENBQzVCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLE1BQU07WUFDbEIsT0FBTyxFQUFFLCtDQUErQztZQUN4RCxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQ25DLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7YUFDM0I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsZ0JBQWdCLEVBQUUsY0FBYztnQkFDaEMsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7b0JBQ2pGLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7aUJBQ2xGO2FBQ0Y7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztnQkFDeEMsbUJBQW1CLEVBQUU7b0JBQ25CLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUU7aUJBQ2xGO2FBQ0Y7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxjQUFjO29CQUMzQixVQUFVLEVBQUUsYUFBYTtvQkFDekIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQztpQkFDbkg7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxjQUFjO29CQUMzQixVQUFVLEVBQUUsYUFBYTtvQkFDekIsZ0JBQWdCLEVBQUUsTUFBTTtpQkFDekI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxxQ0FBcUM7WUFDOUMsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNuQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO2FBQzNCO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLGdCQUFnQixFQUFFLGNBQWM7Z0JBQ2hDLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO29CQUNqRixNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO2lCQUNsRjthQUNGO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLHNCQUFzQixFQUFFLEtBQUs7YUFDOUI7WUFDRCxrQkFBa0IsRUFBRSxLQUFLO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBFRCxvQkFvRUMiLCJmaWxlIjoiYXBwL3N0b3JlL3NwZWVkLXByZXZpZXcvc3BlZWQtcHJldmlldy5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGVlZFByZXZpZXdFZmZlY3RzIH0gZnJvbSAnLi9zcGVlZC1wcmV2aWV3LmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgU3BlZWRQcmV2aWV3QWN0aW9ucyBmcm9tICcuL3NwZWVkLXByZXZpZXcuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdTcGVlZCBQcmV2aWV3IEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogYW55IHtcbiAgICAgIHJldHVybiBuZXcgU3BlZWRQcmV2aWV3RWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkJyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIHRoZSBhc3NldCBub3QgeWV0IGF2YWlsYWJsZSBpbiB0aGUgc3RvcmUnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogU3BlZWRQcmV2aWV3QWN0aW9ucy5Mb2FkLlR5cGUsXG4gICAgICAgIGFzc2V0OiB7IGFzc2V0SWQ6IDExMTExMSB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3NwZWVkUHJldmlldycsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgMjIyMjIyOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICAgIDMzMzMzMzogeyAncHJpY2UnOiAxNTkuMCwgJ2ltYWdlUXVpY2tWaWV3JzogZmFsc2UsICdwb3N0ZXJVcmwnOiAnc29tZXBvc3RlcnVybCcgfSxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgYXNzZXRJZDogMTExMTExIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7XG4gICAgICAgICAgMTExMTExOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NwZWVkUHJldmlldycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgMTExMTExOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9IH0sIDExMTExMV1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZToge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc3BlZWRQcmV2aWV3JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEZhaWx1cmUnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnQ6IDExMTExMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkJyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIHRoZSBhc3NldCBhbHJlYWR5IGluIHRoZSBzdG9yZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBTcGVlZFByZXZpZXdBY3Rpb25zLkxvYWQuVHlwZSxcbiAgICAgICAgYXNzZXQ6IHsgYXNzZXRJZDogMjIyMjIyIH1cbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnc3BlZWRQcmV2aWV3JyxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAyMjIyMjI6IHsgJ3ByaWNlJzogMTU5LjAsICdpbWFnZVF1aWNrVmlldyc6IGZhbHNlLCAncG9zdGVyVXJsJzogJ3NvbWVwb3N0ZXJ1cmwnIH0sXG4gICAgICAgICAgMzMzMzMzOiB7ICdwcmljZSc6IDE1OS4wLCAnaW1hZ2VRdWlja1ZpZXcnOiBmYWxzZSwgJ3Bvc3RlclVybCc6ICdzb21lcG9zdGVydXJsJyB9LFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnbG9hZCcsXG4gICAgICAgIGV4cGVjdFRvSGF2ZUJlZW5DYWxsZWQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgZXhwZWN0VG9FbWl0QWN0aW9uOiBmYWxzZSxcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
