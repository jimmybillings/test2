import { LoggedInGuard } from './logged-in.guard';

export function main() {
  describe('Logged In Guard', () => {
    let serviceUnderTest: LoggedInGuard;
    let mockCurrentUserService: any, mockRouter: any;
    beforeEach(() => {
      mockRouter = { navigate: jasmine.createSpy('navigate') };
    });

    describe('canActivate()', () => {
      it('Should return true if the user is not logged in', () => {
        mockCurrentUserService = { loggedIn: jasmine.createSpy('loggedIn').and.returnValue(false) };
        serviceUnderTest = new LoggedInGuard(mockCurrentUserService, mockRouter);
        let action = serviceUnderTest.canActivate();
        expect(action).toEqual(true);
      });

      it('Should return false and navigate to home if user is logged in', () => {
        mockCurrentUserService = { loggedIn: jasmine.createSpy('loggedIn').and.returnValue(true) };
        serviceUnderTest = new LoggedInGuard(mockCurrentUserService, mockRouter);
        let action = serviceUnderTest.canActivate();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
        expect(action).toEqual(false);
      });
    });
  });
}
