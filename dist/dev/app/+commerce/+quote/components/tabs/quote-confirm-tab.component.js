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
var core_1 = require("@angular/core");
var commerce_confirm_tab_1 = require("../../../components/tabs/commerce-confirm-tab");
var quote_service_1 = require("../../../../shared/services/quote.service");
var router_1 = require("@angular/router");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var commerce_interface_1 = require("../../../../shared/interfaces/commerce.interface");
var license_agreement_component_1 = require("../../../components/license-agreement/license-agreement.component");
var common_functions_1 = require("../../../../shared/utilities/common.functions");
var app_store_1 = require("../../../../app.store");
var QuoteConfirmTabComponent = (function (_super) {
    __extends(QuoteConfirmTabComponent, _super);
    function QuoteConfirmTabComponent(router, quoteService, dialogService, userCan, store) {
        var _this = _super.call(this, router, quoteService, dialogService, userCan, store) || this;
        _this.router = router;
        _this.quoteService = quoteService;
        _this.dialogService = dialogService;
        _this.userCan = userCan;
        _this.store = store;
        return _this;
    }
    QuoteConfirmTabComponent.prototype.showLicenseAgreements = function () {
        var _this = this;
        this.commerceService.retrieveLicenseAgreements().take(1).subscribe(function (agreements) {
            _this.dialogService.openComponentInDialog({
                componentType: license_agreement_component_1.LicenseAgreementComponent,
                dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
                inputOptions: {
                    assetType: 'quoteShow',
                    parentId: _this.quoteService.state.data.id,
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
    Object.defineProperty(QuoteConfirmTabComponent.prototype, "quoteIsTrial", {
        get: function () {
            return this.store.select(function (state) { return state.quoteShow.data.purchaseType === 'Trial'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteConfirmTabComponent.prototype, "showPricing", {
        get: function () {
            return this.store.select(function (state) { return !commerce_interface_1.quotesWithoutPricing.includes(state.quoteShow.data.purchaseType); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteConfirmTabComponent.prototype, "canPurchase", {
        get: function () {
            return this.store.snapshot(function (state) { return commerce_interface_1.quotesAllowedToHaveFeesOnly.includes(state.quoteShow.data.purchaseType); }) ||
                (this.licensesAreAgreedTo && this.shouldShowLicenseDetailsBtn());
        },
        enumerable: true,
        configurable: true
    });
    QuoteConfirmTabComponent.prototype.shouldShowLicenseDetailsBtn = function () {
        return this.userCan.viewLicenseAgreementsButton(this.commerceService.hasAssetLineItems) &&
            this.store.snapshot(function (state) { return !commerce_interface_1.quotesAllowedToHaveFeesOnly.includes(state.quoteShow.data.purchaseType); });
    };
    QuoteConfirmTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-confirm-tab',
            templateUrl: '../../../components/tabs/commerce-confirm-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [router_1.Router,
            quote_service_1.QuoteService,
            wz_dialog_service_1.WzDialogService,
            commerce_capabilities_1.CommerceCapabilities,
            app_store_1.AppStore])
    ], QuoteConfirmTabComponent);
    return QuoteConfirmTabComponent;
}(commerce_confirm_tab_1.CommerceConfirmTab));
exports.QuoteConfirmTabComponent = QuoteConfirmTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvdGFicy9xdW90ZS1jb25maXJtLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQTJFO0FBQzNFLHNGQUFtRjtBQUNuRiwyRUFBeUU7QUFDekUsMENBQXlDO0FBQ3pDLGlGQUErRTtBQUMvRSxxR0FBa0c7QUFDbEcsdUZBSzBEO0FBQzFELGlIQUE4RztBQUM5RyxrRkFBdUU7QUFDdkUsbURBQWlEO0FBU2pEO0lBQThDLDRDQUFrQjtJQUM5RCxrQ0FDWSxNQUFjLEVBQ2pCLFlBQTBCLEVBQzFCLGFBQThCLEVBQzlCLE9BQTZCLEVBQzFCLEtBQWU7UUFMM0IsWUFPRSxrQkFBTSxNQUFNLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQzNEO1FBUFcsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUNqQixrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsYUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDMUIsV0FBSyxHQUFMLEtBQUssQ0FBVTs7SUFHM0IsQ0FBQztJQUVNLHdEQUFxQixHQUE1QjtRQUFBLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLFVBQTZCO1lBQy9GLEtBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQ3RDO2dCQUNFLGFBQWEsRUFBRSx1REFBeUI7Z0JBQ3hDLFlBQVksRUFBRSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN0RSxZQUFZLEVBQUU7b0JBQ1osU0FBUyxFQUFFLFdBQVc7b0JBQ3RCLFFBQVEsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDekMsUUFBUSxFQUFFLHlCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztpQkFDbkM7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiO3dCQUNFLEtBQUssRUFBRSxPQUFPO3dCQUNkLFFBQVEsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7d0JBQ3BCLFlBQVksRUFBRSxJQUFJO3FCQUNuQjtpQkFDRjthQUNGLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNCQUFXLGtEQUFZO2FBQXZCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDO1FBQ25GLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsaURBQVc7YUFBdEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDLHlDQUFvQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBakUsQ0FBaUUsQ0FBQyxDQUFDO1FBQ3ZHLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsaURBQVc7YUFBdEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxnREFBMkIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQXZFLENBQXVFLENBQUM7Z0JBQzFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDLENBQUM7UUFDckUsQ0FBQzs7O09BQUE7SUFFTSw4REFBMkIsR0FBbEM7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO1lBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxnREFBMkIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQXhFLENBQXdFLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBbERVLHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLG9EQUFvRDtZQUNqRSxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQUlvQixlQUFNO1lBQ0gsNEJBQVk7WUFDWCxtQ0FBZTtZQUNyQiw0Q0FBb0I7WUFDbkIsb0JBQVE7T0FOaEIsd0JBQXdCLENBbURwQztJQUFELCtCQUFDO0NBbkRELEFBbURDLENBbkQ2Qyx5Q0FBa0IsR0FtRC9EO0FBbkRZLDREQUF3QiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9jb21wb25lbnRzL3RhYnMvcXVvdGUtY29uZmlybS10YWIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1lcmNlQ29uZmlybVRhYiB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy9jb21tZXJjZS1jb25maXJtLXRhYic7XG5pbXBvcnQgeyBRdW90ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvcXVvdGUuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29tbWVyY2VDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jb21tZXJjZS5jYXBhYmlsaXRpZXMnO1xuaW1wb3J0IHsgV3pEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIExpY2Vuc2VBZ3JlZW1lbnRzLFxuICBQdXJjaGFzZVR5cGUsXG4gIHF1b3Rlc1dpdGhvdXRQcmljaW5nLFxuICBxdW90ZXNBbGxvd2VkVG9IYXZlRmVlc09ubHlcbn0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IExpY2Vuc2VBZ3JlZW1lbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2xpY2Vuc2UtYWdyZWVtZW50L2xpY2Vuc2UtYWdyZWVtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdxdW90ZS1jb25maXJtLXRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLWNvbmZpcm0tdGFiLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFF1b3RlQ29uZmlybVRhYkNvbXBvbmVudCBleHRlbmRzIENvbW1lcmNlQ29uZmlybVRhYiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICBwdWJsaWMgcXVvdGVTZXJ2aWNlOiBRdW90ZVNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwdWJsaWMgdXNlckNhbjogQ29tbWVyY2VDYXBhYmlsaXRpZXMsXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBBcHBTdG9yZVxuICApIHtcbiAgICBzdXBlcihyb3V0ZXIsIHF1b3RlU2VydmljZSwgZGlhbG9nU2VydmljZSwgdXNlckNhbiwgc3RvcmUpO1xuICB9XG5cbiAgcHVibGljIHNob3dMaWNlbnNlQWdyZWVtZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbW1lcmNlU2VydmljZS5yZXRyaWV2ZUxpY2Vuc2VBZ3JlZW1lbnRzKCkudGFrZSgxKS5zdWJzY3JpYmUoKGFncmVlbWVudHM6IExpY2Vuc2VBZ3JlZW1lbnRzKSA9PiB7XG4gICAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKFxuICAgICAgICB7XG4gICAgICAgICAgY29tcG9uZW50VHlwZTogTGljZW5zZUFncmVlbWVudENvbXBvbmVudCxcbiAgICAgICAgICBkaWFsb2dDb25maWc6IHsgcGFuZWxDbGFzczogJ2xpY2Vuc2UtcGFuZScsIHBvc2l0aW9uOiB7IHRvcDogJzEwJScgfSB9LFxuICAgICAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICAgICAgYXNzZXRUeXBlOiAncXVvdGVTaG93JyxcbiAgICAgICAgICAgIHBhcmVudElkOiB0aGlzLnF1b3RlU2VydmljZS5zdGF0ZS5kYXRhLmlkLFxuICAgICAgICAgICAgbGljZW5zZXM6IENvbW1vbi5jbG9uZShhZ3JlZW1lbnRzKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3V0cHV0T3B0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBldmVudDogJ2Nsb3NlJyxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRydWUsXG4gICAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcXVvdGVJc1RyaWFsKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZVNob3cuZGF0YS5wdXJjaGFzZVR5cGUgPT09ICdUcmlhbCcpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93UHJpY2luZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gIXF1b3Rlc1dpdGhvdXRQcmljaW5nLmluY2x1ZGVzKHN0YXRlLnF1b3RlU2hvdy5kYXRhLnB1cmNoYXNlVHlwZSkpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5QdXJjaGFzZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBxdW90ZXNBbGxvd2VkVG9IYXZlRmVlc09ubHkuaW5jbHVkZXMoc3RhdGUucXVvdGVTaG93LmRhdGEucHVyY2hhc2VUeXBlKSkgfHxcbiAgICAgICh0aGlzLmxpY2Vuc2VzQXJlQWdyZWVkVG8gJiYgdGhpcy5zaG91bGRTaG93TGljZW5zZURldGFpbHNCdG4oKSk7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd0xpY2Vuc2VEZXRhaWxzQnRuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJDYW4udmlld0xpY2Vuc2VBZ3JlZW1lbnRzQnV0dG9uKHRoaXMuY29tbWVyY2VTZXJ2aWNlLmhhc0Fzc2V0TGluZUl0ZW1zKSAmJlxuICAgICAgdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiAhcXVvdGVzQWxsb3dlZFRvSGF2ZUZlZXNPbmx5LmluY2x1ZGVzKHN0YXRlLnF1b3RlU2hvdy5kYXRhLnB1cmNoYXNlVHlwZSkpO1xuICB9XG59XG4iXX0=
