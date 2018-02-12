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
var router_1 = require("@angular/router");
var quote_service_1 = require("../../../../shared/services/quote.service");
var commerce_interface_1 = require("../../../../shared/interfaces/commerce.interface");
var tab_1 = require("../../../components/tabs/tab");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var license_agreement_component_1 = require("../../../components/license-agreement/license-agreement.component");
var common_functions_1 = require("../../../../shared/utilities/common.functions");
var app_store_1 = require("../../../../app.store");
var QuoteTabComponent = (function (_super) {
    __extends(QuoteTabComponent, _super);
    function QuoteTabComponent(quoteService, userCan, dialogService, router, store) {
        var _this = _super.call(this) || this;
        _this.quoteService = quoteService;
        _this.userCan = userCan;
        _this.dialogService = dialogService;
        _this.router = router;
        _this.store = store;
        _this.extendQuoteExpiration = function (newDate) {
            _this.quoteService
                .extendExpirationDate(newDate.expirationDate)
                .subscribe(function () {
                _this.router.navigate(['/quotes']);
            });
        };
        _this.expireQuote = function () {
            _this.quoteService.expireQuote().subscribe(function () {
                _this.router.navigate(['/quotes']);
            });
        };
        _this.rejectQuote = function () {
            _this.quoteService.rejectQuote().take(1).subscribe(function () {
                _this.router.navigate(['/quotes']);
            });
        };
        _this.quote = _this.quoteService.data.map(function (state) { return state.data; });
        _this.projectSubscription = _this.quoteService.projects.subscribe(function (projects) { return _this.projects = projects; });
        _this.config = _this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config; });
        return _this;
    }
    QuoteTabComponent.prototype.ngOnDestroy = function () {
        this.projectSubscription.unsubscribe();
    };
    Object.defineProperty(QuoteTabComponent.prototype, "hasDiscount", {
        get: function () {
            return !!this.quoteService.state.data.discount;
        },
        enumerable: true,
        configurable: true
    });
    QuoteTabComponent.prototype.checkout = function () {
        this.quoteService.getPaymentOptions();
        this.goToNextTab();
    };
    QuoteTabComponent.prototype.onCloneQuote = function () {
        var _this = this;
        this.store.dispatch(function (factory) {
            return factory.quoteEdit.cloneQuote(_this.store.snapshotCloned(function (state) { return state.quoteShow.data; }));
        });
    };
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowCloneButton", {
        get: function () {
            return this.userCan.cloneQuote(this.quoteService.data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowLicenseDetailsBtn", {
        get: function () {
            return this.userCan.viewLicenseAgreementsButton(this.quoteService.hasAssetLineItems) &&
                this.store.snapshot(function (state) { return state.quoteShow.data.purchaseType !== 'RevenueOnly'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowExpireQuoteButton", {
        get: function () {
            return this.userCan.administerQuotes() && this.isActiveQuote;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowCheckoutOptions", {
        get: function () {
            return !this.userCan.administerQuotes() && this.isActiveQuote;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowRejectQuoteButton", {
        get: function () {
            return !this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "shouldShowResendButton", {
        get: function () {
            return this.userCan.administerQuotes() && (this.isExpiredQuote || this.isActiveQuote);
        },
        enumerable: true,
        configurable: true
    });
    QuoteTabComponent.prototype.showLicenseAgreements = function () {
        var _this = this;
        this.quoteService.retrieveLicenseAgreements().take(1).subscribe(function (agreements) {
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
    QuoteTabComponent.prototype.showExpireConfirmationDialog = function () {
        this.dialogService.openConfirmationDialog({
            title: 'QUOTE.EXPIRE.TITLE',
            message: 'QUOTE.EXPIRE.MESSAGE',
            accept: 'QUOTE.EXPIRE.ACCEPT',
            decline: 'QUOTE.EXPIRE.DECLINE'
        }, this.expireQuote);
    };
    QuoteTabComponent.prototype.openRejectQuoteDialog = function () {
        this.dialogService.openConfirmationDialog({
            title: 'QUOTE.REJECT.TITLE',
            message: 'QUOTE.REJECT.MESSAGE',
            accept: 'QUOTE.REJECT.ACCEPT',
            decline: 'QUOTE.REJECT.DECLINE'
        }, this.rejectQuote);
    };
    QuoteTabComponent.prototype.openResendDialog = function () {
        this.dialogService.openFormDialog(this.config.extendQuote.items, { title: 'QUOTE.EXTEND_EXPIRATION' }, this.extendQuoteExpiration);
    };
    Object.defineProperty(QuoteTabComponent.prototype, "quoteIsTrial", {
        get: function () {
            return this.store.select(function (state) { return state.quoteShow.data.purchaseType === 'Trial'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "showPricing", {
        get: function () {
            return this.store.select(function (state) { return !commerce_interface_1.quotesWithoutPricing.includes(state.quoteShow.data.purchaseType); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "isActiveQuote", {
        get: function () {
            return this.quoteService.state.data.quoteStatus === 'ACTIVE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteTabComponent.prototype, "isExpiredQuote", {
        get: function () {
            return this.quoteService.state.data.quoteStatus === 'EXPIRED';
        },
        enumerable: true,
        configurable: true
    });
    QuoteTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-tab',
            templateUrl: 'quote-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [quote_service_1.QuoteService,
            commerce_capabilities_1.CommerceCapabilities,
            wz_dialog_service_1.WzDialogService,
            router_1.Router,
            app_store_1.AppStore])
    ], QuoteTabComponent);
    return QuoteTabComponent;
}(tab_1.Tab));
exports.QuoteTabComponent = QuoteTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvdGFicy9xdW90ZS10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE4RTtBQUM5RSwwQ0FBeUM7QUFDekMsMkVBQXlFO0FBQ3pFLHVGQUUwRDtBQUMxRCxvREFBbUQ7QUFDbkQsaUZBQStFO0FBRy9FLHFHQUFrRztBQUVsRyxpSEFBOEc7QUFJOUcsa0ZBQXVFO0FBQ3ZFLG1EQUFpRDtBQVNqRDtJQUF1QyxxQ0FBRztJQU14QywyQkFDUyxZQUEwQixFQUMxQixPQUE2QixFQUM1QixhQUE4QixFQUM5QixNQUFjLEVBQ2QsS0FBZTtRQUx6QixZQU9FLGlCQUFPLFNBSVI7UUFWUSxrQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixhQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUM1QixtQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQUssR0FBTCxLQUFLLENBQVU7UUFxSGpCLDJCQUFxQixHQUFHLFVBQUMsT0FBbUM7WUFDbEUsS0FBSSxDQUFDLFlBQVk7aUJBQ2Qsb0JBQW9CLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztpQkFDNUMsU0FBUyxDQUFDO2dCQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVPLGlCQUFXLEdBQUc7WUFDcEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVPLGlCQUFXLEdBQUc7WUFDcEIsS0FBSSxDQUFDLFlBQVks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QUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUM7UUFDaEUsQ0FBQzs7O09BQUE7SUE5SFUsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVN1Qiw0QkFBWTtZQUNqQiw0Q0FBb0I7WUFDYixtQ0FBZTtZQUN0QixlQUFNO1lBQ1Asb0JBQVE7T0FYZCxpQkFBaUIsQ0FtSjdCO0lBQUQsd0JBQUM7Q0FuSkQsQUFtSkMsQ0FuSnNDLFNBQUcsR0FtSnpDO0FBbkpZLDhDQUFpQiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9jb21wb25lbnRzL3RhYnMvcXVvdGUtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFF1b3RlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9xdW90ZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFF1b3RlLCBRdW90ZVN0YXRlLCBQcm9qZWN0LCBBc3NldExpbmVJdGVtLCBGZWVMaW5lSXRlbSwgUHVyY2hhc2VUeXBlLCBxdW90ZXNXaXRob3V0UHJpY2luZ1xufSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGFiIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJzL3RhYic7XG5pbXBvcnQgeyBDb21tZXJjZUNhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2NvbW1lcmNlLmNhcGFiaWxpdGllcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mZWF0dXJlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGljZW5zZUFncmVlbWVudHMgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTGljZW5zZUFncmVlbWVudENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbGljZW5zZS1hZ3JlZW1lbnQvbGljZW5zZS1hZ3JlZW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1GaWVsZHMgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mb3Jtcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXBwLnN0b3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncXVvdGUtdGFiJyxcbiAgdGVtcGxhdGVVcmw6ICdxdW90ZS10YWIuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgUXVvdGVUYWJDb21wb25lbnQgZXh0ZW5kcyBUYWIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwdWJsaWMgcXVvdGU6IE9ic2VydmFibGU8UXVvdGU+O1xuICBwdWJsaWMgcHJvamVjdHM6IFByb2plY3RbXTtcbiAgcHJpdmF0ZSBjb25maWc6IGFueTtcbiAgcHJpdmF0ZSBwcm9qZWN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHF1b3RlU2VydmljZTogUXVvdGVTZXJ2aWNlLFxuICAgIHB1YmxpYyB1c2VyQ2FuOiBDb21tZXJjZUNhcGFiaWxpdGllcyxcbiAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5xdW90ZSA9IHRoaXMucXVvdGVTZXJ2aWNlLmRhdGEubWFwKHN0YXRlID0+IHN0YXRlLmRhdGEpO1xuICAgIHRoaXMucHJvamVjdFN1YnNjcmlwdGlvbiA9IHRoaXMucXVvdGVTZXJ2aWNlLnByb2plY3RzLnN1YnNjcmliZShwcm9qZWN0cyA9PiB0aGlzLnByb2plY3RzID0gcHJvamVjdHMpO1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLmNhcnQuY29uZmlnKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucHJvamVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBoYXNEaXNjb3VudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnF1b3RlU2VydmljZS5zdGF0ZS5kYXRhLmRpc2NvdW50O1xuICB9XG5cbiAgcHVibGljIGNoZWNrb3V0KCk6IHZvaWQge1xuICAgIHRoaXMucXVvdGVTZXJ2aWNlLmdldFBheW1lbnRPcHRpb25zKCk7XG4gICAgdGhpcy5nb1RvTmV4dFRhYigpO1xuICB9XG5cbiAgcHVibGljIG9uQ2xvbmVRdW90ZSgpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT5cbiAgICAgIGZhY3RvcnkucXVvdGVFZGl0LmNsb25lUXVvdGUodGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS5xdW90ZVNob3cuZGF0YSkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvdWxkU2hvd0Nsb25lQnV0dG9uKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJDYW4uY2xvbmVRdW90ZSh0aGlzLnF1b3RlU2VydmljZS5kYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvdWxkU2hvd0xpY2Vuc2VEZXRhaWxzQnRuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJDYW4udmlld0xpY2Vuc2VBZ3JlZW1lbnRzQnV0dG9uKHRoaXMucXVvdGVTZXJ2aWNlLmhhc0Fzc2V0TGluZUl0ZW1zKSAmJlxuICAgICAgdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZVNob3cuZGF0YS5wdXJjaGFzZVR5cGUgIT09ICdSZXZlbnVlT25seScpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG91bGRTaG93RXhwaXJlUXVvdGVCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCkgJiYgdGhpcy5pc0FjdGl2ZVF1b3RlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG91bGRTaG93Q2hlY2tvdXRPcHRpb25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKSAmJiB0aGlzLmlzQWN0aXZlUXVvdGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3VsZFNob3dSZWplY3RRdW90ZUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3VsZFNob3dSZXNlbmRCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCkgJiYgKHRoaXMuaXNFeHBpcmVkUXVvdGUgfHwgdGhpcy5pc0FjdGl2ZVF1b3RlKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TGljZW5zZUFncmVlbWVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5xdW90ZVNlcnZpY2UucmV0cmlldmVMaWNlbnNlQWdyZWVtZW50cygpLnRha2UoMSkuc3Vic2NyaWJlKChhZ3JlZW1lbnRzOiBMaWNlbnNlQWdyZWVtZW50cykgPT4ge1xuICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyhcbiAgICAgICAge1xuICAgICAgICAgIGNvbXBvbmVudFR5cGU6IExpY2Vuc2VBZ3JlZW1lbnRDb21wb25lbnQsXG4gICAgICAgICAgZGlhbG9nQ29uZmlnOiB7IHBhbmVsQ2xhc3M6ICdsaWNlbnNlLXBhbmUnLCBwb3NpdGlvbjogeyB0b3A6ICcxMCUnIH0gfSxcbiAgICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGFzc2V0VHlwZTogJ3F1b3RlU2hvdycsXG4gICAgICAgICAgICBwYXJlbnRJZDogdGhpcy5xdW90ZVNlcnZpY2Uuc3RhdGUuZGF0YS5pZCxcbiAgICAgICAgICAgIGxpY2Vuc2VzOiBDb21tb24uY2xvbmUoYWdyZWVtZW50cylcbiAgICAgICAgICB9LFxuICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXZlbnQ6ICdjbG9zZScsXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB0cnVlLFxuICAgICAgICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2hvd0V4cGlyZUNvbmZpcm1hdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm1hdGlvbkRpYWxvZyh7XG4gICAgICB0aXRsZTogJ1FVT1RFLkVYUElSRS5USVRMRScsXG4gICAgICBtZXNzYWdlOiAnUVVPVEUuRVhQSVJFLk1FU1NBR0UnLFxuICAgICAgYWNjZXB0OiAnUVVPVEUuRVhQSVJFLkFDQ0VQVCcsXG4gICAgICBkZWNsaW5lOiAnUVVPVEUuRVhQSVJFLkRFQ0xJTkUnXG4gICAgfSwgdGhpcy5leHBpcmVRdW90ZSk7XG4gIH1cblxuICBwdWJsaWMgb3BlblJlamVjdFF1b3RlRGlhbG9nKCk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybWF0aW9uRGlhbG9nKHtcbiAgICAgIHRpdGxlOiAnUVVPVEUuUkVKRUNULlRJVExFJyxcbiAgICAgIG1lc3NhZ2U6ICdRVU9URS5SRUpFQ1QuTUVTU0FHRScsXG4gICAgICBhY2NlcHQ6ICdRVU9URS5SRUpFQ1QuQUNDRVBUJyxcbiAgICAgIGRlY2xpbmU6ICdRVU9URS5SRUpFQ1QuREVDTElORSdcbiAgICB9LCB0aGlzLnJlamVjdFF1b3RlKTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuUmVzZW5kRGlhbG9nKCk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZyhcbiAgICAgIHRoaXMuY29uZmlnLmV4dGVuZFF1b3RlLml0ZW1zLFxuICAgICAgeyB0aXRsZTogJ1FVT1RFLkVYVEVORF9FWFBJUkFUSU9OJyB9LFxuICAgICAgdGhpcy5leHRlbmRRdW90ZUV4cGlyYXRpb25cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldCBxdW90ZUlzVHJpYWwoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlU2hvdy5kYXRhLnB1cmNoYXNlVHlwZSA9PT0gJ1RyaWFsJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dQcmljaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiAhcXVvdGVzV2l0aG91dFByaWNpbmcuaW5jbHVkZXMoc3RhdGUucXVvdGVTaG93LmRhdGEucHVyY2hhc2VUeXBlKSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBpc0FjdGl2ZVF1b3RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1b3RlU2VydmljZS5zdGF0ZS5kYXRhLnF1b3RlU3RhdHVzID09PSAnQUNUSVZFJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGlzRXhwaXJlZFF1b3RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1b3RlU2VydmljZS5zdGF0ZS5kYXRhLnF1b3RlU3RhdHVzID09PSAnRVhQSVJFRCc7XG4gIH1cblxuICBwcml2YXRlIGV4dGVuZFF1b3RlRXhwaXJhdGlvbiA9IChuZXdEYXRlOiB7IGV4cGlyYXRpb25EYXRlOiBzdHJpbmcgfSk6IHZvaWQgPT4ge1xuICAgIHRoaXMucXVvdGVTZXJ2aWNlXG4gICAgICAuZXh0ZW5kRXhwaXJhdGlvbkRhdGUobmV3RGF0ZS5leHBpcmF0aW9uRGF0ZSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9xdW90ZXMnXSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZXhwaXJlUXVvdGUgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5xdW90ZVNlcnZpY2UuZXhwaXJlUXVvdGUoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcXVvdGVzJ10pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWplY3RRdW90ZSA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnF1b3RlU2VydmljZS5yZWplY3RRdW90ZSgpLnRha2UoMSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3F1b3RlcyddKTtcbiAgICB9KTtcbiAgfVxufVxuIl19
