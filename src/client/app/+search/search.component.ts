import { Component, OnDestroy, ViewChild, Renderer, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SearchContext } from '../shared/services/search-context.service';
import { FilterService } from '../shared/services/filter.service';
import { UserPreferenceService } from '../shared/services/user-preference.service';
import { SortDefinitionsService } from '../shared/services/sort-definitions.service';
import { Capabilities } from '../shared/services/capabilities.service';
import { CartService } from '../shared/services/cart.service';
import { WzSpeedviewComponent } from '../shared/modules/wz-asset/wz-speedview/wz.speedview.component';
import { WindowRef } from '../shared/services/window-ref.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAssetParameters } from '../shared/interfaces/commerce.interface';
import { AppStore } from '../app.store';
import { Collection } from '../shared/interfaces/collection.interface';
import { EnhancedAsset, enhanceAsset } from '../shared/interfaces/enhanced-asset';
import { Asset } from '../shared/interfaces/common.interface';
import { SearchResults } from '../shared/interfaces/search.interface';
/**
 * Asset search page component - renders search page results
 */
@Component({
  moduleId: module.id,
  selector: 'search-component',
  templateUrl: 'search.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnDestroy {
  public screenWidth: number;
  public path: any;
  public userPreferences: UserPreferenceService;
  public sortDefinition: SortDefinitionsService;
  public enhancedAssets: EnhancedAsset[];
  public enhancedAssetsSubScription: Subscription;
  public filtersAreAvailable: Observable<boolean>;
  public results: Observable<SearchResults>;
  @ViewChild(WzSpeedviewComponent) public wzSpeedview: WzSpeedviewComponent;

  constructor(
    public userCan: Capabilities,
    public filter: FilterService,
    private cart: CartService,
    private sortDefinitionService: SortDefinitionsService,
    private searchContext: SearchContext,
    private userPreferencesService: UserPreferenceService,
    private window: WindowRef,
    private route: ActivatedRoute,
    private router: Router,
    private detector: ChangeDetectorRef,
    private store: AppStore
  ) {
    this.results = this.store.select(state => state.search.results);
    this.screenWidth = this.window.nativeWindow.innerWidth;
    this.window.nativeWindow.onresize = () => this.screenWidth = this.window.nativeWindow.innerWidth;
    this.userPreferences = userPreferencesService;
    this.enhancedAssetsSubScription = this.store.selectCloned(state => state.search.results.items).subscribe(assets => {
      this.enhancedAssets = assets.map(asset => enhanceAsset(asset, 'search'));
    });
    this.sortDefinition = sortDefinitionService;
    this.router.events.subscribe(route => {
      this.path = (this.route.snapshot.params['gq']) ? JSON.parse(this.route.snapshot.params['gq']) : '';
      this.detector.markForCheck();
    });
    this.filtersAreAvailable = this._filtersAreAvailable();
  }

  ngOnDestroy(): void {
    this.store.dispatch(factory => factory.search.reset());
    this.enhancedAssetsSubScription.unsubscribe();
  }

  public get activeCollection(): Observable<Collection> {
    return this.store.select(state => state.activeCollection.collection);
  }

  public countToggle(): void {
    this.filter.load(this.searchContext.state, !this.userPreferences.state.displayFilterCounts).subscribe();
    this.userPreferences.toggleFilterCount();
  }

  public addAssetToCart(asset: any): void {
    let params: AddAssetParameters = { lineItem: { asset: asset } };
    if (this.userCan.administerQuotes()) {
      this.store.dispatch(factory => factory.quoteEdit.addAssetToProjectInQuote(params));
    } else {
      this.cart.addAssetToProjectInCart(params);
    }
  }

  public changePage(page: any): void {
    this.searchContext.update = { i: page };
    this.searchContext.go();
  }

  public sortResults(sortDefinition: any): void {
    this.userPreferences.updateSortPreference(sortDefinition.id);
    this.sortDefinition.update({ currentSort: sortDefinition });
    this.searchContext.update = { 'i': 1, 'sortId': sortDefinition.id };
    this.searchContext.go();
  }

  public changeAssetView(viewType: string): void {
    this.userPreferences.updateAssetViewPreference(viewType);
  }

  public filterEvent(event: any) {
    switch (event.event) {
      case 'toggleFilter':
        this.filter.toggle(event.filter.filterId);
        this.filterAssets();
        break;
      case 'toggleFilterGroup':
        this.filter.toggleFilterGroup(event.filter);
        break;
      case 'applyExclusiveFilter':
        this.filter.toggleExclusive(event.filter);
        this.filterAssets();
        break;
      case 'applyCustomValue':
        this.filter.addCustom(event.filter, event.customValue);
        this.filterAssets();
        break;
      case 'clearFilters':
        this.filter.clear();
        this.filterAssets();
        break;
    }
  }

  public onClickBreadcrumb(index: number): void {
    const route: any[] = index === 0 ? ['/'] : ['/gallery-view'];
    let pathSegment: any = this.path.slice(0, index);
    if (pathSegment && pathSegment.length > 0) route.push({ path: JSON.stringify(pathSegment) });
    this.router.navigate(route);
  }

  public get canEditCollection(): Observable<boolean> {
    let activeCollection: Collection;
    this.activeCollection.take(1).subscribe(collection => activeCollection = collection);
    return this.userCan.editCollection(activeCollection);
  }

  public onClickAddAllBtn(): void {
    let collectionName: string;
    this.activeCollection.take(1).subscribe(collection => collectionName = collection.name);

    this.store.dispatch(factory =>
      factory.dialog.showConfirmation({
        title: { key: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.TITLE', values: { collectionName } },
        message: { key: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.MESSAGE', values: { collectionName } },
        accept: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.ACCEPT',
        decline: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.DECLINE'
      }, () => this.store.dispatch(factory => factory.activeCollection.addPageOfSearchAssets()))
    );
  }

  private _filtersAreAvailable(): Observable<boolean> {
    return this.store.select(state => state.headerDisplayOptions.filtersAreAvailable);
  }

  private filterAssets(): void {
    this.searchContext.update = { i: 1 };
    let activeFilters: any = this.filter.getActive();

    let filterIds = (activeFilters.ids.length > 0) ? { 'filterIds': activeFilters.ids.join(',') } : null;
    let filterValues = (activeFilters.values.length > 0) ? { 'filterValues': activeFilters.values.join(',') } : null;

    (filterIds) ? this.searchContext.update = filterIds : this.searchContext.remove = 'filterIds';
    (filterValues) ? this.searchContext.update = filterValues : this.searchContext.remove = 'filterValues';

    this.searchContext.go();
  }
}
