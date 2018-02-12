import { Observable } from 'rxjs/Observable';
import { ForgotPasswordComponent } from './forgot-password.component';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Forgot Password Component', () => {
    let mockUser: any;
    let mockRef: any;
    let componentUnderTest: ForgotPasswordComponent;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockUser = { forgotPassword: jasmine.createSpy('forgotPassword').and.returnValue(Observable.of({})) };
      mockRef = { markForCheck: function () { } };
      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', { components: { forgotPassword: { config: { someConfig: 'test' } } } });
      componentUnderTest = new ForgotPasswordComponent(mockUser, mockStore, mockRef);
    });

    describe('ngOnInit()', () => {
      it('Grabs the component config and assigns to an instance variable', () => {
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.config).toEqual({ someConfig: 'test' });
      });
    });

    describe('onSubmit()', () => {
      it('Submits a request for a reset password email', () => {
        componentUnderTest.onSubmit({ 'emailAddress': 'test@test.com' });
        expect(componentUnderTest.user.forgotPassword).toHaveBeenCalledWith({ 'emailAddress': 'test@test.com' });
        expect(componentUnderTest.successfullySubmitted).toEqual(true);
      });
    });
  });
}
