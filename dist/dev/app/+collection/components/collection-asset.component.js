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
var CollectionAssetComponent = (function () {
    function CollectionAssetComponent(store) {
        this.store = store;
    }
    CollectionAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.collectionComment.config.form.items; });
    };
    CollectionAssetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collection-asset',
            template: "\n    <asset-component\n      [assetType]=\"'collection'\"\n      [commentFormConfig]=\"commentFormConfig\">\n    </asset-component>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], CollectionAssetComponent);
    return CollectionAssetComponent;
}());
exports.CollectionAssetComponent = CollectionAssetComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tYXNzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJFO0FBRzNFLDZDQUF3RDtBQWV4RDtJQUdFLGtDQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFJLENBQUM7SUFFakMsMkNBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUE3RCxDQUE2RCxDQUFDLENBQUM7SUFDN0gsQ0FBQztJQVBVLHdCQUF3QjtRQVZwQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLHNJQUlXO1lBQ3JCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBSTJCLG9CQUFRO09BSHhCLHdCQUF3QixDQVFwQztJQUFELCtCQUFDO0NBUkQsQUFRQyxJQUFBO0FBUlksNERBQXdCIiwiZmlsZSI6ImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tYXNzZXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7IFN0YXRlTWFwcGVyLCBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBBc3NldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tZW50UGFyZW50T2JqZWN0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVudC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjb2xsZWN0aW9uLWFzc2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YXNzZXQtY29tcG9uZW50XG4gICAgICBbYXNzZXRUeXBlXT1cIidjb2xsZWN0aW9uJ1wiXG4gICAgICBbY29tbWVudEZvcm1Db25maWddPVwiY29tbWVudEZvcm1Db25maWdcIj5cbiAgICA8L2Fzc2V0LWNvbXBvbmVudD5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uQXNzZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgY29tbWVudEZvcm1Db25maWc6IEZvcm1GaWVsZHM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbW1lbnRGb3JtQ29uZmlnID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLmNvbGxlY3Rpb25Db21tZW50LmNvbmZpZy5mb3JtLml0ZW1zKTtcbiAgfVxufVxuIl19
