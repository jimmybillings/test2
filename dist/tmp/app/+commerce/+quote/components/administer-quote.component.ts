import { WzDialogService } from '../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Pojo } from '../../../shared/interfaces/common.interface';

@Component({
  moduleId: module.id,
  selector: 'administer-quote-component',
  template: `
    <div flex="100" layout-gt-xs="row" layout="column" layout-align="space-between end" layout-align-xs="end end">
      <div class="reject-quote" flex-gt-xs="auto" flex="100" flex-order-xs="2">	
        <button mat-button color="primary" (click)="onOpenDeleteDialog()">
          <mat-icon>delete</mat-icon>{{ 'QUOTE.DELETE_BTN' | translate }}
        </button>
      </div>
      <section flex-gt-xs="65" flex="100" class="action-items" flex-order-xs="-1">
        <button
        mat-button
        color="primary"
        [disabled]="!shouldShowCloneButton"
        (click)="onClickCloneQuoteButton()">
        {{ 'QUOTE.CLONE_QUOTE' | translate }}
        </button>
        <button
        mat-button
        color="primary"
        (click)="onSaveAndNew()">
        {{ 'QUOTE.SAVE_AND_NEW' | translate }}
        </button>
        <button
          [disabled]="!userCanProceed"
          mat-raised-button
          color="primary"
          (click)="goToNextTab()">
          {{ 'QUOTE.EDIT.TO_RECIPIENT_TAB_BTN' | translate }}
        </button>
      </section>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdministerQuoteComponent {
  @Input() public userCanProceed: boolean;
  @Input() public shouldShowCloneButton: boolean;
  @Output() public notify: EventEmitter<Pojo> = new EventEmitter();

  public onSaveAndNew() {
    this.notify.emit({ type: 'SAVE_AND_NEW' });
  }

  public onOpenDeleteDialog() {
    this.notify.emit({ type: 'OPEN_DELETE_DIALOG' });
  }

  public onClickCloneQuoteButton() {
    this.notify.emit({ type: 'CLONE_QUOTE' });
  }

  public goToNextTab() {
    this.notify.emit({ type: 'GO_TO_NEXT_TAB' });
  }
}
