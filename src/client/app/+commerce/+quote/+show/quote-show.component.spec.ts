import { QuoteShowComponent } from './quote-show.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { Observable } from 'rxjs/Observable';


export function main() {
  describe('Quote Show Component', () => {
    let componentUnderTest: QuoteShowComponent;
    let mockAppStore: MockAppStore;
    let mockCapabilities: any;
    let mockQuoteService: any;
    let mockChangeDetectorRef: any;

    beforeEach(() => {
      mockCapabilities = { administerQuotes: () => false };

      mockQuoteService = { data: Observable.of({}), state: { data: { purchaseType: 'blah', id: 7 } } };

      mockAppStore = new MockAppStore();
      mockAppStore.createStateSection('uiConfig', { components: { quoteComment: { config: { form: { items: ['wow'] } } } } });
      mockAppStore.createActionFactoryMethod('checkout', 'reset');

      mockChangeDetectorRef = { markForCheck: () => { } };

      componentUnderTest = new QuoteShowComponent(
        mockCapabilities, mockQuoteService, mockAppStore, mockChangeDetectorRef
      );
    });

    describe('Initialization', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
      });

      it('defines the expected tabs', () => {
        expect(componentUnderTest.tabLabelKeys).toEqual(['quote', 'billing', 'payment', 'confirm']);
      });

      it('disables all but the first tab', () => {
        expect(componentUnderTest.tabEnabled).toEqual([true, false, false, false]);
      });

      it('selects the first tab', () => {
        expect(componentUnderTest.selectedTabIndex).toBe(0);
      });

      it('assigns the commentFormConfig instance variable', () => {
        expect(componentUnderTest.commentFormConfig).toEqual(['wow']);
      });

      it('assigns the commentParentObject instance variable', () => {
        expect(componentUnderTest.commentParentObject).toEqual({ objectType: 'quote', objectId: 7 });
      });
    });

    describe('onNotification()', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
      });

      describe('GO_TO_NEXT_TAB', () => {
        it('enables the next tab, but no others', () => {
          componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });

          expect(componentUnderTest.tabEnabled).toEqual([true, true, false, false]);
        });

        it('selects the next tab', (done) => {
          componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });

          setTimeout(_ => {
            expect(componentUnderTest.selectedTabIndex).toBe(1);
            done();
          }, 100);
        });

        it('does not advance beyond the last tab', (done) => {
          componentUnderTest.selectedTabIndex = 4;

          componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });

          setTimeout(_ => {
            expect(componentUnderTest.selectedTabIndex).toBe(4);
            done();
          }, 100);
        });
      });

      describe('GO_TO_PREVIOUS_TAB', () => {
        it('selects the previous tab', () => {
          componentUnderTest.selectedTabIndex = 1;

          componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });

          expect(componentUnderTest.selectedTabIndex).toBe(0);
        });

        it('does not go back beyond the first tab', () => {
          componentUnderTest.selectedTabIndex = 0;

          componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });

          expect(componentUnderTest.selectedTabIndex).toBe(0);
        });
      });
    });

    describe('hasDiscount()', () => {
      it('is true when discount exists in quoteService state data', () => {
        mockQuoteService = { data: Observable.of({}), state: { data: { discount: 20 } } };
        componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.hasDiscount).toBe(true);
      });

      it('is false when discount does not exist in quoteService state data', () => {
        mockQuoteService = { data: Observable.of({}), state: { data: {} } };
        componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.hasDiscount).toBe(false);
      });
    });

    describe('hasPurchaseType()', () => {
      it('is true when purchase type exists in quoteService state data', () => {
        mockQuoteService = { data: Observable.of({}), state: { data: { purchaseType: 'Standard' } } };
        componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.hasPurchaseType).toBe(true);
      });

      it('is false when purchase type does not exist in quoteService state data', () => {
        mockQuoteService = { data: Observable.of({}), state: { data: {} } };
        componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.hasPurchaseType).toBe(false);
      });
    });

    describe('shouldDisplayReview()', () => {
      it('is true if the user can administer quotes', () => {
        mockCapabilities = { administerQuotes: () => true };
        mockQuoteService = { data: Observable.of({}), state: { data: {} } };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.shouldDisplayReview).toBe(true);
      });

      it('is true if the quote status is not active', () => {
        mockCapabilities = { administerQuotes: () => false };
        mockQuoteService = { data: Observable.of({}), state: { data: { quoteStatus: 'EXPIRED' } } };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.shouldDisplayReview).toBe(true);
      });

      it('is false when the user cannot administer quotes and the quote status is active', () => {
        mockCapabilities = { administerQuotes: () => false };
        mockQuoteService = { data: Observable.of({}), state: { data: { quoteStatus: 'ACTIVE' } } };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.shouldDisplayReview).toBe(false);
      });
    });

    describe('shouldDisplayPurchaseHeader()', () => {
      it('is true if the user cannot administer quotes and the quote status is active', () => {
        mockCapabilities = { administerQuotes: () => false };
        mockQuoteService = { data: Observable.of({}), state: { data: { quoteStatus: 'ACTIVE' } } };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.shouldDisplayPurchaseHeader).toBe(true);
      });

      it('is false if the user can administer quotes and the quote status is active', () => {
        mockCapabilities = { administerQuotes: () => true };
        mockQuoteService = { data: Observable.of({}), state: { data: { quoteStatus: 'ACTIVE' } } };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.shouldDisplayPurchaseHeader).toBe(false);
      });

      it('is false if the user cannot administer quotes and the quote status is not active', () => {
        mockCapabilities = { administerQuotes: () => false };
        mockQuoteService = { data: Observable.of({}), state: { data: { quoteStatus: 'EXPIRED' } } };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.shouldDisplayPurchaseHeader).toBe(false);
      });
    });

    describe('displayActiveOfflineAgreementToPurchaser()', () => {
      it('is true if the user cannot administer quotes and the quote status is active, and lineItems have externalAgreementIds ', () => {
        mockCapabilities = { administerQuotes: () => false };
        mockQuoteService = {
          data: Observable.of({ data: {} }),
          state: {
            data: {
              quoteStatus: 'ACTIVE',
              projects: [
                { lineItems: [{ externalAgreementIds: ['abc-123'] }] }
              ]
            }
          }
        };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.displayActiveOfflineAgreementToPurchaser).toBe(true);
      });

      it('is false if lineItems do NOT have externalAgreementIds ', () => {
        mockCapabilities = { administerQuotes: () => false };
        mockQuoteService = {
          data: Observable.of({ data: {} }),
          state: {
            data: {
              quoteStatus: 'ACTIVE',
              projects: [
                { lineItems: [{}] }
              ]
            }
          }
        };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.displayActiveOfflineAgreementToPurchaser).toBe(false);
      });

      it('is false if the user can administer quotes', () => {
        mockCapabilities = { administerQuotes: () => true };
        mockQuoteService = {
          data: Observable.of({ data: {} }),
          state: {
            data: {
              quoteStatus: 'ACTIVE',
              projects: [
                { lineItems: [{ externalAgreementIds: ['abc-123'] }] }
              ]
            }
          }
        };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.displayActiveOfflineAgreementToPurchaser).toBe(false);
      });

      it('is false if the quoteStaus is not ACTIVE', () => {
        mockCapabilities = { administerQuotes: () => false };
        mockQuoteService = {
          data: Observable.of({ data: {} }),
          state: {
            data: {
              quoteStatus: 'EXPIRED',
              projects: [
                { lineItems: [{ externalAgreementIds: ['abc-123'] }] }
              ]
            }
          }
        };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.displayActiveOfflineAgreementToPurchaser).toBe(false);
      });
    });

    describe('shouldShowRecipientInfo()', () => {
      it('is true if the user can administer quotes', () => {
        mockCapabilities = { administerQuotes: () => true };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.shouldShowRecipientInfo).toBe(true);
      });

      it('is false if the user cannot administer quotes', () => {
        mockCapabilities = { administerQuotes: () => false };
        componentUnderTest = new QuoteShowComponent(mockCapabilities, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.shouldShowRecipientInfo).toBe(false);
      });
    });

    describe('trStringForPurchaseType()', () => {
      it('is whatever the purchase type is for set purchase types', () => {
        mockQuoteService = { data: Observable.of({}), state: { data: { purchaseType: 'Trial' } } };
        componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);
        expect(componentUnderTest.trStringForPurchaseType).toBe('QUOTE.Trial');
      });
    });

    describe('toggleCommentVisibility', () => {
      it('should toggle the showComments flag', () => {
        expect(componentUnderTest.showComments).toBe(null);
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(true);
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(false);
      });
    });

    describe('commentCount', () => {
      it('should get the count from the correct part of the store', () => {
        mockAppStore.createStateSection('comment', { quote: { pagination: { totalCount: 10 } } });

        componentUnderTest.commentCount.take(1).subscribe(count => expect(count).toBe(10));
      });
    });

    describe('offlineAgreementIds getter', () => {
      describe('should return any externalAgreementIds from the quote\'s lineItems', () => {
        it('for 1 lineItem in 1 project', () => {
          mockQuoteService = {
            data: Observable.of({ data: {} }),
            state: { data: { projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }] }] } }
          };
          componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);

          expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123');
        });

        it('for 1 lineItem in many projects', () => {
          mockQuoteService = {
            data: Observable.of({ data: {} }),
            state: {
              data: {
                projects: [
                  { lineItems: [{ externalAgreementIds: ['abc-123'] }] },
                  { lineItems: [{ externalAgreementIds: ['def-456'] }] }
                ]
              }
            }
          };
          componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);

          expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123, def-456');
        });

        it('for many lineItems in 1 project', () => {
          mockQuoteService = {
            data: Observable.of({ data: {} }),
            state: {
              data: { projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['def-456'] }] }] }
            }
          };
          componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);

          expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123, def-456');
        });

        it('for many lineItems in many projects', () => {
          mockQuoteService = {
            data: Observable.of({ data: {} }),
            state: {
              data: {
                projects: [
                  { lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['def-456'] }] },
                  { lineItems: [{ externalAgreementIds: ['fgh-789'] }, { externalAgreementIds: ['ijk-012'] }] }
                ]
              }
            }
          };
          componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);

          expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123, def-456, fgh-789, ijk-012');
        });

        it('with duplicate identifiers', () => {
          mockQuoteService = {
            data: Observable.of({ data: {} }),
            state: {
              data: { projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['abc-123'] }] }] }
            }
          };
          componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);

          expect(componentUnderTest.offlineAgreementIds).toEqual('abc-123');
        });

        it('with no identifiers', () => {
          mockQuoteService = {
            data: Observable.of({ data: {} }),
            state: {
              data: { projects: [{ lineItems: [{ some: 'lineItem' }, { some: 'lineItem' }] }] }
            }
          };
          componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);

          expect(componentUnderTest.offlineAgreementIds).toEqual('');
        });

        it('with no lineItems', () => {
          mockQuoteService = {
            data: Observable.of({ data: {} }),
            state: {
              data: { projects: [{ feeLineItems: [{ some: 'feeLineItem' }] }] }
            }
          };
          componentUnderTest = new QuoteShowComponent(null, mockQuoteService, null, mockChangeDetectorRef);

          expect(componentUnderTest.offlineAgreementIds).toEqual('');
        });
      });
    });
  });
}
