import { QuotesComponent } from './quotes.component';
import { Observable } from 'rxjs/Observable';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Quotes Component', () => {
    let componentUnderTest: QuotesComponent;
    let mockStore: MockAppStore;
    let mockQuotesService: any;
    let mockUserCapabilities: any;
    let mockRouter: any;
    let hasPermission: boolean;
    let mockDialogService: any;

    beforeEach(() => {
      hasPermission = false;

      mockUserCapabilities = { administerQuotes: jasmine.createSpy('administerQuotes').and.returnValue(hasPermission) };

      mockQuotesService = {
        data: Observable.of({}),
        getQuotes: jasmine.createSpy('getQuotes').and.returnValue(Observable.of({})),
        setFocused: jasmine.createSpy('setFocused').and.returnValue(Observable.of({})),
        createEmpty: jasmine.createSpy('createEmpty').and.returnValue(Observable.of({}))
      };

      mockRouter = { navigate: jasmine.createSpy('navigate') };

      mockDialogService = { openConfirmationDialog: jasmine.createSpy('openConfirmationDialog') };

      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', { components: { cart: { config: { some: 'config' } } } });

      componentUnderTest = new QuotesComponent(
        mockUserCapabilities, mockQuotesService, mockStore, mockRouter, mockDialogService
      );
    });

    describe('changePage()', () => {
      it('should call navigate on the router with the proper params', () => {
        componentUnderTest.changePage('3');
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/quotes', { i: '3' }]);
      });
    });

    describe('onSortResults()', () => {
      let mockSort: any;
      beforeEach(() => {
        mockSort = { sort: { s: 'createdOn', d: true }, value: 'createdNewestFirst', id: 1 };
        componentUnderTest.onSortResults(mockSort);
      });
      it('should set the current sort', () => {
        expect(componentUnderTest.currentSort).toEqual(mockSort);
      });

      it('should call navigate on the router with the proper params', () => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/quotes', { s: 'createdOn', d: true }]);
      });
    });

    describe('onFilterResults()', () => {
      let mockFilter: any;
      beforeEach(() => {
        mockFilter = { id: 1, value: 'active', status: { status: 'active' } };
        componentUnderTest.onFilterResults(mockFilter);
      });

      it('should set the current filter', () => {
        expect(componentUnderTest.currentFilter).toBe(mockFilter);
      });

      it('should call navigate on the router with the correct params', () => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/quotes', { status: 'active', i: 1 }]);
      });
    });

    describe('onEditQuote()', () => {
      it('call setFocused() on the quotes service', () => {
        componentUnderTest.onEditQuote(1);

        expect(mockQuotesService.setFocused).toHaveBeenCalledWith(1);
      });

      it('should navigate', () => {
        componentUnderTest.onEditQuote(1);

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/active-quote']);
      });
    });

    describe('onSetAsFocusedQuote()', () => {
      it('call setFocused() on the quotes service', () => {
        componentUnderTest.onSetAsFocusedQuote(1);

        expect(mockQuotesService.setFocused).toHaveBeenCalledWith(1);
      });
    });

    describe('onRejectQuote()', () => {
      it('should call openConfirmationDialog on the dialog service', () => {
        componentUnderTest.onRejectQuote({ id: 1 } as any);

        expect(mockDialogService.openConfirmationDialog).toHaveBeenCalled();
      });

      it('should pass the right config to the dialog service', () => {
        componentUnderTest.onRejectQuote({ id: 1 } as any);

        expect(mockDialogService.openConfirmationDialog).toHaveBeenCalledWith({
          title: 'QUOTE.REJECT.TITLE',
          message: 'QUOTE.REJECT.MESSAGE',
          accept: 'QUOTE.REJECT.ACCEPT',
          decline: 'QUOTE.REJECT.DECLINE'
        }, jasmine.any(Function));
      });
    });

    describe('createNewQuote', () => {
      beforeEach(() => {
        componentUnderTest.createNewQuote();
      });

      it('should call the createEmpty() method on the quotes service', () => {
        expect(mockQuotesService.createEmpty).toHaveBeenCalled();
      });

      it('should navigate to /commerce/active-quote', () => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/active-quote']);
      });
    });
  });
}
