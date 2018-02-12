"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkout_actions_1 = require("./checkout.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Checkout Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: checkout_actions_1.ActionFactory,
                name: 'setPurchaseOrderId',
                parameters: ['123-purchase-order-id']
            },
            expectedAction: {
                type: '[Checkout] Set Purchase Order Id',
                purchaseOrderId: '123-purchase-order-id'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: checkout_actions_1.ActionFactory,
                name: 'setAvailablePaymentOptions',
                parameters: [{ some: 'options' }]
            },
            expectedAction: {
                type: '[Checkout] Set Available Payment Options',
                paymentOptions: { some: 'options' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: checkout_actions_1.ActionFactory,
                name: 'setSelectedPaymentType',
                parameters: ['SomePaymentOption']
            },
            expectedAction: {
                type: '[Checkout] Set Selected Payment Type',
                selectedPaymentType: 'SomePaymentOption'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: checkout_actions_1.ActionFactory,
                name: 'setAvailableAddresses',
                parameters: [{ some: 'addresses' }]
            },
            expectedAction: {
                type: '[Checkout] Set Available Addresses',
                addresses: { some: 'addresses' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: checkout_actions_1.ActionFactory,
                name: 'setSelectedAddress',
                parameters: [{ some: 'address' }]
            },
            expectedAction: {
                type: '[Checkout] Set Selected Address',
                selectedAddress: { some: 'address' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: checkout_actions_1.ActionFactory,
                name: 'setCreditCardAuthorization',
                parameters: [{ some: 'auth' }]
            },
            expectedAction: {
                type: '[Checkout] Set Credit Card Authorization',
                authorization: { some: 'auth' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jaGVja291dC9jaGVja291dC5hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEU7QUFDMUUsMkVBQXdFO0FBRXhFO0lBQ0UsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLElBQUksaUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVuRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxnQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLG9CQUFvQjtnQkFDMUIsVUFBVSxFQUFFLENBQUMsdUJBQXVCLENBQUM7YUFDdEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGtDQUFrQztnQkFDeEMsZUFBZSxFQUFFLHVCQUF1QjthQUN6QztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGdDQUFhO2dCQUNwQixJQUFJLEVBQUUsNEJBQTRCO2dCQUNsQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzthQUNsQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMENBQTBDO2dCQUNoRCxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsZ0NBQWE7Z0JBQ3BCLElBQUksRUFBRSx3QkFBd0I7Z0JBQzlCLFVBQVUsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQ2xDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxzQ0FBc0M7Z0JBQzVDLG1CQUFtQixFQUFFLG1CQUFtQjthQUN6QztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGdDQUFhO2dCQUNwQixJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzthQUNwQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsb0NBQW9DO2dCQUMxQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsZ0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2FBQ2xDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxpQ0FBaUM7Z0JBQ3ZDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7YUFDckM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxnQ0FBYTtnQkFDcEIsSUFBSSxFQUFFLDRCQUE0QjtnQkFDbEMsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDL0I7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDBDQUEwQztnQkFDaEQsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTthQUNoQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTVFRCxvQkE0RUMiLCJmaWxlIjoiYXBwL3N0b3JlL2NoZWNrb3V0L2NoZWNrb3V0LmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vY2hlY2tvdXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDaGVja291dCBBY3Rpb25zJywgKCkgPT4ge1xuICAgIGxldCBhY3Rpb25zU3BlY0hlbHBlcjogQWN0aW9uc1NwZWNIZWxwZXIgPSBuZXcgQWN0aW9uc1NwZWNIZWxwZXIoKTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2V0UHVyY2hhc2VPcmRlcklkJyxcbiAgICAgICAgcGFyYW1ldGVyczogWycxMjMtcHVyY2hhc2Utb3JkZXItaWQnXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2hlY2tvdXRdIFNldCBQdXJjaGFzZSBPcmRlciBJZCcsXG4gICAgICAgIHB1cmNoYXNlT3JkZXJJZDogJzEyMy1wdXJjaGFzZS1vcmRlci1pZCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2V0QXZhaWxhYmxlUGF5bWVudE9wdGlvbnMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnb3B0aW9ucycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NoZWNrb3V0XSBTZXQgQXZhaWxhYmxlIFBheW1lbnQgT3B0aW9ucycsXG4gICAgICAgIHBheW1lbnRPcHRpb25zOiB7IHNvbWU6ICdvcHRpb25zJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3NldFNlbGVjdGVkUGF5bWVudFR5cGUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbJ1NvbWVQYXltZW50T3B0aW9uJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NoZWNrb3V0XSBTZXQgU2VsZWN0ZWQgUGF5bWVudCBUeXBlJyxcbiAgICAgICAgc2VsZWN0ZWRQYXltZW50VHlwZTogJ1NvbWVQYXltZW50T3B0aW9uJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdzZXRBdmFpbGFibGVBZGRyZXNzZXMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnYWRkcmVzc2VzJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2hlY2tvdXRdIFNldCBBdmFpbGFibGUgQWRkcmVzc2VzJyxcbiAgICAgICAgYWRkcmVzc2VzOiB7IHNvbWU6ICdhZGRyZXNzZXMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2V0U2VsZWN0ZWRBZGRyZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2FkZHJlc3MnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tDaGVja291dF0gU2V0IFNlbGVjdGVkIEFkZHJlc3MnLFxuICAgICAgICBzZWxlY3RlZEFkZHJlc3M6IHsgc29tZTogJ2FkZHJlc3MnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2V0Q3JlZGl0Q2FyZEF1dGhvcml6YXRpb24nLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnYXV0aCcgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NoZWNrb3V0XSBTZXQgQ3JlZGl0IENhcmQgQXV0aG9yaXphdGlvbicsXG4gICAgICAgIGF1dGhvcml6YXRpb246IHsgc29tZTogJ2F1dGgnIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
