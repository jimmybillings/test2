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
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], WzInputSuggestionsComponent.prototype, "fControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzInputSuggestionsComponent.prototype, "rawField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzInputSuggestionsComponent.prototype, "matchOnProperty", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzInputSuggestionsComponent.prototype, "newSuggestion", void 0);
    WzInputSuggestionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-input-suggestions',
            templateUrl: 'wz-input-suggestions.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: ['mat-list-item:first-child{ display: none;}']
        }),
        __metadata("design:paramtypes", [core_1.Renderer,
            api_service_1.ApiService,
            core_1.ChangeDetectorRef])
    ], WzInputSuggestionsComponent);
    return WzInputSuggestionsComponent;
}());
exports.WzInputSuggestionsComponent = WzInputSuggestionsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otaW5wdXQtc3VnZ2VzdGlvbnMvd3otaW5wdXQtc3VnZ2VzdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0Esc0NBR3VCO0FBQ3ZCLHdDQUE2QztBQUU3Qyw4Q0FBNkM7QUFDN0MsZ0VBQThEO0FBQzlELHNFQUF3RTtBQVV4RTtJQWNFLHFDQUNVLFFBQWtCLEVBQ2xCLEdBQWUsRUFDZixRQUEyQjtRQUYzQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQWI1QixvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUM1QixrQkFBYSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3RDLGdCQUFXLEdBQWtCLEVBQUUsQ0FBQztRQUsvQixjQUFTLEdBQVcsRUFBRSxDQUFDO0lBTVUsQ0FBQztJQUUxQyw4Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsaURBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0seURBQW1CLEdBQTFCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25FLENBQUM7SUFFTSw4REFBd0IsR0FBL0I7UUFBQSxpQkF5QkM7UUF4QkMsRUFB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QUE4QjtJQUM1QjtRQUFULGFBQU0sRUFBRTs7c0VBQW9DO0lBTGxDLDJCQUEyQjtRQVJ2QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxNQUFNLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztTQUN2RCxDQUFDO3lDQWlCb0IsZUFBUTtZQUNiLHdCQUFVO1lBQ0wsd0JBQWlCO09BakIxQiwyQkFBMkIsQ0FzTnZDO0lBQUQsa0NBQUM7Q0F0TkQsQUFzTkMsSUFBQTtBQXROWSxrRUFBMkIiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWZvcm0vY29tcG9uZW50cy93ei1pbnB1dC1zdWdnZXN0aW9ucy93ei1pbnB1dC1zdWdnZXN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vLi4vLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFJlbmRlcmVyLCBPbkRlc3Ryb3ksIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpLCBBcGlSZXNwb25zZSB9IGZyb20gJy4uLy4uLy4uLy4uL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LWlucHV0LXN1Z2dlc3Rpb25zJyxcbiAgdGVtcGxhdGVVcmw6ICd3ei1pbnB1dC1zdWdnZXN0aW9ucy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlczogWydtYXQtbGlzdC1pdGVtOmZpcnN0LWNoaWxkeyBkaXNwbGF5OiBub25lO30nXVxufSlcblxuZXhwb3J0IGNsYXNzIFd6SW5wdXRTdWdnZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBmQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gIEBJbnB1dCgpIHJhd0ZpZWxkOiBhbnk7XG4gIEBJbnB1dCgpIG1hdGNoT25Qcm9wZXJ0eTogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKSBuZXdTdWdnZXN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgc3VnZ2VzdGlvbnM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgcHVibGljIGFjdGl2ZVN1Z2dlc3Rpb246IHN0cmluZztcblxuICBwcml2YXRlIGNsaWNrQ2F0Y2hlcjogYW55O1xuICBwcml2YXRlIGlucHV0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgdXNlcklucHV0OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSByYXdTdWdnZXN0aW9uczogUG9qb1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgIHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNsaWNrQ2F0Y2hlciA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdib2R5JywgJ2NsaWNrJywgdGhpcy5jbG9zZVN1Z2dlc3Rpb25zLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc3VnZ2VzdGlvbkNoYW5nZUxpc3RlbmVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsaWNrQ2F0Y2hlcigpO1xuICAgIHRoaXMuZGVzdHJveVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3lTdWJzY3JpcHRpb24oKSB7XG4gICAgaWYgKHRoaXMuaW5wdXRTdWJzY3JpcHRpb24pIHRoaXMuaW5wdXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdWdnZXN0aW9uQ2hhbmdlTGlzdGVuZXIoKSB7XG4gICAgaWYgKHRoaXMuZkNvbnRyb2wpIHtcbiAgICAgIHRoaXMuaW5wdXRTdWJzY3JpcHRpb24gPSB0aGlzLmZDb250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgICAuZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSAhPT0gdGhpcy5hY3RpdmVTdWdnZXN0aW9uKVxuICAgICAgICAuc3dpdGNoTWFwKChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy5hY3RpdmVTdWdnZXN0aW9uID0gbnVsbDtcbiAgICAgICAgICBpZiAocXVlcnkgJiYgcXVlcnkubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkocXVlcnkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5kbygocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLnJhd1N1Z2dlc3Rpb25zID0gKHJlc3BvbnNlWydpdGVtcyddIHx8IHJlc3BvbnNlWydsaXN0J10gfHwgW10pO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcChyZXNwb25zZSA9PiAocmVzcG9uc2VbJ2l0ZW1zJ10gfHwgcmVzcG9uc2VbJ2xpc3QnXSB8fCBbXSlcbiAgICAgICAgICAubWFwKChpdGVtOiBhbnkpID0+IGl0ZW0ubmFtZSB8fCBpdGVtLmVtYWlsQWRkcmVzcyB8fCBpdGVtKSlcbiAgICAgICAgLmRvKChzdWdnZXN0aW9ucykgPT4ge1xuICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZVN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICB0aGlzLnVzZXJJbnB1dCA9IHRoaXMuZkNvbnRyb2wudmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRlY3Rvci5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlU3VnZ2VzdGlvbnMoKSB7XG4gICAgdGhpcy5hY3RpdmVTdWdnZXN0aW9uID0gbnVsbDtcbiAgICB0aGlzLnN1Z2dlc3Rpb25zID0gW107XG4gICAgdGhpcy5kZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RTdWdnZXN0aW9uKHN1Z2dlc3Rpb246IHN0cmluZykge1xuICAgIGNvbnN0IHRlbXBTdWdnZXN0aW9uOiBzdHJpbmcgPSB0aGlzLmFjdGl2ZVN1Z2dlc3Rpb247XG4gICAgdGhpcy5jbG9zZVN1Z2dlc3Rpb25zKCk7XG4gICAgdGhpcy5mQ29udHJvbC5wYXRjaFZhbHVlKHN1Z2dlc3Rpb24sIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICBpZiAoISF0aGlzLm1hdGNoT25Qcm9wZXJ0eSkge1xuICAgICAgLy8gQSB0aW1lb3V0IGhlcmUgdG8gaGVscCBmaXggYW5pbWF0aW9uIGxhZyB3aGVuXG4gICAgICAvLyBvdGhlciBleHRlcm5hbCBwcm9jZXNzaW5nIG1heSBiZSBoYXBwZW5pbmcuIFdpdGhvdXQgaXRcbiAgICAgIC8vIGl0IGNhdXNlcyBsYWcgb24gY2xvc2luZyB0aGUgc3VnZ2VzdGlvbiBwb3AgdXAgbWVudS5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5uZXdTdWdnZXN0aW9uLmVtaXQoXG4gICAgICAgIHRoaXMucmF3U3VnZ2VzdGlvbnMuZmluZCgocmF3U3VnZ2VzdGlvbikgPT5cbiAgICAgICAgICByYXdTdWdnZXN0aW9uW3RoaXMubWF0Y2hPblByb3BlcnR5XSA9PT0gc3VnZ2VzdGlvblxuICAgICAgICApXG4gICAgICApLCAyMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmV3U3VnZ2VzdGlvbi5lbWl0KHRlbXBTdWdnZXN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcGFyc2VTdWdnZXN0aW9uKHN1Z2dlc3Rpb246IHN0cmluZykge1xuICAgIHJldHVybiBzdWdnZXN0aW9uXG4gICAgICAuc3BsaXQodGhpcy51c2VySW5wdXQpXG4gICAgICAuam9pbignPHN0cm9uZz4nICsgdGhpcy51c2VySW5wdXQgKyAnPC9zdHJvbmc+Jyk7XG4gIH1cblxuICBwdWJsaWMgaW5wdXRLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LndoaWNoID09PSA5IHx8IGV2ZW50LmtleUNvZGUgPT09IDkpIHtcbiAgICAgIC8vIFRBQlxuICAgICAgdGhpcy5jbG9zZVN1Z2dlc3Rpb25zKCk7XG4gICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gMzggfHwgZXZlbnQua2V5Q29kZSA9PT0gMzgpIHtcbiAgICAgIC8vIFVQXG4gICAgICB0aGlzLnVwS2V5KGV2ZW50KTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gNDAgfHwgZXZlbnQua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgIC8vIERPV05cbiAgICAgIHRoaXMuZG93bktleShldmVudCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoKGV2ZW50LndoaWNoID09PSAxMCB8fCBldmVudC53aGljaCA9PT0gMTMgfHxcbiAgICAgIGV2ZW50LmtleUNvZGUgPT09IDEwIHx8IGV2ZW50LmtleUNvZGUgPT09IDEzKVxuICAgICAgJiYgdGhpcy5zdWdnZXN0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBFTlRFUlxuICAgICAgdGhpcy5lbnRlcktleShldmVudCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0NvbGxlY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLnJhd0ZpZWxkLmVuZFBvaW50LmluZGV4T2YoJ2NvbGxlY3Rpb24nKSA+IC0xKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBGaW5kIHRoZSBhY3RpdmUgc3VnZ2VzdGlvbiBpbiB0aGUgbGlzdFxuICAgIGxldCBhY3RpdmVTdWdnZXN0aW9uSW5kZXggPSB0aGlzLnN1Z2dlc3Rpb25zLmluZGV4T2YodGhpcy5hY3RpdmVTdWdnZXN0aW9uKTtcblxuICAgIC8vIElmIG5vdCBmb3VuZCwgdGhlbiBhY3RpdmF0ZSB0aGUgZmlyc3Qgc3VnZ2VzdGlvblxuICAgIGlmIChhY3RpdmVTdWdnZXN0aW9uSW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZVN1Z2dlc3Rpb24odGhpcy5zdWdnZXN0aW9uc1swXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHN1Z2dlc3Rpb246IHN0cmluZztcbiAgICAvLyBEZXRlcm1pbmUgdG8gZGVjcmVtZW50IHVwIHRoZSBzdWdnZXN0aW9uIGxpc3Qgb3IgcmVzdCB0byB0aGUgbGFzdC5cbiAgICBzdWdnZXN0aW9uID0gKGFjdGl2ZVN1Z2dlc3Rpb25JbmRleCA9PT0gMCkgP1xuICAgICAgLy8gT24gdGhlIGZpcnN0IHNlbGVjdGlvbiBzbyBnbyB0byB0aGUgbGFzdFxuICAgICAgdGhpcy5zdWdnZXN0aW9uc1t0aGlzLnN1Z2dlc3Rpb25zLmxlbmd0aCAtIDFdIDpcbiAgICAgIC8vIFN0aWxsIG1vcmUgc3VnZ2VzdGlvbiBiZXR3ZWVuIGhlcmUgYW5kIHRoZSBmaXJzdCBzbyBrZWVwIGRlY3JlbWVudGluZ1xuICAgICAgdGhpcy5zdWdnZXN0aW9uc1thY3RpdmVTdWdnZXN0aW9uSW5kZXggLSAxXTtcbiAgICB0aGlzLnNldEFjdGl2ZVN1Z2dlc3Rpb24oc3VnZ2VzdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGRvd25LZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBGaW5kIHRoZSBhY3RpdmUgc3VnZ2VzdGlvbiBpbiB0aGUgbGlzdFxuICAgIGxldCBhY3RpdmVTdWdnZXN0aW9uSW5kZXggPSB0aGlzLnN1Z2dlc3Rpb25zLmluZGV4T2YodGhpcy5hY3RpdmVTdWdnZXN0aW9uKTtcblxuICAgIC8vIElmIG5vdCBmb3VuZCwgdGhlbiBhY3RpdmF0ZSB0aGUgZmlyc3Qgc3VnZ2VzdGlvblxuICAgIGlmIChhY3RpdmVTdWdnZXN0aW9uSW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZVN1Z2dlc3Rpb24odGhpcy5zdWdnZXN0aW9uc1sxXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHN1Z2dlc3Rpb246IHN0cmluZztcbiAgICAvLyBEZXRlcm1pbmUgdG8gaW5jcmVtZW50IGRvd24gdGhlIHN1Z2dlc3Rpb24gbGlzdCBvciByZXNldCB0byB0aGUgZmlyc3QuXG4gICAgc3VnZ2VzdGlvbiA9IChhY3RpdmVTdWdnZXN0aW9uSW5kZXggPT09ICh0aGlzLnN1Z2dlc3Rpb25zLmxlbmd0aCAtIDEpKSA/XG4gICAgICAvLyBPbiBsYXN0IHN1Z2dlc3Rpb24gc28gcmVzZXQgdG8gdGhlIGZpcnN0LlxuICAgICAgdGhpcy5zdWdnZXN0aW9uc1swXSA6XG4gICAgICAvLyBOb3Qgb24gdGhlIGxhc3Qgc3VnZ2VzdGlvbiBzbyBrZWVwIGluY3JlbWVudGluZyBzZWxlY3RlZCBzdWdnZXN0aW9uXG4gICAgICB0aGlzLnN1Z2dlc3Rpb25zW2FjdGl2ZVN1Z2dlc3Rpb25JbmRleCArIDFdO1xuICAgIHRoaXMuc2V0QWN0aXZlU3VnZ2VzdGlvbihzdWdnZXN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZW50ZXJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBTZWxlY3QgdGhlIGFjdGl2ZSBzdWdnZXN0aW9uXG4gICAgaWYgKHRoaXMuYWN0aXZlU3VnZ2VzdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3RTdWdnZXN0aW9uKHRoaXMuYWN0aXZlU3VnZ2VzdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmV3U3VnZ2VzdGlvbi5lbWl0KCk7XG4gICAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEFjdGl2ZVN1Z2dlc3Rpb24oc3VnZ2VzdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5hY3RpdmVTdWdnZXN0aW9uID0gc3VnZ2VzdGlvbjtcbiAgICB0aGlzLmZDb250cm9sLnBhdGNoVmFsdWUoc3VnZ2VzdGlvbiwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIG5vcm1hbGl6ZVN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgc3VnZ2VzdGlvbnMudW5zaGlmdCh0aGlzLmZDb250cm9sLnZhbHVlKTtcbiAgICByZXR1cm4gc3VnZ2VzdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkUGFyYW1zKCkge1xuICAgIGxldCBxdWVyeVBhcmFtc0FycmF5OiBBcnJheTxzdHJpbmc+ID0gdGhpcy5yYXdGaWVsZC5xdWVyeVBhcmFtcy5zcGxpdCgnLCcpLm1hcCgoaXRlbTogc3RyaW5nKSA9PiBpdGVtLnRyaW0oKSk7XG4gICAgbGV0IHF1ZXJ5UGFyYW1zOiBhbnkgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IChxdWVyeVBhcmFtc0FycmF5Lmxlbmd0aCAvIDIpOyBpKyspIHtcbiAgICAgIHF1ZXJ5UGFyYW1zW3F1ZXJ5UGFyYW1zQXJyYXlbMF1dID0gcXVlcnlQYXJhbXNBcnJheVsxXTtcbiAgICAgIHF1ZXJ5UGFyYW1zQXJyYXkuc3BsaWNlKDAsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnlQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU2VhcmNoRmllbGRzKHF1ZXJ5OiBhbnkpIHtcbiAgICBsZXQgcXVlcnlQYXJhbXNBcnJheTogQXJyYXk8c3RyaW5nPiA9IHRoaXMucmF3RmllbGQucXVlcnlQYXJhbXMuc3BsaXQoJywnKS5tYXAoKGl0ZW06IHN0cmluZykgPT4gaXRlbS50cmltKCkpO1xuICAgIHF1ZXJ5UGFyYW1zQXJyYXkucHVzaChxdWVyeSk7XG4gICAgbGV0IHF1ZXJ5UGFyYW1zOiBhbnkgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXJ5UGFyYW1zQXJyYXkubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHF1ZXJ5UGFyYW1zW3F1ZXJ5UGFyYW1zQXJyYXlbaV1dID0gcXVlcnlQYXJhbXNBcnJheVtpICsgMV07XG4gICAgfTtcbiAgICByZXR1cm4gcXVlcnlQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIHF1ZXJ5KHF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVJlc3BvbnNlPiB7XG4gICAgc3dpdGNoICh0aGlzLnJhd0ZpZWxkLnNlcnZpY2UpIHtcbiAgICAgIGNhc2UgJ2lkZW50aXRpZXMnOlxuICAgICAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KFxuICAgICAgICAgIEFwaS5JZGVudGl0aWVzLFxuICAgICAgICAgIHRoaXMucmF3RmllbGQuZW5kUG9pbnQsXG4gICAgICAgICAgeyBwYXJhbWV0ZXJzOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1aWxkU2VhcmNoRmllbGRzKHF1ZXJ5KSkgfVxuICAgICAgICApO1xuICAgICAgY2FzZSAnYXNzZXRzJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpLmdldChcbiAgICAgICAgICBBcGkuQXNzZXRzLFxuICAgICAgICAgIHRoaXMucmF3RmllbGQuZW5kUG9pbnQsXG4gICAgICAgICAgeyBwYXJhbWV0ZXJzOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1aWxkUGFyYW1zKCksIHsgdGV4dDogcXVlcnkgfSwgeyBxOiBxdWVyeSB9KSB9XG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihbXSk7XG4gICAgfVxuICB9XG59XG4iXX0=
