import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../wz-design/wz.design.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { WzPlayerModule } from '../wz-player/wz.player.module';

import { WzAssetGridComponent } from './wz-asset-grid/wz.asset-grid.component';
import { WzAssetListComponent } from './wz-asset-list/wz.asset-list.component';
import { WzSpeedviewComponent } from './wz-speedview/wz.speedview.component';
import { WzSpeedviewDirective } from './wz-speedview/wz.speedview.directive';
import { WzAsperaDownloadDirective } from '../../components/wz-aspera-download/aspera-download.directive';
import { WzDeliveryOptionsComponent } from '../../components/wz-delivery-options/wz.delivery-options.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    WzPlayerModule
  ],
  declarations: [
    WzAssetGridComponent,
    WzAssetListComponent,
    WzSpeedviewComponent,
    WzSpeedviewDirective,
    WzDeliveryOptionsComponent,
    WzAsperaDownloadDirective
  ],
  exports: [
    WzSpeedviewComponent,
    WzAssetGridComponent,
    WzAssetListComponent,
    WzDeliveryOptionsComponent,
    WzAsperaDownloadDirective
  ],
  entryComponents: [WzSpeedviewComponent]
})
export class WzAssetModule { }
