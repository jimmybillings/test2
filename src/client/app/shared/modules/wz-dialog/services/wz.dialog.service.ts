import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormFields } from '../../../../shared/interfaces/forms.interface';
import { MatDialogRef, MatDialog, MatDialogConfig, DialogPosition } from '@angular/material';

import {
  WzFormDialogComponent,
  WzNotificationDialogComponent,
  WzConfirmationDialogComponent,
} from '../components/index';

import {
  DialogCallback,
  DialogConfig,
  DialogOptions,
  DialogResultCallback,
  DialogNoResultCallback,
  FormDialogOptions,
  NotificationDialogOptions,
  ConfirmationDialogOptions,
  NotificationDialogStrings,
  ConfirmationDialogStrings,
  defaultFormDialogOptions,
  defaultConfirmationDialogOptions,
  defaultNotificationDialogOptions,
  DefaultComponentOptions
} from '../interfaces/wz.dialog.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WzDialogService {
  private dialogIsClosed: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(private dialog: MatDialog) {
    dialog.afterOpen.subscribe(() => this.dialogIsClosed.next(false));
    dialog.afterAllClosed.subscribe(() => this.dialogIsClosed.next(true));
  }

  public openNotificationDialog(options: NotificationDialogOptions): Observable<any> {
    const mergedDialogConfig: MatDialogConfig = this.mergeDialogConfigs(defaultNotificationDialogOptions, options);
    const mergedOptions: NotificationDialogOptions = Object.assign({}, defaultNotificationDialogOptions, options);

    return this.dialogIsClosed
      .filter((isClosed) => isClosed === true)
      .take(1)
      .map(() => {

        const dialogRef: MatDialogRef<WzNotificationDialogComponent> = this.dialog.open(
          WzNotificationDialogComponent,
          mergedDialogConfig
        );

        dialogRef.componentInstance.strings = {
          title: mergedOptions.title,
          message: mergedOptions.message,
          prompt: mergedOptions.prompt
        };

        return dialogRef;
      })
      .switchMap(dialogRef => dialogRef.afterClosed());
  }

  public openConfirmationDialog(
    options: ConfirmationDialogOptions,
    onAccept: DialogNoResultCallback,
    onDecline: DialogNoResultCallback = () => { }
  ): Observable<any> {
    const mergedDialogConfig: MatDialogConfig = this.mergeDialogConfigs(defaultConfirmationDialogOptions, options);
    const mergedOptions: ConfirmationDialogOptions = Object.assign({}, defaultConfirmationDialogOptions, options);

    const dialogRef: MatDialogRef<WzConfirmationDialogComponent> = this.dialog.open(
      WzConfirmationDialogComponent,
      mergedDialogConfig
    );
    const component: WzConfirmationDialogComponent = dialogRef.componentInstance;

    dialogRef.componentInstance.strings = {
      title: mergedOptions.title,
      message: mergedOptions.message,
      accept: mergedOptions.accept,
      decline: mergedOptions.decline,
    };

    this.setupCallbacks(component, dialogRef, [
      { event: 'accept', callback: onAccept, closeOnEvent: false },
      { event: 'decline', callback: onDecline, closeOnEvent: false }
    ]);

    return dialogRef.afterClosed();
  }

  public openFormDialog(
    formItems: FormFields[],
    options: FormDialogOptions,
    onSubmit: DialogResultCallback,
    onCancel: DialogNoResultCallback = () => { }
  ): Observable<any> {
    const mergedDialogConfig: MatDialogConfig = this.mergeDialogConfigs(defaultFormDialogOptions, options);
    const mergedOptions: FormDialogOptions = Object.assign({}, defaultFormDialogOptions, options);

    const dialogRef: MatDialogRef<WzFormDialogComponent> = this.dialog.open(WzFormDialogComponent, mergedDialogConfig);
    const component: WzFormDialogComponent = dialogRef.componentInstance;

    Object.assign(component, { formItems: formItems }, mergedOptions);

    this.setupCallbacks(component, dialogRef, [
      { event: 'submit', callback: onSubmit, closeOnEvent: true },
      { event: 'cancel', callback: onCancel, closeOnEvent: true },
    ]);

    return dialogRef.afterClosed();
  }

  public openComponentInDialog(options: DefaultComponentOptions) {
    const mergedDialogConfig: MatDialogConfig = this.mergeDialogConfigs(
      {}, { dialogConfig: options.dialogConfig } || {});
    const dialogRef: MatDialogRef<any> = this.dialog.open(options.componentType, mergedDialogConfig);
    const component: any = dialogRef.componentInstance;

    if (options.inputOptions) Object.assign(component, options.inputOptions);
    if (options.outputOptions) this.setupCallbacks(component, dialogRef, options.outputOptions);

    return dialogRef.afterClosed();
  }

  private setupCallbacks(component: any, dialogRef: MatDialogRef<any>, outputOptions: Array<DialogCallback>): void {
    outputOptions.forEach((cb: DialogCallback) => {
      component[cb.event].subscribe((event?: any) => {
        if (cb.closeOnEvent) dialogRef.close(event);
        if (cb.callback) cb.callback(event, dialogRef);
      });
    });
  }

  private mergeDialogConfigs(defaultOptions: DialogOptions, options: DialogOptions): MatDialogConfig {
    const mergedDialogPosition: DialogPosition =
      Object.assign({}, (defaultOptions.dialogConfig || {}).position, (options.dialogConfig || {}).position);

    return Object.assign({}, defaultOptions.dialogConfig, options.dialogConfig, { position: mergedDialogPosition });
  }
}
