import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CollectionsService } from '../../shared/services/collections.service';

@Injectable()
export class CollectionsResolver implements Resolve<boolean> {
  constructor(private collectionsService: CollectionsService) { }

  public resolve(): Observable<boolean> {
    // Destroy cached collections (if any) so that this resolver won't resolve until we're done reloading.  (This eliminates
    // a post-navigation flicker if the collections have updated.) Looked at doing this in collectionsService.load() instead,
    // but that method has way too many responsibilities.  So we'll control it from here.
    //
    // (This can be managed more naturally -- reactively -- once Collections have moved to the AppStore.)
    this.collectionsService.reset();

    this.collectionsService.load().subscribe();

    return this.collectionsService.data.map(collections => collections.items.length > 0).filter(data => data).take(1);
  }
}
