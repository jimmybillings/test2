import { Observable } from 'rxjs/Observable';

import { addStandardReducerTestsFor } from '../tests/reducer';
import { gallery, GalleryViewStore } from './gallery-view.store';
import { Gallery } from '../interfaces/gallery-view.interface';

export function main() {
  const initialState: Gallery = {
    results: [],
    numberOfLevels: 0,
    path: []
  };

  describe('gallery reducer', () => {
    describe('REPLACE_GALLERY', () => {
      addStandardReducerTestsFor(gallery, 'REPLACE_GALLERY', initialState);

      it('returns payload when current state is passed in', () => {
        expect(gallery(initialState, { type: 'REPLACE_GALLERY', payload: { property1: 'new', other: 'stuff' } }))
          .toEqual({ property1: 'new', other: 'stuff' });
      });

      it('returns payload when current state is not passed in', () => {
        expect(gallery(undefined, { type: 'REPLACE_GALLERY', payload: { some: 'payload' } }))
          .toEqual({ some: 'payload' });
      });

      it('returns initial state when payload is not passed in', () => {
        expect(gallery({ property1: 'existing1', property2: 'existing2' } as any, { type: 'REPLACE_GALLERY' }))
          .toEqual(initialState);
      });
    });
  });

  describe('Gallery View Store', () => {
    let storeUnderTest: GalleryViewStore;
    let mockStore: any;

    beforeEach(() => {
      mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({ someKey: 'someValue' })),
        dispatch: jasmine.createSpy('dispatch')
      };

      storeUnderTest = new GalleryViewStore(mockStore);
    });

    describe('data getter', () => {
      it('accesses the right part of the global store', () => {
        storeUnderTest.data.subscribe();
        expect(mockStore.select).toHaveBeenCalledWith('gallery');
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

    describe('replaceWith()', () => {
      it('dispatches REPLACE_GALLERY with the expected payload', () => {
        const results = [{ id: 3, name: 'Name 3', resultCount: 42, hasMore: false }];
        const path = [{ ids: [1, 2], names: ['Name 1', 'Name 2'] }];

        storeUnderTest.replaceWith(results, path);

        expect(mockStore.dispatch).toHaveBeenCalledWith(
          { type: 'REPLACE_GALLERY', payload: { results: results, numberOfLevels: 1, path: path } }
        );
      });

      it('calculates the correct number of levels for a complex results set', () => {
        const results = [
          {
            id: 3, name: 'Name 3', resultCount: 42, hasMore: true, children: [
              {
                id: 4, name: 'Name 4_1', resultCount: 17, hasMore: true, children: [
                  { id: 5, name: 'Name 5_1', resultCount: 2, hasMore: false },
                  { id: 5, name: 'Name 5_2', resultCount: 46, hasMore: false },
                  { id: 5, name: 'Name 5_3', resultCount: 23, hasMore: false }
                ]
              },
              {
                id: 4, name: 'Name 4_2', resultCount: 99, hasMore: true, children: [
                  { id: 5, name: 'Name 5_1', resultCount: 2, hasMore: false },
                  { id: 5, name: 'Name 5_2', resultCount: 46, hasMore: false },
                  { id: 5, name: 'Name 5_3', resultCount: 23, hasMore: false }
                ]
              }
            ]
          }
        ];

        const path = [{ ids: [1, 2], names: ['Name 1', 'Name 2'] }];

        storeUnderTest.replaceWith(results, path);

        expect(mockStore.dispatch).toHaveBeenCalledWith(
          { type: 'REPLACE_GALLERY', payload: { results: results, numberOfLevels: 3, path: path } }
        );
      });
    });
  });
}
