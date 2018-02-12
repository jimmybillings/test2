"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_functions_1 = require("../shared/utilities/common.functions");
var core_1 = require("@angular/core");
var dateRange_1 = require("../shared/utilities/dateRange");
var forms_1 = require("@angular/forms");
var FilterComponent = (function () {
    function FilterComponent() {
        this.onFilterEvent = new core_1.EventEmitter();
        this.dateRange = new dateRange_1.DateRange();
    }
    Object.defineProperty(FilterComponent.prototype, "newFilters", {
        set: function (filter) {
            if (filter.subFilters) {
                var dateRangeFilter = filter.subFilters.find(function (filter) { return filter.type === 'DateRange'; });
                if (dateRangeFilter)
                    this.setDateRange(dateRangeFilter);
            }
            this.filters = filter;
        },
        enumerable: true,
        configurable: true
    });
    FilterComponent.prototype.toggleFilterGroup = function (filter) {
        this.onFilterEvent.emit({
            event: 'toggleFilterGroup',
            filter: filter
        });
    };
    FilterComponent.prototype.toggleFilter = function (filter) {
        this.onFilterEvent.emit({
            event: 'toggleFilter',
            filter: filter
        });
    };
    FilterComponent.prototype.applyExclusiveFilter = function (filter) {
        this.onFilterEvent.emit({
            event: 'applyExclusiveFilter',
            filter: filter
        });
    };
    FilterComponent.prototype.applyCustomValue = function (event, filter) {
        if (event.code === 'Enter') {
            this.onFilterEvent.emit({
                event: 'applyCustomValue',
                filter: filter,
                customValue: event.target.value
            });
        }
    };
    FilterComponent.prototype.applyDateRange = function (event, filter) {
        this.dateRange.set(event.targetElement.name, event.target.value.toDateString());
        this.onFilterEvent.emit({
            event: 'applyCustomValue',
            filter: filter,
            customValue: this.dateRange.toString()
        });
    };
    FilterComponent.prototype.setDateRange = function (dateRangeFilter) {
        this.startDate = this.preselectDate(dateRangeFilter, 'start');
        this.endDate = this.preselectDate(dateRangeFilter, 'end');
    };
    FilterComponent.prototype.preselectDate = function (filter, key) {
        var filterValue = filter && filter.filterValue ? filter.filterValue : null;
        if (key === 'start' && filterValue && filterValue.split(' - ')[0] !== '1000-01-01') {
            this.dateRange.set(key, filterValue);
            return new forms_1.FormControl(common_functions_1.Common.convertToDateInstance(this.dateRange.get(key)));
        }
        if (key === 'end' && filterValue && filterValue.split(' - ')[1] !== '3000-01-01') {
            this.dateRange.set(key, filterValue);
            return new forms_1.FormControl(common_functions_1.Common.convertToDateInstance(this.dateRange.get(key)));
        }
        return new forms_1.FormControl(null);
    };
    FilterComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'filter-component',
                    templateUrl: 'filter.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    FilterComponent.ctorParameters = function () { return []; };
    FilterComponent.propDecorators = {
        'newFilters': [{ type: core_1.Input },],
        'counted': [{ type: core_1.Input },],
        'onFilterEvent': [{ type: core_1.Output },],
    };
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
//# sourceMappingURL=filter.component.js.map