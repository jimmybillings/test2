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
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CommentEffects.prototype, "getComments", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CommentEffects.prototype, "formSubmit", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CommentEffects.prototype, "removeComment", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CommentEffects.prototype, "showSnackBarOnRemoveSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CommentEffects.prototype, "getCounts", void 0);
    CommentEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            comment_service_1.CommentService])
    ], CommentEffects);
    return CommentEffects;
}());
exports.CommentEffects = CommentEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb21tZW50L2NvbW1lbnQuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw4Q0FBNkM7QUFDN0MseUNBQWdEO0FBR2hELGtEQUFvRDtBQUVwRCxxREFBbUQ7QUFDbkQsNkNBQXlEO0FBR3pEO0lBeUNFLHdCQUNVLE9BQWdCLEVBQ2hCLEtBQWUsRUFDZixPQUF1QjtRQUhqQyxpQkFJSztRQUhLLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBMUMxQixnQkFBVyxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuRixTQUFTLENBQUMsVUFBQyxNQUEyQjtZQUNyQyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7aUJBQzdDLEdBQUcsQ0FBQyxVQUFDLFFBQWtCLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLEVBQW5FLENBQW1FLENBQUM7aUJBQ2hHLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQyxFQUF4RSxDQUF3RSxDQUFDO1FBRjNGLENBRTJGLENBQzVGLENBQUM7UUFHRyxlQUFVLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMs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QUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLEVBQXRFLENBQXNFLENBQUM7YUFDdEcsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLEVBQXhFLENBQXdFLENBQUMsRUFGMUMsQ0FFMEMsQ0FDMUYsQ0FBQztJQU1BLENBQUM7SUEzQ0w7UUFEQyxnQkFBTSxFQUFFO2tDQUNXLHVCQUFVO3VEQUsxQjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDVSx1QkFBVTtzREFVeEI7SUFHTDtRQURDLGdCQUFNLEVBQUU7a0NBQ2EsdUJBQVU7eURBSzVCO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUMyQix1QkFBVTt1RUFDd0Q7SUFHdEc7UUFEQyxnQkFBTSxFQUFFO2tDQUNTLHVCQUFVO3FEQUl4QjtJQXZDTyxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7eUNBMkNRLGlCQUFPO1lBQ1Qsb0JBQVE7WUFDTixnQ0FBYztPQTVDdEIsY0FBYyxDQThDMUI7SUFBRCxxQkFBQztDQTlDRCxBQThDQyxJQUFBO0FBOUNZLHdDQUFjIiwiZmlsZSI6ImFwcC9zdG9yZS9jb21tZW50L2NvbW1lbnQuZWZmZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCAqIGFzIENvbW1lbnRBY3Rpb25zIGZyb20gJy4vY29tbWVudC5hY3Rpb25zJztcbmltcG9ydCB7IENvbW1lbnQsIENvbW1lbnRzLCBDb21tZW50Rm9ybU1vZGUsIENvbW1lbnRDb3VudHMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tZW50U2VydmljZSB9IGZyb20gJy4vY29tbWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlLCBDb21tZW50U3RhdGUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tbWVudEVmZmVjdHMge1xuICBARWZmZWN0KClcbiAgcHVibGljIGdldENvbW1lbnRzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKENvbW1lbnRBY3Rpb25zLkxvYWQuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IENvbW1lbnRBY3Rpb25zLkxvYWQpID0+XG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0Q29tbWVudHNGb3IoYWN0aW9uLnBhcmVudE9iamVjdClcbiAgICAgICAgLm1hcCgoY29tbWVudHM6IENvbW1lbnRzKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuY29tbWVudC5sb2FkU3VjY2Vzcyhjb21tZW50cykpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBmb3JtU3VibWl0OiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKENvbW1lbnRBY3Rpb25zLkZvcm1TdWJtaXQuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY29tbWVudCkpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgc3RhdGVdOiBbQ29tbWVudEFjdGlvbnMuRm9ybVN1Ym1pdCwgQ29tbWVudFN0YXRlXSkgPT4ge1xuICAgICAgY29uc3Qgc2VydmljZVJlc3VsdDogT2JzZXJ2YWJsZTxDb21tZW50cz4gPSBzdGF0ZS5mb3JtTW9kZSA9PT0gJ0FERCcgP1xuICAgICAgICB0aGlzLnNlcnZpY2UuYWRkQ29tbWVudFRvKGFjdGlvbi5wYXJlbnRPYmplY3QsIGFjdGlvbi5jb21tZW50KSA6XG4gICAgICAgIHRoaXMuc2VydmljZS5lZGl0Q29tbWVudChhY3Rpb24ucGFyZW50T2JqZWN0LCBzdGF0ZS5jb21tZW50QmVpbmdFZGl0ZWQpO1xuXG4gICAgICByZXR1cm4gc2VydmljZVJlc3VsdFxuICAgICAgICAubWFwKChjb21tZW50czogQ29tbWVudHMpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5jb21tZW50LmZvcm1TdWJtaXRTdWNjZXNzKGNvbW1lbnRzKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpO1xuICAgIH0pO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgcmVtb3ZlQ29tbWVudDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShDb21tZW50QWN0aW9ucy5SZW1vdmUuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IENvbW1lbnRBY3Rpb25zLlJlbW92ZSkgPT5cbiAgICAgIHRoaXMuc2VydmljZS5yZW1vdmVDb21tZW50KGFjdGlvbi5wYXJlbnRPYmplY3QsIGFjdGlvbi5jb21tZW50SWQpXG4gICAgICAgIC5tYXAoKGNvbW1lbnRzOiBDb21tZW50cykgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmNvbW1lbnQucmVtb3ZlU3VjY2Vzcyhjb21tZW50cykpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBzaG93U25hY2tCYXJPblJlbW92ZVN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQ29tbWVudEFjdGlvbnMuUmVtb3ZlU3VjY2Vzcy5UeXBlKVxuICAgIC5tYXAoKCkgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoJ0NPTU1FTlRTLkRFTEVURV9TVUNDRVNTX1RPQVNUJykpKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGdldENvdW50czogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShDb21tZW50QWN0aW9ucy5HZXRDb3VudHMuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IENvbW1lbnRBY3Rpb25zLkdldENvdW50cykgPT4gdGhpcy5zZXJ2aWNlLmdldENvdW50c0ZvcihhY3Rpb24ucGFyZW50T2JqZWN0KVxuICAgICAgLm1hcCgoY291bnRzOiBDb21tZW50Q291bnRzKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuY29tbWVudC5nZXRDb3VudHNTdWNjZXNzKGNvdW50cykpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9uczogQWN0aW9ucyxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIHNlcnZpY2U6IENvbW1lbnRTZXJ2aWNlXG4gICkgeyB9XG59XG4iXX0=
