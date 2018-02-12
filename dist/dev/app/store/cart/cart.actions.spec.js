"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cart_actions_1 = require("./cart.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Cart Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.ActionFactory,
                name: 'load',
                parameters: []
            },
            expectedAction: {
                type: '[Cart] Load'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.ActionFactory,
                name: 'editLineItemFromDetails',
                parameters: ['abc-123', { in: 1, out: 2 }, { some: 'attribute' }]
            },
            expectedAction: {
                type: '[Cart] Edit Line Item From Details',
                uuid: 'abc-123',
                markers: { in: 1, out: 2 },
                attributes: { some: 'attribute' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ some: 'cart' }]
            },
            expectedAction: {
                type: '[Cart] Load Success',
                cart: { some: 'cart' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Cart] Load Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.InternalActionFactory,
                name: 'editLineItemFromDetailsSuccess',
                parameters: [{ some: 'cart' }]
            },
            expectedAction: {
                type: '[Cart] Edit Line Item From Details Success',
                cart: { some: 'cart' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.InternalActionFactory,
                name: 'editLineItemFromDetailsFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Cart] Edit Line Item From Details Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.ActionFactory,
                name: 'removeAsset',
                parameters: [{ some: 'asset' }]
            },
            expectedAction: {
                type: '[Cart] Remove Asset',
                asset: { some: 'asset' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.InternalActionFactory,
                name: 'removeAssetSuccess',
                parameters: [{ some: 'cart' }]
            },
            expectedAction: {
                type: '[Cart] Remove Asset Success',
                cart: { some: 'cart' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.InternalActionFactory,
                name: 'removeAssetFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Cart] Remove Asset Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.ActionFactory,
                name: 'addNote',
                parameters: ['some note', { some: 'lineItem' }]
            },
            expectedAction: {
                type: '[Cart] Add Note',
                note: 'some note',
                lineItem: { some: 'lineItem' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.ActionFactory,
                name: 'removeNoteFrom',
                parameters: [{ some: 'lineItem' }]
            },
            expectedAction: {
                type: '[Cart] Remove Note',
                lineItem: { some: 'lineItem' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.InternalActionFactory,
                name: 'addNoteSuccess',
                parameters: [{ some: 'cart' }]
            },
            expectedAction: {
                type: '[Cart] Add Note Success',
                cart: { some: 'cart' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: cart_actions_1.InternalActionFactory,
                name: 'removeNoteSuccess',
                parameters: [{ some: 'cart' }]
            },
            expectedAction: {
                type: '[Cart] Remove Note Success',
                cart: { some: 'cart' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jYXJ0L2NhcnQuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXNFO0FBQ3RFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsNEJBQWE7Z0JBQ3BCLElBQUksRUFBRSxNQUFNO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGFBQWE7YUFDcEI7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSw0QkFBYTtnQkFDcEIsSUFBSSxFQUFFLHlCQUF5QjtnQkFDL0IsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7YUFDbEU7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG9DQUFvQztnQkFDMUMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUMxQixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsb0NBQXFCO2dCQUM1QixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDL0I7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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9jYXJ0LmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ2FydCBBY3Rpb24gRmFjdG9yeScsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2FydF0gTG9hZCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZWRpdExpbmVJdGVtRnJvbURldGFpbHMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbJ2FiYy0xMjMnLCB7IGluOiAxLCBvdXQ6IDIgfSwgeyBzb21lOiAnYXR0cmlidXRlJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2FydF0gRWRpdCBMaW5lIEl0ZW0gRnJvbSBEZXRhaWxzJyxcbiAgICAgICAgdXVpZDogJ2FiYy0xMjMnLFxuICAgICAgICBtYXJrZXJzOiB7IGluOiAxLCBvdXQ6IDIgfSxcbiAgICAgICAgYXR0cmlidXRlczogeyBzb21lOiAnYXR0cmlidXRlJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnY2FydCcgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NhcnRdIExvYWQgU3VjY2VzcycsXG4gICAgICAgIGNhcnQ6IHsgc29tZTogJ2NhcnQnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkRmFpbHVyZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdlcnJvcicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NhcnRdIExvYWQgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2VkaXRMaW5lSXRlbUZyb21EZXRhaWxzU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdjYXJ0JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2FydF0gRWRpdCBMaW5lIEl0ZW0gRnJvbSBEZXRhaWxzIFN1Y2Nlc3MnLFxuICAgICAgICBjYXJ0OiB7IHNvbWU6ICdjYXJ0JyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZWRpdExpbmVJdGVtRnJvbURldGFpbHNGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2FydF0gRWRpdCBMaW5lIEl0ZW0gRnJvbSBEZXRhaWxzIEZhaWx1cmUnLFxuICAgICAgICBlcnJvcjogeyBzb21lOiAnZXJyb3InIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAncmVtb3ZlQXNzZXQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnYXNzZXQnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tDYXJ0XSBSZW1vdmUgQXNzZXQnLFxuICAgICAgICBhc3NldDogeyBzb21lOiAnYXNzZXQnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdyZW1vdmVBc3NldFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnY2FydCcgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NhcnRdIFJlbW92ZSBBc3NldCBTdWNjZXNzJyxcbiAgICAgICAgY2FydDogeyBzb21lOiAnY2FydCcgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3JlbW92ZUFzc2V0RmFpbHVyZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdlcnJvcicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0NhcnRdIFJlbW92ZSBBc3NldCBGYWlsdXJlJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2FkZE5vdGUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbJ3NvbWUgbm90ZScsIHsgc29tZTogJ2xpbmVJdGVtJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2FydF0gQWRkIE5vdGUnLFxuICAgICAgICBub3RlOiAnc29tZSBub3RlJyxcbiAgICAgICAgbGluZUl0ZW06IHsgc29tZTogJ2xpbmVJdGVtJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3JlbW92ZU5vdGVGcm9tJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2xpbmVJdGVtJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2FydF0gUmVtb3ZlIE5vdGUnLFxuICAgICAgICBsaW5lSXRlbTogeyBzb21lOiAnbGluZUl0ZW0nIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdhZGROb3RlU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdjYXJ0JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2FydF0gQWRkIE5vdGUgU3VjY2VzcycsXG4gICAgICAgIGNhcnQ6IHsgc29tZTogJ2NhcnQnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdyZW1vdmVOb3RlU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdjYXJ0JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQ2FydF0gUmVtb3ZlIE5vdGUgU3VjY2VzcycsXG4gICAgICAgIGNhcnQ6IHsgc29tZTogJ2NhcnQnIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
