import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StateMapper, AppStore } from '../../app.store';
import { Asset } from '../../shared/interfaces/common.interface';
import { FormFields } from '../../shared/interfaces/forms.interface';
import { CommentParentObject } from '../../shared/interfaces/comment.interface';

@Component({
  moduleId: module.id,
  selector: 'collection-asset',
  template: `
    <asset-component
      [assetType]="'collection'"
      [commentFormConfig]="commentFormConfig">
    </asset-component>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionAssetComponent implements OnInit {
  public commentFormConfig: FormFields;

  constructor(private store: AppStore) { }

  public ngOnInit(): void {
    this.commentFormConfig = this.store.snapshotCloned(state => state.uiConfig.components.collectionComment.config.form.items);
  }
}
