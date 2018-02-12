"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvoiceActions = require("./invoice.actions");
var invoice_effects_1 = require("./invoice.effects");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Invoice Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new invoice_effects_1.InvoiceEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            comment: 'without a shareKey',
            effectName: 'load',
            effectsInstantiator: instantiator,
            inputAction: {
                type: InvoiceActions.Load.Type,
                orderId: 47
            },
            serviceMethod: {
                name: 'load',
                expectedArguments: [47, undefined],
                returnsObservableOf: { some: 'invoice' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'invoice',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ some: 'invoice' }]
                },
                failure: {
                    sectionName: 'invoice',
                    methodName: 'loadFailure'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            comment: 'with a shareKey',
            effectName: 'load',
            effectsInstantiator: instantiator,
            inputAction: {
                type: InvoiceActions.Load.Type,
                orderId: 47,
                shareKey: 'abc-123'
            },
            serviceMethod: {
                name: 'load',
                expectedArguments: [47, 'abc-123'],
                returnsObservableOf: { some: 'invoice' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'invoice',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ some: 'invoice' }]
                },
                failure: {
                    sectionName: 'invoice',
                    methodName: 'loadFailure'
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2UuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQW9EO0FBQ3BELHFEQUFtRDtBQUNuRCwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRXJFO1lBQ0UsTUFBTSxDQUFDLElBQUksZ0NBQWMsQ0FDdkIsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FDckcsQ0FBQztRQUNKLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQzlCLE9BQU8sRUFBRSxFQUFFO2FBQ1o7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO2dCQUNsQyxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7YUFDekM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxTQUFTO29CQUN0QixVQUFVLEVBQUUsYUFBYTtvQkFDekIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztpQkFDekM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxTQUFTO29CQUN0QixVQUFVLEVBQUUsYUFBYTtpQkFDMUI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsVUFBVSxFQUFFLE1BQU07WUFDbEIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDOUIsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsUUFBUSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO2dCQUNsQyxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7YUFDekM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxTQUFTO29CQUN0QixVQUFVLEVBQUUsYUFBYTtvQkFDekIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztpQkFDekM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxTQUFTO29CQUN0QixVQUFVLEVBQUUsYUFBYTtpQkFDMUI7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9ERCxvQkErREMiLCJmaWxlIjoiYXBwL3N0b3JlL2ludm9pY2UvaW52b2ljZS5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBJbnZvaWNlQWN0aW9ucyBmcm9tICcuL2ludm9pY2UuYWN0aW9ucyc7XG5pbXBvcnQgeyBJbnZvaWNlRWZmZWN0cyB9IGZyb20gJy4vaW52b2ljZS5lZmZlY3RzJztcbmltcG9ydCB7IEVmZmVjdHNTcGVjSGVscGVyIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0ludm9pY2UgRWZmZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBlZmZlY3RzU3BlY0hlbHBlcjogRWZmZWN0c1NwZWNIZWxwZXIgPSBuZXcgRWZmZWN0c1NwZWNIZWxwZXIoKTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcigpOiBhbnkge1xuICAgICAgcmV0dXJuIG5ldyBJbnZvaWNlRWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGNvbW1lbnQ6ICd3aXRob3V0IGEgc2hhcmVLZXknLFxuICAgICAgZWZmZWN0TmFtZTogJ2xvYWQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogSW52b2ljZUFjdGlvbnMuTG9hZC5UeXBlLFxuICAgICAgICBvcmRlcklkOiA0N1xuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzQ3LCB1bmRlZmluZWRdLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IHNvbWU6ICdpbnZvaWNlJyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2ludm9pY2UnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdpbnZvaWNlJyB9XVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdpbnZvaWNlJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZEZhaWx1cmUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgY29tbWVudDogJ3dpdGggYSBzaGFyZUtleScsXG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBJbnZvaWNlQWN0aW9ucy5Mb2FkLlR5cGUsXG4gICAgICAgIG9yZGVySWQ6IDQ3LFxuICAgICAgICBzaGFyZUtleTogJ2FiYy0xMjMnXG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnbG9hZCcsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbNDcsICdhYmMtMTIzJ10sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ2ludm9pY2UnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnaW52b2ljZScsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2ludm9pY2UnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWx1cmU6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2ludm9pY2UnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkRmFpbHVyZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
