import { Common } from '../shared/utilities/common.functions';
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { DateRangeKey, DateRange } from '../shared/utilities/dateRange';
import { FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'filter-component',
  templateUrl: 'filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterComponent {
  public filters: any;
  public startDate: FormControl;
  public endDate: FormControl;

  @Input()
  set newFilters(filter: any) {
    if (filter.subFilters) {
      const dateRangeFilter = filter.subFilters.find((filter: any) => filter.type === 'DateRange');
      if (dateRangeFilter) this.setDateRange(dateRangeFilter);
    }

    this.filters = filter;
  }

  @Input() counted: boolean;
  @Output() onFilterEvent: any = new EventEmitter();
  public dateRange: DateRange = new DateRange();

  public toggleFilterGroup(filter: any): void {
    this.onFilterEvent.emit({
      event: 'toggleFilterGroup',
      filter: filter
    });
  }

  public toggleFilter(filter: any): void {
    this.onFilterEvent.emit({
      event: 'toggleFilter',
      filter: filter
    });
  }

  public applyExclusiveFilter(filter: any): void {
    this.onFilterEvent.emit({
      event: 'applyExclusiveFilter',
      filter: filter
    });
  }

  public applyCustomValue(event: any, filter: any) {
    if (event.code === 'Enter') {
      this.onFilterEvent.emit({
        event: 'applyCustomValue',
        filter: filter,
        customValue: event.target.value
      });
    }
  }

  public applyDateRange(event: any, filter: any): void {
    this.dateRange.set(event.targetElement.name, event.target.value.toDateString());
    this.onFilterEvent.emit({
      event: 'applyCustomValue',
      filter: filter,
      customValue: this.dateRange.toString()
    });
  }

  private setDateRange(dateRangeFilter: any) {
    this.startDate = this.preselectDate(dateRangeFilter, 'start');
    this.endDate = this.preselectDate(dateRangeFilter, 'end');
  }

  private preselectDate(filter: any, key: DateRangeKey): FormControl {
    const filterValue = filter && filter.filterValue ? filter.filterValue : null;
    if (key === 'start' && filterValue && filterValue.split(' - ')[0] !== '1000-01-01') {
      this.dateRange.set(key, filterValue);
      return new FormControl(Common.convertToDateInstance(this.dateRange.get(key)));
    }
    if (key === 'end' && filterValue && filterValue.split(' - ')[1] !== '3000-01-01') {
      this.dateRange.set(key, filterValue);
      return new FormControl(Common.convertToDateInstance(this.dateRange.get(key)));
    }
    return new FormControl(null);
  }
}
