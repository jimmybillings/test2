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
var CommerceListComponent = (function () {
    function CommerceListComponent() {
        this.setAsFocusedQuote = new core_1.EventEmitter();
        this.editQuote = new core_1.EventEmitter();
        this.rejectQuote = new core_1.EventEmitter();
    }
    CommerceListComponent.prototype.shouldShowSetFocusedButton = function (item) {
        return this.type === 'QUOTE' && item.quoteStatus === 'PENDING' && this.userCanAdministerQuotes;
    };
    CommerceListComponent.prototype.shouldShowEditQuoteButton = function (item) {
        return this.type === 'QUOTE' && item.quoteStatus === 'PENDING' && this.userCanAdministerQuotes;
    };
    CommerceListComponent.prototype.shouldShowViewQuoteButton = function (item) {
        return this.type === 'QUOTE' && item.quoteStatus !== 'PENDING';
    };
    CommerceListComponent.prototype.shouldShowRejectQuoteButton = function (item) {
        return this.type === 'QUOTE' && item.quoteStatus === 'ACTIVE' && !this.userCanAdministerQuotes;
    };
    CommerceListComponent.prototype.shouldShowRefundIndicatorFor = function (item) {
        return this.type === 'ORDER' && !!item.creditMemoForOrderId;
    };
    CommerceListComponent.prototype.shouldShowPaymentBalanceFor = function (item) {
        return this.type === 'ORDER' && !!item.paymentBalance && !!item.paymentDueDate && item.paymentBalance > 0;
    };
    Object.defineProperty(CommerceListComponent.prototype, "shouldShowViewOrderButton", {
        get: function () {
            return this.type === 'ORDER';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommerceListComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommerceListComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CommerceListComponent.prototype, "userCanAdministerQuotes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommerceListComponent.prototype, "setAsFocusedQuote", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommerceListComponent.prototype, "editQuote", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommerceListComponent.prototype, "rejectQuote", void 0);
    CommerceListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'commerce-list',
            templateUrl: 'commerce-list.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CommerceListComponent);
    return CommerceListComponent;
}());
exports.CommerceListComponent = CommerceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9jb21tZXJjZS1saXN0L2NvbW1lcmNlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBVWhHO0lBUEE7UUFXWSxzQkFBaUIsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDMUQsY0FBUyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNsRCxnQkFBVyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQTZCaEUsQ0FBQztJQTNCUSwwREFBMEIsR0FBakMsVUFBa0MsSUFBVztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ2pHLENBQUM7SUFFTSx5REFBeUIsR0FBaEMsVUFBaUMsSUFBVztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ2pHLENBQUM7SUFFTSx5REFBeUIsR0FBaEMsVUFBaUMsSUFBVztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUM7SUFDakUsQ0FBQztJQUVNLDJEQUEyQixHQUFsQyxVQUFtQyxJQUFXO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUNqRyxDQUFDO0lBRU0sNERBQTRCLEdBQW5DLFVBQW9DLElBQVc7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDOUQsQ0FBQztJQUVNLDJEQUEyQixHQUFsQyxVQUFtQyxJQUFXO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsc0JBQVcsNERBQXlCO2FBQXBDO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBakNRO1FBQVIsWUFBSyxFQUFFO2tDQUFRLEtBQUs7d0RBQXVCO0lBQ25DO1FBQVIsWUFBSyxFQUFFOzt1REFBeUI7SUFDeEI7UUFBUixZQUFLLEVBQUU7OzBFQUFrQztJQUNoQztRQUFULGFBQU0sRUFBRTtrQ0FBb0IsbUJBQVk7b0VBQTJCO0lBQzFEO1FBQVQsYUFBTSxFQUFFO2tDQUFZLG1CQUFZOzREQUEyQjtJQUNsRDtRQUFULGFBQU0sRUFBRTtrQ0FBYyxtQkFBWTs4REFBMkI7SUFObkQscUJBQXFCO1FBUGpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BRVcscUJBQXFCLENBbUNqQztJQUFELDRCQUFDO0NBbkNELEFBbUNDLElBQUE7QUFuQ1ksc0RBQXFCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9jb21tZXJjZS1saXN0L2NvbW1lcmNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBRdW90ZSwgT3JkZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjb21tZXJjZS1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICdjb21tZXJjZS1saXN0Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIENvbW1lcmNlTGlzdENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBBcnJheTxPcmRlcj4gfCBBcnJheTxRdW90ZT47XG4gIEBJbnB1dCgpIHR5cGU6ICdPUkRFUicgfCAnUVVPVEUnO1xuICBASW5wdXQoKSB1c2VyQ2FuQWRtaW5pc3RlclF1b3RlczogYm9vbGVhbjtcbiAgQE91dHB1dCgpIHNldEFzRm9jdXNlZFF1b3RlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGVkaXRRdW90ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWplY3RRdW90ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIHNob3VsZFNob3dTZXRGb2N1c2VkQnV0dG9uKGl0ZW06IFF1b3RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ1FVT1RFJyAmJiBpdGVtLnF1b3RlU3RhdHVzID09PSAnUEVORElORycgJiYgdGhpcy51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcztcbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRTaG93RWRpdFF1b3RlQnV0dG9uKGl0ZW06IFF1b3RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ1FVT1RFJyAmJiBpdGVtLnF1b3RlU3RhdHVzID09PSAnUEVORElORycgJiYgdGhpcy51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcztcbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRTaG93Vmlld1F1b3RlQnV0dG9uKGl0ZW06IFF1b3RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ1FVT1RFJyAmJiBpdGVtLnF1b3RlU3RhdHVzICE9PSAnUEVORElORyc7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd1JlamVjdFF1b3RlQnV0dG9uKGl0ZW06IFF1b3RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ1FVT1RFJyAmJiBpdGVtLnF1b3RlU3RhdHVzID09PSAnQUNUSVZFJyAmJiAhdGhpcy51c2VyQ2FuQWRtaW5pc3RlclF1b3RlcztcbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRTaG93UmVmdW5kSW5kaWNhdG9yRm9yKGl0ZW06IE9yZGVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ09SREVSJyAmJiAhIWl0ZW0uY3JlZGl0TWVtb0Zvck9yZGVySWQ7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd1BheW1lbnRCYWxhbmNlRm9yKGl0ZW06IE9yZGVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ09SREVSJyAmJiAhIWl0ZW0ucGF5bWVudEJhbGFuY2UgJiYgISFpdGVtLnBheW1lbnREdWVEYXRlICYmIGl0ZW0ucGF5bWVudEJhbGFuY2UgPiAwO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG91bGRTaG93Vmlld09yZGVyQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09ICdPUkRFUic7XG4gIH1cbn1cbiJdfQ==
