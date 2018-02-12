import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { Collection } from '../../shared/interfaces/collection.interface';
import { Cart, Project, Metadatum } from '../../shared/interfaces/commerce.interface';
import { Asset, Pojo, UiConfigComponents } from '../../shared/interfaces/common.interface';
import { Capabilities } from '../../shared/services/capabilities.service';
import { MatMenuTrigger } from '@angular/material';
import { SubclipMarkers, durationFrom } from '../../shared/interfaces/subclip-markers';
import { Observable } from 'rxjs/Observable';
import { Frame } from '../../shared/modules/wazee-frame-formatter/index';
import { AppStore, ActionFactoryMapper, PricingState } from '../../app.store';
import { EnhancedAsset, AssetType } from '../../shared/interfaces/enhanced-asset';
import { CommentParentObject } from '../../shared/interfaces/comment.interface';
import { FormFields } from '../../shared/interfaces/forms.interface';
import { SearchParams } from '../../shared/interfaces/search.interface';
import { AssetShareDialogOptions } from '../../shared/interfaces/asset.interface';

@Component({
  moduleId: module.id,
  selector: 'asset-detail',
  templateUrl: 'asset-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssetDetailComponent implements OnInit {
  @Input() public set asset(asset: EnhancedAsset) {
    this._asset = asset;
    if (asset.transcodeTargets) this.selectedTarget = asset.transcodeTargets[0];  // Is this what we want for all asset types?
    this.setAssetCollectionMembershipFlags();
  }

  @Input() public set activeCollection(collection: Collection) {
    this._activeCollection = collection;
    this.activeCollectionName = collection.name;
    this.setAssetCollectionMembershipFlags();
  }

  @Input() public userCan: Capabilities;
  @Input() public usagePrice: number;
  @Input() public window: Window;
  @Input() public searchContext: SearchParams;
  @Input() public assetMatchesCartAsset: boolean;
  @Input() public commentParentObject: CommentParentObject;
  @Input() public commentFormConfig: FormFields;
  @Input() public assetIsShared: boolean;
  @Output() addToCart = new EventEmitter();
  @Output() getPriceAttributes = new EventEmitter();
  @Output() onPreviousPage = new EventEmitter();
  @Output() createShareDialog: EventEmitter<AssetShareDialogOptions> = new EventEmitter();
  @Output() onAddtoDifferentCollection: EventEmitter<null> = new EventEmitter();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public shareFormFields: FormFields[];
  public selectedTarget: string;
  public showAssetSaveSubclip: boolean = false;
  public subclipMarkers: SubclipMarkers;
  public activeCollectionName: string;
  public showComments: boolean;
  public hasDeliveryOptions: Observable<boolean>;
  @Output() public updateAssetLineItem: EventEmitter<null> = new EventEmitter();
  @Output() private markersChange: EventEmitter<SubclipMarkers> = new EventEmitter();
  private _asset: EnhancedAsset;
  private _activeCollection: Collection;
  private activeCollectionContainsAssetId: boolean = false;
  private activeCollectionContainsAssetUuid: boolean = false;
  private pageSize: number;

  constructor(private store: AppStore) { }

  ngOnInit() {
    const config: UiConfigComponents = this.store.snapshotCloned(state => state.uiConfig.components);
    this.pageSize = parseInt(config.global.config.pageSize.value);
    this.shareFormFields = config.assetSharing.config.form.items;
    this.setDeliveryOptionsFlag();
  }

  public get asset(): EnhancedAsset {
    return this._asset;
  }

  public get hasPageHistory() {
    return this.window.history.length > 2;
  }

  public previousPage() {
    this.onPreviousPage.emit();
  }

  public get hasRendition() {
    return !!this._asset.clipUrl;
  }

  public get isPhoto(): boolean {
    return this._asset.resourceClass === 'Image';
  }

  public get routerLinkForAssetParent(): any[] {
    switch (this._asset.type) {
      case 'collection': {
        return ['/collections', this._asset.parentId, { i: 1, n: this.pageSize }];
      }

      case 'search': {
        return ['/search', this.searchContext];
      }

      case 'quoteEdit': {
        return ['/active-quote'];
      }

      case 'quoteShow': {
        return ['/quotes', this._asset.parentId];
      }

      case 'order': {
        return ['/orders', this._asset.parentId];
      }

      case 'cart': {
        return ['/cart'];
      }
    }
  }

  public get breadcrumbLabel(): Array<string> {
    switch (this._asset.type) {
      case 'collection': {
        return [this.activeCollectionName, ''];
      }

      case 'order':
      case 'quoteShow': {
        return [`asset.detail.breadcrumb_${this._asset.type}`, String(this._asset.parentId)];
      }

      default: {
        return [`asset.detail.breadcrumb_${this._asset.type}`, ''];
      }
    }
  }

  public get canAddToActiveCollection(): boolean {
    return this.userCan.editCollections() &&
      !this.activeCollectionContainsAssetId &&
      this.assetTypeIsOneOf('collection', 'search');
  }

  public get canRemoveFromActiveCollection(): boolean {
    return this._asset.type === 'collection' && this.activeCollectionContainsAssetUuid;
  }

  public get userCanEditCollection(): Observable<boolean> {
    return this.userCan.editCollection(this._activeCollection);
  }

  public get canAddAgainToActiveCollection(): boolean {
    return (this._asset.type === 'search' && this.activeCollectionContainsAssetId) ||
      (this._asset.type === 'collection' && (this.activeCollectionContainsAssetId || this.showAssetSaveSubclip));
  }

  public get canUpdateInActiveCollection(): boolean {
    return this._asset.type === 'collection' && this.showAssetSaveSubclip && this.activeCollectionContainsAssetUuid &&
      !this._activeCollection.assets.items.some((collectionAsset: Asset) => {
        const duration = durationFrom(this.subclipMarkers);
        return collectionAsset.timeStart === duration.timeStart && collectionAsset.timeEnd === duration.timeEnd;
      });
  }

  public onPlayerMarkersInitialization(initialMarkers: SubclipMarkers): void {
    this.subclipMarkers = initialMarkers;
    this.showAssetSaveSubclip = false;
    this.markersChange.emit(initialMarkers);
  }

  public onPlayerMarkerChange(newMarkers: SubclipMarkers): void {
    this.subclipMarkers = newMarkers;
    this.showAssetSaveSubclip = this.markersAreDefined;
    if (this.markersAreDefined && this._asset.type === 'search') {
      this.store.dispatch((factory) => factory.asset.updateMarkersInUrl(this.subclipMarkers, this._asset.assetId));
    }
    this.markersChange.emit(newMarkers);
  }

  public toggleAssetSaveSubclip(): void {
    this.showAssetSaveSubclip = !this.showAssetSaveSubclip;
  }

  public addAssetToActiveCollection(): void {
    this.store.dispatch(
      factory => factory.activeCollection.addAsset(this._asset, this.subclipMarkers ? this.subclipMarkers : null)
    );
    this.showAssetSaveSubclip = false;
  }

  public onCreateShareDialog() {
    this.createShareDialog.emit({
      enhancedAsset: this._asset,
      subclipMarkers: this.subclipMarkers,
      formFields: this.shareFormFields
    });
  }

  public removeAssetFromActiveCollection(): void {
    this.store.dispatch(factory => factory.dialog.showConfirmation(
      {
        title: 'COLLECTION.REMOVE_ASSET.TITLE',
        message: 'COLLECTION.REMOVE_ASSET.MESSAGE',
        accept: 'COLLECTION.REMOVE_ASSET.ACCEPT',
        decline: 'COLLECTION.REMOVE_ASSET.DECLINE'
      },
      () => this.store.dispatch(factory => factory.activeCollection.removeAsset(this._asset))
    ));
  }

  public updateAssetInActiveCollection(): void {
    this.store.dispatch(factory => factory.activeCollection.updateAssetMarkers(this._asset, this.subclipMarkers));
  }

  public addAssetToCart(): void {
    this.addToCart.emit({
      assetId: this._asset.assetId,
      markers: this.markersAreDefined ? this.subclipMarkers : null,
      selectedTranscodeTarget: this.selectedTarget
    });
  }

  public getPricingAttributes(): void {
    this.getPriceAttributes.emit(this.rights);
  }

  public onSelectTarget(target: any): void {
    this.selectedTarget = target.value;
  }

  public get canComment(): boolean {
    return this.assetTypeIsOneOf('cart', 'quoteEdit', 'quoteShow', 'collection', 'order');
  }

  public get canShare(): boolean {
    return this.assetTypeIsOneOf('search') && this.userCan.createAccessInfo();
  }

  public get showAdvancedPlayer(): boolean {
    return this.userCan.viewAdvancedPlayer(this.asset, this.assetIsShared);
  }

  public get shareButtonLabelKey(): string {
    return this.markersAreDefined ? 'ASSET.DETAIL.SHARING_SUBCLIP_BTN_TITLE' : 'ASSET.DETAIL.SHARING_BTN_TITLE';
  }

  public get rights(): string {
    return this._asset.getMetadataValueFor('Rights.Reproduction');
  }

  public get canShowPrice(): boolean {
    return (this.isRoyaltyFreeWithValidPrice || this.isRightsManagedWithValidPrice);
  }

  public get canShowNoPricingAvailableNotice(): boolean {
    return (this.assetTypeIsOneOf('order', 'quoteShow')) ? false :
      (this.isRoyaltyFree || this.isRightsManaged) && !this._asset.hasOwnProperty('price');
  }

  public get price(): number {
    if (this.isRoyaltyFreeWithValidPrice) return this._asset.price;
    if (this.isRightsManagedWithValidPrice) return this.usagePrice;
    return null;
  }

  public get canPerformCartActions(): boolean {
    return this.userCan.haveCart() && (this.isRoyaltyFree || this.isRightsManaged) && this._asset.hasOwnProperty('price');
  }

  public get canSelectTranscodeTarget(): boolean {
    return this.isRoyaltyFree && this.userCan.addToCart() && !!this._asset.transcodeTargets;
  }

  public get canEditOrApplyRights(): boolean {
    return (this._asset.type !== 'order' && this._asset.type !== 'quoteShow')
      && this.isRightsManaged && this.userCan.calculatePrice();
  }

  public get canUpdateCartAsset(): boolean {
    return this.assetTypeIsOneOf('cart', 'quoteEdit');
  }

  public get canUpdateCollectionAsset(): boolean {
    return this.assetTypeIsOneOf('collection');
  }

  public get canEditCollectionSubclipMarkers(): boolean {
    return this.canUpdateCollectionAsset && this.markersAreDefined;
  }
  public get collectionSubclipButtonHoverTxt(): string {
    const active: string = this.canUpdateInActiveCollection ? 'ACTIVE' : 'DISABLED';
    const markers: string = this._asset.isSubclipped ? 'UPDATE' : 'ADD_NEW';

    return `ASSET.DETAIL.BUTTON.${markers}.SUBCLIP.${active}`;
  }
  public get collectionSubclipButtonLabel(): string {
    const markers: string = this._asset.isSubclipped ? 'UPDATE' : 'ADD_NEW';

    return `ASSET.DETAIL.BUTTON.${markers}.SUBCLIP.COLLECTION`;
  }

  public get updateCartAssetButtonLabelKey(): string {
    const subclipOrAsset: string = this.markersAreDefined ? 'SUBCLIP' : 'ASSET';
    const quoteOrCart: string = this.isQuoteUser ? 'QUOTE' : 'CART';

    return `ASSET.DETAIL.BUTTON.UPDATE.${subclipOrAsset}.${quoteOrCart}`;
  }

  public updateCartAsset(): void {
    this.updateAssetLineItem.emit();
  }

  public get canAddToCart(): boolean {
    return this.userCan.addToCart() && this.canBePurchased(this.asset)
      && this.assetTypeIsOneOf('search', 'collection');
  }

  public get primaryAssetFields(): Metadatum | { value: string }[] {
    return this.asset.primary.slice(4, -1).filter(field => field.value !== null);
  }

  public translationReady(field: any) {
    return 'assetmetadata.' + field.replace(/\./g, '_');
  }

  public get addToCartOrQuoteButtonLabelKey(): string {
    const onMatchingPage: boolean = this.isQuoteUser ? this._asset.type === 'quoteEdit' : this._asset.type === 'cart';
    const operation: string = onMatchingPage ? 'ADD_NEW' : 'ADD';
    const subclipOrAsset: string = this.markersAreDefined ? 'SUBCLIP' : 'ASSET';
    const quoteOrCart: string = this.isQuoteUser ? 'QUOTE' : 'CART';

    return `ASSET.DETAIL.BUTTON.${operation}.${subclipOrAsset}.${quoteOrCart}`;
  }

  public get canGoToSearchAssetDetails(): boolean {
    return this.assetTypeIsOneOf('cart', 'collection', 'order', 'quoteEdit', 'quoteShow') &&
      this.asset.isViewable;
  }

  public goToSearchAssetDetails(): void {
    this.store.dispatch(factory => factory.router.goToSearchAssetDetails(this._asset.assetId, this.subclipMarkers));
  }

  public toggleCommentsVisibility(): void {
    this.showComments = !this.showComments;
  }

  public get userCanAddComments(): Observable<boolean> {
    switch (this.commentParentObject.objectType) {
      case 'collection':
        return this.userCan.editCollection(this._activeCollection);
      default:
        return Observable.of(true);
    }
  }

  public get commentCount(): Observable<number> {
    return this.store.select(state => state.comment[state.comment.activeObjectType].pagination.totalCount);
  }

  public get showDownloadButton(): boolean {
    return this.assetTypeIsOneOf('quoteEdit', 'quoteShow', 'search', 'collection', 'cart') &&
      this.asset.isViewable;
  }

  public get assetName(): string {
    return this._asset.common[5].value;
  }

  public get canAddToDifferentCollection(): boolean {
    return this.userCan.haveCollections() && this.assetTypeIsOneOf('collection');
  }

  public addToDifferentCollection(): void {
    this.onAddtoDifferentCollection.emit();
  }

  private canBePurchased(asset: EnhancedAsset): boolean {
    const rights: string = asset.getMetadataValueFor('Rights.Reproduction');
    if (!rights) return false;

    return ['Rights Managed', 'Royalty Free'].includes(rights) &&
      this.store.snapshot(state => state.asset.activeAsset.assetId &&
        state.asset.activeAsset.hasOwnProperty('price'));
  }

  private assetTypeIsOneOf(...assetTypes: AssetType[]) {
    return assetTypes.includes(this._asset.type);
  }

  private setAssetCollectionMembershipFlags(): void {
    if (!this._activeCollection || !this._asset) {
      this.activeCollectionContainsAssetId = this.activeCollectionContainsAssetUuid = false;
      return;
    }

    const collectionItems: Asset[] = this._activeCollection.assets.items;

    this.activeCollectionContainsAssetId =
      collectionItems.some((collectionAsset: Asset) => collectionAsset.assetId === this._asset.assetId);

    this.activeCollectionContainsAssetUuid =
      !!this._asset.uuid && collectionItems.some((collectionAsset: Asset) => collectionAsset.uuid === this._asset.uuid);
  }

  private get isQuoteUser(): boolean {
    return this.userCan.administerQuotes();
  }

  private get isRoyaltyFree(): boolean {
    return this.rights === 'Royalty Free';
  }

  private get isRightsManaged(): boolean {
    return this.rights === 'Rights Managed';
  }

  private get isRightsManagedWithValidPrice(): boolean {
    return this.isRightsManaged && ((this.usagePrice !== null && this.usagePrice !== undefined && this.usagePrice > 0));
  }

  private get isRoyaltyFreeWithValidPrice(): boolean {
    return this.isRoyaltyFree && this._asset.hasOwnProperty('price') && this._asset.price > 0;
  }

  private get markersAreDefined(): boolean {
    return !!this.subclipMarkers && !!this.subclipMarkers.in && !!this.subclipMarkers.out;
  }

  private setDeliveryOptionsFlag(): void {
    this.hasDeliveryOptions = this.store.select(state => state.deliveryOptions.hasDeliveryOptions);
  }
}
