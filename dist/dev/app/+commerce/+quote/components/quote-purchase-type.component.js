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
var QuotePurchaseTypeComponent = (function () {
    function QuotePurchaseTypeComponent() {
        this.selectQuoteType = new core_1.EventEmitter();
        this.selectedType = null;
    }
    Object.defineProperty(QuotePurchaseTypeComponent.prototype, "quoteTypes", {
        set: function (types) {
            this.types = types;
            if (!this.selectedType)
                this.selectedType = this.types[0].value;
        },
        enumerable: true,
        configurable: true
    });
    QuotePurchaseTypeComponent.prototype.onSelectChange = function (event) {
        this.selectQuoteType.emit({ purchaseType: event.value });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], QuotePurchaseTypeComponent.prototype, "selectQuoteType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuotePurchaseTypeComponent.prototype, "selectedType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], QuotePurchaseTypeComponent.prototype, "quoteTypes", null);
    QuotePurchaseTypeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-purchase-type-component',
            template: "\n    <mat-form-field class=\"quote-purchase-types\">  \n      <mat-select \n      (change)=\"onSelectChange($event)\" \n      [(ngModel)]=\"selectedType\" \n      placeholder=\"{{ 'QUOTE.PURCHASE_TYPE_SELECT' | translate }}\">\n      <mat-option\n      *ngFor=\"let type of types\"\n      [value]=\"type.value\">{{ type.viewValue }}\n      </mat-option>\n      </mat-select>\n    </mat-form-field>  \n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: [
                "mat-form-field { width: 200px; padding: 20px 5px 0 5px;}",
                ":host { margin-bottom: -48px; min-width: 284px; }"
            ]
        })
    ], QuotePurchaseTypeComponent);
    return QuotePurchaseTypeComponent;
}());
exports.QuotePurchaseTypeComponent = QuotePurchaseTypeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtcHVyY2hhc2UtdHlwZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUEyQmhHO0lBdEJBO1FBd0JZLG9CQUFlLEdBQWlELElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3BGLGlCQUFZLEdBQVcsSUFBSSxDQUFDO0lBVXZDLENBQUM7SUFSQyxzQkFBVyxrREFBVTthQUFyQixVQUFzQixLQUF1QjtZQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsRSxDQUFDOzs7T0FBQTtJQUVNLG1EQUFjLEdBQXJCLFVBQXNCLEtBQXNCO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFWUztRQUFULGFBQU0sRUFBRTtrQ0FBa0IsbUJBQVk7dUVBQXNEO0lBQ3BGO1FBQVIsWUFBSyxFQUFFOztvRUFBNkI7SUFFckM7UUFEQyxZQUFLLEVBQUU7OztnRUFJUDtJQVJVLDBCQUEwQjtRQXRCdEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLFFBQVEsRUFBRSxzWkFZVDtZQUNELGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLE1BQU0sRUFBRTtnQkFDTiwwREFBMEQ7Z0JBQzFELG1EQUFtRDthQUNwRDtTQUNGLENBQUM7T0FDVywwQkFBMEIsQ0FhdEM7SUFBRCxpQ0FBQztDQWJELEFBYUMsSUFBQTtBQWJZLGdFQUEwQiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9jb21wb25lbnRzL3F1b3RlLXB1cmNoYXNlLXR5cGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3RDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBNZFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQdXJjaGFzZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdxdW90ZS1wdXJjaGFzZS10eXBlLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwicXVvdGUtcHVyY2hhc2UtdHlwZXNcIj4gIFxuICAgICAgPG1hdC1zZWxlY3QgXG4gICAgICAoY2hhbmdlKT1cIm9uU2VsZWN0Q2hhbmdlKCRldmVudClcIiBcbiAgICAgIFsobmdNb2RlbCldPVwic2VsZWN0ZWRUeXBlXCIgXG4gICAgICBwbGFjZWhvbGRlcj1cInt7ICdRVU9URS5QVVJDSEFTRV9UWVBFX1NFTEVDVCcgfCB0cmFuc2xhdGUgfX1cIj5cbiAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAqbmdGb3I9XCJsZXQgdHlwZSBvZiB0eXBlc1wiXG4gICAgICBbdmFsdWVdPVwidHlwZS52YWx1ZVwiPnt7IHR5cGUudmlld1ZhbHVlIH19XG4gICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgPC9tYXQtZm9ybS1maWVsZD4gIFxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzOiBbXG4gICAgYG1hdC1mb3JtLWZpZWxkIHsgd2lkdGg6IDIwMHB4OyBwYWRkaW5nOiAyMHB4IDVweCAwIDVweDt9YCxcbiAgICBgOmhvc3QgeyBtYXJnaW4tYm90dG9tOiAtNDhweDsgbWluLXdpZHRoOiAyODRweDsgfWBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBRdW90ZVB1cmNoYXNlVHlwZUNvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlczogTWRTZWxlY3RPcHRpb25bXTtcbiAgQE91dHB1dCgpIHNlbGVjdFF1b3RlVHlwZTogRXZlbnRFbWl0dGVyPHsgcHVyY2hhc2VUeXBlOiBQdXJjaGFzZVR5cGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIHNlbGVjdGVkVHlwZTogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBxdW90ZVR5cGVzKHR5cGVzOiBNZFNlbGVjdE9wdGlvbltdKSB7XG4gICAgdGhpcy50eXBlcyA9IHR5cGVzO1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFR5cGUpIHRoaXMuc2VsZWN0ZWRUeXBlID0gdGhpcy50eXBlc1swXS52YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBvblNlbGVjdENoYW5nZShldmVudDogTWF0U2VsZWN0Q2hhbmdlKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RRdW90ZVR5cGUuZW1pdCh7IHB1cmNoYXNlVHlwZTogZXZlbnQudmFsdWUgfSk7XG4gIH1cbn1cbiJdfQ==
