import { Routes } from '@angular/router';
import { CollectionShowResolver } from './services/collection-show.resolver';
import { CollectionsComponent } from './+index/collections.component';
import { CollectionShowComponent } from './+show/collection-show.component';
import { CollectionGuard } from './services/collection-guard';
import { CollectionComponent } from './collection.component';
import { CollectionAssetComponent } from './components/collection-asset.component';
import { CollectionAssetResolver } from './services/collection-asset.resolver';
import { CollectionsResolver } from './services/collections.resolver';

export const COLLECTION_ROUTES: Routes = [
  {
    path: 'collections', component: CollectionComponent,
    children: [
      {
        path: '',
        component: CollectionsComponent,
        canActivate: [CollectionGuard],
        resolve: { collections: CollectionsResolver },
        data: { title: 'PAGE_TITLE.COLLECTIONS' }
      },
      {
        path: ':id',
        component: CollectionShowComponent,
        canActivate: [CollectionGuard],
        resolve: { collection: CollectionShowResolver },
        data: { title: 'PAGE_TITLE.COLLECTION' }
      },
      {
        path: ':id/asset/:uuid',
        component: CollectionAssetComponent,
        canActivate: [CollectionGuard],
        resolve: { asset: CollectionAssetResolver },
        data: { title: 'PAGE_TITLE.COLLECTION_ASSET' }
      },
    ]
  }
];


