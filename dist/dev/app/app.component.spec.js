"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var mock_app_store_1 = require("./store/spec-helpers/mock-app.store");
function main() {
    describe('App Component', function () {
        var mockRouter;
        var mockMultiLingual;
        var mockSearchContext;
        var mockCurrentUserService;
        var mockCollections;
        var mockUserPreference;
        var mockNotification;
        var mockUserCan;
        var mockWindow;
        var mockNgZone;
        var componentUnderTest;
        var mockStore;
        var mockFilter;
        var mockSortDefinition;
        var cartLoadSpy;
        var collectionLoadSpy;
        var quoteLoadSpy;
        var setHeaderPositionSpy;
        var checkIfFiltersAreAvailableSpy;
        var checkIfHeaderCanBeFixedSpy;
        var configLoadSpy;
        var resetSpy;
        var setLanguageSpy;
        var loggedInState = false;
        var canViewCollections = true;
        var canAdministerQuotes = false;
        var nextNavigation;
        var mockActivatedRoute;
        var mockAuthenticationService;
        beforeEach(function () {
            mockRouter = { events: Observable_1.Observable.of(nextNavigation), initialNavigation: jasmine.createSpy('initialNavigation') };
            mockSearchContext = {
                update: null,
                go: jasmine.createSpy('go'),
                new: jasmine.createSpy('new'),
                state: { q: 'cat', i: 7, n: 100, sortId: 23, filterIds: '1517', filterValues: '1517:2015-12-10 - 2016-12-12' }
            };
            mockCurrentUserService = {
                set: jasmine.createSpy('set'),
                destroy: jasmine.createSpy('destroy'),
                loggedIn: function () { return true; },
                loggedInState: function () { return Observable_1.Observable.of(loggedInState); }
            };
            mockCollections = {
                load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of({})),
                destroyAll: jasmine.createSpy('destroyAll')
            };
            mockUserPreference = {
                state: {
                    sortId: 23,
                    displayFilterCounts: true
                },
                reset: jasmine.createSpy('reset'),
                getPrefs: jasmine.createSpy('getPrefs'),
                toggleFilterTree: jasmine.createSpy('toggleFilterTree'),
                updateSortPreference: jasmine.createSpy('updateSortPreference')
            };
            mockUserCan = { viewCollections: function () { return canViewCollections; }, administerQuotes: function () { return canAdministerQuotes; } };
            mockWindow = { nativeWindow: { pageYOffset: 133, scrollTo: jasmine.createSpy('scrollTo') } };
            mockFilter = { load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of({})) };
            mockSortDefinition = { getSortDefinitions: function () { return Observable_1.Observable.of({ currentSort: { id: 1 } }); } };
            mockNgZone = { runOutsideAngular: function () { return true; } };
            mockActivatedRoute = {
                data: { title: 'wow' },
                params: { some: 'params' },
                firstChild: 'primary'
            };
            mockStore = new mock_app_store_1.MockAppStore();
            configLoadSpy = mockStore.createActionFactoryMethod('uiConfig', 'load');
            collectionLoadSpy = mockStore.createActionFactoryMethod('activeCollection', 'load');
            cartLoadSpy = mockStore.createActionFactoryMethod('cart', 'load');
            quoteLoadSpy = mockStore.createActionFactoryMethod('quoteEdit', 'load');
            setHeaderPositionSpy = mockStore.createActionFactoryMethod('headerDisplayOptions', 'setHeaderPosition');
            checkIfHeaderCanBeFixedSpy = mockStore.createActionFactoryMethod('headerDisplayOptions', 'checkIfHeaderCanBeFixed');
            checkIfFiltersAreAvailableSpy = mockStore.createActionFactoryMethod('headerDisplayOptions', 'checkIfFiltersAreAvailable');
            resetSpy = mockStore.createActionFactoryMethod('headerDisplayOptions', 'reset');
            setLanguageSpy = mockStore.createActionFactoryMethod('multiLingual', 'setLanguage');
            mockAuthenticationService = { destroy: jasmine.createSpy('destroy').and.returnValue(Observable_1.Observable.of({})) };
            componentUnderTest = new app_component_1.AppComponent(mockRouter, mockSearchContext, mockCurrentUserService, mockCollections, mockUserPreference, mockUserCan, mockWindow, mockFilter, mockSortDefinition, mockNgZone, mockStore, mockActivatedRoute, mockAuthenticationService);
        });
        describe('ngOnInit()', function () {
            describe('Set the default language', function () {
                it('dispatchs the default language to be set', function () {
                    componentUnderTest.ngOnInit();
                    expect(setLanguageSpy).toHaveBeenCalledWith('en');
                });
            });
            describe('processUser()', function () {
                beforeEach(function () {
                    nextNavigation = new router_1.NavigationEnd(1, '/', '/');
                });
                it('Should process the actions for a logged out user', function () {
                    loggedInState = false;
                    componentUnderTest.ngOnInit();
                    expect(mockCollections.destroyAll).toHaveBeenCalled();
                    mockStore.expectDispatchFor(resetSpy);
                    expect(mockUserPreference.reset).toHaveBeenCalled();
                });
                it('Should process the actions for a logged in user - without administer quotes', function () {
                    loggedInState = true;
                    canAdministerQuotes = false;
                    componentUnderTest.ngOnInit();
                    expect(mockUserPreference.getPrefs).toHaveBeenCalled();
                    expect(cartLoadSpy).toHaveBeenCalled();
                });
                it('Should process the actions for a logged in user - with administer quotes', function () {
                    loggedInState = true;
                    canAdministerQuotes = true;
                    componentUnderTest.ngOnInit();
                    expect(mockUserPreference.getPrefs).toHaveBeenCalled();
                    expect(quoteLoadSpy).toHaveBeenCalled();
                });
            });
            describe('toggleFilterTreePreference()', function () {
                it('should call toggleFilterTree() on the user preference service', function () {
                    componentUnderTest.toggleFilterTreePreference();
                    expect(mockUserPreference.toggleFilterTree).toHaveBeenCalled();
                });
            });
            describe('routerChanges()', function () {
                describe('for NavigationEnd', function () {
                    beforeEach(function () {
                        nextNavigation = new router_1.NavigationEnd(1, '/', '/');
                        componentUnderTest.ngOnInit();
                    });
                    it('Pass the current state url to see if we should display the search bar', function () {
                        mockStore.expectDispatchFor(checkIfHeaderCanBeFixedSpy, '/');
                    });
                    it('Pass the current state url to see if we should display the filters', function () {
                        mockStore.expectDispatchFor(checkIfFiltersAreAvailableSpy, '/');
                    });
                    it('Assign the current url state to an instance variable', function () {
                        expect(componentUnderTest.state).toEqual('/');
                    });
                    it('Should make sure the page is scrolled to the top on each successful state change', function () {
                        expect(mockWindow.nativeWindow.scrollTo).toHaveBeenCalledWith(0, 0);
                    });
                });
            });
            describe('loadConfig', function () {
                it('Should initialize the navigation immediately if the config is already loaded', function () {
                    mockStore.createStateSection('uiConfig', { loaded: true });
                    componentUnderTest.ngOnInit();
                    expect(mockRouter.initialNavigation).toHaveBeenCalled();
                    mockStore.expectNoDispatchFor(configLoadSpy);
                });
                it('Should load the config if it is not loaded and then initialize the navigation', function () {
                    mockStore.createStateSection('uiConfig', { loaded: false });
                    componentUnderTest.ngOnInit();
                    expect(mockRouter.initialNavigation).not.toHaveBeenCalled();
                    mockStore.expectDispatchFor(configLoadSpy);
                });
            });
        });
        describe('logout()', function () {
            beforeEach(function () { return componentUnderTest.logout(); });
            it('Should call destroy() on the currentUserService', function () {
                expect(mockCurrentUserService.destroy).toHaveBeenCalled();
            });
            it('Should call destroy() on the authenticationService', function () {
                expect(mockAuthenticationService.destroy).toHaveBeenCalled();
            });
        });
        describe('newSearchContext()', function () {
            it('Should merge the searchContext with a new query and get a new filter tree', function () {
                componentUnderTest.newSearchContext('dogs');
                expect(mockSearchContext.new).toHaveBeenCalledWith({
                    q: 'dogs', i: 1, n: 100, sortId: 23, filterIds: '1517',
                    filterValues: '1517:2015-12-10 - 2016-12-12'
                });
                expect(mockFilter.load).toHaveBeenCalledWith({
                    q: 'dogs', i: 1, n: 100, sortId: 23, filterIds: '1517',
                    filterValues: '1517:2015-12-10 - 2016-12-12'
                }, true);
            });
        });
        describe('headerConfig getter', function () {
            it('returns the right part of the UiConfig store when the config is loaded', function () {
                mockStore.createStateSection('uiConfig', { loaded: true, components: { header: { config: { some: 'header' } } } });
                var config;
                componentUnderTest.headerConfig.take(1).subscribe(function (c) { return config = c; });
                expect(config).toEqual({ some: 'header' });
            });
        });
        describe('searchBoxConfig getter', function () {
            it('returns the right part of the UiConfig store when the config is loaded', function () {
                mockStore.createStateSection('uiConfig', { loaded: true, components: { searchBox: { config: { some: 'searchBox' } } } });
                var config;
                componentUnderTest.searchBoxConfig.take(1).subscribe(function (c) { return config = c; });
                expect(config).toEqual({ some: 'searchBox' });
            });
        });
        describe('headerIsFixed getter', function () {
            it('should return observable of true if the isFixed property of the headerDisplayOptions is true', function () {
                mockStore.createStateSection('headerDisplayOptions', { isFixed: true });
                var isFixed;
                componentUnderTest.headerIsFixed.take(1).subscribe(function (fixed) { return isFixed = fixed; });
                expect(isFixed).toBe(true);
            });
            it('should return observable of false if the isFixed property of the headerDisplayOptions is false', function () {
                mockStore.createStateSection('headerDisplayOptions', { isFixed: false });
                var isFixed;
                componentUnderTest.headerIsFixed.take(1).subscribe(function (fixed) { return isFixed = fixed; });
                expect(isFixed).toBe(false);
            });
        });
        describe('headerCanBeFixed getter', function () {
            it('should return observable of true if the canBeFixed property of the headerDisplayOptions is true', function () {
                mockStore.createStateSection('headerDisplayOptions', { canBeFixed: true });
                var canBeFixed;
                componentUnderTest.headerCanBeFixed.take(1).subscribe(function (fixed) { return canBeFixed = fixed; });
                expect(canBeFixed).toBe(true);
            });
            it('should return observable of false if the canBeFixed property of the headerDisplayOptions is false', function () {
                mockStore.createStateSection('headerDisplayOptions', { canBeFixed: false });
                var canBeFixed;
                componentUnderTest.headerCanBeFixed.take(1).subscribe(function (fixed) { return canBeFixed = fixed; });
                expect(canBeFixed).toBe(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFDN0MsMENBQXlFO0FBRXpFLGlEQUErQztBQUMvQyxzRUFBbUU7QUFFbkU7SUFDRSxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3hCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksZ0JBQXFCLENBQUM7UUFDMUIsSUFBSSxpQkFBc0IsQ0FBQztRQUMzQixJQUFJLHNCQUEyQixDQUFDO1FBQ2hDLElBQUksZUFBb0IsQ0FBQztRQUN6QixJQUFJLGtCQUF1QixDQUFDO1FBQzVCLElBQUksZ0JBQXFCLENBQUM7UUFDMUIsSUFBSSxXQUFnQixDQUFDO1FBQ3JCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksa0JBQWdDLENBQUM7UUFDckMsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksa0JBQXVCLENBQUM7UUFDNUIsSUFBSSxXQUF3QixDQUFDO1FBQzdCLElBQUksaUJBQThCLENBQUM7UUFDbkMsSUFBSSxZQUF5QixDQUFDO1FBQzlCLElBQUksb0JBQWlDLENBQUM7UUFDdEMsSUFBSSw2QkFBMEMsQ0FBQztRQUMvQyxJQUFJLDBCQUF1QyxDQUFDO1FBQzVDLElBQUksYUFBMEIsQ0FBQztRQUMvQixJQUFJLFFBQXFCLENBQUM7UUFDMUIsSUFBSSxjQUEyQixDQUFDO1FBQ2hDLElBQUksYUFBYSxHQUFZLEtBQUssQ0FBQztRQUNuQyxJQUFJLGtCQUFrQixHQUFZLElBQUksQ0FBQztRQUN2QyxJQUFJLG1CQUFtQixHQUFZLEtBQUssQ0FBQztRQUN6QyxJQUFJLGNBQXFCLENBQUM7UUFDMUIsSUFBSSxrQkFBdUIsQ0FBQztRQUM1QixJQUFJLHlCQUE4QixDQUFDO1FBRW5DLFVBQVUsQ0FBQztZQUNULFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztZQUVsSCxpQkFBaUIsR0FBRztnQkFDbEIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUMzQixHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsOEJBQThCLEVBQUU7YUFDL0csQ0FBQztZQUVGLHNCQUFzQixHQUFHO2dCQUN2QixHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFDckMsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTtnQkFDcEIsYUFBYSxFQUFFLGNBQU0sT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBNUIsQ0FBNEI7YUFDbEQsQ0FBQztZQUVGLGVBQWUsR0FBRztnQkFDaEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2FBQzVDLENBQUM7WUFFRixrQkFBa0IsR0FBRztnQkFDbkIsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSxFQUFFO29CQUNWLG1CQUFtQixFQUFFLElBQUk7aUJBQzFCO2dCQUNELEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDakMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDO2dCQUN2RCxvQkFBb0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDO2FBQ2hFLENBQUM7WUFFRixXQUFXLEdBQUcsRUFBRSxlQUFlLEVBQUUsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixFQUFFLGdCQUFnQixFQUFFLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsRUFBRSxDQUFDO1lBQ3pHLFVBQVUsR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzdGLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BGLGtCQUFrQixHQUFHLEVBQUUsa0JBQWtCLEVBQUUsY0FBTSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBekMsQ0FBeUMsRUFBRSxDQUFDO1lBQzdGLFVBQVUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUFFLENBQUM7WUFDL0Msa0JBQWtCLEdBQUc7Z0JBQ25CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ3RCLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0JBQzFCLFVBQVUsRUFBRSxTQUFTO2FBQ3RCLENBQUM7WUFFRixTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0IsYUFBYSxHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEUsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BGLFdBQVcsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLFlBQVksR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxzQkFBc0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3hHLDBCQUEwQixHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3BILDZCQUE2QixHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxzQkFBc0IsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1lBQzFILFFBQVEsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEYsY0FBYyxHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFcEYseUJBQXlCLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUV6RyxrQkFBa0IsR0FBRyxJQUFJLDRCQUFZLENBQ25DLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFDckQsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQzVELFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLHlCQUF5QixDQUNyRyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFHSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtnQkFDbkMsRUFBRSxDQUFDLDBDQUEwQyxFQUFFO29CQUM3QyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwRCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsVUFBVSxDQUFDO29CQUNULGNBQWMsR0FBRyxJQUFJLHNCQUFhLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFO29CQUNyRCxhQUFhLEdBQUcsS0FBSyxDQUFDO29CQUN0QixrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN0RCxTQUFTLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsNkVBQTZFLEVBQUU7b0JBQ2hGLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLG1CQUFtQixHQUFHLEtBQUssQ0FBQztvQkFDNUIsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRTlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN2RCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLDBFQUEwRSxFQUFFO29CQUM3RSxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUNyQixtQkFBbUIsR0FBRyxJQUFJLENBQUM7b0JBQzNCLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUU5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDdkQsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsOEJBQThCLEVBQUU7Z0JBQ3ZDLEVBQUUsQ0FBQywrREFBK0QsRUFBRTtvQkFDbEUsa0JBQWtCLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztvQkFFaEQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDakUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDMUIsUUFBUSxDQUFDLG1CQUFtQixFQUFFO29CQUM1QixVQUFVLENBQUM7d0JBQ1QsY0FBYyxHQUFHLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNoRCxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDaEMsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLHVFQUF1RSxFQUFFO3dCQUMxRSxTQUFTLENBQUMsaUJBQWlCLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxvRUFBb0UsRUFBRTt3QkFDdkUsU0FBUyxDQUFDLGlCQUFpQixDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNsRSxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsc0RBQXNELEVBQUU7d0JBQ3pELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hELENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxrRkFBa0YsRUFBRTt3QkFDckYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLFlBQVksRUFBRTtnQkFDckIsRUFBRSxDQUFDLDhFQUE4RSxFQUFFO29CQUNqRixTQUFTLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzNELGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUU5QixNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEQsU0FBUyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsK0VBQStFLEVBQUU7b0JBQ2xGLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDNUQsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRTlCLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDNUQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ25CLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLENBQUMsTUFBTSxFQUFFLEVBQTNCLENBQTJCLENBQUMsQ0FBQztZQUU5QyxFQUFFLENBQUMsaURBQWlELEVBQUU7Z0JBQ3BELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFO2dCQUN2RCxNQUFNLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMvRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLEVBQUUsQ0FBQywyRUFBMkUsRUFBRTtnQkFDOUUsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FDaEQ7b0JBQ0UsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTTtvQkFDdEQsWUFBWSxFQUFFLDhCQUE4QjtpQkFDN0MsQ0FBQyxDQUFDO2dCQUNMLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQzFDO29CQUNFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU07b0JBQ3RELFlBQVksRUFBRSw4QkFBOEI7aUJBQzdDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLEVBQUUsQ0FBQyx3RUFBd0UsRUFBRTtnQkFDM0UsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRW5ILElBQUksTUFBVyxDQUFDO2dCQUNoQixrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sR0FBRyxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1lBQ2pDLEVBQUUsQ0FBQyx3RUFBd0UsRUFBRTtnQkFDM0UsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXpILElBQUksTUFBVyxDQUFDO2dCQUNoQixrQkFBa0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sR0FBRyxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUM7Z0JBQ3RFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLEVBQUUsQ0FBQyw4RkFBOEYsRUFBRTtnQkFDakcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3hFLElBQUksT0FBZ0IsQ0FBQztnQkFDckIsa0JBQWtCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLEdBQUcsS0FBSyxFQUFmLENBQWUsQ0FBQyxDQUFDO2dCQUM3RSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGdHQUFnRyxFQUFFO2dCQUNuRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDekUsSUFBSSxPQUFnQixDQUFDO2dCQUNyQixrQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sR0FBRyxLQUFLLEVBQWYsQ0FBZSxDQUFDLENBQUM7Z0JBQzdFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxFQUFFLENBQUMsaUdBQWlHLEVBQUU7Z0JBQ3BHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLFVBQW1CLENBQUM7Z0JBQ3hCLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxVQUFVLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7Z0JBQ25GLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsbUdBQW1HLEVBQUU7Z0JBQ3RHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLFVBQW1CLENBQUM7Z0JBQ3hCLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxVQUFVLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7Z0JBQ25GLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdRRCxvQkE2UUMiLCJmaWxlIjoiYXBwL2FwcC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRXZlbnQsIE5hdmlnYXRpb25FbmQsIFJvdXRlc1JlY29nbml6ZWQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0FwcCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IG1vY2tSb3V0ZXI6IGFueTtcbiAgICBsZXQgbW9ja011bHRpTGluZ3VhbDogYW55O1xuICAgIGxldCBtb2NrU2VhcmNoQ29udGV4dDogYW55O1xuICAgIGxldCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tDb2xsZWN0aW9uczogYW55O1xuICAgIGxldCBtb2NrVXNlclByZWZlcmVuY2U6IGFueTtcbiAgICBsZXQgbW9ja05vdGlmaWNhdGlvbjogYW55O1xuICAgIGxldCBtb2NrVXNlckNhbjogYW55O1xuICAgIGxldCBtb2NrV2luZG93OiBhbnk7XG4gICAgbGV0IG1vY2tOZ1pvbmU6IGFueTtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBBcHBDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuICAgIGxldCBtb2NrRmlsdGVyOiBhbnk7XG4gICAgbGV0IG1vY2tTb3J0RGVmaW5pdGlvbjogYW55O1xuICAgIGxldCBjYXJ0TG9hZFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IGNvbGxlY3Rpb25Mb2FkU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgcXVvdGVMb2FkU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgc2V0SGVhZGVyUG9zaXRpb25TcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBjaGVja0lmRmlsdGVyc0FyZUF2YWlsYWJsZVNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IGNoZWNrSWZIZWFkZXJDYW5CZUZpeGVkU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgY29uZmlnTG9hZFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IHJlc2V0U3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgc2V0TGFuZ3VhZ2VTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBsb2dnZWRJblN0YXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgbGV0IGNhblZpZXdDb2xsZWN0aW9uczogYm9vbGVhbiA9IHRydWU7XG4gICAgbGV0IGNhbkFkbWluaXN0ZXJRdW90ZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsZXQgbmV4dE5hdmlnYXRpb246IEV2ZW50O1xuICAgIGxldCBtb2NrQWN0aXZhdGVkUm91dGU6IGFueTtcbiAgICBsZXQgbW9ja0F1dGhlbnRpY2F0aW9uU2VydmljZTogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrUm91dGVyID0geyBldmVudHM6IE9ic2VydmFibGUub2YobmV4dE5hdmlnYXRpb24pLCBpbml0aWFsTmF2aWdhdGlvbjogamFzbWluZS5jcmVhdGVTcHkoJ2luaXRpYWxOYXZpZ2F0aW9uJykgfTtcblxuICAgICAgbW9ja1NlYXJjaENvbnRleHQgPSB7XG4gICAgICAgIHVwZGF0ZTogbnVsbCxcbiAgICAgICAgZ286IGphc21pbmUuY3JlYXRlU3B5KCdnbycpLFxuICAgICAgICBuZXc6IGphc21pbmUuY3JlYXRlU3B5KCduZXcnKSxcbiAgICAgICAgc3RhdGU6IHsgcTogJ2NhdCcsIGk6IDcsIG46IDEwMCwgc29ydElkOiAyMywgZmlsdGVySWRzOiAnMTUxNycsIGZpbHRlclZhbHVlczogJzE1MTc6MjAxNS0xMi0xMCAtIDIwMTYtMTItMTInIH1cbiAgICAgIH07XG5cbiAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7XG4gICAgICAgIHNldDogamFzbWluZS5jcmVhdGVTcHkoJ3NldCcpLFxuICAgICAgICBkZXN0cm95OiBqYXNtaW5lLmNyZWF0ZVNweSgnZGVzdHJveScpLFxuICAgICAgICBsb2dnZWRJbjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgbG9nZ2VkSW5TdGF0ZTogKCkgPT4gT2JzZXJ2YWJsZS5vZihsb2dnZWRJblN0YXRlKVxuICAgICAgfTtcblxuICAgICAgbW9ja0NvbGxlY3Rpb25zID0ge1xuICAgICAgICBsb2FkOiBqYXNtaW5lLmNyZWF0ZVNweSgnbG9hZCcpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHt9KSksXG4gICAgICAgIGRlc3Ryb3lBbGw6IGphc21pbmUuY3JlYXRlU3B5KCdkZXN0cm95QWxsJylcbiAgICAgIH07XG5cbiAgICAgIG1vY2tVc2VyUHJlZmVyZW5jZSA9IHtcbiAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICBzb3J0SWQ6IDIzLFxuICAgICAgICAgIGRpc3BsYXlGaWx0ZXJDb3VudHM6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgcmVzZXQ6IGphc21pbmUuY3JlYXRlU3B5KCdyZXNldCcpLFxuICAgICAgICBnZXRQcmVmczogamFzbWluZS5jcmVhdGVTcHkoJ2dldFByZWZzJyksXG4gICAgICAgIHRvZ2dsZUZpbHRlclRyZWU6IGphc21pbmUuY3JlYXRlU3B5KCd0b2dnbGVGaWx0ZXJUcmVlJyksXG4gICAgICAgIHVwZGF0ZVNvcnRQcmVmZXJlbmNlOiBqYXNtaW5lLmNyZWF0ZVNweSgndXBkYXRlU29ydFByZWZlcmVuY2UnKVxuICAgICAgfTtcblxuICAgICAgbW9ja1VzZXJDYW4gPSB7IHZpZXdDb2xsZWN0aW9uczogKCkgPT4gY2FuVmlld0NvbGxlY3Rpb25zLCBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBjYW5BZG1pbmlzdGVyUXVvdGVzIH07XG4gICAgICBtb2NrV2luZG93ID0geyBuYXRpdmVXaW5kb3c6IHsgcGFnZVlPZmZzZXQ6IDEzMywgc2Nyb2xsVG86IGphc21pbmUuY3JlYXRlU3B5KCdzY3JvbGxUbycpIH0gfTtcbiAgICAgIG1vY2tGaWx0ZXIgPSB7IGxvYWQ6IGphc21pbmUuY3JlYXRlU3B5KCdsb2FkJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKSB9O1xuICAgICAgbW9ja1NvcnREZWZpbml0aW9uID0geyBnZXRTb3J0RGVmaW5pdGlvbnM6ICgpID0+IE9ic2VydmFibGUub2YoeyBjdXJyZW50U29ydDogeyBpZDogMSB9IH0pIH07XG4gICAgICBtb2NrTmdab25lID0geyBydW5PdXRzaWRlQW5ndWxhcjogKCkgPT4gdHJ1ZSB9O1xuICAgICAgbW9ja0FjdGl2YXRlZFJvdXRlID0ge1xuICAgICAgICBkYXRhOiB7IHRpdGxlOiAnd293JyB9LFxuICAgICAgICBwYXJhbXM6IHsgc29tZTogJ3BhcmFtcycgfSxcbiAgICAgICAgZmlyc3RDaGlsZDogJ3ByaW1hcnknXG4gICAgICB9O1xuXG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBjb25maWdMb2FkU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3VpQ29uZmlnJywgJ2xvYWQnKTtcbiAgICAgIGNvbGxlY3Rpb25Mb2FkU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2FjdGl2ZUNvbGxlY3Rpb24nLCAnbG9hZCcpO1xuICAgICAgY2FydExvYWRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnY2FydCcsICdsb2FkJyk7XG4gICAgICBxdW90ZUxvYWRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVFZGl0JywgJ2xvYWQnKTtcbiAgICAgIHNldEhlYWRlclBvc2l0aW9uU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2hlYWRlckRpc3BsYXlPcHRpb25zJywgJ3NldEhlYWRlclBvc2l0aW9uJyk7XG4gICAgICBjaGVja0lmSGVhZGVyQ2FuQmVGaXhlZFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdoZWFkZXJEaXNwbGF5T3B0aW9ucycsICdjaGVja0lmSGVhZGVyQ2FuQmVGaXhlZCcpO1xuICAgICAgY2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGVTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnaGVhZGVyRGlzcGxheU9wdGlvbnMnLCAnY2hlY2tJZkZpbHRlcnNBcmVBdmFpbGFibGUnKTtcbiAgICAgIHJlc2V0U3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2hlYWRlckRpc3BsYXlPcHRpb25zJywgJ3Jlc2V0Jyk7XG4gICAgICBzZXRMYW5ndWFnZVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdtdWx0aUxpbmd1YWwnLCAnc2V0TGFuZ3VhZ2UnKTtcblxuICAgICAgbW9ja0F1dGhlbnRpY2F0aW9uU2VydmljZSA9IHsgZGVzdHJveTogamFzbWluZS5jcmVhdGVTcHkoJ2Rlc3Ryb3knKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7fSkpIH07XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBBcHBDb21wb25lbnQoXG4gICAgICAgIG1vY2tSb3V0ZXIsIG1vY2tTZWFyY2hDb250ZXh0LCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLFxuICAgICAgICBtb2NrQ29sbGVjdGlvbnMsIG1vY2tVc2VyUHJlZmVyZW5jZSwgbW9ja1VzZXJDYW4sIG1vY2tXaW5kb3csXG4gICAgICAgIG1vY2tGaWx0ZXIsIG1vY2tTb3J0RGVmaW5pdGlvbiwgbW9ja05nWm9uZSwgbW9ja1N0b3JlLCBtb2NrQWN0aXZhdGVkUm91dGUsIG1vY2tBdXRoZW50aWNhdGlvblNlcnZpY2VcbiAgICAgICk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ1NldCB0aGUgZGVmYXVsdCBsYW5ndWFnZScsICgpID0+IHtcbiAgICAgICAgaXQoJ2Rpc3BhdGNocyB0aGUgZGVmYXVsdCBsYW5ndWFnZSB0byBiZSBzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgZXhwZWN0KHNldExhbmd1YWdlU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnZW4nKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3Byb2Nlc3NVc2VyKCknLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIG5leHROYXZpZ2F0aW9uID0gbmV3IE5hdmlnYXRpb25FbmQoMSwgJy8nLCAnLycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2hvdWxkIHByb2Nlc3MgdGhlIGFjdGlvbnMgZm9yIGEgbG9nZ2VkIG91dCB1c2VyJywgKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlZEluU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25zLmRlc3Ryb3lBbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IocmVzZXRTcHkpO1xuICAgICAgICAgIGV4cGVjdChtb2NrVXNlclByZWZlcmVuY2UucmVzZXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ1Nob3VsZCBwcm9jZXNzIHRoZSBhY3Rpb25zIGZvciBhIGxvZ2dlZCBpbiB1c2VyIC0gd2l0aG91dCBhZG1pbmlzdGVyIHF1b3RlcycsICgpID0+IHtcbiAgICAgICAgICBsb2dnZWRJblN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICBjYW5BZG1pbmlzdGVyUXVvdGVzID0gZmFsc2U7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja1VzZXJQcmVmZXJlbmNlLmdldFByZWZzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgZXhwZWN0KGNhcnRMb2FkU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdTaG91bGQgcHJvY2VzcyB0aGUgYWN0aW9ucyBmb3IgYSBsb2dnZWQgaW4gdXNlciAtIHdpdGggYWRtaW5pc3RlciBxdW90ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VkSW5TdGF0ZSA9IHRydWU7XG4gICAgICAgICAgY2FuQWRtaW5pc3RlclF1b3RlcyA9IHRydWU7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja1VzZXJQcmVmZXJlbmNlLmdldFByZWZzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgZXhwZWN0KHF1b3RlTG9hZFNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgndG9nZ2xlRmlsdGVyVHJlZVByZWZlcmVuY2UoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRvZ2dsZUZpbHRlclRyZWUoKSBvbiB0aGUgdXNlciBwcmVmZXJlbmNlIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUZpbHRlclRyZWVQcmVmZXJlbmNlKCk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja1VzZXJQcmVmZXJlbmNlLnRvZ2dsZUZpbHRlclRyZWUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JvdXRlckNoYW5nZXMoKScsICgpID0+IHtcbiAgICAgICAgZGVzY3JpYmUoJ2ZvciBOYXZpZ2F0aW9uRW5kJywgKCkgPT4ge1xuICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgbmV4dE5hdmlnYXRpb24gPSBuZXcgTmF2aWdhdGlvbkVuZCgxLCAnLycsICcvJyk7XG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdQYXNzIHRoZSBjdXJyZW50IHN0YXRlIHVybCB0byBzZWUgaWYgd2Ugc2hvdWxkIGRpc3BsYXkgdGhlIHNlYXJjaCBiYXInLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoY2hlY2tJZkhlYWRlckNhbkJlRml4ZWRTcHksICcvJyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnUGFzcyB0aGUgY3VycmVudCBzdGF0ZSB1cmwgdG8gc2VlIGlmIHdlIHNob3VsZCBkaXNwbGF5IHRoZSBmaWx0ZXJzJywgKCkgPT4ge1xuICAgICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKGNoZWNrSWZGaWx0ZXJzQXJlQXZhaWxhYmxlU3B5LCAnLycpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ0Fzc2lnbiB0aGUgY3VycmVudCB1cmwgc3RhdGUgdG8gYW4gaW5zdGFuY2UgdmFyaWFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnN0YXRlKS50b0VxdWFsKCcvJyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnU2hvdWxkIG1ha2Ugc3VyZSB0aGUgcGFnZSBpcyBzY3JvbGxlZCB0byB0aGUgdG9wIG9uIGVhY2ggc3VjY2Vzc2Z1bCBzdGF0ZSBjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja1dpbmRvdy5uYXRpdmVXaW5kb3cuc2Nyb2xsVG8pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDAsIDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnbG9hZENvbmZpZycsICgpID0+IHtcbiAgICAgICAgaXQoJ1Nob3VsZCBpbml0aWFsaXplIHRoZSBuYXZpZ2F0aW9uIGltbWVkaWF0ZWx5IGlmIHRoZSBjb25maWcgaXMgYWxyZWFkeSBsb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigndWlDb25maWcnLCB7IGxvYWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrUm91dGVyLmluaXRpYWxOYXZpZ2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdE5vRGlzcGF0Y2hGb3IoY29uZmlnTG9hZFNweSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdTaG91bGQgbG9hZCB0aGUgY29uZmlnIGlmIGl0IGlzIG5vdCBsb2FkZWQgYW5kIHRoZW4gaW5pdGlhbGl6ZSB0aGUgbmF2aWdhdGlvbicsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCd1aUNvbmZpZycsIHsgbG9hZGVkOiBmYWxzZSB9KTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrUm91dGVyLmluaXRpYWxOYXZpZ2F0aW9uKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihjb25maWdMb2FkU3B5KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsb2dvdXQoKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4gY29tcG9uZW50VW5kZXJUZXN0LmxvZ291dCgpKTtcblxuICAgICAgaXQoJ1Nob3VsZCBjYWxsIGRlc3Ryb3koKSBvbiB0aGUgY3VycmVudFVzZXJTZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9ja0N1cnJlbnRVc2VyU2VydmljZS5kZXN0cm95KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBjYWxsIGRlc3Ryb3koKSBvbiB0aGUgYXV0aGVudGljYXRpb25TZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9ja0F1dGhlbnRpY2F0aW9uU2VydmljZS5kZXN0cm95KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZXdTZWFyY2hDb250ZXh0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIG1lcmdlIHRoZSBzZWFyY2hDb250ZXh0IHdpdGggYSBuZXcgcXVlcnkgYW5kIGdldCBhIG5ldyBmaWx0ZXIgdHJlZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5ld1NlYXJjaENvbnRleHQoJ2RvZ3MnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tTZWFyY2hDb250ZXh0Lm5ldykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAge1xuICAgICAgICAgICAgcTogJ2RvZ3MnLCBpOiAxLCBuOiAxMDAsIHNvcnRJZDogMjMsIGZpbHRlcklkczogJzE1MTcnLFxuICAgICAgICAgICAgZmlsdGVyVmFsdWVzOiAnMTUxNzoyMDE1LTEyLTEwIC0gMjAxNi0xMi0xMidcbiAgICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KG1vY2tGaWx0ZXIubG9hZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAge1xuICAgICAgICAgICAgcTogJ2RvZ3MnLCBpOiAxLCBuOiAxMDAsIHNvcnRJZDogMjMsIGZpbHRlcklkczogJzE1MTcnLFxuICAgICAgICAgICAgZmlsdGVyVmFsdWVzOiAnMTUxNzoyMDE1LTEyLTEwIC0gMjAxNi0xMi0xMidcbiAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hlYWRlckNvbmZpZyBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgcmlnaHQgcGFydCBvZiB0aGUgVWlDb25maWcgc3RvcmUgd2hlbiB0aGUgY29uZmlnIGlzIGxvYWRlZCcsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigndWlDb25maWcnLCB7IGxvYWRlZDogdHJ1ZSwgY29tcG9uZW50czogeyBoZWFkZXI6IHsgY29uZmlnOiB7IHNvbWU6ICdoZWFkZXInIH0gfSB9IH0pO1xuXG4gICAgICAgIGxldCBjb25maWc6IGFueTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmhlYWRlckNvbmZpZy50YWtlKDEpLnN1YnNjcmliZShjID0+IGNvbmZpZyA9IGMpO1xuICAgICAgICBleHBlY3QoY29uZmlnKS50b0VxdWFsKHsgc29tZTogJ2hlYWRlcicgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZWFyY2hCb3hDb25maWcgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIHJpZ2h0IHBhcnQgb2YgdGhlIFVpQ29uZmlnIHN0b3JlIHdoZW4gdGhlIGNvbmZpZyBpcyBsb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywgeyBsb2FkZWQ6IHRydWUsIGNvbXBvbmVudHM6IHsgc2VhcmNoQm94OiB7IGNvbmZpZzogeyBzb21lOiAnc2VhcmNoQm94JyB9IH0gfSB9KTtcblxuICAgICAgICBsZXQgY29uZmlnOiBhbnk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2hCb3hDb25maWcudGFrZSgxKS5zdWJzY3JpYmUoYyA9PiBjb25maWcgPSBjKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZykudG9FcXVhbCh7IHNvbWU6ICdzZWFyY2hCb3gnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGVhZGVySXNGaXhlZCBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBvYnNlcnZhYmxlIG9mIHRydWUgaWYgdGhlIGlzRml4ZWQgcHJvcGVydHkgb2YgdGhlIGhlYWRlckRpc3BsYXlPcHRpb25zIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2hlYWRlckRpc3BsYXlPcHRpb25zJywgeyBpc0ZpeGVkOiB0cnVlIH0pO1xuICAgICAgICBsZXQgaXNGaXhlZDogYm9vbGVhbjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmhlYWRlcklzRml4ZWQudGFrZSgxKS5zdWJzY3JpYmUoZml4ZWQgPT4gaXNGaXhlZCA9IGZpeGVkKTtcbiAgICAgICAgZXhwZWN0KGlzRml4ZWQpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gb2JzZXJ2YWJsZSBvZiBmYWxzZSBpZiB0aGUgaXNGaXhlZCBwcm9wZXJ0eSBvZiB0aGUgaGVhZGVyRGlzcGxheU9wdGlvbnMgaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2hlYWRlckRpc3BsYXlPcHRpb25zJywgeyBpc0ZpeGVkOiBmYWxzZSB9KTtcbiAgICAgICAgbGV0IGlzRml4ZWQ6IGJvb2xlYW47XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oZWFkZXJJc0ZpeGVkLnRha2UoMSkuc3Vic2NyaWJlKGZpeGVkID0+IGlzRml4ZWQgPSBmaXhlZCk7XG4gICAgICAgIGV4cGVjdChpc0ZpeGVkKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hlYWRlckNhbkJlRml4ZWQgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gb2JzZXJ2YWJsZSBvZiB0cnVlIGlmIHRoZSBjYW5CZUZpeGVkIHByb3BlcnR5IG9mIHRoZSBoZWFkZXJEaXNwbGF5T3B0aW9ucyBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdoZWFkZXJEaXNwbGF5T3B0aW9ucycsIHsgY2FuQmVGaXhlZDogdHJ1ZSB9KTtcbiAgICAgICAgbGV0IGNhbkJlRml4ZWQ6IGJvb2xlYW47XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5oZWFkZXJDYW5CZUZpeGVkLnRha2UoMSkuc3Vic2NyaWJlKGZpeGVkID0+IGNhbkJlRml4ZWQgPSBmaXhlZCk7XG4gICAgICAgIGV4cGVjdChjYW5CZUZpeGVkKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIG9ic2VydmFibGUgb2YgZmFsc2UgaWYgdGhlIGNhbkJlRml4ZWQgcHJvcGVydHkgb2YgdGhlIGhlYWRlckRpc3BsYXlPcHRpb25zIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdoZWFkZXJEaXNwbGF5T3B0aW9ucycsIHsgY2FuQmVGaXhlZDogZmFsc2UgfSk7XG4gICAgICAgIGxldCBjYW5CZUZpeGVkOiBib29sZWFuO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuaGVhZGVyQ2FuQmVGaXhlZC50YWtlKDEpLnN1YnNjcmliZShmaXhlZCA9PiBjYW5CZUZpeGVkID0gZml4ZWQpO1xuICAgICAgICBleHBlY3QoY2FuQmVGaXhlZCkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
