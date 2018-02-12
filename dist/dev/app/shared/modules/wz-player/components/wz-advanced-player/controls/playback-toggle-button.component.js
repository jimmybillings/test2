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
var PlaybackToggleButtonComponent = (function () {
    function PlaybackToggleButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    PlaybackToggleButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'TOGGLE_PLAYBACK' });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PlaybackToggleButtonComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PlaybackToggleButtonComponent.prototype, "request", void 0);
    PlaybackToggleButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-playback-toggle-button',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button mat-icon-button \n      title=\"{{ (playerState.playing ? \n        'ASSET.ADV_PLAYER.PAUSE_BTN_TITLE' : 'ASSET.ADV_PLAYER.PLAY_BTN_TITLE') | translate }}\" \n      (click)=\"onClick()\">\n      <mat-icon>{{ playerState.playing ? 'pause' : 'play_arrow' }}</mat-icon>\n    </button>\n  "
        })
    ], PlaybackToggleButtonComponent);
    return PlaybackToggleButtonComponent;
}());
exports.PlaybackToggleButtonComponent = PlaybackToggleButtonComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvcGxheWJhY2stdG9nZ2xlLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFrQmhHO0lBZEE7UUFnQlksWUFBTyxHQUF3QyxJQUFJLG1CQUFZLEVBQXlCLENBQUM7SUFLckcsQ0FBQztJQUhRLCtDQUFPLEdBQWQ7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUxRO1FBQVIsWUFBSyxFQUFFOztzRUFBMEI7SUFDeEI7UUFBVCxhQUFNLEVBQUU7a0NBQVUsbUJBQVk7a0VBQW9FO0lBRnhGLDZCQUE2QjtRQWR6QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLDZTQU9UO1NBQ0YsQ0FBQztPQUVXLDZCQUE2QixDQU96QztJQUFELG9DQUFDO0NBUEQsQUFPQyxJQUFBO0FBUFksc0VBQTZCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvcGxheWJhY2stdG9nZ2xlLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGxheWVyU3RhdGUsIFBsYXllclJlcXVlc3QsIFRvZ2dsZVBsYXliYWNrUmVxdWVzdCB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcGxheWVyLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LXBsYXliYWNrLXRvZ2dsZS1idXR0b24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBcbiAgICAgIHRpdGxlPVwie3sgKHBsYXllclN0YXRlLnBsYXlpbmcgPyBcbiAgICAgICAgJ0FTU0VULkFEVl9QTEFZRVIuUEFVU0VfQlROX1RJVExFJyA6ICdBU1NFVC5BRFZfUExBWUVSLlBMQVlfQlROX1RJVExFJykgfCB0cmFuc2xhdGUgfX1cIiBcbiAgICAgIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxtYXQtaWNvbj57eyBwbGF5ZXJTdGF0ZS5wbGF5aW5nID8gJ3BhdXNlJyA6ICdwbGF5X2Fycm93JyB9fTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBQbGF5YmFja1RvZ2dsZUJ1dHRvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHBsYXllclN0YXRlOiBQbGF5ZXJTdGF0ZTtcbiAgQE91dHB1dCgpIHJlcXVlc3Q6IEV2ZW50RW1pdHRlcjxUb2dnbGVQbGF5YmFja1JlcXVlc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxUb2dnbGVQbGF5YmFja1JlcXVlc3Q+KCk7XG5cbiAgcHVibGljIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0LmVtaXQoeyB0eXBlOiAnVE9HR0xFX1BMQVlCQUNLJyB9KTtcbiAgfVxufVxuIl19
