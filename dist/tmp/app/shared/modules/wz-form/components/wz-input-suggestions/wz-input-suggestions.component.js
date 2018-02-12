"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var api_service_1 = require("../../../../services/api.service");
var api_interface_1 = require("../../../../interfaces/api.interface");
var WzInputSuggestionsComponent = (function () {
    function WzInputSuggestionsComponent(renderer, api, detector) {
        this.renderer = renderer;
        this.api = api;
        this.detector = detector;
        this.matchOnProperty = '';
        this.newSuggestion = new core_1.EventEmitter();
        this.suggestions = [];
        this.userInput = '';
    }
    WzInputSuggestionsComponent.prototype.ngOnInit = function () {
        this.clickCatcher = this.renderer.listenGlobal('body', 'click', this.closeSuggestions.bind(this));
        this.suggestionChangeListener();
    };
    WzInputSuggestionsComponent.prototype.ngOnDestroy = function () {
        this.clickCatcher();
        this.destroySubscription();
    };
    WzInputSuggestionsComponent.prototype.destroySubscription = function () {
        if (this.inputSubscription)
            this.inputSubscription.unsubscribe();
    };
    WzInputSuggestionsComponent.prototype.suggestionChangeListener = function () {
        var _this = this;
        if (this.fControl) {
            this.inputSubscription = this.fControl.valueChanges
                .filter(function (value) { return value !== _this.activeSuggestion; })
                .switchMap(function (query) {
                _this.activeSuggestion = null;
                if (query && query.length > 1) {
                    return _this.query(query);
                }
                else {
                    _this.closeSuggestions();
                    return [];
                }
            })
                .do(function (response) {
                _this.rawSuggestions = (response['items'] || response['list'] || []);
                return response;
            })
                .map(function (response) { return (response['items'] || response['list'] || [])
                .map(function (item) { return item.name || item.emailAddress || item; }); })
                .do(function (suggestions) {
                _this.suggestions = _this.normalizeSuggestions(suggestions);
                _this.userInput = _this.fControl.value;
            })
                .subscribe(function () { return _this.detector.markForCheck(); });
        }
    };
    WzInputSuggestionsComponent.prototype.closeSuggestions = function () {
        this.activeSuggestion = null;
        this.suggestions = [];
        this.detector.markForCheck();
    };
    WzInputSuggestionsComponent.prototype.selectSuggestion = function (suggestion) {
        var _this = this;
        var tempSuggestion = this.activeSuggestion;
        this.closeSuggestions();
        this.fControl.patchValue(suggestion, { emitEvent: false });
        if (!!this.matchOnProperty) {
            setTimeout(function () { return _this.newSuggestion.emit(_this.rawSuggestions.find(function (rawSuggestion) {
                return rawSuggestion[_this.matchOnProperty] === suggestion;
            })); }, 20);
        }
        else {
            this.newSuggestion.emit(tempSuggestion);
        }
    };
    WzInputSuggestionsComponent.prototype.parseSuggestion = function (suggestion) {
        return suggestion
            .split(this.userInput)
            .join('<strong>' + this.userInput + '</strong>');
    };
    WzInputSuggestionsComponent.prototype.inputKeyDown = function (event) {
        if (event.which === 9 || event.keyCode === 9) {
            this.closeSuggestions();
        }
        else if (event.which === 38 || event.keyCode === 38) {
            this.upKey(event);
            event.preventDefault();
        }
        else if (event.which === 40 || event.keyCode === 40) {
            this.downKey(event);
            event.preventDefault();
        }
        else if ((event.which === 10 || event.which === 13 ||
            event.keyCode === 10 || event.keyCode === 13)
            && this.suggestions.length > 1) {
            this.enterKey(event);
            event.preventDefault();
        }
    };
    WzInputSuggestionsComponent.prototype.isCollection = function () {
        return (this.rawField.endPoint.indexOf('collection') > -1);
    };
    WzInputSuggestionsComponent.prototype.upKey = function (event) {
        var activeSuggestionIndex = this.suggestions.indexOf(this.activeSuggestion);
        if (activeSuggestionIndex === -1) {
            this.setActiveSuggestion(this.suggestions[0]);
            return;
        }
        var suggestion;
        suggestion = (activeSuggestionIndex === 0) ?
            this.suggestions[this.suggestions.length - 1] :
            this.suggestions[activeSuggestionIndex - 1];
        this.setActiveSuggestion(suggestion);
    };
    WzInputSuggestionsComponent.prototype.downKey = function (event) {
        var activeSuggestionIndex = this.suggestions.indexOf(this.activeSuggestion);
        if (activeSuggestionIndex === -1) {
            this.setActiveSuggestion(this.suggestions[1]);
            return;
        }
        var suggestion;
        suggestion = (activeSuggestionIndex === (this.suggestions.length - 1)) ?
            this.suggestions[0] :
            this.suggestions[activeSuggestionIndex + 1];
        this.setActiveSuggestion(suggestion);
    };
    WzInputSuggestionsComponent.prototype.enterKey = function (event) {
        if (this.activeSuggestion) {
            this.selectSuggestion(this.activeSuggestion);
        }
        else {
            this.newSuggestion.emit();
            this.closeSuggestions();
        }
    };
    WzInputSuggestionsComponent.prototype.setActiveSuggestion = function (suggestion) {
        this.activeSuggestion = suggestion;
        this.fControl.patchValue(suggestion, { emitEvent: false });
        this.detector.markForCheck();
    };
    WzInputSuggestionsComponent.prototype.normalizeSuggestions = function (suggestions) {
        suggestions.unshift(this.fControl.value);
        return suggestions;
    };
    WzInputSuggestionsComponent.prototype.buildParams = function () {
        var queryParamsArray = this.rawField.queryParams.split(',').map(function (item) { return item.trim(); });
        var queryParams = {};
        for (var i = 0; i < (queryParamsArray.length / 2); i++) {
            queryParams[queryParamsArray[0]] = queryParamsArray[1];
            queryParamsArray.splice(0, 1);
        }
        return queryParams;
    };
    WzInputSuggestionsComponent.prototype.buildSearchFields = function (query) {
        var queryParamsArray = this.rawField.queryParams.split(',').map(function (item) { return item.trim(); });
        queryParamsArray.push(query);
        var queryParams = {};
        for (var i = 0; i < queryParamsArray.length; i += 2) {
            queryParams[queryParamsArray[i]] = queryParamsArray[i + 1];
        }
        ;
        return queryParams;
    };
    WzInputSuggestionsComponent.prototype.query = function (query) {
        switch (this.rawField.service) {
            case 'identities':
                return this.api.get(api_interface_1.Api.Identities, this.rawField.endPoint, { parameters: Object.assign({}, this.buildSearchFields(query)) });
            case 'assets':
                return this.api.get(api_interface_1.Api.Assets, this.rawField.endPoint, { parameters: Object.assign({}, this.buildParams(), { text: query }, { q: query }) });
            default:
                return Observable_1.Observable.of([]);
        }
    };
    WzInputSuggestionsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-input-suggestions',
                    templateUrl: 'wz-input-suggestions.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    styles: ['mat-list-item:first-child{ display: none;}']
                },] },
    ];
    WzInputSuggestionsComponent.ctorParameters = function () { return [
        { type: core_1.Renderer, },
        { type: api_service_1.ApiService, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    WzInputSuggestionsComponent.propDecorators = {
        'fControl': [{ type: core_1.Input },],
        'rawField': [{ type: core_1.Input },],
        'matchOnProperty': [{ type: core_1.Input },],
        'newSuggestion': [{ type: core_1.Output },],
    };
    return WzInputSuggestionsComponent;
}());
exports.WzInputSuggestionsComponent = WzInputSuggestionsComponent;
//# sourceMappingURL=wz-input-suggestions.component.js.map