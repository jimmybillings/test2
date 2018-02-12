import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatDialogConfig } from '@angular/material';
import { Component, Output } from '@angular/core';
import { WzDialogService } from '../services/wz.dialog.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  ConfirmationDialogStrings,
  ConfirmationDialogOptions,
  defaultConfirmationDialogOptions,
  defaultNotificationDialogOptions
} from '../interfaces/wz.dialog.interface';

import {
  WzConfirmationDialogComponent,
  WzNotificationDialogComponent,
  WzFormDialogComponent,
} from '../components/index';

export function main() {
  describe('Wz Dialog Service', () => {
    let serviceUnderTest: WzDialogService;
    let mockDialogRef: any;
    let mockDialog: any;
    let mockComponentInstance: any;

    beforeEach(() => {
      mockComponentInstance = {};

      mockDialogRef = {
        componentInstance: mockComponentInstance,
        close: jasmine.createSpy('close'),
        afterClosed: () => 'thingReturnedByAfterClosed'
      };

      mockDialog = {
        open: jasmine.createSpy('open').and.returnValue(mockDialogRef),
        afterOpen: new BehaviorSubject(false),
        afterAllClosed: new BehaviorSubject(true)
      };

      serviceUnderTest = new WzDialogService(mockDialog);
    });

    describe('openNotificationDialog()', () => {
      it('should not open a dialog if a dialog is still open', () => {
        serviceUnderTest.openNotificationDialog({}).subscribe();
        mockDialog.afterOpen.next();
        serviceUnderTest.openNotificationDialog({}).subscribe();
        expect(mockDialog.open.calls.count()).toEqual(1);
      });

      it('should only open a second dialog once the first dialog has closed', () => {
        serviceUnderTest.openNotificationDialog({}).subscribe();
        mockDialog.afterOpen.next();
        mockDialog.afterAllClosed.next();
        serviceUnderTest.openNotificationDialog({}).subscribe();
        expect(mockDialog.open.calls.count()).toEqual(2);
      });

      it('should open a dialog', () => {
        serviceUnderTest.openNotificationDialog({}).subscribe();
        expect(mockDialog.open).toHaveBeenCalledWith(
          WzNotificationDialogComponent,
          defaultNotificationDialogOptions.dialogConfig
        );
      });

      it('should return the value of the afterClosed() method', () => {
        var testResponse: string;
        mockDialogRef.afterClosed = () => Observable.of('thingReturnedByAfterClosed');
        serviceUnderTest = new WzDialogService(mockDialog);
        serviceUnderTest.openNotificationDialog(
          { title: '', message: '' }
        ).do(response => testResponse = response).subscribe();
        expect(testResponse).toEqual('thingReturnedByAfterClosed');
      });
    });

    describe('openConfirmationDialog', () => {
      let acceptSubject: Subject<any>;
      let declineSubject: Subject<any>;
      let options: ConfirmationDialogOptions = {};

      beforeEach(() => {
        acceptSubject = new Subject<any>();
        declineSubject = new Subject<any>();

        mockComponentInstance.accept = acceptSubject.asObservable();
        mockComponentInstance.decline = declineSubject.asObservable();
      });

      it('should open a dialog with the right component and default config', () => {
        serviceUnderTest.openConfirmationDialog(options, null, null);

        expect(mockDialog.open).toHaveBeenCalledWith(
          WzConfirmationDialogComponent,
          defaultConfirmationDialogOptions.dialogConfig
        );
      });

      it('returns the value of dialogRef\'s afterClosed method', () => {
        expect(serviceUnderTest.openConfirmationDialog(options, null, null)).toEqual('thingReturnedByAfterClosed');
      });

      describe('component options', () => {
        it('should set a "strings" variable on the component instance', () => {
          options = { title: '', message: '', accept: '', decline: '' };
          expect(mockComponentInstance.strings).not.toBeDefined();
          serviceUnderTest.openConfirmationDialog(options, null, null);
          expect(mockComponentInstance.strings).toEqual({ title: '', message: '', accept: '', decline: '' });
        });
      });

      describe('dialog display options', () => {
        it('has default values', () => {
          serviceUnderTest.openConfirmationDialog({}, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(
            WzConfirmationDialogComponent,
            { disableClose: true, width: '375px', position: { top: '12%' } }
          );
        });

        it('can override disableClose', () => {
          serviceUnderTest.openConfirmationDialog({ dialogConfig: { disableClose: false } }, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(
            WzConfirmationDialogComponent,
            { disableClose: false, width: '375px', position: { top: '12%' } }
          );
        });

        it('can override the top position', () => {
          serviceUnderTest.openConfirmationDialog({ dialogConfig: { position: { top: '42%' } } }, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(
            WzConfirmationDialogComponent,
            { disableClose: true, width: '375px', position: { top: '42%' } }
          );
        });

        it('can add a height', () => {
          serviceUnderTest.openConfirmationDialog({ dialogConfig: { height: '500px' } }, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(
            WzConfirmationDialogComponent,
            { disableClose: true, width: '375px', position: { top: '12%' }, height: '500px' }
          );
        });

        it('can add a left position', () => {
          serviceUnderTest.openConfirmationDialog({ dialogConfig: { position: { left: '17%' } } }, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(
            WzConfirmationDialogComponent,
            { disableClose: true, width: '375px', position: { left: '17%', top: '12%' } }
          );
        });

        it('can override and add several properties at once', () => {
          const dialogConfig: MatDialogConfig = {
            disableClose: false, height: '300px', width: '900px', position: { left: '23%', top: '5%' }
          };

          serviceUnderTest.openConfirmationDialog({ dialogConfig: dialogConfig }, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(WzConfirmationDialogComponent, dialogConfig);
        });
      });

      describe('callbacks', () => {
        let acceptCallback: any;
        let declineCallback: any;
        beforeEach(() => {
          acceptCallback = jasmine.createSpy('acceptCallback');
          declineCallback = jasmine.createSpy('declineCallback');
        });

        it('should call the accept callback on the accept event', () => {
          serviceUnderTest.openConfirmationDialog(options, acceptCallback, declineCallback);
          acceptSubject.next();
          expect(acceptCallback).toHaveBeenCalled();
        });

        it('should call the decline callback on the decline event', () => {
          serviceUnderTest.openConfirmationDialog(options, acceptCallback, declineCallback);
          declineSubject.next();
          expect(declineCallback).toHaveBeenCalled();
        });
      });
    });

    describe('openComponentInDialog()', () => {
      function TestComponent() { }
      let testEvent: Observable<any>;
      beforeEach(() => {
        mockComponentInstance.testEvent = Observable.of({ 'testEvent': 123 });
      });

      mockDialogRef = {
        componentInstance: mockComponentInstance,
        close: jasmine.createSpy('close'),
        afterClosed: () => mockComponentInstance.testEvent
      };

      const options = {
        componentType: TestComponent,
        inputOptions: { testInput: { input: 123 } },
        outputOptions: [{ event: 'testEvent', callback: () => true }]
      };

      it('should open a dialog', () => {
        serviceUnderTest.openComponentInDialog(options);
        expect(mockDialog.open).toHaveBeenCalledWith(TestComponent, { position: {} });
      });

      it('should assign the input and output attributes correctly', () => {
        serviceUnderTest.openComponentInDialog(options);
        expect(mockDialogRef.componentInstance).toEqual({
          testEvent: Observable.of({ 'testEvent': 123 }),
          testInput: { input: 123 }
        });
      });

      it('should should handle a component without inputs', () => {
        delete options.inputOptions;
        serviceUnderTest.openComponentInDialog(options);
        expect(mockDialogRef.componentInstance).toEqual({
          testEvent: Observable.of({ 'testEvent': 123 })
        });
      });
    });

    describe('openFormDialog', () => {
      let formSubmitSubject: Subject<any>;
      let formCancelSubject: Subject<any>;

      beforeEach(() => {
        formSubmitSubject = new Subject<any>();
        formCancelSubject = new Subject<any>();

        mockComponentInstance.submit = formSubmitSubject.asObservable();
        mockComponentInstance.cancel = formCancelSubject.asObservable();
      });

      it('opens a dialog with the expected inner component', () => {
        serviceUnderTest.openFormDialog([], {}, null, null);

        expect(mockDialog.open).toHaveBeenCalledWith(WzFormDialogComponent, jasmine.any(Object));
      });

      it('returns the value of dialogRef\'s afterClosed method', () => {
        expect(serviceUnderTest.openFormDialog([], {}, null, null)).toEqual('thingReturnedByAfterClosed');
      });

      it('passes the form fields to the component', () => {
        serviceUnderTest.openFormDialog([{ a: 'field' }, { another: 'field' }] as any, {}, null, null);

        expect(mockComponentInstance.formItems).toEqual([{ a: 'field' }, { another: 'field' }]);
      });

      describe('component options', () => {
        it('has default values', () => {
          serviceUnderTest.openFormDialog([], {}, null, null);

          expect(mockComponentInstance.title).toBeUndefined();
          expect(mockComponentInstance.submitLabel).toEqual('Submit');
          expect(mockComponentInstance.cancelLabel).toEqual('Cancel');
          expect(mockComponentInstance.displayCancelButton).toBe(false);
          expect(mockComponentInstance.autocomplete).toEqual('on');
        });

        it('can override the dialog title', () => {
          serviceUnderTest.openFormDialog([], { title: 'My Dialog' }, null, null);

          expect(mockComponentInstance.title).toEqual('My Dialog');
        });

        it('can override the submit button label', () => {
          serviceUnderTest.openFormDialog([], { submitLabel: 'Do it already!' }, null, null);

          expect(mockComponentInstance.submitLabel).toEqual('Do it already!');
        });

        it('can override the cancel button label', () => {
          serviceUnderTest.openFormDialog([], { cancelLabel: 'Never mind' }, null, null);

          expect(mockComponentInstance.cancelLabel).toEqual('Never mind');
        });

        it('can choose to display the cancel button', () => {
          serviceUnderTest.openFormDialog([], { displayCancelButton: true }, null, null);

          expect(mockComponentInstance.displayCancelButton).toBe(true);
        });

        it('can override the autocomplete value', () => {
          serviceUnderTest.openFormDialog([], { autocomplete: 'field1 field2' }, null, null);

          expect(mockComponentInstance.autocomplete).toEqual('field1 field2');
        });
      });

      describe('dialog display options', () => {
        it('has default values', () => {
          serviceUnderTest.openFormDialog([], {}, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(WzFormDialogComponent, { disableClose: true, position: { top: '10%' } });
        });

        it('can override disableClose', () => {
          serviceUnderTest.openFormDialog([], { dialogConfig: { disableClose: false } }, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(WzFormDialogComponent, { disableClose: false, position: { top: '10%' } });
        });

        it('can override the top position', () => {
          serviceUnderTest.openFormDialog([], { dialogConfig: { position: { top: '42%' } } }, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(WzFormDialogComponent, { disableClose: true, position: { top: '42%' } });
        });

        it('can add a height', () => {
          serviceUnderTest.openFormDialog([], { dialogConfig: { height: '500px' } }, null, null);

          expect(mockDialog.open)
            .toHaveBeenCalledWith(WzFormDialogComponent, { disableClose: true, position: { top: '10%' }, height: '500px' });
        });

        it('can add a left position', () => {
          serviceUnderTest.openFormDialog([], { dialogConfig: { position: { left: '17%' } } }, null, null);

          expect(mockDialog.open)
            .toHaveBeenCalledWith(WzFormDialogComponent, { disableClose: true, position: { left: '17%', top: '10%' } });
        });

        it('can override and add several properties at once', () => {
          const dialogConfig: MatDialogConfig = {
            disableClose: false, height: '300px', width: '900px', position: { left: '23%', top: '5%' }
          };

          serviceUnderTest.openFormDialog([], { dialogConfig: dialogConfig }, null, null);

          expect(mockDialog.open).toHaveBeenCalledWith(WzFormDialogComponent, dialogConfig);
        });
      });

      describe('when the form is submitted', () => {
        it('closes the dialog', () => {
          serviceUnderTest.openFormDialog([], {}, null, null);
          formSubmitSubject.next({});

          expect(mockDialogRef.close).toHaveBeenCalled();
        });

        it('can handle a null onSubmit callback', () => {
          serviceUnderTest.openFormDialog([], {}, null, null);

          expect(() => formSubmitSubject.next({})).not.toThrow();
        });

        it('calls the onSubmit callback with a result', () => {
          const callback: jasmine.Spy = jasmine.createSpy('callback');

          serviceUnderTest.openFormDialog([], {}, callback, null);
          formSubmitSubject.next({ x: 37 });

          expect(callback).toHaveBeenCalledWith({ x: 37 }, jasmine.any(Object));
        });
      });

      describe('when the form is canceled', () => {
        it('closes the dialog', () => {
          serviceUnderTest.openFormDialog([], {}, null, null);
          formCancelSubject.next({});

          expect(mockDialogRef.close).toHaveBeenCalled();
        });

        it('can handle a null onCancel callback', () => {
          serviceUnderTest.openFormDialog([], {}, null, null);

          expect(() => formCancelSubject.next({})).not.toThrow();
        });

        it('can handle an undefined onCancel callback', () => {
          serviceUnderTest.openFormDialog([], {}, null);

          expect(() => formCancelSubject.next({})).not.toThrow();
        });

        it('calls the onCancel callback', () => {
          const callback: jasmine.Spy = jasmine.createSpy('callback');

          serviceUnderTest.openFormDialog([], {}, null, callback);
          formCancelSubject.next();

          expect(callback).toHaveBeenCalledWith(undefined, jasmine.any(Object));
        });
      });
    });
  });

  function newFunction(): any {
    return true;
  }
}


