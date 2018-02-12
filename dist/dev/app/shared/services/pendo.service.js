"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PendoService = (function () {
    function PendoService() {
    }
    PendoService.prototype.initialize = function (user) {
        if (typeof window.pendo === 'undefined')
            return;
        var userUniqueIdentifier = user.siteName + "-" + user.id + "-" + user.firstName.toLowerCase() + "-" + user.lastName.toLowerCase();
        var accountUniqueIdentifier = user.siteName + "-" + user.accountId;
        window.pendo.initialize({
            apiKey: '7e5da402-5d29-41b0-5579-6e149b0a28f2',
            visitor: { id: userUniqueIdentifier, email: user.emailAddress },
            account: { id: accountUniqueIdentifier }
        });
    };
    PendoService = __decorate([
        core_1.Injectable()
    ], PendoService);
    return PendoService;
}());
exports.PendoService = PendoService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvcGVuZG8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUkzQztJQUFBO0lBWUEsQ0FBQztJQVZRLGlDQUFVLEdBQWpCLFVBQWtCLElBQVU7UUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBYSxNQUFPLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUN2RCxJQUFJLG9CQUFvQixHQUFjLElBQUksQ0FBQyxRQUFRLFNBQUksSUFBSSxDQUFDLEVBQUUsU0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFJLENBQUM7UUFDaEksSUFBSSx1QkFBdUIsR0FBYyxJQUFJLENBQUMsUUFBUSxTQUFJLElBQUksQ0FBQyxTQUFXLENBQUM7UUFDckUsTUFBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDN0IsTUFBTSxFQUFFLHNDQUFzQztZQUM5QyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDL0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLHVCQUF1QixFQUFFO1NBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFYVSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7T0FDQSxZQUFZLENBWXhCO0lBQUQsbUJBQUM7Q0FaRCxBQVlDLElBQUE7QUFaWSxvQ0FBWSIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL3BlbmRvLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQZW5kb1NlcnZpY2Uge1xuXG4gIHB1YmxpYyBpbml0aWFsaXplKHVzZXI6IFVzZXIpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mICg8YW55PndpbmRvdykucGVuZG8gPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgbGV0IHVzZXJVbmlxdWVJZGVudGlmaWVyOiBzdHJpbmcgPSBgJHt1c2VyLnNpdGVOYW1lfS0ke3VzZXIuaWR9LSR7dXNlci5maXJzdE5hbWUudG9Mb3dlckNhc2UoKX0tJHt1c2VyLmxhc3ROYW1lLnRvTG93ZXJDYXNlKCl9YDtcbiAgICBsZXQgYWNjb3VudFVuaXF1ZUlkZW50aWZpZXI6IHN0cmluZyA9IGAke3VzZXIuc2l0ZU5hbWV9LSR7dXNlci5hY2NvdW50SWR9YDtcbiAgICAoPGFueT53aW5kb3cpLnBlbmRvLmluaXRpYWxpemUoe1xuICAgICAgYXBpS2V5OiAnN2U1ZGE0MDItNWQyOS00MWIwLTU1NzktNmUxNDliMGEyOGYyJyxcbiAgICAgIHZpc2l0b3I6IHsgaWQ6IHVzZXJVbmlxdWVJZGVudGlmaWVyLCBlbWFpbDogdXNlci5lbWFpbEFkZHJlc3MgfSxcbiAgICAgIGFjY291bnQ6IHsgaWQ6IGFjY291bnRVbmlxdWVJZGVudGlmaWVyIH1cbiAgICB9KTtcbiAgfVxufVxuXG4iXX0=
