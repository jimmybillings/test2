import { Routes } from '@angular/router';

import { SearchAssetComponent } from './search-asset.component';
import { SearchAssetResolver } from './services/search-asset.resolver';
import { SearchAssetGuard } from './services/search-asset.guard';
import { SearchComponent } from './search.component';
import { SearchResolver } from './services/search.resolver';

export const SEARCH_ROUTES: Routes = [
  {
    path: 'search',
    children: [
      {
        path: '',
        component: SearchComponent,
        resolve: { search: SearchResolver },
        data: { title: 'PAGE_TITLE.SEARCH' }
      },
      {
        path: 'asset/:id',
        component: SearchAssetComponent,
        resolve: { asset: SearchAssetResolver },
        canActivate: [SearchAssetGuard],
        data: { title: 'PAGE_TITLE.SEARCH_ASSET' }
      }
    ]
  }
];
