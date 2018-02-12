import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'wz-notification-dialog',
  template: `
    <h1 mat-dialog-title>{{ strings.title | translate }}</h1>
    <mat-dialog-content layout="row">
      <div flex>{{ strings.message | translate }}</div>
    </mat-dialog-content>
    <mat-dialog-actions layout="row" layout-align="end end">
      <button mat-button mat-dialog-close color="primary" title="{{ strings.prompt | translate }}">
        {{ strings.prompt | translate }}
      </button>
    </mat-dialog-actions>
  `
})
export class WzNotificationDialogComponent {
  @Input() strings: any;
}
