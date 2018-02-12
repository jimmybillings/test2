import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Collection, CollectionSummaryItem, CollectionUserRole } from '../../../shared/interfaces/collection.interface';
import { CollectionsService } from '../../../shared/services/collections.service';
import { CollectionContextService } from '../../../shared/services/collection-context.service';
import { Common } from '../../../shared/utilities/common.functions';
import { AppStore } from '../../../app.store';
import { Observable } from 'rxjs/Observable';
import { EnhancedAsset } from '../../../shared/interfaces/enhanced-asset';

/**
 * Directive that renders a list of collections
 */
@Component({
  moduleId: module.id,
  selector: 'collections-list-dd',
  templateUrl: 'collections-list-dd.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CollectionListDdComponent implements OnInit, OnDestroy {
  @Input() focusedCollection: Collection;
  @Input() roleFilter: CollectionUserRole[] = ['owner', 'editor', 'viewer'];
  @Input() editMode: boolean = false;
  @Output() close = new EventEmitter();
  @Output() onAddAssetToCollection: EventEmitter<Collection> = new EventEmitter();
  public options: any;
  public collectionFilterIsShowing: boolean = false;
  public collectionSortIsShowing: boolean = false;
  public collectionSearchIsShowing: boolean = false;
  private optionsSubscription: Subscription;
  private loadCollectionsSubscription: Subscription;

  constructor(
    public router: Router,
    public collections: CollectionsService,
    public collectionContext: CollectionContextService,
    private store: AppStore
  ) { }

  ngOnInit(): void {
    this.loadCollectionsSubscription = this.collections.data
      .take(1)
      .filter((collections) => collections.items.length === 0)
      .subscribe(() => this.collections.load().subscribe());
    this.optionsSubscription = this.collectionContext.data.subscribe(data => this.options = data);
  }

  ngOnDestroy(): void {
    this.optionsSubscription.unsubscribe();
    this.loadCollectionsSubscription.unsubscribe();
  }

  public closeCollectionsList(collection?: Collection) {
    this.close.emit(collection);
  }

  public get collectionList(): Observable<CollectionSummaryItem[]> {
    return this.collections.data
      .map(data => data.items)
      .map(items => {
        if (this.editMode) {
          items = items.filter(item => item.id !== this.focusedCollection.id);
        }
        return items.filter(item => this.roleFilter.includes(item.userRole));
      });
  }

  public selectFocusedCollection(collection: Collection) {
    if (!this.editMode) {
      if (Common.onCollectionShowPage(this.router.url)) {
        this.navigateToCollectionShow(collection.id);
      } else {
        this.store.dispatch(factory => factory.activeCollection.set(collection.id));
      }
    }
    this.closeCollectionsList(collection);
  }

  public applyFilter(filter: any) {
    this.collectionContext.updateCollectionOptions({ currentFilter: filter });
    this.collections.load(filter.access).subscribe();
    this.showCollectionFilter();
  }

  public applySort(sort: any) {
    this.collectionContext.updateCollectionOptions({ currentSort: sort });
    this.collections.load(sort.sort).subscribe();
    this.showCollectionSort();
  }

  public search(query: any) {
    this.collectionContext.updateCollectionOptions({ currentSearchQuery: query });
    this.collections.load(query).subscribe();
  }

  public showCollectionFilter() {
    this.collectionFilterIsShowing = !this.collectionFilterIsShowing;
  }

  public showCollectionSort() {
    this.collectionSortIsShowing = !this.collectionSortIsShowing;
  }

  public showCollectionSearch() {
    this.collectionSearchIsShowing = !this.collectionSearchIsShowing;
  }

  private navigateToCollectionShow(collectionId: number): void {
    this.router.navigate(['/collections/', collectionId, { i: 1, n: 100 }]);
  }
}
