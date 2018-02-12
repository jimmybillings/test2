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
var enhanced_asset_1 = require("../../shared/interfaces/enhanced-asset");
var subclip_markers_1 = require("../../shared/interfaces/subclip-markers");
var app_store_1 = require("../../app.store");
var AssetShareComponent = (function () {
    function AssetShareComponent(store) {
        this.store = store;
        this.closeRequest = new core_1.EventEmitter();
    }
    AssetShareComponent.prototype.ngOnInit = function () {
        this.shareLink = this.store.select(function (state) { return state.sharing.assetLink; });
    };
    Object.defineProperty(AssetShareComponent.prototype, "shareAssetDialogTitle", {
        get: function () {
            return subclip_markers_1.bothMarkersAreSet(this.subclipMarkers)
                ? 'ASSET.SHARING.SUBCLIP_DIALOG_HEADER_TITLE'
                : 'ASSET.SHARING.DIALOG_HEADER_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetShareComponent.prototype, "showSubclippingInfo", {
        get: function () {
            return subclip_markers_1.bothMarkersAreSet(this.subclipMarkers);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetShareComponent.prototype, "assetName", {
        get: function () {
            return this.enhancedAsset.getMetadataValueFor('name');
        },
        enumerable: true,
        configurable: true
    });
    AssetShareComponent.prototype.onShareLinkRequest = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.sharing.createAssetShareLink(_this.enhancedAsset.assetId, _this.subclipMarkers); });
    };
    AssetShareComponent.prototype.onCloseRequest = function () {
        this.closeRequest.emit();
    };
    AssetShareComponent.prototype.onFormSubmit = function (shareParameters) {
        var _this = this;
        var properties = {
            assetName: this.enhancedAsset.getMetadataValueFor('name'),
            assetDescription: this.enhancedAsset.getMetadataValueFor('Description'),
            assetThumbnailUrl: this.enhancedAsset.thumbnailUrl
        };
        this.store.dispatch(function (factory) {
            return factory.sharing.emailAssetShareLink(_this.enhancedAsset.assetId, _this.subclipMarkers, shareParameters, properties);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AssetShareComponent.prototype, "formFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", enhanced_asset_1.EnhancedAsset)
    ], AssetShareComponent.prototype, "enhancedAsset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetShareComponent.prototype, "subclipMarkers", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AssetShareComponent.prototype, "closeRequest", void 0);
    AssetShareComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'asset-share',
            templateUrl: 'asset-share.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], AssetShareComponent);
    return AssetShareComponent;
}());
exports.AssetShareComponent = AssetShareComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvY29tcG9uZW50cy9hc3NldC1zaGFyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBd0c7QUFJeEcseUVBQXVFO0FBQ3ZFLDJFQUE0RjtBQUM1Riw2Q0FBMkM7QUFTM0M7SUFRRSw2QkFBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7UUFKekIsaUJBQVksR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFJekIsQ0FBQztJQUVqQyxzQ0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUF2QixDQUF1QixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELHNCQUFXLHNEQUFxQjthQUFoQztZQUNFLE1BQU0sQ0FBQyxtQ0FBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsMkNBQTJDO2dCQUM3QyxDQUFDLENBQUMsbUNBQW1DLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxvREFBbUI7YUFBOUI7WUFDRSxNQUFNLENBQUMsbUNBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMENBQVM7YUFBcEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxDQUFDOzs7T0FBQTtJQUVNLGdEQUFrQixHQUF6QjtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsRUFBckYsQ0FBcUYsQ0FBQyxDQUFDO0lBQ3hILENBQUM7SUFFTSw0Q0FBYyxHQUFyQjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLDBDQUFZLEdBQW5CLFVBQW9CLGVBQXFDO1FBQXpELGlCQVNDO1FBUkMsSUFBTSxVQUFVLEdBQVM7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO1lBQ3pELGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1lBQ3ZFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTtTQUNuRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPO1lBQ3pCLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7UUFBakgsQ0FBaUgsQ0FDbEgsQ0FBQztJQUNKLENBQUM7SUE1Q1E7UUFBUixZQUFLLEVBQUU7OzJEQUEwQjtJQUN6QjtRQUFSLFlBQUssRUFBRTtrQ0FBZ0IsOEJBQWE7OERBQUM7SUFDN0I7UUFBUixZQUFLLEVBQUU7OytEQUFnQztJQUM5QjtRQUFULGFBQU0sRUFBRTtrQ0FBZSxtQkFBWTs2REFBNEI7SUFKckQsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVMyQixvQkFBUTtPQVJ4QixtQkFBbUIsQ0E4Qy9CO0lBQUQsMEJBQUM7Q0E5Q0QsQUE4Q0MsSUFBQTtBQTlDWSxrREFBbUIiLCJmaWxlIjoiYXBwLythc3NldC9jb21wb25lbnRzL2Fzc2V0LXNoYXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQXNzZXRTaGFyZVBhcmFtZXRlcnMsIFBvam8gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgeyBTdWJjbGlwTWFya2VycywgYm90aE1hcmtlcnNBcmVTZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2Fzc2V0LXNoYXJlJyxcbiAgdGVtcGxhdGVVcmw6ICdhc3NldC1zaGFyZS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRTaGFyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZvcm1GaWVsZHM6IEZvcm1GaWVsZHNbXTtcbiAgQElucHV0KCkgZW5oYW5jZWRBc3NldDogRW5oYW5jZWRBc3NldDtcbiAgQElucHV0KCkgc3ViY2xpcE1hcmtlcnM6IFN1YmNsaXBNYXJrZXJzO1xuICBAT3V0cHV0KCkgY2xvc2VSZXF1ZXN0OiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHNoYXJlTGluazogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zaGFyZUxpbmsgPSB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5zaGFyaW5nLmFzc2V0TGluayk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoYXJlQXNzZXREaWFsb2dUaXRsZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBib3RoTWFya2Vyc0FyZVNldCh0aGlzLnN1YmNsaXBNYXJrZXJzKVxuICAgICAgPyAnQVNTRVQuU0hBUklORy5TVUJDTElQX0RJQUxPR19IRUFERVJfVElUTEUnXG4gICAgICA6ICdBU1NFVC5TSEFSSU5HLkRJQUxPR19IRUFERVJfVElUTEUnO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93U3ViY2xpcHBpbmdJbmZvKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBib3RoTWFya2Vyc0FyZVNldCh0aGlzLnN1YmNsaXBNYXJrZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYXNzZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRBc3NldC5nZXRNZXRhZGF0YVZhbHVlRm9yKCduYW1lJyk7XG4gIH1cblxuICBwdWJsaWMgb25TaGFyZUxpbmtSZXF1ZXN0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnNoYXJpbmcuY3JlYXRlQXNzZXRTaGFyZUxpbmsodGhpcy5lbmhhbmNlZEFzc2V0LmFzc2V0SWQsIHRoaXMuc3ViY2xpcE1hcmtlcnMpKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsb3NlUmVxdWVzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlUmVxdWVzdC5lbWl0KCk7XG4gIH1cblxuICBwdWJsaWMgb25Gb3JtU3VibWl0KHNoYXJlUGFyYW1ldGVyczogQXNzZXRTaGFyZVBhcmFtZXRlcnMpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzOiBQb2pvID0ge1xuICAgICAgYXNzZXROYW1lOiB0aGlzLmVuaGFuY2VkQXNzZXQuZ2V0TWV0YWRhdGFWYWx1ZUZvcignbmFtZScpLFxuICAgICAgYXNzZXREZXNjcmlwdGlvbjogdGhpcy5lbmhhbmNlZEFzc2V0LmdldE1ldGFkYXRhVmFsdWVGb3IoJ0Rlc2NyaXB0aW9uJyksXG4gICAgICBhc3NldFRodW1ibmFpbFVybDogdGhpcy5lbmhhbmNlZEFzc2V0LnRodW1ibmFpbFVybFxuICAgIH07XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+XG4gICAgICBmYWN0b3J5LnNoYXJpbmcuZW1haWxBc3NldFNoYXJlTGluayh0aGlzLmVuaGFuY2VkQXNzZXQuYXNzZXRJZCwgdGhpcy5zdWJjbGlwTWFya2Vycywgc2hhcmVQYXJhbWV0ZXJzLCBwcm9wZXJ0aWVzKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==
