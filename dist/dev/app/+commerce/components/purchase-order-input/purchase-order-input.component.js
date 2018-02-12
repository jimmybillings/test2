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
var PurchaseOrderInputComponent = (function () {
    function PurchaseOrderInputComponent(store) {
        this.store = store;
    }
    PurchaseOrderInputComponent.prototype.ngOnInit = function () {
        this.PurchaseOrderFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config.addPurchaseOrderId.items; });
    };
    PurchaseOrderInputComponent.prototype.onBlur = function (form) {
        this.store.dispatch(function (factory) { return factory.checkout.setPurchaseOrderId(form.purchaseOrderId); });
    };
    PurchaseOrderInputComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'purchase-order-input-component',
            template: "\n    <wz-form\n      [includeSubmit]=\"false\"\n      [includeCancel]=\"false\"\n      [items]=\"PurchaseOrderFormConfig\"\n      (blur)=\"onBlur($event)\">\n    </wz-form>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], PurchaseOrderInputComponent);
    return PurchaseOrderInputComponent;
}());
exports.PurchaseOrderInputComponent = PurchaseOrderInputComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wdXJjaGFzZS1vcmRlci1pbnB1dC9wdXJjaGFzZS1vcmRlci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkU7QUFDM0UsZ0RBQTJEO0FBZ0IzRDtJQUdFLHFDQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFJLENBQUM7SUFFakMsOENBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUE5RCxDQUE4RCxDQUFDLENBQUM7SUFDcEksQ0FBQztJQUNNLDRDQUFNLEdBQWIsVUFBYyxJQUFVO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQXpELENBQXlELENBQUMsQ0FBQztJQUM1RixDQUFDO0lBVlUsMkJBQTJCO1FBWnZDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGdDQUFnQztZQUMxQyxRQUFRLEVBQUUsK0tBTUc7WUFDYixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQUkyQixvQkFBUTtPQUh4QiwyQkFBMkIsQ0FXdkM7SUFBRCxrQ0FBQztDQVhELEFBV0MsSUFBQTtBQVhZLGtFQUEyQiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlL2NvbXBvbmVudHMvcHVyY2hhc2Utb3JkZXItaW5wdXQvcHVyY2hhc2Utb3JkZXItaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGF0ZU1hcHBlciwgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3B1cmNoYXNlLW9yZGVyLWlucHV0LWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHd6LWZvcm1cbiAgICAgIFtpbmNsdWRlU3VibWl0XT1cImZhbHNlXCJcbiAgICAgIFtpbmNsdWRlQ2FuY2VsXT1cImZhbHNlXCJcbiAgICAgIFtpdGVtc109XCJQdXJjaGFzZU9yZGVyRm9ybUNvbmZpZ1wiXG4gICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiPlxuICAgIDwvd3otZm9ybT5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQdXJjaGFzZU9yZGVySW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgUHVyY2hhc2VPcmRlckZvcm1Db25maWc6IEFycmF5PEZvcm1GaWVsZHM+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5QdXJjaGFzZU9yZGVyRm9ybUNvbmZpZyA9IHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5jYXJ0LmNvbmZpZy5hZGRQdXJjaGFzZU9yZGVySWQuaXRlbXMpO1xuICB9XG4gIHB1YmxpYyBvbkJsdXIoZm9ybTogUG9qbyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmNoZWNrb3V0LnNldFB1cmNoYXNlT3JkZXJJZChmb3JtLnB1cmNoYXNlT3JkZXJJZCkpO1xuICB9XG59XG4iXX0=
