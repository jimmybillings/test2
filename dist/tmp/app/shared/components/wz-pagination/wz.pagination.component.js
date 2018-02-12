"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var WzPaginationComponent = (function () {
    function WzPaginationComponent(fb) {
        this.fb = fb;
        this.getPage = new core_1.EventEmitter();
    }
    WzPaginationComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            page: [this.pagination.currentPage, forms_1.Validators.required]
        });
    };
    WzPaginationComponent.prototype.getPageNumber = function (pageNumber) {
        pageNumber = parseInt(pageNumber) || 1;
        if (pageNumber <= 1) {
            this.getPage.emit(1);
        }
        else if (pageNumber > this.pagination.numberOfPages) {
            this.getPage.emit(this.pagination.numberOfPages);
        }
        else {
            this.getPage.emit(pageNumber);
        }
    };
    WzPaginationComponent.prototype.getCurrentPage = function () {
        if (this.pagination.numberOfPages > 0) {
            return this.pagination.currentPage;
        }
        return 0;
    };
    WzPaginationComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-pagination',
                    templateUrl: 'wz.pagination.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzPaginationComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
    ]; };
    WzPaginationComponent.propDecorators = {
        'pagination': [{ type: core_1.Input },],
        'getPage': [{ type: core_1.Output },],
    };
    return WzPaginationComponent;
}());
exports.WzPaginationComponent = WzPaginationComponent;
//# sourceMappingURL=wz.pagination.component.js.map