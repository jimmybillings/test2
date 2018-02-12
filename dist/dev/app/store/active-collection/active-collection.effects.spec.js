"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var active_collection_effects_1 = require("./active-collection.effects");
var ActiveCollectionActions = require("./active-collection.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Active Collection Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        var mockUserPreferenceService;
        function instantiator() {
            return new active_collection_effects_1.ActiveCollectionEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockUserPreferenceService);
        }
        beforeEach(function () {
            mockUserPreferenceService = { openCollectionTray: jasmine.createSpy('openCollectionTray') };
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'load',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.Load.Type,
                pagination: { some: 'pagination' }
            },
            serviceMethod: {
                name: 'load',
                expectedArguments: [{ some: 'pagination' }],
                returnsObservableOf: { some: 'collection' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'loadSuccess',
                    expectedArguments: [{ some: 'collection' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadIfNeeded',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.LoadIfNeeded.Type,
                pagination: { some: 'pagination' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { id: null }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'load',
                    expectedArguments: [{ some: 'pagination' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadIfNeeded',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.LoadIfNeeded.Type,
                pagination: { some: 'pagination' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { id: 123 }
            },
            expectToEmitAction: false
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'set',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.Set.Type,
                collectionId: 42,
                pagination: { some: 'pagination' }
            },
            serviceMethod: {
                name: 'set',
                expectedArguments: [42, { some: 'pagination' }],
                returnsObservableOf: { some: 'collection' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'setSuccess',
                    expectedArguments: [{ some: 'collection' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'loadPage',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.LoadPage.Type,
                pagination: { some: 'pagination' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { id: 123 }
            },
            serviceMethod: {
                name: 'loadPage',
                expectedArguments: [123, { some: 'pagination' }],
                returnsObservableOf: { some: 'collection' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'loadPageSuccess',
                    expectedArguments: [{ some: 'collection' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'openTrayOnAddOrRemove',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.AddAsset.Type
            },
            customTests: [{
                    it: 'works for AddAsset action',
                    expectation: function () {
                        expect(mockUserPreferenceService.openCollectionTray).toHaveBeenCalled();
                    }
                }]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'openTrayOnAddOrRemove',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.RemoveAsset.Type
            },
            customTests: [{
                    it: 'works for RemoveAsset action',
                    expectation: function () {
                        expect(mockUserPreferenceService.openCollectionTray).toHaveBeenCalled();
                    }
                }]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addAsset',
            comment: 'with a new asset',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.AddAsset.Type,
                asset: { some: 'asset' },
                markers: { some: 'markers' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { some: 'collection' }
            },
            serviceMethod: {
                name: 'addAssetTo',
                expectedArguments: [{ some: 'collection' }, { some: 'asset' }, { some: 'markers' }],
                returnsObservableOf: { items: ['something'] }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'addAssetSuccess',
                    expectedArguments: [{ items: ['something'] }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addAsset',
            comment: 'with an asset already in the collection',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.AddAsset.Type,
                asset: { some: 'asset' },
                markers: { some: 'markers' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { name: 'some-collection' }
            },
            serviceMethod: {
                name: 'addAssetTo',
                expectedArguments: [{ name: 'some-collection' }, { some: 'asset' }, { some: 'markers' }],
                returnsObservableOf: { items: [] }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['COLLECTION.ALREADY_IN_COLLECTION_TOAST', { collectionName: 'some-collection' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackBarOnAddSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.AddAssetSuccess.Type,
                currentPage: { some: 'assets' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { name: 'someCollectionName' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['COLLECTION.ADD_TO_COLLECTION_TOAST', { collectionName: 'someCollectionName' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'removeAsset',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.RemoveAsset.Type,
                asset: { some: 'asset' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { some: 'collection' }
            },
            serviceMethod: {
                name: 'removeAssetFrom',
                expectedArguments: [{ some: 'collection' }, { some: 'asset' }],
                returnsObservableOf: { some: 'assets' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'removeAssetSuccess',
                    expectedArguments: [{ some: 'assets' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackBarOnRemoveSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.RemoveAssetSuccess.Type,
                currentPageItems: { some: 'assets' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { name: 'someCollectionName' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['COLLECTION.REMOVE_ASSET.SUCCESS', { collectionName: 'someCollectionName' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'changeRouteOnRemoveAssetSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.RemoveAssetSuccess.Type,
                currentPageItems: { some: 'assets' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { id: 123 }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'router',
                    methodName: 'goToCollection',
                    expectedArguments: [123]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'updateAssetMarkers',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.UpdateAssetMarkers.Type,
                asset: { some: 'asset' },
                markers: { some: 'markers' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { some: 'collection' }
            },
            serviceMethod: {
                name: 'updateAssetMarkers',
                expectedArguments: [{ some: 'collection' }, { some: 'asset' }, { some: 'markers' }],
                returnsObservableOf: { some: 'assets' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'updateAssetMarkersSuccess',
                    expectedArguments: [{ some: 'assets' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showSnackbarOnUpdateAssetMarkersSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.UpdateAssetMarkersSuccess.Type,
                currentPageItems: { some: 'assets' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { name: 'someCollectionName' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['COLLECTION.UPDATE_IN_COLLECTION_TOAST', { collectionName: 'someCollectionName' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addPageOfSearchAssets',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.AddPageOfSearchAssets.Type
            },
            state: [
                {
                    storeSectionName: 'search',
                    propertyName: 'results',
                    value: { items: [{ some: 'items' }] }
                },
                {
                    storeSectionName: 'activeCollection',
                    propertyName: 'collection',
                    value: { assets: { pagination: { some: 'pagination' } } }
                }
            ],
            serviceMethod: {
                name: 'addAssetsToFocusedCollection',
                expectedArguments: [[{ some: 'items' }], { some: 'pagination' }],
                returnsObservableOf: [{ some: 'new items' }]
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'addPageOfSearchAssetsSuccess',
                    expectedArguments: [[{ some: 'new items' }]]
                },
                failure: {
                    sectionName: 'error',
                    methodName: 'handle'
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showToastOnAddPageSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ActiveCollectionActions.AddPageOfSearchAssetsSuccess.Type,
                currentPageItems: { totalAssetsAdded: 5, some: 'assets' }
            },
            state: {
                storeSectionName: 'activeCollection',
                propertyName: 'collection',
                value: { name: 'someCollectionName' }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: [
                        'COLLECTION.ADD_ASSETS_SUCCESS_TOAST',
                        { collectionName: 'someCollectionName', totalAssetsAdded: 5 }
                    ]
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5RUFBc0U7QUFDdEUscUVBQXVFO0FBQ3ZFLDJFQUErRztBQUUvRztJQUNFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtRQUNwQyxJQUFNLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFDckUsSUFBSSx5QkFBOEIsQ0FBQztRQUVuQztZQUNFLE1BQU0sQ0FBQyxJQUFJLG1EQUF1QixDQUNoQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxFQUNwRyx5QkFBeUIsQ0FDMUIsQ0FBQztRQUNKLENBQUM7UUFFRCxVQUFVLENBQUM7WUFDVCx5QkFBeUIsR0FBRyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDO1FBQzlGLENBQUMsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLE1BQU07WUFDbEIsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUN2QyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO2FBQ25DO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7Z0JBQzNDLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTthQUM1QztZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLGtCQUFrQjtvQkFDL0IsVUFBVSxFQUFFLGFBQWE7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QUNqQyxVQUFVLEVBQUUsMkJBQTJCO1lBQ3ZDLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSx1QkFBdUIsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJO2dCQUMvRCxnQkFBZ0IsRUFBRSxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2FBQzFEO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLGdCQUFnQixFQUFFLGtCQUFrQjtnQkFDcEMsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRTthQUN0QztZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFVBQVU7b0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO29CQUNyQixpQkFBaUIsRUFBRTt3QkFDakIscUNBQXFDO3dCQUNyQyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUU7cUJBQzlEO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuWkQsb0JBbVpDIiwiZmlsZSI6ImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmVDb2xsZWN0aW9uRWZmZWN0cyB9IGZyb20gJy4vYWN0aXZlLWNvbGxlY3Rpb24uZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucyBmcm9tICcuL2FjdGl2ZS1jb2xsZWN0aW9uLmFjdGlvbnMnO1xuaW1wb3J0IHsgRWZmZWN0c1NwZWNIZWxwZXIsIEVmZmVjdFRlc3RQYXJhbWV0ZXJzLCBFZmZlY3RUZXN0U3RhdGUgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQWN0aXZlIENvbGxlY3Rpb24gRWZmZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBlZmZlY3RzU3BlY0hlbHBlcjogRWZmZWN0c1NwZWNIZWxwZXIgPSBuZXcgRWZmZWN0c1NwZWNIZWxwZXIoKTtcbiAgICBsZXQgbW9ja1VzZXJQcmVmZXJlbmNlU2VydmljZTogYW55O1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IEFjdGl2ZUNvbGxlY3Rpb25FZmZlY3RzIHtcbiAgICAgIHJldHVybiBuZXcgQWN0aXZlQ29sbGVjdGlvbkVmZmVjdHMoXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTdG9yZSwgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2UsXG4gICAgICAgIG1vY2tVc2VyUHJlZmVyZW5jZVNlcnZpY2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrVXNlclByZWZlcmVuY2VTZXJ2aWNlID0geyBvcGVuQ29sbGVjdGlvblRyYXk6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuQ29sbGVjdGlvblRyYXknKSB9O1xuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkLlR5cGUsXG4gICAgICAgIHBhZ2luYXRpb246IHsgc29tZTogJ3BhZ2luYXRpb24nIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdsb2FkJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdwYWdpbmF0aW9uJyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAnY29sbGVjdGlvbicgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZFN1Y2Nlc3MnLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAnY29sbGVjdGlvbicgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnbG9hZElmTmVlZGVkJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkxvYWRJZk5lZWRlZC5UeXBlLFxuICAgICAgICBwYWdpbmF0aW9uOiB7IHNvbWU6ICdwYWdpbmF0aW9uJyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICBwcm9wZXJ0eU5hbWU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IHsgaWQ6IG51bGwgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnbG9hZCcsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdwYWdpbmF0aW9uJyB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkSWZOZWVkZWQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuTG9hZElmTmVlZGVkLlR5cGUsXG4gICAgICAgIHBhZ2luYXRpb246IHsgc29tZTogJ3BhZ2luYXRpb24nIH1cbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYWN0aXZlQ29sbGVjdGlvbicsXG4gICAgICAgIHByb3BlcnR5TmFtZTogJ2NvbGxlY3Rpb24nLFxuICAgICAgICB2YWx1ZTogeyBpZDogMTIzIH1cbiAgICAgIH0sXG4gICAgICBleHBlY3RUb0VtaXRBY3Rpb246IGZhbHNlXG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdzZXQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuU2V0LlR5cGUsXG4gICAgICAgIGNvbGxlY3Rpb25JZDogNDIsXG4gICAgICAgIHBhZ2luYXRpb246IHsgc29tZTogJ3BhZ2luYXRpb24nIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdzZXQnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzQyLCB7IHNvbWU6ICdwYWdpbmF0aW9uJyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAnY29sbGVjdGlvbicgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnc2V0U3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdjb2xsZWN0aW9uJyB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdsb2FkUGFnZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkUGFnZS5UeXBlLFxuICAgICAgICBwYWdpbmF0aW9uOiB7IHNvbWU6ICdwYWdpbmF0aW9uJyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICBwcm9wZXJ0eU5hbWU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IHsgaWQ6IDEyMyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnbG9hZFBhZ2UnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWzEyMywgeyBzb21lOiAncGFnaW5hdGlvbicgfV0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ2NvbGxlY3Rpb24nIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYWN0aXZlQ29sbGVjdGlvbicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2xvYWRQYWdlU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdjb2xsZWN0aW9uJyB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdvcGVuVHJheU9uQWRkT3JSZW1vdmUnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkQXNzZXQuVHlwZVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbe1xuICAgICAgICBpdDogJ3dvcmtzIGZvciBBZGRBc3NldCBhY3Rpb24nLFxuICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChtb2NrVXNlclByZWZlcmVuY2VTZXJ2aWNlLm9wZW5Db2xsZWN0aW9uVHJheSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9XG4gICAgICB9XVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnb3BlblRyYXlPbkFkZE9yUmVtb3ZlJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlJlbW92ZUFzc2V0LlR5cGVcbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW3tcbiAgICAgICAgaXQ6ICd3b3JrcyBmb3IgUmVtb3ZlQXNzZXQgYWN0aW9uJyxcbiAgICAgICAgZXhwZWN0YXRpb246ICgpID0+IHtcbiAgICAgICAgICBleHBlY3QobW9ja1VzZXJQcmVmZXJlbmNlU2VydmljZS5vcGVuQ29sbGVjdGlvblRyYXkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfVxuICAgICAgfV1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2FkZEFzc2V0JyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIGEgbmV3IGFzc2V0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkFkZEFzc2V0LlR5cGUsXG4gICAgICAgIGFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfSxcbiAgICAgICAgbWFya2VyczogeyBzb21lOiAnbWFya2VycycgfVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgcHJvcGVydHlOYW1lOiAnY29sbGVjdGlvbicsXG4gICAgICAgIHZhbHVlOiB7IHNvbWU6ICdjb2xsZWN0aW9uJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnYWRkQXNzZXRUbycsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbeyBzb21lOiAnY29sbGVjdGlvbicgfSwgeyBzb21lOiAnYXNzZXQnIH0sIHsgc29tZTogJ21hcmtlcnMnIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IGl0ZW1zOiBbJ3NvbWV0aGluZyddIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnYWN0aXZlQ29sbGVjdGlvbicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2FkZEFzc2V0U3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IGl0ZW1zOiBbJ3NvbWV0aGluZyddIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2FkZEFzc2V0JyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIGFuIGFzc2V0IGFscmVhZHkgaW4gdGhlIGNvbGxlY3Rpb24nLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkQXNzZXQuVHlwZSxcbiAgICAgICAgYXNzZXQ6IHsgc29tZTogJ2Fzc2V0JyB9LFxuICAgICAgICBtYXJrZXJzOiB7IHNvbWU6ICdtYXJrZXJzJyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICBwcm9wZXJ0eU5hbWU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IHsgbmFtZTogJ3NvbWUtY29sbGVjdGlvbicgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2FkZEFzc2V0VG8nLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgbmFtZTogJ3NvbWUtY29sbGVjdGlvbicgfSwgeyBzb21lOiAnYXNzZXQnIH0sIHsgc29tZTogJ21hcmtlcnMnIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiB7IGl0ZW1zOiBbXSB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnQ09MTEVDVElPTi5BTFJFQURZX0lOX0NPTExFQ1RJT05fVE9BU1QnLCB7IGNvbGxlY3Rpb25OYW1lOiAnc29tZS1jb2xsZWN0aW9uJyB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdzaG93U25hY2tCYXJPbkFkZFN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkQXNzZXRTdWNjZXNzLlR5cGUsXG4gICAgICAgIGN1cnJlbnRQYWdlOiB7IHNvbWU6ICdhc3NldHMnIH1cbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYWN0aXZlQ29sbGVjdGlvbicsXG4gICAgICAgIHByb3BlcnR5TmFtZTogJ2NvbGxlY3Rpb24nLFxuICAgICAgICB2YWx1ZTogeyBuYW1lOiAnc29tZUNvbGxlY3Rpb25OYW1lJyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnQ09MTEVDVElPTi5BRERfVE9fQ09MTEVDVElPTl9UT0FTVCcsIHsgY29sbGVjdGlvbk5hbWU6ICdzb21lQ29sbGVjdGlvbk5hbWUnIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ3JlbW92ZUFzc2V0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlJlbW92ZUFzc2V0LlR5cGUsXG4gICAgICAgIGFzc2V0OiB7IHNvbWU6ICdhc3NldCcgfVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgcHJvcGVydHlOYW1lOiAnY29sbGVjdGlvbicsXG4gICAgICAgIHZhbHVlOiB7IHNvbWU6ICdjb2xsZWN0aW9uJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAncmVtb3ZlQXNzZXRGcm9tJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IHNvbWU6ICdjb2xsZWN0aW9uJyB9LCB7IHNvbWU6ICdhc3NldCcgfV0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHsgc29tZTogJ2Fzc2V0cycgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAncmVtb3ZlQXNzZXRTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2Fzc2V0cycgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2hvd1NuYWNrQmFyT25SZW1vdmVTdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlJlbW92ZUFzc2V0U3VjY2Vzcy5UeXBlLFxuICAgICAgICBjdXJyZW50UGFnZUl0ZW1zOiB7IHNvbWU6ICdhc3NldHMnIH1cbiAgICAgIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBzdG9yZVNlY3Rpb25OYW1lOiAnYWN0aXZlQ29sbGVjdGlvbicsXG4gICAgICAgIHByb3BlcnR5TmFtZTogJ2NvbGxlY3Rpb24nLFxuICAgICAgICB2YWx1ZTogeyBuYW1lOiAnc29tZUNvbGxlY3Rpb25OYW1lJyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnQ09MTEVDVElPTi5SRU1PVkVfQVNTRVQuU1VDQ0VTUycsIHsgY29sbGVjdGlvbk5hbWU6ICdzb21lQ29sbGVjdGlvbk5hbWUnIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2NoYW5nZVJvdXRlT25SZW1vdmVBc3NldFN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuUmVtb3ZlQXNzZXRTdWNjZXNzLlR5cGUsXG4gICAgICAgIGN1cnJlbnRQYWdlSXRlbXM6IHsgc29tZTogJ2Fzc2V0cycgfVxuICAgICAgfSxcbiAgICAgIHN0YXRlOiB7XG4gICAgICAgIHN0b3JlU2VjdGlvbk5hbWU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgcHJvcGVydHlOYW1lOiAnY29sbGVjdGlvbicsXG4gICAgICAgIHZhbHVlOiB7IGlkOiAxMjMgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdyb3V0ZXInLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdnb1RvQ29sbGVjdGlvbicsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsxMjNdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ3VwZGF0ZUFzc2V0TWFya2VycycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5VcGRhdGVBc3NldE1hcmtlcnMuVHlwZSxcbiAgICAgICAgYXNzZXQ6IHsgc29tZTogJ2Fzc2V0JyB9LFxuICAgICAgICBtYXJrZXJzOiB7IHNvbWU6ICdtYXJrZXJzJyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICBwcm9wZXJ0eU5hbWU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IHsgc29tZTogJ2NvbGxlY3Rpb24nIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICd1cGRhdGVBc3NldE1hcmtlcnMnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2NvbGxlY3Rpb24nIH0sIHsgc29tZTogJ2Fzc2V0JyB9LCB7IHNvbWU6ICdtYXJrZXJzJyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBzb21lOiAnYXNzZXRzJyB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICd1cGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgc29tZTogJ2Fzc2V0cycgfV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2hvd1NuYWNrYmFyT25VcGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlVwZGF0ZUFzc2V0TWFya2Vyc1N1Y2Nlc3MuVHlwZSxcbiAgICAgICAgY3VycmVudFBhZ2VJdGVtczogeyBzb21lOiAnYXNzZXRzJyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICBwcm9wZXJ0eU5hbWU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IHsgbmFtZTogJ3NvbWVDb2xsZWN0aW9uTmFtZScgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdzbmFja2JhcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Rpc3BsYXknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbJ0NPTExFQ1RJT04uVVBEQVRFX0lOX0NPTExFQ1RJT05fVE9BU1QnLCB7IGNvbGxlY3Rpb25OYW1lOiAnc29tZUNvbGxlY3Rpb25OYW1lJyB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdhZGRQYWdlT2ZTZWFyY2hBc3NldHMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkUGFnZU9mU2VhcmNoQXNzZXRzLlR5cGVcbiAgICAgIH0sXG4gICAgICBzdGF0ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ3NlYXJjaCcsXG4gICAgICAgICAgcHJvcGVydHlOYW1lOiAncmVzdWx0cycsXG4gICAgICAgICAgdmFsdWU6IHsgaXRlbXM6IFt7IHNvbWU6ICdpdGVtcycgfV0gfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIHByb3BlcnR5TmFtZTogJ2NvbGxlY3Rpb24nLFxuICAgICAgICAgIHZhbHVlOiB7IGFzc2V0czogeyBwYWdpbmF0aW9uOiB7IHNvbWU6ICdwYWdpbmF0aW9uJyB9IH0gfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnYWRkQXNzZXRzVG9Gb2N1c2VkQ29sbGVjdGlvbicsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbW3sgc29tZTogJ2l0ZW1zJyB9XSwgeyBzb21lOiAncGFnaW5hdGlvbicgfV0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IFt7IHNvbWU6ICduZXcgaXRlbXMnIH1dXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdhZGRQYWdlT2ZTZWFyY2hBc3NldHNTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW1t7IHNvbWU6ICduZXcgaXRlbXMnIH1dXVxuICAgICAgICB9LFxuICAgICAgICBmYWlsdXJlOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdlcnJvcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2hhbmRsZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdzaG93VG9hc3RPbkFkZFBhZ2VTdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkFkZFBhZ2VPZlNlYXJjaEFzc2V0c1N1Y2Nlc3MuVHlwZSxcbiAgICAgICAgY3VycmVudFBhZ2VJdGVtczogeyB0b3RhbEFzc2V0c0FkZGVkOiA1LCBzb21lOiAnYXNzZXRzJyB9XG4gICAgICB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICBwcm9wZXJ0eU5hbWU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IHsgbmFtZTogJ3NvbWVDb2xsZWN0aW9uTmFtZScgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgc2VjdGlvbk5hbWU6ICdzbmFja2JhcicsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2Rpc3BsYXknLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXG4gICAgICAgICAgICAnQ09MTEVDVElPTi5BRERfQVNTRVRTX1NVQ0NFU1NfVE9BU1QnLFxuICAgICAgICAgICAgeyBjb2xsZWN0aW9uTmFtZTogJ3NvbWVDb2xsZWN0aW9uTmFtZScsIHRvdGFsQXNzZXRzQWRkZWQ6IDUgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
