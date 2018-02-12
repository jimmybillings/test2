"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wz_autocomplete_search_component_1 = require("./wz-autocomplete-search.component");
var forms_1 = require("@angular/forms");
var mock_app_store_1 = require("../../../../../store/spec-helpers/mock-app.store");
function main() {
    var mockStore;
    describe('Wz autocomplete component', function () {
        var HTMLElements = {};
        document.querySelector = jasmine.createSpy('HTML Element').and.callFake(function (ID) {
            if (!HTMLElements[ID]) {
                var newElement = document.createElement('button');
                HTMLElements[ID] = newElement;
            }
            return HTMLElements[ID];
        });
        var componentUnderTest;
        var fb = new forms_1.FormBuilder();
        var wzInputSuggestions = {
            destroySubscription: jasmine.createSpy('destroySubscription'),
            suggestionChangeListener: jasmine.createSpy('suggestionChangeListener')
        };
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new wz_autocomplete_search_component_1.WzAutocompleteSearchComponent(fb, mockStore);
            componentUnderTest.wzInputSuggestions = wzInputSuggestions;
            spyOn(componentUnderTest.searchContext, 'emit');
            spyOn(componentUnderTest.toggleFilterTree, 'emit');
        });
        describe('Creates form', function () {
            it('Creates the correct form control', function () {
                expect(Object.keys(componentUnderTest.searchForm.controls)).toEqual(['query']);
            });
            it('Makes input a required field', function () {
                expect(componentUnderTest.searchForm.controls['query'].errors).toEqual({ 'required': true });
            });
        });
        describe('Filter Tree controls', function () {
            it('toggle filters show and hide', function () {
                componentUnderTest.toggleFilters();
                expect(componentUnderTest.toggleFilterTree.emit).toHaveBeenCalled();
            });
        });
        describe('Submits a new search', function () {
            it('Emits a new search context without quotes', function () {
                componentUnderTest.onSubmit('dog');
                expect(componentUnderTest.searchContext.emit).toHaveBeenCalledWith('dog');
            });
            it('Emits a new search context with quotes', function () {
                componentUnderTest.onSubmit('dog', true);
                expect(componentUnderTest.searchContext.emit).toHaveBeenCalledWith('\"dog\"');
            });
            it('Uses the search form value for the search if no value is passed in', function () {
                componentUnderTest.onSubmit();
                expect(componentUnderTest.searchContext.emit).toHaveBeenCalledWith(componentUnderTest.searchForm.value.query);
            });
        });
        describe('Updates searchbox value when the url changes', function () {
            it('Adds a value to the search box if on a search page with a keyword in the url', function () {
                componentUnderTest.searchForm.controls['query'].setValue('cat');
                componentUnderTest.state = '/search;q=dog;i=1;n=100;sortId=3';
                expect(componentUnderTest.searchForm.controls['query'].value).toEqual('dog');
            });
            it('Account for parameters with keys and no values', function () {
                componentUnderTest.searchForm.controls['query'].setValue('cat');
                componentUnderTest.state = '/search;q=;i=1;n=100;sortId=3';
                expect(componentUnderTest.searchForm.controls['query'].value).toEqual('');
            });
            it('Does nothing if there are no search params', function () {
                componentUnderTest.searchForm.controls['query'].setValue('cat');
                componentUnderTest.state = '/search';
                expect(componentUnderTest.searchForm.controls['query'].value).toEqual('cat');
            });
            it('Does nothing if the query param is already the same as the search box value', function () {
                componentUnderTest.searchForm.controls['query'].setValue('cat');
                componentUnderTest.state = '/search;q=cat;i=1;n=100;sortId=3';
                expect(componentUnderTest.searchForm.controls['query'].value).toEqual('cat');
            });
        });
        describe('filtersAreAvailable', function () {
            it('returns observable of true when the \'filtersAreAvailable\'in the store is true', function () {
                mockStore.createStateSection('headerDisplayOptions', { filtersAreAvailable: true });
                var areAvailable;
                componentUnderTest.filtersAreAvailable.take(1).subscribe(function (available) { return areAvailable = available; });
                expect(areAvailable).toBe(true);
            });
            it('returns observable of false when the \'filtersAreAvailable\'in the store is false', function () {
                mockStore.createStateSection('headerDisplayOptions', { filtersAreAvailable: false });
                var areAvailable;
                componentUnderTest.filtersAreAvailable.take(1).subscribe(function (available) { return areAvailable = available; });
                expect(areAvailable).toBe(false);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otYXV0b2NvbXBsZXRlLXNlYXJjaC93ei1hdXRvY29tcGxldGUtc2VhcmNoLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUZBQW1GO0FBQ25GLHdDQUE2QztBQUU3QyxtRkFBZ0Y7QUFFaEY7SUFDRSxJQUFJLFNBQXVCLENBQUM7SUFFNUIsUUFBUSxDQUFDLDJCQUEyQixFQUFFO1FBQ3BDLElBQUksWUFBWSxHQUFRLEVBQUUsQ0FBQztRQUMzQixRQUFRLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQU87WUFDdkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLENBQUM7WUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxrQkFBaUQsQ0FBQztRQUN0RCxJQUFJLEVBQUUsR0FBZ0IsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDeEMsSUFBSSxrQkFBa0IsR0FBUTtZQUM1QixtQkFBbUIsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDO1lBQzdELHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUM7U0FDeEUsQ0FBQztRQUVGLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixrQkFBa0IsR0FBRyxJQUFJLGdFQUE2QixDQUFDLEVBQUUsRUFBRSxTQUFT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Q0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLFlBQVksR0FBRyxTQUFTLEVBQXhCLENBQXdCLENBQUMsQ0FBQztnQkFDaEcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxtRkFBbUYsRUFBRTtnQkFDdEYsU0FBUyxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixFQUFFLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDckYsSUFBSSxZQUFxQixDQUFDO2dCQUMxQixrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsWUFBWSxHQUFHLFNBQVMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO2dCQUNoRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUExR0Qsb0JBMEdDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS9jb21wb25lbnRzL3d6LWF1dG9jb21wbGV0ZS1zZWFyY2gvd3otYXV0b2NvbXBsZXRlLXNlYXJjaC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFd6QXV0b2NvbXBsZXRlU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi93ei1hdXRvY29tcGxldGUtc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcblxuICBkZXNjcmliZSgnV3ogYXV0b2NvbXBsZXRlIGNvbXBvbmVudCcsICgpID0+IHtcbiAgICB2YXIgSFRNTEVsZW1lbnRzOiBhbnkgPSB7fTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yID0gamFzbWluZS5jcmVhdGVTcHkoJ0hUTUwgRWxlbWVudCcpLmFuZC5jYWxsRmFrZShmdW5jdGlvbiAoSUQ6IGFueSkge1xuICAgICAgaWYgKCFIVE1MRWxlbWVudHNbSURdKSB7XG4gICAgICAgIHZhciBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIEhUTUxFbGVtZW50c1tJRF0gPSBuZXdFbGVtZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIEhUTUxFbGVtZW50c1tJRF07XG4gICAgfSk7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogV3pBdXRvY29tcGxldGVTZWFyY2hDb21wb25lbnQ7XG4gICAgbGV0IGZiOiBGb3JtQnVpbGRlciA9IG5ldyBGb3JtQnVpbGRlcigpO1xuICAgIGxldCB3eklucHV0U3VnZ2VzdGlvbnM6IGFueSA9IHtcbiAgICAgIGRlc3Ryb3lTdWJzY3JpcHRpb246IGphc21pbmUuY3JlYXRlU3B5KCdkZXN0cm95U3Vic2NyaXB0aW9uJyksXG4gICAgICBzdWdnZXN0aW9uQ2hhbmdlTGlzdGVuZXI6IGphc21pbmUuY3JlYXRlU3B5KCdzdWdnZXN0aW9uQ2hhbmdlTGlzdGVuZXInKVxuICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBXekF1dG9jb21wbGV0ZVNlYXJjaENvbXBvbmVudChmYiwgbW9ja1N0b3JlKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC53eklucHV0U3VnZ2VzdGlvbnMgPSB3eklucHV0U3VnZ2VzdGlvbnM7XG4gICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3Quc2VhcmNoQ29udGV4dCwgJ2VtaXQnKTtcbiAgICAgIHNweU9uKGNvbXBvbmVudFVuZGVyVGVzdC50b2dnbGVGaWx0ZXJUcmVlLCAnZW1pdCcpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0NyZWF0ZXMgZm9ybScsICgpID0+IHtcbiAgICAgIGl0KCdDcmVhdGVzIHRoZSBjb3JyZWN0IGZvcm0gY29udHJvbCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KE9iamVjdC5rZXlzKGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2hGb3JtLmNvbnRyb2xzKSkudG9FcXVhbChbJ3F1ZXJ5J10pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdNYWtlcyBpbnB1dCBhIHJlcXVpcmVkIGZpZWxkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlYXJjaEZvcm0uY29udHJvbHNbJ3F1ZXJ5J10uZXJyb3JzKS50b0VxdWFsKHsgJ3JlcXVpcmVkJzogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnRmlsdGVyIFRyZWUgY29udHJvbHMnLCAoKSA9PiB7XG4gICAgICBpdCgndG9nZ2xlIGZpbHRlcnMgc2hvdyBhbmQgaGlkZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUZpbHRlcnMoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50b2dnbGVGaWx0ZXJUcmVlLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1N1Ym1pdHMgYSBuZXcgc2VhcmNoJywgKCkgPT4ge1xuICAgICAgaXQoJ0VtaXRzIGEgbmV3IHNlYXJjaCBjb250ZXh0IHdpdGhvdXQgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQoJ2RvZycpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlYXJjaENvbnRleHQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2RvZycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdFbWl0cyBhIG5ldyBzZWFyY2ggY29udGV4dCB3aXRoIHF1b3RlcycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KCdkb2cnLCB0cnVlKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2hDb250ZXh0LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdcXFwiZG9nXFxcIicpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdVc2VzIHRoZSBzZWFyY2ggZm9ybSB2YWx1ZSBmb3IgdGhlIHNlYXJjaCBpZiBubyB2YWx1ZSBpcyBwYXNzZWQgaW4nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblN1Ym1pdCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlYXJjaENvbnRleHQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29tcG9uZW50VW5kZXJUZXN0LnNlYXJjaEZvcm0udmFsdWUucXVlcnkpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdVcGRhdGVzIHNlYXJjaGJveCB2YWx1ZSB3aGVuIHRoZSB1cmwgY2hhbmdlcycsICgpID0+IHtcbiAgICAgIGl0KCdBZGRzIGEgdmFsdWUgdG8gdGhlIHNlYXJjaCBib3ggaWYgb24gYSBzZWFyY2ggcGFnZSB3aXRoIGEga2V5d29yZCBpbiB0aGUgdXJsJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VhcmNoRm9ybS5jb250cm9sc1sncXVlcnknXS5zZXRWYWx1ZSgnY2F0Jyk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zdGF0ZSA9ICcvc2VhcmNoO3E9ZG9nO2k9MTtuPTEwMDtzb3J0SWQ9Myc7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2VhcmNoRm9ybS5jb250cm9sc1sncXVlcnknXS52YWx1ZSkudG9FcXVhbCgnZG9nJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ0FjY291bnQgZm9yIHBhcmFtZXRlcnMgd2l0aCBrZXlzIGFuZCBubyB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2hGb3JtLmNvbnRyb2xzWydxdWVyeSddLnNldFZhbHVlKCdjYXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnN0YXRlID0gJy9zZWFyY2g7cT07aT0xO249MTAwO3NvcnRJZD0zJztcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2hGb3JtLmNvbnRyb2xzWydxdWVyeSddLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIGl0KCdEb2VzIG5vdGhpbmcgaWYgdGhlcmUgYXJlIG5vIHNlYXJjaCBwYXJhbXMnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2hGb3JtLmNvbnRyb2xzWydxdWVyeSddLnNldFZhbHVlKCdjYXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnN0YXRlID0gJy9zZWFyY2gnO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlYXJjaEZvcm0uY29udHJvbHNbJ3F1ZXJ5J10udmFsdWUpLnRvRXF1YWwoJ2NhdCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdEb2VzIG5vdGhpbmcgaWYgdGhlIHF1ZXJ5IHBhcmFtIGlzIGFscmVhZHkgdGhlIHNhbWUgYXMgdGhlIHNlYXJjaCBib3ggdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2hGb3JtLmNvbnRyb2xzWydxdWVyeSddLnNldFZhbHVlKCdjYXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnN0YXRlID0gJy9zZWFyY2g7cT1jYXQ7aT0xO249MTAwO3NvcnRJZD0zJztcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2hGb3JtLmNvbnRyb2xzWydxdWVyeSddLnZhbHVlKS50b0VxdWFsKCdjYXQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2ZpbHRlcnNBcmVBdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyBvYnNlcnZhYmxlIG9mIHRydWUgd2hlbiB0aGUgXFwnZmlsdGVyc0FyZUF2YWlsYWJsZVxcJ2luIHRoZSBzdG9yZSBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdoZWFkZXJEaXNwbGF5T3B0aW9ucycsIHsgZmlsdGVyc0FyZUF2YWlsYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgbGV0IGFyZUF2YWlsYWJsZTogYm9vbGVhbjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmZpbHRlcnNBcmVBdmFpbGFibGUudGFrZSgxKS5zdWJzY3JpYmUoYXZhaWxhYmxlID0+IGFyZUF2YWlsYWJsZSA9IGF2YWlsYWJsZSk7XG4gICAgICAgIGV4cGVjdChhcmVBdmFpbGFibGUpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgb2JzZXJ2YWJsZSBvZiBmYWxzZSB3aGVuIHRoZSBcXCdmaWx0ZXJzQXJlQXZhaWxhYmxlXFwnaW4gdGhlIHN0b3JlIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdoZWFkZXJEaXNwbGF5T3B0aW9ucycsIHsgZmlsdGVyc0FyZUF2YWlsYWJsZTogZmFsc2UgfSk7XG4gICAgICAgIGxldCBhcmVBdmFpbGFibGU6IGJvb2xlYW47XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5maWx0ZXJzQXJlQXZhaWxhYmxlLnRha2UoMSkuc3Vic2NyaWJlKGF2YWlsYWJsZSA9PiBhcmVBdmFpbGFibGUgPSBhdmFpbGFibGUpO1xuICAgICAgICBleHBlY3QoYXJlQXZhaWxhYmxlKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbiJdfQ==
