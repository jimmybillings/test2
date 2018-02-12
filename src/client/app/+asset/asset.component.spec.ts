import { Observable } from 'rxjs/Observable';

import { AssetComponent } from './asset.component';
import { MockAppStore } from '../store/spec-helpers/mock-app.store';
import * as EnhancedMock from '../shared/interfaces/enhanced-asset';
import { mockAsset } from '../shared/mocks/mock-asset';
import { Frame } from '../shared/modules/wazee-frame-formatter/index';

export function main() {
  describe('Asset Component', () => {
    let mockCapabilities: any;
    let mockSearchContext: any;
    let mockUserPreference: any;
    let mockCartService: any;
    let mockWindow: any;
    let mockRouter: any;
    let mockRoute: any;
    let mockDialogService: any;
    let mockEnhancedAsset: EnhancedMock.EnhancedAsset;
    let mockStore: MockAppStore;
    let initPricingSpy: jasmine.Spy;
    let setPriceForDetailsSpy: jasmine.Spy;
    let resetPricingSpy: jasmine.Spy;
    let setAppliedAttributesSpy: jasmine.Spy;
    let componentUnderTest: AssetComponent;
    let data: any;
    beforeEach(() => {
      mockCapabilities = { administerQuotes: () => false };
      mockUserPreference = {
        openCollectionTray: jasmine.createSpy('openCollectionTray'),
        state: { pricingPreferences: 'thePricingPreferences' },
        updatePricingPreferences: jasmine.createSpy('updatePricingPreferences')
      };
      mockCartService = {
        addAssetToProjectInCart: jasmine.createSpy('addAssetToProjectInCart'),
        state: { data: { projects: [{ lineItems: [{ id: 'abc-123' }] }] } }
      };
      mockWindow = { nativeWindow: { location: { href: {} }, history: { back: jasmine.createSpy('back') } } };
      mockRouter = { navigate: jasmine.createSpy('navigate') };
      mockRoute = { params: Observable.of({ id: '100', uuid: 'abc-123' }), snapshot: { params: { id: '100' } } };
      mockDialogService = {
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable.of({ data: 'Test data' }))
      };

      mockStore = new MockAppStore();
      initPricingSpy = mockStore.createActionFactoryMethod('pricing', 'initializePricing');
      mockStore.createActionFactoryMethod('pricing', 'calculatePrice');
      setPriceForDetailsSpy = mockStore.createActionFactoryMethod('pricing', 'setPriceForDetails');
      resetPricingSpy = mockStore.createActionFactoryMethod('pricing', 'resetPricing');
      setAppliedAttributesSpy = mockStore.createActionFactoryMethod('pricing', 'setAppliedAttributes');
      mockStore.createStateSection('activeCollection', {
        collection: { some: 'collection' }
      });
      data = {
        id: 1,
        projects: [
          {
            lineItems: [
              { id: 'ABCD', asset: { timeStart: 1000, timeEnd: 2000 } },
              { id: 'EFGH' }
            ]
          },
          {
            lineItems: [
              {
                id: 'IJKL', asset: {}, attributes: [
                  { priceAttributeName: 'a', selectedAttributeValue: '1' },
                  { priceAttributeName: 'b', selectedAttributeValue: '2' },
                  { priceAttributeName: 'c', selectedAttributeValue: '3' }
                ]
              },
              {
                id: 'MNOP', asset: {}, attributes: [
                  { priceAttributeName: 'a', selectedAttributeValue: '1' },
                  { priceAttributeName: 'b', selectedAttributeValue: '2' },
                  { priceAttributeName: 'c', selectedAttributeValue: 'NOT 3' }
                ]
              },
              {
                id: 'QRST', asset: {}, attributes: [
                  { priceAttributeName: 'a', selectedAttributeValue: '1' },
                  { priceAttributeName: 'b', selectedAttributeValue: '2' }
                ]
              }
            ]
          }
        ]
      };
      ['quoteEdit', 'cart', 'quoteShow'].forEach((storeType) => mockStore.createStateSection(storeType, {
        data: data
      }));
      ['order'].forEach((storeType) => mockStore.createStateSection(storeType, {
        activeOrder: data
      }));

      componentUnderTest = new AssetComponent(
        mockCapabilities, mockWindow, mockRouter, mockRoute, mockStore, mockUserPreference, mockCartService, mockDialogService, null
      );
    });

    describe('ngOnInit()', () => {

      it('sets up an asset instance variable', () => {
        mockStore.createStateSection('asset', { activeAsset: mockAsset });
        let expectedAsset: EnhancedMock.EnhancedAsset = EnhancedMock.enhanceAsset(mockAsset, 'collection', 100);
        componentUnderTest.assetType = 'collection';
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.asset).toEqual(expectedAsset);
      });

      describe('sets up the commentParentObject', () => {
        it('for a collection asset', () => {
          componentUnderTest.assetType = 'collection';
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.commentParentObject).toEqual({
            objectId: 100,
            objectType: 'collection',
            nestedObjectId: 'abc-123',
            nestedObjectType: 'lineItem'
          });
        });

        it('for a quoteEdit Asset', () => {
          componentUnderTest.assetType = 'quoteEdit';
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.commentParentObject).toEqual({
            objectId: 1,
            objectType: 'quote',
            nestedObjectId: 'abc-123',
            nestedObjectType: 'lineItem'
          });
        });

        it('for a quoteShow Asset', () => {
          componentUnderTest.assetType = 'quoteShow';
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.commentParentObject).toEqual({
            objectId: 100,
            objectType: 'quote',
            nestedObjectId: 'abc-123',
            nestedObjectType: 'lineItem'
          });
        });

        it('for a cart asset', () => {
          componentUnderTest.assetType = 'cart';
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.commentParentObject).toEqual({
            objectId: 100,
            objectType: 'cart',
            nestedObjectId: 'abc-123',
            nestedObjectType: 'lineItem'
          });
        });
      });

      describe('Sets up the pricing correctly', () => {
        beforeEach(() => {
          mockStore.createStateSection('asset',
            {
              activeAsset: {
                uuid: 'matching-uuid',
                primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }]
              }, activeAssetType: 'quoteShow'
            });
          componentUnderTest.assetType = 'quoteShow';
        });

        it('for a Rights Managed asset with a parent asset that has a price AND rights attributes', () => {

          mockStore.createStateSection('quoteShow', {
            data: {
              id: 1,
              projects: [{ lineItems: [{ id: 'matching-uuid', attributes: true, price: 10.00 }] }]
            }
          });
          componentUnderTest.ngOnInit();
          mockStore.expectDispatchFor(setPriceForDetailsSpy, 10.00);
          mockStore.expectDispatchFor(setAppliedAttributesSpy, true);
        });

        it('for Rights Managed asset with a parent asset that has no price AND no rights attributes', () => {
          mockStore.createStateSection('quoteShow', {
            data: {
              id: 1,
              projects: [{ lineItems: [{ id: 'matching-uuid' }] }]
            }
          });
          componentUnderTest.ngOnInit();
          mockStore.expectDispatchFor(resetPricingSpy);
        });

        it('for Rights Managed asset with a parent asset that has a price BUT no rights attributes', () => {
          mockStore.createStateSection('quoteShow', {
            data: {
              id: 1,
              projects: [{ lineItems: [{ id: 'matching-uuid', price: 10.00 }] }]
            }
          });
          componentUnderTest.ngOnInit();
          mockStore.expectDispatchFor(resetPricingSpy);
        });

        it('for Rights Managed asset with a parent asset that has no price BUT has rights attributes', () => {
          mockStore.createStateSection('quoteShow', {
            data: {
              id: 1,
              projects: [{ lineItems: [{ id: 'matching-uuid', attrubtues: true }] }]
            }
          });
          componentUnderTest.ngOnInit();
          mockStore.expectDispatchFor(resetPricingSpy);
        });

        it('for Rights Managed asset with no parent asset', () => {
          mockStore.createStateSection('quoteShow', {
            data: {
              id: 1,
              projects: [{ lineItems: [{ id: 'non-matching-uuid', attrubtues: true }] }]
            }
          });
          componentUnderTest.ngOnInit();
          mockStore.expectDispatchFor(resetPricingSpy);
        });

        it('for a non Rights Managed asset', () => {
          mockStore.createStateSection('asset',
            {
              activeAsset: {
                uuid: 'matching-uuid',
                primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }]
              }, activeAssetType: 'quoteShow'
            });
          mockStore.createStateSection('quoteShow', {
            data: {
              id: 1,
              projects: [{ lineItems: [{ id: 'non-matching-uuid', attrubtues: true }] }]
            }
          });
          componentUnderTest.ngOnInit();
          expect(resetPricingSpy).not.toHaveBeenCalled();
          expect(setPriceForDetailsSpy).not.toHaveBeenCalled();
          expect(setAppliedAttributesSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('addAssetToCart()', () => {
      it('calls the cart service with the correct params', () => {
        mockStore.createStateSection(
          'pricing', {
            appliedAttributes: { some: 'attributes' },
            priceForDetails: 100
          }
        );

        componentUnderTest.ngOnInit();

        componentUnderTest.addAssetToCart({
          assetId: 123123,
          selectedTranscodeTarget: 'Target',
          markers: { some: 'markers' }
        });

        expect(mockCartService.addAssetToProjectInCart).toHaveBeenCalledWith({
          lineItem: {
            selectedTranscodeTarget: 'Target',
            price: 100,
            asset: { assetId: 123123 }
          },
          markers: { some: 'markers' },
          attributes: { some: 'attributes' }
        });
      });
    });

    describe('getPricingAttributes', () => {
      it('should dispatch the proper action to the store', () => {
        componentUnderTest.getPricingAttributes('Rights Managed');

        mockStore.expectDispatchFor(
          initPricingSpy,
          'Rights Managed', {
            componentType: jasmine.any(Function),
            inputOptions: {
              pricingPreferences: 'thePricingPreferences',
              userCanCustomizeRights: false
            },
            outputOptions: [
              {
                event: 'pricingEvent',
                callback: jasmine.any(Function)
              }
            ]
          }
        );
      });
    });

    describe('previousPage()', () => {
      it('should call the back method on the window api', () => {
        componentUnderTest.previousPage();
        expect(mockWindow.nativeWindow.history.back).toHaveBeenCalled();
      });
    });

    describe('assetMatchesCartAsset()', () => {
      ['collection', 'order', 'quoteShow', 'search'].forEach((assetType: EnhancedMock.AssetType) => {
        it(`returns true (somewhat pointlessly) for an asset with type '${assetType}'`, () => {
          mockStore.createStateSection('asset', { activeAsset: mockAsset, activeAssetType: assetType });
          componentUnderTest.assetType = assetType;
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.assetMatchesCartAsset).toBe(true);
        });
      });

      ['cart', 'quoteEdit'].forEach((assetType: EnhancedMock.AssetType) => {
        describe(`when asset has type '${assetType}'`, () => {
          let localMockAsset: any;
          let storeType: string;
          beforeEach(() => {
            const mockAppliedAttributes = { a: '1', b: '2', c: '3' };
            mockDialogService.openComponentInDialog =
              jasmine.createSpy('openComponentInDialog').and.callFake((parameters: any) => {
                parameters.outputOptions[0].callback(
                  { type: 'APPLY_PRICE', payload: { attributes: mockAppliedAttributes } },
                  { close: jasmine.createSpy('close') }
                );
              });

            componentUnderTest = new AssetComponent(
              mockCapabilities, mockWindow, mockRouter, mockRoute, mockStore, mockUserPreference, mockCartService, mockDialogService, null
            );

            componentUnderTest.assetType = assetType;
          });

          it('returns true when the asset has no corresponding cart line item', () => {
            localMockAsset = { uuid: '????' };
            mockStore.createStateSection('asset', { activeAsset: localMockAsset });
            componentUnderTest.ngOnInit();

            expect(componentUnderTest.assetMatchesCartAsset).toBe(true);
          });

          it('returns true when the asset\'s corresponding cart line item has no asset', () => {
            localMockAsset = { uuid: 'EFGH' };
            mockStore.createStateSection('asset', { activeAsset: localMockAsset });
            componentUnderTest.ngOnInit();

            expect(componentUnderTest.assetMatchesCartAsset).toBe(true);
          });
        });
      });
    });

    describe('onUpdateAssetLineItem()', () => {
      it('dispatches the proper action for a user that can\'t administer quotes', () => {
        mockStore.createActionFactoryMethod('cart', 'editLineItemFromDetails');
        componentUnderTest.asset = EnhancedMock.enhanceAsset(mockAsset, 'cart');
        componentUnderTest.onUpdateAssetLineItem();

        expect(mockStore.dispatch).toHaveBeenCalled();
      });

      it('dispatches the proper action for a user that can administer quotes', () => {
        mockCapabilities = { administerQuotes: () => true };
        mockStore.createActionFactoryMethod('quoteEdit', 'editLineItemFromDetails');

        componentUnderTest = new AssetComponent(mockCapabilities, null, null, null, mockStore, null, null, null, null);
        componentUnderTest.asset = EnhancedMock.enhanceAsset(mockAsset, 'quoteEdit');
        componentUnderTest.onUpdateAssetLineItem();

        expect(mockStore.dispatch).toHaveBeenCalled();
      });
    });

    describe('onCreateShareDialog()', () => {
      it('Should call the dialog service to open the asset sharing dialog', () => {
        let params = {
          enhancedAsset: 'some asset',
          subclipMarkers: 'markers',
          formFields: ['field1', 'field2']
        };
        componentUnderTest.onCreateShareDialog(params as any);
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
          componentType: jasmine.any(Function),
          dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
          inputOptions: {
            enhancedAsset: params.enhancedAsset,
            subclipMarkers: params.subclipMarkers,
            formFields: params.formFields
          },
          outputOptions: [{
            event: 'closeRequest',
            callback: jasmine.any(Function),
            closeOnEvent: true
          }]
        });
      });
    });

    describe('addToDifferentCollection()', () => {
      it('Should call the dialog service to open the collection list component', () => {
        componentUnderTest.addToDifferentCollection();
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
          componentType: jasmine.any(Function),
          dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
          inputOptions: {
            focusedCollection: { some: 'collection' },
            roleFilter: ['owner', 'editor'],
            editMode: true
          },
          outputOptions: [{
            event: 'close',
            callback: jasmine.any(Function),
            closeOnEvent: true
          }]
        });
      });
    });
  });

  function mockActiveCollectionAndAsset(id?: number) {
    let currentId = (id) ? id : 8854642;
    let mockAsset = { 'name': 'id', 'value': currentId, 'assetId': currentId };
    let mockCollection = {
      'id': 123,
      'assets': {
        'items': [
          { 'assetId': 8854642, 'uuid': 'adf3a8d2-8738-4c70-834d-0d7785d7e226' },
          { 'assetId': 31996532, 'uuid': 'e8e82d76-e85a-4289-8fa6-b730ded0bf16' },
          { 'assetId': 25015116, 'uuid': '739d6f81-247f-4b24-8121-c656852c05ff' },
          { 'assetId': 25015124, 'uuid': 'a1ed7a37-da0e-4365-8f54-af8b4a8cdd19' },
          { 'assetId': 25014612, 'uuid': '03101287-736b-4cc4-89f3-700d958a45b8' }
        ]
      }
    };
    return Object.assign({}, { collection: mockCollection }, { asset: mockAsset });
  }
}
