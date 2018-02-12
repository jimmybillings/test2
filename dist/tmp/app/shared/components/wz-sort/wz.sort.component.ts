import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'wz-sort-component',
  templateUrl: 'wz.sort.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzSortComponent {
  @Input() items: Array<any>;
  @Input() current: any;
  @Output() sort = new EventEmitter();

  public applySort(sortDefinition: any): void {
    this.sort.emit(sortDefinition);
  }
}
