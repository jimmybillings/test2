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
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var quote_service_1 = require("../../../shared/services/quote.service");
var app_store_1 = require("../../../app.store");
var QuoteShowComponent = (function () {
    function QuoteShowComponent(userCan, quoteService, store, detector) {
        this.userCan = userCan;
        this.quoteService = quoteService;
        this.store = store;
        this.detector = detector;
        this.showComments = null;
        this.quote = this.quoteService.data.map(function (state) { return state.data; });
    }
    QuoteShowComponent.prototype.ngOnInit = function () {
        this.store.dispatch(function (factory) { return factory.checkout.reset(); });
        this.tabLabelKeys = ['quote', 'billing', 'payment', 'confirm'];
        this.tabEnabled = this.tabLabelKeys.map(function (_, index) { return index === 0; });
        this.selectedTabIndex = 0;
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.quoteComment.config.form.items; });
        this.commentParentObject = { objectType: 'quote', objectId: this.quoteService.state.data.id };
    };
    Object.defineProperty(QuoteShowComponent.prototype, "hasPurchaseType", {
        get: function () {
            return !!this.quoteService.state.data.purchaseType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "hasDiscount", {
        get: function () {
            return !!this.quoteService.state.data.discount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "shouldDisplayReview", {
        get: function () {
            return this.userCan.administerQuotes() || this.quoteService.state.data.quoteStatus !== 'ACTIVE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "shouldDisplayPurchaseHeader", {
        get: function () {
            return !this.userCan.administerQuotes() && this.quoteService.state.data.quoteStatus === 'ACTIVE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "displayActiveOfflineAgreementToPurchaser", {
        get: function () {
            return !this.userCan.administerQuotes() &&
                this.quoteService.state.data.quoteStatus === 'ACTIVE' &&
                this.offlineAgreementIds.length !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "shouldShowRecipientInfo", {
        get: function () {
            return this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "trStringForPurchaseType", {
        get: function () {
            return "QUOTE." + this.quoteService.state.data.purchaseType;
        },
        enumerable: true,
        configurable: true
    });
    QuoteShowComponent.prototype.onNotification = function (message) {
        switch (message.type) {
            case 'GO_TO_NEXT_TAB': {
                this.goToNextTab();
                break;
            }
            case 'GO_TO_PREVIOUS_TAB': {
                this.goToPreviousTab();
                break;
            }
            case 'GO_TO_TAB': {
                this.goToTab(message.payload);
                break;
            }
            case 'DISABLE_TAB': {
                this.disableTab(message.payload);
            }
        }
    };
    QuoteShowComponent.prototype.toggleCommentsVisibility = function () {
        this.showComments = !this.showComments;
    };
    Object.defineProperty(QuoteShowComponent.prototype, "commentCount", {
        get: function () {
            return this.store.select(function (state) { return state.comment.quote.pagination.totalCount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "offlineAgreementIds", {
        get: function () {
            var ids = [];
            this.quoteService.state.data.projects.forEach(function (project) {
                if (project.lineItems)
                    project.lineItems.forEach(function (lineItem) {
                        if (lineItem.externalAgreementIds)
                            lineItem.externalAgreementIds.forEach(function (id) { return ids.push(id); });
                    });
            });
            return ids.filter(function (id, index, ids) { return id !== ids[index - 1]; }).join(', ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "salesManager", {
        get: function () {
            var _this = this;
            return this.quote.map(function (quote) {
                return {
                    salesManager: quote.salesManager,
                    expirationDate: quote.expirationDate,
                    offlineAgreement: _this.offlineAgreementIds
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "quoteRecipient", {
        get: function () {
            return this.quote.map(function (quote) {
                return {
                    customerName: quote.ownerData.firstName + " " + quote.ownerData.lastName,
                    email: quote.ownerData.email,
                    accountName: quote.ownerData.accountName
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteShowComponent.prototype, "invoiceContact", {
        get: function () {
            return this.quote.map(function (quote) {
                return quote.invoiceContact ? {
                    name: quote.invoiceContact.firstName + " " + quote.invoiceContact.lastName,
                    contactEmail: quote.invoiceContact.email
                } : null;
            });
        },
        enumerable: true,
        configurable: true
    });
    QuoteShowComponent.prototype.goToNextTab = function () {
        var nextSelectedTabIndex = this.selectedTabIndex + 1;
        if (nextSelectedTabIndex >= this.tabLabelKeys.length)
            return;
        this.tabEnabled[nextSelectedTabIndex] = true;
        this.selectedTabIndex = nextSelectedTabIndex;
        this.detector.markForCheck();
    };
    QuoteShowComponent.prototype.goToPreviousTab = function () {
        if (this.selectedTabIndex === 0)
            return;
        this.selectedTabIndex -= 1;
        this.detector.markForCheck();
    };
    QuoteShowComponent.prototype.disableTab = function (tabIndex) {
        this.tabEnabled[tabIndex] = false;
        this.detector.markForCheck();
    };
    QuoteShowComponent.prototype.goToTab = function (tabIndex) {
        this.selectedTabIndex = tabIndex;
        this.detector.markForCheck();
    };
    QuoteShowComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-show-component',
            templateUrl: 'quote-show.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [commerce_capabilities_1.CommerceCapabilities,
            quote_service_1.QuoteService,
            app_store_1.AppStore,
            core_1.ChangeDetectorRef])
    ], QuoteShowComponent);
    return QuoteShowComponent;
}());
exports.QuoteShowComponent = QuoteShowComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytzaG93L3F1b3RlLXNob3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQThGO0FBRzlGLDhFQUE0RTtBQUM1RSx3RUFBc0U7QUFPdEUsZ0RBQThDO0FBVTlDO0lBU0UsNEJBQ1MsT0FBNkIsRUFDN0IsWUFBMEIsRUFDekIsS0FBZSxFQUNmLFFBQTJCO1FBSDVCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQU45QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQVFsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLEVBQVYsQ0FBVSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQXhCLENBQXdCLENBQUMsQ0FBQztRQUV6RCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFHL0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxLQUFLLElBQUssT0FBQSxLQUFLLEtBQUssQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFD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LENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sNENBQWUsR0FBdkI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sdUNBQVUsR0FBbEIsVUFBbUIsUUFBZ0I7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sb0NBQU8sR0FBZixVQUFnQixRQUFnQjtRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQXpKVSxrQkFBa0I7UUFQOUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FZa0IsNENBQW9CO1lBQ2YsNEJBQVk7WUFDbEIsb0JBQVE7WUFDTCx3QkFBaUI7T0FiMUIsa0JBQWtCLENBMEo5QjtJQUFELHlCQUFDO0NBMUpELEFBMEpDLElBQUE7QUExSlksZ0RBQWtCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytzaG93L3F1b3RlLXNob3cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IENvbW1lcmNlQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29tbWVyY2UuY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7IFF1b3RlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9xdW90ZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFF1b3RlLCBRdW90ZVN0YXRlLCBBc3NldExpbmVJdGVtLCBQdXJjaGFzZVR5cGUsIFNlbmREZXRhaWxzU2FsZXNNYW5hZ2VyLCBTZW5kRGV0YWlsc1VzZXIsIFNlbmREZXRhaWxzSW52b2ljZUNvbnRhY3Rcbn0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1lcmNlTWVzc2FnZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1lbnRQYXJlbnRPYmplY3QgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdxdW90ZS1zaG93LWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAncXVvdGUtc2hvdy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBRdW90ZVNob3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgdGFiTGFiZWxLZXlzOiBzdHJpbmdbXTtcbiAgcHVibGljIHRhYkVuYWJsZWQ6IGJvb2xlYW5bXTtcbiAgcHVibGljIHNlbGVjdGVkVGFiSW5kZXg6IG51bWJlcjtcbiAgcHVibGljIHF1b3RlOiBPYnNlcnZhYmxlPFF1b3RlPjtcbiAgcHVibGljIGNvbW1lbnRGb3JtQ29uZmlnOiBBcnJheTxGb3JtRmllbGRzPjtcbiAgcHVibGljIGNvbW1lbnRQYXJlbnRPYmplY3Q6IENvbW1lbnRQYXJlbnRPYmplY3Q7XG4gIHB1YmxpYyBzaG93Q29tbWVudHM6IGJvb2xlYW4gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB1c2VyQ2FuOiBDb21tZXJjZUNhcGFiaWxpdGllcyxcbiAgICBwdWJsaWMgcXVvdGVTZXJ2aWNlOiBRdW90ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHJpdmF0ZSBkZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy5xdW90ZSA9IHRoaXMucXVvdGVTZXJ2aWNlLmRhdGEubWFwKHN0YXRlID0+IHN0YXRlLmRhdGEpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuY2hlY2tvdXQucmVzZXQoKSk7XG5cbiAgICB0aGlzLnRhYkxhYmVsS2V5cyA9IFsncXVvdGUnLCAnYmlsbGluZycsICdwYXltZW50JywgJ2NvbmZpcm0nXTtcblxuICAgIC8vIEVuYWJsZSB0aGUgZmlyc3QgdGFiIGFuZCBkaXNhYmxlIHRoZSByZXN0LlxuICAgIHRoaXMudGFiRW5hYmxlZCA9IHRoaXMudGFiTGFiZWxLZXlzLm1hcCgoXywgaW5kZXgpID0+IGluZGV4ID09PSAwKTtcblxuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IDA7XG5cbiAgICB0aGlzLmNvbW1lbnRGb3JtQ29uZmlnID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLnF1b3RlQ29tbWVudC5jb25maWcuZm9ybS5pdGVtcyk7XG5cbiAgICB0aGlzLmNvbW1lbnRQYXJlbnRPYmplY3QgPSB7IG9iamVjdFR5cGU6ICdxdW90ZScsIG9iamVjdElkOiB0aGlzLnF1b3RlU2VydmljZS5zdGF0ZS5kYXRhLmlkIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhhc1B1cmNoYXNlVHlwZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnF1b3RlU2VydmljZS5zdGF0ZS5kYXRhLnB1cmNoYXNlVHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGFzRGlzY291bnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5xdW90ZVNlcnZpY2Uuc3RhdGUuZGF0YS5kaXNjb3VudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvdWxkRGlzcGxheVJldmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKSB8fCB0aGlzLnF1b3RlU2VydmljZS5zdGF0ZS5kYXRhLnF1b3RlU3RhdHVzICE9PSAnQUNUSVZFJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvdWxkRGlzcGxheVB1cmNoYXNlSGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKSAmJiB0aGlzLnF1b3RlU2VydmljZS5zdGF0ZS5kYXRhLnF1b3RlU3RhdHVzID09PSAnQUNUSVZFJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGlzcGxheUFjdGl2ZU9mZmxpbmVBZ3JlZW1lbnRUb1B1cmNoYXNlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCkgJiZcbiAgICAgIHRoaXMucXVvdGVTZXJ2aWNlLnN0YXRlLmRhdGEucXVvdGVTdGF0dXMgPT09ICdBQ1RJVkUnICYmXG4gICAgICB0aGlzLm9mZmxpbmVBZ3JlZW1lbnRJZHMubGVuZ3RoICE9PSAwO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG91bGRTaG93UmVjaXBpZW50SW5mbygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdHJTdHJpbmdGb3JQdXJjaGFzZVR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFFVT1RFLiR7dGhpcy5xdW90ZVNlcnZpY2Uuc3RhdGUuZGF0YS5wdXJjaGFzZVR5cGV9YDtcbiAgfVxuXG4gIHB1YmxpYyBvbk5vdGlmaWNhdGlvbihtZXNzYWdlOiBDb21tZXJjZU1lc3NhZ2UpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgY2FzZSAnR09fVE9fTkVYVF9UQUInOiB7XG4gICAgICAgIHRoaXMuZ29Ub05leHRUYWIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdHT19UT19QUkVWSU9VU19UQUInOiB7XG4gICAgICAgIHRoaXMuZ29Ub1ByZXZpb3VzVGFiKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnR09fVE9fVEFCJzoge1xuICAgICAgICB0aGlzLmdvVG9UYWIobWVzc2FnZS5wYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdESVNBQkxFX1RBQic6IHtcbiAgICAgICAgdGhpcy5kaXNhYmxlVGFiKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZUNvbW1lbnRzVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dDb21tZW50cyA9ICF0aGlzLnNob3dDb21tZW50cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29tbWVudENvdW50KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmNvbW1lbnQucXVvdGUucGFnaW5hdGlvbi50b3RhbENvdW50KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb2ZmbGluZUFncmVlbWVudElkcygpOiBzdHJpbmcge1xuICAgIGxldCBpZHM6IHN0cmluZ1tdID0gW107XG4gICAgdGhpcy5xdW90ZVNlcnZpY2Uuc3RhdGUuZGF0YS5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgaWYgKHByb2plY3QubGluZUl0ZW1zKSBwcm9qZWN0LmxpbmVJdGVtcy5mb3JFYWNoKChsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSkgPT4ge1xuICAgICAgICBpZiAobGluZUl0ZW0uZXh0ZXJuYWxBZ3JlZW1lbnRJZHMpIGxpbmVJdGVtLmV4dGVybmFsQWdyZWVtZW50SWRzLmZvckVhY2goaWQgPT4gaWRzLnB1c2goaWQpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBpZHMuZmlsdGVyKChpZDogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBpZHM6IHN0cmluZ1tdKSA9PiBpZCAhPT0gaWRzW2luZGV4IC0gMV0pLmpvaW4oJywgJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNhbGVzTWFuYWdlcigpOiBPYnNlcnZhYmxlPFNlbmREZXRhaWxzU2FsZXNNYW5hZ2VyPiB7XG4gICAgcmV0dXJuIHRoaXMucXVvdGUubWFwKChxdW90ZTogUXVvdGUpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNhbGVzTWFuYWdlcjogcXVvdGUuc2FsZXNNYW5hZ2VyLFxuICAgICAgICBleHBpcmF0aW9uRGF0ZTogcXVvdGUuZXhwaXJhdGlvbkRhdGUsXG4gICAgICAgIG9mZmxpbmVBZ3JlZW1lbnQ6IHRoaXMub2ZmbGluZUFncmVlbWVudElkc1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcXVvdGVSZWNpcGllbnQoKTogT2JzZXJ2YWJsZTxTZW5kRGV0YWlsc1VzZXI+IHtcbiAgICByZXR1cm4gdGhpcy5xdW90ZS5tYXAoKHF1b3RlOiBRdW90ZSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY3VzdG9tZXJOYW1lOiBgJHtxdW90ZS5vd25lckRhdGEuZmlyc3ROYW1lfSAke3F1b3RlLm93bmVyRGF0YS5sYXN0TmFtZX1gLFxuICAgICAgICBlbWFpbDogcXVvdGUub3duZXJEYXRhLmVtYWlsLFxuICAgICAgICBhY2NvdW50TmFtZTogcXVvdGUub3duZXJEYXRhLmFjY291bnROYW1lXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBpbnZvaWNlQ29udGFjdCgpOiBPYnNlcnZhYmxlPFNlbmREZXRhaWxzSW52b2ljZUNvbnRhY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5xdW90ZS5tYXAoKHF1b3RlOiBRdW90ZSkgPT4ge1xuICAgICAgcmV0dXJuIHF1b3RlLmludm9pY2VDb250YWN0ID8ge1xuICAgICAgICBuYW1lOiBgJHtxdW90ZS5pbnZvaWNlQ29udGFjdC5maXJzdE5hbWV9ICR7cXVvdGUuaW52b2ljZUNvbnRhY3QubGFzdE5hbWV9YCxcbiAgICAgICAgY29udGFjdEVtYWlsOiBxdW90ZS5pbnZvaWNlQ29udGFjdC5lbWFpbFxuICAgICAgfSA6IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9OZXh0VGFiKCk6IHZvaWQge1xuICAgIGxldCBuZXh0U2VsZWN0ZWRUYWJJbmRleDogbnVtYmVyID0gdGhpcy5zZWxlY3RlZFRhYkluZGV4ICsgMTtcbiAgICBpZiAobmV4dFNlbGVjdGVkVGFiSW5kZXggPj0gdGhpcy50YWJMYWJlbEtleXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICB0aGlzLnRhYkVuYWJsZWRbbmV4dFNlbGVjdGVkVGFiSW5kZXhdID0gdHJ1ZTtcbiAgICB0aGlzLnNlbGVjdGVkVGFiSW5kZXggPSBuZXh0U2VsZWN0ZWRUYWJJbmRleDtcbiAgICB0aGlzLmRldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvUHJldmlvdXNUYWIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9PT0gMCkgcmV0dXJuO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCAtPSAxO1xuICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGRpc2FibGVUYWIodGFiSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMudGFiRW5hYmxlZFt0YWJJbmRleF0gPSBmYWxzZTtcbiAgICB0aGlzLmRldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvVGFiKHRhYkluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNlbGVjdGVkVGFiSW5kZXggPSB0YWJJbmRleDtcbiAgICB0aGlzLmRldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=
