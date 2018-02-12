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
var HomeHighlightsComponent = (function () {
    function HomeHighlightsComponent() {
    }
    HomeHighlightsComponent.prototype.buildSearchContext = function (context) {
        context = JSON.parse(context);
        for (var param in context) {
            if (context[param] === '')
                delete (context[param]);
        }
        return context;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HomeHighlightsComponent.prototype, "config", void 0);
    HomeHighlightsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-highlights',
            template: "\n    <section layout=\"row\" layout-align=\"center start\" class=\"mrkt-collections\">\n      <div flex-gt-lg=\"70\" flex-lg=\"70\" flex-gt-md=\"80\" flex-gt-sm=\"90\" flex=\"100\" layout=\"row\" layout-wrap=\"\">\n        <div *ngFor=\"let highlight of config.highlights.items; let i = index\" \n          flex-gt-xs=\"33\" flex=\"100\" \n          class=\"mrkt-collections__highlight\"\n        >\n          <a *ngIf=\"config\" [routerLink]=\"['/search', buildSearchContext(highlight.searchContext)]\">\n            <div class=\"mrkt-collections__highlight_img\"></div>\n            <div class=\"mrkt-collections__highlight_content\">\n              <h5 class=\"mat-title\">{{ 'HOME.HIGHLIGHT.'+(i+1) | translate }}</h5>\n            </div>\n          </a>\n        </div>\n      </div>\n    </section>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], HomeHighlightsComponent);
    return HomeHighlightsComponent;
}());
exports.HomeHighlightsComponent = HomeHighlightsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtaGlnaGxpZ2h0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEU7QUF5QjFFO0lBQUE7SUFVQSxDQUFDO0lBUFEsb0RBQWtCLEdBQXpCLFVBQTBCLE9BQVk7UUFDcEMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBUlE7UUFBUixZQUFLLEVBQUU7OzJEQUFhO0lBRFYsdUJBQXVCO1FBdkJuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLDJ5QkFnQlQ7WUFDRCxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BRVcsdUJBQXVCLENBVW5DO0lBQUQsOEJBQUM7Q0FWRCxBQVVDLElBQUE7QUFWWSwwREFBdUIiLCJmaWxlIjoiYXBwLytob21lL2NvbXBvbmVudHMvaG9tZS1oaWdobGlnaHRzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2hvbWUtaGlnaGxpZ2h0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlY3Rpb24gbGF5b3V0PVwicm93XCIgbGF5b3V0LWFsaWduPVwiY2VudGVyIHN0YXJ0XCIgY2xhc3M9XCJtcmt0LWNvbGxlY3Rpb25zXCI+XG4gICAgICA8ZGl2IGZsZXgtZ3QtbGc9XCI3MFwiIGZsZXgtbGc9XCI3MFwiIGZsZXgtZ3QtbWQ9XCI4MFwiIGZsZXgtZ3Qtc209XCI5MFwiIGZsZXg9XCIxMDBcIiBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtd3JhcD1cIlwiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBoaWdobGlnaHQgb2YgY29uZmlnLmhpZ2hsaWdodHMuaXRlbXM7IGxldCBpID0gaW5kZXhcIiBcbiAgICAgICAgICBmbGV4LWd0LXhzPVwiMzNcIiBmbGV4PVwiMTAwXCIgXG4gICAgICAgICAgY2xhc3M9XCJtcmt0LWNvbGxlY3Rpb25zX19oaWdobGlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgPGEgKm5nSWY9XCJjb25maWdcIiBbcm91dGVyTGlua109XCJbJy9zZWFyY2gnLCBidWlsZFNlYXJjaENvbnRleHQoaGlnaGxpZ2h0LnNlYXJjaENvbnRleHQpXVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1ya3QtY29sbGVjdGlvbnNfX2hpZ2hsaWdodF9pbWdcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtcmt0LWNvbGxlY3Rpb25zX19oaWdobGlnaHRfY29udGVudFwiPlxuICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtYXQtdGl0bGVcIj57eyAnSE9NRS5ISUdITElHSFQuJysoaSsxKSB8IHRyYW5zbGF0ZSB9fTwvaDU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVIaWdobGlnaHRzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG5cbiAgcHVibGljIGJ1aWxkU2VhcmNoQ29udGV4dChjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIGNvbnRleHQgPSBKU09OLnBhcnNlKGNvbnRleHQpO1xuICAgIGZvciAobGV0IHBhcmFtIGluIGNvbnRleHQpIHtcbiAgICAgIGlmIChjb250ZXh0W3BhcmFtXSA9PT0gJycpIGRlbGV0ZSAoY29udGV4dFtwYXJhbV0pO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxufVxuIl19
