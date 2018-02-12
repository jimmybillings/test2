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
var LineItemRightsComponent = (function () {
    function LineItemRightsComponent() {
        this.readOnly = false;
        this.displayRmAttributes = true;
        this.showPricingDialog = new core_1.EventEmitter();
    }
    LineItemRightsComponent.prototype.attributeName = function (attribute) {
        return attribute.priceAttributeDisplayName || attribute.priceAttributeName;
    };
    LineItemRightsComponent.prototype.attributeValue = function (attribute) {
        return attribute.selectedAttributeName || attribute.selectedAttributeValue;
    };
    Object.defineProperty(LineItemRightsComponent.prototype, "rightsManagedDisplayUsage", {
        get: function () {
            return this.rightsManaged === 'Rights Managed' && this.displayRmAttributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemRightsComponent.prototype, "rightsManagedWithoutUsage", {
        get: function () {
            return this.rightsManaged === 'Rights Managed' && !this.displayRmAttributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemRightsComponent.prototype, "rightsRoyaltyFree", {
        get: function () {
            return this.rightsManaged === 'Royalty Free';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LineItemRightsComponent.prototype, "rights", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LineItemRightsComponent.prototype, "rightsManaged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemRightsComponent.prototype, "hasAttributes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemRightsComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemRightsComponent.prototype, "displayRmAttributes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemRightsComponent.prototype, "showPricingDialog", void 0);
    LineItemRightsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'line-item-rights-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n  <ng-container *ngIf=\"rightsManagedWithoutUsage\">\n    <section class=\"read-only\">\n      <header class=\"rights-managed\">{{rightsManaged}}</header>\n    </section>\n  </ng-container>\n\n  <ng-container *ngIf=\"rightsManagedDisplayUsage\">\n    <section\n      data-pendo=\"cart-lineitem_pricing-btn\"\n      [ngClass]=\"{'read-only': readOnly, 'needs-rights': !hasAttributes}\"\n      (click)=\"showPricingDialog.emit()\">\n      <ng-container>\n        <header>{{'QUOTE.RIGHTS_PACKAGE_TITLE' | translate}}</header>\n        <span *ngIf=\"!hasAttributes\" class=\"cart-asset-metadata mat-caption\">\n          <strong>{{'QUOTE.RIGHTS_PACKAGE_NOT_SELECTED_MSG' | translate}}</strong>\n        </span>\n      </ng-container>\n      <ng-container *ngIf=\"displayRmAttributes\">\n        <span *ngFor=\"let right of rights\" class=\"cart-asset-metadata mat-caption\">\n        <strong>{{attributeName(right)}}: </strong> {{attributeValue(right)}}\n        </span>\n      </ng-container>\n    </section>\n  </ng-container>\n\n  <ng-container *ngIf=\"rightsRoyaltyFree\">\n    <section class=\"read-only\">\n      <header class=\"royalty-free\">{{rightsManaged}}</header>\n    </section>\n  </ng-container>\n\n  "
        })
    ], LineItemRightsComponent);
    return LineItemRightsComponent;
}());
exports.LineItemRightsComponent = LineItemRightsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtLXJpZ2h0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUEwQ2hHO0lBdkNBO1FBMkNXLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBQ25DLHNCQUFpQixHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQXFCdkUsQ0FBQztJQW5CUSwrQ0FBYSxHQUFwQixVQUFxQixTQUFpQztRQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLHlCQUF5QixJQUFJLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztJQUM3RSxDQUFDO0lBRU0sZ0RBQWMsR0FBckIsVUFBc0IsU0FBaUM7UUFDckQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsSUFBSSxTQUFTLENBQUMsc0JBQXNCLENBQUM7SUFDN0UsQ0FBQztJQUVELHNCQUFXLDhEQUF5QjthQUFwQztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGdCQUFnQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUM3RSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDhEQUF5QjthQUFwQztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQzlFLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0RBQWlCO2FBQTVCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssY0FBYyxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBekJRO1FBQVIsWUFBSyxFQUFFO2tDQUFTLEtBQUs7MkRBQXlCO0lBQ3RDO1FBQVIsWUFBSyxFQUFFOztrRUFBdUI7SUFDdEI7UUFBUixZQUFLLEVBQUU7O2tFQUF3QjtJQUN2QjtRQUFSLFlBQUssRUFBRTs7NkRBQTJCO0lBQzFCO1FBQVIsWUFBSyxFQUFFOzt3RUFBcUM7SUFDbkM7UUFBVCxhQUFNLEVBQUU7a0NBQW9CLG1CQUFZO3NFQUE0QjtJQU4xRCx1QkFBdUI7UUF2Q25DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQ04saXNDQWdDRDtTQUNGLENBQUM7T0FDVyx1QkFBdUIsQ0EyQm5DO0lBQUQsOEJBQUM7Q0EzQkQsQUEyQkMsSUFBQTtBQTNCWSwwREFBdUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2xpbmUtaXRlbS9saW5lLWl0ZW0tcmlnaHRzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXNzZXRMaW5lSXRlbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWxlY3RlZFByaWNlQXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdsaW5lLWl0ZW0tcmlnaHRzLWNvbXBvbmVudCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTpcbiAgICBgXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJyaWdodHNNYW5hZ2VkV2l0aG91dFVzYWdlXCI+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJyZWFkLW9ubHlcIj5cbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJyaWdodHMtbWFuYWdlZFwiPnt7cmlnaHRzTWFuYWdlZH19PC9oZWFkZXI+XG4gICAgPC9zZWN0aW9uPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwicmlnaHRzTWFuYWdlZERpc3BsYXlVc2FnZVwiPlxuICAgIDxzZWN0aW9uXG4gICAgICBkYXRhLXBlbmRvPVwiY2FydC1saW5laXRlbV9wcmljaW5nLWJ0blwiXG4gICAgICBbbmdDbGFzc109XCJ7J3JlYWQtb25seSc6IHJlYWRPbmx5LCAnbmVlZHMtcmlnaHRzJzogIWhhc0F0dHJpYnV0ZXN9XCJcbiAgICAgIChjbGljayk9XCJzaG93UHJpY2luZ0RpYWxvZy5lbWl0KClcIj5cbiAgICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgIDxoZWFkZXI+e3snUVVPVEUuUklHSFRTX1BBQ0tBR0VfVElUTEUnIHwgdHJhbnNsYXRlfX08L2hlYWRlcj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhaGFzQXR0cmlidXRlc1wiIGNsYXNzPVwiY2FydC1hc3NldC1tZXRhZGF0YSBtYXQtY2FwdGlvblwiPlxuICAgICAgICAgIDxzdHJvbmc+e3snUVVPVEUuUklHSFRTX1BBQ0tBR0VfTk9UX1NFTEVDVEVEX01TRycgfCB0cmFuc2xhdGV9fTwvc3Ryb25nPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5Um1BdHRyaWJ1dGVzXCI+XG4gICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCByaWdodCBvZiByaWdodHNcIiBjbGFzcz1cImNhcnQtYXNzZXQtbWV0YWRhdGEgbWF0LWNhcHRpb25cIj5cbiAgICAgICAgPHN0cm9uZz57e2F0dHJpYnV0ZU5hbWUocmlnaHQpfX06IDwvc3Ryb25nPiB7e2F0dHJpYnV0ZVZhbHVlKHJpZ2h0KX19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvc2VjdGlvbj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJpZ2h0c1JveWFsdHlGcmVlXCI+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJyZWFkLW9ubHlcIj5cbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJyb3lhbHR5LWZyZWVcIj57e3JpZ2h0c01hbmFnZWR9fTwvaGVhZGVyPlxuICAgIDwvc2VjdGlvbj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBMaW5lSXRlbVJpZ2h0c0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHJpZ2h0czogQXJyYXk8U2VsZWN0ZWRQcmljZUF0dHJpYnV0ZT47XG4gIEBJbnB1dCgpIHJpZ2h0c01hbmFnZWQ6IHN0cmluZztcbiAgQElucHV0KCkgaGFzQXR0cmlidXRlczogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzcGxheVJtQXR0cmlidXRlczogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSBzaG93UHJpY2luZ0RpYWxvZzogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBhdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZTogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZS5wcmljZUF0dHJpYnV0ZURpc3BsYXlOYW1lIHx8IGF0dHJpYnV0ZS5wcmljZUF0dHJpYnV0ZU5hbWU7XG4gIH1cblxuICBwdWJsaWMgYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlOiBTZWxlY3RlZFByaWNlQXR0cmlidXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYXR0cmlidXRlLnNlbGVjdGVkQXR0cmlidXRlTmFtZSB8fCBhdHRyaWJ1dGUuc2VsZWN0ZWRBdHRyaWJ1dGVWYWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmlnaHRzTWFuYWdlZERpc3BsYXlVc2FnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodHNNYW5hZ2VkID09PSAnUmlnaHRzIE1hbmFnZWQnICYmIHRoaXMuZGlzcGxheVJtQXR0cmlidXRlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmlnaHRzTWFuYWdlZFdpdGhvdXRVc2FnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodHNNYW5hZ2VkID09PSAnUmlnaHRzIE1hbmFnZWQnICYmICF0aGlzLmRpc3BsYXlSbUF0dHJpYnV0ZXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJpZ2h0c1JveWFsdHlGcmVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0c01hbmFnZWQgPT09ICdSb3lhbHR5IEZyZWUnO1xuICB9XG59XG4iXX0=
