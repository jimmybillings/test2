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
var WzDeliveryOptionsComponent = (function () {
    function WzDeliveryOptionsComponent(store) {
        this.store = store;
        this.markers = null;
    }
    WzDeliveryOptionsComponent.prototype.ngOnInit = function () {
        this.deliveryOptions = this.store.select(function (state) { return state.deliveryOptions.options; });
        this.showMissingOptionsMessage = this.store.select(function (state) {
            return !state.deliveryOptions.loading && !state.deliveryOptions.hasDeliveryOptions;
        });
        this.showLoadingSpinner = this.store.select(function (state) { return state.deliveryOptions.loading; });
        this.showLoadingMessage = this.store.select(function (state) { return state.deliveryOptions.showLoadingMessage; });
    };
    WzDeliveryOptionsComponent.prototype.iconStringFor = function (option) {
        return "ASSET.DELIVERY_OPTIONS.ICON." + option.deliveryOptionTransferType;
    };
    WzDeliveryOptionsComponent.prototype.trStringFor = function (group) {
        return "ASSET.DELIVERY_OPTIONS.LABEL." + group[0].deliveryOptionLabel;
    };
    WzDeliveryOptionsComponent.prototype.onDownloadBtnClick = function (option) {
        this.store.dispatch(this.factoryMapperFor(option));
    };
    WzDeliveryOptionsComponent.prototype.factoryMapperFor = function (option) {
        var _this = this;
        switch (option.deliveryOptionTransferType) {
            case 'location':
                return function (factory) { return factory.deliveryOptions.deliver(_this.assetId, option, _this.markers); };
            case 'download':
                return function (factory) { return factory.deliveryOptions.download(option); };
            case 'aspera':
                return function (factory) { return factory.deliveryOptions.downloadViaAspera(option); };
            default:
                return function (factory) { return factory.snackbar.display('DELIVERY_OPTIONS.DELIVERY_ERROR'); };
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], WzDeliveryOptionsComponent.prototype, "assetId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzDeliveryOptionsComponent.prototype, "markers", void 0);
    WzDeliveryOptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-delivery-options',
            templateUrl: './wz.delivery-options.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], WzDeliveryOptionsComponent);
    return WzDeliveryOptionsComponent;
}());
exports.WzDeliveryOptionsComponent = WzDeliveryOptionsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1kZWxpdmVyeS1vcHRpb25zL3d6LmRlbGl2ZXJ5LW9wdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQWtGO0FBQ2xGLGdEQUFtRTtBQVVuRTtJQVFFLG9DQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQU5uQixZQUFPLEdBQW1CLElBQUksQ0FBQztJQU1SLENBQUM7SUFFeEMsNkNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUs7WUFDdEQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDO1FBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUF4QyxDQUF3QyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVNLGtEQUFhLEdBQXBCLFVBQXFCLE1BQXNCO1FBQ3pDLE1BQU0sQ0FBQyxpQ0FBK0IsTUFBTSxDQUFDLDBCQUE0QixDQUFDO0lBQzVFLENBQUM7SUFFTSxnREFBVyxHQUFsQixVQUFtQixLQUEwQjtRQUMzQyxNQUFNLENBQUMsa0NBQWdDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBcUIsQ0FBQztJQUN4RSxDQUFDO0lBRU0sdURBQWtCLEdBQXpCLFVBQTBCLE1BQXNCO1FBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTyxxREFBZ0IsR0FBeEIsVUFBeUIsTUFBc0I7UUFBL0MsaUJBV0M7UUFWQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEtBQUssVUFBVTtnQkFDYixNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQW5FLENBQW1FLENBQUM7WUFDeEYsS0FBSyxVQUFVO2dCQUNiLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO1lBQzdELEtBQUssUUFBUTtnQkFDWCxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFqRCxDQUFpRCxDQUFDO1lBQ3RFO2dCQUNFLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLEVBQTNELENBQTJELENBQUM7UUFDbEYsQ0FBQztJQUNILENBQUM7SUF6Q1E7UUFBUixZQUFLLEVBQUU7OytEQUF3QjtJQUN2QjtRQUFSLFlBQUssRUFBRTs7K0RBQXVDO0lBRnBDLDBCQUEwQjtRQU50QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVMyQixvQkFBUTtPQVJ4QiwwQkFBMEIsQ0EyQ3RDO0lBQUQsaUNBQUM7Q0EzQ0QsQUEyQ0MsSUFBQTtBQTNDWSxnRUFBMEIiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LWRlbGl2ZXJ5LW9wdGlvbnMvd3ouZGVsaXZlcnktb3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwcFN0b3JlLCBBY3Rpb25GYWN0b3J5TWFwcGVyIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IERlbGl2ZXJ5T3B0aW9uLCBEZWxpdmVyeU9wdGlvbnMsIERlbGl2ZXJ5T3B0aW9uR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hc3NldC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3ViY2xpcE1hcmtlcnMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1kZWxpdmVyeS1vcHRpb25zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3d6LmRlbGl2ZXJ5LW9wdGlvbnMuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFd6RGVsaXZlcnlPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcHVibGljIGFzc2V0SWQ6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIG1hcmtlcnM6IFN1YmNsaXBNYXJrZXJzID0gbnVsbDtcbiAgcHVibGljIGRlbGl2ZXJ5T3B0aW9uczogT2JzZXJ2YWJsZTxEZWxpdmVyeU9wdGlvbnM+O1xuICBwdWJsaWMgc2hvd01pc3NpbmdPcHRpb25zTWVzc2FnZTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHVibGljIHNob3dMb2FkaW5nU3Bpbm5lcjogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHVibGljIHNob3dMb2FkaW5nTWVzc2FnZTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kZWxpdmVyeU9wdGlvbnMgPSB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5kZWxpdmVyeU9wdGlvbnMub3B0aW9ucyk7XG4gICAgdGhpcy5zaG93TWlzc2luZ09wdGlvbnNNZXNzYWdlID0gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4ge1xuICAgICAgcmV0dXJuICFzdGF0ZS5kZWxpdmVyeU9wdGlvbnMubG9hZGluZyAmJiAhc3RhdGUuZGVsaXZlcnlPcHRpb25zLmhhc0RlbGl2ZXJ5T3B0aW9ucztcbiAgICB9KTtcbiAgICB0aGlzLnNob3dMb2FkaW5nU3Bpbm5lciA9IHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmRlbGl2ZXJ5T3B0aW9ucy5sb2FkaW5nKTtcbiAgICB0aGlzLnNob3dMb2FkaW5nTWVzc2FnZSA9IHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmRlbGl2ZXJ5T3B0aW9ucy5zaG93TG9hZGluZ01lc3NhZ2UpO1xuICB9XG5cbiAgcHVibGljIGljb25TdHJpbmdGb3Iob3B0aW9uOiBEZWxpdmVyeU9wdGlvbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBBU1NFVC5ERUxJVkVSWV9PUFRJT05TLklDT04uJHtvcHRpb24uZGVsaXZlcnlPcHRpb25UcmFuc2ZlclR5cGV9YDtcbiAgfVxuXG4gIHB1YmxpYyB0clN0cmluZ0Zvcihncm91cDogRGVsaXZlcnlPcHRpb25Hcm91cCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBBU1NFVC5ERUxJVkVSWV9PUFRJT05TLkxBQkVMLiR7Z3JvdXBbMF0uZGVsaXZlcnlPcHRpb25MYWJlbH1gO1xuICB9XG5cbiAgcHVibGljIG9uRG93bmxvYWRCdG5DbGljayhvcHRpb246IERlbGl2ZXJ5T3B0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh0aGlzLmZhY3RvcnlNYXBwZXJGb3Iob3B0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIGZhY3RvcnlNYXBwZXJGb3Iob3B0aW9uOiBEZWxpdmVyeU9wdGlvbik6IEFjdGlvbkZhY3RvcnlNYXBwZXIge1xuICAgIHN3aXRjaCAob3B0aW9uLmRlbGl2ZXJ5T3B0aW9uVHJhbnNmZXJUeXBlKSB7XG4gICAgICBjYXNlICdsb2NhdGlvbic6XG4gICAgICAgIHJldHVybiBmYWN0b3J5ID0+IGZhY3RvcnkuZGVsaXZlcnlPcHRpb25zLmRlbGl2ZXIodGhpcy5hc3NldElkLCBvcHRpb24sIHRoaXMubWFya2Vycyk7XG4gICAgICBjYXNlICdkb3dubG9hZCc6XG4gICAgICAgIHJldHVybiBmYWN0b3J5ID0+IGZhY3RvcnkuZGVsaXZlcnlPcHRpb25zLmRvd25sb2FkKG9wdGlvbik7XG4gICAgICBjYXNlICdhc3BlcmEnOlxuICAgICAgICByZXR1cm4gZmFjdG9yeSA9PiBmYWN0b3J5LmRlbGl2ZXJ5T3B0aW9ucy5kb3dubG9hZFZpYUFzcGVyYShvcHRpb24pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhY3RvcnkgPT4gZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5KCdERUxJVkVSWV9PUFRJT05TLkRFTElWRVJZX0VSUk9SJyk7XG4gICAgfVxuICB9XG59XG4iXX0=
