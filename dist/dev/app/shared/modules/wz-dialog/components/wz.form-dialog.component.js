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
var WzFormDialogComponent = (function () {
    function WzFormDialogComponent() {
        this.cancel = new core_1.EventEmitter();
        this.submit = new core_1.EventEmitter();
    }
    WzFormDialogComponent.prototype.onFormCancel = function () {
        this.cancel.emit();
    };
    WzFormDialogComponent.prototype.onFormSubmit = function (results) {
        this.submit.emit(results);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WzFormDialogComponent.prototype, "formItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormDialogComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WzFormDialogComponent.prototype, "displayCancelButton", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormDialogComponent.prototype, "cancelLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormDialogComponent.prototype, "submitLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormDialogComponent.prototype, "autocomplete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzFormDialogComponent.prototype, "cancel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzFormDialogComponent.prototype, "submit", void 0);
    WzFormDialogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-form-dialog',
            template: "\n    <div class=\"wz-dialog\">\n      <button mat-icon-button mat-dialog-close title=\"Close\" type=\"button\" class=\"close\">\n        <mat-icon>close</mat-icon>\n      </button>\n      <h1 *ngIf=\"title\" mat-dialog-title>{{ title | translate }}</h1>\n      <mat-dialog-content layout=\"row\">\n        <wz-form\n          [items]=\"formItems\"\n          [includeCancel]=\"displayCancelButton\"\n          [cancelLabel]=\"cancelLabel\"\n          [submitLabel]=\"submitLabel\"\n          [autocomplete]=\"autocomplete\"\n          (formCancel)=\"onFormCancel()\"\n          (formSubmit)=\"onFormSubmit($event)\">\n        </wz-form>\n      </mat-dialog-content>\n    </div>\n  "
        })
    ], WzFormDialogComponent);
    return WzFormDialogComponent;
}());
exports.WzFormDialogComponent = WzFormDialogComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5mb3JtLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBdUU7QUEyQnZFO0lBdkJBO1FBK0JZLFdBQU0sR0FBdUIsSUFBSSxtQkFBWSxFQUFRLENBQUM7UUFDdEQsV0FBTSxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztJQVNoRSxDQUFDO0lBUFEsNENBQVksR0FBbkI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSw0Q0FBWSxHQUFuQixVQUFvQixPQUFZO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFoQlE7UUFBUixZQUFLLEVBQUU7OzREQUF5QjtJQUN4QjtRQUFSLFlBQUssRUFBRTs7d0RBQWU7SUFDZDtRQUFSLFlBQUssRUFBRTs7c0VBQThCO0lBQzdCO1FBQVIsWUFBSyxFQUFFOzs4REFBcUI7SUFDcEI7UUFBUixZQUFLLEVBQUU7OzhEQUFxQjtJQUNwQjtRQUFSLFlBQUssRUFBRTs7K0RBQXNCO0lBRXBCO1FBQVQsYUFBTSxFQUFFO2tDQUFTLG1CQUFZO3lEQUFrQztJQUN0RDtRQUFULGFBQU0sRUFBRTtrQ0FBUyxtQkFBWTt5REFBZ0M7SUFUbkQscUJBQXFCO1FBdkJqQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLDRxQkFrQlQ7U0FDRixDQUFDO09BQ1cscUJBQXFCLENBa0JqQztJQUFELDRCQUFDO0NBbEJELEFBa0JDLElBQUE7QUFsQlksc0RBQXFCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5mb3JtLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otZm9ybS1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ3ei1kaWFsb2dcIj5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdC1kaWFsb2ctY2xvc2UgdGl0bGU9XCJDbG9zZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCI+XG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxoMSAqbmdJZj1cInRpdGxlXCIgbWF0LWRpYWxvZy10aXRsZT57eyB0aXRsZSB8IHRyYW5zbGF0ZSB9fTwvaDE+XG4gICAgICA8bWF0LWRpYWxvZy1jb250ZW50IGxheW91dD1cInJvd1wiPlxuICAgICAgICA8d3otZm9ybVxuICAgICAgICAgIFtpdGVtc109XCJmb3JtSXRlbXNcIlxuICAgICAgICAgIFtpbmNsdWRlQ2FuY2VsXT1cImRpc3BsYXlDYW5jZWxCdXR0b25cIlxuICAgICAgICAgIFtjYW5jZWxMYWJlbF09XCJjYW5jZWxMYWJlbFwiXG4gICAgICAgICAgW3N1Ym1pdExhYmVsXT1cInN1Ym1pdExhYmVsXCJcbiAgICAgICAgICBbYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgKGZvcm1DYW5jZWwpPVwib25Gb3JtQ2FuY2VsKClcIlxuICAgICAgICAgIChmb3JtU3VibWl0KT1cIm9uRm9ybVN1Ym1pdCgkZXZlbnQpXCI+XG4gICAgICAgIDwvd3otZm9ybT5cbiAgICAgIDwvbWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFd6Rm9ybURpYWxvZ0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGZvcm1JdGVtczogRm9ybUZpZWxkc1tdO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBkaXNwbGF5Q2FuY2VsQnV0dG9uOiBib29sZWFuO1xuICBASW5wdXQoKSBjYW5jZWxMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBzdWJtaXRMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBhdXRvY29tcGxldGU6IHN0cmluZztcblxuICBAT3V0cHV0KCkgY2FuY2VsOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gIEBPdXRwdXQoKSBzdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIG9uRm9ybUNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbmNlbC5lbWl0KCk7XG4gIH1cblxuICBwdWJsaWMgb25Gb3JtU3VibWl0KHJlc3VsdHM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc3VibWl0LmVtaXQocmVzdWx0cyk7XG4gIH1cbn1cbiJdfQ==
