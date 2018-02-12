"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_effects_1 = require("./router.effects");
var RouterActions = require("./router.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
var index_1 = require("../../shared/modules/wazee-frame-formatter/index");
function main() {
    describe('Router Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        var mockRouter;
        var mockLocation;
        var localStorageSetSpy;
        var localStorageGetSpy;
        var localStorageRemoveSpy;
        var mockCurrentPath;
        beforeEach(function () {
            mockRouter = {
                navigate: jasmine.createSpy('navigate'),
                navigateByUrl: jasmine.createSpy('navigateByUrl'),
                routerState: { snapshot: { url: '' } }
            };
            mockLocation = {
                path: function () { return mockCurrentPath; },
                go: jasmine.createSpy('go')
            };
            localStorageSetSpy = spyOn(localStorage, 'setItem').and.stub();
            localStorageGetSpy = spyOn(localStorage, 'getItem').and.returnValue('SOME URL');
            localStorageRemoveSpy = spyOn(localStorage, 'removeItem').and.stub();
        });
        function instantiator() {
            return new router_effects_1.RouterEffects(effectsSpecHelper.mockNgrxEffectsActions, mockRouter, mockLocation);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToLogin',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToLogin.Type
            },
            customTests: [
                {
                    it: 'navigates to /user/login',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/user/login']);
                    }
                }
            ]
        });
        describe('goToLoginWithRedirect', function () {
            describe('from any path except /user/login', function () {
                beforeEach(function () {
                    mockCurrentPath = 'SOME URL';
                });
                effectsSpecHelper.generateTestsFor({
                    effectName: 'goToLoginWithRedirect',
                    effectsInstantiator: instantiator,
                    inputAction: {
                        type: RouterActions.GoToLoginWithRedirect.Type
                    },
                    customTests: [
                        {
                            it: 'stores the current location in local storage',
                            expectation: function () {
                                expect(localStorageSetSpy).toHaveBeenCalledWith('RouterEffects.RedirectUrl', 'SOME URL');
                            }
                        },
                        {
                            it: 'navigates to /user/login',
                            expectation: function () {
                                expect(mockRouter.navigate).toHaveBeenCalledWith(['/user/login', { requireLogin: true }]);
                            }
                        }
                    ]
                });
            });
            describe('from any path containing url params except /user/login;withparams=param', function () {
                beforeEach(function () {
                    mockCurrentPath = 'rooturl/collections/123;i=1;n=100';
                });
                effectsSpecHelper.generateTestsFor({
                    effectName: 'goToLoginWithRedirect',
                    effectsInstantiator: instantiator,
                    inputAction: {
                        type: RouterActions.GoToLoginWithRedirect.Type
                    },
                    customTests: [
                        {
                            it: 'stores the current location in local storage',
                            expectation: function () {
                                expect(localStorageSetSpy).toHaveBeenCalledWith('RouterEffects.RedirectUrl', 'rooturl/collections/123;i=1;n=100');
                            }
                        },
                        {
                            it: 'navigates to /user/login',
                            expectation: function () {
                                expect(mockRouter.navigate).toHaveBeenCalledWith(['/user/login', { requireLogin: true }]);
                            }
                        }
                    ]
                });
            });
            describe('from /user/login', function () {
                beforeEach(function () {
                    mockCurrentPath = '/user/login';
                });
                effectsSpecHelper.generateTestsFor({
                    effectName: 'goToLoginWithRedirect',
                    effectsInstantiator: instantiator,
                    inputAction: {
                        type: RouterActions.GoToLoginWithRedirect.Type
                    },
                    customTests: [
                        {
                            it: 'doesn\'t navigate to /user/login',
                            expectation: function () {
                                expect(mockRouter.navigate).not.toHaveBeenCalled();
                            }
                        }
                    ]
                });
            });
            describe('from /user/login with query params', function () {
                beforeEach(function () {
                    mockCurrentPath = '/user/login;requireLogin=true';
                });
                effectsSpecHelper.generateTestsFor({
                    effectName: 'goToLoginWithRedirect',
                    effectsInstantiator: instantiator,
                    inputAction: {
                        type: RouterActions.GoToLoginWithRedirect.Type
                    },
                    customTests: [
                        {
                            it: 'doesn\'t navigate to /user/login',
                            expectation: function () {
                                expect(mockRouter.navigate).not.toHaveBeenCalled();
                            }
                        }
                    ]
                });
            });
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToSearchAssetDetails',
            comment: 'without markers',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToSearchAssetDetails.Type,
                assetId: 47,
                markers: undefined
            },
            customTests: [
                {
                    it: 'navigates to /search/asset/:assetId',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/search/asset', 47, {}]);
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToSearchAssetDetails',
            comment: 'with markers',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToSearchAssetDetails.Type,
                assetId: 47,
                markers: { in: new index_1.Frame(30).setFromFrameNumber(30), out: new index_1.Frame(30).setFromFrameNumber(60) }
            },
            customTests: [
                {
                    it: 'navigates to /search/asset/:assetId;timeStart=<milliseconds>;timeEnd=<milliseconds>',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/search/asset', 47, { timeStart: 1000, timeEnd: 2000 }]);
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToPageNotFound',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToPageNotFound.Type
            },
            customTests: [
                {
                    it: 'navigates to /error/404',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/404']);
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'followRedirect',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.FollowRedirect.Type
            },
            customTests: [
                {
                    it: 'navigates to the redirect url if it is set',
                    expectation: function () {
                        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('SOME URL');
                    }
                },
                {
                    it: 'removes the redirect url from local storage if it is set',
                    expectation: function () {
                        expect(localStorageRemoveSpy).toHaveBeenCalledWith('RouterEffects.RedirectUrl');
                    }
                },
                {
                    it: "navigates to '/' if the redirect url is not set",
                    beforeInstantiation: function () {
                        localStorageGetSpy.and.returnValue(null);
                    },
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
                    }
                },
                {
                    it: 'doesn\'t remove the redirect url from local storage if it is not set',
                    beforeInstantiation: function () {
                        localStorageGetSpy.and.returnValue(null);
                    },
                    expectation: function () {
                        expect(localStorageRemoveSpy).not.toHaveBeenCalled();
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToQuotes',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToQuotes.Type
            },
            customTests: [
                {
                    it: 'navigates to /quotes',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/quotes']);
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToCollection',
            comment: 'without i and n being set',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToCollection.Type,
                collectionId: 1,
            },
            customTests: [
                {
                    it: 'navigates to /collections/:collectionId',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/collections', 1, { i: undefined, n: undefined }]);
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToCollection',
            comment: 'with custom i and n set',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToCollection.Type,
                collectionId: 1,
                page: 5,
                perPage: 55
            },
            customTests: [
                {
                    it: 'navigates to /collection/:collectionId;i=<page>;n=<perPage>',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/collections', 1, { i: 5, n: 55 }]);
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToActiveQuote',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToActiveQuote.Type
            },
            customTests: [
                {
                    it: 'navigates to /active-quote',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/active-quote']);
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToCart',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToCart.Type
            },
            customTests: [
                {
                    it: 'navigates to /cart',
                    expectation: function () {
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['/cart']);
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'addMarkersToUrl',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.AddMarkersToUrl.Type,
                assetId: 100,
                timeStart: 1000,
                timeEnd: 2000
            },
            customTests: [
                {
                    it: 'calls location.go() with the asset id and updated markers',
                    expectation: function () {
                        expect(mockLocation.go).toHaveBeenCalledWith('/search/asset/100;timeStart=1000;timeEnd=2000');
                    }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToBadRequest',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToBadRequest.Type
            },
            customTests: [
                {
                    it: 'calls navigate() on the router with the bad request path',
                    expectation: function () { return expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/400']); }
                }
            ]
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'goToServerError',
            effectsInstantiator: instantiator,
            inputAction: {
                type: RouterActions.GoToServerError.Type
            },
            customTests: [
                {
                    it: 'calls navigate() on the router with the server error request path',
                    expectation: function () { return expect(mockRouter.navigate).toHaveBeenCalledWith(['/error/500']); }
                }
            ]
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9yb3V0ZXIvcm91dGVyLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG1EQUFpRDtBQUNqRCxnREFBa0Q7QUFDbEQsMkVBQXdFO0FBQ3hFLDBFQUF5RTtBQUV6RTtJQUNFLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixJQUFNLGlCQUFpQixHQUFzQixJQUFJLHVDQUFpQixFQUFFLENBQUM7UUFDckUsSUFBSSxVQUFlLENBQUM7UUFDcEIsSUFBSSxZQUFpQixDQUFDO1FBQ3RCLElBQUksa0JBQStCLENBQUM7UUFDcEMsSUFBSSxrQkFBK0IsQ0FBQztRQUNwQyxJQUFJLHFCQUFrQyxDQUFDO1FBQ3ZDLElBQUksZUFBdUIsQ0FBQztRQUU1QixVQUFVLENBQUM7WUFDVCxVQUFVLEdBQUc7Z0JBQ1gsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7Z0JBQ2pELFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTthQUN2QyxDQUFDO1lBRUYsWUFBWSxHQUFHO2dCQUNiLElBQUksRUFBRSxjQUFNLE9BQUEsZUFBZSxFQUFmLENBQWU7Z0JBQzNCLEVBQUUsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzthQUM1QixDQUFDO1lBRUYsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0Qsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hGLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUks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O2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsaUJBQWlCO1lBQzdCLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUk7YUFDekM7WUFDRCxXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsRUFBRSxFQUFFLG1FQUFtRTtvQkFDdkUsV0FBVyxFQUFFLGNBQU0sT0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBaEUsQ0FBZ0U7aUJBQ3BGO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6WEQsb0JBeVhDIiwiZmlsZSI6ImFwcC9zdG9yZS9yb3V0ZXIvcm91dGVyLmVmZmVjdHMuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5pbXBvcnQgeyBSb3V0ZXJFZmZlY3RzIH0gZnJvbSAnLi9yb3V0ZXIuZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyBSb3V0ZXJBY3Rpb25zIGZyb20gJy4vcm91dGVyLmFjdGlvbnMnO1xuaW1wb3J0IHsgRWZmZWN0c1NwZWNIZWxwZXIgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvZWZmZWN0cy5zcGVjLWhlbHBlcic7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2R1bGVzL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUm91dGVyIEVmZmVjdHMnLCAoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0c1NwZWNIZWxwZXI6IEVmZmVjdHNTcGVjSGVscGVyID0gbmV3IEVmZmVjdHNTcGVjSGVscGVyKCk7XG4gICAgbGV0IG1vY2tSb3V0ZXI6IGFueTtcbiAgICBsZXQgbW9ja0xvY2F0aW9uOiBhbnk7XG4gICAgbGV0IGxvY2FsU3RvcmFnZVNldFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IGxvY2FsU3RvcmFnZUdldFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IGxvY2FsU3RvcmFnZVJlbW92ZVNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IG1vY2tDdXJyZW50UGF0aDogc3RyaW5nO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrUm91dGVyID0ge1xuICAgICAgICBuYXZpZ2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ25hdmlnYXRlJyksXG4gICAgICAgIG5hdmlnYXRlQnlVcmw6IGphc21pbmUuY3JlYXRlU3B5KCduYXZpZ2F0ZUJ5VXJsJyksXG4gICAgICAgIHJvdXRlclN0YXRlOiB7IHNuYXBzaG90OiB7IHVybDogJycgfSB9XG4gICAgICB9O1xuXG4gICAgICBtb2NrTG9jYXRpb24gPSB7XG4gICAgICAgIHBhdGg6ICgpID0+IG1vY2tDdXJyZW50UGF0aCxcbiAgICAgICAgZ286IGphc21pbmUuY3JlYXRlU3B5KCdnbycpXG4gICAgICB9O1xuXG4gICAgICBsb2NhbFN0b3JhZ2VTZXRTcHkgPSBzcHlPbihsb2NhbFN0b3JhZ2UsICdzZXRJdGVtJykuYW5kLnN0dWIoKTtcbiAgICAgIGxvY2FsU3RvcmFnZUdldFNweSA9IHNweU9uKGxvY2FsU3RvcmFnZSwgJ2dldEl0ZW0nKS5hbmQucmV0dXJuVmFsdWUoJ1NPTUUgVVJMJyk7XG4gICAgICBsb2NhbFN0b3JhZ2VSZW1vdmVTcHkgPSBzcHlPbihsb2NhbFN0b3JhZ2UsICdyZW1vdmVJdGVtJykuYW5kLnN0dWIoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGluc3RhbnRpYXRvcigpOiBhbnkge1xuICAgICAgcmV0dXJuIG5ldyBSb3V0ZXJFZmZlY3RzKGVmZmVjdHNTcGVjSGVscGVyLm1vY2tOZ3J4RWZmZWN0c0FjdGlvbnMsIG1vY2tSb3V0ZXIsIG1vY2tMb2NhdGlvbik7XG4gICAgfVxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZ29Ub0xvZ2luJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFJvdXRlckFjdGlvbnMuR29Ub0xvZ2luLlR5cGVcbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICduYXZpZ2F0ZXMgdG8gL3VzZXIvbG9naW4nLFxuICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoWycvdXNlci9sb2dpbiddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnb1RvTG9naW5XaXRoUmVkaXJlY3QnLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnZnJvbSBhbnkgcGF0aCBleGNlcHQgL3VzZXIvbG9naW4nLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIG1vY2tDdXJyZW50UGF0aCA9ICdTT01FIFVSTCc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgICAgIGVmZmVjdE5hbWU6ICdnb1RvTG9naW5XaXRoUmVkaXJlY3QnLFxuICAgICAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICAgICAgdHlwZTogUm91dGVyQWN0aW9ucy5Hb1RvTG9naW5XaXRoUmVkaXJlY3QuVHlwZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaXQ6ICdzdG9yZXMgdGhlIGN1cnJlbnQgbG9jYXRpb24gaW4gbG9jYWwgc3RvcmFnZScsXG4gICAgICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGxvY2FsU3RvcmFnZVNldFNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ1JvdXRlckVmZmVjdHMuUmVkaXJlY3RVcmwnLCAnU09NRSBVUkwnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaXQ6ICduYXZpZ2F0ZXMgdG8gL3VzZXIvbG9naW4nLFxuICAgICAgICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChtb2NrUm91dGVyLm5hdmlnYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChbJy91c2VyL2xvZ2luJywgeyByZXF1aXJlTG9naW46IHRydWUgfV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZnJvbSBhbnkgcGF0aCBjb250YWluaW5nIHVybCBwYXJhbXMgZXhjZXB0IC91c2VyL2xvZ2luO3dpdGhwYXJhbXM9cGFyYW0nLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIG1vY2tDdXJyZW50UGF0aCA9ICdyb290dXJsL2NvbGxlY3Rpb25zLzEyMztpPTE7bj0xMDAnO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgICAgICBlZmZlY3ROYW1lOiAnZ29Ub0xvZ2luV2l0aFJlZGlyZWN0JyxcbiAgICAgICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgICAgIHR5cGU6IFJvdXRlckFjdGlvbnMuR29Ub0xvZ2luV2l0aFJlZGlyZWN0LlR5cGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGl0OiAnc3RvcmVzIHRoZSBjdXJyZW50IGxvY2F0aW9uIGluIGxvY2FsIHN0b3JhZ2UnLFxuICAgICAgICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChsb2NhbFN0b3JhZ2VTZXRTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdSb3V0ZXJFZmZlY3RzLlJlZGlyZWN0VXJsJywgJ3Jvb3R1cmwvY29sbGVjdGlvbnMvMTIzO2k9MTtuPTEwMCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpdDogJ25hdmlnYXRlcyB0byAvdXNlci9sb2dpbicsXG4gICAgICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnL3VzZXIvbG9naW4nLCB7IHJlcXVpcmVMb2dpbjogdHJ1ZSB9XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdmcm9tIC91c2VyL2xvZ2luJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBtb2NrQ3VycmVudFBhdGggPSAnL3VzZXIvbG9naW4nO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgICAgICBlZmZlY3ROYW1lOiAnZ29Ub0xvZ2luV2l0aFJlZGlyZWN0JyxcbiAgICAgICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgICAgIHR5cGU6IFJvdXRlckFjdGlvbnMuR29Ub0xvZ2luV2l0aFJlZGlyZWN0LlR5cGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGl0OiAnZG9lc25cXCd0IG5hdmlnYXRlIHRvIC91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgZXhwZWN0YXRpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2Zyb20gL3VzZXIvbG9naW4gd2l0aCBxdWVyeSBwYXJhbXMnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIG1vY2tDdXJyZW50UGF0aCA9ICcvdXNlci9sb2dpbjtyZXF1aXJlTG9naW49dHJ1ZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgICAgIGVmZmVjdE5hbWU6ICdnb1RvTG9naW5XaXRoUmVkaXJlY3QnLFxuICAgICAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICAgICAgdHlwZTogUm91dGVyQWN0aW9ucy5Hb1RvTG9naW5XaXRoUmVkaXJlY3QuVHlwZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaXQ6ICdkb2VzblxcJ3QgbmF2aWdhdGUgdG8gL3VzZXIvbG9naW4nLFxuICAgICAgICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChtb2NrUm91dGVyLm5hdmlnYXRlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnb1RvU2VhcmNoQXNzZXREZXRhaWxzJyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRob3V0IG1hcmtlcnMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUm91dGVyQWN0aW9ucy5Hb1RvU2VhcmNoQXNzZXREZXRhaWxzLlR5cGUsXG4gICAgICAgIGFzc2V0SWQ6IDQ3LFxuICAgICAgICBtYXJrZXJzOiB1bmRlZmluZWRcbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICduYXZpZ2F0ZXMgdG8gL3NlYXJjaC9hc3NldC86YXNzZXRJZCcsXG4gICAgICAgICAgZXhwZWN0YXRpb246ICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrUm91dGVyLm5hdmlnYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChbJy9zZWFyY2gvYXNzZXQnLCA0Nywge31dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2dvVG9TZWFyY2hBc3NldERldGFpbHMnLFxuICAgICAgY29tbWVudDogJ3dpdGggbWFya2VycycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBSb3V0ZXJBY3Rpb25zLkdvVG9TZWFyY2hBc3NldERldGFpbHMuVHlwZSxcbiAgICAgICAgYXNzZXRJZDogNDcsXG4gICAgICAgIG1hcmtlcnM6IHsgaW46IG5ldyBGcmFtZSgzMCkuc2V0RnJvbUZyYW1lTnVtYmVyKDMwKSwgb3V0OiBuZXcgRnJhbWUoMzApLnNldEZyb21GcmFtZU51bWJlcig2MCkgfVxuICAgICAgfSxcbiAgICAgIGN1c3RvbVRlc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpdDogJ25hdmlnYXRlcyB0byAvc2VhcmNoL2Fzc2V0Lzphc3NldElkO3RpbWVTdGFydD08bWlsbGlzZWNvbmRzPjt0aW1lRW5kPTxtaWxsaXNlY29uZHM+JyxcbiAgICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnL3NlYXJjaC9hc3NldCcsIDQ3LCB7IHRpbWVTdGFydDogMTAwMCwgdGltZUVuZDogMjAwMCB9XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnb1RvUGFnZU5vdEZvdW5kJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFJvdXRlckFjdGlvbnMuR29Ub1BhZ2VOb3RGb3VuZC5UeXBlXG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnbmF2aWdhdGVzIHRvIC9lcnJvci80MDQnLFxuICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoWycvZXJyb3IvNDA0J10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZm9sbG93UmVkaXJlY3QnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUm91dGVyQWN0aW9ucy5Gb2xsb3dSZWRpcmVjdC5UeXBlXG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnbmF2aWdhdGVzIHRvIHRoZSByZWRpcmVjdCB1cmwgaWYgaXQgaXMgc2V0JyxcbiAgICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGVCeVVybCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ1NPTUUgVVJMJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdyZW1vdmVzIHRoZSByZWRpcmVjdCB1cmwgZnJvbSBsb2NhbCBzdG9yYWdlIGlmIGl0IGlzIHNldCcsXG4gICAgICAgICAgZXhwZWN0YXRpb246ICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChsb2NhbFN0b3JhZ2VSZW1vdmVTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdSb3V0ZXJFZmZlY3RzLlJlZGlyZWN0VXJsJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaXQ6IGBuYXZpZ2F0ZXMgdG8gJy8nIGlmIHRoZSByZWRpcmVjdCB1cmwgaXMgbm90IHNldGAsXG4gICAgICAgICAgYmVmb3JlSW5zdGFudGlhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlR2V0U3B5LmFuZC5yZXR1cm5WYWx1ZShudWxsKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoWycvJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnZG9lc25cXCd0IHJlbW92ZSB0aGUgcmVkaXJlY3QgdXJsIGZyb20gbG9jYWwgc3RvcmFnZSBpZiBpdCBpcyBub3Qgc2V0JyxcbiAgICAgICAgICBiZWZvcmVJbnN0YW50aWF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VHZXRTcHkuYW5kLnJldHVyblZhbHVlKG51bGwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhwZWN0YXRpb246ICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChsb2NhbFN0b3JhZ2VSZW1vdmVTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnb1RvUXVvdGVzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFJvdXRlckFjdGlvbnMuR29Ub1F1b3Rlcy5UeXBlXG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnbmF2aWdhdGVzIHRvIC9xdW90ZXMnLFxuICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoWycvcXVvdGVzJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZ29Ub0NvbGxlY3Rpb24nLFxuICAgICAgY29tbWVudDogJ3dpdGhvdXQgaSBhbmQgbiBiZWluZyBzZXQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUm91dGVyQWN0aW9ucy5Hb1RvQ29sbGVjdGlvbi5UeXBlLFxuICAgICAgICBjb2xsZWN0aW9uSWQ6IDEsXG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnbmF2aWdhdGVzIHRvIC9jb2xsZWN0aW9ucy86Y29sbGVjdGlvbklkJyxcbiAgICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnL2NvbGxlY3Rpb25zJywgMSwgeyBpOiB1bmRlZmluZWQsIG46IHVuZGVmaW5lZCB9XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnb1RvQ29sbGVjdGlvbicsXG4gICAgICBjb21tZW50OiAnd2l0aCBjdXN0b20gaSBhbmQgbiBzZXQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUm91dGVyQWN0aW9ucy5Hb1RvQ29sbGVjdGlvbi5UeXBlLFxuICAgICAgICBjb2xsZWN0aW9uSWQ6IDEsXG4gICAgICAgIHBhZ2U6IDUsXG4gICAgICAgIHBlclBhZ2U6IDU1XG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnbmF2aWdhdGVzIHRvIC9jb2xsZWN0aW9uLzpjb2xsZWN0aW9uSWQ7aT08cGFnZT47bj08cGVyUGFnZT4nLFxuICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoWycvY29sbGVjdGlvbnMnLCAxLCB7IGk6IDUsIG46IDU1IH1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2dvVG9BY3RpdmVRdW90ZScsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBSb3V0ZXJBY3Rpb25zLkdvVG9BY3RpdmVRdW90ZS5UeXBlXG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnbmF2aWdhdGVzIHRvIC9hY3RpdmUtcXVvdGUnLFxuICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoWycvYWN0aXZlLXF1b3RlJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZ29Ub0NhcnQnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUm91dGVyQWN0aW9ucy5Hb1RvQ2FydC5UeXBlXG4gICAgICB9LFxuICAgICAgY3VzdG9tVGVzdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGl0OiAnbmF2aWdhdGVzIHRvIC9jYXJ0JyxcbiAgICAgICAgICBleHBlY3RhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnL2NhcnQnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdhZGRNYXJrZXJzVG9VcmwnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogUm91dGVyQWN0aW9ucy5BZGRNYXJrZXJzVG9VcmwuVHlwZSxcbiAgICAgICAgYXNzZXRJZDogMTAwLFxuICAgICAgICB0aW1lU3RhcnQ6IDEwMDAsXG4gICAgICAgIHRpbWVFbmQ6IDIwMDBcbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdjYWxscyBsb2NhdGlvbi5nbygpIHdpdGggdGhlIGFzc2V0IGlkIGFuZCB1cGRhdGVkIG1hcmtlcnMnLFxuICAgICAgICAgIGV4cGVjdGF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QobW9ja0xvY2F0aW9uLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnL3NlYXJjaC9hc3NldC8xMDA7dGltZVN0YXJ0PTEwMDA7dGltZUVuZD0yMDAwJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdnb1RvQmFkUmVxdWVzdCcsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiBSb3V0ZXJBY3Rpb25zLkdvVG9CYWRSZXF1ZXN0LlR5cGVcbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdjYWxscyBuYXZpZ2F0ZSgpIG9uIHRoZSByb3V0ZXIgd2l0aCB0aGUgYmFkIHJlcXVlc3QgcGF0aCcsXG4gICAgICAgICAgZXhwZWN0YXRpb246ICgpID0+IGV4cGVjdChtb2NrUm91dGVyLm5hdmlnYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChbJy9lcnJvci80MDAnXSlcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnZ29Ub1NlcnZlckVycm9yJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IFJvdXRlckFjdGlvbnMuR29Ub1NlcnZlckVycm9yLlR5cGVcbiAgICAgIH0sXG4gICAgICBjdXN0b21UZXN0czogW1xuICAgICAgICB7XG4gICAgICAgICAgaXQ6ICdjYWxscyBuYXZpZ2F0ZSgpIG9uIHRoZSByb3V0ZXIgd2l0aCB0aGUgc2VydmVyIGVycm9yIHJlcXVlc3QgcGF0aCcsXG4gICAgICAgICAgZXhwZWN0YXRpb246ICgpID0+IGV4cGVjdChtb2NrUm91dGVyLm5hdmlnYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChbJy9lcnJvci81MDAnXSlcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
