import { ErrorEffects } from './error.effects';
import * as ErrorActions from './error.actions';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Error Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();
    let mockLocation: any, mockCurrentPath: string;

    beforeEach(() => {
      mockLocation = {
        path: () => mockCurrentPath
      };
    });

    function instantiator(): any {
      return new ErrorEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService, mockLocation
      );
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

    describe('handle - when user is NOT on /user/login', () => {
      beforeEach(() => {
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

    describe('handle - when user IS on /user/login', () => {
      beforeEach(() => {
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

    describe('handle - when user IS on /user/login with query params', () => {
      beforeEach(() => {
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

    describe('handle (with a previous error notification)', () => {
      const inputAction = { type: 'whatever', error: { status: 403 } };  // Using 403 to minimize the need for mocking.
      let notifyActionSpy: jasmine.Spy;

      beforeEach(() => {
        effectsSpecHelper.initializeMocks();
        effectsSpecHelper.subscribeTo(instantiator, 'handle');
        notifyActionSpy = effectsSpecHelper.mockStore.createInternalActionFactoryMethod('notifier', 'notify');
      });

      afterEach(() => {
        effectsSpecHelper.effectSubscription.unsubscribe();
      });

      it('doesn\'t emit a new action if the previous error notification hasn\'t been acknowledged', () => {
        // This is the "previous" error, which remains unacknowledged.  It should emit an action.
        effectsSpecHelper.simulateInputAction(inputAction);
        expect(effectsSpecHelper.effectSubscriptionCallback).toHaveBeenCalled();

        // Don't want to confuse previous effect emissions with those from the second error.
        effectsSpecHelper.effectSubscriptionCallback.calls.reset();

        // This is the second error.  It should not emit an action.
        effectsSpecHelper.simulateInputAction(inputAction);
        expect(effectsSpecHelper.effectSubscriptionCallback).not.toHaveBeenCalled();
      });

      it('emits a new action if the previous error notification has been acknowledged', () => {
        // Automatically call the callback ("acknowledge the notification") when the notify action is created.
        notifyActionSpy.and.callFake((options: any, callback: Function) => callback());

        // This is the "previous" error, which is immediately acknowledged.  It should emit an action.
        effectsSpecHelper.simulateInputAction(inputAction);
        expect(effectsSpecHelper.effectSubscriptionCallback).toHaveBeenCalled();

        // Don't want to confuse previous effect emissions with those from the second error.
        effectsSpecHelper.effectSubscriptionCallback.calls.reset();

        // This is the second error.  It should also emit an action.
        effectsSpecHelper.simulateInputAction(inputAction);
        expect(effectsSpecHelper.effectSubscriptionCallback).toHaveBeenCalled();
      });
    });

    describe('handle401Unauthorized - while the user is NOT on /user/login', () => {
      beforeEach(() => {
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

    describe('handle401Unauthorized - while the user IS on /user/login', () => {
      beforeEach(() => {
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

    describe('handle401Unauthorized - while the user IS on /user/login with query params', () => {
      beforeEach(() => {
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
