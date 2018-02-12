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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FilterComponent.prototype, "newFilters", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FilterComponent.prototype, "counted", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FilterComponent.prototype, "onFilterEvent", void 0);
    FilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'filter-component',
            templateUrl: 'filter.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL2ZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx5RUFBOEQ7QUFDOUQsc0NBQWdHO0FBQ2hHLDJEQUF3RTtBQUN4RSx3Q0FBNkM7QUFTN0M7SUFQQTtRQXVCWSxrQkFBYSxHQUFRLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzNDLGNBQVMsR0FBYyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztJQTJEaEQsQ0FBQztJQXRFQyxzQkFBSSx1Q0FBVTthQUFkLFVBQWUsTUFBVztZQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFXLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO2dCQUM3RixFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7b0JBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFNTSwyQ0FBaUIsR0FBeEIsVUFBeUIsTUFBVztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN0QixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNDQUFZLEdBQW5CLFVBQW9CLE1BQVc7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdEIsS0FBSyxFQUFFLGNBQWM7WUFDckIsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sOENBQW9CLEdBQTNCLFVBQTRCLE1BQVc7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FB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NUIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUVXLGVBQWUsQ0E0RTNCO0lBQUQsc0JBQUM7Q0E1RUQsQUE0RUMsSUFBQTtBQTVFWSwwQ0FBZSIsImZpbGUiOiJhcHAvK3NlYXJjaC9maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlS2V5LCBEYXRlUmFuZ2UgfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2RhdGVSYW5nZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnZmlsdGVyLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnZmlsdGVyLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIEZpbHRlckNvbXBvbmVudCB7XG4gIHB1YmxpYyBmaWx0ZXJzOiBhbnk7XG4gIHB1YmxpYyBzdGFydERhdGU6IEZvcm1Db250cm9sO1xuICBwdWJsaWMgZW5kRGF0ZTogRm9ybUNvbnRyb2w7XG5cbiAgQElucHV0KClcbiAgc2V0IG5ld0ZpbHRlcnMoZmlsdGVyOiBhbnkpIHtcbiAgICBpZiAoZmlsdGVyLnN1YkZpbHRlcnMpIHtcbiAgICAgIGNvbnN0IGRhdGVSYW5nZUZpbHRlciA9IGZpbHRlci5zdWJGaWx0ZXJzLmZpbmQoKGZpbHRlcjogYW55KSA9PiBmaWx0ZXIudHlwZSA9PT0gJ0RhdGVSYW5nZScpO1xuICAgICAgaWYgKGRhdGVSYW5nZUZpbHRlcikgdGhpcy5zZXREYXRlUmFuZ2UoZGF0ZVJhbmdlRmlsdGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXI7XG4gIH1cblxuICBASW5wdXQoKSBjb3VudGVkOiBib29sZWFuO1xuICBAT3V0cHV0KCkgb25GaWx0ZXJFdmVudDogYW55ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgZGF0ZVJhbmdlOiBEYXRlUmFuZ2UgPSBuZXcgRGF0ZVJhbmdlKCk7XG5cbiAgcHVibGljIHRvZ2dsZUZpbHRlckdyb3VwKGZpbHRlcjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkZpbHRlckV2ZW50LmVtaXQoe1xuICAgICAgZXZlbnQ6ICd0b2dnbGVGaWx0ZXJHcm91cCcsXG4gICAgICBmaWx0ZXI6IGZpbHRlclxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUZpbHRlcihmaWx0ZXI6IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25GaWx0ZXJFdmVudC5lbWl0KHtcbiAgICAgIGV2ZW50OiAndG9nZ2xlRmlsdGVyJyxcbiAgICAgIGZpbHRlcjogZmlsdGVyXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlFeGNsdXNpdmVGaWx0ZXIoZmlsdGVyOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uRmlsdGVyRXZlbnQuZW1pdCh7XG4gICAgICBldmVudDogJ2FwcGx5RXhjbHVzaXZlRmlsdGVyJyxcbiAgICAgIGZpbHRlcjogZmlsdGVyXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlDdXN0b21WYWx1ZShldmVudDogYW55LCBmaWx0ZXI6IGFueSkge1xuICAgIGlmIChldmVudC5jb2RlID09PSAnRW50ZXInKSB7XG4gICAgICB0aGlzLm9uRmlsdGVyRXZlbnQuZW1pdCh7XG4gICAgICAgIGV2ZW50OiAnYXBwbHlDdXN0b21WYWx1ZScsXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBjdXN0b21WYWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBwbHlEYXRlUmFuZ2UoZXZlbnQ6IGFueSwgZmlsdGVyOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVSYW5nZS5zZXQoZXZlbnQudGFyZ2V0RWxlbWVudC5uYW1lLCBldmVudC50YXJnZXQudmFsdWUudG9EYXRlU3RyaW5nKCkpO1xuICAgIHRoaXMub25GaWx0ZXJFdmVudC5lbWl0KHtcbiAgICAgIGV2ZW50OiAnYXBwbHlDdXN0b21WYWx1ZScsXG4gICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgIGN1c3RvbVZhbHVlOiB0aGlzLmRhdGVSYW5nZS50b1N0cmluZygpXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldERhdGVSYW5nZShkYXRlUmFuZ2VGaWx0ZXI6IGFueSkge1xuICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5wcmVzZWxlY3REYXRlKGRhdGVSYW5nZUZpbHRlciwgJ3N0YXJ0Jyk7XG4gICAgdGhpcy5lbmREYXRlID0gdGhpcy5wcmVzZWxlY3REYXRlKGRhdGVSYW5nZUZpbHRlciwgJ2VuZCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVzZWxlY3REYXRlKGZpbHRlcjogYW55LCBrZXk6IERhdGVSYW5nZUtleSk6IEZvcm1Db250cm9sIHtcbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IGZpbHRlciAmJiBmaWx0ZXIuZmlsdGVyVmFsdWUgPyBmaWx0ZXIuZmlsdGVyVmFsdWUgOiBudWxsO1xuICAgIGlmIChrZXkgPT09ICdzdGFydCcgJiYgZmlsdGVyVmFsdWUgJiYgZmlsdGVyVmFsdWUuc3BsaXQoJyAtICcpWzBdICE9PSAnMTAwMC0wMS0wMScpIHtcbiAgICAgIHRoaXMuZGF0ZVJhbmdlLnNldChrZXksIGZpbHRlclZhbHVlKTtcbiAgICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2woQ29tbW9uLmNvbnZlcnRUb0RhdGVJbnN0YW5jZSh0aGlzLmRhdGVSYW5nZS5nZXQoa2V5KSkpO1xuICAgIH1cbiAgICBpZiAoa2V5ID09PSAnZW5kJyAmJiBmaWx0ZXJWYWx1ZSAmJiBmaWx0ZXJWYWx1ZS5zcGxpdCgnIC0gJylbMV0gIT09ICczMDAwLTAxLTAxJykge1xuICAgICAgdGhpcy5kYXRlUmFuZ2Uuc2V0KGtleSwgZmlsdGVyVmFsdWUpO1xuICAgICAgcmV0dXJuIG5ldyBGb3JtQ29udHJvbChDb21tb24uY29udmVydFRvRGF0ZUluc3RhbmNlKHRoaXMuZGF0ZVJhbmdlLmdldChrZXkpKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2wobnVsbCk7XG4gIH1cbn1cbiJdfQ==
