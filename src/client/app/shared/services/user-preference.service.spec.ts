import { UserPreferenceService } from './user-preference.service';
import { Observable } from 'rxjs/Observable';
import { MockApiService, mockApiMatchers } from '../mocks/mock-api.service';
import { Api } from '../interfaces/api.interface';

export function main() {
  describe('UserPreferenceService', () => {
    let serviceUnderTest: UserPreferenceService;
    let mockCurrentUserServiceService: any;
    let mockStore: any;
    let mockApi: MockApiService;

    mockCurrentUserServiceService = {
      loggedIn: () => false
    };

    let data: any = { displayFilterCounts: false, collectionTrayIsOpen: false, searchIsOpen: true, sortId: 0 };

    mockStore = {
      dispatch: (_: any) => Object.assign(data, _.payload),
      select: (_: string) => Observable.of(data)
    };

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApi = new MockApiService();
      mockApi.getResponse = { prefs: { displayFilterCounts: 'false', collectionTrayIsOpen: 'true' } };
      serviceUnderTest = new UserPreferenceService(mockCurrentUserServiceService, mockStore, mockApi.injector);
      serviceUnderTest.reset();
    });

    it('Should have a state() getter method that returns the state of the store', () => {
      expect(serviceUnderTest.state).toEqual(
        {
          displayFilterCounts: false, collectionTrayIsOpen: false,
          searchIsOpen: true, sortId: 0, displayFilterTree: false, assetView: 'grid',
          pricingPreferences: {}
        });
    });

    it('should have a getPrefs() method that calls the api', () => {
      serviceUnderTest.getPrefs();

      expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
      expect(mockApi.get).toHaveBeenCalledWithEndpoint('userPreferences');
    });

    it('Should have a toggleSearch method that toggles the searchIsOpen property', () => {
      expect(serviceUnderTest.state.searchIsOpen).toEqual(true);
      serviceUnderTest.toggleSearch();
      expect(serviceUnderTest.state.searchIsOpen).toEqual(false);
      serviceUnderTest.toggleSearch();
      expect(serviceUnderTest.state.searchIsOpen).toEqual(true);
    });

    it('Should have a closeSearch method that sets the searchIsOpen property to false', () => {
      expect(serviceUnderTest.state.searchIsOpen).toEqual(true);
      serviceUnderTest.closeSearch();
      expect(serviceUnderTest.state.searchIsOpen).toEqual(false);
    });

    it('Should have a toggleCollectionTray method that toggles the collectionTrayIsOpen property', () => {
      expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(false);
      serviceUnderTest.openCollectionTray();
      expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(true);
      serviceUnderTest.toggleCollectionTray();
      expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(false);
    });

    it('Should have a openCollectionTray method that sets the collectionTrayIsOpen property to true', () => {
      expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(false);
      serviceUnderTest.openCollectionTray();
      expect(serviceUnderTest.state.collectionTrayIsOpen).toEqual(true);
    });

    it('Should have an updateSortPreference() method that takes a sortId and sets it in the store', () => {
      expect(serviceUnderTest.state.sortId).toEqual(0);
      serviceUnderTest.updateSortPreference(16);
      expect(serviceUnderTest.state.sortId).toEqual(16);
    });

    it('Should have an updateAssetViewPreference() method that takes an asset view type and sets it in the store', () => {
      expect(serviceUnderTest.state.assetView).toEqual('grid');
      serviceUnderTest.updateAssetViewPreference('list');
      expect(serviceUnderTest.state.assetView).toEqual('list');
    });

    it('should have a toggleFilterCount() method that updates the displayFilterCounts property in the store', () => {
      expect(serviceUnderTest.state.displayFilterCounts).toBe(false);
      serviceUnderTest.toggleFilterCount();
      expect(serviceUnderTest.state.displayFilterCounts).toBe(true);
      serviceUnderTest.toggleFilterCount();
      expect(serviceUnderTest.state.displayFilterCounts).toBe(false);
    });

    it('should have a toggleFilterTree() method that updates the displayFilterTree property in the store', () => {
      expect(serviceUnderTest.state.displayFilterTree).toBe(false);
      serviceUnderTest.toggleFilterTree();
      expect(serviceUnderTest.state.displayFilterTree).toBe(true);
      serviceUnderTest.toggleFilterTree();
      expect(serviceUnderTest.state.displayFilterTree).toBe(false);
    });

    it('Should have an set() method that updates the store', () => {
      spyOn(serviceUnderTest.store, 'dispatch');
      serviceUnderTest.set({ filterCounts: true });
      expect(serviceUnderTest.store.dispatch).toHaveBeenCalledWith(
        { type: 'USER_PREFS.UPDATE_PREFERENCES', payload: { filterCounts: true } });
    });

    it('Should have an reset method that reset the store to default values', () => {
      expect(serviceUnderTest.state).toEqual(
        {
          displayFilterCounts: false, collectionTrayIsOpen: false,
          searchIsOpen: true, sortId: 0, displayFilterTree: false, assetView: 'grid',
          pricingPreferences: {}
        });
      serviceUnderTest.toggleCollectionTray();
      serviceUnderTest.toggleSearch();
      serviceUnderTest.updateSortPreference(100);
      serviceUnderTest.updateAssetViewPreference('list');
      expect(serviceUnderTest.state).toEqual(
        {
          displayFilterCounts: false, collectionTrayIsOpen: true,
          searchIsOpen: false, sortId: 100, displayFilterTree: false, assetView: 'list',
          pricingPreferences: {}
        });
      serviceUnderTest.reset();
      expect(serviceUnderTest.state).toEqual(
        {
          displayFilterCounts: false, collectionTrayIsOpen: false,
          searchIsOpen: true, sortId: 0, displayFilterTree: false, assetView: 'grid',
          pricingPreferences: {}
        });
    });
  });
}
