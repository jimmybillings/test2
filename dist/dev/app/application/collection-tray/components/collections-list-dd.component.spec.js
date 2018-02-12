"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_list_dd_component_1 = require("./collections-list-dd.component");
var Observable_1 = require("rxjs/Observable");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Collection List DD Component', function () {
        var componentUnderTest;
        var mockCollectionsService, mockCollectionContext, mockRouter, mockStore, activeCollectionSetSpy;
        beforeEach(function () {
            mockCollectionsService = {
                data: Observable_1.Observable.of({ items: [] }),
                load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of({}))
            };
            mockCollectionContext = {
                data: Observable_1.Observable.of({ some: 'options' }),
                updateCollectionOptions: jasmine.createSpy('updateCollectionOptions')
            };
            mockRouter = {
                url: '/collections/',
                navigate: function () { return true; }
            };
            mockStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new collections_list_dd_component_1.CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, mockStore);
        });
        describe('Check default variables', function () {
            it('editMode is defaulted to false', function () {
                expect(componentUnderTest.editMode).toEqual(false);
            });
            it('roleFilter defaults to include all roles', function () {
                expect(componentUnderTest.roleFilter).toEqual(['owner', 'editor', 'viewer']);
            });
            it('collectionFilterIsShowing defaults to false', function () {
                expect(componentUnderTest.collectionFilterIsShowing).toEqual(false);
            });
            it('collectionSortIsShowing defaults to false', function () {
                expect(componentUnderTest.collectionFilterIsShowing).toEqual(false);
            });
            it('collectionSearchIsShowing defaults to false', function () {
                expect(componentUnderTest.collectionFilterIsShowing).toEqual(false);
            });
        });
        describe('ngOnInit()', function () {
            it('Should load collections if the collections items array length is 0', function () {
                componentUnderTest.ngOnInit();
                expect(mockCollectionsService.load).toHaveBeenCalled();
            });
            it('Should not load collections if the collections items array length is greater than 0', function () {
                mockCollectionsService.data = Observable_1.Observable.of({ items: [1, 2, 3] });
                componentUnderTest = new collections_list_dd_component_1.CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, mockStore);
                componentUnderTest.ngOnInit();
                expect(mockCollectionsService.load).not.toHaveBeenCalled();
            });
            it('Assigns the collectionContext data subscription value to the options variable', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.options).toEqual({ some: 'options' });
            });
        });
        describe('closeCollectionsList()', function () {
            it('Should emit the close event with a collection', function () {
                spyOn(componentUnderTest.close, 'emit');
                componentUnderTest.closeCollectionsList({ some: 'collection' });
                expect(componentUnderTest.close.emit).toHaveBeenCalledWith({ some: 'collection' });
            });
            it('Should emit the close event without a collection', function () {
                spyOn(componentUnderTest.close, 'emit');
                componentUnderTest.closeCollectionsList();
                expect(componentUnderTest.close.emit).toHaveBeenCalledWith(undefined);
            });
        });
        describe('collectionList getter', function () {
            function collectionItems() {
                return [
                    { id: 1, userRole: 'editor' },
                    { id: 2, userRole: 'viewer' },
                    { id: 3, userRole: 'owner' },
                    { id: 4, userRole: 'owner' },
                    { id: 5, userRole: 'editor' },
                    { id: 6, userRole: 'viewer' }
                ];
            }
            ;
            beforeEach(function () {
                mockCollectionsService.data = Observable_1.Observable.of({ items: collectionItems() });
                componentUnderTest = new collections_list_dd_component_1.CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, null);
            });
            it('Should return all collections in the list if editMode and roleFilter are set to there default values', function () {
                var collectionList;
                componentUnderTest.collectionList.subscribe(function (list) { return collectionList = list; });
                expect(collectionList).toEqual(collectionItems());
            });
            it("Should return all collections in the list except the current focused \n      if editMode is true roleFilter is set to its default value", function () {
                componentUnderTest.focusedCollection = { id: 1 };
                componentUnderTest.editMode = true;
                var collectionList;
                componentUnderTest.collectionList.subscribe(function (list) { return collectionList = list; });
                expect(collectionList).toEqual([
                    { id: 2, userRole: 'viewer' },
                    { id: 3, userRole: 'owner' },
                    { id: 4, userRole: 'owner' },
                    { id: 5, userRole: 'editor' },
                    { id: 6, userRole: 'viewer' }
                ]);
            });
            it("Should return all collections in the list except any items with userRole properties not in \n      the roleFilter input array (in this case it should not return any items with the userRole as viewer)", function () {
                componentUnderTest.roleFilter = ['owner', 'editor'];
                var collectionList;
                componentUnderTest.collectionList.subscribe(function (list) { return collectionList = list; });
                expect(collectionList).toEqual([
                    { id: 1, userRole: 'editor' },
                    { id: 3, userRole: 'owner' },
                    { id: 4, userRole: 'owner' },
                    { id: 5, userRole: 'editor' },
                ]);
            });
            it("Should return all collections in the list except any items with userRole properties not \n      in the roleFilter input array (in this case it should not return any items with the userRole \n        as viewer), as well as the focused collection when edit mode is true", function () {
                componentUnderTest.roleFilter = ['owner', 'editor'];
                componentUnderTest.focusedCollection = { id: 1 };
                componentUnderTest.editMode = true;
                var collectionList;
                componentUnderTest.collectionList.subscribe(function (list) { return collectionList = list; });
                expect(collectionList).toEqual([
                    { id: 3, userRole: 'owner' },
                    { id: 4, userRole: 'owner' },
                    { id: 5, userRole: 'editor' },
                ]);
            });
        });
        describe('selectFocusedCollection()', function () {
            beforeEach(function () {
                spyOn(common_functions_1.Common, 'onCollectionShowPage').and.callThrough();
                spyOn(mockRouter, 'navigate');
                activeCollectionSetSpy = mockStore.createActionFactoryMethod('activeCollection', 'set');
                componentUnderTest = new collections_list_dd_component_1.CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, mockStore);
                spyOn(componentUnderTest.close, 'emit');
            });
            it('closes collection list with close event including the selected collection only if edit mode is true', function () {
                componentUnderTest.editMode = true;
                componentUnderTest.selectFocusedCollection({ id: 123 });
                expect(common_functions_1.Common.onCollectionShowPage).not.toHaveBeenCalled();
                expect(mockRouter.navigate).not.toHaveBeenCalled();
                expect(activeCollectionSetSpy).not.toHaveBeenCalled();
                expect(componentUnderTest.close.emit).toHaveBeenCalledWith({ id: 123 });
            });
            it("re-navigates to collection show if already on collection show to load new collection \n      and closes collection list with close event including the selected collection if edit mode is false", function () {
                componentUnderTest.editMode = false;
                componentUnderTest.selectFocusedCollection({ id: 123 });
                expect(activeCollectionSetSpy).not.toHaveBeenCalled();
                expect(common_functions_1.Common.onCollectionShowPage).toHaveBeenCalled();
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/collections/', 123, { i: 1, n: 100 }]);
                expect(componentUnderTest.close.emit).toHaveBeenCalledWith({ id: 123 });
            });
            it("sets to the new collection if not on the collection show page and closes collection \n      list with close event including the selected collection if edit mode is false", function () {
                mockRouter.url = 'notOnCollectionShowPage';
                componentUnderTest = new collections_list_dd_component_1.CollectionListDdComponent(mockRouter, mockCollectionsService, mockCollectionContext, mockStore);
                spyOn(componentUnderTest.close, 'emit');
                componentUnderTest.editMode = false;
                componentUnderTest.selectFocusedCollection({ id: 123 });
                expect(mockRouter.navigate).not.toHaveBeenCalled();
                expect(common_functions_1.Common.onCollectionShowPage).toHaveBeenCalled();
                expect(activeCollectionSetSpy).toHaveBeenCalledWith(123);
                expect(componentUnderTest.close.emit).toHaveBeenCalledWith({ id: 123 });
            });
        });
        describe('applyFilter()', function () {
            beforeEach(function () {
                componentUnderTest.collectionFilterIsShowing = true;
                componentUnderTest.applyFilter({ access: 'owner' });
            });
            it('updates the Collection context current filter', function () {
                expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentFilter: { access: 'owner' } });
            });
            it('loads collection on new filter', function () {
                expect(mockCollectionsService.load).toHaveBeenCalledWith('owner');
            });
            it('toggles the collectionFilterIsShowing boolean', function () {
                expect(componentUnderTest.collectionFilterIsShowing).toEqual(false);
            });
        });
        describe('applySort()', function () {
            beforeEach(function () {
                componentUnderTest.collectionSortIsShowing = true;
                componentUnderTest.applySort({ sort: 'date' });
            });
            it('updates the Collection context current filter', function () {
                expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentSort: { sort: 'date' } });
            });
            it('loads collection on new filter', function () {
                expect(mockCollectionsService.load).toHaveBeenCalledWith('date');
            });
            it('toggles the collectionFilterIsShowing boolean', function () {
                expect(componentUnderTest.collectionSortIsShowing).toEqual(false);
            });
        });
        describe('search()', function () {
            beforeEach(function () {
                componentUnderTest.search('oceans');
            });
            it('updates the Collection context current filter', function () {
                expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentSearchQuery: 'oceans' });
            });
            it('loads collection on new filter', function () {
                expect(mockCollectionsService.load).toHaveBeenCalledWith('oceans');
            });
        });
        describe('showCollectionSearch()', function () {
            it('toggles the collectionSearchIsShowing boolean value', function () {
                componentUnderTest.collectionSearchIsShowing = false;
                componentUnderTest.showCollectionSearch();
                expect(componentUnderTest.collectionSearchIsShowing).toBe(true);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29tcG9uZW50cy9jb2xsZWN0aW9ucy1saXN0LWRkLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUZBQTRFO0FBQzVFLDhDQUE2QztBQUM3QywrRUFBb0U7QUFDcEUsNkVBQTBFO0FBRTFFO0lBQ0UsUUFBUSxDQUFDLDhCQUE4QixFQUFFO1FBQ3ZDLElBQUksa0JBQTZDLENBQUM7UUFDbEQsSUFBSSxzQkFBMkIsRUFBRSxxQkFBMEIsRUFBRSxVQUFlLEVBQUUsU0FBYyxFQUFFLHNCQUFtQyxDQUFDO1FBQ2xJLFVBQVUsQ0FBQztZQUNULHNCQUFzQixHQUFHO2dCQUN2QixJQUFJLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkUsQ0FBQztZQUNGLHFCQUFxQixHQUFHO2dCQUN0QixJQUFJLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQ3hDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUM7YUFDdEUsQ0FBQztZQUNGLFVBQVUsR0FBRztnQkFDWCxHQUFHLEVBQUUsZUFBZTtnQkFDcEIsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTthQUNyQixDQUFDO1lBQ0YsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLGtCQUFrQixHQUFHLElBQUkseURBQXlCLENBQUMsVUFBVSxFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNILENBQUMsQ0FBQyxD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LENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXRQRCxvQkFzUEMiLCJmaWxlIjoiYXBwL2FwcGxpY2F0aW9uL2NvbGxlY3Rpb24tdHJheS9jb21wb25lbnRzL2NvbGxlY3Rpb25zLWxpc3QtZGQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xsZWN0aW9uTGlzdERkQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xsZWN0aW9ucy1saXN0LWRkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NvbGxlY3Rpb24gTGlzdCBERCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogQ29sbGVjdGlvbkxpc3REZENvbXBvbmVudDtcbiAgICBsZXQgbW9ja0NvbGxlY3Rpb25zU2VydmljZTogYW55LCBtb2NrQ29sbGVjdGlvbkNvbnRleHQ6IGFueSwgbW9ja1JvdXRlcjogYW55LCBtb2NrU3RvcmU6IGFueSwgYWN0aXZlQ29sbGVjdGlvblNldFNweTogamFzbWluZS5TcHk7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlID0ge1xuICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgaXRlbXM6IFtdIH0pLFxuICAgICAgICBsb2FkOiBqYXNtaW5lLmNyZWF0ZVNweSgnbG9hZCcpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHt9KSlcbiAgICAgIH07XG4gICAgICBtb2NrQ29sbGVjdGlvbkNvbnRleHQgPSB7XG4gICAgICAgIGRhdGE6IE9ic2VydmFibGUub2YoeyBzb21lOiAnb3B0aW9ucycgfSksXG4gICAgICAgIHVwZGF0ZUNvbGxlY3Rpb25PcHRpb25zOiBqYXNtaW5lLmNyZWF0ZVNweSgndXBkYXRlQ29sbGVjdGlvbk9wdGlvbnMnKVxuICAgICAgfTtcbiAgICAgIG1vY2tSb3V0ZXIgPSB7XG4gICAgICAgIHVybDogJy9jb2xsZWN0aW9ucy8nLFxuICAgICAgICBuYXZpZ2F0ZTogKCkgPT4gdHJ1ZVxuICAgICAgfTtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDb2xsZWN0aW9uTGlzdERkQ29tcG9uZW50KG1vY2tSb3V0ZXIsIG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UsIG1vY2tDb2xsZWN0aW9uQ29udGV4dCwgbW9ja1N0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdDaGVjayBkZWZhdWx0IHZhcmlhYmxlcycsICgpID0+IHtcbiAgICAgIGl0KCdlZGl0TW9kZSBpcyBkZWZhdWx0ZWQgdG8gZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZWRpdE1vZGUpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyb2xlRmlsdGVyIGRlZmF1bHRzIHRvIGluY2x1ZGUgYWxsIHJvbGVzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnJvbGVGaWx0ZXIpLnRvRXF1YWwoWydvd25lcicsICdlZGl0b3InLCAndmlld2VyJ10pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjb2xsZWN0aW9uRmlsdGVySXNTaG93aW5nIGRlZmF1bHRzIHRvIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25GaWx0ZXJJc1Nob3dpbmcpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjb2xsZWN0aW9uU29ydElzU2hvd2luZyBkZWZhdWx0cyB0byBmYWxzZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uRmlsdGVySXNTaG93aW5nKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY29sbGVjdGlvblNlYXJjaElzU2hvd2luZyBkZWZhdWx0cyB0byBmYWxzZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uRmlsdGVySXNTaG93aW5nKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25nT25Jbml0KCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGxvYWQgY29sbGVjdGlvbnMgaWYgdGhlIGNvbGxlY3Rpb25zIGl0ZW1zIGFycmF5IGxlbmd0aCBpcyAwJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgZXhwZWN0KG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UubG9hZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgbm90IGxvYWQgY29sbGVjdGlvbnMgaWYgdGhlIGNvbGxlY3Rpb25zIGl0ZW1zIGFycmF5IGxlbmd0aCBpcyBncmVhdGVyIHRoYW4gMCcsICgpID0+IHtcbiAgICAgICAgbW9ja0NvbGxlY3Rpb25zU2VydmljZS5kYXRhID0gT2JzZXJ2YWJsZS5vZih7IGl0ZW1zOiBbMSwgMiwgM10gfSk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDb2xsZWN0aW9uTGlzdERkQ29tcG9uZW50KG1vY2tSb3V0ZXIsIG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UsIG1vY2tDb2xsZWN0aW9uQ29udGV4dCwgbW9ja1N0b3JlKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLmxvYWQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ0Fzc2lnbnMgdGhlIGNvbGxlY3Rpb25Db250ZXh0IGRhdGEgc3Vic2NyaXB0aW9uIHZhbHVlIHRvIHRoZSBvcHRpb25zIHZhcmlhYmxlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vcHRpb25zKS50b0VxdWFsKHsgc29tZTogJ29wdGlvbnMnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2xvc2VDb2xsZWN0aW9uc0xpc3QoKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgZW1pdCB0aGUgY2xvc2UgZXZlbnQgd2l0aCBhIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC5jbG9zZSwgJ2VtaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNsb3NlQ29sbGVjdGlvbnNMaXN0KHsgc29tZTogJ2NvbGxlY3Rpb24nIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jbG9zZS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHNvbWU6ICdjb2xsZWN0aW9uJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGVtaXQgdGhlIGNsb3NlIGV2ZW50IHdpdGhvdXQgYSBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuY2xvc2UsICdlbWl0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jbG9zZUNvbGxlY3Rpb25zTGlzdCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNsb3NlLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb2xsZWN0aW9uTGlzdCBnZXR0ZXInLCAoKSA9PiB7XG4gICAgICBmdW5jdGlvbiBjb2xsZWN0aW9uSXRlbXMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgeyBpZDogMSwgdXNlclJvbGU6ICdlZGl0b3InIH0sXG4gICAgICAgICAgeyBpZDogMiwgdXNlclJvbGU6ICd2aWV3ZXInIH0sXG4gICAgICAgICAgeyBpZDogMywgdXNlclJvbGU6ICdvd25lcicgfSxcbiAgICAgICAgICB7IGlkOiA0LCB1c2VyUm9sZTogJ293bmVyJyB9LFxuICAgICAgICAgIHsgaWQ6IDUsIHVzZXJSb2xlOiAnZWRpdG9yJyB9LFxuICAgICAgICAgIHsgaWQ6IDYsIHVzZXJSb2xlOiAndmlld2VyJyB9XG4gICAgICAgIF07XG4gICAgICB9O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0NvbGxlY3Rpb25zU2VydmljZS5kYXRhID0gT2JzZXJ2YWJsZS5vZih7IGl0ZW1zOiBjb2xsZWN0aW9uSXRlbXMoKSB9KTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENvbGxlY3Rpb25MaXN0RGRDb21wb25lbnQobW9ja1JvdXRlciwgbW9ja0NvbGxlY3Rpb25zU2VydmljZSwgbW9ja0NvbGxlY3Rpb25Db250ZXh0LCBudWxsKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIHJldHVybiBhbGwgY29sbGVjdGlvbnMgaW4gdGhlIGxpc3QgaWYgZWRpdE1vZGUgYW5kIHJvbGVGaWx0ZXIgYXJlIHNldCB0byB0aGVyZSBkZWZhdWx0IHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgbGV0IGNvbGxlY3Rpb25MaXN0OiBhbnk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uTGlzdC5zdWJzY3JpYmUobGlzdCA9PiBjb2xsZWN0aW9uTGlzdCA9IGxpc3QpO1xuICAgICAgICBleHBlY3QoY29sbGVjdGlvbkxpc3QpLnRvRXF1YWwoY29sbGVjdGlvbkl0ZW1zKCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KGBTaG91bGQgcmV0dXJuIGFsbCBjb2xsZWN0aW9ucyBpbiB0aGUgbGlzdCBleGNlcHQgdGhlIGN1cnJlbnQgZm9jdXNlZCBcbiAgICAgIGlmIGVkaXRNb2RlIGlzIHRydWUgcm9sZUZpbHRlciBpcyBzZXQgdG8gaXRzIGRlZmF1bHQgdmFsdWVgLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZvY3VzZWRDb2xsZWN0aW9uID0geyBpZDogMSB9IGFzIGFueTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgICAgIGxldCBjb2xsZWN0aW9uTGlzdDogYW55O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uTGlzdC5zdWJzY3JpYmUobGlzdCA9PiBjb2xsZWN0aW9uTGlzdCA9IGxpc3QpO1xuICAgICAgICAgIGV4cGVjdChjb2xsZWN0aW9uTGlzdCkudG9FcXVhbChbXG4gICAgICAgICAgICB7IGlkOiAyLCB1c2VyUm9sZTogJ3ZpZXdlcicgfSxcbiAgICAgICAgICAgIHsgaWQ6IDMsIHVzZXJSb2xlOiAnb3duZXInIH0sXG4gICAgICAgICAgICB7IGlkOiA0LCB1c2VyUm9sZTogJ293bmVyJyB9LFxuICAgICAgICAgICAgeyBpZDogNSwgdXNlclJvbGU6ICdlZGl0b3InIH0sXG4gICAgICAgICAgICB7IGlkOiA2LCB1c2VyUm9sZTogJ3ZpZXdlcicgfVxuICAgICAgICAgIF0pO1xuICAgICAgICB9KTtcblxuICAgICAgaXQoYFNob3VsZCByZXR1cm4gYWxsIGNvbGxlY3Rpb25zIGluIHRoZSBsaXN0IGV4Y2VwdCBhbnkgaXRlbXMgd2l0aCB1c2VyUm9sZSBwcm9wZXJ0aWVzIG5vdCBpbiBcbiAgICAgIHRoZSByb2xlRmlsdGVyIGlucHV0IGFycmF5IChpbiB0aGlzIGNhc2UgaXQgc2hvdWxkIG5vdCByZXR1cm4gYW55IGl0ZW1zIHdpdGggdGhlIHVzZXJSb2xlIGFzIHZpZXdlcilgLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnJvbGVGaWx0ZXIgPSBbJ293bmVyJywgJ2VkaXRvciddO1xuICAgICAgICAgIGxldCBjb2xsZWN0aW9uTGlzdDogYW55O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uTGlzdC5zdWJzY3JpYmUobGlzdCA9PiBjb2xsZWN0aW9uTGlzdCA9IGxpc3QpO1xuICAgICAgICAgIGV4cGVjdChjb2xsZWN0aW9uTGlzdCkudG9FcXVhbChbXG4gICAgICAgICAgICB7IGlkOiAxLCB1c2VyUm9sZTogJ2VkaXRvcicgfSxcbiAgICAgICAgICAgIHsgaWQ6IDMsIHVzZXJSb2xlOiAnb3duZXInIH0sXG4gICAgICAgICAgICB7IGlkOiA0LCB1c2VyUm9sZTogJ293bmVyJyB9LFxuICAgICAgICAgICAgeyBpZDogNSwgdXNlclJvbGU6ICdlZGl0b3InIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBpdChgU2hvdWxkIHJldHVybiBhbGwgY29sbGVjdGlvbnMgaW4gdGhlIGxpc3QgZXhjZXB0IGFueSBpdGVtcyB3aXRoIHVzZXJSb2xlIHByb3BlcnRpZXMgbm90IFxuICAgICAgaW4gdGhlIHJvbGVGaWx0ZXIgaW5wdXQgYXJyYXkgKGluIHRoaXMgY2FzZSBpdCBzaG91bGQgbm90IHJldHVybiBhbnkgaXRlbXMgd2l0aCB0aGUgdXNlclJvbGUgXG4gICAgICAgIGFzIHZpZXdlciksIGFzIHdlbGwgYXMgdGhlIGZvY3VzZWQgY29sbGVjdGlvbiB3aGVuIGVkaXQgbW9kZSBpcyB0cnVlYCwgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5yb2xlRmlsdGVyID0gWydvd25lcicsICdlZGl0b3InXTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZm9jdXNlZENvbGxlY3Rpb24gPSB7IGlkOiAxIH0gYXMgYW55O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgbGV0IGNvbGxlY3Rpb25MaXN0OiBhbnk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25MaXN0LnN1YnNjcmliZShsaXN0ID0+IGNvbGxlY3Rpb25MaXN0ID0gbGlzdCk7XG4gICAgICAgICAgZXhwZWN0KGNvbGxlY3Rpb25MaXN0KS50b0VxdWFsKFtcbiAgICAgICAgICAgIHsgaWQ6IDMsIHVzZXJSb2xlOiAnb3duZXInIH0sXG4gICAgICAgICAgICB7IGlkOiA0LCB1c2VyUm9sZTogJ293bmVyJyB9LFxuICAgICAgICAgICAgeyBpZDogNSwgdXNlclJvbGU6ICdlZGl0b3InIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NlbGVjdEZvY3VzZWRDb2xsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgc3B5T24oQ29tbW9uLCAnb25Db2xsZWN0aW9uU2hvd1BhZ2UnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgc3B5T24obW9ja1JvdXRlciwgJ25hdmlnYXRlJyk7XG4gICAgICAgIGFjdGl2ZUNvbGxlY3Rpb25TZXRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnYWN0aXZlQ29sbGVjdGlvbicsICdzZXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENvbGxlY3Rpb25MaXN0RGRDb21wb25lbnQobW9ja1JvdXRlciwgbW9ja0NvbGxlY3Rpb25zU2VydmljZSwgbW9ja0NvbGxlY3Rpb25Db250ZXh0LCBtb2NrU3RvcmUpO1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuY2xvc2UsICdlbWl0Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Nsb3NlcyBjb2xsZWN0aW9uIGxpc3Qgd2l0aCBjbG9zZSBldmVudCBpbmNsdWRpbmcgdGhlIHNlbGVjdGVkIGNvbGxlY3Rpb24gb25seSBpZiBlZGl0IG1vZGUgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVkaXRNb2RlID0gdHJ1ZTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdEZvY3VzZWRDb2xsZWN0aW9uKHsgaWQ6IDEyMyB9IGFzIGFueSk7XG4gICAgICAgIGV4cGVjdChDb21tb24ub25Db2xsZWN0aW9uU2hvd1BhZ2UpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChtb2NrUm91dGVyLm5hdmlnYXRlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoYWN0aXZlQ29sbGVjdGlvblNldFNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jbG9zZS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGlkOiAxMjMgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoYHJlLW5hdmlnYXRlcyB0byBjb2xsZWN0aW9uIHNob3cgaWYgYWxyZWFkeSBvbiBjb2xsZWN0aW9uIHNob3cgdG8gbG9hZCBuZXcgY29sbGVjdGlvbiBcbiAgICAgIGFuZCBjbG9zZXMgY29sbGVjdGlvbiBsaXN0IHdpdGggY2xvc2UgZXZlbnQgaW5jbHVkaW5nIHRoZSBzZWxlY3RlZCBjb2xsZWN0aW9uIGlmIGVkaXQgbW9kZSBpcyBmYWxzZWAsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0Rm9jdXNlZENvbGxlY3Rpb24oeyBpZDogMTIzIH0gYXMgYW55KTtcbiAgICAgICAgICBleHBlY3QoYWN0aXZlQ29sbGVjdGlvblNldFNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBleHBlY3QoQ29tbW9uLm9uQ29sbGVjdGlvblNob3dQYWdlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnL2NvbGxlY3Rpb25zLycsIDEyMywgeyBpOiAxLCBuOiAxMDAgfV0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2xvc2UuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBpZDogMTIzIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgaXQoYHNldHMgdG8gdGhlIG5ldyBjb2xsZWN0aW9uIGlmIG5vdCBvbiB0aGUgY29sbGVjdGlvbiBzaG93IHBhZ2UgYW5kIGNsb3NlcyBjb2xsZWN0aW9uIFxuICAgICAgbGlzdCB3aXRoIGNsb3NlIGV2ZW50IGluY2x1ZGluZyB0aGUgc2VsZWN0ZWQgY29sbGVjdGlvbiBpZiBlZGl0IG1vZGUgaXMgZmFsc2VgLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1JvdXRlci51cmwgPSAnbm90T25Db2xsZWN0aW9uU2hvd1BhZ2UnO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDb2xsZWN0aW9uTGlzdERkQ29tcG9uZW50KG1vY2tSb3V0ZXIsIG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UsIG1vY2tDb2xsZWN0aW9uQ29udGV4dCwgbW9ja1N0b3JlKTtcbiAgICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QuY2xvc2UsICdlbWl0Jyk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdEZvY3VzZWRDb2xsZWN0aW9uKHsgaWQ6IDEyMyB9IGFzIGFueSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgZXhwZWN0KENvbW1vbi5vbkNvbGxlY3Rpb25TaG93UGFnZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIGV4cGVjdChhY3RpdmVDb2xsZWN0aW9uU2V0U3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgxMjMpO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2xvc2UuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBpZDogMTIzIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhcHBseUZpbHRlcigpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uRmlsdGVySXNTaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFwcGx5RmlsdGVyKHsgYWNjZXNzOiAnb3duZXInIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd1cGRhdGVzIHRoZSBDb2xsZWN0aW9uIGNvbnRleHQgY3VycmVudCBmaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbkNvbnRleHQudXBkYXRlQ29sbGVjdGlvbk9wdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgY3VycmVudEZpbHRlcjogeyBhY2Nlc3M6ICdvd25lcicgfSB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnbG9hZHMgY29sbGVjdGlvbiBvbiBuZXcgZmlsdGVyJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25zU2VydmljZS5sb2FkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnb3duZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndG9nZ2xlcyB0aGUgY29sbGVjdGlvbkZpbHRlcklzU2hvd2luZyBib29sZWFuJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25GaWx0ZXJJc1Nob3dpbmcpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYXBwbHlTb3J0KCknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25Tb3J0SXNTaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFwcGx5U29ydCh7IHNvcnQ6ICdkYXRlJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndXBkYXRlcyB0aGUgQ29sbGVjdGlvbiBjb250ZXh0IGN1cnJlbnQgZmlsdGVyJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25Db250ZXh0LnVwZGF0ZUNvbGxlY3Rpb25PcHRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGN1cnJlbnRTb3J0OiB7IHNvcnQ6ICdkYXRlJyB9IH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdsb2FkcyBjb2xsZWN0aW9uIG9uIG5ldyBmaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLmxvYWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdkYXRlJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3RvZ2dsZXMgdGhlIGNvbGxlY3Rpb25GaWx0ZXJJc1Nob3dpbmcgYm9vbGVhbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uU29ydElzU2hvd2luZykudG9FcXVhbChmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZWFyY2goKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VhcmNoKCdvY2VhbnMnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndXBkYXRlcyB0aGUgQ29sbGVjdGlvbiBjb250ZXh0IGN1cnJlbnQgZmlsdGVyJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25Db250ZXh0LnVwZGF0ZUNvbGxlY3Rpb25PcHRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGN1cnJlbnRTZWFyY2hRdWVyeTogJ29jZWFucycgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2xvYWRzIGNvbGxlY3Rpb24gb24gbmV3IGZpbHRlcicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UubG9hZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ29jZWFucycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0NvbGxlY3Rpb25TZWFyY2goKScsICgpID0+IHtcbiAgICAgIGl0KCd0b2dnbGVzIHRoZSBjb2xsZWN0aW9uU2VhcmNoSXNTaG93aW5nIGJvb2xlYW4gdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb2xsZWN0aW9uU2VhcmNoSXNTaG93aW5nID0gZmFsc2U7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93Q29sbGVjdGlvblNlYXJjaCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25TZWFyY2hJc1Nob3dpbmcpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICB9KTtcbn1cbiJdfQ==
