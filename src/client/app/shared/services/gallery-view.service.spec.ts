import { Observable } from 'rxjs/Observable';

import { GalleryViewService } from './gallery-view.service';
import { MockApiService, mockApiMatchers } from '../mocks/mock-api.service';
import { Api } from '../interfaces/api.interface';

export function main() {
  describe('Gallery View Service', () => {
    let serviceUnderTest: GalleryViewService;
    let mockStore: any;
    let mockApi: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);

      mockStore = { data: Observable.of('some data'), state: 'some state', replaceWith: jasmine.createSpy('replaceWith') };
      mockApi = new MockApiService();
      mockApi.getResponse = { list: { some: 'response' } };

      serviceUnderTest = new GalleryViewService(mockStore, mockApi.injector);
    });

    describe('data getter', () => {
      it('returns the store\'s data', () => {
        serviceUnderTest.data.subscribe(returnedData => expect(returnedData).toEqual('some data'));
      });
    });

    describe('state getter', () => {
      it('returns the store\'s state', () => {
        expect(serviceUnderTest.state).toEqual('some state');
      });
    });

    describe('load()', () => {
      it('calls the apiService as expected', () => {
        serviceUnderTest.load([{ ids: [1, 2], names: ['Name 1', 'Name 2'] }, { ids: [3], names: ['Name 3'] }]);

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('galleryResult');
        expect(mockApi.get).toHaveBeenCalledWithParameters({ query: '1:"Name 1",2:"Name 2",3:"Name 3"' });
      });

      it('calls the apiService with a null query when the path is null', () => {
        serviceUnderTest.load(null);

        expect(mockApi.get).toHaveBeenCalledWithParameters({ query: null });
      });

      it('calls the apiService with a null query when the path is undefined', () => {
        serviceUnderTest.load(undefined);

        expect(mockApi.get).toHaveBeenCalledWithParameters({ query: null });
      });

      it('calls the apiService with a null query when the path is empty', () => {
        serviceUnderTest.load([]);

        expect(mockApi.get).toHaveBeenCalledWithParameters({ query: null });
      });

      it('returns the API service\'s Observable', () => {
        const path = [{ ids: [1], names: ['Name 1'] }];

        serviceUnderTest.load(path).subscribe(response => {
          expect(response).toEqual({ list: { some: 'response' } });
        });
      });

      it('updates the store with the server\'s response', () => {
        const path = [{ ids: [1], names: ['Name 1'] }];

        serviceUnderTest.load(path).subscribe(response => {
          expect(mockStore.replaceWith).toHaveBeenCalledWith({ some: 'response' }, path);
        });
      });
    });
  });
}
