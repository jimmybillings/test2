"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchHeaderComponent = (function () {
    function SearchHeaderComponent() {
        this.hasResults = true;
        this.assetView = 'grid';
        this.onChangeAssetView = new core_1.EventEmitter();
        this.onSortResults = new core_1.EventEmitter();
        this.onClickBreadcrumb = new core_1.EventEmitter();
        this.clickAddAllBtn = new core_1.EventEmitter();
    }
    Object.defineProperty(SearchHeaderComponent.prototype, "titleForAssetViewBtn", {
        get: function () {
            return this.assetView === 'grid' ?
                'SEARCH.ASSET_VIEW_LIST_BTN_TITLE' :
                'SEARCH.ASSET_VIEW_GRID_BTN_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchHeaderComponent.prototype, "iconForAssetViewBtn", {
        get: function () {
            return this.assetView === 'grid' ? 'view_list' : 'view_comfy';
        },
        enumerable: true,
        configurable: true
    });
    SearchHeaderComponent.prototype.onClickAssetViewBtn = function () {
        var newViewValue = this.assetView === 'grid' ? 'list' : 'grid';
        this.onChangeAssetView.emit(newViewValue);
    };
    SearchHeaderComponent.prototype.onClickAddAllBtn = function () {
        this.clickAddAllBtn.emit();
    };
    SearchHeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'search-header',
                    template: "\n    \t<section class=\"search-header\" layout=\"row\" layout-align=\"center center\">\n        <header flex-gt-lg=\"95\" flex-lg=\"95\" flex=\"100\">\n          <div layout=\"row\" layout-align=\"space-between end\">\n            <wz-gallery-breadcrumb\n              *ngIf=\"path\"\n              [path]=\"path\"\n              (clickBreadcrumb)=\"onClickBreadcrumb.emit($event)\">\n            </wz-gallery-breadcrumb>\n            <h2 *ngIf=\"!hasResults\" flex=\"100\" class=\"mat-display-1 alert\"> \n              {{ 'SEARCH.NO_RESULTS.PG_HEADING' | translate }}\n            </h2>\n            <div *ngIf=\"hasResults\" class=\"asset-sort-by tools\" flex=\"auto\">\n              <button mat-button class=\"is-dd\" color=\"primary\" [mat-menu-trigger-for]=\"assetSortMenu\">\n                <span class=\"key\">{{'SEARCH.SORT_BTN_LABEL' | translate }}</span>\n                <span class=\"value mat-caption\">\n                  {{ currentSort.name }}\n                </span>\n              </button>\n              <mat-menu x-position=\"before\" #assetSortMenu=\"matMenu\">\n                <wz-sort-component \n                  [current]=\"currentSort\" \n                  [items]=\"sortDefinitionItems\" \n                  (sort)=\"onSortResults.emit($event)\">\n                </wz-sort-component>\n              </mat-menu>\n              <button\n                mat-icon-button\n                color=\"primary\"\n                title=\"titleForAssetViewBtn\" \n                (click)=\"onClickAssetViewBtn()\">\n                <mat-icon>{{ iconForAssetViewBtn }}</mat-icon>\n              </button>\n              <button\n                [disabled]=\"!canEditCollection\"\n                mat-icon-button\n                color=\"primary\"\n                title=\"{{ 'SEARCH.ADD_ALL_TO_COLLECTION.BTN_TITLE' | translate:{ collectionName:collectionName } }}\"\n                (click)=\"onClickAddAllBtn()\">\n                <mat-icon>library_add</mat-icon>  \n              </button>\n            </div>\n          </div>\n        </header>\n      </section>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    SearchHeaderComponent.ctorParameters = function () { return []; };
    SearchHeaderComponent.propDecorators = {
        'hasResults': [{ type: core_1.Input },],
        'sortDefinitionItems': [{ type: core_1.Input },],
        'currentSort': [{ type: core_1.Input },],
        'assetView': [{ type: core_1.Input },],
        'path': [{ type: core_1.Input },],
        'collectionName': [{ type: core_1.Input },],
        'canEditCollection': [{ type: core_1.Input },],
        'onChangeAssetView': [{ type: core_1.Output },],
        'onSortResults': [{ type: core_1.Output },],
        'onClickBreadcrumb': [{ type: core_1.Output },],
        'clickAddAllBtn': [{ type: core_1.Output },],
    };
    return SearchHeaderComponent;
}());
exports.SearchHeaderComponent = SearchHeaderComponent;
//# sourceMappingURL=search-header.component.js.map