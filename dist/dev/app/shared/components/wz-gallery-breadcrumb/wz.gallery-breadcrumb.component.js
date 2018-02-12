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
var WzGalleryBreadcrumbComponent = (function () {
    function WzGalleryBreadcrumbComponent() {
        this.clickBreadcrumb = new core_1.EventEmitter();
    }
    WzGalleryBreadcrumbComponent.prototype.breadcrumbLabelFor = function (segment) {
        return (segment && segment.names) ? segment.names.join(' : ') : '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzGalleryBreadcrumbComponent.prototype, "path", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzGalleryBreadcrumbComponent.prototype, "clickBreadcrumb", void 0);
    WzGalleryBreadcrumbComponent = __decorate([
        core_1.Component({
            selector: 'wz-gallery-breadcrumb',
            templateUrl: 'wz.gallery-breadcrumb.html',
            moduleId: module.id,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], WzGalleryBreadcrumbComponent);
    return WzGalleryBreadcrumbComponent;
}());
exports.WzGalleryBreadcrumbComponent = WzGalleryBreadcrumbComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1nYWxsZXJ5LWJyZWFkY3J1bWIvd3ouZ2FsbGVyeS1icmVhZGNydW1iLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFnRztBQVFoRztJQU5BO1FBUVksb0JBQWUsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFLcEUsQ0FBQztJQUhRLHlEQUFrQixHQUF6QixVQUEwQixPQUFZO1FBQ3BDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDckUsQ0FBQztJQUxRO1FBQVIsWUFBSyxFQUFFOzs4REFBVztJQUNUO1FBQVQsYUFBTSxFQUFFO2tDQUFrQixtQkFBWTt5RUFBMkI7SUFGdkQsNEJBQTRCO1FBTnhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyw0QkFBNEIsQ0FPeEM7SUFBRCxtQ0FBQztDQVBELEFBT0MsSUFBQTtBQVBZLG9FQUE0QiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otZ2FsbGVyeS1icmVhZGNydW1iL3d6LmdhbGxlcnktYnJlYWRjcnVtYi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd3otZ2FsbGVyeS1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5nYWxsZXJ5LWJyZWFkY3J1bWIuaHRtbCcsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFd6R2FsbGVyeUJyZWFkY3J1bWJDb21wb25lbnQge1xuICBASW5wdXQoKSBwYXRoOiBhbnk7XG4gIEBPdXRwdXQoKSBjbGlja0JyZWFkY3J1bWI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBicmVhZGNydW1iTGFiZWxGb3Ioc2VnbWVudDogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHNlZ21lbnQgJiYgc2VnbWVudC5uYW1lcykgPyBzZWdtZW50Lm5hbWVzLmpvaW4oJyA6ICcpIDogJyc7XG4gIH1cbn1cbiJdfQ==
