"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delivery_options_effects_1 = require("./delivery-options.effects");
var DeliveryOptionsActions = require("./delivery-options.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Delivery Options Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        var mockWindowRef;
        function instantiator() {
            mockWindowRef = { nativeWindow: { location: { href: '' } } };
            return new delivery_options_effects_1.DeliveryOptionsEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockWindowRef);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadDeliveryOptions',
            effectsInstantiator: instantiator,
            inputAction: {
                type: DeliveryOptionsActions.Load.Type,
                activeAsset: { assetId: 123 },
                shareKey: 'abc-123'
            },
            serviceMethod: {
                name: 'getDeliveryOptions',
                expectedArguments: [123, 'abc-123'],
                returnsObservableOf: [{ some: 'deliveryOption' }]
            },
            outputActionFactories: {
                success: {
                    sectionName: 'deliveryOptions',
                    methodName: 'loadSuccess',
                    expectedArguments: [[{ some: 'deliveryOption' }]]
                },
                failure: {
                    sectionName: 'deliveryOptions',
                    methodName: 'loadFailure',
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'download',
            effectsInstantiator: instantiator,
            state: {
                storeSectionName: 'deliveryOptions',
                value: { activeAssetId: 123 }
            },
            inputAction: {
                type: DeliveryOptionsActions.Download.Type,
                option: {
                    deliveryOptionLabel: 'someLabel',
                    deliveryOptionTransferType: 'someTransferType',
                    deliveryOptionUseType: 'someUseType',
                    renditionUrl: { url: 'some-url' }
                }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activity',
                    methodName: 'record',
                    expectedArguments: [
                        {
                            activityName: 'someLabel',
                            activities: {
                                assetId: 123,
                                transferType: 'someTransferType',
                                sourceUseType: 'someUseType'
                            }
                        }
                    ]
                }
            },
            customTests: [
                {
                    it: 'sets the href property on the window',
                    expectation: function () { return expect(mockWindowRef.nativeWindow.location.href).toEqual('some-url'); }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'downloadViaAspera',
            effectsInstantiator: instantiator,
            state: {
                storeSectionName: 'deliveryOptions',
                value: { activeAssetId: 123 }
            },
            inputAction: {
                type: DeliveryOptionsActions.DownloadViaAspera.Type,
                option: {
                    deliveryOptionLabel: 'someLabel',
                    deliveryOptionTransferType: 'someTransferType',
                    deliveryOptionUseType: 'someUseType',
                    renditionUrl: { asperaSpec: 'some-url' }
                }
            },
            serviceMethod: {
                name: 'initializeAsperaConnection',
                expectedArguments: ['some-url'],
                callsApiService: false
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activity',
                    methodName: 'record',
                    expectedArguments: [
                        {
                            activityName: 'someLabel',
                            activities: {
                                assetId: 123,
                                transferType: 'someTransferType',
                                sourceUseType: 'someUseType'
                            }
                        }
                    ]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'deliver',
            effectsInstantiator: instantiator,
            inputAction: {
                type: DeliveryOptionsActions.Deliver.Type,
                assetId: 1,
                option: { deliveryOptionId: 2 },
                markers: { some: 'markers' }
            },
            serviceMethod: {
                name: 'deliverAsset',
                expectedArguments: [1, 2, { some: 'markers' }],
                returnsObservableOf: { some: 'order', id: 3 }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'deliveryOptions',
                    methodName: 'deliverySuccess',
                    expectedArguments: [3, { deliveryOptionId: 2 }]
                },
                failure: {
                    sectionName: 'deliveryOptions',
                    methodName: 'deliveryFailure',
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackbarOnDeliverySuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: DeliveryOptionsActions.DeliverySuccess.Type,
                orderId: 1
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['ASSET.DELIVERY_OPTIONS.DELIVERY_SUCCESS', { orderId: 1 }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'recordActivityOnDeliverySuccess',
            effectsInstantiator: instantiator,
            state: {
                storeSectionName: 'deliveryOptions',
                value: { activeAssetId: 123 }
            },
            inputAction: {
                type: DeliveryOptionsActions.DeliverySuccess.Type,
                orderId: 1,
                option: {
                    deliveryOptionLabel: 'someLabel',
                    deliveryOptionTransferType: 'someTransferType',
                    deliveryOptionUseType: 'someUseType',
                    renditionUrl: { asperaSpec: 'some-url' }
                }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activity',
                    methodName: 'record',
                    expectedArguments: [{
                            activityName: 'someLabel',
                            activities: {
                                assetId: 123,
                                transferType: 'someTransferType',
                                sourceUseType: 'someUseType'
                            }
                        }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'deliveryFailure',
            effectsInstantiator: instantiator,
            inputAction: {
                type: DeliveryOptionsActions.DeliveryFailure.Type,
                orderId: 1
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['ASSET.DELIVERY_OPTIONS.DELIVERY_ERROR']
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUVBQW9FO0FBQ3BFLG1FQUFxRTtBQUNyRSwyRUFBOEY7QUFFOUY7SUFDRSxRQUFRLENBQUMsMEJBQTBCLEVBQUU7UUFDbkMsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBQ3JFLElBQUksYUFBa0IsQ0FBQztRQUV2QjtZQUNFLGFBQWEsR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDN0QsTUFBTSxDQUFDLElBQUksaURBQXNCLENBQy9CLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUNwSCxDQUFDO1FBQ0osQ0FBQztRQUVELGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxxQkFBcUI7WUFDakMsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUN0QyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUM3QixRQUFRLEVBQUUsU0FBUzthQUNwQjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsb0JBQW9CO2dCQUMxQixpQkFBaUIsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7Z0JBQ25DLG1CQUFtQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzthQUNsRDtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLGlCQUFpQjtvQkFDOUIsVUFBVSxFQUFFLGFBQWE7b0JB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QztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpORCxvQkFpTkMiLCJmaWxlIjoiYXBwL3N0b3JlL2RlbGl2ZXJ5LW9wdGlvbnMvZGVsaXZlcnktb3B0aW9ucy5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWxpdmVyeU9wdGlvbnNFZmZlY3RzIH0gZnJvbSAnLi9kZWxpdmVyeS1vcHRpb25zLmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgRGVsaXZlcnlPcHRpb25zQWN0aW9ucyBmcm9tICcuL2RlbGl2ZXJ5LW9wdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciwgRWZmZWN0VGVzdFBhcmFtZXRlcnMgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnRGVsaXZlcnkgT3B0aW9ucyBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuICAgIGxldCBtb2NrV2luZG93UmVmOiBhbnk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IoKTogRGVsaXZlcnlPcHRpb25zRWZmZWN0cyB7XG4gICAgICBtb2NrV2luZG93UmVmID0geyBuYXRpdmVXaW5kb3c6IHsgbG9jYXRpb246IHsgaHJlZjogJycgfSB9IH07XG4gICAgICByZXR1cm4gbmV3IERlbGl2ZXJ5T3B0aW9uc0VmZmVjdHMoXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTdG9yZSwgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2UsIG1vY2tXaW5kb3dSZWZcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZERlbGl2ZXJ5T3B0aW9ucycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBEZWxpdmVyeU9wdGlvbnNBY3Rpb25zLkxvYWQuVHlwZSxcbiAgICAgICAgYWN0aXZlQXNzZXQ6IHsgYXNzZXRJZDogMTIzIH0sXG4gICAgICAgIHNoYXJlS2V5OiAnYWJjLTEyMydcbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdnZXREZWxpdmVyeU9wdGlvbnMnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEyMywgJ2FiYy0xMjMnXSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogW3sgc29tZTogJ2RlbGl2ZXJ5T3B0aW9uJyB9XVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdkZWxpdmVyeU9wdGlvbnMnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtbeyBzb21lOiAnZGVsaXZlcnlPcHRpb24nIH1dXVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdkZWxpdmVyeU9wdGlvbnMnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkRmFpbHVyZScsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2Rvd25sb2FkJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdkZWxpdmVyeU9wdGlvbnMnLFxuICAgICAgICB2YWx1ZTogeyBhY3RpdmVBc3NldElkOiAxMjMgfVxuICAgICAgfSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuRG93bmxvYWQuVHlwZSxcbiAgICAgICAgb3B0aW9uOiB7XG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25MYWJlbDogJ3NvbWVMYWJlbCcsXG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25UcmFuc2ZlclR5cGU6ICdzb21lVHJhbnNmZXJUeXBlJyxcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvblVzZVR5cGU6ICdzb21lVXNlVHlwZScsXG4gICAgICAgICAgcmVuZGl0aW9uVXJsOiB7IHVybDogJ3NvbWUtdXJsJyB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYWN0aXZpdHknLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdyZWNvcmQnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFjdGl2aXR5TmFtZTogJ3NvbWVMYWJlbCcsXG4gICAgICAgICAgICAgIGFjdGl2aXRpZXM6IHtcbiAgICAgICAgICAgICAgICBhc3NldElkOiAxMjMsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXJUeXBlOiAnc29tZVRyYW5zZmVyVHlwZScsXG4gICAgICAgICAgICAgICAgc291cmNlVXNlVHlwZTogJ3NvbWVVc2VUeXBlJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnc2V0cyB0aGUgaHJlZiBwcm9wZXJ0eSBvbiB0aGUgd2luZG93JyxcbiAgICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4gZXhwZWN0KG1vY2tXaW5kb3dSZWYubmF0aXZlV2luZG93LmxvY2F0aW9uLmhyZWYpLnRvRXF1YWwoJ3NvbWUtdXJsJylcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZG93bmxvYWRWaWFBc3BlcmEnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2RlbGl2ZXJ5T3B0aW9ucycsXG4gICAgICAgIHZhbHVlOiB7IGFjdGl2ZUFzc2V0SWQ6IDEyMyB9XG4gICAgICB9LFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5Eb3dubG9hZFZpYUFzcGVyYS5UeXBlLFxuICAgICAgICBvcHRpb246IHtcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvbkxhYmVsOiAnc29tZUxhYmVsJyxcbiAgICAgICAgICBkZWxpdmVyeU9wdGlvblRyYW5zZmVyVHlwZTogJ3NvbWVUcmFuc2ZlclR5cGUnLFxuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uVXNlVHlwZTogJ3NvbWVVc2VUeXBlJyxcbiAgICAgICAgICByZW5kaXRpb25Vcmw6IHsgYXNwZXJhU3BlYzogJ3NvbWUtdXJsJyB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdpbml0aWFsaXplQXNwZXJhQ29ubmVjdGlvbicsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbJ3NvbWUtdXJsJ10sXG4gICAgICAgIGNhbGxzQXBpU2VydmljZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYWN0aXZpdHknLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdyZWNvcmQnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFjdGl2aXR5TmFtZTogJ3NvbWVMYWJlbCcsXG4gICAgICAgICAgICAgIGFjdGl2aXRpZXM6IHtcbiAgICAgICAgICAgICAgICBhc3NldElkOiAxMjMsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXJUeXBlOiAnc29tZVRyYW5zZmVyVHlwZScsXG4gICAgICAgICAgICAgICAgc291cmNlVXNlVHlwZTogJ3NvbWVVc2VUeXBlJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdkZWxpdmVyJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuRGVsaXZlci5UeXBlLFxuICAgICAgICBhc3NldElkOiAxLFxuICAgICAgICBvcHRpb246IHsgZGVsaXZlcnlPcHRpb25JZDogMiB9LFxuICAgICAgICBtYXJrZXJzOiB7IHNvbWU6ICdtYXJrZXJzJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnZGVsaXZlckFzc2V0JyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxLCAyLCB7IHNvbWU6ICdtYXJrZXJzJyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAnb3JkZXInLCBpZDogMyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2RlbGl2ZXJ5T3B0aW9ucycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2RlbGl2ZXJ5U3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFszLCB7IGRlbGl2ZXJ5T3B0aW9uSWQ6IDIgfV1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZToge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnZGVsaXZlcnlPcHRpb25zJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGVsaXZlcnlGYWlsdXJlJyxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2hvd1NuYWNrYmFyT25EZWxpdmVyeVN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogRGVsaXZlcnlPcHRpb25zQWN0aW9ucy5EZWxpdmVyeVN1Y2Nlc3MuVHlwZSxcbiAgICAgICAgb3JkZXJJZDogMVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdzbmFja2JhcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Rpc3BsYXknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbJ0FTU0VULkRFTElWRVJZX09QVElPTlMuREVMSVZFUllfU1VDQ0VTUycsIHsgb3JkZXJJZDogMSB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdyZWNvcmRBY3Rpdml0eU9uRGVsaXZlcnlTdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdkZWxpdmVyeU9wdGlvbnMnLFxuICAgICAgICB2YWx1ZTogeyBhY3RpdmVBc3NldElkOiAxMjMgfVxuICAgICAgfSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuRGVsaXZlcnlTdWNjZXNzLlR5cGUsXG4gICAgICAgIG9yZGVySWQ6IDEsXG4gICAgICAgIG9wdGlvbjoge1xuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uTGFiZWw6ICdzb21lTGFiZWwnLFxuICAgICAgICAgIGRlbGl2ZXJ5T3B0aW9uVHJhbnNmZXJUeXBlOiAnc29tZVRyYW5zZmVyVHlwZScsXG4gICAgICAgICAgZGVsaXZlcnlPcHRpb25Vc2VUeXBlOiAnc29tZVVzZVR5cGUnLFxuICAgICAgICAgIHJlbmRpdGlvblVybDogeyBhc3BlcmFTcGVjOiAnc29tZS11cmwnIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhY3Rpdml0eScsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlY29yZCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7XG4gICAgICAgICAgICBhY3Rpdml0eU5hbWU6ICdzb21lTGFiZWwnLFxuICAgICAgICAgICAgYWN0aXZpdGllczoge1xuICAgICAgICAgICAgICBhc3NldElkOiAxMjMsXG4gICAgICAgICAgICAgIHRyYW5zZmVyVHlwZTogJ3NvbWVUcmFuc2ZlclR5cGUnLFxuICAgICAgICAgICAgICBzb3VyY2VVc2VUeXBlOiAnc29tZVVzZVR5cGUnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZGVsaXZlcnlGYWlsdXJlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IERlbGl2ZXJ5T3B0aW9uc0FjdGlvbnMuRGVsaXZlcnlGYWlsdXJlLlR5cGUsXG4gICAgICAgIG9yZGVySWQ6IDFcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc25hY2tiYXInLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydBU1NFVC5ERUxJVkVSWV9PUFRJT05TLkRFTElWRVJZX0VSUk9SJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
