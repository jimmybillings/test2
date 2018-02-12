import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Common } from '../utilities/common.functions';
import { Collection, CollectionsStoreI, CollectionSummary } from '../interfaces/collection.interface';
import { LegacyAction } from '../interfaces/common.interface';

export function collections(state: CollectionsStoreI = initialState(), action: LegacyAction) {
  if (state === null) state = initialState();

  let updatedItems: Collection[];

  switch (action.type) {
    case 'REPLACE_COLLECTIONS':
      return Object.assign({}, action.payload ? action.payload : initialState());

    case 'ADD_COLLECTION':
      updatedItems = state.items ? Common.clone(state.items) : [];
      if (action.payload) updatedItems.push(action.payload);

      return Object.assign({}, state, { items: updatedItems });

    case 'UPDATE_COLLECTION':
      if (!state.items || !action.payload) return state;

      updatedItems = state.items.map((collection: Collection) => {
        return collection.id === action.payload.id ? action.payload : collection;
      });

      return Object.assign({}, state, { items: updatedItems });

    case 'DELETE_COLLECTION':
      if (!state.items) return state;

      updatedItems = state.items.filter((collection: Collection) => collection.id !== action.payload);
      return Object.assign({}, state, { items: updatedItems });

    case 'DELETE_ALL_COLLECTIONS':
      return Object.assign({}, initialState());

    default:
      return state;
  }
};

@Injectable()
export class CollectionsStore {
  constructor(private store: Store<any>) { }  // Was Store<CollectionsStoreI> before ngrx upgrade.

  public get data(): Observable<CollectionSummary> {
    return this.store.select('collections');
  }

  public get state(): Collection[] {
    let s: any;
    this.data.take(1).subscribe(state => s = state);
    return s;
  }

  public deleteAllCollections(): void {
    this.store.dispatch({ type: 'DELETE_ALL_COLLECTIONS' });
  }

  public deleteCollectionWith(collectionId: number): void {
    this.store.dispatch({ type: 'DELETE_COLLECTION', payload: collectionId });
  }

  public add(newCollection: Collection): void {
    this.store.dispatch({ type: 'ADD_COLLECTION', payload: newCollection });
  }

  public update(collection: Collection): void {
    this.store.dispatch({ type: 'UPDATE_COLLECTION', payload: collection });
  }

  public replaceAllCollectionsWith(replacements: any): void {
    replacements.items = replacements.items === undefined ? [] : replacements.items;
    this.store.dispatch({
      type: 'REPLACE_COLLECTIONS', payload: {
        items: replacements.items,
        pagination: {
          totalCount: replacements.totalCount,
          currentPage: replacements.currentPage + 1,
          hasNextPage: replacements.hasNextPage,
          hasPreviousPage: replacements.hasPreviousPage,
          numberOfPages: replacements.numberOfPages,
          pageSize: replacements.pageSize
        }
      }
    });
  }
}

function initialState(): CollectionsStoreI {
  return {
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
};
