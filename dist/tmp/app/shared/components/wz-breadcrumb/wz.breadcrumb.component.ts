import { Component, Input, Output, EventEmitter, Inject, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { DateRange } from '../../utilities/dateRange';

@Component({
  moduleId: module.id,
  selector: 'breadcrumb-component',
  templateUrl: 'wz.breadcrumb.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzBreadcrumbComponent {
  @Input()
  set filters(value: any) {
    this.activeFilters = [];
    this.getFilters(value);
  }
  @Output() onFilterEvent = new EventEmitter();
  public activeFilters: any = [];
  public toggleFilter(filter: any) {
    this.onFilterEvent.emit({ event: 'toggleFilter', filter: filter });
  }

  public clearFilters() {
    this.onFilterEvent.emit({ event: 'clearFilters' });
  }

  public formattedValueFor(filter: any): string {
    if (filter.type === 'DateRange') {
      const dateRange: DateRange = new DateRange();
      dateRange.set('start', filter.filterValue);
      dateRange.set('end', filter.filterValue);
      return dateRange.toHumanString();
    }

    return filter.filterValue;
  }

  private getFilters(filter: any) {
    if (filter.subFilters) {
      for (var l of filter.subFilters) this.getFilters(l);
      return filter;
    } else {
      if (filter.active) this.activeFilters.push(filter);
      return filter;
    }
  }
}
