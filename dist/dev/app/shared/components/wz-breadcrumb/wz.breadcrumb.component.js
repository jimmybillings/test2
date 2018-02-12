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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WzBreadcrumbComponent.prototype, "filters", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzBreadcrumbComponent.prototype, "onFilterEvent", void 0);
    WzBreadcrumbComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'breadcrumb-component',
            templateUrl: 'wz.breadcrumb.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], WzBreadcrumbComponent);
    return WzBreadcrumbComponent;
}());
exports.WzBreadcrumbComponent = WzBreadcrumbComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1icmVhZGNydW1iL3d6LmJyZWFkY3J1bWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9IO0FBQ3BILHVEQUFzRDtBQVN0RDtJQVBBO1FBYVksa0JBQWEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN0QyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztJQTZCakMsQ0FBQztJQWxDQyxzQkFBSSwwQ0FBTzthQUFYLFVBQVksS0FBVTtZQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBR00sNENBQVksR0FBbkIsVUFBb0IsTUFBVztRQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVNLDRDQUFZLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0saURBQWlCLEdBQXhCLFVBQXlCLE1BQVc7UUFDbEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQU0sU0FBUyxHQUFjLElBQUkscUJBQVMsRUFBRSxDQUFDO1lBQzdDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVPLDBDQUFVLEdBQWxCLFVBQW1CLE1BQVc7UUFDNUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLENBQVUsVUFBaUIsRUFBakIsS0FBQSxNQUFNLENBQUMsVUFBVSxFQUFqQixjQUFpQixFQUFqQixJQUFpQjtnQkFBMUIsSUFBSSxDQUFDLFNBQUE7Z0JBQXVCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBQTtZQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDO0lBQ0gsQ0FBQztJQWpDRDtRQURDLFlBQUssRUFBRTs7O3dEQUlQO0lBQ1M7UUFBVCxhQUFNLEVBQUU7O2dFQUFvQztJQU5sQyxxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUVXLHFCQUFxQixDQW9DakM7SUFBRCw0QkFBQztDQXBDRCxBQW9DQyxJQUFBO0FBcENZLHNEQUFxQiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otYnJlYWRjcnVtYi93ei5icmVhZGNydW1iLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIGZvcndhcmRSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUmFuZ2UgfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvZGF0ZVJhbmdlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYnJlYWRjcnVtYi1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJ3d6LmJyZWFkY3J1bWIuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgV3pCcmVhZGNydW1iQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcnModmFsdWU6IGFueSkge1xuICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IFtdO1xuICAgIHRoaXMuZ2V0RmlsdGVycyh2YWx1ZSk7XG4gIH1cbiAgQE91dHB1dCgpIG9uRmlsdGVyRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBhY3RpdmVGaWx0ZXJzOiBhbnkgPSBbXTtcbiAgcHVibGljIHRvZ2dsZUZpbHRlcihmaWx0ZXI6IGFueSkge1xuICAgIHRoaXMub25GaWx0ZXJFdmVudC5lbWl0KHsgZXZlbnQ6ICd0b2dnbGVGaWx0ZXInLCBmaWx0ZXI6IGZpbHRlciB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckZpbHRlcnMoKSB7XG4gICAgdGhpcy5vbkZpbHRlckV2ZW50LmVtaXQoeyBldmVudDogJ2NsZWFyRmlsdGVycycgfSk7XG4gIH1cblxuICBwdWJsaWMgZm9ybWF0dGVkVmFsdWVGb3IoZmlsdGVyOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChmaWx0ZXIudHlwZSA9PT0gJ0RhdGVSYW5nZScpIHtcbiAgICAgIGNvbnN0IGRhdGVSYW5nZTogRGF0ZVJhbmdlID0gbmV3IERhdGVSYW5nZSgpO1xuICAgICAgZGF0ZVJhbmdlLnNldCgnc3RhcnQnLCBmaWx0ZXIuZmlsdGVyVmFsdWUpO1xuICAgICAgZGF0ZVJhbmdlLnNldCgnZW5kJywgZmlsdGVyLmZpbHRlclZhbHVlKTtcbiAgICAgIHJldHVybiBkYXRlUmFuZ2UudG9IdW1hblN0cmluZygpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXIuZmlsdGVyVmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlcnMoZmlsdGVyOiBhbnkpIHtcbiAgICBpZiAoZmlsdGVyLnN1YkZpbHRlcnMpIHtcbiAgICAgIGZvciAodmFyIGwgb2YgZmlsdGVyLnN1YkZpbHRlcnMpIHRoaXMuZ2V0RmlsdGVycyhsKTtcbiAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmaWx0ZXIuYWN0aXZlKSB0aGlzLmFjdGl2ZUZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
