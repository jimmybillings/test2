import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WzInputSuggestionsComponent } from '../wz-input-suggestions/wz-input-suggestions.component';
import { AppStore } from '../../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'wz-autocomplete-search',
  templateUrl: 'wz-autocomplete.search.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WzAutocompleteSearchComponent {
  @Input() public config: any;
  @Input() public currentUser: any;
  @Input() userPreference: any;
  @Input()
  set state(value: string) {
    this.updateSearchBoxValue(value);
  }
  @Output() public searchContext = new EventEmitter();
  @Output() public toggleFilterTree = new EventEmitter();

  public searchForm: FormGroup;
  public formOptions = {
    'service': 'assets',
    'endPoint': 'search/thesaurusTerms',
    'queryParams': 'maxTerms, 10',
    'name': 'name',
    'type': 'suggestions'
  };

  @ViewChild(WzInputSuggestionsComponent) public wzInputSuggestions: WzInputSuggestionsComponent;

  constructor(public fb: FormBuilder, private store: AppStore) {
    this.searchForm = this.fb.group({ query: ['', Validators.required] });
  }

  public toggleFilters() {
    this.toggleFilterTree.emit();
  }

  public onSubmit(query?: any, searchTerm = false) {
    if (query) {
      query = (searchTerm) ? '"' + query + '"' : query;
      this.searchContext.emit(query);
    } else {
      this.searchContext.emit(this.searchForm.value.query);
    }
  }

  public toggleSearch(): void {
    this.userPreference.toggleSearch();
  }

  public get filtersAreAvailable(): Observable<boolean> {
    return this.store.select(state => state.headerDisplayOptions.filtersAreAvailable);
  }

  private updateSearchBoxValue(searchParams: any) {
    searchParams = searchParams.split(';');
    searchParams.shift();
    if (searchParams.length !== 0) {
      let obj: any = {};
      searchParams.forEach((pair: any) => {
        pair = pair.split('=');
        obj[pair[0]] = decodeURIComponent(pair[1] || '');
      });
      if (this.searchForm.controls['query'].value !== obj['q']) {
        (<FormControl>this.searchForm.controls['query']).patchValue(obj['q'], { emitEvent: false });
      }
      this.wzInputSuggestions.destroySubscription();
      this.wzInputSuggestions.suggestionChangeListener();
    }
  }
}
