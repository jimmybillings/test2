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
var current_user_service_1 = require("../../shared/services/current-user.service");
var SearchCapabilities = (function () {
    function SearchCapabilities(currentUser) {
        this.currentUser = currentUser;
    }
    SearchCapabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    SearchCapabilities = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService])
    ], SearchCapabilities);
    return SearchCapabilities;
}());
exports.SearchCapabilities = SearchCapabilities;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlcnZpY2VzL3NlYXJjaC5jYXBhYmlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsbUZBQWdGO0FBSWhGO0lBQ0UsNEJBQW1CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtJQUFJLENBQUM7SUFFaEQsb0NBQU8sR0FBZCxVQUFlLFVBQWtCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBTFUsa0JBQWtCO1FBRDlCLGlCQUFVLEVBQUU7eUNBRXFCLHlDQUFrQjtPQUR2QyxrQkFBa0IsQ0FNOUI7SUFBRCx5QkFBQztDQU5ELEFBTUMsSUFBQTtBQU5ZLGdEQUFrQiIsImZpbGUiOiJhcHAvK3NlYXJjaC9zZXJ2aWNlcy9zZWFyY2guY2FwYWJpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoQ2FwYWJpbGl0aWVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyB1c2VySGFzKHBlcm1pc3Npb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyLmhhc1Blcm1pc3Npb24ocGVybWlzc2lvbik7XG4gIH1cbn1cbiJdfQ==
