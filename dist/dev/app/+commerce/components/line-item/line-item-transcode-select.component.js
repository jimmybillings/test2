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
var LineItemTranscodeSelectComponent = (function () {
    function LineItemTranscodeSelectComponent() {
        this.readOnly = false;
        this.selectTarget = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LineItemTranscodeSelectComponent.prototype, "transcodeTargets", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LineItemTranscodeSelectComponent.prototype, "selectedTarget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemTranscodeSelectComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemTranscodeSelectComponent.prototype, "selectTarget", void 0);
    LineItemTranscodeSelectComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'line-item-transcode-select-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <mat-form-field *ngIf=\"!readOnly\" class=\"delivery-format\">\n      <mat-select\n        placeholder=\"{{ 'ASSET.TRANSCODE_TARGETS.FORM_PLACEHOLDER' | translate }}\"\n        [(ngModel)]=\"selectedTarget\"\n        (change)=\"selectTarget.emit($event.value)\">\n          <mat-option\n            *ngFor=\"let target of transcodeTargets\"\n            [value]=\"target\">{{ 'ASSET.TRANSCODE_TARGETS.' + target | translate }}\n          </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div *ngIf=\"readOnly\" class=\"read-only-transcode\">\n      <span class=\"cart-asset-metadata mat-caption\">\n        <strong>{{ 'ASSET.TRANSCODE_TARGETS.FORM_PLACEHOLDER' | translate }}: </strong>\n        {{ 'ASSET.TRANSCODE_TARGETS.' + selectedTarget | translate }}\n      </span>\n    </div>\n  "
        })
    ], LineItemTranscodeSelectComponent);
    return LineItemTranscodeSelectComponent;
}());
exports.LineItemTranscodeSelectComponent = LineItemTranscodeSelectComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtLXRyYW5zY29kZS1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBMEJoRztJQXhCQTtRQTJCVyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGlCQUFZLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFKVTtRQUFSLFlBQUssRUFBRTs7OEVBQTRCO0lBQzNCO1FBQVIsWUFBSyxFQUFFOzs0RUFBd0I7SUFDdkI7UUFBUixZQUFLLEVBQUU7O3NFQUEyQjtJQUN6QjtRQUFULGFBQU0sRUFBRTtrQ0FBZSxtQkFBWTswRUFBMkI7SUFKcEQsZ0NBQWdDO1FBeEI1QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQ0FBc0M7WUFDaEQsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLDB5QkFrQlQ7U0FDRixDQUFDO09BQ1csZ0NBQWdDLENBSzVDO0lBQUQsdUNBQUM7Q0FMRCxBQUtDLElBQUE7QUFMWSw0RUFBZ0MiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2xpbmUtaXRlbS9saW5lLWl0ZW0tdHJhbnNjb2RlLXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbGluZS1pdGVtLXRyYW5zY29kZS1zZWxlY3QtY29tcG9uZW50JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiIXJlYWRPbmx5XCIgY2xhc3M9XCJkZWxpdmVyeS1mb3JtYXRcIj5cbiAgICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIHBsYWNlaG9sZGVyPVwie3sgJ0FTU0VULlRSQU5TQ09ERV9UQVJHRVRTLkZPUk1fUExBQ0VIT0xERVInIHwgdHJhbnNsYXRlIH19XCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFRhcmdldFwiXG4gICAgICAgIChjaGFuZ2UpPVwic2VsZWN0VGFyZ2V0LmVtaXQoJGV2ZW50LnZhbHVlKVwiPlxuICAgICAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFyZ2V0IG9mIHRyYW5zY29kZVRhcmdldHNcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cInRhcmdldFwiPnt7ICdBU1NFVC5UUkFOU0NPREVfVEFSR0VUUy4nICsgdGFyZ2V0IHwgdHJhbnNsYXRlIH19XG4gICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPGRpdiAqbmdJZj1cInJlYWRPbmx5XCIgY2xhc3M9XCJyZWFkLW9ubHktdHJhbnNjb2RlXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImNhcnQtYXNzZXQtbWV0YWRhdGEgbWF0LWNhcHRpb25cIj5cbiAgICAgICAgPHN0cm9uZz57eyAnQVNTRVQuVFJBTlNDT0RFX1RBUkdFVFMuRk9STV9QTEFDRUhPTERFUicgfCB0cmFuc2xhdGUgfX06IDwvc3Ryb25nPlxuICAgICAgICB7eyAnQVNTRVQuVFJBTlNDT0RFX1RBUkdFVFMuJyArIHNlbGVjdGVkVGFyZ2V0IHwgdHJhbnNsYXRlIH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTGluZUl0ZW1UcmFuc2NvZGVTZWxlY3RDb21wb25lbnQge1xuICBASW5wdXQoKSB0cmFuc2NvZGVUYXJnZXRzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgc2VsZWN0ZWRUYXJnZXQ6IHN0cmluZztcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHNlbGVjdFRhcmdldDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=
