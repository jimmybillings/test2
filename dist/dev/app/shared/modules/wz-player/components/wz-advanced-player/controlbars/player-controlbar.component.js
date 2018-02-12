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
var PlayerControlbarComponent = (function () {
    function PlayerControlbarComponent() {
        this.request = new core_1.EventEmitter();
    }
    PlayerControlbarComponent.prototype.forward = function (request) {
        this.request.emit(request);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PlayerControlbarComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PlayerControlbarComponent.prototype, "request", void 0);
    PlayerControlbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-player-controlbar',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './player-controlbar.html'
        })
    ], PlayerControlbarComponent);
    return PlayerControlbarComponent;
}());
exports.PlayerControlbarComponent = PlayerControlbarComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbGJhcnMvcGxheWVyLWNvbnRyb2xiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBV2hHO0lBUEE7UUFTWSxZQUFPLEdBQWdDLElBQUksbUJBQVksRUFBaUIsQ0FBQztJQUtyRixDQUFDO0lBSFEsMkNBQU8sR0FBZCxVQUFlLE9BQXNCO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFMUTtRQUFSLFlBQUssRUFBRTs7a0VBQTBCO0lBQ3hCO1FBQVQsYUFBTSxFQUFFO2tDQUFVLG1CQUFZOzhEQUFvRDtJQUZ4RSx5QkFBeUI7UUFQckMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFdBQVcsRUFBRSwwQkFBMEI7U0FDeEMsQ0FBQztPQUVXLHlCQUF5QixDQU9yQztJQUFELGdDQUFDO0NBUEQsQUFPQyxJQUFBO0FBUFksOERBQXlCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbGJhcnMvcGxheWVyLWNvbnRyb2xiYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBsYXllclN0YXRlLCBQbGF5ZXJSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otcGxheWVyLWNvbnRyb2xiYXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3BsYXllci1jb250cm9sYmFyLmh0bWwnXG59KVxuXG5leHBvcnQgY2xhc3MgUGxheWVyQ29udHJvbGJhckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHBsYXllclN0YXRlOiBQbGF5ZXJTdGF0ZTtcbiAgQE91dHB1dCgpIHJlcXVlc3Q6IEV2ZW50RW1pdHRlcjxQbGF5ZXJSZXF1ZXN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGxheWVyUmVxdWVzdD4oKTtcblxuICBwdWJsaWMgZm9yd2FyZChyZXF1ZXN0OiBQbGF5ZXJSZXF1ZXN0KTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0LmVtaXQocmVxdWVzdCk7XG4gIH1cbn1cbiJdfQ==
