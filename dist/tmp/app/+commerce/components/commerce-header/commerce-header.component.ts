import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'commerce-header',
  templateUrl: 'commerce-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommerceHeaderComponent {
  @Input() type: 'QUOTE' | 'ORDER';
  @Input() sortOptions: any[];
  @Input() filterOptions: any[];
  @Input() currentSort: any;
  @Input() currentFilter: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() onSortResults: EventEmitter<any> = new EventEmitter();
  @Output() onFilterResults: EventEmitter<any> = new EventEmitter();
  public itemSearchIsShowing: boolean = false;

  public toggleSearch() {
    this.itemSearchIsShowing = !this.itemSearchIsShowing;
  }
}
