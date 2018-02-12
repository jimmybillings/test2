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
var core_2 = require("@ngx-translate/core");
var material_1 = require("@angular/material");
var SnackbarService = (function () {
    function SnackbarService(translateService, snackBar) {
        this.translateService = translateService;
        this.snackBar = snackBar;
    }
    SnackbarService.prototype.display = function (messageKey, messageParameters) {
        var _this = this;
        return this.translateService.get(messageKey, messageParameters)
            .take(1)
            .do(function (translatedString) { return _this.snackBar.open(translatedString, '', {
            duration: 1500,
            verticalPosition: 'top',
            horizontalPosition: 'left',
            extraClasses: ['wz-snackbar']
        }); });
    };
    SnackbarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_2.TranslateService, material_1.MatSnackBar])
    ], SnackbarService);
    return SnackbarService;
}());
exports.SnackbarService = SnackbarService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDLDRDQUF1RDtBQUN2RCw4Q0FBZ0Q7QUFHaEQ7SUFDRSx5QkFBb0IsZ0JBQWtDLEVBQVUsUUFBcUI7UUFBakUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWE7SUFBSSxDQUFDO0lBRW5GLGlDQUFPLEdBQWQsVUFBZSxVQUFrQixFQUFFLGlCQUF5QjtRQUE1RCxpQkFTQztRQVJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQzthQUM1RCxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsRUFBRSxDQUFDLFVBQUMsZ0JBQXdCLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLEVBQUU7WUFDekUsUUFBUSxFQUFFLElBQUk7WUFDZCxnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLGtCQUFrQixFQUFFLE1BQU07WUFDMUIsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQzlCLENBQUMsRUFMZ0MsQ0FLaEMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQVpVLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FFMkIsdUJBQWdCLEVBQW9CLHNCQUFXO09BRDFFLGVBQWUsQ0FhM0I7SUFBRCxzQkFBQztDQWJELEFBYUMsSUFBQTtBQWJZLDBDQUFlIiwiZmlsZSI6ImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNuYWNrYmFyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBzbmFja0JhcjogTWF0U25hY2tCYXIpIHsgfVxuXG4gIHB1YmxpYyBkaXNwbGF5KG1lc3NhZ2VLZXk6IHN0cmluZywgbWVzc2FnZVBhcmFtZXRlcnM6IG9iamVjdCk6IE9ic2VydmFibGU8U3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQobWVzc2FnZUtleSwgbWVzc2FnZVBhcmFtZXRlcnMpXG4gICAgICAudGFrZSgxKVxuICAgICAgLmRvKCh0cmFuc2xhdGVkU3RyaW5nOiBzdHJpbmcpID0+IHRoaXMuc25hY2tCYXIub3Blbih0cmFuc2xhdGVkU3RyaW5nLCAnJywge1xuICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgdmVydGljYWxQb3NpdGlvbjogJ3RvcCcsXG4gICAgICAgIGhvcml6b250YWxQb3NpdGlvbjogJ2xlZnQnLFxuICAgICAgICBleHRyYUNsYXNzZXM6IFsnd3otc25hY2tiYXInXVxuICAgICAgfSkpO1xuICB9XG59XG4iXX0=
