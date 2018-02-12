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
//# sourceMappingURL=comment.actions.js.map