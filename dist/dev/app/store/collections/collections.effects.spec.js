"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_effects_1 = require("./collections.effects");
var CollectionsActions = require("./collections.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Collections Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        function instantiator() {
            return new collections_effects_1.CollectionsEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'addAsset',
            comment: 'with a new asset',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CollectionsActions.AddAssetToCollection.Type,
                asset: { assetId: 'asset' },
                collection: { name: 'collection' }
            },
            serviceMethod: {
                name: 'addAssetTo',
                expectedArguments: [{ name: 'collection' }, { assetId: 'asset' }],
                returnsObservableOf: { list: ['something'] }
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['COLLECTION.SHOW.ASSET_ADDED',
                        { collectionName: 'collection', assetId: 'asset' }]
                }
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addAsset',
            comment: 'with a new asset',
            effectsInstantiator: instantiator,
            inputAction: {
                type: CollectionsActions.AddAssetToCollection.Type,
                asset: { assetId: 'asset' },
                collection: { name: 'collection' }
            },
            serviceMethod: {
                name: 'addAssetTo',
                expectedArguments: [{ name: 'collection' }, { assetId: 'asset' }],
                returnsObservableOf: {}
            },
            outputActionFactories: {
                success: {
                    sectionName: 'snackbar',
                    methodName: 'display',
                    expectedArguments: ['COLLECTION.ALREADY_IN_COLLECTION_TOAST',
                        { collectionName: 'collection' }]
                }
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb2xsZWN0aW9ucy9jb2xsZWN0aW9ucy5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2REFBMkQ7QUFDM0QsMERBQTREO0FBQzVELDJFQUE4RjtBQUU5RjtJQUNFLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixJQUFNLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFFckU7WUFDRSxNQUFNLENBQUMsSUFBSSx3Q0FBa0IsQ0FDM0IsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsQ0FDckcsQ0FBQztRQUNKLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsVUFBVTtZQUN0QixPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJO2dCQUNsRCxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO2dCQUMzQixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO2FBQ25DO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxZQUFZO2dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2dCQUNqRSxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2FBQzdDO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsVUFBVTtvQkFDdkIsVUFBVSxFQUFFLFNBQVM7b0JBQ3JCLGlCQUFpQixFQUFFLENBQUMsNkJBQTZCO3dCQUMvQyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2lCQUN0RDthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLFVBQVU7WUFDdEIsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsSUFBSTtnQkFDbEQsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtnQkFDM0IsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTthQUNuQztZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztnQkFDakUsbUJBQW1CLEVBQUUsRUFBRTthQUN4QjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1AsV0FBVyxFQUFFLFVBQVU7b0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO29CQUNyQixpQkFBaUIsRUFBRSxDQUFDLHdDQUF3Qzt3QkFDMUQsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLENBQUM7aUJBQ3BDO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUExREQsb0JBMERDIiwiZmlsZSI6ImFwcC9zdG9yZS9jb2xsZWN0aW9ucy9jb2xsZWN0aW9ucy5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xsZWN0aW9uc0VmZmVjdHMgfSBmcm9tICcuL2NvbGxlY3Rpb25zLmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgQ29sbGVjdGlvbnNBY3Rpb25zIGZyb20gJy4vY29sbGVjdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciwgRWZmZWN0VGVzdFBhcmFtZXRlcnMgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ29sbGVjdGlvbnMgRWZmZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBlZmZlY3RzU3BlY0hlbHBlcjogRWZmZWN0c1NwZWNIZWxwZXIgPSBuZXcgRWZmZWN0c1NwZWNIZWxwZXIoKTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcigpOiBDb2xsZWN0aW9uc0VmZmVjdHMge1xuICAgICAgcmV0dXJuIG5ldyBDb2xsZWN0aW9uc0VmZmVjdHMoXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIGVmZmVjdHNTcGVjSGVscGVyLm1vY2tTdG9yZSwgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1NlcnZpY2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnYWRkQXNzZXQnLFxuICAgICAgY29tbWVudDogJ3dpdGggYSBuZXcgYXNzZXQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogQ29sbGVjdGlvbnNBY3Rpb25zLkFkZEFzc2V0VG9Db2xsZWN0aW9uLlR5cGUsXG4gICAgICAgIGFzc2V0OiB7IGFzc2V0SWQ6ICdhc3NldCcgfSxcbiAgICAgICAgY29sbGVjdGlvbjogeyBuYW1lOiAnY29sbGVjdGlvbicgfVxuICAgICAgfSxcbiAgICAgIHNlcnZpY2VNZXRob2Q6IHtcbiAgICAgICAgbmFtZTogJ2FkZEFzc2V0VG8nLFxuICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW3sgbmFtZTogJ2NvbGxlY3Rpb24nIH0sIHsgYXNzZXRJZDogJ2Fzc2V0JyB9XSxcbiAgICAgICAgcmV0dXJuc09ic2VydmFibGVPZjogeyBsaXN0OiBbJ3NvbWV0aGluZyddIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2Vzczoge1xuICAgICAgICAgIHNlY3Rpb25OYW1lOiAnc25hY2tiYXInLFxuICAgICAgICAgIG1ldGhvZE5hbWU6ICdkaXNwbGF5JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogWydDT0xMRUNUSU9OLlNIT1cuQVNTRVRfQURERUQnLFxuICAgICAgICAgICAgeyBjb2xsZWN0aW9uTmFtZTogJ2NvbGxlY3Rpb24nLCBhc3NldElkOiAnYXNzZXQnIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2FkZEFzc2V0JyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIGEgbmV3IGFzc2V0JyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IENvbGxlY3Rpb25zQWN0aW9ucy5BZGRBc3NldFRvQ29sbGVjdGlvbi5UeXBlLFxuICAgICAgICBhc3NldDogeyBhc3NldElkOiAnYXNzZXQnIH0sXG4gICAgICAgIGNvbGxlY3Rpb246IHsgbmFtZTogJ2NvbGxlY3Rpb24nIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2aWNlTWV0aG9kOiB7XG4gICAgICAgIG5hbWU6ICdhZGRBc3NldFRvJyxcbiAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFt7IG5hbWU6ICdjb2xsZWN0aW9uJyB9LCB7IGFzc2V0SWQ6ICdhc3NldCcgfV0sXG4gICAgICAgIHJldHVybnNPYnNlcnZhYmxlT2Y6IHt9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IHtcbiAgICAgICAgICBzZWN0aW9uTmFtZTogJ3NuYWNrYmFyJyxcbiAgICAgICAgICBtZXRob2ROYW1lOiAnZGlzcGxheScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFsnQ09MTEVDVElPTi5BTFJFQURZX0lOX0NPTExFQ1RJT05fVE9BU1QnLFxuICAgICAgICAgICAgeyBjb2xsZWN0aW9uTmFtZTogJ2NvbGxlY3Rpb24nIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
