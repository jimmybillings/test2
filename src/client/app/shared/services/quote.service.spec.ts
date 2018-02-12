import { QuoteService } from './quote.service';
import { MockApiService, mockApiMatchers } from '../mocks/mock-api.service';
import { Api } from '../interfaces/api.interface';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../../shared/interfaces/commerce.interface';
import { Common } from '../utilities/common.functions';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Quote Service', () => {
    let serviceUnderTest: QuoteService;
    let mockApi: MockApiService;
    let mockCartService: any;
    let mockStore: MockAppStore;
    let mockPaymentOptions: any;
    let mockUserService: any;
    let quoteLoadSuccessSpy: jasmine.Spy;

    const mockQuoteResponse = {
      createdUserId: 1,
      ownerUserId: 2,
      lastUpdated: '2017-07-23T18:41:21Z',
      createdOn: '2017-07-23T18:20:00Z',
      id: 282,
      siteName: 'commerce',
      projects: [
        {
          name: '2017-04-27',
          id: '390bec17-929b-452d-a2f4-27b7b04cb6ea',
          lineItems: [
            {
              asset: {
                assetId: 33737670
              },
              id: 'f642f893-f4cf-4a3c-ad5e-dc2d0cd1a321',
              subTotal: 159
            }
          ],
          assetLineItemSubtotal: 159,
          feeLineItemSubtotal: 0,
          totalAmount: 79.5,
          subTotal: 159
        }
      ]
    };

    function setupFor(options: Array<PaymentOptions> = null) {
      mockPaymentOptions = options ? {
        paymentOptions: options,
        explanation: 'Please select either of the payment options below',
        noCheckout: false
      } : null;
      mockStore.createStateSection('checkout', { paymentOptions: mockPaymentOptions });
      return new QuoteService(null, null, mockStore, mockUserService);
    }

    beforeEach(() => {
      mockApi = new MockApiService();
      jasmine.addMatchers(mockApiMatchers);
      mockStore = new MockAppStore();
      mockStore.createStateSection('quoteShow', { data: { id: 3, ownerUserId: 10, itemCount: 1 } });
      quoteLoadSuccessSpy = mockStore.createActionFactoryMethod('quoteShow', 'loadSuccess');

      mockCartService = {
        data: Observable.of({ cart: { projects: [] } }),
        state: { cart: { projects: [] } }
      };

      mockUserService = {
        getById: jasmine.createSpy('getById').and.returnValue(Observable.of(
          { emailAddress: 'test@gmail.com', firstName: 'best', lastName: 'tester' }))
      };

      serviceUnderTest = new QuoteService(mockApi.injector, mockCartService, mockStore, mockUserService);
    });

    describe('data getter', () => {
      it('should return the right data', () => {
        serviceUnderTest.data.take(1).subscribe(d => {
          expect(d).toEqual({ data: { id: 3, ownerUserId: 10, itemCount: 1 } });
        });
      });
    });

    describe('state getter', () => {
      it('should return the right state', () => {
        expect(serviceUnderTest.state).toEqual({ data: { id: 3, ownerUserId: 10, itemCount: 1 } });
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

    describe('get hasAssets', () => {
      it('should return true if there are assets in the quote', () => {
        serviceUnderTest.hasAssets.take(1).subscribe((has: boolean) => expect(has).toBe(true));
      });
    });

    describe('paymentOptionsEqual()', () => {
      describe('returns false', () => {
        it('when the store\'s paymentOptions don\'t contain the option to check', () => {
          serviceUnderTest = setupFor(['Hold'] as any);
          serviceUnderTest.paymentOptionsEqual(['CreditCard']).take(1).subscribe((result: boolean) => {
            expect(result).toBe(false);
          });
        });

        it('when the store\'s paymentOptions DO contain the option to check, but the lengths are different', () => {
          serviceUnderTest = setupFor(['Hold'] as any);
          serviceUnderTest.paymentOptionsEqual(['Hold', 'CreditCard']).take(1).subscribe((result: boolean) => {
            expect(result).toBe(false);
          });
        });
      });

      describe('returns true', () => {
        it('when the store\'s paymentOptions contain only the option to check', () => {
          serviceUnderTest = setupFor(['Hold'] as any);
          serviceUnderTest.paymentOptionsEqual(['Hold']).take(1).subscribe((result: boolean) => {
            expect(result).toBe(true);
          });
        });

        it('when the payment options contain both options AND the lengths are the same', () => {
          serviceUnderTest = setupFor(['CreditCard', 'PurchaseOnCredit'] as any);
          serviceUnderTest.paymentOptionsEqual(['CreditCard', 'PurchaseOnCredit']).take(1).subscribe((result: boolean) => {
            expect(result).toBe(true);
          });
        });
      });
    });

    describe('retrieveLicenseAgreements()', () => {
      it('should call the api service correctly', () => {
        serviceUnderTest.retrieveLicenseAgreements();

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('quote/licensing/3');
        expect(mockApi.get).toHaveBeenCalledWithLoading(true);
      });
    });

    describe('expireQuote()', () => {
      it('should call the api service correctly', () => {
        serviceUnderTest.expireQuote();

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('quote/3');
        expect(mockApi.put).toHaveBeenCalledWithLoading('onBeforeRequest');

      });
    });

    describe('rejectQuote()', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.rejectQuote();

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('quote/reject/3');
        expect(mockApi.put).toHaveBeenCalledWithLoading(true);
      });
    });

    describe('extendExpiration()', () => {
      beforeEach(() => {
        mockApi.putResponse = Common.clone(mockQuoteResponse);
      });

      it('should call the api service correctly', () => {
        serviceUnderTest.extendExpirationDate('2017-01-01');

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('quote/3');
        expect(mockApi.put).toHaveBeenCalledWithBody({
          id: 3, ownerUserId: 10, itemCount: 1, expirationDate: new Date('2017-01-01').toISOString(), quoteStatus: 'ACTIVE'
        });
        expect(mockApi.put).toHaveBeenCalledWithLoading('onBeforeRequest');
      });
    });
  });
}
