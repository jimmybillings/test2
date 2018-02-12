import { Observable } from 'rxjs/Observable';
import { ResetPasswordComponent } from './reset-password.component';
import { Response, ResponseOptions } from '@angular/http';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Reset Password Component', () => {
    let mockUser: any;
    let mockActivatedRoute: any;
    let mockRouter: any;
    let mockRef: any;
    let mockCurrentUserService: any;
    let mockNotification: any;
    let componentUnderTest: ResetPasswordComponent;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockRef = { markForCheck: function () { } };

      mockUser = {
        resetPassword: jasmine.createSpy('resetPassword').and.returnValue(
          Observable.of({
            user: 'james',
            token: { token: 'loginToken' },
            userPreferences: { pref: 1 }
          })
        ),
        changePassword: jasmine.createSpy('changePassword').and.returnValue(
          Observable.of({})
        )
      };

      mockActivatedRoute = {
        snapshot: { params: { share_key: 'sldkjf2938sdlkjf289734' } }
      };

      mockRouter = { navigate: jasmine.createSpy('navigate') };

      mockCurrentUserService = {
        set: jasmine.createSpy('set'),
        loggedIn: jasmine.createSpy('loggedIn').and.returnValue(true)
      };

      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', { components: { changePassword: { config: { some: 'config' } } } });

      componentUnderTest = new ResetPasswordComponent(
        mockUser, mockStore, mockActivatedRoute, mockRouter,
        mockCurrentUserService, mockRef
      );
    });

    describe('ngOnInit()', () => {
      it('Grabs the component config and assigns to an instance variable', () => {
        componentUnderTest.ngOnInit();

        expect(componentUnderTest.config).toEqual({ some: 'config' });
      });
    });

    describe('onSubmit() success', () => {
      let snackbarSpy: jasmine.Spy;

      beforeEach(() => {
        snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');
      });

      describe('with a share token', () => {
        beforeEach(() => {
          componentUnderTest.ngOnInit();
        });

        it('calls resetPassword()', () => {
          componentUnderTest.onSubmit({ newPassword: 'myNewTestPassword' });
          expect(mockUser.resetPassword).toHaveBeenCalledWith({ newPassword: 'myNewTestPassword' }, 'sldkjf2938sdlkjf289734');
        });

        it('Sets a new user and auth token on response', () => {
          componentUnderTest.onSubmit({ newPassword: 'myNewTestPassword' });
          expect(mockCurrentUserService.set).toHaveBeenCalledWith('james', 'loginToken');
        });


        it('Navigates to the home page', () => {
          componentUnderTest.onSubmit({ newPassword: 'myNewTestPassword' });
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
        });

        it('Displays a snackbar that the password was sucessfully changed', () => {
          componentUnderTest.onSubmit({ newPassword: 'myNewTestPassword' });
          expect(snackbarSpy).toHaveBeenCalledWith('RESETPASSWORD.PASSWORD_CHANGED');
        });
      });

      describe('without a share key', () => {
        beforeEach(() => {
          mockActivatedRoute = { snapshot: { params: {} } };
          componentUnderTest = new ResetPasswordComponent(
            mockUser, mockStore, mockActivatedRoute, mockRouter, mockCurrentUserService, mockRef
          );
          componentUnderTest.ngOnInit();
        });
        it('calls changePassword()', () => {
          componentUnderTest.onSubmit({ newPassword: 'abc123' });

          expect(mockUser.changePassword).toHaveBeenCalledWith({ newPassword: 'abc123' });
        });
      });
    });

    describe('onSubmit() error', () => {
      it('Sets a errors variable to display errors if the server doesnt pass', () => {
        const errorResponse: Response = new Response(new ResponseOptions(
          { body: JSON.stringify({ newPassword: 'Needs a number and letter' }) }));
        mockUser = {
          resetPassword: jasmine.createSpy('resetPassword').and.returnValue(
            Observable.throw(errorResponse)),
          changePassword: jasmine.createSpy('resetPassword').and.returnValue(
            Observable.throw(errorResponse))
        };
        componentUnderTest = new ResetPasswordComponent(
          mockUser, mockStore, mockActivatedRoute, mockRouter, mockCurrentUserService, mockRef
        );
        componentUnderTest.onSubmit({ 'newPassword': 'myNewTestPassword' });
        expect(componentUnderTest.serverErrors).toEqual({ newPassword: 'Needs a number and letter' });
      });
    });
  });
}
