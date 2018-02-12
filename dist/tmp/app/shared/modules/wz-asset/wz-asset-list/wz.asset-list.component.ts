import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { WzAsset } from '../wz-asset';
import { AppStore } from '../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'wz-asset-list',
  templateUrl: 'wz.asset-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzAssetListComponent extends WzAsset {
  constructor(store: AppStore, detector: ChangeDetectorRef) {
    super(store, detector);
  }
}
