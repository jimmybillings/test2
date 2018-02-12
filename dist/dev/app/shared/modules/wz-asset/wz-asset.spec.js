"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_asset_1 = require("./wz-asset");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var EnhancedMock = require("../../interfaces/enhanced-asset");
var mock_asset_1 = require("../../mocks/mock-asset");
function main() {
    describe('Wz Asset Base Class', function () {
        var componentUnderTest;
        var mockStore;
        var mockCollection;
        var mockEnhancedAsset;
        beforeEach(function () {
            mockCollection = {
                name: 'testCollection', createdOn: null, lastUpdated: null, id: 1, siteName: 'test', owner: 1, assets: {
                    items: [{ assetId: 1234, uuid: 'mockAssetuuid1', name: '' }, { assetId: 1235, uuid: 'mockAssetuuid2', name: '' },
                        { assetId: 1236, uuid: 'mockAssetuuid3', name: '' }]
                }
            };
            mockEnhancedAsset = EnhancedMock.enhanceAsset(mock_asset_1.mockAsset, 'search');
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('speedPreview', { 1234: { price: 100 } });
            mockStore.createStateElement('comment', 'counts', { 'abc-123': 3 });
            mockStore.createStateSection('uiConfig', {
                components: { search: { config: { showAssetNameGridView: { value: 'true' } } } }
            });
            componentUnderTest = new wz_asset_1.WzAsset(mockStore, null);
            componentUnderTest.assets = [EnhancedMock.enhanceAsset(mock_asset_1.mockAsset, 'search')];
        });
        describe('ngOnInit()', function () {
            it('Should call the ui config and set variable showAssetName from ui config', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.showAssetName).toBe(true);
            });
        });
        describe('assets getter', function () {
            it('returns the original input assets', function () {
                expect(componentUnderTest.assets).toEqual([mockEnhancedAsset]);
            });
        });
        describe('addToActiveCollection()', function () {
            it('dispatches the expected action', function () {
                var mockAsset = { some: 'asset' };
                var spy = mockStore.createActionFactoryMethod('activeCollection', 'addAsset');
                componentUnderTest.addToActiveCollection(mockEnhancedAsset);
                mockStore.expectDispatchFor(spy, mockEnhancedAsset);
            });
        });
        describe('addToDifferentCollection()', function () {
            it('emits the onAddtoDifferentCollection event with the asset', function () {
                spyOn(componentUnderTest.onAddtoDifferentCollection, 'emit');
                componentUnderTest.addToDifferentCollection({ some: 'asset' });
                expect(componentUnderTest.onAddtoDifferentCollection.emit).toHaveBeenCalledWith({ some: 'asset' });
            });
        });
        describe('canAddToDifferentCollection()', function () {
            it('Returns true if assetType is collection and user has haveCollections permission', function () {
                componentUnderTest.assetType = 'collection';
                var userCan = { haveCollections: function () { return true; } };
                componentUnderTest.userCan = userCan;
                expect(componentUnderTest.canAddToDifferentCollection).toBe(true);
            });
            it('Returns false if assetType is collection but user has no haveCollections permission', function () {
                componentUnderTest.assetType = 'collection';
                var userCan = { haveCollections: function () { return false; } };
                componentUnderTest.userCan = userCan;
                expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
            });
            it('Returns false if assetType is not collection and user has haveCollections permission', function () {
                componentUnderTest.assetType = 'search';
                var userCan = { haveCollections: function () { return true; } };
                componentUnderTest.userCan = userCan;
                expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
            });
            it('Returns true if assetType is not collection and user has no haveCollections permission', function () {
                componentUnderTest.assetType = 'search';
                var userCan = { haveCollections: function () { return false; } };
                componentUnderTest.userCan = userCan;
                expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
            });
        });
        describe('removeFromActiveCollection()', function () {
            it('dispatches the expected action', function () {
                var mockAsset = { some: 'asset' };
                var spy = mockStore.createActionFactoryMethod('activeCollection', 'removeAsset');
                componentUnderTest.removeFromActiveCollection(mockEnhancedAsset);
                mockStore.expectDispatchFor(spy, mockEnhancedAsset);
            });
        });
        describe('addAssetToCart()', function () {
            it('Should set the new active asset', function () {
                spyOn(componentUnderTest, 'setAssetActiveId');
                componentUnderTest.addAssetToCart(mockEnhancedAsset);
                expect(componentUnderTest.setAssetActiveId).toHaveBeenCalledWith(mockEnhancedAsset);
            });
            it('Should emit an event to add an asset to the cart', function () {
                spyOn(componentUnderTest.onAddToCart, 'emit');
                componentUnderTest.addAssetToCart(mockEnhancedAsset);
                expect(componentUnderTest.onAddToCart.emit).toHaveBeenCalledWith(mockEnhancedAsset);
            });
        });
        describe('removeFromCollection()', function () {
            it('Should emit an event to edit an asset', function () {
                spyOn(componentUnderTest.onEditAsset, 'emit');
                componentUnderTest.editAsset(mockEnhancedAsset);
                expect(componentUnderTest.onEditAsset.emit).toHaveBeenCalledWith(mockEnhancedAsset);
            });
        });
        describe('inCollection()', function () {
            beforeEach(function () { return componentUnderTest.activeCollection = mockCollection; });
            it('Should return true if an asset is already in the current collection', function () {
                expect(componentUnderTest.inCollection({ assetId: 1234, uuid: 'mockAssetuuid1', name: '' })).toBe(true);
            });
            it('Should return false if an asset is not in the current collection', function () {
                expect(componentUnderTest.inCollection({ assetId: 12334, uuid: 'mockAssetuuid1', name: '' })).toBe(false);
            });
        });
        describe('nameOf()', function () {
            it('returns the name of the enhanced asset', function () {
                expect(componentUnderTest.nameOf(mockEnhancedAsset)).toEqual(mockEnhancedAsset.name);
            });
        });
        describe('routerLinkFor()', function () {
            it('returns the enhanced asset\'s router link array', function () {
                expect(componentUnderTest.routerLinkFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.routerLink);
            });
        });
        describe('hasThumbnail()', function () {
            it('returns true if the asset has a thumbnail URL', function () {
                expect(componentUnderTest.hasThumbnail(mockEnhancedAsset)).toBe(true);
            });
        });
        describe('thumbnailUrlFor()', function () {
            it('returns the thumbnail URL for the asset', function () {
                expect(componentUnderTest.thumbnailUrlFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.thumbnailUrl);
            });
        });
        describe('hasTitle()', function () {
            it('returns true if the asset has a title', function () {
                expect(componentUnderTest.hasTitle(mockEnhancedAsset)).toBe(true);
            });
        });
        describe('titleOf()', function () {
            it('returns the title of the asset', function () {
                expect(componentUnderTest.titleOf(mockEnhancedAsset)).toEqual(mockEnhancedAsset.title);
            });
        });
        describe('hasFormatType()', function () {
            it('returns true if the asset has a format type', function () {
                expect(componentUnderTest.hasFormatType(mockEnhancedAsset)).toBe(false);
            });
        });
        describe('formatTypeOf()', function () {
            it('returns the format type for the asset', function () {
                expect(componentUnderTest.formatTypeOf(mockEnhancedAsset)).toEqual(mockEnhancedAsset.formatType);
            });
        });
        describe('formatClassNameFor()', function () {
            it('returns "hd" for "High Definition"', function () {
                expect(componentUnderTest.formatClassNameFor(mockEnhancedAsset)).toBe('hd');
            });
        });
        describe('hasDuration()', function () {
            it('returns true if the asset has a duration', function () {
                expect(componentUnderTest.hasDuration(mockEnhancedAsset)).toBe(false);
            });
        });
        describe('subclipDurationFrameFor()', function () {
            it('returns the duration frame object for the asset', function () {
                expect(componentUnderTest.subclipDurationFrameFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.subclipDurationFrame);
            });
        });
        describe('isImage()', function () {
            it('returns true if the asset is an image', function () {
                expect(componentUnderTest.isImage(mockEnhancedAsset)).toBe(false);
            });
        });
        describe('isSubclipped()', function () {
            it('returns true if the asset is subclipped', function () {
                expect(componentUnderTest.isSubclipped(mockEnhancedAsset)).toBe(true);
            });
        });
        describe('subclipSegmentStylesFor()', function () {
            it('returns styles based on the asset', function () {
                expect(componentUnderTest.subclipSegmentStylesFor(mockEnhancedAsset))
                    .toEqual({
                    'margin-left.%': mockEnhancedAsset.inMarkerPercentage,
                    'width.%': mockEnhancedAsset.subclipDurationPercentage,
                    'min-width.px': 2
                });
            });
        });
        describe('hasDescription()', function () {
            it('returns true if the asset has a description', function () {
                expect(componentUnderTest.hasDescription(mockEnhancedAsset)).toBe(true);
            });
        });
        describe('descriptionOf()', function () {
            it('returns the description for the asset', function () {
                expect(componentUnderTest.descriptionOf(mockEnhancedAsset)).toEqual(mockEnhancedAsset.description);
            });
        });
        describe('inMarkerFrameFor()', function () {
            it('returns the duration frame object for the asset', function () {
                expect(componentUnderTest.inMarkerFrameFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.inMarkerFrame);
            });
        });
        describe('outMarkerFrameFor()', function () {
            it('returns the duration frame object for the asset', function () {
                expect(componentUnderTest.outMarkerFrameFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.outMarkerFrame);
            });
        });
        describe('canBePurchased()', function () {
            it('is false when asset is missing a Rights.Reproduction metadata field', function () {
                var asset = {
                    metaData: [
                        { name: 'someKey', value: 'someValue' }
                    ]
                };
                expect(componentUnderTest.canBePurchased(asset)).toBe(false);
            });
            it('is false when asset has an unaccepted value in the Rights.Reproduction metadata field', function () {
                var asset = {
                    metaData: [
                        { name: 'Rights.Reproduction', value: 'someValue2' }
                    ]
                };
                expect(componentUnderTest.canBePurchased(asset)).toBe(false);
            });
            it('is true when Rights.Reproduction is Royalty Free AND the asset has a price', function () {
                var asset = {
                    assetId: 1234,
                    metaData: [
                        { name: 'Rights.Reproduction', value: 'Royalty Free' }
                    ]
                };
                expect(componentUnderTest.canBePurchased(asset)).toBe(true);
            });
            it('is true when Rights.Reproduction is Rights Managed AND the asset has a price', function () {
                var asset = {
                    assetId: 1234,
                    metaData: [
                        { name: 'Rights.Reproduction', value: 'Rights Managed' }
                    ]
                };
                expect(componentUnderTest.canBePurchased(asset)).toBe(true);
            });
        });
        describe('commentCountFor()', function () {
            it('selects the right part of the appStore', function () {
                componentUnderTest.commentCountFor({ uuid: 'abc-123' }).take(1).subscribe(function (count) { return expect(count).toBe(3); });
            });
        });
        describe('canBeRemoved()', function () {
            it('Should be false if assetType IS NOT collection and the asset IS NOT in the collection', function () {
                componentUnderTest.assetType = 'search';
                componentUnderTest.activeCollection = mockCollection;
                expect(componentUnderTest.canBeRemoved(mockEnhancedAsset)).toBe(false);
            });
            it('Should be false if assetType IS NOT collection and the asset IS in the collection', function () {
                componentUnderTest.assetType = 'search';
                mockCollection.assets.items.push(mockEnhancedAsset);
                componentUnderTest.activeCollection = mockCollection;
                expect(componentUnderTest.canBeRemoved(mockEnhancedAsset)).toBe(false);
            });
            it('Should be false if assetType IS collection and the asset IS NOT in the collection', function () {
                componentUnderTest.assetType = 'collection';
                componentUnderTest.activeCollection = mockCollection;
                expect(componentUnderTest.canBeRemoved(mockEnhancedAsset)).toBe(false);
            });
            it('Should be true if assetType IS collection and the asset IS in the collection', function () {
                componentUnderTest.assetType = 'collection';
                mockCollection.assets.items.push(mockEnhancedAsset);
                componentUnderTest.activeCollection = mockCollection;
                expect(componentUnderTest.canBeRemoved(mockEnhancedAsset)).toBe(true);
            });
        });
        describe('canBeAddedAgain()', function () {
            it('Should be false if assetType IS NOT collection and the asset IS NOT in the collection', function () {
                componentUnderTest.assetType = 'search';
                componentUnderTest.activeCollection = mockCollection;
                expect(componentUnderTest.canBeAddedAgain(mockEnhancedAsset)).toBe(false);
            });
            it('Should be true if assetType IS NOT collection and the asset IS in the collection', function () {
                componentUnderTest.assetType = 'search';
                mockCollection.assets.items.push(mockEnhancedAsset);
                componentUnderTest.activeCollection = mockCollection;
                expect(componentUnderTest.canBeAddedAgain(mockEnhancedAsset)).toBe(true);
            });
            it('Should be false if assetType IS collection and the asset IS NOT in the collection', function () {
                componentUnderTest.assetType = 'collection';
                componentUnderTest.activeCollection = mockCollection;
                expect(componentUnderTest.canBeAddedAgain(mockEnhancedAsset)).toBe(false);
            });
            it('Should be false if assetType IS collection and the asset IS in the collection', function () {
                componentUnderTest.assetType = 'collection';
                mockCollection.assets.items.push(mockEnhancedAsset);
                componentUnderTest.activeCollection = mockCollection;
                expect(componentUnderTest.canBeAddedAgain(mockEnhancedAsset)).toBe(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1hc3NldC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdUNBQXFDO0FBR3JDLDZFQUEwRTtBQUUxRSw4REFBZ0U7QUFDaEUscURBQW1EO0FBRW5EO0lBQ0UsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzlCLElBQUksa0JBQTJCLENBQUM7UUFDaEMsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksY0FBMEIsQ0FBQztRQUMvQixJQUFJLGlCQUE2QyxDQUFDO1FBRWxELFVBQVUsQ0FBQztZQUNULGNBQWMsR0FBRztnQkFDZixJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtvQkFDckcsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO3dCQUNoSCxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztpQkFDckQ7YUFDRixDQUFDO1lBRUYsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxzQkFBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ25FLFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixTQUFTLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RSxTQUFT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LENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDcEQsa0JBQWtCLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDO2dCQUNyRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhXRCxvQkFnV0MiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWFzc2V0L3d6LWFzc2V0LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFd6QXNzZXQgfSBmcm9tICcuL3d6LWFzc2V0JztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NvbGxlY3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmltcG9ydCAqIGFzIEVuaGFuY2VkTW9jayBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IG1vY2tBc3NldCB9IGZyb20gJy4uLy4uL21vY2tzL21vY2stYXNzZXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1d6IEFzc2V0IEJhc2UgQ2xhc3MnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pBc3NldDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IG1vY2tDb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xuICAgIGxldCBtb2NrRW5oYW5jZWRBc3NldDogRW5oYW5jZWRNb2NrLkVuaGFuY2VkQXNzZXQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tDb2xsZWN0aW9uID0ge1xuICAgICAgICBuYW1lOiAndGVzdENvbGxlY3Rpb24nLCBjcmVhdGVkT246IG51bGwsIGxhc3RVcGRhdGVkOiBudWxsLCBpZDogMSwgc2l0ZU5hbWU6ICd0ZXN0Jywgb3duZXI6IDEsIGFzc2V0czoge1xuICAgICAgICAgIGl0ZW1zOiBbeyBhc3NldElkOiAxMjM0LCB1dWlkOiAnbW9ja0Fzc2V0dXVpZDEnLCBuYW1lOiAnJyB9LCB7IGFzc2V0SWQ6IDEyMzUsIHV1aWQ6ICdtb2NrQXNzZXR1dWlkMicsIG5hbWU6ICcnIH0sXG4gICAgICAgICAgeyBhc3NldElkOiAxMjM2LCB1dWlkOiAnbW9ja0Fzc2V0dXVpZDMnLCBuYW1lOiAnJyB9XVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBtb2NrRW5oYW5jZWRBc3NldCA9IEVuaGFuY2VkTW9jay5lbmhhbmNlQXNzZXQobW9ja0Fzc2V0LCAnc2VhcmNoJyk7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdzcGVlZFByZXZpZXcnLCB7IDEyMzQ6IHsgcHJpY2U6IDEwMCB9IH0pO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlRWxlbWVudCgnY29tbWVudCcsICdjb3VudHMnLCB7ICdhYmMtMTIzJzogMyB9KTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywge1xuICAgICAgICBjb21wb25lbnRzOiB7IHNlYXJjaDogeyBjb25maWc6IHsgc2hvd0Fzc2V0TmFtZUdyaWRWaWV3OiB7IHZhbHVlOiAndHJ1ZScgfSB9IH0gfVxuICAgICAgfSk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgV3pBc3NldChtb2NrU3RvcmUsIG51bGwpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0cyA9IFtFbmhhbmNlZE1vY2suZW5oYW5jZUFzc2V0KG1vY2tBc3NldCwgJ3NlYXJjaCcpXTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSB1aSBjb25maWcgYW5kIHNldCB2YXJpYWJsZSBzaG93QXNzZXROYW1lIGZyb20gdWkgY29uZmlnJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93QXNzZXROYW1lKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYXNzZXRzIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBvcmlnaW5hbCBpbnB1dCBhc3NldHMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuYXNzZXRzKS50b0VxdWFsKFttb2NrRW5oYW5jZWRBc3NldF0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkVG9BY3RpdmVDb2xsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICBpdCgnZGlzcGF0Y2hlcyB0aGUgZXhwZWN0ZWQgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2NrQXNzZXQ6IGFueSA9IHsgc29tZTogJ2Fzc2V0JyB9O1xuICAgICAgICBjb25zdCBzcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnYWN0aXZlQ29sbGVjdGlvbicsICdhZGRBc3NldCcpO1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRUb0FjdGl2ZUNvbGxlY3Rpb24obW9ja0VuaGFuY2VkQXNzZXQpO1xuXG4gICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihzcHksIG1vY2tFbmhhbmNlZEFzc2V0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FkZFRvRGlmZmVyZW50Q29sbGVjdGlvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2VtaXRzIHRoZSBvbkFkZHRvRGlmZmVyZW50Q29sbGVjdGlvbiBldmVudCB3aXRoIHRoZSBhc3NldCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0Lm9uQWRkdG9EaWZmZXJlbnRDb2xsZWN0aW9uLCAnZW1pdCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkVG9EaWZmZXJlbnRDb2xsZWN0aW9uKHsgc29tZTogJ2Fzc2V0JyB9IGFzIGFueSk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub25BZGR0b0RpZmZlcmVudENvbGxlY3Rpb24uZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBzb21lOiAnYXNzZXQnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuQWRkVG9EaWZmZXJlbnRDb2xsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICBpdCgnUmV0dXJucyB0cnVlIGlmIGFzc2V0VHlwZSBpcyBjb2xsZWN0aW9uIGFuZCB1c2VyIGhhcyBoYXZlQ29sbGVjdGlvbnMgcGVybWlzc2lvbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0VHlwZSA9ICdjb2xsZWN0aW9uJztcbiAgICAgICAgbGV0IHVzZXJDYW4gPSB7IGhhdmVDb2xsZWN0aW9uczogKCkgPT4gdHJ1ZSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbiA9IHVzZXJDYW4gYXMgYW55O1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbkFkZFRvRGlmZmVyZW50Q29sbGVjdGlvbikudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnUmV0dXJucyBmYWxzZSBpZiBhc3NldFR5cGUgaXMgY29sbGVjdGlvbiBidXQgdXNlciBoYXMgbm8gaGF2ZUNvbGxlY3Rpb25zIHBlcm1pc3Npb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAnY29sbGVjdGlvbic7XG4gICAgICAgIGxldCB1c2VyQ2FuID0geyBoYXZlQ29sbGVjdGlvbnM6ICgpID0+IGZhbHNlIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC51c2VyQ2FuID0gdXNlckNhbiBhcyBhbnk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuQWRkVG9EaWZmZXJlbnRDb2xsZWN0aW9uKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnUmV0dXJucyBmYWxzZSBpZiBhc3NldFR5cGUgaXMgbm90IGNvbGxlY3Rpb24gYW5kIHVzZXIgaGFzIGhhdmVDb2xsZWN0aW9ucyBwZXJtaXNzaW9uJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRUeXBlID0gJ3NlYXJjaCc7XG4gICAgICAgIGxldCB1c2VyQ2FuID0geyBoYXZlQ29sbGVjdGlvbnM6ICgpID0+IHRydWUgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW4gPSB1c2VyQ2FuIGFzIGFueTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5BZGRUb0RpZmZlcmVudENvbGxlY3Rpb24pLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdSZXR1cm5zIHRydWUgaWYgYXNzZXRUeXBlIGlzIG5vdCBjb2xsZWN0aW9uIGFuZCB1c2VyIGhhcyBubyBoYXZlQ29sbGVjdGlvbnMgcGVybWlzc2lvbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0VHlwZSA9ICdzZWFyY2gnO1xuICAgICAgICBsZXQgdXNlckNhbiA9IHsgaGF2ZUNvbGxlY3Rpb25zOiAoKSA9PiBmYWxzZSB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbiA9IHVzZXJDYW4gYXMgYW55O1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbkFkZFRvRGlmZmVyZW50Q29sbGVjdGlvbikudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZW1vdmVGcm9tQWN0aXZlQ29sbGVjdGlvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2Rpc3BhdGNoZXMgdGhlIGV4cGVjdGVkIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29uc3QgbW9ja0Fzc2V0OiBhbnkgPSB7IHNvbWU6ICdhc3NldCcgfTtcbiAgICAgICAgY29uc3Qgc3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2FjdGl2ZUNvbGxlY3Rpb24nLCAncmVtb3ZlQXNzZXQnKTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucmVtb3ZlRnJvbUFjdGl2ZUNvbGxlY3Rpb24obW9ja0VuaGFuY2VkQXNzZXQpO1xuXG4gICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihzcHksIG1vY2tFbmhhbmNlZEFzc2V0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FkZEFzc2V0VG9DYXJ0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIHNldCB0aGUgbmV3IGFjdGl2ZSBhc3NldCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0LCAnc2V0QXNzZXRBY3RpdmVJZCcpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkQXNzZXRUb0NhcnQobW9ja0VuaGFuY2VkQXNzZXQpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNldEFzc2V0QWN0aXZlSWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vY2tFbmhhbmNlZEFzc2V0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGVtaXQgYW4gZXZlbnQgdG8gYWRkIGFuIGFzc2V0IHRvIHRoZSBjYXJ0JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3Qub25BZGRUb0NhcnQsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRBc3NldFRvQ2FydChtb2NrRW5oYW5jZWRBc3NldCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub25BZGRUb0NhcnQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0VuaGFuY2VkQXNzZXQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVtb3ZlRnJvbUNvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgZW1pdCBhbiBldmVudCB0byBlZGl0IGFuIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3Qub25FZGl0QXNzZXQsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5lZGl0QXNzZXQobW9ja0VuaGFuY2VkQXNzZXQpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm9uRWRpdEFzc2V0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vY2tFbmhhbmNlZEFzc2V0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2luQ29sbGVjdGlvbigpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiBjb21wb25lbnRVbmRlclRlc3QuYWN0aXZlQ29sbGVjdGlvbiA9IG1vY2tDb2xsZWN0aW9uKTtcblxuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBhbiBhc3NldCBpcyBhbHJlYWR5IGluIHRoZSBjdXJyZW50IGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaW5Db2xsZWN0aW9uKHsgYXNzZXRJZDogMTIzNCwgdXVpZDogJ21vY2tBc3NldHV1aWQxJywgbmFtZTogJycgfSkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gZmFsc2UgaWYgYW4gYXNzZXQgaXMgbm90IGluIHRoZSBjdXJyZW50IGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaW5Db2xsZWN0aW9uKHsgYXNzZXRJZDogMTIzMzQsIHV1aWQ6ICdtb2NrQXNzZXR1dWlkMScsIG5hbWU6ICcnIH0pKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25hbWVPZigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIG5hbWUgb2YgdGhlIGVuaGFuY2VkIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5hbWVPZihtb2NrRW5oYW5jZWRBc3NldCkpLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQubmFtZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyb3V0ZXJMaW5rRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgZW5oYW5jZWQgYXNzZXRcXCdzIHJvdXRlciBsaW5rIGFycmF5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJvdXRlckxpbmtGb3IobW9ja0VuaGFuY2VkQXNzZXQpKS50b0VxdWFsKG1vY2tFbmhhbmNlZEFzc2V0LnJvdXRlckxpbmspO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzVGh1bWJuYWlsKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBhc3NldCBoYXMgYSB0aHVtYm5haWwgVVJMJywgKCkgPT4ge1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaGFzVGh1bWJuYWlsKG1vY2tFbmhhbmNlZEFzc2V0KSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGh1bWJuYWlsVXJsRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgdGh1bWJuYWlsIFVSTCBmb3IgdGhlIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRodW1ibmFpbFVybEZvcihtb2NrRW5oYW5jZWRBc3NldCkpLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQudGh1bWJuYWlsVXJsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc1RpdGxlKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBhc3NldCBoYXMgYSB0aXRsZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNUaXRsZShtb2NrRW5oYW5jZWRBc3NldCkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aXRsZU9mKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgdGl0bGUgb2YgdGhlIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRpdGxlT2YobW9ja0VuaGFuY2VkQXNzZXQpKS50b0VxdWFsKG1vY2tFbmhhbmNlZEFzc2V0LnRpdGxlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0Zvcm1hdFR5cGUoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIGFzc2V0IGhhcyBhIGZvcm1hdCB0eXBlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lmhhc0Zvcm1hdFR5cGUobW9ja0VuaGFuY2VkQXNzZXQpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Zvcm1hdFR5cGVPZigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGZvcm1hdCB0eXBlIGZvciB0aGUgYXNzZXQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybWF0VHlwZU9mKG1vY2tFbmhhbmNlZEFzc2V0KSkudG9FcXVhbChtb2NrRW5oYW5jZWRBc3NldC5mb3JtYXRUeXBlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Zvcm1hdENsYXNzTmFtZUZvcigpJywgKCkgPT4ge1xuXG4gICAgICBpdCgncmV0dXJucyBcImhkXCIgZm9yIFwiSGlnaCBEZWZpbml0aW9uXCInLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZm9ybWF0Q2xhc3NOYW1lRm9yKG1vY2tFbmhhbmNlZEFzc2V0KSkudG9CZSgnaGQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0R1cmF0aW9uKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBhc3NldCBoYXMgYSBkdXJhdGlvbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNEdXJhdGlvbihtb2NrRW5oYW5jZWRBc3NldCkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3ViY2xpcER1cmF0aW9uRnJhbWVGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBkdXJhdGlvbiBmcmFtZSBvYmplY3QgZm9yIHRoZSBhc3NldCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zdWJjbGlwRHVyYXRpb25GcmFtZUZvcihtb2NrRW5oYW5jZWRBc3NldCkpLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQuc3ViY2xpcER1cmF0aW9uRnJhbWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNJbWFnZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgYXNzZXQgaXMgYW4gaW1hZ2UnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaXNJbWFnZShtb2NrRW5oYW5jZWRBc3NldCkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNTdWJjbGlwcGVkKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBhc3NldCBpcyBzdWJjbGlwcGVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmlzU3ViY2xpcHBlZChtb2NrRW5oYW5jZWRBc3NldCkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdWJjbGlwU2VnbWVudFN0eWxlc0ZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgc3R5bGVzIGJhc2VkIG9uIHRoZSBhc3NldCcsICgpID0+IHtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnN1YmNsaXBTZWdtZW50U3R5bGVzRm9yKG1vY2tFbmhhbmNlZEFzc2V0KSlcbiAgICAgICAgICAudG9FcXVhbCh7XG4gICAgICAgICAgICAnbWFyZ2luLWxlZnQuJSc6IG1vY2tFbmhhbmNlZEFzc2V0LmluTWFya2VyUGVyY2VudGFnZSxcbiAgICAgICAgICAgICd3aWR0aC4lJzogbW9ja0VuaGFuY2VkQXNzZXQuc3ViY2xpcER1cmF0aW9uUGVyY2VudGFnZSxcbiAgICAgICAgICAgICdtaW4td2lkdGgucHgnOiAyXG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNEZXNjcmlwdGlvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgYXNzZXQgaGFzIGEgZGVzY3JpcHRpb24nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaGFzRGVzY3JpcHRpb24obW9ja0VuaGFuY2VkQXNzZXQpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGVzY3JpcHRpb25PZigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGRlc2NyaXB0aW9uIGZvciB0aGUgYXNzZXQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZGVzY3JpcHRpb25PZihtb2NrRW5oYW5jZWRBc3NldCkpLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQuZGVzY3JpcHRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaW5NYXJrZXJGcmFtZUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGR1cmF0aW9uIGZyYW1lIG9iamVjdCBmb3IgdGhlIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmluTWFya2VyRnJhbWVGb3IobW9ja0VuaGFuY2VkQXNzZXQpKS50b0VxdWFsKG1vY2tFbmhhbmNlZEFzc2V0LmluTWFya2VyRnJhbWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb3V0TWFya2VyRnJhbWVGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBkdXJhdGlvbiBmcmFtZSBvYmplY3QgZm9yIHRoZSBhc3NldCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vdXRNYXJrZXJGcmFtZUZvcihtb2NrRW5oYW5jZWRBc3NldCkpLnRvRXF1YWwobW9ja0VuaGFuY2VkQXNzZXQub3V0TWFya2VyRnJhbWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuQmVQdXJjaGFzZWQoKScsICgpID0+IHtcbiAgICAgIGl0KCdpcyBmYWxzZSB3aGVuIGFzc2V0IGlzIG1pc3NpbmcgYSBSaWdodHMuUmVwcm9kdWN0aW9uIG1ldGFkYXRhIGZpZWxkJywgKCkgPT4ge1xuICAgICAgICBsZXQgYXNzZXQ6IGFueSA9IHtcbiAgICAgICAgICBtZXRhRGF0YTogW1xuICAgICAgICAgICAgeyBuYW1lOiAnc29tZUtleScsIHZhbHVlOiAnc29tZVZhbHVlJyB9XG4gICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbkJlUHVyY2hhc2VkKGFzc2V0KSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2lzIGZhbHNlIHdoZW4gYXNzZXQgaGFzIGFuIHVuYWNjZXB0ZWQgdmFsdWUgaW4gdGhlIFJpZ2h0cy5SZXByb2R1Y3Rpb24gbWV0YWRhdGEgZmllbGQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBhc3NldDogYW55ID0ge1xuICAgICAgICAgIG1ldGFEYXRhOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdSaWdodHMuUmVwcm9kdWN0aW9uJywgdmFsdWU6ICdzb21lVmFsdWUyJyB9XG4gICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbkJlUHVyY2hhc2VkKGFzc2V0KSkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2lzIHRydWUgd2hlbiBSaWdodHMuUmVwcm9kdWN0aW9uIGlzIFJveWFsdHkgRnJlZSBBTkQgdGhlIGFzc2V0IGhhcyBhIHByaWNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgYXNzZXQ6IGFueSA9IHtcbiAgICAgICAgICBhc3NldElkOiAxMjM0LFxuICAgICAgICAgIG1ldGFEYXRhOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdSaWdodHMuUmVwcm9kdWN0aW9uJywgdmFsdWU6ICdSb3lhbHR5IEZyZWUnIH1cbiAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuQmVQdXJjaGFzZWQoYXNzZXQpKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdpcyB0cnVlIHdoZW4gUmlnaHRzLlJlcHJvZHVjdGlvbiBpcyBSaWdodHMgTWFuYWdlZCBBTkQgdGhlIGFzc2V0IGhhcyBhIHByaWNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgYXNzZXQ6IGFueSA9IHtcbiAgICAgICAgICBhc3NldElkOiAxMjM0LFxuICAgICAgICAgIG1ldGFEYXRhOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdSaWdodHMuUmVwcm9kdWN0aW9uJywgdmFsdWU6ICdSaWdodHMgTWFuYWdlZCcgfVxuICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5CZVB1cmNoYXNlZChhc3NldCkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb21tZW50Q291bnRGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdzZWxlY3RzIHRoZSByaWdodCBwYXJ0IG9mIHRoZSBhcHBTdG9yZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbW1lbnRDb3VudEZvcih7IHV1aWQ6ICdhYmMtMTIzJyB9IGFzIGFueSkudGFrZSgxKS5zdWJzY3JpYmUoY291bnQgPT4gZXhwZWN0KGNvdW50KS50b0JlKDMpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NhbkJlUmVtb3ZlZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBiZSBmYWxzZSBpZiBhc3NldFR5cGUgSVMgTk9UIGNvbGxlY3Rpb24gYW5kIHRoZSBhc3NldCBJUyBOT1QgaW4gdGhlIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAnc2VhcmNoJztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbjtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5CZVJlbW92ZWQobW9ja0VuaGFuY2VkQXNzZXQpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGJlIGZhbHNlIGlmIGFzc2V0VHlwZSBJUyBOT1QgY29sbGVjdGlvbiBhbmQgdGhlIGFzc2V0IElTIGluIHRoZSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRUeXBlID0gJ3NlYXJjaCc7XG4gICAgICAgIG1vY2tDb2xsZWN0aW9uLmFzc2V0cy5pdGVtcy5wdXNoKG1vY2tFbmhhbmNlZEFzc2V0KTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbjtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5CZVJlbW92ZWQobW9ja0VuaGFuY2VkQXNzZXQpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGJlIGZhbHNlIGlmIGFzc2V0VHlwZSBJUyBjb2xsZWN0aW9uIGFuZCB0aGUgYXNzZXQgSVMgTk9UIGluIHRoZSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRUeXBlID0gJ2NvbGxlY3Rpb24nO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWN0aXZlQ29sbGVjdGlvbiA9IG1vY2tDb2xsZWN0aW9uO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbkJlUmVtb3ZlZChtb2NrRW5oYW5jZWRBc3NldCkpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgYmUgdHJ1ZSBpZiBhc3NldFR5cGUgSVMgY29sbGVjdGlvbiBhbmQgdGhlIGFzc2V0IElTIGluIHRoZSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRUeXBlID0gJ2NvbGxlY3Rpb24nO1xuICAgICAgICBtb2NrQ29sbGVjdGlvbi5hc3NldHMuaXRlbXMucHVzaChtb2NrRW5oYW5jZWRBc3NldCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hY3RpdmVDb2xsZWN0aW9uID0gbW9ja0NvbGxlY3Rpb247XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FuQmVSZW1vdmVkKG1vY2tFbmhhbmNlZEFzc2V0KSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NhbkJlQWRkZWRBZ2FpbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBiZSBmYWxzZSBpZiBhc3NldFR5cGUgSVMgTk9UIGNvbGxlY3Rpb24gYW5kIHRoZSBhc3NldCBJUyBOT1QgaW4gdGhlIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAnc2VhcmNoJztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbjtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5CZUFkZGVkQWdhaW4obW9ja0VuaGFuY2VkQXNzZXQpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGJlIHRydWUgaWYgYXNzZXRUeXBlIElTIE5PVCBjb2xsZWN0aW9uIGFuZCB0aGUgYXNzZXQgSVMgaW4gdGhlIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAnc2VhcmNoJztcbiAgICAgICAgbW9ja0NvbGxlY3Rpb24uYXNzZXRzLml0ZW1zLnB1c2gobW9ja0VuaGFuY2VkQXNzZXQpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWN0aXZlQ29sbGVjdGlvbiA9IG1vY2tDb2xsZWN0aW9uO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNhbkJlQWRkZWRBZ2Fpbihtb2NrRW5oYW5jZWRBc3NldCkpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBiZSBmYWxzZSBpZiBhc3NldFR5cGUgSVMgY29sbGVjdGlvbiBhbmQgdGhlIGFzc2V0IElTIE5PVCBpbiB0aGUgY29sbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0VHlwZSA9ICdjb2xsZWN0aW9uJztcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbjtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5CZUFkZGVkQWdhaW4obW9ja0VuaGFuY2VkQXNzZXQpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGJlIGZhbHNlIGlmIGFzc2V0VHlwZSBJUyBjb2xsZWN0aW9uIGFuZCB0aGUgYXNzZXQgSVMgaW4gdGhlIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAnY29sbGVjdGlvbic7XG4gICAgICAgIG1vY2tDb2xsZWN0aW9uLmFzc2V0cy5pdGVtcy5wdXNoKG1vY2tFbmhhbmNlZEFzc2V0KTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbjtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYW5CZUFkZGVkQWdhaW4obW9ja0VuaGFuY2VkQXNzZXQpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuIl19
