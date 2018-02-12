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
var current_user_service_1 = require("../../shared/services/current-user.service");
var user_service_1 = require("../../shared/services/user.service");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var wz_address_form_component_1 = require("../../shared/modules/wz-form/components/wz-address-form/wz.address-form.component");
var app_store_1 = require("../../app.store");
var ProfileComponent = (function () {
    function ProfileComponent(currentUser, dialogService, userService, changeDetectorRef, store) {
        var _this = this;
        this.currentUser = currentUser;
        this.dialogService = dialogService;
        this.userService = userService;
        this.changeDetectorRef = changeDetectorRef;
        this.store = store;
        this.addBillingAddress = function (form) {
            _this.userService.addBillingAddress(form).subscribe();
        };
        this.changeBasicInfo = function (form) {
            _this.userService.changeBasicInfo(form).subscribe();
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSubscription = this.currentUser.data.subscribe(function (user) {
            _this.user = user;
            _this.changeDetectorRef.detectChanges();
        });
        this.basicInfoConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.userBasicInfo.config.form.items; });
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
    };
    ProfileComponent.prototype.onClickEditBasicInfoButton = function () {
        var _this = this;
        var prefilledFields = [];
        this.basicInfoConfig.forEach(function (formField) {
            prefilledFields.push(Object.assign({}, formField, { value: _this.user[formField.name] }));
        });
        this.dialogService.openFormDialog(prefilledFields, {
            title: 'PROFILE.BASIC_INFO.EDIT_BTN_LABEL',
            submitLabel: 'PROFILE.BASIC_INFO.UPDATE_BTN_LABEL'
        }, this.changeBasicInfo);
    };
    ProfileComponent.prototype.onClickEditAddressButton = function () {
        this.dialogService.openComponentInDialog({
            componentType: wz_address_form_component_1.WzAddressFormComponent,
            dialogConfig: { disableClose: true },
            inputOptions: {
                address: this.user.billingInfo ? this.user.billingInfo.address : { address: null },
                loaded: true,
                title: 'PROFILE.BASIC_INFO.BILLING_ADDRESS_EDIT_BTN_LABEL',
                includeCloseButton: true
            },
            outputOptions: [{
                    event: 'onSaveAddress',
                    callback: this.addBillingAddress,
                    closeOnEvent: true
                }]
        });
    };
    ProfileComponent.prototype.getBillingAddressInfo = function (segment) {
        if (this.user.billingInfo && this.user.billingInfo.address) {
            return this.user.billingInfo.address[segment] ? this.user.billingInfo.address[segment] : '';
        }
        else {
            return '';
        }
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'profile-component',
            templateUrl: 'profile.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService,
            wz_dialog_service_1.WzDialogService,
            user_service_1.UserService,
            core_1.ChangeDetectorRef,
            app_store_1.AppStore])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50Lytwcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlHO0FBQ3pHLG1GQUFnRjtBQUNoRixtRUFBaUU7QUFJakUsK0ZBQTRGO0FBQzVGLCtIQUEySDtBQUMzSCw2Q0FBMkM7QUFVM0M7SUFLRSwwQkFDVSxXQUErQixFQUMvQixhQUE4QixFQUM5QixXQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsS0FBZTtRQUx6QixpQkFNSztRQUxLLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBd0RqQixzQkFBaUIsR0FBRyxVQUFDLElBQWE7WUFDeEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2RCxDQUFDLENBQUE7UUFFTyxvQkFBZSxHQUFHLFVBQUMsSUFBbUI7WUFDNUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckQsQ0FBQyxDQUFBO0lBN0RHLENBQUM7SUFFTCxtQ0FBUSxHQUFSO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBVTtZQUNqRSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixLQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUF6RCxDQUF5RCxDQUFDLENBQUM7SUFDdkgsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVNLHFEQUEwQixHQUFqQztRQUFBLGlCQWFDO1FBWkMsSUFBSSxlQUFlLEdBQXNCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQXFCO1lBQ2pELGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQy9CLGVBQWUsRUFDZjtZQUNFLEtBQUssRUFBRSxtQ0FBbUM7WUFDMUMsV0FBVyxFQUFFLHFDQUFxQztTQUNuRCxFQUNELElBQUksQ0FBQyxlQUFlLENBQ3JCLENBQUM7SUFDSixDQUFDO0lBRU0sbURBQXdCLEdBQS9CO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztZQUN2QyxhQUFhLEVBQUUsa0RBQXNCO1lBQ3JDLFlBQVksRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUU7WUFDcEMsWUFBWSxFQUFFO2dCQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7Z0JBQ2xGLE1BQU0sRUFBRSxJQUFJO2dCQUNaLEtBQUssRUFBRSxtREFBbUQ7Z0JBQzFELGtCQUFrQixFQUFFLElBQUk7YUFDekI7WUFDRCxhQUFhLEVBQUUsQ0FBQztvQkFDZCxLQUFLLEVBQUUsZUFBZTtvQkFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7b0JBQ2hDLFlBQVksRUFBRSxJQUFJO2lCQUNuQixDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGdEQUFxQixHQUE1QixVQUE2QixPQUFlO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNaLENBQUM7SUFDSCxDQUFDO0lBaEVVLGdCQUFnQjtRQVA1QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGNBQWM7WUFDM0IsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FRdUIseUNBQWtCO1lBQ2hCLG1DQUFlO1lBQ2pCLDBCQUFXO1lBQ0wsd0JBQWlCO1lBQzdCLG9CQUFRO09BVmQsZ0JBQWdCLENBeUU1QjtJQUFELHVCQUFDO0NBekVELEFBeUVDLElBQUE7QUF6RVksNENBQWdCIiwiZmlsZSI6ImFwcC8rdXNlci1tYW5hZ2VtZW50Lytwcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDdXJyZW50VXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIsIEFkZHJlc3MsIFVzZXJCYXNpY0luZm8gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBXekNvbWluZ1Nvb25Db21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy93ei1jb21pbmctc29vbi93ei1jb21pbmctc29vbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgV3pEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IFd6QWRkcmVzc0Zvcm1Db21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otYWRkcmVzcy1mb3JtL3d6LmFkZHJlc3MtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3Byb2ZpbGUtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdwcm9maWxlLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHB1YmxpYyB1c2VyOiBVc2VyO1xuICBwcml2YXRlIHVzZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBiYXNpY0luZm9Db25maWc6IEZvcm1GaWVsZHNbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBXekRpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcHRpb24gPSB0aGlzLmN1cnJlbnRVc2VyLmRhdGEuc3Vic2NyaWJlKCh1c2VyOiBVc2VyKSA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5iYXNpY0luZm9Db25maWcgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMudXNlckJhc2ljSW5mby5jb25maWcuZm9ybS5pdGVtcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrRWRpdEJhc2ljSW5mb0J1dHRvbigpIHtcbiAgICBsZXQgcHJlZmlsbGVkRmllbGRzOiBBcnJheTxGb3JtRmllbGRzPiA9IFtdO1xuICAgIHRoaXMuYmFzaWNJbmZvQ29uZmlnLmZvckVhY2goKGZvcm1GaWVsZDogRm9ybUZpZWxkcykgPT4ge1xuICAgICAgcHJlZmlsbGVkRmllbGRzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZm9ybUZpZWxkLCB7IHZhbHVlOiB0aGlzLnVzZXJbZm9ybUZpZWxkLm5hbWVdIH0pKTtcbiAgICB9KTtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2coXG4gICAgICBwcmVmaWxsZWRGaWVsZHMsXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnUFJPRklMRS5CQVNJQ19JTkZPLkVESVRfQlROX0xBQkVMJyxcbiAgICAgICAgc3VibWl0TGFiZWw6ICdQUk9GSUxFLkJBU0lDX0lORk8uVVBEQVRFX0JUTl9MQUJFTCdcbiAgICAgIH0sXG4gICAgICB0aGlzLmNoYW5nZUJhc2ljSW5mb1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25DbGlja0VkaXRBZGRyZXNzQnV0dG9uKCkge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coe1xuICAgICAgY29tcG9uZW50VHlwZTogV3pBZGRyZXNzRm9ybUNvbXBvbmVudCxcbiAgICAgIGRpYWxvZ0NvbmZpZzogeyBkaXNhYmxlQ2xvc2U6IHRydWUgfSxcbiAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICBhZGRyZXNzOiB0aGlzLnVzZXIuYmlsbGluZ0luZm8gPyB0aGlzLnVzZXIuYmlsbGluZ0luZm8uYWRkcmVzcyA6IHsgYWRkcmVzczogbnVsbCB9LFxuICAgICAgICBsb2FkZWQ6IHRydWUsXG4gICAgICAgIHRpdGxlOiAnUFJPRklMRS5CQVNJQ19JTkZPLkJJTExJTkdfQUREUkVTU19FRElUX0JUTl9MQUJFTCcsXG4gICAgICAgIGluY2x1ZGVDbG9zZUJ1dHRvbjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgIGV2ZW50OiAnb25TYXZlQWRkcmVzcycsXG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmFkZEJpbGxpbmdBZGRyZXNzLFxuICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgIH1dXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QmlsbGluZ0FkZHJlc3NJbmZvKHNlZ21lbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMudXNlci5iaWxsaW5nSW5mbyAmJiB0aGlzLnVzZXIuYmlsbGluZ0luZm8uYWRkcmVzcykge1xuICAgICAgcmV0dXJuIHRoaXMudXNlci5iaWxsaW5nSW5mby5hZGRyZXNzW3NlZ21lbnRdID8gdGhpcy51c2VyLmJpbGxpbmdJbmZvLmFkZHJlc3Nbc2VnbWVudF0gOiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQmlsbGluZ0FkZHJlc3MgPSAoZm9ybTogQWRkcmVzcykgPT4ge1xuICAgIHRoaXMudXNlclNlcnZpY2UuYWRkQmlsbGluZ0FkZHJlc3MoZm9ybSkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZUJhc2ljSW5mbyA9IChmb3JtOiBVc2VyQmFzaWNJbmZvKSA9PiB7XG4gICAgdGhpcy51c2VyU2VydmljZS5jaGFuZ2VCYXNpY0luZm8oZm9ybSkuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==
