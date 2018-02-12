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
var AssetSubclipDisplayComponent = (function () {
    function AssetSubclipDisplayComponent() {
    }
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "asset", {
        set: function (asset) {
            this.enhancedAsset = asset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "isSubclipped", {
        get: function () {
            return this.enhancedAsset.isSubclipped;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "subclipSegmentStyles", {
        get: function () {
            return {
                'margin-left.%': this.enhancedAsset.inMarkerPercentage,
                'width.%': this.enhancedAsset.subclipDurationPercentage,
                'min-width.px': 2
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "inMarkerFrame", {
        get: function () {
            return this.enhancedAsset.inMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "outMarkerFrame", {
        get: function () {
            return this.enhancedAsset.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "subclipDurationFrame", {
        get: function () {
            return this.enhancedAsset.subclipDurationFrame;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", enhanced_asset_1.EnhancedAsset),
        __metadata("design:paramtypes", [enhanced_asset_1.EnhancedAsset])
    ], AssetSubclipDisplayComponent.prototype, "asset", null);
    AssetSubclipDisplayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'asset-subclip-display-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div *ngIf=\"isSubclipped\" class=\"asset-sub-clip mat-caption\">\n      <strong>{{ 'COLLECTION.SHOW.SUB_CLIPPING_LABEL' | translate }}</strong>\n      <div class=\"subclip-timeline\">\n        <span class=\"subclip-segment\" [ngStyle]=\"subclipSegmentStyles\"></span>\n      </div>\n      <ul class=\"subclip-data\" layout=\"row\" hide-sm>\n        <li flex-gt-sm=\"30\" flex-gt-md=\"25\" flex=\"35\">\n          <strong>{{ 'COLLECTION.SHOW.START_TIME_LABEL' | translate }}</strong>\n          {{ inMarkerFrame | timecode }}\n        </li>\n        <li flex=\"none\">\n          <strong>{{ 'COLLECTION.SHOW.END_TIME_LABEL' | translate }} </strong>\n          {{ outMarkerFrame | timecode }}\n        </li>\n        <li flex=\"\" layout-align=\"end center\">\n          <strong>{{ 'COLLECTION.SHOW.SUB_CLIP_LENGTH_LABEL' | translate }}</strong>\n          {{ subclipDurationFrame | timecode }}\n        </li>\n      </ul>\n    </div>\n  "
        })
    ], AssetSubclipDisplayComponent);
    return AssetSubclipDisplayComponent;
}());
exports.AssetSubclipDisplayComponent = AssetSubclipDisplayComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9hc3NldC9hc3NldC1zdWJjbGlwLWRpc3BsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBFO0FBRTFFLDRFQUEwRTtBQTZCMUU7SUFBQTtJQThCQSxDQUFDO0lBM0JVLHNCQUFXLCtDQUFLO2FBQWhCLFVBQWlCLEtBQW9CO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0RBQVk7YUFBdkI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4REFBb0I7YUFBL0I7WUFDRSxNQUFNLENBQUM7Z0JBQ0wsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCO2dCQUN0RCxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUI7Z0JBQ3ZELGNBQWMsRUFBRSxDQUFDO2FBQ2xCLENBQUM7UUFDSixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHVEQUFhO2FBQXhCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsd0RBQWM7YUFBekI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4REFBb0I7YUFBL0I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQTFCUTtRQUFSLFlBQUssRUFBRTtrQ0FBeUIsOEJBQWE7eUNBQWIsOEJBQWE7NkRBRTdDO0lBTFUsNEJBQTRCO1FBM0J4QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxpQ0FBaUM7WUFDM0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLGk3QkFxQlQ7U0FDRixDQUFDO09BQ1csNEJBQTRCLENBOEJ4QztJQUFELG1DQUFDO0NBOUJELEFBOEJDLElBQUE7QUE5Qlksb0VBQTRCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9hc3NldC9hc3NldC1zdWJjbGlwLWRpc3BsYXkuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZyYW1lLCBUaW1lY29kZUZvcm1hdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2R1bGVzL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhc3NldC1zdWJjbGlwLWRpc3BsYXktY29tcG9uZW50JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cImlzU3ViY2xpcHBlZFwiIGNsYXNzPVwiYXNzZXQtc3ViLWNsaXAgbWF0LWNhcHRpb25cIj5cbiAgICAgIDxzdHJvbmc+e3sgJ0NPTExFQ1RJT04uU0hPVy5TVUJfQ0xJUFBJTkdfTEFCRUwnIHwgdHJhbnNsYXRlIH19PC9zdHJvbmc+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ViY2xpcC10aW1lbGluZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInN1YmNsaXAtc2VnbWVudFwiIFtuZ1N0eWxlXT1cInN1YmNsaXBTZWdtZW50U3R5bGVzXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8dWwgY2xhc3M9XCJzdWJjbGlwLWRhdGFcIiBsYXlvdXQ9XCJyb3dcIiBoaWRlLXNtPlxuICAgICAgICA8bGkgZmxleC1ndC1zbT1cIjMwXCIgZmxleC1ndC1tZD1cIjI1XCIgZmxleD1cIjM1XCI+XG4gICAgICAgICAgPHN0cm9uZz57eyAnQ09MTEVDVElPTi5TSE9XLlNUQVJUX1RJTUVfTEFCRUwnIHwgdHJhbnNsYXRlIH19PC9zdHJvbmc+XG4gICAgICAgICAge3sgaW5NYXJrZXJGcmFtZSB8IHRpbWVjb2RlIH19XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaSBmbGV4PVwibm9uZVwiPlxuICAgICAgICAgIDxzdHJvbmc+e3sgJ0NPTExFQ1RJT04uU0hPVy5FTkRfVElNRV9MQUJFTCcgfCB0cmFuc2xhdGUgfX0gPC9zdHJvbmc+XG4gICAgICAgICAge3sgb3V0TWFya2VyRnJhbWUgfCB0aW1lY29kZSB9fVxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGkgZmxleD1cIlwiIGxheW91dC1hbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgICA8c3Ryb25nPnt7ICdDT0xMRUNUSU9OLlNIT1cuU1VCX0NMSVBfTEVOR1RIX0xBQkVMJyB8IHRyYW5zbGF0ZSB9fTwvc3Ryb25nPlxuICAgICAgICAgIHt7IHN1YmNsaXBEdXJhdGlvbkZyYW1lIHwgdGltZWNvZGUgfX1cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRTdWJjbGlwRGlzcGxheUNvbXBvbmVudCB7XG4gIHByaXZhdGUgZW5oYW5jZWRBc3NldDogRW5oYW5jZWRBc3NldDtcblxuICBASW5wdXQoKSBwdWJsaWMgc2V0IGFzc2V0KGFzc2V0OiBFbmhhbmNlZEFzc2V0KSB7XG4gICAgdGhpcy5lbmhhbmNlZEFzc2V0ID0gYXNzZXQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzU3ViY2xpcHBlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lbmhhbmNlZEFzc2V0LmlzU3ViY2xpcHBlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3ViY2xpcFNlZ21lbnRTdHlsZXMoKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ21hcmdpbi1sZWZ0LiUnOiB0aGlzLmVuaGFuY2VkQXNzZXQuaW5NYXJrZXJQZXJjZW50YWdlLFxuICAgICAgJ3dpZHRoLiUnOiB0aGlzLmVuaGFuY2VkQXNzZXQuc3ViY2xpcER1cmF0aW9uUGVyY2VudGFnZSxcbiAgICAgICdtaW4td2lkdGgucHgnOiAyXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaW5NYXJrZXJGcmFtZSgpOiBGcmFtZSB7XG4gICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRBc3NldC5pbk1hcmtlckZyYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBvdXRNYXJrZXJGcmFtZSgpOiBGcmFtZSB7XG4gICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRBc3NldC5vdXRNYXJrZXJGcmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3ViY2xpcER1cmF0aW9uRnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLmVuaGFuY2VkQXNzZXQuc3ViY2xpcER1cmF0aW9uRnJhbWU7XG4gIH1cbn1cbiJdfQ==
