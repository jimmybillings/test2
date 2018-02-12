"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var CommentActions = require("./comment.actions");
var comment_service_1 = require("./comment.service");
var app_store_1 = require("../../app.store");
var CommentEffects = (function () {
    function CommentEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.getComments = this.actions.ofType(CommentActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.getCommentsFor(action.parentObject)
                .map(function (comments) { return _this.store.create(function (factory) { return factory.comment.loadSuccess(comments); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.formSubmit = this.actions.ofType(CommentActions.FormSubmit.Type)
            .withLatestFrom(this.store.select(function (state) { return state.comment; }))
            .switchMap(function (_a) {
            var action = _a[0], state = _a[1];
            var serviceResult = state.formMode === 'ADD' ?
                _this.service.addCommentTo(action.parentObject, action.comment) :
                _this.service.editComment(action.parentObject, state.commentBeingEdited);
            return serviceResult
                .map(function (comments) { return _this.store.create(function (factory) { return factory.comment.formSubmitSuccess(comments); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.removeComment = this.actions.ofType(CommentActions.Remove.Type)
            .switchMap(function (action) {
            return _this.service.removeComment(action.parentObject, action.commentId)
                .map(function (comments) { return _this.store.create(function (factory) { return factory.comment.removeSuccess(comments); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.showSnackBarOnRemoveSuccess = this.actions.ofType(CommentActions.RemoveSuccess.Type)
            .map(function () { return _this.store.create(function (factory) { return factory.snackbar.display('COMMENTS.DELETE_SUCCESS_TOAST'); }); });
        this.getCounts = this.actions.ofType(CommentActions.GetCounts.Type)
            .switchMap(function (action) { return _this.service.getCountsFor(action.parentObject)
            .map(function (counts) { return _this.store.create(function (factory) { return factory.comment.getCountsSuccess(counts); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); }); });
    }
    CommentEffects.decorators = [
        { type: core_1.Injectable },
    ];
    CommentEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: comment_service_1.CommentService, },
    ]; };
    CommentEffects.propDecorators = {
        'getComments': [{ type: effects_1.Effect },],
        'formSubmit': [{ type: effects_1.Effect },],
        'removeComment': [{ type: effects_1.Effect },],
        'showSnackBarOnRemoveSuccess': [{ type: effects_1.Effect },],
        'getCounts': [{ type: effects_1.Effect },],
    };
    return CommentEffects;
}());
exports.CommentEffects = CommentEffects;
//# sourceMappingURL=comment.effects.js.map