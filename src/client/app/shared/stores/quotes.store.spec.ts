import { QuotesStore, quotes } from './quotes.store';
import { Observable } from 'rxjs/Observable';

export function main() {
  const initState: any = {
    items: null,
    pagination: {
      totalCount: 0,
      currentPage: 1,
      pageSize: 20,
      hasNextPage: false,
      hasPreviousPage: false,
      numberOfPages: 0
    }
  };

  describe('quotes reducer', () => {
    it('returns the payload for QUOTES.SET_QUOTES', () => {
      expect(quotes(initState, { type: 'QUOTES.SET_QUOTES', payload: { key: 'value' } }))
        .toEqual({ key: 'value' });
    });

    it('returns the current state for an unexpected action type', () => {
      expect(quotes(initState, { type: 'BLAH', payload: { someKey: 'someValue' } }))
        .toEqual(initState);
    });

    it('returns the default state for no current state and an unexpected action type', () => {
      expect(quotes(undefined, { type: 'BLAH', payload: { someKey: 'someValue' } }))
        .toEqual(initState);
    });
  });

  describe('Quotes Store', () => {
    let storeUnderTest: QuotesStore, mockStore: any;

    beforeEach(() => {
      mockStore = {
        dispatch: jasmine.createSpy('dispatch'),
        select: jasmine.createSpy('select').and.returnValue(Observable.of(initState))
      };
      storeUnderTest = new QuotesStore(mockStore);
    });

    describe('data getter', () => {
      it('should return the right data', () => {
        storeUnderTest.data.take(1).subscribe(d => {
          expect(d).toEqual(initState);
        });
      });

      it('should call store.select() with "quotes"', () => {
        storeUnderTest.data.take(1).subscribe();

        expect(mockStore.select).toHaveBeenCalledWith('quotes');
      });
    });

    describe('state', () => {
      it('should return the right state', () => {
        expect(storeUnderTest.state).toEqual(initState);
      });
    });

    describe('setQuotes', () => {
      it('should call dispatch on the store with the right payload', () => {
        let newQuotes: any = {
          items: [],
          totalCount: 0,
          currentPage: 0,
          pageSize: 20,
          hasNextPage: false,
          hasPreviousPage: false,
          numberOfPages: 0
        };
        storeUnderTest.setQuotes(newQuotes);
        expect(mockStore.dispatch).toHaveBeenCalledWith({
          type: 'QUOTES.SET_QUOTES',
          payload: {
            items: [],
            pagination: {
              totalCount: 0,
              currentPage: 1,
              pageSize: 20,
              hasNextPage: false,
              hasPreviousPage: false,
              numberOfPages: 0
            }
          }
        });
      });
    });
  });
}
