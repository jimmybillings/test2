"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var sharing_effects_1 = require("./sharing.effects");
var SharingActions = require("./sharing.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Sharing Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        var mockCollectionsService;
        function instantiator() {
            mockCollectionsService = { load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of({})) };
            return new sharing_effects_1.SharingEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockCollectionsService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'createAssetShareLink',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SharingActions.CreateAssetShareLink.Type,
                assetId: 'someAssetId',
                markers: { some: 'markers' }
            },
            serviceMethod: {
                name: 'createAssetShareLink',
                expectedArguments: ['someAssetId', { some: 'markers' }],
                returnsObservableOf: 'link'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'sharing',
                    methodName: 'createAssetShareLinkSuccess',
                    expectedArguments: ['link']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'emailAssetShareLink',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SharingActions.EmailAssetShareLink.Type,
                assetId: 'someAssetId',
                markers: { some: 'markers' },
                parameters: { some: 'paramaters' },
                properties: { some: 'properties' }
            },
            serviceMethod: {
                name: 'emailAssetShareLink',
                expectedArguments: ['someAssetId', { some: 'markers' }, { some: 'paramaters' }, { some: 'properties' }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['ASSET.SHARING.SHARED_CONFIRMED_MESSAGE']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'emailCollectionShareLink',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SharingActions.EmailCollectionShareLink.Type,
                collectionId: 'someCollectionId',
                parameters: { some: 'paramaters' },
                reloadType: 'collection'
            },
            serviceMethod: {
                name: 'emailCollectionShareLink',
                expectedArguments: ['someCollectionId', { some: 'paramaters' }],
            },
            outputActionFactories: {
                success: {
                    sectionName: 'sharing',
                    methodName: 'emailCollectionShareLinkSuccess',
                    expectedArguments: ['collection']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'showToastOnCollectionEmailSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SharingActions.EmailCollectionShareLinkSuccess.Type,
                reloadTpe: 'collections'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['ASSET.SHARING.SHARED_CONFIRMED_MESSAGE']
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'reloadCollectionsOnCollectionEmailSuccess',
            effectsInstantiator: instantiator,
            inputAction: {
                type: SharingActions.EmailCollectionShareLinkSuccess.Type,
                reloadType: 'collections'
            },
            customTests: [{
                    it: 'calls load() on the collections service',
                    expectation: function () { return expect(mockCollectionsService.load).toHaveBeenCalledWith(null, 'offAfterResponse'); }
                }]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'reloadCollectionOnCollectionEmailSuccess',
            effectsInstantiator: instantiator,
            state: {
                storeSectionName: 'activeCollection',
                value: { collection: { assets: { pagination: { pageSize: 20, currentPage: 1 } } } }
            },
            inputAction: {
                type: SharingActions.EmailCollectionShareLinkSuccess.Type,
                reloadType: 'activeCollection'
            },
            outputActionFactories: {
                success: {
                    sectionName: 'activeCollection',
                    methodName: 'load',
                    expectedArguments: [{ pageSize: 20, currentPage: 1 }]
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuZWZmZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLHFEQUFtRDtBQUNuRCxrREFBb0Q7QUFDcEQsMkVBQThGO0FBRTlGO0lBQ0UsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLElBQU0saUJBQWlCLEdBQXNCLElBQUksdUNBQWlCLEVBQUUsQ0FBQztRQUNyRSxJQUFJLHNCQUEyQixDQUFDO1FBRWhDO1lBQ0Usc0JBQXNCLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNoRyxNQUFNLENBQUMsSUFBSSxnQ0FBYyxDQUN2QixpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLEVBQ3JFLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FDdEQsQ0FBQztRQUNKLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsc0JBQXNCO1lBQ2xDLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSTtnQkFDOUMsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7YUFDN0I7WUFDRCxhQUFhLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsaUJBQWlCLEVBQUUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQ3ZELG1CQUFtQixFQUFFLE1BQU07YUFDNUI7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFB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Q0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLDBDQUEwQztZQUN0RCxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLEtBQUssRUFBRTtnQkFDTCxnQkFBZ0IsRUFBRSxrQkFBa0I7Z0JBQ3BDLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTthQUNwRjtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsY0FBYyxDQUFDLCtCQUErQixDQUFDLElBQUk7Z0JBQ3pELFVBQVUsRUFBRSxrQkFBa0I7YUFDL0I7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFO29CQUNQLFdBQVcsRUFBRSxrQkFBa0I7b0JBQy9CLFVBQVUsRUFBRSxNQUFNO29CQUNsQixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3REO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqSUQsb0JBaUlDIiwiZmlsZSI6ImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuZWZmZWN0cy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IFNoYXJpbmdFZmZlY3RzIH0gZnJvbSAnLi9zaGFyaW5nLmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgU2hhcmluZ0FjdGlvbnMgZnJvbSAnLi9zaGFyaW5nLmFjdGlvbnMnO1xuaW1wb3J0IHsgRWZmZWN0c1NwZWNIZWxwZXIsIEVmZmVjdFRlc3RQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL2VmZmVjdHMuc3BlYy1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1NoYXJpbmcgRWZmZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBlZmZlY3RzU3BlY0hlbHBlcjogRWZmZWN0c1NwZWNIZWxwZXIgPSBuZXcgRWZmZWN0c1NwZWNIZWxwZXIoKTtcbiAgICBsZXQgbW9ja0NvbGxlY3Rpb25zU2VydmljZTogYW55O1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IFNoYXJpbmdFZmZlY3RzIHtcbiAgICAgIG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UgPSB7IGxvYWQ6IGphc21pbmUuY3JlYXRlU3B5KCdsb2FkJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKSB9O1xuICAgICAgcmV0dXJuIG5ldyBTaGFyaW5nRWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLFxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZSwgbW9ja0NvbGxlY3Rpb25zU2VydmljZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdjcmVhdGVBc3NldFNoYXJlTGluaycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBTaGFyaW5nQWN0aW9ucy5DcmVhdGVBc3NldFNoYXJlTGluay5UeXBlLFxuICAgICAgICBhc3NldElkOiAnc29tZUFzc2V0SWQnLFxuICAgICAgICBtYXJrZXJzOiB7IHNvbWU6ICdtYXJrZXJzJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnY3JlYXRlQXNzZXRTaGFyZUxpbmsnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydzb21lQXNzZXRJZCcsIHsgc29tZTogJ21hcmtlcnMnIH1dLFxuICAgICAgICByZXR1cm5zT2JzZXJ2YWJsZU9mOiAnbGluaydcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc2hhcmluZycsXG4gICAgICAgICAgbWV0aG9kTmFtZTogJ2NyZWF0ZUFzc2V0U2hhcmVMaW5rU3VjY2VzcycsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnbGluayddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2VtYWlsQXNzZXRTaGFyZUxpbmsnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogU2hhcmluZ0FjdGlvbnMuRW1haWxBc3NldFNoYXJlTGluay5UeXBlLFxuICAgICAgICBhc3NldElkOiAnc29tZUFzc2V0SWQnLFxuICAgICAgICBtYXJrZXJzOiB7IHNvbWU6ICdtYXJrZXJzJyB9LFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IHNvbWU6ICdwYXJhbWF0ZXJzJyB9LFxuICAgICAgICBwcm9wZXJ0aWVzOiB7IHNvbWU6ICdwcm9wZXJ0aWVzJyB9XG4gICAgICB9LFxuICAgICAgc2VydmljZU1ldGhvZDoge1xuICAgICAgICBuYW1lOiAnZW1haWxBc3NldFNoYXJlTGluaycsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbJ3NvbWVBc3NldElkJywgeyBzb21lOiAnbWFya2VycycgfSwgeyBzb21lOiAncGFyYW1hdGVycycgfSwgeyBzb21lOiAncHJvcGVydGllcycgfV0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnQVNTRVQuU0hBUklORy5TSEFSRURfQ09ORklSTUVEX01FU1NBR0UnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdlbWFpbENvbGxlY3Rpb25TaGFyZUxpbmsnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogU2hhcmluZ0FjdGlvbnMuRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rLlR5cGUsXG4gICAgICAgIGNvbGxlY3Rpb25JZDogJ3NvbWVDb2xsZWN0aW9uSWQnLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IHNvbWU6ICdwYXJhbWF0ZXJzJyB9LFxuICAgICAgICByZWxvYWRUeXBlOiAnY29sbGVjdGlvbidcbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdlbWFpbENvbGxlY3Rpb25TaGFyZUxpbmsnLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydzb21lQ29sbGVjdGlvbklkJywgeyBzb21lOiAncGFyYW1hdGVycycgfV0sXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NoYXJpbmcnLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdlbWFpbENvbGxlY3Rpb25TaGFyZUxpbmtTdWNjZXNzJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydjb2xsZWN0aW9uJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnc2hvd1RvYXN0T25Db2xsZWN0aW9uRW1haWxTdWNjZXNzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFNoYXJpbmdBY3Rpb25zLkVtYWlsQ29sbGVjdGlvblNoYXJlTGlua1N1Y2Nlc3MuVHlwZSxcbiAgICAgICAgcmVsb2FkVHBlOiAnY29sbGVjdGlvbnMnXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnQVNTRVQuU0hBUklORy5TSEFSRURfQ09ORklSTUVEX01FU1NBR0UnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdyZWxvYWRDb2xsZWN0aW9uc09uQ29sbGVjdGlvbkVtYWlsU3VjY2VzcycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBTaGFyaW5nQWN0aW9ucy5FbWFpbENvbGxlY3Rpb25TaGFyZUxpbmtTdWNjZXNzLlR5cGUsXG4gICAgICAgIHJlbG9hZFR5cGU6ICdjb2xsZWN0aW9ucydcbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW3tcbiAgICAgICAgaXQ6ICdjYWxscyBsb2FkKCkgb24gdGhlIGNvbGxlY3Rpb25zIHNlcnZpY2UnLFxuICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4gZXhwZWN0KG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UubG9hZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgobnVsbCwgJ29mZkFmdGVyUmVzcG9uc2UnKVxuICAgICAgfV1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ3JlbG9hZENvbGxlY3Rpb25PbkNvbGxlY3Rpb25FbWFpbFN1Y2Nlc3MnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgc3RvcmVTZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICB2YWx1ZTogeyBjb2xsZWN0aW9uOiB7IGFzc2V0czogeyBwYWdpbmF0aW9uOiB7IHBhZ2VTaXplOiAyMCwgY3VycmVudFBhZ2U6IDEgfSB9IH0gfVxuICAgICAgfSxcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFNoYXJpbmdBY3Rpb25zLkVtYWlsQ29sbGVjdGlvblNoYXJlTGlua1N1Y2Nlc3MuVHlwZSxcbiAgICAgICAgcmVsb2FkVHlwZTogJ2FjdGl2ZUNvbGxlY3Rpb24nXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ2FjdGl2ZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdsb2FkJyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgcGFnZVNpemU6IDIwLCBjdXJyZW50UGFnZTogMSB9XVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
