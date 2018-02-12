import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'project-price-info-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="project-subtotal mat-caption">
      <strong>{{ 'CART.PROJECTS.PROJECT_SUBTOTAL' | translate }}</strong> 
      <span>{{ subtotal | currency:'USD':true:'1.2-2' }}</span>
    </div>
  `
})
export class ProjectPriceInfoComponent {
  @Input() subtotal: number;
}
