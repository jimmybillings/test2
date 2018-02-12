import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Asset } from '../../../shared/interfaces/commerce.interface';

@Component({
  moduleId: module.id,
  selector: 'cart-asset-component',
  templateUrl: 'asset.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssetComponent {
  @Input() asset: Asset;
}
