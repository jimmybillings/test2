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
var FeeLineItemsComponent = (function () {
    function FeeLineItemsComponent() {
        this.readOnly = false;
        this.feeLineItemsNotify = new core_1.EventEmitter();
    }
    FeeLineItemsComponent.prototype.onRemove = function (feeLineItem) {
        this.feeLineItemsNotify.emit({ type: 'REMOVE_QUOTE_FEE', payload: feeLineItem });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FeeLineItemsComponent.prototype, "feeLineItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FeeLineItemsComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FeeLineItemsComponent.prototype, "feeLineItemsNotify", void 0);
    FeeLineItemsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'fee-line-items-component',
            templateUrl: './fee-line-items.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], FeeLineItemsComponent);
    return FeeLineItemsComponent;
}());
exports.FeeLineItemsComponent = FeeLineItemsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vZmVlLWxpbmUtaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBVWhHO0lBTkE7UUFRVyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQ3pCLHVCQUFrQixHQUF5QixJQUFJLG1CQUFZLEVBQVUsQ0FBQztJQUtsRixDQUFDO0lBSFEsd0NBQVEsR0FBZixVQUFnQixXQUF3QjtRQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFOUTtRQUFSLFlBQUssRUFBRTs7K0RBQTZCO0lBQzVCO1FBQVIsWUFBSyxFQUFFOzsyREFBMkI7SUFDekI7UUFBVCxhQUFNLEVBQUU7a0NBQXFCLG1CQUFZO3FFQUFzQztJQUhyRSxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLHFCQUFxQixDQVFqQztJQUFELDRCQUFDO0NBUkQsQUFRQyxJQUFBO0FBUlksc0RBQXFCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vZmVlLWxpbmUtaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZlZUxpbmVJdGVtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnZmVlLWxpbmUtaXRlbXMtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlZS1saW5lLWl0ZW1zLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGZWVMaW5lSXRlbXNDb21wb25lbnQge1xuICBASW5wdXQoKSBmZWVMaW5lSXRlbXM6IEZlZUxpbmVJdGVtW107XG4gIEBJbnB1dCgpIHJlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBmZWVMaW5lSXRlbXNOb3RpZnk6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XG5cbiAgcHVibGljIG9uUmVtb3ZlKGZlZUxpbmVJdGVtOiBGZWVMaW5lSXRlbSk6IHZvaWQge1xuICAgIHRoaXMuZmVlTGluZUl0ZW1zTm90aWZ5LmVtaXQoeyB0eXBlOiAnUkVNT1ZFX1FVT1RFX0ZFRScsIHBheWxvYWQ6IGZlZUxpbmVJdGVtIH0pO1xuICB9XG59XG4iXX0=
