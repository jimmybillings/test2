import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
/**
 * Directive that renders a list of collections
 */

@Component({
  moduleId: module.id,
  selector: 'collections-filter-dd',
  templateUrl: 'collections-filter-dd.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CollectionFilterDdComponent {
  @Input() currentFilter: any;
  @Output() filter = new EventEmitter();
  @Output() close = new EventEmitter();
  public filterOptions: Array<any> = [];

  constructor() {
    this.filterOptions = [
      {
        'first': {
          'id': 0,
          'name': 'COLLECTION.INDEX.FILTER_DD_MENU.ALL',
          'value': 'all',
          'access': { 'accessLevel': 'all' }
        }
      },
      {
        'first': {
          'id': 1,
          'name': 'COLLECTION.INDEX.FILTER_DD_MENU.OWNER',
          'value': 'owner',
          'access': { 'accessLevel': 'owner' }
        },
        'second': {
          'id': 2,
          'name': 'COLLECTION.INDEX.FILTER_DD_MENU.EDITOR',
          'value': 'editor',
          'access': { 'accessLevel': 'editor' }
        },
        'third': {
          'id': 3,
          'name': 'COLLECTION.INDEX.FILTER_DD_MENU.VIEWER',
          'value': 'viewer',
          'access': { 'accessLevel': 'viewer' }
        }
      },
      {
        'first': {
          'id': 4,
          'name': 'COLLECTION.INDEX.FILTER_DD_MENU.RESEARCHER',
          'value': 'researcher',
          'access': { 'accessLevel': 'researcher' }
        }
      }
    ];
  }

  public closeCollectionsFiltertDd(): void {
    this.close.emit();
  }

  public onFilterResults(filter: any) {
    this.filter.emit(filter);
  }
}
