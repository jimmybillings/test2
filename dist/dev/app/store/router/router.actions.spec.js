"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_actions_1 = require("./router.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Router Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToLogin',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Go To Login'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToLoginWithRedirect',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Go To Login With Redirect'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToPageNotFound',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Go To Page Not Found'
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'without markers',
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToSearchAssetDetails',
                parameters: [42]
            },
            expectedAction: {
                type: '[Router] Go To Search Asset Details',
                assetId: 42,
                markers: undefined
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'with markers',
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToSearchAssetDetails',
                parameters: [42, { some: 'markers' }]
            },
            expectedAction: {
                type: '[Router] Go To Search Asset Details',
                assetId: 42,
                markers: { some: 'markers' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'followRedirect',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Follow Redirect'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToQuotes',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Go To Quotes'
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'with default page and perPage',
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToCollection',
                parameters: [1]
            },
            expectedAction: {
                type: '[Router] Go To Collection',
                collectionId: 1,
                page: 1,
                perPage: 100
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'with custom page and perPage',
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToCollection',
                parameters: [1, 5, 55]
            },
            expectedAction: {
                type: '[Router] Go To Collection',
                collectionId: 1,
                page: 5,
                perPage: 55
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToActiveQuote',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Go To Active Quote'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToCart',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Go To Cart'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToQuoteById',
                parameters: [1]
            },
            expectedAction: {
                type: '[Router] Go To Quote By ID',
                quoteId: 1
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'addMarkersToUrl',
                parameters: [123, 100, 200]
            },
            expectedAction: {
                type: '[Router] Add Markers To Url',
                assetId: 123,
                timeStart: 100,
                timeEnd: 200
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToBadRequest',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Go To Bad Request'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: router_actions_1.ActionFactory,
                name: 'goToServerError',
                parameters: []
            },
            expectedAction: {
                type: '[Router] Go To Server Error'
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9yb3V0ZXIvcm91dGVyLmFjdGlvbnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF3RTtBQUN4RSwyRUFBd0U7QUFFeEU7SUFDRSxRQUFRLENBQUMsdUJBQXVCLEVBQUU7UUFDaEMsSUFBSSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBRW5FLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDhCQUFhO2dCQUNwQixJQUFJLEVBQUUsV0FBVztnQkFDakIsVUFBVSxFQUFFLEVBQUU7YUFDZjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsc0JBQXNCO2FBQzdCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsOEJBQWE7Z0JBQ3BCLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG9DQUFvQzthQUMzQztTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDhCQUFhO2dCQUNwQixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixVQUFVLEVBQUUsRUFBRTthQUNmO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSwrQkFBK0I7YUFDdEM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLDhCQUFhO2dCQUNwQixJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDakI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFF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QyxPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsOEJBQWE7Z0JBQ3BCLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO2FBQzVCO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSw2QkFBNkI7Z0JBQ25DLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFNBQVMsRUFBRSxHQUFHO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2I7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSw4QkFBYTtnQkFDcEIsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsVUFBVSxFQUFFLEVBQUU7YUFDZjtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsNEJBQTRCO2FBQ25DO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsOEJBQWE7Z0JBQ3BCLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLDZCQUE2QjthQUNwQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNMRCxvQkEyTEMiLCJmaWxlIjoiYXBwL3N0b3JlL3JvdXRlci9yb3V0ZXIuYWN0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9yb3V0ZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3Rpb25zU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9hY3Rpb25zLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdSb3V0ZXIgQWN0aW9uIEZhY3RvcnknLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdnb1RvTG9naW4nLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUm91dGVyXSBHbyBUbyBMb2dpbidcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZ29Ub0xvZ2luV2l0aFJlZGlyZWN0JyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1JvdXRlcl0gR28gVG8gTG9naW4gV2l0aCBSZWRpcmVjdCdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZ29Ub1BhZ2VOb3RGb3VuZCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tSb3V0ZXJdIEdvIFRvIFBhZ2UgTm90IEZvdW5kJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGNvbW1lbnQ6ICd3aXRob3V0IG1hcmtlcnMnLFxuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dvVG9TZWFyY2hBc3NldERldGFpbHMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbNDJdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tSb3V0ZXJdIEdvIFRvIFNlYXJjaCBBc3NldCBEZXRhaWxzJyxcbiAgICAgICAgYXNzZXRJZDogNDIsXG4gICAgICAgIG1hcmtlcnM6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIG1hcmtlcnMnLFxuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dvVG9TZWFyY2hBc3NldERldGFpbHMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbNDIsIHsgc29tZTogJ21hcmtlcnMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tSb3V0ZXJdIEdvIFRvIFNlYXJjaCBBc3NldCBEZXRhaWxzJyxcbiAgICAgICAgYXNzZXRJZDogNDIsXG4gICAgICAgIG1hcmtlcnM6IHsgc29tZTogJ21hcmtlcnMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZm9sbG93UmVkaXJlY3QnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUm91dGVyXSBGb2xsb3cgUmVkaXJlY3QnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dvVG9RdW90ZXMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUm91dGVyXSBHbyBUbyBRdW90ZXMnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgY29tbWVudDogJ3dpdGggZGVmYXVsdCBwYWdlIGFuZCBwZXJQYWdlJyxcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdnb1RvQ29sbGVjdGlvbicsXG4gICAgICAgIHBhcmFtZXRlcnM6IFsxXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUm91dGVyXSBHbyBUbyBDb2xsZWN0aW9uJyxcbiAgICAgICAgY29sbGVjdGlvbklkOiAxLFxuICAgICAgICBwYWdlOiAxLFxuICAgICAgICBwZXJQYWdlOiAxMDBcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBjb21tZW50OiAnd2l0aCBjdXN0b20gcGFnZSBhbmQgcGVyUGFnZScsXG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZ29Ub0NvbGxlY3Rpb24nLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbMSwgNSwgNTVdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tSb3V0ZXJdIEdvIFRvIENvbGxlY3Rpb24nLFxuICAgICAgICBjb2xsZWN0aW9uSWQ6IDEsXG4gICAgICAgIHBhZ2U6IDUsXG4gICAgICAgIHBlclBhZ2U6IDU1XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dvVG9BY3RpdmVRdW90ZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tSb3V0ZXJdIEdvIFRvIEFjdGl2ZSBRdW90ZSdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnZ29Ub0NhcnQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbUm91dGVyXSBHbyBUbyBDYXJ0J1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdnb1RvUXVvdGVCeUlkJyxcbiAgICAgICAgcGFyYW1ldGVyczogWzFdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tSb3V0ZXJdIEdvIFRvIFF1b3RlIEJ5IElEJyxcbiAgICAgICAgcXVvdGVJZDogMVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdhZGRNYXJrZXJzVG9VcmwnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbMTIzLCAxMDAsIDIwMF1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1JvdXRlcl0gQWRkIE1hcmtlcnMgVG8gVXJsJyxcbiAgICAgICAgYXNzZXRJZDogMTIzLFxuICAgICAgICB0aW1lU3RhcnQ6IDEwMCxcbiAgICAgICAgdGltZUVuZDogMjAwXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dvVG9CYWRSZXF1ZXN0JyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW1JvdXRlcl0gR28gVG8gQmFkIFJlcXVlc3QnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2dvVG9TZXJ2ZXJFcnJvcicsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tSb3V0ZXJdIEdvIFRvIFNlcnZlciBFcnJvcidcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
