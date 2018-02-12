"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var wz_input_suggestions_component_1 = require("../wz-input-suggestions/wz-input-suggestions.component");
var app_store_1 = require("../../../../../app.store");
var WzAutocompleteSearchComponent = (function () {
    function WzAutocompleteSearchComponent(fb, store) {
        this.fb = fb;
        this.store = store;
        this.searchContext = new core_1.EventEmitter();
        this.toggleFilterTree = new core_1.EventEmitter();
        this.formOptions = {
            'service': 'assets',
            'endPoint': 'search/thesaurusTerms',
            'queryParams': 'maxTerms, 10',
            'name': 'name',
            'type': 'suggestions'
        };
        this.searchForm = this.fb.group({ query: ['', forms_1.Validators.required] });
    }
    Object.defineProperty(WzAutocompleteSearchComponent.prototype, "state", {
        set: function (value) {
            this.updateSearchBoxValue(value);
        },
        enumerable: true,
        configurable: true
    });
    WzAutocompleteSearchComponent.prototype.toggleFilters = function () {
        this.toggleFilterTree.emit();
    };
    WzAutocompleteSearchComponent.prototype.onSubmit = function (query, searchTerm) {
        if (searchTerm === void 0) { searchTerm = false; }
        if (query) {
            query = (searchTerm) ? '"' + query + '"' : query;
            this.searchContext.emit(query);
        }
        else {
            this.searchContext.emit(this.searchForm.value.query);
        }
    };
    WzAutocompleteSearchComponent.prototype.toggleSearch = function () {
        this.userPreference.toggleSearch();
    };
    Object.defineProperty(WzAutocompleteSearchComponent.prototype, "filtersAreAvailable", {
        get: function () {
            return this.store.select(function (state) { return state.headerDisplayOptions.filtersAreAvailable; });
        },
        enumerable: true,
        configurable: true
    });
    WzAutocompleteSearchComponent.prototype.updateSearchBoxValue = function (searchParams) {
        searchParams = searchParams.split(';');
        searchParams.shift();
        if (searchParams.length !== 0) {
            var obj_1 = {};
            searchParams.forEach(function (pair) {
                pair = pair.split('=');
                obj_1[pair[0]] = decodeURIComponent(pair[1] || '');
            });
            if (this.searchForm.controls['query'].value !== obj_1['q']) {
                this.searchForm.controls['query'].patchValue(obj_1['q'], { emitEvent: false });
            }
            this.wzInputSuggestions.destroySubscription();
            this.wzInputSuggestions.suggestionChangeListener();
        }
    };
    WzAutocompleteSearchComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-autocomplete-search',
                    templateUrl: 'wz-autocomplete.search.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzAutocompleteSearchComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
        { type: app_store_1.AppStore, },
    ]; };
    WzAutocompleteSearchComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'currentUser': [{ type: core_1.Input },],
        'userPreference': [{ type: core_1.Input },],
        'state': [{ type: core_1.Input },],
        'searchContext': [{ type: core_1.Output },],
        'toggleFilterTree': [{ type: core_1.Output },],
        'wzInputSuggestions': [{ type: core_1.ViewChild, args: [wz_input_suggestions_component_1.WzInputSuggestionsComponent,] },],
    };
    return WzAutocompleteSearchComponent;
}());
exports.WzAutocompleteSearchComponent = WzAutocompleteSearchComponent;
//# sourceMappingURL=wz-autocomplete-search.component.js.map