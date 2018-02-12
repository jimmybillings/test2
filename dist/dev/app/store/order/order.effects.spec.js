"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_effects_1 = require("./order.effects");
var OrderActions = require("./order.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Order Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new order_effects_1.OrderEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'load',
            effectsInstantiator: instantiator,
            inputAction: {
                type: OrderActions.Load.Type,
                orderId: 47
            },
            serviceMethod: {
                name: 'load',
                expectedArguments: [47],
                returnsObservableOf: { some: 'order' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'order',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ some: 'order' }]
                },
                failure: {
                    sectionName: 'order',
                    methodName: 'loadFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadSuccess',
            comment: 'with order store checkingOut === true',
            effectsInstantiator: instantiator,
            inputAction: {
                type: OrderActions.LoadSuccess.Type
            },
            state: {
                storeSectionName: 'order',
                propertyName: 'checkingOut',
                value: true
            },
            outputActionFactories: {
                success: [{
                        sectionName: 'order',
                        methodName: 'setCheckoutState',
                        expectedArguments: [false]
                    },
                    {
                        sectionName: 'cart',
                        methodName: 'load',
                        expectedArguments: []
                    }]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadSuccess',
            comment: 'with order store checkingOut === false',
            effectsInstantiator: instantiator,
            inputAction: {
                type: OrderActions.LoadSuccess.Type
            },
            state: {
                storeSectionName: 'order',
                propertyName: 'checkingOut',
                value: false
            },
            expectToEmitAction: false
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9vcmRlci9vcmRlci5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBK0M7QUFDL0MsOENBQWdEO0FBQ2hELDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUksNEJBQVksQ0FDckIsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FDckcsQ0FBQztRQUNKLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsTUFBTTtZQUNsQixtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUM1QixPQUFPLEVBQUUsRUFBRTthQUNaO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLGlCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUN2QixtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDdkM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxPQUFPO29CQUNwQixVQUFVLEVBQUUsYUFBYTtvQkFDekIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztpQkFDdkM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxPQUFPO29CQUNwQixVQUFVLEVBQUUsYUFBYTtpQkFDMUI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLE9BQU8sRUFBRSx1Q0FBdUM7WUFDaEQsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSTthQUNwQztZQUNELEtBQUssRUFBRTtnQkFDTCxnQkFBZ0IsRUFBRSxPQUFPO2dCQUN6QixZQUFZLEVBQUUsYUFBYTtnQkFDM0IsS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUUsQ0FBQzt3QkFDUixXQUFXLEVBQUUsT0FBTzt3QkFDcEIsVUFBVSxFQUFFLGtCQUFrQjt3QkFDOUIsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7cUJBQzNCO29CQUNEO3dCQUNFLFdBQVcsRUFBRSxNQUFNO3dCQUNuQixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsaUJBQWlCLEVBQUUsRUFBRTtxQkFDdEIsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLGFBQWE7WUFDekIsT0FBTyxFQUFFLHdDQUF3QztZQUNqRCxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2FBQ3BDO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLGdCQUFnQixFQUFFLE9BQU87Z0JBQ3pCLFlBQVksRUFBRSxhQUFhO2dCQUMzQixLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0Qsa0JBQWtCLEVBQUUsS0FBSztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE1RUQsb0JBNEVDIiwiZmlsZSI6ImFwcC9zdG9yZS9vcmRlci9vcmRlci5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcmRlckVmZmVjdHMgfSBmcm9tICcuL29yZGVyLmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgT3JkZXJBY3Rpb25zIGZyb20gJy4vb3JkZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdPcmRlciBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IGFueSB7XG4gICAgICByZXR1cm4gbmV3IE9yZGVyRWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IE9yZGVyQWN0aW9ucy5Mb2FkLlR5cGUsXG4gICAgICAgIG9yZGVySWQ6IDQ3XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnbG9hZCcsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbNDddLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdvcmRlcicgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdvcmRlcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ29yZGVyJyB9XVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdvcmRlcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRGYWlsdXJlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICBjb21tZW50OiAnd2l0aCBvcmRlciBzdG9yZSBjaGVja2luZ091dCA9PT0gdHJ1ZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBPcmRlckFjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdvcmRlcicsXG4gICAgICAgIHByb3BlcnR5TmFtZTogJ2NoZWNraW5nT3V0JyxcbiAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2VzczogW3tcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ29yZGVyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnc2V0Q2hlY2tvdXRTdGF0ZScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtmYWxzZV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnY2FydCcsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWQnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZFN1Y2Nlc3MnLFxuICAgICAgY29tbWVudDogJ3dpdGggb3JkZXIgc3RvcmUgY2hlY2tpbmdPdXQgPT09IGZhbHNlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IE9yZGVyQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlXG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ29yZGVyJyxcbiAgICAgICAgcHJvcGVydHlOYW1lOiAnY2hlY2tpbmdPdXQnLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBleHBlY3RUb0VtaXRBY3Rpb246IGZhbHNlXG4gICAgfSk7XG4gIH0pO1xufVxuIl19
