import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'wz-coming-soon',
  template: `<mat-card  class="wz-dialog">
    <mat-card-title>Coming Soon!</mat-card-title>
    <mat-card-subtitle>Apologies!! This feature has not been implemented yet. Please keep checking for it.</mat-card-subtitle>
    <mat-card-actions align="end" class="confirmation-buttons">
      <button mat-button mat-dialog-close color="primary">Close</button>
    </mat-card-actions>
  </mat-card>`,
  styles: [
    'mat-card.wz-dialog{ box-shadow: none; padding: 0 2px 6px 0;}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzComingSoonComponent {

}
