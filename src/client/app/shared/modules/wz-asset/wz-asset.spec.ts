import { Observable } from 'rxjs/Observable';
import { WzAsset } from './wz-asset';
import { Collection } from '../../interfaces/collection.interface';
import { Asset } from '../../interfaces/common.interface';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

import * as EnhancedMock from '../../interfaces/enhanced-asset';
import { mockAsset } from '../../mocks/mock-asset';

export function main() {
  describe('Wz Asset Base Class', () => {
    let componentUnderTest: WzAsset;
    let mockStore: MockAppStore;
    let mockCollection: Collection;
    let mockEnhancedAsset: EnhancedMock.EnhancedAsset;

    beforeEach(() => {
      mockCollection = {
        name: 'testCollection', createdOn: null, lastUpdated: null, id: 1, siteName: 'test', owner: 1, assets: {
          items: [{ assetId: 1234, uuid: 'mockAssetuuid1', name: '' }, { assetId: 1235, uuid: 'mockAssetuuid2', name: '' },
          { assetId: 1236, uuid: 'mockAssetuuid3', name: '' }]
        }
      };

      mockEnhancedAsset = EnhancedMock.enhanceAsset(mockAsset, 'search');
      mockStore = new MockAppStore();
      mockStore.createStateSection('speedPreview', { 1234: { price: 100 } });
      mockStore.createStateElement('comment', 'counts', { 'abc-123': 3 });
      mockStore.createStateSection('uiConfig', {
        components: { search: { config: { showAssetNameGridView: { value: 'true' } } } }
      });
      componentUnderTest = new WzAsset(mockStore, null);
      componentUnderTest.assets = [EnhancedMock.enhanceAsset(mockAsset, 'search')];
    });

    describe('ngOnInit()', () => {
      it('Should call the ui config and set variable showAssetName from ui config', () => {
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.showAssetName).toBe(true);
      });
    });

    describe('assets getter', () => {
      it('returns the original input assets', () => {
        expect(componentUnderTest.assets).toEqual([mockEnhancedAsset]);
      });
    });

    describe('addToActiveCollection()', () => {
      it('dispatches the expected action', () => {
        const mockAsset: any = { some: 'asset' };
        const spy = mockStore.createActionFactoryMethod('activeCollection', 'addAsset');

        componentUnderTest.addToActiveCollection(mockEnhancedAsset);

        mockStore.expectDispatchFor(spy, mockEnhancedAsset);
      });
    });

    describe('addToDifferentCollection()', () => {
      it('emits the onAddtoDifferentCollection event with the asset', () => {
        spyOn(componentUnderTest.onAddtoDifferentCollection, 'emit');
        componentUnderTest.addToDifferentCollection({ some: 'asset' } as any);
        expect(componentUnderTest.onAddtoDifferentCollection.emit).toHaveBeenCalledWith({ some: 'asset' });
      });
    });

    describe('canAddToDifferentCollection()', () => {
      it('Returns true if assetType is collection and user has haveCollections permission', () => {
        componentUnderTest.assetType = 'collection';
        let userCan = { haveCollections: () => true };
        componentUnderTest.userCan = userCan as any;
        expect(componentUnderTest.canAddToDifferentCollection).toBe(true);
      });

      it('Returns false if assetType is collection but user has no haveCollections permission', () => {
        componentUnderTest.assetType = 'collection';
        let userCan = { haveCollections: () => false };
        componentUnderTest.userCan = userCan as any;
        expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
      });

      it('Returns false if assetType is not collection and user has haveCollections permission', () => {
        componentUnderTest.assetType = 'search';
        let userCan = { haveCollections: () => true };
        componentUnderTest.userCan = userCan as any;
        expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
      });

      it('Returns true if assetType is not collection and user has no haveCollections permission', () => {
        componentUnderTest.assetType = 'search';
        let userCan = { haveCollections: () => false };
        componentUnderTest.userCan = userCan as any;
        expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
      });
    });

    describe('removeFromActiveCollection()', () => {
      it('dispatches the expected action', () => {
        const mockAsset: any = { some: 'asset' };
        const spy = mockStore.createActionFactoryMethod('activeCollection', 'removeAsset');

        componentUnderTest.removeFromActiveCollection(mockEnhancedAsset);

        mockStore.expectDispatchFor(spy, mockEnhancedAsset);
      });
    });

    describe('addAssetToCart()', () => {
      it('Should set the new active asset', () => {
        spyOn(componentUnderTest, 'setAssetActiveId');
        componentUnderTest.addAssetToCart(mockEnhancedAsset);
        expect(componentUnderTest.setAssetActiveId).toHaveBeenCalledWith(mockEnhancedAsset);
      });

      it('Should emit an event to add an asset to the cart', () => {
        spyOn(componentUnderTest.onAddToCart, 'emit');
        componentUnderTest.addAssetToCart(mockEnhancedAsset);
        expect(componentUnderTest.onAddToCart.emit).toHaveBeenCalledWith(mockEnhancedAsset);
      });
    });

    describe('removeFromCollection()', () => {
      it('Should emit an event to edit an asset', () => {
        spyOn(componentUnderTest.onEditAsset, 'emit');
        componentUnderTest.editAsset(mockEnhancedAsset);
        expect(componentUnderTest.onEditAsset.emit).toHaveBeenCalledWith(mockEnhancedAsset);
      });
    });

    describe('inCollection()', () => {
      beforeEach(() => componentUnderTest.activeCollection = mockCollection);

      it('Should return true if an asset is already in the current collection', () => {
        expect(componentUnderTest.inCollection({ assetId: 1234, uuid: 'mockAssetuuid1', name: '' })).toBe(true);
      });

      it('Should return false if an asset is not in the current collection', () => {
        expect(componentUnderTest.inCollection({ assetId: 12334, uuid: 'mockAssetuuid1', name: '' })).toBe(false);
      });
    });

    describe('nameOf()', () => {
      it('returns the name of the enhanced asset', () => {
        expect(componentUnderTest.nameOf(mockEnhancedAsset)).toEqual(mockEnhancedAsset.name);
      });
    });

    describe('routerLinkFor()', () => {
      it('returns the enhanced asset\'s router link array', () => {
        expect(componentUnderTest.routerLinkFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.routerLink);
      });
    });

    describe('hasThumbnail()', () => {
      it('returns true if the asset has a thumbnail URL', () => {

        expect(componentUnderTest.hasThumbnail(mockEnhancedAsset)).toBe(true);
      });

    });

    describe('thumbnailUrlFor()', () => {
      it('returns the thumbnail URL for the asset', () => {
        expect(componentUnderTest.thumbnailUrlFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.thumbnailUrl);
      });
    });

    describe('hasTitle()', () => {
      it('returns true if the asset has a title', () => {
        expect(componentUnderTest.hasTitle(mockEnhancedAsset)).toBe(true);
      });
    });

    describe('titleOf()', () => {
      it('returns the title of the asset', () => {
        expect(componentUnderTest.titleOf(mockEnhancedAsset)).toEqual(mockEnhancedAsset.title);
      });
    });

    describe('hasFormatType()', () => {
      it('returns true if the asset has a format type', () => {
        expect(componentUnderTest.hasFormatType(mockEnhancedAsset)).toBe(false);
      });
    });

    describe('formatTypeOf()', () => {
      it('returns the format type for the asset', () => {
        expect(componentUnderTest.formatTypeOf(mockEnhancedAsset)).toEqual(mockEnhancedAsset.formatType);
      });
    });

    describe('formatClassNameFor()', () => {

      it('returns "hd" for "High Definition"', () => {
        expect(componentUnderTest.formatClassNameFor(mockEnhancedAsset)).toBe('hd');
      });
    });

    describe('hasDuration()', () => {
      it('returns true if the asset has a duration', () => {
        expect(componentUnderTest.hasDuration(mockEnhancedAsset)).toBe(false);
      });
    });

    describe('subclipDurationFrameFor()', () => {
      it('returns the duration frame object for the asset', () => {
        expect(componentUnderTest.subclipDurationFrameFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.subclipDurationFrame);
      });
    });

    describe('isImage()', () => {
      it('returns true if the asset is an image', () => {
        expect(componentUnderTest.isImage(mockEnhancedAsset)).toBe(false);
      });
    });

    describe('isSubclipped()', () => {
      it('returns true if the asset is subclipped', () => {
        expect(componentUnderTest.isSubclipped(mockEnhancedAsset)).toBe(true);
      });
    });

    describe('subclipSegmentStylesFor()', () => {
      it('returns styles based on the asset', () => {

        expect(componentUnderTest.subclipSegmentStylesFor(mockEnhancedAsset))
          .toEqual({
            'margin-left.%': mockEnhancedAsset.inMarkerPercentage,
            'width.%': mockEnhancedAsset.subclipDurationPercentage,
            'min-width.px': 2
          });
      });
    });

    describe('hasDescription()', () => {
      it('returns true if the asset has a description', () => {
        expect(componentUnderTest.hasDescription(mockEnhancedAsset)).toBe(true);
      });
    });

    describe('descriptionOf()', () => {
      it('returns the description for the asset', () => {
        expect(componentUnderTest.descriptionOf(mockEnhancedAsset)).toEqual(mockEnhancedAsset.description);
      });
    });

    describe('inMarkerFrameFor()', () => {
      it('returns the duration frame object for the asset', () => {
        expect(componentUnderTest.inMarkerFrameFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.inMarkerFrame);
      });
    });

    describe('outMarkerFrameFor()', () => {
      it('returns the duration frame object for the asset', () => {
        expect(componentUnderTest.outMarkerFrameFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.outMarkerFrame);
      });
    });

    describe('canBePurchased()', () => {
      it('is false when asset is missing a Rights.Reproduction metadata field', () => {
        let asset: any = {
          metaData: [
            { name: 'someKey', value: 'someValue' }
          ]
        };
        expect(componentUnderTest.canBePurchased(asset)).toBe(false);
      });

      it('is false when asset has an unaccepted value in the Rights.Reproduction metadata field', () => {
        let asset: any = {
          metaData: [
            { name: 'Rights.Reproduction', value: 'someValue2' }
          ]
        };
        expect(componentUnderTest.canBePurchased(asset)).toBe(false);
      });

      it('is true when Rights.Reproduction is Royalty Free AND the asset has a price', () => {
        let asset: any = {
          assetId: 1234,
          metaData: [
            { name: 'Rights.Reproduction', value: 'Royalty Free' }
          ]
        };
        expect(componentUnderTest.canBePurchased(asset)).toBe(true);
      });

      it('is true when Rights.Reproduction is Rights Managed AND the asset has a price', () => {
        let asset: any = {
          assetId: 1234,
          metaData: [
            { name: 'Rights.Reproduction', value: 'Rights Managed' }
          ]
        };
        expect(componentUnderTest.canBePurchased(asset)).toBe(true);
      });
    });

    describe('commentCountFor()', () => {
      it('selects the right part of the appStore', () => {
        componentUnderTest.commentCountFor({ uuid: 'abc-123' } as any).take(1).subscribe(count => expect(count).toBe(3));
      });
    });

    describe('canBeRemoved()', () => {
      it('Should be false if assetType IS NOT collection and the asset IS NOT in the collection', () => {
        componentUnderTest.assetType = 'search';
        componentUnderTest.activeCollection = mockCollection;
        expect(componentUnderTest.canBeRemoved(mockEnhancedAsset)).toBe(false);
      });

      it('Should be false if assetType IS NOT collection and the asset IS in the collection', () => {
        componentUnderTest.assetType = 'search';
        mockCollection.assets.items.push(mockEnhancedAsset);
        componentUnderTest.activeCollection = mockCollection;
        expect(componentUnderTest.canBeRemoved(mockEnhancedAsset)).toBe(false);
      });

      it('Should be false if assetType IS collection and the asset IS NOT in the collection', () => {
        componentUnderTest.assetType = 'collection';
        componentUnderTest.activeCollection = mockCollection;
        expect(componentUnderTest.canBeRemoved(mockEnhancedAsset)).toBe(false);
      });

      it('Should be true if assetType IS collection and the asset IS in the collection', () => {
        componentUnderTest.assetType = 'collection';
        mockCollection.assets.items.push(mockEnhancedAsset);
        componentUnderTest.activeCollection = mockCollection;
        expect(componentUnderTest.canBeRemoved(mockEnhancedAsset)).toBe(true);
      });
    });

    describe('canBeAddedAgain()', () => {
      it('Should be false if assetType IS NOT collection and the asset IS NOT in the collection', () => {
        componentUnderTest.assetType = 'search';
        componentUnderTest.activeCollection = mockCollection;
        expect(componentUnderTest.canBeAddedAgain(mockEnhancedAsset)).toBe(false);
      });

      it('Should be true if assetType IS NOT collection and the asset IS in the collection', () => {
        componentUnderTest.assetType = 'search';
        mockCollection.assets.items.push(mockEnhancedAsset);
        componentUnderTest.activeCollection = mockCollection;
        expect(componentUnderTest.canBeAddedAgain(mockEnhancedAsset)).toBe(true);
      });

      it('Should be false if assetType IS collection and the asset IS NOT in the collection', () => {
        componentUnderTest.assetType = 'collection';
        componentUnderTest.activeCollection = mockCollection;
        expect(componentUnderTest.canBeAddedAgain(mockEnhancedAsset)).toBe(false);
      });

      it('Should be false if assetType IS collection and the asset IS in the collection', () => {
        componentUnderTest.assetType = 'collection';
        mockCollection.assets.items.push(mockEnhancedAsset);
        componentUnderTest.activeCollection = mockCollection;
        expect(componentUnderTest.canBeAddedAgain(mockEnhancedAsset)).toBe(false);
      });
    });
  });
}

