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
var app_store_1 = require("../../app.store");
var CollectionLinkComponent = (function () {
    function CollectionLinkComponent(store) {
        this.store = store;
    }
    Object.defineProperty(CollectionLinkComponent.prototype, "assets", {
        set: function (value) {
            this.buildLegacyLink(value);
        },
        enumerable: true,
        configurable: true
    });
    CollectionLinkComponent.prototype.buildLegacyLink = function (assets) {
        var filterSegment;
        filterSegment = assets.reduce(function (prev, current, i) {
            (i !== assets.length - 1) ? prev += current.assetId + ' OR ' : prev += current.assetId;
            return prev;
        }, '');
        this.legacyLink = "https://commerce.wazeedigital.com/license/searchResults.do?search.keywords=id:(" + filterSegment + ")";
    };
    CollectionLinkComponent.prototype.selectInputForCopy = function (event) {
        event.target.select();
    };
    CollectionLinkComponent.prototype.onCopyLegacyLinkButtonClick = function () {
        this.store.dispatch(function (factory) { return factory.snackbar.display('COLLECTION.LINK_COPIED_TOAST'); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CollectionLinkComponent.prototype, "assets", null);
    CollectionLinkComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collection-link-component',
            templateUrl: 'collection-link.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], CollectionLinkComponent);
    return CollectionLinkComponent;
}());
exports.CollectionLinkComponent = CollectionLinkComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tbGluay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFDaEcsNkNBQTJDO0FBUzNDO0lBUUUsaUNBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQU54QyxzQkFBSSwyQ0FBTTthQUFWLFVBQVcsS0FBVTtZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBTU0saURBQWUsR0FBdEIsVUFBdUIsTUFBVztRQUNoQyxJQUFJLGFBQXFCLENBQUM7UUFDMUIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFZLEVBQUUsT0FBWSxFQUFFLENBQVM7WUFDbEUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN2RixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxvRkFBa0YsYUFBYSxNQUFHLENBQUM7SUFDdkgsQ0FBQztJQUVNLG9EQUFrQixHQUF6QixVQUEwQixLQUFVO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLDZEQUEyQixHQUFsQztRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsRUFBeEQsQ0FBd0QsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUF2QkQ7UUFEQyxZQUFLLEVBQUU7Ozt5REFHUDtJQUpVLHVCQUF1QjtRQVBuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVUyQixvQkFBUTtPQVJ4Qix1QkFBdUIsQ0EwQm5DO0lBQUQsOEJBQUM7Q0ExQkQsQUEwQkMsSUFBQTtBQTFCWSwwREFBdUIiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1saW5rLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjb2xsZWN0aW9uLWxpbmstY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdjb2xsZWN0aW9uLWxpbmsuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkxpbmtDb21wb25lbnQge1xuICBASW5wdXQoKVxuICBzZXQgYXNzZXRzKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmJ1aWxkTGVnYWN5TGluayh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgbGVnYWN5TGluazogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgYnVpbGRMZWdhY3lMaW5rKGFzc2V0czogYW55KTogdm9pZCB7XG4gICAgbGV0IGZpbHRlclNlZ21lbnQ6IHN0cmluZztcbiAgICBmaWx0ZXJTZWdtZW50ID0gYXNzZXRzLnJlZHVjZSgocHJldjogc3RyaW5nLCBjdXJyZW50OiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgKGkgIT09IGFzc2V0cy5sZW5ndGggLSAxKSA/IHByZXYgKz0gY3VycmVudC5hc3NldElkICsgJyBPUiAnIDogcHJldiArPSBjdXJyZW50LmFzc2V0SWQ7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCAnJyk7XG4gICAgdGhpcy5sZWdhY3lMaW5rID0gYGh0dHBzOi8vY29tbWVyY2Uud2F6ZWVkaWdpdGFsLmNvbS9saWNlbnNlL3NlYXJjaFJlc3VsdHMuZG8/c2VhcmNoLmtleXdvcmRzPWlkOigke2ZpbHRlclNlZ21lbnR9KWA7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0SW5wdXRGb3JDb3B5KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBldmVudC50YXJnZXQuc2VsZWN0KCk7XG4gIH1cblxuICBwdWJsaWMgb25Db3B5TGVnYWN5TGlua0J1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoJ0NPTExFQ1RJT04uTElOS19DT1BJRURfVE9BU1QnKSk7XG4gIH1cbn1cbiJdfQ==
