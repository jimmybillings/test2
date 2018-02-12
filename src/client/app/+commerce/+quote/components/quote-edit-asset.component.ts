import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormFields } from '../../../shared/interfaces/forms.interface';
import { StateMapper, AppStore } from '../../../app.store';
import { Asset } from '../../../shared/interfaces/common.interface';

@Component({
  moduleId: module.id,
  selector: 'quote-asset',
  template: `
    <asset-component 
      [assetType]="'quoteEdit'"
      [commentFormConfig]="commentFormConfig">
    </asset-component>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuoteEditAssetComponent implements OnInit {
  public commentFormConfig: FormFields;

  constructor(private store: AppStore) { }

  ngOnInit() {
    this.commentFormConfig = this.store.snapshotCloned(state => state.uiConfig.components.quoteComment.config.form.items);
  }
}
