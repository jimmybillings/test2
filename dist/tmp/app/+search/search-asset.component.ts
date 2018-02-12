import { Component, ChangeDetectionStrategy } from '@angular/core';

import { StateMapper } from '../app.store';
import { Asset } from '../shared/interfaces/common.interface';

@Component({
  moduleId: module.id,
  selector: 'search-asset',
  template: `<asset-component [assetType]="'search'"></asset-component>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchAssetComponent { }
