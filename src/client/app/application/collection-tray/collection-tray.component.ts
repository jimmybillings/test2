import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CollectionLinkComponent } from '../../+collection/components/collection-link.component';
import { CollectionFormComponent } from './components/collection-form.component';
import { WzDialogService } from '../../shared/modules/wz-dialog/services/wz.dialog.service';
import { Asset, WzEvent, UiConfigComponents } from '../../shared/interfaces/common.interface';
import { Collection, CollectionFormEvent } from '../../shared/interfaces/collection.interface';
import { EnhancedAsset, enhanceAsset } from '../../shared/interfaces/enhanced-asset';
import { AppStore } from '../../app.store';
import { Common } from '../../shared/utilities/common.functions';
import { CollectionListDdComponent } from './components/collections-list-dd.component';

@Component({
  moduleId: module.id,
  selector: 'collection-tray',
  templateUrl: 'collection-tray.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CollectionTrayComponent implements OnInit, OnDestroy {
  @Input() userPreference: any;
  @Input() urlPath: string;
  public collection: Collection;
  public collectionFormConfig: any;
  private enhancedAssets: { [uuid: string]: EnhancedAsset } = {};
  private collectionSubscription: Subscription;
  constructor(
    private dialogService: WzDialogService,
    private store: AppStore,
    private detector: ChangeDetectorRef) { }

  ngOnInit() {
    this.store.dispatch(factory => factory.activeCollection.loadIfNeeded());
    this.collectionSubscription = this.setCollection();
    const config: UiConfigComponents = this.store.snapshotCloned(state => state.uiConfig.components);
    this.collectionFormConfig = config.collection.config;
  }

  ngOnDestroy() {
    this.collectionSubscription.unsubscribe();
  }

  public toggleCollectionTray(): void {
    this.userPreference.toggleCollectionTray();
  }

  public hasId(asset: EnhancedAsset): boolean {
    return !!asset && !!(asset.assetId);
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

  public getAssetsForLink(): void {
    this.dialogService.openComponentInDialog({
      componentType: CollectionLinkComponent,
      inputOptions: { assets: this.collection.assets.items }
    });
  }

  public createCollectionlistDialog() {
    let focusedCollection: Collection;
    this.dialogService.openComponentInDialog({
      componentType: CollectionListDdComponent,
      dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
      inputOptions: {
        focusedCollection: this.collection
      },
      outputOptions: [{
        event: 'close',
        callback: () => true,
        closeOnEvent: true
      }]
    });
  }

  public createCollection() {
    this.dialogService.openComponentInDialog({
      componentType: CollectionFormComponent,
      dialogConfig: { position: { top: '10%' } },
      inputOptions: {
        fields: this.collectionFormConfig,
        collectionActionType: 'create'
      },
      outputOptions: [{
        event: 'collectionSaved',
        callback: (event: CollectionFormEvent) => {
          // Only redirects if on the collection show page.
          if (this.urlPath.includes('/collections/')) {
            this.store.dispatch(factory => factory.router.goToCollection(event.collectionId));
          } else {
            this.store.dispatch(factory => factory.snackbar.display('COLLECTION.COLLECTION_CREATED'));
          }
        },
        closeOnEvent: true
      }]
    });
  }

  private setCollection(): Subscription {
    return this.store.select(state => state.activeCollection)
      .filter(state => state.collection !== undefined)
      .map(state => {
        let collection: Collection = Common.clone(state.collection);
        if (collection.assets && collection.assets.items) {
          collection.assets.items = collection.assets.items
            .map(item => enhanceAsset(item, 'collection', collection.id));
        }
        return collection;
      }).subscribe((collection) => {
        this.collection = collection;
        this.detector.markForCheck();
      });
  }
}
