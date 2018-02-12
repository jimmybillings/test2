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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WzCommentComponent.prototype, "parentObject", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WzCommentComponent.prototype, "formFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WzCommentComponent.prototype, "userCanAddComments", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzCommentComponent.prototype, "toggleCommentsVisibility", void 0);
    __decorate([
        core_1.ViewChild(wz_form_component_1.WzFormComponent),
        __metadata("design:type", wz_form_component_1.WzFormComponent)
    ], WzCommentComponent.prototype, "wzForm", void 0);
    WzCommentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-comment',
            templateUrl: 'wz.comment.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore, current_user_service_1.CurrentUserService])
    ], WzCommentComponent);
    return WzCommentComponent;
}());
exports.WzCommentComponent = WzCommentComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1jb21tZW50L3d6LmNvbW1lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJHO0FBRzNHLGdEQUE4QztBQVU5Qyw2RUFBMEU7QUFDMUUsNEVBQXlFO0FBVXpFO0lBWUUsNEJBQW9CLEtBQWUsRUFBVSxrQkFBc0M7UUFBbkYsaUJBRUM7UUFGbUIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFMMUUsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLDZCQUF3QixHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUsxRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFVLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQTVCLENBQTRCLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBWkQsc0JBQUksNENBQVk7YUFBaEIsVUFBaUIsWUFBaUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBV0Qsc0JBQVcsNkNBQWE7YUFBeEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztRQUNsRSxDQUFDOzs7T0FBQTtJQUVNLHFDQUFRLEdBQWYsVUFBZ0IsUUFBZ0I7UUFDMUIsSUFBQSx3QkFBMkMsRUFBMUMsaUJBQVMsRUFBRSxnQkFBUSxDQUF3QjtRQUNoRCxNQUFNLENBQUMsS0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFD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QWtCO09BWnhFLGtCQUFrQixDQXdGOUI7SUFBRCx5QkFBQztDQXhGRCxBQXdGQyxJQUFBO0FBeEZZLGdEQUFrQiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otY29tbWVudC93ei5jb21tZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7XG4gIENvbW1lbnRzLFxuICBDb21tZW50LFxuICBPYmplY3RUeXBlLFxuICBDb21tZW50UGFyZW50T2JqZWN0LFxuICBDb21tZW50Rm9ybU1vZGUsXG4gIENvbW1lbnRBY2Nlc3Ncbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jb21tZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBXekZvcm1Db21wb25lbnQgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3d6LWZvcm0vd3ouZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1jb21tZW50JyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5jb21tZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBXekNvbW1lbnRDb21wb25lbnQge1xuICBASW5wdXQoKVxuICBzZXQgcGFyZW50T2JqZWN0KHBhcmVudE9iamVjdDogQ29tbWVudFBhcmVudE9iamVjdCkge1xuICAgIHRoaXMuX3BhcmVudE9iamVjdCA9IHBhcmVudE9iamVjdDtcbiAgICB0aGlzLmluaXRpYWxpemVEYXRhKCk7XG4gIH1cbiAgQElucHV0KCkgZm9ybUZpZWxkczogQXJyYXk8Rm9ybUZpZWxkcz47XG4gIEBJbnB1dCgpIHVzZXJDYW5BZGRDb21tZW50czogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSB0b2dnbGVDb21tZW50c1Zpc2liaWxpdHk6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQFZpZXdDaGlsZChXekZvcm1Db21wb25lbnQpIHd6Rm9ybTogV3pGb3JtQ29tcG9uZW50O1xuICBwcml2YXRlIGN1cnJlbnRVc2VySWQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfcGFyZW50T2JqZWN0OiBDb21tZW50UGFyZW50T2JqZWN0O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSwgcHJpdmF0ZSBjdXJyZW50VXNlclNlcnZpY2U6IEN1cnJlbnRVc2VyU2VydmljZSkge1xuICAgIHRoaXMuY3VycmVudFVzZXJTZXJ2aWNlLmRhdGEudGFrZSgxKS5zdWJzY3JpYmUoKHVzZXI6IFVzZXIpID0+IHRoaXMuY3VycmVudFVzZXJJZCA9IHVzZXIuaWQpO1xuICB9XG5cbiAgcHVibGljIGdldCBjb21tZW50c0V4aXN0KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1lbnRzLm1hcChjb21tZW50cyA9PiBjb21tZW50cy5pdGVtcy5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFscyh1c2VyTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgW2ZpcnN0TmFtZSwgbGFzdE5hbWVdID0gdXNlck5hbWUuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4gYCR7Zmlyc3ROYW1lWzBdLnRvVXBwZXJDYXNlKCl9JHtsYXN0TmFtZVswXS50b1VwcGVyQ2FzZSgpfWA7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZvcm1TdWJtaXRMYWJlbCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChmYWN0b3J5ID0+IGZhY3RvcnkuY29tbWVudC5mb3JtU3VibWl0TGFiZWwpO1xuICB9XG5cbiAgcHVibGljIG9uRm9ybVN1Ym1pdChjb21tZW50OiBDb21tZW50KTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuY29tbWVudC5mb3JtU3VibWl0KHRoaXMuX3BhcmVudE9iamVjdCwgY29tbWVudCkpO1xuICAgIHRoaXMucmVzZXRGb3JtKCk7XG4gIH1cblxuICBwdWJsaWMgb25FZGl0Q29tbWVudEJ1dHRvbkNsaWNrKGNvbW1lbnQ6IENvbW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jb21tZW50LmNoYW5nZUZvcm1Nb2RlVG9FZGl0KGNvbW1lbnQpKTtcbiAgICBsZXQgbmV3Rm9ybUZpZWxkczogQXJyYXk8Rm9ybUZpZWxkcz4gPSB0aGlzLmZvcm1GaWVsZHMubWFwKChmaWVsZDogRm9ybUZpZWxkcykgPT4ge1xuICAgICAgZmllbGQudmFsdWUgPSBjb21tZW50W2ZpZWxkLm5hbWVdO1xuICAgICAgcmV0dXJuIGZpZWxkO1xuICAgIH0pO1xuICAgIHRoaXMud3pGb3JtLm1lcmdlTmV3VmFsdWVzKG5ld0Zvcm1GaWVsZHMpO1xuICB9XG5cbiAgcHVibGljIG9uRm9ybUNhbmNlbCgkZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmNvbW1lbnQuY2hhbmdlRm9ybU1vZGVUb0FkZCgpKTtcbiAgICB0aGlzLnJlc2V0Rm9ybSgpO1xuICB9XG5cbiAgcHVibGljIG9uRGVsZXRlQ29tbWVudEJ1dHRvbkNsaWNrKGNvbW1lbnQ6IENvbW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5kaWFsb2cuc2hvd0NvbmZpcm1hdGlvbihcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdDT01NRU5UUy5ERUxFVEVfQ09ORklSTUFUSU9OLlRJVExFJyxcbiAgICAgICAgbWVzc2FnZTogJ0NPTU1FTlRTLkRFTEVURV9DT05GSVJNQVRJT04uTUVTU0FHRScsXG4gICAgICAgIGFjY2VwdDogJ0NPTU1FTlRTLkRFTEVURV9DT05GSVJNQVRJT04uQUNDRVBUJyxcbiAgICAgICAgZGVjbGluZTogJ0NPTU1FTlRTLkRFTEVURV9DT05GSVJNQVRJT04uREVDTElORSdcbiAgICAgIH0sXG4gICAgICAoKSA9PiB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jb21tZW50LnJlbW92ZSh0aGlzLl9wYXJlbnRPYmplY3QsIGNvbW1lbnQuaWQpKVxuICAgICkpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlQ29tbWVudHMoKTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGVDb21tZW50c1Zpc2liaWxpdHkuZW1pdCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBjb21tZW50cygpOiBPYnNlcnZhYmxlPENvbW1lbnRzPiB7XG4gICAgY29uc3QgYWN0aXZlT2JqZWN0VHlwZTogT2JqZWN0VHlwZSA9IHRoaXMuX3BhcmVudE9iamVjdC5uZXN0ZWRPYmplY3RJZCA/XG4gICAgICAnbGluZUl0ZW0nIDogdGhpcy5fcGFyZW50T2JqZWN0Lm9iamVjdFR5cGU7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmNvbW1lbnRbYWN0aXZlT2JqZWN0VHlwZV0pO1xuICB9XG5cbiAgcHVibGljIGlzQ29tbWVudE93bmVyKGNvbW1lbnRPd25lcklkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29tbWVudE93bmVySWQgPT09IHRoaXMuY3VycmVudFVzZXJJZDtcbiAgfVxuXG4gIHB1YmxpYyBwbHVyYWxpemUoY29tbWVudEFjY2VzczogQ29tbWVudEFjY2Vzcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvbW1lbnRBY2Nlc3MgKyAncyc7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Rm9ybSgpIHtcbiAgICBjb25zdCBhY2Nlc3NTdGF0ZUZpZWxkVmFsdWU6IHN0cmluZyA9IHRoaXMud3pGb3JtLmdldFZhbHVlRm9yRmllbGQoJ2FjY2VzcycpO1xuICAgIHRoaXMud3pGb3JtLnJlc2V0Rm9ybSgpO1xuICAgIHRoaXMud3pGb3JtLnNldFZhbHVlRm9yRmllbGQoJ2FjY2VzcycsIGFjY2Vzc1N0YXRlRmllbGRWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmNvbW1lbnQubG9hZCh0aGlzLl9wYXJlbnRPYmplY3QpKTtcbiAgfVxufVxuIl19
