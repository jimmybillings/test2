"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var active_collection_actions_1 = require("./active-collection.actions");
var actions_spec_helper_1 = require("../spec-helpers/actions.spec-helper");
function main() {
    describe('Active Collection Action Factory', function () {
        var actionsSpecHelper = new actions_spec_helper_1.ActionsSpecHelper();
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'load',
                parameters: [{ currentPage: 42, pageSize: 50 }]
            },
            expectedAction: {
                type: '[Active Collection] Load',
                pagination: { currentPage: 42, pageSize: 50 }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'loadIfNeeded',
                parameters: [{ currentPage: 42, pageSize: 50 }]
            },
            expectedAction: {
                type: '[Active Collection] Load If Needed',
                pagination: { currentPage: 42, pageSize: 50 }
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'with default parameters',
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'load',
                parameters: []
            },
            expectedAction: {
                type: '[Active Collection] Load',
                pagination: { currentPage: 1, pageSize: 100 }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'set',
                parameters: [99, { currentPage: 42, pageSize: 50 }]
            },
            expectedAction: {
                type: '[Active Collection] Set',
                collectionId: 99,
                pagination: { currentPage: 42, pageSize: 50 }
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'with default parameters',
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'set',
                parameters: [99]
            },
            expectedAction: {
                type: '[Active Collection] Set',
                collectionId: 99,
                pagination: { currentPage: 1, pageSize: 100 }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'loadPage',
                parameters: [{ currentPage: 42, pageSize: 50 }]
            },
            expectedAction: {
                type: '[Active Collection] Load Page',
                pagination: { currentPage: 42, pageSize: 50 }
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'with default parameters',
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'loadPage',
                parameters: []
            },
            expectedAction: {
                type: '[Active Collection] Load Page',
                pagination: { currentPage: 1, pageSize: 100 }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'addAsset',
                parameters: [{ some: 'asset' }, { some: 'markers' }]
            },
            expectedAction: {
                type: '[Active Collection] Add Asset',
                asset: { some: 'asset' },
                markers: { some: 'markers' }
            }
        });
        actionsSpecHelper.generateTestFor({
            comment: 'no markers',
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'addAsset',
                parameters: [{ some: 'asset' }]
            },
            expectedAction: {
                type: '[Active Collection] Add Asset',
                asset: { some: 'asset' },
                markers: undefined
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'removeAsset',
                parameters: [{ some: 'asset' }]
            },
            expectedAction: {
                type: '[Active Collection] Remove Asset',
                asset: { some: 'asset' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'updateAssetMarkers',
                parameters: [{ some: 'asset' }, { some: 'markers' }]
            },
            expectedAction: {
                type: '[Active Collection] Update Asset Markers',
                asset: { some: 'asset' },
                markers: { some: 'markers' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'reset',
                parameters: []
            },
            expectedAction: {
                type: '[Active Collection] Reset'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'loadSuccess',
                parameters: [{ some: 'collection' }]
            },
            expectedAction: {
                type: '[Active Collection] Load Success',
                activeCollection: { some: 'collection' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'loadFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Active Collection] Load Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'setSuccess',
                parameters: [{ some: 'collection' }]
            },
            expectedAction: {
                type: '[Active Collection] Set Success',
                activeCollection: { some: 'collection' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'setFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Active Collection] Set Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'loadPageSuccess',
                parameters: [{ some: 'assets' }]
            },
            expectedAction: {
                type: '[Active Collection] Load Page Success',
                currentPageItems: { some: 'assets' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'loadPageFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Active Collection] Load Page Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'addAssetSuccess',
                parameters: [{ some: 'assets' }]
            },
            expectedAction: {
                type: '[Active Collection] Add Asset Success',
                currentPageItems: { some: 'assets' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'addAssetFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Active Collection] Add Asset Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'removeAssetSuccess',
                parameters: [{ some: 'assets' }]
            },
            expectedAction: {
                type: '[Active Collection] Remove Asset Success',
                currentPageItems: { some: 'assets' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'removeAssetFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Active Collection] Remove Asset Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'updateAssetMarkersSuccess',
                parameters: [{ some: 'assets' }]
            },
            expectedAction: {
                type: '[Active Collection] Update Asset Markers Success',
                currentPageItems: { some: 'assets' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'updateAssetMarkersFailure',
                parameters: [{ some: 'error' }]
            },
            expectedAction: {
                type: '[Active Collection] Update Asset Markers Failure',
                error: { some: 'error' }
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.ActionFactory,
                name: 'addPageOfSearchAssets',
                parameters: []
            },
            expectedAction: {
                type: '[Active Collection] Add Page Of Search Assets'
            }
        });
        actionsSpecHelper.generateTestFor({
            factoryMethod: {
                class: active_collection_actions_1.InternalActionFactory,
                name: 'addPageOfSearchAssetsSuccess',
                parameters: [{ some: 'items' }]
            },
            expectedAction: {
                type: '[Active Collection] Add Page Of Search Assets Success',
                currentPageItems: { some: 'items' }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5RUFBbUY7QUFDbkYsMkVBQXdFO0FBRXhFO0lBQ0UsUUFBUSxDQUFDLGtDQUFrQyxFQUFFO1FBQzNDLElBQUksaUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUVuRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSx5Q0FBYTtnQkFDcEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osVUFBVSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQzthQUNoRDtZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsMEJBQTBCO2dCQUNoQyxVQUFVLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7YUFDOUM7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFDaEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSx5Q0FBYTtnQkFDcEIsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFVBQVUsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDaEQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLG9DQUFvQztnQkFDMUMsVUFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO2FBQzlDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSx5Q0FBYTtnQkFDcEIsSUFBSSxFQUFFLE1BQU07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QUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsaURBQXFCO2dCQUM1QixJQUFJLEVBQUUsMkJBQTJCO2dCQUNqQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNoQztZQUNELGNBQWMsRUFBRTtnQkFDZCxJQUFJLEVBQUUsa0RBQWtEO2dCQUN4RCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQ2hDLGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUseUNBQWE7Z0JBQ3BCLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLCtDQUErQzthQUN0RDtTQUNGLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLGVBQWUsQ0FBQztZQUNoQyxhQUFhLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGlEQUFxQjtnQkFDNUIsSUFBSSxFQUFFLDhCQUE4QjtnQkFDcEMsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDaEM7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLHVEQUF1RDtnQkFDN0QsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ3BDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBblVELG9CQW1VQyIsImZpbGUiOiJhcHAvc3RvcmUvYWN0aXZlLWNvbGxlY3Rpb24vYWN0aXZlLWNvbGxlY3Rpb24uYWN0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBBY3Rpb25GYWN0b3J5LCBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgfSBmcm9tICcuL2FjdGl2ZS1jb2xsZWN0aW9uLmFjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aW9uc1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvYWN0aW9ucy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQWN0aXZlIENvbGxlY3Rpb24gQWN0aW9uIEZhY3RvcnknLCAoKSA9PiB7XG4gICAgbGV0IGFjdGlvbnNTcGVjSGVscGVyOiBBY3Rpb25zU3BlY0hlbHBlciA9IG5ldyBBY3Rpb25zU3BlY0hlbHBlcigpO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdsb2FkJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgY3VycmVudFBhZ2U6IDQyLCBwYWdlU2l6ZTogNTAgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBMb2FkJyxcbiAgICAgICAgcGFnaW5hdGlvbjogeyBjdXJyZW50UGFnZTogNDIsIHBhZ2VTaXplOiA1MCB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRJZk5lZWRlZCcsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IGN1cnJlbnRQYWdlOiA0MiwgcGFnZVNpemU6IDUwIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gTG9hZCBJZiBOZWVkZWQnLFxuICAgICAgICBwYWdpbmF0aW9uOiB7IGN1cnJlbnRQYWdlOiA0MiwgcGFnZVNpemU6IDUwIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBjb21tZW50OiAnd2l0aCBkZWZhdWx0IHBhcmFtZXRlcnMnLFxuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIExvYWQnLFxuICAgICAgICBwYWdpbmF0aW9uOiB7IGN1cnJlbnRQYWdlOiAxLCBwYWdlU2l6ZTogMTAwIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnc2V0JyxcbiAgICAgICAgcGFyYW1ldGVyczogWzk5LCB7IGN1cnJlbnRQYWdlOiA0MiwgcGFnZVNpemU6IDUwIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gU2V0JyxcbiAgICAgICAgY29sbGVjdGlvbklkOiA5OSxcbiAgICAgICAgcGFnaW5hdGlvbjogeyBjdXJyZW50UGFnZTogNDIsIHBhZ2VTaXplOiA1MCB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgY29tbWVudDogJ3dpdGggZGVmYXVsdCBwYXJhbWV0ZXJzJyxcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdzZXQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbOTldXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gU2V0JyxcbiAgICAgICAgY29sbGVjdGlvbklkOiA5OSxcbiAgICAgICAgcGFnaW5hdGlvbjogeyBjdXJyZW50UGFnZTogMSwgcGFnZVNpemU6IDEwMCB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRQYWdlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgY3VycmVudFBhZ2U6IDQyLCBwYWdlU2l6ZTogNTAgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBMb2FkIFBhZ2UnLFxuICAgICAgICBwYWdpbmF0aW9uOiB7IGN1cnJlbnRQYWdlOiA0MiwgcGFnZVNpemU6IDUwIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBjb21tZW50OiAnd2l0aCBkZWZhdWx0IHBhcmFtZXRlcnMnLFxuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRQYWdlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW11cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBMb2FkIFBhZ2UnLFxuICAgICAgICBwYWdpbmF0aW9uOiB7IGN1cnJlbnRQYWdlOiAxLCBwYWdlU2l6ZTogMTAwIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnYWRkQXNzZXQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnYXNzZXQnIH0sIHsgc29tZTogJ21hcmtlcnMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gQWRkIEFzc2V0JyxcbiAgICAgICAgYXNzZXQ6IHsgc29tZTogJ2Fzc2V0JyB9LFxuICAgICAgICBtYXJrZXJzOiB7IHNvbWU6ICdtYXJrZXJzJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgY29tbWVudDogJ25vIG1hcmtlcnMnLFxuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2FkZEFzc2V0JyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Fzc2V0JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIEFkZCBBc3NldCcsXG4gICAgICAgIGFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfSxcbiAgICAgICAgbWFya2VyczogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3JlbW92ZUFzc2V0JyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Fzc2V0JyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIFJlbW92ZSBBc3NldCcsXG4gICAgICAgIGFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICd1cGRhdGVBc3NldE1hcmtlcnMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnYXNzZXQnIH0sIHsgc29tZTogJ21hcmtlcnMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gVXBkYXRlIEFzc2V0IE1hcmtlcnMnLFxuICAgICAgICBhc3NldDogeyBzb21lOiAnYXNzZXQnIH0sXG4gICAgICAgIG1hcmtlcnM6IHsgc29tZTogJ21hcmtlcnMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAncmVzZXQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIFJlc2V0J1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2NvbGxlY3Rpb24nIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gTG9hZCBTdWNjZXNzJyxcbiAgICAgICAgYWN0aXZlQ29sbGVjdGlvbjogeyBzb21lOiAnY29sbGVjdGlvbicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIExvYWQgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3NldFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnY29sbGVjdGlvbicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBTZXQgU3VjY2VzcycsXG4gICAgICAgIGFjdGl2ZUNvbGxlY3Rpb246IHsgc29tZTogJ2NvbGxlY3Rpb24nIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdzZXRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIFNldCBGYWlsdXJlJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnbG9hZFBhZ2VTdWNjZXNzJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Fzc2V0cycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBMb2FkIFBhZ2UgU3VjY2VzcycsXG4gICAgICAgIGN1cnJlbnRQYWdlSXRlbXM6IHsgc29tZTogJ2Fzc2V0cycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2xvYWRQYWdlRmFpbHVyZScsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdlcnJvcicgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBMb2FkIFBhZ2UgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ2FkZEFzc2V0U3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdhc3NldHMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gQWRkIEFzc2V0IFN1Y2Nlc3MnLFxuICAgICAgICBjdXJyZW50UGFnZUl0ZW1zOiB7IHNvbWU6ICdhc3NldHMnIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdhZGRBc3NldEZhaWx1cmUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnZXJyb3InIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gQWRkIEFzc2V0IEZhaWx1cmUnLFxuICAgICAgICBlcnJvcjogeyBzb21lOiAnZXJyb3InIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFjdGlvbnNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdEZvcih7XG4gICAgICBmYWN0b3J5TWV0aG9kOiB7XG4gICAgICAgIGNsYXNzOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdyZW1vdmVBc3NldFN1Y2Nlc3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnYXNzZXRzJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIFJlbW92ZSBBc3NldCBTdWNjZXNzJyxcbiAgICAgICAgY3VycmVudFBhZ2VJdGVtczogeyBzb21lOiAnYXNzZXRzJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAncmVtb3ZlQXNzZXRGYWlsdXJlJyxcbiAgICAgICAgcGFyYW1ldGVyczogW3sgc29tZTogJ2Vycm9yJyB9XVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIFJlbW92ZSBBc3NldCBGYWlsdXJlJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ2Vycm9yJyB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAndXBkYXRlQXNzZXRNYXJrZXJzU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdhc3NldHMnIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gVXBkYXRlIEFzc2V0IE1hcmtlcnMgU3VjY2VzcycsXG4gICAgICAgIGN1cnJlbnRQYWdlSXRlbXM6IHsgc29tZTogJ2Fzc2V0cycgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEludGVybmFsQWN0aW9uRmFjdG9yeSxcbiAgICAgICAgbmFtZTogJ3VwZGF0ZUFzc2V0TWFya2Vyc0ZhaWx1cmUnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbeyBzb21lOiAnZXJyb3InIH1dXG4gICAgICB9LFxuICAgICAgZXhwZWN0ZWRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ1tBY3RpdmUgQ29sbGVjdGlvbl0gVXBkYXRlIEFzc2V0IE1hcmtlcnMgRmFpbHVyZScsXG4gICAgICAgIGVycm9yOiB7IHNvbWU6ICdlcnJvcicgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWN0aW9uc1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0Rm9yKHtcbiAgICAgIGZhY3RvcnlNZXRob2Q6IHtcbiAgICAgICAgY2xhc3M6IEFjdGlvbkZhY3RvcnksXG4gICAgICAgIG5hbWU6ICdhZGRQYWdlT2ZTZWFyY2hBc3NldHMnLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgfSxcbiAgICAgIGV4cGVjdGVkQWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdbQWN0aXZlIENvbGxlY3Rpb25dIEFkZCBQYWdlIE9mIFNlYXJjaCBBc3NldHMnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhY3Rpb25zU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RGb3Ioe1xuICAgICAgZmFjdG9yeU1ldGhvZDoge1xuICAgICAgICBjbGFzczogSW50ZXJuYWxBY3Rpb25GYWN0b3J5LFxuICAgICAgICBuYW1lOiAnYWRkUGFnZU9mU2VhcmNoQXNzZXRzU3VjY2VzcycsXG4gICAgICAgIHBhcmFtZXRlcnM6IFt7IHNvbWU6ICdpdGVtcycgfV1cbiAgICAgIH0sXG4gICAgICBleHBlY3RlZEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBBZGQgUGFnZSBPZiBTZWFyY2ggQXNzZXRzIFN1Y2Nlc3MnLFxuICAgICAgICBjdXJyZW50UGFnZUl0ZW1zOiB7IHNvbWU6ICdpdGVtcycgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
