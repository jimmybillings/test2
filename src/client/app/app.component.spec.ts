import { Observable } from 'rxjs/Observable';
import { Event, NavigationEnd, RoutesRecognized } from '@angular/router';

import { AppComponent } from './app.component';
import { MockAppStore } from './store/spec-helpers/mock-app.store';

export function main() {
  describe('App Component', () => {
    let mockRouter: any;
    let mockMultiLingual: any;
    let mockSearchContext: any;
    let mockCurrentUserService: any;
    let mockCollections: any;
    let mockUserPreference: any;
    let mockNotification: any;
    let mockUserCan: any;
    let mockWindow: any;
    let mockNgZone: any;
    let componentUnderTest: AppComponent;
    let mockStore: MockAppStore;
    let mockFilter: any;
    let mockSortDefinition: any;
    let cartLoadSpy: jasmine.Spy;
    let collectionLoadSpy: jasmine.Spy;
    let quoteLoadSpy: jasmine.Spy;
    let setHeaderPositionSpy: jasmine.Spy;
    let checkIfFiltersAreAvailableSpy: jasmine.Spy;
    let checkIfHeaderCanBeFixedSpy: jasmine.Spy;
    let configLoadSpy: jasmine.Spy;
    let resetSpy: jasmine.Spy;
    let setLanguageSpy: jasmine.Spy;
    let loggedInState: boolean = false;
    let canViewCollections: boolean = true;
    let canAdministerQuotes: boolean = false;
    let nextNavigation: Event;
    let mockActivatedRoute: any;
    let mockAuthenticationService: any;

    beforeEach(() => {
      mockRouter = { events: Observable.of(nextNavigation), initialNavigation: jasmine.createSpy('initialNavigation') };

      mockSearchContext = {
        update: null,
        go: jasmine.createSpy('go'),
        new: jasmine.createSpy('new'),
        state: { q: 'cat', i: 7, n: 100, sortId: 23, filterIds: '1517', filterValues: '1517:2015-12-10 - 2016-12-12' }
      };

      mockCurrentUserService = {
        set: jasmine.createSpy('set'),
        destroy: jasmine.createSpy('destroy'),
        loggedIn: () => true,
        loggedInState: () => Observable.of(loggedInState)
      };

      mockCollections = {
        load: jasmine.createSpy('load').and.returnValue(Observable.of({})),
        destroyAll: jasmine.createSpy('destroyAll')
      };

      mockUserPreference = {
        state: {
          sortId: 23,
          displayFilterCounts: true
        },
        reset: jasmine.createSpy('reset'),
        getPrefs: jasmine.createSpy('getPrefs'),
        toggleFilterTree: jasmine.createSpy('toggleFilterTree'),
        updateSortPreference: jasmine.createSpy('updateSortPreference')
      };

      mockUserCan = { viewCollections: () => canViewCollections, administerQuotes: () => canAdministerQuotes };
      mockWindow = { nativeWindow: { pageYOffset: 133, scrollTo: jasmine.createSpy('scrollTo') } };
      mockFilter = { load: jasmine.createSpy('load').and.returnValue(Observable.of({})) };
      mockSortDefinition = { getSortDefinitions: () => Observable.of({ currentSort: { id: 1 } }) };
      mockNgZone = { runOutsideAngular: () => true };
      mockActivatedRoute = {
        data: { title: 'wow' },
        params: { some: 'params' },
        firstChild: 'primary'
      };

      mockStore = new MockAppStore();
      configLoadSpy = mockStore.createActionFactoryMethod('uiConfig', 'load');
      collectionLoadSpy = mockStore.createActionFactoryMethod('activeCollection', 'load');
      cartLoadSpy = mockStore.createActionFactoryMethod('cart', 'load');
      quoteLoadSpy = mockStore.createActionFactoryMethod('quoteEdit', 'load');
      setHeaderPositionSpy = mockStore.createActionFactoryMethod('headerDisplayOptions', 'setHeaderPosition');
      checkIfHeaderCanBeFixedSpy = mockStore.createActionFactoryMethod('headerDisplayOptions', 'checkIfHeaderCanBeFixed');
      checkIfFiltersAreAvailableSpy = mockStore.createActionFactoryMethod('headerDisplayOptions', 'checkIfFiltersAreAvailable');
      resetSpy = mockStore.createActionFactoryMethod('headerDisplayOptions', 'reset');
      setLanguageSpy = mockStore.createActionFactoryMethod('multiLingual', 'setLanguage');

      mockAuthenticationService = { destroy: jasmine.createSpy('destroy').and.returnValue(Observable.of({})) };

      componentUnderTest = new AppComponent(
        mockRouter, mockSearchContext, mockCurrentUserService,
        mockCollections, mockUserPreference, mockUserCan, mockWindow,
        mockFilter, mockSortDefinition, mockNgZone, mockStore, mockActivatedRoute, mockAuthenticationService
      );
    });


    describe('ngOnInit()', () => {
      describe('Set the default language', () => {
        it('dispatchs the default language to be set', () => {
          componentUnderTest.ngOnInit();
          expect(setLanguageSpy).toHaveBeenCalledWith('en');
        });
      });

      describe('processUser()', () => {
        beforeEach(() => {
          nextNavigation = new NavigationEnd(1, '/', '/');
        });

        it('Should process the actions for a logged out user', () => {
          loggedInState = false;
          componentUnderTest.ngOnInit();
          expect(mockCollections.destroyAll).toHaveBeenCalled();
          mockStore.expectDispatchFor(resetSpy);
          expect(mockUserPreference.reset).toHaveBeenCalled();
        });

        it('Should process the actions for a logged in user - without administer quotes', () => {
          loggedInState = true;
          canAdministerQuotes = false;
          componentUnderTest.ngOnInit();

          expect(mockUserPreference.getPrefs).toHaveBeenCalled();
          expect(cartLoadSpy).toHaveBeenCalled();
        });

        it('Should process the actions for a logged in user - with administer quotes', () => {
          loggedInState = true;
          canAdministerQuotes = true;
          componentUnderTest.ngOnInit();

          expect(mockUserPreference.getPrefs).toHaveBeenCalled();
          expect(quoteLoadSpy).toHaveBeenCalled();
        });
      });

      describe('toggleFilterTreePreference()', () => {
        it('should call toggleFilterTree() on the user preference service', () => {
          componentUnderTest.toggleFilterTreePreference();

          expect(mockUserPreference.toggleFilterTree).toHaveBeenCalled();
        });
      });

      describe('routerChanges()', () => {
        describe('for NavigationEnd', () => {
          beforeEach(() => {
            nextNavigation = new NavigationEnd(1, '/', '/');
            componentUnderTest.ngOnInit();
          });

          it('Pass the current state url to see if we should display the search bar', () => {
            mockStore.expectDispatchFor(checkIfHeaderCanBeFixedSpy, '/');
          });

          it('Pass the current state url to see if we should display the filters', () => {
            mockStore.expectDispatchFor(checkIfFiltersAreAvailableSpy, '/');
          });

          it('Assign the current url state to an instance variable', () => {
            expect(componentUnderTest.state).toEqual('/');
          });

          it('Should make sure the page is scrolled to the top on each successful state change', () => {
            expect(mockWindow.nativeWindow.scrollTo).toHaveBeenCalledWith(0, 0);
          });
        });
      });

      describe('loadConfig', () => {
        it('Should initialize the navigation immediately if the config is already loaded', () => {
          mockStore.createStateSection('uiConfig', { loaded: true });
          componentUnderTest.ngOnInit();

          expect(mockRouter.initialNavigation).toHaveBeenCalled();
          mockStore.expectNoDispatchFor(configLoadSpy);
        });

        it('Should load the config if it is not loaded and then initialize the navigation', () => {
          mockStore.createStateSection('uiConfig', { loaded: false });
          componentUnderTest.ngOnInit();

          expect(mockRouter.initialNavigation).not.toHaveBeenCalled();
          mockStore.expectDispatchFor(configLoadSpy);
        });
      });
    });

    describe('logout()', () => {
      beforeEach(() => componentUnderTest.logout());

      it('Should call destroy() on the currentUserService', () => {
        expect(mockCurrentUserService.destroy).toHaveBeenCalled();
      });

      it('Should call destroy() on the authenticationService', () => {
        expect(mockAuthenticationService.destroy).toHaveBeenCalled();
      });
    });

    describe('newSearchContext()', () => {
      it('Should merge the searchContext with a new query and get a new filter tree', () => {
        componentUnderTest.newSearchContext('dogs');
        expect(mockSearchContext.new).toHaveBeenCalledWith(
          {
            q: 'dogs', i: 1, n: 100, sortId: 23, filterIds: '1517',
            filterValues: '1517:2015-12-10 - 2016-12-12'
          });
        expect(mockFilter.load).toHaveBeenCalledWith(
          {
            q: 'dogs', i: 1, n: 100, sortId: 23, filterIds: '1517',
            filterValues: '1517:2015-12-10 - 2016-12-12'
          }, true);
      });
    });

    describe('headerConfig getter', () => {
      it('returns the right part of the UiConfig store when the config is loaded', () => {
        mockStore.createStateSection('uiConfig', { loaded: true, components: { header: { config: { some: 'header' } } } });

        let config: any;
        componentUnderTest.headerConfig.take(1).subscribe(c => config = c);
        expect(config).toEqual({ some: 'header' });
      });
    });

    describe('searchBoxConfig getter', () => {
      it('returns the right part of the UiConfig store when the config is loaded', () => {
        mockStore.createStateSection('uiConfig', { loaded: true, components: { searchBox: { config: { some: 'searchBox' } } } });

        let config: any;
        componentUnderTest.searchBoxConfig.take(1).subscribe(c => config = c);
        expect(config).toEqual({ some: 'searchBox' });
      });
    });

    describe('headerIsFixed getter', () => {
      it('should return observable of true if the isFixed property of the headerDisplayOptions is true', () => {
        mockStore.createStateSection('headerDisplayOptions', { isFixed: true });
        let isFixed: boolean;
        componentUnderTest.headerIsFixed.take(1).subscribe(fixed => isFixed = fixed);
        expect(isFixed).toBe(true);
      });

      it('should return observable of false if the isFixed property of the headerDisplayOptions is false', () => {
        mockStore.createStateSection('headerDisplayOptions', { isFixed: false });
        let isFixed: boolean;
        componentUnderTest.headerIsFixed.take(1).subscribe(fixed => isFixed = fixed);
        expect(isFixed).toBe(false);
      });
    });

    describe('headerCanBeFixed getter', () => {
      it('should return observable of true if the canBeFixed property of the headerDisplayOptions is true', () => {
        mockStore.createStateSection('headerDisplayOptions', { canBeFixed: true });
        let canBeFixed: boolean;
        componentUnderTest.headerCanBeFixed.take(1).subscribe(fixed => canBeFixed = fixed);
        expect(canBeFixed).toBe(true);
      });

      it('should return observable of false if the canBeFixed property of the headerDisplayOptions is false', () => {
        mockStore.createStateSection('headerDisplayOptions', { canBeFixed: false });
        let canBeFixed: boolean;
        componentUnderTest.headerCanBeFixed.take(1).subscribe(fixed => canBeFixed = fixed);
        expect(canBeFixed).toBe(false);
      });
    });
  });
}
