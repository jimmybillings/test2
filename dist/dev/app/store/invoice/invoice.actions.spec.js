"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invoice_actions_1 = require("./invoice.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Invoice Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            comment: 'without a share key',
            factoryMethod: {
                class: invoice_actions_1.ActionFactory,
                name: 'load',
                parameters: [{ some: 'orderId' }]
            },
            expectedAction: {
                type: '[Invoice] Load',
                orderId: { some: 'orderId' },
                shareKey: undefined
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'with a share key',
            factoryMethod: {
                class: invoice_actions_1.ActionFactory,
                name: 'load',
                parameters: [{ some: 'orderId' }, 'shareKey']
            },
            expectedAction: {
                type: '[Invoice] Load',
                orderId: { some: 'orderId' },
                shareKey: 'shareKey'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: invoice_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ some: 'invoice' }]
            },
            expectedAction: {
                type: '[Invoice] Load Success',
                invoice: { some: 'invoice' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: invoice_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Invoice] Load Failure',
                error: { some: 'error' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2UuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlFO0FBQ3pFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwrQkFBYTtnQkFDcEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDbEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtnQkFDNUIsUUFBUSxFQUFFLFNBQVM7YUFDcEI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLCtCQUFhO2dCQUNwQixJQUFJLEVBQUUsTUFBTTtnQkFDWixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxVQUFVLENBQUM7YUFDOUM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtnQkFDNUIsUUFBUSxFQUFFLFVBQVU7YUFDckI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSx1Q0FBcUI7Z0JBQzVCLElBQUksRUFBRSxhQUFhO2dCQUNuQixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzthQUNsQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2FBQzdCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsdUNBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHdCQUF3QjtnQkFDOUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN6QjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXhERCxvQkF3REMiLCJmaWxlIjoiYXBwL3N0b3JlL2ludm9pY2UvaW52b2ljZS5hY3Rpb25zLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25GYWN0b3J5LCBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgfSBmcm9tICcuL2ludm9pY2UuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdJbnZvaWNlIEFjdGlvbnMnLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGNvbW1lbnQ6ICd3aXRob3V0IGEgc2hhcmUga2V5JyxcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ29yZGVySWQnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tJbnZvaWNlXSBMb2FkJyxcbiAgICAgICAgb3JkZXJJZDogeyBzb21lOiAnb3JkZXJJZCcgfSxcbiAgICAgICAgc2hhcmVLZXk6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIGEgc2hhcmUga2V5JyxcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ29yZGVySWQnIH0sICdzaGFyZUtleSddXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tJbnZvaWNlXSBMb2FkJyxcbiAgICAgICAgb3JkZXJJZDogeyBzb21lOiAnb3JkZXJJZCcgfSxcbiAgICAgICAgc2hhcmVLZXk6ICdzaGFyZUtleSdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdpbnZvaWNlJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbSW52b2ljZV0gTG9hZCBTdWNjZXNzJyxcbiAgICAgICAgaW52b2ljZTogeyBzb21lOiAnaW52b2ljZScgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbSW52b2ljZV0gTG9hZCBGYWlsdXJlJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
