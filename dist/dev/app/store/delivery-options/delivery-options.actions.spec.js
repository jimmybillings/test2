"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delivery_options_actions_1 = require("./delivery-options.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Delivery Options Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: delivery_options_actions_1.ActionFactory,
                name: 'load',
                parameters: [{ some: 'asset' }, 'abc-123']
            },
            expectedAction: {
                type: '[Delivery Options] Load',
                activeAsset: { some: 'asset' },
                shareKey: 'abc-123'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: delivery_options_actions_1.ActionFactory,
                name: 'download',
                parameters: [{ some: 'option' }]
            },
            expectedAction: {
                type: '[Delivery Options] Download',
                option: { some: 'option' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: delivery_options_actions_1.ActionFactory,
                name: 'downloadViaAspera',
                parameters: [{ some: 'option' }]
            },
            expectedAction: {
                type: '[Delivery Options] Download Via Aspera',
                option: { some: 'option' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: delivery_options_actions_1.ActionFactory,
                name: 'deliver',
                parameters: [1, { some: 'option' }, { some: 'markers' }]
            },
            expectedAction: {
                type: '[Delivery Options] Deliver Asset',
                assetId: 1,
                option: { some: 'option' },
                markers: { some: 'markers' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: delivery_options_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [[{ some: 'options' }]]
            },
            expectedAction: {
                type: '[Delivery Options] Load Success',
                options: [{ some: 'options' }]
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: delivery_options_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Delivery Options] Load Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: delivery_options_actions_1.InternalActionFactory,
                name: 'deliverySuccess',
                parameters: [1, { some: 'option' }]
            },
            expectedAction: {
                type: '[Delivery Options] Delivery Success',
                orderId: 1,
                option: { some: 'option' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: delivery_options_actions_1.InternalActionFactory,
                name: 'deliveryFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Delivery Options] Delivery Failure',
                error: { some: 'error' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUVBQWtGO0FBQ2xGLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsd0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQzthQUMzQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUseUJBQXlCO2dCQUMvQixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2dCQUM5QixRQUFRLEVBQUUsU0FBUzthQUNwQjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLHdDQUFhO2dCQUNwQixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDakM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTthQUMzQjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLHdDQUFhO2dCQUNwQixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzthQUNqQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsd0NBQXdDO2dCQUM5QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2FBQzNCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsd0NBQWE7Z0JBQ3BCLElBQUksRUFBRSxTQUFTO2dCQUNmLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzthQUN6RDtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsa0NBQWtDO2dCQUN4QyxPQUFPLEVBQUUsQ0FBQztnQkFDVixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUMxQixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO2FBQzdCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsZ0RBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxpQ0FBaUM7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2FBQy9CO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsZ0RBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGlDQUFpQztnQkFDdkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN6QjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGdEQUFxQjtnQkFDNUIsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQ3BDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxxQ0FBcUM7Z0JBQzNDLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7YUFDM0I7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxnREFBcUI7Z0JBQzVCLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxxQ0FBcUM7Z0JBQzNDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7YUFDekI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4R0Qsb0JBd0dDIiwiZmlsZSI6ImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuYWN0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9kZWxpdmVyeS1vcHRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnRGVsaXZlcnkgT3B0aW9ucyBBY3Rpb25zJywgKCkgPT4ge1xuICAgIGxldCBhY3Rpb25zU3BlY0hlbHBlcjogQWN0aW9uc1NwZWNIZWxwZXIgPSBuZXcgQWN0aW9uc1NwZWNIZWxwZXIoKTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdhc3NldCcgfSwgJ2FiYy0xMjMnXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbRGVsaXZlcnkgT3B0aW9uc10gTG9hZCcsXG4gICAgICAgIGFjdGl2ZUFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfSxcbiAgICAgICAgc2hhcmVLZXk6ICdhYmMtMTIzJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdkb3dubG9hZCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdvcHRpb24nIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tEZWxpdmVyeSBPcHRpb25zXSBEb3dubG9hZCcsXG4gICAgICAgIG9wdGlvbjogeyBzb21lOiAnb3B0aW9uJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2Rvd25sb2FkVmlhQXNwZXJhJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ29wdGlvbicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0RlbGl2ZXJ5IE9wdGlvbnNdIERvd25sb2FkIFZpYSBBc3BlcmEnLFxuICAgICAgICBvcHRpb246IHsgc29tZTogJ29wdGlvbicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdkZWxpdmVyJyxcbiAgICAgICAgcGFyYW1ldGVyczogWzEsIHsgc29tZTogJ29wdGlvbicgfSwgeyBzb21lOiAnbWFya2VycycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0RlbGl2ZXJ5IE9wdGlvbnNdIERlbGl2ZXIgQXNzZXQnLFxuICAgICAgICBhc3NldElkOiAxLFxuICAgICAgICBvcHRpb246IHsgc29tZTogJ29wdGlvbicgfSxcbiAgICAgICAgbWFya2VyczogeyBzb21lOiAnbWFya2VycycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW1t7IHNvbWU6ICdvcHRpb25zJyB9XV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0RlbGl2ZXJ5IE9wdGlvbnNdIExvYWQgU3VjY2VzcycsXG4gICAgICAgIG9wdGlvbnM6IFt7IHNvbWU6ICdvcHRpb25zJyB9XVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbRGVsaXZlcnkgT3B0aW9uc10gTG9hZCBGYWlsdXJlJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZGVsaXZlcnlTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogWzEsIHsgc29tZTogJ29wdGlvbicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0RlbGl2ZXJ5IE9wdGlvbnNdIERlbGl2ZXJ5IFN1Y2Nlc3MnLFxuICAgICAgICBvcmRlcklkOiAxLFxuICAgICAgICBvcHRpb246IHsgc29tZTogJ29wdGlvbicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2RlbGl2ZXJ5RmFpbHVyZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdlcnJvcicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0RlbGl2ZXJ5IE9wdGlvbnNdIERlbGl2ZXJ5IEZhaWx1cmUnLFxuICAgICAgICBlcnJvcjogeyBzb21lOiAnZXJyb3InIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
