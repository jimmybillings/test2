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
var MarkerTimeDisplayComponent = (function () {
    function MarkerTimeDisplayComponent() {
    }
    Object.defineProperty(MarkerTimeDisplayComponent.prototype, "frame", {
        get: function () {
            return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MarkerTimeDisplayComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MarkerTimeDisplayComponent.prototype, "playerState", void 0);
    MarkerTimeDisplayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-marker-time-display',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <span class=\"timecode\">{{ frame | playerTimecode:playerState }}</span>\n  "
        })
    ], MarkerTimeDisplayComponent);
    return MarkerTimeDisplayComponent;
}());
exports.MarkerTimeDisplayComponent = MarkerTimeDisplayComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXRpbWUtZGlzcGxheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEU7QUFjMUU7SUFBQTtJQU9BLENBQUM7SUFIQyxzQkFBVyw2Q0FBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQy9GLENBQUM7OztPQUFBO0lBTFE7UUFBUixZQUFLLEVBQUU7OzREQUFrQjtJQUNqQjtRQUFSLFlBQUssRUFBRTs7bUVBQTBCO0lBRnZCLDBCQUEwQjtRQVR0QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07WUFDL0MsUUFBUSxFQUFFLG9GQUVUO1NBQ0YsQ0FBQztPQUVXLDBCQUEwQixDQU90QztJQUFELGlDQUFDO0NBUEQsQUFPQyxJQUFBO0FBUFksZ0VBQTBCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2VyLXRpbWUtZGlzcGxheS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uLy4uLy4uL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBNYXJrZXJUeXBlLCBQbGF5ZXJTdGF0ZSB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcGxheWVyLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LW1hcmtlci10aW1lLWRpc3BsYXknLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cInRpbWVjb2RlXCI+e3sgZnJhbWUgfCBwbGF5ZXJUaW1lY29kZTpwbGF5ZXJTdGF0ZSB9fTwvc3Bhbj5cbiAgYFxufSlcblxuZXhwb3J0IGNsYXNzIE1hcmtlclRpbWVEaXNwbGF5Q29tcG9uZW50IHtcbiAgQElucHV0KCkgdHlwZTogTWFya2VyVHlwZTtcbiAgQElucHV0KCkgcGxheWVyU3RhdGU6IFBsYXllclN0YXRlO1xuXG4gIHB1YmxpYyBnZXQgZnJhbWUoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09ICdpbicgPyB0aGlzLnBsYXllclN0YXRlLmluTWFya2VyRnJhbWUgOiB0aGlzLnBsYXllclN0YXRlLm91dE1hcmtlckZyYW1lO1xuICB9XG59XG4iXX0=
