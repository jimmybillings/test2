import { NgModule } from '@angular/core';
import { CollectionsComponent } from './+index/collections.component';
import { CollectionShowComponent } from './+show/collection-show.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { COLLECTION_ROUTES } from './collection.routes';
import { CollectionShowResolver } from '../+collection/services/collection-show.resolver';
import { CollectionAssetResolver } from '../+collection/services/collection-asset.resolver';
import { CollectionsResolver } from '../+collection/services/collections.resolver';
import { CollectionGuard } from './services/collection-guard';
import { WzCollectionItemListComponent } from './components/wz.collection-item-list.component';
import { CollectionComponent } from './collection.component';
import { CollectionAssetComponent } from './components/collection-asset.component';
import { CollectionShareComponent } from './components/collection-share.component';
import { CollectionShareMembersComponent } from './components/collection-share-members.component';
import { AssetModule } from '../+asset/asset.module';

@NgModule({
  imports: [SharedModule, AssetModule, RouterModule.forChild(COLLECTION_ROUTES)],
  declarations: [
    CollectionComponent,
    CollectionsComponent,
    CollectionShowComponent,
    WzCollectionItemListComponent,
    CollectionAssetComponent,
    CollectionShareComponent,
    CollectionShareMembersComponent
  ],
  exports: [CollectionComponent, CollectionsComponent, CollectionShowComponent],
  providers: [CollectionShowResolver, CollectionGuard, CollectionAssetResolver, CollectionsResolver],
  entryComponents: [CollectionShareMembersComponent, CollectionShareComponent]
})

export class CollectionModule { }
