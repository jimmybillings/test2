import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Gallery, GalleryResults, GalleryPath } from '../interfaces/gallery-view.interface';
import { LegacyAction } from '../interfaces/common.interface';

export function gallery(state: Gallery = initialState(), action: LegacyAction) {
  switch (action.type) {
    case 'REPLACE_GALLERY':
      return Object.assign({}, action.payload ? action.payload : initialState());

    default:
      return state;
  }
};

@Injectable()
export class GalleryViewStore {
  constructor(private store: Store<any>) { }  // Was Store<Gallery> before ngrx upgrade.

  public get data(): Observable<Gallery> {
    return this.store.select('gallery');
  }

  public get state(): Gallery {
    let state: Gallery;
    this.data.take(1).subscribe(galleryData => state = galleryData);
    return state;
  }

  public replaceWith(results: GalleryResults, path: GalleryPath): void {
    this.store.dispatch({
      type: 'REPLACE_GALLERY',
      payload: { results: results, numberOfLevels: this.numberOfLevelsIn(results), path: path }
    });
  }

  private numberOfLevelsIn(results: GalleryResults): number {
    return results ? 1 + Math.max(...results.map(result => this.numberOfLevelsIn(result.children))) : 0;
  }
}

function initialState(): Gallery {
  return {
    results: [],
    numberOfLevels: 0,
    path: []
  };
};
