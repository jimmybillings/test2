import { SearchContext } from './search-context.service';
import { Observable } from 'rxjs/Observable';

export function main() {
  let serviceUnderTest: SearchContext, mockStore: any, mockRouter: any;

  beforeEach(() => {
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(Observable.of({ the: 'store' })),
      dispatch: jasmine.createSpy('dispatch')
    };
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    serviceUnderTest = new SearchContext(mockRouter, mockStore);
  });

  describe('Search Context Service', () => {
    describe('instantiation', () => {
      it('Should set up the data instance variable', () => {
        serviceUnderTest.data.subscribe((d: any) => expect(d).toEqual({ the: 'store' }));
      });
    });

    describe('new()', () => {
      beforeEach(() => {
        serviceUnderTest.new({ q: 'cat', i: 1, n: 100 });
      });

      it('Should set the store', () => {
        expect(mockStore.dispatch).toHaveBeenCalledWith({
          type: 'SEARCHCONTEXT.CREATE',
          payload: { q: 'cat', i: '1', n: '100' }
        });
      });

      it('should call "navigate" on the router', () => {
        expect(mockRouter.navigate).toHaveBeenCalled();
      });
    });

    describe('state getter', () => {
      it('returns the searchContext', () => {
        expect(serviceUnderTest.state).toEqual({ the: 'store' });
      });
    });

    describe('update setter', () => {
      it('updates the store with params', () => {
        serviceUnderTest.update = { q: 'cat', i: 1, n: 100 };

        expect(mockStore.dispatch).toHaveBeenCalledWith({
          type: 'SEARCHCONTEXT.UPDATE',
          payload: { q: 'cat', i: '1', n: '100' }
        });
      });

      it('Should have an update setter method that updates the store with decoded params', () => {
        serviceUnderTest.update = { q: 'cats%20and%20dogs', i: 1, n: 100 };

        expect(mockStore.dispatch).toHaveBeenCalledWith({
          type: 'SEARCHCONTEXT.UPDATE',
          payload: { q: 'cats and dogs', i: '1', n: '100' }
        });
      });
    });
  });
}
