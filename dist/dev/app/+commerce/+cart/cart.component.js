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
var commerce_capabilities_1 = require("../services/commerce.capabilities");
var app_store_1 = require("../../app.store");
var cart_service_1 = require("../../shared/services/cart.service");
var CartComponent = (function () {
    function CartComponent(userCan, store, cartService, detector) {
        this.userCan = userCan;
        this.store = store;
        this.cartService = cartService;
        this.detector = detector;
        this.showComments = null;
    }
    CartComponent.prototype.ngOnInit = function () {
        this.store.dispatch(function (factory) { return factory.checkout.reset(); });
        this.tabLabelKeys = ['cart', 'billing', 'payment', 'confirm'];
        this.tabEnabled = this.tabLabelKeys.map(function (_, index) { return index === 0; });
        this.selectedTabIndex = 0;
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cartComment.config.form.items; });
        this.commentParentObject = { objectType: 'cart', objectId: this.cartService.state.data.id };
    };
    CartComponent.prototype.onNotification = function (message) {
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
    CartComponent.prototype.toggleCommentsVisibility = function () {
        this.showComments = !this.showComments;
    };
    Object.defineProperty(CartComponent.prototype, "commentCount", {
        get: function () {
            return this.store.select(function (state) { return state.comment.cart.pagination.totalCount; });
        },
        enumerable: true,
        configurable: true
    });
    CartComponent.prototype.goToNextTab = function () {
        var nextSelectedTabIndex = this.selectedTabIndex + 1;
        if (nextSelectedTabIndex >= this.tabLabelKeys.length)
            return;
        this.tabEnabled[nextSelectedTabIndex] = true;
        this.selectedTabIndex = nextSelectedTabIndex;
        this.detector.markForCheck();
    };
    CartComponent.prototype.goToPreviousTab = function () {
        if (this.selectedTabIndex === 0)
            return;
        this.selectedTabIndex -= 1;
        this.detector.markForCheck();
    };
    CartComponent.prototype.disableTab = function (tabIndex) {
        this.tabEnabled[tabIndex] = false;
        this.detector.markForCheck();
    };
    CartComponent.prototype.goToTab = function (tabIndex) {
        this.selectedTabIndex = tabIndex;
        this.detector.markForCheck();
    };
    CartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cart-component',
            templateUrl: 'cart.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [commerce_capabilities_1.CommerceCapabilities,
            app_store_1.AppStore,
            cart_service_1.CartService,
            core_1.ChangeDetectorRef])
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY2FydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFFOUYsMkVBQXlFO0FBRXpFLDZDQUEyQztBQUczQyxtRUFBaUU7QUFTakU7SUFRRSx1QkFDUyxPQUE2QixFQUM1QixLQUFlLEVBQ2YsV0FBd0IsRUFDeEIsUUFBMkI7UUFINUIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDNUIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQW1CO1FBUjlCLGlCQUFZLEdBQVksSUFBSSxDQUFDO0lBU2hDLENBQUM7SUFFTCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFLekQsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRzlELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsS0FBSyxJQUFLLE9BQUEsS0FBSyxLQUFLLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBdkQsQ0FBdUQsQ0FBQyxDQUFDO1FBRXJILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM5RixDQUFDO0lBRU0sc0NBQWMsR0FBckIsVUFBc0IsT0FBd0I7UUFDNUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLEtBQUssQ0FBQztZQUNSLENBQUM7WUFDRCxLQUFLLG9CQUFvQixFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1lBQ1IsQ0FBQztZQUNELEtBQUssV0FBVyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QixLQUFLLENBQUM7WUFDUixDQUFDO1lBQ0QsS0FBSyxhQUFhLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU0sZ0RBQXdCLEdBQS9CO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDekMsQ0FBQztJQUVELHNCQUFXLHVDQUFZO2FBQXZCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO1FBQzlFLENBQUM7OztPQUFBO0lBRU8sbUNBQVcsR0FBbkI7UUFDRSxJQUFJLG9CQUFvQixHQUFXLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDN0QsRUFBRSxDQUFDLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM3QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sdUNBQWUsR0FBdkI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sa0NBQVUsR0FBbEIsVUFBbUIsUUFBZ0I7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sK0JBQU8sR0FBZixVQUFnQixRQUFnQjtRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQXBGVSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsV0FBVztZQUN4QixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVdrQiw0Q0FBb0I7WUFDckIsb0JBQVE7WUFDRiwwQkFBVztZQUNkLHdCQUFpQjtPQVoxQixhQUFhLENBcUZ6QjtJQUFELG9CQUFDO0NBckZELEFBcUZDLElBQUE7QUFyRlksc0NBQWEiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rY2FydC9jYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29tbWVyY2VDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb21tZXJjZS5jYXBhYmlsaXRpZXMnO1xuaW1wb3J0IHsgQ29tbWVyY2VNZXNzYWdlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEZvcm1GaWVsZHMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mb3Jtcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbWVudFBhcmVudE9iamVjdCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcnQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2NhcnQtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdjYXJ0Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIENhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgdGFiTGFiZWxLZXlzOiBzdHJpbmdbXTtcbiAgcHVibGljIHRhYkVuYWJsZWQ6IGJvb2xlYW5bXTtcbiAgcHVibGljIHNlbGVjdGVkVGFiSW5kZXg6IG51bWJlcjtcbiAgcHVibGljIHNob3dDb21tZW50czogYm9vbGVhbiA9IG51bGw7XG4gIHB1YmxpYyBjb21tZW50Rm9ybUNvbmZpZzogRm9ybUZpZWxkcztcbiAgcHVibGljIGNvbW1lbnRQYXJlbnRPYmplY3Q6IENvbW1lbnRQYXJlbnRPYmplY3Q7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHVzZXJDYW46IENvbW1lcmNlQ2FwYWJpbGl0aWVzLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IENhcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuY2hlY2tvdXQucmVzZXQoKSk7XG4gICAgLy8gV2UgY291bGQgaW5pdGlhbGl6ZSBhIHN1YnNldCBvZiB0aGVzZSBpbnN0ZWFkLCBiYXNlZCBvbiBzb21lIGNvbmRpdGlvbi5cbiAgICAvLyBGb3IgZXhhbXBsZSwgZG9uJ3QgaW5jbHVkZSAnYmlsbGluZycgYW5kICdwYXltZW50JyBpZiB0aGUgY2FydCB0b3RhbCBpcyAwLlxuICAgIC8vIHRoaXMudGFiTGFiZWxLZXlzID0gWydjYXJ0JywgJ2JpbGxpbmcnLCAncGF5bWVudCcsICdjb25maXJtJ107XG4gICAgLy8gSSB0aGluayB0aGUgY29uZmlybSB0YWIgc2hvdWxkIGJlIHBsYWNlIG9yZGVyXG4gICAgdGhpcy50YWJMYWJlbEtleXMgPSBbJ2NhcnQnLCAnYmlsbGluZycsICdwYXltZW50JywgJ2NvbmZpcm0nXTtcblxuICAgIC8vIEVuYWJsZSB0aGUgZmlyc3QgdGFiIGFuZCBkaXNhYmxlIHRoZSByZXN0LlxuICAgIHRoaXMudGFiRW5hYmxlZCA9IHRoaXMudGFiTGFiZWxLZXlzLm1hcCgoXywgaW5kZXgpID0+IGluZGV4ID09PSAwKTtcblxuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IDA7XG5cbiAgICB0aGlzLmNvbW1lbnRGb3JtQ29uZmlnID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLmNhcnRDb21tZW50LmNvbmZpZy5mb3JtLml0ZW1zKTtcblxuICAgIHRoaXMuY29tbWVudFBhcmVudE9iamVjdCA9IHsgb2JqZWN0VHlwZTogJ2NhcnQnLCBvYmplY3RJZDogdGhpcy5jYXJ0U2VydmljZS5zdGF0ZS5kYXRhLmlkIH07XG4gIH1cblxuICBwdWJsaWMgb25Ob3RpZmljYXRpb24obWVzc2FnZTogQ29tbWVyY2VNZXNzYWdlKTogdm9pZCB7XG4gICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ0dPX1RPX05FWFRfVEFCJzoge1xuICAgICAgICB0aGlzLmdvVG9OZXh0VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnR09fVE9fUFJFVklPVVNfVEFCJzoge1xuICAgICAgICB0aGlzLmdvVG9QcmV2aW91c1RhYigpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0dPX1RPX1RBQic6IHtcbiAgICAgICAgdGhpcy5nb1RvVGFiKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnRElTQUJMRV9UQUInOiB7XG4gICAgICAgIHRoaXMuZGlzYWJsZVRhYihtZXNzYWdlLnBheWxvYWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVDb21tZW50c1Zpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93Q29tbWVudHMgPSAhdGhpcy5zaG93Q29tbWVudHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbW1lbnRDb3VudCgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jb21tZW50LmNhcnQucGFnaW5hdGlvbi50b3RhbENvdW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub05leHRUYWIoKTogdm9pZCB7XG4gICAgbGV0IG5leHRTZWxlY3RlZFRhYkluZGV4OiBudW1iZXIgPSB0aGlzLnNlbGVjdGVkVGFiSW5kZXggKyAxO1xuICAgIGlmIChuZXh0U2VsZWN0ZWRUYWJJbmRleCA+PSB0aGlzLnRhYkxhYmVsS2V5cy5sZW5ndGgpIHJldHVybjtcblxuICAgIHRoaXMudGFiRW5hYmxlZFtuZXh0U2VsZWN0ZWRUYWJJbmRleF0gPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IG5leHRTZWxlY3RlZFRhYkluZGV4O1xuICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c1RhYigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRhYkluZGV4ID09PSAwKSByZXR1cm47XG4gICAgdGhpcy5zZWxlY3RlZFRhYkluZGV4IC09IDE7XG4gICAgdGhpcy5kZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzYWJsZVRhYih0YWJJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy50YWJFbmFibGVkW3RhYkluZGV4XSA9IGZhbHNlO1xuICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9UYWIodGFiSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IHRhYkluZGV4O1xuICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==
