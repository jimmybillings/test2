import { Observable } from 'rxjs/Observable';

import { MockApiService, mockApiMatchers } from '../mocks/mock-api.service';
import { Api, ApiBody, ApiParameters } from '../interfaces/api.interface';
import { CartService } from './cart.service';
import { ViewAddress, Address } from '../interfaces/user.interface';
import { Project, AssetLineItem, AddAssetParameters, CartState } from '../interfaces/commerce.interface';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Cart Service', () => {
    const mockProject: Project = {
      id: '123',
      name: 'Fred',
      clientName: 'Barney',
      subtotal: 0
    };

    const mockProjectB: Project = {
      name: 'Project A',
      clientName: 'Ross Edfort',
      id: '111',
      subtotal: 0
    };

    const mockLineItem: AssetLineItem = {
      id: '456',
      price: 0,
      rightsManaged: 'Rights Managed'
    };

    let serviceUnderTest: CartService;
    let mockApi: MockApiService;
    let mockStore: MockAppStore;
    let mockCurrentUserServiceService: any;
    let loadSpy: jasmine.Spy;
    let loadSuccessSpy: jasmine.Spy;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);

      mockApi = new MockApiService();

      mockStore = new MockAppStore();

      loadSuccessSpy = mockStore.createActionFactoryMethod('cart', 'loadSuccess');
      mockStore.createStateSection('cart', { data: { some: 'data' } });

      mockCurrentUserServiceService = {
        fullName: jasmine.createSpy('fullName').and.returnValue(Observable.of('Ross Edfort'))
      };

      serviceUnderTest = new CartService(mockStore, mockApi.injector, mockCurrentUserServiceService);
    });

    describe('data getter', () => {
      it('returns the data from the cart store', () => {
        serviceUnderTest.data.subscribe(data => expect(data).toEqual({ data: { some: 'data' } }));
      });
    });

    describe('state getter', () => {
      it('returns the state from the cart store', () => {
        expect(serviceUnderTest.state).toEqual({ data: { some: 'data' } });
      });
    });

    describe('checkoutState() getter', () => {
      it('should return the checkout state', () => {
        mockStore.createStateSection('checkout', {
          purchaseOrderId: '1234-56',
          selectedPaymentType: 'CreditCard'
        });
        expect(serviceUnderTest.checkoutState).toEqual({ purchaseOrderId: '1234-56', selectedPaymentType: 'CreditCard' });
      });
    });

    describe('cart getter', () => {
      it('returns the data from the cart store', () => {
        serviceUnderTest.cart.subscribe(cart => expect(cart).toEqual({ some: 'data' }));
      });

      it('returns a cloned object', () => {
        serviceUnderTest.cart.subscribe(cart => expect(cart).not.toBe(mockStore.snapshot(state => state.cart.data)));
      });
    });

    describe('addAssetToProjectInCart()', () => {
      let snackbarSpy: jasmine.Spy;

      beforeEach(() => {
        mockStore.createStateSection('cart', { data: { projects: [mockProjectB] } });
        snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');
      });

      it('calls the api service correctly', () => {
        const body: ApiBody = {
          lineItem: { asset: { assetId: 10836, timeStart: -1, timeEnd: -2 }, selectedTranscodeTarget: '1080p', price: 100.5 },
          attributes: [{ priceAttributeName: 'key', selectedAttributeValue: 'value' }]
        };
        const parameters: ApiParameters = { projectName: 'Project A', region: 'AAA' };
        const addAssetParameters: AddAssetParameters = {
          lineItem: { asset: { assetId: 10836 }, selectedTranscodeTarget: '1080p', price: 100.5 },
          attributes: [{ priceAttributeName: 'key', selectedAttributeValue: 'value' }]
        };

        serviceUnderTest.addAssetToProjectInCart(addAssetParameters);

        expect(mockApi.put)
          .toHaveBeenCalledWith(
          Api.Orders,
          'cart/asset/lineItem',
          { body: body, parameters: parameters, loadingIndicator: true }
          );
      });

      it('calls the api service correctly - no transcode target', () => {
        const body: ApiBody = { lineItem: { asset: { assetId: 10836, timeStart: -1, timeEnd: -2 } } };
        const parameters: ApiParameters = { projectName: 'Project A', region: 'AAA' };
        const addAssetParameters: AddAssetParameters = { lineItem: { asset: { assetId: 10836 } } };

        serviceUnderTest.addAssetToProjectInCart(addAssetParameters);

        expect(mockApi.put)
          .toHaveBeenCalledWith(
          Api.Orders,
          'cart/asset/lineItem',
          { body: body, parameters: parameters, loadingIndicator: true }
          );
      });

      it('adds the asset to the cart store', () => {
        mockApi.putResponse = { lineItem: { asset: { assetId: 10836 } } };
        const addAssetParameters: AddAssetParameters = {
          lineItem: { asset: { assetId: 10836 }, selectedTranscodeTarget: '1080p' }
        };

        serviceUnderTest.addAssetToProjectInCart(addAssetParameters);

        expect(loadSuccessSpy)
          .toHaveBeenCalledWith({ lineItem: { asset: { assetId: 10836 } } });
      });

      it('displays a snackbar with the expected message', () => {
        const addAssetParameters: AddAssetParameters = {
          lineItem: { asset: { assetId: 10836 }, selectedTranscodeTarget: '1080p' }
        };

        serviceUnderTest.addAssetToProjectInCart(addAssetParameters);

        expect(snackbarSpy).toHaveBeenCalledWith('ASSET.ADD_TO_CART_TOAST', { assetId: 10836 });
      });
    });

    describe('addProject()', () => {
      it('calls the API service correctly', () => {
        serviceUnderTest.addProject();

        expect(mockApi.post).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.post).toHaveBeenCalledWithEndpoint('cart/project');
        expect(mockApi.post).toHaveBeenCalledWithBody({ clientName: 'Ross Edfort' });
        expect(mockApi.post).toHaveBeenCalledWithLoading(true);
      });

      it('names new projects based on existing names', () => {
        mockStore.createStateSection('cart', { data: { projects: [{ name: 'Project A', clientName: 'Ross Edfort' }] } });
        // serviceUnderTest = new CartService(mockAp, mockCheckoutStore, mockApi.injector, mockCurrentUserServiceService);

        serviceUnderTest.addProject();

        expect(mockApi.post).toHaveBeenCalledWithBody({ clientName: 'Ross Edfort' });
      });

      it('replaces the cart store with the response', () => {
        serviceUnderTest.addProject();

        expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.postResponse);
      });
    });

    describe('removeProject()', () => {
      it('calls the API service correctly', () => {
        serviceUnderTest.removeProject(mockProject);

        expect(mockApi.delete).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.delete).toHaveBeenCalledWithEndpoint('cart/project/123');
        expect(mockApi.delete).toHaveBeenCalledWithLoading(true);
      });

      it('replaces the cart store with the response', () => {
        serviceUnderTest.removeProject(mockProject);

        expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.deleteResponse);
      });

    });

    describe('updateProject()', () => {
      it('calls the API service correctly', () => {
        serviceUnderTest.updateProject(mockProject);

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('cart/project');
        expect(mockApi.put).toHaveBeenCalledWithBody(mockProject);
        expect(mockApi.put).toHaveBeenCalledWithLoading(true);
      });

      it('replaces the cart store with the response', () => {
        serviceUnderTest.updateProject(mockProject);

        expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.putResponse);
      });
    });

    describe('moveLineItemTo()', () => {
      it('calls the API service correctly', () => {
        serviceUnderTest.moveLineItemTo(mockProject, mockLineItem);

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('cart/move/lineItem');
        expect(mockApi.put).toHaveBeenCalledWithParameters({ lineItemId: '456', projectId: '123' });
        expect(mockApi.put).toHaveBeenCalledWithLoading(true);
      });

      it('replaces the cart store with the response', () => {
        serviceUnderTest.moveLineItemTo(mockProject, mockLineItem);

        expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.putResponse);
      });
    });

    describe('cloneLineItem()', () => {
      it('calls the API service correctly', () => {
        serviceUnderTest.cloneLineItem(mockLineItem);

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('cart/clone/lineItem');
        expect(mockApi.put).toHaveBeenCalledWithParameters({ lineItemId: '456' });
        expect(mockApi.put).toHaveBeenCalledWithLoading(true);
      });

      it('replaces the cart store with the response', () => {
        serviceUnderTest.cloneLineItem(mockLineItem);

        expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.putResponse);
      });
    });

    describe('removeLineItem()', () => {
      it('calls the API service correctly', () => {
        serviceUnderTest.removeLineItem(mockLineItem);

        expect(mockApi.delete).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.delete).toHaveBeenCalledWithEndpoint('cart/asset/456');
        expect(mockApi.delete).toHaveBeenCalledWithLoading(true);
      });

      it('replaces the cart store with the response', () => {
        serviceUnderTest.removeLineItem(mockLineItem);

        expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.deleteResponse);
      });
    });

    describe('purchase()', () => {
      let mockCheckoutStoreState: any;
      let setCheckoutStateSpy: jasmine.Spy;

      describe('for a credit card', () => {
        beforeEach(() => {
          setCheckoutStateSpy = mockStore.createActionFactoryMethod('order', 'setCheckoutState');
          mockStore.createStateSection('checkout', {
            selectedPaymentType: 'CreditCard', authorization: { id: 123 }, selectedAddress: { addressEntityId: 12 }
          });
          serviceUnderTest = new CartService(mockStore, mockApi.injector, mockCurrentUserServiceService);
        });

        it('calls the API service correctly', () => {
          serviceUnderTest.purchase();

          expect(mockApi.post).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApi.post).toHaveBeenCalledWithEndpoint('cart/stripe/process');
          expect(mockApi.post).toHaveBeenCalledWithLoading(true);
        });

        it('returns an observable of the back-end response', () => {
          serviceUnderTest.purchase()
            .subscribe(response => expect(response).toEqual(mockApi.postResponse));
        });

        it('dispatches the proper action', () => {
          serviceUnderTest.purchase().subscribe();

          expect(setCheckoutStateSpy).toHaveBeenCalledWith(true);
        });
      });

      describe('for purchase on credit', () => {
        beforeEach(() => {
          setCheckoutStateSpy = mockStore.createActionFactoryMethod('order', 'setCheckoutState');
          mockStore.createStateSection('checkout', {
            selectedPaymentType: 'PurchaseOnCredit', authorization: { id: 123 }, selectedAddress: { addressEntityId: 12 }
          });
          serviceUnderTest = new CartService(mockStore, mockApi.injector, mockCurrentUserServiceService);
        });

        it('should call the API service correctly', () => {
          serviceUnderTest.purchase();

          expect(mockApi.post).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApi.post).toHaveBeenCalledWithEndpoint('cart/checkout/purchaseOnCredit');
          expect(mockApi.post).toHaveBeenCalledWithLoading(true);
        });

        it('return an observable of the order id', () => {
          mockApi.postResponse = { id: 1, createdOn: null, total: 10000.00 };
          serviceUnderTest.purchase().take(1).subscribe((response: any) => {
            expect(response).toEqual(1);
          });
        });

        it('dispatches the proper action', () => {
          serviceUnderTest.purchase().subscribe();

          expect(setCheckoutStateSpy).toHaveBeenCalledWith(true);
        });
      });
    });

    describe('editLineItem()', () => {
      it('calls the API service correctly', () => {
        serviceUnderTest.editLineItem(mockLineItem, { selectedTranscodeTarget: '1080i' });

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('cart/update/lineItem/456');
        expect(mockApi.put).toHaveBeenCalledWithBody({
          id: '456', price: 0, rightsManaged: 'Rights Managed', selectedTranscodeTarget: '1080i'
        });
      });

      it('replaces the cart store with the response', () => {
        serviceUnderTest.editLineItem(mockLineItem, { selectedTranscodeTarget: '1080i' });

        expect(loadSuccessSpy).toHaveBeenCalledWith(mockApi.putResponse);
      });
    });

    describe('retrieveLicenseAgreements()', () => {
      it('should call the api service correctly', () => {
        serviceUnderTest.retrieveLicenseAgreements();

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('cart/licensing');
      });
    });
  });
}
