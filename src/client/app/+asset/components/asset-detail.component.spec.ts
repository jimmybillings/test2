import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { Observable } from 'rxjs/Observable';
import { AssetDetailComponent } from './asset-detail.component';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';
import { enhanceAsset, AssetType } from '../../shared/interfaces/enhanced-asset';
import { mockAsset } from '../../shared/mocks/mock-asset';
import { Asset } from '../../shared/interfaces/common.interface';
import { Frame } from '../../shared/modules/wazee-frame-formatter/index';


export function main() {
  describe('Asset Detail Component', () => {
    let componentUnderTest: AssetDetailComponent;
    let mockStore: MockAppStore;
    let asset: any;
    let collection: any;
    let transcodeTargets: any;
    let detailTypeMap: any;
    let finalAsset: any;

    beforeEach(() => {
      collection = {
        assets: {
          items: [
            { assetId: 1, uuid: 'ABCD', timeStart: 123, timeEnd: 1000 },
            { assetId: 1, uuid: 'EFGH', timeStart: 456, timeEnd: 1000 },
            { assetId: 1, uuid: 'IJKL', timeStart: 789, timeEnd: 1000 },
            { assetId: 1, uuid: 'MNOP', timeStart: 102, timeEnd: 1000 },
            { assetId: 1, uuid: 'QRST', timeStart: 103, timeEnd: 1000 }
          ]
        }
      };

      transcodeTargets = ['master_copy', '1080i', '1080p'];

      detailTypeMap = {
        common: ['field'], filter: true, id: 13, name: 'Core Packages', primary: [], secondary: [], siteName: 'core'
      };

      finalAsset = {
        assetId: 1, clipData: [], clipThumbnailUrl: 'clipUrl.jpg', clipUrl: 'clipUrl',
        transcodeTargets: ['master_copy', '1080i', '1080p']

      };
      asset = { assetId: 1, timeStart: 102, timeEnd: 1000, clipData: [], clipThumbnailUrl: 'clipUrl.jpg', clipUrl: 'clipUrl' };
      asset.detailTypeMap = detailTypeMap;
      asset.transcodeTargets = transcodeTargets;

      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', {
        components: {
          global: { config: { pageSize: { value: '50' } } },
          assetSharing: { config: { form: { items: [] } } }
        }
      });
      mockStore.createStateSection('asset', { activeAsset: { assetId: 1234, price: 99 } });

      componentUnderTest = new AssetDetailComponent(mockStore);

      componentUnderTest.asset = {
        assetId: 1, clipData: [], clipThumbnailUrl: 'clipUrl.jpg', clipUrl: 'clipUrl', transcodeTargets: transcodeTargets
      } as any;

      componentUnderTest.window = window;
      componentUnderTest.subclipMarkers = undefined;
      componentUnderTest.userCan = { administerQuotes: () => false, editCollections: () => true } as any;
    });

    describe('asset setter', () => {
      it('sets the component\'s asset property', () => {
        componentUnderTest.asset = asset;

        expect(componentUnderTest.asset).toEqual(asset);
      });

      it('initializes the selectedTarget property to the first target in the array', () => {
        componentUnderTest.asset = asset;

        expect(componentUnderTest.selectedTarget).toEqual('master_copy');
      });
    });

    describe('addAssetToActiveCollection()', () => {
      it('dispatches the expected action', () => {
        const spy = mockStore.createActionFactoryMethod('activeCollection', 'addAsset');
        componentUnderTest.addAssetToActiveCollection();
        mockStore.expectDispatchFor(spy, componentUnderTest.asset, null);
      });
      it('with subclipping defined dispatches the expected action', () => {
        componentUnderTest.subclipMarkers = { in: {}, out: {} } as any;
        const spy = mockStore.createActionFactoryMethod('activeCollection', 'addAsset');
        componentUnderTest.addAssetToActiveCollection();
        mockStore.expectDispatchFor(spy, componentUnderTest.asset, { in: {}, out: {} });
      });
    });

    describe('removeAssetFromActiveCollection()', () => {
      it('dispatches the confirmation prompt', () => {
        const spy = mockStore.createActionFactoryMethod('dialog', 'showConfirmation');
        componentUnderTest.removeAssetFromActiveCollection();
        mockStore.expectDispatchFor(spy, {
          title: 'COLLECTION.REMOVE_ASSET.TITLE',
          message: 'COLLECTION.REMOVE_ASSET.MESSAGE',
          accept: 'COLLECTION.REMOVE_ASSET.ACCEPT',
          decline: 'COLLECTION.REMOVE_ASSET.DECLINE'
        }, jasmine.any(Function));
      });

      it('dispatches the correct action via the onAccept callback', () => {
        const dialogSpy: any = mockStore.createActionFactoryMethod('dialog', 'showConfirmation');
        const removeSpy: any = mockStore.createActionFactoryMethod('activeCollection', 'removeAsset');
        dialogSpy.and.callFake((_: any, onAcceptCallback: Function) => {
          dialogSpy.onAcceptCallback = onAcceptCallback;
        });
        componentUnderTest.removeAssetFromActiveCollection();
        dialogSpy.onAcceptCallback();
        mockStore.expectDispatchFor(removeSpy, componentUnderTest.asset);
      });
    });

    describe('updateAssetInActiveCollection()', () => {
      it('dispatches the expected action', () => {
        const startFrame = new Frame(25).setFromFrameNumber(1);
        const endFrame = new Frame(25).setFromFrameNumber(2);
        componentUnderTest.subclipMarkers = { in: startFrame, out: endFrame } as any;
        const spy = mockStore.createActionFactoryMethod('activeCollection', 'updateAssetMarkers');
        componentUnderTest.updateAssetInActiveCollection();
        mockStore.expectDispatchFor(spy, componentUnderTest.asset, componentUnderTest.subclipMarkers);
      });
    });

    describe('addAssetToCart()', () => {
      it('Should emit an event to add an asset to the cart/quote without subclipping', () => {
        componentUnderTest.asset = { assetId: 1234, transcodeTargets: transcodeTargets } as any;
        spyOn(componentUnderTest.addToCart, 'emit');
        componentUnderTest.addAssetToCart();
        expect(componentUnderTest.addToCart.emit)
          .toHaveBeenCalledWith({ assetId: 1234, markers: null, selectedTranscodeTarget: 'master_copy' });
      });

      it('Should emit an event to add an asset to the cart/quote with subclipping', () => {
        componentUnderTest.asset = { assetId: 1234, transcodeTargets: transcodeTargets } as any;
        componentUnderTest.subclipMarkers = { in: {}, out: {} } as any;

        spyOn(componentUnderTest.addToCart, 'emit');
        componentUnderTest.addAssetToCart();
        expect(componentUnderTest.addToCart.emit)
          .toHaveBeenCalledWith({
            assetId: 1234, markers: { in: {}, out: {} }, selectedTranscodeTarget: 'master_copy'
          });
      });
    });

    describe('previousPage()', () => {
      it('Should emit an event to go back to the previous page', () => {
        spyOn(componentUnderTest.onPreviousPage, 'emit');
        componentUnderTest.previousPage();
        expect(componentUnderTest.onPreviousPage.emit)
          .toHaveBeenCalled();
      });
    });

    describe('hasPageHistory', () => {
      it('Should return false if the browser has not yet loaded previous page history', () => {
        expect(componentUnderTest.hasPageHistory).toBe(false);
      });

      it('Should return true if the browser has loaded previous page history', () => {
        componentUnderTest.window.history.pushState({ data: 'somedata1' }, 'test1');
        componentUnderTest.window.history.pushState({ data: 'somedata2' }, 'test2');
        componentUnderTest.window.history.pushState({ data: 'somedata3' }, 'test3');
        expect(componentUnderTest.hasPageHistory).toBe(true);
      });
    });

    describe('canComment getter', () => {
      it('returns false when the asset is a search', () => {
        componentUnderTest.asset = { type: 'search' } as any;
        expect(componentUnderTest.canComment).toBe(false);
      });

      it('returns true when comment form config does exist', () => {
        ['cart', 'quoteEdit', 'quoteShow', 'collection', 'order'].forEach(type => {
          componentUnderTest.asset = { type } as any;
          expect(componentUnderTest.canComment).toBe(true);
        });
      });
    });

    describe('canShare getter', () => {
      const tests: { assetType: AssetType, userCanShare: boolean, expectedResult: boolean }[] = [
        { assetType: 'cart', userCanShare: true, expectedResult: false },
        { assetType: 'collection', userCanShare: true, expectedResult: false },
        { assetType: 'order', userCanShare: true, expectedResult: false },
        { assetType: 'quoteEdit', userCanShare: true, expectedResult: false },
        { assetType: 'quoteShow', userCanShare: true, expectedResult: false },
        { assetType: 'search', userCanShare: true, expectedResult: true }
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}'`, () => {
          componentUnderTest.asset = enhanceAsset({} as any, test.assetType);
          componentUnderTest.userCan = { createAccessInfo: () => test.userCanShare } as any;

          expect(componentUnderTest.canShare).toBe(test.expectedResult);
        });
      });
    });

    describe('showAdvancedPlayer getter', () => {
      it('returns true if the user can view the advanced player', () => {
        componentUnderTest.userCan = { viewAdvancedPlayer: () => true } as any;
        expect(componentUnderTest.showAdvancedPlayer).toBe(true);
      });

      it('returns false if the user cannot view the advanced player', () => {
        componentUnderTest.userCan = { viewAdvancedPlayer: () => false } as any;
        expect(componentUnderTest.showAdvancedPlayer).toBe(false);
      });
    });

    describe('shareButtonLabelKey getter', () => {
      const tests: { markers: any, expectedKey: string }[] = [
        { markers: undefined, expectedKey: 'ASSET.DETAIL.SHARING_BTN_TITLE' },
        { markers: null, expectedKey: 'ASSET.DETAIL.SHARING_BTN_TITLE' },
        { markers: { in: 'x' }, expectedKey: 'ASSET.DETAIL.SHARING_BTN_TITLE' },
        { markers: { in: 'x', out: null }, expectedKey: 'ASSET.DETAIL.SHARING_BTN_TITLE' },
        { markers: { out: 'y' }, expectedKey: 'ASSET.DETAIL.SHARING_BTN_TITLE' },
        { markers: { in: null, out: 'y' }, expectedKey: 'ASSET.DETAIL.SHARING_BTN_TITLE' },
        { markers: { in: 'x', out: 'y' }, expectedKey: 'ASSET.DETAIL.SHARING_SUBCLIP_BTN_TITLE' }
      ];

      tests.forEach(test => {
        it(`returns '${test.expectedKey}' for markers = ${test.markers}`, () => {
          componentUnderTest.subclipMarkers = test.markers;

          expect(componentUnderTest.shareButtonLabelKey).toEqual(test.expectedKey);
        });
      });
    });

    describe('rights getter', () => {
      it('returns the value of Rights.Reproduction metadata in the asset', () => {
        componentUnderTest.asset =
          enhanceAsset({ primary: [{ name: 'Rights.Reproduction', value: 'some value' }] } as any, 'search');

        expect(componentUnderTest.rights).toEqual('some value');
      });
    });

    describe('canShowPrice()', () => {
      it('Returns true if its a rights managed asset with a valid price', () => {
        componentUnderTest.asset = enhanceAsset(
          { price: 100, primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );
        componentUnderTest.usagePrice = 100;
        expect(componentUnderTest.canShowPrice).toBe(true);
      });

      it('Returns true if its a royalty free asset with a valid price', () => {
        componentUnderTest.asset = enhanceAsset(
          { price: 100, primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }] } as any,
          'search'
        );
        expect(componentUnderTest.canShowPrice).toBe(true);
      });

      it('Returns false if its a rights managed asset with no price', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );
        componentUnderTest.usagePrice = undefined;
        expect(componentUnderTest.canShowPrice).toBe(false);
      });

      it('Returns false if its a royalty free asset with no price', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }] } as any,
          'search'
        );
        expect(componentUnderTest.canShowPrice).toBe(false);
      });
    });

    describe('canShowNoPricingAvailableNotice()', () => {
      it('Returns true if its a rights managed asset with no price property', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );
        expect(componentUnderTest.canShowNoPricingAvailableNotice).toBe(true);
      });

      it('Returns false if its a rights managed asset with a price property', () => {
        componentUnderTest.asset = enhanceAsset(
          { price: 100, primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );
        expect(componentUnderTest.canShowNoPricingAvailableNotice).toBe(false);
      });

      it('Returns true if its a Royalty Free asset with no price property', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }] } as any,
          'search'
        );
        expect(componentUnderTest.canShowNoPricingAvailableNotice).toBe(true);
      });

      it('Returns false if its a Royalty Free asset with no price property', () => {
        componentUnderTest.asset = enhanceAsset(
          { price: 100, primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }] } as any,
          'search'
        );
        expect(componentUnderTest.canShowNoPricingAvailableNotice).toBe(false);
      });
    });

    describe('price getters', () => {
      const tests = [
        { rights: 'Royalty Free', price: 12.34, usagePrice: null as any, expectedResult: 12.34 },
        { rights: 'Royalty Free', price: null, usagePrice: null, expectedResult: null },
        { rights: 'Royalty Free', price: 0, usagePrice: null, expectedResult: null },

        { rights: 'Royalty Free', price: 12.34, usagePrice: 56.78, expectedResult: 12.34 },
        { rights: 'Royalty Free', price: null, usagePrice: 56.78, expectedResult: null },
        { rights: 'Royalty Free', price: 0, usagePrice: 56.78, expectedResult: null },

        { rights: 'Rights Managed', price: 12.34, usagePrice: null as any, expectedResult: null as any, hasAttributes: true },
        { rights: 'Rights Managed', price: null, usagePrice: null, expectedResult: null },
        { rights: 'Rights Managed', price: 0, usagePrice: null, expectedResult: null },

        { rights: 'Rights Managed', price: 12.34, usagePrice: 56.78, expectedResult: 56.78 },
        { rights: 'Rights Managed', price: null, usagePrice: 56.78, expectedResult: 56.78 },
        { rights: 'Rights Managed', price: 0, usagePrice: 56.78, expectedResult: 56.78 },

        { rights: null, price: 12.34, usagePrice: null, expectedResult: null },
        { rights: null, price: null, usagePrice: null, expectedResult: null },
        { rights: null, price: 0, usagePrice: null, expectedResult: null },

        { rights: null, price: 12.34, usagePrice: 56.78, expectedResult: null },
        { rights: null, price: null, usagePrice: 56.78, expectedResult: null },
        { rights: null, price: 0, usagePrice: 56.78, expectedResult: null }
      ];

      tests.forEach(test => {
        const rights: string = `${test.rights ? test.rights : 'no rights'}`;

        describe(`for a ${rights} asset`, () => {
          const price: string = (test.hasOwnProperty('price') && test.price > 0) ? `price = ${test.price}` : 'no price';
          const usagePrice: string = test.usagePrice ? `usage price = ${test.usagePrice}` : 'no usage price';

          it(`returns ${test.expectedResult} for ${price} and ${usagePrice}`, () => {
            componentUnderTest.asset = enhanceAsset(
              { price: test.price, primary: [{ name: 'Rights.Reproduction', value: test.rights }] } as any,
              'search'
            );
            componentUnderTest.usagePrice = test.usagePrice;

            expect(componentUnderTest.price).toBe(test.expectedResult);
          });
        });
      });
    });

    describe('canPerformCartActions getter', () => {
      const tests = [
        { haveCart: true, rights: 'Royalty Free', price: 12.34, expectedResult: true },
        { haveCart: true, rights: 'Royalty Free', price: 0, expectedResult: true },
        { haveCart: true, rights: 'Royalty Free', price: 'NotAProperty', expectedResult: false },

        { haveCart: true, rights: 'Rights Managed', price: 12.34, expectedResult: true },
        { haveCart: true, rights: 'Rights Managed', price: 0, expectedResult: true },
        { haveCart: true, rights: 'Rights Managed', price: 'NotAProperty', expectedResult: false },

        { haveCart: true, rights: null, price: 12.34, expectedResult: false },
        { haveCart: true, rights: null, price: 0, expectedResult: false },
        { haveCart: true, rights: null, price: null, expectedResult: false },

        { haveCart: false, rights: 'Royalty Free', price: 12.34, expectedResult: false },
        { haveCart: false, rights: 'Royalty Free', price: 0, expectedResult: false },
        { haveCart: false, rights: 'Royalty Free', price: null, expectedResult: false },

        { haveCart: false, rights: 'Rights Managed', price: 12.34, expectedResult: false },
        { haveCart: false, rights: 'Rights Managed', price: 0, expectedResult: false },
        { haveCart: false, rights: 'Rights Managed', price: null, expectedResult: false },

        { haveCart: false, rights: null, price: 12.34, expectedResult: false },
        { haveCart: false, rights: null, price: 0, expectedResult: false },
        { haveCart: false, rights: null, price: null, expectedResult: false },
      ];

      tests.forEach(test => {
        const withWithout: string = test.haveCart ? 'with' : 'without';
        const rights: string = test.rights ? test.rights : 'no rights';
        let price: string = (test.price === 0 || !!test.price) ? `price = ${test.price}` : 'no price';
        price = (test.price !== 'NotAProperty') ? price : 'No price property';
        it(`returns ${test.expectedResult} ${withWithout} haveCart capability and a ${rights} asset with ${price}`, () => {
          componentUnderTest.userCan = { haveCart: () => test.haveCart } as any;
          if (test.price === 'NotAProperty') {
            componentUnderTest.asset = enhanceAsset(
              { primary: [{ name: 'Rights.Reproduction', value: test.rights }] } as any,
              'search'
            );
          } else {
            componentUnderTest.asset = enhanceAsset(
              { price: test.price, primary: [{ name: 'Rights.Reproduction', value: test.rights }] } as any,
              'search'
            );
          }
          expect(componentUnderTest.canPerformCartActions).toBe(test.expectedResult);
        });
      });
    });

    describe('canSelectTranscodeTarget getter', () => {
      beforeEach(() => {
        componentUnderTest.userCan = { addToCart: () => true } as any;
        componentUnderTest.asset = enhanceAsset(
          { transcodeTargets: { some: 'targets' }, primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }] } as any,
          'search'
        );
      });

      it('returns true for a royalty free asset with transcode targets and addToCart capability', () => {
        expect(componentUnderTest.canSelectTranscodeTarget).toBe(true);
      });

      it('returns false for a non-royalty free asset', () => {
        componentUnderTest.asset = enhanceAsset(
          { transcodeTargets: { some: 'targets' }, primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );

        expect(componentUnderTest.canSelectTranscodeTarget).toBe(false);
      });

      it('returns false for an asset without transcode targets', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );

        expect(componentUnderTest.canSelectTranscodeTarget).toBe(false);
      });

      it('returns false without addToCart capability', () => {
        componentUnderTest.userCan = { addToCart: () => false } as any;

        expect(componentUnderTest.canSelectTranscodeTarget).toBe(false);
      });
    });

    describe('canCalculatePrice getter', () => {
      beforeEach(() => {
        componentUnderTest.userCan = { calculatePrice: () => true } as any;
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );
      });

      it('returns true for a rights managed asset and calculatePrice capability', () => {
        expect(componentUnderTest.canEditOrApplyRights).toBe(true);
      });

      it('returns false for a non-rights managed asset', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }] } as any,
          'search'
        );

        expect(componentUnderTest.canEditOrApplyRights).toBe(false);
      });

      it('returns false without calculatePrice capability', () => {
        componentUnderTest.userCan = { calculatePrice: () => false } as any;

        expect(componentUnderTest.canSelectTranscodeTarget).toBe(false);
      });
    });

    describe('canUpdateCart getter', () => {
      const tests: { assetType: AssetType, expectedResult: boolean }[] = [
        { assetType: 'cart', expectedResult: true },
        { assetType: 'collection', expectedResult: false },
        { assetType: 'order', expectedResult: false },
        { assetType: 'quoteEdit', expectedResult: true },
        { assetType: 'quoteShow', expectedResult: false },
        { assetType: 'search', expectedResult: false },
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}'`, () => {
          componentUnderTest.asset = enhanceAsset({} as any, test.assetType);

          expect(componentUnderTest.canUpdateCartAsset).toBe(test.expectedResult);
        });
      });
    });

    describe('canUpdateCollectionAsset getter', () => {
      const tests: { assetType: AssetType, expectedResult: boolean }[] = [
        { assetType: 'cart', expectedResult: false },
        { assetType: 'collection', expectedResult: true },
        { assetType: 'order', expectedResult: false },
        { assetType: 'quoteEdit', expectedResult: false },
        { assetType: 'quoteShow', expectedResult: false },
        { assetType: 'search', expectedResult: false },
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}'`, () => {
          componentUnderTest.asset = enhanceAsset({} as any, test.assetType);

          expect(componentUnderTest.canUpdateCollectionAsset).toBe(test.expectedResult);
        });
      });
    });

    describe('canEditCollectionSubclipMarkers getter', () => {
      const tests: { markers: boolean, assetType: AssetType, expectedResult: boolean }[] = [
        { markers: true, assetType: 'cart', expectedResult: false },
        { markers: true, assetType: 'collection', expectedResult: true },
        { markers: false, assetType: 'collection', expectedResult: false },
        { markers: true, assetType: 'order', expectedResult: false },
        { markers: true, assetType: 'quoteEdit', expectedResult: false },
        { markers: true, assetType: 'quoteShow', expectedResult: false },
        { markers: true, assetType: 'search', expectedResult: false },
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}'` +
          ` and subclip markers are ${test.markers ? '' : 'not '}defined `, () => {
            componentUnderTest.asset = enhanceAsset({} as any, test.assetType);
            if (test.markers) componentUnderTest.subclipMarkers = { in: { some: 'frame' }, out: { some: 'frame' } } as any;

            expect(componentUnderTest.canEditCollectionSubclipMarkers).toBe(test.expectedResult);
          });
      });
    });

    describe('collectionSubclipButtonHoverTxt getter', () => {
      const tests: { active: boolean, isSubclipped: boolean, expectedKey: string }[] = [
        { active: true, isSubclipped: true, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.SUBCLIP.ACTIVE' },
        { active: true, isSubclipped: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD_NEW.SUBCLIP.ACTIVE' },
        { active: false, isSubclipped: true, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.SUBCLIP.DISABLED' },
        { active: false, isSubclipped: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD_NEW.SUBCLIP.DISABLED' }
      ];

      tests.forEach(test => {
        const description: string = `returns ${test.expectedKey}` +
          ` for a collection asset with existing subclipping ${test.isSubclipped ? '' : 'not '}defined` +
          ` and update button is ${test.active ? 'active' : 'disabled'}`;

        it(description, () => {
          componentUnderTest.activeCollection = collection;
          componentUnderTest.subclipMarkers = test.active ? {
            in: new Frame(25).setFromFrameNumber(1),
            out: test.active ? new Frame(25).setFromFrameNumber(2) : new Frame(25).setFromFrameNumber(3)
          } : null;
          componentUnderTest.asset = enhanceAsset({
            ...asset,
            uuid: test.active ? 'MNOP' : 'NOPE',
            timeStart: test.isSubclipped ? 103 : null,
            timeEnd: test.isSubclipped ? 1000 : null,
          }, 'collection');
          componentUnderTest.showAssetSaveSubclip = test.active;

          expect(componentUnderTest.collectionSubclipButtonHoverTxt).toBe(test.expectedKey);
        });
      });
    });

    describe('collectionSubclipButtonLabel getter', () => {
      const tests: { isSubclipped: boolean, expectedKey: string }[] = [
        { isSubclipped: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD_NEW.SUBCLIP.COLLECTION' },
        { isSubclipped: true, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.SUBCLIP.COLLECTION' }
      ];

      tests.forEach(test => {
        const description: string = `returns ${test.expectedKey}` +
          ` for a collection asset with subclipping ${test.isSubclipped ? '' : 'not '}defined`;

        it(description, () => {
          if (test.isSubclipped) componentUnderTest.asset = enhanceAsset({ timeStart: 103, timeEnd: 1000 } as any, 'collection');
          expect(componentUnderTest.collectionSubclipButtonLabel).toBe(test.expectedKey);
        });
      });
    });

    describe('updateCartButtonLabelKey getter', () => {
      const tests: { quoteUser: boolean, markers: boolean, expectedKey: string }[] = [
        { quoteUser: false, markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.ASSET.CART' },
        { quoteUser: false, markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.SUBCLIP.CART' },
        { quoteUser: false, markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.ASSET.CART' },
        { quoteUser: false, markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.SUBCLIP.CART' },

        { quoteUser: true, markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.ASSET.QUOTE' },
        { quoteUser: true, markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.SUBCLIP.QUOTE' },
        { quoteUser: true, markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.ASSET.QUOTE' },
        { quoteUser: true, markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.UPDATE.SUBCLIP.QUOTE' }
      ];

      tests.forEach(test => {
        const description: string = `returns ${test.expectedKey}` +
          ` for a user ${test.quoteUser ? 'with' : 'without'} quote administrator capabililty and` +
          ` an asset with markers ${test.markers ? '' : 'not '}defined`;

        it(description, () => {
          componentUnderTest.userCan = { administerQuotes: () => test.quoteUser } as any;
          if (test.markers) componentUnderTest.subclipMarkers = { in: { some: 'frame' }, out: { some: 'frame' } } as any;

          expect(componentUnderTest.updateCartAssetButtonLabelKey).toBe(test.expectedKey);
        });
      });
    });

    describe('updateCart()', () => {
      it('is not yet implemented', () => {
        expect(true).toBe(true);
      });
    });

    describe('canAddToCart getter', () => {
      it('returns false without addToCart capability', () => {
        componentUnderTest.userCan = { addToCart: () => false } as any;
        expect(componentUnderTest.canAddToCart).toBe(false);
      });

      it('returns false for an asset without Rights.Reproduction', () => {
        componentUnderTest.userCan = { addToCart: () => true } as any;
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'some-name', value: 'some value' }] } as any, 'search'
        );
        expect(componentUnderTest.canAddToCart).toBe(false);
      });

      it('returns false for an asset with a non-acceptable Rights.Reproduction value', () => {
        componentUnderTest.userCan = { addToCart: () => true } as any;
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'some value' }] } as any, 'search'
        );
        expect(componentUnderTest.canAddToCart).toBe(false);
      });

      it('returns true for an asset with a Rights.Reproduction field of "Royalty Free" that has a price', () => {
        componentUnderTest.userCan = { addToCart: () => true } as any;
        componentUnderTest.asset = enhanceAsset(
          { assetId: 1234, primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }] } as any, 'search'
        );
        expect(componentUnderTest.canAddToCart).toBe(true);
      });

      it('returns true for an asset with a Rights.Reproduction field of "Rights Managed" that has a price', () => {
        componentUnderTest.userCan = { addToCart: () => true } as any;
        componentUnderTest.asset = enhanceAsset(
          { assetId: 1234, primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any, 'search'
        );
        expect(componentUnderTest.canAddToCart).toBe(true);
      });

      it('returns false for an asset with a Rights.Reproduction field of "Rights Managed" that does not have a price', () => {
        mockStore.createStateSection('asset', { activeAsset: { assetId: 1235 } });
        componentUnderTest.userCan = { addToCart: () => true } as any;
        componentUnderTest.asset = enhanceAsset(
          { assetId: 1235, primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any, 'search'
        );
        expect(componentUnderTest.canAddToCart).toBe(false);
      });
    });

    describe('addToCartOrQuoteButtonLabelKey getter', () => {
      const tests: { quoteUser: boolean, type: AssetType, markers: boolean, expectedKey: string }[] = [
        { quoteUser: false, type: 'search', markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD.ASSET.CART' },
        { quoteUser: false, type: 'search', markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.ADD.SUBCLIP.CART' },
        { quoteUser: false, type: 'cart', markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD_NEW.ASSET.CART' },
        { quoteUser: false, type: 'cart', markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.ADD_NEW.SUBCLIP.CART' },
        { quoteUser: false, type: 'quoteEdit', markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD.ASSET.CART' },
        { quoteUser: false, type: 'quoteEdit', markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.ADD.SUBCLIP.CART' },

        { quoteUser: true, type: 'search', markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD.ASSET.QUOTE' },
        { quoteUser: true, type: 'search', markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.ADD.SUBCLIP.QUOTE' },
        { quoteUser: true, type: 'cart', markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD.ASSET.QUOTE' },
        { quoteUser: true, type: 'cart', markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.ADD.SUBCLIP.QUOTE' },
        { quoteUser: true, type: 'quoteEdit', markers: false, expectedKey: 'ASSET.DETAIL.BUTTON.ADD_NEW.ASSET.QUOTE' },
        { quoteUser: true, type: 'quoteEdit', markers: true, expectedKey: 'ASSET.DETAIL.BUTTON.ADD_NEW.SUBCLIP.QUOTE' }
      ];

      tests.forEach(test => {
        const description: string = `returns ${test.expectedKey}` +
          ` for a user ${test.quoteUser ? 'with' : 'without'} quote administrator capabililty and` +
          ` an asset with type '${test.type}' and markers ${test.markers ? '' : 'not '}defined`;

        it(description, () => {
          componentUnderTest.userCan = { administerQuotes: () => test.quoteUser } as any;
          componentUnderTest.asset = enhanceAsset({} as any, test.type);
          if (test.markers) componentUnderTest.subclipMarkers = { in: { some: 'frame' }, out: { some: 'frame' } } as any;

          expect(componentUnderTest.addToCartOrQuoteButtonLabelKey).toBe(test.expectedKey);
        });
      });
    });

    describe('canGoToSearchDetails getter', () => {
      const tests: { assetType: AssetType, accessPath?: string, expectedResult: boolean }[] = [
        { assetType: 'cart', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'cart', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'collection', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'collection', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'order', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'order', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'quoteEdit', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'quoteEdit', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'quoteShow', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'quoteShow', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'search', expectedResult: false },
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}' and access path '${test.accessPath}'`, () => {
          componentUnderTest.asset = enhanceAsset({ accessPath: test.accessPath } as any, test.assetType);

          expect(componentUnderTest.canGoToSearchAssetDetails).toBe(test.expectedResult);
        });
      });
    });

    describe('goToSearchDetails', () => {
      it('dispatches the expected action when subclipMarkers are not set', () => {
        const spy = mockStore.createActionFactoryMethod('router', 'goToSearchAssetDetails');

        componentUnderTest.goToSearchAssetDetails();

        mockStore.expectDispatchFor(spy, componentUnderTest.asset.assetId, undefined);
      });

      it('dispatches the expected action when subclipMarkers are set', () => {
        const spy = mockStore.createActionFactoryMethod('router', 'goToSearchAssetDetails');

        componentUnderTest.onPlayerMarkerChange({ in: { some: 'inFrame' } as any, out: { some: 'outFrame' } as any });
        componentUnderTest.goToSearchAssetDetails();

        mockStore.expectDispatchFor(
          spy,
          componentUnderTest.asset.assetId,
          { in: { some: 'inFrame' }, out: { some: 'outFrame' } }
        );
      });
    });

    describe('canAddToActiveCollection getter', () => {
      const tests: { assetType: AssetType, assetIdInCollection: boolean, expectedResult: boolean }[] = [
        { assetType: 'cart', assetIdInCollection: true, expectedResult: false },
        { assetType: 'collection', assetIdInCollection: true, expectedResult: false },
        { assetType: 'order', assetIdInCollection: true, expectedResult: false },
        { assetType: 'quoteEdit', assetIdInCollection: true, expectedResult: false },
        { assetType: 'quoteShow', assetIdInCollection: true, expectedResult: false },
        { assetType: 'search', assetIdInCollection: true, expectedResult: false },

        { assetType: 'cart', assetIdInCollection: false, expectedResult: false },
        { assetType: 'collection', assetIdInCollection: false, expectedResult: true },
        { assetType: 'order', assetIdInCollection: false, expectedResult: false },
        { assetType: 'quoteEdit', assetIdInCollection: false, expectedResult: false },
        { assetType: 'quoteShow', assetIdInCollection: false, expectedResult: false },
        { assetType: 'search', assetIdInCollection: false, expectedResult: true }
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}' if the assetId 
        is ${test.assetIdInCollection ? 'included' : 'not'} in the collection`, () => {
            componentUnderTest.activeCollection = collection;
            componentUnderTest.asset = enhanceAsset({ ...asset, assetId: test.assetIdInCollection ? 1 : 9999 }, test.assetType);

            expect(componentUnderTest.canAddToActiveCollection).toBe(test.expectedResult);
          });
      });
    });

    describe('canAddAgainToActiveCollection getter', () => {
      const tests: { assetType: AssetType, matchingSubclipMarkers: boolean, expectedResult: boolean }[] = [
        { assetType: 'cart', matchingSubclipMarkers: false, expectedResult: false },
        { assetType: 'collection', matchingSubclipMarkers: false, expectedResult: true },
        { assetType: 'order', matchingSubclipMarkers: false, expectedResult: false },
        { assetType: 'quoteEdit', matchingSubclipMarkers: false, expectedResult: false },
        { assetType: 'quoteShow', matchingSubclipMarkers: false, expectedResult: false },
        { assetType: 'search', matchingSubclipMarkers: false, expectedResult: true },

        { assetType: 'cart', matchingSubclipMarkers: true, expectedResult: false },
        { assetType: 'collection', matchingSubclipMarkers: true, expectedResult: true },
        { assetType: 'order', matchingSubclipMarkers: true, expectedResult: false },
        { assetType: 'quoteEdit', matchingSubclipMarkers: true, expectedResult: false },
        { assetType: 'quoteShow', matchingSubclipMarkers: true, expectedResult: false },
        { assetType: 'search', matchingSubclipMarkers: true, expectedResult: true }
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}' when the collection has a version of that 
        asset ${test.matchingSubclipMarkers ? 'with' : 'without'} matching subclip markers`, () => {
            componentUnderTest.activeCollection = collection;
            componentUnderTest.asset = enhanceAsset(
              { ...asset, timeStart: 123, timeEnd: test.matchingSubclipMarkers ? 1000 : 9999 },
              test.assetType
            );

            expect(componentUnderTest.canAddAgainToActiveCollection).toBe(test.expectedResult);
          });
      });

      it('returns false when the collection does not have a version of that asset', () => {
        componentUnderTest.asset = enhanceAsset({ ...asset, assetId: 9999 }, 'collection');

        expect(componentUnderTest.canAddAgainToActiveCollection).toBe(false);
      });

      it('returns true if the collection does not have that asset but the type is collection & subclip markers were set', () => {
        componentUnderTest.asset = enhanceAsset({ ...asset, assetId: 9999 }, 'collection');

        const startFrame = new Frame(25).setFromFrameNumber(1);
        const endFrame = new Frame(25).setFromFrameNumber(2);
        componentUnderTest.onPlayerMarkerChange({ in: startFrame, out: endFrame });

        expect(componentUnderTest.canAddAgainToActiveCollection).toBe(true);
      });
    });

    describe('canRemoveFromActiveCollection getter', () => {
      const tests: { assetType: AssetType, matchingUuid: boolean, expectedResult: boolean }[] = [
        { assetType: 'cart', matchingUuid: true, expectedResult: false },
        { assetType: 'collection', matchingUuid: true, expectedResult: true },
        { assetType: 'order', matchingUuid: true, expectedResult: false },
        { assetType: 'quoteEdit', matchingUuid: true, expectedResult: false },
        { assetType: 'quoteShow', matchingUuid: true, expectedResult: false },
        { assetType: 'search', matchingUuid: true, expectedResult: false },

        { assetType: 'cart', matchingUuid: false, expectedResult: false },
        { assetType: 'collection', matchingUuid: false, expectedResult: false },
        { assetType: 'order', matchingUuid: false, expectedResult: false },
        { assetType: 'quoteEdit', matchingUuid: false, expectedResult: false },
        { assetType: 'quoteShow', matchingUuid: false, expectedResult: false },
        { assetType: 'search', matchingUuid: false, expectedResult: false }
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}' when the collection has a version of that 
        asset ${test.matchingUuid ? 'with' : 'without'} matching UUID`, () => {
            componentUnderTest.activeCollection = collection;
            componentUnderTest.asset = enhanceAsset({ ...asset, uuid: test.matchingUuid ? 'ABCD' : 'NOPE' }, test.assetType);

            expect(componentUnderTest.canRemoveFromActiveCollection).toBe(test.expectedResult);
          });
      });
    });

    describe('userCanEditCollection getter', () => {
      beforeEach(() => {
        componentUnderTest = new AssetDetailComponent(mockStore);
      });

      it('returns an observable of false when the capability returns false', () => {
        componentUnderTest.userCan = { editCollection: () => Observable.of(false) } as any;
        let canEdit: boolean;
        componentUnderTest.userCanEditCollection.subscribe(can => canEdit = can);
        expect(canEdit).toBe(false);
      });

      it('returns an observable of true when the capability returns true', () => {
        componentUnderTest.userCan = { editCollection: () => Observable.of(true) } as any;
        let canEdit: boolean;
        componentUnderTest.userCanEditCollection.subscribe(can => canEdit = can);
        expect(canEdit).toBe(true);
      });
    });

    describe('canUpdateInActiveCollection getter', () => {
      const tests: {
        assetType: AssetType, matchingUuid: boolean, subclipsSet: boolean, subclipsExact: boolean, expectedResult: boolean
      }[] = [
          { assetType: 'cart', matchingUuid: true, subclipsSet: true, subclipsExact: false, expectedResult: false },
          { assetType: 'order', matchingUuid: true, subclipsSet: false, subclipsExact: false, expectedResult: false },
          { assetType: 'quoteEdit', matchingUuid: false, subclipsSet: true, subclipsExact: false, expectedResult: false },
          { assetType: 'search', matchingUuid: false, subclipsSet: false, subclipsExact: false, expectedResult: false },
          { assetType: 'collection', matchingUuid: false, subclipsSet: true, subclipsExact: false, expectedResult: false },
          { assetType: 'collection', matchingUuid: true, subclipsSet: false, subclipsExact: false, expectedResult: false },
          { assetType: 'collection', matchingUuid: true, subclipsSet: true, subclipsExact: false, expectedResult: true },
          { assetType: 'collection', matchingUuid: true, subclipsSet: true, subclipsExact: true, expectedResult: false }
        ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}' 
        when the collection has a version of that asset ${test.matchingUuid ? 'with' : 'without'} matching UUID 
        and the subclip markers ${test.subclipsSet ? 'were' : 'were not'} changed
        ${test.subclipsExact && ' to match existing asset subclips'}`, () => {
            collection.assets.items.push({ assetId: 1, timeStart: 40, timeEnd: 80 } as Asset);
            componentUnderTest.activeCollection = collection;
            componentUnderTest.subclipMarkers = test.subclipsSet ? {
              in: new Frame(25).setFromFrameNumber(1),
              out: test.subclipsExact ? new Frame(25).setFromFrameNumber(2) : new Frame(25).setFromFrameNumber(3)
            } : null;
            componentUnderTest.asset = enhanceAsset({
              ...asset,
              uuid: test.matchingUuid ? 'MNOP' : 'NOPE'
            }, test.assetType);
            componentUnderTest.showAssetSaveSubclip = test.subclipsSet;
            expect(componentUnderTest.canUpdateInActiveCollection).toBe(test.expectedResult);
          });
      });
    });

    describe('isPhoto getter', () => {
      it('returns true when the resourceClass for an enhanced asset is \'Image\'', () => {
        componentUnderTest.asset = enhanceAsset(
          {
            resourceClass: 'Image'
          } as any,
          'search'
        );

        expect(componentUnderTest.isPhoto).toBe(true);
      });
      it('returns false when the resourceClass for an enhanced asset is not \'Image\'', () => {
        componentUnderTest.asset = enhanceAsset(
          {
            resourceClass: 'not image'
          } as any,
          'search'
        );

        expect(componentUnderTest.isPhoto).toBe(false);
      });
      it('returns false when the resourceClass for an enhanced asset does even exist', () => {
        componentUnderTest.asset = enhanceAsset(
          {
            noResourceClass: 'not image'
          } as any,
          'search'
        );

        expect(componentUnderTest.isPhoto).toBe(false);
      });
    });

    describe('routerLinkForAssetParent()', () => {
      describe('returns the correct routerLink', () => {
        beforeEach(() => {
          componentUnderTest.ngOnInit();
        });

        it('for a collection asset', () => {
          componentUnderTest.asset = enhanceAsset(mockAsset, 'collection', 100);

          expect(componentUnderTest.routerLinkForAssetParent).toEqual(['/collections', 100, { i: 1, n: 50 }]);
        });

        it('for a quote edit asset', () => {
          componentUnderTest.asset = enhanceAsset(mockAsset, 'quoteEdit');

          expect(componentUnderTest.routerLinkForAssetParent).toEqual(['/active-quote']);
        });

        it('for a quote show asset', () => {
          componentUnderTest.asset = enhanceAsset(mockAsset, 'quoteShow', 999);

          expect(componentUnderTest.routerLinkForAssetParent).toEqual(['/quotes', 999]);
        });

        it('for an order asset', () => {
          componentUnderTest.asset = enhanceAsset(mockAsset, 'order', 111);

          expect(componentUnderTest.routerLinkForAssetParent).toEqual(['/orders', 111]);
        });

        it('for a cart asset', () => {
          componentUnderTest.asset = enhanceAsset(mockAsset, 'cart');

          expect(componentUnderTest.routerLinkForAssetParent).toEqual(['/cart']);
        });

        it('for a search asset', () => {
          componentUnderTest.searchContext = { q: 'cat', i: 1, n: 100, sortId: 10 };
          componentUnderTest.asset = enhanceAsset(mockAsset, 'search');

          expect(componentUnderTest.routerLinkForAssetParent).toEqual(['/search', { q: 'cat', i: 1, n: 100, sortId: 10 }]);
        });
      });
    });

    describe('breadcrumbLabel getter', () => {
      describe('returns the correct translatable string', () => {
        it('for a collection', () => {
          componentUnderTest.activeCollection = { ...collection, name: 'some collection' };
          componentUnderTest.asset = enhanceAsset(mockAsset, 'collection', 100);

          expect(componentUnderTest.breadcrumbLabel).toEqual(['some collection', '']);
        });

        it('for a quoteShow', () => {
          componentUnderTest.asset = enhanceAsset(mockAsset, 'quoteShow', 111);

          expect(componentUnderTest.breadcrumbLabel).toEqual(['asset.detail.breadcrumb_quoteShow', '111']);
        });

        it('for a order', () => {
          componentUnderTest.asset = enhanceAsset(mockAsset, 'order', 333);

          expect(componentUnderTest.breadcrumbLabel).toEqual(['asset.detail.breadcrumb_order', '333']);
        });

        describe('for any other type of asset - ', () => {
          const tests: { assetType: AssetType; expected: string[] }[] = [
            { assetType: 'search', expected: ['asset.detail.breadcrumb_search', ''] },
            { assetType: 'quoteEdit', expected: ['asset.detail.breadcrumb_quoteEdit', ''] },
            { assetType: 'cart', expected: ['asset.detail.breadcrumb_cart', ''] }
          ];

          tests.forEach((test: { assetType: AssetType; expected: string[] }) => {
            it(`(${test.assetType})`, () => {
              componentUnderTest.asset = enhanceAsset(mockAsset, test.assetType);

              expect(componentUnderTest.breadcrumbLabel).toEqual(test.expected);
            });
          });
        });
      });
    });

    describe('toggleCommentsVisibility()', () => {
      it('toggles the \'showComments\' boolean', () => {
        expect(componentUnderTest.showComments).toBe(undefined);
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(true);
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(false);
      });
    });

    describe('userCanAddComments getter', () => {
      describe('when the commentParentObject\'s objectType is \'collection\'', () => {
        beforeEach(() => {
          componentUnderTest.commentParentObject = {
            objectId: 1,
            objectType: 'collection'
          };
        });

        it('returns an observable of true if the user can edit the collection', () => {
          componentUnderTest.userCan = {
            editCollection: jasmine.createSpy('editCollection').and.returnValue(Observable.of(true))
          } as any;

          let result: boolean;
          componentUnderTest.userCanAddComments.take(1).subscribe(res => result = res);

          expect(result).toBe(true);
        });

        it('returns an observable of false if the user can\'t edit the collection', () => {
          componentUnderTest.userCan = {
            editCollection: jasmine.createSpy('editCollection').and.returnValue(Observable.of(false))
          } as any;

          let result: boolean;
          componentUnderTest.userCanAddComments.take(1).subscribe(res => result = res);

          expect(result).toBe(false);
        });
      });

      describe('when the commentParentObject\'s objectType isn\'t \'collection\'', () => {
        beforeEach(() => {
          componentUnderTest.commentParentObject = {
            objectId: 1,
            objectType: 'cart'
          };
        });

        it('returns an observable of true', () => {
          let result: boolean;

          componentUnderTest.userCanAddComments.take(1).subscribe(res => result = res);

          expect(result).toBe(true);
        });
      });
    });

    describe('commentCount getter', () => {
      it('selects the right part of the store', () => {
        mockStore.createStateSection('comment', { activeObjectType: 'lineItem', lineItem: { pagination: { totalCount: 10 } } });
        let count: number;
        componentUnderTest.commentCount.take(1).subscribe(c => count = c);
        expect(count).toBe(10);
      });
    });

    describe('updateCart()', () => {
      it('emits the right event', () => {
        spyOn(componentUnderTest.updateAssetLineItem, 'emit');
        componentUnderTest.updateCartAsset();

        expect(componentUnderTest.updateAssetLineItem.emit).toHaveBeenCalled();
      });
    });

    describe('showDownloadButton()', () => {
      const tests: { assetType: AssetType, expectedResult: boolean, accessPath: string }[] = [
        { assetType: 'cart', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'cart', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'collection', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'collection', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'quoteEdit', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'quoteEdit', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'quoteShow', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'search', expectedResult: true, accessPath: 'ContentFilter' },
        { assetType: 'search', expectedResult: false, accessPath: 'SomethingElse' },
        { assetType: 'order', expectedResult: false, accessPath: 'ContentFilter' }
      ];

      tests.forEach(test => {
        it(`returns ${test.expectedResult} for asset type '${test.assetType}' and access path '${test.accessPath}'`, () => {
          componentUnderTest.asset = enhanceAsset({ accessPath: test.accessPath } as any, test.assetType);
          expect(componentUnderTest.showDownloadButton).toBe(test.expectedResult);
        });
      });
    });

    describe('assetName getter', () => {
      it('returns the name for an asset', () => {
        componentUnderTest.asset = enhanceAsset(
          {
            common: [
              { name: 'id', value: '33323666' },
              { name: 'family', value: 'website' },
              { name: 'ingested', value: '2014-01-30 00:00:00.0' },
              { name: 'liveDate', value: '2014-02-03 00:00:00.0' },
              { name: 'modified', value: '2016-08-30 07:14:07.0' },
              { name: 'name', value: '1FL001_033' }]
          } as any,
          'search'
        );

        expect(componentUnderTest.assetName).toBe('1FL001_033');
      });
    });

    describe('canAddToDifferentCollection getter', () => {
      it('return true if user can have collections and asset type is collection', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'collection'
        );
        componentUnderTest.userCan = { haveCollections: () => true } as any;
        expect(componentUnderTest.canAddToDifferentCollection).toBe(true);
      });

      it('return false if user can not have collections and asset type is collection', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'collection'
        );
        componentUnderTest.userCan = { haveCollections: () => false } as any;
        expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
      });

      it('return false if user can have collections and asset type is not collection', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );
        componentUnderTest.userCan = { haveCollections: () => true } as any;
        expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
      });

      it('return false if user can not have collections and asset type is not collection', () => {
        componentUnderTest.asset = enhanceAsset(
          { primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }] } as any,
          'search'
        );
        componentUnderTest.userCan = { haveCollections: () => false } as any;
        expect(componentUnderTest.canAddToDifferentCollection).toBe(false);
      });
    });

    describe('addToDifferentCollection()', () => {
      it('should emit the onAddtoDifferentCollection event', () => {
        spyOn(componentUnderTest.onAddtoDifferentCollection, 'emit');
        componentUnderTest.addToDifferentCollection();
        expect(componentUnderTest.onAddtoDifferentCollection.emit).toHaveBeenCalled();
      });
    });

    describe('onCreateShareDialog()', () => {
      it('emits the right event', () => {
        spyOn(componentUnderTest.createShareDialog, 'emit');
        componentUnderTest.subclipMarkers = 'some markers' as any;
        componentUnderTest.shareFormFields = 'some form fields' as any;
        componentUnderTest.onCreateShareDialog();

        expect(componentUnderTest.createShareDialog.emit).toHaveBeenCalledWith({
          enhancedAsset: {
            assetId: 1, clipData: [], clipThumbnailUrl: 'clipUrl.jpg', clipUrl: 'clipUrl', transcodeTargets: transcodeTargets
          },
          subclipMarkers: 'some markers',
          formFields: 'some form fields'
        });
      });
    });

  });
}
