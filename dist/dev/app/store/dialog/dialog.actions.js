"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.showConfirmation = function (confirmationDialogOptions, onAccept, onDecline) {
        if (onDecline === void 0) { onDecline = function () { }; }
        return new ShowConfirmation(confirmationDialogOptions, onAccept, onDecline);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.showConfirmationSuccess = function () {
        return new ShowConfirmationSuccess();
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var ShowConfirmation = (function () {
    function ShowConfirmation(confirmationDialogOptions, onAccept, onDecline) {
        this.confirmationDialogOptions = confirmationDialogOptions;
        this.onAccept = onAccept;
        this.onDecline = onDecline;
        this.type = ShowConfirmation.Type;
    }
    ShowConfirmation.Type = '[Dialog] Show Confirmation';
    return ShowConfirmation;
}());
exports.ShowConfirmation = ShowConfirmation;
var ShowConfirmationSuccess = (function () {
    function ShowConfirmationSuccess() {
        this.type = ShowConfirmationSuccess.Type;
    }
    ShowConfirmationSuccess.Type = '[Dialog] Show Confirmation Success';
    return ShowConfirmationSuccess;
}());
exports.ShowConfirmationSuccess = ShowConfirmationSuccess;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kaWFsb2cvZGlhbG9nLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7SUFBQTtJQVFBLENBQUM7SUFQUSx3Q0FBZ0IsR0FBdkIsVUFDRSx5QkFBb0QsRUFDcEQsUUFBZ0MsRUFDaEMsU0FBNkM7UUFBN0MsMEJBQUEsRUFBQSwwQkFBNEMsQ0FBQztRQUU3QyxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFSWSxzQ0FBYTtBQVUxQjtJQUEyQyx5Q0FBYTtJQUF4RDs7SUFJQSxDQUFDO0lBSFEsdURBQXVCLEdBQTlCO1FBQ0UsTUFBTSxDQUFDLElBQUksdUJBQXVCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKMEMsYUFBYSxHQUl2RDtBQUpZLHNEQUFxQjtBQU1sQztJQUdFLDBCQUNrQix5QkFBb0QsRUFDcEQsUUFBZ0MsRUFDaEMsU0FBaUM7UUFGakMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUNoQyxjQUFTLEdBQVQsU0FBUyxDQUF3QjtRQUpuQyxTQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO0lBS3pDLENBQUM7SUFOa0IscUJBQUksR0FBRyw0QkFBNEIsQ0FBQztJQU83RCx1QkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLDRDQUFnQjtBQVU3QjtJQUFBO1FBRWtCLFNBQUksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7SUFDdEQsQ0FBQztJQUZ3Qiw0QkFBSSxHQUFHLG9DQUFvQyxDQUFDO0lBRXJFLDhCQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksMERBQXVCIiwiZmlsZSI6ImFwcC9zdG9yZS9kaWFsb2cvZGlhbG9nLmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZ09wdGlvbnMsIERpYWxvZ05vUmVzdWx0Q2FsbGJhY2sgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvaW50ZXJmYWNlcy93ei5kaWFsb2cuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgc2hvd0NvbmZpcm1hdGlvbihcbiAgICBjb25maXJtYXRpb25EaWFsb2dPcHRpb25zOiBDb25maXJtYXRpb25EaWFsb2dPcHRpb25zLFxuICAgIG9uQWNjZXB0OiBEaWFsb2dOb1Jlc3VsdENhbGxiYWNrLFxuICAgIG9uRGVjbGluZTogRGlhbG9nTm9SZXN1bHRDYWxsYmFjayA9ICgpID0+IHsgfVxuICApOiBTaG93Q29uZmlybWF0aW9uIHtcbiAgICByZXR1cm4gbmV3IFNob3dDb25maXJtYXRpb24oY29uZmlybWF0aW9uRGlhbG9nT3B0aW9ucywgb25BY2NlcHQsIG9uRGVjbGluZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVybmFsQWN0aW9uRmFjdG9yeSBleHRlbmRzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgc2hvd0NvbmZpcm1hdGlvblN1Y2Nlc3MoKTogU2hvd0NvbmZpcm1hdGlvblN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgU2hvd0NvbmZpcm1hdGlvblN1Y2Nlc3MoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2hvd0NvbmZpcm1hdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbRGlhbG9nXSBTaG93IENvbmZpcm1hdGlvbic7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2hvd0NvbmZpcm1hdGlvbi5UeXBlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29uZmlybWF0aW9uRGlhbG9nT3B0aW9uczogQ29uZmlybWF0aW9uRGlhbG9nT3B0aW9ucyxcbiAgICBwdWJsaWMgcmVhZG9ubHkgb25BY2NlcHQ6IERpYWxvZ05vUmVzdWx0Q2FsbGJhY2ssXG4gICAgcHVibGljIHJlYWRvbmx5IG9uRGVjbGluZTogRGlhbG9nTm9SZXN1bHRDYWxsYmFja1xuICApIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgU2hvd0NvbmZpcm1hdGlvblN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0RpYWxvZ10gU2hvdyBDb25maXJtYXRpb24gU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2hvd0NvbmZpcm1hdGlvblN1Y2Nlc3MuVHlwZTtcbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gU2hvd0NvbmZpcm1hdGlvbiB8IFNob3dDb25maXJtYXRpb25TdWNjZXNzO1xuIl19
