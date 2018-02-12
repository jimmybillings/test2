"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.load = function (parentObject) {
        return new Load(parentObject);
    };
    ActionFactory.prototype.formSubmit = function (parentObject, comment) {
        return new FormSubmit(parentObject, comment);
    };
    ActionFactory.prototype.remove = function (parentObject, commentId) {
        return new Remove(parentObject, commentId);
    };
    ActionFactory.prototype.changeFormModeToAdd = function () {
        return new ChangeFormModeToAdd();
    };
    ActionFactory.prototype.changeFormModeToEdit = function (commentBeingEdited) {
        return new ChangeFormModeToEdit(commentBeingEdited);
    };
    ActionFactory.prototype.getCounts = function (parentObject) {
        return new GetCounts(parentObject);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function () {
    function InternalActionFactory() {
    }
    InternalActionFactory.prototype.loadSuccess = function (comments) {
        return new LoadSuccess(comments);
    };
    InternalActionFactory.prototype.formSubmitSuccess = function (comments) {
        return new FormSubmitSuccess(comments);
    };
    InternalActionFactory.prototype.removeSuccess = function (comments) {
        return new RemoveSuccess(comments);
    };
    InternalActionFactory.prototype.getCountsSuccess = function (counts) {
        return new GetCountsSuccess(counts);
    };
    return InternalActionFactory;
}());
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load(parentObject) {
        this.parentObject = parentObject;
        this.type = Load.Type;
    }
    Load.Type = '[Comment] Load';
    return Load;
}());
exports.Load = Load;
var FormSubmit = (function () {
    function FormSubmit(parentObject, comment) {
        this.parentObject = parentObject;
        this.comment = comment;
        this.type = FormSubmit.Type;
    }
    FormSubmit.Type = '[Comment] Form Submit';
    return FormSubmit;
}());
exports.FormSubmit = FormSubmit;
var Remove = (function () {
    function Remove(parentObject, commentId) {
        this.parentObject = parentObject;
        this.commentId = commentId;
        this.type = Remove.Type;
    }
    Remove.Type = '[Comment] Remove';
    return Remove;
}());
exports.Remove = Remove;
var ChangeFormModeToAdd = (function () {
    function ChangeFormModeToAdd() {
        this.type = ChangeFormModeToAdd.Type;
    }
    ChangeFormModeToAdd.Type = '[Comment] Change Form Mode To ADD';
    return ChangeFormModeToAdd;
}());
exports.ChangeFormModeToAdd = ChangeFormModeToAdd;
var ChangeFormModeToEdit = (function () {
    function ChangeFormModeToEdit(commentBeingEdited) {
        this.commentBeingEdited = commentBeingEdited;
        this.type = ChangeFormModeToEdit.Type;
    }
    ChangeFormModeToEdit.Type = '[Comment] Change Form Mode To EDIT';
    return ChangeFormModeToEdit;
}());
exports.ChangeFormModeToEdit = ChangeFormModeToEdit;
var GetCounts = (function () {
    function GetCounts(parentObject) {
        this.parentObject = parentObject;
        this.type = GetCounts.Type;
    }
    GetCounts.Type = '[Comment] Get Counts';
    return GetCounts;
}());
exports.GetCounts = GetCounts;
var LoadSuccess = (function () {
    function LoadSuccess(comments) {
        this.comments = comments;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Comment] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var FormSubmitSuccess = (function () {
    function FormSubmitSuccess(comments) {
        this.comments = comments;
        this.type = FormSubmitSuccess.Type;
    }
    FormSubmitSuccess.Type = '[Comment] Form Submit Success';
    return FormSubmitSuccess;
}());
exports.FormSubmitSuccess = FormSubmitSuccess;
var RemoveSuccess = (function () {
    function RemoveSuccess(comments) {
        this.comments = comments;
        this.type = RemoveSuccess.Type;
    }
    RemoveSuccess.Type = '[Comment] Remove Success';
    return RemoveSuccess;
}());
exports.RemoveSuccess = RemoveSuccess;
var GetCountsSuccess = (function () {
    function GetCountsSuccess(counts) {
        this.counts = counts;
        this.type = GetCountsSuccess.Type;
    }
    GetCountsSuccess.Type = '[Comment] Get Counts Success';
    return GetCountsSuccess;
}());
exports.GetCountsSuccess = GetCountsSuccess;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb21tZW50L2NvbW1lbnQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BO0lBQUE7SUF3QkEsQ0FBQztJQXZCUSw0QkFBSSxHQUFYLFVBQVksWUFBaUM7UUFDM0MsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxrQ0FBVSxHQUFqQixVQUFrQixZQUFpQyxFQUFFLE9BQWdCO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLDhCQUFNLEdBQWIsVUFBYyxZQUFpQyxFQUFFLFNBQWlCO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLDJDQUFtQixHQUExQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVNLDRDQUFvQixHQUEzQixVQUE0QixrQkFBMkI7UUFDckQsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0saUNBQVMsR0FBaEIsVUFBaUIsWUFBaUM7UUFDaEQsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDSCxvQkFBQztBQUFELENBeEJBLEFBd0JDLElBQUE7QUF4Qlksc0NBQWE7QUEwQjFCO0lBQUE7SUFnQkEsQ0FBQztJQWZRLDJDQUFXLEdBQWxCLFVBQW1CLFFBQWtCO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0saURBQWlCLEdBQXhCLFVBQXlCLFFBQWtCO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSw2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SSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztJQUNRLENBQUM7SUFGL0IscUJBQUksR0FBRyw4QkFBOEIsQ0FBQztJQUcvRCx1QkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLDRDQUFnQiIsImZpbGUiOiJhcHAvc3RvcmUvY29tbWVudC9jb21tZW50LmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7XG4gIENvbW1lbnQsIENvbW1lbnRzLCBPYmplY3RUeXBlLCBDb21tZW50Rm9ybU1vZGUsIENvbW1lbnRQYXJlbnRPYmplY3QsIENvbW1lbnRDb3VudHNcbn0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVudC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkKHBhcmVudE9iamVjdDogQ29tbWVudFBhcmVudE9iamVjdCk6IExvYWQge1xuICAgIHJldHVybiBuZXcgTG9hZChwYXJlbnRPYmplY3QpO1xuICB9XG5cbiAgcHVibGljIGZvcm1TdWJtaXQocGFyZW50T2JqZWN0OiBDb21tZW50UGFyZW50T2JqZWN0LCBjb21tZW50OiBDb21tZW50KTogRm9ybVN1Ym1pdCB7XG4gICAgcmV0dXJuIG5ldyBGb3JtU3VibWl0KHBhcmVudE9iamVjdCwgY29tbWVudCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlKHBhcmVudE9iamVjdDogQ29tbWVudFBhcmVudE9iamVjdCwgY29tbWVudElkOiBudW1iZXIpOiBSZW1vdmUge1xuICAgIHJldHVybiBuZXcgUmVtb3ZlKHBhcmVudE9iamVjdCwgY29tbWVudElkKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VGb3JtTW9kZVRvQWRkKCk6IENoYW5nZUZvcm1Nb2RlVG9BZGQge1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRm9ybU1vZGVUb0FkZCgpO1xuICB9XG5cbiAgcHVibGljIGNoYW5nZUZvcm1Nb2RlVG9FZGl0KGNvbW1lbnRCZWluZ0VkaXRlZDogQ29tbWVudCk6IENoYW5nZUZvcm1Nb2RlVG9FZGl0IHtcbiAgICByZXR1cm4gbmV3IENoYW5nZUZvcm1Nb2RlVG9FZGl0KGNvbW1lbnRCZWluZ0VkaXRlZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnRzKHBhcmVudE9iamVjdDogQ29tbWVudFBhcmVudE9iamVjdCk6IEdldENvdW50cyB7XG4gICAgcmV0dXJuIG5ldyBHZXRDb3VudHMocGFyZW50T2JqZWN0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWRTdWNjZXNzKGNvbW1lbnRzOiBDb21tZW50cyk6IExvYWRTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IExvYWRTdWNjZXNzKGNvbW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JtU3VibWl0U3VjY2Vzcyhjb21tZW50czogQ29tbWVudHMpOiBGb3JtU3VibWl0U3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBGb3JtU3VibWl0U3VjY2Vzcyhjb21tZW50cyk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlU3VjY2Vzcyhjb21tZW50czogQ29tbWVudHMpOiBSZW1vdmVTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IFJlbW92ZVN1Y2Nlc3MoY29tbWVudHMpO1xuICB9XG5cbiAgcHVibGljIGdldENvdW50c1N1Y2Nlc3MoY291bnRzOiBDb21tZW50Q291bnRzKTogR2V0Q291bnRzU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBHZXRDb3VudHNTdWNjZXNzKGNvdW50cyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NvbW1lbnRdIExvYWQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWQuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHBhcmVudE9iamVjdDogQ29tbWVudFBhcmVudE9iamVjdCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBGb3JtU3VibWl0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDb21tZW50XSBGb3JtIFN1Ym1pdCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRm9ybVN1Ym1pdC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcGFyZW50T2JqZWN0OiBDb21tZW50UGFyZW50T2JqZWN0LCBwdWJsaWMgcmVhZG9ubHkgY29tbWVudDogQ29tbWVudCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NvbW1lbnRdIFJlbW92ZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVtb3ZlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBwYXJlbnRPYmplY3Q6IENvbW1lbnRQYXJlbnRPYmplY3QsIHB1YmxpYyByZWFkb25seSBjb21tZW50SWQ6IG51bWJlcikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VGb3JtTW9kZVRvQWRkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDb21tZW50XSBDaGFuZ2UgRm9ybSBNb2RlIFRvIEFERCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQ2hhbmdlRm9ybU1vZGVUb0FkZC5UeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgQ2hhbmdlRm9ybU1vZGVUb0VkaXQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NvbW1lbnRdIENoYW5nZSBGb3JtIE1vZGUgVG8gRURJVCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQ2hhbmdlRm9ybU1vZGVUb0VkaXQuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNvbW1lbnRCZWluZ0VkaXRlZDogQ29tbWVudCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3VudHMge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NvbW1lbnRdIEdldCBDb3VudHMnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEdldENvdW50cy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcGFyZW50T2JqZWN0OiBDb21tZW50UGFyZW50T2JqZWN0KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDb21tZW50XSBMb2FkIFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWRTdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjb21tZW50czogQ29tbWVudHMpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgRm9ybVN1Ym1pdFN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0NvbW1lbnRdIEZvcm0gU3VibWl0IFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEZvcm1TdWJtaXRTdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjb21tZW50czogQ29tbWVudHMpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtb3ZlU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQ29tbWVudF0gUmVtb3ZlIFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFJlbW92ZVN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNvbW1lbnRzOiBDb21tZW50cykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRDb3VudHNTdWNjZXNzIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tDb21tZW50XSBHZXQgQ291bnRzIFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEdldENvdW50c1N1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNvdW50czogQ29tbWVudENvdW50cykgeyB9XG59XG5cbmV4cG9ydCB0eXBlIEFueSA9IExvYWQgfCBGb3JtU3VibWl0IHwgQ2hhbmdlRm9ybU1vZGVUb0FkZCB8IENoYW5nZUZvcm1Nb2RlVG9FZGl0IHwgR2V0Q291bnRzIHxcbiAgTG9hZFN1Y2Nlc3MgfCBGb3JtU3VibWl0U3VjY2VzcyB8IFJlbW92ZSB8IFJlbW92ZVN1Y2Nlc3MgfCBHZXRDb3VudHNTdWNjZXNzO1xuIl19
