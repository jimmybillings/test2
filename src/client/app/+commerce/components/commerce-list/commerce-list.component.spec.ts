import { CommerceListComponent } from './commerce-list.component';

export function main() {
  describe('Commerce List Component', () => {
    let componentUnderTest: CommerceListComponent;

    beforeEach(() => {
      componentUnderTest = new CommerceListComponent();
    });

    describe('shouldShowSetFocusedButton', () => {
      it('Should return true if all conditions are met', () => {
        componentUnderTest.type = 'QUOTE';
        componentUnderTest.userCanAdministerQuotes = true;
        expect(componentUnderTest.shouldShowSetFocusedButton({ quoteStatus: 'PENDING' } as any)).toBe(true);
      });

      it('Should return false if the type is order', () => {
        componentUnderTest.type = 'ORDER';
        componentUnderTest.userCanAdministerQuotes = true;
        expect(componentUnderTest.shouldShowSetFocusedButton({ quoteStatus: 'PENDING' } as any)).toBe(false);
      });

      it('Should return false if the user doesnt have permission', () => {
        componentUnderTest.type = 'QUOTE';
        componentUnderTest.userCanAdministerQuotes = false;
        expect(componentUnderTest.shouldShowSetFocusedButton({ quoteStatus: 'PENDING' } as any)).toBe(false);
      });

      it('Should return false if the quote is not pending', () => {
        componentUnderTest.type = 'QUOTE';
        componentUnderTest.userCanAdministerQuotes = true;
        expect(componentUnderTest.shouldShowSetFocusedButton({ quoteStatus: 'notpending' } as any)).toBe(false);
      });
    });

    describe('shouldShowEditQuoteButton', () => {
      it('Should return true if all conditions are met', () => {
        componentUnderTest.type = 'QUOTE';
        componentUnderTest.userCanAdministerQuotes = true;
        expect(componentUnderTest.shouldShowEditQuoteButton({ quoteStatus: 'PENDING' } as any)).toBe(true);
      });

      it('Should return false if the type is order', () => {
        componentUnderTest.type = 'ORDER';
        componentUnderTest.userCanAdministerQuotes = true;
        expect(componentUnderTest.shouldShowEditQuoteButton({ quoteStatus: 'PENDING' } as any)).toBe(false);
      });

      it('Should return false if the user doesnt have permission', () => {
        componentUnderTest.type = 'QUOTE';
        componentUnderTest.userCanAdministerQuotes = false;
        expect(componentUnderTest.shouldShowEditQuoteButton({ quoteStatus: 'PENDING' } as any)).toBe(false);
      });

      it('Should return false if the quote is not pending', () => {
        componentUnderTest.type = 'QUOTE';
        componentUnderTest.userCanAdministerQuotes = true;
        expect(componentUnderTest.shouldShowEditQuoteButton({ quoteStatus: 'notpending' } as any)).toBe(false);
      });
    });

    describe('shouldShowViewQuoteButton', () => {
      it('should return true if all conditions are met', () => {
        componentUnderTest.type = 'QUOTE';
        expect(componentUnderTest.shouldShowViewQuoteButton({ quoteStatus: 'notpending' } as any)).toBe(true);
      });

      it('should return false if the type is order', () => {
        componentUnderTest.type = 'ORDER';
        expect(componentUnderTest.shouldShowViewQuoteButton({ quoteStatus: 'notpending' } as any)).toBe(false);
      });

      it('should return false if quote is pending', () => {
        componentUnderTest.type = 'QUOTE';
        expect(componentUnderTest.shouldShowViewQuoteButton({ quoteStatus: 'PENDING' } as any)).toBe(false);
      });
    });

    describe('shouldShowRefundIndicatorFor()', () => {
      describe('should return false', () => {
        it('if the type is not "ORDER"', () => {
          componentUnderTest.type = 'QUOTE';
          expect(componentUnderTest.shouldShowRefundIndicatorFor({} as any)).toBe(false);
        });

        it('if the order does not have a creditMemoForOrderId field', () => {
          componentUnderTest.type = 'ORDER';
          expect(componentUnderTest.shouldShowRefundIndicatorFor({} as any)).toBe(false);
        });
      });

      describe('should return true', () => {
        it('if the type is "ORDER" and the order has a creditMemoForOrderId field', () => {
          componentUnderTest.type = 'ORDER';
          expect(componentUnderTest.shouldShowRefundIndicatorFor({ creditMemoForOrderId: 12345 } as any)).toBe(true);
        });
      });
    });

    describe('shouldShowPaymentBalanceFor()', () => {
      it('returns true if the order is of type ORDER and has a paymentBalance and a paymentDueDate', () => {
        componentUnderTest.type = 'ORDER';
        expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345, paymentDueDate: 'test date' } as any)).toBe(true);
      });

      it('returns false if the order is not of type ORDER but does have both a paymentBalance and a paymentDueDate', () => {
        componentUnderTest.type = 'QUOTE';
        expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345, paymentDueDate: 'test date' } as any)).toBe(false);
      });

      it('returns false if the order is of type ORDER but does not have both a paymentBalance and a paymentDueDate', () => {
        componentUnderTest.type = 'ORDER';
        expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: 12345 } as any)).toBe(false);
      });

      it('returns false if the order is of type ORDER but paymentBalance is less than zero and it has a paymentDueDate', () => {
        componentUnderTest.type = 'ORDER';
        expect(componentUnderTest.shouldShowPaymentBalanceFor({ paymentBalance: -123, paymentDueDate: 'test date' } as any)).toBe(false);
      });
    });

    describe('shouldShowViewOrderButton()', () => {
      it('should return true if the type is order', () => {
        componentUnderTest.type = 'ORDER';
        expect(componentUnderTest.shouldShowViewOrderButton).toBe(true);
      });

      it('should return false if the type is quote', () => {
        componentUnderTest.type = 'QUOTE';
        expect(componentUnderTest.shouldShowViewOrderButton).toBe(false);
      });
    });
  });
};

