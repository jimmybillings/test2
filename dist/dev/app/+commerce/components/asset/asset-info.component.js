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
var AssetInfoComponent = (function () {
    function AssetInfoComponent() {
    }
    AssetInfoComponent.prototype.translationReady = function (field) {
        return 'assetmetadata.' + field.replace(/\./g, '_');
    };
    AssetInfoComponent.prototype.shouldDisplay = function (meta) {
        return meta.name !== 'Description'
            && meta.name !== 'Format.Duration'
            && meta.name !== 'Format.AspectRatio'
            && meta.name !== 'Resource.Class';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetInfoComponent.prototype, "asset", void 0);
    AssetInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'asset-info-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"mat-caption asset-name\">{{ asset.assetName }}</div>\n    <p class=\"asset-description\">\n      {{ (asset.metadata ? asset.metadata[0].value : '') | slice:0:100 }}\n    </p>\n    <div class=\"cart-asset-metadata mat-caption\">\n      <span *ngFor=\"let meta of asset.metadata\">\n        <ng-container *ngIf=\"shouldDisplay(meta)\">\n          <strong>{{ translationReady(meta.name) | uppercase | translate }}: </strong> {{ meta.value | slice:0:80 }}\n        </ng-container>\n      </span>\n    </div>\n  "
        })
    ], AssetInfoComponent);
    return AssetInfoComponent;
}());
exports.AssetInfoComponent = AssetInfoComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9hc3NldC9hc3NldC1pbmZvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEwRTtBQW9CMUU7SUFBQTtJQWNBLENBQUM7SUFYUSw2Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBVTtRQUNoQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUdNLDBDQUFhLEdBQXBCLFVBQXFCLElBQVM7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYTtlQUM3QixJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQjtlQUMvQixJQUFJLENBQUMsSUFBSSxLQUFLLG9CQUFvQjtlQUNsQyxJQUFJLENBQUMsSUFBSSxLQUFLLGdCQUFnQixDQUFDO0lBQ3RDLENBQUM7SUFaUTtRQUFSLFlBQUssRUFBRTs7cURBQVk7SUFEVCxrQkFBa0I7UUFsQjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsZ2hCQVlUO1NBQ0YsQ0FBQztPQUNXLGtCQUFrQixDQWM5QjtJQUFELHlCQUFDO0NBZEQsQUFjQyxJQUFBO0FBZFksZ0RBQWtCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9hc3NldC9hc3NldC1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2Fzc2V0LWluZm8tY29tcG9uZW50JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm1hdC1jYXB0aW9uIGFzc2V0LW5hbWVcIj57eyBhc3NldC5hc3NldE5hbWUgfX08L2Rpdj5cbiAgICA8cCBjbGFzcz1cImFzc2V0LWRlc2NyaXB0aW9uXCI+XG4gICAgICB7eyAoYXNzZXQubWV0YWRhdGEgPyBhc3NldC5tZXRhZGF0YVswXS52YWx1ZSA6ICcnKSB8IHNsaWNlOjA6MTAwIH19XG4gICAgPC9wPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJ0LWFzc2V0LW1ldGFkYXRhIG1hdC1jYXB0aW9uXCI+XG4gICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgbWV0YSBvZiBhc3NldC5tZXRhZGF0YVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvdWxkRGlzcGxheShtZXRhKVwiPlxuICAgICAgICAgIDxzdHJvbmc+e3sgdHJhbnNsYXRpb25SZWFkeShtZXRhLm5hbWUpIHwgdXBwZXJjYXNlIHwgdHJhbnNsYXRlIH19OiA8L3N0cm9uZz4ge3sgbWV0YS52YWx1ZSB8IHNsaWNlOjA6ODAgfX1cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQXNzZXRJbmZvQ29tcG9uZW50IHtcbiAgQElucHV0KCkgYXNzZXQ6IGFueTtcblxuICBwdWJsaWMgdHJhbnNsYXRpb25SZWFkeShmaWVsZDogYW55KSB7XG4gICAgcmV0dXJuICdhc3NldG1ldGFkYXRhLicgKyBmaWVsZC5yZXBsYWNlKC9cXC4vZywgJ18nKTtcbiAgfVxuXG4gIC8vIFRoaXMgc2hvdWxkIGJlIGRldGVybWluZWQgYnkgY29uZmlnLCBsZXQncyBmaXggaXQgYXNhcFxuICBwdWJsaWMgc2hvdWxkRGlzcGxheShtZXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWV0YS5uYW1lICE9PSAnRGVzY3JpcHRpb24nXG4gICAgICAmJiBtZXRhLm5hbWUgIT09ICdGb3JtYXQuRHVyYXRpb24nXG4gICAgICAmJiBtZXRhLm5hbWUgIT09ICdGb3JtYXQuQXNwZWN0UmF0aW8nXG4gICAgICAmJiBtZXRhLm5hbWUgIT09ICdSZXNvdXJjZS5DbGFzcyc7XG4gIH1cbn1cbiJdfQ==
