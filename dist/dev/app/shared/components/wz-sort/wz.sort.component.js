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
var WzSortComponent = (function () {
    function WzSortComponent() {
        this.sort = new core_1.EventEmitter();
    }
    WzSortComponent.prototype.applySort = function (sortDefinition) {
        this.sort.emit(sortDefinition);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WzSortComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzSortComponent.prototype, "current", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzSortComponent.prototype, "sort", void 0);
    WzSortComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-sort-component',
            templateUrl: 'wz.sort.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], WzSortComponent);
    return WzSortComponent;
}());
exports.WzSortComponent = WzSortComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zb3J0L3d6LnNvcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBU2hHO0lBUEE7UUFVWSxTQUFJLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFLdEMsQ0FBQztJQUhRLG1DQUFTLEdBQWhCLFVBQWlCLGNBQW1CO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFOUTtRQUFSLFlBQUssRUFBRTtrQ0FBUSxLQUFLO2tEQUFNO0lBQ2xCO1FBQVIsWUFBSyxFQUFFOztvREFBYztJQUNaO1FBQVQsYUFBTSxFQUFFOztpREFBMkI7SUFIekIsZUFBZTtRQVAzQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGNBQWM7WUFDM0IsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUVXLGVBQWUsQ0FRM0I7SUFBRCxzQkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLDBDQUFlIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zb3J0L3d6LnNvcnQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LXNvcnQtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5zb3J0Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFd6U29ydENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBBcnJheTxhbnk+O1xuICBASW5wdXQoKSBjdXJyZW50OiBhbnk7XG4gIEBPdXRwdXQoKSBzb3J0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBhcHBseVNvcnQoc29ydERlZmluaXRpb246IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc29ydC5lbWl0KHNvcnREZWZpbml0aW9uKTtcbiAgfVxufVxuIl19
