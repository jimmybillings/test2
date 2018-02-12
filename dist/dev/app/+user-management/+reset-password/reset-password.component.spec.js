"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var reset_password_component_1 = require("./reset-password.component");
var http_1 = require("@angular/http");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Reset Password Component', function () {
        var mockUser;
        var mockActivatedRoute;
        var mockRouter;
        var mockRef;
        var mockCurrentUserService;
        var mockNotification;
        var componentUnderTest;
        var mockStore;
        beforeEach(function () {
            mockRef = { markForCheck: function () { } };
            mockUser = {
                resetPassword: jasmine.createSpy('resetPassword').and.returnValue(Observable_1.Observable.of({
                    user: 'james',
                    token: { token: 'loginToken' },
                    userPreferences: { pref: 1 }
                })),
                changePassword: jasmine.createSpy('changePassword').and.returnValue(Observable_1.Observable.of({}))
            };
            mockActivatedRoute = {
                snapshot: { params: { share_key: 'sldkjf2938sdlkjf289734' } }
            };
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            mockCurrentUserService = {
                set: jasmine.createSpy('set'),
                loggedIn: jasmine.createSpy('loggedIn').and.returnValue(true)
            };
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', { components: { changePassword: { config: { some: 'config' } } } });
            componentUnderTest = new reset_password_component_1.ResetPasswordComponent(mockUser, mockStore, mockActivatedRoute, mockRouter, mockCurrentUserService, mockRef);
        });
        describe('ngOnInit()', function () {
            it('Grabs the component config and assigns to an instance variable', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.config).toEqual({ some: 'config' });
            });
        });
        describe('onSubmit() success', function () {
            var snackbarSpy;
            beforeEach(function () {
                snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');
            });
            describe('with a share token', function () {
                beforeEach(function () {
                    componentUnderTest.ngOnInit();
                });
                it('calls resetPassword()', function () {
                    componentUnderTest.onSubmit({ newPassword: 'myNewTestPassword' });
                    expect(mockUser.resetPassword).toHaveBeenCalledWith({ newPassword: 'myNewTestPassword' }, 'sldkjf2938sdlkjf289734');
                });
                it('Sets a new user and auth token on response', function () {
                    componentUnderTest.onSubmit({ newPassword: 'myNewTestPassword' });
                    expect(mockCurrentUserService.set).toHaveBeenCalledWith('james', 'loginToken');
                });
                it('Navigates to the home page', function () {
                    componentUnderTest.onSubmit({ newPassword: 'myNewTestPassword' });
                    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
                });
                it('Displays a snackbar that the password was sucessfully changed', function () {
                    componentUnderTest.onSubmit({ newPassword: 'myNewTestPassword' });
                    expect(snackbarSpy).toHaveBeenCalledWith('RESETPASSWORD.PASSWORD_CHANGED');
                });
            });
            describe('without a share key', function () {
                beforeEach(function () {
                    mockActivatedRoute = { snapshot: { params: {} } };
                    componentUnderTest = new reset_password_component_1.ResetPasswordComponent(mockUser, mockStore, mockActivatedRoute, mockRouter, mockCurrentUserService, mockRef);
                    componentUnderTest.ngOnInit();
                });
                it('calls changePassword()', function () {
                    componentUnderTest.onSubmit({ newPassword: 'abc123' });
                    expect(mockUser.changePassword).toHaveBeenCalledWith({ newPassword: 'abc123' });
                });
            });
        });
        describe('onSubmit() error', function () {
            it('Sets a errors variable to display errors if the server doesnt pass', function () {
                var errorResponse = new http_1.Response(new http_1.ResponseOptions({ body: JSON.stringify({ newPassword: 'Needs a number and letter' }) }));
                mockUser = {
                    resetPassword: jasmine.createSpy('resetPassword').and.returnValue(Observable_1.Observable.throw(errorResponse)),
                    changePassword: jasmine.createSpy('resetPassword').and.returnValue(Observable_1.Observable.throw(errorResponse))
                };
                componentUnderTest = new reset_password_component_1.ResetPasswordComponent(mockUser, mockStore, mockActivatedRoute, mockRouter, mockCurrentUserService, mockRef);
                componentUnderTest.onSubmit({ 'newPassword': 'myNewTestPassword' });
                expect(componentUnderTest.serverErrors).toEqual({ newPassword: 'Needs a number and letter' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50LytyZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3Qyx1RUFBb0U7QUFDcEUsc0NBQTBEO0FBQzFELDBFQUF1RTtBQUV2RTtJQUNFLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxJQUFJLFFBQWEsQ0FBQztRQUNsQixJQUFJLGtCQUF1QixDQUFDO1FBQzVCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksT0FBWSxDQUFDO1FBQ2pCLElBQUksc0JBQTJCLENBQUM7UUFDaEMsSUFBSSxnQkFBcUIsQ0FBQztRQUMxQixJQUFJLGtCQUEwQyxDQUFDO1FBQy9DLElBQUksU0FBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxPQUFPLEdBQUcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBQUUsQ0FBQztZQUU1QyxRQUFRLEdBQUc7Z0JBQ1QsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FDL0QsdUJBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ1osSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDOUIsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtpQkFDN0IsQ0FBQyxDQUNIO2dCQUNELGNBQWMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FDakUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQ2xCO2FBQ0YsQ0FBQztZQUVGLGtCQUFrQixHQUFHO2dCQUNuQixRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsRUFBRTthQUM5RCxDQUFDO1lBRUYsVUFB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dUJBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQ25DLENBQUM7Z0JBQ0Ysa0JBQWtCLEdBQUcsSUFBSSxpREFBc0IsQ0FDN0MsUUFBUSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxDQUNyRixDQUFDO2dCQUNGLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxXQUFXLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO1lBQ2hHLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEzSEQsb0JBMkhDIiwiZmlsZSI6ImFwcC8rdXNlci1tYW5hZ2VtZW50LytyZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc3BvbnNlLCBSZXNwb25zZU9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUmVzZXQgUGFzc3dvcmQgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBtb2NrVXNlcjogYW55O1xuICAgIGxldCBtb2NrQWN0aXZhdGVkUm91dGU6IGFueTtcbiAgICBsZXQgbW9ja1JvdXRlcjogYW55O1xuICAgIGxldCBtb2NrUmVmOiBhbnk7XG4gICAgbGV0IG1vY2tDdXJyZW50VXNlclNlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja05vdGlmaWNhdGlvbjogYW55O1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFJlc2V0UGFzc3dvcmRDb21wb25lbnQ7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrUmVmID0geyBtYXJrRm9yQ2hlY2s6IGZ1bmN0aW9uICgpIHsgfSB9O1xuXG4gICAgICBtb2NrVXNlciA9IHtcbiAgICAgICAgcmVzZXRQYXNzd29yZDogamFzbWluZS5jcmVhdGVTcHkoJ3Jlc2V0UGFzc3dvcmQnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgT2JzZXJ2YWJsZS5vZih7XG4gICAgICAgICAgICB1c2VyOiAnamFtZXMnLFxuICAgICAgICAgICAgdG9rZW46IHsgdG9rZW46ICdsb2dpblRva2VuJyB9LFxuICAgICAgICAgICAgdXNlclByZWZlcmVuY2VzOiB7IHByZWY6IDEgfVxuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGNoYW5nZVBhc3N3b3JkOiBqYXNtaW5lLmNyZWF0ZVNweSgnY2hhbmdlUGFzc3dvcmQnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgT2JzZXJ2YWJsZS5vZih7fSlcbiAgICAgICAgKVxuICAgICAgfTtcblxuICAgICAgbW9ja0FjdGl2YXRlZFJvdXRlID0ge1xuICAgICAgICBzbmFwc2hvdDogeyBwYXJhbXM6IHsgc2hhcmVfa2V5OiAnc2xka2pmMjkzOHNkbGtqZjI4OTczNCcgfSB9XG4gICAgICB9O1xuXG4gICAgICBtb2NrUm91dGVyID0geyBuYXZpZ2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ25hdmlnYXRlJykgfTtcblxuICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHtcbiAgICAgICAgc2V0OiBqYXNtaW5lLmNyZWF0ZVNweSgnc2V0JyksXG4gICAgICAgIGxvZ2dlZEluOiBqYXNtaW5lLmNyZWF0ZVNweSgnbG9nZ2VkSW4nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywgeyBjb21wb25lbnRzOiB7IGNoYW5nZVBhc3N3b3JkOiB7IGNvbmZpZzogeyBzb21lOiAnY29uZmlnJyB9IH0gfSB9KTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IFJlc2V0UGFzc3dvcmRDb21wb25lbnQoXG4gICAgICAgIG1vY2tVc2VyLCBtb2NrU3RvcmUsIG1vY2tBY3RpdmF0ZWRSb3V0ZSwgbW9ja1JvdXRlcixcbiAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbW9ja1JlZlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ0dyYWJzIHRoZSBjb21wb25lbnQgY29uZmlnIGFuZCBhc3NpZ25zIHRvIGFuIGluc3RhbmNlIHZhcmlhYmxlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbmZpZykudG9FcXVhbCh7IHNvbWU6ICdjb25maWcnIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TdWJtaXQoKSBzdWNjZXNzJywgKCkgPT4ge1xuICAgICAgbGV0IHNuYWNrYmFyU3B5OiBqYXNtaW5lLlNweTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHNuYWNrYmFyU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3NuYWNrYmFyJywgJ2Rpc3BsYXknKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnd2l0aCBhIHNoYXJlIHRva2VuJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHJlc2V0UGFzc3dvcmQoKScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQoeyBuZXdQYXNzd29yZDogJ215TmV3VGVzdFBhc3N3b3JkJyB9KTtcbiAgICAgICAgICBleHBlY3QobW9ja1VzZXIucmVzZXRQYXNzd29yZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBuZXdQYXNzd29yZDogJ215TmV3VGVzdFBhc3N3b3JkJyB9LCAnc2xka2pmMjkzOHNkbGtqZjI4OTczNCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2V0cyBhIG5ldyB1c2VyIGFuZCBhdXRoIHRva2VuIG9uIHJlc3BvbnNlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblN1Ym1pdCh7IG5ld1Bhc3N3b3JkOiAnbXlOZXdUZXN0UGFzc3dvcmQnIH0pO1xuICAgICAgICAgIGV4cGVjdChtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLnNldCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2phbWVzJywgJ2xvZ2luVG9rZW4nKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpdCgnTmF2aWdhdGVzIHRvIHRoZSBob21lIHBhZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgbmV3UGFzc3dvcmQ6ICdteU5ld1Rlc3RQYXNzd29yZCcgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnLyddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ0Rpc3BsYXlzIGEgc25hY2tiYXIgdGhhdCB0aGUgcGFzc3dvcmQgd2FzIHN1Y2Vzc2Z1bGx5IGNoYW5nZWQnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgbmV3UGFzc3dvcmQ6ICdteU5ld1Rlc3RQYXNzd29yZCcgfSk7XG4gICAgICAgICAgZXhwZWN0KHNuYWNrYmFyU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnUkVTRVRQQVNTV09SRC5QQVNTV09SRF9DSEFOR0VEJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCd3aXRob3V0IGEgc2hhcmUga2V5JywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBtb2NrQWN0aXZhdGVkUm91dGUgPSB7IHNuYXBzaG90OiB7IHBhcmFtczoge30gfSB9O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBSZXNldFBhc3N3b3JkQ29tcG9uZW50KFxuICAgICAgICAgICAgbW9ja1VzZXIsIG1vY2tTdG9yZSwgbW9ja0FjdGl2YXRlZFJvdXRlLCBtb2NrUm91dGVyLCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrUmVmXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdjYWxscyBjaGFuZ2VQYXNzd29yZCgpJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblN1Ym1pdCh7IG5ld1Bhc3N3b3JkOiAnYWJjMTIzJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrVXNlci5jaGFuZ2VQYXNzd29yZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBuZXdQYXNzd29yZDogJ2FiYzEyMycgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TdWJtaXQoKSBlcnJvcicsICgpID0+IHtcbiAgICAgIGl0KCdTZXRzIGEgZXJyb3JzIHZhcmlhYmxlIHRvIGRpc3BsYXkgZXJyb3JzIGlmIHRoZSBzZXJ2ZXIgZG9lc250IHBhc3MnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG5ldyBSZXNwb25zZU9wdGlvbnMoXG4gICAgICAgICAgeyBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG5ld1Bhc3N3b3JkOiAnTmVlZHMgYSBudW1iZXIgYW5kIGxldHRlcicgfSkgfSkpO1xuICAgICAgICBtb2NrVXNlciA9IHtcbiAgICAgICAgICByZXNldFBhc3N3b3JkOiBqYXNtaW5lLmNyZWF0ZVNweSgncmVzZXRQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgIE9ic2VydmFibGUudGhyb3coZXJyb3JSZXNwb25zZSkpLFxuICAgICAgICAgIGNoYW5nZVBhc3N3b3JkOiBqYXNtaW5lLmNyZWF0ZVNweSgncmVzZXRQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgIE9ic2VydmFibGUudGhyb3coZXJyb3JSZXNwb25zZSkpXG4gICAgICAgIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBSZXNldFBhc3N3b3JkQ29tcG9uZW50KFxuICAgICAgICAgIG1vY2tVc2VyLCBtb2NrU3RvcmUsIG1vY2tBY3RpdmF0ZWRSb3V0ZSwgbW9ja1JvdXRlciwgbW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbW9ja1JlZlxuICAgICAgICApO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQoeyAnbmV3UGFzc3dvcmQnOiAnbXlOZXdUZXN0UGFzc3dvcmQnIH0pO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlcnZlckVycm9ycykudG9FcXVhbCh7IG5ld1Bhc3N3b3JkOiAnTmVlZHMgYSBudW1iZXIgYW5kIGxldHRlcicgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
