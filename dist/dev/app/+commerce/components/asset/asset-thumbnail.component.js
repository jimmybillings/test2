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
var enhanced_asset_1 = require("../../../shared/interfaces/enhanced-asset");
var AssetThumbnailComponent = (function () {
    function AssetThumbnailComponent() {
    }
    Object.defineProperty(AssetThumbnailComponent.prototype, "asset", {
        set: function (asset) {
            this.enhancedAsset = asset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetThumbnailComponent.prototype, "routerLink", {
        get: function () {
            return this.enhancedAsset.routerLink;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetThumbnailComponent.prototype, "durationFrame", {
        get: function () {
            return this.enhancedAsset.subclipDurationFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetThumbnailComponent.prototype, "isImage", {
        get: function () {
            return this.enhancedAsset.isImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetThumbnailComponent.prototype, "thumbnailUrl", {
        get: function () {
            return this.enhancedAsset.thumbnailUrl;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", enhanced_asset_1.EnhancedAsset),
        __metadata("design:paramtypes", [enhanced_asset_1.EnhancedAsset])
    ], AssetThumbnailComponent.prototype, "asset", null);
    AssetThumbnailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'asset-thumbnail-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <a [routerLink]=\"routerLink\">\n      <div class=\"cart-asset-thb\">\n        <span class=\"asset-duration\">\n          <span>{{ durationFrame | timecode }}</span>\n        </span>\n        <span *ngIf=\"isImage\" class=\"indicate-photo\">\n          <span class=\"image\"></span>\n        </span>\n        <img src=\"{{ thumbnailUrl }}\"/>\n      </div>\n    </a>\n  "
        })
    ], AssetThumbnailComponent);
    return AssetThumbnailComponent;
}());
exports.AssetThumbnailComponent = AssetThumbnailComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9hc3NldC9hc3NldC10aHVtYm5haWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBFO0FBRTFFLDRFQUEwRTtBQW9CMUU7SUFBQTtJQXNCQSxDQUFDO0lBbkJVLHNCQUFXLDBDQUFLO2FBQWhCLFVBQWlCLEtBQW9CO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0NBQVU7YUFBckI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrREFBYTthQUF4QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBQ2pELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNENBQU87YUFBbEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxpREFBWTthQUF2QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQWxCUTtRQUFSLFlBQUssRUFBRTtrQ0FBeUIsOEJBQWE7eUNBQWIsOEJBQWE7d0RBRTdDO0lBTFUsdUJBQXVCO1FBbEJuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLDBYQVlUO1NBQ0YsQ0FBQztPQUNXLHVCQUF1QixDQXNCbkM7SUFBRCw4QkFBQztDQXRCRCxBQXNCQyxJQUFBO0FBdEJZLDBEQUF1QiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlL2NvbXBvbmVudHMvYXNzZXQvYXNzZXQtdGh1bWJuYWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2R1bGVzL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhc3NldC10aHVtYm5haWwtY29tcG9uZW50JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGEgW3JvdXRlckxpbmtdPVwicm91dGVyTGlua1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcnQtYXNzZXQtdGhiXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXNzZXQtZHVyYXRpb25cIj5cbiAgICAgICAgICA8c3Bhbj57eyBkdXJhdGlvbkZyYW1lIHwgdGltZWNvZGUgfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0ltYWdlXCIgY2xhc3M9XCJpbmRpY2F0ZS1waG90b1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW1hZ2VcIj48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPGltZyBzcmM9XCJ7eyB0aHVtYm5haWxVcmwgfX1cIi8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2E+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRUaHVtYm5haWxDb21wb25lbnQge1xuICBwcml2YXRlIGVuaGFuY2VkQXNzZXQ6IEVuaGFuY2VkQXNzZXQ7XG5cbiAgQElucHV0KCkgcHVibGljIHNldCBhc3NldChhc3NldDogRW5oYW5jZWRBc3NldCkge1xuICAgIHRoaXMuZW5oYW5jZWRBc3NldCA9IGFzc2V0O1xuICB9XG5cbiAgcHVibGljIGdldCByb3V0ZXJMaW5rKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5lbmhhbmNlZEFzc2V0LnJvdXRlckxpbms7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGR1cmF0aW9uRnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLmVuaGFuY2VkQXNzZXQuc3ViY2xpcER1cmF0aW9uRnJhbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzSW1hZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRBc3NldC5pc0ltYWdlO1xuICB9XG5cbiAgcHVibGljIGdldCB0aHVtYm5haWxVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lbmhhbmNlZEFzc2V0LnRodW1ibmFpbFVybDtcbiAgfVxufVxuIl19
