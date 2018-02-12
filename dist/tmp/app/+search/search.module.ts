import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './filter.component';
import { NoResultsComponent } from './no-results.component';
import { SearchHeaderComponent } from './search-header.component';
import { SearchAssetComponent } from './search-asset.component';
import { SearchResolver } from './services/search.resolver';
import { SearchAssetResolver } from './services/search-asset.resolver';
import { SearchAssetGuard } from './services/search-asset.guard';
import { SEARCH_ROUTES } from './search.routes';
import { AssetModule } from '../+asset/asset.module';

@NgModule({
    imports: [SharedModule, AssetModule, RouterModule.forChild(SEARCH_ROUTES)],
    declarations: [SearchComponent, FilterComponent, NoResultsComponent, SearchHeaderComponent, SearchAssetComponent],
    exports: [SearchComponent],
    providers: [SearchResolver, SearchAssetResolver, SearchAssetGuard]
})

export class SearchModule { }
