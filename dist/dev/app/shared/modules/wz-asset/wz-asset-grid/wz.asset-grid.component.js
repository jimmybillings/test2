"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var wz_asset_1 = require("../wz-asset");
var app_store_1 = require("../../../../app.store");
var WzAssetGridComponent = (function (_super) {
    __extends(WzAssetGridComponent, _super);
    function WzAssetGridComponent(store, detector) {
        return _super.call(this, store, detector) || this;
    }
    WzAssetGridComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-asset-grid',
            templateUrl: 'wz.asset-grid.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore, core_1.ChangeDetectorRef])
    ], WzAssetGridComponent);
    return WzAssetGridComponent;
}(wz_asset_1.WzAsset));
exports.WzAssetGridComponent = WzAssetGridComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1hc3NldC93ei1hc3NldC1ncmlkL3d6LmFzc2V0LWdyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFzRjtBQUN0Rix3Q0FBc0M7QUFDdEMsbURBQWlEO0FBUWpEO0lBQTBDLHdDQUFPO0lBQy9DLDhCQUFZLEtBQWUsRUFBRSxRQUEyQjtlQUN0RCxrQkFBTSxLQUFLLEVBQUUsUUFBUSxDQUFDO0lBQ3hCLENBQUM7SUFIVSxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsb0JBQW9CO1lBQ2pDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBRW1CLG9CQUFRLEVBQVksd0JBQWlCO09BRDdDLG9CQUFvQixDQUloQztJQUFELDJCQUFDO0NBSkQsQUFJQyxDQUp5QyxrQkFBTyxHQUloRDtBQUpZLG9EQUFvQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otYXNzZXQvd3otYXNzZXQtZ3JpZC93ei5hc3NldC1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXekFzc2V0IH0gZnJvbSAnLi4vd3otYXNzZXQnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1hc3NldC1ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5hc3NldC1ncmlkLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBXekFzc2V0R3JpZENvbXBvbmVudCBleHRlbmRzIFd6QXNzZXQge1xuICBjb25zdHJ1Y3RvcihzdG9yZTogQXBwU3RvcmUsIGRldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKHN0b3JlLCBkZXRlY3Rvcik7XG4gIH1cbn1cbiJdfQ==
