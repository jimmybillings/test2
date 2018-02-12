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
var commerce_interface_1 = require("../../../../../shared/interfaces/commerce.interface");
var core_1 = require("@angular/core");
var capabilities_service_1 = require("../../../../../shared/services/capabilities.service");
var app_store_1 = require("../../../../../app.store");
var tab_1 = require("../../../../components/tabs/tab");
var QuoteEditConfirmTabComponent = (function (_super) {
    __extends(QuoteEditConfirmTabComponent, _super);
    function QuoteEditConfirmTabComponent(userCan, store) {
        var _this = _super.call(this) || this;
        _this.userCan = userCan;
        _this.store = store;
        return _this;
    }
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "sendDetails", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.sendDetails; });
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditConfirmTabComponent.prototype.sendQuote = function () {
        this.store.dispatch(function (factory) { return factory.quoteEdit.sendQuote(); });
    };
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "discount", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.discount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "showDiscount", {
        get: function () {
            return this.store.snapshot(function (state) {
                return state.quoteEdit.data.discount > 0 && !commerce_interface_1.quotesWithoutPricing.includes(state.quoteEdit.data.purchaseType);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "subTotal", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.subTotal; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "total", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.total; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "showTotal", {
        get: function () {
            return this.store.snapshot(function (state) {
                return state.quoteEdit.data.total > 0 && !commerce_interface_1.quotesWithoutPricing.includes(state.quoteEdit.data.purchaseType);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "quoteType", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data.purchaseType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditConfirmTabComponent.prototype, "quoteTypeTranslationKey", {
        get: function () {
            return this.quoteType.map(function (quoteType) { return "QUOTE." + quoteType; });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], QuoteEditConfirmTabComponent.prototype, "projects", void 0);
    QuoteEditConfirmTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-edit-confirm-tab-component',
            templateUrl: 'quote-edit-confirm-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities, app_store_1.AppStore])
    ], QuoteEditConfirmTabComponent);
    return QuoteEditConfirmTabComponent;
}(tab_1.Tab));
exports.QuoteEditConfirmTabComponent = QuoteEditConfirmTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LWNvbmZpcm0tdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwRkFLNkQ7QUFDN0Qsc0NBQTBFO0FBQzFFLDRGQUFtRjtBQUNuRixzREFBb0Q7QUFDcEQsdURBQXNEO0FBU3REO0lBQWtELGdEQUFHO0lBR25ELHNDQUFtQixPQUFxQixFQUFVLEtBQWU7UUFBakUsWUFDRSxpQkFBTyxTQUNSO1FBRmtCLGFBQU8sR0FBUCxPQUFPLENBQWM7UUFBVSxXQUFLLEdBQUwsS0FBSyxDQUFVOztJQUVqRSxDQUFDO0lBRUQsc0JBQVcscURBQVc7YUFBdEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7OztPQUFBO0lBRU0sZ0RBQVMsR0FBaEI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQTdCLENBQTZCLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsc0JBQVcsa0RBQVE7YUFBbkI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUNuRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNEQUFZO2FBQXZCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsS0FBSztnQkFDOUIsT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMseUNBQW9CLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUF0RyxDQUFzRyxDQUN2RyxDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrREFBUTthQUFuQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0NBQUs7YUFBaEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1EQUFTO2FBQXBCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsS0FBSztnQkFDOUIsT0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMseUNBQW9CLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUFuRyxDQUFtRyxDQUNwRyxDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxtREFBUzthQUFwQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsaUVBQXVCO2FBQWxDO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsV0FBUyxTQUFXLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUMvRCxDQUFDOzs7T0FBQTtJQTVDUTtRQUFSLFlBQUssRUFBRTs7a0VBQXFCO0lBRGxCLDRCQUE0QjtRQVB4QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQ0FBa0M7WUFDNUMsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQUs0QixtQ0FBWSxFQUFpQixvQkFBUTtPQUh0RCw0QkFBNEIsQ0E4Q3hDO0lBQUQsbUNBQUM7Q0E5Q0QsQUE4Q0MsQ0E5Q2lELFNBQUcsR0E4Q3BEO0FBOUNZLG9FQUE0QiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS8rZWRpdC9jb21wb25lbnRzL3RhYnMvcXVvdGUtZWRpdC1jb25maXJtLXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7XG4gIFB1cmNoYXNlVHlwZSxcbiAgUHJvamVjdCxcbiAgU2VuZERldGFpbHMsXG4gIHF1b3Rlc1dpdGhvdXRQcmljaW5nXG59IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFRhYiB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy90YWInO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdxdW90ZS1lZGl0LWNvbmZpcm0tdGFiLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAncXVvdGUtZWRpdC1jb25maXJtLXRhYi5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBRdW90ZUVkaXRDb25maXJtVGFiQ29tcG9uZW50IGV4dGVuZHMgVGFiIHtcbiAgQElucHV0KCkgcHJvamVjdHM6IFByb2plY3RbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXNlckNhbjogQ2FwYWJpbGl0aWVzLCBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNlbmREZXRhaWxzKCk6IE9ic2VydmFibGU8U2VuZERldGFpbHM+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LnNlbmREZXRhaWxzKTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kUXVvdGUoKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LnNlbmRRdW90ZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGlzY291bnQoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEuZGlzY291bnQpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93RGlzY291bnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT5cbiAgICAgIHN0YXRlLnF1b3RlRWRpdC5kYXRhLmRpc2NvdW50ID4gMCAmJiAhcXVvdGVzV2l0aG91dFByaWNpbmcuaW5jbHVkZXMoc3RhdGUucXVvdGVFZGl0LmRhdGEucHVyY2hhc2VUeXBlKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN1YlRvdGFsKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLnN1YlRvdGFsKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdG90YWwoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0LmRhdGEudG90YWwpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93VG90YWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT5cbiAgICAgIHN0YXRlLnF1b3RlRWRpdC5kYXRhLnRvdGFsID4gMCAmJiAhcXVvdGVzV2l0aG91dFByaWNpbmcuaW5jbHVkZXMoc3RhdGUucXVvdGVFZGl0LmRhdGEucHVyY2hhc2VUeXBlKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHF1b3RlVHlwZSgpOiBPYnNlcnZhYmxlPFB1cmNoYXNlVHlwZT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5wdXJjaGFzZVR5cGUpO1xuICB9XG5cbiAgcHVibGljIGdldCBxdW90ZVR5cGVUcmFuc2xhdGlvbktleSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnF1b3RlVHlwZS5tYXAocXVvdGVUeXBlID0+IGBRVU9URS4ke3F1b3RlVHlwZX1gKTtcbiAgfVxufVxuIl19
