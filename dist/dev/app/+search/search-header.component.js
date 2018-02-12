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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SearchHeaderComponent.prototype, "hasResults", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchHeaderComponent.prototype, "sortDefinitionItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchHeaderComponent.prototype, "currentSort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SearchHeaderComponent.prototype, "assetView", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchHeaderComponent.prototype, "path", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SearchHeaderComponent.prototype, "collectionName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SearchHeaderComponent.prototype, "canEditCollection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchHeaderComponent.prototype, "onChangeAssetView", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchHeaderComponent.prototype, "onSortResults", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchHeaderComponent.prototype, "onClickBreadcrumb", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SearchHeaderComponent.prototype, "clickAddAllBtn", void 0);
    SearchHeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-header',
            template: "\n    \t<section class=\"search-header\" layout=\"row\" layout-align=\"center center\">\n        <header flex-gt-lg=\"95\" flex-lg=\"95\" flex=\"100\">\n          <div layout=\"row\" layout-align=\"space-between end\">\n            <wz-gallery-breadcrumb\n              *ngIf=\"path\"\n              [path]=\"path\"\n              (clickBreadcrumb)=\"onClickBreadcrumb.emit($event)\">\n            </wz-gallery-breadcrumb>\n            <h2 *ngIf=\"!hasResults\" flex=\"100\" class=\"mat-display-1 alert\"> \n              {{ 'SEARCH.NO_RESULTS.PG_HEADING' | translate }}\n            </h2>\n            <div *ngIf=\"hasResults\" class=\"asset-sort-by tools\" flex=\"auto\">\n              <button mat-button class=\"is-dd\" color=\"primary\" [mat-menu-trigger-for]=\"assetSortMenu\">\n                <span class=\"key\">{{'SEARCH.SORT_BTN_LABEL' | translate }}</span>\n                <span class=\"value mat-caption\">\n                  {{ currentSort.name }}\n                </span>\n              </button>\n              <mat-menu x-position=\"before\" #assetSortMenu=\"matMenu\">\n                <wz-sort-component \n                  [current]=\"currentSort\" \n                  [items]=\"sortDefinitionItems\" \n                  (sort)=\"onSortResults.emit($event)\">\n                </wz-sort-component>\n              </mat-menu>\n              <button\n                mat-icon-button\n                color=\"primary\"\n                title=\"{{ titleForAssetViewBtn | translate }}\" \n                (click)=\"onClickAssetViewBtn()\">\n                <mat-icon>{{ iconForAssetViewBtn }}</mat-icon>\n              </button>\n              <button\n                [disabled]=\"!canEditCollection\"\n                mat-icon-button\n                color=\"primary\"\n                title=\"{{ 'SEARCH.ADD_ALL_TO_COLLECTION.BTN_TITLE' | translate:{ collectionName:collectionName } }}\"\n                (click)=\"onClickAddAllBtn()\">\n                <mat-icon>library_add</mat-icon>  \n              </button>\n            </div>\n          </div>\n        </header>\n      </section>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], SearchHeaderComponent);
    return SearchHeaderComponent;
}());
exports.SearchHeaderComponent = SearchHeaderComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlYXJjaC1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBd0RoRztJQXBEQTtRQXFEVyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGNBQVMsR0FBZ0IsTUFBTSxDQUFDO1FBSS9CLHNCQUFpQixHQUE4QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNsRSxrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN0RCxzQkFBaUIsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDMUQsbUJBQWMsR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFvQnBFLENBQUM7SUFsQkMsc0JBQVcsdURBQW9CO2FBQS9CO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ3BDLGtDQUFrQyxDQUFDO1FBQ3ZDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0RBQW1CO2FBQTlCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQUVNLG1EQUFtQixHQUExQjtRQUNFLElBQU0sWUFBWSxHQUFnQixJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDOUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sZ0RBQWdCLEdBQXZCO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBN0JRO1FBQVIsWUFBSyxFQUFFOzs2REFBNEI7SUFDM0I7UUFBUixZQUFLLEVBQUU7O3NFQUEwQjtJQUN6QjtRQUFSLFlBQUssRUFBRTs7OERBQWtCO0lBQ2pCO1FBQVIsWUFBSyxFQUFFOzs0REFBaUM7SUFDaEM7UUFBUixZQUFLLEVBQUU7O3VEQUFXO0lBQ1Y7UUFBUixZQUFLLEVBQUU7O2lFQUF3QjtJQUN2QjtRQUFSLFlBQUssRUFBRTs7b0VBQTRCO0lBQzFCO1FBQVQsYUFBTSxFQUFFO2tDQUFvQixtQkFBWTtvRUFBbUM7SUFDbEU7UUFBVCxhQUFNLEVBQUU7a0NBQWdCLG1CQUFZO2dFQUEyQjtJQUN0RDtRQUFULGFBQU0sRUFBRTtrQ0FBb0IsbUJBQVk7b0VBQTJCO0lBQzFEO1FBQVQsYUFBTSxFQUFFO2tDQUFpQixtQkFBWTtpRUFBNEI7SUFYdkQscUJBQXFCO1FBcERqQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxpa0VBNkNUO1lBQ0QsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUVXLHFCQUFxQixDQStCakM7SUFBRCw0QkFBQztDQS9CRCxBQStCQyxJQUFBO0FBL0JZLHNEQUFxQiIsImZpbGUiOiJhcHAvK3NlYXJjaC9zZWFyY2gtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBSZXN1bHRzVmlldyA9ICdncmlkJyB8ICdsaXN0JztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnc2VhcmNoLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgXHQ8c2VjdGlvbiBjbGFzcz1cInNlYXJjaC1oZWFkZXJcIiBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtYWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgIDxoZWFkZXIgZmxleC1ndC1sZz1cIjk1XCIgZmxleC1sZz1cIjk1XCIgZmxleD1cIjEwMFwiPlxuICAgICAgICAgIDxkaXYgbGF5b3V0PVwicm93XCIgbGF5b3V0LWFsaWduPVwic3BhY2UtYmV0d2VlbiBlbmRcIj5cbiAgICAgICAgICAgIDx3ei1nYWxsZXJ5LWJyZWFkY3J1bWJcbiAgICAgICAgICAgICAgKm5nSWY9XCJwYXRoXCJcbiAgICAgICAgICAgICAgW3BhdGhdPVwicGF0aFwiXG4gICAgICAgICAgICAgIChjbGlja0JyZWFkY3J1bWIpPVwib25DbGlja0JyZWFkY3J1bWIuZW1pdCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L3d6LWdhbGxlcnktYnJlYWRjcnVtYj5cbiAgICAgICAgICAgIDxoMiAqbmdJZj1cIiFoYXNSZXN1bHRzXCIgZmxleD1cIjEwMFwiIGNsYXNzPVwibWF0LWRpc3BsYXktMSBhbGVydFwiPiBcbiAgICAgICAgICAgICAge3sgJ1NFQVJDSC5OT19SRVNVTFRTLlBHX0hFQURJTkcnIHwgdHJhbnNsYXRlIH19XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImhhc1Jlc3VsdHNcIiBjbGFzcz1cImFzc2V0LXNvcnQtYnkgdG9vbHNcIiBmbGV4PVwiYXV0b1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gY2xhc3M9XCJpcy1kZFwiIGNvbG9yPVwicHJpbWFyeVwiIFttYXQtbWVudS10cmlnZ2VyLWZvcl09XCJhc3NldFNvcnRNZW51XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJrZXlcIj57eydTRUFSQ0guU09SVF9CVE5fTEFCRUwnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmFsdWUgbWF0LWNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgIHt7IGN1cnJlbnRTb3J0Lm5hbWUgfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8bWF0LW1lbnUgeC1wb3NpdGlvbj1cImJlZm9yZVwiICNhc3NldFNvcnRNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgICAgIDx3ei1zb3J0LWNvbXBvbmVudCBcbiAgICAgICAgICAgICAgICAgIFtjdXJyZW50XT1cImN1cnJlbnRTb3J0XCIgXG4gICAgICAgICAgICAgICAgICBbaXRlbXNdPVwic29ydERlZmluaXRpb25JdGVtc1wiIFxuICAgICAgICAgICAgICAgICAgKHNvcnQpPVwib25Tb3J0UmVzdWx0cy5lbWl0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8L3d6LXNvcnQtY29tcG9uZW50PlxuICAgICAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cInt7IHRpdGxlRm9yQXNzZXRWaWV3QnRuIHwgdHJhbnNsYXRlIH19XCIgXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tBc3NldFZpZXdCdG4oKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj57eyBpY29uRm9yQXNzZXRWaWV3QnRuIH19PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNhbkVkaXRDb2xsZWN0aW9uXCJcbiAgICAgICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwie3sgJ1NFQVJDSC5BRERfQUxMX1RPX0NPTExFQ1RJT04uQlROX1RJVExFJyB8IHRyYW5zbGF0ZTp7IGNvbGxlY3Rpb25OYW1lOmNvbGxlY3Rpb25OYW1lIH0gfX1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrQWRkQWxsQnRuKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+bGlicmFyeV9hZGQ8L21hdC1pY29uPiAgXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgICAgPC9zZWN0aW9uPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFNlYXJjaEhlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGhhc1Jlc3VsdHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzb3J0RGVmaW5pdGlvbkl0ZW1zOiBhbnk7XG4gIEBJbnB1dCgpIGN1cnJlbnRTb3J0OiBhbnk7XG4gIEBJbnB1dCgpIGFzc2V0VmlldzogUmVzdWx0c1ZpZXcgPSAnZ3JpZCc7XG4gIEBJbnB1dCgpIHBhdGg6IGFueTtcbiAgQElucHV0KCkgY29sbGVjdGlvbk5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgY2FuRWRpdENvbGxlY3Rpb246IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBvbkNoYW5nZUFzc2V0VmlldzogRXZlbnRFbWl0dGVyPFJlc3VsdHNWaWV3PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uU29ydFJlc3VsdHM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25DbGlja0JyZWFkY3J1bWI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2xpY2tBZGRBbGxCdG46IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgZ2V0IHRpdGxlRm9yQXNzZXRWaWV3QnRuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXNzZXRWaWV3ID09PSAnZ3JpZCcgP1xuICAgICAgJ1NFQVJDSC5BU1NFVF9WSUVXX0xJU1RfQlROX1RJVExFJyA6XG4gICAgICAnU0VBUkNILkFTU0VUX1ZJRVdfR1JJRF9CVE5fVElUTEUnO1xuICB9XG5cbiAgcHVibGljIGdldCBpY29uRm9yQXNzZXRWaWV3QnRuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXNzZXRWaWV3ID09PSAnZ3JpZCcgPyAndmlld19saXN0JyA6ICd2aWV3X2NvbWZ5JztcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrQXNzZXRWaWV3QnRuKCk6IHZvaWQge1xuICAgIGNvbnN0IG5ld1ZpZXdWYWx1ZTogUmVzdWx0c1ZpZXcgPSB0aGlzLmFzc2V0VmlldyA9PT0gJ2dyaWQnID8gJ2xpc3QnIDogJ2dyaWQnO1xuICAgIHRoaXMub25DaGFuZ2VBc3NldFZpZXcuZW1pdChuZXdWaWV3VmFsdWUpO1xuICB9XG5cbiAgcHVibGljIG9uQ2xpY2tBZGRBbGxCdG4oKTogdm9pZCB7XG4gICAgdGhpcy5jbGlja0FkZEFsbEJ0bi5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==
