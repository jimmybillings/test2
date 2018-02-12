import { SearchService } from './search.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Search Service', () => {
    let serviceUnderTest: SearchService;
    let mockApiService: MockApiService;
    let mockCurrentUserService: any;
    let mockGalleryViewService: any;
    let mockUserPreferenceService: any;
    let loggedIn: boolean;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      mockCurrentUserService = { loggedIn: () => loggedIn };
      mockGalleryViewService = { stringifyPathForSearch: () => 'some-path' };
      mockUserPreferenceService = { state: { assetView: 'grid' } };
      serviceUnderTest = new SearchService(
        mockApiService.injector,
        mockCurrentUserService,
        mockGalleryViewService,
        mockUserPreferenceService
      );
    });

    describe('loadResults()', () => {
      describe('calls the apiService correctly', () => {
        it('for a logged in user - without a query', () => {
          loggedIn = true;
          serviceUnderTest.loadResults({ i: 1, n: 100 });

          expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
          expect(mockApiService.get).toHaveBeenCalledWithEndpoint('search');
          expect(mockApiService.get).toHaveBeenCalledWithParameters({
            i: '0',
            n: '100',
            q: 'itemType:clip',
            viewType: 'grid'
          });
          expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        });

        it('for a logged out user - with a query', () => {
          loggedIn = false;
          serviceUnderTest.loadResults({ i: 1, n: 100, q: 'dog' });

          expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
          expect(mockApiService.get).toHaveBeenCalledWithEndpoint('search/anonymous');
          expect(mockApiService.get).toHaveBeenCalledWithParameters({
            i: '0',
            n: '100',
            q: 'dog',
            viewType: 'grid'
          });
          expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        });

        it('for a logged in user - with a gallery view query', () => {
          loggedIn = true;
          serviceUnderTest.loadResults({
            i: 1,
            n: 100,
            gq: '[{\"ids\":[15,7],\"names\":[\"tournament week events\",\"press building images\"]}]'
          });

          expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
          expect(mockApiService.get).toHaveBeenCalledWithEndpoint('search');
          expect(mockApiService.get).toHaveBeenCalledWithParameters({
            i: '0',
            n: '100',
            gq: 'some-path',
            q: 'itemType:clip',
            viewType: 'grid'
          });
          expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        });
      });

      describe('normalize()', () => {
        it('normalizes the results', () => {
          mockApiService.getResponse = {
            items: [{ some: 'items' }],
            totalCount: 1,
            pageSize: 20,
            currentPage: 0,
            numberOfPages: 1,
            hasNextPage: false,
            hasPreviousPage: false
          };

          let normalized: any;
          serviceUnderTest.loadResults({ i: 1, n: 100 }).subscribe(results => normalized = results);
          expect(normalized).toEqual({
            items: [{ some: 'items' }],
            pagination: {
              totalCount: 1,
              pageSize: 20,
              currentPage: 1,
              numberOfPages: 1,
              hasNextPage: false,
              hasPreviousPage: false
            }
          });
        });
      });
    });
  });
}
