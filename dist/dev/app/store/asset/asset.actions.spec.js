"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asset_actions_1 = require("./asset.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Asset Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.ActionFactory,
                name: 'loadOrderAsset',
                parameters: [1, 'abc-123']
            },
            expectedAction: {
                type: '[Asset] Load Order Asset',
                orderId: 1,
                uuid: 'abc-123',
                assetType: 'order'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.ActionFactory,
                name: 'loadQuoteShowAsset',
                parameters: [1, 'abc-123']
            },
            expectedAction: {
                type: '[Asset] Load Quote Show Asset',
                quoteId: 1,
                uuid: 'abc-123',
                assetType: 'quoteShow'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.ActionFactory,
                name: 'loadQuoteEditAsset',
                parameters: ['abc-123']
            },
            expectedAction: {
                type: '[Asset] Load Quote Edit Asset',
                uuid: 'abc-123',
                assetType: 'quoteEdit'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.ActionFactory,
                name: 'loadCartAsset',
                parameters: ['abc-123']
            },
            expectedAction: {
                type: '[Asset] Load Cart Asset',
                uuid: 'abc-123',
                assetType: 'cart'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.ActionFactory,
                name: 'loadActiveCollectionAsset',
                parameters: ['abc-123']
            },
            expectedAction: {
                type: '[Asset] Load Active Collection Asset',
                uuid: 'abc-123',
                assetType: 'collection'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.ActionFactory,
                name: 'loadSearchAsset',
                parameters: [{ some: 'loadParams' }]
            },
            expectedAction: {
                type: '[Asset] Load Search Asset',
                loadParameters: { some: 'loadParams' },
                assetType: 'search'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.ActionFactory,
                name: 'updateMarkersInUrl',
                parameters: [{ some: 'markers' }, 1234567]
            },
            expectedAction: {
                type: '[Asset] Update Markers In URL',
                markers: { some: 'markers' },
                assetId: 1234567
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.InternalActionFactory,
                name: 'loadAssetAfterParentIsAvailable',
                parameters: [{ some: 'loadParams' }, 'cart', 123]
            },
            expectedAction: {
                type: '[Asset] Load Asset After Parent Is Available',
                loadParameters: { some: 'loadParams' },
                assetType: 'cart',
                parentId: 123
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ some: 'asset' }]
            },
            expectedAction: {
                type: '[Asset] Load Success',
                activeAsset: { some: 'asset' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: asset_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Asset] Load Failure',
                error: { some: 'error' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hc3NldC9hc3NldC5hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBdUU7QUFDdkUsMkVBQXdFO0FBRXhFO0lBQ0UsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLElBQUksaUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVuRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSw2QkFBYTtnQkFDcEIsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQzthQUMzQjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMEJBQTBCO2dCQUNoQyxPQUFPLEVBQUUsQ0FBQztnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixTQUFTLEVBQUUsT0FBTzthQUNuQjtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDZCQUFhO2dCQUNwQixJQUFJLEVBQUUsb0JBQW9CO2dCQUMxQixVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO2FBQzNCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwrQkFBK0I7Z0JBQ3JDLE9BQU8sRUFBRSxDQUFDO2dCQUNWLElBQUksRUFBRSxTQUFTO2dCQUNmLFNBQVMsRUFBRSxXQUFXO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsNkJBQWE7Z0JBQ3BCLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUN4QjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsK0JBQStCO2dCQUNyQyxJQUFJLEVBQUUsU0FB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S0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN6QjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXZJRCxvQkF1SUMiLCJmaWxlIjoiYXBwL3N0b3JlL2Fzc2V0L2Fzc2V0LmFjdGlvbnMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkZhY3RvcnksIEludGVybmFsQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vYXNzZXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdBc3NldCBBY3Rpb24gRmFjdG9yeScsICgpID0+IHtcbiAgICBsZXQgYWN0aW9uc1NwZWNIZWxwZXI6IEFjdGlvbnNTcGVjSGVscGVyID0gbmV3IEFjdGlvbnNTcGVjSGVscGVyKCk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRPcmRlckFzc2V0JyxcbiAgICAgICAgcGFyYW1ldGVyczogWzEsICdhYmMtMTIzJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0Fzc2V0XSBMb2FkIE9yZGVyIEFzc2V0JyxcbiAgICAgICAgb3JkZXJJZDogMSxcbiAgICAgICAgdXVpZDogJ2FiYy0xMjMnLFxuICAgICAgICBhc3NldFR5cGU6ICdvcmRlcidcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZFF1b3RlU2hvd0Fzc2V0JyxcbiAgICAgICAgcGFyYW1ldGVyczogWzEsICdhYmMtMTIzJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0Fzc2V0XSBMb2FkIFF1b3RlIFNob3cgQXNzZXQnLFxuICAgICAgICBxdW90ZUlkOiAxLFxuICAgICAgICB1dWlkOiAnYWJjLTEyMycsXG4gICAgICAgIGFzc2V0VHlwZTogJ3F1b3RlU2hvdydcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZFF1b3RlRWRpdEFzc2V0JyxcbiAgICAgICAgcGFyYW1ldGVyczogWydhYmMtMTIzJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0Fzc2V0XSBMb2FkIFF1b3RlIEVkaXQgQXNzZXQnLFxuICAgICAgICB1dWlkOiAnYWJjLTEyMycsXG4gICAgICAgIGFzc2V0VHlwZTogJ3F1b3RlRWRpdCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZENhcnRBc3NldCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnYWJjLTEyMyddXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBc3NldF0gTG9hZCBDYXJ0IEFzc2V0JyxcbiAgICAgICAgdXVpZDogJ2FiYy0xMjMnLFxuICAgICAgICBhc3NldFR5cGU6ICdjYXJ0J1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkQWN0aXZlQ29sbGVjdGlvbkFzc2V0JyxcbiAgICAgICAgcGFyYW1ldGVyczogWydhYmMtMTIzJ11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0Fzc2V0XSBMb2FkIEFjdGl2ZSBDb2xsZWN0aW9uIEFzc2V0JyxcbiAgICAgICAgdXVpZDogJ2FiYy0xMjMnLFxuICAgICAgICBhc3NldFR5cGU6ICdjb2xsZWN0aW9uJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkU2VhcmNoQXNzZXQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnbG9hZFBhcmFtcycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0Fzc2V0XSBMb2FkIFNlYXJjaCBBc3NldCcsXG4gICAgICAgIGxvYWRQYXJhbWV0ZXJzOiB7IHNvbWU6ICdsb2FkUGFyYW1zJyB9LFxuICAgICAgICBhc3NldFR5cGU6ICdzZWFyY2gnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3VwZGF0ZU1hcmtlcnNJblVybCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdtYXJrZXJzJyB9LCAxMjM0NTY3XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQXNzZXRdIFVwZGF0ZSBNYXJrZXJzIEluIFVSTCcsXG4gICAgICAgIG1hcmtlcnM6IHsgc29tZTogJ21hcmtlcnMnIH0sXG4gICAgICAgIGFzc2V0SWQ6IDEyMzQ1NjdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2xvYWRQYXJhbXMnIH0sICdjYXJ0JywgMTIzXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQXNzZXRdIExvYWQgQXNzZXQgQWZ0ZXIgUGFyZW50IElzIEF2YWlsYWJsZScsXG4gICAgICAgIGxvYWRQYXJhbWV0ZXJzOiB7IHNvbWU6ICdsb2FkUGFyYW1zJyB9LFxuICAgICAgICBhc3NldFR5cGU6ICdjYXJ0JyxcbiAgICAgICAgcGFyZW50SWQ6IDEyM1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Fzc2V0JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQXNzZXRdIExvYWQgU3VjY2VzcycsXG4gICAgICAgIGFjdGl2ZUFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQXNzZXRdIExvYWQgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
