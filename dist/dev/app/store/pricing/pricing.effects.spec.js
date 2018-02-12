"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pricing_effects_1 = require("./pricing.effects");
var PricingActions = require("./pricing.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Pricing Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        var mockDialogService;
        function instantiator() {
            mockDialogService = { openComponentInDialog: jasmine.createSpy('openComponentInDialog') };
            return new pricing_effects_1.PricingEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockDialogService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'initializePricing',
            effectsInstantiator: instantiator,
            comment: 'when there are no attributes in the state',
            state: {
                storeSectionName: 'pricing',
                value: { attributes: null }
            },
            inputAction: {
                type: PricingActions.InitializePricing.Type,
                rightsReproduction: 'Rights Managed',
                dialogOptions: { some: 'options' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'pricing',
                    methodName: 'getAttributes',
                    expectedArguments: ['Rights Managed', { some: 'options' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'initializePricing',
            effectsInstantiator: instantiator,
            comment: 'when there are attributes in the state',
            state: {
                storeSectionName: 'pricing',
                value: { attributes: { some: 'attributes' } }
            },
            inputAction: {
                type: PricingActions.InitializePricing.Type,
                rightsReproduction: 'Rights Managed',
                dialogOptions: { some: 'options' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'pricing',
                    methodName: 'openDialog',
                    expectedArguments: [{ some: 'options' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'getAttributes',
            effectsInstantiator: instantiator,
            inputAction: {
                type: PricingActions.GetAttributes.Type,
                rightsReproduction: 'Rights Managed',
                dialogOptions: { some: 'options' }
            },
            serviceMethod: {
                name: 'getPriceAttributes',
                returnsObservableOf: { some: 'attributes' },
                expectedArguments: ['Rights Managed']
            },
            outputActionFactories: {
                success: {
                    sectionName: 'pricing',
                    methodName: 'getAttributesSuccess',
                    expectedArguments: [{ some: 'attributes' }, 'Rights Managed', { some: 'options' }]
                },
                failure: {
                    sectionName: 'pricing',
                    methodName: 'getAttributesFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'getAttributesSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: PricingActions.GetAttributesSuccess.Type,
                dialogOptions: { some: 'options' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'pricing',
                    methodName: 'openDialog',
                    expectedArguments: [{ some: 'options' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'getAttributesSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: PricingActions.GetAttributesSuccess.Type,
                dialogOptions: { some: 'options' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'pricing',
                    methodName: 'openDialog',
                    expectedArguments: [{ some: 'options' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'calculatePrice',
            effectsInstantiator: instantiator,
            inputAction: {
                type: PricingActions.CalculatePrice.Type,
                selectedAttributes: { a: 'b', c: 'd' },
                assetId: 12345,
                subclipMarkers: { some: 'markers' }
            },
            serviceMethod: {
                name: 'getPrice',
                expectedArguments: [{ a: 'b', c: 'd' }, 12345, { some: 'markers' }],
                returnsObservableOf: 100
            },
            outputActionFactories: {
                success: {
                    sectionName: 'pricing',
                    methodName: 'calculatePriceSuccess',
                    expectedArguments: [100]
                },
                failure: {
                    sectionName: 'pricing',
                    methodName: 'calculatePriceFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'calculatePriceSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: PricingActions.CalculatePriceSuccess.Type,
                price: 100
            },
            outputActionFactories: {
                success: {
                    sectionName: 'pricing',
                    methodName: 'setPriceForDialog',
                    expectedArguments: [100]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'openDialog',
            effectsInstantiator: instantiator,
            inputAction: {
                type: PricingActions.OpenDialog.Type,
                dialogOptions: { some: 'options' }
            },
            customTests: [
                {
                    it: 'calls \'openComponentInDialog()\' on the dialog service',
                    expectation: function () { return expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({ some: 'options' }); }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELGtEQUFvRDtBQUNwRCwyRUFBOEY7QUFFOUY7SUFDRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBQ3JFLElBQUksaUJBQXNCLENBQUM7UUFFM0I7WUFDRSxpQkFBaUIsR0FBRyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDO1lBQzFGLE1BQU0sQ0FBQyxJQUFJLGdDQUFjLENBQ3ZCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQ3hILENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLE9BQU8sRUFBRSwyQ0FBMkM7WUFDcEQsS0FBSyxFQUFFO2dCQUNMLGdCQUFnQixFQUFFLFNBQVM7Z0JBQzNCLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7YUFDNUI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJO2dCQUMzQyxrQkFBa0IsRUFBRSxnQkFBZ0I7Z0JBQ3BDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7YUFDbkM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxTQUFTO29CQUN0QixVQUFVLEVBQUUsZUFBZTtvQkFDM0IsaUJBQWlCLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUs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QUMvQixpQkFBaUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDekI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ3BDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7YUFDbkM7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLHlEQUF5RDtvQkFDN0QsV0FBVyxFQUFFLGNBQU0sT0FBQSxNQUFNLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUF6RixDQUF5RjtpQkFDN0c7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTVLRCxvQkE0S0MiLCJmaWxlIjoiYXBwL3N0b3JlL3ByaWNpbmcvcHJpY2luZy5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmljaW5nRWZmZWN0cyB9IGZyb20gJy4vcHJpY2luZy5lZmZlY3RzJztcbmltcG9ydCAqIGFzIFByaWNpbmdBY3Rpb25zIGZyb20gJy4vcHJpY2luZy5hY3Rpb25zJztcbmltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyLCBFZmZlY3RUZXN0UGFyYW1ldGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdQcmljaW5nIEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG4gICAgbGV0IG1vY2tEaWFsb2dTZXJ2aWNlOiBhbnk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogUHJpY2luZ0VmZmVjdHMge1xuICAgICAgbW9ja0RpYWxvZ1NlcnZpY2UgPSB7IG9wZW5Db21wb25lbnRJbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db21wb25lbnRJbkRpYWxvZycpIH07XG4gICAgICByZXR1cm4gbmV3IFByaWNpbmdFZmZlY3RzKFxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5tb2NrTmdyeEVmZmVjdHNBY3Rpb25zLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU3RvcmUsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTZXJ2aWNlLCBtb2NrRGlhbG9nU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdpbml0aWFsaXplUHJpY2luZycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBjb21tZW50OiAnd2hlbiB0aGVyZSBhcmUgbm8gYXR0cmlidXRlcyBpbiB0aGUgc3RhdGUnLFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3ByaWNpbmcnLFxuICAgICAgICB2YWx1ZTogeyBhdHRyaWJ1dGVzOiBudWxsIH1cbiAgICAgIH0sXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBQcmljaW5nQWN0aW9ucy5Jbml0aWFsaXplUHJpY2luZy5UeXBlLFxuICAgICAgICByaWdodHNSZXByb2R1Y3Rpb246ICdSaWdodHMgTWFuYWdlZCcsXG4gICAgICAgIGRpYWxvZ09wdGlvbnM6IHsgc29tZTogJ29wdGlvbnMnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncHJpY2luZycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2dldEF0dHJpYnV0ZXMnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbJ1JpZ2h0cyBNYW5hZ2VkJywgeyBzb21lOiAnb3B0aW9ucycgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnaW5pdGlhbGl6ZVByaWNpbmcnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgY29tbWVudDogJ3doZW4gdGhlcmUgYXJlIGF0dHJpYnV0ZXMgaW4gdGhlIHN0YXRlJyxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdwcmljaW5nJyxcbiAgICAgICAgdmFsdWU6IHsgYXR0cmlidXRlczogeyBzb21lOiAnYXR0cmlidXRlcycgfSB9XG4gICAgICB9LFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUHJpY2luZ0FjdGlvbnMuSW5pdGlhbGl6ZVByaWNpbmcuVHlwZSxcbiAgICAgICAgcmlnaHRzUmVwcm9kdWN0aW9uOiAnUmlnaHRzIE1hbmFnZWQnLFxuICAgICAgICBkaWFsb2dPcHRpb25zOiB7IHNvbWU6ICdvcHRpb25zJyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3ByaWNpbmcnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdvcGVuRGlhbG9nJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ29wdGlvbnMnIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2dldEF0dHJpYnV0ZXMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUHJpY2luZ0FjdGlvbnMuR2V0QXR0cmlidXRlcy5UeXBlLFxuICAgICAgICByaWdodHNSZXByb2R1Y3Rpb246ICdSaWdodHMgTWFuYWdlZCcsXG4gICAgICAgIGRpYWxvZ09wdGlvbnM6IHsgc29tZTogJ29wdGlvbnMnIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdnZXRQcmljZUF0dHJpYnV0ZXMnLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9LFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydSaWdodHMgTWFuYWdlZCddXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3ByaWNpbmcnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdnZXRBdHRyaWJ1dGVzU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9LCAnUmlnaHRzIE1hbmFnZWQnLCB7IHNvbWU6ICdvcHRpb25zJyB9XVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdwcmljaW5nJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ2V0QXR0cmlidXRlc0ZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2dldEF0dHJpYnV0ZXNTdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFByaWNpbmdBY3Rpb25zLkdldEF0dHJpYnV0ZXNTdWNjZXNzLlR5cGUsXG4gICAgICAgIGRpYWxvZ09wdGlvbnM6IHsgc29tZTogJ29wdGlvbnMnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncHJpY2luZycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ29wZW5EaWFsb2cnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAnb3B0aW9ucycgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZ2V0QXR0cmlidXRlc1N1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUHJpY2luZ0FjdGlvbnMuR2V0QXR0cmlidXRlc1N1Y2Nlc3MuVHlwZSxcbiAgICAgICAgZGlhbG9nT3B0aW9uczogeyBzb21lOiAnb3B0aW9ucycgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdwcmljaW5nJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnb3BlbkRpYWxvZycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdvcHRpb25zJyB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdjYWxjdWxhdGVQcmljZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBQcmljaW5nQWN0aW9ucy5DYWxjdWxhdGVQcmljZS5UeXBlLFxuICAgICAgICBzZWxlY3RlZEF0dHJpYnV0ZXM6IHsgYTogJ2InLCBjOiAnZCcgfSxcbiAgICAgICAgYXNzZXRJZDogMTIzNDUsXG4gICAgICAgIHN1YmNsaXBNYXJrZXJzOiB7IHNvbWU6ICdtYXJrZXJzJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnZ2V0UHJpY2UnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgYTogJ2InLCBjOiAnZCcgfSwgMTIzNDUsIHsgc29tZTogJ21hcmtlcnMnIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiAxMDBcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncHJpY2luZycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2NhbGN1bGF0ZVByaWNlU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxMDBdXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3ByaWNpbmcnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdjYWxjdWxhdGVQcmljZUZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2NhbGN1bGF0ZVByaWNlU3VjY2VzcycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBQcmljaW5nQWN0aW9ucy5DYWxjdWxhdGVQcmljZVN1Y2Nlc3MuVHlwZSxcbiAgICAgICAgcHJpY2U6IDEwMFxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdwcmljaW5nJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnc2V0UHJpY2VGb3JEaWFsb2cnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbMTAwXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdvcGVuRGlhbG9nJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFByaWNpbmdBY3Rpb25zLk9wZW5EaWFsb2cuVHlwZSxcbiAgICAgICAgZGlhbG9nT3B0aW9uczogeyBzb21lOiAnb3B0aW9ucycgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ2NhbGxzIFxcJ29wZW5Db21wb25lbnRJbkRpYWxvZygpXFwnIG9uIHRoZSBkaWFsb2cgc2VydmljZScsXG4gICAgICAgICAgZXhwZWN0YXRpb246ICgpID0+IGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgc29tZTogJ29wdGlvbnMnIH0pXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
