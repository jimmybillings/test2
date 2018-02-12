import { SearchComponent } from './search.component';
import { Observable } from 'rxjs/Observable';
import { MockAppStore } from '../store/spec-helpers/mock-app.store';

export function main() {
  describe('Search Component', () => {
    let componentUnderTest: SearchComponent;
    let mockSearchService: any;
    let mockUserCan: any;
    let mockSearchContext: any;
    let mockFilter: any;
    let mockUserPreferences: any;
    let mockSortDefinition: any;
    let mockCart: any;
    let mockAssetService: any;
    let mockRenderer: any;
    let mockWindow: any;
    let mockRouter: any;
    let mockActivatedRoute: any;
    let mockRefDetector: any;
    let mockStore: MockAppStore;
    let searchResetDispatchSpy: jasmine.Spy;
    let canEditCollection: boolean;
    let confirmationDialogDispatchSpy: jasmine.Spy;

    beforeEach(() => {
      mockUserCan = {
        administerQuotes: () => false,
        editCollection: () => Observable.of(canEditCollection)
      };

      mockSearchContext = {
        update: null,
        go: jasmine.createSpy('go'),
        remove: jasmine.createSpy('remove'),
        state: {
          q: 'cat', i: 7, n: 100, sortId: 23, filterIds: '1517',
          filterValues: '1517:2015-12-10 - 2016-12-12'
        }
      };

      mockFilter = {
        load: jasmine.createSpy('load').and.returnValue(Observable.of([])),
        set: jasmine.createSpy('set'),
        active: jasmine.createSpy('active'),
        toggle: jasmine.createSpy('toggle'),
        getActive: jasmine.createSpy('getActive').and.returnValue(
          { filters: [{ filterId: 1 }, { filterId: 2 }, { filterId: 3, filterValue: 'Cat' }], ids: [1, 2, 3], values: ['Cat'] }),
        addCustom: jasmine.createSpy('addCustom'),
        toggleExclusive: jasmine.createSpy('toggleExclusive'),
        clear: jasmine.createSpy('clear'),
        toggleFilterGroup: jasmine.createSpy('toggleFilterGroup')
      };

      mockUserPreferences = {
        data: Observable.of({ displayFilterCounts: false, displayFilterTree: true }),
        toggleFilterCount: jasmine.createSpy('toggleFilterCount'),
        openCollectionTray: jasmine.createSpy('openCollectionTray'),
        updateSortPreference: jasmine.createSpy('updateSortPreference'),
        state: { displayFilterCounts: false, displayFilterTree: true },
        updateAssetViewPreference: jasmine.createSpy('updateAssetViewPreference')
      };

      mockSortDefinition = {
        updateSortPreference: jasmine.createSpy('updateSortPreference'),
        update: jasmine.createSpy('update'),
        data: Observable.of({ currentSort: 'mockSort' })
      };

      mockCart = {
        addAssetToProjectInCart: jasmine.createSpy('addAssetToProjectInCart')
      };

      mockWindow = {
        nativeWindow: {
          location: { href: null },
          innerWidth: 500
        }
      };
      mockActivatedRoute = {
        snapshot: {
          params: {
            gq: '[{"ids":[13,18],"names":["press packet","day 04"]},{"ids":[3],"names":["adam scott"]}]',
            n: 1,
            i: 100
          }
        }
      };

      mockRouter = {
        navigate: jasmine.createSpy('navigate'),
        events: Observable.of({})
      };

      mockRefDetector = {
        markForCheck: () => { return true; }
      };

      mockStore = new MockAppStore();

      searchResetDispatchSpy = mockStore.createActionFactoryMethod('search', 'reset');
      confirmationDialogDispatchSpy = mockStore.createActionFactoryMethod('dialog', 'showConfirmation');

      componentUnderTest = new SearchComponent(
        mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
        mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector, mockStore
      );
    });

    describe('constructor()', () => {
      it('should not set the path if the "gq" parameter doesn\'t exist', () => {
        mockActivatedRoute = { snapshot: { params: { i: 1, n: 100 } } };
        componentUnderTest = new SearchComponent(
          mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
          mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector, mockStore
        );

        expect(componentUnderTest.path).toEqual('');
      });

      it('should set the path if there is a "gq" parameter', () => {
        expect(componentUnderTest.path).toEqual([
          { 'ids': [13, 18], 'names': ['press packet', 'day 04'] },
          { 'ids': [3], 'names': ['adam scott'] }
        ]);
      });

      it('returns observable of true when the \'filtersAreAvailable\'in the store is true', () => {
        mockStore.createStateSection('headerDisplayOptions', { filtersAreAvailable: true });
        componentUnderTest = new SearchComponent(
          mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
          mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector, mockStore
        );
        let areAvailable: boolean;
        componentUnderTest.filtersAreAvailable.take(1).subscribe(available => areAvailable = available);
        expect(areAvailable).toBe(true);
      });
    });

    describe('onCLickBreadcrumb()', () => {
      it('should append to the path and call router.navigate()', () => {
        componentUnderTest.path = [
          { 'ids': [13, 18], 'names': ['press packet', 'day 04'] },
          { 'ids': [3], 'names': ['adam scott'] }
        ];
        componentUnderTest.onClickBreadcrumb(1);

        expect(mockRouter.navigate).toHaveBeenCalledWith([
          '/gallery-view',
          { path: '[{"ids":[13,18],"names":["press packet","day 04"]}]' }
        ]);
      });
    });

    describe('onresize()', () => {
      it('Should set the screen size variable when screen size change', () => {
        mockWindow.nativeWindow.onresize();
        expect(componentUnderTest.screenWidth).toBe(500);
      });
    });

    describe('ngOnDestroy()', () => {
      it('dispatch the search reset action', () => {
        componentUnderTest.ngOnDestroy();
        mockStore.expectDispatchFor(searchResetDispatchSpy);
      });
    });

    describe('countToggle()', () => {
      it('Should call the filter service get with the search context state and the opposite boolean value' +
        +' of the current displayFilterCounts boolean', () => {
          componentUnderTest.countToggle();
          expect(componentUnderTest.filter.load).toHaveBeenCalledWith(
            { q: 'cat', i: 7, n: 100, sortId: 23, filterIds: '1517', filterValues: '1517:2015-12-10 - 2016-12-12' },
            true
          );
        });

      it('Should call the user preference service to toggle the filter count boolean', () => {
        componentUnderTest.countToggle();
        expect(mockUserPreferences.toggleFilterCount).toHaveBeenCalled();
      });
    });

    describe('changePage()', () => {
      it('Should call the update setter on search context to update the search context state', () => {
        componentUnderTest.changePage(1);
        expect(mockSearchContext.update).toEqual({ i: 1 });
      });

      it('Should call the go method on searchContext', () => {
        componentUnderTest.changePage(1);
        expect(mockSearchContext.go).toHaveBeenCalled();
      });
    });

    describe('filterEvent()', () => {
      it('Should call the filter service with a filter id to toggle its boolean on/off value', () => {
        componentUnderTest.filterEvent({ event: 'toggleFilter', filter: { filterId: 1 } });
        expect(componentUnderTest.filter.toggle).toHaveBeenCalledWith(1);
        expect(mockSearchContext.go).toHaveBeenCalled();
      });

      it('Should call the filter service to toggle a filter group to show/hide', () => {
        componentUnderTest.filterEvent({ event: 'toggleFilterGroup', filter: { filterId: 1 } });
        expect(componentUnderTest.filter.toggleFilterGroup).toHaveBeenCalledWith({ filterId: 1 });
      });

      it('Should call the filter service to apply an exculsive filter', () => {
        componentUnderTest.filterEvent({ event: 'applyExclusiveFilter', filter: { filterId: 1 } });
        expect(componentUnderTest.filter.toggleExclusive).toHaveBeenCalledWith({ filterId: 1 });
        expect(mockSearchContext.go).toHaveBeenCalled();
      });

      it('Should call the filter service to apply a custom value on a filter', () => {
        componentUnderTest.filterEvent(
          { event: 'applyCustomValue', filter: { filterId: 1 }, customValue: 'mockCustomValue' }
        );
        expect(componentUnderTest.filter.addCustom).toHaveBeenCalledWith({ filterId: 1 }, 'mockCustomValue');
        expect(mockSearchContext.go).toHaveBeenCalled();
      });

      it('Should call the filter service to clear all filters / reset', () => {
        componentUnderTest.filterEvent({ event: 'clearFilters', filter: { filterId: 1 } });
        expect(componentUnderTest.filter.clear).toHaveBeenCalled();
        expect(mockSearchContext.go).toHaveBeenCalled();
      });
    });

    describe('onSortResults()', () => {
      it('Should call the user preference service to update the user sort preference', () => {
        componentUnderTest.sortResults({ id: 'sortByDate' });
        expect(mockUserPreferences.updateSortPreference).toHaveBeenCalledWith('sortByDate');
      });

      it('Should call sort definition service to update with new sort', () => {
        componentUnderTest.sortResults({ id: 'sortByDate' });
        expect(mockSortDefinition.update).toHaveBeenCalledWith({ currentSort: { id: 'sortByDate' } });
      });

      it('Should call the search context service to update the store with the new sort preference for the url', () => {
        componentUnderTest.sortResults({ id: 'sortByDate' });
        expect(mockSearchContext.update).toEqual({ 'i': 1, 'sortId': 'sortByDate' });
      });

      it('Should call the search context service to exectue and new browser url', () => {
        componentUnderTest.sortResults({ id: 'sortByDate' });
        expect(mockSearchContext.go).toHaveBeenCalled();
      });
    });

    describe('changeAssetView()', () => {
      it('Should update user preference when new view type is selected', () => {
        componentUnderTest.changeAssetView('list');
        expect(mockUserPreferences.updateAssetViewPreference).toHaveBeenCalledWith('list');
      });
    });

    describe('addAssetToCart()', () => {
      it('Should call the cart summary service to add an asset to the cart', () => {
        componentUnderTest.addAssetToCart({ assetId: 'mockId' });
        expect(mockCart.addAssetToProjectInCart).toHaveBeenCalledWith({ lineItem: { asset: { assetId: 'mockId' } } });
      });
    });

    describe('filterAssets()', () => {
      it('Should reset the page number to page 1', () => {
        mockFilter.getActive = jasmine.createSpy('getActive').and.returnValue({ filters: [], ids: [], values: [] });
        componentUnderTest = new SearchComponent(
          mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
          mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector,
          mockStore
        );
        componentUnderTest.filterEvent({ event: 'clearFilters', filter: { filterId: 1 } });
        expect(mockSearchContext.update).toEqual({ i: 1 });
      });

      it('Should update the search context with the filter ids', () => {
        mockFilter.getActive = jasmine.createSpy('getActive').and.returnValue({ filters: [], ids: [1, 2, 3], values: [] });
        componentUnderTest = new SearchComponent(
          mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
          mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector,
          mockStore
        );
        componentUnderTest.filterEvent({ event: 'clearFilters', filter: { filterId: 1 } });
        expect(mockSearchContext.update).toEqual({ 'filterIds': '1,2,3' });
      });

      it('Should remove the filterIds from the search context', () => {
        mockFilter.getActive = jasmine.createSpy('getActive').and.returnValue({ filters: [], ids: [], values: ['cat', 'dog'] });
        componentUnderTest = new SearchComponent(
          mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
          mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector,
          mockStore
        );
        componentUnderTest.filterEvent({ event: 'clearFilters', filter: { filterId: 1 } });
        expect(mockSearchContext.remove).toEqual('filterIds');
      });

      it('Should update the search context with the filter values', () => {
        mockFilter.getActive = jasmine.createSpy('getActive').and.returnValue({ filters: [], ids: [], values: ['cat', 'dog'] });
        componentUnderTest = new SearchComponent(
          mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
          mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector,
          mockStore
        );
        componentUnderTest.filterEvent({ event: 'clearFilters', filter: { filterId: 1 } });
        expect(mockSearchContext.update).toEqual({ 'filterValues': 'cat,dog' });
      });

      it('Should remove the filterValues from the search context', () => {
        mockFilter.getActive = jasmine.createSpy('getActive').and.returnValue({ filters: [], ids: [], values: [] });
        componentUnderTest = new SearchComponent(
          mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
          mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector,
          mockStore
        );
        componentUnderTest.filterEvent({ event: 'clearFilters', filter: { filterId: 1 } });
        expect(mockSearchContext.remove).toEqual('filterValues');
      });

      it('Should call go on search context when it has filtered the assets', () => {
        mockFilter.getActive = jasmine.createSpy('getActive').and.returnValue({ filters: [], ids: [], values: [] });
        componentUnderTest = new SearchComponent(
          mockUserCan, mockFilter, mockCart, mockSortDefinition, mockSearchContext,
          mockUserPreferences, mockWindow, mockActivatedRoute, mockRouter, mockRefDetector,
          mockStore
        );
        componentUnderTest.filterEvent({ event: 'clearFilters', filter: { filterId: 1 } });
        expect(mockSearchContext.go).toHaveBeenCalled();
      });
    });

    describe('canEditCollection()', () => {
      beforeEach(() => {
        mockStore.createStateSection('activeCollection', { collection: { some: 'collection' } });
      });

      it('returns true if userCan.editCollection() returns true', () => {
        canEditCollection = true;
        let result: boolean;
        componentUnderTest.canEditCollection.take(1).subscribe(res => result = res);
        expect(result).toBe(true);
      });

      it('returns false if userCan.editCollection() returns false', () => {
        canEditCollection = false;
        let result: boolean;
        componentUnderTest.canEditCollection.take(1).subscribe(res => result = res);
        expect(result).toBe(false);
      });
    });

    describe('onClickAddAllBtn()', () => {
      it('dispatches the proper action', () => {
        mockStore.createStateSection('activeCollection', { collection: { name: 'some collection' } });
        componentUnderTest.onClickAddAllBtn();

        mockStore.expectDispatchFor(confirmationDialogDispatchSpy, {
          title: { key: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.TITLE', values: { collectionName: 'some collection' } },
          message: { key: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.MESSAGE', values: { collectionName: 'some collection' } },
          accept: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.ACCEPT',
          decline: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.DECLINE'
        }, jasmine.any(Function));
      });
    });
  });
}

