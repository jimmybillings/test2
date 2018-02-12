import './operators';
import { Component, OnInit, HostListener, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RoutesRecognized, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Services
import { CurrentUserService } from './shared/services/current-user.service';
import { SearchContext } from './shared/services/search-context.service';
import { FilterService } from './shared/services/filter.service';
import { SortDefinitionsService } from './shared/services/sort-definitions.service';
import { CollectionsService } from './shared/services/collections.service';
import { UserPreferenceService } from './shared/services/user-preference.service';
import { Capabilities } from './shared/services/capabilities.service';
import { WindowRef } from './shared/services/window-ref.service';
import { AppStore } from './app.store';
// /Interfaces
import { ILang } from './shared/interfaces/language.interface';
import { Pojo } from './shared/interfaces/common.interface';
import { Authentication } from './shared/services/authentication.data.service';

@Component({
  moduleId: module.id,
  selector: 'wazee-digital-platform',
  templateUrl: 'app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  public state: string = '';

  constructor(
    public router: Router,
    public searchContext: SearchContext,
    public currentUser: CurrentUserService,
    public collections: CollectionsService,
    public userPreference: UserPreferenceService,
    public userCan: Capabilities,
    private window: WindowRef,
    private filter: FilterService,
    private sortDefinition: SortDefinitionsService,
    private zone: NgZone,
    private store: AppStore,
    private activatedRoute: ActivatedRoute,
    private authentication: Authentication
  ) {
    zone.runOutsideAngular(() => {
      document.addEventListener('scroll', () => {
        this.store.dispatch(factory =>
          factory.headerDisplayOptions.setHeaderPosition(this.window.nativeWindow.pageYOffset)
        );
      });
    });
  }

  ngOnInit() {
    const token: string = localStorage.getItem('token');
    if (token) {
      this.authentication.validate(token).subscribe(() => {
        this.loadConfig();
      });
    } else {
      this.loadConfig();
    }

    this.routerChanges();
    this.processUser();
    this.store.dispatch(factory => factory.multiLingual.setLanguage('en'));
  }

  public get cartCount(): Observable<any> {
    return this.store.select(state =>
      this.userCan.administerQuotes() ?
        state.quoteEdit.data.itemCount : state.cart.data.itemCount
    );
  }

  public logout(): void {
    this.authentication.destroy().subscribe(() => this.currentUser.destroy());
  }

  public get footerConfig(): Observable<any> {
    return this.store.selectCloned(state => state.uiConfig)
      .filter(state => state.loaded)
      .map(state => state.components.footer.config).take(1);
  }

  public newSearchContext(query: any) {
    this.searchContext.remove = 'gq';
    let searchContext: any = Object.assign({}, this.searchContext.state, { q: query, i: 1, n: 100 });
    this.filter.load(searchContext, this.userPreference.state.displayFilterCounts).subscribe(() => { });
    this.searchContext.new(searchContext);
  }

  public toggleFilterTreePreference(): void {
    this.userPreference.toggleFilterTree();
  }

  public get headerIsFixed(): Observable<boolean> {
    return this.store.select(state => state.headerDisplayOptions.isFixed);
  }

  public get headerCanBeFixed(): Observable<boolean> {
    return this.store.select(state => state.headerDisplayOptions.canBeFixed);
  }

  public get headerConfig(): Observable<any> {
    return this.store.selectCloned(state => state.uiConfig)
      .filter(state => state.loaded)
      .map(state => state.components.header.config).take(1);
  }

  public get searchBoxConfig(): Observable<any> {
    return this.store.selectCloned(state => state.uiConfig)
      .filter(state => state.loaded)
      .map(state => state.components.searchBox.config).take(1);
  }

  private routerChanges() {
    this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .do((event: NavigationEnd) => {
        this.store.dispatch(factory => factory.headerDisplayOptions.checkIfHeaderCanBeFixed(event.urlAfterRedirects));
        this.store.dispatch(factory => factory.headerDisplayOptions.checkIfFiltersAreAvailable(event.urlAfterRedirects));
        this.state = event.url;
        this.window.nativeWindow.scrollTo(0, 0);
        return event;
      })
      .map(() => this.activatedRoute)
      .map((route: ActivatedRoute) => { while (route.firstChild) route = route.firstChild; return route; })
      .filter((route: ActivatedRoute) => route.outlet === 'primary')
      .subscribe((route: ActivatedRoute) => {
        route.params.combineLatest(route.data, (params, data) => {
          this.store.dispatch(factory => factory.page.updateTitle(data.title, params));
        }).take(1).subscribe();
      });
  }

  private processUser() {
    this.currentUser.loggedInState()
      .subscribe((loggedIn: boolean) => (loggedIn) ?
        this.processLoggedInUser() : this.processLoggedOutUser());
  }

  private processLoggedInUser() {
    this.userPreference.getPrefs();

    this.store.dispatch(factory => this.userCan.administerQuotes() ?
      factory.quoteEdit.load() : factory.cart.load());

    this.sortDefinition.getSortDefinitions().subscribe((data: any) => {
      this.userPreference.updateSortPreference(data.currentSort.id);
    });
  }

  private processLoggedOutUser() {
    this.userPreference.reset();
    this.collections.destroyAll();
    this.store.dispatch(factory => factory.headerDisplayOptions.reset());
    this.sortDefinition.getSortDefinitions().subscribe((data: any) => {
      this.userPreference.updateSortPreference(data.currentSort.id);
    });
  }

  private loadConfig() {
    if (this.store.snapshotCloned(state => state.uiConfig.loaded)) {
      this.router.initialNavigation();
    } else {
      this.store.dispatch(factory => factory.uiConfig.load());
    }
  }
}
