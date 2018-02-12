import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AssetShareParameters, Pojo } from '../../shared/interfaces/common.interface';
import { EnhancedAsset } from '../../shared/interfaces/enhanced-asset';
import { SubclipMarkers, bothMarkersAreSet } from '../../shared/interfaces/subclip-markers';
import { AppStore } from '../../app.store';
import { FormFields } from '../../shared/interfaces/forms.interface';

@Component({
  moduleId: module.id,
  selector: 'asset-share',
  templateUrl: 'asset-share.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetShareComponent implements OnInit {
  @Input() formFields: FormFields[];
  @Input() enhancedAsset: EnhancedAsset;
  @Input() subclipMarkers: SubclipMarkers;
  @Output() closeRequest: EventEmitter<null> = new EventEmitter();

  public shareLink: Observable<string>;

  constructor(private store: AppStore) { }

  public ngOnInit(): void {
    this.shareLink = this.store.select(state => state.sharing.assetLink);
  }

  public get shareAssetDialogTitle(): string {
    return bothMarkersAreSet(this.subclipMarkers)
      ? 'ASSET.SHARING.SUBCLIP_DIALOG_HEADER_TITLE'
      : 'ASSET.SHARING.DIALOG_HEADER_TITLE';
  }

  public get showSubclippingInfo(): boolean {
    return bothMarkersAreSet(this.subclipMarkers);
  }

  public get assetName(): string {
    return this.enhancedAsset.getMetadataValueFor('name');
  }

  public onShareLinkRequest(): void {
    this.store.dispatch(factory => factory.sharing.createAssetShareLink(this.enhancedAsset.assetId, this.subclipMarkers));
  }

  public onCloseRequest(): void {
    this.closeRequest.emit();
  }

  public onFormSubmit(shareParameters: AssetShareParameters): void {
    const properties: Pojo = {
      assetName: this.enhancedAsset.getMetadataValueFor('name'),
      assetDescription: this.enhancedAsset.getMetadataValueFor('Description'),
      assetThumbnailUrl: this.enhancedAsset.thumbnailUrl
    };
    this.store.dispatch(factory =>
      factory.sharing.emailAssetShareLink(this.enhancedAsset.assetId, this.subclipMarkers, shareParameters, properties)
    );
  }
}
