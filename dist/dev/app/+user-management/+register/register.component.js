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
var user_service_1 = require("../../shared/services/user.service");
var app_store_1 = require("../../app.store");
var wz_terms_component_1 = require("../../shared/components/wz-terms/wz.terms.component");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var RegisterComponent = (function () {
    function RegisterComponent(userService, store, dialogService, ref) {
        this.userService = userService;
        this.store = store;
        this.dialogService = dialogService;
        this.ref = ref;
        this.serverErrors = null;
        this.successfullySubmitted = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.register.config; });
        this.downloadTos();
    };
    RegisterComponent.prototype.onSubmit = function (user) {
        var _this = this;
        Object.assign(user, { termsAgreedTo: this.userService.documentId });
        this.userService.create(user).take(1).subscribe(function (res) {
            _this.successfullySubmitted = true;
            _this.newUser = res;
            _this.ref.markForCheck();
        }, (function (error) {
            if (error.status !== 451)
                _this.serverErrors = error.json();
            _this.ref.markForCheck();
        }));
    };
    RegisterComponent.prototype.openTermsDialog = function () {
        this.dialogService.openComponentInDialog({
            componentType: wz_terms_component_1.WzTermsComponent,
            inputOptions: {
                terms: this.terms,
                btnLabel: 'REGISTER.CLOSE_TOS_DIALOG',
                header: 'REGISTER.TOS_TITLE'
            }
        });
    };
    RegisterComponent.prototype.downloadTos = function () {
        var _this = this;
        this.userService.downloadActiveTosDocument().take(1).subscribe(function (terms) {
            _this.terms = terms;
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register-component',
            templateUrl: 'register.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            app_store_1.AppStore,
            wz_dialog_service_1.WzDialogService,
            core_1.ChangeDetectorRef])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50LytyZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFFOUYsbUVBQWlFO0FBQ2pFLDZDQUEyQztBQUczQywwRkFBdUY7QUFDdkYsK0ZBQTRGO0FBWTVGO0lBT0UsMkJBQ1MsV0FBd0IsRUFDeEIsS0FBZSxFQUNkLGFBQThCLEVBQzlCLEdBQXNCO1FBSHZCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFUekIsaUJBQVksR0FBaUIsSUFBSSxDQUFDO1FBRWxDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztJQVExQyxDQUFDO0lBRUwsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxvQ0FBUSxHQUFmLFVBQWdCLElBQVM7UUFBekIsaUJBVUM7UUFUQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQWE7WUFDNUQsS0FBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNuQixLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsRUFBRSxDQUFDLFVBQUEsS0FBSztZQUNQLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNELEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTSwyQ0FBZSxHQUF0QjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUM7WUFDdkMsYUFBYSxFQUFFLHFDQUFnQjtZQUMvQixZQUFZLEVBQUU7Z0JBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxNQUFNLEVBQUUsb0JBQW9CO2FBQzdCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHVDQUFXLEdBQW5CO1FBQUEsaUJBSUM7UUFIQyxJQUFJLENBQUMsV0FBVyxDQUFDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVU7WUFDeEUsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBOUNVLGlCQUFpQjtRQVA3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsV0FBVyxFQUFFLGVBQWU7WUFDNUIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FVc0IsMEJBQVc7WUFDakIsb0JBQVE7WUFDQyxtQ0FBZTtZQUN6Qix3QkFBaUI7T0FYckIsaUJBQWlCLENBK0M3QjtJQUFELHdCQUFDO0NBL0NELEFBK0NDLElBQUE7QUEvQ1ksOENBQWlCIiwiZmlsZSI6ImFwcC8rdXNlci1tYW5hZ2VtZW50LytyZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFNlcnZlckVycm9ycyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFd6VGVybXNDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy93ei10ZXJtcy93ei50ZXJtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZWdpc3RyYXRpb24gcGFnZSBjb21wb25lbnQgLSByZW5kZXJzIHJlZ2lzdHJhdGlvbiBwYWdlIGFuZCBoYW5kbGVzIHN1Ym1pdGluZyByZWdpc3RhdGlvbiBmb3JtLlxuICovXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdyZWdpc3Rlci1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGNvbmZpZzogYW55O1xuICBwdWJsaWMgc2VydmVyRXJyb3JzOiBTZXJ2ZXJFcnJvcnMgPSBudWxsO1xuICBwdWJsaWMgbmV3VXNlcjogYW55O1xuICBwdWJsaWMgc3VjY2Vzc2Z1bGx5U3VibWl0dGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgdGVybXM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBXekRpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMucmVnaXN0ZXIuY29uZmlnKTtcbiAgICB0aGlzLmRvd25sb2FkVG9zKCk7XG4gIH1cblxuICBwdWJsaWMgb25TdWJtaXQodXNlcjogYW55KTogdm9pZCB7XG4gICAgT2JqZWN0LmFzc2lnbih1c2VyLCB7IHRlcm1zQWdyZWVkVG86IHRoaXMudXNlclNlcnZpY2UuZG9jdW1lbnRJZCB9KTtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZSh1c2VyKS50YWtlKDEpLnN1YnNjcmliZSgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgdGhpcy5zdWNjZXNzZnVsbHlTdWJtaXR0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5uZXdVc2VyID0gcmVzO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSwgKGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgIT09IDQ1MSkgdGhpcy5zZXJ2ZXJFcnJvcnMgPSBlcnJvci5qc29uKCk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KSk7XG4gIH1cblxuICBwdWJsaWMgb3BlblRlcm1zRGlhbG9nKCkge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coe1xuICAgICAgY29tcG9uZW50VHlwZTogV3pUZXJtc0NvbXBvbmVudCxcbiAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICB0ZXJtczogdGhpcy50ZXJtcyxcbiAgICAgICAgYnRuTGFiZWw6ICdSRUdJU1RFUi5DTE9TRV9UT1NfRElBTE9HJyxcbiAgICAgICAgaGVhZGVyOiAnUkVHSVNURVIuVE9TX1RJVExFJ1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkb3dubG9hZFRvcygpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmRvd25sb2FkQWN0aXZlVG9zRG9jdW1lbnQoKS50YWtlKDEpLnN1YnNjcmliZSgodGVybXM6IGFueSkgPT4ge1xuICAgICAgdGhpcy50ZXJtcyA9IHRlcm1zO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
