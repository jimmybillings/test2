"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    WzDialogService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], WzDialogService);
    return WzDialogService;
}());
exports.WzDialogService = WzDialogService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFJM0MsOENBQTZGO0FBRTdGLDZDQUk2QjtBQUU3Qix5RUFlMkM7QUFDM0Msd0RBQXVEO0FBR3ZEO0lBRUUseUJBQW9CLE1BQWlCO1FBQXJDLGlCQUdDO1FBSG1CLFdBQU0sR0FBTixNQUFNLENBQVc7UUFEN0IsbUJBQWMsR0FBNkIsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNFLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxnREFBc0IsR0FBN0IsVUFBOEIsT0FBa0M7UUFBaEUsaUJBdUJDO1FBdEJDLElBQU0sa0JBQWtCLEdBQW9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzREFBZ0MsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRyxJQUFNLGFBQWEsR0FBOEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsc0RBQWdDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFOUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjO2FBQ3ZCLE1BQU0sQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsS0FBSyxJQUFJLEVBQWpCLENBQWlCLENBQUM7YUFDdkMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNQLEdBQUcsQ0FBQztZQUVILElBQU0sU0FBUyxHQUFnRCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDN0UscUNBQTZCLEVBQzdCLGtCQUFrQixDQUNuQixDQUFDO1lBRUYsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRztnQkFDcEMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLO2dCQUMxQixPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87Z0JBQzlCLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTTthQUM3QixDQUFDO1lBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixDQUFDLENBQUM7YUFDRCxTQUFTLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sZ0RBQXNCLEdBQTdCLFVBQ0UsT0FBa0MsRUFDbEMsUUFBZ0MsRUFDaEMsU0FBNkM7UUFBN0MsMEJBQUEsRUFBQSwwQkFBNEMsQ0FBQztRQUU3QyxJQUFNLGtCQUFrQixHQUFvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsc0RBQWdDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0csSUFBTSxhQUFhLEdBQThCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLHNEQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTlHLElBQU0sU0FBUyxHQUFnRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDN0UscUNBQTZCLEVBQzdCLGtCQUFrQixDQUNuQixDQUFDO1FBQ0YsSUFBTSxTQUFTLEdBQWtDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztRQUU3RSxTQUFTLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHO1lBQ3BDLEtBQUssRUFBRSxhQUFhLENBQUMsS0FBSztZQUMxQixPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87WUFDOUIsTUFBTSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1lBQzVCLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTztTQUMvQixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFO1lBQ3hDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUU7WUFDNUQsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRTtTQUMvRCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSx3Q0FBYyxHQUFyQixVQUNFLFNBQXVCLEVBQ3ZCLE9BQTBCLEVBQzFCLFFBQThCLEVBQzlCLFFBQTRDO1FBQTVDLHlCQUFBLEVBQUEseUJBQTJDLENBQUM7UUFFNUMsSUFBTSxrQkFBa0IsR0FBb0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDhDQUF3QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZHLElBQU0sYUFBYSxHQUFzQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSw4Q0FBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU5RixJQUFNLFNBQVMsR0FBd0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQXFCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuSCxJQUFNLFNBQVMsR0FBMEIsU0FBUyxDQUFDLGlCQUFpQixDQUFDO1FBRXJFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtZQUN4QyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO1lBQzNELEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUU7U0FDNUQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sK0NBQXFCLEdBQTVCLFVBQTZCLE9BQWdDO1FBQzNELElBQU0sa0JBQWtCLEdBQW9CLElBQUksQ0FBQyxrQkFBa0IsQ0FDakUsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFNLFNBQVMsR0FBc0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pHLElBQU0sU0FBUyxHQUFRLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztRQUVuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVGLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVPLHdDQUFjLEdBQXRCLFVBQXVCLFNBQWMsRUFBRSxTQUE0QixFQUFFLGFBQW9DO1FBQ3ZHLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFrQjtZQUN2QyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVc7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztvQkFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDRDQUFrQixHQUExQixVQUEyQixjQUE2QixFQUFFLE9BQXNCO1FBQzlFLElBQU0sb0JBQW9CLEdBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxjQUFjLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ2xILENBQUM7SUE3R1UsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQUdpQixvQkFBUztPQUYxQixlQUFlLENBOEczQjtJQUFELHNCQUFDO0NBOUdELEFBOEdDLElBQUE7QUE5R1ksMENBQWUiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9zZXJ2aWNlcy93ei5kaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnLCBEaWFsb2dQb3NpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHtcbiAgV3pGb3JtRGlhbG9nQ29tcG9uZW50LFxuICBXek5vdGlmaWNhdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgV3pDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQsXG59IGZyb20gJy4uL2NvbXBvbmVudHMvaW5kZXgnO1xuXG5pbXBvcnQge1xuICBEaWFsb2dDYWxsYmFjayxcbiAgRGlhbG9nQ29uZmlnLFxuICBEaWFsb2dPcHRpb25zLFxuICBEaWFsb2dSZXN1bHRDYWxsYmFjayxcbiAgRGlhbG9nTm9SZXN1bHRDYWxsYmFjayxcbiAgRm9ybURpYWxvZ09wdGlvbnMsXG4gIE5vdGlmaWNhdGlvbkRpYWxvZ09wdGlvbnMsXG4gIENvbmZpcm1hdGlvbkRpYWxvZ09wdGlvbnMsXG4gIE5vdGlmaWNhdGlvbkRpYWxvZ1N0cmluZ3MsXG4gIENvbmZpcm1hdGlvbkRpYWxvZ1N0cmluZ3MsXG4gIGRlZmF1bHRGb3JtRGlhbG9nT3B0aW9ucyxcbiAgZGVmYXVsdENvbmZpcm1hdGlvbkRpYWxvZ09wdGlvbnMsXG4gIGRlZmF1bHROb3RpZmljYXRpb25EaWFsb2dPcHRpb25zLFxuICBEZWZhdWx0Q29tcG9uZW50T3B0aW9uc1xufSBmcm9tICcuLi9pbnRlcmZhY2VzL3d6LmRpYWxvZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV3pEaWFsb2dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBkaWFsb2dJc0Nsb3NlZDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykge1xuICAgIGRpYWxvZy5hZnRlck9wZW4uc3Vic2NyaWJlKCgpID0+IHRoaXMuZGlhbG9nSXNDbG9zZWQubmV4dChmYWxzZSkpO1xuICAgIGRpYWxvZy5hZnRlckFsbENsb3NlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kaWFsb2dJc0Nsb3NlZC5uZXh0KHRydWUpKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuTm90aWZpY2F0aW9uRGlhbG9nKG9wdGlvbnM6IE5vdGlmaWNhdGlvbkRpYWxvZ09wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IG1lcmdlZERpYWxvZ0NvbmZpZzogTWF0RGlhbG9nQ29uZmlnID0gdGhpcy5tZXJnZURpYWxvZ0NvbmZpZ3MoZGVmYXVsdE5vdGlmaWNhdGlvbkRpYWxvZ09wdGlvbnMsIG9wdGlvbnMpO1xuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnM6IE5vdGlmaWNhdGlvbkRpYWxvZ09wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Tm90aWZpY2F0aW9uRGlhbG9nT3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5kaWFsb2dJc0Nsb3NlZFxuICAgICAgLmZpbHRlcigoaXNDbG9zZWQpID0+IGlzQ2xvc2VkID09PSB0cnVlKVxuICAgICAgLnRha2UoMSlcbiAgICAgIC5tYXAoKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFd6Tm90aWZpY2F0aW9uRGlhbG9nQ29tcG9uZW50PiA9IHRoaXMuZGlhbG9nLm9wZW4oXG4gICAgICAgICAgV3pOb3RpZmljYXRpb25EaWFsb2dDb21wb25lbnQsXG4gICAgICAgICAgbWVyZ2VkRGlhbG9nQ29uZmlnXG4gICAgICAgICk7XG5cbiAgICAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnN0cmluZ3MgPSB7XG4gICAgICAgICAgdGl0bGU6IG1lcmdlZE9wdGlvbnMudGl0bGUsXG4gICAgICAgICAgbWVzc2FnZTogbWVyZ2VkT3B0aW9ucy5tZXNzYWdlLFxuICAgICAgICAgIHByb21wdDogbWVyZ2VkT3B0aW9ucy5wcm9tcHRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xuICAgICAgfSlcbiAgICAgIC5zd2l0Y2hNYXAoZGlhbG9nUmVmID0+IGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuQ29uZmlybWF0aW9uRGlhbG9nKFxuICAgIG9wdGlvbnM6IENvbmZpcm1hdGlvbkRpYWxvZ09wdGlvbnMsXG4gICAgb25BY2NlcHQ6IERpYWxvZ05vUmVzdWx0Q2FsbGJhY2ssXG4gICAgb25EZWNsaW5lOiBEaWFsb2dOb1Jlc3VsdENhbGxiYWNrID0gKCkgPT4geyB9XG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgbWVyZ2VkRGlhbG9nQ29uZmlnOiBNYXREaWFsb2dDb25maWcgPSB0aGlzLm1lcmdlRGlhbG9nQ29uZmlncyhkZWZhdWx0Q29uZmlybWF0aW9uRGlhbG9nT3B0aW9ucywgb3B0aW9ucyk7XG4gICAgY29uc3QgbWVyZ2VkT3B0aW9uczogQ29uZmlybWF0aW9uRGlhbG9nT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDb25maXJtYXRpb25EaWFsb2dPcHRpb25zLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFd6Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50PiA9IHRoaXMuZGlhbG9nLm9wZW4oXG4gICAgICBXekNvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICAgIG1lcmdlZERpYWxvZ0NvbmZpZ1xuICAgICk7XG4gICAgY29uc3QgY29tcG9uZW50OiBXekNvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZTtcblxuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5zdHJpbmdzID0ge1xuICAgICAgdGl0bGU6IG1lcmdlZE9wdGlvbnMudGl0bGUsXG4gICAgICBtZXNzYWdlOiBtZXJnZWRPcHRpb25zLm1lc3NhZ2UsXG4gICAgICBhY2NlcHQ6IG1lcmdlZE9wdGlvbnMuYWNjZXB0LFxuICAgICAgZGVjbGluZTogbWVyZ2VkT3B0aW9ucy5kZWNsaW5lLFxuICAgIH07XG5cbiAgICB0aGlzLnNldHVwQ2FsbGJhY2tzKGNvbXBvbmVudCwgZGlhbG9nUmVmLCBbXG4gICAgICB7IGV2ZW50OiAnYWNjZXB0JywgY2FsbGJhY2s6IG9uQWNjZXB0LCBjbG9zZU9uRXZlbnQ6IGZhbHNlIH0sXG4gICAgICB7IGV2ZW50OiAnZGVjbGluZScsIGNhbGxiYWNrOiBvbkRlY2xpbmUsIGNsb3NlT25FdmVudDogZmFsc2UgfVxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xuICB9XG5cbiAgcHVibGljIG9wZW5Gb3JtRGlhbG9nKFxuICAgIGZvcm1JdGVtczogRm9ybUZpZWxkc1tdLFxuICAgIG9wdGlvbnM6IEZvcm1EaWFsb2dPcHRpb25zLFxuICAgIG9uU3VibWl0OiBEaWFsb2dSZXN1bHRDYWxsYmFjayxcbiAgICBvbkNhbmNlbDogRGlhbG9nTm9SZXN1bHRDYWxsYmFjayA9ICgpID0+IHsgfVxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IG1lcmdlZERpYWxvZ0NvbmZpZzogTWF0RGlhbG9nQ29uZmlnID0gdGhpcy5tZXJnZURpYWxvZ0NvbmZpZ3MoZGVmYXVsdEZvcm1EaWFsb2dPcHRpb25zLCBvcHRpb25zKTtcbiAgICBjb25zdCBtZXJnZWRPcHRpb25zOiBGb3JtRGlhbG9nT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRGb3JtRGlhbG9nT3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxXekZvcm1EaWFsb2dDb21wb25lbnQ+ID0gdGhpcy5kaWFsb2cub3BlbihXekZvcm1EaWFsb2dDb21wb25lbnQsIG1lcmdlZERpYWxvZ0NvbmZpZyk7XG4gICAgY29uc3QgY29tcG9uZW50OiBXekZvcm1EaWFsb2dDb21wb25lbnQgPSBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2U7XG5cbiAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudCwgeyBmb3JtSXRlbXM6IGZvcm1JdGVtcyB9LCBtZXJnZWRPcHRpb25zKTtcblxuICAgIHRoaXMuc2V0dXBDYWxsYmFja3MoY29tcG9uZW50LCBkaWFsb2dSZWYsIFtcbiAgICAgIHsgZXZlbnQ6ICdzdWJtaXQnLCBjYWxsYmFjazogb25TdWJtaXQsIGNsb3NlT25FdmVudDogdHJ1ZSB9LFxuICAgICAgeyBldmVudDogJ2NhbmNlbCcsIGNhbGxiYWNrOiBvbkNhbmNlbCwgY2xvc2VPbkV2ZW50OiB0cnVlIH0sXG4gICAgXSk7XG5cbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XG4gIH1cblxuICBwdWJsaWMgb3BlbkNvbXBvbmVudEluRGlhbG9nKG9wdGlvbnM6IERlZmF1bHRDb21wb25lbnRPcHRpb25zKSB7XG4gICAgY29uc3QgbWVyZ2VkRGlhbG9nQ29uZmlnOiBNYXREaWFsb2dDb25maWcgPSB0aGlzLm1lcmdlRGlhbG9nQ29uZmlncyhcbiAgICAgIHt9LCB7IGRpYWxvZ0NvbmZpZzogb3B0aW9ucy5kaWFsb2dDb25maWcgfSB8fCB7fSk7XG4gICAgY29uc3QgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8YW55PiA9IHRoaXMuZGlhbG9nLm9wZW4ob3B0aW9ucy5jb21wb25lbnRUeXBlLCBtZXJnZWREaWFsb2dDb25maWcpO1xuICAgIGNvbnN0IGNvbXBvbmVudDogYW55ID0gZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlO1xuXG4gICAgaWYgKG9wdGlvbnMuaW5wdXRPcHRpb25zKSBPYmplY3QuYXNzaWduKGNvbXBvbmVudCwgb3B0aW9ucy5pbnB1dE9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLm91dHB1dE9wdGlvbnMpIHRoaXMuc2V0dXBDYWxsYmFja3MoY29tcG9uZW50LCBkaWFsb2dSZWYsIG9wdGlvbnMub3V0cHV0T3B0aW9ucyk7XG5cbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ2FsbGJhY2tzKGNvbXBvbmVudDogYW55LCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxhbnk+LCBvdXRwdXRPcHRpb25zOiBBcnJheTxEaWFsb2dDYWxsYmFjaz4pOiB2b2lkIHtcbiAgICBvdXRwdXRPcHRpb25zLmZvckVhY2goKGNiOiBEaWFsb2dDYWxsYmFjaykgPT4ge1xuICAgICAgY29tcG9uZW50W2NiLmV2ZW50XS5zdWJzY3JpYmUoKGV2ZW50PzogYW55KSA9PiB7XG4gICAgICAgIGlmIChjYi5jbG9zZU9uRXZlbnQpIGRpYWxvZ1JlZi5jbG9zZShldmVudCk7XG4gICAgICAgIGlmIChjYi5jYWxsYmFjaykgY2IuY2FsbGJhY2soZXZlbnQsIGRpYWxvZ1JlZik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VEaWFsb2dDb25maWdzKGRlZmF1bHRPcHRpb25zOiBEaWFsb2dPcHRpb25zLCBvcHRpb25zOiBEaWFsb2dPcHRpb25zKTogTWF0RGlhbG9nQ29uZmlnIHtcbiAgICBjb25zdCBtZXJnZWREaWFsb2dQb3NpdGlvbjogRGlhbG9nUG9zaXRpb24gPVxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgKGRlZmF1bHRPcHRpb25zLmRpYWxvZ0NvbmZpZyB8fCB7fSkucG9zaXRpb24sIChvcHRpb25zLmRpYWxvZ0NvbmZpZyB8fCB7fSkucG9zaXRpb24pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLmRpYWxvZ0NvbmZpZywgb3B0aW9ucy5kaWFsb2dDb25maWcsIHsgcG9zaXRpb246IG1lcmdlZERpYWxvZ1Bvc2l0aW9uIH0pO1xuICB9XG59XG4iXX0=
