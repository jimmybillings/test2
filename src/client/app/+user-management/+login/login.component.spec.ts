import { Observable } from 'rxjs/Observable';
import { LoginComponent } from './login.component';
import { WzTermsComponent } from '../../shared/components/wz-terms/wz.terms.component';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Login Component', () => {
    let mockAuthentication: any;
    let mockRouter: any;
    let mockCurrentUserService: any;
    let mockUserService: any;
    let mockPendo: any;
    let mockDialog: any;
    let mockFeatureStore: any;
    let mockStore: MockAppStore;
    let componentUnderTest: LoginComponent;

    beforeEach(() => {
      mockAuthentication = {
        create: jasmine.createSpy('create').and.returnValue(Observable.of({
          user: { firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 },
          token: { token: 'loginToken' },
          userPreferences: { pref: 1 },
          siteFeatures: {
            'stripePublicKey': 'pk_test_ETcreKa1BLgjGbx51I7N3cEj',
            'disableCommerceAgreements': false,
            'disableCartAccess': false
          }
        }))
      };

      mockRouter = {
        navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve()),
        navigateByUrl: jasmine.createSpy('navigateByUrl'),
        routerState: {
          snapshot: {
            url: '/user/login'
          }
        }
      };

      mockCurrentUserService = {
        set: jasmine.createSpy('set'),
        addAccountToUser: jasmine.createSpy('addAccountToUser'),
        hasPermission: (perm: string) => jasmine.createSpy('hasPermission').and.returnValue(perm === 'ViewAccounts')
      };

      mockUserService = {
        downloadActiveTosDocument:
          jasmine.createSpy('downloadActiveTosDocument').and.returnValue(Observable.of('SOME TEST TERMS')),
        agreeUserToTerms: jasmine.createSpy('agreeUserToTerms'),
        getAccount: jasmine.createSpy('getAccount').and.returnValue(Observable.of({ account: 'some account' }))
      };

      mockPendo = { initialize: jasmine.createSpy('initialize') };

      mockDialog = {
        close: jasmine.createSpy('close'),
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable.of({}))
      };

      mockFeatureStore = { set: jasmine.createSpy('set'), setInLocalStorage: jasmine.createSpy('setInLocalStorage') };

      mockStore = new MockAppStore();
      mockStore.createStateSection('uiConfig', { components: { login: { config: { someConfig: 'test' } } } });
      mockStore.createActionFactoryMethod('uiConfig', 'load');

      componentUnderTest = new LoginComponent(
        mockAuthentication, mockRouter, mockCurrentUserService, mockUserService,
        mockPendo, mockDialog, mockFeatureStore, mockStore
      );
    });

    describe('ngOnInit()', () => {
      it('Grabs the component config and assigns to an instance variable', () => {
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.config).toEqual({ someConfig: 'test' });
      });

      it('Should display a message for a new user', () => {
        mockRouter = {
          navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve()),
          navigateByUrl: jasmine.createSpy('navigateByUrl'),
          routerState: {
            snapshot: {
              url: '/user/login;newUser=true'
            }
          }
        };
        componentUnderTest = new LoginComponent(
          mockAuthentication, mockRouter, mockCurrentUserService, mockUserService,
          mockPendo, mockDialog, mockFeatureStore, mockStore
        );
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.displayWelcomeMessage).toBe(true);
      });
    });

    describe('onSubmit()', () => {
      beforeEach(() => {
        mockStore.createActionFactoryMethod('router', 'followRedirect');
      });

      it('Submits a new login request', () => {
        componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
        expect(mockAuthentication.create).toHaveBeenCalledWith({ 'userId': 'james', 'password': 'testPassword' });
      });

      it('Sets a new user and auth token on response', () => {
        componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
        expect(mockCurrentUserService.set).toHaveBeenCalledWith(
          { firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 }, 'loginToken');
      });

      it('Initializes pendo with the user response', () => {
        componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
        expect(mockPendo.initialize).toHaveBeenCalledWith(
          { firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 });
      });

      it('Calls the feature store if the login response has a feature object', () => {
        componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
        expect(mockFeatureStore.set).toHaveBeenCalledWith({
          'stripePublicKey': 'pk_test_ETcreKa1BLgjGbx51I7N3cEj',
          'disableCommerceAgreements': false,
          'disableCartAccess': false
        });
      });

      it('Does not Call the feature store if the login response has no feature object', () => {
        mockAuthentication = {
          create: jasmine.createSpy('create').and.returnValue(Observable.of({
            user: { firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 },
            token: { token: 'loginToken' },
            userPreferences: { pref: 1 }
          }))
        };
        componentUnderTest = new LoginComponent(
          mockAuthentication, mockRouter, mockCurrentUserService, mockUserService,
          mockPendo, mockDialog, mockFeatureStore, mockStore
        );
        componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
        expect(mockFeatureStore.set).not.toHaveBeenCalled();
      });

      describe('addAccountToUser()', () => {
        it(`user has accountId, and account API returns an account`, () => {
          componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
          expect(mockUserService.getAccount).toHaveBeenCalledWith(1);
          expect(mockCurrentUserService.addAccountToUser).toHaveBeenCalledWith({ account: 'some account' });
        });

        it(`user has accountId, and account API return an empty response`, () => {
          mockUserService = {
            downloadActiveTosDocument:
              jasmine.createSpy('downloadActiveTosDocument').and.returnValue(Observable.of('SOME TEST TERMS')),
            agreeUserToTerms: jasmine.createSpy('agreeUserToTerms'),
            getAccount: jasmine.createSpy('getAccount').and.returnValue(Observable.of(false))
          };
          componentUnderTest = new LoginComponent(
            mockAuthentication, mockRouter, mockCurrentUserService, mockUserService,
            mockPendo, mockDialog, mockFeatureStore, mockStore
          );
          componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
          expect(mockUserService.getAccount).toHaveBeenCalled();
          expect(mockCurrentUserService.addAccountToUser).not.toHaveBeenCalled();
        });

        it(`user has no accountId`, () => {
          mockAuthentication = {
            create: jasmine.createSpy('create').and.returnValue(Observable.of({
              user: { firstName: 'james', lastName: 'billings', siteName: 'core', id: 10 },
              token: { token: 'loginToken' },
              userPreferences: { pref: 1 },
              siteFeatures: {
                'stripePublicKey': 'pk_test_ETcreKa1BLgjGbx51I7N3cEj',
                'disableCommerceAgreements': false,
                'disableCartAccess': false
              }
            }))
          };
          componentUnderTest = new LoginComponent(
            mockAuthentication, mockRouter, mockCurrentUserService, mockUserService,
            mockPendo, mockDialog, mockFeatureStore, mockStore
          );
          componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
          expect(mockUserService.getAccount).not.toHaveBeenCalled();
          expect(mockCurrentUserService.addAccountToUser).not.toHaveBeenCalled();
        });

      });

      describe('showTerms()', () => {
        beforeEach(() => {
          mockAuthentication = {
            create: jasmine.createSpy('create').and.returnValue(
              Observable.of({
                user: { firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 },
                token: { token: 'loginToken' },
                userPreferences: { pref: 1 },
                documentsRequiringAgreement: ['TOS']
              }))
          };
          componentUnderTest = new LoginComponent(
            mockAuthentication, mockRouter, mockCurrentUserService, mockUserService,
            mockPendo, mockDialog, mockFeatureStore, mockStore
          );
        });

        it('Calls the API form the terms content to pass to the dialog', () => {

          componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
          expect(mockUserService.downloadActiveTosDocument).toHaveBeenCalled();
        });

        it('Shows the dialog with terms when the API returns the terms content', () => {

          componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
          expect(mockDialog.openComponentInDialog).toHaveBeenCalledWith({
            componentType: WzTermsComponent,
            inputOptions: {
              terms: 'SOME TEST TERMS',
              btnLabel: 'LOGIN.AGREE_TO_TOS',
              header: 'LOGIN.TOS_TITLE'
            }
          });
        });

        it('Sends a request to the API when the user has agreed to the terms', () => {

          componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
          expect(mockUserService.agreeUserToTerms).toHaveBeenCalled();
        });
      });

      describe('redirectUserAppropriately()', () => {
        it('dispatches a followRedirect action', () => {
          const spy = mockStore.createActionFactoryMethod('router', 'followRedirect');

          componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });

          mockStore.expectDispatchFor(spy);
        });
      });
    });
  });
}
