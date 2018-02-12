import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Gallery, GalleryResult, GalleryNavigationEvent } from '../../shared/interfaces/gallery-view.interface';

@Component({
  moduleId: module.id,
  selector: 'one-level-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'one-level-view.html'
})
export class OneLevelViewComponent {
  @Input() public data: Gallery;
  @Output() public navigate: EventEmitter<GalleryNavigationEvent> = new EventEmitter<GalleryNavigationEvent>();

  public onClick(result: GalleryResult) {
    this.navigate.emit({
      pathSegment: { ids: [result.id], names: [result.name] },
      method: result.hasMore ? 'nextLevel' : 'search'
    });
  }
}
