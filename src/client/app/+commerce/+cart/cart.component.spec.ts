import { Observable } from 'rxjs/Observable';

import { CartComponent } from './cart.component';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Cart Component', () => {
    let componentUnderTest: CartComponent;
    let mockCapabilities: any;
    let mockAppStore: MockAppStore;
    let mockCartService: any;
    let mockChangeDetectorRef: any;

    beforeEach(() => {
      mockCapabilities = { administerQuotes: () => false };

      mockAppStore = new MockAppStore();
      mockAppStore.createStateSection('uiConfig', { components: { cartComment: { config: { form: { items: ['config'] } } } } });
      mockAppStore.createActionFactoryMethod('checkout', 'reset');

      mockCartService = { state: { data: { id: 77 } } };
      mockChangeDetectorRef = { markForCheck: () => { } };
      componentUnderTest = new CartComponent(
        mockCapabilities, mockAppStore, mockCartService, mockChangeDetectorRef
      );
    });

    describe('Initialization', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
      });

      it('defines the expected tabs', () => {
        expect(componentUnderTest.tabLabelKeys).toEqual(['cart', 'billing', 'payment', 'confirm']);
      });

      it('disables all but the first tab', () => {
        expect(componentUnderTest.tabEnabled).toEqual([true, false, false, false]);
      });

      it('selects the first tab', () => {
        expect(componentUnderTest.selectedTabIndex).toBe(0);
      });

      it('gets the uiConfig for the comment form', () => {
        expect(componentUnderTest.commentFormConfig).toEqual(['config']);
      });

      it('assigns the commentParentObject instance variable', () => {
        expect(componentUnderTest.commentParentObject).toEqual({ objectType: 'cart', objectId: 77 });
      });
    });

    describe('toggleCommentsVisibility', () => {
      it('toggles the showComments flag', () => {
        expect(componentUnderTest.showComments).toBeNull();
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(true);
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(false);
      });
    });

    describe('commentCount', () => {
      it('selects the right part of the store', () => {
        mockAppStore.createStateSection('comment', { cart: { pagination: { totalCount: 1000 } } });
        componentUnderTest.commentCount.take(1).subscribe(count => expect(count).toBe(1000));
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
          // componentUnderTest.selectedTabIndex = 1;

          componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });

          setTimeout(_ => {
            expect(componentUnderTest.selectedTabIndex).toBe(4);
            // expect(componentUnderTest.selectedTabIndex).toBe(1);
            done();
          }, 100);
        });
      });

      describe('GO_TO_PREVIOUS_TAB', () => {
        it('selects the previous tab', () => {
          // componentUnderTest.selectedTabIndex = 3;
          componentUnderTest.selectedTabIndex = 1;

          componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });

          // expect(componentUnderTest.selectedTabIndex).toBe(2);
          expect(componentUnderTest.selectedTabIndex).toBe(0);
        });

        it('does not go back beyond the first tab', () => {
          componentUnderTest.selectedTabIndex = 0;

          componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });

          expect(componentUnderTest.selectedTabIndex).toBe(0);
        });
      });
    });
  });
};
