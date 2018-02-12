import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wz-gallery-breadcrumb',
  templateUrl: 'wz.gallery-breadcrumb.html',
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WzGalleryBreadcrumbComponent {
  @Input() path: any;
  @Output() clickBreadcrumb: EventEmitter<any> = new EventEmitter();

  public breadcrumbLabelFor(segment: any): string {
    return (segment && segment.names) ? segment.names.join(' : ') : '';
  }
}
