import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AssetShareParameters, CollectionShareParameters } from '../../shared/interfaces/common.interface';
import { EnhancedAsset } from '../../shared/interfaces/enhanced-asset';
import { SubclipMarkers, bothMarkersAreSet } from '../../shared/interfaces/subclip-markers';
import { AppStore } from '../../app.store';
import { FormFields } from '../../shared/interfaces/forms.interface';
import { Collection, CollectionReloadType } from '../../shared/interfaces/collection.interface';

@Component({
  moduleId: module.id,
  selector: 'collection-share',
  templateUrl: 'collection-share.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionShareComponent implements OnInit {
  @Input() collection: Collection;
  @Input() reloadType: CollectionReloadType;
  @Output() closeRequest: EventEmitter<null> = new EventEmitter();

  public formFields: FormFields[];

  constructor(private store: AppStore) { }

  public ngOnInit(): void {
    this.formFields = this.store.snapshotCloned(state => state.uiConfig.components.collectionSharing.config.form.items);
  }

  public get collectionName(): string {
    return this.collection.name;
  }

  public onCloseRequest(): void {
    this.closeRequest.emit();
  }

  public onFormSubmit(shareParameters: CollectionShareParameters): void {
    this.store.dispatch(factory =>
      factory.sharing.emailCollectionShareLink(this.collection.id, shareParameters, this.reloadType)
    );
  }
}
