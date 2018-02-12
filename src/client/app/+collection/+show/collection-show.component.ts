import {
  Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Collection, CollectionActionType, CollectionFormEvent } from '../../shared/interfaces/collection.interface';
import { CollectionsService } from '../../shared/services/collections.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Capabilities } from '../../shared/services/capabilities.service';
import { CartService } from '../../shared/services/cart.service';
import { UserPreferenceService } from '../../shared/services/user-preference.service';
import { CollectionLinkComponent } from '../components/collection-link.component';
import { CollectionFormComponent } from '../../application/collection-tray/components/collection-form.component';
import { WzSubclipEditorComponent } from '../../shared/components/wz-subclip-editor/wz.subclip-editor.component';
import { CollectionShareMembersComponent } from '../components/collection-share-members.component';
import { WindowRef } from '../../shared/services/window-ref.service';
import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { AddAssetParameters } from '../../shared/interfaces/commerce.interface';
import { CommentParentObject } from '../../shared/interfaces/comment.interface';
import { WzDialogService } from '../../shared/modules/wz-dialog/services/wz.dialog.service';
import { WzEvent, Coords, Pojo, Asset, UiConfigComponents } from '../../shared/interfaces/common.interface';
import { FormFields } from '../../shared/interfaces/forms.interface';
import { AppStore } from '../../app.store';
import { EnhancedAsset, enhanceAsset } from '../../shared/interfaces/enhanced-asset';
import { Common } from '../../shared/utilities/common.functions';
import { CollectionShareComponent } from '../components/collection-share.component';
import { CollectionListDdComponent } from '../../application/collection-tray/components/collections-list-dd.component';

@Component({
  moduleId: module.id,
  selector: 'collection-show',
  templateUrl: 'collection-show.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CollectionShowComponent implements OnInit, OnDestroy {
  public activeCollection: Collection;
  public commentFormConfig: FormFields;
  public newCollectionFormConfig: any;
  public commentParentObject: CommentParentObject;
  public showComments: boolean = null;
  private activeCollectionSubscription: Subscription;
  private routeSubscription: Subscription;
  private routeParams: Pojo;

  constructor(
    public userCan: Capabilities,
    public router: Router,
    public collections: CollectionsService,
    public cart: CartService,
    public userPreference: UserPreferenceService,
    private route: ActivatedRoute,
    private window: WindowRef,
    private dialogService: WzDialogService,
    @Inject(DOCUMENT) private document: Pojo,
    private store: AppStore,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.activeCollectionSubscription =
      this.store.select(state => state.activeCollection)
        .filter(state => !state.loading)
        .map(state => {
          let collection: Collection = Common.clone(state.collection);
          if (collection.assets && collection.assets.items) {
            collection.assets.items = collection.assets.items
              .map(item => enhanceAsset(item, 'collection', collection.id));
          }
          return collection;
        })
        .subscribe(collection => {
          this.activeCollection = collection;
          if (collection.id) { // We only want to do these things when there is a valid active collection
            this.commentParentObject = { objectType: 'collection', objectId: collection.id };
            this.store.dispatch(factory => factory.comment.getCounts(this.commentParentObject));
          }
          // The view needs to update whenever the activeCollection changes (including individual assets).  This is
          // a direct store subscription, not an @Input(), so we have to trigger change detection ourselves.
          this.changeDetectorRef.markForCheck();
        });

    this.routeSubscription = this.route.params.subscribe(params => this.buildRouteParams(params));

    const config: UiConfigComponents = this.store.snapshotCloned(state => state.uiConfig.components);
    this.commentFormConfig = config.collectionComment.config.form.items;
    this.newCollectionFormConfig = config.collection.config;
  }

  ngOnDestroy() {
    this.activeCollectionSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  public changePage(i: number): void {
    this.buildRouteParams({ i });
    this.router.navigate(['/collections/' + this.activeCollection.id, this.routeParams]);
  }

  public setCollectionForDelete(): void {
    this.store.dispatch(factory => factory.dialog.showConfirmation({
      title: { key: 'COLLECTION.INDEX.CONFIRMATION_TITLE', values: { collectionName: this.activeCollection.name } },
      message: { key: 'COLLECTION.INDEX.CONFIRMATION_SUBTITLE', values: { collectionName: this.activeCollection.name } },
      decline: 'COLLECTION.INDEX.CONFIRMATION_CANCEL_BTN_TITLE',
      accept: 'COLLECTION.INDEX.CONFIRMATION_DELETE_BTN_TITLE'
    }, () => this.deleteCollection(this.activeCollection.id)));
  }

  public deleteCollection(id: number) {
    this.router.navigate(['/collections']);
    this.collections.delete(id).subscribe(response => {
      this.store.dispatch(factory => factory.snackbar.display('COLLECTION.INDEX.DELETE_SUCCESS_TOAST'));
    });
  }

  public addAssetToCartOrQuote(asset: Asset): void {
    let params: AddAssetParameters = { lineItem: { asset: asset } };

    if (this.userCan.administerQuotes()) {
      this.store.dispatch(factory => factory.quoteEdit.addAssetToProjectInQuote(params));
    } else {
      this.cart.addAssetToProjectInCart(params);
    }
    this.store.dispatch(factory =>
      factory.snackbar.display(
        this.userCan.administerQuotes() ? 'ASSET.ADD_TO_QUOTE_TOAST' : 'ASSET.ADD_TO_CART_TOAST',
        { assetId: asset.name }
      )
    );
  }

  public addToDifferentCollection(asset: EnhancedAsset): void {
    let focusedCollection: Collection;
    this.dialogService.openComponentInDialog({
      componentType: CollectionListDdComponent,
      dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
      inputOptions: {
        focusedCollection: this.activeCollection,
        roleFilter: ['owner', 'editor'],
        editMode: true
      },
      outputOptions: [{
        event: 'close',
        callback: (collection: Collection) => {
          if (collection) {
            this.store.dispatch(factory =>
              factory.collections.addAssetToCollection(collection, asset)
            );
          }
        },
        closeOnEvent: true
      }]
    });
  }

  public getAssetsForLink(): void {
    this.dialogService.openComponentInDialog(
      {
        componentType: CollectionLinkComponent,
        inputOptions: { assets: this.activeCollection.assets.items }
      }
    );
  }

  public editAsset(asset: EnhancedAsset) {
    this.store.callLegacyServiceMethod(service => service.asset.getClipPreviewData(asset.assetId))
      .subscribe(data => {
        this.document.body.classList.add('subclipping-edit-open');
        asset.clipUrl = data.url;
        this.dialogService.openComponentInDialog(
          {
            componentType: WzSubclipEditorComponent,
            dialogConfig: { width: '544px' },
            inputOptions: {
              window: this.window.nativeWindow,
              enhancedAsset: asset,
              alreadyUsedMarkersList: this.getAlreadyUsedMarkersListFor(asset)
            },
            outputOptions: [
              {
                event: 'cancel',
                callback: (event: Pojo) => { return true; },
                closeOnEvent: true
              },
              {
                event: 'save',
                callback: (updatedMarkers: SubclipMarkers) => {
                  this.store.dispatch(factory => factory.activeCollection.updateAssetMarkers(asset, updatedMarkers));
                },
                closeOnEvent: true
              }
            ]
          }
        ).subscribe(_ => {
          this.document.body.classList.remove('subclipping-edit-open');
        });
      });
  }

  public editCollection() {
    this.dialogService.openComponentInDialog(
      this.collectionFormComponentOptions('edit', Common.clone(this.activeCollection))
    );
  }

  public duplicateCollection() {
    this.collections.getByIdAndDuplicate(this.activeCollection.id)
      .subscribe(collection => {
        this.dialogService.openComponentInDialog(
          this.collectionFormComponentOptions('duplicate', collection)
        );
      });
  }

  public onChangeAssetView(assetView: string): void {
    this.userPreference.updateAssetViewPreference(assetView);
  }

  public toggleCommentsVisibility(): void {
    this.showComments = !this.showComments;
  }

  public get commentCount(): Observable<number> {
    return this.store.select(state => state.comment.collection.pagination.totalCount);
  }

  public get userCanEditCollection(): Observable<boolean> {
    return this.userCan.editCollection(this.activeCollection);
  }

  public get collectionIsShared(): boolean {
    return !!this.activeCollection.editors || !!this.activeCollection.viewers ? true : false;
  }

  public showShareMembers() {
    this.dialogService.openComponentInDialog(
      {
        componentType: CollectionShareMembersComponent,
        dialogConfig: { position: { top: '12%' } },
        inputOptions: {
          collection: this.activeCollection,
        },
        outputOptions: [{
          event: 'close',
          callback: () => true,
          closeOnEvent: true
        }]
      }
    );
  }

  public get collectionViewerIsOwner(): boolean {
    return this.activeCollection.userRole === 'owner';
  }

  public createShareDialog() {
    this.dialogService.openComponentInDialog(
      {
        componentType: CollectionShareComponent,
        dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
        inputOptions: {
          reloadType: 'activeCollection',
          collection: Common.clone(this.activeCollection),
        },
        outputOptions: [{
          event: 'closeRequest',
          callback: () => true,
          closeOnEvent: true
        }]
      }
    );
  }

  private buildRouteParams(params: Pojo): void {
    this.routeParams = Object.assign({}, this.routeParams, params);
    delete this.routeParams['id'];
  }

  private collectionFormComponentOptions(actionType: CollectionActionType, collection: Pojo) {
    return {
      componentType: CollectionFormComponent,
      inputOptions: {
        collection: collection,
        fields: this.newCollectionFormConfig,
        collectionActionType: actionType
      },
      outputOptions: [{
        event: 'collectionSaved',
        callback: (event: CollectionFormEvent) => {
          this.store.dispatch(factory => factory.router.goToCollection(event.collectionId));
        },
        closeOnEvent: true
      }]
    };
  }

  private getAlreadyUsedMarkersListFor(asset: EnhancedAsset): SubclipMarkers[] {
    return this.activeCollection.assets.items
      .filter((collectionAsset: EnhancedAsset) =>
        collectionAsset.assetId === asset.assetId && collectionAsset.uuid !== asset.uuid
      ).map((collectionAsset: EnhancedAsset) =>
        collectionAsset.subclipMarkers
      );
  }
}
