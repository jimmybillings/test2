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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzAutocompleteSearchComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzAutocompleteSearchComponent.prototype, "currentUser", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzAutocompleteSearchComponent.prototype, "userPreference", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], WzAutocompleteSearchComponent.prototype, "state", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzAutocompleteSearchComponent.prototype, "searchContext", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzAutocompleteSearchComponent.prototype, "toggleFilterTree", void 0);
    __decorate([
        core_1.ViewChild(wz_input_suggestions_component_1.WzInputSuggestionsComponent),
        __metadata("design:type", wz_input_suggestions_component_1.WzInputSuggestionsComponent)
    ], WzAutocompleteSearchComponent.prototype, "wzInputSuggestions", void 0);
    WzAutocompleteSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-autocomplete-search',
            templateUrl: 'wz-autocomplete.search.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, app_store_1.AppStore])
    ], WzAutocompleteSearchComponent);
    return WzAutocompleteSearchComponent;
}());
exports.WzAutocompleteSearchComponent = WzAutocompleteSearchComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otYXV0b2NvbXBsZXRlLXNlYXJjaC93ei1hdXRvY29tcGxldGUtc2VhcmNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUEyRztBQUMzRyx3Q0FBaUY7QUFDakYseUdBQXFHO0FBQ3JHLHNEQUFvRDtBQVFwRDtJQXNCRSx1Q0FBbUIsRUFBZSxFQUFVLEtBQWU7UUFBeEMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUFkMUMsa0JBQWEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNuQyxxQkFBZ0IsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUdoRCxnQkFBVyxHQUFHO1lBQ25CLFNBQVMsRUFBRSxRQUFRO1lBQ25CLFVBQVUsRUFBRSx1QkFBdUI7WUFDbkMsYUFBYSxFQUFFLGNBQWM7WUFDN0IsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsYUFBYTtTQUN0QixDQUFDO1FBS0EsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBbkJELHNCQUFJLGdEQUFLO2FBQVQsVUFBVSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQW1CTSxxREFBYSxHQUFwQjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sZ0RBQVEsR0FBZixVQUFnQixLQUFXLEVBQUUsVUFBa0I7UUFBbEIsMkJBQUEsRUFBQSxrQkFBa0I7UUFDN0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMs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dGUtc2VhcmNoL3d6LWF1dG9jb21wbGV0ZS1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBXeklucHV0U3VnZ2VzdGlvbnNDb21wb25lbnQgfSBmcm9tICcuLi93ei1pbnB1dC1zdWdnZXN0aW9ucy93ei1pbnB1dC1zdWdnZXN0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1hdXRvY29tcGxldGUtc2VhcmNoJyxcbiAgdGVtcGxhdGVVcmw6ICd3ei1hdXRvY29tcGxldGUuc2VhcmNoLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBXekF1dG9jb21wbGV0ZVNlYXJjaENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb25maWc6IGFueTtcbiAgQElucHV0KCkgcHVibGljIGN1cnJlbnRVc2VyOiBhbnk7XG4gIEBJbnB1dCgpIHVzZXJQcmVmZXJlbmNlOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHNldCBzdGF0ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy51cGRhdGVTZWFyY2hCb3hWYWx1ZSh2YWx1ZSk7XG4gIH1cbiAgQE91dHB1dCgpIHB1YmxpYyBzZWFyY2hDb250ZXh0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIHRvZ2dsZUZpbHRlclRyZWUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHNlYXJjaEZvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIGZvcm1PcHRpb25zID0ge1xuICAgICdzZXJ2aWNlJzogJ2Fzc2V0cycsXG4gICAgJ2VuZFBvaW50JzogJ3NlYXJjaC90aGVzYXVydXNUZXJtcycsXG4gICAgJ3F1ZXJ5UGFyYW1zJzogJ21heFRlcm1zLCAxMCcsXG4gICAgJ25hbWUnOiAnbmFtZScsXG4gICAgJ3R5cGUnOiAnc3VnZ2VzdGlvbnMnXG4gIH07XG5cbiAgQFZpZXdDaGlsZChXeklucHV0U3VnZ2VzdGlvbnNDb21wb25lbnQpIHB1YmxpYyB3eklucHV0U3VnZ2VzdGlvbnM6IFd6SW5wdXRTdWdnZXN0aW9uc0NvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkge1xuICAgIHRoaXMuc2VhcmNoRm9ybSA9IHRoaXMuZmIuZ3JvdXAoeyBxdWVyeTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSB9KTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVGaWx0ZXJzKCkge1xuICAgIHRoaXMudG9nZ2xlRmlsdGVyVHJlZS5lbWl0KCk7XG4gIH1cblxuICBwdWJsaWMgb25TdWJtaXQocXVlcnk/OiBhbnksIHNlYXJjaFRlcm0gPSBmYWxzZSkge1xuICAgIGlmIChxdWVyeSkge1xuICAgICAgcXVlcnkgPSAoc2VhcmNoVGVybSkgPyAnXCInICsgcXVlcnkgKyAnXCInIDogcXVlcnk7XG4gICAgICB0aGlzLnNlYXJjaENvbnRleHQuZW1pdChxdWVyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VhcmNoQ29udGV4dC5lbWl0KHRoaXMuc2VhcmNoRm9ybS52YWx1ZS5xdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlYXJjaCgpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJQcmVmZXJlbmNlLnRvZ2dsZVNlYXJjaCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBmaWx0ZXJzQXJlQXZhaWxhYmxlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5oZWFkZXJEaXNwbGF5T3B0aW9ucy5maWx0ZXJzQXJlQXZhaWxhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2VhcmNoQm94VmFsdWUoc2VhcmNoUGFyYW1zOiBhbnkpIHtcbiAgICBzZWFyY2hQYXJhbXMgPSBzZWFyY2hQYXJhbXMuc3BsaXQoJzsnKTtcbiAgICBzZWFyY2hQYXJhbXMuc2hpZnQoKTtcbiAgICBpZiAoc2VhcmNoUGFyYW1zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgbGV0IG9iajogYW55ID0ge307XG4gICAgICBzZWFyY2hQYXJhbXMuZm9yRWFjaCgocGFpcjogYW55KSA9PiB7XG4gICAgICAgIHBhaXIgPSBwYWlyLnNwbGl0KCc9Jyk7XG4gICAgICAgIG9ialtwYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdIHx8ICcnKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuc2VhcmNoRm9ybS5jb250cm9sc1sncXVlcnknXS52YWx1ZSAhPT0gb2JqWydxJ10pIHtcbiAgICAgICAgKDxGb3JtQ29udHJvbD50aGlzLnNlYXJjaEZvcm0uY29udHJvbHNbJ3F1ZXJ5J10pLnBhdGNoVmFsdWUob2JqWydxJ10sIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMud3pJbnB1dFN1Z2dlc3Rpb25zLmRlc3Ryb3lTdWJzY3JpcHRpb24oKTtcbiAgICAgIHRoaXMud3pJbnB1dFN1Z2dlc3Rpb25zLnN1Z2dlc3Rpb25DaGFuZ2VMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxufVxuIl19
