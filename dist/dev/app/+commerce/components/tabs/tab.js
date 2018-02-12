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
var Tab = (function () {
    function Tab() {
        this.notify = new core_1.EventEmitter();
    }
    Tab.prototype.goToPreviousTab = function () {
        this.notify.emit({ type: 'GO_TO_PREVIOUS_TAB' });
    };
    Tab.prototype.goToNextTab = function () {
        this.notify.emit({ type: 'GO_TO_NEXT_TAB' });
    };
    Tab.prototype.goToTab = function (tabIndex) {
        this.notify.emit({ type: 'GO_TO_TAB', payload: tabIndex });
    };
    Tab.prototype.disableTab = function (tabIndex) {
        this.notify.emit({ type: 'DISABLE_TAB', payload: tabIndex });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Tab.prototype, "notify", void 0);
    return Tab;
}());
exports.Tab = Tab;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL3RhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFxRDtBQUVyRDtJQUFBO1FBQ1ksV0FBTSxHQUF5QixJQUFJLG1CQUFZLEVBQVUsQ0FBQztJQWlCdEUsQ0FBQztJQWZRLDZCQUFlLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSx5QkFBVyxHQUFsQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0scUJBQU8sR0FBZCxVQUFlLFFBQWdCO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sd0JBQVUsR0FBakIsVUFBa0IsUUFBZ0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFoQlM7UUFBVCxhQUFNLEVBQUU7a0NBQVMsbUJBQVk7dUNBQXNDO0lBaUJ0RSxVQUFDO0NBbEJELEFBa0JDLElBQUE7QUFsQlksa0JBQUciLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL3RhYnMvdGFiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIFRhYiB7XG4gIEBPdXRwdXQoKSBub3RpZnk6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxPYmplY3Q+KCk7XG5cbiAgcHVibGljIGdvVG9QcmV2aW91c1RhYigpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmeS5lbWl0KHsgdHlwZTogJ0dPX1RPX1BSRVZJT1VTX1RBQicgfSk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub05leHRUYWIoKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZnkuZW1pdCh7IHR5cGU6ICdHT19UT19ORVhUX1RBQicgfSk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub1RhYih0YWJJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZnkuZW1pdCh7IHR5cGU6ICdHT19UT19UQUInLCBwYXlsb2FkOiB0YWJJbmRleCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNhYmxlVGFiKHRhYkluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmeS5lbWl0KHsgdHlwZTogJ0RJU0FCTEVfVEFCJywgcGF5bG9hZDogdGFiSW5kZXggfSk7XG4gIH1cbn1cbiJdfQ==
