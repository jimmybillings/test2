"use strict";
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
    ProjectActionsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'project-actions-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button\n      mat-button\n      type=\"button\"\n      data-pendo=\"cart-project_pricing-btn\"\n      *ngIf=\"showRightsPricingBtn\"\n      (click)=\"editProjectPricing()\" \n      class=\"is-outlined rights-pkg\"\n      [ngClass]=\"{'select-usage': !rmAssetsHaveAttributes }\">\n      <mat-icon>assignment</mat-icon>\n      {{ 'CART.PROJECTS.EDIT_USAGE_BTN_LABEL' | translate }}\n    </button>\n    <button\n      data-pendo=\"cart-project_options-menu-trigger\"\n      mat-icon-button \n      [mat-menu-trigger-for]=\"projectOptionsMenu\" \n      title=\"{{ 'CART.PROJECTS.MORE_OPTIONS_BTN_TITLE' | translate }}\">\n      <mat-icon>more_vert</mat-icon>\n    </button>\n\n    <mat-menu x-position=\"before\" #projectOptionsMenu=\"matMenu\">\n      <button mat-menu-item (click)=\"onEditButtonClick()\">\n        <mat-icon>edit</mat-icon>{{ 'CART.PROJECTS.EDIT_PROJECT_BTN_TITLE' | translate }}\n      </button>\n      <ng-container *ngIf=\"allowQuoteAdministration\">\n        <button mat-menu-item (click)=\"onAddFeeButtonClick()\">\n          <mat-icon>note_add</mat-icon>{{ 'CART.PROJECTS.ADD_FEE' | translate }}\n        </button>\n        <button mat-menu-item (click)=\"onBulkImportClick()\">\n          <mat-icon>library_add</mat-icon>{{ 'QUOTE.BULK_IMPORT.TITLE' | translate }}\n        </button>\n        <div class=\"divider\"></div>\n      </ng-container>\n      <button\n        mat-menu-item\n        (click)=\"onRemoveButtonClick()\">\n        <mat-icon>delete</mat-icon>{{ 'CART.PROJECTS.DELETE_PROJECT_BTN' | translate }}\n      </button>\n    </mat-menu>\n  "
                },] },
    ];
    ProjectActionsComponent.ctorParameters = function () { return []; };
    ProjectActionsComponent.propDecorators = {
        'quoteType': [{ type: core_1.Input },],
        'allowQuoteAdministration': [{ type: core_1.Input },],
        'projectHasRmAssets': [{ type: core_1.Input },],
        'rmAssetsHaveAttributes': [{ type: core_1.Input },],
        'remove': [{ type: core_1.Output },],
        'edit': [{ type: core_1.Output },],
        'addFee': [{ type: core_1.Output },],
        'bulkImport': [{ type: core_1.Output },],
        'projectActionsNotify': [{ type: core_1.Output },],
    };
    return ProjectActionsComponent;
}());
exports.ProjectActionsComponent = ProjectActionsComponent;
//# sourceMappingURL=project-actions.component.js.map