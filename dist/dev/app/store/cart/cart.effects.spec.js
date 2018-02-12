"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cart_effects_1 = require("./cart.effects");
var CartActions = require("./cart.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Cart Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new cart_effects_1.CartEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'load',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CartActions.Load.Type
            },
            serviceMethod: {
                name: 'load',
                returnsObservableOf: { some: 'cart' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'cart',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ some: 'cart' }]
                },
                failure: {
                    sectionName: 'cart',
                    methodName: 'loadFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'editLineItemFromDetails',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CartActions.EditLineItemFromDetails.Type,
                uuid: 'abc-123',
                markers: { in: 1, out: 2 },
                attributes: { some: 'attribute' }
            },
            state: {
                storeSectionName: 'cart',
                value: { data: { projects: [{ lineItems: [{ id: 'abc-123', asset: { some: 'asset' } }] }] } }
            },
            serviceMethod: {
                name: 'editLineItem',
                returnsObservableOf: { some: 'cart' },
                expectedArguments: [{ id: 'abc-123', asset: { some: 'asset' } }, { in: 1, out: 2 }, { some: 'attribute' }]
            },
            outputActionFactories: {
                success: {
                    sectionName: 'cart',
                    methodName: 'editLineItemFromDetailsSuccess',
                    expectedArguments: [{ some: 'cart' }]
                },
                failure: {
                    sectionName: 'cart',
                    methodName: 'editLineItemFromDetailsFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackbarOnEditLineItemSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CartActions.EditLineItemFromDetailsSuccess.Type,
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['ASSET.DETAIL.CART_ITEM_UPDATED']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'removeAsset',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CartActions.RemoveAsset.Type,
                asset: { some: 'asset' }
            },
            state: {
                storeSectionName: 'cart',
                propertyName: 'data',
                value: { id: { some: 'cartId' } }
            },
            serviceMethod: {
                name: 'removeAsset',
                expectedArguments: [{ some: 'asset' }],
                returnsObservableOf: { some: 'cart' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'cart',
                    methodName: 'removeAssetSuccess',
                    expectedArguments: [{ some: 'cart' }]
                },
                failure: {
                    sectionName: 'cart',
                    methodName: 'removeAssetFailure',
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'changeRouteOnRemoveAssetSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CartActions.RemoveAssetSuccess.Type
            },
            outputActionFactories: {
                success: {
                    sectionName: 'router',
                    methodName: 'goToCart',
                    expectedArguments: []
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackbarOnRemoveAssetSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CartActions.RemoveAssetSuccess.Type,
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['CART.REMOVE_ASSET.SUCCESS']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addNote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CartActions.AddNote.Type,
                note: 'some note',
                lineItem: { some: 'lineItem' }
            },
            serviceMethod: {
                name: 'addNote',
                expectedArguments: ['some note', { some: 'lineItem' }],
                returnsObservableOf: { some: 'cart' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'cart',
                    methodName: 'addNoteSuccess',
                    expectedArguments: [{ some: 'cart' }]
                },
                failure: {
                    sectionName: 'error',
                    methodName: 'handle'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'removeNote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CartActions.RemoveNote.Type,
                lineItem: { some: 'lineItem' }
            },
            serviceMethod: {
                name: 'removeNoteFrom',
                expectedArguments: [{ some: 'lineItem' }],
                returnsObservableOf: { some: 'cart' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'cart',
                    methodName: 'removeNoteSuccess',
                    expectedArguments: [{ some: 'cart' }]
                },
                failure: {
                    sectionName: 'error',
                    methodName: 'handle'
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jYXJ0L2NhcnQuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTZDO0FBQzdDLDRDQUE4QztBQUM5QywyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsY0FBYyxFQUFFO1FBQ3ZCLElBQU0saUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVyRTtZQUNFLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQ3BCLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQ3JHLENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLE1BQU07WUFDbEIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSTthQUM1QjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsTUFBTTtnQkFDWixtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7YUFDdEM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxNQUFNO29CQUNuQixVQUFVLEVBQUUsYUFBYTtvQkFDekIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDdEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxNQUFNO29CQUNuQixVQUFVLEVBQUUsYUFBYTtpQkFDMUI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSx5QkFBeUI7WUFDckMsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxJ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Q3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsVUFBVSxFQUFFLGdCQUFnQjtvQkFDNUIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDdEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxPQUFPO29CQUNwQixVQUFVLEVBQUUsUUFBUTtpQkFDckI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2pDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7YUFDL0I7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztnQkFDekMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO2FBQ3RDO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsVUFBVSxFQUFFLG1CQUFtQjtvQkFDL0IsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztpQkFDdEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxPQUFPO29CQUNwQixVQUFVLEVBQUUsUUFBUTtpQkFDckI7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTlMRCxvQkE4TEMiLCJmaWxlIjoiYXBwL3N0b3JlL2NhcnQvY2FydC5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYXJ0RWZmZWN0cyB9IGZyb20gJy4vY2FydC5lZmZlY3RzJztcbmltcG9ydCAqIGFzIENhcnRBY3Rpb25zIGZyb20gJy4vY2FydC5hY3Rpb25zJztcbmltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NhcnQgRWZmZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBlZmZlY3RzU3BlY0hlbHBlcjogRWZmZWN0c1NwZWNIZWxwZXIgPSBuZXcgRWZmZWN0c1NwZWNIZWxwZXIoKTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcigpOiBhbnkge1xuICAgICAgcmV0dXJuIG5ldyBDYXJ0RWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IENhcnRBY3Rpb25zLkxvYWQuVHlwZVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdjYXJ0JyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2NhcnQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdjYXJ0JyB9XVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdjYXJ0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2VkaXRMaW5lSXRlbUZyb21EZXRhaWxzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IENhcnRBY3Rpb25zLkVkaXRMaW5lSXRlbUZyb21EZXRhaWxzLlR5cGUsXG4gICAgICAgIHV1aWQ6ICdhYmMtMTIzJyxcbiAgICAgICAgbWFya2VyczogeyBpbjogMSwgb3V0OiAyIH0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IHsgc29tZTogJ2F0dHJpYnV0ZScgfVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdjYXJ0JyxcbiAgICAgICAgdmFsdWU6IHsgZGF0YTogeyBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBpZDogJ2FiYy0xMjMnLCBhc3NldDogeyBzb21lOiAnYXNzZXQnIH0gfV0gfV0gfSB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnZWRpdExpbmVJdGVtJyxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAnY2FydCcgfSxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IGlkOiAnYWJjLTEyMycsIGFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfSB9LCB7IGluOiAxLCBvdXQ6IDIgfSwgeyBzb21lOiAnYXR0cmlidXRlJyB9XVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdjYXJ0JyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZWRpdExpbmVJdGVtRnJvbURldGFpbHNTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2NhcnQnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2NhcnQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdlZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc0ZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ3Nob3dTbmFja2Jhck9uRWRpdExpbmVJdGVtU3VjY2VzcycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBDYXJ0QWN0aW9ucy5FZGl0TGluZUl0ZW1Gcm9tRGV0YWlsc1N1Y2Nlc3MuVHlwZSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc25hY2tiYXInLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydBU1NFVC5ERVRBSUwuQ0FSVF9JVEVNX1VQREFURUQnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdyZW1vdmVBc3NldCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBDYXJ0QWN0aW9ucy5SZW1vdmVBc3NldC5UeXBlLFxuICAgICAgICBhc3NldDogeyBzb21lOiAnYXNzZXQnIH1cbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnY2FydCcsXG4gICAgICAgIHByb3BlcnR5TmFtZTogJ2RhdGEnLFxuICAgICAgICB2YWx1ZTogeyBpZDogeyBzb21lOiAnY2FydElkJyB9IH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdyZW1vdmVBc3NldCcsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAnYXNzZXQnIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdjYXJ0JyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2NhcnQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdyZW1vdmVBc3NldFN1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAnY2FydCcgfV1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZToge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnY2FydCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlbW92ZUFzc2V0RmFpbHVyZScsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2NoYW5nZVJvdXRlT25SZW1vdmVBc3NldFN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQ2FydEFjdGlvbnMuUmVtb3ZlQXNzZXRTdWNjZXNzLlR5cGVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZ29Ub0NhcnQnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdzaG93U25hY2tiYXJPblJlbW92ZUFzc2V0U3VjY2VzcycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBDYXJ0QWN0aW9ucy5SZW1vdmVBc3NldFN1Y2Nlc3MuVHlwZSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc25hY2tiYXInLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydDQVJULlJFTU9WRV9BU1NFVC5TVUNDRVNTJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnYWRkTm90ZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBDYXJ0QWN0aW9ucy5BZGROb3RlLlR5cGUsXG4gICAgICAgIG5vdGU6ICdzb21lIG5vdGUnLFxuICAgICAgICBsaW5lSXRlbTogeyBzb21lOiAnbGluZUl0ZW0nIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdhZGROb3RlJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnc29tZSBub3RlJywgeyBzb21lOiAnbGluZUl0ZW0nIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdjYXJ0JyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2NhcnQnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdhZGROb3RlU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdjYXJ0JyB9XVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdlcnJvcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2hhbmRsZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAncmVtb3ZlTm90ZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBDYXJ0QWN0aW9ucy5SZW1vdmVOb3RlLlR5cGUsXG4gICAgICAgIGxpbmVJdGVtOiB7IHNvbWU6ICdsaW5lSXRlbScgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ3JlbW92ZU5vdGVGcm9tJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdsaW5lSXRlbScgfV0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ2NhcnQnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnY2FydCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ3JlbW92ZU5vdGVTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2NhcnQnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2Vycm9yJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnaGFuZGxlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
