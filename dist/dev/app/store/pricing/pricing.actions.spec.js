"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pricing_actions_1 = require("./pricing.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Pricing Actions', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.ActionFactory,
                name: 'resetPricing',
                parameters: []
            },
            expectedAction: {
                type: '[Pricing] Reset Pricing'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.ActionFactory,
                name: 'setPriceForDetails',
                parameters: [100]
            },
            expectedAction: {
                type: '[Pricing] Set Price For Details',
                price: 100
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.ActionFactory,
                name: 'setPriceForDialog',
                parameters: [100]
            },
            expectedAction: {
                type: '[Pricing] Set Price For Dialog',
                price: 100
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.ActionFactory,
                name: 'setAppliedAttributes',
                parameters: [{ some: 'attributes' }]
            },
            expectedAction: {
                type: '[Pricing] Set Applied Attributes',
                appliedAttributes: { some: 'attributes' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.ActionFactory,
                name: 'initializePricing',
                parameters: ['Rights Managed', { some: 'options' }]
            },
            expectedAction: {
                type: '[Pricing] Initialize Pricing',
                rightsReproduction: 'Rights Managed',
                dialogOptions: { some: 'options' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.ActionFactory,
                name: 'calculatePrice',
                parameters: [{ some: 'attributes' }, 12345, { some: 'markers' }]
            },
            expectedAction: {
                type: '[Pricing] Calculate Price',
                selectedAttributes: { some: 'attributes' },
                assetId: 12345,
                subclipMarkers: { some: 'markers' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.InternalActionFactory,
                name: 'getAttributes',
                parameters: ['Rights Managed', { some: 'options' }]
            },
            expectedAction: {
                type: '[Pricing] Get Attributes',
                rightsReproduction: 'Rights Managed',
                dialogOptions: { some: 'options' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.InternalActionFactory,
                name: 'openDialog',
                parameters: [{ some: 'options' }]
            },
            expectedAction: {
                type: '[Pricing] Open Dialog',
                dialogOptions: { some: 'options' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.InternalActionFactory,
                name: 'getAttributesSuccess',
                parameters: [{ some: 'attributes' }, 'Rights Managed', { some: 'options' }]
            },
            expectedAction: {
                type: '[Pricing] Get Attributes Success',
                dialogOptions: { some: 'options' },
                attributes: { some: 'attributes' },
                rightsReproduction: 'Rights Managed'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.InternalActionFactory,
                name: 'getAttributesFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Pricing] Get Attributes Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.InternalActionFactory,
                name: 'calculatePriceSuccess',
                parameters: [100]
            },
            expectedAction: {
                type: '[Pricing] Calculate Price Success',
                price: 100
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: pricing_actions_1.InternalActionFactory,
                name: 'calculatePriceFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Pricing] Calculate Price Failure',
                error: { some: 'error' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuYWN0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXlFO0FBQ3pFLDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFbkUsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsK0JBQWE7Z0JBQ3BCLElBQUksRUFBRSxjQUFjO2dCQUNwQixVQUFVLEVBQUUsRUFBRTthQUNmO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSx5QkFBeUI7YUFDaEM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwrQkFBYTtnQkFDcEIsSUFBSSxFQUFFLG9CQUFvQjtnQkFDMUIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2FBQ2xCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxpQ0FBaUM7Z0JBQ3ZDLEtBQUssRUFBRSxHQUFHO2FBQ1g7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwrQkFBYTtnQkFDcEIsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2FBQ2xCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxnQ0FBZ0M7Z0JBQ3RDLEtBQUssRUFBRSxHQUFHO2FBQ1g7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSwrQkFBYTtnQkFDcEIsSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsVUFBVSxFQUFFLENBQUMsRUFB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QUUsQ0FBQzthQUNoQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsa0NBQWtDO2dCQUN4QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsdUNBQXFCO2dCQUM1QixJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7YUFDbEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG1DQUFtQztnQkFDekMsS0FBSyxFQUFFLEdBQUc7YUFDWDtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLHVDQUFxQjtnQkFDNUIsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG1DQUFtQztnQkFDekMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUN6QjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXpKRCxvQkF5SkMiLCJmaWxlIjoiYXBwL3N0b3JlL3ByaWNpbmcvcHJpY2luZy5hY3Rpb25zLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25GYWN0b3J5LCBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgfSBmcm9tICcuL3ByaWNpbmcuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdQcmljaW5nIEFjdGlvbnMnLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdyZXNldFByaWNpbmcnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUHJpY2luZ10gUmVzZXQgUHJpY2luZydcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2V0UHJpY2VGb3JEZXRhaWxzJyxcbiAgICAgICAgcGFyYW1ldGVyczogWzEwMF1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1ByaWNpbmddIFNldCBQcmljZSBGb3IgRGV0YWlscycsXG4gICAgICAgIHByaWNlOiAxMDBcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2V0UHJpY2VGb3JEaWFsb2cnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbMTAwXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUHJpY2luZ10gU2V0IFByaWNlIEZvciBEaWFsb2cnLFxuICAgICAgICBwcmljZTogMTAwXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3NldEFwcGxpZWRBdHRyaWJ1dGVzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2F0dHJpYnV0ZXMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tQcmljaW5nXSBTZXQgQXBwbGllZCBBdHRyaWJ1dGVzJyxcbiAgICAgICAgYXBwbGllZEF0dHJpYnV0ZXM6IHsgc29tZTogJ2F0dHJpYnV0ZXMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnaW5pdGlhbGl6ZVByaWNpbmcnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbJ1JpZ2h0cyBNYW5hZ2VkJywgeyBzb21lOiAnb3B0aW9ucycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1ByaWNpbmddIEluaXRpYWxpemUgUHJpY2luZycsXG4gICAgICAgIHJpZ2h0c1JlcHJvZHVjdGlvbjogJ1JpZ2h0cyBNYW5hZ2VkJyxcbiAgICAgICAgZGlhbG9nT3B0aW9uczogeyBzb21lOiAnb3B0aW9ucycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdjYWxjdWxhdGVQcmljZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9LCAxMjM0NSwgeyBzb21lOiAnbWFya2VycycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1ByaWNpbmddIENhbGN1bGF0ZSBQcmljZScsXG4gICAgICAgIHNlbGVjdGVkQXR0cmlidXRlczogeyBzb21lOiAnYXR0cmlidXRlcycgfSxcbiAgICAgICAgYXNzZXRJZDogMTIzNDUsXG4gICAgICAgIHN1YmNsaXBNYXJrZXJzOiB7IHNvbWU6ICdtYXJrZXJzJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZ2V0QXR0cmlidXRlcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsnUmlnaHRzIE1hbmFnZWQnLCB7IHNvbWU6ICdvcHRpb25zJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUHJpY2luZ10gR2V0IEF0dHJpYnV0ZXMnLFxuICAgICAgICByaWdodHNSZXByb2R1Y3Rpb246ICdSaWdodHMgTWFuYWdlZCcsXG4gICAgICAgIGRpYWxvZ09wdGlvbnM6IHsgc29tZTogJ29wdGlvbnMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdvcGVuRGlhbG9nJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ29wdGlvbnMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tQcmljaW5nXSBPcGVuIERpYWxvZycsXG4gICAgICAgIGRpYWxvZ09wdGlvbnM6IHsgc29tZTogJ29wdGlvbnMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdnZXRBdHRyaWJ1dGVzU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9LCAnUmlnaHRzIE1hbmFnZWQnLCB7IHNvbWU6ICdvcHRpb25zJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUHJpY2luZ10gR2V0IEF0dHJpYnV0ZXMgU3VjY2VzcycsXG4gICAgICAgIGRpYWxvZ09wdGlvbnM6IHsgc29tZTogJ29wdGlvbnMnIH0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IHsgc29tZTogJ2F0dHJpYnV0ZXMnIH0sXG4gICAgICAgIHJpZ2h0c1JlcHJvZHVjdGlvbjogJ1JpZ2h0cyBNYW5hZ2VkJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dldEF0dHJpYnV0ZXNGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUHJpY2luZ10gR2V0IEF0dHJpYnV0ZXMgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2NhbGN1bGF0ZVByaWNlU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsxMDBdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tQcmljaW5nXSBDYWxjdWxhdGUgUHJpY2UgU3VjY2VzcycsXG4gICAgICAgIHByaWNlOiAxMDBcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdjYWxjdWxhdGVQcmljZUZhaWx1cmUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnZXJyb3InIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tQcmljaW5nXSBDYWxjdWxhdGUgUHJpY2UgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
