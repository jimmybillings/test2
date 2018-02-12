import { Observable } from 'rxjs/Observable';

import { OrderShowComponent } from './order-show.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Order Show Component', () => {
    let componentUnderTest: OrderShowComponent;
    let mockAppStore: MockAppStore;
    let mockOrderService: any;
    let mockWindow: any;
    let mockOrder: any;

    beforeEach(() => {
      mockWindow = {
        nativeWindow: {
          location: { href: '' }
        }
      };

      mockAppStore = new MockAppStore();
      componentUnderTest = new OrderShowComponent(mockWindow, mockAppStore);
    });

    describe('orderObservable property', () => {
      it('represents the store\'s active order', () => {
        mockAppStore.createStateElement('order', 'activeOrder', { some: 'order', projects: [] });
        componentUnderTest = new OrderShowComponent(mockWindow, mockAppStore);
        let currentOrder;
        componentUnderTest.orderObservable.subscribe(order => currentOrder = order);
        expect(currentOrder).toEqual({ some: 'order', projects: [] });
      });

      it('contains enhanced assets', () => {
        mockAppStore.createStateElement(
          'order',
          'activeOrder',
          {
            some: 'order',
            id: 42,
            projects: [{ lineItems: [{ asset: {} }] }]
          }
        );

        new OrderShowComponent(mockWindow, mockAppStore).orderObservable.subscribe(order => {
          const asset: any = order.projects[0].lineItems[0].asset;

          expect(asset.type).toEqual('order');
          expect(asset.parentId).toEqual(42);
        });
      });
    });

    describe('download()', () => {
      it('changes the window\'s location', () => {
        componentUnderTest.download('https://this-is-a-url.com');
        expect(mockWindow.nativeWindow.location.href).toBe('https://this-is-a-url.com');
      });
    });

    describe('assetCountLabelKeyFor()', () => {
      it('returns pluralized translatable string based on asset count. If count is 0 return no assets', () => {
        expect(componentUnderTest.assetCountLabelKeyFor(0)).toBe('ORDER.SHOW.PROJECTS.NO_ASSETS');
      });

      it('returns 1 asset if asset count is 1', () => {
        expect(componentUnderTest.assetCountLabelKeyFor(1)).toBe('ORDER.SHOW.PROJECTS.ONLY_ONE_ASSET');
      });

      it('returns x assets if asset count is more than 1', () => {
        expect(componentUnderTest.assetCountLabelKeyFor(20)).toBe('ORDER.SHOW.PROJECTS.MORE_THAN_ONE_ASSET');
      });
    });

    describe('isRefundedLineItem()', () => {
      it('returns false if the price is > 0', () => {
        expect(componentUnderTest.isRefundedLineItem({ price: 100 })).toBe(false);
      });

      it('returns true if the price is < 0', () => {
        expect(componentUnderTest.isRefundedLineItem({ price: -100 })).toBe(true);
      });
    });

    describe('isRefundedProject()', () => {
      it('returns false if there is no creditMemoForProjectId', () => {
        expect(componentUnderTest.isRefundedProject({} as any)).toBe(false);
      });

      it('returns true if there is a creditMemoForProjectId', () => {
        expect(componentUnderTest.isRefundedProject({ creditMemoForProjectId: 12345 } as any)).toBe(true);
      });
    });

    describe('isRefundedOrder()', () => {
      it('returns true if the order has a corresponding credit memo', () => {
        expect(componentUnderTest.isRefundedOrder({ creditMemoForOrderId: 12345 } as any)).toBe(true);
      });

      it('returns false if the order doesn\'t have a corresponding credit memo', () => {
        expect(componentUnderTest.isRefundedOrder({} as any)).toBe(false);
      });
    });

    describe('shouldShowPaymentBalanceFor()', () => {
      it('returns true if the order has a paymentBalance and a paymentDueDate', () => {
        expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345, paymentDueDate: 'test date' } as any)).toBe(true);
      });

      it('returns false if the order doesn\'t have both a paymentBalance and a paymentDueDate', () => {
        expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345 } as any)).toBe(false);
      });

      it('returns false if the order has a paymentBalance and a paymentDueDate, but paymentBalance less than zero', () => {
        expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: -123, paymentDueDate: 'test date' } as any))
          .toBe(false);
      });
    });

    describe('shouldShowDiscountFor()', () => {
      it('returns true if the order has a discount value greater than zero', () => {
        expect(componentUnderTest.shouldShowDiscountFor({ discount: 16 } as any)).toBe(true);
      });

      it('returns false if the order has a discount value of zero', () => {
        expect(componentUnderTest.shouldShowDiscountFor({ discount: 0 } as any)).toBe(false);
      });

      it('returns false if the order has a discount value greater than zero, but is a refund', () => {
        expect(componentUnderTest.shouldShowDiscountFor({ discount: 16, creditMemoForOrderId: 12345 } as any)).toBe(false);
      });

      it('returns false if the order has a no discount value', () => {
        expect(componentUnderTest.shouldShowDiscountFor({} as any)).toBe(false);
      });
    });

    describe('offlineAgreementIds getter', () => {
      describe('should return any externalAgreementIds from the quote\'s lineItems', () => {
        it('for 1 lineItem in 1 project', () => {
          mockOrder = { projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }] }] };

          expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123');
        });

        it('for 1 lineItem in many projects', () => {
          mockOrder = {
            projects: [
              { lineItems: [{ externalAgreementIds: ['abc-123'] }] },
              { lineItems: [{ externalAgreementIds: ['def-456'] }] }
            ]
          };

          expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123, def-456');
        });

        it('for many lineItems in 1 project', () => {
          mockOrder = {
            projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['def-456'] }] }]
          };

          expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123, def-456');
        });

        it('for many lineItems in many projects', () => {
          mockOrder = {
            projects: [
              { lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['def-456'] }] },
              { lineItems: [{ externalAgreementIds: ['fgh-789'] }, { externalAgreementIds: ['ijk-012'] }] }
            ]
          };

          expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123, def-456, fgh-789, ijk-012');
        });

        it('with duplicate identifiers', () => {
          mockOrder = {
            projects: [{ lineItems: [{ externalAgreementIds: ['abc-123'] }, { externalAgreementIds: ['abc-123'] }] }]
          };

          expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('abc-123');
        });

        it('with no identifiers', () => {
          mockOrder = {
            projects: [{ lineItems: [{ some: 'lineItem' }, { some: 'lineItem' }] }]
          };

          expect(componentUnderTest.offlineAgreementIdsFor(mockOrder)).toEqual('');
        });
      });
    });

    describe('shouldDisplayRights()', () => {
      it('returns true when the line item is rights managed and order type is NOT a Trial', () => {
        let lineItem: any = { rightsManaged: 'Rights Managed' };
        mockOrder = {
          orderType: 'Not Trial'
        };
        expect(componentUnderTest.shouldDisplayRights(lineItem, mockOrder))
          .toBe(true);
      });
      it('returns false when the line item is royalty-free', () => {
        let lineItem: any = { rightsManaged: 'Royalty Free' };
        mockOrder = {
          orderType: 'Trial'
        };
        expect(componentUnderTest.shouldDisplayRights(lineItem, mockOrder))
          .toBe(false);
      });
      it('returns false when the order type is a Trial', () => {
        let lineItem: any = { rightsManaged: 'Rights Managed' };
        mockOrder = {
          orderType: 'Trial'
        };
        expect(componentUnderTest.shouldDisplayRights(lineItem, mockOrder))
          .toBe(false);
      });
    });

    describe('showDownloadButtonFor()', () => {
      describe('returns true', () => {
        it('when the asset on the lineItem has a downloadUrl', () => {
          expect(componentUnderTest.showDownloadButtonFor({ downloadUrl: 'some-url' })).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the asset on the lineItem does not have a downloadUrl', () => {
          expect(componentUnderTest.showDownloadButtonFor({ downloadUrl: null })).toBe(false);
        });

        it('when the asset on the lineItem has a transcode status of \'Failed\'', () => {
          expect(componentUnderTest.showDownloadButtonFor({ downloadUrl: 'some-url', transcodeStatus: 'Failed' })).toBe(false);
        });
      });
    });

    describe('showSpinnerIcon()', () => {
      describe('returns true', () => {
        it('when the asset on the lineItem has a transcode status of \'Submitted\'', () => {
          expect(componentUnderTest.showSpinnerIcon({ transcodeStatus: 'Submitted' })).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the asset on the lineItem has a transcode status of something other than \'Submitted\'', () => {
          expect(componentUnderTest.showSpinnerIcon({ transcodeStatus: 'Failed' })).toBe(false);
        });
        it('when the asset on the lineItem has a transcode status is undefined', () => {
          expect(componentUnderTest.showSpinnerIcon({ transcodeStatus: undefined })).toBe(false);
        });
      });
    });

    describe('nothingToDownload()', () => {
      describe('returns true', () => {
        it('when the asset on the lineItem does not have a downloadUrl and transcodeStatus is  \'Completed\'', () => {
          expect(componentUnderTest.nothingToDownload({ transcodeStatus: 'Completed' })).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the asset on the lineItem does not have a downloadUrl and the transcodeStatus is any but \'Completed\'', () => {
          expect(componentUnderTest.nothingToDownload({ transcodeStatus: 'Failed', downloadUrl: null })).toBe(false);
        });
        it('when the asset on the lineItem has a downloadUrl and the transcodeStatus is \'Completed\'', () => {
          expect(componentUnderTest.nothingToDownload({ transcodeStatus: 'Completed', downloadUrl: 'some-url.mov' })).toBe(false);
        });
      });
    });

    describe('showAsperaButtonFor()', () => {
      describe('returns true', () => {
        it('when the transcode status on the lineItem is \'Completed\' and there is an asperaSpec', () => {
          expect(componentUnderTest.showAsperaButtonFor({ transcodeStatus: 'Completed', asperaSpec: 'some-spec' })).toBe(true);
        });
      });

      describe('returns false', () => {
        it('if the transcode status is not \'Completed\'', () => {
          expect(componentUnderTest.showAsperaButtonFor({ transcodeStatus: 'Submitted' })).toBe(false);
        });

        it('if the transcode status is \'Completed\', but there is no asperaSpec', () => {
          expect(componentUnderTest.showAsperaButtonFor({ transcodeStatus: 'Completed' })).toBe(false);
        });
      });
    });

    describe('iconForNotesButton()', () => {
      it('returns \'keyboard_arrow_down\' when the note is not visble', () => {
        const mockLineItem: any = { id: 'abc' };
        expect(componentUnderTest.iconForNotesButton(mockLineItem)).toBe('keyboard_arrow_down');
      });

      it('returns \'keyboard_arrow_up\' when the note is visble', () => {
        const mockLineItem: any = { id: 'abc' };
        componentUnderTest.toggleNotesVisibilityFor(mockLineItem);
        expect(componentUnderTest.iconForNotesButton(mockLineItem)).toBe('keyboard_arrow_up');
      });
    });

    describe('toggleNotesVisibilityFor()', () => {
      it('toggles the boolean for the given lineItem', () => {
        const mockLineItem: any = { id: 'xyz-789', notes: [{ notes: ['a note'] }] };

        expect(componentUnderTest.noteVisibilityMap[mockLineItem.id]).toBeFalsy(); // starts as undefined
        componentUnderTest.toggleNotesVisibilityFor(mockLineItem);
        expect(componentUnderTest.noteVisibilityMap[mockLineItem.id]).toBe(true);
        componentUnderTest.toggleNotesVisibilityFor(mockLineItem);
        expect(componentUnderTest.noteVisibilityMap[mockLineItem.id]).toBe(false);
      });
    });

    describe('hasNotes()', () => {
      describe('returns true', () => {
        it('when the lineItem has at least 1 note', () => {
          expect(componentUnderTest.hasNotes({ notes: [{ notes: ['a note'] }] })).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the lineItem does not have a note', () => {
          expect(componentUnderTest.hasNotes({ notes: [{ notes: [] }] })).toBe(false);
        });

        it('when the lineItem does not have a notes property in the notes', () => {
          expect(componentUnderTest.hasNotes({ notes: [{}] } as any)).toBe(false);
        });

        it('when the notes property on the lineItem is empty', () => {
          expect(componentUnderTest.hasNotes({ notes: [] } as any)).toBe(false);
        });

        it('when there is no notes property on the lineItem', () => {
          expect(componentUnderTest.hasNotes({})).toBe(false);
        });
      });
    });

    describe('shouldShowNoteFor()', () => {
      describe('returns true', () => {
        it('when the lineItem has notes and the toggle is true', () => {
          const mockLineItem: any = { id: 'abc-123', notes: [{ notes: ['a note'] }] };
          componentUnderTest.toggleNotesVisibilityFor(mockLineItem); // toggle to true, because it starts as undefined

          expect(componentUnderTest.shouldShowNoteFor(mockLineItem)).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the lineItem doesn\'t have notes', () => {
          const mockLineItem: any = { id: 'def-456' };
          expect(componentUnderTest.shouldShowNoteFor(mockLineItem)).toBe(false);
        });

        it('when the lineItem does have notes, but the toggle is false', () => {
          const mockLineItem: any = { id: 'abc-123', notes: [{ notes: ['a note'] }] };
          expect(componentUnderTest.shouldShowNoteFor(mockLineItem)).toBe(false);
        });
      });
    });
  });
};
