import { Observable } from 'rxjs/Observable';

import { CollectionsService } from './collections.service';
import { MockApiService, mockApiMatchers } from '../mocks/mock-api.service';
import { Api } from '../interfaces/api.interface';
import { Collection } from '../interfaces/collection.interface';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Collections service', () => {
    let serviceUnderTest: CollectionsService, mockCollectionsStore: any,
      mockApi: MockApiService, mockCollection: Collection;

    let mockStore: MockAppStore;

    mockCollection = {
      lastUpdated: null,
      createdOn: null,
      id: 158,
      siteName: 'core',
      name: 'golf',
      owner: 33,
      tags: ['golf', 'green', 'sport']
    };

    function isActiveCollection(id: number): boolean { return id === 123; }

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApi = new MockApiService();
      mockCollectionsStore = {
        deleteAllCollections: jasmine.createSpy('deleteAllCollections'),
        deleteCollectionWith: jasmine.createSpy('deleteCollectionWith'),
        add: jasmine.createSpy('add'),
        update: jasmine.createSpy('update'),
        replaceAllCollectionsWith: jasmine.createSpy('replaceAllCollectionsWith'),
        state: { items: [{ id: 1 }, { id: 2 }], pagination: {} },
        data: Observable.of({ items: [{ id: 1 }, { id: 2 }], pagination: {} })
      };

      mockStore = new MockAppStore();
      serviceUnderTest = new CollectionsService(mockCollectionsStore, mockApi.injector, mockStore);
    });

    it('should not sync if there are no collections', () => {
      mockCollectionsStore = {
        deleteAllCollections: jasmine.createSpy('deleteAllCollections'),
        deleteCollectionWith: jasmine.createSpy('deleteCollectionWith'),
        add: jasmine.createSpy('add'),
        update: jasmine.createSpy('update'),
        replaceAllCollectionsWith: jasmine.createSpy('replaceAllCollectionsWith'),
        state: { items: [], pagination: {} },
        data: Observable.of({ items: [], pagination: {} })
      };
      mockStore.createStateElement('activeCollection', 'collection', { items: [] });
      serviceUnderTest = new CollectionsService(mockCollectionsStore, mockApi.injector, mockStore);
      expect(mockCollectionsStore.update).not.toHaveBeenCalled();
    });

    it('should have a data getter that returns an observable of the store\'s state', () => {
      serviceUnderTest.data.subscribe((data: any) => {
        expect(data).toEqual({ items: [{ id: 1 }, { id: 2 }], pagination: {} });
      });
    });

    it('should have a state getter that returns the store\'s state', () => {
      expect(serviceUnderTest.state).toEqual(mockCollectionsStore.state);
    });

    describe('load()', () => {
      it('call the apiService correctly without arguments', () => {
        serviceUnderTest.load();

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('collectionSummary/search');
        expect(mockApi.get).toHaveBeenCalledWithParameters({ q: '', accessLevel: 'all', s: '', d: '', i: 0, n: 200 });
        expect(mockApi.get).toHaveBeenCalledWithLoading(false);
      });

      it('call the apiService correctly with arguments', () => {
        serviceUnderTest.load({ q: 'ross', n: 20 }, true);

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('collectionSummary/search');
        expect(mockApi.get).toHaveBeenCalledWithParameters({ q: 'ross', accessLevel: 'all', s: '', d: '', i: 0, n: 20 });
        expect(mockApi.get).toHaveBeenCalledWithLoading(true);
      });

      it('should replace collections in the store with the response', () => {
        serviceUnderTest.load().take(1).subscribe();

        expect(mockCollectionsStore.replaceAllCollectionsWith).toHaveBeenCalledWith(mockApi.getResponse);
      });
    });

    describe('create()', () => {
      it('should call the apiService correctly', () => {
        serviceUnderTest.create(mockCollection);

        expect(mockApi.post).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApi.post).toHaveBeenCalledWithEndpoint('collectionSummary');
        expect(mockApi.post).toHaveBeenCalledWithBody(mockCollection);
        expect(mockApi.post).toHaveBeenCalledWithLoading(true);
      });

      it('should add the response to the store', () => {
        serviceUnderTest.create(mockCollection).take(1).subscribe();

        expect(mockCollectionsStore.add).toHaveBeenCalledWith(mockApi.postResponse);
      });
    });

    describe('update()', () => {
      it('should call the apiService correctly', () => {
        mockApi.getResponse = { some: 'cart', name: 'old name' };

        serviceUnderTest.update(158, { name: 'new name' } as any).subscribe();

        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('collection/158');
        expect(mockApi.get).toHaveBeenCalledWithLoading('onBeforeRequest');

        expect(mockApi.put).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.put).toHaveBeenCalledWithEndpoint('collection/158');
        expect(mockApi.put).toHaveBeenCalledWithBody({ some: 'cart', name: 'new name' });
        expect(mockApi.put).toHaveBeenCalledWithLoading('offAfterResponse');
      });
    });

    describe('delete()', () => {
      it('should delete the corresponding collection from the store', () => {
        serviceUnderTest.delete(123);

        expect(mockCollectionsStore.deleteCollectionWith).toHaveBeenCalledWith(123);
      });

      it('should call the apiService correctly', () => {
        serviceUnderTest.delete(123);

        expect(mockApi.delete).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApi.delete).toHaveBeenCalledWithEndpoint('collection/123');
        expect(mockApi.delete).toHaveBeenCalledWithLoading('onBeforeRequest');
      });

      it('should reload the active collection if the collection being deleted is active', () => {
        mockStore.createStateSection('activeCollection', { loaded: true, collection: { id: 123 } });
        const spy = mockStore.createActionFactoryMethod('activeCollection', 'load');

        serviceUnderTest.delete(123).take(1).subscribe();

        mockStore.expectDispatchFor(spy);
      });

      it('should NOT reload the active collection if the collection being deleted is NOT active', () => {
        mockStore.createStateSection('activeCollection', { loaded: true, collection: { id: 123 } });

        serviceUnderTest.delete(1).take(1).subscribe();

        expect(mockStore.dispatch).not.toHaveBeenCalled();
      });
    });

    describe('reset()', () => {
      it('should call deleteAllCollections() on the collections store', () => {
        serviceUnderTest.reset();

        expect(mockCollectionsStore.deleteAllCollections).toHaveBeenCalled();
      });

      it('does not dispatch an active collection reset action', () => {
        const spy = mockStore.createActionFactoryMethod('activeCollection', 'reset');

        serviceUnderTest.reset();

        mockStore.expectNoDispatchFor(spy);
      });
    });

    describe('destroyAll()', () => {
      it('should call deleteAllCollections() on the collections store', () => {
        mockStore.createActionFactoryMethod('activeCollection', 'reset');

        serviceUnderTest.destroyAll();

        expect(mockCollectionsStore.deleteAllCollections).toHaveBeenCalled();
      });

      it('dispatches an active collection reset action', () => {
        const spy = mockStore.createActionFactoryMethod('activeCollection', 'reset');

        serviceUnderTest.destroyAll();

        mockStore.expectDispatchFor(spy);
      });
    });
  });
}
