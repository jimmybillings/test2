import { ErrorBase } from './error.base';

export function main() {
  describe('Error Base Class', () => {
    let classUnderTest: ErrorBase;
    let mockCapabilities: any;
    let canAddToCart: boolean;
    let canAdministerQuotes: boolean;
    let canViewCollections: boolean;

    beforeEach(() => {
      mockCapabilities = {
        addToCart: () => canAddToCart,
        administerQuotes: () => canAdministerQuotes,
        viewCollections: () => canViewCollections
      };
      classUnderTest = new ErrorBase(mockCapabilities);
    });

    describe('showCartLink getter', () => {
      describe('returns false', () => {
        it('when the user can\'t add to their cart', () => {
          canAddToCart = false;
          expect(classUnderTest.showCartLink).toBe(false);
        });

        it('when the user can add to their cart, but can administer quotes', () => {
          canAddToCart = true;
          canAdministerQuotes = true;
          expect(classUnderTest.showCartLink).toBe(false);
        });
      });

      describe('returns true', () => {
        it('when the user can add to their cart and can\'t administer quotes', () => {
          canAddToCart = true;
          canAdministerQuotes = false;
          expect(classUnderTest.showCartLink).toBe(true);
        });
      });
    });

    describe('showCollectionsLink getter', () => {
      describe('returns false', () => {
        it('when the user can\'t view collections', () => {
          canViewCollections = false;
          expect(classUnderTest.showCollectionsLink).toBe(false);
        });
      });

      describe('returns true', () => {
        it('when the user can\'t view collections', () => {
          canViewCollections = true;
          expect(classUnderTest.showCollectionsLink).toBe(true);
        });
      });
    });

    describe('showQuotesLink getter', () => {
      describe('returns false', () => {
        it('when the user can\'t administer quotes', () => {
          canAdministerQuotes = false;
          expect(classUnderTest.showQuotesLink).toBe(false);
        });
      });

      describe('returns true', () => {
        it('when the user can\'t administer quotes', () => {
          canAdministerQuotes = true;
          expect(classUnderTest.showQuotesLink).toBe(true);
        });
      });
    });
  });
}
