"use strict";
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
    AppComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wazee-digital-platform',
                    templateUrl: 'app.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    AppComponent.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: search_context_service_1.SearchContext, },
        { type: current_user_service_1.CurrentUserService, },
        { type: collections_service_1.CollectionsService, },
        { type: user_preference_service_1.UserPreferenceService, },
        { type: capabilities_service_1.Capabilities, },
        { type: window_ref_service_1.WindowRef, },
        { type: filter_service_1.FilterService, },
        { type: sort_definitions_service_1.SortDefinitionsService, },
        { type: core_1.NgZone, },
        { type: app_store_1.AppStore, },
        { type: router_1.ActivatedRoute, },
        { type: authentication_data_service_1.Authentication, },
    ]; };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map