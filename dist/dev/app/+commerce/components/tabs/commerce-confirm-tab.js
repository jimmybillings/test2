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
var tab_1 = require("./tab");
var CommerceConfirmTab = (function (_super) {
    __extends(CommerceConfirmTab, _super);
    function CommerceConfirmTab(router, commerceService, dialogService, userCan, store) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.commerceService = commerceService;
        _this.dialogService = dialogService;
        _this.userCan = userCan;
        _this.store = store;
        _this.tabNotify = _this.notify;
        _this.licensesAreAgreedTo = false;
        return _this;
    }
    Object.defineProperty(CommerceConfirmTab.prototype, "hasDiscount", {
        get: function () {
            return !!this.commerceService.state.data.discount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "orderInProgress", {
        get: function () {
            return this.store.select(function (state) { return state.checkout; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "data", {
        get: function () {
            return this.commerceService.data.map(function (state) { return state.data; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "projects", {
        get: function () {
            return this.commerceService.projects;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "paymentType", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.selectedPaymentType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "purchaseOrderId", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.purchaseOrderId; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "showPurchaseBtn", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.selectedPaymentType === 'CreditCard'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "showPurchaseOnCreditBtn", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.selectedPaymentType === 'PurchaseOnCredit'; });
        },
        enumerable: true,
        configurable: true
    });
    CommerceConfirmTab.prototype.purchase = function () {
        var _this = this;
        this.commerceService.purchase().subscribe(function (orderId) {
            return _this.router.navigate(['/orders', orderId]);
        }, function (error) { });
    };
    CommerceConfirmTab.prototype.format = function (address) {
        if (address.address) {
            return Object.keys(address.address).reduce(function (previous, current) {
                if (current === 'address' || current === 'zipcode' || current === 'phone') {
                    previous += address.address[current] + "<br>";
                }
                else {
                    previous += address.address[current] + ", ";
                }
                return previous;
            }, '');
        }
        else {
            return "There is no address on record for this " + address.type;
        }
    };
    CommerceConfirmTab.prototype.lineOneFor = function (address) {
        return this.addressJoinSegment(address, 'address', 'address2');
    };
    CommerceConfirmTab.prototype.cityFor = function (address) {
        return this.addressSegmentWithComma(address, 'city');
    };
    CommerceConfirmTab.prototype.stateFor = function (address) {
        return this.addressSegment(address, 'state');
    };
    CommerceConfirmTab.prototype.zipcodeFor = function (address) {
        return this.addressSegmentWithComma(address, 'zipcode');
    };
    CommerceConfirmTab.prototype.countryFor = function (address) {
        return this.addressSegment(address, 'country');
    };
    CommerceConfirmTab.prototype.phoneFor = function (address) {
        return this.addressSegment(address, 'phone');
    };
    CommerceConfirmTab.prototype.addressSegment = function (address, segment) {
        return address.address && address.address[segment] ? address.address[segment] : null;
    };
    CommerceConfirmTab.prototype.addressSegmentWithComma = function (address, segment) {
        return this.addressSegment(address, segment) ? this.addressSegment(address, segment) + ',' : '';
    };
    CommerceConfirmTab.prototype.addressJoinSegment = function (address, segmentOne, segmentTwo) {
        return (address.address[segmentOne] ? address.address[segmentOne] : '') +
            (address.address[segmentTwo] ? ', ' + address.address[segmentTwo] : '');
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommerceConfirmTab.prototype, "tabNotify", void 0);
    return CommerceConfirmTab;
}(tab_1.Tab));
exports.CommerceConfirmTab = CommerceConfirmTab;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLWNvbmZpcm0tdGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFxRDtBQUdyRCw2QkFBNEI7QUFXNUI7SUFBd0Msc0NBQUc7SUFLekMsNEJBQ1ksTUFBYyxFQUNqQixlQUEyQyxFQUN4QyxhQUE4QixFQUNqQyxPQUE2QixFQUMxQixLQUFlO1FBTDNCLFlBT0UsaUJBQU8sU0FDUjtRQVBXLFlBQU0sR0FBTixNQUFNLENBQVE7UUFDakIscUJBQWUsR0FBZixlQUFlLENBQTRCO1FBQ3hDLG1CQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUNqQyxhQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUMxQixXQUFLLEdBQUwsS0FBSyxDQUFVO1FBVGpCLGVBQVMsR0FBeUIsS0FBSSxDQUFDLE1BQU0sQ0FBQztRQUVqRCx5QkFBbUIsR0FBWSxLQUFLLENBQUM7O0lBVTVDLENBQUM7SUFFRCxzQkFBVywyQ0FBVzthQUF0QjtZQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLCtDQUFlO2FBQTFCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsRUFBZCxDQUFjLENBQUMsQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG9DQUFJO2FBQWY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBNkIsSUFBSyxPQUFBLEtBQUssQ0FBQyxJQUFJLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDdEYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx3Q0FBUTthQUFuQjtZQUNF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QyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQXRHUztRQUFULGFBQU0sRUFBRTtrQ0FBWSxtQkFBWTt5REFBdUI7SUF1RzFELHlCQUFDO0NBeEdELEFBd0dDLENBeEd1QyxTQUFHLEdBd0cxQztBQXhHWSxnREFBa0IiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL3RhYnMvY29tbWVyY2UtY29uZmlybS10YWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvY2FydC5zZXJ2aWNlJztcbmltcG9ydCB7IFF1b3RlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9xdW90ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYiB9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFZpZXdBZGRyZXNzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2FydFN0YXRlLCBRdW90ZVN0YXRlLCBQYXltZW50T3B0aW9uLCBQcm9qZWN0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1lcmNlQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29tbWVyY2UuY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7IFd6RGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9zZXJ2aWNlcy93ei5kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RvcmUsIENoZWNrb3V0U3RhdGUgfSBmcm9tICcuLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5leHBvcnQgY2xhc3MgQ29tbWVyY2VDb25maXJtVGFiIGV4dGVuZHMgVGFiIHtcbiAgQE91dHB1dCgpIHRhYk5vdGlmeTogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSB0aGlzLm5vdGlmeTtcbiAgcHVibGljIHN0b3JlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBsaWNlbnNlc0FyZUFncmVlZFRvOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgIHB1YmxpYyBjb21tZXJjZVNlcnZpY2U6IENhcnRTZXJ2aWNlIHwgUXVvdGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBkaWFsb2dTZXJ2aWNlOiBXekRpYWxvZ1NlcnZpY2UsXG4gICAgcHVibGljIHVzZXJDYW46IENvbW1lcmNlQ2FwYWJpbGl0aWVzLFxuICAgIHByb3RlY3RlZCBzdG9yZTogQXBwU3RvcmVcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGFzRGlzY291bnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jb21tZXJjZVNlcnZpY2Uuc3RhdGUuZGF0YS5kaXNjb3VudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3JkZXJJblByb2dyZXNzKCk6IE9ic2VydmFibGU8Q2hlY2tvdXRTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRhdGEoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tZXJjZVNlcnZpY2UuZGF0YS5tYXAoKHN0YXRlOiBRdW90ZVN0YXRlIHwgQ2FydFN0YXRlKSA9PiBzdGF0ZS5kYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvamVjdHMoKTogT2JzZXJ2YWJsZTxQcm9qZWN0W10+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tZXJjZVNlcnZpY2UucHJvamVjdHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBheW1lbnRUeXBlKCk6IE9ic2VydmFibGU8UGF5bWVudE9wdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dC5zZWxlY3RlZFBheW1lbnRUeXBlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHVyY2hhc2VPcmRlcklkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmNoZWNrb3V0LnB1cmNoYXNlT3JkZXJJZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dQdXJjaGFzZUJ0bigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY2hlY2tvdXQuc2VsZWN0ZWRQYXltZW50VHlwZSA9PT0gJ0NyZWRpdENhcmQnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hvd1B1cmNoYXNlT25DcmVkaXRCdG4oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmNoZWNrb3V0LnNlbGVjdGVkUGF5bWVudFR5cGUgPT09ICdQdXJjaGFzZU9uQ3JlZGl0Jyk7XG4gIH1cblxuICBwdWJsaWMgcHVyY2hhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5jb21tZXJjZVNlcnZpY2UucHVyY2hhc2UoKS5zdWJzY3JpYmUoKG9yZGVySWQ6IE51bWJlcikgPT5cbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL29yZGVycycsIG9yZGVySWRdKVxuICAgICAgLCAoZXJyb3I6IGFueSkgPT4geyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JtYXQoYWRkcmVzczogVmlld0FkZHJlc3MpOiBzdHJpbmcge1xuICAgIGlmIChhZGRyZXNzLmFkZHJlc3MpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhZGRyZXNzLmFkZHJlc3MpLnJlZHVjZSgocHJldmlvdXM6IHN0cmluZywgY3VycmVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSAnYWRkcmVzcycgfHwgY3VycmVudCA9PT0gJ3ppcGNvZGUnIHx8IGN1cnJlbnQgPT09ICdwaG9uZScpIHtcbiAgICAgICAgICBwcmV2aW91cyArPSBgJHthZGRyZXNzLmFkZHJlc3NbY3VycmVudF19PGJyPmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldmlvdXMgKz0gYCR7YWRkcmVzcy5hZGRyZXNzW2N1cnJlbnRdfSwgYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICB9LCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgVGhlcmUgaXMgbm8gYWRkcmVzcyBvbiByZWNvcmQgZm9yIHRoaXMgJHthZGRyZXNzLnR5cGV9YDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbGluZU9uZUZvcihhZGRyZXNzOiBWaWV3QWRkcmVzcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYWRkcmVzc0pvaW5TZWdtZW50KGFkZHJlc3MsICdhZGRyZXNzJywgJ2FkZHJlc3MyJyk7XG4gIH1cblxuICBwdWJsaWMgY2l0eUZvcihhZGRyZXNzOiBWaWV3QWRkcmVzcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYWRkcmVzc1NlZ21lbnRXaXRoQ29tbWEoYWRkcmVzcywgJ2NpdHknKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0ZUZvcihhZGRyZXNzOiBWaWV3QWRkcmVzcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYWRkcmVzc1NlZ21lbnQoYWRkcmVzcywgJ3N0YXRlJyk7XG4gIH1cblxuICBwdWJsaWMgemlwY29kZUZvcihhZGRyZXNzOiBWaWV3QWRkcmVzcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYWRkcmVzc1NlZ21lbnRXaXRoQ29tbWEoYWRkcmVzcywgJ3ppcGNvZGUnKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3VudHJ5Rm9yKGFkZHJlc3M6IFZpZXdBZGRyZXNzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzU2VnbWVudChhZGRyZXNzLCAnY291bnRyeScpO1xuICB9XG5cbiAgcHVibGljIHBob25lRm9yKGFkZHJlc3M6IFZpZXdBZGRyZXNzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzU2VnbWVudChhZGRyZXNzLCAncGhvbmUnKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkcmVzc1NlZ21lbnQoYWRkcmVzczogVmlld0FkZHJlc3MsIHNlZ21lbnQ6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiBhZGRyZXNzLmFkZHJlc3MgJiYgYWRkcmVzcy5hZGRyZXNzW3NlZ21lbnRdID8gYWRkcmVzcy5hZGRyZXNzW3NlZ21lbnRdIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYWRkcmVzc1NlZ21lbnRXaXRoQ29tbWEoYWRkcmVzczogVmlld0FkZHJlc3MsIHNlZ21lbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYWRkcmVzc1NlZ21lbnQoYWRkcmVzcywgc2VnbWVudCkgPyB0aGlzLmFkZHJlc3NTZWdtZW50KGFkZHJlc3MsIHNlZ21lbnQpICsgJywnIDogJyc7XG4gIH1cblxuICBwcml2YXRlIGFkZHJlc3NKb2luU2VnbWVudChhZGRyZXNzOiBWaWV3QWRkcmVzcywgc2VnbWVudE9uZTogc3RyaW5nLCBzZWdtZW50VHdvOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAoYWRkcmVzcy5hZGRyZXNzW3NlZ21lbnRPbmVdID8gYWRkcmVzcy5hZGRyZXNzW3NlZ21lbnRPbmVdIDogJycpICtcbiAgICAgIChhZGRyZXNzLmFkZHJlc3Nbc2VnbWVudFR3b10gPyAnLCAnICsgYWRkcmVzcy5hZGRyZXNzW3NlZ21lbnRUd29dIDogJycpO1xuICB9XG59XG4iXX0=
