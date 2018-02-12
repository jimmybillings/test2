"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_actions_1 = require("./order.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Order Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: order_actions_1.ActionFactory,
                name: 'load',
                parameters: [42]
            },
            expectedAction: {
                type: '[Order] Load',
                orderId: 42
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: order_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ some: 'order' }]
            },
            expectedAction: {
                type: '[Order] Load Success',
                activeOrder: { some: 'order' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: order_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Order] Load Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: order_actions_1.InternalActionFactory,
                name: 'setCheckoutState',
                parameters: [true]
            },
            expectedAction: {
                type: '[Order] Set Checkout State',
                checkingOut: true
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9vcmRlci9vcmRlci5hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBdUU7QUFDdkUsMkVBQXdFO0FBRXhFO0lBQ0UsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLElBQUksaUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVuRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSw2QkFBYTtnQkFDcEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxjQUFjO2dCQUNwQixPQUFPLEVBQUUsRUFBRTthQUNaO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUscUNBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLHFDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxxQ0FBcUI7Z0JBQzVCLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsNEJBQTRCO2dCQUNsQyxXQUFXLEVBQUUsSUFBSTthQUNsQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBERCxvQkFvREMiLCJmaWxlIjoiYXBwL3N0b3JlL29yZGVyL29yZGVyLmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vb3JkZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdPcmRlciBBY3Rpb24gRmFjdG9yeScsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbNDJdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tPcmRlcl0gTG9hZCcsXG4gICAgICAgIG9yZGVySWQ6IDQyXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnb3JkZXInIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tPcmRlcl0gTG9hZCBTdWNjZXNzJyxcbiAgICAgICAgYWN0aXZlT3JkZXI6IHsgc29tZTogJ29yZGVyJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZEZhaWx1cmUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnZXJyb3InIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tPcmRlcl0gTG9hZCBGYWlsdXJlJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2V0Q2hlY2tvdXRTdGF0ZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt0cnVlXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbT3JkZXJdIFNldCBDaGVja291dCBTdGF0ZScsXG4gICAgICAgIGNoZWNraW5nT3V0OiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
