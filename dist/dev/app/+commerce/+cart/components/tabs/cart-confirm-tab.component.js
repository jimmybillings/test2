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
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var commerce_confirm_tab_1 = require("../../../components/tabs/commerce-confirm-tab");
var cart_service_1 = require("../../../../shared/services/cart.service");
var router_1 = require("@angular/router");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var license_agreement_component_1 = require("../../../components/license-agreement/license-agreement.component");
var common_functions_1 = require("../../../../shared/utilities/common.functions");
var app_store_1 = require("../../../../app.store");
var CartConfirmTabComponent = (function (_super) {
    __extends(CartConfirmTabComponent, _super);
    function CartConfirmTabComponent(router, cartService, dialogService, userCan, store) {
        var _this = _super.call(this, router, cartService, dialogService, userCan, store) || this;
        _this.router = router;
        _this.cartService = cartService;
        _this.dialogService = dialogService;
        _this.userCan = userCan;
        _this.store = store;
        return _this;
    }
    CartConfirmTabComponent.prototype.showLicenseAgreements = function () {
        var _this = this;
        this.cartService.retrieveLicenseAgreements().take(1).subscribe(function (agreements) {
            _this.dialogService.openComponentInDialog({
                componentType: license_agreement_component_1.LicenseAgreementComponent,
                dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
                inputOptions: {
                    assetType: 'cart',
                    licenses: common_functions_1.Common.clone(agreements)
                },
                outputOptions: [
                    {
                        event: 'close',
                        callback: function () { return true; },
                        closeOnEvent: true
                    }
                ]
            });
        });
    };
    Object.defineProperty(CartConfirmTabComponent.prototype, "showPricing", {
        get: function () {
            return Observable_1.Observable.of(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartConfirmTabComponent.prototype, "quoteIsTrial", {
        get: function () {
            return Observable_1.Observable.of(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartConfirmTabComponent.prototype, "canPurchase", {
        get: function () {
            return this.licensesAreAgreedTo && this.shouldShowLicenseDetailsBtn();
        },
        enumerable: true,
        configurable: true
    });
    CartConfirmTabComponent.prototype.shouldShowLicenseDetailsBtn = function () {
        return this.userCan.viewLicenseAgreementsButton(this.commerceService.hasAssetLineItems);
    };
    CartConfirmTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cart-confirm-tab-component',
            templateUrl: '../../../components/tabs/commerce-confirm-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [router_1.Router,
            cart_service_1.CartService,
            wz_dialog_service_1.WzDialogService,
            commerce_capabilities_1.CommerceCapabilities,
            app_store_1.AppStore])
    ], CartConfirmTabComponent);
    return CartConfirmTabComponent;
}(commerce_confirm_tab_1.CommerceConfirmTab));
exports.CartConfirmTabComponent = CartConfirmTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy90YWJzL2NhcnQtY29uZmlybS10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUM3QyxzQ0FBMkU7QUFDM0Usc0ZBQW1GO0FBQ25GLHlFQUF1RTtBQUN2RSwwQ0FBeUM7QUFDekMsaUZBQStFO0FBQy9FLHFHQUFrRztBQUVsRyxpSEFBOEc7QUFDOUcsa0ZBQXVFO0FBQ3ZFLG1EQUFpRDtBQVNqRDtJQUE2QywyQ0FBa0I7SUFDN0QsaUNBQ1ksTUFBYyxFQUNqQixXQUF3QixFQUN4QixhQUE4QixFQUM5QixPQUE2QixFQUMxQixLQUFlO1FBTDNCLFlBT0Usa0JBQU0sTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUMxRDtRQVBXLFlBQU0sR0FBTixNQUFNLENBQVE7UUFDakIsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsbUJBQWEsR0FBYixhQUFhLENBQWlCO1FBQzlCLGFBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzFCLFdBQUssR0FBTCxLQUFLLENBQVU7O0lBRzNCLENBQUM7SUFFTSx1REFBcUIsR0FBNUI7UUFBQSxpQkFvQkM7UUFuQkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxVQUE2QjtZQUMzRixLQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUN0QztnQkFDRSxhQUFhLEVBQUUsdURBQXlCO2dCQUN4QyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDdEUsWUFBWSxFQUFFO29CQUNaLFNBQVMsRUFBRSxNQUFNO29CQUNqQixRQUFRLEVBQUUseUJBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2lCQUNuQztnQkFDRCxhQUFhLEVBQUU7b0JBQ2I7d0JBQ0UsS0FBSyxFQUFFLE9BQU87d0JBQ2QsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTt3QkFDcEIsWUFBWSxFQUFFLElBQUk7cUJBQ25CO2lCQUNGO2FBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0JBQVcsZ0RBQVc7YUFBdEI7WUFDRSxNQUFNLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxpREFBWTthQUF2QjtZQUNFLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdEQUFXO2FBQXRCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUN4RSxDQUFDOzs7T0FBQTtJQUVNLDZEQUEyQixHQUFsQztRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBL0NVLHVCQUF1QjtRQVBuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsV0FBVyxFQUFFLG9EQUFvRDtZQUNqRSxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQUlvQixlQUFNO1lBQ0osMEJBQVc7WUFDVCxtQ0FBZTtZQUNyQiw0Q0FBb0I7WUFDbkIsb0JBQVE7T0FOaEIsdUJBQXVCLENBZ0RuQztJQUFELDhCQUFDO0NBaERELEFBZ0RDLENBaEQ0Qyx5Q0FBa0IsR0FnRDlEO0FBaERZLDBEQUF1QiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytjYXJ0L2NvbXBvbmVudHMvdGFicy9jYXJ0LWNvbmZpcm0tdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tZXJjZUNvbmZpcm1UYWIgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnMvY29tbWVyY2UtY29uZmlybS10YWInO1xuaW1wb3J0IHsgQ2FydFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvY2FydC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb21tZXJjZUNhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2NvbW1lcmNlLmNhcGFiaWxpdGllcyc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGljZW5zZUFncmVlbWVudHMgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTGljZW5zZUFncmVlbWVudENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbGljZW5zZS1hZ3JlZW1lbnQvbGljZW5zZS1hZ3JlZW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2NhcnQtY29uZmlybS10YWItY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnMvY29tbWVyY2UtY29uZmlybS10YWIuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgQ2FydENvbmZpcm1UYWJDb21wb25lbnQgZXh0ZW5kcyBDb21tZXJjZUNvbmZpcm1UYWIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHVibGljIGNhcnRTZXJ2aWNlOiBDYXJ0U2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nU2VydmljZTogV3pEaWFsb2dTZXJ2aWNlLFxuICAgIHB1YmxpYyB1c2VyQ2FuOiBDb21tZXJjZUNhcGFiaWxpdGllcyxcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IEFwcFN0b3JlXG4gICkge1xuICAgIHN1cGVyKHJvdXRlciwgY2FydFNlcnZpY2UsIGRpYWxvZ1NlcnZpY2UsIHVzZXJDYW4sIHN0b3JlKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TGljZW5zZUFncmVlbWVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5yZXRyaWV2ZUxpY2Vuc2VBZ3JlZW1lbnRzKCkudGFrZSgxKS5zdWJzY3JpYmUoKGFncmVlbWVudHM6IExpY2Vuc2VBZ3JlZW1lbnRzKSA9PiB7XG4gICAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKFxuICAgICAgICB7XG4gICAgICAgICAgY29tcG9uZW50VHlwZTogTGljZW5zZUFncmVlbWVudENvbXBvbmVudCxcbiAgICAgICAgICBkaWFsb2dDb25maWc6IHsgcGFuZWxDbGFzczogJ2xpY2Vuc2UtcGFuZScsIHBvc2l0aW9uOiB7IHRvcDogJzEwJScgfSB9LFxuICAgICAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICAgICAgYXNzZXRUeXBlOiAnY2FydCcsXG4gICAgICAgICAgICBsaWNlbnNlczogQ29tbW9uLmNsb25lKGFncmVlbWVudHMpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRwdXRPcHRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGV2ZW50OiAnY2xvc2UnLFxuICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93UHJpY2luZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcXVvdGVJc1RyaWFsKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FuUHVyY2hhc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGljZW5zZXNBcmVBZ3JlZWRUbyAmJiB0aGlzLnNob3VsZFNob3dMaWNlbnNlRGV0YWlsc0J0bigpO1xuICB9XG5cbiAgcHVibGljIHNob3VsZFNob3dMaWNlbnNlRGV0YWlsc0J0bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLnZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbih0aGlzLmNvbW1lcmNlU2VydmljZS5oYXNBc3NldExpbmVJdGVtcyk7XG4gIH1cbn1cbiJdfQ==
