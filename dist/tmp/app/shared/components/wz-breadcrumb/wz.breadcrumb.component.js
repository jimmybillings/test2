"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dateRange_1 = require("../../utilities/dateRange");
var WzBreadcrumbComponent = (function () {
    function WzBreadcrumbComponent() {
        this.onFilterEvent = new core_1.EventEmitter();
        this.activeFilters = [];
    }
    Object.defineProperty(WzBreadcrumbComponent.prototype, "filters", {
        set: function (value) {
            this.activeFilters = [];
            this.getFilters(value);
        },
        enumerable: true,
        configurable: true
    });
    WzBreadcrumbComponent.prototype.toggleFilter = function (filter) {
        this.onFilterEvent.emit({ event: 'toggleFilter', filter: filter });
    };
    WzBreadcrumbComponent.prototype.clearFilters = function () {
        this.onFilterEvent.emit({ event: 'clearFilters' });
    };
    WzBreadcrumbComponent.prototype.formattedValueFor = function (filter) {
        if (filter.type === 'DateRange') {
            var dateRange = new dateRange_1.DateRange();
            dateRange.set('start', filter.filterValue);
            dateRange.set('end', filter.filterValue);
            return dateRange.toHumanString();
        }
        return filter.filterValue;
    };
    WzBreadcrumbComponent.prototype.getFilters = function (filter) {
        if (filter.subFilters) {
            for (var _i = 0, _a = filter.subFilters; _i < _a.length; _i++) {
                var l = _a[_i];
                this.getFilters(l);
            }
            return filter;
        }
        else {
            if (filter.active)
                this.activeFilters.push(filter);
            return filter;
        }
    };
    WzBreadcrumbComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'breadcrumb-component',
                    templateUrl: 'wz.breadcrumb.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzBreadcrumbComponent.ctorParameters = function () { return []; };
    WzBreadcrumbComponent.propDecorators = {
        'filters': [{ type: core_1.Input },],
        'onFilterEvent': [{ type: core_1.Output },],
    };
    return WzBreadcrumbComponent;
}());
exports.WzBreadcrumbComponent = WzBreadcrumbComponent;
//# sourceMappingURL=wz.breadcrumb.component.js.map