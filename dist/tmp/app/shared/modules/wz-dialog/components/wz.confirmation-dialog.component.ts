import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationDialogStrings, TranslationKeyAndValues } from '../interfaces/wz.dialog.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>{{ title.key | translate:title.values }}</h1>
    <mat-dialog-content layout="row">
      <div flex>{{ message.key | translate:message.values }}</div>
    </mat-dialog-content>
    <mat-dialog-actions layout="row" layout-align="end end">
      <button (click)="onClickDecline()" mat-button mat-dialog-close color="primary">
        {{ strings.decline | translate }}
      </button>
      <button (click)="onClickAccept()" mat-button mat-dialog-close color="primary">
        {{ strings.accept | translate }}
      </button>
    </mat-dialog-actions>
  `
})
export class WzConfirmationDialogComponent {
  @Input() strings: ConfirmationDialogStrings;
  @Output() accept: EventEmitter<null> = new EventEmitter();
  @Output() decline: EventEmitter<null> = new EventEmitter();

  public onClickAccept(): void {
    this.accept.emit();
  }

  public onClickDecline(): void {
    this.decline.emit();
  }

  public get title(): TranslationKeyAndValues {
    return this.toTrString(this.strings.title);
  }

  public get message(): TranslationKeyAndValues {
    return this.toTrString(this.strings.message);
  }

  private toTrString(s: string | TranslationKeyAndValues): TranslationKeyAndValues {
    if (typeof s === 'string') return { key: s, values: {} };
    return s;
  }
}
