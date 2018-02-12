import { Injectable } from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { AppStore } from '../../app.store';
import { FeatureStore } from '../../shared/stores/feature.store';
import { Feature } from '../../shared/interfaces/feature.interface';
import { Collection } from '../../shared/interfaces/collection.interface';
import { User } from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CollectionCapabilities {
  constructor(public currentUser: CurrentUserService, public store: AppStore, public feature: FeatureStore) { }

  public haveCollections(): boolean {
    return this.feature.isAvailable('disableCollectionAccess');
  }

  public viewCollections(): boolean {
    return this.haveCollections() && this.userHas('ViewCollections');
  }

  public editCollections(): boolean {
    return this.haveCollections() && this.userHas('EditCollections');
  }

  public viewCollectionTray(): boolean {
    return this.store.snapshot(state => state.headerDisplayOptions.canBeFixed) &&
      this.haveCollections() &&
      this.userHas('ViewCollections');
  }

  public editCollection(collection: Collection): Observable<boolean> {
    return this.currentUser.data.map((user: User) => {
      // A mayfly user has an id of 0 and the collection initialState has an owner id of 0,
      // so we need to check that they are both truthy values before proceeding to the other logic,
      // otherwise the first condition would be met, and it would return a false "true"
      return (user.id !== 0 && collection.owner !== 0) && (
        (user.id === collection.owner) ||
        (user.editableCollections && user.editableCollections.includes(collection.id)) ||
        (collection.editors && collection.editors.map(editor => editor.id).includes(user.id)) ||
        (collection.userRole === 'editor' || collection.userRole === 'owner')
      );
    });
  }

  public userHas(permission: string): boolean {
    return this.currentUser.hasPermission(permission);
  }
}
