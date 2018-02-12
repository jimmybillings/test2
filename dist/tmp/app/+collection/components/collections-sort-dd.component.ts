import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
/**
 * Directive that renders a list of collections
 */

@Component({
  moduleId: module.id,
  selector: 'collections-sort-dd',
  templateUrl: 'collections-sort-dd.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CollectionSortDdComponent {
  @Input() currentSort: any;
  @Output() sort = new EventEmitter();
  @Output() close = new EventEmitter();
  public sortOptions: Array<any> = [];

  constructor() {
    this.sortOptions = [
      {
        'first': {
          'id': 0,
          'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_NEWEST',
          'value': 'modNewest',
          'sort': { 's': 'lastUpdated', 'd': true }
        },
        'second': {
          'id': 1,
          'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_OLDEST',
          'value': 'modOldest',
          'sort': { 's': 'lastUpdated', 'd': false }
        }
      },
      {
        'first': {
          'id': 2,
          'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_NEWEST',
          'value': 'createNewest',
          'sort': { 's': 'createdOn', 'd': true }
        },
        'second': {
          'id': 3,
          'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_OLDEST',
          'value': 'createOldest',
          'sort': { 's': 'createdOn', 'd': false }
        }
      },
      {
        'first': {
          'id': 4,
          'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_ASC',
          'value': 'alphaAsc',
          'sort': { 's': 'name', 'd': false }
        },
        'second': {
          'id': 5,
          'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_DESC',
          'value': 'alphaDesc',
          'sort': { 's': 'name', 'd': true }
        }
      }
    ];
  }

  public onSortResults(sortId: any) {
    this.sort.emit(sortId);
  }
}
