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
var LineItemActionsComponent = (function () {
    function LineItemActionsComponent() {
        this.showPricingDialog = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
        this.clone = new core_1.EventEmitter();
        this.moveTo = new core_1.EventEmitter();
        this.editMarkers = new core_1.EventEmitter();
        this.openCostMultiplierForm = new core_1.EventEmitter();
        this.removeCostMultiplier = new core_1.EventEmitter();
        this.addCustomPrice = new core_1.EventEmitter();
        this.addNote = new core_1.EventEmitter();
    }
    Object.defineProperty(LineItemActionsComponent.prototype, "displayPriceButton", {
        get: function () {
            return this.rightsReproduction === 'Rights Managed' && !commerce_interface_1.quotesWithoutPricing.includes(this.quoteType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemActionsComponent.prototype, "needsAttributes", {
        get: function () {
            return this.rightsReproduction === 'Rights Managed' && !this.hasAttributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemActionsComponent.prototype, "shouldShowSubclipButton", {
        get: function () {
            return this.userCanCreateSubclips && this.otherProjectsExist;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemActionsComponent.prototype, "otherProjectsExist", {
        get: function () {
            return this.otherProjects.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemActionsComponent.prototype, "trStringForSubclipping", {
        get: function () {
            return this.assetIsSubclipped
                ? 'COLLECTION.SHOW.ASSET_MORE_MENU.EDIT_SUBCLIPPING'
                : 'COLLECTION.SHOW.ASSET_MORE_MENU.ADD_SUBCLIPPING';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemActionsComponent.prototype, "trStringForCostMultiplier", {
        get: function () {
            return this.hasMultiplier
                ? 'QUOTE.EDIT_MULTIPLIER_TITLE'
                : 'QUOTE.ADD_MULTIPLIER_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemActionsComponent.prototype, "trStringForRightsPackage", {
        get: function () {
            return this.hasAttributes
                ? 'QUOTE.EDIT_RIGHTS_PACKAGE_TITLE'
                : 'QUOTE.ADD_RIGHTS_PACKAGE_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineItemActionsComponent.prototype, "showDeleteCostMultiplierBtn", {
        get: function () {
            return this.userCanAdministerQuotes && this.hasMultiplier;
        },
        enumerable: true,
        configurable: true
    });
    LineItemActionsComponent.prototype.onClickAddCustomPrice = function () {
        this.addCustomPrice.emit();
    };
    Object.defineProperty(LineItemActionsComponent.prototype, "trStringForNoteButton", {
        get: function () {
            return this.hasNote ? 'QUOTE.EDIT_NOTE' : 'QUOTE.ADD_NOTE';
        },
        enumerable: true,
        configurable: true
    });
    LineItemActionsComponent.prototype.openNotesForm = function () {
        this.addNote.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LineItemActionsComponent.prototype, "rightsReproduction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemActionsComponent.prototype, "hasAttributes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LineItemActionsComponent.prototype, "otherProjects", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemActionsComponent.prototype, "userCanCreateSubclips", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemActionsComponent.prototype, "userCanAdministerQuotes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemActionsComponent.prototype, "assetIsSubclipped", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LineItemActionsComponent.prototype, "quoteType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemActionsComponent.prototype, "hasMultiplier", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemActionsComponent.prototype, "hasNote", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "showPricingDialog", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "remove", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "clone", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "moveTo", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "editMarkers", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "openCostMultiplierForm", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "removeCostMultiplier", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "addCustomPrice", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemActionsComponent.prototype, "addNote", void 0);
    LineItemActionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'line-item-actions-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"tools\" flex=\"100\">\n      <button \n        mat-icon-button\n        (click)=\"remove.emit()\"\n        title=\"{{ 'CART.PROJECTS.REMOVE_ASSET_BTN_HOVER' | translate }}\">\n          <mat-icon>remove_circle</mat-icon>\n        </button>\n      <button\n        data-pendo=\"cart-lineitem_options-menu-trigger\"\n        mat-icon-button\n        [mat-menu-trigger-for]=\"lineItemOptionsMenu\"\n        title=\"{{ 'CART.PROJECTS.MORE_OPTIONS_BTN_HOVER' | translate }}\">\n          <mat-icon>more_vert</mat-icon>\n      </button>\n    </div>\n\n    <mat-menu x-position=\"before\" #lineItemOptionsMenu=\"matMenu\">\n      <button mat-menu-item (click)=\"clone.emit()\">\n        <mat-icon>layers</mat-icon>{{ 'CART.PROJECTS.DUPLICATE_ASSET_BTN_LABEL' | translate }}\n      </button>\n      <div class=\"divider\" *ngIf=\"otherProjectsExist\"></div>\n      <button mat-menu-item *ngFor=\"let otherProject of otherProjects\" (click)=\"moveTo.emit(otherProject)\">\n        <mat-icon>swap_vert_circle</mat-icon>\n        {{ 'CART.PROJECTS.MOVE_TO' | translate:{projectName: otherProject.name} | slice:0:28 }}\n      </button>\n      <div class=\"divider\" *ngIf=\"shouldShowSubclipButton\"></div>\n      <button mat-menu-item (click)=\"editMarkers.emit()\" *ngIf=\"userCanCreateSubclips\">\n        <mat-icon>access_time</mat-icon>\n        <span>{{ trStringForSubclipping | translate }}</span>\n      </button>\n      <button mat-menu-item \n        *ngIf=\"displayPriceButton\"\n        (click)=\"showPricingDialog.emit()\"\n        [ngClass]=\"{'select-usage': needsAttributes }\">\n        <mat-icon>assignment</mat-icon>\n        <span>{{ trStringForRightsPackage | translate }}</span>\n      </button>\n      <button\n        mat-menu-item\n        (click)=\"openNotesForm()\">\n        <mat-icon>note_add</mat-icon>\n        <span>{{ trStringForNoteButton | translate }}</span>\n      </button>\n      <div *ngIf=\"userCanAdministerQuotes\" class=\"divider\"></div>\n      <button mat-menu-item (click)=\"openCostMultiplierForm.emit()\" *ngIf=\"userCanAdministerQuotes\">\n        <mat-icon>attach_money</mat-icon>\n        <span>{{ trStringForCostMultiplier | translate }}</span>\n      </button>\n      <button mat-menu-item (click)=\"removeCostMultiplier.emit()\" *ngIf=\"showDeleteCostMultiplierBtn\">\n        <mat-icon>remove_circle</mat-icon>\n        <span>{{ 'QUOTE.REMOVE_MULTIPLIER' | translate }}</span>\n      </button>\n      <button mat-menu-item (click)=\"onClickAddCustomPrice()\" *ngIf=\"userCanAdministerQuotes\">\n        <mat-icon>monetization_on</mat-icon>\n        <span>{{ 'QUOTE.ADD_CUSTOM_PRICE_TITLE' | translate }}</span>\n      </button>\n    </mat-menu>\n  "
        })
    ], LineItemActionsComponent);
    return LineItemActionsComponent;
}());
exports.LineItemActionsComponent = LineItemActionsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtLWFjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBQ2hHLG9GQUFtRztBQWtFbkc7SUFoRUE7UUEwRVksc0JBQWlCLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzFELFdBQU0sR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDL0MsVUFBSyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM5QyxXQUFNLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQy9DLGdCQUFXLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3BELDJCQUFzQixHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoRSx5QkFBb0IsR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDOUQsbUJBQWMsR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDeEQsWUFBTyxHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQW1EN0QsQ0FBQztJQWpEQyxzQkFBVyx3REFBa0I7YUFBN0I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixLQUFLLGdCQUFnQixJQUFJLENBQUMseUNBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHFEQUFlO2FBQTFCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDN0UsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw2REFBdUI7YUFBbEM7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUMvRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdEQUFrQjthQUE3QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0REFBc0I7YUFBakM7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtnQkFDM0IsQ0FBQyxDQUFDLGtEQUFrRDtnQkFDcEQsQ0FBQyxDQUFDLGlEQUFpRCxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0RBQXlCO2FBQXBDO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhO2dCQUN2QixDQUFDLENBQUMsNkJBQTZCO2dCQUMvQixDQUFDLENBQUMsNEJBQTRCLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4REFBd0I7YUFBbkM7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWE7Z0JBQ3ZCLENBQUMsQ0FBQyxpQ0FBaUM7Z0JBQ25DLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlFQUEyQjthQUF0QztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1RCxDQUFDOzs7T0FBQTtJQUVNLHdEQUFxQixHQUE1QjtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHNCQUFXLDJEQUFxQjthQUFoQztZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7UUFDN0QsQ0FBQzs7O09BQUE7SUFFTSxnREFBYSxHQUFwQjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQW5FUTtRQUFSLFlBQUssRUFBRTs7d0VBQTRCO0lBQzNCO1FBQVIsWUFBSyxFQUFFOzttRUFBd0I7SUFDdkI7UUFBUixZQUFLLEVBQUU7O21FQUFzQjtJQUNyQjtRQUFSLFlBQUssRUFBRTs7MkVBQWdDO0lBQy9CO1FBQVIsWUFBSyxFQUFFOzs2RUFBa0M7SUFDakM7UUFBUixZQUFLLEVBQUU7O3VFQUE0QjtJQUMzQjtRQUFSLFlBQUssRUFBRTs7K0RBQXlCO0lBQ3hCO1FBQVIsWUFBSyxFQUFFOzttRUFBd0I7SUFDdkI7UUFBUixZQUFLLEVBQUU7OzZEQUFrQjtJQUNoQjtRQUFULGFBQU0sRUFBRTtrQ0FBb0IsbUJBQVk7dUVBQTJCO0lBQzFEO1FBQVQsYUFBTSxFQUFFO2tDQUFTLG1CQUFZOzREQUEyQjtJQUMvQztRQUFULGFBQU0sRUFBRTtrQ0FBUSxtQkFBWTsyREFBMkI7SUFDOUM7UUFBVCxhQUFNLEVBQUU7a0NBQVMsbUJBQVk7NERBQTJCO0lBQy9DO1FBQVQsYUFBTSxFQUFFO2tDQUFjLG1CQUFZO2lFQUEyQjtJQUNwRDtRQUFULGFBQU0sRUFBRTtrQ0FBeUIsbUJBQVk7NEVBQTRCO0lBQ2hFO1FBQVQsYUFBTSxFQUFFO2tDQUF1QixtQkFBWTswRUFBNEI7SUFDOUQ7UUFBVCxhQUFNLEVBQUU7a0NBQWlCLG1CQUFZO29FQUE0QjtJQUN4RDtRQUFULGFBQU0sRUFBRTtrQ0FBVSxtQkFBWTs2REFBNEI7SUFsQmhELHdCQUF3QjtRQWhFcEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFFBQVEsRUFBRSx5cEZBMERUO1NBQ0YsQ0FBQztPQUNXLHdCQUF3QixDQXFFcEM7SUFBRCwrQkFBQztDQXJFRCxBQXFFQyxJQUFBO0FBckVZLDREQUF3QiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlL2NvbXBvbmVudHMvbGluZS1pdGVtL2xpbmUtaXRlbS1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHVyY2hhc2VUeXBlLCBxdW90ZXNXaXRob3V0UHJpY2luZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2xpbmUtaXRlbS1hY3Rpb25zLWNvbXBvbmVudCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ0b29sc1wiIGZsZXg9XCIxMDBcIj5cbiAgICAgIDxidXR0b24gXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwicmVtb3ZlLmVtaXQoKVwiXG4gICAgICAgIHRpdGxlPVwie3sgJ0NBUlQuUFJPSkVDVFMuUkVNT1ZFX0FTU0VUX0JUTl9IT1ZFUicgfCB0cmFuc2xhdGUgfX1cIj5cbiAgICAgICAgICA8bWF0LWljb24+cmVtb3ZlX2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBkYXRhLXBlbmRvPVwiY2FydC1saW5laXRlbV9vcHRpb25zLW1lbnUtdHJpZ2dlclwiXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICBbbWF0LW1lbnUtdHJpZ2dlci1mb3JdPVwibGluZUl0ZW1PcHRpb25zTWVudVwiXG4gICAgICAgIHRpdGxlPVwie3sgJ0NBUlQuUFJPSkVDVFMuTU9SRV9PUFRJT05TX0JUTl9IT1ZFUicgfCB0cmFuc2xhdGUgfX1cIj5cbiAgICAgICAgICA8bWF0LWljb24+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPG1hdC1tZW51IHgtcG9zaXRpb249XCJiZWZvcmVcIiAjbGluZUl0ZW1PcHRpb25zTWVudT1cIm1hdE1lbnVcIj5cbiAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2xvbmUuZW1pdCgpXCI+XG4gICAgICAgIDxtYXQtaWNvbj5sYXllcnM8L21hdC1pY29uPnt7ICdDQVJULlBST0pFQ1RTLkRVUExJQ0FURV9BU1NFVF9CVE5fTEFCRUwnIHwgdHJhbnNsYXRlIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkaXZpZGVyXCIgKm5nSWY9XCJvdGhlclByb2plY3RzRXhpc3RcIj48L2Rpdj5cbiAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgb3RoZXJQcm9qZWN0IG9mIG90aGVyUHJvamVjdHNcIiAoY2xpY2spPVwibW92ZVRvLmVtaXQob3RoZXJQcm9qZWN0KVwiPlxuICAgICAgICA8bWF0LWljb24+c3dhcF92ZXJ0X2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgIHt7ICdDQVJULlBST0pFQ1RTLk1PVkVfVE8nIHwgdHJhbnNsYXRlOntwcm9qZWN0TmFtZTogb3RoZXJQcm9qZWN0Lm5hbWV9IHwgc2xpY2U6MDoyOCB9fVxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGl2aWRlclwiICpuZ0lmPVwic2hvdWxkU2hvd1N1YmNsaXBCdXR0b25cIj48L2Rpdj5cbiAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiZWRpdE1hcmtlcnMuZW1pdCgpXCIgKm5nSWY9XCJ1c2VyQ2FuQ3JlYXRlU3ViY2xpcHNcIj5cbiAgICAgICAgPG1hdC1pY29uPmFjY2Vzc190aW1lPC9tYXQtaWNvbj5cbiAgICAgICAgPHNwYW4+e3sgdHJTdHJpbmdGb3JTdWJjbGlwcGluZyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIFxuICAgICAgICAqbmdJZj1cImRpc3BsYXlQcmljZUJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJzaG93UHJpY2luZ0RpYWxvZy5lbWl0KClcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdC11c2FnZSc6IG5lZWRzQXR0cmlidXRlcyB9XCI+XG4gICAgICAgIDxtYXQtaWNvbj5hc3NpZ25tZW50PC9tYXQtaWNvbj5cbiAgICAgICAgPHNwYW4+e3sgdHJTdHJpbmdGb3JSaWdodHNQYWNrYWdlIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG1hdC1tZW51LWl0ZW1cbiAgICAgICAgKGNsaWNrKT1cIm9wZW5Ob3Rlc0Zvcm0oKVwiPlxuICAgICAgICA8bWF0LWljb24+bm90ZV9hZGQ8L21hdC1pY29uPlxuICAgICAgICA8c3Bhbj57eyB0clN0cmluZ0Zvck5vdGVCdXR0b24gfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgKm5nSWY9XCJ1c2VyQ2FuQWRtaW5pc3RlclF1b3Rlc1wiIGNsYXNzPVwiZGl2aWRlclwiPjwvZGl2PlxuICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJvcGVuQ29zdE11bHRpcGxpZXJGb3JtLmVtaXQoKVwiICpuZ0lmPVwidXNlckNhbkFkbWluaXN0ZXJRdW90ZXNcIj5cbiAgICAgICAgPG1hdC1pY29uPmF0dGFjaF9tb25leTwvbWF0LWljb24+XG4gICAgICAgIDxzcGFuPnt7IHRyU3RyaW5nRm9yQ29zdE11bHRpcGxpZXIgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwicmVtb3ZlQ29zdE11bHRpcGxpZXIuZW1pdCgpXCIgKm5nSWY9XCJzaG93RGVsZXRlQ29zdE11bHRpcGxpZXJCdG5cIj5cbiAgICAgICAgPG1hdC1pY29uPnJlbW92ZV9jaXJjbGU8L21hdC1pY29uPlxuICAgICAgICA8c3Bhbj57eyAnUVVPVEUuUkVNT1ZFX01VTFRJUExJRVInIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cIm9uQ2xpY2tBZGRDdXN0b21QcmljZSgpXCIgKm5nSWY9XCJ1c2VyQ2FuQWRtaW5pc3RlclF1b3Rlc1wiPlxuICAgICAgICA8bWF0LWljb24+bW9uZXRpemF0aW9uX29uPC9tYXQtaWNvbj5cbiAgICAgICAgPHNwYW4+e3sgJ1FVT1RFLkFERF9DVVNUT01fUFJJQ0VfVElUTEUnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9tYXQtbWVudT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBMaW5lSXRlbUFjdGlvbnNDb21wb25lbnQge1xuICBASW5wdXQoKSByaWdodHNSZXByb2R1Y3Rpb246IHN0cmluZztcbiAgQElucHV0KCkgaGFzQXR0cmlidXRlczogYm9vbGVhbjtcbiAgQElucHV0KCkgb3RoZXJQcm9qZWN0czogYW55W107XG4gIEBJbnB1dCgpIHVzZXJDYW5DcmVhdGVTdWJjbGlwczogYm9vbGVhbjtcbiAgQElucHV0KCkgdXNlckNhbkFkbWluaXN0ZXJRdW90ZXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFzc2V0SXNTdWJjbGlwcGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBxdW90ZVR5cGU6IFB1cmNoYXNlVHlwZTtcbiAgQElucHV0KCkgaGFzTXVsdGlwbGllcjogYm9vbGVhbjtcbiAgQElucHV0KCkgaGFzTm90ZTogYm9vbGVhbjtcbiAgQE91dHB1dCgpIHNob3dQcmljaW5nRGlhbG9nOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjbG9uZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBtb3ZlVG86IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZWRpdE1hcmtlcnM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb3BlbkNvc3RNdWx0aXBsaWVyRm9ybTogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlQ29zdE11bHRpcGxpZXI6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFkZEN1c3RvbVByaWNlOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhZGROb3RlOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGdldCBkaXNwbGF5UHJpY2VCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRzUmVwcm9kdWN0aW9uID09PSAnUmlnaHRzIE1hbmFnZWQnICYmICFxdW90ZXNXaXRob3V0UHJpY2luZy5pbmNsdWRlcyh0aGlzLnF1b3RlVHlwZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5lZWRzQXR0cmlidXRlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodHNSZXByb2R1Y3Rpb24gPT09ICdSaWdodHMgTWFuYWdlZCcgJiYgIXRoaXMuaGFzQXR0cmlidXRlcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvdWxkU2hvd1N1YmNsaXBCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbkNyZWF0ZVN1YmNsaXBzICYmIHRoaXMub3RoZXJQcm9qZWN0c0V4aXN0O1xuICB9XG5cbiAgcHVibGljIGdldCBvdGhlclByb2plY3RzRXhpc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3RoZXJQcm9qZWN0cy5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHVibGljIGdldCB0clN0cmluZ0ZvclN1YmNsaXBwaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXNzZXRJc1N1YmNsaXBwZWRcbiAgICAgID8gJ0NPTExFQ1RJT04uU0hPVy5BU1NFVF9NT1JFX01FTlUuRURJVF9TVUJDTElQUElORydcbiAgICAgIDogJ0NPTExFQ1RJT04uU0hPVy5BU1NFVF9NT1JFX01FTlUuQUREX1NVQkNMSVBQSU5HJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdHJTdHJpbmdGb3JDb3N0TXVsdGlwbGllcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmhhc011bHRpcGxpZXJcbiAgICAgID8gJ1FVT1RFLkVESVRfTVVMVElQTElFUl9USVRMRSdcbiAgICAgIDogJ1FVT1RFLkFERF9NVUxUSVBMSUVSX1RJVExFJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdHJTdHJpbmdGb3JSaWdodHNQYWNrYWdlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlc1xuICAgICAgPyAnUVVPVEUuRURJVF9SSUdIVFNfUEFDS0FHRV9USVRMRSdcbiAgICAgIDogJ1FVT1RFLkFERF9SSUdIVFNfUEFDS0FHRV9USVRMRSc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dEZWxldGVDb3N0TXVsdGlwbGllckJ0bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcyAmJiB0aGlzLmhhc011bHRpcGxpZXI7XG4gIH1cblxuICBwdWJsaWMgb25DbGlja0FkZEN1c3RvbVByaWNlKCk6IHZvaWQge1xuICAgIHRoaXMuYWRkQ3VzdG9tUHJpY2UuZW1pdCgpO1xuICB9XG5cbiAgcHVibGljIGdldCB0clN0cmluZ0Zvck5vdGVCdXR0b24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5oYXNOb3RlID8gJ1FVT1RFLkVESVRfTk9URScgOiAnUVVPVEUuQUREX05PVEUnO1xuICB9XG5cbiAgcHVibGljIG9wZW5Ob3Rlc0Zvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5hZGROb3RlLmVtaXQoKTtcbiAgfVxufVxuIl19
