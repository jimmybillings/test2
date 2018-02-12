import { Pojo } from '../../../../../shared/interfaces/common.interface';
import { Observable } from 'rxjs/Observable';
import { MockAppStore } from '../../../../../store/spec-helpers/mock-app.store';
import { QuoteEditConfirmTabComponent } from './quote-edit-confirm-tab.component';

export function main() {
  describe('Quote Edit Confirm Tab Component', () => {
    let componentUnderTest: QuoteEditConfirmTabComponent;
    let mockCapabilities: any;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockCapabilities = {
        administerQuotes: () => false
      };
      mockStore = new MockAppStore();
      componentUnderTest = new QuoteEditConfirmTabComponent(mockCapabilities, mockStore);
    });


    describe('get sendDetails()', () => {
      it('Should return the current discount amount for the quote', () => {
        mockStore.createStateSection('quoteEdit', {
          sendDetails: {
            user: { accountName: 'CBS' },
            salesManager: { expirationDate: '2017/12/01' }
          }
        });
        let currentSendDetails: Pojo = {};
        componentUnderTest.sendDetails.subscribe(sendDetails => currentSendDetails = sendDetails);
        expect(currentSendDetails).toEqual({
          user: { accountName: 'CBS' }, salesManager: { expirationDate: '2017/12/01' }
        });
      });
    });

    describe('sendQuote()', () => {
      it('displays a snackbar with the expected message', () => {
        const sendQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'sendQuote');
        componentUnderTest.sendQuote();
        expect(sendQuoteSpy).toHaveBeenCalled();
      });
    });

    describe('get discount()', () => {
      it('Should return the current discount amount for the quote', () => {
        mockStore.createStateSection('quoteEdit', { data: { discount: 10 } });
        let currentDiscount: number;
        componentUnderTest.discount.subscribe(discount => currentDiscount = discount);
        expect(currentDiscount).toBe(10);
      });
    });

    describe('showDiscount()', () => {
      describe('returns false', () => {
        it('when the quote does not have the property', () => {
          mockStore.createStateSection('quoteEdit', { data: {} });
          expect(componentUnderTest.showDiscount).toBe(false);
        });

        it('when the quoteType is "Trial" and the quote DOES NOT have the property', () => {
          mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'Trial' } });
          expect(componentUnderTest.showDiscount).toBe(false);
        });

        it('when the quoteType is "Trial" and the quote DOES have the property', () => {
          mockStore.createStateSection('quoteEdit', { data: { discount: 100, purchaseType: 'Trial' } });
          expect(componentUnderTest.showDiscount).toBe(false);
        });
      });

      describe('returns true', () => {
        it('when the quote does have the property AND the quoteType is NOT Trial', () => {
          mockStore.createStateSection('quoteEdit', { data: { discount: 100, purchaseType: 'NotTrial' } });
          expect(componentUnderTest.showDiscount).toBe(true);
        });
      });
    });

    describe('get subTotal()', () => {
      it('Should return the current subTotal dollar amount for the quote', () => {
        mockStore.createStateSection('quoteEdit', { data: { subTotal: 1254 } });
        let currentSubTotal: number;
        componentUnderTest.subTotal.subscribe(subTotal => currentSubTotal = subTotal);
        expect(currentSubTotal).toBe(1254);
      });
    });

    describe('get total()', () => {
      it('Should return the current total dollar amount for the quote', () => {
        mockStore.createStateSection('quoteEdit', { data: { total: 1000 } });
        let currentTotal: number;
        componentUnderTest.total.subscribe(total => currentTotal = total);
        expect(currentTotal).toBe(1000);
      });
    });

    describe('get showTotal()', () => {
      describe('returns false', () => {
        it('when the quote does not have a total value', () => {
          mockStore.createStateSection('quoteEdit', { data: {} });
          expect(componentUnderTest.showTotal).toBe(false);
        });

        it('when the quoteType is "Trial" and the quote does not have a total value', () => {
          mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'Trial' } });
          expect(componentUnderTest.showTotal).toBe(false);
        });

        it('when the quoteType is "Trial" and the quote does have a total value', () => {
          mockStore.createStateSection('quoteEdit', { data: { total: 100, purchaseType: 'Trial' } });
          expect(componentUnderTest.showTotal).toBe(false);
        });
      });

      describe('returns true', () => {
        it('when the quote does have does have a total value AND the quoteType is NOT Trial', () => {
          mockStore.createStateSection('quoteEdit', { data: { total: 100, purchaseType: 'NotTrial' } });
          expect(componentUnderTest.showTotal).toBe(true);
        });
      });
    });

    describe('get quoteType()', () => {
      it('Should return the current purchaseType for the quote', () => {
        mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'NotTrial' } });
        let currentPurchaseType: string;
        componentUnderTest.quoteType.subscribe(purchaseType => currentPurchaseType = purchaseType);
        expect(currentPurchaseType).toBe('NotTrial');
      });
    });

    describe('get quoteTypeTranslationKey()', () => {
      it('Should return the translation key for the quote type', () => {
        mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'NotTrial' } });
        let currentPurchaseType: string;
        componentUnderTest.quoteTypeTranslationKey.subscribe(purchaseType => currentPurchaseType = purchaseType);
        expect(currentPurchaseType).toBe('QUOTE.NotTrial');
      });
    });
  });
}
