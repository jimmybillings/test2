"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var forgot_password_component_1 = require("./forgot-password.component");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Forgot Password Component', function () {
        var mockUser;
        var mockRef;
        var componentUnderTest;
        var mockStore;
        beforeEach(function () {
            mockUser = { forgotPassword: jasmine.createSpy('forgotPassword').and.returnValue(Observable_1.Observable.of({})) };
            mockRef = { markForCheck: function () { } };
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', { components: { forgotPassword: { config: { someConfig: 'test' } } } });
            componentUnderTest = new forgot_password_component_1.ForgotPasswordComponent(mockUser, mockStore, mockRef);
        });
        describe('ngOnInit()', function () {
            it('Grabs the component config and assigns to an instance variable', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.config).toEqual({ someConfig: 'test' });
            });
        });
        describe('onSubmit()', function () {
            it('Submits a request for a reset password email', function () {
                componentUnderTest.onSubmit({ 'emailAddress': 'test@test.com' });
                expect(componentUnderTest.user.forgotPassword).toHaveBeenCalledWith({ 'emailAddress': 'test@test.com' });
                expect(componentUnderTest.successfullySubmitted).toEqual(true);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50Lytmb3Jnb3QtcGFzc3dvcmQvZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLHlFQUFzRTtBQUN0RSwwRUFBdUU7QUFFdkU7SUFDRSxRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsSUFBSSxRQUFhLENBQUM7UUFDbEIsSUFBSSxPQUFZLENBQUM7UUFDakIsSUFBSSxrQkFBMkMsQ0FBQztRQUNoRCxJQUFJLFNBQXVCLENBQUM7UUFFNUIsVUFBVSxDQUFDO1lBQ1QsUUFBUSxHQUFHLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN0RyxPQUFPLEdBQUcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBQUUsQ0FBQztZQUM1QyxTQUFTLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7WUFDL0IsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pILGtCQUFrQixHQUFHLElBQUksbURBQXVCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO2dCQUNuRSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtnQkFDakQsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztnQkFDekcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE5QkQsb0JBOEJDIiwiZmlsZSI6ImFwcC8rdXNlci1tYW5hZ2VtZW50Lytmb3Jnb3QtcGFzc3dvcmQvZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0ZvcmdvdCBQYXNzd29yZCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IG1vY2tVc2VyOiBhbnk7XG4gICAgbGV0IG1vY2tSZWY6IGFueTtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBGb3Jnb3RQYXNzd29yZENvbXBvbmVudDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tVc2VyID0geyBmb3Jnb3RQYXNzd29yZDogamFzbWluZS5jcmVhdGVTcHkoJ2ZvcmdvdFBhc3N3b3JkJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKSB9O1xuICAgICAgbW9ja1JlZiA9IHsgbWFya0ZvckNoZWNrOiBmdW5jdGlvbiAoKSB7IH0gfTtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywgeyBjb21wb25lbnRzOiB7IGZvcmdvdFBhc3N3b3JkOiB7IGNvbmZpZzogeyBzb21lQ29uZmlnOiAndGVzdCcgfSB9IH0gfSk7XG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgRm9yZ290UGFzc3dvcmRDb21wb25lbnQobW9ja1VzZXIsIG1vY2tTdG9yZSwgbW9ja1JlZik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdHcmFicyB0aGUgY29tcG9uZW50IGNvbmZpZyBhbmQgYXNzaWducyB0byBhbiBpbnN0YW5jZSB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29uZmlnKS50b0VxdWFsKHsgc29tZUNvbmZpZzogJ3Rlc3QnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TdWJtaXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdTdWJtaXRzIGEgcmVxdWVzdCBmb3IgYSByZXNldCBwYXNzd29yZCBlbWFpbCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgJ2VtYWlsQWRkcmVzcyc6ICd0ZXN0QHRlc3QuY29tJyB9KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC51c2VyLmZvcmdvdFBhc3N3b3JkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7ICdlbWFpbEFkZHJlc3MnOiAndGVzdEB0ZXN0LmNvbScgfSk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc3VjY2Vzc2Z1bGx5U3VibWl0dGVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19
