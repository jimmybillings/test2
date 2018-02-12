"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_effects_1 = require("./error.effects");
var ErrorActions = require("./error.actions");
var effects_spec_helper_1 = require("../spec-helpers/effects.spec-helper");
function main() {
    describe('Error Effects', function () {
        var effectsSpecHelper = new effects_spec_helper_1.EffectsSpecHelper();
        var mockLocation, mockCurrentPath;
        beforeEach(function () {
            mockLocation = {
                path: function () { return mockCurrentPath; }
            };
        });
        function instantiator() {
            return new error_effects_1.ErrorEffects(effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockLocation);
        }
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with a 400 error status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { status: 400 }
            },
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'router',
                        methodName: 'goToBadRequest',
                        expectedArguments: []
                    }
                ]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with a 500 error status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { status: 500 }
            },
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'router',
                        methodName: 'goToServerError',
                        expectedArguments: []
                    }
                ]
            }
        });
        describe('handle - when user is NOT on /user/login', function () {
            beforeEach(function () {
                mockCurrentPath = 'SOME URL';
            });
            effectsSpecHelper.generateTestsFor({
                effectName: 'handle',
                comment: 'with a 401 error status on any route except /user/login',
                effectsInstantiator: instantiator,
                inputAction: {
                    type: 'whatever',
                    error: { status: 401 }
                },
                helperServiceMethods: [{
                        name: 'destroy',
                        expectedArguments: [],
                        returns: null
                    }],
                outputActionFactories: {
                    success: [
                        {
                            sectionName: 'router',
                            methodName: 'goToLoginWithRedirect',
                            expectedArguments: []
                        }
                    ]
                },
            });
        });
        describe('handle - when user IS on /user/login', function () {
            beforeEach(function () {
                mockCurrentPath = '/user/login';
            });
            effectsSpecHelper.generateTestsFor({
                effectName: 'handle',
                comment: 'with a 401 error status - on /user/login',
                effectsInstantiator: instantiator,
                inputAction: {
                    type: 'whatever',
                    error: { status: 401 }
                },
                helperServiceMethods: [{
                        name: 'destroy',
                        expectedArguments: [],
                        returns: null
                    }],
                outputActionFactories: {
                    success: [
                        {
                            sectionName: 'router',
                            methodName: 'goToLoginWithRedirect',
                            expectedArguments: []
                        },
                        {
                            sectionName: 'notifier',
                            methodName: 'notify',
                            expectedArguments: [
                                { title: 'NOTIFICATION.ERROR', message: 'NOTIFICATION.INVALID_CREDENTIALS' },
                                jasmine.any(Function)
                            ]
                        }
                    ]
                },
            });
        });
        describe('handle - when user IS on /user/login with query params', function () {
            beforeEach(function () {
                mockCurrentPath = '/user/login;requireLogin=true';
            });
            effectsSpecHelper.generateTestsFor({
                effectName: 'handle',
                comment: 'with a 401 error status - on /user/login with query params',
                effectsInstantiator: instantiator,
                inputAction: {
                    type: 'whatever',
                    error: { status: 401 }
                },
                helperServiceMethods: [{
                        name: 'destroy',
                        expectedArguments: [],
                        returns: null
                    }],
                outputActionFactories: {
                    success: [
                        {
                            sectionName: 'router',
                            methodName: 'goToLoginWithRedirect',
                            expectedArguments: []
                        },
                        {
                            sectionName: 'notifier',
                            methodName: 'notify',
                            expectedArguments: [
                                { title: 'NOTIFICATION.ERROR', message: 'NOTIFICATION.INVALID_CREDENTIALS' },
                                jasmine.any(Function)
                            ]
                        }
                    ]
                },
            });
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with a 403 error status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { status: 403 }
            },
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'notifier',
                        methodName: 'notify',
                        expectedArguments: [
                            { title: 'NOTIFICATION.ERROR', message: 'NOTIFICATION.NEED_PERMISSION' },
                            jasmine.any(Function)
                        ]
                    }
                ]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with a 404 error status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { status: 404 }
            },
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'router',
                        methodName: 'goToPageNotFound',
                        expectedArguments: []
                    }
                ]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with a 419 error status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { status: 419 }
            },
            helperServiceMethods: [{
                    name: 'destroy',
                    expectedArguments: [],
                    returns: null
                }],
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'router',
                        methodName: 'goToLoginWithRedirect',
                        expectedArguments: []
                    },
                    {
                        sectionName: 'notifier',
                        methodName: 'notify',
                        expectedArguments: [
                            { title: 'NOTIFICATION.ERROR', message: 'NOTIFICATION.EXPIRED_SESSION' },
                            jasmine.any(Function)
                        ]
                    }
                ]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with a 451 error status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { status: 451 }
            },
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'notifier',
                        methodName: 'notify',
                        expectedArguments: [
                            {
                                title: 'REGISTER.DISALLOWED.TITLE', message: 'REGISTER.DISALLOWED.MESSAGE', prompt: 'REGISTER.DISALLOWED.PROMPT'
                            },
                            jasmine.any(Function)
                        ]
                    }
                ]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with an unknown error status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { status: 47 }
            },
            expectToEmitAction: false
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with no error parameter',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever'
            },
            expectToEmitAction: false
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with an error parameter with no status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { some: 'non-standard error' }
            },
            expectToEmitAction: false
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with no action - extremely unlikely, but what the heck',
            effectsInstantiator: instantiator,
            inputAction: null,
            expectToEmitAction: false
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle',
            comment: 'with a non-numeric error status',
            effectsInstantiator: instantiator,
            inputAction: {
                type: 'whatever',
                error: { status: 'ruh-roh' }
            },
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'notifier',
                        methodName: 'notify',
                        expectedArguments: [
                            { title: 'ruh-roh' },
                            jasmine.any(Function)
                        ]
                    }
                ]
            }
        });
        describe('handle (with a previous error notification)', function () {
            var inputAction = { type: 'whatever', error: { status: 403 } };
            var notifyActionSpy;
            beforeEach(function () {
                effectsSpecHelper.initializeMocks();
                effectsSpecHelper.subscribeTo(instantiator, 'handle');
                notifyActionSpy = effectsSpecHelper.mockStore.createInternalActionFactoryMethod('notifier', 'notify');
            });
            afterEach(function () {
                effectsSpecHelper.effectSubscription.unsubscribe();
            });
            it('doesn\'t emit a new action if the previous error notification hasn\'t been acknowledged', function () {
                effectsSpecHelper.simulateInputAction(inputAction);
                expect(effectsSpecHelper.effectSubscriptionCallback).toHaveBeenCalled();
                effectsSpecHelper.effectSubscriptionCallback.calls.reset();
                effectsSpecHelper.simulateInputAction(inputAction);
                expect(effectsSpecHelper.effectSubscriptionCallback).not.toHaveBeenCalled();
            });
            it('emits a new action if the previous error notification has been acknowledged', function () {
                notifyActionSpy.and.callFake(function (options, callback) { return callback(); });
                effectsSpecHelper.simulateInputAction(inputAction);
                expect(effectsSpecHelper.effectSubscriptionCallback).toHaveBeenCalled();
                effectsSpecHelper.effectSubscriptionCallback.calls.reset();
                effectsSpecHelper.simulateInputAction(inputAction);
                expect(effectsSpecHelper.effectSubscriptionCallback).toHaveBeenCalled();
            });
        });
        describe('handle401Unauthorized - while the user is NOT on /user/login', function () {
            beforeEach(function () {
                mockCurrentPath = 'SOME URL';
            });
            effectsSpecHelper.generateTestsFor({
                effectName: 'handle401Unauthorized',
                effectsInstantiator: instantiator,
                inputAction: {
                    type: ErrorActions.Handle401Unauthorized.Type
                },
                helperServiceMethods: [{
                        name: 'destroy',
                        expectedArguments: [],
                        returns: null
                    }],
                outputActionFactories: {
                    success: [
                        {
                            sectionName: 'router',
                            methodName: 'goToLoginWithRedirect',
                            expectedArguments: []
                        }
                    ]
                }
            });
        });
        describe('handle401Unauthorized - while the user IS on /user/login', function () {
            beforeEach(function () {
                mockCurrentPath = '/user/login';
            });
            effectsSpecHelper.generateTestsFor({
                effectName: 'handle401Unauthorized',
                effectsInstantiator: instantiator,
                inputAction: {
                    type: ErrorActions.Handle401Unauthorized.Type
                },
                helperServiceMethods: [{
                        name: 'destroy',
                        expectedArguments: [],
                        returns: null
                    }],
                outputActionFactories: {
                    success: [
                        {
                            sectionName: 'router',
                            methodName: 'goToLoginWithRedirect',
                            expectedArguments: []
                        },
                        {
                            sectionName: 'notifier',
                            methodName: 'notify',
                            expectedArguments: [
                                { title: 'NOTIFICATION.ERROR', message: 'NOTIFICATION.INVALID_CREDENTIALS' },
                                jasmine.any(Function)
                            ]
                        }
                    ]
                }
            });
        });
        describe('handle401Unauthorized - while the user IS on /user/login with query params', function () {
            beforeEach(function () {
                mockCurrentPath = '/user/login;requireLogin=true';
            });
            effectsSpecHelper.generateTestsFor({
                effectName: 'handle401Unauthorized',
                effectsInstantiator: instantiator,
                inputAction: {
                    type: ErrorActions.Handle401Unauthorized.Type
                },
                helperServiceMethods: [{
                        name: 'destroy',
                        expectedArguments: [],
                        returns: null
                    }],
                outputActionFactories: {
                    success: [
                        {
                            sectionName: 'router',
                            methodName: 'goToLoginWithRedirect',
                            expectedArguments: []
                        },
                        {
                            sectionName: 'notifier',
                            methodName: 'notify',
                            expectedArguments: [
                                { title: 'NOTIFICATION.ERROR', message: 'NOTIFICATION.INVALID_CREDENTIALS' },
                                jasmine.any(Function)
                            ]
                        }
                    ]
                }
            });
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handle403Forbidden',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ErrorActions.Handle403Forbidden.Type,
            },
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'notifier',
                        methodName: 'notify',
                        expectedArguments: [
                            { title: 'NOTIFICATION.ERROR', message: 'NOTIFICATION.NEED_PERMISSION' },
                            jasmine.any(Function)
                        ]
                    }
                ]
            }
        });
        effectsSpecHelper.generateTestsFor({
            effectName: 'handleCustom',
            effectsInstantiator: instantiator,
            inputAction: {
                type: ErrorActions.HandleCustomError.Type,
                title: 'Red Alert!'
            },
            outputActionFactories: {
                success: [
                    {
                        sectionName: 'notifier',
                        methodName: 'notify',
                        expectedArguments: [
                            { title: 'Red Alert!' },
                            jasmine.any(Function)
                        ]
                    }
                ]
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9lcnJvci9lcnJvci5lZmZlY3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBK0M7QUFDL0MsOENBQWdEO0FBQ2hELDJFQUF3RTtBQUV4RTtJQUNFLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsSUFBTSxpQkFBaUIsR0FBc0IsSUFBSSx1Q0FBaUIsRUFBRSxDQUFDO1FBQ3JFLElBQUksWUFBaUIsRUFBRSxlQUF1QixDQUFDO1FBRS9DLFVBQVUsQ0FBQztZQUNULFlBQVksR0FBRztnQkFDYixJQUFJLEVBQUUsY0FBTSxPQUFBLGVBQWUsRUFBZixDQUFlO2FBQzVCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVIO1lBQ0UsTUFBTSxDQUFDLElBQUksNEJBQVksQ0FDckIsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxZQUFZLENBQ25ILENBQUM7UUFDSixDQUFDO1FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7WUFDakMsVUFBVSxFQUFFLFFBQVE7WUFDcEIsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTthQUN2QjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQixPQUFPLEVBQUU7b0JBQ1A7d0JBQ0UsV0FBVyxFQUFFLFFBQVE7d0JBQ3JCLFVBQVUsRUFBRSxnQkFBZ0I7d0JBQzVCLGlCQUFpQixFQUFFLEVBQUU7cUJBQ3RCO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxVQUFVLEVBQUUsUUFBUTtZQUNwQixPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLG1CQUFtQixFQUFFLFlBQVk7WUFDakMsV0FB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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckVmZmVjdHMgfSBmcm9tICcuL2Vycm9yLmVmZmVjdHMnO1xuaW1wb3J0ICogYXMgRXJyb3JBY3Rpb25zIGZyb20gJy4vZXJyb3IuYWN0aW9ucyc7XG5pbXBvcnQgeyBFZmZlY3RzU3BlY0hlbHBlciB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9lZmZlY3RzLnNwZWMtaGVscGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdFcnJvciBFZmZlY3RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVmZmVjdHNTcGVjSGVscGVyOiBFZmZlY3RzU3BlY0hlbHBlciA9IG5ldyBFZmZlY3RzU3BlY0hlbHBlcigpO1xuICAgIGxldCBtb2NrTG9jYXRpb246IGFueSwgbW9ja0N1cnJlbnRQYXRoOiBzdHJpbmc7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tMb2NhdGlvbiA9IHtcbiAgICAgICAgcGF0aDogKCkgPT4gbW9ja0N1cnJlbnRQYXRoXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdG9yKCk6IGFueSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yRWZmZWN0cyhcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIubW9ja05ncnhFZmZlY3RzQWN0aW9ucywgZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLCBlZmZlY3RzU3BlY0hlbHBlci5tb2NrU2VydmljZSwgbW9ja0xvY2F0aW9uXG4gICAgICApO1xuICAgIH1cblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZScsXG4gICAgICBjb21tZW50OiAnd2l0aCBhIDQwMCBlcnJvciBzdGF0dXMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ3doYXRldmVyJyxcbiAgICAgICAgZXJyb3I6IHsgc3RhdHVzOiA0MDAgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbk5hbWU6ICdyb3V0ZXInLFxuICAgICAgICAgICAgbWV0aG9kTmFtZTogJ2dvVG9CYWRSZXF1ZXN0JyxcbiAgICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnaGFuZGxlJyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIGEgNTAwIGVycm9yIHN0YXR1cycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnd2hhdGV2ZXInLFxuICAgICAgICBlcnJvcjogeyBzdGF0dXM6IDUwMCB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uTmFtZTogJ3JvdXRlcicsXG4gICAgICAgICAgICBtZXRob2ROYW1lOiAnZ29Ub1NlcnZlckVycm9yJyxcbiAgICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhbmRsZSAtIHdoZW4gdXNlciBpcyBOT1Qgb24gL3VzZXIvbG9naW4nLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRQYXRoID0gJ1NPTUUgVVJMJztcbiAgICAgIH0pO1xuXG4gICAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZScsXG4gICAgICAgIGNvbW1lbnQ6ICd3aXRoIGEgNDAxIGVycm9yIHN0YXR1cyBvbiBhbnkgcm91dGUgZXhjZXB0IC91c2VyL2xvZ2luJyxcbiAgICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICAgIHR5cGU6ICd3aGF0ZXZlcicsXG4gICAgICAgICAgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfVxuICAgICAgICB9LFxuICAgICAgICBoZWxwZXJTZXJ2aWNlTWV0aG9kczogW3tcbiAgICAgICAgICBuYW1lOiAnZGVzdHJveScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdLFxuICAgICAgICAgIHJldHVybnM6IG51bGxcbiAgICAgICAgfV0sXG4gICAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICAgIHN1Y2Nlc3M6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2VjdGlvbk5hbWU6ICdyb3V0ZXInLFxuICAgICAgICAgICAgICBtZXRob2ROYW1lOiAnZ29Ub0xvZ2luV2l0aFJlZGlyZWN0JyxcbiAgICAgICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFuZGxlIC0gd2hlbiB1c2VyIElTIG9uIC91c2VyL2xvZ2luJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tDdXJyZW50UGF0aCA9ICcvdXNlci9sb2dpbic7XG4gICAgICB9KTtcblxuICAgICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICAgIGVmZmVjdE5hbWU6ICdoYW5kbGUnLFxuICAgICAgICBjb21tZW50OiAnd2l0aCBhIDQwMSBlcnJvciBzdGF0dXMgLSBvbiAvdXNlci9sb2dpbicsXG4gICAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgICB0eXBlOiAnd2hhdGV2ZXInLFxuICAgICAgICAgIGVycm9yOiB7IHN0YXR1czogNDAxIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGVscGVyU2VydmljZU1ldGhvZHM6IFt7XG4gICAgICAgICAgbmFtZTogJ2Rlc3Ryb3knLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXSxcbiAgICAgICAgICByZXR1cm5zOiBudWxsXG4gICAgICAgIH1dLFxuICAgICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgICBzdWNjZXNzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICAgICAgbWV0aG9kTmFtZTogJ2dvVG9Mb2dpbldpdGhSZWRpcmVjdCcsXG4gICAgICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2VjdGlvbk5hbWU6ICdub3RpZmllcicsXG4gICAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdub3RpZnknLFxuICAgICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW1xuICAgICAgICAgICAgICAgIHsgdGl0bGU6ICdOT1RJRklDQVRJT04uRVJST1InLCBtZXNzYWdlOiAnTk9USUZJQ0FUSU9OLklOVkFMSURfQ1JFREVOVElBTFMnIH0sXG4gICAgICAgICAgICAgICAgamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYW5kbGUgLSB3aGVuIHVzZXIgSVMgb24gL3VzZXIvbG9naW4gd2l0aCBxdWVyeSBwYXJhbXMnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRQYXRoID0gJy91c2VyL2xvZ2luO3JlcXVpcmVMb2dpbj10cnVlJztcbiAgICAgIH0pO1xuXG4gICAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZScsXG4gICAgICAgIGNvbW1lbnQ6ICd3aXRoIGEgNDAxIGVycm9yIHN0YXR1cyAtIG9uIC91c2VyL2xvZ2luIHdpdGggcXVlcnkgcGFyYW1zJyxcbiAgICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICAgIHR5cGU6ICd3aGF0ZXZlcicsXG4gICAgICAgICAgZXJyb3I6IHsgc3RhdHVzOiA0MDEgfVxuICAgICAgICB9LFxuICAgICAgICBoZWxwZXJTZXJ2aWNlTWV0aG9kczogW3tcbiAgICAgICAgICBuYW1lOiAnZGVzdHJveScsXG4gICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdLFxuICAgICAgICAgIHJldHVybnM6IG51bGxcbiAgICAgICAgfV0sXG4gICAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICAgIHN1Y2Nlc3M6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2VjdGlvbk5hbWU6ICdyb3V0ZXInLFxuICAgICAgICAgICAgICBtZXRob2ROYW1lOiAnZ29Ub0xvZ2luV2l0aFJlZGlyZWN0JyxcbiAgICAgICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZWN0aW9uTmFtZTogJ25vdGlmaWVyJyxcbiAgICAgICAgICAgICAgbWV0aG9kTmFtZTogJ25vdGlmeScsXG4gICAgICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogJ05PVElGSUNBVElPTi5FUlJPUicsIG1lc3NhZ2U6ICdOT1RJRklDQVRJT04uSU5WQUxJRF9DUkVERU5USUFMUycgfSxcbiAgICAgICAgICAgICAgICBqYXNtaW5lLmFueShGdW5jdGlvbilcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgIGVmZmVjdE5hbWU6ICdoYW5kbGUnLFxuICAgICAgY29tbWVudDogJ3dpdGggYSA0MDMgZXJyb3Igc3RhdHVzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICd3aGF0ZXZlcicsXG4gICAgICAgIGVycm9yOiB7IHN0YXR1czogNDAzIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2VzczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb25OYW1lOiAnbm90aWZpZXInLFxuICAgICAgICAgICAgbWV0aG9kTmFtZTogJ25vdGlmeScsXG4gICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW1xuICAgICAgICAgICAgICB7IHRpdGxlOiAnTk9USUZJQ0FUSU9OLkVSUk9SJywgbWVzc2FnZTogJ05PVElGSUNBVElPTi5ORUVEX1BFUk1JU1NJT04nIH0sXG4gICAgICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnaGFuZGxlJyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIGEgNDA0IGVycm9yIHN0YXR1cycsXG4gICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICBpbnB1dEFjdGlvbjoge1xuICAgICAgICB0eXBlOiAnd2hhdGV2ZXInLFxuICAgICAgICBlcnJvcjogeyBzdGF0dXM6IDQwNCB9XG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uTmFtZTogJ3JvdXRlcicsXG4gICAgICAgICAgICBtZXRob2ROYW1lOiAnZ29Ub1BhZ2VOb3RGb3VuZCcsXG4gICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW11cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZScsXG4gICAgICBjb21tZW50OiAnd2l0aCBhIDQxOSBlcnJvciBzdGF0dXMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ3doYXRldmVyJyxcbiAgICAgICAgZXJyb3I6IHsgc3RhdHVzOiA0MTkgfVxuICAgICAgfSxcbiAgICAgIGhlbHBlclNlcnZpY2VNZXRob2RzOiBbe1xuICAgICAgICBuYW1lOiAnZGVzdHJveScsXG4gICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXSxcbiAgICAgICAgcmV0dXJuczogbnVsbFxuICAgICAgfV0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2VzczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdnb1RvTG9naW5XaXRoUmVkaXJlY3QnLFxuICAgICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uTmFtZTogJ25vdGlmaWVyJyxcbiAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdub3RpZnknLFxuICAgICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtcbiAgICAgICAgICAgICAgeyB0aXRsZTogJ05PVElGSUNBVElPTi5FUlJPUicsIG1lc3NhZ2U6ICdOT1RJRklDQVRJT04uRVhQSVJFRF9TRVNTSU9OJyB9LFxuICAgICAgICAgICAgICBqYXNtaW5lLmFueShGdW5jdGlvbilcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZScsXG4gICAgICBjb21tZW50OiAnd2l0aCBhIDQ1MSBlcnJvciBzdGF0dXMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ3doYXRldmVyJyxcbiAgICAgICAgZXJyb3I6IHsgc3RhdHVzOiA0NTEgfVxuICAgICAgfSxcbiAgICAgIG91dHB1dEFjdGlvbkZhY3Rvcmllczoge1xuICAgICAgICBzdWNjZXNzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2VjdGlvbk5hbWU6ICdub3RpZmllcicsXG4gICAgICAgICAgICBtZXRob2ROYW1lOiAnbm90aWZ5JyxcbiAgICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1JFR0lTVEVSLkRJU0FMTE9XRUQuVElUTEUnLCBtZXNzYWdlOiAnUkVHSVNURVIuRElTQUxMT1dFRC5NRVNTQUdFJywgcHJvbXB0OiAnUkVHSVNURVIuRElTQUxMT1dFRC5QUk9NUFQnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnaGFuZGxlJyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIGFuIHVua25vd24gZXJyb3Igc3RhdHVzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICd3aGF0ZXZlcicsXG4gICAgICAgIGVycm9yOiB7IHN0YXR1czogNDcgfVxuICAgICAgfSxcbiAgICAgIGV4cGVjdFRvRW1pdEFjdGlvbjogZmFsc2VcbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZScsXG4gICAgICBjb21tZW50OiAnd2l0aCBubyBlcnJvciBwYXJhbWV0ZXInLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ3doYXRldmVyJ1xuICAgICAgfSxcbiAgICAgIGV4cGVjdFRvRW1pdEFjdGlvbjogZmFsc2VcbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZScsXG4gICAgICBjb21tZW50OiAnd2l0aCBhbiBlcnJvciBwYXJhbWV0ZXIgd2l0aCBubyBzdGF0dXMnLFxuICAgICAgZWZmZWN0c0luc3RhbnRpYXRvcjogaW5zdGFudGlhdG9yLFxuICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgdHlwZTogJ3doYXRldmVyJyxcbiAgICAgICAgZXJyb3I6IHsgc29tZTogJ25vbi1zdGFuZGFyZCBlcnJvcicgfVxuICAgICAgfSxcbiAgICAgIGV4cGVjdFRvRW1pdEFjdGlvbjogZmFsc2VcbiAgICB9KTtcblxuICAgIGVmZmVjdHNTcGVjSGVscGVyLmdlbmVyYXRlVGVzdHNGb3Ioe1xuICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZScsXG4gICAgICBjb21tZW50OiAnd2l0aCBubyBhY3Rpb24gLSBleHRyZW1lbHkgdW5saWtlbHksIGJ1dCB3aGF0IHRoZSBoZWNrJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiBudWxsLFxuICAgICAgZXhwZWN0VG9FbWl0QWN0aW9uOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnaGFuZGxlJyxcbiAgICAgIGNvbW1lbnQ6ICd3aXRoIGEgbm9uLW51bWVyaWMgZXJyb3Igc3RhdHVzJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6ICd3aGF0ZXZlcicsXG4gICAgICAgIGVycm9yOiB7IHN0YXR1czogJ3J1aC1yb2gnIH1cbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2VzczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb25OYW1lOiAnbm90aWZpZXInLFxuICAgICAgICAgICAgbWV0aG9kTmFtZTogJ25vdGlmeScsXG4gICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW1xuICAgICAgICAgICAgICB7IHRpdGxlOiAncnVoLXJvaCcgfSxcbiAgICAgICAgICAgICAgamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFuZGxlICh3aXRoIGEgcHJldmlvdXMgZXJyb3Igbm90aWZpY2F0aW9uKScsICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0QWN0aW9uID0geyB0eXBlOiAnd2hhdGV2ZXInLCBlcnJvcjogeyBzdGF0dXM6IDQwMyB9IH07ICAvLyBVc2luZyA0MDMgdG8gbWluaW1pemUgdGhlIG5lZWQgZm9yIG1vY2tpbmcuXG4gICAgICBsZXQgbm90aWZ5QWN0aW9uU3B5OiBqYXNtaW5lLlNweTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLmluaXRpYWxpemVNb2NrcygpO1xuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5zdWJzY3JpYmVUbyhpbnN0YW50aWF0b3IsICdoYW5kbGUnKTtcbiAgICAgICAgbm90aWZ5QWN0aW9uU3B5ID0gZWZmZWN0c1NwZWNIZWxwZXIubW9ja1N0b3JlLmNyZWF0ZUludGVybmFsQWN0aW9uRmFjdG9yeU1ldGhvZCgnbm90aWZpZXInLCAnbm90aWZ5Jyk7XG4gICAgICB9KTtcblxuICAgICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIuZWZmZWN0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2RvZXNuXFwndCBlbWl0IGEgbmV3IGFjdGlvbiBpZiB0aGUgcHJldmlvdXMgZXJyb3Igbm90aWZpY2F0aW9uIGhhc25cXCd0IGJlZW4gYWNrbm93bGVkZ2VkJywgKCkgPT4ge1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBcInByZXZpb3VzXCIgZXJyb3IsIHdoaWNoIHJlbWFpbnMgdW5hY2tub3dsZWRnZWQuICBJdCBzaG91bGQgZW1pdCBhbiBhY3Rpb24uXG4gICAgICAgIGVmZmVjdHNTcGVjSGVscGVyLnNpbXVsYXRlSW5wdXRBY3Rpb24oaW5wdXRBY3Rpb24pO1xuICAgICAgICBleHBlY3QoZWZmZWN0c1NwZWNIZWxwZXIuZWZmZWN0U3Vic2NyaXB0aW9uQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICAvLyBEb24ndCB3YW50IHRvIGNvbmZ1c2UgcHJldmlvdXMgZWZmZWN0IGVtaXNzaW9ucyB3aXRoIHRob3NlIGZyb20gdGhlIHNlY29uZCBlcnJvci5cbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIuZWZmZWN0U3Vic2NyaXB0aW9uQ2FsbGJhY2suY2FsbHMucmVzZXQoKTtcblxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBzZWNvbmQgZXJyb3IuICBJdCBzaG91bGQgbm90IGVtaXQgYW4gYWN0aW9uLlxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5zaW11bGF0ZUlucHV0QWN0aW9uKGlucHV0QWN0aW9uKTtcbiAgICAgICAgZXhwZWN0KGVmZmVjdHNTcGVjSGVscGVyLmVmZmVjdFN1YnNjcmlwdGlvbkNhbGxiYWNrKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdlbWl0cyBhIG5ldyBhY3Rpb24gaWYgdGhlIHByZXZpb3VzIGVycm9yIG5vdGlmaWNhdGlvbiBoYXMgYmVlbiBhY2tub3dsZWRnZWQnLCAoKSA9PiB7XG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgY2FsbGJhY2sgKFwiYWNrbm93bGVkZ2UgdGhlIG5vdGlmaWNhdGlvblwiKSB3aGVuIHRoZSBub3RpZnkgYWN0aW9uIGlzIGNyZWF0ZWQuXG4gICAgICAgIG5vdGlmeUFjdGlvblNweS5hbmQuY2FsbEZha2UoKG9wdGlvbnM6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiBjYWxsYmFjaygpKTtcblxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBcInByZXZpb3VzXCIgZXJyb3IsIHdoaWNoIGlzIGltbWVkaWF0ZWx5IGFja25vd2xlZGdlZC4gIEl0IHNob3VsZCBlbWl0IGFuIGFjdGlvbi5cbiAgICAgICAgZWZmZWN0c1NwZWNIZWxwZXIuc2ltdWxhdGVJbnB1dEFjdGlvbihpbnB1dEFjdGlvbik7XG4gICAgICAgIGV4cGVjdChlZmZlY3RzU3BlY0hlbHBlci5lZmZlY3RTdWJzY3JpcHRpb25DYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIC8vIERvbid0IHdhbnQgdG8gY29uZnVzZSBwcmV2aW91cyBlZmZlY3QgZW1pc3Npb25zIHdpdGggdGhvc2UgZnJvbSB0aGUgc2Vjb25kIGVycm9yLlxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5lZmZlY3RTdWJzY3JpcHRpb25DYWxsYmFjay5jYWxscy5yZXNldCgpO1xuXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIHNlY29uZCBlcnJvci4gIEl0IHNob3VsZCBhbHNvIGVtaXQgYW4gYWN0aW9uLlxuICAgICAgICBlZmZlY3RzU3BlY0hlbHBlci5zaW11bGF0ZUlucHV0QWN0aW9uKGlucHV0QWN0aW9uKTtcbiAgICAgICAgZXhwZWN0KGVmZmVjdHNTcGVjSGVscGVyLmVmZmVjdFN1YnNjcmlwdGlvbkNhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYW5kbGU0MDFVbmF1dGhvcml6ZWQgLSB3aGlsZSB0aGUgdXNlciBpcyBOT1Qgb24gL3VzZXIvbG9naW4nLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRQYXRoID0gJ1NPTUUgVVJMJztcbiAgICAgIH0pO1xuXG4gICAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZTQwMVVuYXV0aG9yaXplZCcsXG4gICAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgICB0eXBlOiBFcnJvckFjdGlvbnMuSGFuZGxlNDAxVW5hdXRob3JpemVkLlR5cGVcbiAgICAgICAgfSxcbiAgICAgICAgaGVscGVyU2VydmljZU1ldGhvZHM6IFt7XG4gICAgICAgICAgbmFtZTogJ2Rlc3Ryb3knLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXSxcbiAgICAgICAgICByZXR1cm5zOiBudWxsXG4gICAgICAgIH1dLFxuICAgICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgICBzdWNjZXNzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICAgICAgbWV0aG9kTmFtZTogJ2dvVG9Mb2dpbldpdGhSZWRpcmVjdCcsXG4gICAgICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFuZGxlNDAxVW5hdXRob3JpemVkIC0gd2hpbGUgdGhlIHVzZXIgSVMgb24gL3VzZXIvbG9naW4nLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRQYXRoID0gJy91c2VyL2xvZ2luJztcbiAgICAgIH0pO1xuXG4gICAgICBlZmZlY3RzU3BlY0hlbHBlci5nZW5lcmF0ZVRlc3RzRm9yKHtcbiAgICAgICAgZWZmZWN0TmFtZTogJ2hhbmRsZTQwMVVuYXV0aG9yaXplZCcsXG4gICAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgICAgaW5wdXRBY3Rpb246IHtcbiAgICAgICAgICB0eXBlOiBFcnJvckFjdGlvbnMuSGFuZGxlNDAxVW5hdXRob3JpemVkLlR5cGVcbiAgICAgICAgfSxcbiAgICAgICAgaGVscGVyU2VydmljZU1ldGhvZHM6IFt7XG4gICAgICAgICAgbmFtZTogJ2Rlc3Ryb3knLFxuICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXSxcbiAgICAgICAgICByZXR1cm5zOiBudWxsXG4gICAgICAgIH1dLFxuICAgICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgICBzdWNjZXNzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNlY3Rpb25OYW1lOiAncm91dGVyJyxcbiAgICAgICAgICAgICAgbWV0aG9kTmFtZTogJ2dvVG9Mb2dpbldpdGhSZWRpcmVjdCcsXG4gICAgICAgICAgICAgIGV4cGVjdGVkQXJndW1lbnRzOiBbXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2VjdGlvbk5hbWU6ICdub3RpZmllcicsXG4gICAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdub3RpZnknLFxuICAgICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW1xuICAgICAgICAgICAgICAgIHsgdGl0bGU6ICdOT1RJRklDQVRJT04uRVJST1InLCBtZXNzYWdlOiAnTk9USUZJQ0FUSU9OLklOVkFMSURfQ1JFREVOVElBTFMnIH0sXG4gICAgICAgICAgICAgICAgamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhbmRsZTQwMVVuYXV0aG9yaXplZCAtIHdoaWxlIHRoZSB1c2VyIElTIG9uIC91c2VyL2xvZ2luIHdpdGggcXVlcnkgcGFyYW1zJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tDdXJyZW50UGF0aCA9ICcvdXNlci9sb2dpbjtyZXF1aXJlTG9naW49dHJ1ZSc7XG4gICAgICB9KTtcblxuICAgICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICAgIGVmZmVjdE5hbWU6ICdoYW5kbGU0MDFVbmF1dGhvcml6ZWQnLFxuICAgICAgICBlZmZlY3RzSW5zdGFudGlhdG9yOiBpbnN0YW50aWF0b3IsXG4gICAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgICAgdHlwZTogRXJyb3JBY3Rpb25zLkhhbmRsZTQwMVVuYXV0aG9yaXplZC5UeXBlXG4gICAgICAgIH0sXG4gICAgICAgIGhlbHBlclNlcnZpY2VNZXRob2RzOiBbe1xuICAgICAgICAgIG5hbWU6ICdkZXN0cm95JyxcbiAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW10sXG4gICAgICAgICAgcmV0dXJuczogbnVsbFxuICAgICAgICB9XSxcbiAgICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgICAgc3VjY2VzczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZWN0aW9uTmFtZTogJ3JvdXRlcicsXG4gICAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdnb1RvTG9naW5XaXRoUmVkaXJlY3QnLFxuICAgICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNlY3Rpb25OYW1lOiAnbm90aWZpZXInLFxuICAgICAgICAgICAgICBtZXRob2ROYW1lOiAnbm90aWZ5JyxcbiAgICAgICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiAnTk9USUZJQ0FUSU9OLkVSUk9SJywgbWVzc2FnZTogJ05PVElGSUNBVElPTi5JTlZBTElEX0NSRURFTlRJQUxTJyB9LFxuICAgICAgICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnaGFuZGxlNDAzRm9yYmlkZGVuJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEVycm9yQWN0aW9ucy5IYW5kbGU0MDNGb3JiaWRkZW4uVHlwZSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXRBY3Rpb25GYWN0b3JpZXM6IHtcbiAgICAgICAgc3VjY2VzczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlY3Rpb25OYW1lOiAnbm90aWZpZXInLFxuICAgICAgICAgICAgbWV0aG9kTmFtZTogJ25vdGlmeScsXG4gICAgICAgICAgICBleHBlY3RlZEFyZ3VtZW50czogW1xuICAgICAgICAgICAgICB7IHRpdGxlOiAnTk9USUZJQ0FUSU9OLkVSUk9SJywgbWVzc2FnZTogJ05PVElGSUNBVElPTi5ORUVEX1BFUk1JU1NJT04nIH0sXG4gICAgICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWZmZWN0c1NwZWNIZWxwZXIuZ2VuZXJhdGVUZXN0c0Zvcih7XG4gICAgICBlZmZlY3ROYW1lOiAnaGFuZGxlQ3VzdG9tJyxcbiAgICAgIGVmZmVjdHNJbnN0YW50aWF0b3I6IGluc3RhbnRpYXRvcixcbiAgICAgIGlucHV0QWN0aW9uOiB7XG4gICAgICAgIHR5cGU6IEVycm9yQWN0aW9ucy5IYW5kbGVDdXN0b21FcnJvci5UeXBlLFxuICAgICAgICB0aXRsZTogJ1JlZCBBbGVydCEnXG4gICAgICB9LFxuICAgICAgb3V0cHV0QWN0aW9uRmFjdG9yaWVzOiB7XG4gICAgICAgIHN1Y2Nlc3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZWN0aW9uTmFtZTogJ25vdGlmaWVyJyxcbiAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdub3RpZnknLFxuICAgICAgICAgICAgZXhwZWN0ZWRBcmd1bWVudHM6IFtcbiAgICAgICAgICAgICAgeyB0aXRsZTogJ1JlZCBBbGVydCEnIH0sXG4gICAgICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==
