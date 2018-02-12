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
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
var ProjectActionsComponent = (function () {
    function ProjectActionsComponent() {
        this.allowQuoteAdministration = false;
        this.projectHasRmAssets = false;
        this.rmAssetsHaveAttributes = false;
        this.remove = new core_1.EventEmitter();
        this.edit = new core_1.EventEmitter();
        this.addFee = new core_1.EventEmitter();
        this.bulkImport = new core_1.EventEmitter();
        this.projectActionsNotify = new core_1.EventEmitter();
    }
    ProjectActionsComponent.prototype.onEditButtonClick = function () {
        this.edit.emit();
    };
    ProjectActionsComponent.prototype.onRemoveButtonClick = function () {
        this.remove.emit();
    };
    ProjectActionsComponent.prototype.onAddFeeButtonClick = function () {
        this.addFee.emit();
    };
    ProjectActionsComponent.prototype.editProjectPricing = function () {
        this.projectActionsNotify.emit({ type: 'EDIT_PROJECT_PRICING' });
    };
    Object.defineProperty(ProjectActionsComponent.prototype, "showRightsPricingBtn", {
        get: function () {
            return !commerce_interface_1.quotesWithoutPricing.includes(this.quoteType) && this.projectHasRmAssets;
        },
        enumerable: true,
        configurable: true
    });
    ProjectActionsComponent.prototype.onBulkImportClick = function () {
        this.bulkImport.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectActionsComponent.prototype, "quoteType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProjectActionsComponent.prototype, "allowQuoteAdministration", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProjectActionsComponent.prototype, "projectHasRmAssets", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProjectActionsComponent.prototype, "rmAssetsHaveAttributes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProjectActionsComponent.prototype, "remove", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProjectActionsComponent.prototype, "edit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProjectActionsComponent.prototype, "addFee", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProjectActionsComponent.prototype, "bulkImport", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProjectActionsComponent.prototype, "projectActionsNotify", void 0);
    ProjectActionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-actions-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button\n      mat-button\n      type=\"button\"\n      data-pendo=\"cart-project_pricing-btn\"\n      *ngIf=\"showRightsPricingBtn\"\n      (click)=\"editProjectPricing()\" \n      class=\"is-outlined rights-pkg\"\n      [ngClass]=\"{'select-usage': !rmAssetsHaveAttributes }\">\n      <mat-icon>assignment</mat-icon>\n      {{ 'CART.PROJECTS.EDIT_USAGE_BTN_LABEL' | translate }}\n    </button>\n    <button\n      data-pendo=\"cart-project_options-menu-trigger\"\n      mat-icon-button \n      [mat-menu-trigger-for]=\"projectOptionsMenu\" \n      title=\"{{ 'CART.PROJECTS.MORE_OPTIONS_BTN_TITLE' | translate }}\">\n      <mat-icon>more_vert</mat-icon>\n    </button>\n\n    <mat-menu x-position=\"before\" #projectOptionsMenu=\"matMenu\">\n      <button mat-menu-item (click)=\"onEditButtonClick()\">\n        <mat-icon>edit</mat-icon>{{ 'CART.PROJECTS.EDIT_PROJECT_BTN_TITLE' | translate }}\n      </button>\n      <ng-container *ngIf=\"allowQuoteAdministration\">\n        <button mat-menu-item (click)=\"onAddFeeButtonClick()\">\n          <mat-icon>note_add</mat-icon>{{ 'CART.PROJECTS.ADD_FEE' | translate }}\n        </button>\n        <button mat-menu-item (click)=\"onBulkImportClick()\">\n          <mat-icon>library_add</mat-icon>{{ 'QUOTE.BULK_IMPORT.TITLE' | translate }}\n        </button>\n        <div class=\"divider\"></div>\n      </ng-container>\n      <button\n        mat-menu-item\n        (click)=\"onRemoveButtonClick()\">\n        <mat-icon>delete</mat-icon>{{ 'CART.PROJECTS.DELETE_PROJECT_BTN' | translate }}\n      </button>\n    </mat-menu>\n  "
        })
    ], ProjectActionsComponent);
    return ProjectActionsComponent;
}());
exports.ProjectActionsComponent = ProjectActionsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFDaEcsb0ZBQWtIO0FBK0NsSDtJQTdDQTtRQStDVyw2QkFBd0IsR0FBWSxLQUFLLENBQUM7UUFDMUMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUN2QyxXQUFNLEdBQXVCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2hELFNBQUksR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDOUMsV0FBTSxHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoRCxlQUFVLEdBQXVCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3BELHlCQUFvQixHQUF5QixJQUFJLG1CQUFZLEVBQVUsQ0FBQztJQXlCcEYsQ0FBQztJQXZCUSxtREFBaUIsR0FBeEI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSxxREFBbUIsR0FBMUI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxxREFBbUIsR0FBMUI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxvREFBa0IsR0FBekI7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsc0JBQVcseURBQW9CO2FBQS9CO1lBQ0UsTUFBTSxDQUFDLENBQUMseUNBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDbkYsQ0FBQzs7O09BQUE7SUFFTSxtREFBaUIsR0FBeEI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFoQ1E7UUFBUixZQUFLLEVBQUU7OzhEQUF5QjtJQUN4QjtRQUFSLFlBQUssRUFBRTs7NkVBQTJDO0lBQzFDO1FBQVIsWUFBSyxFQUFFOzt1RUFBcUM7SUFDcEM7UUFBUixZQUFLLEVBQUU7OzJFQUF5QztJQUN2QztRQUFULGFBQU0sRUFBRTtrQ0FBUyxtQkFBWTsyREFBNEI7SUFDaEQ7UUFBVCxhQUFNLEVBQUU7a0NBQU8sbUJBQVk7eURBQTRCO0lBQzlDO1FBQVQsYUFBTSxFQUFFO2tDQUFTLG1CQUFZOzJEQUE0QjtJQUNoRDtRQUFULGFBQU0sRUFBRTtrQ0FBYSxtQkFBWTsrREFBNEI7SUFDcEQ7UUFBVCxhQUFNLEVBQUU7a0NBQXVCLG1CQUFZO3lFQUFzQztJQVR2RSx1QkFBdUI7UUE3Q25DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsaWpEQXVDVDtTQUNGLENBQUM7T0FDVyx1QkFBdUIsQ0FrQ25DO0lBQUQsOEJBQUM7Q0FsQ0QsQUFrQ0MsSUFBQTtBQWxDWSwwREFBdUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL3Byb2plY3QvcHJvamVjdC1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXNzZXRMaW5lSXRlbSwgUHVyY2hhc2VUeXBlLCBxdW90ZXNXaXRob3V0UHJpY2luZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3Byb2plY3QtYWN0aW9ucy1jb21wb25lbnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uXG4gICAgICBtYXQtYnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGRhdGEtcGVuZG89XCJjYXJ0LXByb2plY3RfcHJpY2luZy1idG5cIlxuICAgICAgKm5nSWY9XCJzaG93UmlnaHRzUHJpY2luZ0J0blwiXG4gICAgICAoY2xpY2spPVwiZWRpdFByb2plY3RQcmljaW5nKClcIiBcbiAgICAgIGNsYXNzPVwiaXMtb3V0bGluZWQgcmlnaHRzLXBrZ1wiXG4gICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdC11c2FnZSc6ICFybUFzc2V0c0hhdmVBdHRyaWJ1dGVzIH1cIj5cbiAgICAgIDxtYXQtaWNvbj5hc3NpZ25tZW50PC9tYXQtaWNvbj5cbiAgICAgIHt7ICdDQVJULlBST0pFQ1RTLkVESVRfVVNBR0VfQlROX0xBQkVMJyB8IHRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b25cbiAgICAgIGRhdGEtcGVuZG89XCJjYXJ0LXByb2plY3Rfb3B0aW9ucy1tZW51LXRyaWdnZXJcIlxuICAgICAgbWF0LWljb24tYnV0dG9uIFxuICAgICAgW21hdC1tZW51LXRyaWdnZXItZm9yXT1cInByb2plY3RPcHRpb25zTWVudVwiIFxuICAgICAgdGl0bGU9XCJ7eyAnQ0FSVC5QUk9KRUNUUy5NT1JFX09QVElPTlNfQlROX1RJVExFJyB8IHRyYW5zbGF0ZSB9fVwiPlxuICAgICAgPG1hdC1pY29uPm1vcmVfdmVydDwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgICA8bWF0LW1lbnUgeC1wb3NpdGlvbj1cImJlZm9yZVwiICNwcm9qZWN0T3B0aW9uc01lbnU9XCJtYXRNZW51XCI+XG4gICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cIm9uRWRpdEJ1dHRvbkNsaWNrKClcIj5cbiAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPnt7ICdDQVJULlBST0pFQ1RTLkVESVRfUFJPSkVDVF9CVE5fVElUTEUnIHwgdHJhbnNsYXRlIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhbGxvd1F1b3RlQWRtaW5pc3RyYXRpb25cIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJvbkFkZEZlZUJ1dHRvbkNsaWNrKClcIj5cbiAgICAgICAgICA8bWF0LWljb24+bm90ZV9hZGQ8L21hdC1pY29uPnt7ICdDQVJULlBST0pFQ1RTLkFERF9GRUUnIHwgdHJhbnNsYXRlIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cIm9uQnVsa0ltcG9ydENsaWNrKClcIj5cbiAgICAgICAgICA8bWF0LWljb24+bGlicmFyeV9hZGQ8L21hdC1pY29uPnt7ICdRVU9URS5CVUxLX0lNUE9SVC5USVRMRScgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaXZpZGVyXCI+PC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgbWF0LW1lbnUtaXRlbVxuICAgICAgICAoY2xpY2spPVwib25SZW1vdmVCdXR0b25DbGljaygpXCI+XG4gICAgICAgIDxtYXQtaWNvbj5kZWxldGU8L21hdC1pY29uPnt7ICdDQVJULlBST0pFQ1RTLkRFTEVURV9QUk9KRUNUX0JUTicgfCB0cmFuc2xhdGUgfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbWF0LW1lbnU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdEFjdGlvbnNDb21wb25lbnQge1xuICBASW5wdXQoKSBxdW90ZVR5cGU6IFB1cmNoYXNlVHlwZTtcbiAgQElucHV0KCkgYWxsb3dRdW90ZUFkbWluaXN0cmF0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHByb2plY3RIYXNSbUFzc2V0czogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBybUFzc2V0c0hhdmVBdHRyaWJ1dGVzOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGVkaXQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFkZEZlZTogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYnVsa0ltcG9ydDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHJvamVjdEFjdGlvbnNOb3RpZnk6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XG5cbiAgcHVibGljIG9uRWRpdEJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuZWRpdC5lbWl0KCk7XG4gIH1cblxuICBwdWJsaWMgb25SZW1vdmVCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KCk7XG4gIH1cblxuICBwdWJsaWMgb25BZGRGZWVCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmFkZEZlZS5lbWl0KCk7XG4gIH1cblxuICBwdWJsaWMgZWRpdFByb2plY3RQcmljaW5nKCkge1xuICAgIHRoaXMucHJvamVjdEFjdGlvbnNOb3RpZnkuZW1pdCh7IHR5cGU6ICdFRElUX1BST0pFQ1RfUFJJQ0lORycgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dSaWdodHNQcmljaW5nQnRuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhcXVvdGVzV2l0aG91dFByaWNpbmcuaW5jbHVkZXModGhpcy5xdW90ZVR5cGUpICYmIHRoaXMucHJvamVjdEhhc1JtQXNzZXRzO1xuICB9XG5cbiAgcHVibGljIG9uQnVsa0ltcG9ydENsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuYnVsa0ltcG9ydC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==
