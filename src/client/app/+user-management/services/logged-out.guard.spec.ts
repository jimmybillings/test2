import { LoggedOutGuard } from './logged-out.guard';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Logged Out Guard', () => {
    let serviceUnderTest: LoggedOutGuard;
    let mockCurrentUserService: any;
    let mockStore: MockAppStore;
    let errorSpy: jasmine.Spy;

    beforeEach(() => {
      mockStore = new MockAppStore();
      errorSpy = mockStore.createActionFactoryMethod('error', 'handle401Unauthorized');
    });

    describe('canActivate()', () => {
      it('Should return true if the user is logged in', () => {
        mockCurrentUserService = { loggedIn: jasmine.createSpy('loggedIn').and.returnValue(true) };
        serviceUnderTest = new LoggedOutGuard(mockCurrentUserService, mockStore);
        let action = serviceUnderTest.canActivate();
        expect(action).toEqual(true);
        expect(errorSpy).not.toHaveBeenCalled();
      });

      it('Should return false and pass a 401 to the error.handle method', () => {
        mockCurrentUserService = { loggedIn: jasmine.createSpy('loggedIn').and.returnValue(false) };
        serviceUnderTest = new LoggedOutGuard(mockCurrentUserService, mockStore);
        let action = serviceUnderTest.canActivate();
        mockStore.expectDispatchFor(errorSpy);
        expect(action).toEqual(false);
      });
    });

  });
}
