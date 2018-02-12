import { WzAutocompleteSearchComponent } from './wz-autocomplete-search.component';
import { FormBuilder } from '@angular/forms';

import { MockAppStore } from '../../../../../store/spec-helpers/mock-app.store';

export function main() {
  let mockStore: MockAppStore;

  describe('Wz autocomplete component', () => {
    var HTMLElements: any = {};
    document.querySelector = jasmine.createSpy('HTML Element').and.callFake(function (ID: any) {
      if (!HTMLElements[ID]) {
        var newElement = document.createElement('button');
        HTMLElements[ID] = newElement;
      }
      return HTMLElements[ID];
    });
    let componentUnderTest: WzAutocompleteSearchComponent;
    let fb: FormBuilder = new FormBuilder();
    let wzInputSuggestions: any = {
      destroySubscription: jasmine.createSpy('destroySubscription'),
      suggestionChangeListener: jasmine.createSpy('suggestionChangeListener')
    };

    beforeEach(() => {
      mockStore = new MockAppStore();
      componentUnderTest = new WzAutocompleteSearchComponent(fb, mockStore);
      componentUnderTest.wzInputSuggestions = wzInputSuggestions;
      spyOn(componentUnderTest.searchContext, 'emit');
      spyOn(componentUnderTest.toggleFilterTree, 'emit');
    });

    describe('Creates form', () => {
      it('Creates the correct form control', () => {
        expect(Object.keys(componentUnderTest.searchForm.controls)).toEqual(['query']);
      });

      it('Makes input a required field', () => {
        expect(componentUnderTest.searchForm.controls['query'].errors).toEqual({ 'required': true });
      });

    });

    describe('Filter Tree controls', () => {
      it('toggle filters show and hide', () => {
        componentUnderTest.toggleFilters();
        expect(componentUnderTest.toggleFilterTree.emit).toHaveBeenCalled();
      });
    });

    describe('Submits a new search', () => {
      it('Emits a new search context without quotes', () => {
        componentUnderTest.onSubmit('dog');
        expect(componentUnderTest.searchContext.emit).toHaveBeenCalledWith('dog');
      });

      it('Emits a new search context with quotes', () => {
        componentUnderTest.onSubmit('dog', true);
        expect(componentUnderTest.searchContext.emit).toHaveBeenCalledWith('\"dog\"');
      });

      it('Uses the search form value for the search if no value is passed in', () => {
        componentUnderTest.onSubmit();
        expect(componentUnderTest.searchContext.emit).toHaveBeenCalledWith(componentUnderTest.searchForm.value.query);
      });

    });

    describe('Updates searchbox value when the url changes', () => {
      it('Adds a value to the search box if on a search page with a keyword in the url', () => {
        componentUnderTest.searchForm.controls['query'].setValue('cat');
        componentUnderTest.state = '/search;q=dog;i=1;n=100;sortId=3';
        expect(componentUnderTest.searchForm.controls['query'].value).toEqual('dog');
      });

      it('Account for parameters with keys and no values', () => {
        componentUnderTest.searchForm.controls['query'].setValue('cat');
        componentUnderTest.state = '/search;q=;i=1;n=100;sortId=3';
        expect(componentUnderTest.searchForm.controls['query'].value).toEqual('');
      });


      it('Does nothing if there are no search params', () => {
        componentUnderTest.searchForm.controls['query'].setValue('cat');
        componentUnderTest.state = '/search';
        expect(componentUnderTest.searchForm.controls['query'].value).toEqual('cat');
      });

      it('Does nothing if the query param is already the same as the search box value', () => {
        componentUnderTest.searchForm.controls['query'].setValue('cat');
        componentUnderTest.state = '/search;q=cat;i=1;n=100;sortId=3';
        expect(componentUnderTest.searchForm.controls['query'].value).toEqual('cat');
      });
    });

    describe('filtersAreAvailable', () => {
      it('returns observable of true when the \'filtersAreAvailable\'in the store is true', () => {
        mockStore.createStateSection('headerDisplayOptions', { filtersAreAvailable: true });
        let areAvailable: boolean;
        componentUnderTest.filtersAreAvailable.take(1).subscribe(available => areAvailable = available);
        expect(areAvailable).toBe(true);
      });

      it('returns observable of false when the \'filtersAreAvailable\'in the store is false', () => {
        mockStore.createStateSection('headerDisplayOptions', { filtersAreAvailable: false });
        let areAvailable: boolean;
        componentUnderTest.filtersAreAvailable.take(1).subscribe(available => areAvailable = available);
        expect(areAvailable).toBe(false);
      });
    });
  });
};

