"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var index_1 = require("../components/index");
var wz_dialog_interface_1 = require("../interfaces/wz.dialog.interface");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var WzDialogService = (function () {
    function WzDialogService(dialog) {
        var _this = this;
        this.dialog = dialog;
        this.dialogIsClosed = new BehaviorSubject_1.BehaviorSubject(true);
        dialog.afterOpen.subscribe(function () { return _this.dialogIsClosed.next(false); });
        dialog.afterAllClosed.subscribe(function () { return _this.dialogIsClosed.next(true); });
    }
    WzDialogService.prototype.openNotificationDialog = function (options) {
        var _this = this;
        var mergedDialogConfig = this.mergeDialogConfigs(wz_dialog_interface_1.defaultNotificationDialogOptions, options);
        var mergedOptions = Object.assign({}, wz_dialog_interface_1.defaultNotificationDialogOptions, options);
        return this.dialogIsClosed
            .filter(function (isClosed) { return isClosed === true; })
            .take(1)
            .map(function () {
            var dialogRef = _this.dialog.open(index_1.WzNotificationDialogComponent, mergedDialogConfig);
            dialogRef.componentInstance.strings = {
                title: mergedOptions.title,
                message: mergedOptions.message,
                prompt: mergedOptions.prompt
            };
            return dialogRef;
        })
            .switchMap(function (dialogRef) { return dialogRef.afterClosed(); });
    };
    WzDialogService.prototype.openConfirmationDialog = function (options, onAccept, onDecline) {
        if (onDecline === void 0) { onDecline = function () { }; }
        var mergedDialogConfig = this.mergeDialogConfigs(wz_dialog_interface_1.defaultConfirmationDialogOptions, options);
        var mergedOptions = Object.assign({}, wz_dialog_interface_1.defaultConfirmationDialogOptions, options);
        var dialogRef = this.dialog.open(index_1.WzConfirmationDialogComponent, mergedDialogConfig);
        var component = dialogRef.componentInstance;
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
    };
    WzDialogService.prototype.openFormDialog = function (formItems, options, onSubmit, onCancel) {
        if (onCancel === void 0) { onCancel = function () { }; }
        var mergedDialogConfig = this.mergeDialogConfigs(wz_dialog_interface_1.defaultFormDialogOptions, options);
        var mergedOptions = Object.assign({}, wz_dialog_interface_1.defaultFormDialogOptions, options);
        var dialogRef = this.dialog.open(index_1.WzFormDialogComponent, mergedDialogConfig);
        var component = dialogRef.componentInstance;
        Object.assign(component, { formItems: formItems }, mergedOptions);
        this.setupCallbacks(component, dialogRef, [
            { event: 'submit', callback: onSubmit, closeOnEvent: true },
            { event: 'cancel', callback: onCancel, closeOnEvent: true },
        ]);
        return dialogRef.afterClosed();
    };
    WzDialogService.prototype.openComponentInDialog = function (options) {
        var mergedDialogConfig = this.mergeDialogConfigs({}, { dialogConfig: options.dialogConfig } || {});
        var dialogRef = this.dialog.open(options.componentType, mergedDialogConfig);
        var component = dialogRef.componentInstance;
        if (options.inputOptions)
            Object.assign(component, options.inputOptions);
        if (options.outputOptions)
            this.setupCallbacks(component, dialogRef, options.outputOptions);
        return dialogRef.afterClosed();
    };
    WzDialogService.prototype.setupCallbacks = function (component, dialogRef, outputOptions) {
        outputOptions.forEach(function (cb) {
            component[cb.event].subscribe(function (event) {
                if (cb.closeOnEvent)
                    dialogRef.close(event);
                if (cb.callback)
                    cb.callback(event, dialogRef);
            });
        });
    };
    WzDialogService.prototype.mergeDialogConfigs = function (defaultOptions, options) {
        var mergedDialogPosition = Object.assign({}, (defaultOptions.dialogConfig || {}).position, (options.dialogConfig || {}).position);
        return Object.assign({}, defaultOptions.dialogConfig, options.dialogConfig, { position: mergedDialogPosition });
    };
    WzDialogService.decorators = [
        { type: core_1.Injectable },
    ];
    WzDialogService.ctorParameters = function () { return [
        { type: material_1.MatDialog, },
    ]; };
    return WzDialogService;
}());
exports.WzDialogService = WzDialogService;
//# sourceMappingURL=wz.dialog.service.js.map