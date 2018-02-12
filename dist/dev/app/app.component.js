"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./operators");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var current_user_service_1 = require("./shared/services/current-user.service");
var search_context_service_1 = require("./shared/services/search-context.service");
var filter_service_1 = require("./shared/services/filter.service");
var sort_definitions_service_1 = require("./shared/services/sort-definitions.service");
var collections_service_1 = require("./shared/services/collections.service");
var user_preference_service_1 = require("./shared/services/user-preference.service");
var capabilities_service_1 = require("./shared/services/capabilities.service");
var window_ref_service_1 = require("./shared/services/window-ref.service");
var app_store_1 = require("./app.store");
var authentication_data_service_1 = require("./shared/services/authentication.data.service");
var AppComponent = (function () {
    function AppComponent(router, searchContext, currentUser, collections, userPreference, userCan, window, filter, sortDefinition, zone, store, activatedRoute, authentication) {
        var _this = this;
        this.router = router;
        this.searchContext = searchContext;
        this.currentUser = currentUser;
        this.collections = collections;
        this.userPreference = userPreference;
        this.userCan = userCan;
        this.window = window;
        this.filter = filter;
        this.sortDefinition = sortDefinition;
        this.zone = zone;
        this.store = store;
        this.activatedRoute = activatedRoute;
        this.authentication = authentication;
        this.state = '';
        zone.runOutsideAngular(function () {
            document.addEventListener('scroll', function () {
                _this.store.dispatch(function (factory) {
                    return factory.headerDisplayOptions.setHeaderPosition(_this.window.nativeWindow.pageYOffset);
                });
            });
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        if (token) {
            this.authentication.validate(token).subscribe(function () {
                _this.loadConfig();
            });
        }
        else {
            this.loadConfig();
        }
        this.routerChanges();
        this.processUser();
        this.store.dispatch(function (factory) { return factory.multiLingual.setLanguage('en'); });
    };
    Object.defineProperty(AppComponent.prototype, "cartCount", {
        get: function () {
            var _this = this;
            return this.store.select(function (state) {
                return _this.userCan.administerQuotes() ?
                    state.quoteEdit.data.itemCount : state.cart.data.itemCount;
            });
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.authentication.destroy().subscribe(function () { return _this.currentUser.destroy(); });
    };
    Object.defineProperty(AppComponent.prototype, "footerConfig", {
        get: function () {
            return this.store.selectCloned(function (state) { return state.uiConfig; })
                .filter(function (state) { return state.loaded; })
                .map(function (state) { return state.components.footer.config; }).take(1);
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.newSearchContext = function (query) {
        this.searchContext.remove = 'gq';
        var searchContext = Object.assign({}, this.searchContext.state, { q: query, i: 1, n: 100 });
        this.filter.load(searchContext, this.userPreference.state.displayFilterCounts).subscribe(function () { });
        this.searchContext.new(searchContext);
    };
    AppComponent.prototype.toggleFilterTreePreference = function () {
        this.userPreference.toggleFilterTree();
    };
    Object.defineProperty(AppComponent.prototype, "headerIsFixed", {
        get: function () {
            return this.store.select(function (state) { return state.headerDisplayOptions.isFixed; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "headerCanBeFixed", {
        get: function () {
            return this.store.select(function (state) { return state.headerDisplayOptions.canBeFixed; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "headerConfig", {
        get: function () {
            return this.store.selectCloned(function (state) { return state.uiConfig; })
                .filter(function (state) { return state.loaded; })
                .map(function (state) { return state.components.header.config; }).take(1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "searchBoxConfig", {
        get: function () {
            return this.store.selectCloned(function (state) { return state.uiConfig; })
                .filter(function (state) { return state.loaded; })
                .map(function (state) { return state.components.searchBox.config; }).take(1);
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.routerChanges = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .do(function (event) {
            _this.store.dispatch(function (factory) { return factory.headerDisplayOptions.checkIfHeaderCanBeFixed(event.urlAfterRedirects); });
            _this.store.dispatch(function (factory) { return factory.headerDisplayOptions.checkIfFiltersAreAvailable(event.urlAfterRedirects); });
            _this.state = event.url;
            _this.window.nativeWindow.scrollTo(0, 0);
            return event;
        })
            .map(function () { return _this.activatedRoute; })
            .map(function (route) { while (route.firstChild)
            route = route.firstChild; return route; })
            .filter(function (route) { return route.outlet === 'primary'; })
            .subscribe(function (route) {
            route.params.combineLatest(route.data, function (params, data) {
                _this.store.dispatch(function (factory) { return factory.page.updateTitle(data.title, params); });
            }).take(1).subscribe();
        });
    };
    AppComponent.prototype.processUser = function () {
        var _this = this;
        this.currentUser.loggedInState()
            .subscribe(function (loggedIn) { return (loggedIn) ?
            _this.processLoggedInUser() : _this.processLoggedOutUser(); });
    };
    AppComponent.prototype.processLoggedInUser = function () {
        var _this = this;
        this.userPreference.getPrefs();
        this.store.dispatch(function (factory) { return _this.userCan.administerQuotes() ?
            factory.quoteEdit.load() : factory.cart.load(); });
        this.sortDefinition.getSortDefinitions().subscribe(function (data) {
            _this.userPreference.updateSortPreference(data.currentSort.id);
        });
    };
    AppComponent.prototype.processLoggedOutUser = function () {
        var _this = this;
        this.userPreference.reset();
        this.collections.destroyAll();
        this.store.dispatch(function (factory) { return factory.headerDisplayOptions.reset(); });
        this.sortDefinition.getSortDefinitions().subscribe(function (data) {
            _this.userPreference.updateSortPreference(data.currentSort.id);
        });
    };
    AppComponent.prototype.loadConfig = function () {
        if (this.store.snapshotCloned(function (state) { return state.uiConfig.loaded; })) {
            this.router.initialNavigation();
        }
        else {
            this.store.dispatch(function (factory) { return factory.uiConfig.load(); });
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wazee-digital-platform',
            templateUrl: 'app.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [router_1.Router,
            search_context_service_1.SearchContext,
            current_user_service_1.CurrentUserService,
            collections_service_1.CollectionsService,
            user_preference_service_1.UserPreferenceService,
            capabilities_service_1.Capabilities,
            window_ref_service_1.WindowRef,
            filter_service_1.FilterService,
            sort_definitions_service_1.SortDefinitionsService,
            core_1.NgZone,
            app_store_1.AppStore,
            router_1.ActivatedRoute,
            authentication_data_service_1.Authentication])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsQ0FBQztRQUMxRCxDQUFDO0lBQ0gsQ0FBQztJQTlJVSxZQUFZO1FBUHhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxXQUFXLEVBQUUsVUFBVTtZQUN2QixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQU1pQixlQUFNO1lBQ0Msc0NBQWE7WUFDZix5Q0FBa0I7WUFDbEIsd0NBQWtCO1lBQ2YsK0NBQXFCO1lBQzVCLG1DQUFZO1lBQ1osOEJBQVM7WUFDVCw4QkFBYTtZQUNMLGlEQUFzQjtZQUNoQyxhQUFNO1lBQ0wsb0JBQVE7WUFDQyx1QkFBYztZQUNkLDRDQUFjO09BaEI3QixZQUFZLENBK0l4QjtJQUFELG1CQUFDO0NBL0lELEFBK0lDLElBQUE7QUEvSVksb0NBQVkiLCJmaWxlIjoiYXBwL2FwcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIsIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBFdmVudCwgTmF2aWdhdGlvbkVuZCwgUm91dGVyLCBSb3V0ZXNSZWNvZ25pemVkLCBEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuLy8gU2VydmljZXNcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaENvbnRleHQgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9zZWFyY2gtY29udGV4dC5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTb3J0RGVmaW5pdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvc29ydC1kZWZpbml0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbGxlY3Rpb25zU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2NvbGxlY3Rpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclByZWZlcmVuY2VTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvdXNlci1wcmVmZXJlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvd2luZG93LXJlZi5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi9hcHAuc3RvcmUnO1xuLy8gL0ludGVyZmFjZXNcbmltcG9ydCB7IElMYW5nIH0gZnJvbSAnLi9zaGFyZWQvaW50ZXJmYWNlcy9sYW5ndWFnZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmRhdGEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3dhemVlLWRpZ2l0YWwtcGxhdGZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJ2FwcC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgc3RhdGU6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcixcbiAgICBwdWJsaWMgc2VhcmNoQ29udGV4dDogU2VhcmNoQ29udGV4dCxcbiAgICBwdWJsaWMgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyU2VydmljZSxcbiAgICBwdWJsaWMgY29sbGVjdGlvbnM6IENvbGxlY3Rpb25zU2VydmljZSxcbiAgICBwdWJsaWMgdXNlclByZWZlcmVuY2U6IFVzZXJQcmVmZXJlbmNlU2VydmljZSxcbiAgICBwdWJsaWMgdXNlckNhbjogQ2FwYWJpbGl0aWVzLFxuICAgIHByaXZhdGUgd2luZG93OiBXaW5kb3dSZWYsXG4gICAgcHJpdmF0ZSBmaWx0ZXI6IEZpbHRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzb3J0RGVmaW5pdGlvbjogU29ydERlZmluaXRpb25zU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIGF1dGhlbnRpY2F0aW9uOiBBdXRoZW50aWNhdGlvblxuICApIHtcbiAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+XG4gICAgICAgICAgZmFjdG9yeS5oZWFkZXJEaXNwbGF5T3B0aW9ucy5zZXRIZWFkZXJQb3NpdGlvbih0aGlzLndpbmRvdy5uYXRpdmVXaW5kb3cucGFnZVlPZmZzZXQpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHRva2VuOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIHRoaXMuYXV0aGVudGljYXRpb24udmFsaWRhdGUodG9rZW4pLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZENvbmZpZygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9hZENvbmZpZygpO1xuICAgIH1cblxuICAgIHRoaXMucm91dGVyQ2hhbmdlcygpO1xuICAgIHRoaXMucHJvY2Vzc1VzZXIoKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5tdWx0aUxpbmd1YWwuc2V0TGFuZ3VhZ2UoJ2VuJykpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYXJ0Q291bnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT5cbiAgICAgIHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCkgP1xuICAgICAgICBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5pdGVtQ291bnQgOiBzdGF0ZS5jYXJ0LmRhdGEuaXRlbUNvdW50XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRoZW50aWNhdGlvbi5kZXN0cm95KCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY3VycmVudFVzZXIuZGVzdHJveSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZm9vdGVyQ29uZmlnKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnKVxuICAgICAgLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS5sb2FkZWQpXG4gICAgICAubWFwKHN0YXRlID0+IHN0YXRlLmNvbXBvbmVudHMuZm9vdGVyLmNvbmZpZykudGFrZSgxKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdTZWFyY2hDb250ZXh0KHF1ZXJ5OiBhbnkpIHtcbiAgICB0aGlzLnNlYXJjaENvbnRleHQucmVtb3ZlID0gJ2dxJztcbiAgICBsZXQgc2VhcmNoQ29udGV4dDogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZWFyY2hDb250ZXh0LnN0YXRlLCB7IHE6IHF1ZXJ5LCBpOiAxLCBuOiAxMDAgfSk7XG4gICAgdGhpcy5maWx0ZXIubG9hZChzZWFyY2hDb250ZXh0LCB0aGlzLnVzZXJQcmVmZXJlbmNlLnN0YXRlLmRpc3BsYXlGaWx0ZXJDb3VudHMpLnN1YnNjcmliZSgoKSA9PiB7IH0pO1xuICAgIHRoaXMuc2VhcmNoQ29udGV4dC5uZXcoc2VhcmNoQ29udGV4dCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRmlsdGVyVHJlZVByZWZlcmVuY2UoKTogdm9pZCB7XG4gICAgdGhpcy51c2VyUHJlZmVyZW5jZS50b2dnbGVGaWx0ZXJUcmVlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhlYWRlcklzRml4ZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhlYWRlckRpc3BsYXlPcHRpb25zLmlzRml4ZWQpO1xuICB9XG5cbiAgcHVibGljIGdldCBoZWFkZXJDYW5CZUZpeGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5oZWFkZXJEaXNwbGF5T3B0aW9ucy5jYW5CZUZpeGVkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGVhZGVyQ29uZmlnKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnKVxuICAgICAgLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS5sb2FkZWQpXG4gICAgICAubWFwKHN0YXRlID0+IHN0YXRlLmNvbXBvbmVudHMuaGVhZGVyLmNvbmZpZykudGFrZSgxKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2VhcmNoQm94Q29uZmlnKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnKVxuICAgICAgLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS5sb2FkZWQpXG4gICAgICAubWFwKHN0YXRlID0+IHN0YXRlLmNvbXBvbmVudHMuc2VhcmNoQm94LmNvbmZpZykudGFrZSgxKTtcbiAgfVxuXG4gIHByaXZhdGUgcm91dGVyQ2hhbmdlcygpIHtcbiAgICB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgIC5maWx0ZXIoKGV2ZW50OiBFdmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgICAgLmRvKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5oZWFkZXJEaXNwbGF5T3B0aW9ucy5jaGVja0lmSGVhZGVyQ2FuQmVGaXhlZChldmVudC51cmxBZnRlclJlZGlyZWN0cykpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5oZWFkZXJEaXNwbGF5T3B0aW9ucy5jaGVja0lmRmlsdGVyc0FyZUF2YWlsYWJsZShldmVudC51cmxBZnRlclJlZGlyZWN0cykpO1xuICAgICAgICB0aGlzLnN0YXRlID0gZXZlbnQudXJsO1xuICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVXaW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH0pXG4gICAgICAubWFwKCgpID0+IHRoaXMuYWN0aXZhdGVkUm91dGUpXG4gICAgICAubWFwKChyb3V0ZTogQWN0aXZhdGVkUm91dGUpID0+IHsgd2hpbGUgKHJvdXRlLmZpcnN0Q2hpbGQpIHJvdXRlID0gcm91dGUuZmlyc3RDaGlsZDsgcmV0dXJuIHJvdXRlOyB9KVxuICAgICAgLmZpbHRlcigocm91dGU6IEFjdGl2YXRlZFJvdXRlKSA9PiByb3V0ZS5vdXRsZXQgPT09ICdwcmltYXJ5JylcbiAgICAgIC5zdWJzY3JpYmUoKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgPT4ge1xuICAgICAgICByb3V0ZS5wYXJhbXMuY29tYmluZUxhdGVzdChyb3V0ZS5kYXRhLCAocGFyYW1zLCBkYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucGFnZS51cGRhdGVUaXRsZShkYXRhLnRpdGxlLCBwYXJhbXMpKTtcbiAgICAgICAgfSkudGFrZSgxKS5zdWJzY3JpYmUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzVXNlcigpIHtcbiAgICB0aGlzLmN1cnJlbnRVc2VyLmxvZ2dlZEluU3RhdGUoKVxuICAgICAgLnN1YnNjcmliZSgobG9nZ2VkSW46IGJvb2xlYW4pID0+IChsb2dnZWRJbikgP1xuICAgICAgICB0aGlzLnByb2Nlc3NMb2dnZWRJblVzZXIoKSA6IHRoaXMucHJvY2Vzc0xvZ2dlZE91dFVzZXIoKSk7XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NMb2dnZWRJblVzZXIoKSB7XG4gICAgdGhpcy51c2VyUHJlZmVyZW5jZS5nZXRQcmVmcygpO1xuXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCkgP1xuICAgICAgZmFjdG9yeS5xdW90ZUVkaXQubG9hZCgpIDogZmFjdG9yeS5jYXJ0LmxvYWQoKSk7XG5cbiAgICB0aGlzLnNvcnREZWZpbml0aW9uLmdldFNvcnREZWZpbml0aW9ucygpLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICB0aGlzLnVzZXJQcmVmZXJlbmNlLnVwZGF0ZVNvcnRQcmVmZXJlbmNlKGRhdGEuY3VycmVudFNvcnQuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzTG9nZ2VkT3V0VXNlcigpIHtcbiAgICB0aGlzLnVzZXJQcmVmZXJlbmNlLnJlc2V0KCk7XG4gICAgdGhpcy5jb2xsZWN0aW9ucy5kZXN0cm95QWxsKCk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuaGVhZGVyRGlzcGxheU9wdGlvbnMucmVzZXQoKSk7XG4gICAgdGhpcy5zb3J0RGVmaW5pdGlvbi5nZXRTb3J0RGVmaW5pdGlvbnMoKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgdGhpcy51c2VyUHJlZmVyZW5jZS51cGRhdGVTb3J0UHJlZmVyZW5jZShkYXRhLmN1cnJlbnRTb3J0LmlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZENvbmZpZygpIHtcbiAgICBpZiAodGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5sb2FkZWQpKSB7XG4gICAgICB0aGlzLnJvdXRlci5pbml0aWFsTmF2aWdhdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS51aUNvbmZpZy5sb2FkKCkpO1xuICAgIH1cbiAgfVxufVxuIl19
