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
var app_store_1 = require("../../../app.store");
var CartAssetComponent = (function () {
    function CartAssetComponent(store) {
        this.store = store;
    }
    CartAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cartComment.config.form.items; });
    };
    CartAssetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cart-asset',
            template: "\n    <asset-component\n      [assetType]=\"'cart'\"\n      [commentFormConfig]=\"commentFormConfig\">\n    </asset-component>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], CartAssetComponent);
    return CartAssetComponent;
}());
exports.CartAssetComponent = CartAssetComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy9jYXJ0LWFzc2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyRTtBQUszRSxnREFBOEM7QUFhOUM7SUFHRSw0QkFBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBSSxDQUFDO0lBRWpDLHFDQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQXZELENBQXVELENBQUMsQ0FBQztJQUN2SCxDQUFDO0lBUFUsa0JBQWtCO1FBWDlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLG9JQUtUO1lBQ0QsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FJMkIsb0JBQVE7T0FIeEIsa0JBQWtCLENBUTlCO0lBQUQseUJBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSxnREFBa0IiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rY2FydC9jb21wb25lbnRzL2NhcnQtYXNzZXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN0YXRlTWFwcGVyIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY2FydC1hc3NldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGFzc2V0LWNvbXBvbmVudFxuICAgICAgW2Fzc2V0VHlwZV09XCInY2FydCdcIlxuICAgICAgW2NvbW1lbnRGb3JtQ29uZmlnXT1cImNvbW1lbnRGb3JtQ29uZmlnXCI+XG4gICAgPC9hc3NldC1jb21wb25lbnQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhcnRBc3NldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBjb21tZW50Rm9ybUNvbmZpZzogRm9ybUZpZWxkcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29tbWVudEZvcm1Db25maWcgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMuY2FydENvbW1lbnQuY29uZmlnLmZvcm0uaXRlbXMpO1xuICB9XG59XG4iXX0=
