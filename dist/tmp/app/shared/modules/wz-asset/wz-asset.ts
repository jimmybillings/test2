import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Collection } from '../../interfaces/collection.interface';
import { Asset } from '../../interfaces/common.interface';
import { Capabilities } from '../../services/capabilities.service';
import { Frame } from '../../../shared/modules/wazee-frame-formatter/index';
import { EnhancedAsset } from '../../../shared/interfaces/enhanced-asset';
import { AppStore } from '../../../app.store';
import { Metadatum } from '../../../shared/interfaces/commerce.interface';

export class WzAsset implements OnInit {
  @Output() onAddToCart = new EventEmitter();
  @Output() onShowSpeedview = new EventEmitter();
  @Output() onHideSpeedview = new EventEmitter();
  @Output() onEditAsset = new EventEmitter();
  @Output() onAddtoDifferentCollection: EventEmitter<EnhancedAsset> = new EventEmitter();

  @Input() public userCan: Capabilities;
  @Input() public assetType: string = 'search';
  @Input() public set activeCollection(value: Collection) {
    this._activeCollection = value;
    this.assetIdsInActiveCollection = value.assets.items.map((x) => x.assetId);
  };
  @Input() public set assets(assets: EnhancedAsset[]) {
    this._assets = assets;
  }

  public get activeCollection(): Collection {
    return this._activeCollection;
  }

  public assetId: number;
  public hasComp: boolean;
  public showAssetName: boolean = true;
  private _assets: EnhancedAsset[];
  private assetIdsInActiveCollection: number[] = [];
  private enhancedAssets: { [lookupId: string]: EnhancedAsset } = {};
  private _activeCollection: Collection;

  constructor(private store: AppStore, private detector: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.store.selectCloned(state => state.uiConfig.components.search.config)
      .filter(config => !!config.showAssetNameGridView && !!config.showAssetNameGridView.value)
      .map(config => config.showAssetNameGridView.value)
      .take(1).subscribe((value: 'true' | 'false') => {
        this.showAssetName = Boolean(value);
      });
  }

  public get assets(): EnhancedAsset[] {
    return this._assets;
  }

  public get canAddToDifferentCollection(): boolean {
    return this.userCan.haveCollections() && this.assetType === 'collection';
  }

  public addToActiveCollection(asset: EnhancedAsset) {
    this.store.dispatch(factory => factory.activeCollection.addAsset(asset));
  }

  public removeFromActiveCollection(asset: EnhancedAsset) {
    this.store.dispatch(factory => factory.activeCollection.removeAsset(asset));
  }

  public addToDifferentCollection(asset: EnhancedAsset) {
    this.onAddtoDifferentCollection.emit(asset);
  }

  public addAssetToCart(asset: EnhancedAsset) {
    this.setAssetActiveId(asset);
    this.onAddToCart.emit(asset);
  }

  public setAssetActiveId(asset: EnhancedAsset) {
    this.assetId = asset.assetId;
    this.hasComp = asset.hasDownloadableComp;
  }

  public loadDeliveryOptionsFor(asset: EnhancedAsset): void {
    this.assetId = asset.assetId;
    this.store.dispatch(factory => factory.deliveryOptions.load(asset));
  }

  public editAsset(asset: EnhancedAsset) {
    this.onEditAsset.emit(asset);
  }

  public inCollection(asset: any): boolean {
    return this.assetIdsInActiveCollection.indexOf(asset.assetId) > -1;
  }

  public nameOf(asset: EnhancedAsset): string {
    return asset.name;
  }

  public routerLinkFor(asset: EnhancedAsset): any[] {
    return asset.routerLink;
  }

  public hasThumbnail(asset: EnhancedAsset): boolean {
    return !!asset.thumbnailUrl;
  }

  public thumbnailUrlFor(asset: EnhancedAsset): string {
    return asset.thumbnailUrl;
  }

  public hasTitle(asset: EnhancedAsset): boolean {
    return !!this.titleOf(asset);
  }

  public titleOf(asset: EnhancedAsset): string {
    return asset.title;
  }

  public hasFormatType(asset: EnhancedAsset): boolean {
    return !!asset.formatType;
  }

  public formatTypeOf(asset: EnhancedAsset): string {
    return asset.formatType;
  }

  public formatClassNameFor(asset: EnhancedAsset): string {
    switch (this.formatTypeOf(asset)) {
      case 'High Definition': return 'hd';
      case 'Standard Definition': return 'sd';
      case 'Digital Video': return 'dv';
      default: return 'hd';
    }
  }

  public hasDuration(asset: EnhancedAsset): boolean {
    return !!asset.subclipDurationFrame;
  }

  public subclipDurationFrameFor(asset: EnhancedAsset): Frame {
    return asset.subclipDurationFrame;
  }

  public isImage(asset: EnhancedAsset): boolean {
    return asset.isImage;
  }

  public isSubclipped(asset: EnhancedAsset): boolean {
    return asset.isSubclipped;
  }

  public subclipSegmentStylesFor(asset: EnhancedAsset): object {
    const enhancedAsset: EnhancedAsset = asset;

    return {
      'margin-left.%': enhancedAsset.inMarkerPercentage,
      'width.%': enhancedAsset.subclipDurationPercentage,
      'min-width.px': 2
    };
  }

  public hasDescription(asset: EnhancedAsset): boolean {
    return !!asset.description;
  }

  public descriptionOf(asset: EnhancedAsset): string {
    return asset.description;
  }

  public inMarkerFrameFor(asset: EnhancedAsset): Frame {
    return asset.inMarkerFrame;
  }

  public outMarkerFrameFor(asset: EnhancedAsset): Frame {
    return asset.outMarkerFrame;
  }

  public canBePurchased(asset: EnhancedAsset): boolean {
    const rights: Metadatum = asset.metaData.find((metadatum: Metadatum) =>
      metadatum.name === 'Rights.Reproduction');

    if (!rights) return false;

    return ['Rights Managed', 'Royalty Free'].includes(rights.value) &&
      this.store.snapshot(state => state.speedPreview[asset.assetId] &&
        state.speedPreview[asset.assetId].hasOwnProperty('price'));
  }

  public commentCountFor(asset: EnhancedAsset): Observable<number> {
    return this.store.select(factory => factory.comment.counts[asset.uuid]);
  }

  public canBeRemoved(asset: EnhancedAsset) {
    return this.inCollection(asset) && this.assetType === 'collection';
  }

  public canBeAddedAgain(asset: EnhancedAsset) {
    return this.inCollection(asset) && this.assetType !== 'collection';
  }

  public loadPricing(asset: any) {
    this.store.dispatch(factory => factory.speedPreview.load(asset));
    this.store.blockUntil(state => !!state.speedPreview[asset.assetId])
      .subscribe(() => this.detector.markForCheck());
  }

  public get userCanEditActiveCollection(): Observable<boolean> {
    return this.userCan.editCollection(this._activeCollection);
  }
}
