"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var wz_form_component_1 = require("../../modules/wz-form/wz.form.component");
var current_user_service_1 = require("../../services/current-user.service");
var WzCommentComponent = (function () {
    function WzCommentComponent(store, currentUserService) {
        var _this = this;
        this.store = store;
        this.currentUserService = currentUserService;
        this.userCanAddComments = true;
        this.toggleCommentsVisibility = new core_1.EventEmitter();
        this.currentUserService.data.take(1).subscribe(function (user) { return _this.currentUserId = user.id; });
    }
    Object.defineProperty(WzCommentComponent.prototype, "parentObject", {
        set: function (parentObject) {
            this._parentObject = parentObject;
            this.initializeData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzCommentComponent.prototype, "commentsExist", {
        get: function () {
            return this.comments.map(function (comments) { return comments.items.length > 0; });
        },
        enumerable: true,
        configurable: true
    });
    WzCommentComponent.prototype.initials = function (userName) {
        var _a = userName.split(' '), firstName = _a[0], lastName = _a[1];
        return "" + firstName[0].toUpperCase() + lastName[0].toUpperCase();
    };
    Object.defineProperty(WzCommentComponent.prototype, "formSubmitLabel", {
        get: function () {
            return this.store.select(function (factory) { return factory.comment.formSubmitLabel; });
        },
        enumerable: true,
        configurable: true
    });
    WzCommentComponent.prototype.onFormSubmit = function (comment) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.comment.formSubmit(_this._parentObject, comment); });
        this.resetForm();
    };
    WzCommentComponent.prototype.onEditCommentButtonClick = function (comment) {
        this.store.dispatch(function (factory) { return factory.comment.changeFormModeToEdit(comment); });
        var newFormFields = this.formFields.map(function (field) {
            field.value = comment[field.name];
            return field;
        });
        this.wzForm.mergeNewValues(newFormFields);
    };
    WzCommentComponent.prototype.onFormCancel = function ($event) {
        $event.preventDefault();
        this.store.dispatch(function (factory) { return factory.comment.changeFormModeToAdd(); });
        this.resetForm();
    };
    WzCommentComponent.prototype.onDeleteCommentButtonClick = function (comment) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.dialog.showConfirmation({
            title: 'COMMENTS.DELETE_CONFIRMATION.TITLE',
            message: 'COMMENTS.DELETE_CONFIRMATION.MESSAGE',
            accept: 'COMMENTS.DELETE_CONFIRMATION.ACCEPT',
            decline: 'COMMENTS.DELETE_CONFIRMATION.DECLINE'
        }, function () { return _this.store.dispatch(function (factory) { return factory.comment.remove(_this._parentObject, comment.id); }); }); });
    };
    WzCommentComponent.prototype.closeComments = function () {
        this.toggleCommentsVisibility.emit();
    };
    Object.defineProperty(WzCommentComponent.prototype, "comments", {
        get: function () {
            var activeObjectType = this._parentObject.nestedObjectId ?
                'lineItem' : this._parentObject.objectType;
            return this.store.select(function (state) { return state.comment[activeObjectType]; });
        },
        enumerable: true,
        configurable: true
    });
    WzCommentComponent.prototype.isCommentOwner = function (commentOwnerId) {
        return commentOwnerId === this.currentUserId;
    };
    WzCommentComponent.prototype.pluralize = function (commentAccess) {
        return commentAccess + 's';
    };
    WzCommentComponent.prototype.resetForm = function () {
        var accessStateFieldValue = this.wzForm.getValueForField('access');
        this.wzForm.resetForm();
        this.wzForm.setValueForField('access', accessStateFieldValue);
    };
    WzCommentComponent.prototype.initializeData = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.comment.load(_this._parentObject); });
    };
    WzCommentComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-comment',
                    templateUrl: 'wz.comment.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzCommentComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    WzCommentComponent.propDecorators = {
        'parentObject': [{ type: core_1.Input },],
        'formFields': [{ type: core_1.Input },],
        'userCanAddComments': [{ type: core_1.Input },],
        'toggleCommentsVisibility': [{ type: core_1.Output },],
        'wzForm': [{ type: core_1.ViewChild, args: [wz_form_component_1.WzFormComponent,] },],
    };
    return WzCommentComponent;
}());
exports.WzCommentComponent = WzCommentComponent;
//# sourceMappingURL=wz.comment.component.js.map