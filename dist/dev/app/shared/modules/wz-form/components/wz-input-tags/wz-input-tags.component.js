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
var forms_1 = require("@angular/forms");
var WzInputTagsComponent = (function () {
    function WzInputTagsComponent(ref) {
        this.ref = ref;
        this.tags = [];
        this.finalDelete = false;
    }
    WzInputTagsComponent.prototype.submit = function (e) {
        switch (e.code) {
            case 'Enter':
                var tag = e.target.value;
                if (!this.find(tag) && tag !== '' && this.tags.length <= 10) {
                    this.create(tag);
                }
                e.target.value = '';
                e.preventDefault();
                this.ref.markForCheck();
                return;
            case 'Backspace':
                if (e.target.value === '') {
                    if (this.finalDelete) {
                        this.delete(false, this.tags[this.tags.length - 1]);
                    }
                    else {
                        this.finalDelete = true;
                    }
                }
                this.ref.markForCheck();
                return;
            default:
                this.finalDelete = false;
                this.ref.markForCheck();
                return;
        }
    };
    WzInputTagsComponent.prototype.checkBeforeDelete = function (tag) {
        return (this.finalDelete && this.tags[this.tags.length - 1] === tag);
    };
    WzInputTagsComponent.prototype.delete = function ($event, tagForDelete) {
        if ($event === void 0) { $event = false; }
        this.tags = this.tags.filter(function (tag) { return tag !== tagForDelete; });
        this.fControl.setValue(this.tags.toString());
        this.finalDelete = false;
    };
    WzInputTagsComponent.prototype.create = function (tag) {
        this.tags = this.tags.concat(tag);
        this.fControl.setValue(this.tags.toString());
    };
    WzInputTagsComponent.prototype.find = function (tagCandidate) {
        return this.tags.filter(function (tag) { return tag === tagCandidate; }).length > 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], WzInputTagsComponent.prototype, "fControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WzInputTagsComponent.prototype, "tags", void 0);
    WzInputTagsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-input-tags',
            template: "<div class=\"mat-input-wrapper wz-tags\">\n                <ul *ngIf=\"tags.length > 0\">\n                  <li [ngClass]=\"{'ready-delete': checkBeforeDelete(tag)}\" *ngFor=\"let tag of tags;\">\n                    {{tag}}\n                    <a class=\"button delete\" mat-icon-button (click)=\"delete($event, tag)\">\n                      <mat-icon>cancel</mat-icon>\n                    </a>\n                  </li>\n                </ul>\n                <ng-content></ng-content>\n             </div>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], WzInputTagsComponent);
    return WzInputTagsComponent;
}());
exports.WzInputTagsComponent = WzInputTagsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otaW5wdXQtdGFncy93ei1pbnB1dC10YWdzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RjtBQUM3Rix3Q0FBNkM7QUFtQjdDO0lBSUUsOEJBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBRmpDLFNBQUksR0FBa0IsRUFBRSxDQUFDO1FBQzFCLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBQ1MsQ0FBQztJQUV4QyxxQ0FBTSxHQUFiLFVBQWMsQ0FBTTtRQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVmLEtBQUssT0FBTztnQkFDVixJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztnQkFDRCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxDQUFDO1lBRVQsS0FBSyxXQUFXO2dCQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQzFCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4QixNQUFNLENBQUM7WUFFVDtnQkFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztJQUNILENBQUM7SUFFTSxnREFBaUIsR0FBeEIsVUFBeUIsR0FBVztRQUNsQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLHFDQUFNLEdBQWIsVUFBYyxNQUFjLEVBQUUsWUFBb0I7UUFBcEMsdUJBQUEsRUFBQSxjQUFjO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLEtBQUssWUFBWSxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFTyxxQ0FBTSxHQUFkLFVBQWUsR0FBVztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU8sbUNBQUksR0FBWixVQUFhLFlBQW9CO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsS0FBSyxZQUFZLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFyRFE7UUFBUixZQUFLLEVBQUU7a0NBQVcsbUJBQVc7MERBQUM7SUFDdEI7UUFBUixZQUFLLEVBQUU7a0NBQU8sS0FBSztzREFBYztJQUZ2QixvQkFBb0I7UUFqQmhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLGlnQkFVUTtZQUNsQixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQU15Qix3QkFBaUI7T0FKL0Isb0JBQW9CLENBdURoQztJQUFELDJCQUFDO0NBdkRELEFBdURDLElBQUE7QUF2RFksb0RBQW9CIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otaW5wdXQtdGFncy93ei1pbnB1dC10YWdzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LWlucHV0LXRhZ3MnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtYXQtaW5wdXQtd3JhcHBlciB3ei10YWdzXCI+XG4gICAgICAgICAgICAgICAgPHVsICpuZ0lmPVwidGFncy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgW25nQ2xhc3NdPVwieydyZWFkeS1kZWxldGUnOiBjaGVja0JlZm9yZURlbGV0ZSh0YWcpfVwiICpuZ0Zvcj1cImxldCB0YWcgb2YgdGFncztcIj5cbiAgICAgICAgICAgICAgICAgICAge3t0YWd9fVxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZWxldGVcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cImRlbGV0ZSgkZXZlbnQsIHRhZylcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICA8L2Rpdj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5cbmV4cG9ydCBjbGFzcyBXeklucHV0VGFnc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGZDb250cm9sOiBGb3JtQ29udHJvbDtcbiAgQElucHV0KCkgdGFnczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBwcml2YXRlIGZpbmFsRGVsZXRlOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgcHVibGljIHN1Ym1pdChlOiBhbnkpIHtcbiAgICBzd2l0Y2ggKGUuY29kZSkge1xuXG4gICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGxldCB0YWc6IHN0cmluZyA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAoIXRoaXMuZmluZCh0YWcpICYmIHRhZyAhPT0gJycgJiYgdGhpcy50YWdzLmxlbmd0aCA8PSAxMCkge1xuICAgICAgICAgIHRoaXMuY3JlYXRlKHRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgZS50YXJnZXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZmluYWxEZWxldGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlKGZhbHNlLCB0aGlzLnRhZ3NbdGhpcy50YWdzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maW5hbERlbGV0ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZmluYWxEZWxldGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2hlY2tCZWZvcmVEZWxldGUodGFnOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuZmluYWxEZWxldGUgJiYgdGhpcy50YWdzW3RoaXMudGFncy5sZW5ndGggLSAxXSA9PT0gdGFnKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUoJGV2ZW50ID0gZmFsc2UsIHRhZ0ZvckRlbGV0ZTogc3RyaW5nKSB7XG4gICAgdGhpcy50YWdzID0gdGhpcy50YWdzLmZpbHRlcigodGFnKSA9PiB0YWcgIT09IHRhZ0ZvckRlbGV0ZSk7XG4gICAgdGhpcy5mQ29udHJvbC5zZXRWYWx1ZSh0aGlzLnRhZ3MudG9TdHJpbmcoKSk7XG4gICAgdGhpcy5maW5hbERlbGV0ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGUodGFnOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRhZ3MgPSB0aGlzLnRhZ3MuY29uY2F0KHRhZyk7XG4gICAgdGhpcy5mQ29udHJvbC5zZXRWYWx1ZSh0aGlzLnRhZ3MudG9TdHJpbmcoKSk7XG4gIH1cblxuICBwcml2YXRlIGZpbmQodGFnQ2FuZGlkYXRlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50YWdzLmZpbHRlcigodGFnKSA9PiB0YWcgPT09IHRhZ0NhbmRpZGF0ZSkubGVuZ3RoID4gMDtcbiAgfVxufVxuIl19
