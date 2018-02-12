"use strict";
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
    LineItemActionsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'line-item-actions-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"tools\" flex=\"100\">\n      <button \n        mat-icon-button\n        (click)=\"remove.emit()\"\n        title=\"{{ 'CART.PROJECTS.REMOVE_ASSET_BTN_HOVER' | translate }}\">\n          <mat-icon>remove_circle</mat-icon>\n        </button>\n      <button\n        data-pendo=\"cart-lineitem_options-menu-trigger\"\n        mat-icon-button\n        [mat-menu-trigger-for]=\"lineItemOptionsMenu\"\n        title=\"{{ 'CART.PROJECTS.MORE_OPTIONS_BTN_HOVER' | translate }}\">\n          <mat-icon>more_vert</mat-icon>\n      </button>\n    </div>\n\n    <mat-menu x-position=\"before\" #lineItemOptionsMenu=\"matMenu\">\n      <button mat-menu-item (click)=\"clone.emit()\">\n        <mat-icon>layers</mat-icon>{{ 'CART.PROJECTS.DUPLICATE_ASSET_BTN_LABEL' | translate }}\n      </button>\n      <div class=\"divider\" *ngIf=\"otherProjectsExist\"></div>\n      <button mat-menu-item *ngFor=\"let otherProject of otherProjects\" (click)=\"moveTo.emit(otherProject)\">\n        <mat-icon>swap_vert_circle</mat-icon>\n        {{ 'CART.PROJECTS.MOVE_TO' | translate:{projectName: otherProject.name} | slice:0:28 }}\n      </button>\n      <div class=\"divider\" *ngIf=\"shouldShowSubclipButton\"></div>\n      <button mat-menu-item (click)=\"editMarkers.emit()\" *ngIf=\"userCanCreateSubclips\">\n        <mat-icon>access_time</mat-icon>\n        <span>{{ trStringForSubclipping | translate }}</span>\n      </button>\n      <button mat-menu-item \n        *ngIf=\"displayPriceButton\"\n        (click)=\"showPricingDialog.emit()\"\n        [ngClass]=\"{'select-usage': needsAttributes }\">\n        <mat-icon>assignment</mat-icon>\n        <span>{{ trStringForRightsPackage | translate }}</span>\n      </button>\n      <button\n        mat-menu-item\n        (click)=\"openNotesForm()\">\n        <mat-icon>note_add</mat-icon>\n        <span>{{ trStringForNoteButton | translate }}</span>\n      </button>\n      <div *ngIf=\"userCanAdministerQuotes\" class=\"divider\"></div>\n      <button mat-menu-item (click)=\"openCostMultiplierForm.emit()\" *ngIf=\"userCanAdministerQuotes\">\n        <mat-icon>attach_money</mat-icon>\n        <span>{{ trStringForCostMultiplier | translate }}</span>\n      </button>\n      <button mat-menu-item (click)=\"removeCostMultiplier.emit()\" *ngIf=\"showDeleteCostMultiplierBtn\">\n        <mat-icon>remove_circle</mat-icon>\n        <span>{{ 'QUOTE.REMOVE_MULTIPLIER' | translate }}</span>\n      </button>\n      <button mat-menu-item (click)=\"onClickAddCustomPrice()\" *ngIf=\"userCanAdministerQuotes\">\n        <mat-icon>monetization_on</mat-icon>\n        <span>{{ 'QUOTE.ADD_CUSTOM_PRICE_TITLE' | translate }}</span>\n      </button>\n    </mat-menu>\n  "
                },] },
    ];
    LineItemActionsComponent.ctorParameters = function () { return []; };
    LineItemActionsComponent.propDecorators = {
        'rightsReproduction': [{ type: core_1.Input },],
        'hasAttributes': [{ type: core_1.Input },],
        'otherProjects': [{ type: core_1.Input },],
        'userCanCreateSubclips': [{ type: core_1.Input },],
        'userCanAdministerQuotes': [{ type: core_1.Input },],
        'assetIsSubclipped': [{ type: core_1.Input },],
        'quoteType': [{ type: core_1.Input },],
        'hasMultiplier': [{ type: core_1.Input },],
        'hasNote': [{ type: core_1.Input },],
        'showPricingDialog': [{ type: core_1.Output },],
        'remove': [{ type: core_1.Output },],
        'clone': [{ type: core_1.Output },],
        'moveTo': [{ type: core_1.Output },],
        'editMarkers': [{ type: core_1.Output },],
        'openCostMultiplierForm': [{ type: core_1.Output },],
        'removeCostMultiplier': [{ type: core_1.Output },],
        'addCustomPrice': [{ type: core_1.Output },],
        'addNote': [{ type: core_1.Output },],
    };
    return LineItemActionsComponent;
}());
exports.LineItemActionsComponent = LineItemActionsComponent;
//# sourceMappingURL=line-item-actions.component.js.map