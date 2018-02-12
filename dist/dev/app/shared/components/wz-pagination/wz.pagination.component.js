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
var forms_1 = require("@angular/forms");
var WzPaginationComponent = (function () {
    function WzPaginationComponent(fb) {
        this.fb = fb;
        this.getPage = new core_1.EventEmitter();
    }
    WzPaginationComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            page: [this.pagination.currentPage, forms_1.Validators.required]
        });
    };
    WzPaginationComponent.prototype.getPageNumber = function (pageNumber) {
        pageNumber = parseInt(pageNumber) || 1;
        if (pageNumber <= 1) {
            this.getPage.emit(1);
        }
        else if (pageNumber > this.pagination.numberOfPages) {
            this.getPage.emit(this.pagination.numberOfPages);
        }
        else {
            this.getPage.emit(pageNumber);
        }
    };
    WzPaginationComponent.prototype.getCurrentPage = function () {
        if (this.pagination.numberOfPages > 0) {
            return this.pagination.currentPage;
        }
        return 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzPaginationComponent.prototype, "pagination", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzPaginationComponent.prototype, "getPage", void 0);
    WzPaginationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-pagination',
            templateUrl: 'wz.pagination.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], WzPaginationComponent);
    return WzPaginationComponent;
}());
exports.WzPaginationComponent = WzPaginationComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1wYWdpbmF0aW9uL3d6LnBhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXdHO0FBQ3hHLHdDQUFvRTtBQWFwRTtJQUtFLCtCQUFtQixFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUh4QixZQUFPLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFHRCxDQUFDO0lBRXZDLHdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3hCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3pELENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSw2Q0FBYSxHQUFwQixVQUFxQixVQUFlO1FBQ2xDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBRU0sOENBQWMsR0FBckI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUE1QlE7UUFBUixZQUFLLEVBQUU7OzZEQUFpQjtJQUNmO1FBQVQsYUFBTSxFQUFFOzswREFBOEI7SUFGNUIscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQU11QixtQkFBVztPQUx2QixxQkFBcUIsQ0E4QmpDO0lBQUQsNEJBQUM7Q0E5QkQsQUE4QkMsSUFBQTtBQTlCWSxzREFBcUIiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXBhZ2luYXRpb24vd3oucGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBUaGUgUGFnaW5hdGlvbiBjb21wb25lbnQgdGFrZXMgYW4gaW5wdXQgb2YgdGhlIFBhZ2luYXRpb24gT2JqZWN0IHRoYXQgaXMgcmV0dXJuZWQgd2l0aFxuICogYWxsIEFQSSBjYWxscy4gSXQgb3VwdXRzIGEgZ2V0UGFnZSBldmVudCB3aXRoIHRoZSBwYWdlTnVtYmVyIGZvciB0aGUgQVBJIHRvIGdldC5cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5wYWdpbmF0aW9uLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBXelBhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwYWdpbmF0aW9uOiBhbnk7XG4gIEBPdXRwdXQoKSBnZXRQYWdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmYjogRm9ybUJ1aWxkZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgcGFnZTogW3RoaXMucGFnaW5hdGlvbi5jdXJyZW50UGFnZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQYWdlTnVtYmVyKHBhZ2VOdW1iZXI6IGFueSk6IHZvaWQge1xuICAgIHBhZ2VOdW1iZXIgPSBwYXJzZUludChwYWdlTnVtYmVyKSB8fCAxO1xuICAgIGlmIChwYWdlTnVtYmVyIDw9IDEpIHtcbiAgICAgIHRoaXMuZ2V0UGFnZS5lbWl0KDEpO1xuICAgIH0gZWxzZSBpZiAocGFnZU51bWJlciA+IHRoaXMucGFnaW5hdGlvbi5udW1iZXJPZlBhZ2VzKSB7XG4gICAgICB0aGlzLmdldFBhZ2UuZW1pdCh0aGlzLnBhZ2luYXRpb24ubnVtYmVyT2ZQYWdlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0UGFnZS5lbWl0KHBhZ2VOdW1iZXIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50UGFnZSgpOiBOdW1iZXIge1xuICAgIGlmICh0aGlzLnBhZ2luYXRpb24ubnVtYmVyT2ZQYWdlcyA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnBhZ2luYXRpb24uY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG59XG4iXX0=
