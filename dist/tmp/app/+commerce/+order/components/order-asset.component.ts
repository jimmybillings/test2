import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { StateMapper, AppStore } from '../../../app.store';
import { Asset } from '../../../shared/interfaces/common.interface';
import { FormFields } from '../../../shared/interfaces/forms.interface';

@Component({
  moduleId: module.id,
  selector: 'order-asset',
  template: `
    <asset-component
      [commentFormConfig]="commentFormConfig"
      [assetType]="'order'">
    </asset-component>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderAssetComponent implements OnInit {
  public commentFormConfig: FormFields;

  constructor(private store: AppStore) { }

  public ngOnInit(): void {
    this.commentFormConfig = this.store.snapshotCloned(state => state.uiConfig.components.cartComment.config.form.items);
  }
}
