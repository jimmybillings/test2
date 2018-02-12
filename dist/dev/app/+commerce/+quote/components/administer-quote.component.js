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
var AdministerQuoteComponent = (function () {
    function AdministerQuoteComponent() {
        this.notify = new core_1.EventEmitter();
    }
    AdministerQuoteComponent.prototype.onSaveAndNew = function () {
        this.notify.emit({ type: 'SAVE_AND_NEW' });
    };
    AdministerQuoteComponent.prototype.onOpenDeleteDialog = function () {
        this.notify.emit({ type: 'OPEN_DELETE_DIALOG' });
    };
    AdministerQuoteComponent.prototype.onClickCloneQuoteButton = function () {
        this.notify.emit({ type: 'CLONE_QUOTE' });
    };
    AdministerQuoteComponent.prototype.goToNextTab = function () {
        this.notify.emit({ type: 'GO_TO_NEXT_TAB' });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AdministerQuoteComponent.prototype, "userCanProceed", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AdministerQuoteComponent.prototype, "shouldShowCloneButton", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AdministerQuoteComponent.prototype, "notify", void 0);
    AdministerQuoteComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'administer-quote-component',
            template: "\n    <div flex=\"100\" layout-gt-xs=\"row\" layout=\"column\" layout-align=\"space-between end\" layout-align-xs=\"end end\">\n      <div class=\"reject-quote\" flex-gt-xs=\"auto\" flex=\"100\" flex-order-xs=\"2\">\t\n        <button mat-button color=\"primary\" (click)=\"onOpenDeleteDialog()\">\n          <mat-icon>delete</mat-icon>{{ 'QUOTE.DELETE_BTN' | translate }}\n        </button>\n      </div>\n      <section flex-gt-xs=\"65\" flex=\"100\" class=\"action-items\" flex-order-xs=\"-1\">\n        <button\n        mat-button\n        color=\"primary\"\n        [disabled]=\"!shouldShowCloneButton\"\n        (click)=\"onClickCloneQuoteButton()\">\n        {{ 'QUOTE.CLONE_QUOTE' | translate }}\n        </button>\n        <button\n        mat-button\n        color=\"primary\"\n        (click)=\"onSaveAndNew()\">\n        {{ 'QUOTE.SAVE_AND_NEW' | translate }}\n        </button>\n        <button\n          [disabled]=\"!userCanProceed\"\n          mat-raised-button\n          color=\"primary\"\n          (click)=\"goToNextTab()\">\n          {{ 'QUOTE.EDIT.TO_RECIPIENT_TAB_BTN' | translate }}\n        </button>\n      </section>\n    </div>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], AdministerQuoteComponent);
    return AdministerQuoteComponent;
}());
exports.AdministerQuoteComponent = AdministerQuoteComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvYWRtaW5pc3Rlci1xdW90ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBZ0c7QUFzQ2hHO0lBbkNBO1FBc0NtQixXQUFNLEdBQXVCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBaUJuRSxDQUFDO0lBZlEsK0NBQVksR0FBbkI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxxREFBa0IsR0FBekI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLDBEQUF1QixHQUE5QjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLDhDQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFsQlE7UUFBUixZQUFLLEVBQUU7O29FQUFnQztJQUMvQjtRQUFSLFlBQUssRUFBRTs7MkVBQXVDO0lBQ3JDO1FBQVQsYUFBTSxFQUFFO2tDQUFnQixtQkFBWTs0REFBNEI7SUFIdEQsd0JBQXdCO1FBbkNwQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsUUFBUSxFQUFFLHVvQ0E2QkQ7WUFDVCxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csd0JBQXdCLENBb0JwQztJQUFELCtCQUFDO0NBcEJELEFBb0JDLElBQUE7QUFwQlksNERBQXdCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvYWRtaW5pc3Rlci1xdW90ZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FkbWluaXN0ZXItcXVvdGUtY29tcG9uZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGZsZXg9XCIxMDBcIiBsYXlvdXQtZ3QteHM9XCJyb3dcIiBsYXlvdXQ9XCJjb2x1bW5cIiBsYXlvdXQtYWxpZ249XCJzcGFjZS1iZXR3ZWVuIGVuZFwiIGxheW91dC1hbGlnbi14cz1cImVuZCBlbmRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZWplY3QtcXVvdGVcIiBmbGV4LWd0LXhzPVwiYXV0b1wiIGZsZXg9XCIxMDBcIiBmbGV4LW9yZGVyLXhzPVwiMlwiPlx0XG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib25PcGVuRGVsZXRlRGlhbG9nKClcIj5cbiAgICAgICAgICA8bWF0LWljb24+ZGVsZXRlPC9tYXQtaWNvbj57eyAnUVVPVEUuREVMRVRFX0JUTicgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzZWN0aW9uIGZsZXgtZ3QteHM9XCI2NVwiIGZsZXg9XCIxMDBcIiBjbGFzcz1cImFjdGlvbi1pdGVtc1wiIGZsZXgtb3JkZXIteHM9XCItMVwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgIG1hdC1idXR0b25cbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiFzaG91bGRTaG93Q2xvbmVCdXR0b25cIlxuICAgICAgICAoY2xpY2spPVwib25DbGlja0Nsb25lUXVvdGVCdXR0b24oKVwiPlxuICAgICAgICB7eyAnUVVPVEUuQ0xPTkVfUVVPVEUnIHwgdHJhbnNsYXRlIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgIG1hdC1idXR0b25cbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgKGNsaWNrKT1cIm9uU2F2ZUFuZE5ldygpXCI+XG4gICAgICAgIHt7ICdRVU9URS5TQVZFX0FORF9ORVcnIHwgdHJhbnNsYXRlIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2Rpc2FibGVkXT1cIiF1c2VyQ2FuUHJvY2VlZFwiXG4gICAgICAgICAgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIChjbGljayk9XCJnb1RvTmV4dFRhYigpXCI+XG4gICAgICAgICAge3sgJ1FVT1RFLkVESVQuVE9fUkVDSVBJRU5UX1RBQl9CVE4nIHwgdHJhbnNsYXRlIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvZGl2PmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBZG1pbmlzdGVyUXVvdGVDb21wb25lbnQge1xuICBASW5wdXQoKSBwdWJsaWMgdXNlckNhblByb2NlZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyBzaG91bGRTaG93Q2xvbmVCdXR0b246IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBwdWJsaWMgbm90aWZ5OiBFdmVudEVtaXR0ZXI8UG9qbz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIG9uU2F2ZUFuZE5ldygpIHtcbiAgICB0aGlzLm5vdGlmeS5lbWl0KHsgdHlwZTogJ1NBVkVfQU5EX05FVycgfSk7XG4gIH1cblxuICBwdWJsaWMgb25PcGVuRGVsZXRlRGlhbG9nKCkge1xuICAgIHRoaXMubm90aWZ5LmVtaXQoeyB0eXBlOiAnT1BFTl9ERUxFVEVfRElBTE9HJyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrQ2xvbmVRdW90ZUJ1dHRvbigpIHtcbiAgICB0aGlzLm5vdGlmeS5lbWl0KHsgdHlwZTogJ0NMT05FX1FVT1RFJyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvTmV4dFRhYigpIHtcbiAgICB0aGlzLm5vdGlmeS5lbWl0KHsgdHlwZTogJ0dPX1RPX05FWFRfVEFCJyB9KTtcbiAgfVxufVxuIl19
