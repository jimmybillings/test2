"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var wz_dialog_service_1 = require("../services/wz.dialog.service");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var wz_dialog_interface_1 = require("../interfaces/wz.dialog.interface");
var index_1 = require("../components/index");
function main() {
    describe('Wz Dialog Service', function () {
        var serviceUnderTest;
        var mockDialogRef;
        var mockDialog;
        var mockComponentInstance;
        beforeEach(function () {
            mockComponentInstance = {};
            mockDialogRef = {
                componentInstance: mockComponentInstance,
                close: jasmine.createSpy('close'),
                afterClosed: function () { return 'thingReturnedByAfterClosed'; }
            };
            mockDialog = {
                open: jasmine.createSpy('open').and.returnValue(mockDialogRef),
                afterOpen: new BehaviorSubject_1.BehaviorSubject(false),
                afterAllClosed: new BehaviorSubject_1.BehaviorSubject(true)
            };
            serviceUnderTest = new wz_dialog_service_1.WzDialogService(mockDialog);
        });
        describe('openNotificationDialog()', function () {
            it('should not open a dialog if a dialog is still open', function () {
                serviceUnderTest.openNotificationDialog({}).subscribe();
                mockDialog.afterOpen.next();
                serviceUnderTest.openNotificationDialog({}).subscribe();
                expect(mockDialog.open.calls.count()).toEqual(1);
            });
            it('should only open a second dialog once the first dialog has closed', function () {
                serviceUnderTest.openNotificationDialog({}).subscribe();
                mockDialog.afterOpen.next();
                mockDialog.afterAllClosed.next();
                serviceUnderTest.openNotificationDialog({}).subscribe();
                expect(mockDialog.open.calls.count()).toEqual(2);
            });
            it('should open a dialog', function () {
                serviceUnderTest.openNotificationDialog({}).subscribe();
                expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzNotificationDialogComponent, wz_dialog_interface_1.defaultNotificationDialogOptions.dialogConfig);
            });
            it('should return the value of the afterClosed() method', function () {
                var testResponse;
                mockDialogRef.afterClosed = function () { return Observable_1.Observable.of('thingReturnedByAfterClosed'); };
                serviceUnderTest = new wz_dialog_service_1.WzDialogService(mockDialog);
                serviceUnderTest.openNotificationDialog({ title: '', message: '' }).do(function (response) { return testResponse = response; }).subscribe();
                expect(testResponse).toEqual('thingReturnedByAfterClosed');
            });
        });
        describe('openConfirmationDialog', function () {
            var acceptSubject;
            var declineSubject;
            var options = {};
            beforeEach(function () {
                acceptSubject = new Subject_1.Subject();
                declineSubject = new Subject_1.Subject();
                mockComponentInstance.accept = acceptSubject.asObservable();
                mockComponentInstance.decline = declineSubject.asObservable();
            });
            it('should open a dialog with the right component and default config', function () {
                serviceUnderTest.openConfirmationDialog(options, null, null);
                expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzConfirmationDialogComponent, wz_dialog_interface_1.defaultConfirmationDialogOptions.dialogConfig);
            });
            it('returns the value of dialogRef\'s afterClosed method', function () {
                expect(serviceUnderTest.openConfirmationDialog(options, null, null)).toEqual('thingReturnedByAfterClosed');
            });
            describe('component options', function () {
                it('should set a "strings" variable on the component instance', function () {
                    options = { title: '', message: '', accept: '', decline: '' };
                    expect(mockComponentInstance.strings).not.toBeDefined();
                    serviceUnderTest.openConfirmationDialog(options, null, null);
                    expect(mockComponentInstance.strings).toEqual({ title: '', message: '', accept: '', decline: '' });
                });
            });
            describe('dialog display options', function () {
                it('has default values', function () {
                    serviceUnderTest.openConfirmationDialog({}, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzConfirmationDialogComponent, { disableClose: true, width: '375px', position: { top: '12%' } });
                });
                it('can override disableClose', function () {
                    serviceUnderTest.openConfirmationDialog({ dialogConfig: { disableClose: false } }, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzConfirmationDialogComponent, { disableClose: false, width: '375px', position: { top: '12%' } });
                });
                it('can override the top position', function () {
                    serviceUnderTest.openConfirmationDialog({ dialogConfig: { position: { top: '42%' } } }, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzConfirmationDialogComponent, { disableClose: true, width: '375px', position: { top: '42%' } });
                });
                it('can add a height', function () {
                    serviceUnderTest.openConfirmationDialog({ dialogConfig: { height: '500px' } }, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzConfirmationDialogComponent, { disableClose: true, width: '375px', position: { top: '12%' }, height: '500px' });
                });
                it('can add a left position', function () {
                    serviceUnderTest.openConfirmationDialog({ dialogConfig: { position: { left: '17%' } } }, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzConfirmationDialogComponent, { disableClose: true, width: '375px', position: { left: '17%', top: '12%' } });
                });
                it('can override and add several properties at once', function () {
                    var dialogConfig = {
                        disableClose: false, height: '300px', width: '900px', position: { left: '23%', top: '5%' }
                    };
                    serviceUnderTest.openConfirmationDialog({ dialogConfig: dialogConfig }, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzConfirmationDialogComponent, dialogConfig);
                });
            });
            describe('callbacks', function () {
                var acceptCallback;
                var declineCallback;
                beforeEach(function () {
                    acceptCallback = jasmine.createSpy('acceptCallback');
                    declineCallback = jasmine.createSpy('declineCallback');
                });
                it('should call the accept callback on the accept event', function () {
                    serviceUnderTest.openConfirmationDialog(options, acceptCallback, declineCallback);
                    acceptSubject.next();
                    expect(acceptCallback).toHaveBeenCalled();
                });
                it('should call the decline callback on the decline event', function () {
                    serviceUnderTest.openConfirmationDialog(options, acceptCallback, declineCallback);
                    declineSubject.next();
                    expect(declineCallback).toHaveBeenCalled();
                });
            });
        });
        describe('openComponentInDialog()', function () {
            function TestComponent() { }
            var testEvent;
            beforeEach(function () {
                mockComponentInstance.testEvent = Observable_1.Observable.of({ 'testEvent': 123 });
            });
            mockDialogRef = {
                componentInstance: mockComponentInstance,
                close: jasmine.createSpy('close'),
                afterClosed: function () { return mockComponentInstance.testEvent; }
            };
            var options = {
                componentType: TestComponent,
                inputOptions: { testInput: { input: 123 } },
                outputOptions: [{ event: 'testEvent', callback: function () { return true; } }]
            };
            it('should open a dialog', function () {
                serviceUnderTest.openComponentInDialog(options);
                expect(mockDialog.open).toHaveBeenCalledWith(TestComponent, { position: {} });
            });
            it('should assign the input and output attributes correctly', function () {
                serviceUnderTest.openComponentInDialog(options);
                expect(mockDialogRef.componentInstance).toEqual({
                    testEvent: Observable_1.Observable.of({ 'testEvent': 123 }),
                    testInput: { input: 123 }
                });
            });
            it('should should handle a component without inputs', function () {
                delete options.inputOptions;
                serviceUnderTest.openComponentInDialog(options);
                expect(mockDialogRef.componentInstance).toEqual({
                    testEvent: Observable_1.Observable.of({ 'testEvent': 123 })
                });
            });
        });
        describe('openFormDialog', function () {
            var formSubmitSubject;
            var formCancelSubject;
            beforeEach(function () {
                formSubmitSubject = new Subject_1.Subject();
                formCancelSubject = new Subject_1.Subject();
                mockComponentInstance.submit = formSubmitSubject.asObservable();
                mockComponentInstance.cancel = formCancelSubject.asObservable();
            });
            it('opens a dialog with the expected inner component', function () {
                serviceUnderTest.openFormDialog([], {}, null, null);
                expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzFormDialogComponent, jasmine.any(Object));
            });
            it('returns the value of dialogRef\'s afterClosed method', function () {
                expect(serviceUnderTest.openFormDialog([], {}, null, null)).toEqual('thingReturnedByAfterClosed');
            });
            it('passes the form fields to the component', function () {
                serviceUnderTest.openFormDialog([{ a: 'field' }, { another: 'field' }], {}, null, null);
                expect(mockComponentInstance.formItems).toEqual([{ a: 'field' }, { another: 'field' }]);
            });
            describe('component options', function () {
                it('has default values', function () {
                    serviceUnderTest.openFormDialog([], {}, null, null);
                    expect(mockComponentInstance.title).toBeUndefined();
                    expect(mockComponentInstance.submitLabel).toEqual('Submit');
                    expect(mockComponentInstance.cancelLabel).toEqual('Cancel');
                    expect(mockComponentInstance.displayCancelButton).toBe(false);
                    expect(mockComponentInstance.autocomplete).toEqual('on');
                });
                it('can override the dialog title', function () {
                    serviceUnderTest.openFormDialog([], { title: 'My Dialog' }, null, null);
                    expect(mockComponentInstance.title).toEqual('My Dialog');
                });
                it('can override the submit button label', function () {
                    serviceUnderTest.openFormDialog([], { submitLabel: 'Do it already!' }, null, null);
                    expect(mockComponentInstance.submitLabel).toEqual('Do it already!');
                });
                it('can override the cancel button label', function () {
                    serviceUnderTest.openFormDialog([], { cancelLabel: 'Never mind' }, null, null);
                    expect(mockComponentInstance.cancelLabel).toEqual('Never mind');
                });
                it('can choose to display the cancel button', function () {
                    serviceUnderTest.openFormDialog([], { displayCancelButton: true }, null, null);
                    expect(mockComponentInstance.displayCancelButton).toBe(true);
                });
                it('can override the autocomplete value', function () {
                    serviceUnderTest.openFormDialog([], { autocomplete: 'field1 field2' }, null, null);
                    expect(mockComponentInstance.autocomplete).toEqual('field1 field2');
                });
            });
            describe('dialog display options', function () {
                it('has default values', function () {
                    serviceUnderTest.openFormDialog([], {}, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzFormDialogComponent, { disableClose: true, position: { top: '10%' } });
                });
                it('can override disableClose', function () {
                    serviceUnderTest.openFormDialog([], { dialogConfig: { disableClose: false } }, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzFormDialogComponent, { disableClose: false, position: { top: '10%' } });
                });
                it('can override the top position', function () {
                    serviceUnderTest.openFormDialog([], { dialogConfig: { position: { top: '42%' } } }, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzFormDialogComponent, { disableClose: true, position: { top: '42%' } });
                });
                it('can add a height', function () {
                    serviceUnderTest.openFormDialog([], { dialogConfig: { height: '500px' } }, null, null);
                    expect(mockDialog.open)
                        .toHaveBeenCalledWith(index_1.WzFormDialogComponent, { disableClose: true, position: { top: '10%' }, height: '500px' });
                });
                it('can add a left position', function () {
                    serviceUnderTest.openFormDialog([], { dialogConfig: { position: { left: '17%' } } }, null, null);
                    expect(mockDialog.open)
                        .toHaveBeenCalledWith(index_1.WzFormDialogComponent, { disableClose: true, position: { left: '17%', top: '10%' } });
                });
                it('can override and add several properties at once', function () {
                    var dialogConfig = {
                        disableClose: false, height: '300px', width: '900px', position: { left: '23%', top: '5%' }
                    };
                    serviceUnderTest.openFormDialog([], { dialogConfig: dialogConfig }, null, null);
                    expect(mockDialog.open).toHaveBeenCalledWith(index_1.WzFormDialogComponent, dialogConfig);
                });
            });
            describe('when the form is submitted', function () {
                it('closes the dialog', function () {
                    serviceUnderTest.openFormDialog([], {}, null, null);
                    formSubmitSubject.next({});
                    expect(mockDialogRef.close).toHaveBeenCalled();
                });
                it('can handle a null onSubmit callback', function () {
                    serviceUnderTest.openFormDialog([], {}, null, null);
                    expect(function () { return formSubmitSubject.next({}); }).not.toThrow();
                });
                it('calls the onSubmit callback with a result', function () {
                    var callback = jasmine.createSpy('callback');
                    serviceUnderTest.openFormDialog([], {}, callback, null);
                    formSubmitSubject.next({ x: 37 });
                    expect(callback).toHaveBeenCalledWith({ x: 37 }, jasmine.any(Object));
                });
            });
            describe('when the form is canceled', function () {
                it('closes the dialog', function () {
                    serviceUnderTest.openFormDialog([], {}, null, null);
                    formCancelSubject.next({});
                    expect(mockDialogRef.close).toHaveBeenCalled();
                });
                it('can handle a null onCancel callback', function () {
                    serviceUnderTest.openFormDialog([], {}, null, null);
                    expect(function () { return formCancelSubject.next({}); }).not.toThrow();
                });
                it('can handle an undefined onCancel callback', function () {
                    serviceUnderTest.openFormDialog([], {}, null);
                    expect(function () { return formCancelSubject.next({}); }).not.toThrow();
                });
                it('calls the onCancel callback', function () {
                    var callback = jasmine.createSpy('callback');
                    serviceUnderTest.openFormDialog([], {}, null, callback);
                    formCancelSubject.next();
                    expect(callback).toHaveBeenCalledWith(undefined, jasmine.any(Object));
                });
            });
        });
    });
    function newFunction() {
        return true;
    }
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3Qyx3Q0FBdUM7QUFHdkMsbUVBQWdFO0FBQ2hFLHdEQUF1RDtBQUV2RCx5RUFLMkM7QUFFM0MsNkNBSTZCO0FBRTdCO0lBQ0UsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLElBQUksZ0JBQWlDLENBQUM7UUFDdEMsSUFBSSxhQUFrQixDQUFDO1FBQ3ZCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUkscUJBQTBCLENBQUM7UUFFL0IsVUFBVSxDQUFDO1lBQ1QscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1lBRTNCLGFBQWEsR0FBRztnQkFDZCxpQkFBaUIsRUFBRSxxQkFBcUI7Z0JBQ3hDLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDakMsV0FBVyxFQUFFLGNBQU0sT0FBQSw0QkFBNEIsRUFBNUIsQ0FBNEI7YUFDaEQsQ0FBQztZQUVGLFVBQVUsR0FBRztnQkFDWCxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztnQkFDOUQsU0FBUyxFQUFFLElBQUksaUNBQWUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JDLGNBQWMsRUFBRSxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDO2FBQzFDLENBQUM7WUFFRixnQkFBZ0IsR0FBRyxJQUFJLG1DQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsMEJBQTBCLEVBQUU7WUFDbkMsRUFBRSxDQUFDLG9EQUFvRCxFQUFFO2dCQUN2RCxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDeEQsVUFBVSxDQUFDLFNB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QyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRTVELGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDeEQsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRXpCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVIO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDO0FBcFlELG9CQW9ZQyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFd6RGlhbG9nU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcblxuaW1wb3J0IHtcbiAgQ29uZmlybWF0aW9uRGlhbG9nU3RyaW5ncyxcbiAgQ29uZmlybWF0aW9uRGlhbG9nT3B0aW9ucyxcbiAgZGVmYXVsdENvbmZpcm1hdGlvbkRpYWxvZ09wdGlvbnMsXG4gIGRlZmF1bHROb3RpZmljYXRpb25EaWFsb2dPcHRpb25zXG59IGZyb20gJy4uL2ludGVyZmFjZXMvd3ouZGlhbG9nLmludGVyZmFjZSc7XG5cbmltcG9ydCB7XG4gIFd6Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50LFxuICBXek5vdGlmaWNhdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgV3pGb3JtRGlhbG9nQ29tcG9uZW50LFxufSBmcm9tICcuLi9jb21wb25lbnRzL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdXeiBEaWFsb2cgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogV3pEaWFsb2dTZXJ2aWNlO1xuICAgIGxldCBtb2NrRGlhbG9nUmVmOiBhbnk7XG4gICAgbGV0IG1vY2tEaWFsb2c6IGFueTtcbiAgICBsZXQgbW9ja0NvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tDb21wb25lbnRJbnN0YW5jZSA9IHt9O1xuXG4gICAgICBtb2NrRGlhbG9nUmVmID0ge1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZTogbW9ja0NvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoJ2Nsb3NlJyksXG4gICAgICAgIGFmdGVyQ2xvc2VkOiAoKSA9PiAndGhpbmdSZXR1cm5lZEJ5QWZ0ZXJDbG9zZWQnXG4gICAgICB9O1xuXG4gICAgICBtb2NrRGlhbG9nID0ge1xuICAgICAgICBvcGVuOiBqYXNtaW5lLmNyZWF0ZVNweSgnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZShtb2NrRGlhbG9nUmVmKSxcbiAgICAgICAgYWZ0ZXJPcGVuOiBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKSxcbiAgICAgICAgYWZ0ZXJBbGxDbG9zZWQ6IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSlcbiAgICAgIH07XG5cbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgV3pEaWFsb2dTZXJ2aWNlKG1vY2tEaWFsb2cpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29wZW5Ob3RpZmljYXRpb25EaWFsb2coKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgbm90IG9wZW4gYSBkaWFsb2cgaWYgYSBkaWFsb2cgaXMgc3RpbGwgb3BlbicsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuTm90aWZpY2F0aW9uRGlhbG9nKHt9KS5zdWJzY3JpYmUoKTtcbiAgICAgICAgbW9ja0RpYWxvZy5hZnRlck9wZW4ubmV4dCgpO1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Ob3RpZmljYXRpb25EaWFsb2coe30pLnN1YnNjcmliZSgpO1xuICAgICAgICBleHBlY3QobW9ja0RpYWxvZy5vcGVuLmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoMSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBvbmx5IG9wZW4gYSBzZWNvbmQgZGlhbG9nIG9uY2UgdGhlIGZpcnN0IGRpYWxvZyBoYXMgY2xvc2VkJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Ob3RpZmljYXRpb25EaWFsb2coe30pLnN1YnNjcmliZSgpO1xuICAgICAgICBtb2NrRGlhbG9nLmFmdGVyT3Blbi5uZXh0KCk7XG4gICAgICAgIG1vY2tEaWFsb2cuYWZ0ZXJBbGxDbG9zZWQubmV4dCgpO1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Ob3RpZmljYXRpb25EaWFsb2coe30pLnN1YnNjcmliZSgpO1xuICAgICAgICBleHBlY3QobW9ja0RpYWxvZy5vcGVuLmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoMik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBvcGVuIGEgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Ob3RpZmljYXRpb25EaWFsb2coe30pLnN1YnNjcmliZSgpO1xuICAgICAgICBleHBlY3QobW9ja0RpYWxvZy5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICBXek5vdGlmaWNhdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgICBkZWZhdWx0Tm90aWZpY2F0aW9uRGlhbG9nT3B0aW9ucy5kaWFsb2dDb25maWdcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGFmdGVyQ2xvc2VkKCkgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICB2YXIgdGVzdFJlc3BvbnNlOiBzdHJpbmc7XG4gICAgICAgIG1vY2tEaWFsb2dSZWYuYWZ0ZXJDbG9zZWQgPSAoKSA9PiBPYnNlcnZhYmxlLm9mKCd0aGluZ1JldHVybmVkQnlBZnRlckNsb3NlZCcpO1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IFd6RGlhbG9nU2VydmljZShtb2NrRGlhbG9nKTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuTm90aWZpY2F0aW9uRGlhbG9nKFxuICAgICAgICAgIHsgdGl0bGU6ICcnLCBtZXNzYWdlOiAnJyB9XG4gICAgICAgICkuZG8ocmVzcG9uc2UgPT4gdGVzdFJlc3BvbnNlID0gcmVzcG9uc2UpLnN1YnNjcmliZSgpO1xuICAgICAgICBleHBlY3QodGVzdFJlc3BvbnNlKS50b0VxdWFsKCd0aGluZ1JldHVybmVkQnlBZnRlckNsb3NlZCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb3BlbkNvbmZpcm1hdGlvbkRpYWxvZycsICgpID0+IHtcbiAgICAgIGxldCBhY2NlcHRTdWJqZWN0OiBTdWJqZWN0PGFueT47XG4gICAgICBsZXQgZGVjbGluZVN1YmplY3Q6IFN1YmplY3Q8YW55PjtcbiAgICAgIGxldCBvcHRpb25zOiBDb25maXJtYXRpb25EaWFsb2dPcHRpb25zID0ge307XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBhY2NlcHRTdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgICAgICBkZWNsaW5lU3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgICAgICBtb2NrQ29tcG9uZW50SW5zdGFuY2UuYWNjZXB0ID0gYWNjZXB0U3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICAgICAgbW9ja0NvbXBvbmVudEluc3RhbmNlLmRlY2xpbmUgPSBkZWNsaW5lU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIG9wZW4gYSBkaWFsb2cgd2l0aCB0aGUgcmlnaHQgY29tcG9uZW50IGFuZCBkZWZhdWx0IGNvbmZpZycsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuQ29uZmlybWF0aW9uRGlhbG9nKG9wdGlvbnMsIG51bGwsIG51bGwpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIFd6Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICAgIGRlZmF1bHRDb25maXJtYXRpb25EaWFsb2dPcHRpb25zLmRpYWxvZ0NvbmZpZ1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSB2YWx1ZSBvZiBkaWFsb2dSZWZcXCdzIGFmdGVyQ2xvc2VkIG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2VVbmRlclRlc3Qub3BlbkNvbmZpcm1hdGlvbkRpYWxvZyhvcHRpb25zLCBudWxsLCBudWxsKSkudG9FcXVhbCgndGhpbmdSZXR1cm5lZEJ5QWZ0ZXJDbG9zZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnY29tcG9uZW50IG9wdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGEgXCJzdHJpbmdzXCIgdmFyaWFibGUgb24gdGhlIGNvbXBvbmVudCBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgICBvcHRpb25zID0geyB0aXRsZTogJycsIG1lc3NhZ2U6ICcnLCBhY2NlcHQ6ICcnLCBkZWNsaW5lOiAnJyB9O1xuICAgICAgICAgIGV4cGVjdChtb2NrQ29tcG9uZW50SW5zdGFuY2Uuc3RyaW5ncykubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuQ29uZmlybWF0aW9uRGlhbG9nKG9wdGlvbnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQ29tcG9uZW50SW5zdGFuY2Uuc3RyaW5ncykudG9FcXVhbCh7IHRpdGxlOiAnJywgbWVzc2FnZTogJycsIGFjY2VwdDogJycsIGRlY2xpbmU6ICcnIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZGlhbG9nIGRpc3BsYXkgb3B0aW9ucycsICgpID0+IHtcbiAgICAgICAgaXQoJ2hhcyBkZWZhdWx0IHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Db25maXJtYXRpb25EaWFsb2coe30sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICBXekNvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgICAgIHsgZGlzYWJsZUNsb3NlOiB0cnVlLCB3aWR0aDogJzM3NXB4JywgcG9zaXRpb246IHsgdG9wOiAnMTIlJyB9IH1cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIG92ZXJyaWRlIGRpc2FibGVDbG9zZScsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Db25maXJtYXRpb25EaWFsb2coeyBkaWFsb2dDb25maWc6IHsgZGlzYWJsZUNsb3NlOiBmYWxzZSB9IH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICBXekNvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgICAgIHsgZGlzYWJsZUNsb3NlOiBmYWxzZSwgd2lkdGg6ICczNzVweCcsIHBvc2l0aW9uOiB7IHRvcDogJzEyJScgfSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBvdmVycmlkZSB0aGUgdG9wIHBvc2l0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkNvbmZpcm1hdGlvbkRpYWxvZyh7IGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICc0MiUnIH0gfSB9LCBudWxsLCBudWxsKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrRGlhbG9nLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgV3pDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQsXG4gICAgICAgICAgICB7IGRpc2FibGVDbG9zZTogdHJ1ZSwgd2lkdGg6ICczNzVweCcsIHBvc2l0aW9uOiB7IHRvcDogJzQyJScgfSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBhZGQgYSBoZWlnaHQnLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuQ29uZmlybWF0aW9uRGlhbG9nKHsgZGlhbG9nQ29uZmlnOiB7IGhlaWdodDogJzUwMHB4JyB9IH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICBXekNvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgICAgIHsgZGlzYWJsZUNsb3NlOiB0cnVlLCB3aWR0aDogJzM3NXB4JywgcG9zaXRpb246IHsgdG9wOiAnMTIlJyB9LCBoZWlnaHQ6ICc1MDBweCcgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gYWRkIGEgbGVmdCBwb3NpdGlvbicsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Db25maXJtYXRpb25EaWFsb2coeyBkaWFsb2dDb25maWc6IHsgcG9zaXRpb246IHsgbGVmdDogJzE3JScgfSB9IH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICBXekNvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgICAgIHsgZGlzYWJsZUNsb3NlOiB0cnVlLCB3aWR0aDogJzM3NXB4JywgcG9zaXRpb246IHsgbGVmdDogJzE3JScsIHRvcDogJzEyJScgfSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBvdmVycmlkZSBhbmQgYWRkIHNldmVyYWwgcHJvcGVydGllcyBhdCBvbmNlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRpYWxvZ0NvbmZpZzogTWF0RGlhbG9nQ29uZmlnID0ge1xuICAgICAgICAgICAgZGlzYWJsZUNsb3NlOiBmYWxzZSwgaGVpZ2h0OiAnMzAwcHgnLCB3aWR0aDogJzkwMHB4JywgcG9zaXRpb246IHsgbGVmdDogJzIzJScsIHRvcDogJzUlJyB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkNvbmZpcm1hdGlvbkRpYWxvZyh7IGRpYWxvZ0NvbmZpZzogZGlhbG9nQ29uZmlnIH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoV3pDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdjYWxsYmFja3MnLCAoKSA9PiB7XG4gICAgICAgIGxldCBhY2NlcHRDYWxsYmFjazogYW55O1xuICAgICAgICBsZXQgZGVjbGluZUNhbGxiYWNrOiBhbnk7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGFjY2VwdENhbGxiYWNrID0gamFzbWluZS5jcmVhdGVTcHkoJ2FjY2VwdENhbGxiYWNrJyk7XG4gICAgICAgICAgZGVjbGluZUNhbGxiYWNrID0gamFzbWluZS5jcmVhdGVTcHkoJ2RlY2xpbmVDYWxsYmFjaycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIGFjY2VwdCBjYWxsYmFjayBvbiB0aGUgYWNjZXB0IGV2ZW50JywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkNvbmZpcm1hdGlvbkRpYWxvZyhvcHRpb25zLCBhY2NlcHRDYWxsYmFjaywgZGVjbGluZUNhbGxiYWNrKTtcbiAgICAgICAgICBhY2NlcHRTdWJqZWN0Lm5leHQoKTtcbiAgICAgICAgICBleHBlY3QoYWNjZXB0Q2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBkZWNsaW5lIGNhbGxiYWNrIG9uIHRoZSBkZWNsaW5lIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkNvbmZpcm1hdGlvbkRpYWxvZyhvcHRpb25zLCBhY2NlcHRDYWxsYmFjaywgZGVjbGluZUNhbGxiYWNrKTtcbiAgICAgICAgICBkZWNsaW5lU3ViamVjdC5uZXh0KCk7XG4gICAgICAgICAgZXhwZWN0KGRlY2xpbmVDYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29wZW5Db21wb25lbnRJbkRpYWxvZygpJywgKCkgPT4ge1xuICAgICAgZnVuY3Rpb24gVGVzdENvbXBvbmVudCgpIHsgfVxuICAgICAgbGV0IHRlc3RFdmVudDogT2JzZXJ2YWJsZTxhbnk+O1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tDb21wb25lbnRJbnN0YW5jZS50ZXN0RXZlbnQgPSBPYnNlcnZhYmxlLm9mKHsgJ3Rlc3RFdmVudCc6IDEyMyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBtb2NrRGlhbG9nUmVmID0ge1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZTogbW9ja0NvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoJ2Nsb3NlJyksXG4gICAgICAgIGFmdGVyQ2xvc2VkOiAoKSA9PiBtb2NrQ29tcG9uZW50SW5zdGFuY2UudGVzdEV2ZW50XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBjb21wb25lbnRUeXBlOiBUZXN0Q29tcG9uZW50LFxuICAgICAgICBpbnB1dE9wdGlvbnM6IHsgdGVzdElucHV0OiB7IGlucHV0OiAxMjMgfSB9LFxuICAgICAgICBvdXRwdXRPcHRpb25zOiBbeyBldmVudDogJ3Rlc3RFdmVudCcsIGNhbGxiYWNrOiAoKSA9PiB0cnVlIH1dXG4gICAgICB9O1xuXG4gICAgICBpdCgnc2hvdWxkIG9wZW4gYSBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkNvbXBvbmVudEluRGlhbG9nKG9wdGlvbnMpO1xuICAgICAgICBleHBlY3QobW9ja0RpYWxvZy5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChUZXN0Q29tcG9uZW50LCB7IHBvc2l0aW9uOiB7fSB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGFzc2lnbiB0aGUgaW5wdXQgYW5kIG91dHB1dCBhdHRyaWJ1dGVzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuQ29tcG9uZW50SW5EaWFsb2cob3B0aW9ucyk7XG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlKS50b0VxdWFsKHtcbiAgICAgICAgICB0ZXN0RXZlbnQ6IE9ic2VydmFibGUub2YoeyAndGVzdEV2ZW50JzogMTIzIH0pLFxuICAgICAgICAgIHRlc3RJbnB1dDogeyBpbnB1dDogMTIzIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBzaG91bGQgaGFuZGxlIGEgY29tcG9uZW50IHdpdGhvdXQgaW5wdXRzJywgKCkgPT4ge1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5pbnB1dE9wdGlvbnM7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkNvbXBvbmVudEluRGlhbG9nKG9wdGlvbnMpO1xuICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZSkudG9FcXVhbCh7XG4gICAgICAgICAgdGVzdEV2ZW50OiBPYnNlcnZhYmxlLm9mKHsgJ3Rlc3RFdmVudCc6IDEyMyB9KVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29wZW5Gb3JtRGlhbG9nJywgKCkgPT4ge1xuICAgICAgbGV0IGZvcm1TdWJtaXRTdWJqZWN0OiBTdWJqZWN0PGFueT47XG4gICAgICBsZXQgZm9ybUNhbmNlbFN1YmplY3Q6IFN1YmplY3Q8YW55PjtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGZvcm1TdWJtaXRTdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgICAgICBmb3JtQ2FuY2VsU3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgICAgICBtb2NrQ29tcG9uZW50SW5zdGFuY2Uuc3VibWl0ID0gZm9ybVN1Ym1pdFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIG1vY2tDb21wb25lbnRJbnN0YW5jZS5jYW5jZWwgPSBmb3JtQ2FuY2VsU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnb3BlbnMgYSBkaWFsb2cgd2l0aCB0aGUgZXhwZWN0ZWQgaW5uZXIgY29tcG9uZW50JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7fSwgbnVsbCwgbnVsbCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoV3pGb3JtRGlhbG9nQ29tcG9uZW50LCBqYXNtaW5lLmFueShPYmplY3QpKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgdmFsdWUgb2YgZGlhbG9nUmVmXFwncyBhZnRlckNsb3NlZCBtZXRob2QnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7fSwgbnVsbCwgbnVsbCkpLnRvRXF1YWwoJ3RoaW5nUmV0dXJuZWRCeUFmdGVyQ2xvc2VkJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Bhc3NlcyB0aGUgZm9ybSBmaWVsZHMgdG8gdGhlIGNvbXBvbmVudCcsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbeyBhOiAnZmllbGQnIH0sIHsgYW5vdGhlcjogJ2ZpZWxkJyB9XSBhcyBhbnksIHt9LCBudWxsLCBudWxsKTtcblxuICAgICAgICBleHBlY3QobW9ja0NvbXBvbmVudEluc3RhbmNlLmZvcm1JdGVtcykudG9FcXVhbChbeyBhOiAnZmllbGQnIH0sIHsgYW5vdGhlcjogJ2ZpZWxkJyB9XSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2NvbXBvbmVudCBvcHRpb25zJywgKCkgPT4ge1xuICAgICAgICBpdCgnaGFzIGRlZmF1bHQgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkZvcm1EaWFsb2coW10sIHt9LCBudWxsLCBudWxsKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQ29tcG9uZW50SW5zdGFuY2UudGl0bGUpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgICBleHBlY3QobW9ja0NvbXBvbmVudEluc3RhbmNlLnN1Ym1pdExhYmVsKS50b0VxdWFsKCdTdWJtaXQnKTtcbiAgICAgICAgICBleHBlY3QobW9ja0NvbXBvbmVudEluc3RhbmNlLmNhbmNlbExhYmVsKS50b0VxdWFsKCdDYW5jZWwnKTtcbiAgICAgICAgICBleHBlY3QobW9ja0NvbXBvbmVudEluc3RhbmNlLmRpc3BsYXlDYW5jZWxCdXR0b24pLnRvQmUoZmFsc2UpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQ29tcG9uZW50SW5zdGFuY2UuYXV0b2NvbXBsZXRlKS50b0VxdWFsKCdvbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIG92ZXJyaWRlIHRoZSBkaWFsb2cgdGl0bGUnLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbXSwgeyB0aXRsZTogJ015IERpYWxvZycgfSwgbnVsbCwgbnVsbCk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0NvbXBvbmVudEluc3RhbmNlLnRpdGxlKS50b0VxdWFsKCdNeSBEaWFsb2cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBvdmVycmlkZSB0aGUgc3VibWl0IGJ1dHRvbiBsYWJlbCcsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7IHN1Ym1pdExhYmVsOiAnRG8gaXQgYWxyZWFkeSEnIH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tDb21wb25lbnRJbnN0YW5jZS5zdWJtaXRMYWJlbCkudG9FcXVhbCgnRG8gaXQgYWxyZWFkeSEnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBvdmVycmlkZSB0aGUgY2FuY2VsIGJ1dHRvbiBsYWJlbCcsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7IGNhbmNlbExhYmVsOiAnTmV2ZXIgbWluZCcgfSwgbnVsbCwgbnVsbCk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0NvbXBvbmVudEluc3RhbmNlLmNhbmNlbExhYmVsKS50b0VxdWFsKCdOZXZlciBtaW5kJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gY2hvb3NlIHRvIGRpc3BsYXkgdGhlIGNhbmNlbCBidXR0b24nLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbXSwgeyBkaXNwbGF5Q2FuY2VsQnV0dG9uOiB0cnVlIH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tDb21wb25lbnRJbnN0YW5jZS5kaXNwbGF5Q2FuY2VsQnV0dG9uKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIG92ZXJyaWRlIHRoZSBhdXRvY29tcGxldGUgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbXSwgeyBhdXRvY29tcGxldGU6ICdmaWVsZDEgZmllbGQyJyB9LCBudWxsLCBudWxsKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQ29tcG9uZW50SW5zdGFuY2UuYXV0b2NvbXBsZXRlKS50b0VxdWFsKCdmaWVsZDEgZmllbGQyJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdkaWFsb2cgZGlzcGxheSBvcHRpb25zJywgKCkgPT4ge1xuICAgICAgICBpdCgnaGFzIGRlZmF1bHQgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkZvcm1EaWFsb2coW10sIHt9LCBudWxsLCBudWxsKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrRGlhbG9nLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFd6Rm9ybURpYWxvZ0NvbXBvbmVudCwgeyBkaXNhYmxlQ2xvc2U6IHRydWUsIHBvc2l0aW9uOiB7IHRvcDogJzEwJScgfSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBvdmVycmlkZSBkaXNhYmxlQ2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbXSwgeyBkaWFsb2dDb25maWc6IHsgZGlzYWJsZUNsb3NlOiBmYWxzZSB9IH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoV3pGb3JtRGlhbG9nQ29tcG9uZW50LCB7IGRpc2FibGVDbG9zZTogZmFsc2UsIHBvc2l0aW9uOiB7IHRvcDogJzEwJScgfSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbiBvdmVycmlkZSB0aGUgdG9wIHBvc2l0aW9uJywgKCkgPT4ge1xuICAgICAgICAgIHNlcnZpY2VVbmRlclRlc3Qub3BlbkZvcm1EaWFsb2coW10sIHsgZGlhbG9nQ29uZmlnOiB7IHBvc2l0aW9uOiB7IHRvcDogJzQyJScgfSB9IH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoV3pGb3JtRGlhbG9nQ29tcG9uZW50LCB7IGRpc2FibGVDbG9zZTogdHJ1ZSwgcG9zaXRpb246IHsgdG9wOiAnNDIlJyB9IH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGFkZCBhIGhlaWdodCcsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7IGRpYWxvZ0NvbmZpZzogeyBoZWlnaHQ6ICc1MDBweCcgfSB9LCBudWxsLCBudWxsKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrRGlhbG9nLm9wZW4pXG4gICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoV3pGb3JtRGlhbG9nQ29tcG9uZW50LCB7IGRpc2FibGVDbG9zZTogdHJ1ZSwgcG9zaXRpb246IHsgdG9wOiAnMTAlJyB9LCBoZWlnaHQ6ICc1MDBweCcgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gYWRkIGEgbGVmdCBwb3NpdGlvbicsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7IGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyBsZWZ0OiAnMTclJyB9IH0gfSwgbnVsbCwgbnVsbCk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZy5vcGVuKVxuICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFd6Rm9ybURpYWxvZ0NvbXBvbmVudCwgeyBkaXNhYmxlQ2xvc2U6IHRydWUsIHBvc2l0aW9uOiB7IGxlZnQ6ICcxNyUnLCB0b3A6ICcxMCUnIH0gfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gb3ZlcnJpZGUgYW5kIGFkZCBzZXZlcmFsIHByb3BlcnRpZXMgYXQgb25jZScsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBkaWFsb2dDb25maWc6IE1hdERpYWxvZ0NvbmZpZyA9IHtcbiAgICAgICAgICAgIGRpc2FibGVDbG9zZTogZmFsc2UsIGhlaWdodDogJzMwMHB4Jywgd2lkdGg6ICc5MDBweCcsIHBvc2l0aW9uOiB7IGxlZnQ6ICcyMyUnLCB0b3A6ICc1JScgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7IGRpYWxvZ0NvbmZpZzogZGlhbG9nQ29uZmlnIH0sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoV3pGb3JtRGlhbG9nQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdjbG9zZXMgdGhlIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7fSwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgZm9ybVN1Ym1pdFN1YmplY3QubmV4dCh7fSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1JlZi5jbG9zZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGhhbmRsZSBhIG51bGwgb25TdWJtaXQgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbXSwge30sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KCgpID0+IGZvcm1TdWJtaXRTdWJqZWN0Lm5leHQoe30pKS5ub3QudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgdGhlIG9uU3VibWl0IGNhbGxiYWNrIHdpdGggYSByZXN1bHQnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2s6IGphc21pbmUuU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoJ2NhbGxiYWNrJyk7XG5cbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7fSwgY2FsbGJhY2ssIG51bGwpO1xuICAgICAgICAgIGZvcm1TdWJtaXRTdWJqZWN0Lm5leHQoeyB4OiAzNyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB4OiAzNyB9LCBqYXNtaW5lLmFueShPYmplY3QpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlIGZvcm0gaXMgY2FuY2VsZWQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdjbG9zZXMgdGhlIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0Lm9wZW5Gb3JtRGlhbG9nKFtdLCB7fSwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgZm9ybUNhbmNlbFN1YmplY3QubmV4dCh7fSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1JlZi5jbG9zZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGhhbmRsZSBhIG51bGwgb25DYW5jZWwgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbXSwge30sIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KCgpID0+IGZvcm1DYW5jZWxTdWJqZWN0Lm5leHQoe30pKS5ub3QudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIGhhbmRsZSBhbiB1bmRlZmluZWQgb25DYW5jZWwgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbXSwge30sIG51bGwpO1xuXG4gICAgICAgICAgZXhwZWN0KCgpID0+IGZvcm1DYW5jZWxTdWJqZWN0Lm5leHQoe30pKS5ub3QudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgdGhlIG9uQ2FuY2VsIGNhbGxiYWNrJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhbGxiYWNrOiBqYXNtaW5lLlNweSA9IGphc21pbmUuY3JlYXRlU3B5KCdjYWxsYmFjaycpO1xuXG4gICAgICAgICAgc2VydmljZVVuZGVyVGVzdC5vcGVuRm9ybURpYWxvZyhbXSwge30sIG51bGwsIGNhbGxiYWNrKTtcbiAgICAgICAgICBmb3JtQ2FuY2VsU3ViamVjdC5uZXh0KCk7XG5cbiAgICAgICAgICBleHBlY3QoY2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVuZGVmaW5lZCwgamFzbWluZS5hbnkoT2JqZWN0KSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIG5ld0Z1bmN0aW9uKCk6IGFueSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuXG4iXX0=
