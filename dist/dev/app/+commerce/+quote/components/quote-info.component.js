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
var QuoteInfoComponent = (function () {
    function QuoteInfoComponent() {
    }
    Object.defineProperty(QuoteInfoComponent.prototype, "isExpired", {
        get: function () {
            return new Date() > new Date(this.salesManager.expirationDate);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuoteInfoComponent.prototype, "billingAccount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuoteInfoComponent.prototype, "invoiceContact", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuoteInfoComponent.prototype, "salesManager", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuoteInfoComponent.prototype, "user", void 0);
    QuoteInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-info-component',
            templateUrl: 'quote-info.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], QuoteInfoComponent);
    return QuoteInfoComponent;
}());
exports.QuoteInfoComponent = QuoteInfoComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtaW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEU7QUFhMUU7SUFBQTtJQVNBLENBQUM7SUFIQyxzQkFBVyx5Q0FBUzthQUFwQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7SUFQUTtRQUFSLFlBQUssRUFBRTs7OERBQTJDO0lBQzFDO1FBQVIsWUFBSyxFQUFFOzs4REFBMkM7SUFDMUM7UUFBUixZQUFLLEVBQUU7OzREQUF1QztJQUN0QztRQUFSLFlBQUssRUFBRTs7b0RBQXVCO0lBSnBCLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BQ1csa0JBQWtCLENBUzlCO0lBQUQseUJBQUM7Q0FURCxBQVNDLElBQUE7QUFUWSxnREFBa0IiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvY29tcG9uZW50cy9xdW90ZS1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHtcbiAgU2VuZERldGFpbHMsIFNlbmREZXRhaWxzQmlsbGluZ0FjY291bnQsIFNlbmREZXRhaWxzSW52b2ljZUNvbnRhY3QsIFNlbmREZXRhaWxzU2FsZXNNYW5hZ2VyLCBTZW5kRGV0YWlsc1VzZXJcbn0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncXVvdGUtaW5mby1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJ3F1b3RlLWluZm8uaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFF1b3RlSW5mb0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGJpbGxpbmdBY2NvdW50OiBTZW5kRGV0YWlsc0JpbGxpbmdBY2NvdW50O1xuICBASW5wdXQoKSBpbnZvaWNlQ29udGFjdDogU2VuZERldGFpbHNJbnZvaWNlQ29udGFjdDtcbiAgQElucHV0KCkgc2FsZXNNYW5hZ2VyOiBTZW5kRGV0YWlsc1NhbGVzTWFuYWdlcjtcbiAgQElucHV0KCkgdXNlcjogU2VuZERldGFpbHNVc2VyO1xuXG4gIHB1YmxpYyBnZXQgaXNFeHBpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpID4gbmV3IERhdGUodGhpcy5zYWxlc01hbmFnZXIuZXhwaXJhdGlvbkRhdGUpO1xuICB9XG59XG4iXX0=
