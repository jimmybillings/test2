import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'project-asset-info-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="project-asset-count">
      <span *ngIf="count == 0">No Assets</span>
      <span *ngIf="count == 1">1 Asset</span>
      <span *ngIf="count > 1">{{ count }} Assets</span>
    </div>
  `
})
export class ProjectAssetInfoComponent {
  @Input() count: number;
}
