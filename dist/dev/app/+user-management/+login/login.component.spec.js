"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var login_component_1 = require("./login.component");
var wz_terms_component_1 = require("../../shared/components/wz-terms/wz.terms.component");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Login Component', function () {
        var mockAuthentication;
        var mockRouter;
        var mockCurrentUserService;
        var mockUserService;
        var mockPendo;
        var mockDialog;
        var mockFeatureStore;
        var mockStore;
        var componentUnderTest;
        beforeEach(function () {
            mockAuthentication = {
                create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.of({
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
                addAccountToUser: jasmine.createSpy('addAccountToUser')
            };
            mockUserService = {
                downloadActiveTosDocument: jasmine.createSpy('downloadActiveTosDocument').and.returnValue(Observable_1.Observable.of('SOME TEST TERMS')),
                agreeUserToTerms: jasmine.createSpy('agreeUserToTerms'),
                getAccount: jasmine.createSpy('getAccount').and.returnValue(Observable_1.Observable.of({ account: 'some account' }))
            };
            mockPendo = { initialize: jasmine.createSpy('initialize') };
            mockDialog = {
                close: jasmine.createSpy('close'),
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable_1.Observable.of({}))
            };
            mockFeatureStore = { set: jasmine.createSpy('set'), setInLocalStorage: jasmine.createSpy('setInLocalStorage') };
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('uiConfig', { components: { login: { config: { someConfig: 'test' } } } });
            mockStore.createActionFactoryMethod('uiConfig', 'load');
            componentUnderTest = new login_component_1.LoginComponent(mockAuthentication, mockRouter, mockCurrentUserService, mockUserService, mockPendo, mockDialog, mockFeatureStore, mockStore);
        });
        describe('ngOnInit()', function () {
            it('Grabs the component config and assigns to an instance variable', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.config).toEqual({ someConfig: 'test' });
            });
            it('Should display a message for a new user', function () {
                mockRouter = {
                    navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve()),
                    navigateByUrl: jasmine.createSpy('navigateByUrl'),
                    routerState: {
                        snapshot: {
                            url: '/user/login;newUser=true'
                        }
                    }
                };
                componentUnderTest = new login_component_1.LoginComponent(mockAuthentication, mockRouter, mockCurrentUserService, mockUserService, mockPendo, mockDialog, mockFeatureStore, mockStore);
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.displayWelcomeMessage).toBe(true);
            });
        });
        describe('onSubmit()', function () {
            beforeEach(function () {
                mockStore.createActionFactoryMethod('router', 'followRedirect');
            });
            it('Submits a new login request', function () {
                componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                expect(mockAuthentication.create).toHaveBeenCalledWith({ 'userId': 'james', 'password': 'testPassword' });
            });
            it('Sets a new user and auth token on response', function () {
                componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                expect(mockCurrentUserService.set).toHaveBeenCalledWith({ firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 }, 'loginToken');
            });
            it('Initializes pendo with the user response', function () {
                componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                expect(mockPendo.initialize).toHaveBeenCalledWith({ firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 });
            });
            it('Calls the feature store if the login response has a feature object', function () {
                componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                expect(mockFeatureStore.set).toHaveBeenCalledWith({
                    'stripePublicKey': 'pk_test_ETcreKa1BLgjGbx51I7N3cEj',
                    'disableCommerceAgreements': false,
                    'disableCartAccess': false
                });
            });
            it('Does not Call the feature store if the login response has no feature object', function () {
                mockAuthentication = {
                    create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.of({
                        user: { firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 },
                        token: { token: 'loginToken' },
                        userPreferences: { pref: 1 }
                    }))
                };
                componentUnderTest = new login_component_1.LoginComponent(mockAuthentication, mockRouter, mockCurrentUserService, mockUserService, mockPendo, mockDialog, mockFeatureStore, mockStore);
                componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                expect(mockFeatureStore.set).not.toHaveBeenCalled();
            });
            describe('addAccountToUser()', function () {
                it("user has accountId, and account API returns an account", function () {
                    componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                    expect(mockUserService.getAccount).toHaveBeenCalledWith(1);
                    expect(mockCurrentUserService.addAccountToUser).toHaveBeenCalledWith({ account: 'some account' });
                });
                it("user has accountId, and account API return an empty response", function () {
                    mockUserService = {
                        downloadActiveTosDocument: jasmine.createSpy('downloadActiveTosDocument').and.returnValue(Observable_1.Observable.of('SOME TEST TERMS')),
                        agreeUserToTerms: jasmine.createSpy('agreeUserToTerms'),
                        getAccount: jasmine.createSpy('getAccount').and.returnValue(Observable_1.Observable.of(false))
                    };
                    componentUnderTest = new login_component_1.LoginComponent(mockAuthentication, mockRouter, mockCurrentUserService, mockUserService, mockPendo, mockDialog, mockFeatureStore, mockStore);
                    componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                    expect(mockUserService.getAccount).toHaveBeenCalled();
                    expect(mockCurrentUserService.addAccountToUser).not.toHaveBeenCalled();
                });
                it("user has no accountId", function () {
                    mockAuthentication = {
                        create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.of({
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
                    componentUnderTest = new login_component_1.LoginComponent(mockAuthentication, mockRouter, mockCurrentUserService, mockUserService, mockPendo, mockDialog, mockFeatureStore, mockStore);
                    componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                    expect(mockUserService.getAccount).not.toHaveBeenCalled();
                    expect(mockCurrentUserService.addAccountToUser).not.toHaveBeenCalled();
                });
            });
            describe('showTerms()', function () {
                beforeEach(function () {
                    mockAuthentication = {
                        create: jasmine.createSpy('create').and.returnValue(Observable_1.Observable.of({
                            user: { firstName: 'james', lastName: 'billings', siteName: 'core', id: 10, accountId: 1 },
                            token: { token: 'loginToken' },
                            userPreferences: { pref: 1 },
                            documentsRequiringAgreement: ['TOS']
                        }))
                    };
                    componentUnderTest = new login_component_1.LoginComponent(mockAuthentication, mockRouter, mockCurrentUserService, mockUserService, mockPendo, mockDialog, mockFeatureStore, mockStore);
                });
                it('Calls the API form the terms content to pass to the dialog', function () {
                    componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                    expect(mockUserService.downloadActiveTosDocument).toHaveBeenCalled();
                });
                it('Shows the dialog with terms when the API returns the terms content', function () {
                    componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                    expect(mockDialog.openComponentInDialog).toHaveBeenCalledWith({
                        componentType: wz_terms_component_1.WzTermsComponent,
                        inputOptions: {
                            terms: 'SOME TEST TERMS',
                            btnLabel: 'LOGIN.AGREE_TO_TOS',
                            header: 'LOGIN.TOS_TITLE'
                        }
                    });
                });
                it('Sends a request to the API when the user has agreed to the terms', function () {
                    componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                    expect(mockUserService.agreeUserToTerms).toHaveBeenCalled();
                });
            });
            describe('redirectUserAppropriately()', function () {
                it('dispatches a followRedirect action', function () {
                    var spy = mockStore.createActionFactoryMethod('router', 'followRedirect');
                    componentUnderTest.onSubmit({ 'userId': 'james', 'password': 'testPassword' });
                    mockStore.expectDispatchFor(spy);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50Lytsb2dpbi9sb2dpbi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3QyxxREFBbUQ7QUFDbkQsMEZBQXVGO0FBQ3ZGLDBFQUF1RTtBQUV2RTtJQUNFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLGtCQUF1QixDQUFDO1FBQzVCLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksc0JBQTJCLENBQUM7UUFDaEMsSUFBSSxlQUFvQixDQUFDO1FBQ3pCLElBQUksU0FBYyxDQUFDO1FBQ25CLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksZ0JBQXFCLENBQUM7UUFDMUIsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksa0JBQWtDLENBQUM7UUFFdkMsVUFBVSxDQUFDO1lBQ1Qsa0JBQWtCLEdBQUc7Z0JBQ25CLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ2hFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRTtvQkFDMUYsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDOUIsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtvQkFDNUIsWUFBWSxFQUFFO3dCQUNaLGlCQUFpQixFQUFFLGtDQUFrQzt3QkFDckQsMkJBQTJCLEVBQUUsS0FBSzt3QkFDbEMsbUJBQW1CLEVBQUUsS0FBSztxQkFDM0I7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0osQ0FBQztZQUVGLFVBQVUsR0FBRztnQkFDWCxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO2dCQUNqRCxXQUFXLEVBQUU7b0JBQ1gsUUFBUSxFQUFFO3dCQUNSLEdBQUcsRUFBRSxhQUFhO3FCQUNuQjtpQkFDRjthQUNGLENBQUM7WUFFRixzQkFBc0IsR0FBRztnQkFDdkIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUM3QixnQkFBZ0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDO2FBQ3hELENBQUM7WUFFRixlQUFlLEdBQUc7Z0JBQ2hCLHlCQUF5QixFQUN2QixPQUFPLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNsRyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDO2dCQUN2RCxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7YUFDeEcsQ0FBQztZQUVGLFNBQVMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7WUFFNUQsVUFBVSxHQUFHO2dCQUNYLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDakMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDckcsQ0FBQztZQUVGLGdCQUFnQixHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7WUFFaEgsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4RyxTQUFTLENBQUMseUJBQXlCLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRXhELGtCQUFrQixHQUFHLElBQUksZ0NBQWMsQ0FDckMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixFQUFFLGVBQWUsRUFDdkUsU0FBUyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQ25ELENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckIsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO2dCQUNuRSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO2dCQUM1QyxVQUFVLEdBQUc7b0JBQ1gsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFFLGFBQWEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztvQkFDakQsV0FBVyxFQUFFO3dCQUNYLFFBQVEsRUFBRTs0QkFDUixHQUFHLEVBQUUsMEJBQTBCO3lCQUNoQztxQkFDRjtpQkFDRixDQUFDO2dCQUNGLGtCQUFrQixHQUFHLElBQUksZ0NBQWMsQ0FDckMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixFQUFFLGVBQWUsRUFDdkUsU0FBUyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQ25ELENBQUM7Z0JBQ0Ysa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUNyQixVQUFVLENBQUM7Z0JBQ1QsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDZCQUE2QixFQUFFO2dCQUNoQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQzVHLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO2dCQUMvQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQ3JELEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDeEcsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUU7Z0JBQzdDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBQy9FLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsb0JBQW9CLENBQy9DLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxRixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxvRUFBb0UsRUFBRTtnQkFDdkUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDL0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO29CQUNoRCxpQkFBaUIsRUFBRSxrQ0FBa0M7b0JBQ3JELDJCQUEyQixFQUFFLEtBQUs7b0JBQ2xDLG1CQUFtQixFQUFFLEtBQUs7aUJBQzNCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDZFQUE2RSxFQUFFO2dCQUNoRixrQkFBa0IsR0FBRztvQkFDbkIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQzt3QkFDaEUsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFO3dCQUMxRixLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO3dCQUM5QixlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO3FCQUM3QixDQUFDLENBQUM7aUJBQ0osQ0FBQztnQkFDRixrQkFBa0IsR0FBRyxJQUFJLGdDQUFjLENBQ3JDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQ3ZFLFNBQVMsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUNuRCxDQUFDO2dCQUNGLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBQy9FLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDN0IsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO29CQUMzRCxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUMvRSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxNQUFNLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRyxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsOERBQThELEVBQUU7b0JBQ2pFLGVBQWUsR0FBRzt3QkFDaEIseUJBQXlCLEVBQ3ZCLE9BQU8sQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQ2xHLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUM7d0JBQ3ZELFVBQVUsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2xGLENBQUM7b0JBQ0Ysa0JBQWtCLEdBQUcsSUFBSSxnQ0FBYyxDQUNyQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUN2RSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsQ0FDbkQsQ0FBQztvQkFDRixrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUMvRSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3RELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN6RSxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUU7b0JBQzFCLGtCQUFrQixHQUFHO3dCQUNuQixNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDOzRCQUNoRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOzRCQUM1RSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFOzRCQUM5QixlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzRCQUM1QixZQUFZLEVBQUU7Z0NBQ1osaUJBQWlCLEVBQUUsa0NBQWtDO2dDQUNyRCwyQkFBMkIsRUFBRSxLQUFLO2dDQUNsQyxtQkFBbUIsRUFBRSxLQUFLOzZCQUMzQjt5QkFDRixDQUFDLENBQUM7cUJBQ0osQ0FBQztvQkFDRixrQkFBa0IsR0FBRyxJQUFJLGdDQUFjLENBQ3JDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQ3ZFLFNBQVMsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUNuRCxDQUFDO29CQUNGLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQy9FLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQzFELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN6RSxDQUFDLENBQUMsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsVUFBVSxDQUFDO29CQUNULGtCQUFrQixHQUFHO3dCQUNuQixNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUNqRCx1QkFBVSxDQUFDLEVBQUUsQ0FBQzs0QkFDWixJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUU7NEJBQzFGLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7NEJBQzlCLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7NEJBQzVCLDJCQUEyQixFQUFFLENBQUMsS0FBSyxDQUFDO3lCQUNyQyxDQUFDLENBQUM7cUJBQ04sQ0FBQztvQkFDRixrQkFBa0IsR0FBRyxJQUFJLGdDQUFjLENBQ3JDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQ3ZFLFNBQVMsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUNuRCxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyw0REFBNEQsRUFBRTtvQkFFL0Qsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDL0UsTUFBTSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3ZFLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxvRUFBb0UsRUFBRTtvQkFFdkUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDL0UsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO3dCQUM1RCxhQUFhLEVBQUUscUNBQWdCO3dCQUMvQixZQUFZLEVBQUU7NEJBQ1osS0FBSyxFQUFFLGlCQUFpQjs0QkFDeEIsUUFBUSxFQUFFLG9CQUFvQjs0QkFDOUIsTUFBTSxFQUFFLGlCQUFpQjt5QkFDMUI7cUJBQ0YsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRTtvQkFFckUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDL0UsTUFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsNkJBQTZCLEVBQUU7Z0JBQ3RDLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRTtvQkFDdkMsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUU1RSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUUvRSxTQUFTLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhQRCxvQkFnUEMiLCJmaWxlIjoiYXBwLyt1c2VyLW1hbmFnZW1lbnQvK2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vbG9naW4uY29tcG9uZW50JztcbmltcG9ydCB7IFd6VGVybXNDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy93ei10ZXJtcy93ei50ZXJtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdMb2dpbiBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IG1vY2tBdXRoZW50aWNhdGlvbjogYW55O1xuICAgIGxldCBtb2NrUm91dGVyOiBhbnk7XG4gICAgbGV0IG1vY2tDdXJyZW50VXNlclNlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja1VzZXJTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tQZW5kbzogYW55O1xuICAgIGxldCBtb2NrRGlhbG9nOiBhbnk7XG4gICAgbGV0IG1vY2tGZWF0dXJlU3RvcmU6IGFueTtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IGNvbXBvbmVudFVuZGVyVGVzdDogTG9naW5Db21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tBdXRoZW50aWNhdGlvbiA9IHtcbiAgICAgICAgY3JlYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnY3JlYXRlJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe1xuICAgICAgICAgIHVzZXI6IHsgZmlyc3ROYW1lOiAnamFtZXMnLCBsYXN0TmFtZTogJ2JpbGxpbmdzJywgc2l0ZU5hbWU6ICdjb3JlJywgaWQ6IDEwLCBhY2NvdW50SWQ6IDEgfSxcbiAgICAgICAgICB0b2tlbjogeyB0b2tlbjogJ2xvZ2luVG9rZW4nIH0sXG4gICAgICAgICAgdXNlclByZWZlcmVuY2VzOiB7IHByZWY6IDEgfSxcbiAgICAgICAgICBzaXRlRmVhdHVyZXM6IHtcbiAgICAgICAgICAgICdzdHJpcGVQdWJsaWNLZXknOiAncGtfdGVzdF9FVGNyZUthMUJMZ2pHYng1MUk3TjNjRWonLFxuICAgICAgICAgICAgJ2Rpc2FibGVDb21tZXJjZUFncmVlbWVudHMnOiBmYWxzZSxcbiAgICAgICAgICAgICdkaXNhYmxlQ2FydEFjY2Vzcyc6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tSb3V0ZXIgPSB7XG4gICAgICAgIG5hdmlnYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnbmF2aWdhdGUnKS5hbmQucmV0dXJuVmFsdWUoUHJvbWlzZS5yZXNvbHZlKCkpLFxuICAgICAgICBuYXZpZ2F0ZUJ5VXJsOiBqYXNtaW5lLmNyZWF0ZVNweSgnbmF2aWdhdGVCeVVybCcpLFxuICAgICAgICByb3V0ZXJTdGF0ZToge1xuICAgICAgICAgIHNuYXBzaG90OiB7XG4gICAgICAgICAgICB1cmw6ICcvdXNlci9sb2dpbidcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7XG4gICAgICAgIHNldDogamFzbWluZS5jcmVhdGVTcHkoJ3NldCcpLFxuICAgICAgICBhZGRBY2NvdW50VG9Vc2VyOiBqYXNtaW5lLmNyZWF0ZVNweSgnYWRkQWNjb3VudFRvVXNlcicpXG4gICAgICB9O1xuXG4gICAgICBtb2NrVXNlclNlcnZpY2UgPSB7XG4gICAgICAgIGRvd25sb2FkQWN0aXZlVG9zRG9jdW1lbnQ6XG4gICAgICAgICAgamFzbWluZS5jcmVhdGVTcHkoJ2Rvd25sb2FkQWN0aXZlVG9zRG9jdW1lbnQnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZignU09NRSBURVNUIFRFUk1TJykpLFxuICAgICAgICBhZ3JlZVVzZXJUb1Rlcm1zOiBqYXNtaW5lLmNyZWF0ZVNweSgnYWdyZWVVc2VyVG9UZXJtcycpLFxuICAgICAgICBnZXRBY2NvdW50OiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0QWNjb3VudCcpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHsgYWNjb3VudDogJ3NvbWUgYWNjb3VudCcgfSkpXG4gICAgICB9O1xuXG4gICAgICBtb2NrUGVuZG8gPSB7IGluaXRpYWxpemU6IGphc21pbmUuY3JlYXRlU3B5KCdpbml0aWFsaXplJykgfTtcblxuICAgICAgbW9ja0RpYWxvZyA9IHtcbiAgICAgICAgY2xvc2U6IGphc21pbmUuY3JlYXRlU3B5KCdjbG9zZScpLFxuICAgICAgICBvcGVuQ29tcG9uZW50SW5EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuQ29tcG9uZW50SW5EaWFsb2cnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7fSkpXG4gICAgICB9O1xuXG4gICAgICBtb2NrRmVhdHVyZVN0b3JlID0geyBzZXQ6IGphc21pbmUuY3JlYXRlU3B5KCdzZXQnKSwgc2V0SW5Mb2NhbFN0b3JhZ2U6IGphc21pbmUuY3JlYXRlU3B5KCdzZXRJbkxvY2FsU3RvcmFnZScpIH07XG5cbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywgeyBjb21wb25lbnRzOiB7IGxvZ2luOiB7IGNvbmZpZzogeyBzb21lQ29uZmlnOiAndGVzdCcgfSB9IH0gfSk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgndWlDb25maWcnLCAnbG9hZCcpO1xuXG4gICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgTG9naW5Db21wb25lbnQoXG4gICAgICAgIG1vY2tBdXRoZW50aWNhdGlvbiwgbW9ja1JvdXRlciwgbW9ja0N1cnJlbnRVc2VyU2VydmljZSwgbW9ja1VzZXJTZXJ2aWNlLFxuICAgICAgICBtb2NrUGVuZG8sIG1vY2tEaWFsb2csIG1vY2tGZWF0dXJlU3RvcmUsIG1vY2tTdG9yZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ0dyYWJzIHRoZSBjb21wb25lbnQgY29uZmlnIGFuZCBhc3NpZ25zIHRvIGFuIGluc3RhbmNlIHZhcmlhYmxlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb25maWcpLnRvRXF1YWwoeyBzb21lQ29uZmlnOiAndGVzdCcgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBkaXNwbGF5IGEgbWVzc2FnZSBmb3IgYSBuZXcgdXNlcicsICgpID0+IHtcbiAgICAgICAgbW9ja1JvdXRlciA9IHtcbiAgICAgICAgICBuYXZpZ2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ25hdmlnYXRlJykuYW5kLnJldHVyblZhbHVlKFByb21pc2UucmVzb2x2ZSgpKSxcbiAgICAgICAgICBuYXZpZ2F0ZUJ5VXJsOiBqYXNtaW5lLmNyZWF0ZVNweSgnbmF2aWdhdGVCeVVybCcpLFxuICAgICAgICAgIHJvdXRlclN0YXRlOiB7XG4gICAgICAgICAgICBzbmFwc2hvdDoge1xuICAgICAgICAgICAgICB1cmw6ICcvdXNlci9sb2dpbjtuZXdVc2VyPXRydWUnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgTG9naW5Db21wb25lbnQoXG4gICAgICAgICAgbW9ja0F1dGhlbnRpY2F0aW9uLCBtb2NrUm91dGVyLCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrVXNlclNlcnZpY2UsXG4gICAgICAgICAgbW9ja1BlbmRvLCBtb2NrRGlhbG9nLCBtb2NrRmVhdHVyZVN0b3JlLCBtb2NrU3RvcmVcbiAgICAgICAgKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZGlzcGxheVdlbGNvbWVNZXNzYWdlKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TdWJtaXQoKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncm91dGVyJywgJ2ZvbGxvd1JlZGlyZWN0Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1N1Ym1pdHMgYSBuZXcgbG9naW4gcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgJ3VzZXJJZCc6ICdqYW1lcycsICdwYXNzd29yZCc6ICd0ZXN0UGFzc3dvcmQnIH0pO1xuICAgICAgICBleHBlY3QobW9ja0F1dGhlbnRpY2F0aW9uLmNyZWF0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyAndXNlcklkJzogJ2phbWVzJywgJ3Bhc3N3b3JkJzogJ3Rlc3RQYXNzd29yZCcgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1NldHMgYSBuZXcgdXNlciBhbmQgYXV0aCB0b2tlbiBvbiByZXNwb25zZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgJ3VzZXJJZCc6ICdqYW1lcycsICdwYXNzd29yZCc6ICd0ZXN0UGFzc3dvcmQnIH0pO1xuICAgICAgICBleHBlY3QobW9ja0N1cnJlbnRVc2VyU2VydmljZS5zZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIHsgZmlyc3ROYW1lOiAnamFtZXMnLCBsYXN0TmFtZTogJ2JpbGxpbmdzJywgc2l0ZU5hbWU6ICdjb3JlJywgaWQ6IDEwLCBhY2NvdW50SWQ6IDEgfSwgJ2xvZ2luVG9rZW4nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnSW5pdGlhbGl6ZXMgcGVuZG8gd2l0aCB0aGUgdXNlciByZXNwb25zZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgJ3VzZXJJZCc6ICdqYW1lcycsICdwYXNzd29yZCc6ICd0ZXN0UGFzc3dvcmQnIH0pO1xuICAgICAgICBleHBlY3QobW9ja1BlbmRvLmluaXRpYWxpemUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIHsgZmlyc3ROYW1lOiAnamFtZXMnLCBsYXN0TmFtZTogJ2JpbGxpbmdzJywgc2l0ZU5hbWU6ICdjb3JlJywgaWQ6IDEwLCBhY2NvdW50SWQ6IDEgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ0NhbGxzIHRoZSBmZWF0dXJlIHN0b3JlIGlmIHRoZSBsb2dpbiByZXNwb25zZSBoYXMgYSBmZWF0dXJlIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgJ3VzZXJJZCc6ICdqYW1lcycsICdwYXNzd29yZCc6ICd0ZXN0UGFzc3dvcmQnIH0pO1xuICAgICAgICBleHBlY3QobW9ja0ZlYXR1cmVTdG9yZS5zZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICAnc3RyaXBlUHVibGljS2V5JzogJ3BrX3Rlc3RfRVRjcmVLYTFCTGdqR2J4NTFJN04zY0VqJyxcbiAgICAgICAgICAnZGlzYWJsZUNvbW1lcmNlQWdyZWVtZW50cyc6IGZhbHNlLFxuICAgICAgICAgICdkaXNhYmxlQ2FydEFjY2Vzcyc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdEb2VzIG5vdCBDYWxsIHRoZSBmZWF0dXJlIHN0b3JlIGlmIHRoZSBsb2dpbiByZXNwb25zZSBoYXMgbm8gZmVhdHVyZSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tBdXRoZW50aWNhdGlvbiA9IHtcbiAgICAgICAgICBjcmVhdGU6IGphc21pbmUuY3JlYXRlU3B5KCdjcmVhdGUnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7XG4gICAgICAgICAgICB1c2VyOiB7IGZpcnN0TmFtZTogJ2phbWVzJywgbGFzdE5hbWU6ICdiaWxsaW5ncycsIHNpdGVOYW1lOiAnY29yZScsIGlkOiAxMCwgYWNjb3VudElkOiAxIH0sXG4gICAgICAgICAgICB0b2tlbjogeyB0b2tlbjogJ2xvZ2luVG9rZW4nIH0sXG4gICAgICAgICAgICB1c2VyUHJlZmVyZW5jZXM6IHsgcHJlZjogMSB9XG4gICAgICAgICAgfSkpXG4gICAgICAgIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBMb2dpbkNvbXBvbmVudChcbiAgICAgICAgICBtb2NrQXV0aGVudGljYXRpb24sIG1vY2tSb3V0ZXIsIG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tVc2VyU2VydmljZSxcbiAgICAgICAgICBtb2NrUGVuZG8sIG1vY2tEaWFsb2csIG1vY2tGZWF0dXJlU3RvcmUsIG1vY2tTdG9yZVxuICAgICAgICApO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQoeyAndXNlcklkJzogJ2phbWVzJywgJ3Bhc3N3b3JkJzogJ3Rlc3RQYXNzd29yZCcgfSk7XG4gICAgICAgIGV4cGVjdChtb2NrRmVhdHVyZVN0b3JlLnNldCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnYWRkQWNjb3VudFRvVXNlcigpJywgKCkgPT4ge1xuICAgICAgICBpdChgdXNlciBoYXMgYWNjb3VudElkLCBhbmQgYWNjb3VudCBBUEkgcmV0dXJucyBhbiBhY2NvdW50YCwgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vblN1Ym1pdCh7ICd1c2VySWQnOiAnamFtZXMnLCAncGFzc3dvcmQnOiAndGVzdFBhc3N3b3JkJyB9KTtcbiAgICAgICAgICBleHBlY3QobW9ja1VzZXJTZXJ2aWNlLmdldEFjY291bnQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLmFkZEFjY291bnRUb1VzZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgYWNjb3VudDogJ3NvbWUgYWNjb3VudCcgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KGB1c2VyIGhhcyBhY2NvdW50SWQsIGFuZCBhY2NvdW50IEFQSSByZXR1cm4gYW4gZW1wdHkgcmVzcG9uc2VgLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1VzZXJTZXJ2aWNlID0ge1xuICAgICAgICAgICAgZG93bmxvYWRBY3RpdmVUb3NEb2N1bWVudDpcbiAgICAgICAgICAgICAgamFzbWluZS5jcmVhdGVTcHkoJ2Rvd25sb2FkQWN0aXZlVG9zRG9jdW1lbnQnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZignU09NRSBURVNUIFRFUk1TJykpLFxuICAgICAgICAgICAgYWdyZWVVc2VyVG9UZXJtczogamFzbWluZS5jcmVhdGVTcHkoJ2FncmVlVXNlclRvVGVybXMnKSxcbiAgICAgICAgICAgIGdldEFjY291bnQ6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRBY2NvdW50JykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YoZmFsc2UpKVxuICAgICAgICAgIH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IExvZ2luQ29tcG9uZW50KFxuICAgICAgICAgICAgbW9ja0F1dGhlbnRpY2F0aW9uLCBtb2NrUm91dGVyLCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrVXNlclNlcnZpY2UsXG4gICAgICAgICAgICBtb2NrUGVuZG8sIG1vY2tEaWFsb2csIG1vY2tGZWF0dXJlU3RvcmUsIG1vY2tTdG9yZVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgJ3VzZXJJZCc6ICdqYW1lcycsICdwYXNzd29yZCc6ICd0ZXN0UGFzc3dvcmQnIH0pO1xuICAgICAgICAgIGV4cGVjdChtb2NrVXNlclNlcnZpY2UuZ2V0QWNjb3VudCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLmFkZEFjY291bnRUb1VzZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KGB1c2VyIGhhcyBubyBhY2NvdW50SWRgLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0F1dGhlbnRpY2F0aW9uID0ge1xuICAgICAgICAgICAgY3JlYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnY3JlYXRlJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe1xuICAgICAgICAgICAgICB1c2VyOiB7IGZpcnN0TmFtZTogJ2phbWVzJywgbGFzdE5hbWU6ICdiaWxsaW5ncycsIHNpdGVOYW1lOiAnY29yZScsIGlkOiAxMCB9LFxuICAgICAgICAgICAgICB0b2tlbjogeyB0b2tlbjogJ2xvZ2luVG9rZW4nIH0sXG4gICAgICAgICAgICAgIHVzZXJQcmVmZXJlbmNlczogeyBwcmVmOiAxIH0sXG4gICAgICAgICAgICAgIHNpdGVGZWF0dXJlczoge1xuICAgICAgICAgICAgICAgICdzdHJpcGVQdWJsaWNLZXknOiAncGtfdGVzdF9FVGNyZUthMUJMZ2pHYng1MUk3TjNjRWonLFxuICAgICAgICAgICAgICAgICdkaXNhYmxlQ29tbWVyY2VBZ3JlZW1lbnRzJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ2Rpc2FibGVDYXJ0QWNjZXNzJzogZmFsc2VcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgTG9naW5Db21wb25lbnQoXG4gICAgICAgICAgICBtb2NrQXV0aGVudGljYXRpb24sIG1vY2tSb3V0ZXIsIG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tVc2VyU2VydmljZSxcbiAgICAgICAgICAgIG1vY2tQZW5kbywgbW9ja0RpYWxvZywgbW9ja0ZlYXR1cmVTdG9yZSwgbW9ja1N0b3JlXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQoeyAndXNlcklkJzogJ2phbWVzJywgJ3Bhc3N3b3JkJzogJ3Rlc3RQYXNzd29yZCcgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tVc2VyU2VydmljZS5nZXRBY2NvdW50KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLmFkZEFjY291bnRUb1VzZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3Nob3dUZXJtcygpJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBtb2NrQXV0aGVudGljYXRpb24gPSB7XG4gICAgICAgICAgICBjcmVhdGU6IGphc21pbmUuY3JlYXRlU3B5KCdjcmVhdGUnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgIE9ic2VydmFibGUub2Yoe1xuICAgICAgICAgICAgICAgIHVzZXI6IHsgZmlyc3ROYW1lOiAnamFtZXMnLCBsYXN0TmFtZTogJ2JpbGxpbmdzJywgc2l0ZU5hbWU6ICdjb3JlJywgaWQ6IDEwLCBhY2NvdW50SWQ6IDEgfSxcbiAgICAgICAgICAgICAgICB0b2tlbjogeyB0b2tlbjogJ2xvZ2luVG9rZW4nIH0sXG4gICAgICAgICAgICAgICAgdXNlclByZWZlcmVuY2VzOiB7IHByZWY6IDEgfSxcbiAgICAgICAgICAgICAgICBkb2N1bWVudHNSZXF1aXJpbmdBZ3JlZW1lbnQ6IFsnVE9TJ11cbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgTG9naW5Db21wb25lbnQoXG4gICAgICAgICAgICBtb2NrQXV0aGVudGljYXRpb24sIG1vY2tSb3V0ZXIsIG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tVc2VyU2VydmljZSxcbiAgICAgICAgICAgIG1vY2tQZW5kbywgbW9ja0RpYWxvZywgbW9ja0ZlYXR1cmVTdG9yZSwgbW9ja1N0b3JlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ0NhbGxzIHRoZSBBUEkgZm9ybSB0aGUgdGVybXMgY29udGVudCB0byBwYXNzIHRvIHRoZSBkaWFsb2cnLCAoKSA9PiB7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQoeyAndXNlcklkJzogJ2phbWVzJywgJ3Bhc3N3b3JkJzogJ3Rlc3RQYXNzd29yZCcgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tVc2VyU2VydmljZS5kb3dubG9hZEFjdGl2ZVRvc0RvY3VtZW50KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdTaG93cyB0aGUgZGlhbG9nIHdpdGggdGVybXMgd2hlbiB0aGUgQVBJIHJldHVybnMgdGhlIHRlcm1zIGNvbnRlbnQnLCAoKSA9PiB7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQoeyAndXNlcklkJzogJ2phbWVzJywgJ3Bhc3N3b3JkJzogJ3Rlc3RQYXNzd29yZCcgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2cub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiBXelRlcm1zQ29tcG9uZW50LFxuICAgICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICAgIHRlcm1zOiAnU09NRSBURVNUIFRFUk1TJyxcbiAgICAgICAgICAgICAgYnRuTGFiZWw6ICdMT0dJTi5BR1JFRV9UT19UT1MnLFxuICAgICAgICAgICAgICBoZWFkZXI6ICdMT0dJTi5UT1NfVElUTEUnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdTZW5kcyBhIHJlcXVlc3QgdG8gdGhlIEFQSSB3aGVuIHRoZSB1c2VyIGhhcyBhZ3JlZWQgdG8gdGhlIHRlcm1zJywgKCkgPT4ge1xuXG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU3VibWl0KHsgJ3VzZXJJZCc6ICdqYW1lcycsICdwYXNzd29yZCc6ICd0ZXN0UGFzc3dvcmQnIH0pO1xuICAgICAgICAgIGV4cGVjdChtb2NrVXNlclNlcnZpY2UuYWdyZWVVc2VyVG9UZXJtcykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmVkaXJlY3RVc2VyQXBwcm9wcmlhdGVseSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnZGlzcGF0Y2hlcyBhIGZvbGxvd1JlZGlyZWN0IGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncm91dGVyJywgJ2ZvbGxvd1JlZGlyZWN0Jyk7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25TdWJtaXQoeyAndXNlcklkJzogJ2phbWVzJywgJ3Bhc3N3b3JkJzogJ3Rlc3RQYXNzd29yZCcgfSk7XG5cbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3Ioc3B5KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=
