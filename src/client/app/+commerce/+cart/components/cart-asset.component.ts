import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { StateMapper } from '../../../app.store';
import { Asset } from '../../../shared/interfaces/common.interface';
import { FormFields } from '../../../shared/interfaces/forms.interface';
import { AppStore } from '../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'cart-asset',
  template: `
    <asset-component
      [assetType]="'cart'"
      [commentFormConfig]="commentFormConfig">
    </asset-component>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartAssetComponent implements OnInit {
  public commentFormConfig: FormFields;

  constructor(private store: AppStore) { }

  public ngOnInit(): void {
    this.commentFormConfig = this.store.snapshotCloned(state => state.uiConfig.components.cartComment.config.form.items);
  }
}
