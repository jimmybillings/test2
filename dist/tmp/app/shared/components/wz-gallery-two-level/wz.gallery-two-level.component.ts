import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Gallery, GalleryResult, GalleryNavigationEvent } from '../../../shared/interfaces/gallery-view.interface';

@Component({
  moduleId: module.id,
  selector: 'two-level-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'wz.gallery-two-level.html'
})
export class WzGalleryTwoLevelComponent {
  @Input() public data: Gallery;
  @Output() public navigate: EventEmitter<GalleryNavigationEvent> = new EventEmitter<GalleryNavigationEvent>();
  public activeItemHovered: boolean = false;
  public activeRow: number;

  public onClick(result: GalleryResult, child: GalleryResult) {
    this.navigate.emit({
      pathSegment: { ids: [result.id, child.id], names: [result.name, child.name] },
      method: child.hasMore ? 'nextLevel' : 'search'
    });
  }
  public onMouseOver(child: GalleryResult, index: number): void {
    this.activeItemHovered = child.resultCount > 0 ? true : false;
    this.activeRow = index;
  }
  public onMouseOut(child: GalleryResult): void {
    this.activeItemHovered = false;
  }
}
