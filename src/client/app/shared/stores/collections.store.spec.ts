import { collections, CollectionsStore } from './collections.store';
import { Collection, CollectionsStoreI } from '../interfaces/collection.interface';
import { addStandardReducerTestsFor } from '../tests/reducer';
import { Observable } from 'rxjs/Observable';
import { Common } from '../utilities/common.functions';

export function main() {
  const initialState: CollectionsStoreI = {
    items: [],
    pagination: {
      totalCount: 0,
      currentPage: 1,
      pageSize: 100,
      hasNextPage: false,
      hasPreviousPage: false,
      numberOfPages: 0
    }
  };

  describe('REPLACE_COLLECTIONS', () => {
    addStandardReducerTestsFor(collections, 'REPLACE_COLLECTIONS', initialState);

    it('returns payload when current state is passed in', () => {
      expect(collections(
        { property1: 'existing1', property2: 'existing2' } as any,
        { type: 'REPLACE_COLLECTIONS', payload: { property1: 'new', other: 'stuff' } }
      ))
        .toEqual({ property1: 'new', other: 'stuff' });
    });

    it('returns payload when current state is not passed in', () => {
      expect(collections(undefined, { type: 'REPLACE_COLLECTIONS', payload: { some: 'payload' } }))
        .toEqual({ some: 'payload' });
    });

    it('returns initial state when payload is not passed in', () => {
      expect(collections(
        { property1: 'existing1', property2: 'existing2' } as any,
        { type: 'REPLACE_COLLECTIONS' }
      ))
        .toEqual(initialState);
    });
  });

  describe('ADD_COLLECTION', () => {
    addStandardReducerTestsFor(collections, 'ADD_COLLECTION', initialState);

    it('returns current state merged with payload when current state is passed in', () => {
      expect(collections(
        { items: [{ collection: '1' }, { collection: '2' }] } as any,
        { type: 'ADD_COLLECTION', payload: { collection: '3' } }
      ))
        .toEqual({ items: [{ collection: '1' }, { collection: '2' }, { collection: '3' }] });
    });

    it('returns initial state merged with payload when current state is not passed in', () => {
      const expectedResult = Common.clone(initialState) as any;
      expectedResult.items = [{ collection: '42' }];

      expect(collections(undefined, { type: 'ADD_COLLECTION', payload: { collection: '42' } }))
        .toEqual(expectedResult);
    });

    it('returns current state merged with payload when current state does not define items', () => {
      expect(collections(
        { some: 'nonitems' } as any,
        { type: 'ADD_COLLECTION', payload: { collection: '123' } }
      ))
        .toEqual({ some: 'nonitems', items: [{ collection: '123' }] });
    });

    it('returns current state unchanged when payload is not passed in', () => {
      expect(collections(
        { items: [{ collection: '1' }, { collection: '2' }] } as any,
        { type: 'ADD_COLLECTION' }
      ))
        .toEqual({ items: [{ collection: '1' }, { collection: '2' }] });
    });
  });

  describe('UPDATE_COLLECTION', () => {
    const tempInitialState = { items: [{ id: 42, content: 'original' }] };
    const tempPayload = { id: 42, content: 'new' };

    addStandardReducerTestsFor(collections, 'UPDATE_COLLECTION', tempInitialState, tempPayload);

    it('returns current state updated with payload collection when current state is passed in', () => {
      expect(collections(tempInitialState as any, { type: 'UPDATE_COLLECTION', payload: tempPayload }))
        .toEqual({ items: [{ id: 42, content: 'new' }] });
    });

    it('returns initial state unchanged when current state is not passed in', () => {
      expect(collections(undefined, { type: 'UPDATE_COLLECTION', payload: tempPayload }))
        .toEqual(initialState);
    });

    it('returns current state unchanged when payload is a nonexistent collection', () => {
      expect(collections(tempInitialState as any, { type: 'UPDATE_COLLECTION', payload: { id: 17, content: 'whatever' } }))
        .toEqual({ items: [{ id: 42, content: 'original' }] });
    });

    it('returns current state unchanged when current state does not define items', () => {
      expect(collections({ some: 'nonitems' } as any, { type: 'UPDATE_COLLECTION', payload: tempPayload }))
        .toEqual({ some: 'nonitems' });
    });

    it('returns current state unchanged when payload is not passed in', () => {
      expect(collections(tempInitialState as any, { type: 'UPDATE_COLLECTION' }))
        .toEqual(tempInitialState);
    });
  });

  describe('DELETE_COLLECTION', () => {
    const tempInitialState = { items: [{ id: 25, content: 'whatever' }] };
    const tempPayload = 25;

    addStandardReducerTestsFor(collections, 'DELETE_COLLECTION', tempInitialState, tempPayload);

    it('returns current state minus the collection with the payload ID when current state is passed in', () => {
      expect(collections(
        { items: [{ id: 123 }, { id: 456 }] } as any,
        { type: 'DELETE_COLLECTION', payload: 123 }
      ))
        .toEqual({ items: [{ id: 456 }] });
    });

    it('returns initial state when current state is not passed in', () => {
      expect(collections(undefined, { type: 'DELETE_COLLECTION', payload: 123 }))
        .toEqual(initialState);
    });

    it('returns current state unchanged when current state does not define items', () => {
      expect(collections({ some: 'nonitems' } as any, { type: 'DELETE_COLLECTION', payload: 99 }))
        .toEqual({ some: 'nonitems' });
    });

    it('returns current state unchanged when payload is not passed in', () => {
      expect(collections(tempInitialState as any, { type: 'DELETE_COLLECTION' }))
        .toEqual(tempInitialState);
    });
  });

  describe('DELETE_ALL_COLLECTIONS', () => {
    it('returns initial state when current state is passed in', () => {
      expect(collections(
        { property1: 'existing1', property2: 'existing2' } as any,
        { type: 'DELETE_ALL_COLLECTIONS' }
      ))
        .toEqual(initialState);
    });

    it('returns initial state when current state is not passed in', () => {
      expect(collections(undefined, { type: 'DELETE_ALL_COLLECTIONS' }))
        .toEqual(initialState);
    });
  });
};

describe('Collections Store', () => {
  let storeUnderTest: CollectionsStore, mockStore: any;

  beforeEach(() => {
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(Observable.of({ someKey: 'someValue' })),
      dispatch: jasmine.createSpy('dispatch')
    };
    storeUnderTest = new CollectionsStore(mockStore);
  });

  describe('data getter', () => {
    it('accesses the right part of the global store', () => {
      storeUnderTest.data.subscribe();
      expect(mockStore.select).toHaveBeenCalledWith('collections');
    });

    it('returns the expected data', () => {
      storeUnderTest.data.subscribe(data => {
        expect(data).toEqual({ someKey: 'someValue' });
      });
    });
  });

  describe('state getter', () => {
    it('should return the state', () => {
      expect(storeUnderTest.state).toEqual({ someKey: 'someValue' });
    });
  });

  describe('deleteAllCollections()', () => {
    it('should dispatch DELETE_ALL_COLLECTIONS', () => {
      storeUnderTest.deleteAllCollections();

      expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'DELETE_ALL_COLLECTIONS' });
    });
  });

  describe('deleteCollectionWith()', () => {
    it('should dispatch DELETE_COLLECTION with the collectionId', () => {
      storeUnderTest.deleteCollectionWith(123);

      expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'DELETE_COLLECTION', payload: 123 });
    });
  });

  describe('add()', () => {
    it('should dispatch ADD_COLLECTION with the new collection', () => {
      let newCollection: Collection = { id: 1, name: 'Cat', owner: 12, lastUpdated: null, createdOn: null, siteName: 'core' };
      storeUnderTest.add(newCollection);

      expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'ADD_COLLECTION', payload: newCollection });
    });
  });

  describe('update()', () => {
    it('should dispatch UPDATE_COLLECTION with the updated collection', () => {
      let updatedCollection: Collection = { id: 1, name: 'Dog', owner: 12, lastUpdated: null, createdOn: null, siteName: 'core' };
      storeUnderTest.update(updatedCollection);

      expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'UPDATE_COLLECTION', payload: updatedCollection });
    });
  });

  describe('replaceAllCollectionsWith()', () => {
    it('should replace with the items passed in', () => {
      let collection: Collection = { id: 1, name: 'Dogs', owner: 12, lastUpdated: null, createdOn: null, siteName: 'core' };
      let replacements: any = {
        items: [collection], totalCount: 1, currentPage: 0,
        hasNextPage: false, hasPreviousPage: false, numberOfPages: 1, pageSize: 1
      };
      storeUnderTest.replaceAllCollectionsWith(replacements);

      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: 'REPLACE_COLLECTIONS',
        payload: {
          items: [collection],
          pagination: { totalCount: 1, currentPage: 1, hasNextPage: false, hasPreviousPage: false, numberOfPages: 1, pageSize: 1 }
        }
      });
    });

    it('should replace with an empty array if there are no items', () => {
      let replacements: any = { totalCount: 0, currentPage: 0, hasNextPage: false, hasPreviousPage: false, numberOfPages: 1, pageSize: 0 };
      storeUnderTest.replaceAllCollectionsWith(replacements);

      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: 'REPLACE_COLLECTIONS',
        payload: {
          items: [],
          pagination: { totalCount: 0, currentPage: 1, hasNextPage: false, hasPreviousPage: false, numberOfPages: 1, pageSize: 0 }
        }
      });
    });
  });
});
